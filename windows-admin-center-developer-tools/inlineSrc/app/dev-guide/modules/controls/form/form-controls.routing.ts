import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormControlsComponent } from './form-controls.component';

import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { SodaFactoryExampleComponent } from './soda-factory/soda-factory-example.component';
import { ValidationAlertExampleComponent } from './validation-alert/validation-alert-example.component';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '',
            component: FormControlsComponent,
            children: [
                { path: '', redirectTo: 'example', pathMatch: 'full' },
                { path: 'example', component: SodaFactoryExampleComponent },
                { path: 'fields', component: FormFieldsExampleComponent },
                { path: 'validation', component: ValidationAlertExampleComponent },
                { path: '**', redirectTo: 'fields' }

            ]
        }
    ]);
