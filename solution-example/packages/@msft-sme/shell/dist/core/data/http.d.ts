import { Observable } from 'rxjs/Observable';
import { AjaxError, AjaxRequest, AjaxResponse } from 'rxjs/Observable/dom/AjaxObservable';
import { HttpStatusCode } from './http-constants';
/**
 * The Http Retry Handler interface. Describes an object that can handle specific status codes.
 * the handle function takes a status code, AjaxRequest and AjaxError.
 * It returns an observable for new AjaxRequest to try again
 */
export interface HttpResponseRetryHandler {
    canHandle(code: HttpStatusCode, error: AjaxError): boolean;
    handle(code: HttpStatusCode, request: AjaxRequest, error: AjaxError): Observable<AjaxRequest>;
}
/**
 * Retry options for an http request
 */
export declare class HttpRetryOptions {
    maxRetry: number;
    handlers: HttpResponseRetryHandler[];
}
/**
 * The Http observable based class.
 */
export declare class Http {
    /**
     * The ajax GET method.
     */
    static methodGet: string;
    /**
     * The ajax POST method.
     */
    static methodPost: string;
    /**
     * The ajax PUT method.
     */
    static methodPut: string;
    /**
     * The ajax DELETE method.
     */
    static methodDelete: string;
    /**
     * The ajax PATCH method.
     */
    static methodPatch: string;
    /**
     * The ajax HEAD method.
     */
    static methodHead: string;
    /**
     * The ajax OPTIONS method.
     */
    static methodOptions: string;
    /**
     * The default retry options.
     */
    defaultRetryOptions: HttpRetryOptions;
    /**
     * The common request method.
     * Adds default responseType, contentType, Accept values if they are not already included in the request
     *
     * @param request the request options.
     * @param options the retry options.
     */
    request(request: AjaxRequest, retryOptions?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request without modification.
     * If the result is an error, we will retry with the handlers in options
     *
     * @param request the request options.
     * @param options the retry options.
     * @param count the current iteration of the retry cycle.
     */
    private requestWithHandlers(request, retryOptions, count?);
    /**
     * Performs a request with `get` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    get(url: string, request?: AjaxRequest, options?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request with `post` http method.
     *
     * @param url the url.
     * @param body the body content.
     * @param request the request options.
     * @param options the retry options.
     */
    post(url: string, body: any, request?: AjaxRequest, options?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request with `put` http method.
     *
     * @param url the url.
     * @param body the body content.
     * @param request the request options.
     * @param options the retry options.
     */
    put(url: string, body: any, request?: AjaxRequest, options?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request with `delete` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    delete(url: string, request?: AjaxRequest, options?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request with `patch` http method.
     *
     * @param url the url.
     * @param body the body content.
     * @param request the request options.
     * @param options the retry options.
     */
    patch(url: string, body: any, request?: AjaxRequest, options?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request with `head` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    head(url: string, request?: AjaxRequest, options?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request with `options` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    options(url: string, request?: AjaxRequest, options?: HttpRetryOptions): Observable<AjaxResponse>;
    /**
     * Performs a request with 'get' http method with cache control.
     *
     * @param url the uri for GET call.
     * @return {Observable<any>} the observable for GET result data.
     */
    getNoCache(url: string, noCache?: boolean): Observable<AjaxResponse>;
}
