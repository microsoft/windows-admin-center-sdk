export declare const newline = "\n";
export declare const spacer = "\t";
export declare type TargetFileType = 'ts' | 'css';
export declare type InputFileType = 'ps1' | 'html' | 'svg' | 'css' | string;
export interface StringMap<T> {
    [key: string]: T;
}
export interface NumberMap<T> {
    [key: number]: T;
}
export interface FileCallback {
    (err: Error, file: string): void;
}
export interface InputFileProcessor {
    readonly inputType: InputFileType;
    readonly supportedTargets: TargetFileType[];
    escape: (file: string, targetType: TargetFileType) => string;
    process: (file: string, targetType: TargetFileType, callback: FileCallback) => void;
}
export interface CollectedFileMap {
    [path: string]: string | CollectedFileMap;
}
export interface TargetFileGenerator {
    readonly targetType: TargetFileType;
    generate: (files: CollectedFileMap, options: ClassifyOptions, callback: FileCallback) => void;
}
export interface ClassifyOptions {
    rootClass: string;
    outFileName?: string;
    pathTransformRoot?: string;
    pathTransform?: (path: string, file: string) => string[];
    processors: InputFileProcessor[];
    generators: TargetFileGenerator[];
}
export declare function regexEscape(str: string): string;
export declare function regexReplaceAll(input: string, searchValue: string, replaceValue: string): string;
