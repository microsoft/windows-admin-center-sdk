import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-icons-example',
    template: `
      <div class="tool-container">
          <h2>Layerd Status Icons</h2>
          <p>sme-status-icon status="info"</p>
          <div>
              <sme-status-icon status="info" size="16px"></sme-status-icon>
              <sme-status-icon status="info" size="20px"></sme-status-icon>
              <sme-status-icon status="info" size="24px"></sme-status-icon>
              <sme-status-icon status="info" size="32px"></sme-status-icon>
              <sme-status-icon status="info" size="48px"></sme-status-icon>
              <sme-status-icon status="info" size="64px"></sme-status-icon>
          </div>
          <p>sme-status-icon status="warning"</p>
          <div>
              <sme-status-icon status="warning" size="16px"></sme-status-icon>
              <sme-status-icon status="warning" size="20px"></sme-status-icon>
              <sme-status-icon status="warning" size="24px"></sme-status-icon>
              <sme-status-icon status="warning" size="32px"></sme-status-icon>
              <sme-status-icon status="warning" size="48px"></sme-status-icon>
              <sme-status-icon status="warning" size="64px"></sme-status-icon>
          </div>
          <p>sme-status-icon status="error"</p>
          <div>
              <sme-status-icon status="error" size="16px"></sme-status-icon>
              <sme-status-icon status="error" size="20px"></sme-status-icon>
              <sme-status-icon status="error" size="24px"></sme-status-icon>
              <sme-status-icon status="error" size="32px"></sme-status-icon>
              <sme-status-icon status="error" size="48px"></sme-status-icon>
              <sme-status-icon status="error" size="64px"></sme-status-icon>
          </div>
          <p>sme-status-icon status="success"</p>
          <div>
              <sme-status-icon status="success" size="16px"></sme-status-icon>
              <sme-status-icon status="success" size="20px"></sme-status-icon>
              <sme-status-icon status="success" size="24px"></sme-status-icon>
              <sme-status-icon status="success" size="32px"></sme-status-icon>
              <sme-status-icon status="success" size="48px"></sme-status-icon>
              <sme-status-icon status="success" size="64px"></sme-status-icon>
          </div>
          <h2>Custom Layered Icons</h2>
          <div>
              <sme-layered-icon size="64px">
                  <sme-icon-layer size="48px" class="sme-icon sme-icon-contact"></sme-icon-layer>
                  <sme-icon-layer size="32px" top="50%" left="40%" class="sme-icon sme-icon-statusCircleOuter"></sme-icon-layer>
                  <sme-icon-layer size="32px" top="50%" left="40%" class="sme-icon color-light sme-icon-statusCircleQuestionMark"></sme-icon-layer>
              </sme-layered-icon>
              <sme-layered-icon size="64px">
                  <sme-icon-layer size="32px" top="12px" class="sme-icon sme-icon-marketDown"></sme-icon-layer>
                  <sme-icon-layer size="32px" top="50%" class="sme-icon sme-icon-market"></sme-icon-layer>
                  <sme-icon-layer size="32px" top="12px" left="50%" class="sme-icon sme-icon-marketDown" style="transform: scaleX(-1)"></sme-icon-layer>
                  <sme-icon-layer size="32px" top="50%" left="50%" class="sme-icon sme-icon-market" style="transform: scaleX(-1)"></sme-icon-layer>
              </sme-layered-icon>
              <sme-layered-icon size="64px">
                  <sme-icon-layer class="sme-icon sme-icon-localAdmin"></sme-icon-layer>
                  <sme-icon-layer size="32px" top="24px" left="33px" class="sme-icon sme-icon-statusTriangleExclamation" style="color: red"></sme-icon-layer>
              </sme-layered-icon>
          </div>
      </div>
    `
})
export class LayeredIconsExampleComponent {
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'sme-layered-icon';
    } }