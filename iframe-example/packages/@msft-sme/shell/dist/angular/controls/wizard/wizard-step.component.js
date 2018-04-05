/**
 * A base class for components dynamically rendered in a wizard.
 */
var WizardStepComponent = /** @class */ (function () {
    function WizardStepComponent() {
    }
    Object.defineProperty(WizardStepComponent.prototype, "valid", {
        /**
         * Gets whether or not the component is valid.
         */
        get: function () {
            if (this.isValid == null) {
                return true;
            }
            return this.isValid;
        },
        /**
         * Sets whether or not the component is valid.
         */
        set: function (value) {
            this.isValid = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    return WizardStepComponent;
}());
export { WizardStepComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvd2l6YXJkL3dpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQTs7R0FFRztBQUNIO0lBQUE7SUFzQ0EsQ0FBQztJQWxDRyxzQkFBVyxzQ0FBSztRQUhoQjs7V0FFRzthQUNIO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBRUQ7O1dBRUc7YUFDSCxVQUFpQixLQUFjO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7OztPQVBBO0lBQUEsQ0FBQztJQTRCTiwwQkFBQztBQUFELENBdENBLEFBc0NDLElBQUEiLCJmaWxlIjoid2l6YXJkLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==