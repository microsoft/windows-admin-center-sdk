import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import './polyfills.ts';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
// Prevent Karma from running prematurely.
__karma__.loaded = function () {
    // loaded event handler for karma
};
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
var context = require.context('./', true, /\.spec\.ts/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFDTCwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQzlCLE1BQU0sMkNBQTJDLENBQUM7QUFFbkQsT0FBTyxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sOEJBQThCLENBQUM7QUFDdEMsT0FBTyw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyx3QkFBd0IsQ0FBQztBQU1oQywwQ0FBMEM7QUFDMUMsU0FBUyxDQUFDLE1BQU0sR0FBRztJQUNqQixpQ0FBaUM7QUFDbkMsQ0FBQyxDQUFDO0FBRUYscURBQXFEO0FBQ3JELFVBQVUsRUFBRSxDQUFDLG1CQUFtQixDQUM5QiwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQUUsQ0FDaEMsQ0FBQztBQUVGLDhCQUE4QjtBQUM5QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDeEQsd0JBQXdCO0FBQ3hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIseUNBQXlDO0FBQ3pDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==