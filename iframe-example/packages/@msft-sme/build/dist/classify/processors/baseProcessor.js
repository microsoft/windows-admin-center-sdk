"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../../util/util");
var classify_1 = require("../classify");
var BaseFileProcessor = /** @class */ (function () {
    function BaseFileProcessor(inputType, supportedTargets) {
        this.inputType = inputType;
        this.supportedTargets = supportedTargets;
    }
    BaseFileProcessor.prototype.verifySupport = function (targetType) {
        if (!this.supportedTargets.some(function (supported) { return supported === targetType; })) {
            var message = util.format('Unsupported target type: {0}. The supported types for this file processor are: {1}', targetType, this.supportedTargets);
            throw new Error(message);
        }
    };
    BaseFileProcessor.prototype.escape = function (input, targetType) {
        this.verifySupport(targetType);
        input = classify_1.regexReplaceAll(input, '\\', '\\\\');
        input = classify_1.regexReplaceAll(input, '\'', '\\\'');
        return input;
    };
    BaseFileProcessor.prototype.process = function (file, targetType, callback) {
        this.verifySupport(targetType);
        callback(null, file.contents.toString('utf8'));
    };
    return BaseFileProcessor;
}());
exports.BaseFileProcessor = BaseFileProcessor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9wcm9jZXNzb3JzL2Jhc2VQcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsd0NBQXVJO0FBRXZJO0lBQ0ksMkJBQW1CLFNBQXdCLEVBQVMsZ0JBQWtDO1FBQW5FLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUksQ0FBQztJQUVwRix5Q0FBYSxHQUFwQixVQUFxQixVQUEwQjtRQUMzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLEtBQUssVUFBVSxFQUF4QixDQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ3JCLG9GQUFvRixFQUNwRixVQUFVLEVBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBYyxLQUFhLEVBQUUsVUFBMEI7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLEtBQUssR0FBRywwQkFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sbUNBQU8sR0FBZCxVQUFlLElBQVMsRUFBRSxVQUEwQixFQUFFLFFBQXNCO1FBQ3hFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDTCx3QkFBQztBQUFELENBeEJBLEFBd0JDLElBQUE7QUF4QlksOENBQWlCIiwiZmlsZSI6ImNsYXNzaWZ5L3Byb2Nlc3NvcnMvYmFzZVByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
