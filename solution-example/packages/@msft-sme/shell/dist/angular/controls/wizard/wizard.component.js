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
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { Logging, LogLevel } from '../../../core';
import { DynamicComponentBase } from '../common/dynamic.component';
/**
 * The component class definitions for the wizard footer component.
 */
var WizardFooterComponent = (function () {
    function WizardFooterComponent() {
    }
    return WizardFooterComponent;
}());
export { WizardFooterComponent };
WizardFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-wizard-footer',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
WizardFooterComponent.ctorParameters = function () { return []; };
/**
 * The component class definition for the wizard component.
 */
var WizardComponent = (function (_super) {
    __extends(WizardComponent, _super);
    /**
     * Initializes a new instance of the WizardComponent class.
     *
     * @param changeDetectorRef - The change detector.
     * @param componentFactoryResolver - The component factory resolver.
     */
    function WizardComponent(changeDetectorRef, componentFactoryResolver) {
        var _this = _super.call(this, componentFactoryResolver) || this;
        _this.changeDetectorRef = changeDetectorRef;
        /**
         * The event fired when the cancel button is clicked.
         */
        _this.onCancelClicked = new EventEmitter();
        /**
         * The event fired whenever a wizard component reports that the enter key was pressed.
         */
        _this.onComponentSubmitted = new EventEmitter();
        /**
         * The event fired whenever a step validation fails.
         */
        _this.onError = new EventEmitter();
        /**
         * The event fired when the finish button is clicked.
         */
        _this.onFinishClicked = new EventEmitter();
        /**
         * Resource strings for the component.
         */
        _this.strings = MsftSme.resourcesStrings();
        return _this;
    }
    Object.defineProperty(WizardComponent.prototype, "model", {
        /**
         * Gets the data model for sharing data across the wizard.
         */
        get: function () {
            return this.dataModel;
        },
        /**
         * Sets the data model for sharing data across the wizard.
         */
        set: function (value) {
            this.dataModel = value;
            if (this.ref) {
                this.ref.instance.model = this.model;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "currentStep", {
        /**
         * Gets the current step of the wizard.
         */
        get: function () {
            return this.steps[this.stepIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "currentStepComponent", {
        /**
         * Gets the dynamically rendered component of the current step.
         */
        get: function () {
            return this.ref.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "nextButtonText", {
        /**
         * Gets the text for the next button.
         */
        get: function () {
            if (this.stepIndex === this.steps.length - 1) {
                return this.strings.MsftSmeShell.Angular.Common.finish;
            }
            else {
                return this.strings.MsftSmeShell.Angular.Common.next;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "showButtons", {
        /**
         * Gets whether or not to show the buttons for navigating the wizard.
         */
        get: function () {
            if (this.footerComponent) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardComponent.prototype, "stepIndex", {
        /**
         * Gets the index of the current step of the wizard.
         */
        get: function () {
            return this.index;
        },
        /**
         * Sets the index of the current step of the wizard.
         */
        set: function (value) {
            if (!this.steps[value]) {
                Logging.log({
                    level: LogLevel.Error,
                    message: 'Attempted to set stepIndex to invalid value.',
                    params: {
                        targetIndex: value,
                        steps: this.steps
                    },
                    source: 'WizardComponent.stepIndex setter'
                });
            }
            else {
                this.index = value;
                this.cleanComponent();
                this.componentType = this.currentStep.renderer;
                this.createComponent();
                this.changeDetectorRef.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Marks the current step of the wizard as complete.
     *
     * @returns True if the step was completed and false if not.
     */
    WizardComponent.prototype.completeCurrentStep = function () {
        if (this.currentStep) {
            this.currentStep.complete();
        }
        return this.currentStep.completed;
    };
    /**
     * Completes a specific step.
     *
     * @param stepIndex - The index of the target step.
     * @returns True if the step was completed and false if not.
     */
    WizardComponent.prototype.completeStep = function (stepIndex) {
        if (this.steps[stepIndex]) {
            this.steps[stepIndex].complete();
        }
        return this.currentStep.completed;
    };
    /**
     * Marks the current step of the wizard as incomplete.
     *
     * @returns True if the step was failed and false if not.
     */
    WizardComponent.prototype.failCurrentStep = function () {
        if (this.currentStep) {
            this.currentStep.fail();
        }
        return !this.currentStep.completed;
    };
    /**
     * Fails a specific step.
     *
     * @param stepIndex - The index of the target step.
     * @returns True if the step was failed and false if not.
     */
    WizardComponent.prototype.failStep = function (stepIndex) {
        if (this.steps[stepIndex]) {
            this.steps[stepIndex].fail();
        }
        return !this.currentStep.completed;
    };
    /**
     * Moves the wizard to the next step in the list, if possible.
     */
    WizardComponent.prototype.moveToNextStep = function () {
        if (this.steps[this.stepIndex + 1]) {
            this.stepIndex++;
        }
    };
    /**
     * Moves the wizard to the previous step in the list, is possible.
     */
    WizardComponent.prototype.moveToPreviousStep = function () {
        if (this.steps[this.stepIndex - 1]) {
            this.stepIndex--;
        }
    };
    /**
     * The method to run when the component is initialized.
     */
    WizardComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!this.steps) {
            Logging.log({
                level: LogLevel.Error,
                message: "The 'steps' array is not valid.",
                params: {
                    steps: this.steps
                },
                source: 'WizardComponent.ngOnInit'
            });
        }
        if (!this.model) {
            Logging.log({
                level: LogLevel.Error,
                message: "The 'model' attribute is not valid.",
                params: {
                    model: this.model
                },
                source: 'WizardComponent.ngOnInit'
            });
        }
        this.stepIndex = 0;
        this.validating = false;
    };
    /**
     * The method called when the back button is clicked.
     */
    WizardComponent.prototype.onBackClick = function () {
        this.failCurrentStep();
        this.moveToPreviousStep();
    };
    /**
     * The method called when the cancel button is clicked.
     */
    WizardComponent.prototype.onCancelClick = function () {
        this.onCancelClicked.emit();
    };
    /**
     * The method called when the next button is clicked.
     */
    WizardComponent.prototype.onNextClick = function () {
        var _this = this;
        if (this.stepIndex === this.steps.length - 1) {
            this.completeCurrentStep();
            this.onFinishClicked.emit();
        }
        else {
            if (this.ref.instance.runValidation) {
                this.validating = true;
                this.ref.instance.runValidation().subscribe(function (validationResult) {
                    if (validationResult.isValid) {
                        _this.completeCurrentStep();
                        _this.moveToNextStep();
                    }
                    else {
                        _this.failCurrentStep();
                        _this.onError.emit(validationResult);
                    }
                    _this.validating = false;
                });
            }
            else {
                this.completeCurrentStep();
                this.moveToNextStep();
            }
        }
    };
    /**
     * The method called when a step is clicked.
     *
     * @param clickedStepIndex - The index of the clicked step.
     */
    WizardComponent.prototype.onStepClick = function (clickedStepIndex) {
        var targetStep = this.steps[clickedStepIndex];
        var stepIsActive = this.stepIndex === clickedStepIndex;
        if ((targetStep && !targetStep.disabled) && !stepIsActive) {
            this.stepIndex = clickedStepIndex;
        }
    };
    /**
     * Marks all steps as incomplete and moves the wizard back to the first step.
     */
    WizardComponent.prototype.reset = function () {
        this.steps.forEach(function (step) {
            if (step) {
                step.fail();
            }
        });
        this.stepIndex = 0;
    };
    WizardComponent.prototype.createComponent = function () {
        var _this = this;
        if (this.currentStep) {
            _super.prototype.createComponent.call(this);
            this.ref.instance.model = this.model;
            this.ref.instance.componentSubmitted = function () {
                if (_this.showButtons) {
                    _this.onNextClick();
                }
                else {
                    _this.onComponentSubmitted.emit();
                }
            };
        }
    };
    WizardComponent.prototype.cleanComponent = function () {
        if (this.ref && this.ref.instance) {
            this.ref.instance.componentSubmitted = MsftSme.noop;
        }
        _super.prototype.cleanComponent.call(this);
    };
    return WizardComponent;
}(DynamicComponentBase));
export { WizardComponent };
WizardComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-wizard',
                styles: ["\n      section.left {\n          border-right: 1px solid #e4e4e4;\n          margin: 0 0 0 36px;\n          padding: 48px 0 36px 0;\n          width: 320px;\n      }\n\n      section.right {\n          margin: 120px 0 36px 72px;\n      }\n\n      .wizard-title {\n          margin: 0 0 36px 0;\n      }\n\n      .wizard-title * {\n          padding: 0;\n          margin: 0;\n          line-height: 36px;\n      }\n\n      .step-list {\n          padding: 0;\n          margin: 0;\n      }\n\n      .step {\n          align-items: center;\n          cursor: pointer;\n          height: 48px;\n          list-style-type: none;\n          user-select: none;\n          margin: 0;\n          padding: 0;\n      }\n\n      .step.active * {\n          font-weight: bold;\n      }\n\n      .step.active *::before {\n          font-weight: bold;\n      }\n\n      .step.disabled {\n          cursor: not-allowed;\n          opacity: .6;\n      }\n\n      .step-index {\n          background: transparent;\n          border-radius: 16px;\n          font-size: 15px;\n          height: 32px;\n          line-height: 20px;\n          text-align: center;\n          padding: 5px 0 0 0; /* There's gotta be a better way to vertically center the number than putting padding...*/\n          width: 32px;\n      }\n\n      .step.active .step-index {\n          background: #e4e4e4;\n      }\n\n      .step:hover .step-index {\n          background: #e4e4e4;\n      }\n\n      .step-title {\n          font-size: 15px;\n          line-height: 20px;\n          margin: 0 0 0 12px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n      }\n\n      .wizard-buttons {\n          float: right;\n      }\n\n      :host >>> .progress-cover {\n          height: 20px;\n          width: 20px;\n          margin-top: 10px;\n      }\n\n      .validation-loading-wheel {\n          display: inline-block;\n          height: 20px;\n          width: 20px;\n      }\n\n      .validation-label {\n          vertical-align: -webkit-baseline-middle;\n          font-size: 15px;\n          line-height: 20px;\n          margin-right: 8px;\n      }\n    "],
                template: "\n      <div class=\"flex-layout\">\n        <section class=\"left fixed-flex-size\">\n          <div *ngIf=\"title\" class=\"wizard-title\">\n            <h4>{{title}}</h4>\n          </div>\n\n          <ul class=\"step-list\">\n            <li [class.active]=\"i === stepIndex\" [class.disabled]=\"step.disabled\" class=\"step flex-layout\" *ngFor=\"let step of steps; let i = index\"\n              (click)=\"onStepClick(i)\">\n              <span [class.sme-icon]=\"step.completed\" [class.icon-win-accept]=\"step.completed\" class=\"fixed-flex-size step-index\">{{!step.completed ? i + 1 : ''}}</span>\n              <span class=\"auto-flex-size step-title\">{{step.name}}</span>\n            </li>\n          </ul>\n        </section>\n\n        <section class=\"relative right auto-flex-size flex-display\">\n          <div class=\"auto-flex-size\">\n            <!-- Don't remove this line! -->\n            <!-- The dynamically rendered component looks for #container to render itself as the sibling -->\n            <div #container></div>\n          </div>\n\n          <div class=\"fixed-flex-size\">\n            <ng-content select=\"sme-wizard-footer\"></ng-content>\n            <div *ngIf=\"showButtons\" class=\"flex-display wizard-buttons\">\n              <div *ngIf=\"validating\" class=\"relative validation-loading-wheel\">\n                <sme-loading-wheel size=\"small\"></sme-loading-wheel>\n              </div>\n              <span *ngIf=\"validating\" class=\"validation-label\">{{strings.MsftSmeShell.Angular.Wizard.validating}}</span>\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"onBackClick()\" [disabled]=\"!currentStepComponent.valid || validating\">{{strings.MsftSmeShell.Angular.Common.back}}</button>\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"onNextClick()\" [disabled]=\"!currentStepComponent.valid || validating\">{{strings.MsftSmeShell.Angular.Common.next}}</button>\n              <button class=\"btn btn-secondary\" type=\"button\" (click)=\"onCancelClick()\">{{strings.MsftSmeShell.Angular.Common.cancel}}</button>\n            </div>\n          </div>\n        </section>\n      </div>\n    "
            },] },
];
/** @nocollapse */
WizardComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
    { type: ComponentFactoryResolver, },
]; };
WizardComponent.propDecorators = {
    'model': [{ type: Input },],
    'steps': [{ type: Input },],
    'title': [{ type: Input },],
    'onCancelClicked': [{ type: Output },],
    'onComponentSubmitted': [{ type: Output },],
    'onError': [{ type: Output },],
    'onFinishClicked': [{ type: Output },],
    'footerComponent': [{ type: ContentChild, args: [WizardFooterComponent,] },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvd2l6YXJkL3dpemFyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBQSxFQUFtQixTQUFBLEVBQVcsd0JBQUEsRUFBMEIsWUFBQSxFQUFjLFlBQUEsRUFBYyxLQUFBLEVBQWUsTUFBQSxFQUFPLE1BQU8sZUFBQSxDQUFnQjtBQUMxSSxPQUFPLEVBQUUsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFHbEQsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8sNkJBQUEsQ0FBOEI7QUFJbkU7O0dBRUc7QUFFSDtJQUFBO0lBVUEsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FWQSxBQVVDOztBQVRNLGdDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLDJCQUEyQjthQUN4QyxFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsb0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7QUFHRjs7R0FFRztBQUVIO0lBQXFDLG1DQUFzRDtJQXFLdkY7Ozs7O09BS0c7SUFDSCx5QkFDWSxpQkFBb0MsRUFDNUMsd0JBQWtEO1FBRnRELFlBSUksa0JBQU0sd0JBQXdCLENBQUMsU0FDbEM7UUFKVyx1QkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBbkpoRDs7V0FFRztRQUVJLHFCQUFlLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFdEU7O1dBRUc7UUFFSSwwQkFBb0IsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUUzRTs7V0FFRztRQUVJLGFBQU8sR0FBdUMsSUFBSSxZQUFZLEVBQXdCLENBQUM7UUFFOUY7O1dBRUc7UUFFSSxxQkFBZSxHQUF1QixJQUFJLFlBQVksRUFBUSxD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QUM7b0JBQ0osS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQyxDQUFDO1lBRUwsQ0FBQyxDQUFDO1FBQ04sQ0FBQztJQUNMLENBQUM7SUFFUyx3Q0FBYyxHQUF4QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEQsQ0FBQztRQUVELGlCQUFNLGNBQWMsV0FBRSxDQUFDO0lBQzNCLENBQUM7SUFnS0wsc0JBQUM7QUFBRCxDQXJoQkEsQUFxaEJDLENBcmhCb0Msb0JBQW9COztBQXNYbEQsMEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsTUFBTSxFQUFFLENBQUMsMG5FQW9HUixDQUFDO2dCQUNGLFFBQVEsRUFBRSx5cEVBcUNUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDhCQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztJQUMzQixFQUFDLElBQUksRUFBRSx3QkFBd0IsR0FBRztDQUNqQyxFQUg2RixDQUc3RixDQUFDO0FBQ0ssOEJBQWMsR0FBMkM7SUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDM0IsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDM0IsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDM0IsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUN0QyxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzlCLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDdEMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMscUJBQXFCLEVBQUcsRUFBRSxFQUFFO0NBQzVFLENBQUMiLCJmaWxlIjoid2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=