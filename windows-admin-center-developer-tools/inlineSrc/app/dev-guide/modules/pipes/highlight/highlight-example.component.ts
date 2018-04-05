import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';

@Component({
    selector: 'sme-ng2-controls-highlight-example',
    template: `
      <div class="p-xxs tool-container">
          <div>
              <label>Input:</label>
              <input type="text" [(ngModel)]="text" />
          </div>
          <div class="m-t-xxs">
              <label>Search:</label>
              <input type="text" [(ngModel)]="search" />
          </div>
          <div class="m-t-xxs">
              <label>Highlight Class:</label>
              <input type="text" [(ngModel)]="class" />
          </div>

          <div class="m-t-xxs" style="font-weight: bold">Default Output:</div>
          <div>{{ text | smeHighlight }}</div>

          <div class="m-t-xxs" style="font-weight: bold">Search Output:</div>
          <div [innerHTML]="text | smeHighlight : search"></div>

          <div class="m-t-xxs" style="font-weight: bold">Custom Class Output:</div>
          <div [innerHTML]="text | smeHighlight : search : class"></div>
      </div>
    `
})
export class HighlightExampleComponent {
    public text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere libero et quam dapibus facilisis. 
Phasellus scelerisque viverra sapien, vel fermentum elit tristique quis. Ut eu convallis velit. 
Donec tristique mauris sit amet quam ultrices dignissim. Nulla egestas magna vitae viverra consequat. 
Sed interdum mattis pulvinar. Proin elementum in quam sit amet interdum. Sed tristique metus iaculis sodales suscipit. 
Vestibulum metus justo, vehicula egestas dapibus quis, pharetra id neque.

Mauris elementum odio non massa blandit, quis ullamcorper lectus pretium. 
Donec varius, leo ac viverra sollicitudin, diam urna feugiat mi, non placerat sapien elit at metus. 
Ut euismod tempus tellus, sit amet placerat erat sagittis commodo. 
Sed sagittis pellentesque felis, non pellentesque ligula fringilla aliquam. Nam laoreet pharetra dui eget placerat. 
Pellentesque vel dolor turpis. Nulla vel interdum ipsum. In eu tincidunt velit, vitae accumsan risus. 
Duis et nibh eleifend, auctor enim laoreet, venenatis felis. In felis ipsum, laoreet eget scelerisque eget, lacinia at sem. 
Cras quis lacus vitae turpis congue semper in eu orci. Nulla tortor mauris, dictum ac arcu sed, dapibus tristique urna. 
Pellentesque bibendum dui aliquam tellus viverra mattis.
`;
    public search = 'qu';
    public class = 'p-l-xxxs p-r-xxxs border-all';
    
    public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {
        return 'smeHighlight';
    }
}