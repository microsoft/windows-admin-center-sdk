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
import { ConnectionTagManager } from '../../core';
import { ConnectionService } from './connection.service';
var ConnectionTagService = /** @class */ (function (_super) {
    __extends(ConnectionTagService, _super);
    function ConnectionTagService(connectionService) {
        return _super.call(this, connectionService) || this;
    }
    ConnectionTagService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ConnectionTagService.ctorParameters = function () { return [
        { type: ConnectionService, },
    ]; };
    return ConnectionTagService;
}(ConnectionTagManager));
export { ConnectionTagService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvc2VydmljZS9jb25uZWN0aW9uLXRhZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFZLE1BQU8sZUFBQSxDQUFnQjtBQUM1QyxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTyxZQUFBLENBQWE7QUFDbEQsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8sc0JBQUEsQ0FBdUI7QUFHekQ7SUFBMEMsd0NBQW9CO0lBQzFELDhCQUFZLGlCQUFvQztlQUM1QyxrQkFBTSxpQkFBaUIsQ0FBQztJQUM1QixDQUFDO0lBQ0UsK0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQ0FBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7S0FDMUIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLDJCQUFDO0NBWEQsQUFXQyxDQVh5QyxvQkFBb0IsR0FXN0Q7U0FYWSxvQkFBb0IiLCJmaWxlIjoiY29ubmVjdGlvbi10YWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=