import { Observable } from 'rxjs';
import { Connection } from './connection';
import { ConnectionManager } from './connection-manager';
export declare class ConnectionTagManager {
    private connectionManager;
    /**
     * mapping of tags to a set of connection ids.
     */
    private connectionIdsByTag;
    /**
     * Creates a new instance of the ConnectionTagManager
     * @param connectionManager the connection manager
     */
    constructor(connectionManager: ConnectionManager);
    /**
     * Adds/Removes respective sets of tags to/from a set of connections and returns the result of the change
     * @param connections the connections to add/remove tags to/from
     * @param tagsToAdd the tags to add
     * @param tagsToRemove the tags to remove
     * @returns an Observable for the result of saving the tags on the connections
     */
    addRemoveTags(connections: Connection[], tagsToAdd: string[], tagsToRemove: string[]): Observable<any>;
    /**
     * Suggests tags for the user based on some input text
     * @param text The starting text to generate suggestions for
     */
    getTagSuggestions(text?: string): Observable<string[]>;
    /**
     * Retrieves a unique list of tags from a list of connections
     * @param connections the connections to get tags from
     */
    getUniqueTagsFromConnections(connections: Connection[]): string[];
    /**
     * Saves the connections and rollsback to the old tags if saving the connection fails.
     * Note: this only rollsback the failed connection changes, not all connection changes.
     * @param connections
     * @param oldTags
     */
    private saveConnectionsWithTagRollback(connections, oldTags);
    /**
     * listens to connection changes and adjusts the tag to connectionId mapping acordingly
     */
    private monitorConnectionChanges();
    /**
     * Processes the tags in a list of connections
     * @param connections the connections
     * @param processor the method to process a tag for a given connection id
     */
    private processConnectionTags(connections, processor);
    /**
     * Adds a mapping between a connection id and a tag
     * @param connectionId the connection id
     * @param tag the tag
     */
    private addConnectionIdToTagMapping(connectionId, tag);
    /**
     * Removes a mapping between a connection id and a tag
     * @param connectionId the connection id
     * @param tag the tag
     */
    private removeConnectionIdToTagMapping(connectionId, tag);
}
