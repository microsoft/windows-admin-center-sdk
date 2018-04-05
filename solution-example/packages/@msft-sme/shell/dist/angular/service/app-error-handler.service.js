import { Logging, LogLevel } from '../../core';
var AppErrorHandler = (function () {
    function AppErrorHandler() {
    }
    AppErrorHandler.prototype.handleError = function (message) {
        Logging.log({
            source: 'appErrorHandler',
            level: LogLevel.Error,
            message: message.message || (typeof message === 'string' ? message : ''),
            stack: message.stack || ''
        });
        Logging.trace({
            view: 'sme-generic-error',
            instance: 'AppErrorHandler',
            action: 'exceptionLog',
            data: { stack: message.stack || message.message || (typeof message === 'string' ? message : '') }
        });
    };
    return AppErrorHandler;
}());
export { AppErrorHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9hcHAtZXJyb3ItaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUE4QixNQUFNLFlBQVksQ0FBQztBQUUzRTtJQUFBO0lBZ0JBLENBQUM7SUFmVSxxQ0FBVyxHQUFsQixVQUFtQixPQUFPO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQVk7WUFDbkIsTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDckIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUN4RSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO1NBQzdCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLENBQWtCO1lBQzNCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixNQUFNLEVBQUUsY0FBYztZQUN0QixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBRTtTQUNwRyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBIiwiZmlsZSI6ImFwcC1lcnJvci1oYW5kbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9