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
var gutil = require("gulp-util");
var util = require("../../util/util");
var baseProcessor_1 = require("./baseProcessor");
// no typings available for clean-css v. 4 or higher, so require it without typings
var cleanCSS = require('clean-css');
var defaultOptions = {
    level: {
        1: {
            all: true,
            specialComments: 0
        },
        2: {
            all: false
        }
    }
};
/**
 * Input File Processor for CSS files. Uses html-minifier internally.
 * See https://github.com/jakubpawlowicz/clean-css for valid options
 */
var CSSFileProcessor = /** @class */ (function (_super) {
    __extends(CSSFileProcessor, _super);
    function CSSFileProcessor(options) {
        var _this = _super.call(this, 'css', ['ts']) || this;
        _this.options = options;
        _this.options = util.extend({}, [defaultOptions, options]);
        return _this;
    }
    CSSFileProcessor.prototype.process = function (file, targetType, callback) {
        var _this = this;
        _super.prototype.process.call(this, file, targetType, function (err, preProcessedFile) {
            if (!err) {
                var output = new cleanCSS(_this.options).minify(preProcessedFile);
                if (output.warnings) {
                    output.warnings.forEach(function (w) { return gutil.log(gutil.colors.yellow(w)); });
                }
                if (output.errors) {
                    err = output.errors.join('\n');
                }
                preProcessedFile = output.styles;
            }
            callback(err, preProcessedFile);
        });
    };
    return CSSFileProcessor;
}(baseProcessor_1.BaseFileProcessor));
exports.CSSFileProcessor = CSSFileProcessor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9wcm9jZXNzb3JzL2Nzc1Byb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBb0M7QUFDcEMsc0NBQXlDO0FBRXpDLGlEQUFvRDtBQUVwRCxtRkFBbUY7QUFDbkYsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXRDLElBQU0sY0FBYyxHQUFHO0lBQ25CLEtBQUssRUFBRTtRQUNILENBQUMsRUFBRTtZQUNDLEdBQUcsRUFBRSxJQUFJO1lBQ1QsZUFBZSxFQUFFLENBQUM7U0FDckI7UUFDRCxDQUFDLEVBQUU7WUFDQyxHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7Q0FDSixDQUFDO0FBRUY7OztHQUdHO0FBQ0g7SUFBc0Msb0NBQWlCO0lBRW5ELDBCQUFvQixPQUFZO1FBQWhDLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FFdkI7UUFIbUIsYUFBTyxHQUFQLE9BQU8sQ0FBSztRQUU1QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0lBQzlELENBQUM7SUFFTSxrQ0FBTyxHQUFkLFVBQWUsSUFBUyxFQUFFLFVBQTBCLEVBQUUsUUFBc0I7UUFBNUUsaUJBZ0JDO1FBZkcsaUJBQU0sT0FBTyxZQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBQyxHQUFHLEVBQUUsZ0JBQWdCO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBRWpFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNoQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNyQyxDQUFDO1lBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0F4QkEsQUF3QkMsQ0F4QnFDLGlDQUFpQixHQXdCdEQ7QUF4QlksNENBQWdCIiwiZmlsZSI6ImNsYXNzaWZ5L3Byb2Nlc3NvcnMvY3NzUHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
