import { Observable } from 'rxjs/Observable';
/**
 * Retry options for an http request
 */
var HttpRetryOptions = /** @class */ (function () {
    function HttpRetryOptions() {
        this.maxRetry = 0;
        this.handlers = [];
    }
    return HttpRetryOptions;
}());
export { HttpRetryOptions };
/**
 * The Http observable based class.
 */
var Http = /** @class */ (function () {
    function Http() {
        /**
         * The default retry options.
         */
        this.defaultRetryOptions = new HttpRetryOptions();
    }
    /**
     * The common request method.
     * Adds default responseType, contentType, Accept values if they are not already included in the request
     *
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.request = function (request, retryOptions) {
        if (!request) {
            request = {};
        }
        if (!retryOptions) {
            retryOptions = this.defaultRetryOptions;
        }
        if (!request.headers) {
            request.headers = {};
        }
        if (!request.responseType) {
            request.responseType = 'json';
        }
        if (request.headers && !request.headers['Content-Type']) {
            request.headers['Content-Type'] = 'application/json; charset=utf-8';
        }
        if (request.headers && !request.headers['Accept']) {
            request.headers['Accept'] = 'application/json, text/plain, */*';
        }
        if (retryOptions.maxRetry > 0 && retryOptions.handlers && retryOptions.handlers.length > 0) {
            return this.requestWithHandlers(request, retryOptions);
        }
        return Observable.ajax(request);
    };
    /**
     * Performs a request without modification.
     * If the result is an error, we will retry with the handlers in options
     *
     * @param request the request options.
     * @param options the retry options.
     * @param count the current iteration of the retry cycle.
     */
    Http.prototype.requestWithHandlers = function (request, retryOptions, count) {
        if (count === void 0) { count = 0; }
        return Observable.ajax(request)
            .catch(function (error, caught) {
            // original request is replaced with latest instance. it must take current error request.
            var caughtRequest = caught.source.request;
            if (++count > retryOptions.maxRetry) {
                return Observable.throw(error);
            }
            var handler = retryOptions.handlers.find(function (handler2) { return handler2.canHandle(error.status, error); });
            if (!handler) {
                return Observable.throw(error);
            }
            return handler.handle(error.status, caughtRequest, error)
                .catch(function (handlerError) {
                // if the handler throws, return the original error with an inserted property for the handler error    
                error['handlerError'] = handlerError;
                return Observable.throw(error);
            })
                .switchMap(function (nextRequest) { return Observable.ajax(caughtRequest); });
        });
    };
    /**
     * Performs a request with `get` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.get = function (url, request, options) {
        request = request ? request : {};
        request.url = url;
        request.method = Http.methodGet;
        return this.request(request, options);
    };
    /**
     * Performs a request with `post` http method.
     *
     * @param url the url.
     * @param body the body content.
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.post = function (url, body, request, options) {
        request = request ? request : {};
        request.url = url;
        request.method = Http.methodPost;
        request.body = body;
        return this.request(request, options);
    };
    /**
     * Performs a request with `put` http method.
     *
     * @param url the url.
     * @param body the body content.
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.put = function (url, body, request, options) {
        request = request ? request : {};
        request.url = url;
        request.method = Http.methodPut;
        request.body = body;
        return this.request(request, options);
    };
    /**
     * Performs a request with `delete` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.delete = function (url, request, options) {
        request = request ? request : {};
        request.url = url;
        request.method = Http.methodDelete;
        return this.request(request, options);
    };
    /**
     * Performs a request with `patch` http method.
     *
     * @param url the url.
     * @param body the body content.
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.patch = function (url, body, request, options) {
        request = request ? request : {};
        request.url = url;
        request.method = Http.methodPatch;
        request.body = body;
        return this.request(request, options);
    };
    /**
     * Performs a request with `head` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.head = function (url, request, options) {
        request = request ? request : {};
        request.url = url;
        request.method = Http.methodHead;
        return this.request(request, options);
    };
    /**
     * Performs a request with `options` http method.
     *
     * @param url the url.
     * @param request the request options.
     * @param options the retry options.
     */
    Http.prototype.options = function (url, request, options) {
        request = request ? request : {};
        request.url = url;
        request.method = Http.methodOptions;
        return this.request(request, options);
    };
    /**
     * Performs a request with 'get' http method with cache control.
     *
     * @param url the uri for GET call.
     * @return {Observable<any>} the observable for GET result data.
     */
    Http.prototype.getNoCache = function (url, noCache) {
        if (noCache === void 0) { noCache = true; }
        var publish = Observable.create(function (observer) {
            var request = new XMLHttpRequest();
            var handler = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        try {
                            observer.next({
                                status: request.status,
                                response: JSON.parse(request.response)
                            });
                            observer.complete();
                        }
                        catch (e) {
                            observer.error(e);
                        }
                    }
                    else {
                        observer.error(request.statusText);
                    }
                }
            };
            request.open('Get', url);
            if (noCache) {
                request.setRequestHeader('Cache-control', 'no-cache');
            }
            request.onreadystatechange = handler;
            request.send();
        });
        return publish;
    };
    /**
     * The ajax GET method.
     */
    Http.methodGet = 'GET';
    /**
     * The ajax POST method.
     */
    Http.methodPost = 'POST';
    /**
     * The ajax PUT method.
     */
    Http.methodPut = 'PUT';
    /**
     * The ajax DELETE method.
     */
    Http.methodDelete = 'DELETE';
    /**
     * The ajax PATCH method.
     */
    Http.methodPatch = 'PATCH';
    /**
     * The ajax HEAD method.
     */
    Http.methodHead = 'HEAD';
    /**
     * The ajax OPTIONS method.
     */
    Http.methodOptions = 'OPTIONS';
    return Http;
}());
export { Http };
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxVQUFBLFFBQVE7WUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNuQyxJQUFJLE9BQU8sR0FBRztnQkFDVixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksQ0FBQzs0QkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDO2dDQUNWLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtnQ0FDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs2QkFDekMsQ0FBQyxDQUFDOzRCQUNILFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDeEIsQ0FBQzt3QkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNULFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLENBQUM7b0JBQ0wsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdkMsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixPQUFPLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFFRCxPQUFPLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQTVQRDs7T0FFRztJQUNXLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFFaEM7O09BRUc7SUFDVyxlQUFVLEdBQUcsTUFBTSxDQUFDO0lBRWxDOztPQUVHO0lBQ1csY0FBUyxHQUFHLEtBQUssQ0FBQztJQUVoQzs7T0FFRztJQUNXLGlCQUFZLEdBQUcsUUFBUSxDQUFDO0lBRXRDOztPQUVHO0lBQ1csZ0JBQVcsR0FBRyxPQUFPLENBQUM7SUFFcEM7O09BRUc7SUFDVyxlQUFVLEdBQUcsTUFBTSxDQUFDO0lBRWxDOztPQUVHO0lBQ1csa0JBQWEsR0FBRyxTQUFTLENBQUM7SUE0TjVDLFdBQUM7Q0E5UEQsQUE4UEMsSUFBQTtTQTlQWSxJQUFJIiwiZmlsZSI6Imh0dHAuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9