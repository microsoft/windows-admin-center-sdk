import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppContextService, AuthorizationService, NavigationService } from '@msft-sme/shell/angular';
import { ContextMenu } from 'primeng/primeng';
import { Observable } from 'rxjs';

@Component({
    selector: 'sme-root',
    template: `
      <sme-styles>
        <div class="stretch-absolute">
          <router-outlet></router-outlet>
        </div>
      </sme-styles>
    `
})
export class AppComponent implements OnDestroy, OnInit {
    constructor(
        private appContext: AppContextService,  private navigationService: NavigationService) {
    }

    public ngOnInit(): void {
        this.appContext.ngInit({ navigationService: this.navigationService });
    }

    public ngOnDestroy() {
        this.appContext.ngDestroy();
    }
}
