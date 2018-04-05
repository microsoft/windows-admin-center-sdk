import { CheckValidationEventArgs } from '@msft-sme/shell/angular';
export declare class SodaFactoryExampleComponent {
    model: any;
    constructor();
    /**
     * Resets the form controls data model to a predefined initial state
     */
    createModel(): {
        model: {
            label: string;
            value: string;
        };
        password: {
            label: string;
            value: string;
            description: string;
            notMatch: string;
        };
        recipeType: {
            value: string;
            label: string;
            options: {
                upload: {
                    label: string;
                    value: string;
                };
                create: {
                    label: string;
                    value: string;
                };
            };
        };
        upload: {
            value: any;
            label: string;
            description: string;
        };
        name: {
            label: string;
            value: string;
        };
        details: {
            label: string;
            value: string;
        };
        flavorMix: {
            label: string;
            value: {};
            options: {
                cola: {
                    label: string;
                    value: string;
                };
                pepper: {
                    label: string;
                    value: string;
                };
                orange: {
                    label: string;
                    value: string;
                };
                grape: {
                    label: string;
                    value: string;
                };
                lemonlime: {
                    label: string;
                    value: string;
                };
                cherry: {
                    label: string;
                    value: string;
                };
                rootbeer: {
                    label: string;
                    value: string;
                };
            };
        };
        rootbeerType: {
            value: string;
            label: string;
            description: string;
            options: {
                label: string;
                value: string;
            }[];
        };
        carbinationLevel: {
            label: string;
            value: number;
            min: number;
            max: number;
            step: number;
            toMuch: number;
            toLittle: number;
            description: string;
            toMuchWarning: string;
            toLittleWarning: string;
        };
        tags: {
            label: string;
            value: any[];
            suggestions: string[];
            description: string;
        };
        size: {
            value: string;
            label: string;
            options: {
                label: string;
                value: string;
            }[];
        };
        extraSugar: {
            value: number;
            min: number;
            max: number;
            step: number;
            toMuch: number;
            wayToMuch: number;
            toLittle: number;
            label: string;
            description: string;
            toMuchWarning: string;
            toLittleWarning: string;
            wayToMuchError: string;
        };
        isDiet: {
            value: boolean;
            label: string;
        };
        emergancyProduction: {
            value: boolean;
            label: string;
            description: string;
            warning: string;
        };
    };
    /**
     * This is only one of many ways to add validation to a form field.
     * @param name the field name
     * @param event the validation event
     */
    onCustomValidate(name: string, event: CheckValidationEventArgs): void;
}
