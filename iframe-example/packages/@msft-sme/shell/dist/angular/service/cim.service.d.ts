import { CimConnection } from '../../core';
import { BatchService } from './batch.service';
import { NodeService } from './node.service';
export declare class CimService extends CimConnection {
    /**
     * Initializes a new instance of the CimService class.
     *
     * @param nodeService the NodeService class instance injected.
     * @param batchService the BatchService class instance injected.
     */
    constructor(nodeService: NodeService, batchService: BatchService);
}
