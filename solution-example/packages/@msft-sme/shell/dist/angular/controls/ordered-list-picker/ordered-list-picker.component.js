import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(function () { return OrderedListPickerComponent; }),
    multi: true
};
/**
 * The model definition of the ordered list picker component.
 */
var OrderedListPickerComponent = (function () {
    function OrderedListPickerComponent() {
        /**
         * An event emitter for when the value of the control changes. This is primarily for use when
         * complex objects supply the component with data.
         */
        this.valueChanged = new EventEmitter();
        /**
         * The number of items required to automatically show the filter.
         */
        this.itemCountFilterThreshold = 20;
        /**
         * The callback function for when the component changes.
         */
        this.onChange = MsftSme.noop;
        /**
         * The callback function for when the component is touched.
         */
        this.onTouched = MsftSme.noop;
    }
    Object.defineProperty(OrderedListPickerComponent.prototype, "equalsFunction", {
        /**
         * Sets the equals function to determined complex object equality.
         */
        set: function (fn) {
            this.equals = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedListPickerComponent.prototype, "options", {
        /**
         * Gets the options of the ordered list picker.
         */
        get: function () {
            return this.innerOptions;
        },
        /**
         * Sets the options of the ordered list picker.
         */
        set: function (value) {
            this.innerOptions = value;
            this.updateUnorderedList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedListPickerComponent.prototype, "orderedList", {
        /**
         * Gets the ordered list.
         */
        get: function () {
            return this.innerOrderedList;
        },
        /**
         * Sets the ordered list.
         */
        set: function (value) {
            this.innerOrderedList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedListPickerComponent.prototype, "unorderedList", {
        /**
         * Gets the unordered list.
         */
        get: function () {
            return this.innerUnorderedList;
        },
        /**
         * Sets the unordered list.
         */
        set: function (value) {
            this.innerUnorderedList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedListPickerComponent.prototype, "value", {
        /**
         * Gets the value.
         */
        get: function () {
            return this.innerValue;
        },
        /**
         * Sets the value.
         */
        set: function (value) {
            this.innerValue = value;
            this.updateUnorderedList();
            this.updateOrderedList();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves the selected values of the ordered list down one spot.
     *
     * @param targets - The selections of the ordered list to move down.
     */
    OrderedListPickerComponent.prototype.demoteSelectedValues = function (targets) {
        if (targets) {
            for (var i = targets.length - 1; i >= 0; i--) {
                var target = targets[i];
                var index = this.value.indexOf(target);
                var targetIsNotLastElement = index < this.value.length - 1;
                var nextElementIsNotSelected = targets.indexOf(this.value[index + 1]) < 0;
                if (targetIsNotLastElement && nextElementIsNotSelected) {
                    this.value[index] = this.value[index + 1];
                    this.value[index + 1] = target;
                }
            }
            this.updateOrderedList();
            this.valueChanged.emit(this.value);
        }
    };
    /**
     * The method to run regularly when the component is interacted with.
     */
    OrderedListPickerComponent.prototype.ngDoCheck = function () {
        if (this.showFilter) {
            // Developer explicity requests filter
            this.filterIsVisible = true;
        }
        else if (this.showFilter === false) {
            // ... explicitly denies filter
            this.filterIsVisible = false;
        }
        else if (this.options.length > this.itemCountFilterThreshold) {
            // Automatically add filter
            this.filterIsVisible = true;
        }
        else {
            this.filterIsVisible = false;
        }
        this.updateUnorderedList();
        this.updateOrderedList();
    };
    /**
     * The method to run when the component is initialized and inputs are set.
     */
    OrderedListPickerComponent.prototype.ngOnInit = function () {
        if (!this.options) {
            throw new Error();
        }
    };
    /**
     * Moves the selected values of the ordered list up one spot.
     *
     * @param targets - The selections of the ordered list to move up.
     */
    OrderedListPickerComponent.prototype.promoteSelectedValues = function (targets) {
        if (targets) {
            for (var i = 0; i < targets.length; i++) {
                var target = targets[i];
                var index = this.value.indexOf(target);
                var targetIsNotFirstElement = index > 0;
                var previousElementIsNotSelected = targets.indexOf(this.value[index - 1]) < 0;
                if (targetIsNotFirstElement && previousElementIsNotSelected) {
                    this.value[index] = this.value[index - 1];
                    this.value[index - 1] = target;
                }
            }
            this.updateOrderedList();
            this.valueChanged.emit(this.value);
        }
    };
    /**
     * Registers the onChange function.
     */
    OrderedListPickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * Registers the onTouched function.
     */
    OrderedListPickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control.
     *
     * @param isDisabled - Whether or not the control is disabled.
     */
    OrderedListPickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * Transfers the targets to the ordered list.
     *
     * @param targets - The targets to move to the ordered list.
     */
    OrderedListPickerComponent.prototype.transferToOrderedList = function (targets) {
        var _this = this;
        if (targets) {
            targets.forEach(function (target) {
                _this.value.push(target);
            });
            this.valueChanged.emit(this.value);
        }
        this.unorderedListSelection = null;
    };
    /**
     * Transfers the targets to the unordered list.
     *
     * @param targets - The targets to move to the unordered list.
     */
    OrderedListPickerComponent.prototype.transferToUnorderedList = function (targets) {
        var _this = this;
        if (targets) {
            targets.forEach(function (target) {
                MsftSme.remove(_this.value, target);
            });
            this.valueChanged.emit(this.value);
        }
        this.orderedListSelection = null;
    };
    /**
     * The function called when the 'ngModel' of the component is updated.
     *
     * @param value - The value written to the component.
     */
    OrderedListPickerComponent.prototype.writeValue = function (value) {
        if (value && !Array.isArray(value)) {
            throw new TypeError();
        }
        this.value = value;
        this.onChange(value);
    };
    /**
     * Builds an option object from an input object.
     *
     * @param object - The object to create an option from.
     * @param displayFieldName - The attribute of the object to use for a field name.
     * @returns An option object.
     */
    OrderedListPickerComponent.prototype.buildOption = function (object, displayFieldName) {
        var option = {
            name: object.toString(),
            value: object
        };
        if (displayFieldName) {
            option.name = object[displayFieldName];
        }
        return option;
    };
    /**
     * Computes the difference between two input lists.
     *
     * @param masterList - The master list of items.
     * @param masterListSubset - The subset of the master list to diff against.
     * @param equals - The function to determine equality between complex objects.
     * @param filterText - The text to filter against on the result list.
     * @returns A list of options resulting from diffing the two input lists.
     */
    OrderedListPickerComponent.prototype.computeListDifference = function (masterList, masterListSubset, equals, filterText) {
        var masterListCopy = masterList.slice();
        var masterListSubsetCopy = masterListSubset.slice();
        if (equals) {
            masterListSubsetCopy.forEach(function (selectedOption) {
                for (var i = 0; i < masterListCopy.length; i++) {
                    if (equals(masterListCopy[i], selectedOption)) {
                        masterListCopy.splice(i, 1);
                        break;
                    }
                }
            });
        }
        else {
            masterListSubsetCopy.forEach(function (item) {
                MsftSme.remove(masterListCopy, item);
            });
        }
        var unselectedOptions = [];
        for (var i = 0; i < masterListCopy.length; i++) {
            var object = masterListCopy[i];
            unselectedOptions.push(this.buildOption(object, this.displayNameField));
        }
        unselectedOptions.sort(function (left, right) {
            return left.name.localeCompareIgnoreCase(right.name);
        });
        if (filterText) {
            return unselectedOptions.filter(function (value) { return value.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) >= 0; });
        }
        return unselectedOptions;
    };
    /**
     * Updates the ordered list.
     */
    OrderedListPickerComponent.prototype.updateOrderedList = function () {
        var _this = this;
        if (this.value) {
            this.orderedList = this.value.map(function (v) {
                return _this.buildOption(v, _this.displayNameField);
            });
        }
    };
    /**
     * Updates the unordered list.
     */
    OrderedListPickerComponent.prototype.updateUnorderedList = function () {
        if (this.options && this.value) {
            this.unorderedList = this.computeListDifference(this.options, this.value, this.equals, this.filterText);
        }
    };
    return OrderedListPickerComponent;
}());
export { OrderedListPickerComponent };
OrderedListPickerComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
                ],
                selector: 'sme-ordered-list-picker',
                template: "\n      <div class=\"flex-layout\">\n        <!-- Unselected List Section -->\n        <section *ngIf=\"!hideUnorderedList\" class=\"auto-flex-size flex-layout vertical\">\n          <div class=\"fixed-flex-size flex-layout\">\n            <h6 *ngIf=\"unorderedListHeader\" class=\"auto-flex-size\">{{ unorderedListHeader }}</h6>\n\n            <div *ngIf=\"filterIsVisible\" class=\"auto-flex-size searchbox\">\n              <input type=\"search\" [(ngModel)]=\"filterText\">\n            </div>\n          </div>\n          <div class=\"auto-flex-size relative\">\n            <select multiple [(ngModel)]=\"unorderedListSelection\" (dblclick)=\"transferToOrderedList(unorderedListSelection)\" [disabled]=\"disabled\">\n              <option *ngFor=\"let option of unorderedList\" [value]=\"option.value\">{{ option.name }}</option>\n            </select>\n          </div>\n        </section>\n\n        <!-- List Transfer Buttons Section -->\n        <section *ngIf=\"!hideUnorderedList\" class=\"fixed-flex-size flex-layout vertical\">\n          <button type=\"button\" class=\"btn btn-default sme-icon icon-win-back\" (click)=\"transferToUnorderedList(orderedListSelection)\"\n            [disabled]=\"disabled || !(orderedListSelection && orderedListSelection.length > 0)\"></button>\n          <button type=\"button\" class=\"btn btn-default sme-icon icon-win-forward\" (click)=\"transferToOrderedList(unorderedListSelection)\"\n            [disabled]=\"disabled || !(unorderedListSelection && unorderedListSelection.length > 0)\"></button>\n        </section>\n\n        <!-- Selected List Section -->\n        <section class=\"auto-flex-size flex-layout vertical\">\n          <div class=\"fixed-flex-size\">\n            <h6 *ngIf=\"orderedListHeader\">{{ orderedListHeader }}</h6>\n          </div>\n          <div class=\"auto-flex-size relative\">\n            <select multiple [(ngModel)]=\"orderedListSelection\" (dblclick)=\"transferToUnorderedList(orderedListSelection)\" [disabled]=\"disabled\">\n              <option *ngFor=\"let option of orderedList\" [value]=\"option.value\">{{ option.name }}</option>\n            </select>\n          </div>\n        </section>\n\n        <!-- Selected List Ordering Buttons Section -->\n        <section class=\"fixed-flex-size flex-layout vertical\">\n          <button type=\"button\" class=\"btn btn-default sme-icon icon-win-up\" (click)=\"promoteSelectedValues(orderedListSelection)\"\n            [disabled]=\"disabled || !(orderedListSelection && orderedListSelection.length > 0)\"></button>\n          <button type=\"button\" class=\"btn btn-default sme-icon icon-win-down\" (click)=\"demoteSelectedValues(orderedListSelection)\"\n            [disabled]=\"disabled || !(orderedListSelection && orderedListSelection.length > 0)\"></button>\n        </section>\n      </div>\n    ",
                styles: ["\n      button {\n        margin-right: 0;\n        margin-top: 12px;\n      }\n\n      button:first-of-type {\n        margin-top: 0;\n      }\n\n      h1, h2, h3, h4, h5, h6 {\n        padding: 0;\n        margin-top: 12px;\n        margin-bottom:8px;\n      }\n\n      input[type=\"search\"] {\n        margin-left: 4px;\n      }\n\n      section:first-of-type {\n        margin-right: 12px;\n        margin-left: 0;\n      }\n\n      section:nth-of-type(3) {\n        margin: 0 12px 0 12px;\n      }\n\n      section.auto-flex-size div.fixed-flex-size {\n        min-height: 42px;\n      }\n\n      section.fixed-flex-size {\n        justify-content: center;\n      }\n\n      section div.auto-flex-size.relative {\n        margin-top: 8px;\n      }\n\n      select {\n        width: 100%;\n        min-height: 200px;\n      }\n\n      .btn {\n        min-height: auto;\n        max-height: auto;\n        min-width: auto;\n        max-width: auto;\n        width: 36px;\n        height: 36px;\n        padding: 2px 0 0 0;\n      }\n    "]
            },] },
];
/** @nocollapse */
OrderedListPickerComponent.ctorParameters = function () { return []; };
OrderedListPickerComponent.propDecorators = {
    'disabled': [{ type: Input },],
    'displayNameField': [{ type: Input },],
    'equalsFunction': [{ type: Input },],
    'orderedListHeader': [{ type: Input },],
    'unorderedListHeader': [{ type: Input },],
    'showFilter': [{ type: Input },],
    'hideUnorderedList': [{ type: Input },],
    'options': [{ type: Input },],
    'valueChanged': [{ type: Output },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvY29udHJvbHMvb3JkZXJlZC1saXN0LXBpY2tlci9vcmRlcmVkLWxpc3QtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFvQixZQUFBLEVBQWMsVUFBQSxFQUFZLEtBQUEsRUFBZSxNQUFBLEVBQU8sTUFBTyxlQUFBLENBQWdCO0FBQ3BHLE9BQU8sRUFBd0IsaUJBQUEsRUFBa0IsTUFBTyxnQkFBQSxDQUFpQjtBQUV6RSxNQUFNLENBQUMsSUFBTSxtQ0FBQSxHQUEyQztJQUNwRCxPQUFPLEVBQUUsaUJBQUE7SUFDVCwwQ0FBMEM7SUFDMUMsV0FBVyxFQUFFLFVBQUEsQ0FBVyxjQUFNLE9BQUEsMEJBQUEsRUFBQSxDQUFBLENBQTJCO0lBQ3pELEtBQUssRUFBRSxJQUFBO0NBQ1YsQ0FBQztBQVVGOztHQUVHO0FBRUg7SUFBQTtRQWdESTs7O1dBR0c7UUFDSyxpQkFBWSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBbUcvRDs7V0FFRztRQUNLLDZCQUF3QixHQUFHLEVBQUUsQ0FBQztRQUV0Qzs7V0FFRztRQUNLLGFBQVEsR0FBcUIsT0FBTyxDQUFDLElBQUksQ0FBQztRQUVsRDs7V0FFRztRQUNLLGNBQVMsR0FBZSxPQUFPLENBQUMsSUFBSSxDQUFDO0lBK1dqRCxDQUFDO0lBcmdCSSxzQkFBVyxzREFBYztRQUgxQjs7V0FFRzthQUNGLFVBQTBCLEVBQStCO1lBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBMEJBLHNCQUFXLCtDQUFPO1FBWW5COztXQUVHO2FBQ0g7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO1FBcEJEOztXQUVHO2FBQ0YsVUFBbUIsS0FBWTtZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUUxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQWtCRCxzQkFBVyxtREFBVztRQUh0Qjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDO1FBRUQ7O1dBRUc7YUFDSCxVQUF1QixLQUFlO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsQ0FBQzs7O09BUEE7SUFZRCxzQkFBVyxxREFBYTtRQUh4Qjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7O1dBRUc7YUFDSCxVQUF5QixLQUFlO1lBQ3BDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQzs7O09BUEE7SUFZRCxzQkFBVyw2Q0FBSztRQUhoQjs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQztRQUVEOztXQUVHO2FBQ0gsVUFBaUIsS0FBWTtZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUV4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7T0FWQTtJQXdFRDs7OztPQUlHO0lBQ0kseURBQW9CLEdBQTNCLFVBQTRCLE9BQWM7UUFDdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNWLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0MsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsSUFBTSxzQkFBc0IsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxJQUFNLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTVFLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixJQUFJLHdCQUF3QixDQUFDLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOENBQVMsR0FBaEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQixzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkMsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUM3RCwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQztRQUVELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNJLDZDQUFRLEdBQWY7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwwREFBcUIsR0FBNUIsVUFBNkIsT0FBYztRQUN2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLElBQU0sdUJBQXVCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsSUFBTSw0QkFBNEIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVoRixFQUFFLENBQUMsQ0FBQyx1QkFBdUIsSUFBSSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7b0JBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDbkMsQ0FBQztZQUNMLENBQUM7WUFFRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLHFEQUFnQixHQUF2QixVQUF3QixFQUFPO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLHNEQUFpQixHQUF4QixVQUF5QixFQUFPO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0kscURBQWdCLEdBQXZCLFVBQXdCLFVBQW1CO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksMERBQXFCLEdBQTVCLFVBQTZCLE9BQWM7UUFBM0MsaUJBVUM7UUFURyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQ25CLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNERBQXVCLEdBQTlCLFVBQStCLE9BQWM7UUFBN0MsaUJBVUM7UUFURyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtDQUFVLEdBQWpCLFVBQWtCLEtBQVk7UUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxnREFBVyxHQUFuQixVQUFvQixNQUFXLEVBQUUsZ0JBQXdCO1FBQ3JELElBQUksTUFBTSxHQUFXO1lBQ2pCLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLEtBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSywwREFBcUIsR0FBN0IsVUFDSSxVQUFpQixFQUNqQixnQkFBdUIsRUFDdkIsTUFBbUMsRUFDbkMsVUFBa0I7UUFFbEIsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLElBQUksb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFcEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNULG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFDLGNBQWM7Z0JBQ3hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLEtBQUssQ0FBQztvQkFDVixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELElBQUksaUJBQWlCLEdBQWEsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzdDLElBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsaUJBQWlCLENBQUMsSUFBSSxDQUNsQixVQUFDLElBQUksRUFBRSxLQUFLO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FDSixDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUEzRSxDQUEyRSxDQUFDLENBQUM7UUFDNUgsQ0FBQztRQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxzREFBaUIsR0FBekI7UUFBQSxpQkFNQztRQUxHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyx3REFBbUIsR0FBM0I7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RyxDQUFDO0lBQ0wsQ0FBQztJQThITCxpQ0FBQztBQUFELENBbmhCQSxBQW1oQkM7O0FBN0hNLHFDQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsU0FBUyxFQUFFO29CQUNQLG1DQUFtQztpQkFDdEM7Z0JBQ0QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFLG15RkE4Q1Q7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsbWhDQXVEUixDQUFDO2FBQ0wsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHlDQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDO0FBQ0sseUNBQWMsR0FBMkM7SUFDaEUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDOUIsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUN0QyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3BDLG1CQUFtQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDdkMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUN6QyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNoQyxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3ZDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzdCLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0NBQ2xDLENBQUMiLCJmaWxlIjoib3JkZXJlZC1saXN0LXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9