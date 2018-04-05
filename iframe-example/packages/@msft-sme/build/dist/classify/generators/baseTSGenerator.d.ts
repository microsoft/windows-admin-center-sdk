import { ClassifyOptions, CollectedFileMap, FileCallback } from '../classify';
import { BaseGenerator } from './baseGenerator';
export declare class BaseTSGenerator extends BaseGenerator {
    constructor();
    generate(files: CollectedFileMap, options: ClassifyOptions, callback: FileCallback): void;
}
