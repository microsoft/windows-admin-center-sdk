/* tslint:disable */
/**
 * Reason:
 * the 'this' statement in the classify method causes
 * "the "this" keyword is disallowed outside of a class body"
 * Not sure how to avoid the use of 'this' here.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var through2 = require("through2");
var path = require("path");
var Vinyl = require("vinyl");
// local imports
var util = require("../util/util");
var baseGenerator_1 = require("./generators/baseGenerator");
var classify_1 = require("./classify");
var PLUGIN_NAME = 'gulp-sme-classify';
var PLUGIN_VERSION = require('../../package.json').version;
baseGenerator_1.BaseGenerator.pluginName = PLUGIN_NAME;
baseGenerator_1.BaseGenerator.pluginVersion = PLUGIN_VERSION;
function defaultPathTransform(filePath, file) {
    var lastdot = filePath.lastIndexOf('.');
    if (lastdot > -1) {
        // remove the extension from the file path.
        filePath = filePath.slice(0, lastdot);
    }
    // replace '.' and '-' with '_' (add any other characters here too)
    filePath = classify_1.regexReplaceAll(filePath, '.', '_');
    filePath = classify_1.regexReplaceAll(filePath, '-', '_');
    // finally split the path into modules
    var modules = filePath.split('\\');
    return modules;
}
function resolveOptions(options) {
    options.rootClass = options.rootClass || 'Classify';
    options.outFileName = options.outFileName || options.rootClass.charAt(0).toLowerCase() + options.rootClass.slice(1);
    options.generators = options.generators || [];
    options.processors = options.processors || [];
    options.pathTransformRoot = options.pathTransformRoot || './';
    options.pathTransform = options.pathTransform || defaultPathTransform;
    return options;
}
function classify(options) {
    options = resolveOptions(options);
    var collection = {};
    options.generators.forEach(function (g) { return collection[g.targetType] = {}; });
    return through2.obj(function (file, enc, cb) {
        var error = null;
        try {
            // get the file path relative to the root path
            var relative = path.relative(options.pathTransformRoot, file.path);
            //if the relative path contains '../' then it is outside of the pathTransformRoot and we should re-evaluate from the root path
            if (relative.indexOf('..\\') > -1) {
                relative = path.relative('./', file.path);
            }
            // derive the module names from the relative path and file contents
            var modules_1 = options.pathTransform(relative, file.contents);
            var processedCount_1 = options.generators.length;
            var processingComplete_1 = function (err) {
                if (err) {
                    processedCount_1 = 0;
                    cb(err);
                }
                if (--processedCount_1 === 0) {
                    cb();
                }
            };
            options.generators.forEach(function (generator) {
                // loop through modules and build up our collection 
                var current = collection[generator.targetType];
                modules_1.forEach(function (m, i) {
                    // create a new object until we reach teh last item. Set that items value to the content string
                    if (i === modules_1.length - 1) {
                        //get the files inputType
                        var ext_1 = path.extname(file.relative).substring(1);
                        //find a processor for this file
                        var processor_1 = options.processors.find(function (p) { return p.supportedTargets.some(function (t) { return t === generator.targetType; }) && p.inputType === ext_1; });
                        if (!processor_1) {
                            var message = util.format('No processor found that can handle generating a .{0} file from .{1} files.', generator.targetType, ext_1);
                            throw util.toGulpError(PLUGIN_NAME, message);
                        }
                        //maintain a reference to the current map position
                        var currentRef_1 = current;
                        //process the file contents
                        processor_1.process(file, generator.targetType, function (err, content) {
                            if (!err) {
                                // finally escape the processed string
                                currentRef_1[m] = processor_1.escape(content, generator.targetType);
                            }
                            // callback to complete this file
                            processingComplete_1(err);
                        });
                        return;
                    }
                    if (!current[m]) {
                        current[m] = {};
                    }
                    current = current[m];
                });
            });
        }
        catch (e) {
            cb(util.toGulpError(PLUGIN_NAME, e));
        }
    }, function (cb) {
        var flush = this;
        var fileCount = options.generators.length;
        if (fileCount === 0) {
            cb();
            return;
        }
        var generated = function (err, file) {
            if (err) {
                throw util.toGulpError(PLUGIN_NAME, err);
            }
            if (file) {
                flush.push(file);
            }
            if (--fileCount === 0) {
                cb();
            }
        };
        options.generators.forEach(function (g) {
            var targetCollection = collection[g.targetType];
            if (Object.keys(targetCollection).length === 0) {
                // dont generate a file if there are no files
                generated(null, null);
                return;
            }
            g.generate(targetCollection, options, function (err, contents) {
                if (err) {
                    generated(err);
                    return;
                }
                var file = new Vinyl({
                    path: util.format('{0}.{1}', options.outFileName, g.targetType),
                    contents: new Buffer(contents)
                });
                generated(null, file);
            });
        });
    });
}
module.exports = classify;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsNkNBQTZDO2dCQUM3QyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsUUFBUTtnQkFDaEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2YsTUFBTSxDQUFBO2dCQUNWLENBQUM7Z0JBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUM7b0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7b0JBQy9ELFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7aUJBQ2pDLENBQUMsQ0FBQztnQkFFSCxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJjbGFzc2lmeS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
