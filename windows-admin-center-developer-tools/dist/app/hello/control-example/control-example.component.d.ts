import { OnInit } from '@angular/core';
import { Strings } from '../../../generated/strings';
export declare class ControlExampleComponent implements OnInit {
    strings: Strings;
    private changed;
    private subscription;
    selectedPath: string;
    constructor();
    ngOnInit(): void;
    /**
     * The method to run when the selection of the file explorer directory tree is changed.
     *
     * @param {any} event The directory tree selection event.
     */
    onTreeSelectionChange(event: any): void;
}
