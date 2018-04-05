import { Observable } from 'rxjs';
import { AppContextService, DialogService } from '../../../../../../angular';
import { AccessService } from '../access.service';
import { SecurityGroupsData } from '../model/securitygroups-data';
import { SecurityGroupActionBase } from './secgroup-action.base';
export declare class AddSecurityGroupAction extends SecurityGroupActionBase<SecurityGroupsData> {
    protected appContextService: AppContextService;
    private accessService;
    protected dialogService: DialogService;
    section: string;
    text: string;
    iconClass: string;
    constructor(appContextService: AppContextService, accessService: AccessService, dialogService: DialogService, section: string);
    protected onExecute(target: SecurityGroupsData): Observable<SecurityGroupsData>;
    protected calculateEnabled(target: SecurityGroupsData): boolean;
}
