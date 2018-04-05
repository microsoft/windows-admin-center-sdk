export declare class SvgCodeConverter {
    outputCss: string;
    outputTs: string;
    contentReset(): void;
    private contentAddCss(line);
    private contentAddTs(line);
    private indent(count);
    generate(collection: {
        [index: string]: any;
    }, pathPrefix: string): void;
    private addData(current, segments);
    private createStructure(collection, pathPrefix);
    private regexEscape(str);
    private replaceAll(input, searchValue, replaceValue);
}
