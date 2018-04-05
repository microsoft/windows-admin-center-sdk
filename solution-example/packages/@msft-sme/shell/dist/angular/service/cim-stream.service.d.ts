import { CimStream } from '../../core';
import { AuthorizationService } from './authorization.service';
import { WebsocketStreamService } from './websocket-stream.service';
export declare class CimStreamService extends CimStream {
    /**
     * Initializes a new instance of the CimStreamService class.
     *
     * @param websocketStreamService the websocket stream class instance injected.
     * @param authorizationService the authorization manager service class instance injected.
     */
    constructor(websocketStreamService: WebsocketStreamService, authorizationService: AuthorizationService);
}
