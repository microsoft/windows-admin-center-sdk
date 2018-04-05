import { Logging, LogLevel } from '../../core';
var AppErrorHandler = /** @class */ (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9hcHAtZXJyb3ItaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUE4QixNQUFNLFlBQVksQ0FBQztBQUUzRTtJQUFBO0lBZ0JBLENBQUM7SUFmVSxxQ0FBVyxHQUFsQixVQUFtQixPQUFPO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQVk7WUFDbkIsTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDckIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3hFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEtBQUssQ0FBa0I7WUFDM0IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7U0FDcEcsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQSIsImZpbGUiOiJhcHAtZXJyb3ItaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==