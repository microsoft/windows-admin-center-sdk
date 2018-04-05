import { WizardStep } from './';
/**
 * The options to initialize a wizard step with.
 */
export interface WizardStepOptions {
    name: string;
    dependencies?: WizardStep[];
    disabled?: boolean;
}
