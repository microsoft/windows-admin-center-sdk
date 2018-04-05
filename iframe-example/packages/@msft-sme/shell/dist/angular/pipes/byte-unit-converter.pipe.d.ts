import { PipeTransform } from '@angular/core';
/**
 * Methods for converting media units (i.e. bytes) into display formats.
 */
export declare module MediaConversion {
    /**
     * The base of byte representation to use in conversion.
     */
    enum Base {
        Binary = 1024,
        Decimal = 1000,
    }
    /**
     * Converts the supplied bytes into the appropriate display string.
     *
     * @param bytes The raw number of bytes.
     * @param base The byte representation base to use in conversion.
     */
    function getConvertedValue(bytes: number, base: Base): string;
}
export declare class ByteUnitConverterPipe implements PipeTransform {
    transform(value: number, base: MediaConversion.Base): string;
}
