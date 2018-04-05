interface StringPolyfills {
    /**
     * Formats a string based on its key value pair object.
     *
     * @param args The list of arguments format arguments. For example: "String with params {0} and {1}".format("val1", "val2");.
     * @return Formatted string.
     */
    format(...restArgs: any[]): string;
    /**
     * Formats a string based on its key value pair object.
     *
     * @param formatSpecifierMap An object that contains that format mappings.
     * For example: "String with parameters {one} and {two}".format({one: "val1", two: "val2"});.
     * @param tokenEncoder If specified, this callback will be used to produce a string
     * representation of the tokens being injected into the string.
     * @return Formatted string.
     */
    format(formatSpecifierMap: Object, tokenFormatter?: (tokenValue: any) => string): string;
    /**
     * Deprecated. Please use MsftSme.localeCompareIgnoreCase instead.
     */
    localeCompareIgnoreCase(value: string, locales?: string[], options?: any): number;
    /**
     * Deprecated. Please use MsftSme.replaceAll instead.
     */
    replaceAll(searchValue: string, replaceValue: string): string;
    /**
     * Deprecated. Please use MsftSme.replaceMany instead.
     */
    replaceMany(replacementMap: MsftSme.StringMap<string>): string;
    /**
     * Deprecated. Please use MsftSme.repeat instead.
     */
    repeat(count: number): string;
    /**
     * Deprecated. Please use MsftSme.startsWith instead.
     */
    startsWith(searchString: string, position?: number): boolean;
    /**
     * Deprecated. Please use MsftSme.endsWith instead.
     */
    endsWith(searchString: string, position?: number): boolean;
}
interface String extends StringPolyfills {
}
