import { Observable } from 'rxjs';
import { RpcInboundCommands, RpcOutboundCommands } from './rpc-base';
var RpcForwarder = (function () {
    function RpcForwarder() {
    }
    RpcForwarder.waitForReady = function (rpc) {
        // if we are ready to forward, just return an observable.
        if (rpc.stateActive && RpcForwarder.ready) {
            return Observable.of(null);
        }
        // if we are already waiting for the rpc, then return that observable
        if (RpcForwarder.ready) {
            return RpcForwarder.ready;
        }
        // if we are not ready to forward, then set up forwarding based on our window type and current rpc state
        if (window.top !== window.self) {
            if (!rpc.stateActive) {
                // return the first rpc state change that sets the state to active.
                // then register our rpc command before returning
                RpcForwarder.ready = rpc.stateChanged
                    .filter(function (active) { return active; })
                    .take(1)
                    .map(function () { return rpc.register(RpcOutboundCommands.Forward, RpcForwarder.onForwardReceived); });
                return RpcForwarder.ready;
            }
            else {
                rpc.register(RpcOutboundCommands.Forward, RpcForwarder.onForwardReceived);
            }
        }
        else {
            // this is a top level window (shell)
            rpc.moduleSubjects(RpcInboundCommands.Forward).subscribe(function (data) {
                RpcForwarder.onForwardReceived(data.data).then(data.deferred.resolve, data.deferred.reject);
            });
        }
        RpcForwarder.ready = Observable.of(null);
        return RpcForwarder.ready;
    };
    RpcForwarder.register = function (serviceId, forwarder) {
        // throw an error if the service has already been registered
        if (RpcForwarder.forwardMap.has(serviceId)) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ForwarderIdConflict.message;
            throw new Error(message.format(serviceId));
        }
        // register the forwarder using the serviceId
        RpcForwarder.forwardMap.set(serviceId, forwarder);
    };
    RpcForwarder.onForwardReceived = function (data) {
        if (!RpcForwarder.forwardMap.has(data.service)) {
            var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ForwarderIdNotFound.message;
            return Promise.reject(message.format(data.service));
        }
        else {
            var target = RpcForwarder.forwardMap.get(data.service);
            return target.handleForwardedMessage(data)
                .map(function (result) { return ({ result: result }); })
                .catch(function (error) {
                // on error, make sure the error is serializable and return it as an observable
                return Observable.of({ error: RpcForwarder.ensureSerializable(error) });
            })
                .toPromise();
        }
    };
    /**
     * Transform object into something that can be serializable by dropping
     * any non-serializable properties
     *
     * @param obj the object to make serializable.
     * @return a new object that is serializable
     */
    RpcForwarder.ensureSerializable = function (obj) {
        var type = typeof obj;
        if (type === 'string' || type === 'number' || type === 'boolean') {
            return obj;
        }
        if (obj && type === 'object') {
            if (Array.isArray(obj)) {
                return obj.map(function (v) { return RpcForwarder.ensureSerializable(v); });
            }
            var keys = Object.keys(obj);
            var result_1 = {};
            keys.forEach(function (key) {
                result_1[key] = RpcForwarder.ensureSerializable(obj[key]);
            });
            return result_1;
        }
        // We will return null for symbol, function, null, undefined
        return null;
    };
    return RpcForwarder;
}());
export { RpcForwarder };
RpcForwarder.forwardMap = new Map();
/**
 * Base class to allow 2+ instances of a service to behave as one across the iframe boundary
 * three mechanisms are surfaced for communication:
 * - Execute: expects a response with data from the receiver
 * - Notify: expects a response with no data from the receiver just for confirmation that it was received
 * - Init: always called from a child instance, used to synchronize parent and child as the child starts up
 */
