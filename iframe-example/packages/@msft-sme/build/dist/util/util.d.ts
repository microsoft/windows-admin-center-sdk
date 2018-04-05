import gutil = require('gulp-util');
export declare function log(message: string): void;
export declare function read(path: string, encoding?: string): string;
export declare function readJSON(path: string): any;
export declare function write(path: string, contents: string): void;
export declare function writeJSON(path: string, json: any): void;
export declare function writeJsonNoSpace(path: string, json: any): void;
export declare function toGulpError(pError: gutil.PluginError | string, error: Error | string): gutil.PluginError;
export interface GulpDoneFunction {
    (error?: Error): void;
}
export declare function noop(): void;
export declare function isObject(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function isString(value: any): boolean;
export declare function extend(dest: any, sources: any[]): any;
export declare function confirm(message: string, canceledMessage?: string, exit?: boolean): boolean;
export declare function format(value: string, ...restArgs: any[]): any;
export declare function pad(value: number | string, length: number, padChar?: string): string;
export declare function getFilePaths(dir: any, paths?: string[]): string[];
export declare function getSubFolders(dir: string): string[];
export declare function ensurePathExists(filePath: any): boolean;
export declare function exists(path: any): boolean;
