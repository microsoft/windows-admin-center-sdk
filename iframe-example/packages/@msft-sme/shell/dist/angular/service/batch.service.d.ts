import { BatchConnection } from '../../core';
import { AuthorizationService } from './authorization.service';
import { GatewayService } from './gateway.service';
export declare class BatchService extends BatchConnection {
    /**
     * Initializes a new instance of the BatchService class.
     *
     * @param gatewayService the gateway service.
     * @param authorizationService the authorization service.
     */
    constructor(gatewayService: GatewayService, authorizationService: AuthorizationService);
}
