import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControlsComponent } from './form-controls.component';
import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { SearchExampleComponent } from './search/search-example.component';
import { SodaFactoryReactiveExampleComponent } from './soda-factory-reactive/soda-factory-reactive-example.component';
import { SodaFactoryExampleComponent } from './soda-factory/soda-factory-example.component';
import { ValidationAlertExampleComponent } from './validation-alert/validation-alert-example.component';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '',
            component: FormControlsComponent,
            children: [
                { path: 'templateDriven', component: SodaFactoryExampleComponent },
                { path: 'reactive', component: SodaFactoryReactiveExampleComponent },
                { path: 'fieldsApi', component: FormFieldsExampleComponent },
                { path: 'search', component: SearchExampleComponent },
                { path: 'validation', component: ValidationAlertExampleComponent },
                { path: '**', redirectTo: 'templateDriven' }
            ]
        }
    ]);
