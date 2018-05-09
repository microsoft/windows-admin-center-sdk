"use strict";

const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const ngCompile = require('gulp-ngc');
const gulpTslint = require('gulp-tslint');
const tslint = require('tslint');
const argv = require('yargs').argv;
const runSequence = require('run-sequence');
const inlineNg2Template = require('gulp-inline-ng2-template');
const child_process = require('child_process');
const gulpPsCode = require('./gulps/gulp-ps-code');
const gulpResJson = require('./gulps/gulp-resjson');
const gulpSvgCode = require('./gulps/gulp-svg-code');
const gulpMergeJsonInFolders = require('./gulps/gulp-merge-json-in-folders');
const gulpLicense = require('./tools/gulp-license');

gulp.task('license', () => {
    return gulp.src('src/**/*.*')
        .pipe(gulpLicense((fileType) => {    
            switch (fileType) {
                case '.ts': {
                    return '// Copyright (c) Microsoft Corporation. All rights reserved.\n// Licensed under the MIT License.\n\r';
                }
                case '.html': {
                    return '<!-- Copyright (c) Microsoft Corporation. All rights reserved.\n Licensed under the MIT License. -->\n\r';
                }
                default: {
                    return;
                }
            }
        }))
        .pipe(gulp.dest('./src'));
});

gulp.task('clean', () => {
    return gulp.src(['dist', 'bundle', 'src/generated', 'src/assets/strings', 'inlineSrc'], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('generate-powershell', () => {
    return gulp.src(['src/resources/scripts/**/*.ps1'])
        .pipe(gulpPsCode({ name: 'powershell-scripts.ts', removeComments: true }))
        .pipe(gulp.dest('src/generated'));
});

gulp.task('generate-svg', () => {
    return gulp.src(['src/resources/icons/**/*.svg'])
        .pipe(gulpSvgCode())
        .pipe(gulp.dest('src/generated'));
});

gulp.task('generate-resjson-json', () => {
    return gulp.src(['src/resources/strings/**/*.resjson'])
        .pipe(gulpResJson({ json: true }))
        .pipe(gulp.dest('./src/assets/strings'));
});

gulp.task('generate-resjson-interface', () => {
    return gulp.src(['src/resources/strings/**/*.resjson'])
        .pipe(gulpResJson({ typescript: 'interface' }))
        .pipe(gulp.dest('src/generated'));
});

gulp.task('merge-localized-json', () => {
    return gulp.src(['./node_modules/@microsoft/windows-admin-center-sdk/dist/assets/strings', './node_modules/@msft-sme/**/dist/assets/strings'])
        .pipe(gulpMergeJsonInFolders({ src: './src/assets/strings' }))
        .pipe(gulp.dest('src/assets/strings'));
});

gulp.task('generate-resjson', (cb) => {
    runSequence(['generate-resjson-json', 'generate-resjson-interface'], 'merge-localized-json', cb);
});

gulp.task('generate', (cb) => {
    runSequence(['generate-powershell', 'generate-svg', 'generate-resjson'], cb);
});

gulp.task('lint', () => {
    var program = tslint.Linter.createProgram("./tsconfig.json");
    return gulp.src('src/**/*.ts')
      .pipe(gulpTslint({ program }))
      .pipe(gulpTslint.report({
            "emitError": true,
            "reportLimit": 0,
            "summarizeFailureOutput": true
        }));
});

gulp.task('inline', function() {
    return gulp.src('./src/**/*.ts')
        .pipe(inlineNg2Template({ useRelativePaths: true }))
        .pipe(gulp.dest('inlineSrc'));
});

gulp.task('copy', () => {
    return gulp.src(['src/**/*.json', 'src/**/*.d.ts', 'src/assets/**/*.*'], { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', () => {
    return ngCompile('./tsconfig-inline.json');
});

gulp.task('bundle', cb => {
    var args = process.argv.slice(3);
    args.splice(0, 0, 'build', '-progress=false');
    var cmd = child_process.spawn('ng.cmd', args);
    cmd.stdout.on('data', function (data) { gutil.log(data.toString()); });
    cmd.stderr.on('data', function (data) { gutil.log(data.toString()); });
    cmd.on('exit', function (code) { cb(); });
});

gulp.task('serve', (cb) => {
    var args = process.argv.slice(3);
    args.splice(0, 0, 'serve', '-progress=false');
    var cmd = child_process.spawn('ng.cmd', args);
    cmd.stdout.on('data', function (data) { gutil.log(data.toString()); });
    cmd.stderr.on('data', function (data) { gutil.log(data.toString()); });
    cmd.on('exit', function (code) { cb(); });
});

gulp.task('build', (cb) => {
    runSequence('clean', 'generate', 'lint', 'inline', ['compile', 'copy'], 'bundle', cb);
});
