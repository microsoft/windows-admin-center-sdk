import { OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TreeNode } from 'primeng/primeng';
import { AppContextService } from '../../../../../angular';
export declare class DetailsPaneContainerComponent implements OnInit {
    private http;
    data: any[];
    files: TreeNode[];
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(http: Http);
    ngOnInit(): void;
    getFileSystem(): Promise<TreeNode[]>;
}
