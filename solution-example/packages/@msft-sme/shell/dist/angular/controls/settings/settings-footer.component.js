import { Component, ElementRef } from '@angular/core';
var SettingsFooterComponent = (function () {
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
    return SettingsFooterComponent;
}());
export { SettingsFooterComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvc2V0dGluZ3Mvc2V0dGluZ3MtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUE0QixVQUFBLEVBQXlDLE1BQU8sZUFBQSxDQUFnQjtBQUdyRztJQUVJLGlDQUFxQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUksQ0FBQztJQUV6QywwQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSw2Q0FBVyxHQUFsQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLE9BQU8sR0FBd0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFjLENBQUM7WUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQTZCTCw4QkFBQztBQUFELENBNUNBLEFBNENDOztBQTVCTSxrQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLHNVQWlCUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHNDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7Q0FDbkIsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJzZXR0aW5ncy1mb290ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==