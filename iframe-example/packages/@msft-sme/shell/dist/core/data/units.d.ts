/**
 * The base of byte representation to use in conversion.
 */
export declare enum MediaConversionBase {
    Binary = 1024,
    Decimal = 1000,
}
/**
 * Methods for converting media units (i.e. bytes) into display formats.
 */
export declare class MediaConversion {
    private static cachedIecUnitMap;
    private static readonly iecUnitMap;
    /**
     * Converts the supplied bytes into the appropriate display string.
     *
     * @param bytes The raw number of bytes.
     * @param base The byte representation base to use in conversion.
     */
    static getConvertedValue(bytes: number, base: MediaConversionBase): string;
    /**
     * Converts the raw bytes into the number corresponding to it's appropriate display value.
     *
     * @param bytes The raw number of bytes.
     * @param base the byte representation base to use in conversion.
     * @param unit The desired unit of conversion.
     * @param floor Whether or not to floor the result.
     */
    private static convertValue(bytes, base, unit, floor?);
    /**
     * Gets the appropriate unit for a number of raw bytes in a particular base.
     *
     * @param bytes The raw number of bytes.
     * @param base The byte representation base to use in conversion.
     */
    private static getUnit(bytes, base);
}
/**
 * Methods for converting percentages into display formats.
 */
export declare class PercentageConversion {
    /**
     * Converts the given value to a percentage.
     *
     * @param value the value to display as percent srring.
     */
    static getPercentageDisplayValue(value: number): string;
}
