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
const e2eModule = require('./common/e2e');

module IndexModule {
    // Export tasks
    export const clean = cleanModule.clean;
    export const lint = lintModule.lint;
    export const lintApp = lintModule.lintApp;
    export const validate = validateModule.validate;
    export const resjson = resjsonModule.resjson;
    export const powershell = powershellModule.powershell;
    export const copy = copyModule.copyApp;
    export const inlineDist = copyModule.inlineDist;
    export const inlineSource = compileModule.inlineSource;
    export const inlineCompile = compileModule.inlineCompile;
    export const bundleApp = compileModule.bundleApp;
    export const serveApp = compileModule.serveApp;
    export const ut = testModule.unitTestApp;
    export const pester = testModule.pester;
    export const test = testModule.test;
    export const e2eLint = lintModule.lintE2e;
    export const e2eBuild = e2eModule.e2eBuild;
    export const e2eRun = e2eModule.e2eRun;
    export const e2e = e2eModule.e2e;

    // Build Tasks
    export const generate = config.powershell.skip ? resjson : parallel(resjson, powershell);
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

// aliases
task('e2e-build', exports.e2eBuild);
task('e2e-run', exports.e2eRun);
