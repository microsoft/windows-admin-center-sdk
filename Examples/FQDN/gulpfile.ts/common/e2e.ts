const { dest, parallel, series, src } = require('gulp');
const gulpClean = require('gulp-clean');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const gulpJasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const resjsonModule = require('./resjson');
const lintModule = require('./lint');
const Utilities = require('./utilities');
const argv = Utilities.gulpArgv();

module E2eModule {
    export function clean(): any {
        return src(
            [
                'dist/assets',
                'dist/e2e',
                'node_modules/@microsoft/windows-admin-center-sdk/e2e/**/*.js',
                'node_modules/@microsoft/windows-admin-center-sdk/e2e/**/*.js.map',
                'node_modules/@microsoft/windows-admin-center-sdk/e2e/**/*.d.ts'
            ],
            { read: false, allowEmpty: true })
            .pipe(gulpClean({ force: true }));
    }

    export function buildGenerated(): any {
            return src('src/assets/strings/*.*', { base: 'src' })
                .pipe(dest('dist'));
    }

    export function buildCommon(): any {
        const tsProject = ts.createProject('node_modules/@microsoft/windows-admin-center-sdk/e2e/tsconfig.json');
        return src(['node_modules/@microsoft/windows-admin-center-sdk/e2e/**/*.ts', '!node_modules/@microsoft/windows-admin-center-sdk/e2e/**/*.d.ts'])
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write('./'))
            .pipe(dest('node_modules/@microsoft/windows-admin-center-sdk/e2e'));
    };

    export function buildApp() {
        const tsProject = ts.createProject('e2e/tsconfig.json');
        return src(['e2e/**/*.ts', '!e2e/**/*.d.ts'])
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .pipe(sourcemaps.write('./'))
            .pipe(dest('dist/e2e'));
    }

    export function e2eRun() {
        const options = {
            reporter: [new reporters.JUnitXmlReporter({ savePath: 'scenariotestresults', consolidateAll: true })],
            timeout: 1800000 // 30 minutes.
        };
        return src('dist/e2e/specs/*.js')
            .pipe(gulpJasmine(options))
            .on('jasmineDone', (output) => {
                if (argv.junit) {
                    log(`Full results at ${process.cwd()}\\unittests\\junitresults.xml`);
                }
            });
    }

    export const e2eBuild = series(clean, resjsonModule.resjson, buildGenerated, buildCommon, buildApp);
    export const e2e = series(lintModule.lintE2e, e2eBuild, e2eRun);
}

Utilities.exportFunctions(exports, E2eModule);
