import { Injectable } from '@angular/core';
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component, route, state) {
        return component.canDeactivate ? component.canDeactivate(route, state) : true;
    };
    CanDeactivateGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CanDeactivateGuard.ctorParameters = function () { return []; };
    return CanDeactivateGuard;
}());
export { CanDeactivateGuard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MtY2FuLWRlYWN0aXZhdGUtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQWtCM0M7SUFBQTtJQWFBLENBQUM7SUFaVSwwQ0FBYSxHQUFwQixVQUNJLFNBQWlDLEVBQ2pDLEtBQTZCLEVBQzdCLEtBQTBCO1FBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xGLENBQUM7SUFDRSw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGlDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YseUJBQUM7Q0FiRCxBQWFDLElBQUE7U0FiWSxrQkFBa0IiLCJmaWxlIjoic2V0dGluZ3MtY2FuLWRlYWN0aXZhdGUtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=