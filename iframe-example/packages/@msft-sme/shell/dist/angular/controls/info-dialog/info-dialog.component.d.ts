import { EventEmitter } from '@angular/core';
export declare class InfoDialogComponent {
    message: string;
    header: string;
    buttonText: string;
    onClick: EventEmitter<any>;
    handleClick(): void;
}
