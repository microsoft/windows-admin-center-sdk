import { EventEmitter } from '@angular/core';
import { Strings } from '../../../generated/strings';
export declare class DetailsComponent {
    strings: Strings;
    title: string;
    isExpanded: boolean;
    isExpandedChange: EventEmitter<boolean>;
    toggleExpansion(): void;
}
