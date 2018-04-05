import { Pipe } from '@angular/core';
/**
 * This pipe filters an array and returns the result.
 * Normally we would get an exception if we simply returned the transformed
 * array as it causes an additional change detection cycle in dev mode.
 *
 * To avoid this we always return the same array an merely add remove items from it
 * This is not a great option for large arrays, but will work fine for small ones.
 *
 * See the following stack overflow question for more details
 * http://stackoverflow.com/a/34497504/7292792
 */
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
        this.tmp = [];
    }
    FilterPipe.prototype.transform = function (value, filter, not) {
        if (not === void 0) { not = false; }
        this.tmp.length = 0;
        if (value && Array.isArray(value)) {
            var filterFunc = filter;
            if (typeof filter === 'string') {
                var prop_1 = filter;
                filterFunc = function (item) { return item[prop_1]; };
            }
            if (not) {
                var originalFunc_1 = filterFunc;
                filterFunc = function (item) { return !originalFunc_1(item); };
            }
            var arr = value.filter(filterFunc);
            (_a = this.tmp).push.apply(_a, arr);
        }
        return this.tmp;
        var _a;
    };
    FilterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'smeFilter',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    FilterPipe.ctorParameters = function () { return []; };
    return FilterPipe;
}());
export { FilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvZmlsdGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUEsRUFBb0IsTUFBTyxlQUFBLENBQWdCO0FBR3BEOzs7Ozs7Ozs7O0dBVUc7QUFDSDtJQUFBO1FBQ1ksUUFBRyxHQUFHLEVBQUUsQ0FBQztJQTJCckIsQ0FBQztJQTFCVSw4QkFBUyxHQUFoQixVQUFpQixLQUFpQixFQUFFLE1BQTRDLEVBQUUsR0FBZ0I7UUFBaEIsb0JBQUEsRUFBQSxXQUFnQjtRQUM5RixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksVUFBVSxHQUE2RCxNQUFNLENBQUM7WUFDbEYsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxNQUFJLEdBQUcsTUFBTSxDQUFDO2dCQUNsQixVQUFVLEdBQUcsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBSSxDQUFDLEVBQVYsQ0FBVSxDQUFDO1lBQ3BDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksY0FBWSxHQUFHLFVBQVUsQ0FBQztnQkFDOUIsVUFBVSxHQUFHLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxjQUFZLENBQUMsSUFBSSxDQUFDLEVBQW5CLENBQW1CLENBQUM7WUFDN0MsQ0FBQztZQUNELElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsQ0FBQSxLQUFBLElBQUksQ0FBQyxHQUFHLENBQUEsQ0FBQyxJQUFJLFdBQUksR0FBRyxFQUFFO1FBQzFCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7SUFDcEIsQ0FBQztJQUNFLHFCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDakIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxLQUFLO2lCQUNkLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx5QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLGlCQUFDO0NBNUJELEFBNEJDLElBQUE7U0E1QlksVUFBVSIsImZpbGUiOiJmaWx0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=