import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppContextService } from '@msft-sme/shell/angular';
import { Logging, LogLevel } from '@msft-sme/shell/core';
import { AjaxError } from 'rxjs/observable/dom/AjaxObservable';
import { Subscription } from 'rxjs/Subscription';
import { PowerShellScripts } from '../../generated/powerShell-scripts';
import { Strings } from '../../generated/strings';

@Component({
    selector: 'sme-hello',
    templateUrl: './hello.component.html'
})
export class HelloComponent implements OnInit, OnDestroy {
    public loading = true;
    public errorMessage: string;
    public strings = MsftSme.resourcesStrings<Strings>();

    constructor(private appContextService: AppContextService) {
        //
    }

    /**
     * When module navigation is initiated, this is called, and is required of all components to allow browser back and forward
     * functionality.  This is also required of any component that modifies the URL in any way or shape.
     */
    // public static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string {        
    //     Logging.log({
    //         source: 'sme-hello',
    //         level: LogLevel.Verbose,
    //         message: 'navigationTitle: {0}'.format(snapshot.pathFromRoot.map(x => x.url.join('/')).join('/'))
    //     });

    //     return MsftSme.resourcesStrings<Strings>().HelloWorld.title;
    // }

    public ngOnInit(): void {
        // set up any initialization logic here.

        // this.appContextService.
    }
    public ngOnDestroy() {
        // cleanup any calls here.
    }
}
