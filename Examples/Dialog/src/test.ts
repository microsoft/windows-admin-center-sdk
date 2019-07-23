import 'zone.js/dist/zone-testing';

import { getTestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { MsftSmeMock } from '@microsoft/windows-admin-center-sdk/core/base/msft-sme.mock';
import { ConsoleMock } from '@microsoft/windows-admin-center-sdk/core/test-utilities/console.mock';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {
    // loaded event handler for karma
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

// Setup our mocks before all the tests run.
beforeAll(() => {
    const strings = require('./assets/strings/strings.json');
    MsftSmeMock.mockStrings(strings);
    MsftSmeMock.mockSelf();
    ConsoleMock.mockConsole();
});

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
