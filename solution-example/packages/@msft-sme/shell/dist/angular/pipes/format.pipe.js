import { Pipe } from '@angular/core';
var FormatPipe = (function () {
    function FormatPipe() {
    }
    FormatPipe.prototype.transform = function (format, values) {
        if (!format || !values || values === []) {
            return format;
        }
        if (!Array.isArray(values)) {
            values = [values];
        }
        var transformedValues = values.map(function (value) {
            if (typeof value === 'string') {
                return value;
            }
            else {
                var targetAttr = value.target ? "target=\"" + value.target + "\"" : '';
                return "<a " + targetAttr + " href=\"" + value.href + "\">" + value.text + "</a>";
            }
        });
        return format.format.apply(format, transformedValues);
    };
    return FormatPipe;
}());
export { FormatPipe };
FormatPipe.decorators = [
    { type: Pipe, args: [{ name: 'smeFormat' },] },
];
/** @nocollapse */
FormatPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUEsRUFBb0IsTUFBTyxlQUFBLENBQWdCO0FBV3BEO0lBQUE7SUEyQkEsQ0FBQztJQTFCVSw4QkFBUyxHQUFoQixVQUFpQixNQUFjLEVBQUUsTUFBNEM7UUFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBRUQsSUFBSSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztZQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLGNBQVcsS0FBSyxDQUFDLE1BQU0sT0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLFFBQU0sVUFBVSxnQkFBVSxLQUFLLENBQUMsSUFBSSxXQUFLLEtBQUssQ0FBQyxJQUFJLFNBQU0sQ0FBQztZQUNyRSxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQU9MLGlCQUFDO0FBQUQsQ0EzQkEsQUEyQkM7O0FBTk0scUJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFHLEVBQUU7Q0FDOUMsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHlCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6ImZvcm1hdC5waXBlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==