import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { NotificationState } from './notification-state';
import { PowerShellNotification } from './powershell-notification';
/**
 * Notification changed event type.
 */
export var NotificationChangeEvent;
(function (NotificationChangeEvent) {
    NotificationChangeEvent[NotificationChangeEvent["Initialized"] = 0] = "Initialized";
    NotificationChangeEvent[NotificationChangeEvent["InitializationFailed"] = 1] = "InitializationFailed";
    NotificationChangeEvent[NotificationChangeEvent["Add"] = 2] = "Add";
    NotificationChangeEvent[NotificationChangeEvent["Remove"] = 3] = "Remove";
    NotificationChangeEvent[NotificationChangeEvent["Change"] = 4] = "Change";
    NotificationChangeEvent[NotificationChangeEvent["Instant"] = 5] = "Instant";
})(NotificationChangeEvent || (NotificationChangeEvent = {}));
/**
 * Notification object.
 */
var Notification = /** @class */ (function () {
    /**
     * Initializes a new instance of the Notification class.
     *
     * @param id the notification ID.
     */
    function Notification(id) {
        this.id = id;
        /**
         * Marked it's no longer display to include list of notifications.
         */
        this.dismissed = false;
    }
    /**
     * Create notification from WorkItem.
     *
     * @param id the notification ID.
     * @param workItem the RPC work item.
     * @param state the initial state.
     * @param object the object from query result.
     * @return notification the notification object.
     */
    Notification.createFromWorkItem = function (id, workItem, state, object) {
        var notification = new Notification(id);
        notification.workItem = workItem;
        notification.state = state;
        notification.object = object;
        notification.initializeFromWorkItem(workItem);
        return notification;
    };
    /**
     * Create notification from recovered work item.
     *
     * @param recoveredWorkItem the recovered work item.
     * @return notification the notification object.
     */
    Notification.createFromRecover = function (recoveredWorkItem) {
        var notification = new Notification(recoveredWorkItem.id);
        notification.workItem = recoveredWorkItem.metadata;
        if (recoveredWorkItem.failed) {
            notification.state = NotificationState.Error;
            notification.object = {
                errorType: 'WorkItemRecover',
                message: recoveredWorkItem.errorMessage
            };
        }
        else {
            notification.state = NotificationState.InProgress;
            notification.object = {};
        }
        notification.initializeFromWorkItem(recoveredWorkItem.metadata);
        return notification;
    };
    /**
     * Create notification from instant request.
     *
     * @param client the RPC notication request.
     * @return notification the notification object.
     */
    Notification.createFromClient = function (client) {
        var notification = new Notification(client.id);
        notification.locationPathname = window.location.pathname;
        notification.locationSearch = window.location.search;
        notification.initializeFromInstant(client);
        return notification;
    };
    /**
     * Update the notification by socket message from the gateway.
     *
     * @param item the socket message.
     * @return boolean the changed status.
     */
    Notification.prototype.updateFromMessage = function (item) {
        var changed = false;
        if (PowerShellNotification.hasError(item)) {
            Logging.log({
                source: 'Notification',
                level: LogLevel.Debug,
                message: '{0}/Error/{1}'.format(this.id, JSON.stringify(item.message.errors))
            });
            if (this.updateState(NotificationState.Error)) {
                this.changedTimestamp = this.endTimestamp = Date.now();
            }
            this.object = item.message.errors && MsftSme.first(item.message.errors);
            changed = true;
            this.updateMessageAndLink(this.workItem);
            return changed;
        }
        if (PowerShellNotification.hasException(item)) {
            Logging.log({
                source: 'Notification',
                level: LogLevel.Debug,
                message: '{0}/Exception/{1}'.format(this.id, item.message.exception)
            });
            if (this.updateState(NotificationState.Error)) {
                this.changedTimestamp = this.endTimestamp = Date.now();
            }
            this.object = { message: item.message.exception };
            changed = true;
            this.updateMessageAndLink(this.workItem);
            return changed;
        }
        if (PowerShellNotification.hasProgress(item)) {
            Logging.log({
                source: 'Notification',
                level: LogLevel.Debug,
                message: '{0}/Progress/{1}'.format(this.id, JSON.stringify(item.message.progress))
            });
            if (this.updateState(NotificationState.InProgress)) {
                this.changedTimestamp = Date.now();
            }
            this.object = item.message.progress && MsftSme.last(item.message.progress);
            if (this.object && this.object.hasOwnProperty('percent')) {
                this.progressPercent = this.object && this.object.percent;
            }
            if ((this.progressPercent == null || this.progressPercent < 0)
                && this.workItem.progressMessage && this.workItem.progressMessage.indexOf('{{percent}}') >= 0) {
                return false;
            }
            changed = true;
        }
        if (PowerShellNotification.hasData(item)) {
            Logging.log({
                source: 'Notification',
                level: LogLevel.Debug,
                message: '{0}/Data/{1}'.format(this.id, JSON.stringify(item.message.results))
            });
            this.object = item.message.results && MsftSme.last(item.message.results);
            changed = true;
        }
        if (PowerShellNotification.hasCompleted(item)) {
            Logging.log({
                source: 'Notification',
                level: LogLevel.Debug,
                message: '{0}/Completed'.format(this.id)
            });
            if (this.updateState(NotificationState.Success)) {
                this.changedTimestamp = this.endTimestamp = Date.now();
            }
            changed = true;
        }
        this.updateMessageAndLink(this.workItem);
        return changed;
    };
    /**
     * Update the notification by instant notification message from the client.
     *
     * @param client the instant notification object.
     * @param boolean the changed status.
     */
    Notification.prototype.updateFromClient = function (client) {
        var changed = false;
        if (this.title !== client.title) {
            changed = true;
            this.title = client.title;
        }
        if (this.description !== client.description) {
            changed = true;
            this.description = client.description;
        }
        if (this.updateState(client.state)) {
            this.changedTimestamp = Date.now();
            changed = true;
            if (this.state !== NotificationState.InProgress) {
                this.endTimestamp = this.changedTimestamp;
            }
        }
        var link = this.formatLink(client.link);
        if (this.link !== link) {
            changed = true;
            this.link = link;
        }
        if (this.message !== client.message) {
            changed = true;
            this.message = client.message;
        }
        return changed;
    };
    /**
     * Gets the module display name.
     */
    Notification.prototype.getModuleDisplayName = function (moduleName) {
        var global = window;
        var module = MsftSme.find(global.MsftSme.Environment.modules, function (value, index, array) { return value.name === moduleName; });
        if (module) {
            return module.displayName;
        }
        return moduleName;
    };
    /**
     * Update the state.
     *
     * @param state the new state.
     * @return boolean the changed state.
     */
    Notification.prototype.updateState = function (state) {
        if (this.state !== state) {
            this.state = state;
            return true;
        }
        return false;
    };
    Notification.prototype.initializeFromWorkItem = function (item) {
        this.nodeName = item.nodeName;
        this.moduleName = item.sourceName;
        this.moduleDisplayName = this.getModuleDisplayName(this.moduleName);
        this.startTimestamp = item.timestamp;
        this.changedTimestamp = item.timestamp;
        this.title = item.title;
        this.description = item.description;
        this.typeId = item.typeId;
        this.updateMessageAndLink(item);
    };
    Notification.prototype.updateMessageAndLink = function (item) {
        var template;
        switch (this.state) {
            case NotificationState.Started:
                template = item.startedMessage;
                this.link = this.formatLink(null);
                break;
            case NotificationState.Error:
                this.endTimestamp = item.timestamp;
                template = item.errorMessage;
                this.link = this.formatLink(item.errorLink);
                break;
            case NotificationState.InProgress:
                template = item.progressMessage;
                this.link = this.formatLink(null);
                break;
            case NotificationState.Success:
                this.endTimestamp = item.timestamp;
                template = item.successMessage;
                this.link = this.formatLink(item.successLink);
                break;
            default:
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.NotificationUnsupportedState.message;
                throw new Error(message);
        }
        this.message = this.formatMessage(template);
    };
    Notification.prototype.initializeFromInstant = function (client) {
        this.nodeName = client.nodeName;
        this.moduleName = client.sourceName;
        this.moduleDisplayName = this.getModuleDisplayName(this.moduleName);
        this.startTimestamp = client.timestamp;
        this.changedTimestamp = client.timestamp;
        this.title = client.title;
        this.description = client.description;
        this.state = client.state;
        this.link = this.formatLink(client.link);
        this.message = client.message;
        if (this.state !== NotificationState.Started && this.state !== NotificationState.InProgress) {
            this.endTimestamp = client.timestamp;
        }
    };
    Notification.prototype.formatLink = function (relative) {
        // tslint:disable-next-line:max-line-length
        // href example:
        //  "http://localhost:4400/apps/msft.sme.server-manager!servers/tools/msft.sme.module-seed!main?connection=sme-full1.redmond.corp.microsoft.com"
        var pathname = this.locationPathname || this.workItem && this.workItem.locationPathname;
        var search = this.locationSearch || this.workItem && this.workItem.locationSearch;
        if (relative && pathname && search) {
            return MsftSme.trimEnd(pathname, '/') + '/' + MsftSme.trimStart(relative, '/') + search;
        }
        return pathname + search;
    };
    Notification.prototype.formatMessage = function (template) {
        var parameters = this.findParameters(template);
        var message = this.replaceParameters(template, parameters);
        return message;
    };
    Notification.prototype.findParameters = function (template) {
        var results = [];
        if (!template) {
            return results;
        }
        var segments = template.split('{{');
        for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
            var seg = segments_1[_i];
            var index = seg.indexOf('}}');
            if (index > 0) {
                results.push(seg.substr(0, index));
            }
        }
        return results;
    };
    Notification.prototype.replaceParameters = function (message, parameters) {
        for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
            var param = parameters_1[_i];
            if (param === 'percent') {
                if (typeof this.progressPercent === 'number') {
                    message = message.replaceAll('{{percent}}', '' + this.progressPercent);
                }
            }
            else if (param === 'objectName') {
                if (this.workItem && this.workItem.objectName) {
                    message = message.replaceAll('{{objectName}}', this.workItem.objectName);
                }
            }
            else {
                if (this.object) {
                    var segments = param.split('.');
                    var target = this.object;
                    for (var _a = 0, segments_2 = segments; _a < segments_2.length; _a++) {
                        var seg = segments_2[_a];
                        if (target[seg]) {
                            target = target[seg];
                        }
                        else {
                            target = null;
                            break;
                        }
                    }
                    if (target) {
                        message = message.replaceAll('{{' + param + '}}', '' + target);
                    }
                }
            }
        }
        return message;
    };
    return Notification;
}());
export { Notification };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxzQkFBc0IsRUFBNkIsTUFBTSwyQkFBMkIsQ0FBQztBQUk5Rjs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLHVCQU9YO0FBUEQsV0FBWSx1QkFBdUI7SUFDL0IsbUZBQVcsQ0FBQTtJQUNYLHFHQUFvQixDQUFBO0lBQ3BCLG1FQUFHLENBQUE7SUFDSCx5RUFBTSxDQUFBO0lBQ04seUVBQU0sQ0FBQTtJQUNOLDJFQUFPLENBQUE7QUFDWCxDQUFDLEVBUFcsdUJBQXVCLEtBQXZCLHVCQUF1QixRQU9sQztBQVVEOztHQUVHO0FBQ0g7SUFzSkk7Ozs7T0FJRztJQUNILHNCQUFtQixFQUFVO1FBQVYsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQTlFN0I7O1dBRUc7UUFDSSxjQUFTLEdBQUcsS0FBSyxDQUFDO0lBMkVPLENBQUM7SUEvRGpDOzs7Ozs7OztPQVFHO0lBQ1csK0JBQWtCLEdBQWhDLFVBQWlDLEVBQVUsRUFBRSxRQUFxQixFQUFFLEtBQXdCLEVBQUUsTUFBVztRQUNyRyxJQUFJLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxZQUFZLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVqQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMzQixZQUFZLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixZQUFZLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQ7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QUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUN6QixHQUFHLENBQUMsQ0FBWSxVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVE7d0JBQW5CLElBQUksR0FBRyxpQkFBQTt3QkFDUixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNkLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3pCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osTUFBTSxHQUFHLElBQUksQ0FBQzs0QkFDZCxLQUFLLENBQUM7d0JBQ1YsQ0FBQztxQkFDSjtvQkFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNULE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztvQkFDbkUsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQTNiQSxBQTJiQyxJQUFBIiwiZmlsZSI6Im5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=