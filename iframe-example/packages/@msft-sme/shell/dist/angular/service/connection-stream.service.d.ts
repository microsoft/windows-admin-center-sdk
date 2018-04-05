import { ConnectionStream } from '../../core';
import { ConnectionService } from './connection.service';
import { GatewayService } from './gateway.service';
import { PowerShellService } from './powershell.service';
import { RpcService } from './rpc.service';
export declare class ConnectionStreamService extends ConnectionStream {
    constructor(rpc: RpcService, connectionService: ConnectionService, gatewayService: GatewayService, powerShellService: PowerShellService);
}
