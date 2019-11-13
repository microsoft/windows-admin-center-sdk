import { AppContextService } from '@msft-sme/angular';
import { ClientNotificationInstance } from '@msft-sme/core';
import { PowerShell } from '@msft-sme/core/data/powershell';
import { PersistentWorkItem } from '@msft-sme/core/workflow/persistent-work-item';
import { PersistentWorkItemApplyState } from '@msft-sme/core/workflow/persistent-work-item-apply-state';
import { PersistentWorkItemState } from '@msft-sme/core/workflow/persistent-work-item-state';
import { PersistentWorkflow } from '@msft-sme/core/workflow/persistent-workflow';
import { PersistentWorkflowBuilder } from '@msft-sme/core/workflow/persistent-workflow-builder';
import { PersistentWorkflowContext } from '@msft-sme/core/workflow/persistent-workflow-context';
import { Observable, of, throwError } from 'rxjs';
import { delay, expand, filter, map, switchMap, take } from 'rxjs/operators';
import { PowerShellScripts } from '../../../../generated/powershell-scripts';

export interface FileTransitData {
    params: {
        nodeName: string;
        path: string;
        delay: number;
        count: number
    };
    data?: {
        notification?: ClientNotificationInstance;
    };
}

export interface FilePersistentData {
    params: {
        nodeName: string;
        path: string;
        delay: number;
        count: number
    };
    startTime: number;
}

export type FileContext = PersistentWorkflowContext<FileTransitData, FilePersistentData>;

export abstract class PersistentWorkItemWithNotification extends PersistentWorkItem<FileContext> {
    constructor(name: string, protected appContextService: AppContextService) {
        super(name);
    }

    protected responseMapper = map((response: { results: { state: string, count: number }[] }) =>
                ({ state: response.results[0].state, count: response.results[0].count }));

    protected getNotification(context: FileContext): ClientNotificationInstance {
        if (!context.transitData) {
            context.transitData = <any>{};
        }

        context.transitData.params = context.persistentData.params;

        if (!context.transitData.data) {
            context.transitData.data = {};
        }

        if (!context.transitData.data.notification) {
            context.transitData.data.notification =
                this.appContextService.notification.create(context.transitData.params.nodeName);
        }

        return context.transitData.data.notification;
    }

    protected getTitle(message: string): string {
        return message.format(this.name);
    }

    protected getMessage(result: { state: string, count: number }): string {
        return 'Work Item: "{0}", State: "{1}", Count: {2}'.format(this.name, result.state, result.count);
    }
}

export class CreateFilesWorkItem extends PersistentWorkItemWithNotification {
    constructor(appContextService: AppContextService) {
        super('Create Files', appContextService);
    }

    public init(context: FileContext): void {
        context.persistentData = { ...context.transitData, ...{ startTime: Date.now() } };
    }

    public preValidate(context: FileContext): Observable<FileContext> {
        const title = this.getTitle('Preparing "{0}" operation');
        this.getNotification(context).showInProgress(title, 'Initializing...');
        const command = PowerShell.createCommand(
            PowerShellScripts.Workflow.Test_Files,
            {
                path: context.persistentData.params.path,
                delay: context.persistentData.params.delay,
                count: context.persistentData.params.count,
                mode: 1
            });
        return this.appContextService.powerShell.run(context.persistentData.params.nodeName, command, {})
            .pipe(
                this.responseMapper,
                map(result => {
                    this.getNotification(context).showInProgress(title, this.getMessage(result));
                    if (this.state === PersistentWorkItemState.PreValidatingByRestore) {
                        if (result.state === 'Running') {
                            context.applyState = PersistentWorkItemApplyState.Skip;
                        } else if (result.state === 'Completed') {
                            context.applyState = PersistentWorkItemApplyState.Skip;
                        } else if (result.state === 'Stopped') {
                            context.applyState = PersistentWorkItemApplyState.Required;
                        }

                        return context;
                    } else if (result.state === 'Ready') {
                        return context;
                    }

                    this.getNotification(context).showInProgress(title, this.getMessage(result));
                    throw new Error('Couldn\'t pre-validate!');
                })
            );
    }

    public apply(context: FileContext): Observable<FileContext> {
        const title = this.getTitle('Performing "{0}" operation');
        this.getNotification(context).showInProgress(title, 'Creating files...');

        // Copy files.
        const command = PowerShell.createCommand(
            PowerShellScripts.Workflow.New_Files,
            {
                path: context.persistentData.params.path,
                delay: context.persistentData.params.delay,
                count: context.persistentData.params.count
            });
        return this.appContextService.powerShell.run(context.persistentData.params.nodeName, command, {})
            .pipe(map(result => context));
    }

