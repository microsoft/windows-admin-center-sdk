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
import { HostBinding, Input } from '@angular/core';
import { BaseControl } from '../../common/base-control.component';
/**
 * Base component class for form inputs. Inputs are the editable content portion of a form field
 */
var FormInputBaseComponent = /** @class */ (function (_super) {
    __extends(FormInputBaseComponent, _super);
    /**
     * Constructs a new instance of FormInputBaseComponent
     */
    function FormInputBaseComponent(renderer, hostElement, appContextService, initialValue) {
        var _this = _super.call(this, renderer, hostElement, appContextService) || this;
        /**
         * Indicates that this form control is disabled
         */
        _this.disabled = false;
        /**
         * Placeholder for the onChange callback that is registered by the Forms API
         */
        _this.onChange = MsftSme.noop;
        /**
         * Placeholder for the onTouched callback that is registered by the Forms API
         */
        _this.onTouched = MsftSme.noop;
        _this.value = initialValue;
        return _this;
    }
    Object.defineProperty(FormInputBaseComponent.prototype, "value", {
        /**
         * Getter for the forms actual value
         */
        get: function () {
            return this.internalValue;
        },
        /**
         * Setter for the forms actual value.
         */
        set: function (value) {
            this.internalValue = value;
            this.onValueChanged();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implementation of ControlValueAccessor interface.
     * Registers a callback function that should be called when the control's value changes in the UI.
     * @param fn the onChange function to call when the control should propagated changes to the view
     */
    FormInputBaseComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * Implementation of ControlValueAccessor interface.
     * Registers a callback function that should be called when the control receives a blur event.
     * @param fn the onTouched function to call when the control should be considered blurred
     */
    FormInputBaseComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Implementation of ControlValueAccessor interface.
     * Called when the controls status changes to or from "DISABLED"
     * @param isDisabled Indicates if the control should be disabled.
     */
    FormInputBaseComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * Implementation of ControlValueAccessor interface.
     * This method will be called by the forms API to write to the view when programmatic (model -> view) changes are requested.
     * @param value The new value of the model for this form control
     */
    FormInputBaseComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Implementation of Validator interface.
     * Validates the value of this control
     * @param changes The changed properties
     * @return Formatted null when valid, otherwise returns a validation object in the form of "{ errorType: {valid: false} }".
     */
    FormInputBaseComponent.prototype.validate = function (c) {
        // currently this base class has no common validation. (but it will in the future! ex. 'required' validation)
        // classes that extend this one should override this function to provide aditional input specific validation.
        return null;
    };
    /**
     * Occurs any time value changed.
     */
    FormInputBaseComponent.prototype.onValueChanged = function () {
        this.onChange(this.value);
    };
    FormInputBaseComponent.propDecorators = {
        'disabled': [{ type: Input }, { type: HostBinding, args: ['class.sme-disabled',] },],
    };
    return FormInputBaseComponent;
}(BaseControl));
export { FormInputBaseComponent };
/**
 * Internal base component for SME. It simply removes the need to supply the string type parameter to FormInputBaseComponent
 * This class is exported from this file, but not meant to be exported from index.ts bundles.
 */
var SmeInternalFormInputBaseComponent = /** @class */ (function (_super) {
    __extends(SmeInternalFormInputBaseComponent, _super);
    function SmeInternalFormInputBaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SmeInternalFormInputBaseComponent;
}(FormInputBaseComponent));
export { SmeInternalFormInputBaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvZm9ybS9pbnB1dC9mb3JtLWlucHV0LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWMsV0FBQSxFQUFhLEtBQUEsRUFBZ0MsTUFBTyxlQUFBLENBQWdCO0FBSXpGLE9BQU8sRUFBRSxXQUFBLEVBQVksTUFBTyxxQ0FBQSxDQUFzQztBQUVsRTs7R0FFRztBQUNIO0lBQThELDBDQUFxQjtJQXVDL0U7O09BRUc7SUFDSCxnQ0FDSSxRQUFtQixFQUNuQixXQUF1QixFQUN2QixpQkFBb0MsRUFDcEMsWUFBb0I7UUFKeEIsWUFNSSxrQkFBTSxRQUFRLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDLFNBRWxEO1FBaEREOztXQUVHO1FBR0ksY0FBUSxHQUFHLEtBQUssQ0FBQztRQUV4Qjs7V0FFRztRQUNJLGNBQVEsR0FBNEIsT0FBTyxDQUFDLElBQUksQ0FBQztRQUV4RDs7V0FFRztRQUNJLGVBQVMsR0FBbUIsT0FBTyxDQUFDLElBQUksQ0FBQztRQWdDNUMsS0FBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7O0lBQzlCLENBQUM7SUE1QkQsc0JBQVcseUNBQUs7UUFIaEI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7UUFFRDs7V0FFRzthQUNILFVBQWlCLEtBQWE7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7OztPQVJBO0lBNEJEOzs7O09BSUc7SUFDSSxpREFBZ0IsR0FBdkIsVUFBd0IsRUFBMkI7UUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrREFBaUIsR0FBeEIsVUFBeUIsRUFBa0I7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpREFBZ0IsR0FBdkIsVUFBd0IsVUFBbUI7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwyQ0FBVSxHQUFqQixVQUFrQixLQUFhO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHlDQUFRLEdBQWYsVUFBZ0IsQ0FBYztRQUMxQiw2R0FBNkc7UUFDN0csNkdBQTZHO1FBQzdHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sK0NBQWMsR0FBeEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0UscUNBQWMsR0FBMkM7UUFDaEUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLG9CQUFvQixFQUFHLEVBQUUsRUFBRTtLQUNuRixDQUFDO0lBQ0YsNkJBQUM7Q0E3R0QsQUE2R0MsQ0E3RzZELFdBQVcsR0E2R3hFO1NBN0dZLHNCQUFzQjtBQStHbkM7OztHQUdHO0FBQ0g7SUFBK0QscURBQXVDO0lBQXRHOztJQUVBLENBQUM7SUFBRCx3Q0FBQztBQUFELENBRkEsQUFFQyxDQUY4RCxzQkFBc0IsR0FFcEYiLCJmaWxlIjoiZm9ybS1pbnB1dC1iYXNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=