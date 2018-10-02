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
const gulpPsCode = require('@microsoft/windows-admin-center-sdk/dist/tools/gulp-ps-code');
const gulpResJson = require('@microsoft/windows-admin-center-sdk/dist/tools/gulp-resjson');
const gulpSvgCode = require('@microsoft/windows-admin-center-sdk/dist/tools/gulp-svg-code');
const gulpMergeJsonInFolders = require('@microsoft/windows-admin-center-sdk/dist/tools/gulp-merge-json-in-folders');
const manifestResource = require('@microsoft/windows-admin-center-sdk/dist/tools/gulp-manifest-resource');
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

gulp.task('generate', (cb) => {
    runSequence('doNotUse', cb);
});

gulp.task('compile', () => {
    runSequence('doNotUse', cb);
});

gulp.task('bundle', cb => {
    runSequence('doNotUse', cb);
});

gulp.task('serve', (cb) => {
    runSequence('doNotUse', cb);
});

gulp.task('doNotUse', (cb) => {
    process.stdout.write('\nBuilding this extension is not supported.\n');
    process.stdout.write('Please use the CLI to create your extension and then reference the example code here.\n');
    process.stdout.write('The CLI can be found here: https://www.npmjs.com/package/windows-admin-center-cli\n');
});

gulp.task('build', (cb) => {
    runSequence('doNotUse', cb);
});
