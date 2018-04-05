/**
 * Defines constants for use with HTTP headers.
 */
export declare const headerConstants: {
    ACCEPT_RANGES: string;
    CONTENT_TRANSFER_ENCODING: string;
    TRANSFER_ENCODING: string;
    SERVER: string;
    LOCATION: string;
    LAST_MODIFIED: string;
    DATA_SERVICE_VERSION: string;
    MAX_DATA_SERVICE_VERSION: string;
    PREFIX_FOR_STORAGE: string;
    CLIENT_REQUEST_ID: string;
    APPROXIMATE_MESSAGES_COUNT: string;
    AUTHORIZATION: string;
    BLOB_PUBLIC_ACCESS: string;
    BLOB_TYPE: string;
    TYPE: string;
    BLOCK_BLOB: string;
    CACHE_CONTROL: string;
    BLOB_CACHE_CONTROL: string;
    FILE_CACHE_CONTROL: string;
    COPY_STATUS: string;
    COPY_COMPLETION_TIME: string;
    COPY_STATUS_DESCRIPTION: string;
    COPY_ID: string;
    COPY_PROGRESS: string;
    COPY_ACTION: string;
    CONTENT_ID: string;
    CONTENT_ENCODING: string;
    BLOB_CONTENT_ENCODING: string;
    FILE_CONTENT_ENCODING: string;
    CONTENT_LANGUAGE: string;
    BLOB_CONTENT_LANGUAGE: string;
    FILE_CONTENT_LANGUAGE: string;
    CONTENT_LENGTH: string;
    BLOB_CONTENT_LENGTH: string;
    FILE_CONTENT_LENGTH: string;
    CONTENT_DISPOSITION: string;
    BLOB_CONTENT_DISPOSITION: string;
    FILE_CONTENT_DISPOSITION: string;
    CONTENT_MD5: string;
    BLOB_CONTENT_MD5: string;
    FILE_CONTENT_MD5: string;
    CONTENT_RANGE: string;
    CONTENT_TYPE: string;
    BLOB_CONTENT_TYPE: string;
    FILE_CONTENT_TYPE: string;
    COPY_SOURCE: string;
    DATE: string;
    MS_DATE: string;
    DELETE_SNAPSHOT: string;
    ETAG: string;
    IF_MATCH: string;
    IF_MODIFIED_SINCE: string;
    IF_NONE_MATCH: string;
    IF_UNMODIFIED_SINCE: string;
    INCLUDE_SNAPSHOTS_VALUE: string;
    JSON_CONTENT_TYPE_VALUE: string;
    LEASE_ID: string;
    LEASE_BREAK_PERIOD: string;
    PROPOSED_LEASE_ID: string;
    LEASE_DURATION: string;
    SOURCE_LEASE_ID: string;
    LEASE_TIME: string;
    LEASE_STATUS: string;
    LEASE_STATE: string;
    PAGE_BLOB: string;
    PAGE_WRITE: string;
    FILE_WRITE: string;
    PREFER: string;
    PREFER_CONTENT: string;
    PREFER_NO_CONTENT: string;
    PREFIX_FOR_STORAGE_METADATA: string;
    PREFIX_FOR_STORAGE_PROPERTIES: string;
    RANGE: string;
    RANGE_GET_CONTENT_MD5: string;
    RANGE_HEADER_FORMAT: string;
    REQUEST_ID: string;
    SEQUENCE_NUMBER: string;
    SEQUENCE_NUMBER_EQUAL: string;
    SEQUENCE_NUMBER_LESS_THAN: string;
    SEQUENCE_NUMBER_LESS_THAN_OR_EQUAL: string;
    SEQUENCE_NUMBER_ACTION: string;
    SIZE: string;
    SNAPSHOT: string;
    SNAPSHOTS_ONLY_VALUE: string;
    SOURCE_IF_MATCH: string;
    SOURCE_IF_MODIFIED_SINCE: string;
    SOURCE_IF_NONE_MATCH: string;
    SOURCE_IF_UNMODIFIED_SINCE: string;
    STORAGE_RANGE: string;
    STORAGE_VERSION: string;
    TARGET_STORAGE_VERSION: string;
    USER_AGENT: string;
    POP_RECEIPT: string;
    TIME_NEXT_VISIBLE: string;
    APPROXIMATE_MESSAGE_COUNT: string;
    LEASE_ACTION: string;
    ACCEPT: string;
    ACCEPT_CHARSET: string;
    HOST: string;
    CORRELATION_ID: string;
    GROUP_ID: string;
    SHARE_QUOTA: string;
    BLOB_CONDITION_MAX_SIZE: string;
    BLOB_CONDITION_APPEND_POSITION: string;
    BLOB_APPEND_OFFSET: string;
    BLOB_COMMITTED_BLOCK_COUNT: string;
    SERVER_ENCRYPTED: string;
    SME_AUTHORIZATION: string;
    USE_LAPS: string;
    LAPS_LOCALADMINNAME: string;
    EMT_AUTHENTICATION: string;
    LOG_AUDIT: string;
    LOG_TELEMETRY: string;
    MODULE_NAME: string;
    MODULE_VERSION: string;
};
export declare enum HttpStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    Ambiguous = 300,
    MultipleChoices = 300,
    Moved = 301,
    MovedPermanently = 301,
    Found = 302,
    Redirect = 302,
    RedirectMethod = 303,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    RedirectKeepVerb = 307,
    TemporaryRedirect = 307,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    RequestEntityTooLarge = 413,
    RequestUriTooLong = 414,
    UnsupportedMediaType = 415,
    RequestedRangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    UpgradeRequired = 426,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
}
