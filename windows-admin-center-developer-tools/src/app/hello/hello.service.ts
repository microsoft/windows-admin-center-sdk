import { Injectable } from '@angular/core';
import { AppContextService, HttpService } from '@msft-sme/shell/angular';
import { Cim, Http, PowerShell, PowerShellSession } from '@msft-sme/shell/core';
import { Observable } from 'rxjs';
import { PowerShellScripts } from '../../generated/powerShell-scripts';
import { Strings } from '../../generated/strings';

@Injectable()
export class HelloService {
    public static psKey = 'sme.seed';
    private psSession: PowerShellSession;

    constructor(private appContextService: AppContextService, private http: HttpService) {
    }

    /**
     *  This method illustrates how to execute a CIM / WMI call within the context of SME / Honolulu.
     */
    public getProcesses(): Observable<any[]> {
        return this.appContextService.cim.getInstanceMultiple(
            this.appContextService.activeConnection.nodeName,
            Cim.namespace.managementTools2,
            Cim.cimClass.msftMTProcesses)
            .map((response: any) => {
                let items: any[] = [];
                for (let item of response.value) {
                    items.push(item.properties);
                }

                return items;
            });
    }

    /**
     *  This method illustrates how to execute a PowerShell script within the context of SME / Honolulu.
     */
    public getService(session: PowerShellSession, serviceName: string): Observable<any[]> {
        let command = PowerShell.createScript(PowerShellScripts.Get_Service, { name: serviceName });
        return this.appContextService.powerShell.run(session, command)
            .map(response => {
                return response && response.results && response.results[0];
            });
    }

    public getGatewayRestResponse(): Observable<string> {
        return this.http.get('http://localhost:6516/api/nodes/matwils-2016.redmond.corp.microsoft.com/features/RedmondWeather')
        .map((response) => response.response.query.results);
    }
}
