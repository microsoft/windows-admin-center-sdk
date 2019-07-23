import { Config } from './common/config';
const { series, parallel, task, watch } = require('gulp');
const Utilities = require('./common/utilities');
const config: Config = require('./config-data').gulpConfig();

const cleanModule = require('./common/clean');
const lintModule = require('./common/lint');
const resjsonModule = require('./common/resjson');
const powershellModule = require('./common/powershell');
const validateModule = require('./common/validate');
const compileModule = require('./common/compile');
const copyModule = require('./common/copy');
const testModule = require('./common/test');

module IndexModule {
    // Export tasks
    export const clean = cleanModule.clean;
    export const lint = lintModule.lint;
    export const lintApp = lintModule.lintApp;
    export const validate = validateModule.validate;
    export const resjson = resjsonModule.resjson;
    export const powershell = config.powershell.skip ? function powershellSkip(cb) { cb(); } : powershellModule.powershell;
    export const copy = copyModule.copyApp;
    export const inlineDist = copyModule.inlineDist;
    export const inlineSource = compileModule.inlineSource;
    export const inlineCompile = compileModule.inlineCompile;
    export const bundleApp = compileModule.bundleApp;
    export const serveApp = compileModule.serveApp;
    export const ut = testModule.unitTestApp;
    export const pester = testModule.pester;
    export const test = config.test && config.test.skip ? function skipTest(cb) {cb();}: testModule.test;

    // Build Tasks
    export const generate = parallel(resjson, powershell);
    export const compile = series(inlineSource, inlineCompile, inlineDist);
    export const app = series(lintApp, bundleApp, copy);
    export const build = series(clean, generate, validate, lint, compile, copy, test, app);

    // Serve Tasks
    export function watchResource(cb) {
        watch(['src/resources/**/*.resjson', 'src/resources/**/*.ps1'], { ignoreInitial: false }, generate);
        cb();
    }

    export const serve = series(watchResource, serveApp);
}

Utilities.exportFunctions(exports, IndexModule);
