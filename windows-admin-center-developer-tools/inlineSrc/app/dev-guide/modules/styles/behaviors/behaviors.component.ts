import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-behaviors',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-documentation">
          <h1>Behaviors</h1>
          <section>
              <p>Behviors are special sets of classes that require more than one element. Each behaviour consists of at least one trigger and at least one target.</p>
              <p>Behviors enable functionailty that would otherwise require complex css or custom javascript. Behaviors are also contextually aware and may change according to the type of screen being used. For example, a hover trigger will have different effects
                  on a touchscreen vs a regular monitor.
              </p>

          </section>

          <h2>Behavior Classes</h2>
          <section>
              <p>The trigger class of a behaviour must be appliead to a parent element of a trigger and the target class must be applied to a child element to apply the behaviour</p>
              <table>
                  <thead>
                      <tr>
                          <th>Trigger Class</th>
                          <th>Target Class</th>
                          <th>Effect</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>.sme-behavior-hover-trigger</td>
                          <td>
                              <div>.sme-behavior-hover-target-show</div>
                              <div>.sme-behavior-hover-target-hide</div>
                          </td>
                          <td>
                              <div>Shows the target only when the trigger element is hovered (or focused)</div>
                              <div>Hides the target only when the trigger element is hovered (or focused)</div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </section>
      </div>
    `
})
export class BehaviorsComponent {
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Behaviors';
    }
}
