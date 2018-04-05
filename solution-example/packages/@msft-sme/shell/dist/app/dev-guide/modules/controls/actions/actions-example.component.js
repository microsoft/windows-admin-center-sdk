import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActionButton } from '../../../../../angular';
import { Logging, LogLevel } from '../../../../../core';
import { ModelDrivenAction1, ModelDrivenAction2, ModelDrivenAction3, ModelDrivenActionWithError } from './model-driven-action';
var ActionsExampleComponent = (function () {
    function ActionsExampleComponent(changeDetector) {
        var _this = this;
        this.changeDetector = changeDetector;
        this.inlineExampleText = 'I was defined inline!';
        this.inlineItems = [this.inlineExampleText];
        this.enableToggle = true;
        this.actions = [];
        this.customActions = [
            new ModelDrivenAction1(),
            new ModelDrivenAction1(),
            new ModelDrivenAction2(),
            new ModelDrivenAction2(),
            new ModelDrivenAction3(),
            new ModelDrivenAction3(),
            new ModelDrivenAction3(),
            new ModelDrivenActionWithError()
        ];
        this.actionTarget = {
            disable1: false,
            disable2: true,
            hidden3: true
        };
        var _loop_1 = function (i) {
            var b1 = new ActionButton();
            var toggle = function () {
                b1.enabled = !b1.enabled;
                b1.text = "Enabled: " + b1.enabled;
                b1.iconClass = "glyph glyph-" + (b1.enabled ? 'like' : 'dislike');
            };
            toggle();
            b1.execute = function () { return alert("You clicked button #" + ((i * 3) + 1)); };
            var b2 = new ActionButton();
            b2.text = "Toggle Button #" + ((i * 3) + 1);
            b2.iconClass = 'glyph glyph-back';
            b2.execute = toggle;
            var b3 = new ActionButton();
            b3.text = "A really long action that will result in creating an ellipsis " + i;
            b3.iconClass = 'glyph glyph-emoji-2';
            b3.execute = function () { return alert("You clicked button #" + ((i * 3) + 3)); };
            this_1.actions.push(b1, b2, b3);
        };
        var this_1 = this;
        for (var i = 0; i < 2; i++) {
            _loop_1(i);
        }
        var bAdd = new ActionButton();
        bAdd.text = "Add Inline button";
        bAdd.iconClass = 'glyph glyph-add';
        bAdd.execute = function () { return _this.inlineItems.push(_this.inlineExampleText); };
        this.actions.push(bAdd);
    }
    ActionsExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-action-bar';
    };
    ActionsExampleComponent.prototype.removeInline = function (index) {
        this.inlineItems.splice(index, 1);
    };
    ActionsExampleComponent.prototype.onError = function (args) {
        alert("Received Async Error from \"" + args.item.text + "\": \n\n\"" + args.error + "\"\n");
    };
    ActionsExampleComponent.prototype.onExecuted = function (args) {
        Logging.log({
            level: LogLevel.Informational,
            message: "Received Result from " + args.item.text,
            params: {},
            source: 'ActionsExampleComponent'
        });
    };
    return ActionsExampleComponent;
}());
export { ActionsExampleComponent };
ActionsExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-actions-example',
                template: "\n      <div class=\"tool-container m-r-xs border-all\">\n          <h3>Defined actions from component</h3>\n          <sme-action-bar [actions]=\"actions\"></sme-action-bar>\n\n          <h3>Defined actions from html</h3>\n          <sme-action-bar>\n              <sme-action-button #action [text]=\"'start enabled'\" [enabled]=\"enableToggle\" (execute)=\"enableToggle = !enableToggle\"></sme-action-button>\n              <sme-action-button #action [text]=\"'starts disabled'\" [enabled]=\"!enableToggle\" (execute)=\"enableToggle = !enableToggle\"></sme-action-button>\n              <sme-action-button #action *ngFor=\"let inline of inlineItems; let i = index\" [text]=\"inline\" (execute)=\"removeInline(i)\"></sme-action-button>\n          </sme-action-bar>\n\n          <h3>Defined actions from both</h3>\n          <sme-action-bar [actions]=\"actions\">\n              <sme-action-button #action *ngFor=\"let inline of inlineItems; let i = index\" [text]=\"inline\" (execute)=\"removeInline(i)\"></sme-action-button>\n          </sme-action-bar>\n\n          <h3>Model Driven example</h3>\n          <sme-action-bar #custom [actions]=\"customActions\" [target]=\"actionTarget\" (error)=\"onError($event)\" (executed)=\"onExecuted($event)\"> </sme-action-bar>\n      </div>\n    "
            },] },
];
/** @nocollapse */
ActionsExampleComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
ActionsExampleComponent.propDecorators = {
    'customActionBar': [{ type: ViewChild, args: ['custom',] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9hY3Rpb25zL2FjdGlvbnMtZXhhbXBsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFBLEVBQW1CLFNBQUEsRUFBVyxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBSXhFLE9BQU8sRUFFSCxZQUFZLEVBTWYsTUFBTSx3QkFBQSxDQUF5QjtBQUNoQyxPQUFPLEVBQUUsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLHFCQUFBLENBQXNCO0FBQ3hELE9BQU8sRUFBRSxrQkFBQSxFQUFvQixrQkFBQSxFQUFvQixrQkFBQSxFQUFvQiwwQkFBQSxFQUFvQyxNQUFPLHVCQUFBLENBQXdCO0FBR3hJO0lBOEJJLGlDQUFvQixjQUFpQztRQUFyRCxpQkEyQkM7UUEzQm1CLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQTFCOUMsc0JBQWlCLEdBQUcsdUJBQXVCLENBQUM7UUFDNUMsZ0JBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZDLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXBCLFlBQU8sR0FBaUIsRUFBRSxDQUFDO1FBQzNCLGtCQUFhLEdBQWlDO1lBQ2pELElBQUksa0JBQWtCLEVBQUU7WUFDeEIsSUFBSSxrQkFBa0IsRUFBRTtZQUN4QixJQUFJLGtCQUFrQixFQUFFO1lBQ3hCLElBQUksa0JBQWtCLEVBQUU7WUFDeEIsSUFBSSxrQkFBa0IsRUFBRTtZQUN4QixJQUFJLGtCQUFrQixFQUFFO1lBQ3hCLElBQUksa0JBQWtCLEVBQUU7WUFDeEIsSUFBSSwwQkFBMEIsRUFBRTtTQUNuQyxDQUFDO1FBRUssaUJBQVksR0FBWTtZQUMzQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQztnQ0FPVyxDQUFDO1lBQ04sSUFBSSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUM1QixJQUFJLE1BQU0sR0FBRztnQkFDVCxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDekIsRUFBRSxDQUFDLElBQUksR0FBRyxjQUFZLEVBQUUsQ0FBQyxPQUFTLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxTQUFTLEdBQUcsa0JBQWUsRUFBRSxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFFLENBQUM7WUFDcEUsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxFQUFFLENBQUM7WUFDVCxFQUFFLENBQUMsT0FBTyxHQUFHLGNBQU0sT0FBQSxLQUFLLENBQUMsMEJBQXVCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDLEVBQTNDLENBQTJDLENBQUM7WUFDL0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsSUFBSSxHQUFHLHFCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQztZQUMxQyxFQUFFLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBRXBCLElBQUksRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDNUIsRUFBRSxDQUFDLElBQUksR0FBRyxtRUFBaUUsQ0FBRyxDQUFDO1lBQy9FLEVBQUUsQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7WUFDckMsRUFBRSxDQUFDLE9BQU8sR0FBRyxjQUFNLE9BQUEsS0FBSyxDQUFDLDBCQUF1QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDO1lBQy9ELE9BQUssT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7O1FBbkJELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFBakIsQ0FBQztTQW1CVDtRQUVELElBQUksSUFBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUE3QyxDQUE2QyxDQUFDO1FBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUEvQmEsdUNBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUErQk0sOENBQVksR0FBbkIsVUFBb0IsS0FBYTtRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLHlDQUFPLEdBQWQsVUFBZSxJQUE4QjtRQUN6QyxLQUFLLENBQUMsaUNBQThCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBVyxJQUFJLENBQUMsS0FBSyxTQUFLLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0sNENBQVUsR0FBakIsVUFBa0IsSUFBaUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYTtZQUM3QixPQUFPLEVBQUUsMEJBQXdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBTTtZQUNqRCxNQUFNLEVBQUUsRUFBRTtZQUNWLE1BQU0sRUFBRSx5QkFBeUI7U0FDcEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWtDTCw4QkFBQztBQUFELENBNUdBLEFBNEdDOztBQWpDTSxrQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLFFBQVEsRUFBRSwwd0NBb0JUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHNDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztDQUMxQixFQUY2RixDQUU3RixDQUFDO0FBQ0ssc0NBQWMsR0FBMkM7SUFDaEUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFHLEVBQUUsRUFBRTtDQUM1RCxDQUFDIiwiZmlsZSI6ImFjdGlvbnMtZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9