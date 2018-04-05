/**
 * Internationalization/Globalization class.
 */
var Globalization = /** @class */ (function () {
    function Globalization() {
    }
    Object.defineProperty(Globalization, "localeId", {
        get: function () {
            var id = MsftSme.self().Resources.localeId;
            return id ? id : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Globalization, "fullTimeFormat", {
        get: function () {
            return new Intl.DateTimeFormat(Globalization.localeId, Globalization.fullTimeOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Globalization, "dateTimeOnlyFormat", {
        get: function () {
            return new Intl.DateTimeFormat(Globalization.localeId, Globalization.dateTimeOnlyOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Globalization, "dateOnlyFormat", {
        get: function () {
            return new Intl.DateTimeFormat(Globalization.localeId, Globalization.dateOnlyOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Globalization, "timeOnlyFormat", {
        get: function () {
            return new Intl.DateTimeFormat(Globalization.localeId, Globalization.timeOnlyOptions);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Format with full time to display.
     *
     * @param data the date object.
     */
    Globalization.fullTime = function (date) {
        if (MsftSme.isNullOrUndefined(date)) {
            return null;
        }
        return Globalization.fullTimeFormat.format(date);
    };
    /**
     * Format with date time only to display.
     *
     * @param data the date object.
     */
    Globalization.dateTimeOnly = function (date) {
        if (MsftSme.isNullOrUndefined(date)) {
            return null;
        }
        return Globalization.dateTimeOnlyFormat.format(date);
    };
    /**
     * Format with date only to display.
     *
     * @param data the date object.
     */
    Globalization.dateOnly = function (date) {
        if (MsftSme.isNullOrUndefined(date)) {
            return null;
        }
        return Globalization.dateOnlyFormat.format(date);
    };
    /**
     * Format with time only to display.
     *
     * @param data the date object.
     */
    Globalization.timeOnly = function (date) {
        if (MsftSme.isNullOrUndefined(date)) {
            return null;
        }
        return Globalization.timeOnlyFormat.format(date);
    };
    /**
     * Format simple number to display.
     *
     * (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat to add
     * more feature such as currency display)
     *
     * @param data the number data.
     */
    Globalization.number = function (data, options) {
        return Intl.NumberFormat(Globalization.localeId, options).format(data);
    };
    Globalization.fullTimeOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };
    Globalization.dateTimeOnlyOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    Globalization.dateOnlyOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    Globalization.timeOnlyOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return Globalization;
}());
export { Globalization };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9nbG9iYWxpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOztHQUVHO0FBQ0g7SUFBQTtJQW9IQSxDQUFDO0lBcEZHLHNCQUFtQix5QkFBUTthQUEzQjtZQUNJLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQW1CLCtCQUFjO2FBQWpDO1lBQ0ksTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxRixDQUFDOzs7T0FBQTtJQUVELHNCQUFtQixtQ0FBa0I7YUFBckM7WUFDSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDOUYsQ0FBQzs7O09BQUE7SUFFRCxzQkFBbUIsK0JBQWM7YUFBakM7WUFDSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFGLENBQUM7OztPQUFBO0lBRUQsc0JBQW1CLCtCQUFjO2FBQWpDO1lBQ0ksTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxRixDQUFDOzs7T0FBQTtJQUVEOzs7O09BSUc7SUFDVyxzQkFBUSxHQUF0QixVQUF1QixJQUFVO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7OztPQUlHO0lBQ1csMEJBQVksR0FBMUIsVUFBMkIsSUFBVTtRQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7OztPQUlHO0lBQ1csc0JBQVEsR0FBdEIsVUFBdUIsSUFBVTtRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLHNCQUFRLEdBQXRCLFVBQXVCLElBQVU7UUFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDVyxvQkFBTSxHQUFwQixVQUFxQixJQUFZLEVBQUUsT0FBa0M7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQWxIYyw2QkFBZSxHQUFHO1FBQzdCLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLFNBQVM7UUFDaEIsR0FBRyxFQUFFLFNBQVM7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFlBQVksRUFBRSxPQUFPO0tBQ3hCLENBQUM7SUFFYSxpQ0FBbUIsR0FBRztRQUNqQyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEdBQUcsRUFBRSxTQUFTO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsU0FBUztLQUNwQixDQUFDO0lBRWEsNkJBQWUsR0FBRztRQUM3QixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEdBQUcsRUFBRSxTQUFTO0tBQ2pCLENBQUM7SUFFYSw2QkFBZSxHQUFHO1FBQzdCLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFLFNBQVM7UUFDakIsTUFBTSxFQUFFLFNBQVM7S0FDcEIsQ0FBQztJQXNGTixvQkFBQztDQXBIRCxBQW9IQyxJQUFBO1NBcEhZLGFBQWEiLCJmaWxlIjoiZ2xvYmFsaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=