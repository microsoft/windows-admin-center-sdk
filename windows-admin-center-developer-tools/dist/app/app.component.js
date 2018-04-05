import { Component } from '@angular/core';
import { AppContextService, NavigationService } from '@msft-sme/shell/angular';
var AppComponent = /** @class */ (function () {
    function AppComponent(appContext, navigationService) {
        this.appContext = appContext;
        this.navigationService = navigationService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.appContext.ngInit({ navigationService: this.navigationService });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.appContext.ngDestroy();
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-root',
                    template: "\n      <sme-styles>\n        <div class=\"stretch-absolute\">\n          <router-outlet></router-outlet>\n        </div>\n      </sme-styles>\n    "
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: NavigationService, },
    ]; };
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQTZCLE1BQU8sZUFBQSxDQUFnQjtBQUM3RCxPQUFPLEVBQUUsaUJBQUEsRUFBeUMsaUJBQUEsRUFBa0IsTUFBTyx5QkFBQSxDQUEwQjtBQUlyRztJQUNJLHNCQUNZLFVBQTZCLEVBQVcsaUJBQW9DO1FBQTVFLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQVcsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUN4RixDQUFDO0lBRU0sK0JBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU0sa0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDRSx1QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsc0pBTVQ7aUJBQ0osRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixFQUg2RixDQUc3RixDQUFDO0lBQ0YsbUJBQUM7Q0E3QkQsQUE2QkMsSUFBQTtTQTdCWSxZQUFZIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9