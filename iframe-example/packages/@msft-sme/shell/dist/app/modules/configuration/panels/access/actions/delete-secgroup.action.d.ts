import { Observable } from 'rxjs';
import { AppContextService, DialogService } from '../../../../../../angular';
import { AccessService } from '../access.service';
import { SecurityGroupsData } from '../model/securitygroups-data';
import { SecurityGroupActionBase } from './secgroup-action.base';
export declare class DeleteSecurityGroupAction extends SecurityGroupActionBase<SecurityGroupsData> {
    protected appContextService: AppContextService;
    private accessService;
    protected dialogService: DialogService;
    section: string;
    private confirmationDialogId;
    text: string;
    iconClass: string;
    constructor(appContextService: AppContextService, accessService: AccessService, dialogService: DialogService, section: string);
    protected onExecute(target: SecurityGroupsData): Observable<any>;
    protected calculateEnabled(target: SecurityGroupsData): boolean;
    private showConfirmationDialog(target);
}
