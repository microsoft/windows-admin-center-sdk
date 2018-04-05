import { FileCallback, TargetFileType } from '../classify';
import { BaseFileProcessor } from './baseProcessor';
/**
 * Input File Processor for svg files. Uses svgo internally.
 * See https://github.com/svg/svgo and https://github.com/svg/svgo/blob/master/docs/how-it-works/en.md#1-config for options
 */
export declare class SVGFileProcessor extends BaseFileProcessor {
    private options;
    constructor(options: any);
    escape(input: string, targetType: TargetFileType): string;
    process(file: any, targetType: TargetFileType, callback: FileCallback): void;
}