var RpcServiceForwarder = (function () {
    /**
     * Instantiates a new instance of the RpcServiceForwarder
     */
    function RpcServiceForwarder(serviceId, rpc) {
        this.serviceId = serviceId;
        this.rpc = rpc;
        RpcForwarder.register(this.serviceId, this);
    }
    /**
     * Called when a forwarded message is received from the rpc.
     * @param data The RpcForwardReportData of the request
     * @returns an observable for the result of the request call
     */
    RpcServiceForwarder.prototype.handleForwardedMessage = function (data) {
        // in the future Rpc should have no knowledge of shell an module. Only child/parent.
        var from = this.rpc.isShell ? 1 /* Child */ : 0 /* Parent */;
        switch (data.type) {
            case 2 /* Init */:
                return this.onForwardInit();
            case 0 /* Execute */:
                return this.onForwardExecute(from, data.name, data.arguments);
            case 1 /* Notify */:
                return this.onForwardNotify(from, data.name, data.value);
            default: {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ForwarderUnknownType.message;
                return Observable.throw(message.format(data.type));
            }
        }
    };
    /**
     * Initializes the service. The serviceReady observable is assigned to the output of this function.
     */
    RpcServiceForwarder.prototype.initialize = function () {
        var _this = this;
        return RpcForwarder.waitForReady(this.rpc)
            .flatMap(function () {
            if (!_this.canForward(0 /* Parent */)) {
                // since we dont have a parent we can stop here
                return Observable.of(null);
            }
            // other wise we have a parent and should forward an init message
            var data = {
                service: _this.serviceId,
                type: 2 /* Init */
            };
            return Observable.fromPromise(_this.rpc.forward(data));
        }).map(function (result) { return result ? _this.onForwardInitResponse(result) : null; })
            .map(function () { return true; })
            .take(1);
    };
    /**
     * Creates an observable that errors with name not found
     * @returns an observable that will error with a name not found message
     */
    RpcServiceForwarder.prototype.nameNotFound = function (name) {
        return Observable.throw(new Error(name + " not found in forwarded service: " + this.serviceId));
    };
    /**
     * Determines if a message can be forwarded to the specified RpcRelationshipType
     * @param to The RpcRelationshipType that needs to be checked
     * @returns true if messages can be forwarded to the specified RpcRelationshipType
     */
    RpcServiceForwarder.prototype.canForward = function (to) {
        // we can only forward if the rpc is active
        if (this.rpc.stateActive) {
            if (to === 0 /* Parent */) {
                // we can only forward to parents if we are not the top level window                
                return window.top !== window.self;
            }
            else if (to === 1 /* Child */) {
                // when trying to forward to a child, we have to make sure that the rpc outbound is actually ready. 
                // rpc.StateActive will report true always fro the shell
                if (!this.rpc.rpcManager || !this.rpc.rpcManager.rpcOutbound) {
                    return false;
                }
                // we can only forward to parents if we have child windows
                return window.top === window && window.frames.length > 0;
            }
        }
        return false;
    };
    /**
     * Forwards a execution of some named method to the target relationship type
     * @param to The RpcRelationshipType that this request is intended for
     * @param name The name of the method to execute
     * @param value The arguments for the method
     * @returns an observable for the result of the method call
     */
    RpcServiceForwarder.prototype.forwardExecute = function (to, name, args) {
        // if we cant forward then just return
        if (!this.canForward(to)) {
            return;
        }
        var data = {
            arguments: args,
            name: name,
            service: this.serviceId,
            type: 0 /* Execute */
        };
        return Observable.fromPromise(this.rpc.forward(data)).map(function (response) {
            if (response.error) {
                throw response.error;
            }
            else {
                return response.result;
            }
        });
    };
    /**
     * Forwards a notification of some state change to the target relationship type
     * @param to The RpcRelationshipType that this request is intended for
     * @param name The name of the state change
     * @param value The new value of some state
     * @returns an observable that completes when the state has been changed on the target instance.
     */
    RpcServiceForwarder.prototype.forwardNotify = function (to, name, value) {
        // if we cant forward then just return
        if (!this.canForward(to)) {
            return;
        }
        var data = {
            value: value,
            name: name,
            service: this.serviceId,
            type: 1 /* Notify */
        };
        return Observable.fromPromise(this.rpc.forward(data)).map(function (response) {
            if (response.error) {
                throw response.error;
            }
            else {
                return response.result;
            }
        });
    };
    return RpcServiceForwarder;
}());
export { RpcServiceForwarder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvcnBjL3JwYy1mb3J3YXJkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFJakQsT0FBTyxFQUFFLGtCQUFrQixFQUFXLG1CQUFtQixFQUF1QixNQUFNLFlBQVksQ0FBQztBQVNuRztJQUFBO0lBZ0dBLENBQUM7SUExRmlCLHlCQUFZLEdBQTFCLFVBQTJCLEdBQVE7UUFDL0IseURBQXlEO1FBQ3pELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELHFFQUFxRTtRQUNyRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM5QixDQUFDO1FBRUQsd0dBQXdHO1FBQ3hHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsbUVBQW1FO2dCQUNuRSxpREFBaUQ7Z0JBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVk7cUJBQ2hDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sRUFBTixDQUFNLENBQUM7cUJBQ3hCLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQ1AsR0FBRyxDQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBekUsQ0FBeUUsQ0FBQyxDQUFDO2dCQUMxRixNQUFNLENB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O1FBQ3JFLHNDQUFzQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFJLElBQUksR0FBK0I7WUFDbkMsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUztZQUN2QixJQUFJLGdCQUF1QjtTQUM5QixDQUFDO1FBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRO1lBQzlELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDekIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzNCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCwwQkFBQztBQUFELENBL0tBLEFBK0tDLElBQUEiLCJmaWxlIjoicnBjLWZvcndhcmRlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=