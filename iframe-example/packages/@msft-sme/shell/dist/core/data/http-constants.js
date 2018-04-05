/**
 * Defines constants for use with HTTP headers.
 */
export var headerConstants = {
    /**
     * The accept ranges header.
     *
     * @const
     * @type {string}
     */
    ACCEPT_RANGES: 'accept_ranges',
    /**
     * The content transfer encoding header.
     *
     * @const
     * @type {string}
     */
    CONTENT_TRANSFER_ENCODING: 'content-transfer-encoding',
    /**
     * The transfer encoding header.
     *
     * @const
     * @type {string}
     */
    TRANSFER_ENCODING: 'transfer-encoding',
    /**
     * The server header.
     *
     * @const
     * @type {string}
     */
    SERVER: 'server',
    /**
     * The location header.
     *
     * @const
     * @type {string}
     */
    LOCATION: 'location',
    /**
     * The Last-Modified header
     *
     * @const
     * @type {string}
     */
    LAST_MODIFIED: 'Last-Modified',
    /**
     * The data service version.
     *
     * @const
     * @type {string}
     */
    DATA_SERVICE_VERSION: 'dataserviceversion',
    /**
     * The maximum data service version.
     *
     * @const
     * @type {string}
     */
    MAX_DATA_SERVICE_VERSION: 'maxdataserviceversion',
    /**
     * The master Windows Azure Storage header prefix.
     *
     * @const
     * @type {string}
     */
    PREFIX_FOR_STORAGE: 'x-ms-',
    /**
     * The client request Id header.
     *
     * @const
     * @type {string}
     */
    CLIENT_REQUEST_ID: 'x-ms-client-request-id',
    /**
     * The header that specifies the approximate message count of a queue.
     *
     * @const
     * @type {string}
     */
    APPROXIMATE_MESSAGES_COUNT: 'x-ms-approximate-messages-count',
    /**
     * The Authorization header.
     *
     * @const
     * @type {string}
     */
    AUTHORIZATION: 'authorization',
    /**
     * The header that specifies public access to blobs.
     *
     * @const
     * @type {string}
     */
    BLOB_PUBLIC_ACCESS: 'x-ms-blob-public-access',
    /**
     * The header for the blob type.
     *
     * @const
     * @type {string}
     */
    BLOB_TYPE: 'x-ms-blob-type',
    /**
     * The header for the type.
     *
     * @const
     * @type {string}
     */
    TYPE: 'x-ms-type',
    /**
     * Specifies the block blob type.
     *
     * @const
     * @type {string}
     */
    BLOCK_BLOB: 'blockblob',
    /**
     * The CacheControl header.
     *
     * @const
     * @type {string}
     */
    CACHE_CONTROL: 'cache-control',
    /**
     * The header that specifies blob caching control.
     *
     * @const
     * @type {string}
     */
    BLOB_CACHE_CONTROL: 'x-ms-blob-cache-control',
    /**
     * The header that specifies caching control.
     *
     * @const
     * @type {string}
     */
    FILE_CACHE_CONTROL: 'x-ms-cache-control',
    /**
     * The copy status.
     *
     * @const
     * @type {string}
     */
    COPY_STATUS: 'x-ms-copy-status',
    /**
     * The copy completion time
     *
     * @const
     * @type {string}
     */
    COPY_COMPLETION_TIME: 'x-ms-copy-completion-time',
    /**
     * The copy status message
     *
     * @const
     * @type {string}
     */
    COPY_STATUS_DESCRIPTION: 'x-ms-copy-status-description',
    /**
     * The copy identifier.
     *
     * @const
     * @type {string}
     */
    COPY_ID: 'x-ms-copy-id',
    /**
     * Progress of any copy operation
     *
     * @const
     * @type {string}
     */
    COPY_PROGRESS: 'x-ms-copy-progress',
    /**
     * The copy action.
     *
     * @const
     * @type {string}
     */
    COPY_ACTION: 'x-ms-copy-action',
    /**
     * The ContentID header.
     *
     * @const
     * @type {string}
     */
    CONTENT_ID: 'content-id',
    /**
     * The ContentEncoding header.
     *
     * @const
     * @type {string}
     */
    CONTENT_ENCODING: 'content-encoding',
    /**
     * The header that specifies blob content encoding.
     *
     * @const
     * @type {string}
     */
    BLOB_CONTENT_ENCODING: 'x-ms-blob-content-encoding',
    /**
     * The header that specifies content encoding.
     *
     * @const
     * @type {string}
     */
    FILE_CONTENT_ENCODING: 'x-ms-content-encoding',
    /**
     * The ContentLangauge header.
     *
     * @const
     * @type {string}
     */
    CONTENT_LANGUAGE: 'content-language',
    /**
     * The header that specifies blob content language.
     *
     * @const
     * @type {string}
     */
    BLOB_CONTENT_LANGUAGE: 'x-ms-blob-content-language',
    /**
     * The header that specifies content language.
     *
     * @const
     * @type {string}
     */
    FILE_CONTENT_LANGUAGE: 'x-ms-content-language',
    /**
     * The ContentLength header.
     *
     * @const
     * @type {string}
     */
    CONTENT_LENGTH: 'content-length',
    /**
     * The header that specifies blob content length.
     *
     * @const
     * @type {string}
     */
    BLOB_CONTENT_LENGTH: 'x-ms-blob-content-length',
    /**
     * The header that specifies content length.
     *
     * @const
     * @type {string}
     */
    FILE_CONTENT_LENGTH: 'x-ms-content-length',
    /**
     * The ContentDisposition header.
     * @const
     * @type {string}
     */
    CONTENT_DISPOSITION: 'content-disposition',
    /**
     * The header that specifies blob content disposition.
     *
     * @const
     * @type {string}
     */
    BLOB_CONTENT_DISPOSITION: 'x-ms-blob-content-disposition',
    /**
     * The header that specifies content disposition.
     *
     * @const
     * @type {string}
     */
    FILE_CONTENT_DISPOSITION: 'x-ms-content-disposition',
    /**
     * The ContentMD5 header.
     *
     * @const
     * @type {string}
     */
    CONTENT_MD5: 'content-md5',
    /**
     * The header that specifies blob content MD5.
     *
     * @const
     * @type {string}
     */
    BLOB_CONTENT_MD5: 'x-ms-blob-content-md5',
    /**
     * The header that specifies content MD5.
     *
     * @const
     * @type {string}
     */
    FILE_CONTENT_MD5: 'x-ms-content-md5',
    /**
     * The ContentRange header.
     *
     * @const
     * @type {string}
     */
    CONTENT_RANGE: 'cache-range',
    /**
     * The ContentType header.
     *
     * @const
     * @type {string}
     */
    CONTENT_TYPE: 'Content-Type',
    /**
     * The header that specifies blob content type.
     *
     * @const
     * @type {string}
     */
    BLOB_CONTENT_TYPE: 'x-ms-blob-content-type',
    /**
     * The header that specifies content type.
     *
     * @const
     * @type {string}
     */
    FILE_CONTENT_TYPE: 'x-ms-content-type',
    /**
     * The header for copy source.
     *
     * @const
     * @type {string}
     */
    COPY_SOURCE: 'x-ms-copy-source',
    /**
     * The header that specifies the date.
     *
     * @const
     * @type {string}
     */
    DATE: 'date',
    /**
     * The header that specifies the date.
     *
     * @const
     * @type {string}
     */
    MS_DATE: 'x-ms-date',
    /**
     * The header to delete snapshots.
     *
     * @const
     * @type {string}
     */
    DELETE_SNAPSHOT: 'x-ms-delete-snapshots',
    /**
     * The ETag header.
     *
     * @const
     * @type {string}
     */
    ETAG: 'etag',
    /**
     * The IfMatch header.
     *
     * @const
     * @type {string}
     */
    IF_MATCH: 'if-match',
    /**
     * The IfModifiedSince header.
     *
     * @const
     * @type {string}
     */
    IF_MODIFIED_SINCE: 'if-modified-since',
    /**
     * The IfNoneMatch header.
     *
     * @const
     * @type {string}
     */
    IF_NONE_MATCH: 'if-none-match',
    /**
     * The IfUnmodifiedSince header.
     *
     * @const
     * @type {string}
     */
    IF_UNMODIFIED_SINCE: 'if-unmodified-since',
    /**
     * Specifies snapshots are to be included.
     *
     * @const
     * @type {string}
     */
    INCLUDE_SNAPSHOTS_VALUE: 'include',
    /**
     * Specifies that the content-type is JSON.
     *
     * @const
     * @type {string}
     */
    JSON_CONTENT_TYPE_VALUE: 'application/json;',
    /**
     * The header that specifies lease ID.
     *
     * @const
     * @type {string}
     */
    LEASE_ID: 'x-ms-lease-id',
    /**
     * The header that specifies the lease break period.
     *
     * @const
     * @type {string}
     */
    LEASE_BREAK_PERIOD: 'x-ms-lease-break-period',
    /**
     * The header that specifies the proposed lease identifier.
     *
     * @const
     * @type {string}
     */
    PROPOSED_LEASE_ID: 'x-ms-proposed-lease-id',
    /**
     * The header that specifies the lease duration.
     *
     * @const
     * @type {string}
     */
    LEASE_DURATION: 'x-ms-lease-duration',
    /**
     * The header that specifies the source lease ID.
     *
     * @const
     * @type {string}
     */
    SOURCE_LEASE_ID: 'x-ms-source-lease-id',
    /**
     * The header that specifies lease time.
     *
     * @const
     * @type {string}
     */
    LEASE_TIME: 'x-ms-lease-time',
    /**
     * The header that specifies lease status.
     *
     * @const
     * @type {string}
     */
    LEASE_STATUS: 'x-ms-lease-status',
    /**
     * The header that specifies lease state.
     *
     * @const
     * @type {string}
     */
    LEASE_STATE: 'x-ms-lease-state',
    /**
     * Specifies the page blob type.
     *
     * @const
     * @type {string}
     */
    PAGE_BLOB: 'PageBlob',
    /**
     * The header that specifies page write mode.
     *
     * @const
     * @type {string}
     */
    PAGE_WRITE: 'x-ms-page-write',
    /**
     * The header that specifies file range write mode.
     *
     * @const
     * @type {string}
     */
    FILE_WRITE: 'x-ms-write',
    /**
     * The header that specifies whether the response should include the inserted entity.
     *
     * @const
     * @type {string}
     */
    PREFER: 'Prefer',
    /**
     * The header value which specifies that the response should include the inserted entity.
     *
     * @const
     * @type {string}
     */
    PREFER_CONTENT: 'return-content',
    /**
     * The header value which specifies that the response should not include the inserted entity.
     *
     * @const
     * @type {string}
     */
    PREFER_NO_CONTENT: 'return-no-content',
    /**
     * The header prefix for metadata.
     *
     * @const
     * @type {string}
     */
    PREFIX_FOR_STORAGE_METADATA: 'x-ms-meta-',
    /**
     * The header prefix for properties.
     *
     * @const
     * @type {string}
     */
    PREFIX_FOR_STORAGE_PROPERTIES: 'x-ms-prop-',
    /**
     * The Range header.
     *
     * @const
     * @type {string}
     */
    RANGE: 'Range',
    /**
     * The header that specifies if the request will populate the ContentMD5 header for range gets.
     *
     * @const
     * @type {string}
     */
    RANGE_GET_CONTENT_MD5: 'x-ms-range-get-content-md5',
    /**
     * The format string for specifying ranges.
     *
     * @const
     * @type {string}
     */
    RANGE_HEADER_FORMAT: 'bytes:%d-%d',
    /**
     * The header that indicates the request ID.
     *
     * @const
     * @type {string}
     */
    REQUEST_ID: 'x-ms-request-id',
    /**
     * The header for specifying the sequence number.
     *
     * @const
     * @type {string}
     */
    SEQUENCE_NUMBER: 'x-ms-blob-sequence-number',
    /**
     * The header for specifying the If-Sequence-Number-EQ condition.
     *
     * @const
     * @type {string}
     */
    SEQUENCE_NUMBER_EQUAL: 'x-ms-if-sequence-number-eq',
    /**
     * The header for specifying the If-Sequence-Number-LT condition.
     *
     * @const
     * @type {string}
     */
    SEQUENCE_NUMBER_LESS_THAN: 'x-ms-if-sequence-number-lt',
    /**
     * The header for specifying the If-Sequence-Number-LE condition.
     *
     * @const
     * @type {string}
     */
    SEQUENCE_NUMBER_LESS_THAN_OR_EQUAL: 'x-ms-if-sequence-number-le',
    /**
     * The header that specifies sequence number action.
     *
     * @const
     * @type {string}
     */
    SEQUENCE_NUMBER_ACTION: 'x-ms-sequence-number-action',
    /**
     * The header for the blob content length.
     *
     * @const
     * @type {string}
     */
    SIZE: 'x-ms-blob-content-length',
    /**
     * The header for snapshots.
     *
     * @const
     * @type {string}
     */
    SNAPSHOT: 'x-ms-snapshot',
    /**
     * Specifies only snapshots are to be included.
     *
     * @const
     * @type {string}
     */
    SNAPSHOTS_ONLY_VALUE: 'only',
    /**
     * The header for the If-Match condition.
     *
     * @const
     * @type {string}
     */
    SOURCE_IF_MATCH: 'x-ms-source-if-match',
    /**
     * The header for the If-Modified-Since condition.
     *
     * @const
     * @type {string}
     */
    SOURCE_IF_MODIFIED_SINCE: 'x-ms-source-if-modified-since',
    /**
     * The header for the If-None-Match condition.
     *
     * @const
     * @type {string}
     */
    SOURCE_IF_NONE_MATCH: 'x-ms-source-if-none-match',
    /**
     * The header for the If-Unmodified-Since condition.
     *
     * @const
     * @type {string}
     */
    SOURCE_IF_UNMODIFIED_SINCE: 'x-ms-source-if-unmodified-since',
    /**
     * The header for data ranges.
     *
     * @const
     * @type {string}
     */
    STORAGE_RANGE: 'x-ms-range',
    /**
     * The header for storage version.
     *
     * @const
     * @type {string}
     */
    STORAGE_VERSION: 'x-ms-version',
    /**
     * The current storage version header value.
     *
     * @const
     * @type {string}
     */
    TARGET_STORAGE_VERSION: '2015-12-11',
    /**
     * The UserAgent header.
     *
     * @const
     * @type {string}
     */
    USER_AGENT: 'user-agent',
    /**
     * The pop receipt header.
     *
     * @const
     * @type {string}
     */
    POP_RECEIPT: 'x-ms-popreceipt',
    /**
     * The time next visibile header.
     *
     * @const
     * @type {string}
     */
    TIME_NEXT_VISIBLE: 'x-ms-time-next-visible',
    /**
     * The approximate message counter header.
     *
     * @const
     * @type {string}
     */
    APPROXIMATE_MESSAGE_COUNT: 'x-ms-approximate-message-count',
    /**
     * The lease action header.
     *
     * @const
     * @type {string}
     */
    LEASE_ACTION: 'x-ms-lease-action',
    /**
     * The accept header.
     *
     * @const
     * @type {string}
     */
    ACCEPT: 'accept',
    /**
     * The accept charset header.
     *
     * @const
     * @type {string}
     */
    ACCEPT_CHARSET: 'Accept-Charset',
    /**
     * The host header.
     *
     * @const
     * @type {string}
     */
    HOST: 'host',
    /**
     * The correlation identifier header.
     *
     * @const
     * @type {string}
     */
    CORRELATION_ID: 'x-ms-correlation-id',
    /**
     * The group identifier header.
     *
     * @const
     * @type {string}
     */
    GROUP_ID: 'x-ms-group-id',
    /**
     * The share quota header.
     *
     * @const
     * @type {string}
     */
    SHARE_QUOTA: 'x-ms-share-quota',
    /**
     * The max blob size header.
     *
     * @const
     * @type {int}
     */
    BLOB_CONDITION_MAX_SIZE: 'x-ms-blob-condition-maxsize',
    /**
     * The append blob position header.
     *
     * @const
     * @type {int}
     */
    BLOB_CONDITION_APPEND_POSITION: 'x-ms-blob-condition-appendpos',
    /**
     * The append blob append offset header.
     *
     * @const
     * @type {int}
     */
    BLOB_APPEND_OFFSET: 'x-ms-blob-append-offset',
    /**
     * The append blob committed block header.
     *
     * @const
     * @type {int}
     */
    BLOB_COMMITTED_BLOCK_COUNT: 'x-ms-blob-committed-block-count',
    /**
     * If the data and application metadata are completely encrypted using the specified algorithm.
     *
     * @const
     * @type {bool}
     */
    SERVER_ENCRYPTED: 'x-ms-server-encrypted',
    /**
     * The SME authorization header.
     */
    SME_AUTHORIZATION: 'x-ms-sme-authorization',
    /**
     * The Use Laps Header.
     */
    USE_LAPS: 'x-ms-sme-useLaps',
    /**
     * The Laps local admin name.
     */
    LAPS_LOCALADMINNAME: 'x-ms-sme-lapsLocalAdminName',
    /**
     * @deprecated
     * The EMT authentication header. (TO be removed.)
     */
    EMT_AUTHENTICATION: 'EMT-Authentication',
    /**
     * Flag to log audit for the request
     */
    LOG_AUDIT: 'x-ms-sme-log-audit',
    /**
     * Flag to log telemetry for the request
     */
    LOG_TELEMETRY: 'x-ms-sme-log-telemetry',
    /**
     * Name of module making the request
     */
    MODULE_NAME: 'x-ms-sme-module-name',
    /**
     * Version of module making the request.
     */
    MODULE_VERSION: 'x-ms-sme-module-version'
};
export var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["Continue"] = 100] = "Continue";
    HttpStatusCode[HttpStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
    HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
    HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
    HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
    HttpStatusCode[HttpStatusCode["ResetContent"] = 205] = "ResetContent";
    HttpStatusCode[HttpStatusCode["PartialContent"] = 206] = "PartialContent";
    HttpStatusCode[HttpStatusCode["Ambiguous"] = 300] = "Ambiguous";
    HttpStatusCode[HttpStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
    HttpStatusCode[HttpStatusCode["Moved"] = 301] = "Moved";
    HttpStatusCode[HttpStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
    HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
    HttpStatusCode[HttpStatusCode["Redirect"] = 302] = "Redirect";
    HttpStatusCode[HttpStatusCode["RedirectMethod"] = 303] = "RedirectMethod";
    HttpStatusCode[HttpStatusCode["SeeOther"] = 303] = "SeeOther";
    HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
    HttpStatusCode[HttpStatusCode["UseProxy"] = 305] = "UseProxy";
    HttpStatusCode[HttpStatusCode["Unused"] = 306] = "Unused";
    HttpStatusCode[HttpStatusCode["RedirectKeepVerb"] = 307] = "RedirectKeepVerb";
    HttpStatusCode[HttpStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
    HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
    HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
    HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
    HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpStatusCode[HttpStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
    HttpStatusCode[HttpStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpStatusCode[HttpStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
    HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
    HttpStatusCode[HttpStatusCode["Gone"] = 410] = "Gone";
    HttpStatusCode[HttpStatusCode["LengthRequired"] = 411] = "LengthRequired";
    HttpStatusCode[HttpStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
    HttpStatusCode[HttpStatusCode["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
    HttpStatusCode[HttpStatusCode["RequestUriTooLong"] = 414] = "RequestUriTooLong";
    HttpStatusCode[HttpStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    HttpStatusCode[HttpStatusCode["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    HttpStatusCode[HttpStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
    HttpStatusCode[HttpStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
    HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
    HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
    HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
    HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
})(HttpStatusCode || (HttpStatusCode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9odHRwLWNvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRztJQUMzQjs7Ozs7T0FLRztJQUNILGFBQWEsRUFBRSxlQUFlO0lBRTlCOzs7OztPQUtHO0lBQ0gseUJBQXlCLEVBQUUsMkJBQTJCO0lBRXREOzs7OztPQUtHO0lBQ0gsaUJBQWlCLEVBQUUsbUJBQW1CO0lBRXRDOzs7OztPQUtHO0lBQ0gsTUFBTSxFQUFFLFFBQVE7SUFFaEI7Ozs7O09BS0c7SUFDSCxRQUFRLEVBQUUsVUFBVTtJQUVwQjs7Ozs7T0FLRztJQUNILGFBQWEsRUFBRSxlQUFlO0lBRTlCOzs7OztPQUtHO0lBQ0gsb0JBQW9CLEVBQUUsb0JBQW9CO0lBRTFDOzs7OztPQUtHO0lBQ0gsd0JBQXdCLEVBQUUsdUJBQXVCO0lBRWpEOzs7OztPQUtHO0lBQ0gsa0JBQWtCLEVBQUUsT0FBTztJQUUzQjs7Ozs7T0FLRztJQUNILGlCQUFpQixFQUFFLHdCQUF3QjtJQUUzQzs7Ozs7T0FLRztJQUNILDBCQUEwQixFQUFFLGlDQUFpQztJQUU3RDs7Ozs7T0FLRztJQUNILGFBQWEsRUFBRSxlQUFlO0lBRTlCOzs7OztPQUtHO0lBQ0gsa0JBQWtCLEVBQUUseUJBQXlCO0lBRTdDOzs7OztPQUtHO0lBQ0gsU0FBUyxFQUFFLGdCQUFnQjtJQUUzQjs7Ozs7T0FLRztJQUNILElBQUksRUFBRSxXQUFXO0lBRWpCOzs7OztPQUtHO0lBQ0gsVUFBVSxFQUFFLFdBQVc7SUFFdkI7Ozs7O09BS0c7SUFDSCxhQUFhLEVBQUUsZUFBZTtJQUU5Qjs7Ozs7T0FLRztJQUNILGtCQUFrQixFQUFFLHlCQUF5QjtJQUU3Qzs7Ozs7T0FLRztJQUNILGtCQUFrQixFQUFFLG9CQUFvQjtJQUV4Qzs7Ozs7T0FLRztJQUNILFdBQVcsRUFBRSxrQkFBa0I7SUFFL0I7Ozs7O09BS0c7SUFDSCxvQkFBb0IsRUFBRSwyQkFBMkI7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