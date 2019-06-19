import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';
import { MyServer } from './service-info';

@Component({
    selector: 'sme-dev-guide-powershell-example',
    templateUrl: './powershell-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Powershell Example'
})
export class PowershellExampleComponent {
    public displayCode = true;
    public displayCodeButtonContent = 'Hide Code';
    public serviceDefinition: MyServer;

    constructor() {
        this.serviceDefinition = {
            machineName: 'MyMachine',
            displayName: 'Windows Remote Management (WS-Management)',
            serviceHandle: 'SafeServiceHandle',
            serviceType: 'Win32OwnProcess',
            startType: 'Automatic',
            status: 'Running'
        };
     }

    public toggleCode() {
        this.displayCode = !this.displayCode;

        if ( !this.displayCode ) {
            this.displayCodeButtonContent = 'Display Code';
        } else {
            this.displayCodeButtonContent = 'Hide Code';
        }
    }
}
