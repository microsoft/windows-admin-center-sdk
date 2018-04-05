import { ElementRef, Renderer2 } from '@angular/core';
import { AppContextService } from '../../../../service';
import { SmeInternalFormInputBaseComponent } from '../form-input-base.component';
export declare class TagsInputComponent extends SmeInternalFormInputBaseComponent<string[]> {
    /**
     * The current value of the new tags to add to this controls value
     */
    newTags: string;
    /**
     * The suggestions property, but filtered to exclude existing tags.
     */
    displayedSuggestions: string[];
    /**
     * Indicates the character to use to split tags on.
     */
    tagSplitCharacter: string;
    /**
     * Suggestions for possible tags that the user could enter
     */
    suggestions: string[];
    /**
     * internal value holder for suggestions property
     */
    private internalSuggestions;
    /**
     * Initializes a new instance of the TagsInputComponent
     */
    constructor(renderer: Renderer2, hostElement: ElementRef, appContextService: AppContextService);
    /**
     * Removes a tag from the value of this input
     * @param index the index to remove
     */
    removeTag(event: MouseEvent, index: number): void;
    /**
     * Submits the current newTagsInput value as new tags for our controls value.
     */
    submitTags($event: KeyboardEvent): void;
    /**
     * Gets the initial host classes to be applied to this element
     * When called upon the @see BaseControl super class initialization, These classes will be automatically assigned to the host element.
     */
    protected getInitialHostClasses(): string[];
    /**
     * Updates the displayed suggestions to exclude existing tags.
     */
    private updateDisplayedSuggestions();
    /**
     * Occurs any time value changed.
     */
    protected onValueChanged(): void;
    /**
     * Creates the idBag used by this component to store unique element ids.
     * id values will be assigned be the @see BaseComponent super class.
     */
    protected createIdBag(): MsftSme.StringMap<string>;
}
