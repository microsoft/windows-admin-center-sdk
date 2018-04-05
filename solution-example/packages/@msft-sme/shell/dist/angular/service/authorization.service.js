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
import { AuthorizationManager } from '../../core';
import { RpcService } from './rpc.service';
var AuthorizationService = (function (_super) {
    __extends(AuthorizationService, _super);
    function AuthorizationService(rpc) {
        var _this = _super.call(this, function (connection) { return AuthorizationService.authorize(connection); }, rpc) || this;
        _this.isShell = false;
        _this.isShell = window.top === window.self;
        return _this;
    }
    AuthorizationService.prototype.canHandleAjaxFailure = function (code, error) {
        // if we are not the shell, assume our parent can handle auth
        var canHandle = AuthorizationService.authorize || !this.isShell;
        return canHandle && _super.prototype.canHandleAjaxFailure.call(this, code, error);
    };
    return AuthorizationService;
}(AuthorizationManager));
export { AuthorizationService };
AuthorizationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthorizationService.ctorParameters = function () { return [
    { type: RpcService, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9hdXRob3JpemF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUV6RCxPQUFPLEVBQTRCLG9CQUFBLEVBQTJFLE1BQU8sWUFBQSxDQUFhO0FBSWxJLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRzNDO0lBQTBDLHdDQUFvQjtJQU0xRCw4QkFBWSxHQUFlO1FBQTNCLFlBQ0ksa0JBQU0sVUFBQSxVQUFVLElBQUksT0FBQSxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQTFDLENBQTBDLEVBQUUsR0FBRyxDQUFDLFNBRXZFO1FBTE8sYUFBTyxHQUFHLEtBQUssQ0FBQztRQUlwQixLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQzs7SUFDOUMsQ0FBQztJQUVNLG1EQUFvQixHQUEzQixVQUE0QixJQUFvQixFQUFFLEtBQWdCO1FBQzlELDZEQUE2RDtRQUM3RCxJQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hFLE1BQU0sQ0FBRSxTQUFTLElBQUksaUJBQU0sb0JBQW9CLFlBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFRTCwyQkFBQztBQUFELENBdkJBLEFBdUJDLENBdkJ5QyxvQkFBb0I7O0FBZ0J2RCwrQkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG1DQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7Q0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJhdXRob3JpemF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9