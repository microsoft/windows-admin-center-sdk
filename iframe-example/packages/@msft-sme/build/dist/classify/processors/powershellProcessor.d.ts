import { FileCallback, TargetFileType } from '../classify';
import { BaseFileProcessor } from './baseProcessor';
export interface PowershellFileProcessorOptions {
    removeComments?: boolean;
}
/**
 * Input File Processor for powershell files
 * TODO: Find or build a simple powershell minifier? maybe: https://minifyps.codeplex.com/
 */
export declare class PowerShellFileProcessor extends BaseFileProcessor {
    private options;
    constructor(options: PowershellFileProcessorOptions);
    escape(input: string, targetType: TargetFileType): string;
    process(file: any, targetType: TargetFileType, callback: FileCallback): void;
}
