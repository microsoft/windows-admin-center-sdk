import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertSeverity } from '../../../../angular';
import { connectionTypeConstants, EnvironmentModule, GatewayInventoryCache, LiveConnectionChangeType, LiveConnectionStatusType, Logging, LogLevel, Net, NotificationState } from '../../../../core';
import { RouteHelpers } from '../../../utility/route-helpers';
import { AddConnectionDialogComponent } from '../../dialogs/add-connection-dialog/add-connection-dialog.component';
var ConnectionsListComponent = (function () {
    function ConnectionsListComponent(appContextService, dialogService, alertBarService, router) {
        var _this = this;
        this.appContextService = appContextService;
        this.dialogService = dialogService;
        this.alertBarService = alertBarService;
        this.router = router;
        this.strings = MsftSme.resourcesStrings().MsftSmeShell.App.Connections;
        this.shellStrings = MsftSme.resourcesStrings().MsftSmeShell.App.Shell;
        this.selectedConnections = [];
        this.filterInput = new FormControl();
        this.connectionsReady = false;
        this.gettingStarted = true;
        this.connectionsIcons = {};
        this.connectionsTypeNames = {};
        this.masterConnections = [];
        this.sortRequired = true;
        this.sortCompareFunction = function (a, b, field) {
            var leftVal = _this.getSortableValue(a, field);
            var rightVal = _this.getSortableValue(b, field);
            return (leftVal > rightVal ? 1 : leftVal < rightVal ? -1 : 0);
        };
    }
    Object.defineProperty(ConnectionsListComponent.prototype, "solution", {
        get: function () {
            return this.internalSolution;
        },
        set: function (solution) {
            this.internalSolution = solution;
            this.selectedConnections = [];
            this.filterConnections();
        },
        enumerable: true,
        configurable: true
    });
    ConnectionsListComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().MsftSmeShell.App.Connections.title;
    };
    ConnectionsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        EnvironmentModule.getEntryPointsByType(['connectionProvider']).forEach(function (provider) {
            _this.connectionsIcons[provider.connectionType] = provider.icon.startsWith('sme-icon:') ? provider.icon.substr(9) : '';
            _this.connectionsTypeNames[provider.connectionType] = provider.connectionTypeName;
        });
        // get user information first so it can fill user information from live connection.
        this.userSubscription = this.appContextService.gateway.get("user")
            .flatMap(function (user) {
            _this.user = user;
            // listening change such as add/remove/update.
            _this.startListening();
            return _this.appContextService.connectionStream.liveConnectionCollection;
        })
            .subscribe(function (liveConnections) {
            // get live connections from cache. masterConnections include all connections.
            _this.masterConnections = liveConnections.map(function (live) { return _this.liveToModelConnection(live); });
            _this.filterConnections();
            _this.connectionsReady = true;
        }, function (error) {
            _this.alertBarService.show({
                message: Net.getErrorMessageWithoutStacktrace(error),
                severity: AlertSeverity.Error,
                title: _this.strings.User.Error.title
            });
        });
        this.filterSubscription = this.filterInput.valueChanges
            .debounceTime(200)
            .subscribe(function (filterValue) {
            _this.filter = filterValue;
            _this.filterConnections();
        });
        this.connectionsReadySubscription = this.appContextService.connectionManager.connectionsInitialized
            .take(1)
            .subscribe(function (connections) {
            if (connections && connections.length > 0) {
                _this.gettingStarted = false;
            }
        });
    };
    ConnectionsListComponent.prototype.ngOnDestroy = function () {
        if (this.connectionsSubscription) {
            this.connectionsSubscription.unsubscribe();
        }
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
        this.connectionsReadySubscription.unsubscribe();
        this.filterSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    };
    /**
     * Refreshes one or all servers in the server list
     */
    ConnectionsListComponent.prototype.refresh = function (connectionModels) {
        if (!connectionModels || connectionModels.length === 0) {
            this.appContextService.connectionStream.refresh(null);
        }
        else {
            for (var i = 0; i < connectionModels.length; i++) {
                this.appContextService.connectionStream.refresh(connectionModels[i].connection);
            }
        }
    };
    ConnectionsListComponent.prototype.addConnection = function () {
        var connectionTypes = [];
        if (this.solution) {
            connectionTypes = this.solution.connections.connectionTypes;
        }
        AddConnectionDialogComponent.addConnection(this.dialogService, this.appContextService, this.alertBarService, { connectionTypes: connectionTypes });
    };
    ConnectionsListComponent.prototype.removeConnection = function (connectionModels) {
        var _this = this;
        var connectionNames = '';
        if (connectionModels.length > 1) {
            connectionNames = this.strings.dialogs.remove.multiMessageFormat.format(connectionModels.length);
        }
        else {
            connectionNames = this.strings.dialogs.remove.messageFormat.format(connectionModels[0].connection.name);
        }
        this.dialogService.showConfirmation({
            title: this.strings.dialogs.remove.title,
            message: connectionNames,
            cancelButtonText: this.strings.dialogs.remove.cancelButtonText,
            confirmButtonText: this.strings.dialogs.remove.confirmButtonText
        }).flatMap(function (result) {
            if (!result.confirmed) {
                return Observable.of(null);
            }
            for (var i = 0; i < connectionModels.length; i++) {
                _this.appContextService.connectionManager.removeConnection(connectionModels[i].connection).subscribe();
            }
            return Observable.of(null);
        }).subscribe(function (result) {
            _this.selectedConnections = connectionModels;
        }, function (error) {
            _this.alertBarService.show({
                message: Net.getErrorMessageWithoutStacktrace(error),
                severity: AlertSeverity.Error,
                title: _this.strings.dialogs.remove.error.titleFormat.format(connectionNames)
            });
        });
    };
    ConnectionsListComponent.prototype.openDefaultAction = function (connectionModel, connectWhenReady) {
        if (connectWhenReady === void 0) { connectWhenReady = false; }
        if (connectionModel.statusType <= LiveConnectionStatusType.Warning) {
            this.openConnection(connectionModel);
        }
        else {
            this.showStatusSolution(connectionModel, connectWhenReady);
        }
    };
    ConnectionsListComponent.prototype.openConnection = function (connectionModel) {
        var _this = this;
        // set active connection.
        if (!this.appContextService.activeConnection.value
            || this.appContextService.activeConnection.value.id !== connectionModel.connection.id) {
            this.appContextService.activeConnection.value = connectionModel.connection;
        }
        var activeConnectionProperties = this.appContextService.activeConnection.value.properties;
        if (this.appContextService.activeConnection.value.type === connectionTypeConstants.windowsClient
            && activeConnectionProperties
            && activeConnectionProperties['displayName'] === 'localhost') {
            Logging.log({
                level: LogLevel.Debug,
                message: 'Managing localhost windows client. Restarting gateway to run with elevation.',
                params: null,
                source: 'sme-connections-list'
            });
            this.statusSubscription = Observable.zip(new GatewayInventoryCache(this.appContextService, { forceRefresh: true }).query({ name: 'gateway' }))
                .subscribe(function (_a) {
                var status = _a[0];
                var gatewayElevated = status.instance.isGatewayProcessElevated;
                if (gatewayElevated) {
                    RouteHelpers.navigateToConnection(_this.router, connectionModel.connection.type, connectionModel.connection.name, _this.solution);
                }
                else {
                    var confirmation = _this.showConfirmationDialog(_this.strings.dialogs.elevate.elevateGatewayTitle, _this.strings.dialogs.elevate.elevateGatewayMessage);
                    confirmation.subscribe(function (confirm) {
                        if (confirm.confirmed) {
                            _this.appContextService.gateway.post('gateway/elevate').subscribe(function (result) {
                                RouteHelpers.navigateToConnection(_this.router, connectionModel.connection.type, connectionModel.connection.name, _this.solution);
                            });
                        }
                    });
                }
            }, function (error) {
                _this.appContextService.notification.alert('', NotificationState.Error, Net.getErrorMessage(error));
            });
        }
        else {
            RouteHelpers.navigateToConnection(this.router, connectionModel.connection.type, connectionModel.connection.name, this.solution);
        }
    };
    ConnectionsListComponent.prototype.getManagingAs = function (liveConnection) {
        var token = this.appContextService.authorizationManager.nodeTokens[liveConnection.connection.name]
            || this.appContextService.authorizationManager.manageAsToken;
        if (token) {
            if (token.username) {
                return token.username;
            }
            if (token.useLaps) {
                return this.strings.actions.manageAsLaps;
            }
        }
        return this.user ? this.user.userId : '';
    };
    ConnectionsListComponent.prototype.getToken = function (connectionModels, connectWhenReady) {
        var _this = this;
        if (connectWhenReady === void 0) { connectWhenReady = false; }
        var nodeNames = connectionModels.map(function (c) { return c.name; });
        this.appContextService.authorizationManager.getNewToken(nodeNames).subscribe(function (token) {
            if (connectWhenReady) {
                var model = connectionModels.first();
                _this.pendingConnectToId = model.id;
                _this.pendingConnectToName = model.name;
            }
            if (token.appliesTo === null) {
                // The user opted to apply token to all nodes, so we need to refresh all nodes
                _this.refresh([]);
            }
            else {
                _this.refresh(connectionModels);
            }
        }, function (error) {
            Logging.log({
                level: LogLevel.Debug,
                message: Net.getErrorMessageWithoutStacktrace(error),
                params: null,
                source: 'sme-connections-list',
                stack: error ? error.stack : null
            });
        });
    };
    ConnectionsListComponent.prototype.showStatusSolution = function (connectionModel, connectWhenReady) {
        var _this = this;
        if (connectWhenReady === void 0) { connectWhenReady = false; }
        if (connectionModel.statusType === LiveConnectionStatusType.Unauthorized) {
            this.getToken([connectionModel], connectWhenReady);
        }
        else {
            if (connectionModel.loading) {
                // mark current active connection model to track.
                this.activeDialogConnectionModel = connectionModel;
            }
            this.dialogService.showMessage({
                buttonText: this.strings.Dialogs.Buttons.Close.label,
                message: connectionModel.statusDetails,
                title: connectionModel.statusLabel
            }).subscribe(function (result) {
                _this.activeDialogConnectionModel = null;
            });
        }
    };
    /**
     * displays confirmation dialog
     * @param title
     * @param message
     */
    ConnectionsListComponent.prototype.showConfirmationDialog = function (title, message) {
        return this.dialogService.showConfirmation({
            title: title,
            message: message,
            cancelButtonText: this.strings.dialogs.elevate.cancelButtonText,
            confirmButtonText: this.strings.dialogs.elevate.confirmButtonText
        });
    };
    ConnectionsListComponent.prototype.verifyStatusChange = function (connectionModel) {
        if (this.activeDialogConnectionModel
            && connectionModel.id === this.activeDialogConnectionModel.id
            && !connectionModel.loading) {
            // reset active dialog state.
            this.activeDialogConnectionModel = null;
            this.dialogService.hide(this.dialogService.commonIds.message);
            this.openDefaultAction(connectionModel, true);
        }
    };
    ConnectionsListComponent.prototype.startListening = function () {
        var _this = this;
        this.connectionsSubscription = this.appContextService.connectionStream.liveConnectionChanged
            .bufferTime(500)
            .filter(function (changes) { return changes.length > 0; })
            .subscribe(function (changes) {
            var _loop_1 = function (change) {
                var found = _this.masterConnections.find(function (model) { return model.id === change.liveConnection.connection.id; });
                _this.gettingStarted = false;
                switch (change.type) {
                    case LiveConnectionChangeType.Add:
                        if (found) {
                            _this.masterConnections.remove(found);
                        }
                        _this.masterConnections.push(_this.liveToModelConnection(change.liveConnection));
                        _this.sortRequired = true;
                        break;
                    case LiveConnectionChangeType.Remove:
                        if (found) {
                            _this.masterConnections.remove(found);
                        }
                        break;
                    case LiveConnectionChangeType.Update:
                        if (found) {
                            _this.sortRequired = _this.updateToModel(change.liveConnection, found) || _this.sortRequired;
                            _this.verifyStatusChange(found);
                            if (_this.pendingConnectToId
                                && found.id === _this.pendingConnectToId
                                && !found.loading) {
                                _this.openDefaultAction(found);
                                _this.pendingConnectToId = null;
                                _this.pendingConnectToName = null;
                            }
                        }
                        break;
                }
            };
            for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
                var change = changes_1[_i];
                _loop_1(change);
            }
            // filter after the change.
            _this.filterConnections();
            // recover the selection.
            if (_this.selectedConnections) {
                _this.selectedConnections = _this.connections.filter(function (server) {
                    return _this.selectedConnections.find(function (selected) { return selected.id === server.id; });
                });
            }
        });
    };
    /**
     * Create new model connection.
     * @param liveConnection the live connection.
     */
    ConnectionsListComponent.prototype.liveToModelConnection = function (liveConnection) {
        var statusType = LiveConnectionStatusType.Unknown;
        var statusLabel = this.strings.serverStatus.refreshing;
        var statusDetails = '';
        if (liveConnection.status) {
            statusType = liveConnection.status.type;
            statusLabel = liveConnection.status.label;
            statusDetails = liveConnection.status.details;
        }
        return {
            id: liveConnection.connection.id,
            name: liveConnection.connection.name,
            typeName: this.connectionsTypeNames[liveConnection.connection.type],
            typeIcon: this.connectionsIcons[liveConnection.connection.type],
            lastUpdated: new Date(liveConnection.lastUpdated).toLocaleString(),
            statusType: statusType,
            statusLabel: statusLabel,
            statusDetails: statusDetails,
            statusClass: this.getStatusClass(statusType, liveConnection.loading),
            user: this.getManagingAs(liveConnection),
            osName: null,
            loading: liveConnection.loading,
            connection: liveConnection.connection
        };
    };
    /**
     * Update the model connection. Watch the change and determine if sort is needed.
     * @param liveConnection the live connection.
     * @param model the model connection.
     */
    ConnectionsListComponent.prototype.updateToModel = function (liveConnection, model) {
        var sortRequired = false;
        var statusType = model.statusType;
        var statusLabel = this.strings.serverStatus.refreshing;
        var statusDetails = '';
        if (liveConnection.status) {
            statusType = liveConnection.status.type;
            statusLabel = liveConnection.status.label;
            statusDetails = liveConnection.status.details;
        }
        var lastUpdated = new Date(liveConnection.lastUpdated).toLocaleString();
        var statusClass = this.getStatusClass(statusType, liveConnection.loading);
        var user = this.getManagingAs(liveConnection);
        model.statusDetails = statusDetails;
        if (model.statusType !== statusType || model.loading !== liveConnection.loading) {
            model.statusType = statusType;
            model.statusLabel = statusLabel;
            model.statusClass = statusClass;
            if (this.lastSortEvent && this.lastSortEvent.field === 'status') {
                sortRequired = true;
            }
        }
        if (!model.user || model.user !== user) {
            model.user = user;
            if (this.lastSortEvent && this.lastSortEvent.field === 'manageAs') {
                sortRequired = true;
            }
        }
        model.lastUpdated = lastUpdated;
        model.loading = liveConnection.loading;
        if (this.lastSortEvent && this.lastSortEvent.field === 'lastUpdated') {
            sortRequired = true;
        }
        model.osName = null;
        model.connection = liveConnection.connection;
        return sortRequired;
    };
    ConnectionsListComponent.prototype.getStatusClass = function (statusType, loading) {
        var classes = 'status-icon sme-icon ';
        if (loading) {
            classes += 'sme-icon-sync color-info';
            return classes;
        }
        switch (statusType) {
            case LiveConnectionStatusType.Online:
                classes += 'sme-icon-accept color-success';
                break;
            case LiveConnectionStatusType.Warning:
                classes += 'sme-icon-warning color-warning';
                break;
            case LiveConnectionStatusType.Unauthorized:
                classes += 'sme-icon-lock color-error';
                break;
            case LiveConnectionStatusType.Error:
                classes += 'sme-icon-error color-error';
                break;
            case LiveConnectionStatusType.Fatal:
                classes += 'sme-icon-error color-error';
                break;
            case LiveConnectionStatusType.Unknown:
            default:
                classes += 'sme-icon-unknown color-info';
                break;
        }
        return classes;
    };
    ConnectionsListComponent.prototype.getSortableValue = function (connectionModel, field) {
        if (field === 'managingAs') {
            return connectionModel.user;
        }
        else if (field === 'name') {
            return connectionModel.name;
        }
        else if (field === 'lastUpdated') {
            return connectionModel.lastUpdated || '';
        }
        else if (field === 'status') {
            return connectionModel.statusLabel || '';
        }
        else if (field === 'typeDisplay') {
            return connectionModel.typeName;
        }
        return null;
    };
    ConnectionsListComponent.prototype.sortCollection = function (inputCollection, event) {
        var _this = this;
        if (event) {
            this.lastSortEvent = event;
        }
        else if (!this.sortRequired) {
            // don't sort if there is no change to the selected field.
            this.sortRequired = false;
            return inputCollection;
        }
        else if (this.lastSortEvent) {
            event = this.lastSortEvent;
        }
        else {
            event = { field: 'name', order: 1 };
        }
        inputCollection.sort(function (left, right) {
            var leftVal = _this.getSortableValue(left, event.field);
            var rightVal = _this.getSortableValue(right, event.field);
            return (leftVal > rightVal ? 1 : leftVal < rightVal ? -1 : 0) * (event.order || 1);
        });
        return inputCollection;
    };
    ConnectionsListComponent.prototype.checkSearchFilter = function (connectionModel, filter) {
        return connectionModel.statusLabel.toLocaleLowerCase().indexOf(filter) >= 0
            || connectionModel.name.toLocaleLowerCase().indexOf(filter) >= 0
            || connectionModel.typeName.toLocaleLowerCase().indexOf(filter) >= 0
            || (connectionModel.lastUpdated || '').toLocaleLowerCase().indexOf(filter) >= 0
            || connectionModel.user.toLocaleLowerCase().indexOf(filter) >= 0;
    };
    ConnectionsListComponent.prototype.filterConnections = function () {
        var _this = this;
        var filterCallbacks = [];
        // if there is a solution, apply its filters
        var connectionTypes = MsftSme.getValue(this.solution, 'connections.connectionTypes');
        if (connectionTypes && Array.isArray(connectionTypes) && connectionTypes.length > 0) {
            // use map for better lookup performance
            var connectionTypesMap_1 = {};
            connectionTypes.forEach(function (connectionType) { return connectionTypesMap_1[connectionType] = true; });
            filterCallbacks.push(function (connection) { return !!connectionTypesMap_1[connection.connection.type]; });
        }
        // if there is a search filter, apply it
        if (this.filter) {
            var lowerCaseFilter_1 = this.filter.toLocaleLowerCase();
            filterCallbacks.push(function (connection) { return _this.checkSearchFilter(connection, lowerCaseFilter_1); });
        }
        // sort and filter the connections such that a connection is shown only if every condition returns true.
        this.masterConnections = this.sortCollection(this.masterConnections);
        this.connections = this.masterConnections.filter(function (connection) { return filterCallbacks.every(function (filterCallBack) { return filterCallBack(connection); }); });
        this.dataTable.refreshData();
    };
    return ConnectionsListComponent;
}());
export { ConnectionsListComponent };
ConnectionsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-connections-list',
                template: "\n      <sme-master-view [showFilter]=\"false\" [total]=\"connections ? connections.length : 0\" [(selection)]=\"selectedConnections\"\n        (refresh)=\"refresh(selectedConnections)\" (clearSelection)=\"selectedConnections = null\">\n        <sme-action-bar>\n          <sme-action-button #action [text]=\"strings.actions.add\" [iconClass]=\"'sme-icon sme-icon-add'\" (execute)=\"addConnection()\"></sme-action-button>\n          <sme-action-button #action [text]=\"strings.actions.connect\" [iconClass]=\"'sme-icon sme-icon-toolbox'\" [enabled]=\"!!selectedConnections && selectedConnections.length == 1\"\n            (execute)=\"openDefaultAction(selectedConnections[0], true)\"></sme-action-button>\n          <sme-action-button #action [text]=\"strings.actions.manageAs\" [iconClass]=\"'sme-icon sme-icon-manage'\" [enabled]=\"!!selectedConnections && selectedConnections.length > 0\"\n            (execute)=\"getToken(selectedConnections)\"></sme-action-button>\n          <sme-action-button #action [text]=\"strings.actions.remove\" [iconClass]=\"'sme-icon sme-icon-delete'\" [enabled]=\"!!selectedConnections && selectedConnections.length > 0\"\n            (execute)=\"removeConnection(selectedConnections)\"></sme-action-button>\n        </sme-action-bar>\n\n        <input #search type=\"search\" name=\"connectionsFilter\" [placeholder]=\"strings.actions.search.placeholder\" autofocus [formControl]=\"filterInput\"\n        />\n        <sme-loading-wheel *ngIf=\"pendingConnectToId\" [message]=\"strings.listStatus.message | smeFormat:pendingConnectToName\"></sme-loading-wheel>\n        <div class=\"getting-started\" *ngIf=\"connectionsReady && (!connections || connections.length <= 0) && gettingStarted\">\n          <h5>{{strings.gettingStarted.title.format | smeFormat:shellStrings.applicationTitle}}</h5>\n        </div>\n        <!-- <p-dataTable #dataTable [value]=\"connections\" selectionMode=\"multiple\" sortMode=\"single\" sortField=\"name\" [(selection)]=\"selectedConnections\"\n          [sortOrder]=\"1\" [class.hideNoData]=\"connectionsReady && (!connections || connections.length <= 0) && gettingStarted\" (onRowDblclick)=\"openDefaultAction($event.data)\"\n          [emptyMessage]=\"connectionsReady ? strings.empty.none : strings.empty.loading\" scrollable=\"true\" class=\"scrollable\">\n\n          <p-column selectionMode=\"multiple\">\n          </p-column>\n\n          <p-column field=\"name\" header=\"{{strings.nodeNameHeader}}\" sortable=\"custom\" (sortFunction)=\"sort($event)\">\n            <ng-template let-data=\"rowData\" pTemplate=\"body\">\n              <div [title]=\"data.name\">\n                <span [ngClass]=\"['status-icon sme-icon', data.typeIcon]\"></span>\n                <a [class.discrete]=\"data.statusType >= 2\" (click)=\"openDefaultAction(data, true)\">{{data.name}}</a>\n              </div>\n            </ng-template>\n          </p-column>\n\n          <p-column field=\"typeDisplay\" header=\"{{strings.nodeTypeHeader}}\" sortable=\"custom\" (sortFunction)=\"sort($event)\">\n            <ng-template let-data=\"rowData\" pTemplate=\"body\">\n              <span [title]=\"data.typeName\">{{data.typeName}}</span>\n            </ng-template>\n          </p-column>\n\n          <p-column field=\"status\" header=\"{{strings.nodeStatusHeader}}\" sortable=\"custom\" (sortFunction)=\"sort($event)\">\n            <ng-template let-data=\"rowData\" pTemplate=\"body\">\n              <div [title]=\"data.statusLabel\">\n                <span [ngClass]=\"data.statusClass\"></span>\n                <a [class.discrete]=\"data.statusType === 0\" (click)=\"openDefaultAction(data)\">{{data.statusLabel}}</a>\n              </div>\n            </ng-template>\n          </p-column>\n\n          <p-column field=\"lastUpdated\" header=\"{{strings.nodeLastUpdatedHeader}}\" sortable=\"custom\" (sortFunction)=\"sort($event)\">\n            <ng-template let-data=\"rowData\" pTemplate=\"body\">\n              <span [title]=\"data.lastUpdated\">{{data.lastUpdated}}</span>\n            </ng-template>\n          </p-column>\n\n          <p-column field=\"managingAs\" header=\"{{strings.nodeManagingAsHeader}}\" sortable=\"custom\" (sortFunction)=\"sort($event)\">\n            <ng-template let-data=\"rowData\" pTemplate=\"body\">\n              <span [title]=\"data.user\">{{data.user}}</span>\n            </ng-template>\n          </p-column>\n\n        </p-dataTable> -->\n\n        <sme-data-table #smeDataTable [items]=\"connections\" selectionMode=\"multiple\" [(selection)]=\"selectedConnections\" [defaultSortColumn]=\"defaultSortColumn\"\n          [defaultSortMode]=\"1\" [class.hideNoData]=\"connectionsReady && (!connections || connections.length <= 0) && gettingStarted\"\n          (onRowDblclick)=\"openDefaultAction($event.data)\" [loadingMessage]=\"strings.empty.loading\" [noRecordMessage]=\"strings.empty.none\">\n\n          <sme-data-table-column #defaultSortColumn field=\"name\" header=\"{{strings.nodeNameHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n            <ng-template let-data>\n              <div [title]=\"data.name\">\n                <span [ngClass]=\"['status-icon sme-icon', data.typeIcon]\"></span>\n                <a (click)=\"openDefaultAction(data, true)\">{{data.name}}</a>\n              </div>\n            </ng-template>\n          </sme-data-table-column>\n\n          <sme-data-table-column field=\"typeDisplay\" header=\"{{strings.nodeTypeHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n            <ng-template let-data>\n              <span [title]=\"data.typeName\">{{data.typeName}}</span>\n            </ng-template>\n          </sme-data-table-column>\n\n          <sme-data-table-column field=\"status\" header=\"{{strings.nodeStatusHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n            <ng-template let-data>\n              <div [title]=\"data.statusLabel\">\n                <span [ngClass]=\"data.statusClass\"></span>\n                <a (click)=\"openDefaultAction(data)\">{{data.statusLabel}}</a>\n              </div>\n            </ng-template>\n          </sme-data-table-column>\n\n          <sme-data-table-column field=\"lastUpdated\" header=\"{{strings.nodeLastUpdatedHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n            <ng-template let-data>\n              <span [title]=\"data.lastUpdated\">{{data.lastUpdated}}</span>\n            </ng-template>\n          </sme-data-table-column>\n\n          <sme-data-table-column field=\"managingAs\" header=\"{{strings.nodeManagingAsHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n            <ng-template let-data>\n              <span [title]=\"data.user\">{{data.user}}</span>\n            </ng-template>\n          </sme-data-table-column>\n\n          <!--<p-column field=\"attributes\" header=\"{{strings.connectionAttributesHeader}}\" [sortable]=\"true\"></p-column>-->\n        </sme-data-table>\n\n      </sme-master-view>\n    ",
                styles: ["\n      .status-icon:before{\n          line-height: 1;\n          vertical-align: bottom;\n      }\n\n      .status-icon {\n          display: inline-block;\n          width: 16px;\n          line-height: 16px;\n          margin-right: 5px;\n      }\n\n      .getting-started {\n          z-index: 1;\n          margin: 24px 34px;\n      }\n\n      .getting-started-image {\n          margin: 24px;\n          height: 70px;\n          color: #0078d7;\n          font-size: 15px;\n      }\n\n      .getting-started-add-action-bar {\n          align-self: flex-end;\n          margin-bottom: 4px;\n          margin-left: 5px;\n      }\n\n      .getting-started-add-action-bar:before {\n          margin-right: 10px;\n      }\n\n      .getting-started-add-header {\n          align-self: flex-end;\n          height: 36px;\n          width: 36px;\n          background: #0078d7;\n          color: white;\n          vertical-align: middle;\n          margin-left: 90px;\n          margin-right: 5px;\n      }\n\n      .getting-started-add-header:before {\n          width: 100%;\n          vertical-align: middle;\n          line-height: 36px;\n          text-align: center;\n      }\n\n      :host >>> p-dataTable.hideNoData thead {\n          border-bottom: 1px solid #ccc;\n      }\n\n      :host >>> p-dataTable.hideNoData tbody {\n          display: none;\n      }\n\n\n      :host >>> .ui-state-highlight .color-info,\n      :host >>> .ui-state-highlight .color-success,\n      :host >>> .ui-state-highlight .color-error,\n      :host >>> .ui-state-highlight .color-warning{\n          color: #242424;\n      }\n\n      :host >>> .ui-state-highlight a {\n          text-decoration: underline;\n      }\n\n      :host >>> .ui-state-highlight a:hover,\n      :host >>> .ui-state-highlight a:active,\n      :host >>> .ui-state-highlight a:focus {\n          text-decoration: none;\n      }\n\n      :host >>> button {\n          min-width: 0px !important;\n      }\n\n      /* primeng checkbox background color override\n         primeng override css doesn't take the same */\n      :host >>> div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default.ui-state-active {\n          border: 1px solid transparent;\n          background-color: transparent;\n      }\n\n      :host >>> th div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default {\n          border: 1px solid;\n      }\n\n      :host >>> div.ui-chkbox {\n          max-width: 13.5px\n      }\n\n      :host >>> a {\n          color: #0078d7;\n      }\n\n      :host >>> a:hover {\n          text-decoration: underline;\n      }\n\n      :host >>> .ui-datatable thead th.ui-selection-column:first-of-type,\n      :host >>> p-dataTable tr.ui-widget-content td.ui-selection-column:first-of-type {\n          padding-left: 34px !important;\n          width: 26px !important;\n          padding-right: 14px;\n      }\n\n      :host >>> p-dataTable th:nth-child(2) .ui-column-title {\n          padding-left: 24px;\n      }\n\n      :host >>> sme-data-table .header table thead tr th.first,\n      :host >>> sme-data-table .item td.first,\n      :host >>> sme-data-table .item.no-data .prefix {\n          width:50px !important;\n      }\n\n      :host >>> sme-data-table .header table thead tr th.first,\n      :host >>> sme-data-table .item td.first .cell-data{\n          padding-left: 35px !important;\n      }\n    "]
            },] },
];
/** @nocollapse */
ConnectionsListComponent.ctorParameters = function () { return [
    null,
    null,
    null,
    { type: Router, },
]; };
ConnectionsListComponent.propDecorators = {
    'solution': [{ type: Input },],
    'dataTable': [{ type: ViewChild, args: ['smeDataTable',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLWxpc3QvY29ubmVjdGlvbnMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBeUIsS0FBQSxFQUEwQixTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBQzdGLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQTBCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBQ2pFLE9BQU8sRUFBYSxVQUFBLEVBQWtDLE1BQU8sTUFBQSxDQUFPO0FBQ3BFLE9BQU8sRUFFSCxhQUFhLEVBT2hCLE1BQU0scUJBQUEsQ0FBc0I7QUFDN0IsT0FBTyxFQUlILHVCQUF1QixFQUN2QixpQkFBaUIsRUFHakIscUJBQXFCLEVBR3JCLHdCQUF3QixFQUV4Qix3QkFBd0IsRUFDeEIsT0FBTyxFQUNQLFFBQVEsRUFDUixHQUFHLEVBQ0gsaUJBQWlCLEVBRXBCLE1BQU0sa0JBQUEsQ0FBbUI7QUFFMUIsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLGdDQUFBLENBQWlDO0FBQzlELE9BQU8sRUFBRSw0QkFBQSxFQUE2QixNQUFPLHFFQUFBLENBQXNFO0FBNEJuSDtJQTZDSSxrQ0FDWSxpQkFBb0MsRUFDcEMsYUFBNEIsRUFDNUIsZUFBZ0MsRUFDaEMsTUFBYztRQUoxQixpQkFJK0I7UUFIbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWpDbkIsWUFBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQzNFLGlCQUFZLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFHMUUsd0JBQW1CLEdBQXNCLEVBQUUsQ0FBQztRQU01QyxnQkFBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDaEMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLHFCQUFnQixHQUE4QixFQUFFLENBQUM7UUFDakQseUJBQW9CLEdBQThCLEVBQUUsQ0FBQztRQUlwRCxzQkFBaUIsR0FBc0IsRUFBRSxDQUFDO1FBRzFDLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBdVFyQix3QkFBbUIsR0FBRyxVQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsS0FBYTtZQUN2RCxJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUE7SUEvUDZCLENBQUM7SUEvQy9CLHNCQUFXLDhDQUFRO2FBTW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDO2FBUkQsVUFBb0IsUUFBYTtZQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFtQ2Esd0NBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUNsRixDQUFDO0lBUU0sMkNBQVEsR0FBZjtRQUFBLGlCQTRDQztRQTNDRyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1lBQzNFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RILEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUZBQW1GO1FBQ25GLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7YUFDN0QsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNULEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWpCLDhDQUE4QztZQUM5QyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQztRQUM1RSxDQUFDLENBQUM7YUFDRCxTQUFTLENBQ1YsVUFBQSxlQUFlO1lBQ1gsOEVBQThFO1lBQzlFLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7WUFDdkYsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUNqQyxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxHQUFHLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxDQUFDO2dCQUNwRCxRQUFRLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQzdCLEtBQUssRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzthQUN2QyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7YUFDbEQsWUFBWSxDQUFDLEdBQUcsQ0FBQzthQUNqQixTQUFTLENBQUMsVUFBQSxXQUFXO1lBQ2xCLEtBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0I7YUFDOUYsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNQLFNBQVMsQ0FBQyxVQUFBLFdBQVc7WUFDbEIsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLDhDQUFXLEdBQWxCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLENBQUM7UUFFRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBTyxHQUFkLFVBQWUsZ0JBQW9DO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BGLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLGdEQUFhLEdBQXBCO1FBQ0ksSUFBSSxlQUFlLEdBQWEsRUFBRSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7UUFDaEUsQ0FBQztRQUNELDRCQUE0QixDQUFDLGFBQWEsQ0FDdEMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUN0QixJQUFJLENBQUMsZUFBZSxFQUNwQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxtREFBZ0IsR0FBdkIsVUFBd0IsZ0JBQW1DO1FBQTNELGlCQWtDQztRQWpDRyxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckcsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RyxDQUFDO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDeEMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtZQUM5RCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsaUJBQWlCO1NBQ25FLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO1lBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMxRyxDQUFDO1lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNSLFVBQUEsTUFBTTtZQUNGLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUNoRCxDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLE9BQU8sRUFBRSxHQUFHLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxDQUFDO2dCQUNwRCxRQUFRLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQzdCLEtBQUssRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO2FBQy9FLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLG9EQUFpQixHQUF4QixVQUF5QixlQUFnQyxFQUFFLGdCQUF3QjtRQUF4QixpQ0FBQSxFQUFBLHdCQUF3QjtRQUMvRSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDL0QsQ0FBQztJQUNMLENBQUM7SUFFTSxpREFBYyxHQUFyQixVQUFzQixlQUFnQztRQUF0RCxpQkF3REM7UUF2REcseUJBQXlCO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEtBQUs7ZUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUMvRSxDQUFDO1FBRUQsSUFBSSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMxRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyx1QkFBdUIsQ0FBQyxhQUFhO2VBQ3pGLDBCQUEwQjtlQUMxQiwwQkFBMEIsQ0FBQyxhQUFhLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUNyQixPQUFPLEVBQUUsOEVBQThFO2dCQUN2RixNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEVBQUUsc0JBQXNCO2FBQ2pDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUNwQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2lCQUNwRyxTQUFTLENBQ1YsVUFBQyxFQUFRO29CQUFQLGNBQU07Z0JBQ0osSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQztnQkFFL0QsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsWUFBWSxDQUFDLG9CQUFvQixDQUM3QixLQUFJLENBQUMsTUFBTSxFQUNYLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUMvQixlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksRUFDL0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksWUFBWSxHQUFHLEtBQUksQ0FBQyxzQkFBc0IsQ0FDMUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUNoRCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDeEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQU87d0JBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUNwQixLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FDNUQsVUFBQyxNQUFNO2dDQUNILFlBQVksQ0FBQyxvQkFBb0IsQ0FDN0IsS0FBSSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksRUFDNUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUN4RCxDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDLEVBQ0QsVUFBQyxLQUFnQjtnQkFDYixLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2RyxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFlBQVksQ0FBQyxvQkFBb0IsQ0FDN0IsSUFBSSxDQUFDLE1BQU0sRUFDWCxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksRUFDL0IsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVNLGdEQUFhLEdBQXBCLFVBQXFCLGNBQThCO1FBQy9DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7ZUFDM0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztRQUNqRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzFCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU0sMkNBQVEsR0FBZixVQUFnQixnQkFBbUMsRUFBRSxnQkFBd0I7UUFBN0UsaUJBeUJDO1FBekJvRCxpQ0FBQSxFQUFBLHdCQUF3QjtRQUN6RSxJQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUN4RSxVQUFBLEtBQUs7WUFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNyQyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDM0MsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsOEVBQThFO2dCQUM5RSxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNMLENBQUMsRUFDRCxVQUFBLEtBQUs7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztnQkFDckIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUM7Z0JBQ3BELE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxzQkFBc0I7Z0JBQzlCLEtBQUssRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJO2FBQ3BDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLHFEQUFrQixHQUF6QixVQUEwQixlQUFnQyxFQUFFLGdCQUF3QjtRQUFwRixpQkFpQkM7UUFqQjJELGlDQUFBLEVBQUEsd0JBQXdCO1FBQ2hGLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEtBQUssd0JBQXdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsaURBQWlEO2dCQUNqRCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsZUFBZSxDQUFDO1lBQ3ZELENBQUM7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztnQkFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFDcEQsT0FBTyxFQUFFLGVBQWUsQ0FBQyxhQUFhO2dCQUN0QyxLQUFLLEVBQUUsZUFBZSxDQUFDLFdBQVc7YUFDckMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQ2YsS0FBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBUUQ7Ozs7T0FJRztJQUNLLHlEQUFzQixHQUE5QixVQUErQixLQUFhLEVBQUUsT0FBZTtRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN2QyxLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0I7WUFDL0QsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQjtTQUNwRSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8scURBQWtCLEdBQTFCLFVBQTJCLGVBQWdDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkI7ZUFDN0IsZUFBZSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsMkJBQTJCLENBQUMsRUFBRTtlQUMxRCxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlCLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNMLENBQUM7SUFFTyxpREFBYyxHQUF0QjtRQUFBLGlCQW9EQztRQW5ERyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLHFCQUFxQjthQUN2RixVQUFVLENBQUMsR0FBRyxDQUFDO2FBQ2YsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUM7YUFDckMsU0FBUyxDQUFDLFVBQUEsT0FBTztvQ0FDTCxNQUFNO2dCQUNYLElBQUksS0FBSyxHQUFvQixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQWhELENBQWdELENBQUMsQ0FBQztnQkFDcEgsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNsQixLQUFLLHdCQUF3QixDQUFDLEdBQUc7d0JBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ1IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDekMsQ0FBQzt3QkFFRCxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFDL0UsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7d0JBQ3pCLEtBQUssQ0FBQztvQkFDVixLQUFLLHdCQUF3QixDQUFDLE1BQU07d0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ1IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDekMsQ0FBQzt3QkFFRCxLQUFLLENBQUM7b0JBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxNQUFNO3dCQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNSLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUM7NEJBQzFGLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFFL0IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGtCQUFrQjttQ0FDcEIsS0FBSyxDQUFDLEVBQUUsS0FBSyxLQUFJLENBQUMsa0JBQWtCO21DQUNwQyxDQUFDLEtBQUssQ0FBQyxPQUNkLENBQUMsQ0FBQyxDQUFDO2dDQUNDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDOUIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQ0FDL0IsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQzs0QkFDckMsQ0FBQzt3QkFDTCxDQUFDO3dCQUVELEtBQUssQ0FBQztnQkFDZCxDQUFDO1lBQ0wsQ0FBQztZQW5DRCxHQUFHLENBQUMsQ0FBZSxVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQXJCLElBQUksTUFBTSxnQkFBQTt3QkFBTixNQUFNO2FBbUNkO1lBRUQsMkJBQTJCO1lBQzNCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRXpCLHlCQUF5QjtZQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQSxNQUFNO29CQUNyRCxNQUFNLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO2dCQUNoRixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7O09BR0c7SUFDSyx3REFBcUIsR0FBN0IsVUFBOEIsY0FBOEI7UUFDeEQsSUFBSSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsT0FBTyxDQUFDO1FBQ2xELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUN2RCxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEIsVUFBVSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3hDLFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMxQyxhQUFhLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbEQsQ0FBQztRQUVELE1BQU0sQ0FBa0I7WUFDcEIsRUFBRSxFQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoQyxJQUFJLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJO1lBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDbkUsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMvRCxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsRUFBRTtZQUNsRSxVQUFVLEVBQUUsVUFBVTtZQUN0QixXQUFXLEVBQUUsV0FBVztZQUN4QixhQUFhLEVBQUUsYUFBYTtZQUM1QixXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUNwRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7WUFDeEMsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU87WUFDL0IsVUFBVSxFQUFFLGNBQWMsQ0FBQyxVQUFVO1NBQ3hDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGdEQUFhLEdBQXJCLFVBQXNCLGNBQThCLEVBQUUsS0FBc0I7UUFDeEUsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBQ3ZELElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixVQUFVLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDeEMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzFDLGFBQWEsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNsRCxDQUFDO1FBRUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTlDLEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUUsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDOUIsS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDaEMsS0FBSyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7UUFFRCxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNoQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ25FLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUVELEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUU3QyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxpREFBYyxHQUF0QixVQUF1QixVQUFvQyxFQUFFLE9BQWdCO1FBQ3pFLElBQUksT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDVixPQUFPLElBQUksMEJBQTBCLENBQUM7WUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLHdCQUF3QixDQUFDLE1BQU07Z0JBQ2hDLE9BQU8sSUFBSSwrQkFBK0IsQ0FBQztnQkFDM0MsS0FBSyxDQUFDO1lBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxPQUFPO2dCQUNqQyxPQUFPLElBQUksZ0NBQWdDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQXdCLENBQUMsWUFBWTtnQkFDdEMsT0FBTyxJQUFJLDJCQUEyQixDQUFDO2dCQUN2QyxLQUFLLENBQUM7WUFDVixLQUFLLHdCQUF3QixDQUFDLEtBQUs7Z0JBQy9CLE9BQU8sSUFBSSw0QkFBNEIsQ0FBQztnQkFDeEMsS0FBSyxDQUFDO1lBQ1YsS0FBSyx3QkFBd0IsQ0FBQyxLQUFLO2dCQUMvQixPQUFPLElBQUksNEJBQTRCLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztZQUNWLEtBQUssd0JBQXdCLENBQUMsT0FBTyxDQUFDO1lBQ3RDO2dCQUNJLE9BQU8sSUFBSSw2QkFBNkIsQ0FBQztnQkFDekMsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVPLG1EQUFnQixHQUF4QixVQUF5QixlQUFnQyxFQUFFLEtBQWE7UUFDcEUsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxpREFBYyxHQUF0QixVQUF1QixlQUFrQyxFQUFFLEtBQWlCO1FBQTVFLGlCQW9CQztRQW5CRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzVCLDBEQUEwRDtZQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUVELGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUM3QixJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUVPLG9EQUFpQixHQUF6QixVQUEwQixlQUFnQyxFQUFFLE1BQWM7UUFDdEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztlQUNwRSxlQUFlLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7ZUFDN0QsZUFBZSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2VBQ2pFLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2VBQzVFLGVBQWUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyxvREFBaUIsR0FBekI7UUFBQSxpQkFzQkM7UUFyQkcsSUFBSSxlQUFlLEdBQThDLEVBQUUsQ0FBQztRQUVwRSw0Q0FBNEM7UUFDNUMsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBVyxJQUFJLENBQUMsUUFBUSxFQUFFLDZCQUE2QixDQUFDLENBQUM7UUFDL0YsRUFBRSxDQUFDLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLHdDQUF3QztZQUN4QyxJQUFJLG9CQUFrQixHQUErQixFQUFFLENBQUM7WUFDeEQsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFBLGNBQWMsSUFBSSxPQUFBLG9CQUFrQixDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO1lBQ3JGLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxDQUFDLENBQUMsb0JBQWtCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFRCx3Q0FBd0M7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLGlCQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3RELGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGlCQUFlLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFFRCx3R0FBd0c7UUFDeEcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFVBQUEsVUFBVSxJQUFJLE9BQUEsZUFBZSxDQUFDLEtBQUssQ0FBQyxVQUFBLGNBQWMsSUFBSSxPQUFBLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxFQUFuRSxDQUFtRSxDQUFDLENBQUM7UUFDcEksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBOFBMLCtCQUFDO0FBQUQsQ0FuekJBLEFBbXpCQzs7QUE3UE0sbUNBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsazZOQTRHVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxzekdBK0hSLENBQUM7YUFDTCxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsdUNBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztDQUNmLEVBTDZGLENBSzdGLENBQUM7QUFDSyx1Q0FBYyxHQUEyQztJQUNoRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM5QixXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFHLEVBQUUsRUFBRTtDQUM1RCxDQUFDIiwiZmlsZSI6ImNvbm5lY3Rpb25zLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==