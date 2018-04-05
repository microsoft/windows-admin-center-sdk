/* tslint:disable */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var through2 = require("through2");
var gutil = require("gulp-util");
var Path = require("path");
var Vinyl = require("vinyl");
var SvgCode = require("./svg-code-convert");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-svg-code';
/**
 * Plugin level function
 */
function gulpSvgCode() {
    function extendError(pError, error) {
        if (error && (typeof error === 'object')) {
            ['name', 'errno'].forEach(function (property) {
                if (property in error) {
                    this[property] = error[property];
                }
            }, pError);
        }
        return pError;
    }
    var pathPrefix = null;
    var collection = {};
    return through2.obj(function (file, enc, cb) {
        var error = null;
        try {
            var path = Path.parse(file.path);
            if (path.ext === '.svg') {
                if (pathPrefix === null) {
                    pathPrefix = path.dir;
                }
                else {
                    var segments = path.dir.split('\\');
                    var segPrefix = pathPrefix.split('\\');
                    var newPrefix = [];
                    for (var i = 0; i < segPrefix.length; i++) {
                        if (segments[i].toLocaleUpperCase() !== segPrefix[i].toLocaleUpperCase()) {
                            pathPrefix = newPrefix.join('\\');
                            break;
                        }
                        newPrefix.push(segments[i]);
                    }
                }
                var data = file.contents.toString('utf8');
                collection[file.path] = data;
            }
        }
        catch (e) {
            error = (!e.plugin || (e.plugin !== PLUGIN_NAME)) ? extendError(new PluginError(PLUGIN_NAME, e.message), e) : e;
        }
        return cb(error);
    }, function (cb) {
        console.log(pathPrefix);
        var converter = new SvgCode.SvgCodeConverter();
        converter.contentReset();
        converter.generate(collection, pathPrefix);
        var cssFile = new Vinyl({
            cwd: '/',
            base: pathPrefix,
            path: pathPrefix + '\\svg.css',
            contents: new Buffer(converter.outputCss)
        });
        this.push(cssFile);
        console.log(cssFile.path);
        var tsFile = new Vinyl({
            cwd: '/',
            base: pathPrefix,
            path: pathPrefix + '\\svg.ts',
            contents: new Buffer(converter.outputTs)
        });
        this.push(tsFile);
        console.log(tsFile.path);
        cb();
    });
}
module.exports = gulpSvgCode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9ndWxwcy9ndWxwLXN2Zy1jb2RlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQixZQUFZLENBQUM7O0FBRWIsbUNBQXNDO0FBQ3RDLGlDQUFvQztBQUNwQywyQkFBOEI7QUFDOUIsNkJBQWdDO0FBQ2hDLDRDQUErQztBQUUvQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQ3BDLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQztBQUVsQzs7R0FFRztBQUNIO0lBQ0MscUJBQXFCLE1BQU0sRUFBRSxLQUFLO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQ3hCLFVBQVUsUUFBUTtnQkFDakIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7WUFDRixDQUFDLEVBQ0QsTUFBTSxDQUFDLENBQUM7UUFDVixDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDdEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNsQixVQUFVLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDO1lBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztvQkFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzNDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDMUUsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xDLEtBQUssQ0FBQzt3QkFDUCxDQUFDO3dCQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0YsQ0FBQztnQkFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDOUIsQ0FBQztRQUNGLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pILENBQUM7UUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLENBQUMsRUFDRCxVQUFVLEVBQUU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDL0MsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTNDLElBQUksT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDO1lBQ3ZCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsSUFBSSxFQUFFLFVBQVUsR0FBRyxXQUFXO1lBQzlCLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUM7WUFDdEIsR0FBRyxFQUFFLEdBQUc7WUFDUixJQUFJLEVBQUUsVUFBVTtZQUNoQixJQUFJLEVBQUUsVUFBVSxHQUFHLFVBQVU7WUFDN0IsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDeEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixFQUFFLEVBQUUsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6Imd1bHBzL2d1bHAtc3ZnLWNvZGUvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