    public postValidate(context: FileContext): Observable<FileContext> {
        const title = this.getTitle('Validating result of "{0}" operation');
        this.getNotification(context).showInProgress(title, 'Initializing...');

        const command = PowerShell.createCommand(
            PowerShellScripts.Workflow.Test_Files,
            {
                path: context.persistentData.params.path,
                delay: context.persistentData.params.delay,
                count: context.persistentData.params.count,
                mode: 1
            });
        return this.appContextService.powerShell.run(
            context.persistentData.params.nodeName, command, {})
            .pipe(
                this.responseMapper,
                expand(result => {
                    if (result.state === 'Running') {
                        this.getNotification(context).showInProgress(title, this.getMessage(result));
                        return of(context)
                            .pipe(
                                delay(3000),
                                switchMap(() => this.appContextService.powerShell.run(
                                    context.persistentData.params.nodeName, command, {})
                                    .pipe(this.responseMapper)
                                )
                            );
                    } else if (result.state === 'Completed') {
                        return of(result);
                    }

                    return throwError({ ...new Error('Couldn\'t validate at post processing.'), ...result });
                }),
                filter((result: any) => result.state !== 'Running'),
                take(1),
                map(() => context)
            );
    }

    public finalize(context: FileContext): void {
        this.getNotification(context).showInProgress(this.getTitle('Completed "{0}"'), 'The files were created.');
    }
}

export class RemoveFilesWorkItem extends PersistentWorkItemWithNotification {
    constructor(appContextService: AppContextService) {
        super('Remove Files', appContextService);
    }

    public init(context: FileContext): void {
    }

    public preValidate(context: FileContext): Observable<FileContext> {
        const title = this.getTitle('Preparing "{0}" operation');
        this.getNotification(context).showInProgress(title, 'Initializing...');
        const command = PowerShell.createCommand(
            PowerShellScripts.Workflow.Test_Files,
            {
                path: context.persistentData.params.path,
                delay: context.persistentData.params.delay,
                count: context.persistentData.params.count,
                mode: 2
            });
        return this.appContextService.powerShell.run(context.persistentData.params.nodeName, command, {})
            .pipe(
                this.responseMapper,
                map(result => {
                    this.getNotification(context).showInProgress(title, this.getMessage(result));
                    if (this.state === PersistentWorkItemState.PreValidatingByRestore) {
                        if (result.state === 'Running') {
                            context.applyState = PersistentWorkItemApplyState.Skip;
                        } else if (result.state === 'Completed') {
                            context.applyState = PersistentWorkItemApplyState.Skip;
                        } else if (result.state === 'Stopped') {
                            context.applyState = PersistentWorkItemApplyState.Required;
                        }

                        return context;
                    } else if (result.state === 'Ready') {
                        return context;
                    }

                    this.getNotification(context).showError(title, this.getMessage(result));
                    throw new Error('Couldn\'t pre-validate!');
                })
            );
    }

    public apply(context: FileContext): Observable<FileContext> {
        const title = this.getTitle('Performing "{0}" operation');
        this.getNotification(context).showInProgress(title, 'Removing files...');

        // Copy files.
        const command = PowerShell.createCommand(
            PowerShellScripts.Workflow.Remove_Files,
            {
                path: context.persistentData.params.path,
                delay: context.persistentData.params.delay
            });
        return this.appContextService.powerShell.run(context.persistentData.params.nodeName, command, {})
            .pipe(map(result => context));
    }

    public postValidate(context: FileContext): Observable<FileContext> {
        const title = this.getTitle('Validating result of "{0}" operation');
        this.getNotification(context).showInProgress(title, 'Initializing...');

        const command = PowerShell.createCommand(
            PowerShellScripts.Workflow.Test_Files,
            {
                path: context.persistentData.params.path,
                delay: context.persistentData.params.delay,
                count: context.persistentData.params.count,
                mode: 2
            });
        return this.appContextService.powerShell.run(context.persistentData.params.nodeName, command, {})
            .pipe(
                this.responseMapper,
                expand(result => {
                    if (result.state === 'Running') {
                        this.getNotification(context).showInProgress(title, this.getMessage(result));
                        return of(context)
                            .pipe(
                                delay(3000),
                                switchMap(() => this.appContextService.powerShell.run(
                                    context.persistentData.params.nodeName, command, {})
                                    .pipe(this.responseMapper)
                                )
                            );
                    } else if (result.state === 'Completed') {
                        return of(result);
                    }

                    return throwError({ ...new Error('Couldn\'t validate at post processing.'), ...result });
                }),
                filter((result: any) => result.state !== 'Running'),
                take(1),
                map(() => context)
            );
    }

    public finalize(context: FileContext): void {
        this.getNotification(context).showInProgress(this.getTitle('Completed "{0}"'), 'The files were removed.');
    }
}

export class FileWorkflowBuilder extends PersistentWorkflowBuilder {
    constructor(
        moduleName: string,
        name: string,
        private appContextService: AppContextService) {

        super(moduleName, name, 1);
    }

    public build(): PersistentWorkflow {
        this.init();
        this.addSequence(new CreateFilesWorkItem(this.appContextService));
        this.addSequence(new RemoveFilesWorkItem(this.appContextService));
        return this.workflow;
    }
}
