import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-guided-panel-example',
    template: `
      <div class="tool-container sme-arrange-stack-v">
          <sme-guided-panel #panel firstPaneId="root">
              <sme-guided-pane #pane paneId="root">
                  <div>root content</div>
                  <button (click)="panel.activate('pane1')">Activate Pane 1</button>
                  <button (click)="panel.activate('pane2')">Activate Pane 2</button>
              </sme-guided-pane>
              <sme-guided-pane #pane paneId="pane1">
                  <div>I am pane 1</div>
                  <button (click)="panel.activate('root')">Activate Root Pane</button>
                  <button (click)="panel.activate('pane2')">Activate Pane 2</button>
              </sme-guided-pane>
              <sme-guided-pane #pane paneId="pane2">
                  <div>I am pane 2</div>
                  <button (click)="panel.activate('root')">Activate Root Pane</button>
                  <button (click)="panel.activate('pane1')">Activate Pane 1</button>
              </sme-guided-pane>
          </sme-guided-panel>
      </div>
    `
})
export class GuidedPanelExampleComponent {
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-guided-panel';
    }
}