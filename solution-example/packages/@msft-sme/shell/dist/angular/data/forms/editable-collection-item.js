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
import { BaseFormData } from './base-form-data';
/**
 * A base class outlining functionality for tracking changes to form collection items that can be added or deleted.
 */
var EditableCollectionItem = (function (_super) {
    __extends(EditableCollectionItem, _super);
    /**
     * Initializes a new instance of the EditableCollectionItem class.
     *
     * @param [dataModel] - The data model used as a base to create the form model.
     */
    function EditableCollectionItem(dataModel) {
        var _this = _super.call(this, dataModel) || this;
        _this.isNew = !dataModel;
        _this.isMarkedForDeletion = false;
        if (_this.isNew) {
            _this.dataModel = _this.createModelForNew();
            _this.initializeFromModel();
        }
        return _this;
    }
    /**
     * Checks if this instance is the same as another instance.
     *
     * @param otherItem - The item to compare to.
     */
    EditableCollectionItem.prototype.areTheSame = function (otherItem) {
        return otherItem && !this.isNew && !otherItem.isNew && this.areTheSameInternal(otherItem);
    };
    return EditableCollectionItem;
}(BaseFormData));
export { EditableCollectionItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvZGF0YS9mb3Jtcy9lZGl0YWJsZS1jb2xsZWN0aW9uLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRDs7R0FFRztBQUNIO0lBQWlFLDBDQUF3QjtJQUlyRjs7OztPQUlHO0lBQ0gsZ0NBQVksU0FBc0I7UUFBbEMsWUFDSSxrQkFBTSxTQUFTLENBQUMsU0FRbkI7UUFQRyxLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQy9CLENBQUM7O0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwyQ0FBVSxHQUFqQixVQUFrQixTQUE2QztRQUMzRCxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFlTCw2QkFBQztBQUFELENBMUNBLEFBMENDLENBMUNnRSxZQUFZLEdBMEM1RSIsImZpbGUiOiJlZGl0YWJsZS1jb2xsZWN0aW9uLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9