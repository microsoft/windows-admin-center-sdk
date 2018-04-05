"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgCodeConverter = /** @class */ (function () {
    function SvgCodeConverter() {
    }
    SvgCodeConverter.prototype.contentReset = function () {
        this.outputCss = '';
        this.outputTs = '';
    };
    SvgCodeConverter.prototype.contentAddCss = function (line) {
        this.outputCss += line;
        return line;
    };
    SvgCodeConverter.prototype.contentAddTs = function (line) {
        this.outputTs += line;
        return line;
    };
    SvgCodeConverter.prototype.indent = function (count) {
        var pad = '';
        for (var i = 0; i < count; i++) {
            pad += '    ';
        }
        return pad;
    };
    SvgCodeConverter.prototype.generate = function (collection, pathPrefix) {
        var root = this.createStructure(collection, pathPrefix);
        this.contentAddCss('/***** gulp-svg-code auto generated *****/\r\n');
        var tsBase = null;
        this.contentAddTs('/***** gulp-svg-code auto generated *****/\r\n');
        this.contentAddTs('export module Svg {\r\n');
        this.contentAddTs(this.indent(1) + '\'use strict\'\r\n');
        this.addData(root, []);
        this.contentAddTs('}\r\n');
    };
    SvgCodeConverter.prototype.addData = function (current, segments) {
        var _this = this;
        var ignores = ['<?xml', '<!-- Generator:', '<!DOCTYPE'];
        var nested = [];
        var keys = Object.keys(current);
        var _loop_1 = function (key) {
            var content = current[key];
            segments.push(key);
            console.log(key);
            if (typeof content === 'object') {
                var segs = segments.slice(0);
                nested.push({ content: content, segs: segs });
            }
            else if (typeof content === 'string') {
                var cssName = '.svg-' + segments.join('--');
                this_1.contentAddCss(cssName + ' {\r\n');
                this_1.contentAddCss(this_1.indent(1) + 'background-image: url("data:image/svg+xml;');
                this_1.contentAddTs(this_1.indent(segments.length) + 'export const ' + key + ' = \'');
                var lines = content.split('\r');
                var svg_1 = '';
                lines.forEach(function (value, index, array) {
                    value = value.replace('\n', '');
                    if (value && value.length > 1) {
                        var skip = false;
                        for (var _i = 0, ignores_1 = ignores; _i < ignores_1.length; _i++) {
                            var item = ignores_1[_i];
                            if (value.indexOf(item) >= 0) {
                                skip = true;
                                break;
                            }
                        }
                        if (!skip) {
                            svg_1 += value;
                            // this.contentAddCss(value);
                            _this.contentAddTs(value);
                        }
                    }
                });
                svg_1 = this_1.replaceAll(svg_1, '"', '\'');
                svg_1 = this_1.replaceAll(svg_1, '%', '%25');
                svg_1 = this_1.replaceAll(svg_1, '#', '%23');
                svg_1 = this_1.replaceAll(svg_1, '{', '%7B');
                svg_1 = this_1.replaceAll(svg_1, '}', '%7D');
                svg_1 = this_1.replaceAll(svg_1, '<', '%3C');
                svg_1 = this_1.replaceAll(svg_1, '>', '%3E');
                this_1.contentAddCss('charset=utf8,' + svg_1);
                this_1.contentAddCss('")\r\n');
                this_1.contentAddCss('}\r\n');
                this_1.contentAddCss('\r\n');
                this_1.contentAddTs('\';\r\n');
            }
            segments.pop();
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
        }
        for (var index = 0; index < nested.length; index++) {
            var _a = nested[index], content = _a.content, segs = _a.segs;
            this.contentAddTs(this.indent(segs.length) + 'export module ' + segs[segs.length - 1] + ' {\r\n');
            this.addData(nested[index].content, nested[index].segs);
            this.contentAddTs(this.indent(segs.length) + '}\r\n');
        }
    };
    SvgCodeConverter.prototype.createStructure = function (collection, pathPrefix) {
        var root = {};
        var keys = Object.keys(collection).sort(function (left, right) { return left.toLowerCase().localeCompare(right.toLowerCase()); });
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            var shortName = key.substr(0, key.length - '.svg'.length);
            shortName = this.replaceAll(shortName.substr(pathPrefix.length + 1), '-', '_').toLowerCase();
            var segments = shortName.split('\\');
            var current = root;
            for (var index = 0; index < segments.length - 1; index++) {
                var segment = segments[index];
                if (current.hasOwnProperty(segment)) {
                    current = current[segment];
                }
                else {
                    current[segment] = {};
                    current = current[segment];
                    console.log(segment);
                }
            }
            current[segments[segments.length - 1]] = collection[key];
        }
        return root;
    };
    SvgCodeConverter.prototype.regexEscape = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    };
    SvgCodeConverter.prototype.replaceAll = function (input, searchValue, replaceValue) {
        return input.replace(new RegExp(this.regexEscape(searchValue), 'g'), replaceValue);
    };
    return SvgCodeConverter;
}());
exports.SvgCodeConverter = SvgCodeConverter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9ndWxwcy9ndWxwLXN2Zy1jb2RlL3N2Zy1jb2RlLWNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTtJQUFBO0lBNElBLENBQUM7SUF4SVUsdUNBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sd0NBQWEsR0FBckIsVUFBc0IsSUFBWTtRQUM5QixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyx1Q0FBWSxHQUFwQixVQUFxQixJQUFZO1FBQzdCLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLGlDQUFNLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0IsR0FBRyxJQUFJLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSxtQ0FBUSxHQUFmLFVBQWdCLFVBQW9DLEVBQUUsVUFBa0I7UUFDcEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBRXJFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FB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QVcsRUFBRSxDQUFDO1lBQzdGLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QixDQUFDO1lBQ0wsQ0FBQztZQUVELE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1RDtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLHNDQUFXLEdBQW5CLFVBQW9CLEdBQVc7UUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVPLHFDQUFVLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxXQUFtQixFQUFFLFlBQW9CO1FBQ3ZFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0E1SUEsQUE0SUMsSUFBQTtBQTVJWSw0Q0FBZ0IiLCJmaWxlIjoiZ3VscHMvZ3VscC1zdmctY29kZS9zdmctY29kZS1jb252ZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
