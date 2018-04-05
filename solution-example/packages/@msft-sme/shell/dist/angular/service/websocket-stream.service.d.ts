import { WebsocketStream } from '../../core';
import { GatewayService } from './gateway.service';
export declare class WebsocketStreamService extends WebsocketStream {
    gatewayService: GatewayService;
    /**
     * Initializes a new instance of the WebsocketStreamService class.
     *
     * @param gatewayService the gateway service object.
     */
    constructor(gatewayService: GatewayService);
}
