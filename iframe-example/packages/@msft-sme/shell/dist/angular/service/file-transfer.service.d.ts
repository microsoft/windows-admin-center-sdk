import { FileTransfer } from '../../core';
import { AuthorizationService } from './authorization.service';
import { GatewayService } from './gateway.service';
import { NodeService } from './node.service';
export declare class FileTransferService extends FileTransfer {
    /**
     * Initializes a new instance of the FileTransferService class.
     *
     * @param nodeService the node service.
     * @param gatewayService the gateway service.
     * @param authorizationService the authorization service.
     */
    constructor(nodeService: NodeService, gatewayService: GatewayService, authorizationService: AuthorizationService);
}
