import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService, DialogService } from '../../../../../../angular';
import { AccessService } from '../access.service';
import { SecurityGroupsBaseComponent } from './securitygroups-base.component';
export declare class UsersSecurityGroupsComponent extends SecurityGroupsBaseComponent {
    constructor(router: Router, appContextService: AppContextService, accessService: AccessService, dialogService: DialogService, activatedRoute: ActivatedRoute);
    onActionEnded(event: any): void;
}
