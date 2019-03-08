import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsftSmeComponent } from './msft-sme.component';
import { msftSmeRoutingConstants } from './msft-sme.routing.constants';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '',
            component: MsftSmeComponent,
            children: [
                { path: '', redirectTo: msftSmeRoutingConstants.overview.path, pathMatch: 'full' },
                { path: msftSmeRoutingConstants.overview.path, loadChildren: msftSmeRoutingConstants.overview.loadChildren },
                { path: msftSmeRoutingConstants.experiments.path, loadChildren: msftSmeRoutingConstants.experiments.loadChildren }
            ]
        }
    ]);
