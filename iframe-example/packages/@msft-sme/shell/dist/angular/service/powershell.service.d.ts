import { PowerShellConnection } from '../../core';
import { BatchService } from './batch.service';
import { LifetimeService } from './lifetime.service';
import { NodeService } from './node.service';
export declare class PowerShellService extends PowerShellConnection {
    /**
     * Initializes a new instance of the PowerShellService class.
     *
     * @param lifetimeService the lifetimeService class instance injected.
     * @param nodeService the NodeService class instance injected.
     * @param batchService the BatchService class instance injected.
     */
    constructor(lifetimeService: LifetimeService, nodeService: NodeService, batchService: BatchService);
}
