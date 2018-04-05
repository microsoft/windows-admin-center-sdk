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
import { BaseFormData } from '@msft-sme/shell/angular';
var IsolatedSetting4FormData = /** @class */ (function (_super) {
    __extends(IsolatedSetting4FormData, _super);
    function IsolatedSetting4FormData(dataModel) {
        return _super.call(this, dataModel) || this;
    }
    IsolatedSetting4FormData.prototype.applyUpdatesToModel = function (target) {
        target.addresses = this.addresses;
        target.name = this.name;
        target.salary = this.salary;
    };
    IsolatedSetting4FormData.prototype.convertToModel = function () {
        var newModel = {};
        Object.assign(newModel, this.dataModel);
        this.applyUpdatesToModel(newModel);
        return newModel;
    };
    IsolatedSetting4FormData.prototype.initializeFromModel = function () {
        this.addresses = this.dataModel.addresses;
        this.name = this.dataModel.name;
        this.salary = this.dataModel.salary;
    };
    return IsolatedSetting4FormData;
}(BaseFormData));
export { IsolatedSetting4FormData };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9zZXR0aW5ncy9jb21tb24tc2V0dGluZ3MtaXNvbGF0ZWQvbW9kZWwvaXNvbGF0ZWQtc2V0dGluZzQtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWV2RDtJQUE4Qyw0Q0FBMEM7SUFLcEYsa0NBQVksU0FBdUM7ZUFDL0Msa0JBQU0sU0FBUyxDQUFDO0lBQ3BCLENBQUM7SUFFTSxzREFBbUIsR0FBMUIsVUFBMkIsTUFBb0M7UUFDM0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN4QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVNLGlEQUFjLEdBQXJCO1FBQ0ksSUFBSSxRQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLHNEQUFtQixHQUExQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFDTCwrQkFBQztBQUFELENBNUJBLEFBNEJDLENBNUI2QyxZQUFZLEdBNEJ6RCIsImZpbGUiOiJpc29sYXRlZC1zZXR0aW5nNC1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=