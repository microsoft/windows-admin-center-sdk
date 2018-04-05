var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Http } from '../data/http';
import { Net } from '../data/net';
import { RpcInboundCommands } from '../rpc/rpc-base';
import { LogLevel } from './log-level';
/**
 * Logging class.
 */
var Logging = (function () {
    /**
     * Initializes a new instance of the Logging class.
     */
    function Logging() {
        this.thresholdOfLogLevel = LogLevel.Informational;
        this.verboseTelemetry = false;
        this.http = new Http();
        this.logSet = {
            maxWaitTimeMs: Logging.logMaxWaitTimeMs,
            maxRecordLength: Logging.logMaxRecordLength,
            api: '/api/log'
        };
        this.telemetrySet = {
            maxWaitTimeMs: Logging.telemetryMaxWaitTimeMs,
            maxRecordLength: Logging.telemetryMaxRecordLength,
            api: '/api/telemetry'
        };
    }
    /**
     * Log a logging event.
     *
     * @param record the log record to send the gateway.
     * @return Promise<any> settle to resolve if buffered.
     */
    Logging.log = function (record) {
        return Logging.current.logInternal(record);
    };
    /**
     * Trace a telemetry event.
     *
     * @param record the telemetry record to send the gateway.
     * @return Promise<any> settle to resolve if buffered.
     */
    Logging.trace = function (record) {
        return Logging.current.telemetryInternal(record);
    };
    /**
     * Log a raw object into the console at debug level of mode.
     */
    Logging.debug = function (object) {
        if (Logging.current.consoleLogLevel >= LogLevel.Debug) {
            console.log(object);
        }
    };
    /**
     * Configure logging mode.
     *
     * @param thresholdOfLogLevel the log level for gateway.
     * @param verboseTelemetry if true, optional telemerty will be collected.
     */
    Logging.configureLog = function (thresholdOfLogLevel, verboseTelemetry) {
        Logging.current.thresholdOfLogLevel = thresholdOfLogLevel;
        Logging.current.verboseTelemetry = verboseTelemetry;
    };
    Object.defineProperty(Logging.prototype, "consoleLogLevel", {
        /**
         * Gets the level of current logging.
         */
        get: function () {
            var global = window;
            return (global.MsftSme && global.MsftSme.Init && global.MsftSme.Init.logLevel) || LogLevel.Warning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logging.prototype, "sessionId", {
        /**
         * Gets the session Id of shell.
         */
        get: function () {
            var global = window;
            return global.MsftSme && global.MsftSme.Init && global.MsftSme.Init.sessionId || Logging.testMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logging.prototype, "nameOfModule", {
        /**
         * Gets the name of current shell or module.
         */
        get: function () {
            var global = window;
            return global.MsftSme && global.MsftSme.Init && global.MsftSme.Init.moduleName || Logging.testMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logging, "current", {
        /**
         * Gets the current logging instance.
         */
        get: function () {
            if (Logging.instance) {
                return Logging.instance;
            }
            Logging.instance = new Logging();
            return Logging.instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register Rpc object to logging instance.
     *
     * @param rpc the rpc instance.
     */
    Logging.prototype.registerRpc = function (rpc, gateway) {
        var _this = this;
        this.rpc = rpc;
        this.gateway = gateway;
        // start subscribing once after the rpc is ready on the shell.
        this.rpc.stateChanged.filter(function (active) { return active; }).take(1).subscribe(function (active) {
            if (_this.rpc.isShell) {
                _this.logSet.rpcSubscription = _this.rpc.moduleSubjects(RpcInboundCommands.Log)
                    .subscribe(function (data) {
                    _this.logGateway(_this.logSet, data.data);
                    data.deferred.resolve();
                });
                _this.telemetrySet.rpcSubscription = _this.rpc.moduleSubjects(RpcInboundCommands.Telemetry)
                    .subscribe(function (data) {
                    _this.logGateway(_this.telemetrySet, data.data);
                    data.deferred.resolve();
                });
            }
        });
    };
    /**
     * Dispose the set of rpc forwarding pipes.
     */
    Logging.prototype.dispose = function () {
        this.disposeSet(this.logSet);
        this.disposeSet(this.telemetrySet);
    };
    /**
     * Log a record.
     *
     * @param record the log record.
     * @return Promise<any> the promise object.
     */
    Logging.prototype.logInternal = function (record) {
        var rpcRecord;
        var now = new Date();
        if (record.level <= this.consoleLogLevel) {
            rpcRecord = __assign({}, record, { sessionId: this.sessionId, timestamp: Date.now(), sourceName: this.nameOfModule });
            var count = (record.params ? 1 : 0) + (record.stack ? 1 : 0);
            var format = (['{0}:{1}:{2}:{3}:{4}', '{0}:{1}:{2}:{3}:{4}:{5}', '{0}:{1}:{2}:{3}:{4}:{5}:{6}'])[count];
            var message = format.format(now.toISOString(), this.nameOfModule, record.source, LogLevel[record.level], record.message, record.params ? JSON.stringify(record.params) : '', record.stack ? record.stack : '');
            if (record.level <= LogLevel.Error) {
                console.error(message);
            }
            else if (record.level <= LogLevel.Warning) {
                console.warn(message);
            }
            else {
                console.log(message);
            }
        }
        if (record.level <= this.thresholdOfLogLevel && this.sessionId !== Logging.testMode) {
            if (!rpcRecord) {
                rpcRecord = __assign({}, record, { sessionId: this.sessionId, timestamp: now.getTime(), sourceName: this.nameOfModule });
            }
            if (this.rpc && this.rpc.stateActive && !this.rpc.isShell) {
                return this.rpc.log(rpcRecord);
            }
            this.logGateway(this.logSet, rpcRecord);
        }
        return Promise.resolve();
    };
    /**
     * Log a telemerty record.
     *
     * @param record the telemetry record.
     * @return Promise<any> the promise object.
     */
    Logging.prototype.telemetryInternal = function (record) {
        if (((!this.verboseTelemetry && !record.optional) || this.verboseTelemetry) && this.sessionId !== Logging.testMode) {
            var rpcRecord = __assign({}, record, { sessionId: this.sessionId, timestamp: Date.now(), sourceName: this.nameOfModule });
            if (this.rpc && this.rpc.stateActive && !this.rpc.isShell) {
                return this.rpc.telemetry(rpcRecord);
            }
            this.logGateway(this.telemetrySet, rpcRecord);
        }
        return Promise.resolve();
    };
    /**
     * Dispose the set.
     *
     * @param set the logger set.
     */
    Logging.prototype.disposeSet = function (set) {
        if (set.rpcSubscription) {
            set.rpcSubscription.unsubscribe();
            set.rpcSubscription = null;
        }
    };
    /**
     * Log to the gateway.
     *
     * @param set the logger set.
     * @param data the record data.
     */
    Logging.prototype.logGateway = function (set, data) {
        var _this = this;
        if (set.timer == null) {
            set.buffer = [];
            set.timer = setTimeout(function () { return _this.submitRecords(set); }, set.maxWaitTimeMs);
        }
        set.buffer.push(data);
        if (set.buffer.length >= set.maxRecordLength) {
            clearTimeout(set.timer);
            this.submitRecords(set);
            set.timer = setTimeout(function () { return _this.submitRecords(set); }, set.maxWaitTimeMs);
        }
    };
    /**
     * Submit records to the gateway.
     */
    Logging.prototype.submitRecords = function (set) {
        var gateway = this.gateway ? this.gateway.gatewayUrl : '';
        var url = "" + gateway + set.api;
        var sendBuffer = set.buffer;
        if (sendBuffer.length > 0) {
            /* TODO: If retry is required, add .retry(1) before subscription...
             */
            this.http.post(url, sendBuffer).subscribe(function () { return null; }, function (error) {
                var message = MsftSme.resourcesStrings().MsftSmeShell.Core.Error.LoggingUnableSubmit.message;
                console.error(message.format(Net.getErrorMessage(error)));
            });
        }
        set.timer = null;
        set.buffer = [];
    };
    return Logging;
}());
export { Logging };
Logging.logMaxRecordLength = 20;
Logging.logMaxWaitTimeMs = 30000;
Logging.telemetryMaxRecordLength = 100;
Logging.telemetryMaxWaitTimeMs = 60000;
Logging.testMode = 'test';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGlhZ25vc3RpY3MvbG9nZ2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsQyxPQUFPLEVBQUUsa0JBQWtCLEVBQW9DLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXVDdkM7O0dBRUc7QUFDSDtJQWdGSTs7T0FFRztJQUNIO1FBdEVRLHdCQUFtQixHQUFhLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDdkQscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBc0U3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLGFBQWEsRUFBRSxPQUFPLENBQUMsZ0JBQWdCO1lBQ3ZDLGVBQWUsRUFBRSxPQUFPLENBQUMsa0JBQWtCO1lBQzNDLEdBQUcsRUFBRSxVQUFVO1NBQ2xCLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2hCLGFBQWEsRUFBRSxPQUFPLENBQUMsc0JBQXNCO1lBQzdDLGVBQWUsRUFBRSxPQUFPLENBQUMsd0JBQXdCO1lBQ2pELEdBQUcsRUFBRSxnQkFBZ0I7U0FDeEIsQ0FBQztJQUNOLENBQUM7SUEvRUQ7Ozs7O09BS0c7SUFDVyxXQUFHLEdBQWpCLFVBQWtCLE1BQWlCO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxhQUFLLEdBQW5CLFVBQW9CLE1BQXVCO1FBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7T0FF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