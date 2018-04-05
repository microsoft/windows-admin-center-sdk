/**
 * The model representation of the validation of a wizard step.
 */
export interface WizardStepValidation {
    /**
     * The error message, if applicable.
     */
    errorMessage?: string;
    /**
     * Whether of not the step validation succeeded.
     */
    isValid: boolean;
}
