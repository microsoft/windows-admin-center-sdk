import { ClassifyOptions, CollectedFileMap, FileCallback, TargetFileGenerator, TargetFileType } from '../classify';
export declare class BaseGenerator implements TargetFileGenerator {
    targetType: TargetFileType;
    static pluginName: string;
    static pluginVersion: string;
    constructor(targetType: TargetFileType);
    generate(files: CollectedFileMap, options: ClassifyOptions, callback: FileCallback): void;
}
