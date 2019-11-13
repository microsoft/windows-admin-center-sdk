import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService } from '@msft-sme/angular';
import { PersistentLocalStorage } from '@msft-sme/core/workflow/persistent-local-storage';
import { PersistentWorkflowResult, PersistentWorkflowRunner } from '@msft-sme/core/workflow/persistent-workflow-runner';
import { PersistentWorkflowSnapshot } from '@msft-sme/core/workflow/persistent-workflow-snapshot';
import { FileTransitData, FileWorkflowBuilder } from './file-workflow';

@Component({
    selector: 'sme-workflow',
    templateUrl: './workflow-example.component.html'
})
export class WorkflowExampleComponent implements OnInit, OnDestroy {
    public snapshots: PersistentWorkflowSnapshot[];
    private storage: PersistentLocalStorage;
    private pathCount = 0;
    private moduleName: string;
    private name: string;
    public nodeName = '';

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Workflow';
    }

    constructor(private appContextService: AppContextService, private route: ActivatedRoute, private router: Router) { }

    public ngOnInit(): void {
        this.moduleName = MsftSme.self().Init.moduleName;
        this.name = 'FileWorkflow';
        this.storage = new PersistentLocalStorage(this.moduleName, this.name);
        this.storage.restore().subscribe(snapshots => this.snapshots = snapshots);
    }

    public ngOnDestroy(): void {
    }

    public start(count: number): void {
        const builder = new FileWorkflowBuilder(this.moduleName, this.name, this.appContextService);
        const runner = new PersistentWorkflowRunner(this.storage, builder);
        runner.start<FileTransitData>({
            params: {
                nodeName: this.nodeName,
                path: this.getFilePath(),
                delay: 1000,
                count: count
            }
        })
        .subscribe(result => this.finalize(result));
    }

    public restore(): void {
        const builder = new FileWorkflowBuilder(this.moduleName, this.name, this.appContextService);
        const runner = new PersistentWorkflowRunner(this.storage, builder);
        runner.startFromStore<FileTransitData>()
            .subscribe(result => this.finalize(result));
    }

    public refresh(): void {
        this.storage.restore().subscribe(snapshots => this.snapshots = snapshots);
    }

    public exit(): void {
        this.router.navigate(['']);
    }

    private getFilePath(): string {
        const base = String.fromCharCode('a'.charCodeAt(0) + this.pathCount++);
        return `c:\\temp\\{0}{0}{0}`.format(base);
    }

    private finalize(result: PersistentWorkflowResult<FileTransitData>): void {
        console.log(result);
        result.clear().subscribe();
        const notification = result.result && result.result.data && result.result.data.notification;
        const params = result.result && result.result.params;
        if (!notification || !params) {
            return;
        }

        if (!result.error) {
            notification.showSuccess(
                'Successfully performed create and remove files operations',
                'Completed for "{0}" files at "{1}".'.format(params.count, params.path));
        } else {
            notification.showError(
                'Couldn\'t perform create and remove files operations',
                '"{0}" files at "{1}", Error: {2}'.format(params.count, params.path, result.error.message));
        }

        this.refresh();
    }
}
