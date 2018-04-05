var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { BaseDialogComponent, ConnectionTagService, DialogService, NotificationService } from '../../../../angular';
/**
 *
 */
var EditTagsDialogComponent = /** @class */ (function (_super) {
    __extends(EditTagsDialogComponent, _super);
    /**
     * Initializes a new instance of the EditTagsDialogComponent class.
     */
    function EditTagsDialogComponent(dialogService, connectionTagService, notificationService) {
        var _this = _super.call(this, dialogService) || this;
        _this.connectionTagService = connectionTagService;
        _this.notificationService = notificationService;
        _this.strings = MsftSme.resourcesStrings();
        _this.tagsToAdd = [];
        _this.tagSuggestionsToAdd = [];
        _this.tagsToRemove = [];
        _this.tagSuggestionsToRemove = [];
        _this.id = EditTagsDialogComponent.dialogComponentId;
        return _this;
    }
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    EditTagsDialogComponent.prototype.show = function (options) {
        var _this = this;
        if (!options) {
            throw new Error('EditTagsDialogComponent.show: Options are required to show the dialog.');
        }
        if (options.connections.length === 0) {
            throw new Error('EditTagsDialogComponent.show: options.connections requires at least one connection.');
        }
        this.connections = options.connections;
        this.tagsToAdd = [];
        this.tagsToRemove = [];
        this.tagSuggestionsToRemove = this.connectionTagService.getUniqueTagsFromConnections(this.connections);
        this.tagSuggestionsToAdd = [];
        this.connectionTagService.getTagSuggestions()
            .take(1)
            .subscribe(function (suggestions) { return _this.tagSuggestionsToAdd = suggestions; });
        return _super.prototype.show.call(this, options);
    };
    /**
     * The method to call when the confirm button is clicked.
     */
    EditTagsDialogComponent.prototype.onSave = function () {
        var logSource = 'EditTagsDialogComponent.onSave';
        this.connectionTagService.addRemoveTags(this.connections, this.tagsToAdd, this.tagsToRemove).subscribe(function (result) {
            // // this operation should never throw an error as its results
            // // can partially succeed so we need to check for errors in the result
            // if (result.errors && result.errors.length > 0) {
            //     if (result.changes && result.changes.count > 0) {
            //     }
            // } else {
            //     Logging.log({
            //         level: LogLevel.Success,
            //         message: `Tag changes completed. `,
            //         params: {
            //             connectionCount: this.connections.length
            //         },
            //         source: logSource
            //     });
            // }
        }, function (error) {
            // // if we get here something terrible has happend, just let the user know of the failure
            // Logging.log({
            //     level: LogLevel.Error,
            //     message: `Saved `,
            //     params: {
            //         content: this.content
            //     },
            //     source: logSource
            // });
        });
        this.hide({
            tagsAdded: this.tagsToAdd,
            tagsRemoved: this.tagsToRemove
        });
    };
    /**
     * The method to call when the cancel button is clicked.
     */
    EditTagsDialogComponent.prototype.onCancel = function () {
        this.hide({
            tagsAdded: [],
            tagsRemoved: []
        });
    };
    EditTagsDialogComponent.dialogComponentId = 'sme-shell-edit-tags-dialog';
    EditTagsDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-edit-tags-dialog',
                    template: "\n      <sme-dialog #dialog [actionPane]=\"true\">\n          <sme-dialog-header>\n              <h4 id=\"sme-dialog-title\">{{strings.MsftSmeShell.App.EditTagsDialog.title}}</h4>\n          </sme-dialog-header>\n          <sme-dialog-content>\n              <form>\n                  <div role=\"group\" [attr.aria-label]=\"strings.MsftSmeShell.App.EditTagsDialog.AddTags.label\" class=\"form-group\">\n                      <label class=\"control-label\">{{strings.MsftSmeShell.App.EditTagsDialog.AddTags.label}}</label>\n                      <sme-input type=\"tags\" name=\"tagsToAdd\" [(ngModel)]=\"tagsToAdd\" [suggestions]=\"tagSuggestionsToAdd\"></sme-input>\n                  </div>\n                  <div role=\"group\" [attr.aria-label]=\"strings.MsftSmeShell.App.EditTagsDialog.RemoveTags.label\" class=\"form-group\">\n                      <label id=\"test2\" class=\"control-label\">{{strings.MsftSmeShell.App.EditTagsDialog.RemoveTags.label}}</label>\n                      <sme-input type=\"tags\" name=\"tagsToRemove\" [(ngModel)]=\"tagsToRemove\" [suggestions]=\"tagSuggestionsToRemove\"></sme-input>\n                  </div>\n              </form>\n          </sme-dialog-content>\n          <sme-dialog-footer>\n              <button class=\"sme-button-primary\" (click)=\"onSave()\" [disabled]=\"tagsToAdd.length === 0 && tagsToRemove.length === 0\"> {{strings.MsftSmeShell.Angular.Common.save}} </button>\n              <button (click)=\"onCancel()\">{{strings.MsftSmeShell.Angular.Common.cancel}}</button>\n          </sme-dialog-footer>\n      </sme-dialog>\n    "
                },] },
    ];
    /** @nocollapse */
    EditTagsDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
        { type: ConnectionTagService, },
        { type: NotificationService, },
    ]; };
    return EditTagsDialogComponent;
}(BaseDialogComponent));
export { EditTagsDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvZWRpdC10YWdzLWRpYWxvZy9lZGl0LXRhZ3MtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBb0MsTUFBTyxlQUFBLENBQWdCO0FBR3BFLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsb0JBQW9CLEVBR3BCLGFBQWEsRUFDYixtQkFBbUIsRUFDdEIsTUFBTSxxQkFBQSxDQUFzQjtBQThCN0I7O0dBRUc7QUFFSDtJQUE2QywyQ0FBZ0U7SUFXekc7O09BRUc7SUFDSCxpQ0FDSSxhQUE0QixFQUNwQixvQkFBMEMsRUFDMUMsbUJBQXdDO1FBSHBELFlBS0ksa0JBQU0sYUFBYSxDQUFDLFNBRXZCO1FBTFcsMEJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx5QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBZDdDLGFBQU8sR0FBWSxPQUFPLENBQUMsZ0JBQWdCLEVBQVcsQ0FBQztRQUN2RCxlQUFTLEdBQWEsRUFBRSxDQUFDO1FBQ3pCLHlCQUFtQixHQUFhLEVBQUUsQ0FBQztRQUNuQyxrQkFBWSxHQUFhLEVBQUUsQ0FBQztRQUM1Qiw0QkFBc0IsR0FBYSxFQUFFLENBQUM7UUFhekMsS0FBSSxDQUFDLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQzs7SUFDeEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksc0NBQUksR0FBWCxVQUFZLE9BQThCO1FBQTFDLGlCQW9CQztRQW5CRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7UUFDOUYsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO1FBQzNHLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEVBQUU7YUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNQLFNBQVMsQ0FBQyxVQUFBLFdBQVcsSUFBSSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxXQUFXLEVBQXRDLENBQXNDLENBQUMsQ0FBQztRQUV0RSxNQUFNLENBQUMsaUJBQU0sSUFBSSxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLHdDQUFNLEdBQWI7UUFDSSxJQUFJLFNBQVMsR0FBRyxnQ0FBZ0MsQ0FBQTtRQUNoRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUNsRyxVQUFBLE1BQU07WUFDRiwrREFBK0Q7WUFDL0Qsd0VBQXdFO1lBQ3hFLG1EQUFtRDtZQUNuRCx3REFBd0Q7WUFFeEQsUUFBUTtZQUNSLFdBQVc7WUFDWCxvQkFBb0I7WUFDcEIsbUNBQW1DO1lBQ25DLDhDQUE4QztZQUM5QyxvQkFBb0I7WUFDcEIsdURBQXVEO1lBRXZELGFBQWE7WUFDYiw0QkFBNEI7WUFDNUIsVUFBVTtZQUNWLElBQUk7UUFDUixDQUFDLEVBQ0QsVUFBQSxLQUFLO1lBQ0QsMEZBQTBGO1lBRTFGLGdCQUFnQjtZQUNoQiw2QkFBNkI7WUFDN0IseUJBQXlCO1lBQ3pCLGdCQUFnQjtZQUNoQixnQ0FBZ0M7WUFDaEMsU0FBUztZQUNULHdCQUF3QjtZQUN4QixNQUFNO1FBQ1YsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ04sU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWTtTQUNqQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsV0FBVyxFQUFFLEVBQUU7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRHYSx5Q0FBaUIsR0FBRyw0QkFBNEIsQ0FBQztJQXVHNUQsa0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUseWpEQXNCVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0NBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztRQUN2QixFQUFDLElBQUksRUFBRSxvQkFBb0IsR0FBRztRQUM5QixFQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRztLQUM1QixFQUo2RixDQUk3RixDQUFDO0lBQ0YsOEJBQUM7Q0ExSUQsQUEwSUMsQ0ExSTRDLG1CQUFtQixHQTBJL0Q7U0ExSVksdUJBQXVCIiwiZmlsZSI6ImVkaXQtdGFncy1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==