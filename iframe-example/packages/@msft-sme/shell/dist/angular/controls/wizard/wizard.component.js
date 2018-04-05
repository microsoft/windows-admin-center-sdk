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
var WizardFooterComponent = /** @class */ (function () {
    function WizardFooterComponent() {
    }
    WizardFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-wizard-footer',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    WizardFooterComponent.ctorParameters = function () { return []; };
    return WizardFooterComponent;
}());
export { WizardFooterComponent };
/**
 * The component class definition for the wizard component.
 */
var WizardComponent = /** @class */ (function (_super) {
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
    WizardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-wizard',
                    styles: ["\n      section.left {\n          border-right: 1px solid #e4e4e4;\n          margin: 0 0 0 36px;\n          padding: 48px 0 36px 0;\n          width: 320px;\n      }\n\n      section.right {\n          margin: 120px 0 36px 72px;\n      }\n\n      .wizard-title {\n          margin: 0 0 36px 0;\n      }\n\n      .wizard-title * {\n          padding: 0;\n          margin: 0;\n          line-height: 36px;\n      }\n\n      .step-list {\n          padding: 0;\n          margin: 0;\n      }\n\n      .step {\n          align-items: center;\n          cursor: pointer;\n          height: 48px;\n          list-style-type: none;\n          user-select: none;\n          margin: 0;\n          padding: 0;\n      }\n\n      .step.active * {\n          font-weight: bold;\n      }\n\n      .step.active *::before {\n          font-weight: bold;\n      }\n\n      .step.disabled {\n          cursor: not-allowed;\n          opacity: .6;\n      }\n\n      .step-index {\n          background: transparent;\n          border-radius: 16px;\n          font-size: 15px;\n          height: 32px;\n          line-height: 20px;\n          text-align: center;\n          padding: 5px 0 0 0; /* There's gotta be a better way to vertically center the number than putting padding...*/\n          width: 32px;\n      }\n\n      .step.active .step-index {\n          background: #e4e4e4;\n      }\n\n      .step:hover .step-index {\n          background: #e4e4e4;\n      }\n\n      .step-title {\n          font-size: 15px;\n          line-height: 20px;\n          margin: 0 0 0 12px;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n      }\n\n      .wizard-buttons {\n          float: right;\n      }\n\n      :host >>> .progress-cover {\n          height: 20px;\n          width: 20px;\n          margin-top: 10px;\n      }\n\n      .validation-loading-wheel {\n          display: inline-block;\n          height: 20px;\n          width: 20px;\n      }\n\n      .validation-label {\n          vertical-align: -webkit-baseline-middle;\n          font-size: 15px;\n          line-height: 20px;\n          margin-right: 8px;\n      }\n    "],
                    template: "\n      <div class=\"sme-arrange-stack-h\">\n          <section class=\"left sme-position-flex-none\">\n              <div *ngIf=\"title\" class=\"wizard-title\">\n                  <h4>{{title}}</h4>\n              </div>\n\n              <ul class=\"step-list\">\n                  <li [class.active]=\"i === stepIndex\" [class.disabled]=\"step.disabled\" class=\"step sme-arrange-stack-h\" *ngFor=\"let step of steps; let i = index\" (click)=\"onStepClick(i)\">\n                      <span [class.sme-icon]=\"step.completed\" [class.sme-icon-accept]=\"step.completed\" class=\"sme-position-flex-none step-index\">{{!step.completed ? i + 1 : ''}}</span>\n                      <span class=\"sme-position-flex-auto step-title\">{{step.name}}</span>\n                  </li>\n              </ul>\n          </section>\n\n          <section class=\"sme-layout-relative right sme-position-flex-auto flex-display\">\n              <div class=\"sme-position-flex-auto\">\n                  <!-- Don't remove this line! -->\n                  <!-- The dynamically rendered component looks for #container to render itself as the sibling -->\n                  <div #container></div>\n              </div>\n\n              <div class=\"sme-position-flex-none\">\n                  <ng-content select=\"sme-wizard-footer\"></ng-content>\n                  <div *ngIf=\"showButtons\" class=\"flex-display wizard-buttons\">\n                      <div *ngIf=\"validating\" class=\"sme-layout-relative validation-loading-wheel\">\n                          <sme-loading-wheel size=\"small\"></sme-loading-wheel>\n                      </div>\n                      <span *ngIf=\"validating\" class=\"validation-label\">{{strings.MsftSmeShell.Angular.Wizard.validating}}</span>\n                      <button class=\"btn btn-primary\" type=\"button\" (click)=\"onBackClick()\" [disabled]=\"!currentStepComponent.valid || validating\">{{strings.MsftSmeShell.Angular.Common.back}}</button>\n                      <button class=\"btn btn-primary\" type=\"button\" (click)=\"onNextClick()\" [disabled]=\"!currentStepComponent.valid || validating\">{{strings.MsftSmeShell.Angular.Common.next}}</button>\n                      <button class=\"btn btn-secondary\" type=\"button\" (click)=\"onCancelClick()\">{{strings.MsftSmeShell.Angular.Common.cancel}}</button>\n                  </div>\n              </div>\n          </section>\n      </div>\n    "
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
    return WizardComponent;
}(DynamicComponentBase));
export { WizardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvd2l6YXJkL3dpemFyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBQSxFQUFtQixTQUFBLEVBQVcsd0JBQUEsRUFBMEIsWUFBQSxFQUFjLFlBQUEsRUFBYyxLQUFBLEVBQWUsTUFBQSxFQUFPLE1BQU8sZUFBQSxDQUFnQjtBQUMxSSxPQUFPLEVBQUUsT0FBQSxFQUFTLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFHbEQsT0FBTyxFQUFFLG9CQUFBLEVBQXFCLE1BQU8sNkJBQUEsQ0FBOEI7QUFJbkU7O0dBRUc7QUFFSDtJQUFBO0lBVUEsQ0FBQztJQVRNLGdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDJCQUEyQjtpQkFDeEMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsNEJBQUM7Q0FWRCxBQVVDLElBQUE7U0FWWSxxQkFBcUI7QUFZbEM7O0dBRUc7QUFFSDtJQUFxQyxtQ0FBc0Q7SUFxS3ZGOzs7OztPQUtHO0lBQ0gseUJBQ1ksaUJBQW9DLEVBQzVDLHdCQUFrRDtRQUZ0RCxZQUlJLGtCQUFNLHdCQUF3QixDQUFDLFNBQ2xDO1FBSlcsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQW5KaEQ7O1dBRUc7UUFFSSxxQkFBZSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXRFOztXQUVHO1FBRUksMEJBQW9CLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFM0U7O1dBRUc7UUFFSSxhQUFPLEdBQXVDLElBQUksWUFBWSxFQUF3QixDQUFDO1FBRTlGOztXQUVHO1FBRUkscUJBQWUsR0FBdUIsSUFB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LElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckMsQ0FBQztZQUVMLENBQUMsQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDO0lBRVMsd0NBQWMsR0FBeEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3hELENBQUM7UUFFRCxpQkFBTSxjQUFjLFdBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0UsMEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsTUFBTSxFQUFFLENBQUMsMG5FQW9HUixDQUFDO29CQUNGLFFBQVEsRUFBRSxxNEVBb0NUO2lCQUNKLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCw4QkFBYyxHQUFtRSxjQUFNLE9BQUE7UUFDOUYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsd0JBQXdCLEdBQUc7S0FDakMsRUFINkYsQ0FHN0YsQ0FBQztJQUNLLDhCQUFjLEdBQTJDO1FBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzNCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzNCLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzNCLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMzQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM5QixpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFHLEVBQUUsRUFBRTtLQUM1RSxDQUFDO0lBQ0Ysc0JBQUM7Q0FwaEJELEFBb2hCQyxDQXBoQm9DLG9CQUFvQixHQW9oQnhEO1NBcGhCWSxlQUFlIiwiZmlsZSI6IndpemFyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9