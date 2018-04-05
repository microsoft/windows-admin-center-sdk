import { ActiveConnection } from '../../core';
import { CimService } from './cim.service';
import { ConnectionService } from './connection.service';
import { FileTransferService } from './file-transfer.service';
import { PowerShellService } from './powershell.service';
export declare class ActiveConnectionService extends ActiveConnection {
    /**
     * Initializes a new instance of the ActiveConnectionService class.
     *
     * @param connectionService the connection service.
     */
    constructor(connectionService: ConnectionService, cimService: CimService, powerShellService: PowerShellService, fileTransferService: FileTransferService);
}
