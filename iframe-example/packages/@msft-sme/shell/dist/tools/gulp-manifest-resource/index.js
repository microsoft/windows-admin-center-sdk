'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var fs = require("fs");
var gutil = require("gulp-util");
var through2 = require("through2");
var Vinyl = require("vinyl");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-manifest-resource';
function gulpManifestResources(options) {
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
    //
    // (Options):
    //
    // resource name.
    //   resourceName: string;
    //
    // path of manifest file.
    //   manifest: string;
    //
    // override options settings if not specified.
    options = Object.assign({
        manifest: 'src/manifest.json'
    }, options || {});
    var resourceManifest = options.resourceName + '_Manifest_';
    var resources = {};
    return through2.obj(
    /**
     * @this {Transform}
     */
    function (file, encoding, callback) {
        var locale = 'default';
        if (resources.default) {
            var pathSegments = file.history[0].split('\\');
            locale = pathSegments[pathSegments.length - 3];
        }
        resources[locale] = {};
        if (resources.default) {
            for (var resourceId in resources.default) {
                if (resources.default.hasOwnProperty(resourceId)) {
                    resources[locale][resourceId] = resources.default[resourceId];
                }
            }
        }
        var object = JSON.parse(file.contents.toString());
        for (var name_1 in object) {
            if (object.hasOwnProperty(name_1)) {
                var index = name_1.indexOf(resourceManifest);
                if (index === 0) {
                    var value = object[name_1];
                    var resourceId2 = name_1.substr(resourceManifest.length);
                    // console.log(locale + '.' + resourceId + ': ' + value);
                    resources[locale][resourceId2] = value;
                }
            }
        }
        return callback();
    }, 
    /**
     * @this {Flush}
     */
    function (callback) {
        try {
            var manifestObject = JSON.parse(fs.readFileSync(options.manifest, 'utf8'));
            var locales = [];
            for (var locale in resources) {
                if (resources.hasOwnProperty(locale) && locale !== 'default') {
                    locales.push(locale);
                }
            }
            locales.sort();
            locales.unshift('default');
            var formattedResources = [];
            for (var _i = 0, locales_1 = locales; _i < locales_1.length; _i++) {
                var locale = locales_1[_i];
                formattedResources.push({
                    locale: locale,
                    strings: resources[locale]
                });
            }
            manifestObject.resources = formattedResources;
            var manifestFile = new Vinyl({
                cwd: './',
                path: options.manifest,
                contents: new buffer_1.Buffer(JSON.stringify(manifestObject, null, 2), 'utf8')
            });
            // tslint:disable-next-line:no-invalid-this
            this.push(manifestFile);
        }
        catch (e) {
            var error = (!e.plugin || (e.plugin !== PLUGIN_NAME)) ? extendError(new PluginError(PLUGIN_NAME, e.message), e) : e;
            gutil.log(error);
        }
        callback();
    });
}
;
module.exports = gulpManifestResources;
//# sourceMappingURL=index.js.map