import { GeographicLocation } from '../data/simple-form-data';
export interface SimpleFormModel {
    disableForm: boolean;
    childFormGroup: {
        modelName: string;
        modelLocation: GeographicLocation;
        modelValue: number;
        modelFileName: string;
    };
}
