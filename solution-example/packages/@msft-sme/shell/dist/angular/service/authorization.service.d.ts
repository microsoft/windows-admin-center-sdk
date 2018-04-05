import { AjaxError } from 'rxjs';
import { AuthorizationManager, HttpStatusCode, NodeAuthorizationHandler } from '../../core';
import { RpcService } from './rpc.service';
export declare class AuthorizationService extends AuthorizationManager {
    static authorize: NodeAuthorizationHandler;
    private isShell;
    constructor(rpc: RpcService);
    canHandleAjaxFailure(code: HttpStatusCode, error: AjaxError): boolean;
}
