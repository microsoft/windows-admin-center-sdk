"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../../util/util");
var classify_1 = require("../classify");
var baseGenerator_1 = require("./baseGenerator");
/**
 * {0} - module prefix
 * {2} - constant name
 * {4} - constant value
 */
var cssClassFormat = ".{0} {\n    background-image: url(\"data:image/svg+xml;charset=utf8,{1}\");\n}";
var CssBackgroundImageGenerator = /** @class */ (function (_super) {
    __extends(CssBackgroundImageGenerator, _super);
    function CssBackgroundImageGenerator() {
        return _super.call(this, 'css') || this;
    }
    CssBackgroundImageGenerator.prototype.getCssClasses = function (collection, prefix) {
        var _this = this;
        var constants = [];
        var modules = [];
        // sort the keys here so they end up sorted in the final file
        var keys = Object.keys(collection).sort();
        keys.forEach(function (key) {
            var value = collection[key];
            var className = util.format('{0}-{1}', prefix, key);
            if (util.isString(value)) {
                constants.push(util.format(cssClassFormat, className, value));
            }
            else {
                var moduleClasses = _this.getCssClasses(value, className + '-');
                modules.push(moduleClasses);
            }
        });
        return constants.concat(modules).join(classify_1.newline);
    };
    CssBackgroundImageGenerator.prototype.generate = function (files, options, callback) {
        var _this = this;
        _super.prototype.generate.call(this, files, options, function (err, header) {
            var classes = _this.getCssClasses(files, options.rootClass.toLowerCase());
            callback(err, util.format('{0}{1}{2}', header, classify_1.newline, classes));
        });
    };
    return CssBackgroundImageGenerator;
}(baseGenerator_1.BaseGenerator));
exports.CssBackgroundImageGenerator = CssBackgroundImageGenerator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9nZW5lcmF0b3JzL2Nzc0JhY2tncm91bmRJbWFnZUdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsd0NBQW9JO0FBQ3BJLGlEQUFnRDtBQUVoRDs7OztHQUlHO0FBQ0gsSUFBTSxjQUFjLEdBQUcsZ0ZBRXJCLENBQUM7QUFFSDtJQUFpRCwrQ0FBYTtJQUUxRDtlQUFnQixrQkFBTSxLQUFLLENBQUM7SUFBRSxDQUFDO0lBRXZCLG1EQUFhLEdBQXJCLFVBQXNCLFVBQTRCLEVBQUUsTUFBYztRQUFsRSxpQkFnQkM7UUFmRyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLDZEQUE2RDtRQUM3RCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ1osSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxhQUFhLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBbUIsS0FBSyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDakYsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSw4Q0FBUSxHQUFmLFVBQWdCLEtBQXVCLEVBQUUsT0FBd0IsRUFBRSxRQUFzQjtRQUF6RixpQkFLQztRQUpHLGlCQUFNLFFBQVEsWUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDdkMsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLGtCQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxrQ0FBQztBQUFELENBNUJBLEFBNEJDLENBNUJnRCw2QkFBYSxHQTRCN0Q7QUE1Qlksa0VBQTJCIiwiZmlsZSI6ImNsYXNzaWZ5L2dlbmVyYXRvcnMvY3NzQmFja2dyb3VuZEltYWdlR2VuZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
