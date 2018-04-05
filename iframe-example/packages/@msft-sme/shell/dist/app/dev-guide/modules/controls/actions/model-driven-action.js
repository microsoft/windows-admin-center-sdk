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
import { Subject } from 'rxjs';
import { ActionButtonAsync } from '../../../../../angular';
function fakeAsync() {
    var subject = new Subject();
    setTimeout(function () {
        subject.next();
        subject.complete();
    }, 1000);
    return subject;
}
function fakeAsyncError() {
    var subject = new Subject();
    setTimeout(function () {
        subject.error('This is bad! Panic and run! Panic and run!');
        subject.complete();
    }, 1000);
    return subject;
}
var ModelDrivenAction1 = /** @class */ (function (_super) {
    __extends(ModelDrivenAction1, _super);
    function ModelDrivenAction1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = 'Action1';
        return _this;
    }
    ModelDrivenAction1.prototype.onExecute = function (target) {
        var done = new Subject();
        // after some time, this action will changes the model so that itself is disabled, action 2 is disabled , and action 3 is hidden  
        fakeAsync().subscribe(function () {
            target.disable1 = true;
            target.disable2 = false;
            target.hidden3 = false;
            done.next(target);
            done.complete();
        });
        return done;
    };
    ModelDrivenAction1.prototype.setActionState = function (target, container) {
        _super.prototype.setActionState.call(this, target, container);
        this.enabled = target && !target.disable1 && container.enabled && !container.isBusy;
    };
    return ModelDrivenAction1;
}(ActionButtonAsync));
export { ModelDrivenAction1 };
var ModelDrivenAction2 = /** @class */ (function (_super) {
    __extends(ModelDrivenAction2, _super);
    function ModelDrivenAction2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = 'Action2';
        return _this;
    }
    ModelDrivenAction2.prototype.onExecute = function (target) {
        var done = new Subject();
        // after some time, this action will changes the model so that itself is disabled, action 1 is disabled , and action 3 is visible  
        fakeAsync().subscribe(function () {
            target.disable1 = false;
            target.disable2 = true;
            target.hidden3 = true;
            done.next(target);
            done.complete();
        });
        return done;
    };
    ModelDrivenAction2.prototype.setActionState = function (target, container) {
        _super.prototype.setActionState.call(this, target, container);
        this.enabled = target && !target.disable2 && container.enabled && !container.isBusy;
    };
    return ModelDrivenAction2;
}(ActionButtonAsync));
export { ModelDrivenAction2 };
var ModelDrivenAction3 = /** @class */ (function (_super) {
    __extends(ModelDrivenAction3, _super);
    function ModelDrivenAction3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = 'Action3';
        return _this;
    }
    ModelDrivenAction3.prototype.onExecute = function (target) {
        var done = new Subject();
        // after some time, this action will popup an alert. it does not change the model so it calls next with the target passed in
        fakeAsync().subscribe(function () {
            alert('Action3 complete!');
            done.next(target);
            done.complete();
        });
        return done;
    };
    ModelDrivenAction3.prototype.setActionState = function (target, container) {
        _super.prototype.setActionState.call(this, target, container);
        this.enabled = container.enabled && !container.isBusy;
        this.hidden = target && target.hidden3;
    };
    return ModelDrivenAction3;
}(ActionButtonAsync));
export { ModelDrivenAction3 };
var ModelDrivenActionWithError = /** @class */ (function (_super) {
    __extends(ModelDrivenActionWithError, _super);
    function ModelDrivenActionWithError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = 'Cause async error';
        return _this;
    }
    ModelDrivenActionWithError.prototype.onExecute = function (target) {
        var done = new Subject();
        fakeAsyncError().subscribe(function () { throw ('we should not hit this.'); }, function (error) {
            done.error(error);
            done.complete();
        });
        return done;
    };
    ModelDrivenActionWithError.prototype.setActionState = function (target, container) {
        _super.prototype.setActionState.call(this, target, container);
        this.enabled = container.enabled && !container.isBusy;
    };
    return ModelDrivenActionWithError;
}(ActionButtonAsync));
export { ModelDrivenActionWithError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9hY3Rpb25zL21vZGVsLWRyaXZlbi1hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFnQixpQkFBaUIsRUFBbUIsTUFBTSx3QkFBd0IsQ0FBQztBQVExRjtJQUNJLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFDbEMsVUFBVSxDQUNOO1FBQ0ksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsRUFDRCxJQUFJLENBQUMsQ0FBQztJQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVEO0lBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUNsQyxVQUFVLENBQ047UUFDSSxPQUFPLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsRUFDRCxJQUFJLENBQUMsQ0FBQztJQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUVEO0lBQXdDLHNDQUEwQjtJQUFsRTtRQUFBLHFFQXFCQztRQXBCVSxVQUFJLEdBQUcsU0FBUyxDQUFDOztJQW9CNUIsQ0FBQztJQWxCYSxzQ0FBUyxHQUFuQixVQUFvQixNQUFlO1FBQy9CLElBQUksSUFBSSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDbEMsa0lBQWtJO1FBQ2xJLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNsQixNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2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QUFJLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUNsQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQ3RCLGNBQVEsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVDLFVBQUEsS0FBSztZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBRVAsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sbURBQWMsR0FBckIsVUFBc0IsTUFBZSxFQUFFLFNBQTBCO1FBQzdELGlCQUFNLGNBQWMsWUFBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUMxRCxDQUFDO0lBQ0wsaUNBQUM7QUFBRCxDQW5CQSxBQW1CQyxDQW5CK0MsaUJBQWlCLEdBbUJoRSIsImZpbGUiOiJtb2RlbC1kcml2ZW4tYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==