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
var HTMLMinifier = require("html-minifier");
var util = require("../../util/util");
var baseProcessor_1 = require("./baseProcessor");
var defaultOptions = {
    collapseWhitespace: true,
    removeComments: true,
    // The following attributes are required so that angular attributes and bindings ar preserved
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
    customAttrAssign: [/\)?\]?=/]
};
/**
 * Input File Processor for HTML files. Uses html-minifier internally.
 * See https://github.com/kangax/html-minifier for options
 */
var HTMLFileProcessor = /** @class */ (function (_super) {
    __extends(HTMLFileProcessor, _super);
    function HTMLFileProcessor(options) {
        var _this = _super.call(this, 'html', ['ts']) || this;
        _this.options = options;
        _this.options = util.extend({}, [defaultOptions, options]);
        return _this;
    }
    HTMLFileProcessor.prototype.process = function (file, targetType, callback) {
        var _this = this;
        _super.prototype.process.call(this, file, targetType, function (err, preProcessedFile) {
            if (!err) {
                preProcessedFile = HTMLMinifier.minify(preProcessedFile, _this.options);
            }
            callback(err, preProcessedFile);
        });
    };
    return HTMLFileProcessor;
}(baseProcessor_1.BaseFileProcessor));
exports.HTMLFileProcessor = HTMLFileProcessor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9wcm9jZXNzb3JzL2h0bWxQcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQStDO0FBQy9DLHNDQUF5QztBQUV6QyxpREFBb0Q7QUFFcEQsSUFBTSxjQUFjLEdBQUc7SUFDbkIsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixjQUFjLEVBQUUsSUFBSTtJQUNwQiw2RkFBNkY7SUFDN0YscUJBQXFCLEVBQUUsS0FBSztJQUM1QixhQUFhLEVBQUUsSUFBSTtJQUNuQixrQkFBa0IsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLGdCQUFnQixFQUFFLENBQUMsU0FBUyxDQUFDO0NBQ2hDLENBQUM7QUFFRjs7O0dBR0c7QUFDSDtJQUF1QyxxQ0FBaUI7SUFFcEQsMkJBQW9CLE9BQTZCO1FBQWpELFlBQ0ksa0JBQU0sTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FFeEI7UUFIbUIsYUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFFN0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDOztJQUM5RCxDQUFDO0lBRU0sbUNBQU8sR0FBZCxVQUFlLElBQVMsRUFBRSxVQUEwQixFQUFFLFFBQXNCO1FBQTVFLGlCQU9DO1FBTkcsaUJBQU0sT0FBTyxZQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBQyxHQUFHLEVBQUUsZ0JBQWdCO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUCxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRSxDQUFDO1lBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FmQSxBQWVDLENBZnNDLGlDQUFpQixHQWV2RDtBQWZZLDhDQUFpQiIsImZpbGUiOiJjbGFzc2lmeS9wcm9jZXNzb3JzL2h0bWxQcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
