import { GatewayConnection } from '../data/gateway-connection';
import { Rpc } from '../rpc/rpc';
import { LogLevel } from './log-level';
import { LogRecord } from './log-record';
import { TelemetryRecord } from './telemetry-record';
/**
 * Logging class.
 */
export declare class Logging {
    private static logMaxRecordLength;
    private static logMaxWaitTimeMs;
    private static telemetryMaxRecordLength;
    private static telemetryMaxWaitTimeMs;
    private static testMode;
    private static instance;
    private gateway;
    private http;
    private rpc;
    private logSet;
    private telemetrySet;
    private thresholdOfLogLevel;
    private verboseTelemetry;
    /**
     * Log a logging event.
     *
     * @param record the log record to send the gateway.
     * @return Promise<any> settle to resolve if buffered.
     */
    static log(record: LogRecord): Promise<any>;
    /**
     * Trace a telemetry event.
     *
     * @param record the telemetry record to send the gateway.
     * @return Promise<any> settle to resolve if buffered.
     */
    static trace(record: TelemetryRecord): Promise<any>;
    /**
     * Log a raw object into the console at debug level of mode.
     */
    static debug(object: any): void;
    /**
     * Configure logging mode.
     *
     * @param thresholdOfLogLevel the log level for gateway.
     * @param verboseTelemetry if true, optional telemerty will be collected.
     */
    static configureLog(thresholdOfLogLevel: LogLevel, verboseTelemetry: boolean): void;
    /**
     * Gets the level of current logging.
     */
    readonly consoleLogLevel: LogLevel;
    /**
     * Gets the session Id of shell.
     */
    private readonly sessionId;
    /**
     * Gets the name of current shell or module.
     */
    private readonly nameOfModule;
    /**
     * Initializes a new instance of the Logging class.
     */
    constructor();
    /**
     * Gets the current logging instance.
     */
    static readonly current: Logging;
    /**
     * Register Rpc object to logging instance.
     *
     * @param rpc the rpc instance.
     */
    registerRpc(rpc: Rpc, gateway: GatewayConnection): void;
    /**
     * Dispose the set of rpc forwarding pipes.
     */
    dispose(): void;
    /**
     * Log a record.
     *
     * @param record the log record.
     * @return Promise<any> the promise object.
     */
    private logInternal(record);
    /**
     * Log a telemerty record.
     *
     * @param record the telemetry record.
     * @return Promise<any> the promise object.
     */
    private telemetryInternal(record);
    /**
     * Dispose the set.
     *
     * @param set the logger set.
     */
    private disposeSet<T>(set);
    /**
     * Log to the gateway.
     *
     * @param set the logger set.
     * @param data the record data.
     */
    private logGateway<T>(set, data);
    /**
     * Submit records to the gateway.
     */
    private submitRecords<T>(set);
}
