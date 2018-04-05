/**
 * Defines the basic JSON primitives
 */
export declare type JsonPrimitive = string | number | boolean | null;
/**
 * Defines a JSON array
 */
export interface JsonArray extends Array<JsonValue> {
}
/**
 * Defines a JSON object
 */
export interface JsonObject extends MsftSme.StringMap<JsonValue> {
}
/**
 * Defines a JSON value
 */
export declare type JsonValue = JsonPrimitive | JsonObject | JsonArray;
