import { Injectable } from '@angular/core';
import { AppContextService } from '../../../../../angular';
import { Net } from '../../../../../core';
import { QueryCache } from '../../../../../core';
var AccessService = /** @class */ (function () {
    function AccessService(appContextService) {
        var _this = this;
        this.appContextService = appContextService;
        this.usersQueryCache = new QueryCache(function (params) { return _this.getUsersSecurityGroups(); }, function (params) { return ''; });
        this.adminsQueryCache = new QueryCache(function (params) { return _this.getAdminsSecurityGroups(); }, function (params) { return ''; });
    }
    AccessService.prototype.addSecurityGroup = function (name, type, section) {
        var encodedName = Net.utf8Base64UrlEncode(name);
        // Build request url in the format: access/users/name/type/type 
        var requestUrl = 'access/{0}/{1}/type/{2}'.format(section, encodedName, type);
        return this.appContextService.gateway.put(requestUrl);
    };
    AccessService.prototype.deleteSecurityGroup = function (name, type, section) {
        var encodedName = Net.utf8Base64UrlEncode(name);
        // Build request url in the format: access/users/name/type/type 
        var requestUrl = 'access/{0}/{1}/type/{2}'.format(section, encodedName, type);
        return this.appContextService.gateway.delete(requestUrl);
    };
    AccessService.prototype.getUsersSecurityGroups = function () {
        return this.appContextService.gateway.get('access/users').map(function (res) {
            return res;
        });
    };
    AccessService.prototype.getAdminsSecurityGroups = function () {
        return this.appContextService.gateway.get('access/admins').map(function (res) {
            return res;
        });
    };
    AccessService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AccessService.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return AccessService;
}());
export { AccessService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2NvbmZpZ3VyYXRpb24vcGFuZWxzL2FjY2Vzcy9hY2Nlc3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUUzQyxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx3QkFBQSxDQUF5QjtBQUMzRCxPQUFPLEVBQUUsR0FBQSxFQUFJLE1BQU8scUJBQUEsQ0FBc0I7QUFDMUMsT0FBTyxFQUFFLFVBQUEsRUFBVyxNQUFPLHFCQUFBLENBQXNCO0FBSWpEO0lBS0ksdUJBQW9CLGlCQUFvQztRQUF4RCxpQkFDQztRQURtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBSGpELG9CQUFlLEdBQUcsSUFBSSxVQUFVLENBQVUsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBN0IsQ0FBNkIsRUFBRSxVQUFBLE1BQU0sSUFBSSxPQUFBLEVBQUUsRUFBRixDQUFFLENBQUMsQ0FBQztRQUNqRyxxQkFBZ0IsR0FBRyxJQUFJLFVBQVUsQ0FBVSxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUE5QixDQUE4QixFQUFFLFVBQUEsTUFBTSxJQUFJLE9BQUEsRUFBRSxFQUFGLENBQUUsQ0FBQyxDQUFDO0lBRzFHLENBQUM7SUFFTSx3Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBWSxFQUFFLElBQVksRUFBRSxPQUFlO1FBQy9ELElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsRCxnRUFBZ0U7UUFDaEUsSUFBTSxVQUFVLEdBQUcseUJBQXlCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSwyQ0FBbUIsR0FBMUIsVUFBMkIsSUFBWSxFQUFFLElBQVksRUFBRSxPQUFlO1FBQ2xFLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsRCxnRUFBZ0U7UUFDaEUsSUFBTSxVQUFVLEdBQUcseUJBQXlCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTyw4Q0FBc0IsR0FBOUI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztZQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sK0NBQXVCLEdBQS9CO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNFLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO0tBQzFCLEVBRjZGLENBRTdGLENBQUM7SUFDRixvQkFBQztDQTFDRCxBQTBDQyxJQUFBO1NBMUNZLGFBQWEiLCJmaWxlIjoiYWNjZXNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9