import { AppContextService, HttpService } from '@msft-sme/shell/angular';
import { PowerShellSession } from '@msft-sme/shell/core';
import { Observable } from 'rxjs';
export declare class HelloService {
    private appContextService;
    private http;
    static psKey: string;
    private psSession;
    constructor(appContextService: AppContextService, http: HttpService);
    /**
     *  This method illustrates how to execute a CIM / WMI call within the context of SME / Honolulu.
     */
    getProcesses(): Observable<any[]>;
    /**
     *  This method illustrates how to execute a PowerShell script within the context of SME / Honolulu.
     */
    getService(session: PowerShellSession, serviceName: string): Observable<any[]>;
    getGatewayRestResponse(): Observable<string>;
}
