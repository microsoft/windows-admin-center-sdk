import { EventEmitter } from '@angular/core';
export interface ActionItemExecutedEventArgs {
    result: any;
    item: any;
}
export interface ActionItemErrorEventArgs {
    error: any;
    item: any;
}
export interface ActionContainer {
    enabled: boolean;
    isBusy: boolean;
    error: EventEmitter<ActionItemErrorEventArgs>;
    executed: EventEmitter<ActionItemExecutedEventArgs>;
}
