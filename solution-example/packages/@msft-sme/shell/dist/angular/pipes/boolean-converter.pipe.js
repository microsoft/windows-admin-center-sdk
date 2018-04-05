import { Pipe } from '@angular/core';
import { Logging, LogLevel } from '../../core';
var BooleanConverterPipe = (function () {
    function BooleanConverterPipe() {
    }
    BooleanConverterPipe.prototype.transform = function (value, args) {
        if (args) {
            var stringValue = args.get(!!value);
            if (stringValue !== undefined) {
                return stringValue;
            }
            else {
                Logging.log({
                    level: LogLevel.Warning,
                    message: "Boolean value for " + value + " is " + !!value + "} but it is not defined in map " + args + ".",
                    params: {
                        args: args,
                        stringValue: stringValue,
                        value: value
                    },
                    source: 'BooleanConverterPipe'
                });
            }
        }
        else {
            Logging.log({
                level: LogLevel.Warning,
                message: "No map defined to translate value " + value + ".",
                params: {
                    args: args,
                    value: value
                },
                source: 'BooleanConverterPipe'
            });
        }
        return value.toString();
    };
    return BooleanConverterPipe;
}());
export { BooleanConverterPipe };
BooleanConverterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'smeBooleanConverter'
            },] },
];
/** @nocollapse */
BooleanConverterPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvYm9vbGVhbi1jb252ZXJ0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBQSxFQUFvQixNQUFPLGVBQUEsQ0FBZ0I7QUFDcEQsT0FBTyxFQUFFLE9BQUEsRUFBUyxRQUFBLEVBQVMsTUFBTyxZQUFBLENBQWE7QUFHL0M7SUFBQTtJQXlDQSxDQUFDO0lBeENVLHdDQUFTLEdBQWhCLFVBQWlCLEtBQWMsRUFBRSxJQUEwQjtRQUN2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFcEMsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ1IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPO29CQUN2QixPQUFPLEVBQUUsdUJBQXFCLEtBQUssWUFBTyxDQUFDLENBQUMsS0FBSyx1Q0FBa0MsSUFBSSxNQUFHO29CQUMxRixNQUFNLEVBQUU7d0JBQ0osSUFBSSxFQUFFLElBQUk7d0JBQ1YsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNELE1BQU0sRUFBRSxzQkFBc0I7aUJBQ2pDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNSLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTztnQkFDdkIsT0FBTyxFQUFFLHVDQUFxQyxLQUFLLE1BQUc7Z0JBQ3RELE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxNQUFNLEVBQUUsc0JBQXNCO2FBQ2pDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFTTCwyQkFBQztBQUFELENBekNBLEFBeUNDOztBQVJNLCtCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxFQUFFLHFCQUFxQjthQUM5QixFQUFHLEVBQUU7Q0FDTCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsbUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUMiLCJmaWxlIjoiYm9vbGVhbi1jb252ZXJ0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=