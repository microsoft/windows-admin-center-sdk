import { Config } from './config';
const { dest, parallel, series, src } = require('gulp');
const gulpResJson = require('@microsoft/windows-admin-center-sdk/tools/gulp-resjson');
const gulpMergeJsonInFolders = require('@microsoft/windows-admin-center-sdk/tools/gulp-merge-json-in-folders');
const manifestResource = require('@microsoft/windows-admin-center-sdk/tools/gulp-manifest-resource');
const Utilities = require('./utilities');
const config: Config = require('../config-data').gulpConfig();

module ResjsonModule {
    function resjsonJson(): any {
        return src('src/resources/strings/**/*.resjson')
            .pipe(gulpResJson({ json: true }))
            .pipe(dest('./src/assets/strings'));
    }

    function resjsonJsonLocalized(): any {
        return src(config.resjson.localePath +  '/**/*.resjson')
            .pipe(gulpResJson({ json: true, localeOffset: config.resjson.localeOffset }))
            .pipe(dest('./src/assets/strings'));
    }

    function resjsonInterface(): any {
        return src('src/resources/**/*.resjson')
            .pipe(gulpResJson({ typescript: 'interface' }))
            .pipe(dest('src/generated'));
    }

    function mergeLocalizedJson(): any {
        return src(['./node_modules/@microsoft/windows-admin-center-sdk/**/assets/strings'])
            .pipe(gulpMergeJsonInFolders({ src: './src/assets/strings' }))
            .pipe(dest('src/assets/strings'));
    }

    function updateManifestResource(): any {
        return src(['src/resources/strings/strings.resjson', config.resjson.localePath + '/**/*.resjson'])
            .pipe(manifestResource({ resourceName: config.resjson.resourceName }))
            .pipe(dest('.'));
    }

    export const resjson = series(
        parallel(resjsonJson, resjsonJsonLocalized, resjsonInterface),
        parallel(mergeLocalizedJson, updateManifestResource)
    );
}

Utilities.exportFunctions(exports, ResjsonModule);
