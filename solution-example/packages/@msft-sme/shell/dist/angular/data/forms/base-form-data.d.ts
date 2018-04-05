/**
 * A base class for all form models.
 */
export declare abstract class BaseFormData<TDataModel> {
    protected dataModel: TDataModel;
    /**
     * Initializes a new instance of the form data from a given data model.
     *
     * @param dataModel - The data model used as a base to create the form model.
     */
    constructor(dataModel: TDataModel);
    /**
     * Creates a new TDataModel object with the data from the original data model and
     * the data from this form model.
     *
     * @returns The model from the given form data.
     */
    abstract convertToModel(): TDataModel;
    /**
     * Updates the values of the target model with those values from this form.
     *
     * @param target - The target model to update.
     */
    abstract applyUpdatesToModel(target: TDataModel): void;
    /**
     * Initializes the form data from the model passed to the constructor.
     * This is called during the constructor of the base class.
     */
    protected abstract initializeFromModel(): void;
}
