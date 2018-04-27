// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Loads JSDOM and configures it so UTs can access all the features as winthin a browser
let jsdom = require('jsdom');
(<any>global).document = jsdom.jsdom('<body></body>');
(<any>global).window = document.defaultView;
(<any>global).navigator = window.navigator;

// load jQuery that is needed by signalR
(<any>global).window.jQuery = require('jquery/dist/jquery.js');
(<any>global).$ = (<any>global).window.jQuery;
(<any>global).window.Event = {};

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

class MockStorage implements Storage {
    public length: number;

    private items = {};

    [index: number]: string;

    public clear(): void {
        this.items = {};
    }

    public getItem(key: string): string {
        return <string>this.items[key];
    }

    public key(index: number): string {
        return this[index];
    }

    public removeItem(key: string): void {
        this.items[key] = undefined;
    }

    public setItem(key: string, data: string): void {
        this.items[key] = data;
    }
}

(<any>global).localStorage = new MockStorage();
(<any>global).sessionStorage = new MockStorage();
