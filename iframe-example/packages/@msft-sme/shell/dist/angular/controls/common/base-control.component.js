var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseComponent } from './base.component';
/**
 * A base class to bootstrap control components.
 * The difference between this and BaseComponent is that this class is geared toward components that do DOM manipulation.
 * Whereas most normal components do not directly manipulate the dom and can just use BaseComponent
 * @template TResourceStrings The typed interface for resource strings.
 */
var BaseControl = /** @class */ (function (_super) {
    __extends(BaseControl, _super);
    /**
     * Initializes a new instance of the {BaseControl} class.
     *
     * @param {AppContextService} appContextService The app context service.
     */
    function BaseControl(renderer, hostElement, appContextService) {
        var _this = _super.call(this, appContextService) || this;
        _this.renderer = renderer;
        _this.hostElement = hostElement;
        _this.applyInitialHostClasses();
        return _this;
    }
    /**
     * Gets the initial host classes to be applied to this element
     */
    BaseControl.prototype.getInitialHostClasses = function () {
        return [];
    };
    /**
     * Applies the initial classes to this components host element.
     * We preserve any custom classes by removing them, applying the base classes and reapplying the custom classes.
     */
    BaseControl.prototype.applyInitialHostClasses = function () {
        var _this = this;
        var customClasses = MsftSme.getClasses(this.hostElement.nativeElement);
        customClasses.forEach(function (c) { return _this.renderer.removeClass(_this.hostElement.nativeElement, c); });
        this.getInitialHostClasses()
            .concat(customClasses)
            .forEach(function (c) { return _this.renderer.addClass(_this.hostElement.nativeElement, c); });
    };
    return BaseControl;
}(BaseComponent));
export { BaseControl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvY29tbW9uL2Jhc2UtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRDs7Ozs7R0FLRztBQUNIO0lBQW9ELCtCQUF1QjtJQUN2RTs7OztPQUlHO0lBQ0gscUJBQ2MsUUFBbUIsRUFDbkIsV0FBdUIsRUFDakMsaUJBQW9DO1FBSHhDLFlBS0ksa0JBQU0saUJBQWlCLENBQUMsU0FFM0I7UUFOYSxjQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGlCQUFXLEdBQVgsV0FBVyxDQUFZO1FBSWpDLEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDOztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDTywyQ0FBcUIsR0FBL0I7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNLLDZDQUF1QixHQUEvQjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBNUQsQ0FBNEQsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxxQkFBcUIsRUFBRTthQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUF6RCxDQUF5RCxDQUFDLENBQUE7SUFDaEYsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FqQ0EsQUFpQ0MsQ0FqQ21ELGFBQWEsR0FpQ2hFIiwiZmlsZSI6ImJhc2UtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9