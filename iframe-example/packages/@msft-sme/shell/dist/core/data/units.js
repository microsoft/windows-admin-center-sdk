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
 * The base of byte representation to use in conversion.
 */
export var MediaConversionBase;
(function (MediaConversionBase) {
    MediaConversionBase[MediaConversionBase["Binary"] = 1024] = "Binary";
    MediaConversionBase[MediaConversionBase["Decimal"] = 1000] = "Decimal";
})(MediaConversionBase || (MediaConversionBase = {}));
/**
 * Methods for converting media units (i.e. bytes) into display formats.
 */
var MediaConversion = /** @class */ (function () {
    function MediaConversion() {
    }
    Object.defineProperty(MediaConversion, "iecUnitMap", {
        get: function () {
            if (!MediaConversion.cachedIecUnitMap) {
                var strings = MsftSme.resourcesStrings().MsftSmeShell.Core;
                MediaConversion.cachedIecUnitMap = {
                    0: strings.Units.MediaConversionB.label,
                    1: strings.Units.MediaConversionKB.label,
                    2: strings.Units.MediaConversionMB.label,
                    3: strings.Units.MediaConversionGB.label,
                    4: strings.Units.MediaConversionTB.label,
                    5: strings.Units.MediaConversionPT.label,
                    6: strings.Units.MediaConversionXB.label,
                    7: strings.Units.MediaConversionZB.label,
                    8: strings.Units.MediaConversionYB.label
                };
            }
            return MediaConversion.cachedIecUnitMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Converts the supplied bytes into the appropriate display string.
     *
     * @param bytes The raw number of bytes.
     * @param base The byte representation base to use in conversion.
     */
    MediaConversion.getConvertedValue = function (bytes, base) {
        if (bytes != null && !isNaN(bytes)) {
            var unit = MediaConversion.getUnit(bytes, base);
            var result = MediaConversion.convertValue(bytes, base, unit, false);
            var displayUnit = MediaConversion.iecUnitMap[unit];
            if (displayUnit) {
                return MsftSme.resourcesStrings()
                    .MsftSmeShell.Core.Units.MediaConversionFormat.message.format(result, displayUnit);
            }
            return MsftSme.resourcesStrings().MsftSmeShell.Core.Units.MediaConversionFormat.message.format(bytes, MediaConversion.iecUnitMap[0]);
        }
        return MsftSme.resourcesStrings().MsftSmeShell.Core.Units.MediaConversionUnknownFormat.message;
    };
    /**
     * Converts the raw bytes into the number corresponding to it's appropriate display value.
     *
     * @param bytes The raw number of bytes.
     * @param base the byte representation base to use in conversion.
     * @param unit The desired unit of conversion.
     * @param floor Whether or not to floor the result.
     */
    MediaConversion.convertValue = function (bytes, base, unit, floor) {
        var fixedDecimalPlaces = 2;
        var result = bytes / Math.pow(base, unit);
        if (floor) {
            return Math.floor(result);
        }
        return parseFloat(result.toFixed(fixedDecimalPlaces));
    };
    /**
     * Gets the appropriate unit for a number of raw bytes in a particular base.
     *
     * @param bytes The raw number of bytes.
     * @param base The byte representation base to use in conversion.
     */
    MediaConversion.getUnit = function (bytes, base) {
        if (bytes === 0) {
            return bytes;
        }
        var iterator = 0;
        while ((bytes / Math.pow(base, iterator)) >= base) {
            iterator++;
        }
        return iterator;
    };
    return MediaConversion;
}());
export { MediaConversion };
/**
 * Methods for converting percentages into display formats.
 */
var PercentageConversion = /** @class */ (function () {
    function PercentageConversion() {
    }
    /**
     * Converts the given value to a percentage.
     *
     * @param value the value to display as percent srring.
     */
    PercentageConversion.getPercentageDisplayValue = function (value) {
        if (value != null && !isNaN(value)) {
            return MsftSme.resourcesStrings()
                .MsftSmeShell.Core.Units.PercentageConversionPercentFormat.message.format(value.toString());
        }
        else {
            return MsftSme.resourcesStrings().MsftSmeShell.Core.Units.PercentageConversionUnknownFormat.message;
        }
    };
    return PercentageConversion;
}());
export { PercentageConversion };
//# sourceMappingURL=data:application/json;base64,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QUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDaEQsUUFBUSxFQUFFLENBQUM7UUFDZixDQUFDO1FBRUQsTUFBTSxDQUFPLFFBQVEsQ0FBQztJQUMxQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQWhGQSxBQWdGQyxJQUFBOztBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQWNBLENBQUM7SUFiRzs7OztPQUlHO0lBQ1csOENBQXlCLEdBQXZDLFVBQXdDLEtBQWE7UUFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBVztpQkFDckMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNwRyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsT0FBTyxDQUFDO1FBQ2pILENBQUM7SUFDTCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQSIsImZpbGUiOiJ1bml0cy5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=