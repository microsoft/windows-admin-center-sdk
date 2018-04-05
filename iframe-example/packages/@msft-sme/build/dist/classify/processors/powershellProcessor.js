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
var path = require("path");
var util = require("../../util/util");
var classify_1 = require("../classify");
var baseProcessor_1 = require("./baseProcessor");
var defaultOptions = {
    removeComments: true
};
/**
 * Input File Processor for powershell files
 * TODO: Find or build a simple powershell minifier? maybe: https://minifyps.codeplex.com/
 */
var PowerShellFileProcessor = /** @class */ (function (_super) {
    __extends(PowerShellFileProcessor, _super);
    function PowerShellFileProcessor(options) {
        var _this = _super.call(this, 'ps1', ['ts']) || this;
        _this.options = options;
        _this.options = util.extend({}, [defaultOptions, options]);
        return _this;
    }
    PowerShellFileProcessor.prototype.escape = function (input, targetType) {
        // we are skipping our super class escape method to avoid a conflict with singe quote escaping 
        // input = super.escape(input, targetType);
        this.verifySupport(targetType);
        // escape '\'
        input = classify_1.regexReplaceAll(input, '\\', '\\\\');
        // escape newlines
        input = classify_1.regexReplaceAll(input, '\n', '\\n');
        // copied from ps-code. Why are we escaping these?     
        input = classify_1.regexReplaceAll(input, '\'', '\\u0027');
        input = classify_1.regexReplaceAll(input, '<', '\\u003c');
        input = classify_1.regexReplaceAll(input, '>', '\\u003e');
        input = classify_1.regexReplaceAll(input, '&', '\\u0026');
        return input;
    };
    PowerShellFileProcessor.prototype.process = function (file, targetType, callback) {
        var _this = this;
        _super.prototype.process.call(this, file, targetType, function (err, preProcessedFile) {
            if (!err) {
                var skipRemoveComments = preProcessedFile.search(/##RemoveComments=false##/) > -1;
                if (_this.options.removeComments && !skipRemoveComments) {
                    // Powershell single line and multi line comments should be replaced with nothing
                    preProcessedFile = preProcessedFile.replace(/#.*|<#[\s\S]*?#>/g, '');
                }
                // ensure consistent newlines
                preProcessedFile = preProcessedFile.replace(/(\r|\n|\r\n)+\s*/g, '\n');
                // remove newlines at the end of the file
                preProcessedFile = preProcessedFile.replace(/(\n)+$/g, '');
                // add helper for debugging which script is being run
                preProcessedFile = util.format('##{0}##\n{1}', path.parse(file.path).name, preProcessedFile);
            }
            callback(err, preProcessedFile);
        });
    };
    return PowerShellFileProcessor;
}(baseProcessor_1.BaseFileProcessor));
exports.PowerShellFileProcessor = PowerShellFileProcessor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9wcm9jZXNzb3JzL3Bvd2Vyc2hlbGxQcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLHNDQUF5QztBQUN6Qyx3Q0FBb0c7QUFDcEcsaURBQW9EO0FBTXBELElBQU0sY0FBYyxHQUFtQztJQUNuRCxjQUFjLEVBQUUsSUFBSTtDQUN2QixDQUFDO0FBRUY7OztHQUdHO0FBQ0g7SUFBNkMsMkNBQWlCO0lBRTFELGlDQUFvQixPQUF1QztRQUEzRCxZQUNJLGtCQUFNLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBRXZCO1FBSG1CLGFBQU8sR0FBUCxPQUFPLENBQWdDO1FBRXZELEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzs7SUFDOUQsQ0FBQztJQUVNLHdDQUFNLEdBQWIsVUFBYyxLQUFhLEVBQUUsVUFBMEI7UUFDbkQsK0ZBQStGO1FBQy9GLDJDQUEyQztRQUUzQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRS9CLGFBQWE7UUFDYixLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLGtCQUFrQjtRQUNsQixLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTVDLHVEQUF1RDtRQUN2RCxLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELEtBQUssR0FBRywwQkFBZSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0MsS0FBSyxHQUFHLDBCQUFlLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQyxLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLHlDQUFPLEdBQWQsVUFBZSxJQUFTLEVBQUUsVUFBMEIsRUFBRSxRQUFzQjtRQUE1RSxpQkFxQkM7UUFwQkcsaUJBQU0sT0FBTyxZQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBQyxHQUFHLEVBQUUsZ0JBQWdCO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFDckQsaUZBQWlGO29CQUNqRixnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3pFLENBQUM7Z0JBRUQsNkJBQTZCO2dCQUM3QixnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXZFLHlDQUF5QztnQkFDekMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFM0QscURBQXFEO2dCQUNyRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUVqRyxDQUFDO1lBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLDhCQUFDO0FBQUQsQ0FsREEsQUFrREMsQ0FsRDRDLGlDQUFpQixHQWtEN0Q7QUFsRFksMERBQXVCIiwiZmlsZSI6ImNsYXNzaWZ5L3Byb2Nlc3NvcnMvcG93ZXJzaGVsbFByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
