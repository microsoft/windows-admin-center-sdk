const { dest, src } = require('gulp');
const Utilities = require('./utilities');

module CopyModule {

    export function copyApp(): any {
        return src(
            [
                'src/**/*.json',
                'src/**/*.d.ts',
                'src/**/*.ps1',
                'src/assets/**/*.*'
            ],
            { base: 'src' })
            .pipe(dest('dist'));
    }

    export function inlineDist(): any {
        return src('inlineDist/inlineSrc/**/*.*')
            .pipe(dest('dist'));
    }
}

Utilities.exportFunctions(exports, CopyModule);
