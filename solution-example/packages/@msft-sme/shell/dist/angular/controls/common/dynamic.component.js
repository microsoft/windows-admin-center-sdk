import { ViewChild, ViewContainerRef } from '@angular/core';
var DynamicComponentBase = (function () {
    function DynamicComponentBase(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    DynamicComponentBase.prototype.ngOnInit = function () {
        this.createComponent();
    };
    DynamicComponentBase.prototype.ngOnDestroy = function () {
        this.cleanComponent();
    };
    DynamicComponentBase.prototype.createComponent = function () {
        this.cleanComponent();
        var factory;
        factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
        this.ref = this.container.createComponent(factory);
    };
    DynamicComponentBase.prototype.cleanComponent = function () {
        // make sure any previously created component is properly destroyed
        if (this.ref) {
            this.ref.destroy();
            this.ref = null;
        }
    };
    return DynamicComponentBase;
}());
export { DynamicComponentBase };
DynamicComponentBase.propDecorators = {
    'container': [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvY29tbW9uL2R5bmFtaWMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFPSCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBQSxDQUFnQjtBQUV2QjtJQU9JLDhCQUFvQix3QkFBa0Q7UUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUN0RSxDQUFDO0lBRU0sdUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sMENBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVTLDhDQUFlLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksT0FBNEIsQ0FBQztRQUNqQyxPQUFPLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFUyw2Q0FBYyxHQUF4QjtRQUNJLG1FQUFtRTtRQUNuRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztJQUNMLENBQUM7SUFJTCwyQkFBQztBQUFELENBbkNBLEFBbUNDOztBQUhNLG1DQUFjLEdBQTJDO0lBQ2hFLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRyxFQUFFLEVBQUU7Q0FDckYsQ0FBQyIsImZpbGUiOiJkeW5hbWljLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=