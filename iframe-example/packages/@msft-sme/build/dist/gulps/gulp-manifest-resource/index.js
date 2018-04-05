/* tslint:disable */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var gutil = require("gulp-util");
var through2 = require("through2");
var fs = require("fs");
var Vinyl = require("vinyl");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-manifest-resource';
function gulpManifestResources(options) {
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
        for (var name in object) {
            var index = name.indexOf(resourceManifest);
            if (index === 0) {
                var value = object[name];
                var resourceId_1 = name.substr(resourceManifest.length);
                // console.log(locale + '.' + resourceId + ': ' + value);
                resources[locale][resourceId_1] = value;
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
                contents: new Buffer(JSON.stringify(manifestObject, null, 2))
            });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9ndWxwcy9ndWxwLW1hbmlmZXN0LXJlc291cmNlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQixZQUFZLENBQUM7O0FBQ2IsaUNBQW9DO0FBQ3BDLG1DQUFzQztBQUN0Qyx1QkFBMEI7QUFDMUIsNkJBQWdDO0FBRWhDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDcEMsSUFBSSxXQUFXLEdBQUcsd0JBQXdCLENBQUM7QUFFM0MsK0JBQStCLE9BQU87SUFDckMscUJBQXFCLE1BQU0sRUFBRSxLQUFLO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFRO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztZQUNGLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNaLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVFLEVBQUU7SUFDRixhQUFhO0lBQ2IsRUFBRTtJQUNGLGlCQUFpQjtJQUNqQiwwQkFBMEI7SUFDMUIsRUFBRTtJQUNGLHlCQUF5QjtJQUN6QixzQkFBc0I7SUFDdEIsRUFBRTtJQUVGLDhDQUE4QztJQUM5QyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDbkI7UUFDSSxRQUFRLEVBQUUsbUJBQW1CO0tBQ2hDLEVBQ0QsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRW5CLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDM0QsSUFBSSxTQUFTLEdB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Q0FBQyxNQUFNLENBQUM7aUJBQzdCLENBQUMsQ0FBQzthQUNOO1lBRUQsY0FBYyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztZQUM5QyxJQUFJLFlBQVksR0FBRyxJQUFJLEtBQUssQ0FBQztnQkFDekIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2dCQUN0QixRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hFLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxRQUFRLEVBQUUsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0FBRVgsQ0FBQztBQUFBLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDIiwiZmlsZSI6Imd1bHBzL2d1bHAtbWFuaWZlc3QtcmVzb3VyY2UvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
