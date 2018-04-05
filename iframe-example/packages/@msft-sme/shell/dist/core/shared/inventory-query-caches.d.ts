import { Observable } from 'rxjs';
import { AppContext } from '../data/app-context';
import { QueryCache } from '../data/query-cache';
import { ClusterInventory } from '../shared/cluster-inventory/cluster-inventory';
import { GatewayInventory } from '../shared/gateway-inventory/gateway-inventory';
import { GatewayInventoryDetail } from '../shared/gateway-inventory/gateway-inventory-detail';
import { ServerInventory } from '../shared/server-inventory/server-inventory';
import { ServerInventoryDetail } from '../shared/server-inventory/server-inventory-detail';
import { ToolInventory, ToolInventoryParams } from '../shared/tool-inventory/tool-inventory';
import { ToolInventoryCache } from '../shared/tool-inventory/tool-inventory-cache';
export interface InventoryQueryCachesParams {
    name?: string;
    retry?: number;
}
export interface InventoryQueryCachesOptions {
    serverCache?: {
        expiration?: number;
    };
    serverCombinedCache?: {
        expiration?: number;
    };
    gatewayCache?: {
        expiration?: number;
    };
    gatewayCombinedCache?: {
        expiration?: number;
    };
    clusterCache?: {
        expiration?: number;
    };
    toolCache?: {
        expiration?: number;
    };
}
export declare class InventoryQueryCaches {
    private appContext;
    private serverInventoryCache;
    private serverInventoryDetailCache;
    private gatewayInventoryCache;
    private gatewayInventoryDetailCache;
    private clusterInventoryCache;
    private serverInventoryCacheNodeName;
    private gatewayCached;
    private toolCacheQueue;
    serverCache: QueryCache<ServerInventory, InventoryQueryCachesParams>;
    serverCombinedCache: QueryCache<[ServerInventory, ServerInventoryDetail], InventoryQueryCachesParams>;
    gatewayCache: QueryCache<GatewayInventory, InventoryQueryCachesParams>;
    gatewayCombinedCache: QueryCache<[GatewayInventory, GatewayInventoryDetail], InventoryQueryCachesParams>;
    clusterCache: QueryCache<ClusterInventory, InventoryQueryCachesParams>;
    toolInventoryCache: ToolInventoryCache;
    constructor(appContext: AppContext, options?: InventoryQueryCachesOptions);
    /**
     * Query tool inventory and make the query to be sequential to hold consistency of inventory cache.
     *
     * @param params the parameters of tool inventory.
     */
    toolQuery(params: ToolInventoryParams): Observable<ToolInventory>;
    private createServerInventory(params);
    private createServerInventoryCombined(params);
    private createGatewayInventory(params);
    private createGatewayInventoryCombined(params);
    private createClusterInventory(params);
}
