import { Observable } from 'rxjs/Observable';
import { AppContextService } from '../../../../../angular';
import { QueryCache } from '../../../../../core';
export declare class AccessService {
    private appContextService;
    usersQueryCache: QueryCache<any, {}>;
    adminsQueryCache: QueryCache<any, {}>;
    constructor(appContextService: AppContextService);
    addSecurityGroup(name: string, type: string, section: string): Observable<boolean>;
    deleteSecurityGroup(name: string, type: string, section: string): Observable<boolean>;
    private getUsersSecurityGroups();
    private getAdminsSecurityGroups();
}
