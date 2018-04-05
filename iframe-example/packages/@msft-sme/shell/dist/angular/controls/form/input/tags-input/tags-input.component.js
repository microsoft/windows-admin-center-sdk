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
import { Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppContextService } from '../../../../service';
import { SmeInternalFormInputBaseComponent } from '../form-input-base.component';
var TagsInputComponent = /** @class */ (function (_super) {
    __extends(TagsInputComponent, _super);
    /**
     * Initializes a new instance of the TagsInputComponent
     */
    function TagsInputComponent(renderer, hostElement, appContextService) {
        var _this = _super.call(this, renderer, hostElement, appContextService, []) || this;
        /**
         * The current value of the new tags to add to this controls value
         */
        _this.newTags = '';
        /**
         * The suggestions property, but filtered to exclude existing tags.
         */
        _this.displayedSuggestions = [];
        /**
         * Indicates the character to use to split tags on.
         */
        _this.tagSplitCharacter = ',';
        /**
         * internal value holder for suggestions property
         */
        _this.internalSuggestions = [];
        return _this;
    }
    Object.defineProperty(TagsInputComponent.prototype, "suggestions", {
        /**
         * Suggestions for possible tags that the user could enter
         */
        get: function () {
            return this.internalSuggestions;
        },
        set: function (value) {
            this.internalSuggestions = value;
            this.updateDisplayedSuggestions();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Removes a tag from the value of this input
     * @param index the index to remove
     */
    TagsInputComponent.prototype.removeTag = function (event, index) {
        // remove the index from the array without modifying the original array.        
        var value = this.value.slice();
        value.splice(index, 1);
        this.value = value;
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Submits the current newTagsInput value as new tags for our controls value.
     */
    TagsInputComponent.prototype.submitTags = function ($event) {
        var tags = this.newTags
            .split(this.tagSplitCharacter)
            .map(function (tag) { return tag.trim().toLocaleLowerCase(); })
            .filter(function (tag) { return !MsftSme.isNullOrWhiteSpace(tag); });
        if (tags.length > 0) {
            this.value = MsftSme.unique(this.value.concat(tags).unique());
        }
        this.newTags = '';
        $event.preventDefault();
        $event.stopPropagation();
    };
    /**
     * Gets the initial host classes to be applied to this element
     * When called upon the @see BaseControl super class initialization, These classes will be automatically assigned to the host element.
     */
    TagsInputComponent.prototype.getInitialHostClasses = function () {
        return _super.prototype.getInitialHostClasses.call(this).concat([
            'sme-arrange-wrapstack-h'
        ]);
    };
    /**
     * Updates the displayed suggestions to exclude existing tags.
     */
    TagsInputComponent.prototype.updateDisplayedSuggestions = function () {
        var suggestions = this.suggestions || [];
        var tags = this.value || [];
        this.displayedSuggestions = suggestions.filter(function (s) { return tags.every(function (t) { return s !== t; }); });
    };
    /**
     * Occurs any time value changed.
     */
    TagsInputComponent.prototype.onValueChanged = function () {
        this.updateDisplayedSuggestions();
        _super.prototype.onValueChanged.call(this);
    };
    /**
     * Creates the idBag used by this component to store unique element ids.
     * id values will be assigned be the @see BaseComponent super class.
     */
    TagsInputComponent.prototype.createIdBag = function () {
        return {
            newTagSuggestionsList: ''
        };
    };
    TagsInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-input[type="tags"]',
                    template: "\n      <div class=\"sme-tag\" *ngFor=\"let tag of value; let i = index\">\n          <span class=\"sme-tag-content\">{{tag}}</span>\n          <button class=\"sme-button-trigger sme-button-auto-width sme-tag-button sme-tag-button-delete\" role=\"button\" (click)=\"removeTag($event, i)\" [attr.aria-label]=\"strings.MsftSmeShell.Angular.TagsInput.RemoveTag.labelFormat | smeFormat:tag\" [title]=\"strings.MsftSmeShell.Angular.TagsInput.RemoveTag.labelFormat | smeFormat:tag\">\n              <span class=\"sme-icon sme-icon-clear sme-icon-size-xxs\"></span>\n          </button>\n      </div>\n      <div class=\"sme-tag\">\n          <!-- This input does not need to be in a form as this entire component is meant to be used as an element within a form. -->\n          <input #newTagInput class=\"sme-tag-input\" type=\"text\" [attr.list]=\"idBag.newTagSuggestionsList\" autocomplete=\"off\" [title]=\"strings.MsftSmeShell.Angular.TagsInput.Instructions.label\" [(ngModel)]=\"newTags\" (keydown.enter)=\"submitTags($event)\" (blur)=\"submitTags($event)\"\n          />\n          <datalist [id]=\"idBag.newTagSuggestionsList\">\n              <option *ngFor=\"let suggestion of displayedSuggestions\" >{{suggestion}}</option>\n          </datalist>\n          <button class=\"sme-button-trigger sme-tag-button sme-button-auto-width sme-tag-button-add\" role=\"button\" [attr.aria-label]=\"strings.MsftSmeShell.Angular.TagsInput.AddTag.label\" [title]=\"(!value || value.length === 0) ? '' : strings.MsftSmeShell.Angular.TagsInput.AddTag.label\"\n              (click)=\"newTagInput.focus()\">\n              <span class=\"sme-icon sme-icon-add sme-icon-size-xxs\"></span>\n              <span *ngIf=\"!value || value.length === 0\">{{strings.MsftSmeShell.Angular.TagsInput.AddTag.label}}</span>\n          </button>\n      </div>\n    ",
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return TagsInputComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return TagsInputComponent; }), multi: true }
                    ]
                },] },
    ];
    /** @nocollapse */
    TagsInputComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
        { type: AppContextService, },
    ]; };
    TagsInputComponent.propDecorators = {
        'tagSplitCharacter': [{ type: Input },],
        'suggestions': [{ type: Input },],
    };
    return TagsInputComponent;
}(SmeInternalFormInputBaseComponent));
export { TagsInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZm9ybS9pbnB1dC90YWdzLWlucHV0L3RhZ3MtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFVBQUEsRUFBWSxVQUFBLEVBQXlCLEtBQUEsRUFBMEIsU0FBQSxFQUFxQixNQUFPLGVBQUEsQ0FBZ0I7QUFDL0gsT0FBTyxFQUFxQyxhQUFBLEVBQWUsaUJBQUEsRUFBNkIsTUFBTyxnQkFBQSxDQUFpQjtBQUVoSCxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyxxQkFBQSxDQUFzQjtBQUN4RCxPQUFPLEVBQUUsaUNBQUEsRUFBa0MsTUFBTyw4QkFBQSxDQUErQjtBQUdqRjtJQUF3QyxzQ0FBMkM7SUFrQy9FOztPQUVHO0lBQ0gsNEJBQ0ksUUFBbUIsRUFDbkIsV0FBdUIsRUFDdkIsaUJBQW9DO1FBSHhDLFlBS0ksa0JBQU0sUUFBUSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLENBQUMsU0FDdEQ7UUExQ0Q7O1dBRUc7UUFDSSxhQUFPLEdBQUcsRUFBRSxDQUFDO1FBRXBCOztXQUVHO1FBQ0ksMEJBQW9CLEdBQWEsRUFBRSxDQUFDO1FBRTNDOztXQUVHO1FBRUksdUJBQWlCLEdBQUcsR0FBRyxDQUFDO1FBYy9COztXQUVHO1FBQ0sseUJBQW1CLEdBQWEsRUFBRSxDQUFDOztJQVczQyxDQUFDO0lBdEJELHNCQUFXLDJDQUFXO1FBSnRCOztXQUVHO2FBRUg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3BDLENBQUM7YUFDRCxVQUF1QixLQUFlO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUE7UUFDckMsQ0FBQzs7O09BSkE7SUFzQkQ7OztPQUdHO0lBQ0ksc0NBQVMsR0FBaEIsVUFBaUIsS0FBaUIsRUFBRSxLQUFhO1FBQzdDLGdGQUFnRjtRQUNoRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzlCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUNBQVUsR0FBakIsVUFBa0IsTUFBcUI7UUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzthQUM3QixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQzthQUMxQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO1FBRXJELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sa0RBQXFCLEdBQS9CO1FBQ0ksTUFBTSxDQUFDLGlCQUFNLHFCQUFxQixXQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3hDLHlCQUF5QjtTQUM1QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSyx1REFBMEIsR0FBbEM7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxFQUFQLENBQU8sQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVEOztPQUVHO0lBQ08sMkNBQWMsR0FBeEI7UUFDSSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxpQkFBTSxjQUFjLFdBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sd0NBQVcsR0FBckI7UUFDSSxNQUFNLENBQUM7WUFDSCxxQkFBcUIsRUFBRSxFQUFFO1NBQzVCLENBQUE7SUFDTCxDQUFDO0lBQ0UsNkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUUsK3lEQW9CVDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO3dCQUM5RixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO3FCQUM3RjtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsaUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLFNBQVMsR0FBRztRQUNuQixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7UUFDcEIsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7S0FDMUIsRUFKNkYsQ0FJN0YsQ0FBQztJQUNLLGlDQUFjLEdBQTJDO1FBQ2hFLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDdkMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7S0FDaEMsQ0FBQztJQUNGLHlCQUFDO0NBMUpELEFBMEpDLENBMUp1QyxpQ0FBaUMsR0EwSnhFO1NBMUpZLGtCQUFrQiIsImZpbGUiOiJ0YWdzLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=