import { NodeConnection } from '../../core';
import { AuthorizationService } from './authorization.service';
import { GatewayService } from './gateway.service';
export declare class NodeService extends NodeConnection {
    /**
     * Initializes a new instance of the NodeService class.
     *
     * @param gatewayService the gateway service.
     * @param authorizationService the authorization service.
     */
    constructor(gatewayService: GatewayService, authorizationService: AuthorizationService);
}
