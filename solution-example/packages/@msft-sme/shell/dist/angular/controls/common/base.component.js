/**
 * A base class to bootstrap components.
 *
 * @template TResourceStrings The typed interface for resource strings.
 */
var BaseComponent = (function () {
    /**
     * Initializes a new instance of the {BaseComponent} class.
     *
     * @param {AppContextService} appContextService The app context service.
     */
    function BaseComponent(appContextService) {
        this.appContextService = appContextService;
        this.strings = this.appContextService.resourceCache.getStrings();
        this.subscriptions = [];
    }
    /**
     * The method to run when the component is destroyed.
     */
    BaseComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            if (subscription) {
                subscription.unsubscribe();
            }
        });
    };
    return BaseComponent;
}());
export { BaseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvY29tbW9uL2Jhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBOzs7O0dBSUc7QUFDSDtJQUlJOzs7O09BSUc7SUFDSCx1QkFBc0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBSyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNJLG1DQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQy9CLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxvQkFBQztBQUFELENBeEJBLEFBd0JDLElBQUEiLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9