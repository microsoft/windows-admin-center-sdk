import { Injectable } from '@angular/core';
var CanDeactivateGuard = (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component, route, state) {
        return component.canDeactivate ? component.canDeactivate(route, state) : true;
    };
    return CanDeactivateGuard;
}());
export { CanDeactivateGuard };
CanDeactivateGuard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CanDeactivateGuard.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MtY2FuLWRlYWN0aXZhdGUtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQWtCM0M7SUFBQTtJQWFBLENBQUM7SUFaVSwwQ0FBYSxHQUFwQixVQUNJLFNBQWlDLEVBQ2pDLEtBQTZCLEVBQzdCLEtBQTBCO1FBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNsRixDQUFDO0lBT0wseUJBQUM7QUFBRCxDQWJBLEFBYUM7O0FBTk0sNkJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJzZXR0aW5ncy1jYW4tZGVhY3RpdmF0ZS1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==