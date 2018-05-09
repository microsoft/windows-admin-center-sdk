import { Injectable } from '@angular/core';
import { AppContextService, HttpService } from '@microsoft/windows-admin-center-sdk/angular';
import { Cim, Http, PowerShell, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { PowerShellScripts } from '../../generated/powerShell-scripts';
import { Strings } from '../../generated/strings';

@Injectable()
export class ContainerService {
    public static psKey = 'sme.seed';
    private psSession: PowerShellSession;

    constructor(private appContextService: AppContextService, private http: HttpService) {
    }

    public getContainers(session: PowerShellSession): Observable<any[]> {
        let command = PowerShell.createScript(PowerShellScripts.Get_Containers);
        return this.appContextService.powerShell.run(session, command)
            .map((response: any) => {
                let items: any[] = [];
                for (let item of response.results) {
                    let clean = item.split('$');
                    let container = {
                        image: clean[0].trim(),
                        containerId: clean[1].trim(),
                        status: clean[2].trim()
                    }
                    items.push(container);
                }
                return items;
            });
    }

    public stopContainer(session: PowerShellSession, containerId: string): Observable<any[]> {
        let command = PowerShell.createScript(PowerShellScripts.Stop_Container, { containerId: containerId });
        return this.appContextService.powerShell.run(session, command);
    }

    public getService(session: PowerShellSession, serviceName: string): Observable<any[]> {
        let command = PowerShell.createScript(PowerShellScripts.Get_Service, { name: serviceName });
        return this.appContextService.powerShell.run(session, command)
            .map(response => {
                return response.results;
                // return response && response.results && response.results[0];
            });
    }

    public startContainer(session: PowerShellSession, imageName: string): Observable<any[]> {
        let command = PowerShell.createScript(PowerShellScripts.Start_Container, { name: imageName });
        return this.appContextService.powerShell.run(session, command);
    }
}