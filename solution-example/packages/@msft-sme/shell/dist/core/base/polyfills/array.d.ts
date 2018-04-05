interface ImmutableArrayPolyfills<T> extends MsftSme.NumberMap<T> {
    /**
     * Deprecated. Please use MsftSme.union instead.
     */
    concatUnique(other: ImmutableArray<T>, predicate?: (value1: T, value2: T) => boolean): T[];
    /**
     * Deprecated. Please use MsftSme.find instead.
     */
    first(predicate?: (value: T) => boolean, startIndex?: number): T;
    /**
     * Deprecated. Please use MsftSme.findIndex instead.
     */
    firstIndex(predicate?: (value: T) => boolean, startIndex?: number): number;
    /**
     * Deprecated. Please use MsftSme.last instead.
     */
    last(): any;
    /**
     * Deprecated. Please use MsftSme.mapMany instead.
     */
    mapMany<U>(selector: (source: T) => ImmutableArray<U>): U[];
    /**
     * Deprecated. Please use MsftSme.stableSort instead.
     */
    stableSort(compare: (a: T, b: T) => number): T[];
    /**
     * Deprecated. Please use MsftSme.unique instead.
     */
    unique(predicate?: (value1: T, value2: T) => boolean): T[];
}
interface ArrayPolyfills<T> extends ImmutableArrayPolyfills<T> {
    /**
     * Deprecated. Please use MsftSme.union instead.
     */
    concatUnique(other: T[], predicate?: (value1: T, value2: T) => boolean): T[];
    /**
     * Deprecated. Please use MsftSme.remove instead.
     */
    remove(item: T): T[];
}
interface Array<T> extends ArrayPolyfills<T> {
}
/**
 *  An immutable array.
 */
interface ImmutableArray<T> extends ImmutableArrayPolyfills<T> {
    toString(): string;
    toLocaleString(): string;
    concat(...items: T[][]): T[];
    concat(...items: T[]): T[];
    join(separator?: string): string;
    slice(start?: number, end?: number): T[];
    indexOf(searchElement: T, fromIndex?: number): number;
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    every(callbackfn: (value: T, index: number, array: ImmutableArray<T>) => boolean, thisArg?: any): boolean;
    some(callbackfn: (value: T, index: number, array: ImmutableArray<T>) => boolean, thisArg?: any): boolean;
    forEach(callbackfn: (value: T, index: number, array: ImmutableArray<T>) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, array: ImmutableArray<T>) => U, thisArg?: any): U[];
    filter(callbackfn: (value: T, index: number, array: ImmutableArray<T>) => boolean, thisArg?: any): T[];
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: ImmutableArray<T>) => U, initialValue: U): U;
}
/**
 * Returns a negative, zero or a positive number if its first
 * parameter is smaller, equal or greater than its second parameter
 * respectively.
 */
interface Comparator<T> {
    (a: T, b: T): number;
}
