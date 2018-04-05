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
 * {1} - module contents
 * {2} - spacer
 */
var tsModuleFormat = "{2}export module {0} {\n{1}\n{2}}";
/**
 * {0} - constant name
 * {1} - constant value
 * {2} - spacer
 */
var tsConstantFormat = '{2}export const {0}: string = \'{1}\';';
var TSNestedModuleGenerator = /** @class */ (function (_super) {
    __extends(TSNestedModuleGenerator, _super);
    function TSNestedModuleGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TSNestedModuleGenerator.prototype.getTsModule = function (files, spacerValue) {
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
                constants.push(util.format(tsConstantFormat, key, value, spacerValue));
            }
            else {
                var content = _this.getTsModule(value, spacerValue + classify_1.spacer);
                modules.push(util.format(tsModuleFormat, key, content, spacerValue));
            }
        });
        return constants.concat(modules).join(classify_1.newline);
    };
    TSNestedModuleGenerator.prototype.generate = function (files, options, callback) {
        var _this = this;
        _super.prototype.generate.call(this, files, options, function (err, header) {
            var content = _this.getTsModule(files, classify_1.spacer);
            var rootModule = util.format(tsModuleFormat, options.rootClass, content, '');
            callback(err, util.format('{0}{1}{2}', header, classify_1.newline, rootModule));
        });
    };
    return TSNestedModuleGenerator;
}(baseTSGenerator_1.BaseTSGenerator));
exports.TSNestedModuleGenerator = TSNestedModuleGenerator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9nZW5lcmF0b3JzL3RzTmVzdGVkTW9kdWxlR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyx3Q0FBb0k7QUFDcEkscURBQW9EO0FBRXBEOzs7O0dBSUc7QUFDSCxJQUFNLGNBQWMsR0FBRyxtQ0FFbEIsQ0FBQztBQUVOOzs7O0dBSUc7QUFDSCxJQUFNLGdCQUFnQixHQUFHLHdDQUF3QyxDQUFDO0FBRWxFO0lBQTZDLDJDQUFlO0lBQTVEOztJQThCQSxDQUFDO0lBNUJXLDZDQUFXLEdBQW5CLFVBQW9CLEtBQXVCLEVBQUUsV0FBbUI7UUFBaEUsaUJBbUJDO1FBbEJHLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsNkRBQTZEO1FBQzdELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWiw0QkFBNEI7WUFDNUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLHVDQUF1QztZQUN2QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFtQixLQUFLLEVBQUUsV0FBVyxHQUFHLGlCQUFNLENBQUMsQ0FBQztnQkFDOUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sMENBQVEsR0FBZixVQUFnQixLQUF1QixFQUFFLE9BQXdCLEVBQUUsUUFBc0I7UUFBekYsaUJBTUM7UUFMRyxpQkFBTSxRQUFRLFlBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO1lBQ3ZDLElBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGlCQUFNLENBQUMsQ0FBQztZQUM5QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3RSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxrQkFBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQTlCQSxBQThCQyxDQTlCNEMsaUNBQWUsR0E4QjNEO0FBOUJZLDBEQUF1QiIsImZpbGUiOiJjbGFzc2lmeS9nZW5lcmF0b3JzL3RzTmVzdGVkTW9kdWxlR2VuZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
