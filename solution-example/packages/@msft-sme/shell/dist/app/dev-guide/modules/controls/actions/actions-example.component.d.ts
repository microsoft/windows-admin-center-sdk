import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActionBarComponent, ActionButtonAsync, ActionItem, ActionItemErrorEventArgs, ActionItemExecutedEventArgs, AppContextService } from '../../../../../angular';
import { MyModel } from './model-driven-action';
export declare class ActionsExampleComponent {
    private changeDetector;
    customActionBar: ActionBarComponent;
    inlineExampleText: string;
    inlineItems: string[];
    enableToggle: boolean;
    actions: ActionItem[];
    customActions: ActionButtonAsync<MyModel>[];
    actionTarget: MyModel;
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(changeDetector: ChangeDetectorRef);
    removeInline(index: number): void;
    onError(args: ActionItemErrorEventArgs): void;
    onExecuted(args: ActionItemExecutedEventArgs): void;
}
