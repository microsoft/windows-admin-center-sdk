import { Observable } from 'rxjs/Observable';
import { AuthorizationManager } from '../security/authorization-manager';
import { GatewayConnection } from './gateway-connection';
import { NodeConnection } from './node-connection';
export interface FileOptions {
    /**
     * Indicates that audit logging for this request should be made. Default is false.
     */
    logAudit?: boolean;
    /**
     * Indicates that telemetry logging for this request should be made. Default is false.
     */
    logTelemetry?: boolean;
}
export declare class FileTransfer {
    private nodeConnection;
    private gatewayConnection;
    private authorizationManager;
    private moduleName;
    /**
     * Downloads a blob of data
     *
     * @param blob the blob of data to download
     * @param fileName the name of the file for the user to download.
     */
    static downloadBlob(blob: Blob, fileName: string): void;
    /**
     * Initializes a new instance of the FileTransfer class.
     *
     * @param nodeConnection the NodeConnection class instance.
     * @param gatewayConnection the GatewayConnection class instance.
     * @param authorizationManager the AuthorizationManager class instance.
     */
    constructor(nodeConnection: NodeConnection, gatewayConnection: GatewayConnection, authorizationManager: AuthorizationManager);
    /**
     * The GET call to file transfer endpoint and manual download of stream
     *
     * @param nodeName the node to transfer the file from.
     * @param sourcePath the path of the remote file to transfer.
     * @param targetName the desired name for the downloaded file.
     * @param fileOptions the file options for the action.
     * @return Observable<Blob> the observable Blob object.
     */
    transferFile(nodeName: string, sourcePath: string, targetName: string, fileOptions?: FileOptions): Observable<Blob>;
    /**
     * Upload a file from fileObject.
     *
     * @param nodeName the node to upload the file to.
     * @param path the file path to store on the target node.
     * @param fileObject the file object created on the UI.
     * @param fileOptions the file options for the action.
     * @return Observable<any> the observable object.
     */
    uploadFile(nodeName: string, path: string, fileObject: File, fileOptions?: FileOptions): Observable<any>;
    /**
     * Gets the name of current shell or module.
     */
    private readonly nameOfModule;
}
