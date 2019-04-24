const { src } = require('gulp');
const gulpClean = require('gulp-clean');
const Utilities = require('./utilities');

module CleanModule {
    export function clean(): any {
        return src(
            [
                'dist',
                'inlineDist',
                'inlineSrc',
                'scenariotestresults',
                'unittests',
                'src/assets/strings',
                'src/assets/styles',
                'src/generated'
            ],
            {
                read: false,
                allowEmpty: true
            })
            .pipe(gulpClean({ force: true }));
    }
}

Utilities.exportFunctions(exports, CleanModule);
