import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-format-example',
    template: `
      <div class="p-xxs tool-container">
          <div>
              <label>Simple Format:</label>
              <input type="text" [(ngModel)]="formatSimple" />
          </div>
          <div class="m-t-xxs">
              <label>Simple Text 1:</label>
              <input type="text" [(ngModel)]="simple1" />
          </div>
          <div class="m-t-xxs">
              <label>Simple Text 2:</label>
              <input type="text" [(ngModel)]="simple2" />
          </div>
          <div class="m-t-xxs">
              <label>Link Format:</label>
              <input type="text" [(ngModel)]="formatLinks" />
          </div>
          <div class="m-t-xxs">
              <label>Link Format Text 1:</label>
              <input type="text" [(ngModel)]="link1" />
          </div>
          <div class="m-t-xxs">
              <label>Link Format href for Text 1:</label>
              <input type="text" [(ngModel)]="link1href" />
          </div>
          <div class="m-t-xxs">
              <label>Link Format Text 2:</label>
              <input type="text" [(ngModel)]="link2" />
          </div>

          <div class="m-t-xxs" style="font-weight: bold">Default Output Simple:</div>
          <div>{{ formatSimple | smeFormat:[simple1, simple2]}}</div>

          <div class="m-t-xxs" style="font-weight: bold">Default Output No Args:</div>
          <div>{{ formatSimple | smeFormat}}</div>

          <div class="m-t-xxs" style="font-weight: bold">Default Output With Links:</div>
          <div>{{ formatLinks | smeFormat:[{text: link1, href:link1href}, link2]}}</div>
    
          <div class="m-t-xxs" style="font-weight: bold">Default Output With Links and no second arg:</div>
          <div>{{ formatLinks | smeFormat:[{text: link1, href:link1href}]}}</div>

          <div class="m-t-xxs" style="font-weight: bold">Format Link Html Output:</div>
          <div [innerHTML]="formatLinks | smeFormat:[{text: link1, href:link1href}, link2]"></div>
      </div>
    `
})
export class FormatExampleComponent {
    public formatSimple = 'Format {0} {1}';
    public formatLinks = 'Format with {0} {1}';
    public simple1 = 'string';
    public simple2 = 'works';
    public link1 = 'link';
    public link1href = 'http://www.bing.com';
    public link2 = 'works';

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeFormat';
    }
}