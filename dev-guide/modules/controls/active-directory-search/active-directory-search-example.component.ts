import { Component, OnInit } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import { AccountInfo } from '@msft-sme/core/data/active-directory/models/account-info';
import { SearchType } from '@msft-sme/core/data/active-directory/models/search-type';

@Component({
    selector: 'sme-dev-guide-controls-active-directory-search',
    templateUrl: './active-directory-search-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Active-Directory-Search Component'
})
export class ActiveDirectorySearchExampleComponent implements OnInit {
    public selectedAccounts: AccountInfo[];
    public selectedAccount: AccountInfo;
    public selectedNames: string[];
    public isFinished: boolean;
    public displaySelections: boolean;
    public multiple: boolean;
    public selectionModeLabel = 'Selection mode';
    public selectionModes = [
        { label: 'Single', value: false },
        { label: 'Multiple', value: true }
    ];
    public searchType: SearchType;
    public searchTypelabel = 'Search on';
    public searchTypes = [
        { label: SearchType[SearchType.Client], value: SearchType.Client },
        { label: SearchType[SearchType.Server], value: SearchType.Server },
        { label: SearchType[SearchType.Cluster], value: SearchType.Cluster },
        { label: SearchType[SearchType.Computer], value: SearchType.Computer },
        { label: SearchType[SearchType.User], value: SearchType.User },
        { label: SearchType[SearchType.Group], value: SearchType.Group },
        { label: SearchType[SearchType.Any], value: SearchType.Any },
        { label: SearchType[SearchType.Custom], value: SearchType.Custom }
    ];

    public get isSelected(): boolean {
        if (this.multiple) {
            return (this.selectedAccounts && this.selectedAccounts.length > 0);
        } else { // clear selection will not set this.selectedAccount to null or undefined
            return (!!this.selectedAccount && !!this.selectedAccount.name);
        }
    }

    public ngOnInit() {
        this.onReset();
    }

    public getSelections(): void {
        this.selectedNames = [];

        if (this.multiple) {
            this.selectedAccounts.forEach(machine => {
                const name = machine.name.toLocaleLowerCase();
                this.selectedNames.push(name);
            });
        } else {
            const name = this.selectedAccount.name.toLocaleLowerCase();
            this.selectedNames.push(name);
        }

        this.displaySelections = this.isSelected;
        this.isFinished = true;
    }

    public onCancel(): void {
        this.displaySelections = false;
        this.isFinished = true;
    }

    public onReset(): void {
        this.isFinished = false;
        this.displaySelections = false;
        this.selectedAccounts = [];
        this.selectedAccount = null;
        this.selectedNames = [];
        this.multiple = undefined;
        this.searchType = SearchType.Any;
    }

}
