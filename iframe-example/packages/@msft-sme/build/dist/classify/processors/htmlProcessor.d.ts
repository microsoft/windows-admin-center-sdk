/// <reference types="html-minifier" />
import HTMLMinifier = require('html-minifier');
import { FileCallback, TargetFileType } from '../classify';
import { BaseFileProcessor } from './baseProcessor';
/**
 * Input File Processor for HTML files. Uses html-minifier internally.
 * See https://github.com/kangax/html-minifier for options
 */
export declare class HTMLFileProcessor extends BaseFileProcessor {
    private options;
    constructor(options: HTMLMinifier.Options);
    process(file: any, targetType: TargetFileType, callback: FileCallback): void;
}
