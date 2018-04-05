/**
 * Defines The data model used in form examples
 */
export interface ExampleDataModel {
    tags: string[];
    tagSuggestions: string[];
}
export declare class FormControlsService {
    /**
     * Resets the form controls data model to a predefined initial state
     */
    createModel(): {
        tags: string[];
        tagSuggestions: string[];
    };
}
