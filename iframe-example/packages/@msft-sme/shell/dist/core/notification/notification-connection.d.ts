import { Observable } from 'rxjs';
import { Rpc } from '../rpc/rpc';
import { ClientNotification } from './client-notification';
import { NotificationManager } from './notification-manager';
import { NotificationState } from './notification-state';
/**
 * Notification connection class.
 */
export declare class NotificationConnection {
    private rpc;
    notificationManager: NotificationManager;
    /**
     * Initializes a new instance of the NotificationConnection class.
     *
     * @param rpc the RPC object.
     */
    constructor(rpc: Rpc);
    /**
     * Send a client notification either directly to NotificationManager or through RPC.
     *
     * @param nodeName the node name.
     * @param notification the client notification object.
     */
    notify(nodeName: string, notification: ClientNotification): Observable<any>;
    /**
     * Send an alert bar based client notification either directly to NotificationManager or through RPC.
     * (use notify() interface to display on the notification center)
     *
     * @param nodeName the node name of alert source.
     * @param state the notification state.
     * @param message the message of alert bar.
     * @param title the title of alert bar.
     */
    alert(nodeName: string, state: NotificationState, message: string, title?: string): Observable<any>;
}
