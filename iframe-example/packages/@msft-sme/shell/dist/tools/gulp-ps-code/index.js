'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var gutil = require("gulp-util");
var Path = require("path");
var through2 = require("through2");
var Vinyl = require("vinyl");
var PsCode = require("./ps-code-convert");
var ps_code_convert_1 = require("./ps-code-convert");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-ps-code';
/**
 * Plugin level function
 */
function gulpPsCode(options) {
    //
    // (Options):
    //
    // name of PowerShell module. (required)
    //  powerShellModuleName: string
    //
    // name of generated file.
    //   name: string; default is 'powershell-script.ts'
    //
    // base path of powershell files.
    //   basePath: string; default is 'src/resources/scripts'
    //
    // generated path of powershell files.
    //   generatedPath: string; default is 'src/generated/scripts'
    //
    // remove comments at default.
    //   noComments: boolean;
    //
    // validate content of PowerShell script.
    //   - non-ascii code, no comments, unsupported script file name and unofficial verb
    //   validate: boolean;
    //
    // JEA data object format.
    //  jea: boolean
    //
    // override options settings if not specified.
    options = Object.assign({
        name: 'powershell-scripts.ts',
        basePath: 'src\\resources\\scripts',
        generatedPath: 'src\\generated\\scripts',
        noComments: true,
        validate: true,
        jea: true
    }, options || {});
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
    var groups = {};
    var collection = {};
    var lastFile = null;
    return through2.obj(function (file, enc, cb) {
        var error = null;
        try {
            if (!options.powerShellModuleName) {
                throw new Error('gulp-ps-code requires powerShellModuleName option.');
            }
            var path = Path.parse(file.path);
            if (path.ext === '.ps1') {
                var relPath = file.path.substr(file.cwd.length + 1);
                relPath = relPath.substr(0, relPath.length - path.base.length - 1);
                var groupName = ps_code_convert_1.PsCodeConverter.defaultGroup;
                if (relPath === options.generatedPath) {
                    groupName = ps_code_convert_1.PsCodeConverter.generatedGroup;
                }
                else {
                    if (relPath !== options.basePath && relPath.indexOf(options.basePath) === 0) {
                        groupName = relPath.substr(options.basePath.length + 1);
                    }
                }
                var group = groups[groupName];
                if (!group) {
                    group = {};
                    groups[groupName] = group;
                }
                if (collection[path.base]) {
                    throw new Error('gulp-ps-code requires unique name of ps file, conflicted with ' + path.base);
                }
                collection[path.base] = true;
                var data = file.contents.toString('utf8');
                if (options.validate) {
                    // validate non-ascii code presence.
                    var lines = data.split('\n');
                    var errorCode = false;
                    for (var i = 0; i < lines.length; i++) {
                        var line = lines[i];
                        for (var j = 0; j < line.length; j++) {
                            var code = line.charCodeAt(j);
                            if (code > 0x7f) {
                                var point = '';
                                if (j > 0) {
                                    for (var k = 1; k <= j; k++) {
                                        point += ' ';
                                    }
                                }
                                console.error("File: " + path.base + ", Line: " + (i + 1) + ", Position: " + (j + 1) + ", Char: '" + line.charAt(j) + "', Code: " + code);
                                console.error(line);
                                console.error(point + '^----<see>');
                                errorCode = true;
                            }
                        }
                    }
                    if (errorCode) {
                        throw new Error('File contained non ascii code: ' + path.base);
                    }
                    // validate script file name.
                    var segments_1 = path.base.split('-');
                    if (segments_1.length !== 2) {
                        console.error('File doesn\'t follow <Verb>-<Name>.ps1 format to support JEA: ' + path.base);
                    }
                    else {
                        // validate script verb.
                        var found = ps_code_convert_1.PsCodeConverter.verbs.find(function (x) { return x === segments_1[0]; });
                        if (!found) {
                            console.error('File doesn\'t follow official verb name to support JEA: ' + path.base);
                            console.error('Try Get-Verb PowerShell command to find official verbs.');
                            console.error('https://msdn.microsoft.com/en-us/library/ms714428(v=vs.85).aspx');
                        }
                        else {
                            // validate comments for JEA.
                            var commentIndex = data.indexOf('{');
                            var comments = commentIndex < 0 ? data : data.substr(0, commentIndex);
                            var commentsMinimum = comments.indexOf('<#') >= 0
                                && comments.indexOf('#>') > 0
                                && comments.indexOf('.SYNOPSIS') > 0
                                && comments.indexOf('.DESCRIPTION') > 0
                                && comments.indexOf('.ROLE') > 0
                                && comments.indexOf('.COMPONENT') > 0;
                            if (!commentsMinimum) {
                                console.error('File doesn\'t contain formal PowerShell comment section to support JEA: ' + path.base);
                            }
                        }
                    }
                }
                group[path.base] = data;
                lastFile = file;
            }
        }
        catch (e) {
            error = (!e.plugin || (e.plugin !== PLUGIN_NAME)) ? extendError(new PluginError(PLUGIN_NAME, e.message), e) : e;
        }
        return cb(error);
    }, function (cb) {
        var converter = new PsCode.PsCodeConverter(options);
        converter.contentReset();
        converter.generate(groups);
        var tsFile = new Vinyl({
            cwd: lastFile.cwd,
            base: lastFile.base,
            path: lastFile.base + '/' + options.name,
            contents: new Buffer(converter.content, 'utf8')
        });
        // tslint:disable-next-line:no-invalid-this
        this.push(tsFile);
        cb();
    });
}
module.exports = gulpPsCode;
//# sourceMappingURL=index.js.map