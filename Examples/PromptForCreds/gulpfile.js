"use strict";

const gulp = require('gulp');
const gutil = require('gulp-util');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const terminalReporter = require('jasmine-terminal-reporter');
const clean = require('gulp-clean');
const tslint = require('gulp-tslint');
const argv = require('yargs').argv;
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const inlineNg2Template = require('gulp-inline-ng2-template');
const childProcess = require('child_process');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const manifestResource = require('@microsoft/windows-admin-center-sdk/tools/gulp-manifest-resource');
const gulpResJson = require('@microsoft/windows-admin-center-sdk/tools/gulp-resjson');
const gulpMergeJsonInFolders = require('@microsoft/windows-admin-center-sdk/tools/gulp-merge-json-in-folders');
const psCim = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-cim');
const psCode = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-code');
const psModule = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-module');
const psManifest = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-manifest');
const gulpManifestValidator = require('@microsoft/windows-admin-center-sdk/tools/gulp-manifest-validator');
const ngc = require('@angular/compiler-cli/src/main');

const args = {
    verbose: !!argv['verbose'],
    junit: !!argv['junit']
};

gulp.task('clean', () => {
    return gulp.src(['dist', 'src/generated', 'inlineDist', 'inlineSrc'], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('lint', () => {
    return gulp.src(['src/**/*.ts', '!src/generated/**/*.*'])
        .pipe(tslint())
        .pipe(tslint.report({
            "emitError": true,
            "reportLimit": 0,
            "summarizeFailureOutput": true
        }))
});

gulp.task('validate', () => {
    return gulp.src('src/manifest.json')
        .pipe(gulpManifestValidator());
});

gulp.task('generate-resjson-json', () => {
    return gulp.src(['src/resources/strings/**/*.resjson'])
        .pipe(gulpResJson({ json: true }))
        .pipe(gulp.dest('src/assets/strings'));
});

gulp.task('generate-resjson-json-localized', () => {
    return gulp.src('loc/output/**/*.resjson')
        .pipe(gulpResJson({ json: true, localeOffset: 1 }))
        .pipe(gulp.dest('src/assets/strings'));
});

gulp.task('generate-resjson-interface', () => {
    return gulp.src('src/resources/strings/**/*.resjson')
        .pipe(gulpResJson({ typescript: 'interface' }))
        .pipe(gulp.dest('src/generated'));
});

gulp.task('merge-localized-json', () => {
    return gulp.src('./node_modules/@microsoft/windows-admin-center-sdk/**/assets/strings')
        .pipe(gulpMergeJsonInFolders({ src: './src/assets/strings' }))
        .pipe(gulp.dest('src/assets/strings'));
});

gulp.task('update-manifest-resource', () => {
    return gulp.src(['src/resources/strings/strings.resjson', 'loc/output/**/*.resjson'])
        .pipe(manifestResource({ resourceName: 'MicrosoftCredsTest' }))
        .pipe(gulp.dest('.'));
});

gulp.task('generate-resjson', (cb) => {
    runSequence(['generate-resjson-json', 'generate-resjson-json-localized', 'generate-resjson-interface'], 'merge-localized-json', 'update-manifest-resource', cb);
});

// Configure PowerShell module information.
const powerShellModule = {
    name: 'microsoft.credstest',
    guid: 'f6225e2b-4bb6-4949-8cf5-a2b37e269f29',
    list: [
        'src',
        'node_modules/@microsoft/windows-admin-center-sdk'
    ]
};

gulp.task('generate-powershell-code', () => {
    return gulp.src(['src/resources/scripts/**/*.ps1', 'src/generated/scripts/**/*.ps1'])
        .pipe(psCode({ powerShellModuleName: powerShellModule.name }))
        .pipe(gulp.dest('src/generated/'));
});        

gulp.task('generate-powershell-module', () => {
    const powerShellModulePaths = [];
    powerShellModule.list.forEach(item => {
        powerShellModulePaths.push(item + '/resources/scripts/**/*.ps1');
        powerShellModulePaths.push(item + '/generated/scripts/**/*.ps1'); 
    });
    return gulp.src(powerShellModulePaths)
        .pipe(psModule(powerShellModule))
        .pipe(gulp.dest('dist/powershell-module/' + powerShellModule.name));
});

gulp.task('generate-powershell-manifest', () => {
    // required for manifest where add-connection script or dynamic tool script are used.
    return gulp.src(['src/resources/scripts/**/*.ps1'])
        .pipe(psManifest({ powerShellModuleName: powerShellModule.name }))
        .pipe(gulp.dest('.'));
});

gulp.task('generate-powershell', (cb) => {
    runSequence('generate-powershell-code', 'generate-powershell-module', 'generate-powershell-manifest', cb);
});

gulp.task('generate', (cb) => {
    runSequence(['generate-powershell', 'generate-resjson'], cb);
});

gulp.task('inline-source', () => {
    return gulp.src('./src/**/*.ts')
        .pipe(inlineNg2Template({ useRelativePaths: true }))
        .pipe(gulp.dest('inlineSrc'));
});

gulp.task('inline-compile', cb => {
    var errors = [];
    ngc.main(['-p', './tsconfig.inline.json'], (consoleError) => { errors.push(consoleError); });
    errors.length > 0 ? cb(errors.join('\n')) : cb();
});

gulp.task('inline-dist', () => {
    return gulp.src('inlineDist/inlineSrc/**/*.*')
        .pipe(gulp.dest('dist'));    
});

gulp.task('compile', (cb) => {
    runSequence('inline-source', 'inline-compile', 'inline-dist', cb);
});

gulp.task('copy', () => {
    return gulp.src(['src/**/*.json', 'src/**/*.d.ts', 'src/**/*.ps1', 'src/assets/**/*.*'], { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('build', (cb) => {
    runSequence('clean', 'validate', 'generate', 'lint', 'compile', 'copy', 'test', 'bundle', cb);
});

gulp.task('bundle', cb => {
    var args = ['build', 'module-app', '--aot', '--progress=false', '--extract-licenses=false', '--output-hashing=all'];
    if (argv['verbose']) { args.push('--verbose'); }
    if (argv['prod']) { args.push('--prod'); }
    if (argv['watch']) { args.push('--watch'); }
    gutil.log('ng', args.join(' '));
    var errors = [];
    var cmd = childProcess.spawn('ng.cmd', args);
    cmd.stdout.on('data', function (data) { gutil.log(data.toString()); });
    cmd.stderr.on('data', function (data) { gutil.log(data.toString()); errors.push(data.toString()); });
    cmd.on('exit', function (code) {
        var error = false; 
        errors.forEach(err => { if (err.trim().toUpperCase().startsWith('ERROR')) { error = true } });
        error ? cb(errors.join('\n')) : cb();
    });
});

gulp.task('serve-ng', (cb) => {
    var args = process.argv.slice(3);
    args.splice(0, 0, 'serve');
    gutil.log(args.join(' '));
    var cmd = childProcess.spawn('ng.cmd', args);
    cmd.stdout.on('data', function (data) { gutil.log(data.toString()); });
    cmd.stderr.on('data', function (data) { gutil.log(data.toString()); });
    cmd.on('exit', function (code) { cb(); });
});

gulp.task('serve', (cb) => {
    runSequence('generate', 'serve-ng', cb);
});

gulp.task('test', () => {
    let reporter = [];
    if (args.junit) {
        reporter.push(new reporters.JUnitXmlReporter({
            savePath: 'unitTests'
        }));
    } else {
        reporter.push(new terminalReporter({
            isVerbose: args.verbose,
            showColors: true,
            includeStackTrace: args.verbose
        }));
    }

    return gulp.src('dist/**/*.test.js')
        .pipe(jasmine({
            verbose: args.verbose,
            reporter: reporter,
            includeStackTrace: args.verbose,
            config: {
                helpers: ['dist/**/*.test.helper.js'],
                stopSpecOnExpectationFailure: true
            }
        }))
        .on('jasmineDone', (output) => {
            if (args.junit) {
                gutil.log(`Tests ${output ? gutil.colors.green('Passed') : gutil.colors.yellow('Failed')}.`);
                gutil.log(`Full results at ${process.cwd()}\\unittests\\junitresults.xml`);
            }
        });
});

const config = {
    e2e: {
        src: '/e2e',
        dest: '/dist/e2e',
        commonCodeFolder: '/node_modules/@microsoft/windows-admin-center-sdk/e2e',
        generatedStringsFolder: 'src/assets/strings',
        assetsFolder: '/dist/assets',
        jasmine: {
            src: 'dist/e2e/specs/*.js',
            options: {
                reporter: [ new reporters.JUnitXmlReporter( { savePath: __dirname + "/scenariotestresults", consolidateAll: true } )],
                timeout: 180000 // 3 minutes.
            }
        },
    }
};

gulp.task('e2e-clean', ['generate-resjson'], function () {
    return gulp.src([__dirname + config.e2e.assetsFolder,
    __dirname + config.e2e.dest,
    __dirname + config.e2e.commonCodeFolder + '/**/*.js',
    __dirname + config.e2e.commonCodeFolder + '/**/*.js.map',
    __dirname + config.e2e.commonCodeFolder + '/**/*.d.ts'], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('e2e-build-generated', ['e2e-clean'], function () {
        return gulp.src(config.e2e.generatedStringsFolder + '/*.*', { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('e2e-build-common', ['e2e-build-generated'], function () {
    var tsProject = ts.createProject(__dirname + config.e2e.commonCodeFolder + '/tsconfig.json');
    return gulp.src([__dirname + config.e2e.commonCodeFolder + '/**/*.ts', '!' + __dirname + config.e2e.commonCodeFolder + '/**/*.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.mapSources(function (sourcePath, file) {
            var newPathSegments = sourcePath.replace('../../', '').split('/');
            return newPathSegments[newPathSegments.length - 1];
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(__dirname + config.e2e.commonCodeFolder));
});

gulp.task('e2e-build', ['e2e-build-common'], function () {
    var tsProject = ts.createProject(__dirname + config.e2e.src + '/tsconfig.json');
    return gulp.src([__dirname + config.e2e.src + '/**/*.ts', '!' + __dirname + config.e2e.src + '/**/*.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.mapSources(function (sourcePath, file) {
            var sourcePath = sourcePath.replace('../../', '');
            var folderDepth = sourcePath.split('/').length;
            var newPath = '';
            for (var i = 0; i < folderDepth; i++) {
                newPath += '../';
            }
            newPath += '..' + config.e2e.src + '/' + sourcePath;
            return newPath;
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(__dirname + config.e2e.dest));
});

gulp.task('e2e-run', function () {
    return gulp.src(config.e2e.jasmine.src)
        .pipe(jasmine(config.e2e.jasmine.options))
        .on('jasmineDone', (output) => {
            if (args.junit) {
                gutil.log(`Tests ${output ? gutil.colors.green('Passed') : gutil.colors.yellow('Failed')}.`);
                gutil.log(`Full results at ${process.cwd()}\\unittests\\junitresults.xml`);
            }
        });
});

gulp.task('e2e', function (cb) {
    runSequence('e2e-build', 'e2e-run', cb);
});