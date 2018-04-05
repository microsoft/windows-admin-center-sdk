import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseDialogComponent, ConnectionTagService, DialogOptions, DialogResult, DialogService, NotificationService } from '../../../../angular';
import { Connection } from '../../../../core';
import { Strings } from '../../../../generated/strings';
/**
 * The manage as dialog options.
 */
export interface EditTagsDialogOptions extends DialogOptions {
    /**
     * The node names to look up credentials for
     */
    connections: Connection[];
}
/**
 * The manage as dialog result.
 */
export interface EditTagsDialogResult extends DialogResult {
    /**
     * The tags that were added
     */
    tagsAdded: string[];
    /**
     * The tags that were removed
     */
    tagsRemoved: string[];
}
/**
 *
 */
export declare class EditTagsDialogComponent extends BaseDialogComponent<EditTagsDialogOptions, EditTagsDialogResult> implements OnInit {
    private connectionTagService;
    private notificationService;
    static dialogComponentId: string;
    strings: Strings;
    tagsToAdd: string[];
    tagSuggestionsToAdd: string[];
    tagsToRemove: string[];
    tagSuggestionsToRemove: string[];
    private connections;
    /**
     * Initializes a new instance of the EditTagsDialogComponent class.
     */
    constructor(dialogService: DialogService, connectionTagService: ConnectionTagService, notificationService: NotificationService);
    /**
     * Shows the dialog.
     *
     * @param options The options for the dialog.
     * @return The dialog result subject.
     */
    show(options: EditTagsDialogOptions): Subject<EditTagsDialogResult>;
    /**
     * The method to call when the confirm button is clicked.
     */
    onSave(): void;
    /**
     * The method to call when the cancel button is clicked.
     */
    onCancel(): void;
}
