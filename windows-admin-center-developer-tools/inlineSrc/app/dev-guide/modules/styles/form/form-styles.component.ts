import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, RouterStateSnapshot } from '@angular/router';

import {
    CommonSettingsComponentBase,
    CommonSettingsNavigationItem,
    ConfirmationDialogOptions
} from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-form-styles',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-arrange-stack-v">
          <h1 class="sme-position-flex-none">Form Elements</h1>
          <div class="sme-pivot sme-position-flex-none sme-padding-bottom-sm">
              <div role="tablist">
                  <!-- Button/trigger -->
                  <a role="tab" routerLink="/dev/styles/forms/button" routerLinkActive="sme-active">Button</a>

                  <!-- Checkbox -->
                  <a role="tab" routerLink="/dev/styles/forms/checkbox" routerLinkActive="sme-active">Checkbox</a>

                  <!-- Date and time inputs -->
                  <!-- <a role="tab" routerLink="/dev/styles/forms/datetime" routerLinkActive="sme-active">DateTime</a> -->

                  <!-- File -->
                  <!-- <a role="tab" routerLink="/dev/styles/forms/file" routerLinkActive="sme-active">File</a> -->

                  <!-- Password -->
                  <!-- <a role="tab" routerLink="/dev/styles/forms/password" routerLinkActive="sme-active">Password</a> -->

                  <!-- Radio -->
                  <a role="tab" routerLink="/dev/styles/forms/radio" routerLinkActive="sme-active">Radio</a>

                  <!-- Search/AutoComplete -->
                  <a role="tab" routerLink="/dev/styles/forms/search" routerLinkActive="sme-active">Search</a>

                  <!-- Select/Combobox -->
                  <a role="tab" routerLink="/dev/styles/forms/select" routerLinkActive="sme-active">Select</a>

                  <!-- Range/slider -->
                  <a role="tab" routerLink="/dev/styles/forms/slider" routerLinkActive="sme-active">Slider</a>

                  <!-- text/textarea -->
                  <a role="tab" routerLink="/dev/styles/forms/text" routerLinkActive="sme-active">Text</a>

                  <!-- Toggle-switch -->
                  <a role="tab" routerLink="/dev/styles/forms/toggle" routerLinkActive="sme-active">Toggle Switch</a>
              </div>
          </div>
          <div class="sme-layout-relative sme-position-flex-auto sme-focus-zone">
              <router-outlet></router-outlet>
          </div>
      </div>
    `
})
export class FormStylesComponent { }
