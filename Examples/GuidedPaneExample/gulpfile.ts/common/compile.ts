const { dest, series, src } = require('gulp');
const inlineNg2Template = require('gulp-inline-ng2-template');
const ngc = require('@angular/compiler-cli/src/main');
const Utilities = require('./utilities');
const argv = Utilities.gulpArgv();

module CompileModule {
    function getBundleArguments(appName: string): string[] {
        const args = ['build', appName, '--aot', '--progress=false', '--extract-licenses=false'];
        if (argv['verbose']) { args.push('--verbose'); }
        if (argv['prod']) { args.push('--prod'); }
        if (argv['watch']) { args.push('--watch'); }
        return args;
    }

    function getServeArguments(): string[] {
        const args = ['serve'].concat(process.argv.slice(3));
        return args;
    }

    export function inlineSource(): any {
        return src('./src/**/*.ts')
            .pipe(inlineNg2Template({ useRelativePaths: true }))
            .pipe(dest('inlineSrc'));
    }

    export function inlineCompile(cb): any {
        const errors = [];
        ngc.main(['-p', 'tsconfig.inline.json'], (consoleError) => { errors.push(consoleError); });
        errors.length > 0 ? cb(errors.join('\n')) : cb();
    }

    export function bundleApp(cb): void {
        const args = getBundleArguments('module-app');
        Utilities.ng(cb, args);
    }

    export function serveApp(cb): void {
        const args = getServeArguments();
        Utilities.ng(cb, args);
    }
}

Utilities.exportFunctions(exports, CompileModule);
