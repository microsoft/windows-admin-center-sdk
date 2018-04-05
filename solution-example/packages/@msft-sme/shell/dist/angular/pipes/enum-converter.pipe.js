import { Pipe } from '@angular/core';
import { Logging, LogLevel } from '../../core';
var EnumConverterPipe = (function () {
    function EnumConverterPipe() {
    }
    EnumConverterPipe.prototype.transform = function (value, args) {
        if (value === null || isNaN(value)) {
            // if there's no value to translate then return nothing
            return null;
        }
        if (args) {
            var stringValue = args.get(value);
            if (stringValue !== undefined) {
                return stringValue;
            }
            else {
                Logging.log({
                    level: LogLevel.Warning,
                    message: "Value '" + value + "' is not defined in map " + args,
                    params: {
                        args: args,
                        stringValue: stringValue,
                        value: value
                    },
                    source: 'EnumConverterPipe'
                });
            }
        }
        else {
            Logging.log({
                level: LogLevel.Warning,
                message: "No map defined to translate value " + value,
                params: {
                    args: args,
                    value: value
                },
                source: 'EnumConverterPipe'
            });
        }
        return value.toString();
    };
    return EnumConverterPipe;
}());
export { EnumConverterPipe };
EnumConverterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'smeEnumConverter'
            },] },
];
/** @nocollapse */
EnumConverterPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvZW51bS1jb252ZXJ0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBQSxFQUFvQixNQUFPLGVBQUEsQ0FBZ0I7QUFDcEQsT0FBTyxFQUFFLE9BQUEsRUFBUyxRQUFBLEVBQVMsTUFBTyxZQUFBLENBQWE7QUFHL0M7SUFBQTtJQTZDQSxDQUFDO0lBNUNVLHFDQUFTLEdBQWhCLFVBQWlCLEtBQWEsRUFBRSxJQUF5QjtRQUNyRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsdURBQXVEO1lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDO29CQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTztvQkFDdkIsT0FBTyxFQUFFLFlBQVUsS0FBSyxnQ0FBMkIsSUFBTTtvQkFDekQsTUFBTSxFQUFFO3dCQUNKLElBQUksRUFBRSxJQUFJO3dCQUNWLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixLQUFLLEVBQUUsS0FBSztxQkFDZjtvQkFDRCxNQUFNLEVBQUUsbUJBQW1CO2lCQUM5QixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDUixLQUFLLEVBQUUsUUFBUSxDQUFDLE9BQU87Z0JBQ3ZCLE9BQU8sRUFBRSx1Q0FBcUMsS0FBTztnQkFDckQsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJO29CQUNWLEtBQUssRUFBRSxLQUFLO2lCQUNmO2dCQUNELE1BQU0sRUFBRSxtQkFBbUI7YUFDOUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQVNMLHdCQUFDO0FBQUQsQ0E3Q0EsQUE2Q0M7O0FBUk0sNEJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsa0JBQWtCO2FBQzNCLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJlbnVtLWNvbnZlcnRlci5waXBlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==