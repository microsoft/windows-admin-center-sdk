import { ClassifyOptions, CollectedFileMap, FileCallback } from '../classify';
import { BaseGenerator } from './baseGenerator';
export declare class CssBackgroundImageGenerator extends BaseGenerator {
    constructor();
    private getCssClasses(collection, prefix);
    generate(files: CollectedFileMap, options: ClassifyOptions, callback: FileCallback): void;
}
