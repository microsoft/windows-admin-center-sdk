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
var tslintDisable = '/* tslint:disable */';
var BaseTSGenerator = /** @class */ (function (_super) {
    __extends(BaseTSGenerator, _super);
    function BaseTSGenerator() {
        return _super.call(this, 'ts') || this;
    }
    BaseTSGenerator.prototype.generate = function (files, options, callback) {
        _super.prototype.generate.call(this, files, options, function (err, baseFile) {
            callback(err, util.format('{0}{2}\'use strict\'{2}{1}{2}', tslintDisable, baseFile, classify_1.newline));
        });
    };
    return BaseTSGenerator;
}(baseGenerator_1.BaseGenerator));
exports.BaseTSGenerator = BaseTSGenerator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9nZW5lcmF0b3JzL2Jhc2VUU0dlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsd0NBQTRIO0FBQzVILGlEQUFnRDtBQUVoRCxJQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQztBQUU3QztJQUFxQyxtQ0FBYTtJQUM5QztlQUFnQixrQkFBTSxJQUFJLENBQUM7SUFBRSxDQUFDO0lBRXZCLGtDQUFRLEdBQWYsVUFBZ0IsS0FBdUIsRUFBRSxPQUF3QixFQUFFLFFBQXNCO1FBQ3JGLGlCQUFNLFFBQVEsWUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLFFBQVE7WUFDekMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLCtCQUErQixFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsa0JBQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSb0MsNkJBQWEsR0FRakQ7QUFSWSwwQ0FBZSIsImZpbGUiOiJjbGFzc2lmeS9nZW5lcmF0b3JzL2Jhc2VUU0dlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
