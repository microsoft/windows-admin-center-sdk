/**
 * The representation of a step in the wizard component.
 */
var WizardStep = (function () {
    /**
     * Initializes a new instance of the WizardStep class.
     *
     * @param renderer - The component to dynamically render when the step is selected.
     * @param options - The options to supply the step with data.
     */
    function WizardStep(renderer, options) {
        this.renderer = renderer;
        this.completed = false;
        this.dependencies = options.dependencies || [];
        this.disabled = options.disabled || false;
        this.name = options.name;
    }
    Object.defineProperty(WizardStep.prototype, "completed", {
        /**
         * Gets whether or not the step is completed.
         */
        get: function () {
            return this.isCompleted;
        },
        /**
         * Sets whether or not the step is completed.
         */
        set: function (value) {
            this.isCompleted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStep.prototype, "disabled", {
        /**
         * Gets whether or not the step is disabled.
         */
        get: function () {
            return this.isDisabled || (this.dependencies && this.dependencies.some(function (dep) { return !dep.completed || dep.disabled; }));
        },
        /**
         * Sets whether or not the step is disabled.
         */
        set: function (value) {
            this.isDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Completes the step.
     */
    WizardStep.prototype.complete = function () {
        this.completed = true;
    };
    /**
     * Fails the step.
     */
    WizardStep.prototype.fail = function () {
        this.completed = false;
    };
    return WizardStep;
}());
export { WizardStep };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvd2l6YXJkL21vZGVscy93aXphcmQtc3RlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTs7R0FFRztBQUNIO0lBaURJOzs7OztPQUtHO0lBQ0gsb0JBQTRCLFFBQW1CLEVBQUUsT0FBMEI7UUFBL0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUF4REQsc0JBQVcsaUNBQVM7UUFIcEI7O1dBRUc7YUFDSDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7UUFFRDs7V0FFRzthQUNILFVBQXFCLEtBQWM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BUEE7SUFZRCxzQkFBVyxnQ0FBUTtRQUhuQjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQTlCLENBQThCLENBQUMsQ0FBQyxDQUFDO1FBQ3JILENBQUM7UUFFRDs7V0FFRzthQUNILFVBQW9CLEtBQWM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7O09BUEE7SUEwQ0Q7O09BRUc7SUFDSSw2QkFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0kseUJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDTCxpQkFBQztBQUFELENBM0VBLEFBMkVDLElBQUEiLCJmaWxlIjoid2l6YXJkLXN0ZXAuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9