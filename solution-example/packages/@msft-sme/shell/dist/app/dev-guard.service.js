import { Injectable, isDevMode } from '@angular/core';
var DevGuardService = (function () {
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
    return DevGuardService;
}());
export { DevGuardService };
DevGuardService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DevGuardService.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFZLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFPdEQ7SUFBQTtJQWdCQSxDQUFDO0lBZEc7Ozs7T0FJRztJQUNJLHFDQUFXLEdBQWxCLFVBQW1CLEtBQTZCLEVBQUUsS0FBMEI7UUFDeEUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFPTCxzQkFBQztBQUFELENBaEJBLEFBZ0JDOztBQU5NLDBCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtDQUNuQixDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsOEJBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiZGV2LWd1YXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9