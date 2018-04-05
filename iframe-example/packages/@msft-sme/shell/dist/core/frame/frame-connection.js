import { Observable } from 'rxjs';
import { RpcDialogState, RpcDialogType } from '../rpc/rpc-dialogs';
/**
 * Frame connection class.
 */
var FrameConnection = /** @class */ (function () {
    /**
     * Initializes a new instance of the FrameConnection class.
     *
     * @param rpc the RPC object.
     */
    function FrameConnection(rpc) {
        this.rpc = rpc;
    }
    /**
     * Open a message dialog and wait for completion through RPC.
     * To close the dialog before user input, unsubscribe the observable.
     *
     * @param request the request object of rpc based dialog message.
     */
    FrameConnection.prototype.showDialogMessage = function (request) {
        return this.showDialog(request, RpcDialogType.OpenMessageDialog);
    };
    /**
     * Open a confirmation dialog and wait for completion through RPC.
     * To close the dialog before user input, unsubscribe the observable.
     *
     * @param request the request object of rpc based dialog confirmation.
     */
    FrameConnection.prototype.showDialogConfirmation = function (request) {
        return this.showDialog(request, RpcDialogType.OpenConfirmationDialog);
    };
    /**
     * Open a confirmation list dialog and wait for completion through RPC.
     * To close the dialog before user input, unsubscribe the observable.
     *
     * @param request the request object of rpc based dialog confirmation list.
     */
    FrameConnection.prototype.showDialogConfirmationList = function (request) {
        return this.showDialog(request, RpcDialogType.OpenConfirmationListDialog);
    };
    /**
     * Open a message dialog and wait for completion through RPC.
     *
     * @param request the request object of rpc based dialog message.
     */
    FrameConnection.prototype.showDialog = function (request, type) {
        var _this = this;
        var data = {
            dialogId: MsftSme.getUniqueId(),
            type: type,
            request: request
        };
        return Observable.create(function (observer) {
            var subscription = _this.openAndLongPolling(data)
                .map(function (value) {
                switch (value.state) {
                    case RpcDialogState.Closed:
                        observer.next(value.response);
                        observer.complete();
                        break;
                    case RpcDialogState.Failed:
                        observer.error(new Error(value.failedMessage));
                        break;
                    case RpcDialogState.ForcedTerminated:
                        observer.error(new Error('forced terminated'));
                        break;
                }
            })
                .subscribe();
            return function () {
                if (!subscription.closed) {
                    // sending close request to the shell/dialog if not closed yet.
                    subscription.unsubscribe();
                    data.request = null;
                    data.type = RpcDialogType.Close;
                    _this.rpc.dialog(data);
                }
            };
        });
    };
    FrameConnection.prototype.openAndLongPolling = function (data) {
        var _this = this;
        return this.requestDialog(data)
            .expand(function (result, index) {
            if (result.state === RpcDialogState.Opened) {
                // status polling...
                var newData = {
                    dialogId: data.dialogId,
                    type: RpcDialogType.PollingStatus
                };
                return _this.requestDialog(newData);
            }
            return Observable.empty();
        })
            .filter(function (result) { return result.state !== RpcDialogState.Opened; });
    };
    FrameConnection.prototype.requestDialog = function (data) {
        return Observable.fromPromise(this.rpc.dialog(data));
    };
    return FrameConnection;
}());
export { FrameConnection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZnJhbWUvZnJhbWUtY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBRTVDLE9BQU8sRUFTSCxjQUFjLEVBQ2QsYUFBYSxFQUNoQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCOztHQUVHO0FBQ0g7SUFDSTs7OztPQUlHO0lBQ0gseUJBQW9CLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO0lBQzVCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDJDQUFpQixHQUF4QixVQUF5QixPQUFnQztRQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FDTixPQUFPLEVBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksZ0RBQXNCLEdBQTdCLFVBQThCLE9BQXFDO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUNOLE9BQU8sRUFBRSxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxvREFBMEIsR0FBakMsVUFBa0MsT0FBeUM7UUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQ04sT0FBTyxFQUFFLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssb0NBQVUsR0FBbEIsVUFHSyxPQUFpQixFQUFFLElBQW1CO1FBSDNDLGlCQW9DQztRQWhDRyxJQUFNLElBQUksR0FBa0I7WUFDeEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDL0IsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLFNBQUE7U0FDVixDQUFDO1FBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUEyQjtZQUNqRCxJQUFNLFlBQVksR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2lCQUM3QyxHQUFHLENBQUMsVUFBQyxLQUFzQjtnQkFDeEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLEtBQUssY0FBYyxDQUFDLE1BQU07d0JBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQVUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN2QyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3BCLEtBQUssQ0FBQztvQkFDVixLQUFLLGNBQWMsQ0FBQyxNQUFNO3dCQUN0QixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxLQUFLLENBQUM7b0JBQ1YsS0FBSyxjQUFjLENBQUMsZ0JBQWdCO3dCQUNoQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzt3QkFDL0MsS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsU0FBUyxFQUFFLENBQUM7WUFDakIsTUFBTSxDQUFDO2dCQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLCtEQUErRDtvQkFDL0QsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO29CQUNoQyxLQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztZQUNMLENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDRDQUFrQixHQUExQixVQUEyQixJQUFtQjtRQUE5QyxpQkFlQztRQWRHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUMxQixNQUFNLENBQUMsVUFBQyxNQUFNLEVBQUUsS0FBSztZQUNsQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxvQkFBb0I7Z0JBQ3BCLElBQU0sT0FBTyxHQUFrQjtvQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO29CQUN2QixJQUFJLEVBQUUsYUFBYSxDQUFDLGFBQWE7aUJBQ3BDLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUMsTUFBTSxFQUF0QyxDQUFzQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVPLHVDQUFhLEdBQXJCLFVBQXNCLElBQW1CO1FBQ3JDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFrQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDTCxzQkFBQztBQUFELENBekdBLEFBeUdDLElBQUEiLCJmaWxlIjoiZnJhbWUtY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=