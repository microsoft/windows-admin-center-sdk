import { Injectable } from '@angular/core';
import { AppContextService, HttpService } from '@msft-sme/shell/angular';
import { Cim, PowerShell } from '@msft-sme/shell/core';
import { PowerShellScripts } from '../../generated/powerShell-scripts';
var HelloService = /** @class */ (function () {
    function HelloService(appContextService, http) {
        this.appContextService = appContextService;
        this.http = http;
    }
    /**
     *  This method illustrates how to execute a CIM / WMI call within the context of SME / Honolulu.
     */
    HelloService.prototype.getProcesses = function () {
        return this.appContextService.cim.getInstanceMultiple(this.appContextService.activeConnection.nodeName, Cim.namespace.managementTools2, Cim.cimClass.msftMTProcesses)
            .map(function (response) {
            var items = [];
            for (var _i = 0, _a = response.value; _i < _a.length; _i++) {
                var item = _a[_i];
                items.push(item.properties);
            }
            return items;
        });
    };
    /**
     *  This method illustrates how to execute a PowerShell script within the context of SME / Honolulu.
     */
    HelloService.prototype.getService = function (session, serviceName) {
        var command = PowerShell.createScript(PowerShellScripts.Get_Service, { name: serviceName });
        return this.appContextService.powerShell.run(session, command)
            .map(function (response) {
            return response && response.results && response.results[0];
        });
    };
    HelloService.prototype.getGatewayRestResponse = function () {
        return this.http.get('http://localhost:6516/api/nodes/matwils-2016.redmond.corp.microsoft.com/features/RedmondWeather')
            .map(function (response) { return response.response.query.results; });
    };
    HelloService.psKey = 'sme.seed';
    HelloService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HelloService.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: HttpService, },
    ]; };
    return HelloService;
}());
export { HelloService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9oZWxsby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBQzNDLE9BQU8sRUFBRSxpQkFBQSxFQUFtQixXQUFBLEVBQVksTUFBTyx5QkFBQSxDQUEwQjtBQUN6RSxPQUFPLEVBQUUsR0FBQSxFQUFXLFVBQUEsRUFBOEIsTUFBTyxzQkFBQSxDQUF1QjtBQUVoRixPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxvQ0FBQSxDQUFxQztBQUl2RTtJQUlJLHNCQUFvQixpQkFBb0MsRUFBVSxJQUFpQjtRQUEvRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtJQUNuRixDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQ0FBWSxHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUNoRCxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUM5QixHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQzthQUM1QixHQUFHLENBQUMsVUFBQyxRQUFhO1lBQ2YsSUFBSSxLQUFLLEdBQVUsRUFBRSxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxDQUFhLFVBQWMsRUFBZCxLQUFBLFFBQVEsQ0FBQyxLQUFLLEVBQWQsY0FBYyxFQUFkLElBQWM7Z0JBQTFCLElBQUksSUFBSSxTQUFBO2dCQUNULEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQy9CO1lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFVLEdBQWpCLFVBQWtCLE9BQTBCLEVBQUUsV0FBbUI7UUFDN0QsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM1RixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzthQUN6RCxHQUFHLENBQUMsVUFBQSxRQUFRO1lBQ1QsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sNkNBQXNCLEdBQTdCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlHQUFpRyxDQUFDO2FBQ3RILEdBQUcsQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUF0Q2Esa0JBQUssR0FBRyxVQUFVLENBQUM7SUF1QzlCLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkJBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztLQUNwQixFQUg2RixDQUc3RixDQUFDO0lBQ0YsbUJBQUM7Q0FoREQsQUFnREMsSUFBQTtTQWhEWSxZQUFZIiwiZmlsZSI6ImhlbGxvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9