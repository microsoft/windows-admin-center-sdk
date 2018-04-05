'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var gutil = require("gulp-util");
var fsPath = require("path");
var readlineSync = require("readline-sync");
function log(message) {
    gutil.log(message);
}
exports.log = log;
function read(path, encoding) {
    if (encoding === void 0) { encoding = 'utf8'; }
    return fs.readFileSync(path, 'utf8');
}
exports.read = read;
function readJSON(path) {
    return JSON.parse(read(path));
}
exports.readJSON = readJSON;
function write(path, contents) {
    fs.writeFileSync(path, contents);
}
exports.write = write;
function writeJSON(path, json) {
    write(path, JSON.stringify(json, null, 4));
}
exports.writeJSON = writeJSON;
function writeJsonNoSpace(path, json) {
    write(path, JSON.stringify(json));
}
exports.writeJsonNoSpace = writeJsonNoSpace;
function toGulpError(pError, error) {
    if (isString(error)) {
        error = new Error(error);
    }
    if (isString(pError)) {
        pError = new gutil.PluginError(pError, error.message);
    }
    pError['name'] = error['name'];
    pError['errno'] = error['errno'];
    return pError;
}
exports.toGulpError = toGulpError;
function noop() { }
exports.noop = noop;
function isObject(value) {
    return value !== null && typeof value === 'object';
}
exports.isObject = isObject;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function extend(dest, sources) {
    if (!sources || sources.length === 0) {
        return dest;
    }
    for (var i = 0; i < sources.length; i++) {
        var src = sources[i];
        // Cant extend primitives or null/undefined values. so skip them
        if (!isObject(src) && !isFunction(src)) {
            continue;
        }
        var keys = Object.keys(src);
        var ki = keys.length;
        while (ki--) {
            var srcField = keys[ki];
            var srcValue = src[srcField];
            var destValue = srcValue;
            if (isObject(srcValue) && !Array.isArray(srcValue)) {
                destValue = {};
                extend(destValue, [dest[srcField], srcValue]);
            }
            dest[srcField] = destValue;
        }
    }
    return dest;
}
exports.extend = extend;
function confirm(message, canceledMessage, exit) {
    if (canceledMessage === void 0) { canceledMessage = 'CANCELED'; }
    if (exit === void 0) { exit = true; }
    if (readlineSync.keyInYN(message)) {
        return true;
    }
    log(gutil.colors.yellow(canceledMessage));
    if (exit) {
        process.exit(1);
    }
    return false;
}
exports.confirm = confirm;
var namedFormatSpecifierRegex = /\{[a-zA-Z$_\d]*\}/g;
var numberedFormatSpecifierRegex = /\{(\d+)\}/g;
function format(value) {
    var restArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restArgs[_i - 1] = arguments[_i];
    }
    var matched = false;
    var retVal;
    var isFormatObject = restArgs.length === 1
        && restArgs[0]
        && typeof restArgs[0] === 'object';
    var isFormatObjectWithTokenFormatter = restArgs.length === 2
        && restArgs[0]
        && typeof restArgs[0] === 'object'
        && (typeof restArgs[1] === 'function' || restArgs[1] === null);
    var tokenFormatter = isFormatObjectWithTokenFormatter ? restArgs[1] : null;
    if (isFormatObject || isFormatObjectWithTokenFormatter) {
        var actualArg_1 = restArgs[0];
        retVal = value.replace(namedFormatSpecifierRegex, function (match) {
            var name = match.substring(1, match.length - 1);
            if (actualArg_1.hasOwnProperty(name)) {
                matched = true;
                var tokenValue = actualArg_1[name];
                return tokenFormatter ? tokenFormatter(tokenValue) : tokenValue;
            }
            else {
                return match;
            }
        });
    }
    // we get here in two cases:
    //    1. we don't have a format object
    //    2. we do have a format object but it's properties didn't match any of the named parameters.
    //       this often happens when developers write code like:
    //          try {
    //              ...
    //          } catch(err) {
    //              log('abc: {0}'.format(err));
    //          }
    //       in this scenario also we want to match by number.
    //
    if (!matched) {
        retVal = value.replace(numberedFormatSpecifierRegex, function (match, num) {
            if (num < restArgs.length) {
                var tokenValue = restArgs[num];
                return tokenFormatter ? tokenFormatter(tokenValue) : tokenValue;
            }
            else {
                return match;
            }
        });
    }
    return retVal;
}
exports.format = format;
function pad(value, length, padChar) {
    if (padChar === void 0) { padChar = '0'; }
    value = value.toString();
    if (value.length >= length) {
        return value;
    }
    var pad2 = '';
    while ((value.length + pad2.length) < length) {
        pad2 += padChar;
    }
    return pad2 + value;
}
exports.pad = pad;
function getFilePaths(dir, paths) {
    if (paths === void 0) { paths = []; }
    if (!dir.endsWith('/')) {
        dir += '/';
    }
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = dir + file;
        if (fs.statSync(filePath).isDirectory()) {
            paths.concat(getFilePaths(filePath, paths));
        }
        else {
            paths.push(dir + file);
        }
    });
    return paths;
}
exports.getFilePaths = getFilePaths;
;
function getSubFolders(dir) {
    var folders = [];
    if (!dir.endsWith('/')) {
        dir += '/';
    }
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = dir + file;
        if (fs.statSync(filePath).isDirectory()) {
            folders.push(filePath);
        }
    });
    return folders;
}
exports.getSubFolders = getSubFolders;
;
function ensurePathExists(filePath) {
    var dirname = fsPath.dirname(filePath);
    if (exists(dirname)) {
        return true;
    }
    ensurePathExists(dirname);
    fs.mkdirSync(dirname);
}
exports.ensurePathExists = ensurePathExists;
function exists(path) {
    try {
        fs.accessSync(path);
        return true;
    }
    catch (e) {
        // if not accessible, then return false
        if (e.code === 'ENOENT') {
            return false;
        }
        // re-throw if some other error occurs
        throw e;
    }
}
exports.exists = exists;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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bEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBUEQsNENBT0M7QUFFRCxnQkFBdUIsSUFBSTtJQUN2QixJQUFJLENBQUM7UUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCx1Q0FBdUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELHNDQUFzQztRQUN0QyxNQUFNLENBQUMsQ0FBQztJQUNaLENBQUM7QUFDTCxDQUFDO0FBWkQsd0JBWUMiLCJmaWxlIjoidXRpbC91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
