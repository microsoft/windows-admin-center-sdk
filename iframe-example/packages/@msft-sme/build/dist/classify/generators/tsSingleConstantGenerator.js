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
var baseTSGenerator_1 = require("./baseTSGenerator");
/**
 * {0} - module name
 * {1} - properties
 */
var tsRootModuleFormat = "export const {0} = {\n{1}\n};";
/**
 * {0} - module name
 * {1} - properties
 * {2} - spacer
 */
var tsSubModuleFormat = "{2}'{0}': {\n{1}\n{2}}";
/**
 * {0} - property name
 * {1} - property value
 * {2} - spacer
 */
var tsValueFormat = "{2}{0}: '{1}'";
var TSSingleConstantGenerator = /** @class */ (function (_super) {
    __extends(TSSingleConstantGenerator, _super);
    function TSSingleConstantGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TSSingleConstantGenerator.prototype.getTsModule = function (files, spacerValue) {
        var _this = this;
        var constants = [];
        var modules = [];
        // sort the keys here so they end up sorted in the final file
        var keys = Object.keys(files).sort();
        keys.forEach(function (key) {
            // get value from collection
            var value = files[key];
            // make sure key is safe for typescript
            key = key.replace(/-+(.)/g, function (d) { return d[d.length - 1].toUpperCase(); });
            if (util.isString(value)) {
                constants.push(util.format(tsValueFormat, key, value, spacerValue));
            }
            else {
                var content = _this.getTsModule(value, spacerValue + classify_1.spacer);
                modules.push(util.format(tsSubModuleFormat, key, content, spacerValue));
            }
        });
        var joint = util.format(',{0}', classify_1.newline);
        return constants.concat(modules).join(joint);
    };
    TSSingleConstantGenerator.prototype.generate = function (files, options, callback) {
        var _this = this;
        _super.prototype.generate.call(this, files, options, function (err, header) {
            var content = _this.getTsModule(files, classify_1.spacer);
            var rootModule = util.format(tsRootModuleFormat, options.rootClass, content);
            callback(err, util.format('{0}{1}{2}', header, classify_1.newline, rootModule));
        });
    };
    return TSSingleConstantGenerator;
}(baseTSGenerator_1.BaseTSGenerator));
exports.TSSingleConstantGenerator = TSSingleConstantGenerator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9nZW5lcmF0b3JzL3RzU2luZ2xlQ29uc3RhbnRHZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLHdDQUFvSTtBQUNwSSxxREFBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsSUFBTSxrQkFBa0IsR0FBRywrQkFFeEIsQ0FBQztBQUVKOzs7O0dBSUc7QUFDSCxJQUFNLGlCQUFpQixHQUFHLHdCQUVyQixDQUFDO0FBRU47Ozs7R0FJRztBQUNILElBQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUV0QztJQUErQyw2Q0FBZTtJQUE5RDs7SUErQkEsQ0FBQztJQTdCVywrQ0FBVyxHQUFuQixVQUFvQixLQUF1QixFQUFFLFdBQW1CO1FBQWhFLGlCQW9CQztRQW5CRyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLDZEQUE2RDtRQUM3RCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ1osNEJBQTRCO1lBQzVCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2Qix1Q0FBdUM7WUFDdkMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQTdCLENBQTZCLENBQUMsQ0FBQztZQUVoRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQW1CLEtBQUssRUFBRSxXQUFXLEdBQUcsaUJBQU0sQ0FBQyxDQUFDO2dCQUM5RSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGtCQUFPLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLDRDQUFRLEdBQWYsVUFBZ0IsS0FBdUIsRUFBRSxPQUF3QixFQUFFLFFBQXNCO1FBQXpGLGlCQU1DO1FBTEcsaUJBQU0sUUFBUSxZQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUN2QyxJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxpQkFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLGtCQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxnQ0FBQztBQUFELENBL0JBLEFBK0JDLENBL0I4QyxpQ0FBZSxHQStCN0Q7QUEvQlksOERBQXlCIiwiZmlsZSI6ImNsYXNzaWZ5L2dlbmVyYXRvcnMvdHNTaW5nbGVDb25zdGFudEdlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
