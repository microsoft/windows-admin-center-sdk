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
import { CimStream } from '../../core';
import { AuthorizationService } from './authorization.service';
import { WebsocketStreamService } from './websocket-stream.service';
/**
 * The CIM Stream service class.
 */
var CimStreamService = (function (_super) {
    __extends(CimStreamService, _super);
    /**
     * Initializes a new instance of the CimStreamService class.
     *
     * @param websocketStreamService the websocket stream class instance injected.
     * @param authorizationService the authorization manager service class instance injected.
     */
    function CimStreamService(websocketStreamService, authorizationService) {
        return _super.call(this, websocketStreamService, authorizationService) || this;
    }
    return CimStreamService;
}(CimStream));
export { CimStreamService };
CimStreamService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CimStreamService.ctorParameters = function () { return [
    { type: WebsocketStreamService, },
    { type: AuthorizationService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jaW0tc3RyZWFtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxZQUFBLENBQWE7QUFDdkMsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8seUJBQUEsQ0FBMEI7QUFDL0QsT0FBTyxFQUFFLHNCQUFBLEVBQXVCLE1BQU8sNEJBQUEsQ0FBNkI7QUFHcEU7O0dBRUc7QUFDSDtJQUFzQyxvQ0FBUztJQUMzQzs7Ozs7T0FLRztJQUNILDBCQUFZLHNCQUE4QyxFQUFFLG9CQUEwQztlQUNsRyxrQkFBTSxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQztJQUN2RCxDQUFDO0lBU0wsdUJBQUM7QUFBRCxDQWxCQSxBQWtCQyxDQWxCcUMsU0FBUzs7QUFVeEMsMkJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0NBQ25CLENBQUM7QUFDRixrQkFBa0I7QUFDWCwrQkFBYyxHQUFtRSxjQUFNLE9BQUE7SUFDOUYsRUFBQyxJQUFJLEVBQUUsc0JBQXNCLEdBQUc7SUFDaEMsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEdBQUc7Q0FDN0IsRUFINkYsQ0FHN0YsQ0FBQyIsImZpbGUiOiJjaW0tc3RyZWFtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9