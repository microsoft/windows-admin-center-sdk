import { FileCallback, InputFileProcessor, InputFileType, TargetFileType } from '../classify';
export declare class BaseFileProcessor implements InputFileProcessor {
    inputType: InputFileType;
    supportedTargets: TargetFileType[];
    constructor(inputType: InputFileType, supportedTargets: TargetFileType[]);
    verifySupport(targetType: TargetFileType): void;
    escape(input: string, targetType: TargetFileType): string;
    process(file: any, targetType: TargetFileType, callback: FileCallback): void;
}
