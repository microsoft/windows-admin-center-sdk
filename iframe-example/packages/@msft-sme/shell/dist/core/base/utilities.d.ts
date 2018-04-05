declare namespace MsftSme {
    function uncurryThis(f: (...args: any[]) => any): (...args: any[]) => any;
    const applyCall: (f: (...args: any[]) => any, target: any, args: IArguments | any[]) => any;
    const applyUncurry: (f: (...args: any[]) => any, target: any, args: IArguments | any[]) => any;
    /**
     * For testing only. Use Object.keys.
     */
    function _objectKeysPolyfill(o: any): string[];
    function forEachKey<T>(obj: StringMap<T>, iterator: (key: string, value: T) => void): void;
    function forEachKey<T>(obj: NumberMap<T>, iterator: (key: number, value: T) => void): void;
    /**
     * Shortcut for Object.keys(obj || {}).length.
     * @return number.
     */
    function keysLength(obj: Object): number;
    /**
     * Determines whether an object has properties on it.
     * Will return true for the following inputs: [], {}, "", 0, 1, true, false, new Date(), function() {}.
     * Will return false for the following inputs: [1], {a:1}, "123".
     * @return boolean.
     */
    function isEmpty(obj: Object): boolean;
    /**
     * Detect a value is Disposable.
     *
     * @param value The value to check against value.dispose is a function.
     * @return boolean.
     */
    function isDisposable(value: any): boolean;
    /**
     * call value.dispose() if a value is Disposable.
     *
     * @param value The value to call value.dispose()
     * @return boolean;
     */
    const disposeDisposable: (...values: any[]) => void;
    /**
     * Detect a value is null.
     *
     * @param value The value to check against null.
     * @return boolean.
     */
    function isNull(value: any): boolean;
    /**
     * Detect a value is undefined.
     *
     * @param value The value to check against undefined.
     * @return boolean.
     */
    function isUndefined(value: any): boolean;
    /**
     * Indicates whether the specified object is null or undefined.
     *
     * @param value The value to test.
     * @returns True if the value parameter is null or undefined; otherwise, false.
     */
    function isNullOrUndefined(value: any): boolean;
    /**
     * Indicates whether the specified object is not null or undefined.
     *
     * @param value The value to test.
     * @returns True if the value parameter is null or undefined; otherwise, false.
     */
    function notNullOrUndefined(value: any): boolean;
    /**
     * Checks if the string is null, undefined or whitespace.
     *
     * @param  value The target string.
     * @return true if the string is null, undefined or whitespace; otherwise, false.
     */
    function isNullOrWhiteSpace(value: string): boolean;
    /**
     * Firds the index of the first element of an array that matches the predicate.
     *
     * @param predicate The Predicate function.
     * @param startIndex The starting index.  If negative, it find from the end of the array.
     *        If you want to continue the next search from the back you much pass in startIndex = (prevReturn - length -1)
     *
     * @return The first index that matches the predicate.
     */
    function findIndex<T>(array: T[], predicate?: (value: T, index: number, array: T[]) => boolean, startIndex?: number): number;
    /**
     * Finds the first element of an array that matches the predicate.
     *
     * @param predicate The Predicate function.
     * @param startIndex The starting index.  If negative, it find from the end of the array.
     *        If you want to continue the next search from the back you much pass in startIndex = (prevReturn - length -1)
     *
     * @return The first element that matches the predicate.
     */
    function find<T>(array: T[], predicate?: (value: T, index: number, array: T[]) => boolean, startIndex?: number): T;
    /**
     * Returns the first element of the sequence.
     *
     * @return The element
     */
    function first<T>(array: T[]): T;
    /**
     * Returns the last element of the sequence.
     *
     * @return The element
     */
    function last<T>(array: T[]): T;
    /**
     * Removes all values that equal the given item and returns them as an array
     *
     * @param item The value to be removed.
     * @return The removed items.
     */
    function remove<T>(array: T[], itemOrPredicate: T | ((value: T) => boolean), startIndex?: number): T[];
    function pushUnique<T>(uniqueTarget: T[], source: T[], predicate?: (value1: T, value2: T) => boolean, sourceUnique?: boolean): T[];
    /**
     * Returns a unique set from this array based on the predicate.
     *
     * @param predicate The predicate function. Added to the result if the predicate returns false.
     * @return A new array with the unique values.
     */
    function unique<T>(array: T[], predicate?: (value1: T, value2: T) => boolean): T[];
    /**
     * Returns a unique concatenated set from this array and the given array based on the predicate.
     *
     * @param arrays The list of arrays to get union of.
     * @return A new array with the unique values.
     */
    function union<T>(...arrays: T[][]): T[];
    /**
     * Returns a unique concatenated set from this array and the given array based on the predicate.
     *
     * @param other The other array to concatenate with this one.
     * @param predicate The predicate function. Added to the result if the predicate returns false.
     * @return A new array with the unique values.
     */
    function union<T>(array: T[], other: T[], predicate?: (value1: T, value2: T) => boolean): T[];
    /**
     * Merge multiple T, T[] into a combine T[] exclude null or undefined arguments.
     *
     * @param data, a list fo T, T[]
     * @returns concattenated array.
     */
    var merge: <T>(...data: (T | T[])[]) => T[];
    /**
     * Projects each element of a sequence to a sequence and flattens the resulting sequences into one sequence.
     *
     * @param selector The projection function.
     * @return A flattened array.
     */
    function mapMany<T, TResult>(array: T[], selector: (source: T) => TResult[]): TResult[];
    /**
     * Sorts an array using a stable sort algorithm.
     *
     * This method returns a new array, it does not sort in place.
     *
     * @param compare The Compare function.
     * @return Sorted array.
     */
    function stableSort<T>(array: T[], compare: (a: T, b: T) => number): T[];
    /**
     * Extends from  a source array into an existing string map of key => item.
     *
     * @param objToExtend The target object to be extended.
     * @param sourceArray The source array to convert to a map properties of target object.
     * @param getKeyCallback The callback used to provide the key for the item.
     * @param getValueCallback The optional callback used to provide the key for the item, otherwise the item itself is used.
     * @param  onlyIfNotExist If true, only Extend the value in array if the existing slot is still undefine. (This behaves like type script argument default value, it only fill in if the value is undefined.)
     *
     * @return The string map of key => item for the source array.
     */
    function extendArrayIntoMap<T, U>(objToExtend: StringMap<U>, sourceItems: T[], getKeyCallback?: (item: T, index?: number) => string, getValueCallback?: (item: T, index?: number, key?: string) => U, onlyIfNotExist?: boolean): void;
    function extendArrayIntoMap<T, U>(objToExtend: NumberMap<U>, sourceItems: T[], getKeyCallback?: (item: T, index?: number) => number, getValueCallback?: (item: T, index?: number, key?: string) => U, onlyIfNotExist?: boolean): void;
    /**
     * Extends from  a source array into an existing string map of key => item.
     *
     * @param objToExtend The target object to be extended.
     * @param sourceArray The source array to convert to a map properties of target object.
     * @param getKeyCallback The callback used to provide the key for the item.
     * @param getValueCallback The optional callback used to provide the key for the item, otherwise the item itself is used.
     * @param  onlyIfNotExist If true, only Extend the value in array if the existing slot is still undefine. (This behaves like type script argument default value, it only fill in if the value is undefined.)
     *
     * @return The string map of key => item for the source array.
     */
    function extendStringMapIntoMap<T, U>(objToExtend: StringMap<U>, sourceItems: StringMap<T>, getValueCallback?: (item: T, key?: string) => U, onlyIfNotExist?: boolean): void;
    /**
     * Helpers funciton to create a object lightweight constructor
     *
     * @param keys the ordered argument keys
     *
     * @return The function that will return string map base on the arguments index order of keys
     */
    function getStringMapFunc(...keys: string[]): Func<StringMap<any>>;
    function getStringMapFunc(keys: string[]): Func<StringMap<any>>;
    /**
     * Helpers funciton to create a object lightweight constructor
     *
     * @param keys the ordered argument keys
     *
     * @return The function that will return string map base on the arguments index order of keys
     */
    function applyStringMapFunc(keys: string[]): Func<StringMap<any>>;
    /**
     * Helpers funciton to create a object of type NameValue<N, T>
     *
     * @param name name
     * @param value value
     *
     * @return an object of NameValue<N, T>
     */
    const getNameValue: <N, T>(name: N, value: T) => NameValue<N, T>;
    /**
     * Get a list of typeScript Enum into Array
     *
     * @param tsEnumeration The Type script Enum Array
     * @param sort optional whether to sort by enum's value
     * @return all NameValue<string, number>[] for this typeScriptEnum
     */
    function getEnumArray(tsEnumeration: any, sort?: boolean): NameValue<string, number>[];
    /**
     * Coerce an input into an array if it isn't already one.
     */
    function makeArray<T>(input: T | T[]): T[];
    /**
     * Checks if given dates are equal.
     *
     * @param left Left hand side date.
     * @param left Right hand side date.
     * @return True if left date is equal to right date.
     */
    function areEqualDates(left: any, right: any): boolean;
    /**
     * Round down the date.getTime() to seconds
     *
     * @param date.
     * @return the getTime in seconds
     */
    function toSeconds(date: Date): number;
    /**
     * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
     *
     * @return New GUID.
     */
    const newGuid: () => string;
    /**
     * Returns a function that can generate globally unique identifiers.
     * Generates a new guid every 4096 calls and concatenates it with an
     * auto incrementing number.  This maintains a complient GUID 4 format
     * if no prefix is added.
     *
     * @return a globally unique string generating function.
     */
    function getUniqueIdGenerator(prefix?: string): () => string;
    /**
     * Returns a function that can generate unique id under the prefix
     * Concatenates prefix with an auto incrementing number.
     *
     * @return a unique string generating function which return a prefix with auto incrementing number
     */
    function getIdGenerator(prefix: string): () => string;
    /**
     * Returns a globally unique identifier string.
     * Lighter-weight than newGuid.
     *
     * @return a globally unique string.
     */
    const getUniqueId: () => string;
    /**
     * Rounds a number to the specified precision.
     *
     * @param number The number to round.
     * @param precision The precision to round the number to. Defaults to 0.
     * @returns The rounded number.
     */
    function round(number: number, precision?: number): number;
    /**
     * Truncates a number to the integer part.
     *
     * @param value The number to truncate.
     * @return The integer number.
     */
    function truncate(value: number): number;
    /**
     * Returns the result of the boolean exclusive-or operator.
     *
     * @param a First operand.
     * @param b Second operand.
     * @return true if the arguments have different values, false otherwise.
     */
    function xor(a: boolean, b: boolean): boolean;
    /**
     * Generates a random integer between min and max inclusive.
     *
     * @param min The minimum integer result.
     * @param max The maximum integer result.
     * @return A random integer.
     */
    function random(min: number, max: number): number;
    /**
     * Determines whether an object has a property with the specified name.
     * @param target the object to check.
     * @param v A property name.
     */
    const hasOwnProperty: (target: Object, v: string) => boolean;
    /**
     * Determines whether an object has an enumerable property with the specified name.
     * @param target the object to check.
     * @param v A property name.
     */
    const propertyIsEnumerable: (target: Object, v: PropertyKey) => boolean;
    /**
     * Returns a boolean reflecting whether two scalar values (not object-typed, not array-typed, not function-typed)
     * are equal.  Accounts for the fact that JavaScript Date derives from Object.
     * The caller is responsible for supplying exclusively number-, string- or Date-typed values here.
     *
     * @param left The first scalar value.
     * @param right The second scalar value.
     * @return A boolean reflecting whether the two scalar values are equal.
     */
    function areEqual<T>(left: T, right: T): boolean;
    /**
     * Verifies that two arrays are equal.
     *
     * @param array1 The array to check.
     * @param array2 The array to compare the first array to.
     * @returns A value indicating whether or not the two arrays are equal.
     */
    function arrayEquals<T>(array1: T[], array2: T[]): boolean;
    function getTypeOf(x: any): string;
    /**
     * Checks if a given value is a javascript object or not.
     *
     * @param value Value to test.
     * @return True if value is an object, false otherwise.
     */
    function isObject(value: any): boolean;
    /**
     * Checks if a given value is a plain object or not.
     *
     * @param value Value to test.
     * @return True if value is an object, false otherwise.
     */
    function isPlainObject(value: any): boolean;
    /**
     * Maps each value of the input object. Values that map to null or undefined are skipped.
     *
     * @param obj Input object whose properties are to be mapped.
     * @param callback Invoked for each property of the object to perform the mapping.
     * @param arg An Optional value that can be passed to callback.
     * @return An array of mapped values.
     */
    function map<T, U>(obj: StringMap<T>, callback: (item: T, key?: string, arg?: any) => U, arg?: any): U[];
    /**
     * Shallow copy from a key/value pairs object.
     *
     * @param to An un-typed object to be populated.
     * @param from An un-typed object with values to populate.
     * @param scopes Scoped down the list for shallowCopy
     */
    function shallowCopyFromObject(to: Object, from: Object, scopes?: string[]): void;
    /**
     * Merges a set of source objects to a destination object
     * @param dest The destination object
     * @param sources  the source objects
     */
    function deepAssign(dest: any, ...sources: any[]): any;
    /**
     * Searchs an object for a value at a given path.
     * @param object The object to search in
     * @param path the path to walk
     * @returns the object at the end of the path
     */
    function getValue<T>(object: any, path: string): T;
    /**
     * Determines if the current string ends with the given string.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
     * http://jsperf.com/string-prototype-endswith/18
     *
     * @param input The input string.
     * @param searchString The characters to be searched for at the end of this string.
     * @param position Optional. Search within this string as if this string were only this long; defaults to this string's actual length, clamped within the range established by this string's length.
     * @return A value indicating whether or not the input string ends with the search string.
     */
    function endsWith(input: string, searchString: string, position?: number): boolean;
    /**
     * Compares the current string to another string and returns a value indicating their relative ordering.
     *
     * @param input The input string to compare.
     * @param other The value to compare the input string to.
     * @param locales The optional array of locale values that will be passed to localeCompare.
     * @param options The options supported by localeCompare.
     * @return 0, if the strings are equal; a negative number if the current string is ordered before value; a positive non-zero number if the current string is orered after value.
     */
    function localeCompareIgnoreCase(input: string, other: string, locales?: string[], options?: CollatorOptions): number;
    /**
     * Repeats the string the specified number of times.
     * @param input The input string.
     * @param count The number of times to repeat the string.
     * @returns The result string.
     *  http://jsperf.com/repeatstring2
     */
    function repeat(input: string, count: number): string;
    /**
     * reverse the string.
     * @param input The input string.
     * @returns The result string.
     */
    function reverse(input: string): string;
    /**
     * Return a function that will perform join with that separator
     *
     * @returns a function that will join the parts together with the character, for example.
     *   joinPaths = getJoinFunc("/");
     *   joinByDash = getJoinFunc("-");
     *
     *  joinPaths("a", "b", "c") will return  "a/b/c";
     *  joinByDash("a", "b", "c") will return  "a-b-c";
     */
    function getJoinFunc(sep: string): (...parts: string[]) => string;
    /**
     * Return a function that will perform quote the input.  (Mimizer helper).
     *
     * @returns a function that will join the parts together with the character(s).
        For example.
            quote = getQuoteFunc("'");
            parenthesis = getQuoteFunc("(", ")");
            poMarker = getQuoteFunc("####");
     *
     * quote("abc") will return "'abc'";
     * parenthesis("abc") will reutrn "(abc)";
     * poMarker("abc") will return "####abc####";
     */
    function getQuoteFunc(prefix: string, suffix?: string): (input: string) => string;
    /**
     * Replaces all instances of a value in a string.
     *
     * @param input The input string.
     * @param searchValue The value to replace.
     * @param replaceValue The value to replace with.
     * @return A new string with all instances of searchValue replaced with replaceValue.
     */
    function replaceAll(input: string, searchValue: string, replaceValue: string): string;
    /**
     * Replaces multiple instances of search values and replacement values in a string.
     *
     * @param input The input string.
     * @param replacementMap A string map where each key represents the string to replace, and that key's value represents the value to replace it with.
     * @return A new string with replacementMap values replaced.
     */
    function replaceMany(input: string, replacementMap: StringMap<string>): string;
    /**
     * Splits a string into the specified number of parts.
     * Differs from string.split in that it leaves the last part containing the remaining string (with separators in it).
     * string.split truncates the extra parts.
     * @param input The string to be split.
     * @param separator A string that identifies the character or characters to be used as the separator.
     * @param limit A value used to limit the number of elements returned in the array.
     * @return An array of strings whose length is at most the value of limit.
     */
    function split(input: string, separator: string, limit: number): string[];
    /**
     * Determines if the current string starts with the given string.
     * http://jsperf.com/string-startswith/49
     *
     * @param input The input string.
     * @param searchString The characters to be searched for at the start of this string.
     * @param position Optional. The position in this string at which to begin searching for searchString; defaults to 0.
     * @return A value indicating whether or not the input string begins with the search string.
     */
    function startsWith(input: string, searchString: string, position?: number): boolean;
    /**
     * Trims all occurrences of the given set of strings off the end of the input.
     */
    function trimEnd(input: string, ...values: string[]): string;
    /**
     * Trims all occurrences of the given set of strings off the start of the input.
     */
    function trimStart(input: string, ...values: string[]): string;
    /**
     * Ensures that the given string ends with the suffix provided.
     * If it already does, it just returns the input string.
     * If it does not, then the suffix is appended and the result is returned.
     */
    function ensureSuffix(input: string, suffix: string): string;
    /**
     * Ensures that the given string starts with the prefix provided.
     * If it already does, it just returns the input string.
     * If it does not, then the prefix is applied and the result is returned.
     */
    function ensurePrefix(input: string, prefix: string): string;
    /**
     * Joins strings in the components array with the specified separator between them.
     * Ignores empty/falsy entries in the components array.
     * If a leading (or trailing) separator is desired, prefix (or suffix)
     * the array of components with an entry that is a separator.
     */
    function pathJoin(pathSeparator: string, ...pathComponents: string[]): string;
    function pathJoin(pathSeparator: string, pathComponents: string[]): string;
    /**
     * Parse an uri and return the Authority of the uri.
     *
     * @param uri The string of uri.
     * @return Authority of the uri.
     */
    function getUriAuthority(uri: string, includePort?: boolean): string;
    /**
     * Verify if one Url is subdomain of another Url.
     *
     * @param domain The string of domain.
     * @param subdomain The string of subdomain
     * @return True if subdomain is subdomain of domain.
     */
    function isSubdomain(domain: string, subdomain: string): boolean;
    /**
     * Returns whether the given URI is an absolute URI.
     *
     * @param uri The URI.
     * @return A boolean value indicating whether the URI is absolute.
     */
    function isUriAbsolute(uri: string): boolean;
    /** Gets a CSS property value
     * @param  {HTMLElement} element The Element
     * @param  {string} property - The CSS property name
     * @returns {any} - The value of the CSS property (type depends on property retrieved)
     */
    function getStyle(element: HTMLElement, property: string): any;
    /**
     * Gets the classes applied to an element
     * @param  {HTMLElement} element The Element
     * @returns {string[]} - The classes currently applied to the element
     */
    function getClasses(element: HTMLElement): any;
    /**
     * Returns the first element in the current elements ancestory that is focusable.
     *
     * 'Focusable' is defined as the following:
     *  - input, select, textarea, button, object
     *  - anchor with href
     *  - have a non-negative tab index
     *
     * An element is not focusable if any of the following is true (even if it meets a condition above)
     *  - negative tab index
     *  - disabled
     *  - display: none
     *  - visibility: hidden
     *
     * @param element The element to start from.
     * @return the first focusable ancestor of the element
     */
    function isFocusable(element: HTMLElement, includeNegativeTabIndex?: boolean): boolean;
    /**
     * Returns the first element in the current elements ancestory that is focusable.
     * Will return the element itself if it is focusable
     * @param element The element to start from.
     * @return the first focusable ancestor of the element
     */
    function getFocusableAncestor(element: HTMLElement): HTMLElement;
    /**
     * describes the position of the desired element in a list of elements
     */
    enum ElementPosition {
        First = 0,
        Previous = 1,
        Next = 2,
        Last = 3,
    }
    /**
     * find an element in a particular position with a specific condition relative to input element
     * Does a DFS for this element relative the ancestor zone of input element
     * @param element The current element
     * @param condition The function to check the kind of element we are looking for
     * @param position The ElementPosition of the desired element relative to input element
     */
    function findElementFromAncestorZoneDFS(element: HTMLElement, condition: (element: HTMLElement) => boolean, position: ElementPosition): HTMLElement;
    /**
     * find an element in a particular position with a specific condition relative to input element
     * Does a DFS for this element relative the ancestor trap of input element
     * @param element The current element
     * @param condition The function to check the kind of element we are looking for
     * @param position The ElementPosition of the desired element relative to input element
     */
    function findElementFromAncestorTrapDFS(element: HTMLElement, condition: (element: HTMLElement) => boolean, position: ElementPosition): HTMLElement;
    /**
     * find an element in a particular position with a specific condition relative to input element
     * Does a DFS for this element relative the root of the graph
     * @param element The current element
     * @param condition The function to check the kind of element we are looking for
     * @param position The ElementPosition of the desired element relative to input element
     */
    function findElementFromRootDFS(element: HTMLElement, condition: (element: HTMLElement) => boolean, position: ElementPosition): HTMLElement;
    /**
     * find an element in a particular position with a specific condition relative to input element
     * Does a DFS for this element relative the input element
     * @param element The current element
     * @param condition The function to check the kind of element we are looking for
     * @param position The ElementPosition of the desired element relative to input element
     */
    function findChildElementDFS(element: HTMLElement, condition: (element: HTMLElement) => boolean, position: ElementPosition): HTMLElement;
    /**
     * gets a element from a list of elements in the position relative to the current element
     * @param elements the list of elements
     * @param currentElement the current element
     * @param position the ElementPosition we want relative to the current element
     */
    function getElement(elements: HTMLElement[], currentElement: HTMLElement, position: ElementPosition): HTMLElement;
    /**
     * finds all elements starting at the input element that meet the given condition
     * @param element the element from which to start the depth first search
     * @param condition the function that determines whether the desired condition has been met
     */
    function getAllElements(element: HTMLElement, condition: (element: HTMLElement) => boolean): HTMLElement[];
    /**
     * returns the root of the DOM graph
     */
    function getRootElement(): HTMLElement;
    /**
     * Finds the next zone
     * @param element the current zone or an element in the current zone
     */
    function getNextZone(element: HTMLElement): HTMLElement;
    /**
     * gets the first focusable element in the next zone
     * if a zone has no focusable elements, it is skipped
     * @param element the current element
     */
    function getNextZoneElement(element: HTMLElement): HTMLElement;
    /**
     * Finds the previous zone
     * @param element the current zone or an element in the current zone
     */
    function getPreviousZone(element: HTMLElement): HTMLElement;
    /**
     * gets the first focusable element in the previous zone
     * if a zone has no focusable elements, it is skipped
     * @param element the current element
     * @param originalElement the element from which we begin the search. Set automatically if unset by user
     */
    function getPreviousZoneElement(element: HTMLElement, originalElement?: HTMLElement): HTMLElement;
    /**
     * gets the zone that the current element is in
     * @param element the element
     */
    function getAncestorZone(element: HTMLElement): HTMLElement;
    /**
     * determine if an element is in a trap, if so return the trap element
     * @param element HTML element to check
     */
    function getAncestorTrap(element: HTMLElement): HTMLElement;
    /**
     * gets the next child zone of the current zone
     * @param element the current zone or an element in the current zone
     */
    function getDescendentZone(element: HTMLElement): HTMLElement;
    /**
     * gets the first focusable descendent of the current element
     * @param element the current element
     */
    function getFirstFocusableDescendent(element: HTMLElement): HTMLElement;
    function getLastElementInZone(element: HTMLElement): HTMLElement;
    function getFirstElementInZone(element: HTMLElement): HTMLElement;
    /**
     * gets the next focusable element in the current zone
     * @param element the current element
     */
    function getNextFocusableElement(element: HTMLElement): HTMLElement;
    /**
     * gets the previous focusable element in the current zone
     * @param element the current element
     */
    function getPreviousFocusableElement(element: HTMLElement): HTMLElement;
    /**
     * gets the ancestor of an element that meets the specified condition
     * @param element the current element
     * @param condition the function that will check if element meets the desired condition
    */
    function getSpecificAncestor(element: HTMLElement, condition: (element: HTMLElement) => boolean): HTMLElement;
    /**
     * gets the next focusable element in the current trap
     * @param element the current element
     */
    function getNextFocusableElementInTrap(element: HTMLElement): HTMLElement;
    /**
     * gets the previous focusable element in the current trap
     * @param element the current element
     */
    function getPreviousFocusableElementInTrap(element: HTMLElement): HTMLElement;
    /**
     * gets all body elements on the page
     */
    function getAllBodys(): HTMLElement[];
    /**
     * true if given element is a body element
     * @param element the element
     */
    function isBody(element: HTMLElement): boolean;
    /**
     * true if the given element is a zone
     * @param element the element
     */
    function isZone(element: HTMLElement): boolean;
    /**
     * true if the given element is a trap
     * @param element the element
     */
    function isTrap(element: HTMLElement): boolean;
    /**
     * return true if element is a form
     * @param element the element
     */
    function isForm(element: HTMLElement): boolean;
    /**
     * gets the ancestor form of an element
     * @param element the element
     */
    function getAncestorForm(element: HTMLElement): HTMLElement;
    /**
     * return true if we are inside a search box that has its own arrow key controls
     * @param element the element
     * @param isRightArrow the right arrow was clicked
     */
    function useArrowKeysWithinSearchbox(element: HTMLElement, isRightArrow: boolean): boolean;
    /**
     * true if given element is a search box
     * @param element the element
     */
    function isSearchBox(element: HTMLElement): boolean;
    /**
     * returns ancestor table of current element
     * @param element the current element
     */
    function getAncestorTable(element: HTMLElement): HTMLElement;
    /**
     * returns the next row in the current table
     * @param element the current element
     */
    function getNextRowInTable(element: HTMLElement): HTMLElement;
    /**
     * returns the previous row in the current table
     * @param element the current element
     */
    function getPreviousRowInTable(element: HTMLElement): HTMLElement;
    /**
     * returns true if the current element is a table row
     * @param element the current element
     */
    function isTableRow(element: HTMLElement): boolean;
    /**
     * returns true if the current element is a table cell
     * @param element the current element
     */
    function isTableCell(element: HTMLElement): boolean;
    /**
     * returns true if the current element is inside a table cell
     * @param element the current element
     */
    function isInTableCell(element: HTMLElement): boolean;
    /**
     * Escapes regular expression special characters -[]/{}()*+?.\^$|
     *
     * @param str The string to escape.
     * @return The escaped string.
     */
    function regexEscape(str: string): string;
    /**
     * No-op function.
     */
    const noop: () => void;
    /**
     * Returns whether the given data is primitive data type.
     * ECMAScript 6 standard defines 6 primitive data types: Boolean, Null, Undefined, Number, String, Symbol(new in ECMAScript 6)
     *
     * @param data The input data.
     * @return A boolean value indicating whether the data is primitive data type.
     */
    function isPrimitive(data: any): boolean;
    /**
     * Applies polyfills as properties to the prototype of the given object.
     * If force is specified the polyfills will overwrite any existing properties.
     */
    function polyfill(type: {
        prototype: Object;
    }, fills: Object, force?: boolean): void;
    /**
     * Get a readonly map that is a faster alternative to cast a string to small and non-negative integers.
     * - Doesn't support negative integer since the performance is significantly decreased for negative integer.
     * - The JSperf links: http://jsperf.com/int-to-string-map/4, http://jsperf.com/cast-int-to-string-in-loop.
     *
     * The StringToIntMap is mainly used to convert string to const enum. For example:
     * const enum Fruit {
     *   Unknown = 0,
     *   Apple = 1,
     *   Banana = 2,
     *   Max = 3
     * }
     * var stringToIntMap = utilities.getStringToIntMap(Fruit.Max);
     * strictEqual(stringToIntMap["1"], Fruit.Apple);
     * strictEqual(stringToIntMap["2"], Fruit.Banana);
     *
     * @param requiredMaxInteger The required max integer.
     * @returns The object have one to one mapping between the string and the corresponding integer. e.g. {"0":0,"1":1,"2":2,"3":3,"4":4, ... }.
     */
    function getIntToStringMap(requiredMaxInteger: number): string[];
    /**
     * Get a readonly map that is a faster alternative to cast a small and non-negative integer to string.
     * - Doesn't support negative integer since the performance is significantly decreased for negative integer.
     * - The JSperf links: http://jsperf.com/parseint-vs-map-lookup/2, http://jsperf.com/parseint-vs-map-lookup-2
     *
     * The intToStringMap is mainly used to convert const enum to string. For example:
     * const enum Fruit {
     *     Unknown = 0,
     *     Apple = 1,
     *     Banana = 2,
     *     Max = 3
     * }
     *
     * var stringToIntMap = utilities.getStringToIntMap(Fruit.Max);
     * strictEqual(intToStringMap[Fruit.Unknown], "0");
     * strictEqual(intToStringMap[Fruit.Apple], "1");
     *
     * @param requiredMaxInteger The required max integer.
     * @returns The array to have increment integer in string representation. e.g. ["0","1","2","3","4", ...].
     */
    function getStringToIntMap(requiredMaxInteger: number): StringMap<number>;
    /**
     * Makes a shallow clone of the source object with the same prototype and rebinds all functions
     * on the clone to use the source object as 'this'.
     *
     * @param object The source object.
     * @return The cloned object.
     */
    function cloneAndRebindFunctions<T>(object: T): T;
    /**
     * Takes a value and lower cases recursively.
     * For a string, returns the lower case string (non-value remains non-value).
     * For an object, recursively converts all string properties to lower case strings, including arrays of values.
     * For an array, returns an array with all string values converted to lower case.
     *
     * @param source The source value to make lower case.
     * @returns The lower case value.
     */
    function lowerCaseAllStrings(source: any): any;
    /**
     * Enum of environment mode.
     */
    const enum EnvironmentMode {
        NotUse = 0,
        LoadEmbedded = 1,
        Load = 2,
    }
    /**
     * Side load setting interface.
     */
    interface SideLoad {
        origin: string;
    }
    /**
     * Override environment setting with side-loading setting on current loaded domain.
     * - update information to local storage key and overridden when loading the manifest.
     * - use sideLoadReset to reset all sideLoading settings.
     *
     * @param originUri the origin url of the module.
     */
    function sideLoad(): {
        [name: string]: SideLoad;
    };
    /**
     * Reset all side-loading settings on current loaded domain.
     */
    function sideLoadReset(): void;
    /**
     * Override environment setting with side-loadig setting on current loaded domain.
     * - update information to local storage key and overriden when loading the manifest.
     * - use sideLoadReset to reset all sideLoading settings.
     *
     * @param level the debug level. 1:Critical, 2:Error, 3:Warning, 4:Success, 5:Informational, 6:Verbose, 7:Debug.
     *
     */
    function consoleDebug(): number;
    /**
     * Reset all side-loading settings on current loaded domain.
     */
    function consoleDebugReset(): void;
    /**
     * Gets the localized strings initialized by localization manager. The LocalizationManager should have
     * been used to get the localized strings. This can also be achieved by calling SmeEnvironment.initEnvironment().
     * @returns an object containing all the localized strings, or null if noe localized strings have been fetched yet
     */
    function resourcesStrings<T>(): T;
    /**
     * Gets current session identification.
     * Within the same browser session, the session ID is the same on shell and all modules.
     */
    function sessionId(): string;
    /**
     * Gets the self object of global MsftSme.
     */
    function self(): {
        Init: MsftSmeInit;
        Environment: MsftSmeEnvironment;
        Resources: MsftSmeResources;
    };
    enum KeyCode {
        Backspace = 8,
        Tab = 9,
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        Pause = 19,
        CapsLock = 20,
        Escape = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        LeftArrow = 37,
        UpArrow = 38,
        RightArrow = 39,
        DownArrow = 40,
        Insert = 45,
        Delete = 46,
        Num0 = 48,
        Num1 = 49,
        Num2 = 50,
        Num3 = 51,
        Num4 = 52,
        Num5 = 53,
        Num6 = 54,
        Num7 = 55,
        Num8 = 56,
        Num9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        LeftWindows = 91,
        RightWindows = 92,
        Select = 93,
        Numpad0 = 96,
        Numpad1 = 97,
        Numpad2 = 98,
        Numpad3 = 99,
        Numpad4 = 100,
        Numpad5 = 101,
        Numpad6 = 102,
        Numpad7 = 103,
        Numpad8 = 104,
        Numpad9 = 105,
        Multiply = 106,
        Add = 107,
        Subtract = 109,
        DecimaPoint = 110,
        Divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        NumLock = 144,
        ScrollLock = 145,
        SemiColon = 186,
        EqualSign = 187,
        Comma = 188,
        Dash = 189,
        Period = 190,
        ForwardSlash = 191,
        GraveAccent = 192,
        OpenBracket = 219,
        BackSlash = 220,
        CloseBraket = 221,
        SingleQuote = 222,
    }
}
