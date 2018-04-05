import { Component } from '@angular/core';
import { AppContextService } from '@msft-sme/shell/angular';
import { NotificationState } from '@msft-sme/shell/core';
import { HelloService } from '../hello.service';
var DllExampleComponent = /** @class */ (function () {
    function DllExampleComponent(appContextService, helloService) {
        this.appContextService = appContextService;
        this.helloService = helloService;
        this.alertCount = 0;
        this.notificationCount = 0;
    }
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    DllExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().HelloWorld.dll.title;
    };
    DllExampleComponent.prototype.ngOnInit = function () {
        // todo: init logic.
    };
    DllExampleComponent.prototype.ngOnDestroy = function () {
        // Cleanup logic.
        this.restSubscription.unsubscribe();
    };
    DllExampleComponent.prototype.callRestService = function () {
        var _this = this;
        this.restSubscription = this.helloService.getGatewayRestResponse().subscribe(function (response) {
            _this.restResponse = response.channel.item.title + ' : ' + response.channel.item.condition.text;
            _this.restResponse += ' ' + response.channel.item.condition.temp + ' degrees';
            _this.sendNotification(_this.restResponse);
        });
    };
    DllExampleComponent.prototype.sendNotification = function (event) {
        //  Notifications show up as a grey message box on the right hand side of the screen.
        //  These messages will automatically close after ~10 seconds.
        //  There is currently no way to modify the icon on the notification.
        var nodeName = this.appContextService.activeConnection.nodeName;
        ++this.notificationCount;
        this.appContextService.notification.alert(nodeName, NotificationState.Informational, event);
        this.codeDisplay = 'notify';
    };
    DllExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-dll-example',
                    template: "\n      <sme-tool-header>Gateway Extension Example</sme-tool-header>\n      <div class=\"overflow-margins table-indent\">\n        A Gateway Extension is a special extension that gets compiled as a DLL and managed on the primary Honolulu application that is either installed locally\n        or on the remote Gateway server.  For more information on building, compiling, and deploying these kinds of extensions,\n        please read the 'gateway-extensions.md' document in the docs folder included in this extension.\n      </div>\n      <div class=\"overflow-margins table-indent\">\n        <sme-action-bar class=\"fixed-flex-size tool-bar first-row\">\n            <sme-action-button #action [text]=\"'Call REST service'\" [iconClass]=\"'sme-icon icon-win-upload'\" (execute)=\"callRestService()\"></sme-action-button>\n        </sme-action-bar>\n        <br />\n        <br />\n        The service side code for calling the Gateway extension looks like this:\n        <pre>\n          <code>\n      public getGatewayRestResponse(): Observable&lt;string&gt; {{ '{' }}\n          return this.http.get('http://localhost:6516/api/nodes/matwils-2016.redmond.corp.microsoft.com/features/RedmondWeather')\n          .map((response) => response.response.query.results);\n      {{ '}' }}\n          </code>\n        </pre>\n        <br />\n        While the calling code follows this structure:\n        <pre>\n          <code>\n      private callRestService() {{ '{' }}\n        this.restSubscription = this.helloService.getGatewayRestResponse().subscribe(\n            (response: string) => {{ '{' }}\n                this.restResponse = response.channel.item.title;\n                this.restResponse += ' : ' + response.channel.item.condition.text;\n                this.restResponse += ' ' + response.channel.item.condition.temp + ' degrees';\n                this.sendNotification(this.restResponse);\n            {{ '}' }}\n        );\n      {{ '}' }}\n          </code>\n        </pre>\n      </div>\n    ",
                    styles: ["\n\n    "]
                },] },
    ];
    /** @nocollapse */
    DllExampleComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: HelloService, },
    ]; };
    return DllExampleComponent;
}());
export { DllExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9kbGwtZXhhbXBsZS9kbGwtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQUEsRUFBNkIsTUFBTyxlQUFBLENBQWdCO0FBRTdELE9BQU8sRUFBRSxpQkFBQSxFQUFrQixNQUFPLHlCQUFBLENBQTBCO0FBQzVELE9BQU8sRUFBRSxpQkFBQSxFQUF5RCxNQUFPLHNCQUFBLENBQXVCO0FBSWhHLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxrQkFBQSxDQUFtQjtBQUdoRDtJQWdCSSw2QkFBb0IsaUJBQW9DLEVBQVUsWUFBMEI7UUFBeEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3hGLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQVhEOzs7T0FHRztJQUNXLG1DQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUNwRSxDQUFDO0lBT00sc0NBQVEsR0FBZjtRQUNJLG9CQUFvQjtJQUN4QixDQUFDO0lBRU0seUNBQVcsR0FBbEI7UUFDSSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyw2Q0FBZSxHQUF2QjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxTQUFTLENBQ3hFLFVBQUMsUUFBYTtZQUNWLEtBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQy9GLEtBQUksQ0FBQyxZQUFZLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzdFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRU0sOENBQWdCLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIscUZBQXFGO1FBQ3JGLDhEQUE4RDtRQUM5RCxxRUFBcUU7UUFDckUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztRQUNsRSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDckMsUUFBUSxFQUNSLGlCQUFpQixDQUFDLGFBQWEsRUFDL0IsS0FBSyxDQUFDLENBQUM7UUFFWCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDO0lBQ0UsOEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsMDlEQXVDVDtvQkFDRCxNQUFNLEVBQUUsQ0FBQyxVQUVSLENBQUM7aUJBQ0wsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7S0FDckIsRUFINkYsQ0FHN0YsQ0FBQztJQUNGLDBCQUFDO0NBMUdELEFBMEdDLElBQUE7U0ExR1ksbUJBQW1CIiwiZmlsZSI6ImRsbC1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=