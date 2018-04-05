import { Observable } from 'rxjs';
import { ConnectionChangeType } from './connection-manager';
var ConnectionTagManager = /** @class */ (function () {
    /**
     * Creates a new instance of the ConnectionTagManager
     * @param connectionManager the connection manager
     */
    function ConnectionTagManager(connectionManager) {
        this.connectionManager = connectionManager;
        /**
         * mapping of tags to a set of connection ids.
         */
        this.connectionIdsByTag = {};
        this.monitorConnectionChanges();
    }
    /**
     * Adds/Removes respective sets of tags to/from a set of connections and returns the result of the change
     * @param connections the connections to add/remove tags to/from
     * @param tagsToAdd the tags to add
     * @param tagsToRemove the tags to remove
     * @returns an Observable for the result of saving the tags on the connections
     */
    ConnectionTagManager.prototype.addRemoveTags = function (connections, tagsToAdd, tagsToRemove) {
        var _this = this;
        // ensure all tags are lowercase
        tagsToAdd = tagsToAdd.map(function (tag) { return tag.toLocaleLowerCase(); });
        tagsToRemove = tagsToRemove.map(function (tag) { return tag.toLocaleLowerCase(); });
        // preserve old tags in case save fails.
        var oldTags = {};
        // process each connection to add the new tags
        connections.forEach(function (connection) {
            /** PRESERVE TAGS */
            oldTags[connection.id] = connection.tags ? connection.tags.slice() : [];
            /** ADD TAGS */
            // push the new tags to the tag list
            var cTags = connection.tags || [];
            cTags.push.apply(cTags, tagsToAdd);
            // ensure the combined list has only unique values
            connection.tags = MsftSme.unique(cTags);
            // for each new tag, add it to the connection by tag mapping
            tagsToAdd.forEach(function (tag) { return _this.addConnectionIdToTagMapping(connection.id, tag); });
            /** REMOVE TAGS */
            // if there are no tags on the connection, then return
            if (!connection.tags || connection.tags.length === 0) {
                return;
            }
            // process each tag to remove
            tagsToRemove.forEach(function (tag) {
                // remove the tag from the connection tags
                MsftSme.remove(connection.tags, tag);
                // remove the connection id from the tag mapping
                _this.removeConnectionIdToTagMapping(connection.id, tag);
            });
            /** SORT TAGS */
            connection.tags = connection.tags.sort();
        });
        // save the changes to the connections with rollback if any connection fails
        return this.saveConnectionsWithTagRollback(connections, oldTags);
    };
    /**
     * Suggests tags for the user based on some input text
     * @param text The starting text to generate suggestions for
     */
    ConnectionTagManager.prototype.getTagSuggestions = function (text) {
        // NOTE: For now, we are faking this observable, but we want to return an observable so that 
        // we can easily switch to suggestions that are generated through some service later
        // start with all tags currently being used
        var allSuggestions = Object.keys(this.connectionIdsByTag);
        if (MsftSme.isNullOrWhiteSpace(text)) {
            return Observable.of(allSuggestions);
        }
        // filter all suggestions to only those that match our text
        var suggestions = [];
        allSuggestions.forEach(function (suggestion) {
            if (suggestion === text) {
                // exact matches always come as the first suggestion
                suggestions.unshift(suggestion);
            }
            else if (suggestion.startsWith(text)) {
                // startsWith matches are inserted in the order they fall naturally.
                suggestions.push(suggestion);
            }
        });
        return Observable.of(suggestions);
    };
    /**
     * Retrieves a unique list of tags from a list of connections
     * @param connections the connections to get tags from
     */
    ConnectionTagManager.prototype.getUniqueTagsFromConnections = function (connections) {
        var tags = MsftSme.mapMany(connections, function (connection) { return connection.tags || []; });
        return MsftSme.unique(tags);
    };
    /**
     * Saves the connections and rollsback to the old tags if saving the connection fails.
     * Note: this only rollsback the failed connection changes, not all connection changes.
     * @param connections
     * @param oldTags
     */
    ConnectionTagManager.prototype.saveConnectionsWithTagRollback = function (connections, oldTags) {
        // save the changes to the connections
        return this.connectionManager.saveConnections(connections)
            .do(function (result) {
            if (result && Array.isArray(result.errors)) {
                result.errors.forEach(function (error) {
                    // for each error, rollback the tag change in the connection that failed
                    var connection = connections.find(function (c) { return c.id === error.connection.id; });
                    if (!MsftSme.isNullOrUndefined(connection)) {
                        connection.tags = oldTags[connection.id];
                    }
                });
            }
        });
    };
    /**
     * listens to connection changes and adjusts the tag to connectionId mapping acordingly
     */
    ConnectionTagManager.prototype.monitorConnectionChanges = function () {
        var _this = this;
        this.connectionManager.connectionsChanged.subscribe(function (event) {
            switch (event.type) {
                case ConnectionChangeType.Initialized: {
                    // connection list was initialized, clear tag list and repopulate
                    _this.connectionIdsByTag = {};
                    _this.processConnectionTags(_this.connectionManager.connections, function (id, tag) { return _this.addConnectionIdToTagMapping(id, tag); });
                    break;
                }
                case ConnectionChangeType.Added: {
                    _this.processConnectionTags([event.connection], function (id, tag) { return _this.addConnectionIdToTagMapping(id, tag); });
                    break;
                }
                case ConnectionChangeType.Removed: {
                    _this.processConnectionTags([event.connection], function (id, tag) { return _this.removeConnectionIdToTagMapping(id, tag); });
                    break;
                }
                default: break;
            }
        });
    };
    /**
     * Processes the tags in a list of connections
     * @param connections the connections
     * @param processor the method to process a tag for a given connection id
     */
    ConnectionTagManager.prototype.processConnectionTags = function (connections, processor) {
        connections.forEach(function (c) {
            // ignore connections with no tags
            if (!c.tags || c.tags.length === 0) {
                return;
            }
            // process connection tags
            c.tags.forEach(function (tag) { return processor(c.id, tag); });
        });
    };
    /**
     * Adds a mapping between a connection id and a tag
     * @param connectionId the connection id
     * @param tag the tag
     */
    ConnectionTagManager.prototype.addConnectionIdToTagMapping = function (connectionId, tag) {
        if (MsftSme.isNullOrUndefined(this.connectionIdsByTag[tag])) {
            this.connectionIdsByTag[tag] = new Set();
        }
        this.connectionIdsByTag[tag].add(connectionId);
    };
    /**
     * Removes a mapping between a connection id and a tag
     * @param connectionId the connection id
     * @param tag the tag
     */
    ConnectionTagManager.prototype.removeConnectionIdToTagMapping = function (connectionId, tag) {
        if (!MsftSme.isNullOrUndefined(this.connectionIdsByTag[tag])) {
            this.connectionIdsByTag[tag].delete(connectionId);
        }
    };
    return ConnectionTagManager;
}());
export { ConnectionTagManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvY29ubmVjdGlvbi10YWctbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUEwQixNQUFNLE1BQU0sQ0FBQztBQUsxRCxPQUFPLEVBQTBCLG9CQUFvQixFQUFxQixNQUFNLHNCQUFzQixDQUFDO0FBRXZHO0lBTUk7OztPQUdHO0lBQ0gsOEJBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBVHhEOztXQUVHO1FBQ0ssdUJBQWtCLEdBQW1DLEVBQUUsQ0FBQztRQU81RCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksNENBQWEsR0FBcEIsVUFBcUIsV0FBeUIsRUFBRSxTQUFtQixFQUFFLFlBQXNCO1FBQTNGLGlCQTRDQztRQTNDRyxnQ0FBZ0M7UUFDaEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzFELFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztRQUVoRSx3Q0FBd0M7UUFDeEMsSUFBSSxPQUFPLEdBQWdDLEVBQUUsQ0FBQztRQUU5Qyw4Q0FBOEM7UUFDOUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7WUFDMUIsb0JBQW9CO1lBQ3BCLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUssVUFBVSxDQUFDLElBQUksU0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRXJFLGVBQWU7WUFDZixvQ0FBb0M7WUFDcEMsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbEMsS0FBSyxDQUFDLElBQUksT0FBVixLQUFLLEVBQVMsU0FBUyxFQUFFO1lBRXpCLGtEQUFrRDtZQUNsRCxVQUFVLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEMsNERBQTREO1lBQzVELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsMkJBQTJCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO1lBRS9FLGtCQUFrQjtZQUNsQixzREFBc0Q7WUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCw2QkFBNkI7WUFDN0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ3BCLDBDQUEwQztnQkFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxnREFBZ0Q7Z0JBQ2hELEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1lBRUgsZ0JBQWdCO1lBQ2hCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILDRFQUE0RTtRQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0RBQWlCLEdBQXhCLFVBQXlCLElBQWE7UUFDbEMsNkZBQTZGO1FBQzdGLG9GQUFvRjtRQUVwRiwyQ0FBMkM7UUFDM0MsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUUxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCwyREFBMkQ7UUFDM0QsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBQy9CLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixvREFBb0Q7Z0JBQ3BELFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsb0VBQW9FO2dCQUNwRSxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSSwyREFBNEIsR0FBbkMsVUFBb0MsV0FBeUI7UUFDekQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBQSxVQUFVLElBQUksT0FBQSxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLDZEQUE4QixHQUF0QyxVQUF1QyxXQUF5QixFQUFFLE9BQW9DO1FBQ2xHLHNDQUFzQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7YUFFckQsRUFBRSxDQUFDLFVBQUEsTUFBTTtZQUNOLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztvQkFDdkIsd0VBQXdFO29CQUN4RSxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO29CQUNyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0MsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7T0FFRztJQUNLLHVEQUF3QixHQUFoQztRQUFBLGlCQTBCQztRQXpCRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNyRCxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDcEMsaUVBQWlFO29CQUNqRSxLQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO29CQUM3QixLQUFJLENBQUMscUJBQXFCLENBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQ2xDLFVBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSyxPQUFBLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztvQkFDNUQsS0FBSyxDQUFDO2dCQUNWLENBQUM7Z0JBQ0QsS0FBSyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLHFCQUFxQixDQUN0QixDQUEwQixLQUFNLENBQUMsVUFBVSxDQUFDLEVBQzVDLFVBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSyxPQUFBLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztvQkFDNUQsS0FBSyxDQUFDO2dCQUNWLENBQUM7Z0JBQ0QsS0FBSyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLHFCQUFxQixDQUN0QixDQUEwQixLQUFNLENBQUMsVUFBVSxDQUFDLEVBQzVDLFVBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSyxPQUFBLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztvQkFDL0QsS0FBSyxDQUFDO2dCQUNWLENBQUM7Z0JBQ0QsU0FBUyxLQUFLLENBQUM7WUFDbkIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxvREFBcUIsR0FBN0IsVUFBOEIsV0FBeUIsRUFBRSxTQUE0QjtRQUNqRixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNqQixrQ0FBa0M7WUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCwwQkFBMEI7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSywwREFBMkIsR0FBbkMsVUFBb0MsWUFBb0IsRUFBRSxHQUFXO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDckQsQ0FBQztRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw2REFBOEIsR0FBdEMsVUFBdUMsWUFBb0IsRUFBRSxHQUFXO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQXZNQSxBQXVNQyxJQUFBIiwiZmlsZSI6ImNvbm5lY3Rpb24tdGFnLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9