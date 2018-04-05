import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormStylesComponent } from './form-styles.component';

import { ButtonStylesComponent } from './button/button-styles.component';
import { CheckboxStylesComponent } from './checkbox/checkbox-styles.component';
import { RadioStylesComponent } from './radio/radio-styles.component';
import { SearchStylesComponent } from './search/search-styles.component';
import { SelectStylesComponent } from './select/select-styles.component';
import { SliderStylesComponent } from './slider/slider-styles.component';
import { TextStylesComponent } from './text/text-styles.component';
import { ToggleSwitchStylesComponent } from './toggle-switch/toggle-switch-styles.component';

export const routing: ModuleWithProviders = RouterModule.forChild(
    [
        {
            path: '',
            component: FormStylesComponent,
            children: [
                { path: '', redirectTo: 'button', pathMatch: 'full' },
                { path: 'button', component: ButtonStylesComponent },
                { path: 'checkbox', component: CheckboxStylesComponent },
                { path: 'radio', component: RadioStylesComponent },
                { path: 'search', component: SearchStylesComponent },
                { path: 'select', component: SelectStylesComponent },  
                { path: 'slider', component: SliderStylesComponent },            
                { path: 'text', component: TextStylesComponent },      
                { path: 'toggle', component: ToggleSwitchStylesComponent }          
                
            ]
        }
    ]);
