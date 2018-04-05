/**
 * The deferred class based on native Promise.
 */
var NativeDeferred = (function () {
    /**
     * Initializes a new instance of the NativeDeferred class.
     */
    function NativeDeferred() {
        var _this = this;
        /**
         * Is fulfilled tracked status.
         */
        this.isFulfilled = false;
        /**
         * Is pending tracked status.
         */
        this.isPending = true;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = function (data) { resolve(data); _this.isFulfilled = true; _this.isPending = false; };
            _this.reject = function (error) { reject(error); _this.isPending = false; };
        });
    }
    return NativeDeferred;
}());
export { NativeDeferred };
/**
 * Native Q to attach on native Promise.
 */
var NativeQ = (function () {
    function NativeQ() {
    }
    /**
     * Create native deferred object.
     */
    NativeQ.defer = function () {
        return new NativeDeferred();
    };
    /**
     * Create rejected native deferred object.
     */
    NativeQ.rejected = function (reason) {
        var deferred = new NativeDeferred();
        deferred.reject(reason);
        return deferred.promise;
    };
    /**
     * Create resolved native deferred object.
     */
    NativeQ.resolved = function (data) {
        var deferred = new NativeDeferred();
        deferred.resolve(data);
        return deferred.promise;
    };
    return NativeQ;
}());
export { NativeQ };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9uYXRpdmUtcS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNIO0lBMEJJOztPQUVHO0lBQ0g7UUFBQSxpQkFLQztRQWxCRDs7V0FFRztRQUNJLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTNCOztXQUVHO1FBQ0ksY0FBUyxHQUFHLElBQUksQ0FBQztRQU1wQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFJLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDMUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxVQUFDLElBQUksSUFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdGLEtBQUksQ0FBQyxNQUFNLEdBQUcsVUFBQyxLQUFLLElBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQW5DQSxBQW1DQyxJQUFBOztBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQXlCQSxDQUFDO0lBeEJHOztPQUVHO0lBQ1csYUFBSyxHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLGNBQWMsRUFBSyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNXLGdCQUFRLEdBQXRCLFVBQTBCLE1BQVk7UUFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxjQUFjLEVBQUssQ0FBQztRQUN2QyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNXLGdCQUFRLEdBQXRCLFVBQTBCLElBQVE7UUFDOUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxjQUFjLEVBQUssQ0FBQztRQUN2QyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQSIsImZpbGUiOiJuYXRpdmUtcS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=