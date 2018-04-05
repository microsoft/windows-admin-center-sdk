'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require("child_process");
var gutil = require("gulp-util");
var npm = require("npm");
var semver = require("semver");
var util = require("../util/util");
var PLUGIN_NAME = 'gulp-sme-npm';
var pkgVersionRegex = '^\\d{1,2}(.\\d{1,2}){2}';
var pkgPreReleaseRegex = '(-([a-zA-z\\d\\.\\+])*){0,1}';
function readPackage() {
    var pkg = util.readJSON('package.json');
    if (!pkg || !pkg.version || !semver.valid(pkg.version)) {
        throw new Error('Invalid package');
    }
    return pkg;
}
exports.readPackage = readPackage;
function writePackage(pkg) {
    util.writeJSON('package.json', pkg);
}
exports.writePackage = writePackage;
function update(done) {
    child_process.exec('npm update', function (error, stdout, stderr) {
        if (done) {
            done(error);
        }
    });
}
exports.update = update;
function getTags(name, cb) {
    npm.load({ name: name, loglevel: 'silent' }, function (loadErr) {
        if (loadErr) {
            cb(loadErr);
        }
        {
            npm.commands.distTags(['ls', name], function (tagErr, data) {
                if (tagErr) {
                    if (tagErr.code !== 'E404') {
                        cb(tagErr);
                        return;
                    }
                    // No package has ever been published in the E404 case.
                    data = {};
                }
                cb(null, data);
            });
        }
    });
}
exports.getTags = getTags;
function getLatestVersion(name, cb) {
    npm.load({ name: name, loglevel: 'silent' }, function (loadErr) {
        if (loadErr) {
            cb(loadErr);
        }
        npm.commands.show([name, 'versions'], true, function (showErr, data) {
            if (showErr) {
                if (showErr.code === 'E404') {
                    // No package has ever been published.
                    cb(null, '0.0.0');
                }
                else {
                    cb(showErr);
                }
                return;
            }
            var latestKeys = Object.keys(data);
            if (latestKeys.length > 0) {
                var versions = data[latestKeys[0]].versions;
                var latest = versions[versions.length - 1];
                cb(null, latest);
            }
            else {
                // there is no package tagged with latest, assume no package has been published yet.
                cb(null, '0.0.0');
            }
        });
    });
}
exports.getLatestVersion = getLatestVersion;
function confirmPublish(skip, options) {
    var tags = options.tags && options.tags.length > 0 ? options.tags.join(', ') : '<none>';
    if (!skip) {
        var message = "\n        Publishing cannot be undone.\n\n        You are attempting to publish version: " + options.version + ". \n        with the tags: " + tags + "\n        \n        ARE YOU SURE YOU WANT TO PROCEED?\n\n        ";
        if (!util.confirm(message, 'PUBLISH CANCELED')) {
            util.log(gutil.colors.red('returning due to user cancellation'));
            return false;
        }
    }
    else {
        var message = "\n        SKIPPING CONFIRMATION. \n        \n        Attempting to publish version: " + options.version + ". \n        with the tags: " + tags + "\n        \n        ";
        util.log(gutil.colors.yellow(message));
    }
    return true;
}
function addTags(name, options, cb) {
    // in order to avoid any potential for collisions, we will apply the tags one at a time.
    var index = 0;
    var next = function () {
        if (index >= options.tags.length) {
            util.log(gutil.colors.green("All tags successfully applied to " + name + "@" + options.version));
            cb();
            return;
        }
        var tag = options.tags[index];
        var command = "npm dist-tag add " + name + "@" + options.version + " --tag " + tag;
        child_process.exec(command, function (error, stdout, stderr) {
            util.log(util.format('npm dist-tag stdout: {0}', stdout));
            util.log(util.format('npm dist-tag stderr: {0}', stderr));
            if (error) {
                util.log(gutil.colors.red("Failed to apply '" + tag + "' tag"));
                cb(util.toGulpError(PLUGIN_NAME, error));
                return;
            }
            index++;
            util.log(gutil.colors.cyan("'" + tag + "' tag applied successfully"));
            next();
        });
    };
    util.log("Applying tags to " + name + "@" + options.version);
    next();
}
exports.addTags = addTags;
function publish(confirm, options, callback) {
    var pkg = readPackage();
    // save the old version and private flags
    var isPrivate = pkg.private;
    var oldVersion = pkg.version;
    // Make sure the user knows what is happening here.
    if (!confirmPublish(!confirm, options)) {
        callback();
        return;
    }
    // update the pkg to the new version and remove the private flag
    pkg.version = options.version;
    if (isPrivate) {
        util.log('deleting private field from package');
        delete pkg.private;
    }
    // only modify the package file if the data has actually changed
    var changed = pkg.version !== oldVersion || isPrivate !== pkg.private;
    if (changed) {
        util.log('Package has been changed');
        util.log("Updating package version to: " + pkg.version);
        if (isPrivate) {
            util.log("Removing private flag from package");
        }
        // save the package file to disk 
        writePackage(pkg);
    }
    // publish the package
    child_process.exec('npm publish', function (error, stdout, stderr) {
        util.log(util.format('npm publish stdout: {0}', stdout));
        util.log(util.format('npm publish stderr: {0}', stderr));
        if (error) {
            util.log(gutil.colors.red("Failed to publish version " + pkg.version + ". Reverting package to version " + oldVersion + ". " + error));
            pkg.version = oldVersion;
        }
        if (isPrivate) {
            util.log(util.format('Restoring private flag to package. '));
            pkg.private = true;
        }
        if ((error || isPrivate) && changed) {
            writePackage(pkg);
        }
        var onDone = function (doneError) {
            if (callback) {
                callback(doneError);
            }
            else if (doneError) {
                util.log(gutil.colors.red(error.name));
                util.log(gutil.colors.red(error.message));
                util.log(gutil.colors.red(error.stack));
                throw error;
            }
        };
        if (!error) {
            util.log(gutil.colors.green('Publish successful'));
            // if there are tags, make sure they are applied at this time.
            if (options.tags && options.tags.length > 0) {
                addTags(pkg.name, options, onDone);
                return;
            }
        }
        onDone(error);
    });
}
exports.publish = publish;
function validateDependencies(pkg, prod, callback) {
    // get a list of local 'file:' dependencies
    var localReferences = [];
    [pkg.dependencies, pkg.devDependencies, pkg.peerDependencies, pkg.optionalDependencies].forEach(function (deps, i) {
        if (deps) {
            var depType_1 = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'][i];
            Object.keys(deps).forEach(function (name) {
                if (deps[name].toLowerCase().startsWith('file:')) {
                    localReferences.push({ name: name, version: deps[name], type: depType_1 });
                }
            });
        }
    });
    if (!prod) {
        if (localReferences.length > 0) {
            // warn about local file dependencies
            localReferences.forEach(function (ref) {
                var message = 'WARNING: Local package reference detected. This will fail production builds: {0} - {1}: {2}';
                gutil.log(gutil.colors.yellow(util.format(message, ref.type, ref.name, ref.version)));
            });
        }
        gutil.log(gutil.colors.green(util.format('package.json version {0} successfully verified.', pkg.version)));
        callback();
        return;
    }
    if (localReferences.length > 0) {
        // prevent local file dependencies in prod mode
        var error = util.format('Local dependency references not allowed in production: \n{0}', localReferences
            .map(function (ref) { return util.format('package.json => {0} => {1}: {2}', ref.type, ref.name, ref.version); })
            .join('\n'));
        callback(util.toGulpError(PLUGIN_NAME, error));
        return;
    }
    gutil.log(gutil.colors.green(util.format('package.json version {0} successfully validated.', pkg.version)));
    callback();
}
exports.validateDependencies = validateDependencies;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLE1BQU0sQ0FDbkIsOERBQThELEVBQzlELGVBQWU7YUFDVixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQS9FLENBQStFLENBQUM7YUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNsQixDQUFDO1FBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrREFBa0QsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVHLFFBQVEsRUFBRSxDQUFDO0FBQ2YsQ0FBQztBQXpDRCxvREF5Q0MiLCJmaWxlIjoibnBtL25wbS5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9
