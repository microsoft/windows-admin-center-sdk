import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
export declare class BackdropComponent implements OnChanges {
    private static readonly zIndexPerLevel;
    showBackdrop: boolean;
    level: number;
    clicked: EventEmitter<void>;
    zindex: number;
    /**
     * emits clicked event
     */
    onClick(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
