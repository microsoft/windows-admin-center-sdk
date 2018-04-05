import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-themes',
    template: `
      <div class="sme-layout-absolute sme-position-inset-none sme-documentation">
          <h1>Themes</h1>
          <section>
              <p>There are 2 themes in SME:</p>
              <ul>
                  <li>light</li>
                  <li>dark</li>
              </ul>
              <p>These themes are automatically applied base on the users settings to the body element in each module.</p>
              <p>Theming in SME is more extensive than just changing color. It can include color, font, icons, spacing and more.</p>
          </section>

          <h2>Theme Classes</h2>
          <section>
              <p>The class for the current theme is always applied to the 'body' element for you. However there are some cases where a specific theme need to be applied. When nessecary you can use the following classes:
              </p>
              <table>
                  <thead>
                      <tr>
                          <th>Class</th>
                          <th>Effect</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>.sme-theme-light</td>
                          <td>Applies the light theme</td>
                      </tr>
                      <tr>
                          <td>.sme-theme-dark</td>
                          <td>Applies the light theme</td>
                      </tr>
                  </tbody>
              </table>
          </section>

          <h2>Custom Themed Components</h2>
          <section>
              <p>There are several ways to apply css to your components based on the current theme. You must account for the target them and nested theming structures. Examples are done for the dark theme.</p>

              <h3>CSS</h3>
              <p>In CSS, simply prepend the theme to the selector </p>
              <code>.sme-theme-dark .my-class, 
      .sme-theme-light .sme-theme-dark .my-class {{'{'}} 
          /* Themed Style*/
      }</code>

              <h3>SCSS</h3>
              <p>In SCSS, you can use the ancestor selector syntax. </p>
              <code>.my-class {{'{'}}
          .sme-theme-dark &,
          .sme-theme-light .sme-theme-dark & {{'{'}}
              /* Themed Style*/
          }
      }</code>

              <h3>Shadow DOM UX Frameworks</h3>
              <p>Some frameworks that utilize shadow dom for components (such as Angular 2) enable a special syntax to style components based on classes outside the current component</p>
              <p>This syntax will be the same as the two methods listed above, however the :host-context selector should be used instead of the raw theme class.</p>
              <p>The example below uses the host-context selector for the css of a component</p>
              <code>:host-context(.sme-theme-dark)</code>
              <code>:host-context(.sme-theme-dark) .my-class, 
      :host-context(.sme-theme-light .sme-theme-dark) .my-class {{'{'}} 
          /* Themed Style*/
      }</code>
          </section>
      </div>
    `
})
export class ThemesComponent {

    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'Themes';
    }
}
