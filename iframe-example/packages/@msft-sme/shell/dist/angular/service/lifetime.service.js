var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { LifetimeData, TriggerableLifetimeManager } from '../../core';
/**
 * The LifetimeService service class.
 */
var LifetimeService = /** @class */ (function (_super) {
    __extends(LifetimeService, _super);
    function LifetimeService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * lifetime manager of the application.
         */
        _this.manager = new TriggerableLifetimeManager();
        return _this;
    }
    LifetimeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LifetimeService.ctorParameters = function () { return []; };
    return LifetimeService;
}(LifetimeData));
export { LifetimeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9saWZldGltZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsWUFBQSxFQUFjLDBCQUFBLEVBQTJCLE1BQU8sWUFBQSxDQUFhO0FBRXRFOztHQUVHO0FBRUg7SUFBcUMsbUNBQVk7SUFBakQ7UUFBQSxxRUFXQztRQVZHOztXQUVHO1FBQ0ksYUFBTyxHQUErQixJQUFJLDBCQUEwQixFQUFFLENBQUM7O0lBT2xGLENBQUM7SUFOTSwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysc0JBQUM7Q0FYRCxBQVdDLENBWG9DLFlBQVksR0FXaEQ7U0FYWSxlQUFlIiwiZmlsZSI6ImxpZmV0aW1lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9