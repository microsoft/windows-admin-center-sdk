import { Injectable, isDevMode } from '@angular/core';
var DevGuardService = /** @class */ (function () {
    function DevGuardService() {
    }
    /**
     * Guard against navigating until the app initialization is complete
     * @param route the current route snapshot
     * @param state the current router state snapshot
     */
    DevGuardService.prototype.canActivate = function (route, state) {
        return isDevMode();
    };
    DevGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DevGuardService.ctorParameters = function () { return []; };
    return DevGuardService;
}());
export { DevGuardService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFZLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFPdEQ7SUFBQTtJQWdCQSxDQUFDO0lBZEc7Ozs7T0FJRztJQUNJLHFDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFDeEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRSwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0Ysc0JBQUM7Q0FoQkQsQUFnQkMsSUFBQTtTQWhCWSxlQUFlIiwiZmlsZSI6ImRldi1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==