// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// node cannot read ES6 files so we use babel to transpile them
let babelCompileLibraries = [
    '/node_modules/@microsoft/windows-admin-center-sdk/',
    '/node_modules/@angular/',
    '/dist/'
];

let startsWith = babelCompileLibraries.map((relativePath) => (process.cwd().split('\\').join('/') + relativePath).toUpperCase());

require('babel-register')({
    ignore: function (filename) {
        filename = filename.toUpperCase();
        if (startsWith.find((startWith) => filename.indexOf(startWith) === 0)) {
            return false;
        } else {
            return true;
        }
    }
});
