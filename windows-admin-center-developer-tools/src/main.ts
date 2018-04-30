// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoreEnvironment } from '@msft-sme/shell/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

// initialize SME module environment with localization settings.
CoreEnvironment.initialize(
    {
        name: 'msft.sme.developer-tools',
        isProduction: environment.production,
        shellOrigin: '*'
    },
    {
        resourcesPath: 'assets/strings'
    })
    .then(() => platformBrowserDynamic().bootstrapModule(AppModule));