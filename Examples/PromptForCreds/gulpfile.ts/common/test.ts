import { Config } from './config';
const { dest, src } = require('gulp');
const testRunner = require('@microsoft/windows-admin-center-sdk/tools/test-runner');
const Utilities = require('./utilities');
const argv = Utilities.gulpArgv();
const config: Config = require('../config-data').gulpConfig();

module TestModule {
    export function unitTestApp(cb, options: any = {}): void {
        const args = ['test'];
        if (argv['prod']) {
            args.push('--prod');
        } else if (argv['debug']) {
            args.push('--c=debug');
        }

        Utilities.ng(cb, args, options, code => {
            return code
                ? `ng test exited with code ${code}, indicating some tests have failed. Check the above log output for failed tests.`
                : null;
        });
    }

    export function pester(cb) {
        testRunner({
            pester: {
                testPath: './tests/powershell',
                srcPath: './src/resources/scripts/*.ps1',
                outputPath: `./unittests/pesterResults.xml`,
                verbose: argv.verbose
            }
        }, cb);
    }

    export const test = config.powershell.enablePester ? parallel(unitTestApp, pester) : unitTestApp;
}

Utilities.exportFunctions(exports, TestModule);
