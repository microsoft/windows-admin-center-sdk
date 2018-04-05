/**
 * A base class to bootstrap components.
 *
 * @template TResourceStrings The typed interface for resource strings.
 */
var BaseComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the {BaseComponent} class.
     *
     * @param {AppContextService} appContextService The app context service.
     */
    function BaseComponent(appContextService) {
        var _this = this;
        this.appContextService = appContextService;
        this.strings = this.appContextService.resourceCache.getStrings();
        this.subscriptions = [];
        this.componentId = "component-" + BaseComponent.nextComponentId++;
        this.idBag = this.createIdBag();
        MsftSme.forEachKey(this.idBag, function (key) {
            _this.idBag[key] = _this.componentId + "-" + key;
        });
    }
    /**
     * The method to run when the component is destroyed.
     */
    BaseComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            if (subscription && !subscription.closed) {
                subscription.unsubscribe();
            }
        });
    };
    /**
     * Creates the idBag used by this component to store unique element ids
     */
    BaseComponent.prototype.createIdBag = function () {
        return {};
    };
    /**
     * Static constent to provide unique ids for each component
     * @see {componentId}
     */
    BaseComponent.nextComponentId = 0;
    return BaseComponent;
}());
export { BaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvY29tbW9uL2Jhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBOzs7O0dBSUc7QUFDSDtJQThCSTs7OztPQUlHO0lBQ0gsdUJBQXNCLGlCQUFvQztRQUExRCxpQkFRQztRQVJxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUssQ0FBQztRQUNwRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLGVBQWEsYUFBYSxDQUFDLGVBQWUsRUFBSSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLEdBQUc7WUFDL0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBTSxLQUFJLENBQUMsV0FBVyxTQUFJLEdBQUssQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLG1DQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDL0IsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUNBQVcsR0FBckI7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQTNERDs7O09BR0c7SUFDWSw2QkFBZSxHQUFHLENBQUMsQ0FBQztJQXdEdkMsb0JBQUM7Q0E5REQsQUE4REMsSUFBQTtTQTlEcUIsYUFBYSIsImZpbGUiOiJiYXNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=