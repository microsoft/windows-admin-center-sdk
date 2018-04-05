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
var baseProcessor_1 = require("./baseProcessor");
// SVGO has no typings
var SVGO = require('svgo');
var defaultOptions = {};
/**
 * Input File Processor for svg files. Uses svgo internally.
 * See https://github.com/svg/svgo and https://github.com/svg/svgo/blob/master/docs/how-it-works/en.md#1-config for options
 */
var SVGFileProcessor = /** @class */ (function (_super) {
    __extends(SVGFileProcessor, _super);
    function SVGFileProcessor(options) {
        var _this = _super.call(this, 'svg', ['ts', 'css']) || this;
        _this.options = options;
        _this.options = util.extend({}, [defaultOptions, options]);
        return _this;
    }
    SVGFileProcessor.prototype.escape = function (input, targetType) {
        input = _super.prototype.escape.call(this, input, targetType);
        if (targetType === 'css') {
            // edge / IE11 has an issue with unescaped svgs in css files  
            input = classify_1.regexReplaceAll(input, '"', '\'');
            input = classify_1.regexReplaceAll(input, '%', '%25');
            input = classify_1.regexReplaceAll(input, '#', '%23');
            input = classify_1.regexReplaceAll(input, '{', '%7B');
            input = classify_1.regexReplaceAll(input, '}', '%7D');
            input = classify_1.regexReplaceAll(input, '<', '%3C');
            input = classify_1.regexReplaceAll(input, '>', '%3E');
        }
        return input;
    };
    SVGFileProcessor.prototype.process = function (file, targetType, callback) {
        var _this = this;
        _super.prototype.process.call(this, file, targetType, function (err, preProcessedFile) {
            if (err) {
                callback(err, preProcessedFile);
                return;
            }
            var svgo = new SVGO(_this.options);
            svgo.optimize(preProcessedFile).then(function (results) {
                callback(null, results.data);
            }, function (error) {
                callback(error, null);
            });
        });
    };
    return SVGFileProcessor;
}(baseProcessor_1.BaseFileProcessor));
exports.SVGFileProcessor = SVGFileProcessor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9wcm9jZXNzb3JzL3N2Z1Byb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsd0NBU3FCO0FBQ3JCLGlEQUFvRDtBQUVwRCxzQkFBc0I7QUFDdEIsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUUxQjs7O0dBR0c7QUFDSDtJQUFzQyxvQ0FBaUI7SUFFbkQsMEJBQW9CLE9BQVk7UUFBaEMsWUFDSSxrQkFBTSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FFOUI7UUFIbUIsYUFBTyxHQUFQLE9BQU8sQ0FBSztRQUU1QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0lBQzlELENBQUM7SUFFTSxpQ0FBTSxHQUFiLFVBQWMsS0FBYSxFQUFFLFVBQTBCO1FBQ25ELEtBQUssR0FBRyxpQkFBTSxNQUFNLFlBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLDhEQUE4RDtZQUM5RCxLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLEtBQUssR0FBRywwQkFBZSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0MsS0FBSyxHQUFHLDBCQUFlLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzQyxLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNDLEtBQUssR0FBRywwQkFBZSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0MsS0FBSyxHQUFHLDBCQUFlLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzQyxLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxrQ0FBTyxHQUFkLFVBQWUsSUFBUyxFQUFFLFVBQTBCLEVBQUUsUUFBc0I7UUFBNUUsaUJBZ0JDO1FBZkcsaUJBQU0sT0FBTyxZQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBQyxHQUFHLEVBQUUsZ0JBQWdCO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sUUFBUSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQ2hDLFVBQUMsT0FBTztnQkFDSixRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNGLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCx1QkFBQztBQUFELENBeENBLEFBd0NDLENBeENxQyxpQ0FBaUIsR0F3Q3REO0FBeENZLDRDQUFnQiIsImZpbGUiOiJjbGFzc2lmeS9wcm9jZXNzb3JzL3N2Z1Byb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
