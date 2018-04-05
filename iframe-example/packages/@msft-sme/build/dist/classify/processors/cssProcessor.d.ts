import { FileCallback, TargetFileType } from '../classify';
import { BaseFileProcessor } from './baseProcessor';
/**
 * Input File Processor for CSS files. Uses html-minifier internally.
 * See https://github.com/jakubpawlowicz/clean-css for valid options
 */
export declare class CSSFileProcessor extends BaseFileProcessor {
    private options;
    constructor(options: any);
    process(file: any, targetType: TargetFileType, callback: FileCallback): void;
}
