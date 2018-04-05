import { EventEmitter } from '@angular/core';
import { Message } from '../common/message';
export declare class Messages {
    value: Message[];
    closable: boolean;
    valueChange: EventEmitter<Message[]>;
    hasMessages(): boolean;
    getSeverityClass(): string;
    clear(event: any): void;
    readonly icon: string;
}
export declare class MessagesModule {
}
