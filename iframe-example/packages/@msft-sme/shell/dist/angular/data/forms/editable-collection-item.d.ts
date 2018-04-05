import { BaseFormData } from './base-form-data';
/**
 * A base class outlining functionality for tracking changes to form collection items that can be added or deleted.
 */
export declare abstract class EditableCollectionItem<TDataModel> extends BaseFormData<TDataModel> {
    isNew: boolean;
    isMarkedForDeletion: boolean;
    /**
     * Initializes a new instance of the EditableCollectionItem class.
     *
     * @param [dataModel] - The data model used as a base to create the form model.
     */
    constructor(dataModel?: TDataModel);
    /**
     * Checks if this instance is the same as another instance.
     *
     * @param otherItem - The item to compare to.
     */
    areTheSame(otherItem: EditableCollectionItem<TDataModel>): boolean;
    /**
     * Determines if this instance is equal to the other item regardless of references.
     *
     * @param otherItem - The instance to compare to. NOTE: This will always have a value and will always be
     * an existing item.
     */
    protected abstract areTheSameInternal(otherItem: EditableCollectionItem<TDataModel>): boolean;
    /**
     * Initiailzes this instance when it's an empty item.
     */
    protected abstract createModelForNew(): TDataModel;
}
