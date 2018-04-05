import { Component, ElementRef } from '@angular/core';
var SettingsFooterComponent = /** @class */ (function () {
    function SettingsFooterComponent(elementRef) {
        this.elementRef = elementRef;
    }
    SettingsFooterComponent.prototype.ngOnInit = function () {
        this.ngOnChanges();
    };
    SettingsFooterComponent.prototype.ngOnChanges = function () {
        if (this.elementRef.nativeElement) {
            var element = this.elementRef.nativeElement;
            if (element.childElementCount === 0) {
                element.classList.add('hide');
            }
        }
    };
    SettingsFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-settings-footer',
                    template: '<ng-content></ng-content>',
                    styles: ["\n      :host  {\n        margin: 36px 0;\n        flex: 0 0 auto;\n        display: flex;\n        flex-direction: row;\n        justify-content: flex-start;\n      }\n\n      :host .hide {\n        display: none\n      }\n\n      :host >>> .btn {\n        margin: 0px 8px 0px 0px;\n        min-width: 120px;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    SettingsFooterComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return SettingsFooterComponent;
}());
export { SettingsFooterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE0QixVQUFBLEVBQXlDLE1BQU8sZUFBQSxDQUFnQjtBQUdyRztJQUVJLGlDQUFxQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUksQ0FBQztJQUV6QywwQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSw2Q0FBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLE9BQU8sR0FBd0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFjLENBQUM7WUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUNFLGtDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsTUFBTSxFQUFFLENBQUMsc1VBaUJSLENBQUM7aUJBQ0wsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHNDQUFjLEdBQW1FLGNBQU0sT0FBQTtRQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7S0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQztJQUNGLDhCQUFDO0NBNUNELEFBNENDLElBQUE7U0E1Q1ksdUJBQXVCIiwiZmlsZSI6InNldHRpbmdzLWZvb3Rlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9