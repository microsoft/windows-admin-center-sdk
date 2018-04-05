import { ChangeDetectorRef, ComponentFactoryResolver, EventEmitter, OnInit } from '@angular/core';
import { Strings } from '../../../generated/Strings';
import { DynamicComponentBase } from '../common/dynamic.component';
import { WizardModel, WizardStep, WizardStepValidation } from './models';
import { WizardStepComponent } from './wizard-step.component';
/**
 * The component class definitions for the wizard footer component.
 */
export declare class WizardFooterComponent {
}
/**
 * The component class definition for the wizard component.
 */
export declare class WizardComponent extends DynamicComponentBase<WizardStepComponent<WizardModel>> implements OnInit {
    private changeDetectorRef;
    /**
     * Gets the data model for sharing data across the wizard.
     */
    /**
     * Sets the data model for sharing data across the wizard.
     */
    model: WizardModel;
    /**
     * The steps of the wizard.
     */
    steps: WizardStep[];
    /**
     * The title of the wizard.
     */
    title: string;
    /**
     * The event fired when the cancel button is clicked.
     */
    onCancelClicked: EventEmitter<void>;
    /**
     * The event fired whenever a wizard component reports that the enter key was pressed.
     */
    onComponentSubmitted: EventEmitter<void>;
    /**
     * The event fired whenever a step validation fails.
     */
    onError: EventEmitter<WizardStepValidation>;
    /**
     * The event fired when the finish button is clicked.
     */
    onFinishClicked: EventEmitter<void>;
    /**
     * The text for the back button.
     */
    backButtonText: string;
    /**
     * The text for the cancel button.
     */
    cancelButtonText: string;
    /**
     * Gets the current step of the wizard.
     */
    readonly currentStep: WizardStep;
    /**
     * Gets the dynamically rendered component of the current step.
     */
    readonly currentStepComponent: WizardStepComponent<WizardModel>;
    /**
     * Gets the text for the next button.
     */
    readonly nextButtonText: string;
    /**
     * Gets whether or not to show the buttons for navigating the wizard.
     */
    readonly showButtons: boolean;
    /**
     * Gets the index of the current step of the wizard.
     */
    /**
     * Sets the index of the current step of the wizard.
     */
    stepIndex: number;
    /**
     * Resource strings for the component.
     */
    strings: Strings;
    /**
     * The text for the validation label.
     */
    validationText: string;
    /**
     * Whether or not the wizard is validating input.
     */
    validating: boolean;
    /**
     * The footer component passed in by the consumer.
     */
    private footerComponent;
    /**
     * The data model for sharing data across the wizard.
     */
    private dataModel;
    /**
     * The index of the current step.
     */
    private index;
    /**
     * Initializes a new instance of the WizardComponent class.
     *
     * @param changeDetectorRef - The change detector.
     * @param componentFactoryResolver - The component factory resolver.
     */
    constructor(changeDetectorRef: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver);
    /**
     * Marks the current step of the wizard as complete.
     *
     * @returns True if the step was completed and false if not.
     */
    completeCurrentStep(): boolean;
    /**
     * Completes a specific step.
     *
     * @param stepIndex - The index of the target step.
     * @returns True if the step was completed and false if not.
     */
    completeStep(stepIndex: number): boolean;
    /**
     * Marks the current step of the wizard as incomplete.
     *
     * @returns True if the step was failed and false if not.
     */
    failCurrentStep(): boolean;
    /**
     * Fails a specific step.
     *
     * @param stepIndex - The index of the target step.
     * @returns True if the step was failed and false if not.
     */
    failStep(stepIndex: number): boolean;
    /**
     * Moves the wizard to the next step in the list, if possible.
     */
    moveToNextStep(): void;
    /**
     * Moves the wizard to the previous step in the list, is possible.
     */
    moveToPreviousStep(): void;
    /**
     * The method to run when the component is initialized.
     */
    ngOnInit(): void;
    /**
     * The method called when the back button is clicked.
     */
    onBackClick(): void;
    /**
     * The method called when the cancel button is clicked.
     */
    onCancelClick(): void;
    /**
     * The method called when the next button is clicked.
     */
    onNextClick(): void;
    /**
     * The method called when a step is clicked.
     *
     * @param clickedStepIndex - The index of the clicked step.
     */
    onStepClick(clickedStepIndex: number): void;
    /**
     * Marks all steps as incomplete and moves the wizard back to the first step.
     */
    reset(): void;
    protected createComponent(): void;
    protected cleanComponent(): void;
}
