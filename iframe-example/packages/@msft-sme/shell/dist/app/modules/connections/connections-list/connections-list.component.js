import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertBarService, AlertSeverity, AppContextService, DialogService } from '../../../../angular';
import { ConnectionChangeType, connectionTypeConstants, EnvironmentModule, Globalization, LiveConnectionStatusType, Logging, LogLevel, Net, NotificationState } from '../../../../core';
import { ShellService } from '../../../shell.service';
import { RouteHelpers } from '../../../utility/route-helpers';
import { AddConnectionDialogComponent } from '../../dialogs/add-connection-dialog/add-connection-dialog.component';
import { EditTagsDialogComponent } from '../../dialogs/edit-tags-dialog/edit-tags-dialog.component';
import { LoadingConnectionDialogComponent } from '../../dialogs/loading-connection-dialog/loading-connection-dialog.component';
var ConnectionsListComponent = /** @class */ (function () {
    function ConnectionsListComponent(appContextService, shellService, dialogService, alertBarService, router) {
        var _this = this;
        this.appContextService = appContextService;
        this.shellService = shellService;
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
            _this.startListening();
            return _this.appContextService.connectionManager.restoreConnections();
        })
            .subscribe(function (connections) {
            // get live connections from cache. masterConnections include all connections.
            _this.masterConnections = connections.map(function (connection) { return _this.dataToModelConnection(connection); });
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
    /**
     * Shows the user the edit tags dialog
     * @param connectionModels the connection models to edit tags for
     */
    ConnectionsListComponent.prototype.editConnectionTags = function (connectionModels) {
        var _this = this;
        var connections = connectionModels.map(function (m) { return m.connection; });
        this.dialogService.show(EditTagsDialogComponent.dialogComponentId, { connections: connections }).subscribe(function (result) {
            _this.activeDialogConnectionModel = null;
        });
    };
    ConnectionsListComponent.prototype.openDefaultAction = function (connectionModel, connectWhenReady) {
        var _this = this;
        if (connectWhenReady === void 0) { connectWhenReady = false; }
        this.activeDialogConnectionModel = connectionModel;
        this.dialogService.show(LoadingConnectionDialogComponent.dialogComponentId, {}).subscribe(function (result) {
            _this.activeDialogConnectionModel = null;
        });
        this.appContextService.connectionStream.getLiveConnection(connectionModel.connection).subscribe(function (liveConnection) {
            _this.updateToModel(liveConnection, connectionModel);
            if (_this.activeDialogConnectionModel
                && connectionModel.id === _this.activeDialogConnectionModel.id
                && !connectionModel.loading) {
                if (connectionModel.statusType === LiveConnectionStatusType.Unauthorized) {
                    _this.closeLoadingConnectionDialog();
                    _this.getToken([connectionModel], connectWhenReady);
                }
                else if (connectionModel.statusType <= LiveConnectionStatusType.Warning) {
                    _this.openConnection(connectionModel);
                }
                else {
                    _this.closeLoadingConnectionDialog();
                    _this.dialogService.showMessage({
                        buttonText: _this.strings.Dialogs.Buttons.Close.label,
                        message: liveConnection.status.details,
                        title: liveConnection.status.label
                    }).subscribe(function (result) {
                        _this.activeDialogConnectionModel = null;
                    });
                }
            }
        });
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
                source: 'sme-connections-list'
            });
            this.statusSubscription = this.shellService.inventoryCaches.gatewayCache.createObservable({})
                .subscribe(function (instance) {
                if (_this.activeDialogConnectionModel) {
                    _this.closeLoadingConnectionDialog();
                    if (instance.isGatewayProcessElevated) {
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
                }
            }, function (error) {
                _this.appContextService.notification.alert('', NotificationState.Error, Net.getErrorMessage(error));
            });
        }
        else {
            this.closeLoadingConnectionDialog();
            RouteHelpers.navigateToConnection(this.router, connectionModel.connection.type, connectionModel.connection.name, this.solution);
        }
    };
    ConnectionsListComponent.prototype.getManagingAs = function (connection) {
        var token = this.appContextService.authorizationManager.nodeTokens[connection.name]
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
                _this.openConnection(model);
            }
            var connectionModelsToUpdate = [];
            if (token.appliesTo === null) {
                // The user opted to apply token to all nodes, so we need to refresh all nodes
                _this.refresh([]);
                connectionModelsToUpdate = _this.connections;
            }
            else {
                connectionModelsToUpdate = connectionModels;
                _this.refresh(connectionModels);
            }
            connectionModelsToUpdate.forEach(function (item) {
                item.user = _this.getManagingAs(item.connection);
            });
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
    ConnectionsListComponent.prototype.startListening = function () {
        var _this = this;
        this.appContextService.connectionManager.connectionsChanged
            .filter(function (event) { return event.type === ConnectionChangeType.Added || event.type === ConnectionChangeType.Removed; })
            .bufferTime(500)
            .filter(function (changes) { return changes.length > 0; })
            .subscribe(function (changes) {
            var _loop_1 = function (change) {
                var currentConnection = change.connection;
                var found = _this.masterConnections.find(function (model) { return model.id === currentConnection.id; });
                _this.gettingStarted = false;
                switch (change.type) {
                    case ConnectionChangeType.Added:
                        if (found) {
                            _this.masterConnections.remove(found);
                        }
                        _this.masterConnections.push(_this.dataToModelConnection(currentConnection));
                        _this.sortRequired = true;
                        break;
                    case ConnectionChangeType.Removed:
                        if (found) {
                            _this.masterConnections.remove(found);
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
    ConnectionsListComponent.prototype.dataToModelConnection = function (connection) {
        var statusType = LiveConnectionStatusType.Unknown;
        var statusLabel = this.strings.serverStatus.connecting;
        var statusDetails = '';
        return {
            id: connection.id,
            name: connection.name,
            typeName: this.connectionsTypeNames[connection.type],
            typeIcon: this.connectionsIcons[connection.type],
            lastUpdated: this.getLastUpdateTime(connection),
            statusType: statusType,
            statusLabel: statusLabel,
            statusDetails: statusDetails,
            statusClass: this.getStatusClass(statusType, true),
            user: this.getManagingAs(connection),
            osName: null,
            loading: true,
            connection: connection
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
        var statusLabel = this.strings.serverStatus.connecting;
        var statusDetails = '';
        if (liveConnection.status) {
            statusType = liveConnection.status.type;
            statusLabel = liveConnection.status.label;
            statusDetails = liveConnection.status.details;
        }
        var lastUpdated = this.getLastUpdateTime(liveConnection.connection);
        var statusClass = this.getStatusClass(statusType, liveConnection.loading);
        var user = this.getManagingAs(liveConnection.connection);
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
            || connectionModel.user.toLocaleLowerCase().indexOf(filter) >= 0
            || (connectionModel.connection.tags && connectionModel.connection.tags.some(function (tag) { return tag.indexOf(filter) >= 0; }));
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
    ConnectionsListComponent.prototype.getLastUpdateTime = function (connection) {
        return (connection.properties
            && connection.properties.lastUpdatedTime
            && Globalization.dateTimeOnly(new Date(connection.properties.lastUpdatedTime)))
            || this.strings.neverConnectedText;
    };
    ConnectionsListComponent.prototype.closeLoadingConnectionDialog = function () {
        this.activeDialogConnectionModel = null;
        this.dialogService.hide(LoadingConnectionDialogComponent.dialogComponentId);
    };
    ConnectionsListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-connections-list',
                    template: "\n      <sme-master-view [showFilter]=\"false\" [total]=\"connections ? connections.length : 0\" [(selection)]=\"selectedConnections\" (refresh)=\"refresh(selectedConnections)\" (clearSelection)=\"selectedConnections = null\">\n          <sme-action-bar>\n              <sme-action-button #action [text]=\"strings.actions.add\" [iconClass]=\"'sme-icon sme-icon-add'\" (execute)=\"addConnection()\"></sme-action-button>\n              <sme-action-button #action [text]=\"strings.actions.connect\" [iconClass]=\"'sme-icon sme-icon-toolbox'\" [enabled]=\"!!selectedConnections && selectedConnections.length == 1\" (execute)=\"openDefaultAction(selectedConnections[0], true)\"></sme-action-button>\n              <sme-action-button #action [text]=\"strings.actions.manageAs\" [iconClass]=\"'sme-icon sme-icon-manage'\" [enabled]=\"!!selectedConnections && selectedConnections.length > 0\" (execute)=\"getToken(selectedConnections)\"></sme-action-button>\n              <sme-action-button #action [text]=\"strings.actions.remove\" [iconClass]=\"'sme-icon sme-icon-delete'\" [enabled]=\"!!selectedConnections && selectedConnections.length > 0\" (execute)=\"removeConnection(selectedConnections)\"></sme-action-button>\n              <sme-action-button #action [text]=\"strings.actions.editTags\" [iconClass]=\"'sme-icon sme-icon-edit'\" [enabled]=\"!!selectedConnections && selectedConnections.length > 0\" (execute)=\"editConnectionTags(selectedConnections)\"></sme-action-button>\n          </sme-action-bar>\n\n          <input #search type=\"search\" name=\"connectionsFilter\" [placeholder]=\"strings.actions.search.placeholder\" autofocus [formControl]=\"filterInput\" role=\"search\"/>\n          <sme-loading-wheel *ngIf=\"pendingConnectToId\" [message]=\"strings.listStatus.message | smeFormat:pendingConnectToName\"></sme-loading-wheel>\n          <div class=\"getting-started\" *ngIf=\"connectionsReady && (!connections || connections.length <= 0) && gettingStarted\">\n              <h5>{{strings.gettingStarted.title.format | smeFormat:shellStrings.applicationTitle}}</h5>\n          </div>\n\n          <sme-data-table #smeDataTable [items]=\"connections\" selectionMode=\"multiple\" [(selection)]=\"selectedConnections\" [defaultSortColumn]=\"defaultSortColumn\" [defaultSortMode]=\"1\" [class.hideNoData]=\"connectionsReady && (!connections || connections.length <= 0) && gettingStarted\"\n              (onRowDblclick)=\"openDefaultAction($event.data)\" [loadingMessage]=\"strings.empty.loading\" [noRecordMessage]=\"strings.empty.none\">\n\n              <sme-data-table-column #defaultSortColumn field=\"name\" header=\"{{strings.nodeNameHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n                  <ng-template let-data>\n                      <div [title]=\"data.name\">\n                          <span [ngClass]=\"['status-icon sme-icon', data.typeIcon]\"></span>\n                          <a (click)=\"openDefaultAction(data, true)\" tabindex=\"0\" class=\"sme-link\">{{data.name}}</a>\n                      </div>\n                  </ng-template>\n              </sme-data-table-column>\n\n              <sme-data-table-column field=\"typeDisplay\" header=\"{{strings.nodeTypeHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n                  <ng-template let-data>\n                      <span [title]=\"data.typeName\">{{data.typeName}}</span>\n                  </ng-template>\n              </sme-data-table-column>\n\n              <sme-data-table-column field=\"lastUpdated\" header=\"{{strings.nodeLastConnectedHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n                  <ng-template let-data>\n                      <span [title]=\"data.lastUpdated\">{{data.lastUpdated}}</span>\n                  </ng-template>\n              </sme-data-table-column>\n\n              <sme-data-table-column field=\"managingAs\" header=\"{{strings.nodeManagingAsHeader}}\" sortable=\"custom\" [compareFunction]=\"sortCompareFunction\">\n                  <ng-template let-data>\n                      <span [title]=\"data.user\">{{data.user}}</span>\n                  </ng-template>\n              </sme-data-table-column>\n\n              <sme-data-table-column field=\"tags\" header=\"{{strings.nodeTagsHeader}}\">\n                  <ng-template let-data>\n                      <div class=\"sme-arrange-ellipsis\">\n                          <span class=\"sme-tag\" [title]=\"data.connection.tags\" *ngFor=\"let tag of data.connection.tags\">\n                          <span class=\"sme-tag-content\">{{tag}}</span>\n                          </span>\n                      </div>\n                  </ng-template>\n              </sme-data-table-column>\n          </sme-data-table>\n\n      </sme-master-view>\n    ",
                    styles: ["\n      .status-icon:before{\n          line-height: 1;\n          vertical-align: bottom;\n      }\n\n      .status-icon {\n          display: inline-block;\n          width: 16px;\n          line-height: 16px;\n          margin-right: 5px;\n      }\n\n      .getting-started {\n          z-index: 1;\n          margin: 24px 34px;\n      }\n\n      .getting-started-image {\n          margin: 24px;\n          height: 70px;\n          color: #0078d7;\n          font-size: 15px;\n      }\n\n      .getting-started-add-action-bar {\n          align-self: flex-end;\n          margin-bottom: 4px;\n          margin-left: 5px;\n      }\n\n      .getting-started-add-action-bar:before {\n          margin-right: 10px;\n      }\n\n      .getting-started-add-header {\n          align-self: flex-end;\n          height: 36px;\n          width: 36px;\n          background: #0078d7;\n          color: white;\n          vertical-align: middle;\n          margin-left: 90px;\n          margin-right: 5px;\n      }\n\n      .getting-started-add-header:before {\n          width: 100%;\n          vertical-align: middle;\n          line-height: 36px;\n          text-align: center;\n      }\n\n      :host >>> p-dataTable.hideNoData thead {\n          border-bottom: 1px solid #ccc;\n      }\n\n      :host >>> p-dataTable.hideNoData tbody {\n          display: none;\n      }\n\n\n      :host >>> .ui-state-highlight .color-info,\n      :host >>> .ui-state-highlight .color-success,\n      :host >>> .ui-state-highlight .color-error,\n      :host >>> .ui-state-highlight .color-warning{\n          color: #242424;\n      }\n\n      :host >>> .ui-state-highlight a {\n          text-decoration: underline;\n      }\n\n      :host >>> .ui-state-highlight a:hover,\n      :host >>> .ui-state-highlight a:active,\n      :host >>> .ui-state-highlight a:focus {\n          text-decoration: none;\n      }\n\n      :host >>> button {\n          min-width: 0px !important;\n      }\n\n      /* primeng checkbox background color override\n         primeng override css doesn't take the same */\n      /* :host >>> div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default.ui-state-active {\n          border: 1px solid transparent;\n          background-color: transparent;\n      }\n\n      :host >>> th div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default {\n          border: 1px solid;\n      }\n\n      :host >>> div.ui-chkbox {\n          max-width: 13.5px\n      }\n\n      :host >>> a {\n          color: #0078d7;\n      }\n\n      :host >>> a:hover {\n          text-decoration: underline;\n      }\n\n      :host >>> .ui-datatable thead th.ui-selection-column:first-of-type,\n      :host >>> p-dataTable tr.ui-widget-content td.ui-selection-column:first-of-type {\n          padding-left: 34px !important;\n          width: 26px !important;\n          padding-right: 14px;\n      }\n\n      :host >>> p-dataTable th:nth-child(2) .ui-column-title {\n          padding-left: 24px;\n      }\n\n      :host >>> sme-data-table .header table thead tr th.first,\n      :host >>> sme-data-table .item td.first,\n      :host >>> sme-data-table .item.no-data .prefix {\n          width:50px !important;\n      }\n\n      :host >>> sme-data-table .header table thead tr th.first,\n      :host >>> sme-data-table .item td.first .cell-data{\n          padding-left: 35px !important;\n      } */\n    "]
                },] },
    ];
    /** @nocollapse */
    ConnectionsListComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: ShellService, },
        { type: DialogService, },
        { type: AlertBarService, },
        { type: Router, },
    ]; };
    ConnectionsListComponent.propDecorators = {
        'solution': [{ type: Input },],
        'dataTable': [{ type: ViewChild, args: ['smeDataTable',] },],
    };
    return ConnectionsListComponent;
}());
export { ConnectionsListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2Nvbm5lY3Rpb25zL2Nvbm5lY3Rpb25zLWxpc3QvY29ubmVjdGlvbnMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBeUIsS0FBQSxFQUEwQixTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBQzdGLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxnQkFBQSxDQUFpQjtBQUM3QyxPQUFPLEVBQTBCLE1BQUEsRUFBTyxNQUFPLGlCQUFBLENBQWtCO0FBQ2pFLE9BQU8sRUFBYSxVQUFBLEVBQWtDLE1BQU8sTUFBQSxDQUFPO0FBQ3BFLE9BQU8sRUFDSCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixhQUFhLEVBRWhCLE1BQU0scUJBQUEsQ0FBc0I7QUFDN0IsT0FBTyxFQUdILG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBSWpCLGFBQWEsRUFLYix3QkFBd0IsRUFDeEIsT0FBTyxFQUNQLFFBQVEsRUFDUixHQUFHLEVBQ0gsaUJBQWlCLEVBRXBCLE1BQU0sa0JBQUEsQ0FBbUI7QUFFMUIsT0FBTyxFQUFFLFlBQUEsRUFBYSxNQUFPLHdCQUFBLENBQXlCO0FBQ3RELE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxnQ0FBQSxDQUFpQztBQUM5RCxPQUFPLEVBQUUsNEJBQUEsRUFBNkIsTUFBTyxxRUFBQSxDQUFzRTtBQUNuSCxPQUFPLEVBQUUsdUJBQUEsRUFBK0MsTUFBTywyREFBQSxDQUE0RDtBQUMzSCxPQUFPLEVBQUUsZ0NBQUEsRUFBaUMsTUFBTyw2RUFBQSxDQUE4RTtBQTRCL0g7SUE2Q0ksa0NBQ1ksaUJBQW9DLEVBQ3BDLFlBQTBCLEVBQzFCLGFBQTRCLEVBQzVCLGVBQWdDLEVBQ2hDLE1BQWM7UUFMMUIsaUJBSytCO1FBSm5CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIs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LGVBQWUsQ0FBQyxDQUFDLENBQUM7ZUFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztJQUMzQyxDQUFDO0lBRU8sK0RBQTRCLEdBQXBDO1FBQ0ksSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDRSxtQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSwrdEpBMERUO29CQUNELE1BQU0sRUFBRSxDQUFDLDR6R0ErSFIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztRQUN0QixFQUFDLElBQUksRUFBRSxhQUFhLEdBQUc7UUFDdkIsRUFBQyxJQUFJLEVBQUUsZUFBZSxHQUFHO1FBQ3pCLEVBQUMsSUFBSSxFQUFFLE1BQU0sR0FBRztLQUNmLEVBTjZGLENBTTdGLENBQUM7SUFDSyx1Q0FBYyxHQUEyQztRQUNoRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM5QixXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFHLEVBQUUsRUFBRTtLQUM1RCxDQUFDO0lBQ0YsK0JBQUM7Q0E3d0JELEFBNndCQyxJQUFBO1NBN3dCWSx3QkFBd0IiLCJmaWxlIjoiY29ubmVjdGlvbnMtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9