import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-layers',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-documentation">
        <h1>Layers</h1>
        <section>
          <p>Layers determine the z-index of an element.Most scenarios should suffice with just using the these classes.</p>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>z-index</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>.sme-layer-dialog</td>
                <td>900</td>
                <td>Use for Dialog component stack.</td>
              </tr>
              <tr>
                <td>.sme-layer-flyout</td>
                <td>700</td>
                <td>Use for all other flyout elements.</td>
              </tr>
              <tr>
                <td>.sme-layer-nav</td>
                <td>500</td>
                <td>Use for navigational elements. (menus)</td>
              </tr>
              <tr>
                <td>.sme-layer-over</td>
                <td>300</td>
                <td>Use for elements that need to be raised more out of the normal flow.</td>
              </tr>
              <tr>
                <td>.sme-layer-above</td>
                <td>100</td>
                <td>Use for elements that need to be raised out of the normal flow.</td>
              </tr>
              <tr>
                <td>.sme-layer-neutral</td>
                <td>1</td>
                <td>Common z-index value for elements that need to be above baseline.</td>
              </tr>
              <tr>
                <td>.sme-layer-default</td>
                <td>0</td>
                <td>Default browser element z-index (baseline).</td>
              </tr>
              <tr>
                <td>.sme-layer-below</td>
                <td>-1</td>
                <td>Use for elements that need to live below the normal flow of the document.</td>
              </tr>
              <tr>
                <td>.sme-layer-buried</td>
                <td>-2</td>
                <td>Reserved for lowest elements in the stack</td>
              </tr>
            </tbody>
          </table>


        </section>
      </div>
    `
})
export class LayersComponent {

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Layers';
    }
}
