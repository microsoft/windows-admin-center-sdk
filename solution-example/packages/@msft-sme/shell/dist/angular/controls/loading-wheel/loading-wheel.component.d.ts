import { EventEmitter, OnDestroy } from '@angular/core';
export declare class LoadingWheelComponent implements OnDestroy {
    private defaultSize;
    private sizeMap;
    progressSize: string;
    message: string;
    buttonLabel: any;
    size: string;
    /**
     * The event fired when the button is clicked.
     */
    buttonClick: EventEmitter<void>;
    /**
     * Destroy resources.
     */
    ngOnDestroy(): void;
}
