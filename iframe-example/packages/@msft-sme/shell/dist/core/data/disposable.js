function checkDisposeFunc(disposable, executeDispose) {
    if (typeof disposable.dispose === 'function') {
        // NOTE : Don't null the lifetime manager or in race conditions registerForDispose() will throw a
        //        null exception. Internal logic in the triggerable lifetime manager handles being disposed
        //        and having disposables added to it.
        if (executeDispose) {
            disposable.dispose();
        }
    }
    else if (typeof disposable === 'function') {
        if (executeDispose) {
            disposable();
        }
    }
    else {
        return false;
    }
    return true;
}
var slice = Array.prototype.slice;
/**
 * An object that tracks and invokes disposal callbacks. This can be used
 * in other classes that wish to implement LifetimeManager.
 */
var TriggerableLifetimeManager = /** @class */ (function () {
    function TriggerableLifetimeManager() {
        this.disposables = [];
        this.isDisposedInternal = false;
        this.isDisposing = false;
        this.container = null;
        this.children = [];
    }
    /**
     * Gets a value indicating whether or not the lifetime is disposed.
     */
    TriggerableLifetimeManager.prototype.isDisposed = function () {
        return this.isDisposedInternal;
    };
    /**
     * See interface.
     */
    TriggerableLifetimeManager.prototype.registerForDispose = function (disposable) {
        var _this = this;
        var disposables;
        if (Array.isArray(disposable)) {
            disposables = disposable;
        }
        else {
            disposables = [disposable];
        }
        disposables.forEach(function (item) {
            _this.registerForDisposeInternal(item);
        });
        return this;
    };
    /**
     * See interface.
     */
    TriggerableLifetimeManager.prototype.createChildLifetime = function () {
        var triggerableLifeTimeManager = new TriggerableLifetimeManager();
        triggerableLifeTimeManager.container = this;
        this.children.push(triggerableLifeTimeManager);
        return triggerableLifeTimeManager;
    };
    /**
     * Causes the instance to regard itself as disposed, and to trigger any
     * callbacks that were already registered.
     */
    TriggerableLifetimeManager.prototype.dispose = function () {
        var removeFromContainer = true;
        var exceptions = [];
        if (!this.isDisposedInternal) {
            this.isDisposedInternal = true;
            this.isDisposing = true;
            // remove all children and _disposable
            [this.disposables, this.children].forEach(function (disposables) {
                while (disposables.length) {
                    var disposable = disposables.pop();
                    try {
                        checkDisposeFunc(disposable, true);
                    }
                    catch (err) {
                        // ignore errors when running the check dispose function
                    }
                }
            });
            // check if we need to remove self from container
            var container = this.container;
            if (container) {
                this.container = null; // break the back link
                container.unregisterChildForDispose(this);
            }
            this.isDisposing = false;
        }
    };
    TriggerableLifetimeManager.prototype.unregisterChildForDispose = function (disposable) {
        var children = this.children;
        if (!this.isDisposing) {
            var index = children.lastIndexOf(disposable);
            if (index === (children.length - 1)) {
                children.pop();
            }
            else {
                // take it self out of the container.
                children.splice(index, 1);
            }
        }
    };
    TriggerableLifetimeManager.prototype.isRegistered = function (disposable) {
        return (this.disposables.lastIndexOf(disposable) >= 0 || this.children.lastIndexOf(disposable) >= 0);
    };
    TriggerableLifetimeManager.prototype.registerForDisposeInternal = function (disposable) {
        var valid = !this.isDisposedInternal;
        if (!disposable) {
            valid = false;
        }
        if (valid) {
            this.disposables.push(disposable);
        }
    };
    return TriggerableLifetimeManager;
}());
export { TriggerableLifetimeManager };
/**
 * Auto disposer class used with lifetime manager.
 */
var Disposer = /** @class */ (function () {
    /**
     * Initializes a new instance of the Disposer class.
     *
     * @param callback the callback function.
     */
    function Disposer(callback) {
        this.callback = callback;
    }
    /**
     * dispose function called when lifetime is gone.
     */
    Disposer.prototype.dispose = function () {
        this.callback();
    };
    return Disposer;
}());
export { Disposer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvZGF0YS9kaXNwb3NhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThDQSwwQkFBMEIsVUFBZSxFQUFFLGNBQXVCO0lBQzlELEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzNDLGlHQUFpRztRQUNqRyxtR0FBbUc7UUFDbkcsNkNBQTZDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFFcEM7OztHQUdHO0FBQ0g7SUFBQTtRQUNZLGdCQUFXLEdBQWlCLEVBQUUsQ0FBQztRQUMvQix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsY0FBUyxHQUErQixJQUFJLENBQUM7UUFDN0MsYUFBUSxHQUFpQixFQUFFLENBQUM7SUFvR3hDLENBQUM7SUFsR0c7O09BRUc7SUFDSSwrQ0FBVSxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdURBQWtCLEdBQXpCLFVBQTBCLFVBQWU7UUFBekMsaUJBYUM7UUFaRyxJQUFJ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Q0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRU8sK0RBQTBCLEdBQWxDLFVBQW1DLFVBQXNCO1FBQ3JELElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUNMLGlDQUFDO0FBQUQsQ0F6R0EsQUF5R0MsSUFBQTs7QUFFRDs7R0FFRztBQUNIO0lBR0k7Ozs7T0FJRztJQUNILGtCQUFZLFFBQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNJLDBCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQWxCQSxBQWtCQyxJQUFBIiwiZmlsZSI6ImRpc3Bvc2FibGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9