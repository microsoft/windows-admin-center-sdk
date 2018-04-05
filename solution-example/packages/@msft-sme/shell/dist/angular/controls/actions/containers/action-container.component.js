import { ContentChildren, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
var ActionContainerComponent = (function () {
    function ActionContainerComponent(iterableDiffers) {
        this.iterableDiffers = iterableDiffers;
        this.error = new EventEmitter();
        this.executed = new EventEmitter();
        this.combinedActions = [];
        this.internalActions = [];
        this.inlineActions = [];
        this.enabledInternal = true;
    }
    Object.defineProperty(ActionContainerComponent.prototype, "actions", {
        get: function () {
            this.combinedActions.length = 0;
            this.combinedActions.push.apply(this.combinedActions, this.internalActions.concat(this.inlineActions));
            return this.combinedActions;
        },
        set: function (actions) {
            this.internalActions = actions || [];
            this.updateActions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionContainerComponent.prototype, "target", {
        get: function () {
            return this.internalTarget;
        },
        set: function (target) {
            this.internalTarget = target;
            this.updateActionStates();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionContainerComponent.prototype, "enabled", {
        get: function () {
            return this.enabledInternal;
        },
        set: function (enabled) {
            this.enabledInternal = enabled;
            this.updateActionStates();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionContainerComponent.prototype, "isBusy", {
        get: function () {
            return this.actions && this.actions.some(function (action) { return action.busy; });
        },
        enumerable: true,
        configurable: true
    });
    ActionContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // whenever an action executes or errors, update action states
        // NOTE: Angular documentation states that we should not treat event emitters as observables. 
        // in the future this could break if angular changes its implementation. 
        // We should consider another way of surfacing this.
        this.completedSubscription = Observable.merge(this.executed, this.error).subscribe(function (next) { return _this.updateActionStates(); });
    };
    ActionContainerComponent.prototype.ngOnDestroy = function () {
        this.completedSubscription.unsubscribe();
    };
    ActionContainerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.childActions.changes.subscribe(function (val) {
            _this.inlineActions.length = 0;
            _this.inlineActions.push.apply(_this.inlineActions, _this.childActions.map(function (item) { return item.action; }));
        });
        this.inlineActions = this.childActions.map(function (item) { return item.action; });
        this.updateActions();
    };
    /**
     * Angular's doCheck life cycle hook. Note there is an odd condition when trying to create dynamic toolbar items inline with ng for.
     * Somehow  this method is not getting called in time to initialize the button that is created by the ng for statement.
     * Needs more investigation
     */
    ActionContainerComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.actionsDiffer) {
            var changes = this.actionsDiffer.diff(this.actions);
            if (changes) {
                changes.forEachAddedItem(function (record) { return (record.item).addedToContainer(_this.target, _this); });
                changes.forEachRemovedItem(function (record) { return (record.item).removedFromContainer(); });
            }
        }
        if (this.wasBusy !== this.isBusy) {
            this.wasBusy = this.isBusy;
            this.updateActionStates();
        }
    };
    ActionContainerComponent.prototype.updateActionStates = function () {
        var _this = this;
        if (this.actions && this.actions.length > 0) {
            this.actions.forEach(function (action) { return action.setActionState(_this.target, _this); });
        }
    };
    ActionContainerComponent.prototype.updateActions = function () {
        this.actionsDiffer = this.iterableDiffers.find(this.actions).create(null);
        this.updateActionStates();
    };
    return ActionContainerComponent;
}());
export { ActionContainerComponent };
ActionContainerComponent.propDecorators = {
    'childActions': [{ type: ContentChildren, args: ['action',] },],
    'actions': [{ type: Input, args: ['actions',] },],
    'target': [{ type: Input, args: ['target',] },],
    'enabled': [{ type: Input, args: ['enabled',] },],
    'error': [{ type: Output },],
    'executed': [{ type: Output },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvYWN0aW9ucy9jb250YWluZXJzL2FjdGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFJSCxlQUFlLEVBRWYsWUFBWSxFQUNaLEtBQUssRUFLTCxNQUFNLEVBR1QsTUFBTSxlQUFBLENBQWdCO0FBRXZCLE9BQU8sRUFBRSxVQUFBLEVBQXlCLE1BQU8sTUFBQSxDQUFPO0FBS2hEO0lBcURJLGtDQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFsQjdDLFVBQUssR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUduRCxhQUFRLEdBQThDLElBQUksWUFBWSxFQUErQixDQUFDO1FBTXRHLG9CQUFlLEdBQWlCLEVBQUUsQ0FBQztRQUNuQyxvQkFBZSxHQUFpQixFQUFFLENBQUM7UUFDbkMsa0JBQWEsR0FBaUIsRUFBRSxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsSUFBSSxDQUFDO0lBTXlCLENBQUM7SUFoRHpELHNCQUFXLDZDQUFPO2FBS2xCO1lBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3ZHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7YUFURCxVQUFtQixPQUFxQjtZQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBU0Qsc0JBQVcsNENBQU07YUFJakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixD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QU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBRU0scURBQWtCLEdBQXpCO1FBQUEsaUJBSUM7UUFIRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLEVBQXhDLENBQXdDLENBQUMsQ0FBQztRQUM3RSxDQUFDO0lBQ0wsQ0FBQztJQUVPLGdEQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFTTCwrQkFBQztBQUFELENBbkhBLEFBbUhDOztBQVJNLHVDQUFjLEdBQTJDO0lBQ2hFLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUcsRUFBRSxFQUFFO0lBQ2hFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUcsRUFBRSxFQUFFO0lBQ2xELFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUcsRUFBRSxFQUFFO0lBQ2hELFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUcsRUFBRSxFQUFFO0lBQ2xELE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzVCLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0NBQzlCLENBQUMiLCJmaWxlIjoiYWN0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9