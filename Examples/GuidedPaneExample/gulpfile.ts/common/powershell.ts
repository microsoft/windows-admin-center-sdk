import { Config } from './config';
const { dest, series, src } = require('gulp');
const psCode = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-code');
const psCim = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-cim');
const psModule = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-module');
const psResjson = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-resjson');
const psManifest = require('@microsoft/windows-admin-center-sdk/tools/gulp-ps-manifest');
const Utilities = require('./utilities');
const config: Config = require('../config-data').gulpConfig();

module PowerShellModule {
    function powershellCim() {
        return src('src/powershell-cim-config.json')
            .pipe(psCim())
            .pipe(dest('src/generated/scripts/'));
    }

    function powershellCode() {
        return src(['src/resources/scripts/**/*.ps1', 'src/generated/scripts/**/*.ps1'])
            .pipe(psCode({ powerShellModuleName: config.powershell.name }))
            .pipe(dest('src/generated/'));
    }

    function powershellModule() {
        const powerShellModulePaths = [];
        config.powershell.list.forEach(item => {
            powerShellModulePaths.push(item + '/resources/scripts/**/*.ps1');
            powerShellModulePaths.push(item + '/generated/scripts/**/*.ps1');
        });
        return src(powerShellModulePaths)
            .pipe(psModule(config.powershell))
            .pipe(dest('dist/powershell-module/' + config.powershell.name));
    }

    function powershellResjson() {
        return src(['src/resources/strings/strings.resjson', config.resjson.localePath + '/**/*.resjson'])
            .pipe(psResjson({ resourceName: config.powershell.name }))
            .pipe(dest('dist/packages/shell/dist/powershell-module/' + config.resjson.resourceName));
    }

    function powershellManifest(): any {
        return src(['src/resources/scripts/**/*.ps1'])
            .pipe(psManifest({ powerShellModuleName: config.powershell.name }))
            .pipe(dest('.'));
    }

    const seriesArray = [];
    if (!config.powershell.skipCim) {
        seriesArray.push(powershellCim);
    }

    seriesArray.push(powershellCode);

    if (!config.powershell.skipModule) {
        seriesArray.push(powershellModule);
    }

    if (!config.powershell.skipResjson) {
        seriesArray.push(powershellResjson);
    }

    if (!config.powershell.skipManifest) {
        seriesArray.push(powershellManifest);
    }

    export const powershell = seriesArray.length === 1 ? powershellCode : series(seriesArray);
}

Utilities.exportFunctions(exports, PowerShellModule);
