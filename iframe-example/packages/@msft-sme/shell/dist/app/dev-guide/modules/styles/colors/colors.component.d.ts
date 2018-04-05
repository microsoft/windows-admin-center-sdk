import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '../../../../../angular';
export declare class ColorsComponent {
    namedColors: string[];
    baseColors: string[];
    mixes: number[];
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    getColorName(color: string): string;
    getColorClasses(color: string, mix?: number): string;
}
