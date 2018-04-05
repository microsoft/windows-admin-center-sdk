import { Pipe } from '@angular/core';
/**
 * Methods for converting media units (i.e. bytes) into display formats.
 */
export var MediaConversion;
(function (MediaConversion) {
    'use strict';
    var fixedDecimalPlaces = 2;
    var iecUnitMap = {
        0: 'B',
        1: 'KB',
        2: 'MB',
        3: 'GB',
        4: 'TB',
        5: 'PT',
        6: 'XB',
        7: 'ZB',
        8: 'YB'
    };
    /**
     * The base of byte representation to use in conversion.
     */
    var Base;
    (function (Base) {
        Base[Base["Binary"] = 1024] = "Binary";
        Base[Base["Decimal"] = 1000] = "Decimal";
    })(Base = MediaConversion.Base || (MediaConversion.Base = {}));
    /**
     * The units used in conversion.
     */
    var Unit;
    (function (Unit) {
        Unit[Unit["Byte"] = 0] = "Byte";
        // SI Prefix
        Unit[Unit["Kilobyte"] = 1] = "Kilobyte";
        Unit[Unit["Megabyte"] = 2] = "Megabyte";
        Unit[Unit["Gigabyte"] = 3] = "Gigabyte";
        Unit[Unit["Terabyte"] = 4] = "Terabyte";
        Unit[Unit["Petabyte"] = 5] = "Petabyte";
        Unit[Unit["Exabyte"] = 6] = "Exabyte";
        Unit[Unit["Zettabyte"] = 7] = "Zettabyte";
        Unit[Unit["Yottabyte"] = 8] = "Yottabyte";
        // IEC Prefix
        Unit[Unit["Kibibyte"] = 1] = "Kibibyte";
        Unit[Unit["Mebibyte"] = 2] = "Mebibyte";
        Unit[Unit["Gibibyte"] = 3] = "Gibibyte";
        Unit[Unit["Tebibyte"] = 4] = "Tebibyte";
        Unit[Unit["Pebibyte"] = 5] = "Pebibyte";
        Unit[Unit["Exbiyte"] = 6] = "Exbiyte";
        Unit[Unit["Zebibyte"] = 7] = "Zebibyte";
        Unit[Unit["Yebibyte"] = 8] = "Yebibyte";
    })(Unit || (Unit = {}));
    /**
     * Converts the supplied bytes into the appropriate display string.
     *
     * @param bytes The raw number of bytes.
     * @param base The byte representation base to use in conversion.
     */
    function getConvertedValue(bytes, base) {
        if (bytes != null && !isNaN(bytes)) {
            var unit = getUnit(bytes, base);
            var result = convertValue(bytes, base, unit, false);
            var displayUnit = iecUnitMap[unit];
            if (displayUnit) {
                return '{0} {1}'.format(result, displayUnit);
            }
            return '{0} {1}'.format(bytes, iecUnitMap[0]);
        }
        return '-';
    }
    MediaConversion.getConvertedValue = getConvertedValue;
    /**
     * Converts the raw bytes into the number corresponding to it's appropriate display value.
     *
     * @param bytes The raw number of bytes.
     * @param base the byte representation base to use in conversion.
     * @param unit The desired unit of conversion.
     * @param floor Whether or not to floor the result.
     */
    function convertValue(bytes, base, unit, floor) {
        var result = bytes / Math.pow(base, unit);
        if (floor) {
            return Math.floor(result);
        }
        return parseFloat(result.toFixed(fixedDecimalPlaces));
    }
    /**
     * Gets the appropriate unit for a number of raw bytes in a particular base.
     *
     * @param bytes The raw number of bytes.
     * @param base The byte representation base to use in conversion.
     */
    function getUnit(bytes, base) {
        if (bytes === 0) {
            return bytes;
        }
        var iterator = 0;
        while ((bytes / Math.pow(base, iterator)) >= base) {
            iterator++;
        }
        return iterator;
    }
})(MediaConversion || (MediaConversion = {}));
var ByteUnitConverterPipe = (function () {
    function ByteUnitConverterPipe() {
    }
    ByteUnitConverterPipe.prototype.transform = function (value, base) {
        if (value < 0 || typeof value !== 'number') {
            return '-';
        }
        return MediaConversion.getConvertedValue(value, base);
    };
    return ByteUnitConverterPipe;
}());
export { ByteUnitConverterPipe };
ByteUnitConverterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'smeByteUnitConverter'
            },] },
];
/** @nocollapse */
ByteUnitConverterPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvYnl0ZS11bml0LWNvbnZlcnRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFBLEVBQW9CLE1BQU8sZUFBQSxDQUFnQjtBQUVwRDs7R0FFRztBQUNILE1BQU0sS0FBUSxlQUFBLENBMkdiO0FBM0dELFdBQWMsZUFBQTtJQUNWLFlBQVksQ0FBQztJQUViLElBQU0sa0JBQUEsR0FBcUIsQ0FBQSxDQUFFO0lBQzdCLElBQU0sVUFBQSxHQUEwQztRQUM1QyxDQUFDLEVBQUUsR0FBQTtRQUNILENBQUMsRUFBRSxJQUFBO1FBQ0gsQ0FBQyxFQUFFLElBQUE7UUFDSCxDQUFDLEVBQUUsSUFBQTtRQUNILENBQUMsRUFBRSxJQUFBO1FBQ0gsQ0FBQyxFQUFFLElBQUE7UUFDSCxDQUFDLEVBQUUsSUFBQTtRQUNILENBQUMsRUFBRSxJQUFBO1FBQ0gsQ0FBQyxFQUFFLElBQUE7S0FDTixDQUFDO0lBRUY7O09BRUc7SUFDSCxJQUFZLElBR1g7SUFIRCxXQUFZLElBQUE7UUFDUixzQ0FBUyxDQUFBO1FBQ1Qsd0NBQVUsQ0FBQTtJQUNkLENBQUMsRUFIVyxJQUFBLEdBQUEsb0JBQUEsS0FBQSxvQkFBQSxRQUdYO0lBRUQ7O09BRUc7SUFDSCxJQUFLLElBc0JKO0lBdEJELFdBQUssSUFBQTtRQUNELCtCQUFPLENBQUE7UUFFUCxZQUFZO1FBQ1osdUNBQVcsQ0FBQTtRQUNYLHVDQUFXLENBQUE7UUFDWCx1Q0FBVyxDQUFBO1FBQ1gsdUNBQVcsQ0FBQTtRQUNYLHVDQUFXLENBQUE7UUFDWCxxQ0FBVSxDQUFBO1FBQ1YseUNBQVksQ0FBQTtRQUNaLHlDQUFZLENBQUE7UUFFWixhQUFhO1FBQ2IsdUNBQVcsQ0FBQTtRQUNYLHVDQUFXLENBQUE7UUFDWCx1Q0FBVyxDQUFBO1FBQ1gsdUNBQVcsQ0FBQTtRQUNYLHVDQUFXLENBQUE7UUFDWCxxQ0FBVSxDQUFBO1FBQ1YsdUNBQVcsQ0FBQTtRQUNYLHVDQUFXLENBQUE7SUFDZixDQUFDLEVBdEJJLElBQUEsS0FBQSxJQUFBLFFBc0JKO0lBRUQ7Ozs7O09BS0c7SUFDSCwyQkFBa0MsS0FBTyxFQUFRLElBQU07UUFDbkQsRUFBRSxDQUFDLENBQUMsS0FBQyxJQUFRLElBQUEsSUFBUSxDQUFBLEtBQUUsQ0FBSyxLQUFDLENBQUssQ0FBQyxDQUFDLENBQUE7WUFDaEMsSUFBTSxJQUFBLEdBQU8sT0FBQSxDQUFRLEtBQUMsRUFBTSxJQUFBLENBQUssQ0FBQztZQUNsQyxJQUFNLE1BQUEsR0FBUyxZQUFBLENBQWEsS0FBQyxFQUFNLElBQUEsRUFBTSxJQUFBLEVBQU0sS0FBQSxDQUFNLENBQUM7WUFDdEQsSUFBTSxXQUFBLEdBQWMsVUFBQSxDQUFXLElBQUMsQ0FBSSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLFdBQUMsQ0FBVyxDQUFDLENBQUE7Z0JBQ2IsTUFBTSxDQUFDLFNBQUEsQ0FBVSxNQUFDLENBQU0sTUFBQyxFQUFPLFdBQUEsQ0FBWSxDQUFDO1lBQ2pELENBQUM7WUFFRCxNQUFNLENBQUMsU0FBQSxDQUFVLE1BQUMsQ0FBTSxLQUFDLEVBQU0sVUFBQSxDQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFBLENBQUk7SUFDZixDQUFDO0lBYmUsaUNBQUEsb0JBYWYsQ0FBQTtJQUVEOzs7Ozs7O09BT0c7SUFDSCxzQkFBc0IsS0FBTyxFQUFRLElBQU0sRUFBTSxJQUFNLEVBQU0sS0FBUTtRQUNqRSxJQUFNLE1BQUEsR0FBUyxLQUFBLEdBQVEsSUFBQSxDQUFLLEdBQUMsQ0FBRyxJQUFDLEVBQUssSUFBQSxDQUFLLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsS0FBQyxDQUFLLENBQUMsQ0FBQTtZQUNQLE1BQU0sQ0FBQyxJQUFBLENBQUssS0FBQyxDQUFLLE1BQUMsQ0FBTSxDQUFDO1FBQzlCLENBQUM7UUFFRCxNQUFNLENBQUMsVUFBQSxDQUFXLE1BQUMsQ0FBTSxPQUFDLENBQU8sa0JBQUMsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlCQUFpQixLQUFPLEVBQVEsSUFBTTtRQUNsQyxFQUFFLENBQUMsQ0FBQyxLQUFDLEtBQVMsQ0FBQSxDQUFFLENBQUMsQ0FBQTtZQUNiLE1BQU0sQ0FBTyxLQUFDLENBQUs7UUFDdkIsQ0FBQztRQUVELElBQUksUUFBQSxHQUFXLENBQUEsQ0FBRTtRQUNqQixPQUFPLENBQUMsS0FBQyxHQUFPLElBQUEsQ0FBSyxHQUFDLENBQUcsSUFBQyxFQUFLLFFBQUEsQ0FBUyxDQUFDLElBQUksSUFBQSxFQUFNLENBQUE7WUFDL0MsUUFBUSxFQUFDLENBQUU7UUFDZixDQUFDO1FBRUQsTUFBTSxDQUFPLFFBQUMsQ0FBUTtJQUMxQixDQUFDO0FBQ0wsQ0FBQyxFQTNHYSxlQUFBLEtBQUEsZUFBQSxRQTJHYjtBQUdEO0lBQUE7SUFnQkEsQ0FBQztJQWZVLHlDQUFTLEdBQWhCLFVBQWlCLEtBQWEsRUFBRSxJQUEwQjtRQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBU0wsNEJBQUM7QUFBRCxDQWhCQSxBQWdCQzs7QUFSTSxnQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxzQkFBc0I7YUFDL0IsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLG9DQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImJ5dGUtdW5pdC1jb252ZXJ0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=