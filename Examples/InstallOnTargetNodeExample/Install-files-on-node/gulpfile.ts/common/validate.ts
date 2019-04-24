const { parallel, src } = require('gulp');
const schemaForm = require('@microsoft/windows-admin-center-sdk/tools/gulp-schema-form');
const manifestValidator = require('@microsoft/windows-admin-center-sdk/tools/gulp-manifest-validator');
const Utilities = require('./utilities');

module ValidateModule {
    function schemaFormValidateResourceString() {
        return src('src/**/*.ts')
            .pipe(schemaForm());
    }

    // special gulp task to test the manifest validation gulp tool.
    function testValidateManifests() {
        return src('src/manifest.json')
            .pipe(manifestValidator());
    }

    export const validate = parallel(schemaFormValidateResourceString, testValidateManifests);
}

Utilities.exportFunctions(exports, ValidateModule);
