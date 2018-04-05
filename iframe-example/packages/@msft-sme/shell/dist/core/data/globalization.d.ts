/**
 * Internationalization/Globalization class.
 */
export declare class Globalization {
    private static fullTimeOptions;
    private static dateTimeOnlyOptions;
    private static dateOnlyOptions;
    private static timeOnlyOptions;
    private static readonly localeId;
    private static readonly fullTimeFormat;
    private static readonly dateTimeOnlyFormat;
    private static readonly dateOnlyFormat;
    private static readonly timeOnlyFormat;
    /**
     * Format with full time to display.
     *
     * @param data the date object.
     */
    static fullTime(date: Date): string;
    /**
     * Format with date time only to display.
     *
     * @param data the date object.
     */
    static dateTimeOnly(date: Date): string;
    /**
     * Format with date only to display.
     *
     * @param data the date object.
     */
    static dateOnly(date: Date): string;
    /**
     * Format with time only to display.
     *
     * @param data the date object.
     */
    static timeOnly(date: Date): string;
    /**
     * Format simple number to display.
     *
     * (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat to add
     * more feature such as currency display)
     *
     * @param data the number data.
     */
    static number(data: number, options?: Intl.NumberFormatOptions): string;
}
