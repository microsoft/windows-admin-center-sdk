import { UserProfileManager } from '../../core';
import { GatewayService } from './gateway.service';
export declare class UserProfileService extends UserProfileManager {
    /**
     * Initializes a new instance of the UserProfileService class.
     *
     * @param gatewayService the gateway service.
     */
    constructor(gatewayService: GatewayService);
}
