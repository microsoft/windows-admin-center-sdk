/* tslint:disable */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var through2 = require("through2");
var gutil = require("gulp-util");
var Path = require("path");
var Vinyl = require("vinyl");
var PsCode = require("./ps-code-convert");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-ps-code';
/**
 * Plugin level function
 */
function gulpPsCode() {
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
    var collection = {};
    var lastFile = null;
    return through2.obj(function (file, enc, cb) {
        var error = null;
        try {
            var path = Path.parse(file.path);
            if (path.ext === '.ps1') {
                if (collection[path.base]) {
                    throw new Error('gulp-ps-code requires unique name of ps file, conflicted with ' + path.base);
                }
                var data = file.contents.toString('utf8');
                collection[path.base] = data;
                lastFile = file;
            }
        }
        catch (e) {
            error = (!e.plugin || (e.plugin !== PLUGIN_NAME)) ? extendError(new PluginError(PLUGIN_NAME, e.message), e) : e;
        }
        return cb(error);
    }, function (cb) {
        var converter = new PsCode.PsCodeConverter();
        converter.contentReset();
        converter.generate(collection);
        var tsFile = new Vinyl({
            cwd: lastFile.cwd,
            base: lastFile.base,
            path: lastFile.base + '/powershell-scripts.ts',
            contents: new Buffer(converter.outputTs)
        });
        this.push(tsFile);
        console.log(tsFile.path);
        cb();
    });
}
module.exports = gulpPsCode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9ndWxwcy9ndWxwLXBzLWNvZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLFlBQVksQ0FBQzs7QUFFYixtQ0FBc0M7QUFDdEMsaUNBQW9DO0FBQ3BDLDJCQUE4QjtBQUM5Qiw2QkFBZ0M7QUFDaEMsMENBQTZDO0FBRTdDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDcEMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDO0FBRWpDOztHQUVHO0FBQ0g7SUFDQyxxQkFBcUIsTUFBTSxFQUFFLEtBQUs7UUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLFFBQVE7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO1lBQ0YsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ1osQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUNwQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDbEIsVUFBVSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQztZQUNKLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0VBQWdFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvRixDQUFDO2dCQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDN0IsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNqQixDQUFDO1FBQ0YsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakgsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxFQUNELFVBQVUsRUFBRTtRQUNYLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QixTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRS9CLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDO1lBQ3RCLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRztZQUNqQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsd0JBQXdCO1lBQzlDLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsRUFBRSxFQUFFLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyIsImZpbGUiOiJndWxwcy9ndWxwLXBzLWNvZGUvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
