import { Component } from '@angular/core';
import { AppContextService } from '@msft-sme/shell/angular';
var HelloComponent = /** @class */ (function () {
    function HelloComponent(appContextService) {
        this.appContextService = appContextService;
        this.loading = true;
        this.strings = MsftSme.resourcesStrings();
        //
    }
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    // public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {        
    //     Logging.log({
    //         source: 'sme-hello',
    //         level: LogLevel.Verbose,
    //         message: 'navigationTitle: {0}'.format(snapshot.pathFromRoot.map(x => x.url.join('/')).join('/'))
    //     });
    //     return MsftSme.resourcesStrings<Strings>().HelloWorld.title;
    // }
    HelloComponent.prototype.ngOnInit = function () {
        // set up any initialization logic here.
        // this.appContextService.
    };
    HelloComponent.prototype.ngOnDestroy = function () {
        // cleanup any calls here.
    };
    HelloComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-hello',
                    template: "\n      <div class=\"stretch-absolute flex-layout vertical\">\n        <sme-tool-header>\n            <!-- <ul class=\"nav nav-tabs fixed-flex-size\" role=\"tablist\">\n              <li role=\"presentation\"><a routerLink=\"/controls\" routerLinkActive=\"active\" role=\"tab\">{{ strings.HelloWorld.nav.controls }}</a></li>\n              <li role=\"presentation\"><a routerLink=\"/notifications\" routerLinkActive=\"active\" role=\"tab\">{{ strings.HelloWorld.nav.alerts }}</a></li>\n              <li role=\"presentation\"><a routerLink=\"/style\" routerLinkActive=\"active\" role=\"tab\">{{ strings.HelloWorld.nav.styles }}</a></li>\n            </ul> -->\n        </sme-tool-header>\n        <div class=\"auto-flex-size relative\">\n          <router-outlet></router-outlet>\n        </div>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    HelloComponent.ctorParameters = function () { return [
        { type: AppContextService, },
    ]; };
    return HelloComponent;
}());
export { HelloComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9oZWxsby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUVoRixPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx5QkFBQSxDQUEwQjtBQVE1RDtJQUtJLHdCQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUpqRCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRWYsWUFBTyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVyxDQUFDO1FBR2pELEVBQUU7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMEhBQTBIO0lBQzFILG9CQUFvQjtJQUNwQiwrQkFBK0I7SUFDL0IsbUNBQW1DO0lBQ25DLDRHQUE0RztJQUM1RyxVQUFVO0lBRVYsbUVBQW1FO0lBQ25FLElBQUk7SUFFRyxpQ0FBUSxHQUFmO1FBQ0ksd0NBQXdDO1FBRXhDLDBCQUEwQjtJQUM5QixDQUFDO0lBQ00sb0NBQVcsR0FBbEI7UUFDSSwwQkFBMEI7SUFDOUIsQ0FBQztJQUNFLHlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxpekJBYVQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDZCQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUY2RixDQUU3RixDQUFDO0lBQ0YscUJBQUM7Q0F0REQsQUFzREMsSUFBQTtTQXREWSxjQUFjIiwiZmlsZSI6ImhlbGxvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=