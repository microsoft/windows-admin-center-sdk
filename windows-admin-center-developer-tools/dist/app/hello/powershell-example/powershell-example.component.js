import { Component } from '@angular/core';
import { AppContextService } from '@msft-sme/shell/angular';
import { Net } from '@msft-sme/shell/core';
import { HelloService } from '../hello.service';
var PowershellExampleComponent = /** @class */ (function () {
    function PowershellExampleComponent(appContextService, helloService) {
        this.appContextService = appContextService;
        this.helloService = helloService;
        this.loading = true;
        this.displayCode = true;
        this.strings = this.appContextService.resourceCache.getStrings();
        this.serviceDisplayName = 'Loading...';
    }
    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    PowershellExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return MsftSme.resourcesStrings().HelloWorld.powershell.title;
    };
    PowershellExampleComponent.prototype.ngOnInit = function () {
        this.displayCodeButtonContent = this.strings.HelloWorld.showCode;
        this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
        this.getServices();
    };
    PowershellExampleComponent.prototype.ngOnDestroy = function () {
        this.psSession.dispose();
    };
    /*
    //  The Get Services call on the "hello service" initiates a PowerShell session executes
    */
    PowershellExampleComponent.prototype.getServices = function () {
        var _this = this;
        this.serviceSubscription = this.helloService.getService(this.psSession, 'winrm').subscribe(function (service) {
            _this.loading = false;
            if (service) {
                _this.serviceDisplayName = service.displayName;
                _this.serviceDefinition = service;
            }
            else {
                _this.serviceDisplayName = _this.strings.HelloWorld.notFound;
            }
        }, function (error) {
            _this.errorMessage = Net.getErrorMessage(error);
            _this.loading = false;
        });
    };
    PowershellExampleComponent.prototype.toggleCode = function () {
        this.displayCode = !this.displayCode;
        if (!this.displayCode) {
            this.displayCodeButtonContent = this.strings.HelloWorld.showCode;
        }
        else {
            this.displayCodeButtonContent = this.strings.HelloWorld.hideCode;
        }
    };
    PowershellExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-powershell-example',
                    template: "\n      <sme-tool-header>PowerShell Examples</sme-tool-header>\n      <sme-loading-wheel *ngIf=\"loading\"></sme-loading-wheel>\n      <div class=\"overflow-margins table-indent\">\n          This component provides a short overview / example on how to execute a PowerShell script, and then wait on the results. Once\n          returned, the results are loaded into simple DOM elements for display. Construction and execution of PowerShell scripts\n          is (or will be) details in the howtopowershell.md file included with the README for the extension seed project.\n          <br />\n          <br /> This example executed the \"Get-Service\" PowerShell cmdlet, and returned the following information:\n          <br />\n      </div>\n      <div class=\"overflow-margins table-indent\">\n          <!-- be awere that styles update is coming -->\n          <div>\n              <sme-tool-header>{{serviceDisplayName}}</sme-tool-header>\n          </div>\n          <div *ngIf=\"serviceDefinition\">\n              <div>\n                  <span>\n                      <b>Machine Name:</b> {{serviceDefinition.machineName}}\n                  </span>\n                  <span>\n                      <b>Handle:</b> {{serviceDefinition.serviceHandle}}\n                  </span>\n              </div>\n              <div>\n                  <span>\n                      <b>Type:</b> {{serviceDefinition.serviceType}}\n                  </span>\n                  <span>\n                      <b>Type:</b> {{serviceDefinition.startType}}\n                  </span>\n              </div>\n              <div>\n                  <b>Status:</b> {{serviceDefinition.status}}\n              </div>\n          </div>\n          <div class=\"overflow-margins table-indent\">\n              <button class=\"btn btn-primary\" (click)=\"toggleCode()\">{{displayCodeButtonContent}}</button>\n          </div>\n          <div *ngIf=\"displayCode\">\n              When setting up a PowerShell component, it's important to create and store the Session object inside the component if there are going to be\n              multiple calls.  A PowerShell session takes ~1 second to initialize before any scripts can be executed.\n              <pre>\n                  <code>\n      public ngOnInit() {{ '{' }}\n          this.displayCodeButtonContent = this.strings.HelloWorld.showCode;\n          <span style=\"background-color: yellow;\">this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);</span>\n          this.getServices();\n      {{ '}' }}\n                  </code>\n              </pre>\n              <br />\n              Once the session is created, the service is invoked, and we subscribe to the results:\n              <pre>\n                  <code>\n      /*\n      //  The Get Services call on the \"hello service\" initiates a PowerShell session executes\n      */\n      private getServices() {{ '{' }}\n          this.serviceSubscription = this.helloService.getService(this.psSession, 'winrm').subscribe(\n              (service: any) => {{ '{' }}\n                  this.loading = false;\n                  if (service) {{ '{' }}\n                      this.serviceDisplayName = service.displayName;\n                      this.serviceDefinition = service;\n                  {{ '}' }} else {{ '{' }}\n                      this.serviceDisplayName = this.strings.HelloWorld.notFound;\n                  {{ '}' }}\n              },\n              (error: AjaxError) => {{ '{' }}\n                  this.errorMessage = Net.getErrorMessage(error);\n                  this.loading = false;\n              {{ '}' }}\n          );\n      {{ '}' }}\n                  </code>\n              </pre>\n          </div>\n      </div>\n    ",
                    styles: ["\n\n    "]
                },] },
    ];
    /** @nocollapse */
    PowershellExampleComponent.ctorParameters = function () { return [
        { type: AppContextService, },
        { type: HelloService, },
    ]; };
    return PowershellExampleComponent;
}());
export { PowershellExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby9wb3dlcnNoZWxsLWV4YW1wbGUvcG93ZXJzaGVsbC1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE2QixNQUFPLGVBQUEsQ0FBZ0I7QUFFN0QsT0FBTyxFQUFFLGlCQUFBLEVBQWtCLE1BQU8seUJBQUEsQ0FBMEI7QUFDNUQsT0FBTyxFQUFFLEdBQUEsRUFBdUIsTUFBTyxzQkFBQSxDQUF1QjtBQUc5RCxPQUFPLEVBQUUsWUFBQSxFQUFhLE1BQU8sa0JBQUEsQ0FBbUI7QUFHaEQ7SUFtQkksb0NBQW9CLGlCQUFvQyxFQUFVLFlBQTBCO1FBQXhFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWxCckYsWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBTW5CLFlBQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBVyxDQUFDO1FBWXhFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUM7SUFDM0MsQ0FBQztJQVZEOzs7T0FHRztJQUNXLDBDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUMzRSxDQUFDO0lBTU0sNkNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkgsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxnREFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOztNQUVFO0lBQ00sZ0RBQVcsR0FBbkI7UUFBQSxpQkFnQkM7UUFmRyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQ3RGLFVBQUMsT0FBWTtZQUNULEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBQzlDLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7WUFDckMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDL0QsQ0FBQztRQUNMLENBQUMsRUFDRCxVQUFDLEtBQWdCO1lBQ2IsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVNLCtDQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3JFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDckUsQ0FBQztJQUNMLENBQUM7SUFDRSxxQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSw0dEhBZ0ZUO29CQUNELE1BQU0sRUFBRSxDQUFDLFVBRVIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gseUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHO1FBQzNCLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztLQUNyQixFQUg2RixDQUc3RixDQUFDO0lBQ0YsaUNBQUM7Q0E3SkQsQUE2SkMsSUFBQTtTQTdKWSwwQkFBMEIiLCJmaWxlIjoicG93ZXJzaGVsbC1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=