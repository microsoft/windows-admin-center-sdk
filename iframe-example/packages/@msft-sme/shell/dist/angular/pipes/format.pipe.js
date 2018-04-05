import { Pipe } from '@angular/core';
var FormatPipe = /** @class */ (function () {
    function FormatPipe() {
    }
    FormatPipe.prototype.transform = function (format, values) {
        if (!format || MsftSme.isNullOrUndefined(values) || values === []) {
            return format;
        }
        if (!Array.isArray(values)) {
            values = [values];
        }
        var transformedValues = values.map(function (value) {
            var linkValue = value;
            if (linkValue.href) {
                var targetAttr = linkValue.target ? "target=\"" + linkValue.target + "\"" : '';
                return "<a class=\"sme-link\" " + targetAttr + " href=\"" + linkValue.href + "\">" + linkValue.text + "</a>";
            }
            else {
                return value;
            }
        });
        return format.format.apply(format, transformedValues);
    };
    FormatPipe.decorators = [
        { type: Pipe, args: [{ name: 'smeFormat' },] },
    ];
    /** @nocollapse */
    FormatPipe.ctorParameters = function () { return []; };
    return FormatPipe;
}());
export { FormatPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvZm9ybWF0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUEsRUFBb0IsTUFBTyxlQUFBLENBQWdCO0FBV3BEO0lBQUE7SUE0QkEsQ0FBQztJQTNCVSw4QkFBUyxHQUFoQixVQUFpQixNQUFjLEVBQUUsTUFBNEM7UUFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUVELElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7WUFDcEMsSUFBSSxTQUFTLEdBQW1CLEtBQUssQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBVyxTQUFTLENBQUMsTUFBTSxPQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDeEUsTUFBTSxDQUFDLDJCQUF1QixVQUFVLGdCQUFVLFNBQVMsQ0FBQyxJQUFJLFdBQUssU0FBUyxDQUFDLElBQUksU0FBTSxDQUFDO1lBQzlGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0UscUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFHLEVBQUU7S0FDOUMsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0lBQ0YsaUJBQUM7Q0E1QkQsQUE0QkMsSUFBQTtTQTVCWSxVQUFVIiwiZmlsZSI6ImZvcm1hdC5waXBlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==