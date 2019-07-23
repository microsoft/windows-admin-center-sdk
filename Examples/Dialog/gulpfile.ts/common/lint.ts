const { series, src } = require('gulp');
const tslint = require('gulp-tslint');
const Utilities = require('./utilities');

module LintModule {
    export function lintApp() {
        return src(['src/**/*.ts', '!src/generated/**/*.*'])
            .pipe(tslint())
            .pipe(tslint.report({ 'emitError': true, 'reportLimit': 0, 'summarizeFailureOutput': true }));
    }

    export const lint = lintApp;
}

Utilities.exportFunctions(exports, LintModule);
