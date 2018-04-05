'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var gutil = require("gulp-util");
var Path = require("path");
var through2 = require("through2");
var Vinyl = require("vinyl");
var Resjson = require("./resjson-convert");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-resjson';
function gulpResjson(options) {
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
    function extendError(pError, error) {
        if (error && (typeof error === 'object')) {
            ['name', 'errno'].forEach(function (property) {
                if (property in error) {
                    // tslint:disable-next-line:no-invalid-this
                    this[property] = error[property];
                }
            }, pError);
        }
        return pError;
    }
    return through2.obj(
    /**
     * @this {Transform}
     */
    function (file, encoding, callback) {
        var error = null;
        try {
            if (file.isNull()) {
                // nothing to do
                return callback(null, file);
            }
            if (file.isStream()) {
                // file.contents is a Stream - https://nodejs.org/api/stream.html
                // tslint:disable-next-line:no-invalid-this
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
                        contents: new buffer_1.Buffer(converter.contentDefinition, 'utf8')
                    });
                    // tslint:disable-next-line:no-invalid-this
                    this.push(dtFile);
                }
                if (options.typescript) {
                    var content = options.typescript === 'interface' ? converter.contentInterface : converter.contentTypescript;
                    var tsFile = new Vinyl({
                        cwd: '/',
                        base: path.dir,
                        path: path.dir + '/' + path.name + '.ts',
                        contents: new buffer_1.Buffer(content, 'utf8')
                    });
                    // tslint:disable-next-line:no-invalid-this
                    this.push(tsFile);
                }
                if (options.json) {
                    var base = options.srcRoot || path.dir;
                    var content = JSON.stringify(converter.outputJson, null, options.jsonSpace);
                    var jsonFile = new Vinyl({
                        cwd: '/',
                        base: base,
                        path: path.dir + '\\' + path.name + '.json',
                        contents: new buffer_1.Buffer(content, 'utf8')
                    });
                    // tslint:disable-next-line:no-invalid-this
                    this.push(jsonFile);
                }
            }
        }
        catch (e) {
            error = (!e.plugin || (e.plugin !== PLUGIN_NAME)) ? extendError(new PluginError(PLUGIN_NAME, e.message), e) : e;
        }
        callback(error);
    });
}
;
module.exports = gulpResjson;
//# sourceMappingURL=index.js.map