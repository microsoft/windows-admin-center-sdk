/* tslint:disable */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Through = require("through2");
var gutil = require("gulp-util");
var Path = require("path");
var Resjson = require("./resjson-convert");
var Vinyl = require("vinyl");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-resjson';
module.exports = function (options) {
    //
    // (Options):
    //
    // enable to produce xxxx.d.ts file.
    //   definition: string; { null, 'module' }
    //
    // enable to produce xxxx.ts file.
    //   typescript: string; { null, 'module', 'interface' }
    //
    // enable to produce xxxx.json file.
    //   json: boolean;
    //
    // if set a space charactors, it adds formating of JSON.
    // it set null, space will be eliminated.
    //   jsonSpace: string | number;
    //
    // override options settings if not specified.
    options = Object.assign({ definition: null, typescript: null, json: false, jsonSpace: null }, options || {});
    /**
     * @this {Transform}
     */
    var transform = function (file, encoding, callback) {
        if (file.isNull()) {
            // nothing to do
            return callback(null, file);
        }
        if (file.isStream()) {
            // file.contents is a Stream - https://nodejs.org/api/stream.html
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
            return callback(null, file);
        }
        else if (file.isBuffer()) {
            var data = file.contents.toString('utf8');
            var converter = new Resjson.ResJsonConverter(options);
            converter.convert(data);
            var path = Path.parse(file.path);
            if (options.definition) {
                var dtFile = new Vinyl({
                    cwd: '/',
                    base: path.dir,
                    path: path.dir + '/' + path.name + '.d.ts',
                    contents: new Buffer(converter.outputDt)
                });
                this.push(dtFile);
            }
            if (options.typescript) {
                var content = options.typescript === 'interface' ? converter.outputInterface : converter.outputTs;
                var tsFile = new Vinyl({
                    cwd: '/',
                    base: path.dir,
                    path: path.dir + '/' + path.name + '.ts',
                    contents: new Buffer(content)
                });
                this.push(tsFile);
            }
            if (options.json) {
                var base = options.srcRoot || path.dir;
                var content = JSON.stringify(converter.outputJson, null, options.jsonSpace);
                var jsonFile = new Vinyl({
                    cwd: '/',
                    base: base,
                    path: path.dir + '\\' + path.name + '.json',
                    contents: new Buffer(content)
                });
                this.push(jsonFile);
            }
        }
        callback();
    };
    return Through.obj(transform);
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9ndWxwcy9ndWxwLXJlc2pzb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLFlBQVksQ0FBQzs7QUFDYixrQ0FBcUM7QUFDckMsaUNBQW9DO0FBQ3BDLDJCQUE4QjtBQUM5QiwyQ0FBOEM7QUFDOUMsNkJBQWdDO0FBRWhDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDcEMsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDO0FBRWpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxPQUFPO0lBQzlCLEVBQUU7SUFDRixhQUFhO0lBQ2IsRUFBRTtJQUNGLG9DQUFvQztJQUNwQywyQ0FBMkM7SUFDM0MsRUFBRTtJQUNGLGtDQUFrQztJQUNsQyx3REFBd0Q7SUFDeEQsRUFBRTtJQUNGLG9DQUFvQztJQUNwQyxtQkFBbUI7SUFDbkIsRUFBRTtJQUNGLHdEQUF3RDtJQUN4RCx5Q0FBeUM7SUFDekMsZ0NBQWdDO0lBQ2hDLEVBQUU7SUFFRiw4Q0FBOEM7SUFDOUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTdHOztPQUVHO0lBQ0gsSUFBSSxTQUFTLEdBQUcsVUFBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVE7UUFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQixnQkFBZ0I7WUFDaEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsaUVBQWlFO1lBQ2pF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
