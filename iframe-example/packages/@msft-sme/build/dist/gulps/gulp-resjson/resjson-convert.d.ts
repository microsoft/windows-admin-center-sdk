export interface Options {
    definition: string;
    typescript: string;
    json: boolean;
    jsonSpace: string | number;
}
export declare class ResJsonConverter {
    private options;
    outputDt: string;
    outputTs: string;
    outputInterface: string;
    outputJson: any;
    private jsonCurrent;
    private contentReset();
    private contentAddDt(line);
    private contentAddTs(line);
    private contentAddIt(line);
    private jsonNewValue(name);
    private jsonAddValue(name, value);
    private scan(node);
    private traverse(keyItems, indent);
    constructor(options: Options);
    convert(content: string): void;
}
