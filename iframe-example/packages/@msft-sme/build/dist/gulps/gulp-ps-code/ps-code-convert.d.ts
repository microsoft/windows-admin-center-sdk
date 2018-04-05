export interface Options {
    noComments: boolean;
}
export declare class PsCodeConverter {
    private options;
    private static removeCommentsTrue;
    private static removeCommentsFalse;
    private static commentStart;
    private static commentEnd;
    private static comment;
    private static openContent;
    private static closeContent;
    outputTs: string;
    contentReset(): void;
    private contentAddTs(line);
    private indent(count);
    constructor(options?: Options);
    generate(collection: {
        [index: string]: string;
    }): void;
    private jsonName(original);
    private regexEscape(str);
    private replaceAll(input, searchValue, replaceValue);
    private addToContent(name, script, indent);
    private addData(current);
}
