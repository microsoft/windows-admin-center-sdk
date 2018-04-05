import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
/**
 * The typed interface for an option displayed by the ordered list picker component.
 */
export interface Option {
    name: string;
    value: any;
}
/**
 * The model definition of the ordered list picker component.
 */
export declare class OrderedListPickerComponent implements ControlValueAccessor, DoCheck, OnInit {
    /**
     * Whether or not the control is disabled.
     */
    disabled: boolean;
    /**
     * The attribute to use on complex object as a display name.
     */
    displayNameField: string;
    /**
     * Sets the equals function to determined complex object equality.
     */
    equalsFunction: (a: any, b: any) => boolean;
    /**
     * The header of the ordered list.
     */
    orderedListHeader: string;
    /**
     * The header of the unordered list.
     */
    unorderedListHeader: string;
    /**
     * Whether or not to always show the filter.
     */
    showFilter: boolean;
    /**
     * Whether or not to hide the unordered list. If set to true
     * only the ordered list with up/down buttons will be visilble
     */
    hideUnorderedList: boolean;
    /**
     * Gets the options of the ordered list picker.
     */
    /**
     * Sets the options of the ordered list picker.
     */
    options: any[];
    /**
     * An event emitter for when the value of the control changes. This is primarily for use when
     * complex objects supply the component with data.
     */
    valueChanged: EventEmitter<any[]>;
    /**
     * Gets the ordered list.
     */
    /**
     * Sets the ordered list.
     */
    orderedList: Option[];
    /**
     * Gets the unordered list.
     */
    /**
     * Sets the unordered list.
     */
    unorderedList: Option[];
    /**
     * Gets the value.
     */
    /**
     * Sets the value.
     */
    value: any[];
    /**
     * Whether or not the filter box is visible.
     */
    filterIsVisible: boolean;
    /**
     * The content of the filter box.
     */
    filterText: string;
    /**
     * The selection of the ordered list.
     */
    orderedListSelection: Option[];
    /**
     * The selection of the unordered list.
     */
    unorderedListSelection: Option[];
    /**
     * The equals function to determine complex object equality.
     */
    private equals;
    /**
     * The backing value of the ordered list.
     */
    private innerOrderedList;
    /**
     * The backing value of the unordered list.
     */
    private innerUnorderedList;
    /**
     * The backing value of the options.
     */
    private innerOptions;
    /**
     * The backing value of the value.
     */
    private innerValue;
    /**
     * The number of items required to automatically show the filter.
     */
    private itemCountFilterThreshold;
    /**
     * The callback function for when the component changes.
     */
    private onChange;
    /**
     * The callback function for when the component is touched.
     */
    private onTouched;
    /**
     * Moves the selected values of the ordered list down one spot.
     *
     * @param targets - The selections of the ordered list to move down.
     */
    demoteSelectedValues(targets: any[]): void;
    /**
     * The method to run regularly when the component is interacted with.
     */
    ngDoCheck(): void;
    /**
     * The method to run when the component is initialized and inputs are set.
     */
    ngOnInit(): void;
    /**
     * Moves the selected values of the ordered list up one spot.
     *
     * @param targets - The selections of the ordered list to move up.
     */
    promoteSelectedValues(targets: any[]): void;
    /**
     * Registers the onChange function.
     */
    registerOnChange(fn: any): void;
    /**
     * Registers the onTouched function.
     */
    registerOnTouched(fn: any): void;
    /**
     * Sets the disabled state of the control.
     *
     * @param isDisabled - Whether or not the control is disabled.
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Transfers the targets to the ordered list.
     *
     * @param targets - The targets to move to the ordered list.
     */
    transferToOrderedList(targets: any[]): void;
    /**
     * Transfers the targets to the unordered list.
     *
     * @param targets - The targets to move to the unordered list.
     */
    transferToUnorderedList(targets: any[]): void;
    /**
     * The function called when the 'ngModel' of the component is updated.
     *
     * @param value - The value written to the component.
     */
    writeValue(value: any[]): void;
    /**
     * Builds an option object from an input object.
     *
     * @param object - The object to create an option from.
     * @param displayFieldName - The attribute of the object to use for a field name.
     * @returns An option object.
     */
    private buildOption(object, displayFieldName);
    /**
     * Computes the difference between two input lists.
     *
     * @param masterList - The master list of items.
     * @param masterListSubset - The subset of the master list to diff against.
     * @param equals - The function to determine equality between complex objects.
     * @param filterText - The text to filter against on the result list.
     * @returns A list of options resulting from diffing the two input lists.
     */
    private computeListDifference(masterList, masterListSubset, equals, filterText);
    /**
     * Updates the ordered list.
     */
    private updateOrderedList();
    /**
     * Updates the unordered list.
     */
    private updateUnorderedList();
}
