import { LogLevel } from './log-level';
/**
 * Log record.
 */
export interface LogRecord {
    /**
     * The record originator of event within a module.
     * ex) <angular component>
     */
    source: string;
    /**
     * The level of event.
     */
    level: LogLevel;
    /**
     * The message of event.
     */
    message: string;
    /**
     * The stack trace data.
     */
    stack?: any;
    /**
     * The parameters of event. This could include http request/response with headers when an error is recorded.
     * A header should keep unique ID but not primary record property.
     */
    params?: any;
}
