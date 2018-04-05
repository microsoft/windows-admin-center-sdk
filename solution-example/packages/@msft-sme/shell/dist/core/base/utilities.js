/* tslint:disable */
// this code has been worked on other platform, and refactoring may cause other problem so keeps as is.
var MsftSme;
(function (MsftSme) {
    'use strict';
    var global = window;
    var FunctionGlobal = Function;
    var MathGlobal = Math;
    var ObjectGlobal = Object;
    // See Mark Miller’s explanation of what this does.
    // http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
    //
    // For example:
    // const array_slice: <T>(target: T[]|IArguments, start?: number, end?: number) => T[] = MsPortalFx.uncurryThis(Array.prototype.slice);
    // Then the call can be strong typed, rather than call/apply with only runtime check.
    //
    // This also **might** have the nice side-effect of reducing the size of
    // the minified code by reducing x.call() to merely x()
    var call = FunctionGlobal.call;
    var apply = FunctionGlobal.apply;
    function uncurryThis(f) {
        return function () {
            return call.apply(f, arguments);
        };
    }
    MsftSme.uncurryThis = uncurryThis;
    var _applyCall = uncurryThis(apply);
    MsftSme.applyCall = _applyCall;
    MsftSme.applyUncurry = _applyCall; // most uncurry function can be call by _applyCall  except for array_concat; (see below.)
    // declare variable such that  minimize better and code readibility
    var array_prototype = Array.prototype;
    var array_prototype_concat = array_prototype.concat; // array concat does not work well with uncurryThis since it flatten the arguments array.
    var array_prototype_push = array_prototype.push;
    var array_filter = uncurryThis(array_prototype.filter);
    var array_forEach = uncurryThis(array_prototype.forEach);
    var array_join = uncurryThis(array_prototype.join);
    var array_push = uncurryThis(array_prototype_push);
    var array_slice = uncurryThis(array_prototype.slice);
    var array_splice = uncurryThis(array_prototype.splice);
    var array_indexof = uncurryThis(array_prototype.indexOf);
    var array_isArray = Array.isArray;
    var string_prototype = String.prototype;
    var string_concat = uncurryThis(string_prototype.concat);
    var string_split = uncurryThis(string_prototype.split);
    var string_substring = uncurryThis(string_prototype.substring);
    var string_indexOf = uncurryThis(string_prototype.indexOf);
    var string_toLowerCase = uncurryThis(string_prototype.toLowerCase);
    var object_hasOwnProperty = uncurryThis(ObjectGlobal.prototype.hasOwnProperty);
    var object_keys_original = ObjectGlobal.keys;
    var _undefined = undefined;
    var object_freeze = ObjectGlobal.freeze;
    var functionType = "function";
    var stringType = "string";
    var numberType = "number";
    var objectType = "object";
    var undefinedType = "undefined";
    /**
     * For testing only. Use Object.keys.
     */
    function _objectKeysPolyfill(o) {
        switch (typeof o) {
            case stringType:
                var arr = [];
                for (var i in o) {
                    array_push(arr, i);
                }
                return arr;
            case functionType:
            case objectType:
            case undefinedType:
                return object_keys_original(o);
            default:
                return [];
        }
    }
    MsftSme._objectKeysPolyfill = _objectKeysPolyfill;
    // intentionally put inside an anonymous function.
    // presense of try-catch impacts the browser's ability
    // to optimize code in the same function context.
    (function () {
        try {
            object_keys_original("");
        }
        catch (err) {
            // it threw so this browser is in ES5 mode (probably IE11)
            // let's polyfill Object.keys
            ObjectGlobal.keys = _objectKeysPolyfill;
        }
    })();
    var object_keys = ObjectGlobal.keys;
    function isTypeOf(obj, type) {
        return typeof obj === type;
    }
    function isDate(obj) {
        return obj instanceof Date;
    }
    var regex_NonSpace = /\S/;
    //#region Lang
    function getDisposeFunc(value) {
        var dispose = value && value.dispose;
        return isTypeOf(dispose, functionType) && dispose;
    }
    function forEachKey(obj, iterator) {
        array_forEach(object_keys(obj), function (k) {
            iterator(k, obj[k]);
        });
    }
    MsftSme.forEachKey = forEachKey;
    /**
     * Shortcut for Object.keys(obj || {}).length.
     * @return number.
     */
    function keysLength(obj) {
        return object_keys(obj || {}).length;
    }
    MsftSme.keysLength = keysLength;
    /**
     * Determines whether an object has properties on it.
     * Will return true for the following inputs: [], {}, "", 0, 1, true, false, new Date(), function() {}.
     * Will return false for the following inputs: [1], {a:1}, "123".
     * @return boolean.
     */
    function isEmpty(obj) {
        return !keysLength(obj);
    }
    MsftSme.isEmpty = isEmpty;
    /**
     * Detect a value is Disposable.
     *
     * @param value The value to check against value.dispose is a function.
     * @return boolean.
     */
    function isDisposable(value) {
        return !!getDisposeFunc(value);
    }
    MsftSme.isDisposable = isDisposable;
    function _disposeDisposable(value) {
        if (array_isArray(value)) {
            array_forEach(value, _disposeDisposable);
        }
        var dispose = getDisposeFunc(value);
        if (dispose) {
            dispose.call(value); //  dispose typically rely on this is the object.
        }
    }
    /**
     * call value.dispose() if a value is Disposable.
     *
     * @param value The value to call value.dispose()
     * @return boolean;
     */
    MsftSme.disposeDisposable = function () {
        array_forEach(arguments, _disposeDisposable);
    };
    /**
     * Detect a value is null.
     *
     * @param value The value to check against null.
     * @return boolean.
     */
    function isNull(value) {
        return value === null;
    }
    MsftSme.isNull = isNull;
    /**
     * Detect a value is undefined.
     *
     * @param value The value to check against undefined.
     * @return boolean.
     */
    function isUndefined(value) {
        return value === _undefined;
    }
    MsftSme.isUndefined = isUndefined;
    /**
     * Indicates whether the specified object is null or undefined.
     *
     * @param value The value to test.
     * @returns True if the value parameter is null or undefined; otherwise, false.
     */
    function isNullOrUndefined(value) {
        return value === null || value === _undefined;
    }
    MsftSme.isNullOrUndefined = isNullOrUndefined;
    /**
     * Indicates whether the specified object is not null or undefined.
     *
     * @param value The value to test.
     * @returns True if the value parameter is null or undefined; otherwise, false.
     */
    function notNullOrUndefined(value) {
        return value !== null && value !== _undefined;
    }
    MsftSme.notNullOrUndefined = notNullOrUndefined;
    /**
     * Checks if the string is null, undefined or whitespace.
     *
     * @param  value The target string.
     * @return true if the string is null, undefined or whitespace; otherwise, false.
     */
    function isNullOrWhiteSpace(value) {
        // http://jsperf.com/empty-string-test-regex-vs-trim/4
        return isNullOrUndefined(value) || (isTypeOf(value, stringType) && !regex_NonSpace.test(value)); // if can't find any characters other than space.
    }
    MsftSme.isNullOrWhiteSpace = isNullOrWhiteSpace;
    //#region Array
    /**
     * Firds the index of the first element of an array that matches the predicate.
     *
     * @param predicate The Predicate function.
     * @param startIndex The starting index.  If negative, it find from the end of the array.
     *        If you want to continue the next search from the back you much pass in startIndex = (prevReturn - length -1)
     *
     * @return The first index that matches the predicate.
     */
    function findIndex(array, predicate, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (array) {
            var length = array.length;
            var stop = length;
            var step = 1;
            var index = startIndex;
            if (length) {
                if (startIndex < 0) {
                    index += length;
                    step = stop = -1;
                }
                if (!predicate) {
                    return index < length && index >= 0 ? index : -1;
                }
                while (index !== stop) {
                    if (predicate(array[index], index, array)) {
                        return index;
                    }
                    index += step;
                }
            }
        }
        return -1;
    }
    MsftSme.findIndex = findIndex;
    /**
     * Finds the first element of an array that matches the predicate.
     *
     * @param predicate The Predicate function.
     * @param startIndex The starting index.  If negative, it find from the end of the array.
     *        If you want to continue the next search from the back you much pass in startIndex = (prevReturn - length -1)
     *
     * @return The first element that matches the predicate.
     */
    function find(array, predicate, startIndex) {
        var index = findIndex(array, predicate, startIndex);
        return index < 0 ? _undefined : array[index];
    }
    MsftSme.find = find;
    /**
     * Returns the first element of the sequence.
     *
     * @return The element
     */
    function first(array) {
        return array ? array[0] : _undefined;
    }
    MsftSme.first = first;
    /**
     * Returns the last element of the sequence.
     *
     * @return The element
     */
    function last(array) {
        var length = array ? array.length : 0;
        return length ? array[length - 1] : _undefined;
    }
    MsftSme.last = last;
    /**
     * Removes all values that equal the given item and returns them as an array
     *
     * @param item The value to be removed.
     * @return The removed items.
     */
    function remove(array, itemOrPredicate, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        var removedItems = [];
        var removedCount = 0;
        var predicate;
        if (isTypeOf(itemOrPredicate, functionType)) {
            predicate = itemOrPredicate;
        }
        for (var i = startIndex, l = array.length; i < l; i++) {
            var item = array[i];
            if (removedCount) {
                array[i - removedCount] = item; //shift the item to the offset
            }
            if (itemOrPredicate === item || (predicate && predicate(item))) {
                removedCount++;
                array_push(removedItems, item);
            }
        }
        if (removedCount) {
            array_splice(array, -1 * removedCount); // remove that many item form the end;
        }
        return removedItems;
    }
    MsftSme.remove = remove;
    // This function use findIndex, put it here for minimizer friendly
    // sourceUnique is a flag to optimize the performance, set to  true if you know source is unique already.
    function pushUnique(uniqueTarget, source, predicate, sourceUnique) {
        if (sourceUnique === void 0) { sourceUnique = false; }
        if (array_isArray(source)) {
            var getIndex = predicate ?
                function (value) { return findIndex(uniqueTarget, function (resultValue) { return predicate(resultValue, value); }); } :
                function (value) { return uniqueTarget.indexOf(value); };
            var appendTarget = (sourceUnique) ? [] : uniqueTarget; // if source is already unique, we accumlate to a sperated array to increase the perf.
            for (var i = 0, l = source.length; i < l; i++) {
                var value = source[i];
                if (getIndex(value) < 0) {
                    array_push(appendTarget, value);
                }
            }
            if (sourceUnique) {
                array_prototype_push.apply(uniqueTarget, appendTarget);
            }
        }
        return uniqueTarget;
    }
    MsftSme.pushUnique = pushUnique;
    /**
     * Returns a unique set from this array based on the predicate.
     *
     * @param predicate The predicate function. Added to the result if the predicate returns false.
     * @return A new array with the unique values.
     */
    function unique(array, predicate) {
        return pushUnique([], array, predicate);
    }
    MsftSme.unique = unique;
    function union() {
        var result = [];
        var lastArrayIndex = arguments.length - 2;
        var predicate = arguments[lastArrayIndex + 1];
        // If the predicate is not a function, it means that it is the last array to union.
        if (!isTypeOf(predicate, functionType)) {
            predicate = _undefined;
            lastArrayIndex++;
        }
        for (var i = 0; i <= lastArrayIndex; i++) {
            var source = unique(arguments[i], predicate); // make a smaller set
            pushUnique(result, source, predicate, true /* source Unique*/);
        }
        return result;
    }
    MsftSme.union = union;
    /**
     * Merge multiple T, T[] into a combine T[] exclude null or undefined arguments.
     *
     * @param data, a list fo T, T[]
     * @returns concattenated array.
     */
    MsftSme.merge = function () {
        // Don't use TypeScript's built-in "... rest" args syntax for perf-critical
        // paths because it constructs the args array even if you don't need it,
        var ret = [];
        var data = array_filter(arguments, notNullOrUndefined);
        return array_prototype_concat.apply(ret, data);
    };
    /**
     * Projects each element of a sequence to a sequence and flattens the resulting sequences into one sequence.
     *
     * @param selector The projection function.
     * @return A flattened array.
     */
    function mapMany(array, selector) {
        return MsftSme.merge.apply(null, array.map(selector));
    }
    MsftSme.mapMany = mapMany;
    /**
     * Sorts an array using a stable sort algorithm.
     *
     * This method returns a new array, it does not sort in place.
     *
     * @param compare The Compare function.
     * @return Sorted array.
     */
    function stableSort(array, compare) {
        var array2 = array.map(function (v, i) { return { i: i, v: v }; });
        array2.sort(function (a, b) {
            return compare(a.v, b.v) || (a.i - b.i);
        });
        return array2.map(function (v) { return v.v; });
    }
    MsftSme.stableSort = stableSort;
    function toString(item) {
        return item ? item.toString() : String(item);
    }
    function extendArrayIntoMap(objToExtend, sourceItems, getKeyCallback, getValueCallback, onlyIfNotExist) {
        getKeyCallback = getKeyCallback || toString;
        // The use of args here is to reduce the array creation call and make sure the function context this is the sourceItems.
        var args = [sourceItems, /*item*/ , /*index*/ , ""];
        for (var i = 0, l = sourceItems.length; i < l; i++) {
            var item = sourceItems[i];
            args[1] = item;
            args[2] = i;
            args[3] = _undefined;
            var key = call.apply(getKeyCallback, args);
            if (!onlyIfNotExist || objToExtend[key] === _undefined) {
                args[3] = key; // This is convient for the get value function to know the key that previous interpreted by getKeyCallback
                var value = getValueCallback ? call.apply(getValueCallback, args) : item;
                // Only extend this key if the value return is not undefined.
                if (value !== _undefined) {
                    objToExtend[key] = value;
                }
            }
        }
    }
    MsftSme.extendArrayIntoMap = extendArrayIntoMap;
    function extendStringMapIntoMap(objToExtend, sourceItems, getValueCallback, onlyIfNotExist) {
        // The use of args here is to reduce the array creation call and make sure the function context this is the sourceItems.
        var args = [sourceItems, /*item*/ ,];
        forEachKey(sourceItems, function (key, item) {
            if (!onlyIfNotExist || objToExtend[key] === _undefined) {
                args[1] = item;
                args[2] = key; // This is convient for the get value function to know the key that previous interpreted by getKeyCallback
                var value = getValueCallback ? call.apply(getValueCallback, args) : (item || key);
                // Only extend this key if the value return is not undefined.
                if (value !== _undefined) {
                    objToExtend[key] = value;
                }
            }
        });
    }
    MsftSme.extendStringMapIntoMap = extendStringMapIntoMap;
    function getStringMapFunc(keys) {
        if (array_isArray(keys)) {
            // make a copy of keys so that future changes to the input array do not impact the behavior of the returned function.
            keys = array_slice(keys);
        }
        else {
            keys = arguments;
        }
        return function () {
            // Most people call .hasOwnProperty or .constructor (which it should not)
            // since there is no guarantee that any object return to have those function -Expecially in generic function.
            // http://stackoverflow.com/questions/12017693/why-use-object-prototype-hasownproperty-callmyobj-prop-instead-of-myobj-hasow
            // Unfortunately, this need to be changed.
            var ret = {};
            array_forEach(arguments, function (value, index) {
                var key = keys[index];
                if (value !== _undefined) {
                    ret[key] = value;
                }
            });
            return ret;
        };
    }
    MsftSme.getStringMapFunc = getStringMapFunc;
    /**
     * Helpers funciton to create a object lightweight constructor
     *
     * @param keys the ordered argument keys
     *
     * @return The function that will return string map base on the arguments index order of keys
     */
    function applyStringMapFunc(keys) {
        return getStringMapFunc.apply(_undefined, keys);
    }
    MsftSme.applyStringMapFunc = applyStringMapFunc;
    /**
     * Helpers funciton to create a object of type NameValue<N, T>
     *
     * @param name name
     * @param value value
     *
     * @return an object of NameValue<N, T>
     */
    MsftSme.getNameValue = getStringMapFunc("name", "value");
    /**
     * Get a list of typeScript Enum into Array
     *
     * @param tsEnumeration The Type script Enum Array
     * @param sort optional whether to sort by enum's value
     * @return all NameValue<string, number>[] for this typeScriptEnum
     */
    function getEnumArray(tsEnumeration, sort) {
        var retVal = [];
        forEachKey(tsEnumeration, function (key, val) {
            if (isTypeOf(key, stringType) && isTypeOf(val, numberType)) {
                array_push(retVal, MsftSme.getNameValue(key, val));
            }
        });
        return sort ? retVal.sort(function (a, b) { return a.value - b.value; }) : retVal;
    }
    MsftSme.getEnumArray = getEnumArray;
    /**
     * Coerce an input into an array if it isn't already one.
     */
    function makeArray(input) {
        if (!array_isArray(input)) {
            if (isNullOrUndefined(input)) {
                input = [];
            }
            else {
                input = [input];
            }
        }
        return input;
    }
    MsftSme.makeArray = makeArray;
    //#endregion Array
    //#region Date
    /**
     * Checks if given dates are equal.
     *
     * @param left Left hand side date.
     * @param left Right hand side date.
     * @return True if left date is equal to right date.
     */
    function areEqualDates(left, right) {
        return isDate(left) && isDate(right) && !(left > right || left < right);
    }
    MsftSme.areEqualDates = areEqualDates;
    /**
     * Round down the date.getTime() to seconds
     *
     * @param date.
     * @return the getTime in seconds
     */
    function toSeconds(date) {
        // The old function use toString to trim off microseconds to time comparsion for stablesort
        // return new Date(x.toString()).getTime();  --- this is slow:
        // http://jsperf.com/truncating-decimals
        // x = new Date()
        //Wed Feb 17 2016 12:15:39 GMT- 0800(Pacific Standard Time)
        //y = new Date(x.toString()).getTime()
        //1455740139000
        //z = (x.getTime() / 1000) | 0
        //1455740139
        return (date.getTime() / 1000) | 0;
    }
    MsftSme.toSeconds = toSeconds;
    //#endregion Date
    //#region Math
    var hexCharsLowerCase = string_split("0123456789abcdef", "");
    var hexBytesLower = [];
    array_forEach(hexCharsLowerCase, function (upper) {
        array_forEach(hexCharsLowerCase, function (lower) {
            array_push(hexBytesLower, upper + lower);
        });
    });
    var sizeOfGuidInBytes = 20;
    var tempUintArray = new Uint8Array(sizeOfGuidInBytes);
    var tempStringArray = new Array(sizeOfGuidInBytes);
    function applyAndOr(index, and, or) {
        var temp = tempUintArray[index] & and;
        tempUintArray[index] = temp | or;
    }
    ////// TODO: const globalCrypto = <Crypto>(window.crypto || (<any>window).msCrypto);
    var globalCrypto = (window.crypto || window.msCrypto);
    // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
    //  xx  xx  xx  xx  -   xx  xx  -  4x  xx  -   yx  xx  -   xx  xx  xx  xx  xx  xx
    //  00  11  22  33  4   55  66  7  88  99  10  11  12  13  14  15  16  17  18  19
    function newGuidCrypto() {
        globalCrypto.getRandomValues(tempUintArray);
        applyAndOr(8, 0x0F, 0x40); // set upper half of the 8th byte to 0x4
        applyAndOr(11, 0x3F, 0x80); // set the two most significant bits of the 11th byte to 10b
        for (var i = 0; i < sizeOfGuidInBytes; i++) {
            tempStringArray[i] = hexBytesLower[tempUintArray[i]];
        }
        tempStringArray[4] = tempStringArray[7] = tempStringArray[10] = tempStringArray[13] = "-";
        return MsftSme.applyUncurry(string_concat, "", tempStringArray);
    }
    /**
     * HelperReturns hex number string.
     *
     * @param len The number of the output string length
     * @return a hexnumber string of length len
     */
    function getRandomHexString(len) {
        var tmp;
        var ret = new Array(len);
        // This implementation optimization of speed mimimize the cost of Math.random.
        // equal chance for all number
        while (len) {
            tmp = 4294967296 * MathGlobal.random() | 0; // get the max integer our of 32 digit.
            var times = 8; // for every random number we can harvest 8 times.
            while (times--) {
                ret[--len] = hexCharsLowerCase[tmp & 0xF]; // fill from the back.
                if (len < 0) {
                    return ret; // we filled all the bucket, return now.
                }
                tmp >>>= 4; // zero fill right shift to ensure return is always positive number.
            }
        }
    }
    function newGuidFallback() {
        // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
        var guid = getRandomHexString(36);
        guid[8] = guid[13] = guid[18] = guid[23] = "-"; // fill in the dash.
        guid[14] = "4"; // set the 4 in the guid.
        // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
        // guid[19] = hexValues[8 + (Math.random() * 4) | 0]; /*clockSequenceHi*/
        guid[19] = hexCharsLowerCase[8 + (hexCharsLowerCase.indexOf(guid[19]) & 0x3)]; // Since guid[19] is already random. reused the numbe by get its index rather than another Math.random call.
        return _applyCall(string_concat, "", guid);
    }
    /**
     * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
     *
     * @return New GUID.
     */
    MsftSme.newGuid = globalCrypto ? newGuidCrypto : newGuidFallback;
    var maxCounter = 0xFFF;
    function toHexString(counter) {
        return hexBytesLower[counter >> 4] + hexCharsLowerCase[counter & 0xF];
    }
    /**
     * Returns a function that can generate globally unique identifiers.
     * Generates a new guid every 4096 calls and concatenates it with an
     * auto incrementing number.  This maintains a complient GUID 4 format
     * if no prefix is added.
     *
     * @return a globally unique string generating function.
     */
    function getUniqueIdGenerator(prefix) {
        prefix = prefix ? (prefix + "-") : "";
        // use a range for counter that gives us 3 digits with minimum effort
        var guid = "";
        var counter = maxCounter;
        return function () {
            if (++counter > maxCounter) {
                counter = 0;
            }
            if (!counter) {
                guid = prefix + MsftSme.newGuid().substring(0, 33);
            }
            return guid + toHexString(counter);
        };
    }
    MsftSme.getUniqueIdGenerator = getUniqueIdGenerator;
    /**
     * Returns a function that can generate unique id under the prefix
     * Concatenates prefix with an auto incrementing number.
     *
     * @return a unique string generating function which return a prefix with auto incrementing number
     */
    function getIdGenerator(prefix) {
        // use two counters and
        // limit the size of the lower counter because
        // toString is expensive for large numbers
        var counterUpper = -1;
        var counterLower = maxCounter;
        var realPrefix = "";
        return function () {
            if (++counterLower > maxCounter) {
                counterLower = 0;
                counterUpper++;
                realPrefix = prefix + counterUpper.toString(16) + "-";
            }
            return realPrefix + toHexString(counterLower);
        };
    }
    MsftSme.getIdGenerator = getIdGenerator;
    /**
     * Returns a globally unique identifier string.
     * Lighter-weight than newGuid.
     *
     * @return a globally unique string.
     */
    MsftSme.getUniqueId = getUniqueIdGenerator();
    /**
     * Rounds a number to the specified precision.
     *
     * @param number The number to round.
     * @param precision The precision to round the number to. Defaults to 0.
     * @returns The rounded number.
     */
    function round(number, precision) {
        precision = MathGlobal.pow(10, precision || 0);
        return MathGlobal.round(Number(number) * precision) / precision;
    }
    MsftSme.round = round;
    /**
     * Truncates a number to the integer part.
     *
     * @param value The number to truncate.
     * @return The integer number.
     */
    function truncate(value) {
        // Converts to integer by bit operation
        return value | 0;
    }
    MsftSme.truncate = truncate;
    /**
     * Returns the result of the boolean exclusive-or operator.
     *
     * @param a First operand.
     * @param b Second operand.
     * @return true if the arguments have different values, false otherwise.
     */
    function xor(a, b) {
        return a ? !b : b;
    }
    MsftSme.xor = xor;
    //#endregion Map
    //#region Number
    /**
     * Generates a random integer between min and max inclusive.
     *
     * @param min The minimum integer result.
     * @param max The maximum integer result.
     * @return A random integer.
     */
    function random(min, max) {
        if (min === _undefined || max === _undefined || min > max) {
            return;
        }
        return MathGlobal.floor(MathGlobal.random() * (max - min + 1)) + min;
    }
    MsftSme.random = random;
    //#endregion Number
    //#region Object
    /**
     * Determines whether an object has a property with the specified name.
     * @param target the object to check.
     * @param v A property name.
     */
    MsftSme.hasOwnProperty = object_hasOwnProperty;
    /**
     * Returns a boolean reflecting whether two scalar values (not object-typed, not array-typed, not function-typed)
     * are equal.  Accounts for the fact that JavaScript Date derives from Object.
     * The caller is responsible for supplying exclusively number-, string- or Date-typed values here.
     *
     * @param left The first scalar value.
     * @param right The second scalar value.
     * @return A boolean reflecting whether the two scalar values are equal.
     */
    function areEqual(left, right) {
        return left === right || areEqualDates(left, right);
    }
    MsftSme.areEqual = areEqual;
    /**
     * Verifies that two arrays are equal.
     *
     * @param array1 The array to check.
     * @param array2 The array to compare the first array to.
     * @returns A value indicating whether or not the two arrays are equal.
     */
    function arrayEquals(array1, array2) {
        if (array1 === array2) {
            return true;
        }
        else if (!array1 || !array2) {
            return false;
        }
        else if (array1.length !== array2.length) {
            return false;
        }
        else {
            for (var i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }
            return true;
        }
    }
    MsftSme.arrayEquals = arrayEquals;
    function getTypeOf(x) {
        var typeOfX = typeof x;
        if (typeOfX === objectType) {
            if (x === null) {
                typeOfX = "null";
            }
            else if (array_isArray(x)) {
                typeOfX = "array";
            }
            else if (isDate(x)) {
                typeOfX = "date";
            }
        }
        return typeOfX;
    }
    MsftSme.getTypeOf = getTypeOf;
    /**
    * Checks for deep equality of two object.
    *
    * @param a Object 1
    * @param b Object 2
    * @param mapFunc Optional parameter, used convert value conversion use on the value to compare
    * @return true if both of the object contains the same information; false otherwise;
    */
    function deepEqualsMap(a, b, mapFunc) {
        var i;
        if (mapFunc) {
            a = mapFunc(a);
            b = mapFunc(b);
        }
        if (a === b) {
            return true;
        }
        else if (!a || !b) {
            return false;
        }
        var typeofInput = getTypeOf(a);
        if (typeofInput !== getTypeOf(b)) {
            return false;
        }
        switch (typeofInput) {
            case "array":
                var aArray = a;
                return a.length === b.length &&
                    aArray.every(function (v, index) { return deepEqualsMap(v, b[index], mapFunc); });
            case "date":
                return a.getTime() === b.getTime();
            case objectType:
                var keysOfInput = object_keys(a);
                return keysOfInput.length === keysLength(b) &&
                    keysOfInput.every(function (key) { return deepEqualsMap(a[key], b[key], mapFunc); });
            default:
                // basic type that failed the === check
                return false;
        }
    }
    /**
     * Checks if a given value is an object or not.
     *
     * @param value Value to test.
     * @return True if value is an object, false otherwise.
     */
    function isObject(value) {
        return getTypeOf(value) === objectType;
    }
    MsftSme.isObject = isObject;
    /**
     * Maps each value of the input object. Values that map to null or undefined are skipped.
     *
     * @param obj Input object whose properties are to be mapped.
     * @param callback Invoked for each property of the object to perform the mapping.
     * @param arg An Optional value that can be passed to callback.
     * @return An array of mapped values.
     */
    function map(obj, callback, arg) {
        var callBackArgs = [obj, /*item*/ , /*key*/ , arg];
        var keys = object_keys(obj);
        var ret = keys.map(function (key) {
            callBackArgs[1] = obj[key]; // item;
            callBackArgs[2] = key; // key;
            return call.apply(callback, callBackArgs);
        });
        // Flatten any nested arrays and exclude null, undefined items.
        return MsftSme.merge.apply(null, ret);
    }
    MsftSme.map = map;
    /**
     * Shallow copy from a key/value pairs object.
     *
     * @param to An un-typed object to be populated.
     * @param from An un-typed object with values to populate.
     * @param scopes Scoped down the list for shallowCopy
     */
    function shallowCopyFromObject(to, from, scopes) {
        // http://jsperf.com/shallowcopyobjects/3
        scopes = scopes || object_keys(from);
        for (var i = 0; i < scopes.length; i++) {
            var key = scopes[i];
            var value = from[key];
            if (value !== _undefined) {
                to[key] = value;
            }
        }
    }
    MsftSme.shallowCopyFromObject = shallowCopyFromObject;
    /**
     * Merges a property from a destination object from a source object
     * @param dest The destination object
     * @param src The source object
     * @param propName The name of the property to assign
     */
    function deepAssignProperty(dest, src, propName) {
        var value = src[propName];
        // if there is no value, dont assign.
        if (isNullOrUndefined(value)) {
            return;
        }
        if (!isObject(value) || !MsftSme.hasOwnProperty(dest, propName)) {
            // If the src prop is not an object or the prop is not defined on the dest then set the prop directly
            dest[propName] = value;
        }
        else {
            // Otherwise merge to src prop with the dest prop
            dest[propName] = deepAssignInternal(dest[propName], src[propName]);
        }
    }
    /**
     * Internal method for merging one object with another
     * @param dest The destination object
     * @param src The source object
     */
    function deepAssignInternal(dest, src) {
        // if the to destination is the same object as the source, save some time by just returning
        if (dest === src) {
            return dest;
        }
        // loop through the src objects properties and merge them deeply to the dest 
        for (var propName in src) {
            if (MsftSme.hasOwnProperty(src, propName)) {
                deepAssignProperty(dest, src, propName);
            }
        }
        // return the destination object
        return dest;
    }
    /**
     * Merges a set of source objects to a destination object
     * @param dest The destination object
     * @param sources  the source objects
     */
    function deepAssign(dest) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        // merge all sources into the dest object in order
        sources.forEach(function (src) {
            return deepAssignInternal(dest, src);
        });
        // return the dest object
        return dest;
    }
    MsftSme.deepAssign = deepAssign;
    /**
     * Searchs an object for a value at a given path.
     * @param object The object to search in
     * @param path the path to walk
     * @param replace internal use, indicates that this is the first pass.
     * @returns the object at the end of the path
     */
    function getValueInternal(object, path, firstPass) {
        // return null if either argument is not provided
        if (isNullOrUndefined(object) || isNullOrUndefined(path)) {
            return null;
        }
        // always convert path to string
        var strPath = '' + path;
        // on the first pass, replace delimiters in the object path with *
        if (firstPass) {
            strPath = strPath.replace(/\]\.|\.|\[|\]/g, "*");
        }
        // find the next delimiter
        var index = strPath.indexOf('*');
        // if there are no more delimiters, return the object at the path
        if (index === -1) {
            return object[strPath];
        }
        // split the path at the delimiter. Use the first segment as our next object and the second segment for the remaing path
        var next = strPath.slice(0, index);
        var remainingPath = strPath.slice(index + 1);
        if (object[next] !== undefined && remainingPath.length > 0) {
            // dive in recursively to the next object
            return getValueInternal(object[next], remainingPath, false);
        }
        // we found our target object. Return it
        return object[next];
    }
    /**
     * Searchs an object for a value at a given path.
     * @param object The object to search in
     * @param path the path to walk
     * @returns the object at the end of the path
     */
    function getValue(object, path) {
        // call our internal get value function
        return getValueInternal(object, path, true);
    }
    MsftSme.getValue = getValue;
    //#endregion Object
    //#region String
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
    function endsWith(input, searchString, position) {
        if (!isTypeOf(searchString, stringType)) {
            return false;
        }
        input = isNullOrUndefined(input) ? "" : String(input);
        var strLen = input.length;
        if (position === _undefined || position > strLen) {
            position = strLen;
        }
        position -= searchString.length;
        var lastIndex = string_indexOf(input, searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    }
    MsftSme.endsWith = endsWith;
    /**
     * Compares the current string to another string and returns a value indicating their relative ordering.
     *
     * @param input The input string to compare.
     * @param other The value to compare the input string to.
     * @param locales The optional array of locale values that will be passed to localeCompare.
     * @param options The options supported by localeCompare.
     * @return 0, if the strings are equal; a negative number if the current string is ordered before value; a positive non-zero number if the current string is orered after value.
     */
    function localeCompareIgnoreCase(input, other, locales, options) {
        if (isNullOrUndefined(input)) {
            return -1;
        }
        if (!isTypeOf(other, stringType)) {
            return 1;
        }
        return input.toLocaleLowerCase().localeCompare(other.toLocaleLowerCase(), locales, options);
    }
    MsftSme.localeCompareIgnoreCase = localeCompareIgnoreCase;
    /**
     * Repeats the string the specified number of times.
     * @param input The input string.
     * @param count The number of times to repeat the string.
     * @returns The result string.
     *  http://jsperf.com/repeatstring2
     */
    function repeat(input, count) {
        var ret = "";
        count = (count < 0) ? 0 : count;
        while (count--) {
            ret += input;
        }
        return ret;
    }
    MsftSme.repeat = repeat;
    /**
     * reverse the string.
     * @param input The input string.
     * @returns The result string.
     */
    function reverse(input) {
        var ret = "";
        var length = input.length;
        while (length) {
            ret += input[--length];
        }
        return ret;
    }
    MsftSme.reverse = reverse;
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
    function getJoinFunc(sep) {
        return function () {
            return array_join(arguments, sep);
        };
    }
    MsftSme.getJoinFunc = getJoinFunc;
    ;
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
    function getQuoteFunc(prefix, suffix) {
        prefix = prefix || "";
        suffix = suffix || prefix;
        return function (input) {
            return prefix + input + suffix;
        };
    }
    MsftSme.getQuoteFunc = getQuoteFunc;
    ;
    /**
     * Replaces all instances of a value in a string.
     *
     * @param input The input string.
     * @param searchValue The value to replace.
     * @param replaceValue The value to replace with.
     * @return A new string with all instances of searchValue replaced with replaceValue.
     */
    function replaceAll(input, searchValue, replaceValue) {
        return input.replace(new RegExp(regexEscape(searchValue), "g"), replaceValue);
    }
    MsftSme.replaceAll = replaceAll;
    /**
     * Replaces multiple instances of search values and replacement values in a string.
     *
     * @param input The input string.
     * @param replacementMap A string map where each key represents the string to replace, and that key's value represents the value to replace it with.
     * @return A new string with replacementMap values replaced.
     */
    function replaceMany(input, replacementMap) {
        var escapedMap = {}, hasValuesToReplace = false;
        for (var searchValue in (replacementMap || {})) {
            if (replacementMap.hasOwnProperty(searchValue)) {
                escapedMap[regexEscape(searchValue)] = replacementMap[searchValue];
                hasValuesToReplace = true;
            }
        }
        if (!hasValuesToReplace) {
            return input;
        }
        var regex = new RegExp(object_keys(escapedMap).join("|"), "g");
        return input.replace(regex, function (match) { return replacementMap[match]; });
    }
    MsftSme.replaceMany = replaceMany;
    /**
     * Splits a string into the specified number of parts.
     * Differs from string.split in that it leaves the last part containing the remaining string (with separators in it).
     * string.split truncates the extra parts.
     * @param input The string to be split.
     * @param separator A string that identifies the character or characters to be used as the separator.
     * @param limit A value used to limit the number of elements returned in the array.
     * @return An array of strings whose length is at most the value of limit.
     */
    function split(input, separator, limit) {
        var retVal = [];
        if (input && separator && limit) {
            var startIndex = 0;
            var seplength = separator.length;
            var indexOf = 0;
            // reduce the limit by one.
            // we'll only break the string into limit - 1 parts
            // and put the remaining in the last spot.
            limit--;
            while (true) {
                if (retVal.length >= limit ||
                    (indexOf = string_indexOf(input, separator, startIndex)) < 0) {
                    array_push(retVal, string_substring(input, startIndex));
                    break;
                }
                array_push(retVal, string_substring(input, startIndex, indexOf));
                startIndex = indexOf + seplength;
            }
        }
        return retVal;
    }
    MsftSme.split = split;
    /**
     * Determines if the current string starts with the given string.
     * http://jsperf.com/string-startswith/49
     *
     * @param input The input string.
     * @param searchString The characters to be searched for at the start of this string.
     * @param position Optional. The position in this string at which to begin searching for searchString; defaults to 0.
     * @return A value indicating whether or not the input string begins with the search string.
     */
    function startsWith(input, searchString, position) {
        input = isNullOrUndefined(input) ? "" : String(input);
        position = (isNullOrUndefined(position) || position < 0) ? 0 : MathGlobal.min(position, input.length);
        return input.lastIndexOf(searchString, position) === position;
    }
    MsftSme.startsWith = startsWith;
    /**
     * Trims all occurrences of the given set of strings off the end of the input.
     */
    function trimEnd(input) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        input = input || "";
        while (input) {
            var match = values.first(function (value) {
                return value && endsWith(input, value);
            });
            if (!match) {
                break;
            }
            input = string_substring(input, 0, input.length - match.length);
        }
        return input;
    }
    MsftSme.trimEnd = trimEnd;
    /**
     * Trims all occurrences of the given set of strings off the start of the input.
     */
    function trimStart(input) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        input = input || "";
        while (input) {
            var match = values.first(function (value) {
                return value && startsWith(input, value);
            });
            if (!match) {
                break;
            }
            input = string_substring(input, match.length);
        }
        return input;
    }
    MsftSme.trimStart = trimStart;
    /**
     * Ensures that the given string ends with the suffix provided.
     * If it already does, it just returns the input string.
     * If it does not, then the suffix is appended and the result is returned.
     */
    function ensureSuffix(input, suffix) {
        input = input || "";
        if (!endsWith(input, suffix)) {
            input += suffix;
        }
        return input;
    }
    MsftSme.ensureSuffix = ensureSuffix;
    /**
     * Ensures that the given string starts with the prefix provided.
     * If it already does, it just returns the input string.
     * If it does not, then the prefix is applied and the result is returned.
     */
    function ensurePrefix(input, prefix) {
        input = input || "";
        if (!startsWith(input, prefix)) {
            input = prefix + input;
        }
        return input;
    }
    MsftSme.ensurePrefix = ensurePrefix;
    function pathJoin(pathSeparator, pathComponents) {
        if (!array_isArray(pathComponents)) {
            pathComponents = array_slice(arguments, 1);
        }
        var output = "";
        array_forEach((pathComponents || []), function (current) {
            if (!output) {
                output = current || "";
            }
            else if (current) {
                output = trimEnd(output, pathSeparator) + ensurePrefix(current, pathSeparator);
            }
        });
        return output;
    }
    MsftSme.pathJoin = pathJoin;
    //#endregion String
    //#region Uri
    /**
     * Parse an uri and return the Authority of the uri.
     *
     * @param uri The string of uri.
     * @return Authority of the uri.
     */
    function getUriAuthority(uri, includePort) {
        if (includePort === void 0) { includePort = true; }
        // If uri starts with "//" or "https://" or "http://", authority will start after that.
        // Otherwise authority starts from very beginning.
        // Authority will end before one of those characters "?/#" or end of string.
        if (!uri) {
            return uri;
        }
        if (startsWith(uri, "//")) {
            uri = string_substring(uri, index + 2);
        }
        else {
            var index = string_indexOf(uri, "://");
            if (index > -1) {
                uri = string_substring(uri, index + 3);
            }
        }
        var endChars = includePort ? /[?#/]/ : /[?#/:]/;
        var endIndex = uri.search(endChars);
        endIndex = endIndex > -1 ? endIndex : uri.length;
        return string_substring(uri, 0, endIndex);
    }
    MsftSme.getUriAuthority = getUriAuthority;
    /**
     * Verify if one Url is subdomain of another Url.
     *
     * @param domain The string of domain.
     * @param subdomain The string of subdomain
     * @return True if subdomain is subdomain of domain.
     */
    function isSubdomain(domain, subdomain) {
        if (!domain || !subdomain || domain.length < subdomain.length) {
            return false;
        }
        var lowerCaseDomain = string_toLowerCase(domain);
        var lowerCaseSubdomain = string_toLowerCase(subdomain);
        return (lowerCaseDomain === lowerCaseSubdomain) || endsWith(lowerCaseDomain, "." + lowerCaseSubdomain);
    }
    MsftSme.isSubdomain = isSubdomain;
    /**
     * Returns whether the given URI is an absolute URI.
     *
     * @param uri The URI.
     * @return A boolean value indicating whether the URI is absolute.
     */
    function isUriAbsolute(uri) {
        return string_indexOf(uri, "://") !== -1 || startsWith(uri, "//");
    }
    MsftSme.isUriAbsolute = isUriAbsolute;
    //#endregion Uri
    /**
     * Escapes regular expression special characters -[]/{}()*+?.\^$|
     *
     * @param str The string to escape.
     * @return The escaped string.
     */
    function regexEscape(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    MsftSme.regexEscape = regexEscape;
    /**
     * No-op function.
     */
    MsftSme.noop = function () {
    };
    var primitiveTypes = {};
    array_forEach(["boolean", undefinedType, numberType, stringType, "symbol"], function (item) { primitiveTypes[item] = true; });
    /**
     * Returns whether the given data is primitive data type.
     * ECMAScript 6 standard defines 6 primitive data types: Boolean, Null, Undefined, Number, String, Symbol(new in ECMAScript 6)
     *
     * @param data The input data.
     * @return A boolean value indicating whether the data is primitive data type.
     */
    function isPrimitive(data) {
        return data === null || typeof data in primitiveTypes;
    }
    MsftSme.isPrimitive = isPrimitive;
    /**
     * Applies polyfills as properties to the prototype of the given object.
     * If force is specified the polyfills will overwrite any existing properties.
     */
    function polyfill(type, fills, force) {
        var proto = type.prototype;
        forEachKey(fills, function (funcName, func) {
            if (force || !proto[funcName]) {
                ObjectGlobal.defineProperty(proto, funcName, {
                    value: func,
                    configurable: true,
                    enumerable: false,
                    writable: true
                });
            }
        });
    }
    MsftSme.polyfill = polyfill;
    var mapSupportedMaxInteger = 50;
    var intToStringMap = [];
    var stringToIntMap = {};
    for (var index = 0; index <= mapSupportedMaxInteger; index++) {
        var strVal = index + "";
        intToStringMap[index] = strVal;
        stringToIntMap[strVal] = index;
    }
    function validateRequiredMaxInteger(requiredMaxInteger) {
        if (requiredMaxInteger > mapSupportedMaxInteger) {
            throw new Error("The requiredMaxInteger(" + requiredMaxInteger + ") should be less than " + mapSupportedMaxInteger);
        }
        if (requiredMaxInteger <= 0) {
            throw new Error("The requiredMaxInteger(" + requiredMaxInteger + ") should be greater than zero.");
        }
    }
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
    function getIntToStringMap(requiredMaxInteger) {
        validateRequiredMaxInteger(requiredMaxInteger);
        return intToStringMap;
    }
    MsftSme.getIntToStringMap = getIntToStringMap;
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
    function getStringToIntMap(requiredMaxInteger) {
        validateRequiredMaxInteger(requiredMaxInteger);
        return stringToIntMap;
    }
    MsftSme.getStringToIntMap = getStringToIntMap;
    /**
     * Makes a shallow clone of the source object with the same prototype and rebinds all functions
     * on the clone to use the source object as 'this'.
     *
     * @param object The source object.
     * @return The cloned object.
     */
    function cloneAndRebindFunctions(object) {
        var clone = ObjectGlobal.create(ObjectGlobal.getPrototypeOf(object));
        for (var key in object) {
            var value = object[key];
            if (isTypeOf(value, functionType)) {
                clone[key] = value.bind(object); // This preserves ko_isObservable(value).
            }
            else if (object_hasOwnProperty(object, key)) {
                clone[key] = value;
            }
        }
        return clone;
    }
    MsftSme.cloneAndRebindFunctions = cloneAndRebindFunctions;
    function toLowerCaseOnlyWithValue(value) {
        return value && value.toLowerCase();
    }
    /**
     * Takes a value and lower cases recursively.
     * For a string, returns the lower case string (non-value remains non-value).
     * For an object, recursively converts all string properties to lower case strings, including arrays of values.
     * For an array, returns an array with all string values converted to lower case.
     *
     * @param source The source value to make lower case.
     * @returns The lower case value.
     */
    function lowerCaseAllStrings(source) {
        if (source) {
            var type = typeof source;
            if (type === "string") {
                return toLowerCaseOnlyWithValue(source);
            }
            else if (Array.isArray(source)) {
                return source.map(function (arrayValue) { return lowerCaseAllStrings(arrayValue); });
            }
            else if (type === "object") {
                var sourceAsStringMap_1 = source;
                MsftSme.forEachKey(sourceAsStringMap_1, function (key) {
                    sourceAsStringMap_1[key] = lowerCaseAllStrings(sourceAsStringMap_1[key]);
                });
                return sourceAsStringMap_1;
            }
        }
        return source;
    }
    MsftSme.lowerCaseAllStrings = lowerCaseAllStrings;
    var sideLoadKey = 'MsftSme.SideLoad@';
    /**
     * Read all side-loading settings on current loaded domain.
     */
    function sideLoadRead() {
        // Read sideload data from localstorage
        var global = window;
        var length = global.localStorage.length;
        var keys = [];
        for (var index = 0; index < length; index++) {
            var key_1 = global.localStorage.key(index);
            if (key_1.startsWith(sideLoadKey)) {
                keys.push(key_1);
            }
        }
        var data = {};
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var item = JSON.parse(global.localStorage.getItem(key));
            data[item.origin] = item;
        }
        // Read sideload data from 'sideload' url parameter
        var query = decodeURIComponent(window.location.search.substring(1));
        var sideloadParam = query
            .split('&')
            .map(function (p) {
            var kvp = p.split('=');
            return { key: kvp[0], value: kvp[1] };
        })
            .find(function (p) { return p.key && p.key.toLowerCase() === 'sideload'; });
        // if we found the parameter and it has a value, then process the sideload data
        if (sideloadParam && sideloadParam.value) {
            // sideload parameter should be a comma seperated list
            sideloadParam.value.split(',')
                .forEach(function (s) { data[s] = { origin: s }; });
        }
        return data;
    }
    function sideLoad(originUri) {
        if (arguments.length > 1) {
            throw new Error("Incorrect syntax for side loading. Please use 'MsftSme.sideload(<origin>);' where '<originUri>' is similar to 'http://localhost:4201'. The new syntax will load any module from the manifest at <originUri>/manifest.json at runtime.");
        }
        if (originUri) {
            if (!['http://', 'https://'].some(function (prefix) { return originUri.startsWith(prefix); })) {
                throw new Error("Incorrect syntax for side loading. To ensure cross origin sideloads support, please begin your sideload origin with \"http://\" or \"https://\". Ex. \"MsftSme.sideload('http://" + originUri + "')\"");
            }
            var item = {
                origin: originUri
            };
            global.localStorage.setItem(sideLoadKey + originUri, JSON.stringify(item));
            var data = {};
            data[originUri] = item;
            return data;
        }
        return sideLoadRead();
    }
    MsftSme.sideLoad = sideLoad;
    /**
     * Reset all side-loading settings on current loaded domain.
     */
    function sideLoadReset() {
        var global = window;
        var length = global.localStorage.length;
        var keys = [];
        for (var index = 0; index < length; index++) {
            var key = global.localStorage.key(index);
            if (key.startsWith(sideLoadKey)) {
                keys.push(key);
            }
        }
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            global.localStorage.removeItem(key);
        }
    }
    MsftSme.sideLoadReset = sideLoadReset;
    var consoleDebugKey = 'MsftSme.ConsoleDebug';
    /**
     * Read debug console setting.
     */
    function consoleDebugRead() {
        var data = JSON.parse(global.localStorage.getItem(consoleDebugKey));
        if (data && data.level) {
            return data.level;
        }
        var smeWindow = global;
        if (smeWindow && smeWindow.MsftSme && smeWindow.MsftSme.Init) {
            return smeWindow.MsftSme.Init.logLevel;
        }
        // return null if not set yet. using default see at core-enviromnent.
        return null;
    }
    function consoleDebug(level) {
        if (level) {
            console.log('1:Critical, 2:Error, 3:Warning, 4:Success, 5:Informational, 6:Verbose, 7:Debug');
            global.localStorage.setItem(consoleDebugKey, JSON.stringify({ level: level }));
            global.MsftSme.Init.logLevel = level;
            return level;
        }
        return consoleDebugRead();
    }
    MsftSme.consoleDebug = consoleDebug;
    /**
     * Reset all side-loading settings on current loaded domain.
     */
    function consoleDebugReset() {
        global.localStorage.removeItem(consoleDebugKey);
    }
    MsftSme.consoleDebugReset = consoleDebugReset;
    /**
     * Gets the localized strings initialized by localization manager. The LocalizationManager should have
     * been used to get the localized strings. This can also be achieved by calling SmeEnvironment.initEnvironment().
     * @returns an object containing all the localized strings, or null if noe localized strings have been fetched yet
     */
    function resourcesStrings() {
        if (!global.MsftSme.Resources || !global.MsftSme.Resources.strings) {
            throw new Error('Unable to access localized ResourcesStrings data.');
        }
        return global.MsftSme.Resources.strings;
    }
    MsftSme.resourcesStrings = resourcesStrings;
    /**
     * Gets current session identification.
     * Within the same browser session, the session ID is the same on shell and all modules.
     */
    function sessionId() {
        var global = window;
        return global.MsftSme.Init.sessionId;
    }
    MsftSme.sessionId = sessionId;
    /** array.ts */
    polyfill(Array, {
        concatUnique: function (other, predicate) {
            return union(this, other, predicate);
        },
        first: function (predicate, startIndex) {
            // Intentionally not using _.find here, since here if we don't find the element
            // we return null. In _.find when this happens we return undefined.
            var index = findIndex(this, predicate, startIndex);
            return index < 0 ? null : this[index];
        },
        firstIndex: function (predicate, startIndex) {
            return findIndex(this, predicate, startIndex);
        },
        last: function () {
            if (this.length < 1) {
                throw new Error("Cannot get the last element because the array is empty.");
            }
            return this[this.length - 1];
        },
        mapMany: function (selector) {
            return mapMany(this, selector);
        },
        remove: function (item) {
            return remove(this, function (current) { return current === item; });
        },
        stableSort: function (compare) {
            return stableSort(this, compare);
        },
        // Deprecated. Remove on or after 2016/02/01.
        toNumberMap: function (keySelector) {
            var ret = [];
            this.forEach(function (value) {
                ret[keySelector(value)] = value;
            });
            return ret;
        },
        unique: function (predicate) {
            return unique(this, predicate);
        }
    });
    /** string.ts */
    var namedFormatSpecifierRegex = /\{[a-zA-Z$_\d]*\}/g;
    var numberedFormatSpecifierRegex = /\{(\d+)\}/g;
    function format() {
        var restArgs = arguments, value = this;
        var matched = false, retVal;
        var isFormatObject = restArgs.length === 1 && restArgs[0] && typeof restArgs[0] === "object";
        var isFormatObjectWithTokenFormatter = restArgs.length === 2 && restArgs[0] && typeof restArgs[0] === "object" && (typeof restArgs[1] === "function" || restArgs[1] === null);
        var tokenFormatter = isFormatObjectWithTokenFormatter ? restArgs[1] : null;
        if (isFormatObject || isFormatObjectWithTokenFormatter) {
            var actualArg = restArgs[0];
            retVal = value.replace(namedFormatSpecifierRegex, function (match) {
                var name = match.substring(1, match.length - 1);
                if (actualArg.hasOwnProperty(name)) {
                    matched = true;
                    var tokenValue = actualArg[name];
                    return tokenFormatter ? tokenFormatter(tokenValue) : tokenValue;
                }
                else {
                    return match;
                }
            });
        }
        // we get here in two cases:
        //    1. we don't have a format object
        //    2. we do have a format object but it's properties didn't match any of the named parameters.
        //       this often happens when developers write code like:
        //          try {
        //              ...
        //          } catch(err) {
        //              log("abc: {0}".format(err));
        //          }
        //       in this scenario also we want to match by number.
        //
        if (!matched) {
            retVal = value.replace(numberedFormatSpecifierRegex, function (match, num) {
                if (num < restArgs.length) {
                    var tokenValue = restArgs[num];
                    return tokenFormatter ? tokenFormatter(tokenValue) : tokenValue;
                }
                else {
                    return match;
                }
            });
        }
        return retVal;
    }
    polyfill(String, {
        format: format,
        localeCompareIgnoreCase: function (value, locales, options) {
            return localeCompareIgnoreCase(this, value, locales, options);
        },
        replaceAll: function (searchValue, replaceValue) {
            return replaceAll(this, searchValue, replaceValue);
        },
        replaceMany: function (replacementMap) {
            return replaceMany(this, replacementMap);
        },
        repeat: function (count) {
            return repeat(this, count);
        },
        startsWith: function (searchString, position) {
            return startsWith(this, searchString, position);
        },
        endsWith: function (searchString, position) {
            return endsWith(this, searchString, position);
        },
    }, /* force */ true);
    global.MsftSme = MsftSme;
})(MsftSme || (MsftSme = {}));
/* tslint:enable */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLHVHQUF1RztBQUN2RyxJQUFVLE9BQU8sQ0F5NERoQjtBQXo0REQsV0FBVSxPQUFPO0lBQ2IsWUFBWSxDQUFDO0lBRWIsSUFBTSxNQUFNLEdBQVEsTUFBTSxDQUFDO0lBQzNCLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQztJQUNoQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDeEIsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDO0lBRTVCLG1EQUFtRDtJQUNuRCwyRUFBMkU7SUFDM0UsRUFBRTtJQUNGLGVBQWU7SUFDZix1SUFBdUk7SUFDdkkscUZBQXFGO0lBQ3JGLEVBQUU7SUFDRix3RUFBd0U7SUFDeEUsdURBQXVEO0lBQ3ZELElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDakMsSUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNuQyxxQkFBNEIsQ0FBMEI7UUFDbEQsTUFBTSxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFKZSxtQkFBVyxjQUkxQixDQUFBO0lBRUQsSUFBTSxVQUFVLEdBQStFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRyxpQkFBUyxHQUFHLFVBQVUsQ0FBQztJQUN2QixvQkFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLHlGQUF5RjtJQUVqSSxtRUFBbUU7SUFDbkUsSUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUN4QyxJQUFNLHNCQUFzQixHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyx5RkFBeUY7SUFDaEosSUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2xELElBQU0sWUFBWSxHQUFzSCxXQUFXLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVLLElBQU0sYUFBYSxHQUFvSCxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVLLElBQU0sVUFBVSxHQUFnRSxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xILElBQU0sVUFBVSxHQUFxRCxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN2RyxJQUFNLFdBQVcsR0FBdUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzSCxJQUFNLFlBQVksR0FBNkYsV0FBVyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuSixJQUFNLGFBQWEsR0FBa0YsV0FBVyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxSSxJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBRXBDLElBQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMxQyxJQUFNLGFBQWEsR0FBbUQsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNHLElBQU0sWUFBWSxHQUFvRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUgsSUFBTSxnQkFBZ0IsR0FBNEQsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFILElBQU0sY0FBYyxHQUF3RSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEksSUFBTSxrQkFBa0IsR0FBK0IsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWpHLElBQU0scUJBQXFCLEdBQTJDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pILElBQU0sb0JBQW9CLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztJQUMvQyxJQUFNLFVBQVUsR0FBUSxTQUFTLENBQUM7SUFFbEMsSUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUUxQyxJQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7SUFDaEMsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDO0lBQzVCLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUM1QixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUM7SUFDNUIsSUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDO0lBRWxDOztPQUVHO0lBQ0gsNkJBQW9DLENBQU07UUFDdEMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxVQUFVO2dCQUNYLElBQU0sR0FBRyxHQUFhLEVBQUUsQ0FBQztnQkFDekIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDZixLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLGFBQWE7Z0JBQ2QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DO2dCQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUM7SUFmZSwyQkFBbUIsc0JBZWxDLENBQUE7SUFFRCxrREFBa0Q7SUFDbEQsc0RBQXNEO0lBQ3RELGlEQUFpRDtJQUNqRCxDQUFDO1FBQ0csSUFBSSxDQUFDO1lBQ0Qsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCwwREFBMEQ7WUFDMUQsNkJBQTZCO1lBQzdCLFlBQVksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFTCxJQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBRXRDLGtCQUFrQixHQUFRLEVBQUUsSUFBWTtRQUNwQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0IsR0FBUTtRQUNwQixNQUFNLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBRTVCLGNBQWM7SUFFZCx3QkFBd0IsS0FBVTtRQUM5QixJQUFJLE9BQU8sR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUM7SUFDdEQsQ0FBQztJQUlELG9CQUE4QixHQUFRLEVBQUUsUUFBc0M7UUFDMUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFDLENBQUM7WUFDOUIsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFKZSxrQkFBVSxhQUl6QixDQUFBO0lBRUQ7OztPQUdHO0lBQ0gsb0JBQTJCLEdBQVc7UUFDbEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFGZSxrQkFBVSxhQUV6QixDQUFBO0lBRUQ7Ozs7O09BS0c7SUFDSCxpQkFBd0IsR0FBVztRQUMvQixNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUZlLGVBQU8sVUFFdEIsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsc0JBQTZCLEtBQVU7UUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUZlLG9CQUFZLGVBRTNCLENBQUE7SUFFRCw0QkFBNEIsS0FBVTtRQUNsQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsSUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaURBQWlEO1FBQzFFLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSx5QkFBaUIsR0FBK0I7UUFDekQsYUFBYSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQztJQUVGOzs7OztPQUtHO0lBQ0gsZ0JBQXVCLEtBQVU7UUFDN0IsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUZlLGNBQU0sU0FFckIsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gscUJBQTRCLEtBQVU7UUFDbEMsTUFBTSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUZlLG1CQUFXLGNBRTFCLENBQUE7SUFFRDs7Ozs7T0FLRztJQUNILDJCQUFrQyxLQUFVO1FBQ3hDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxVQUFVLENBQUM7SUFDbEQsQ0FBQztJQUZlLHlCQUFpQixvQkFFaEMsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsNEJBQW1DLEtBQVU7UUFDekMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFVBQVUsQ0FBQztJQUNsRCxDQUFDO0lBRmUsMEJBQWtCLHFCQUVqQyxDQUFBO0lBRUQ7Ozs7O09BS0c7SUFDSCw0QkFBbUMsS0FBYTtRQUM1QyxzREFBc0Q7UUFDdEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlEQUFpRDtJQUN0SixDQUFDO0lBSGUsMEJBQWtCLHFCQUdqQyxDQUFBO0lBRUQsZUFBZTtJQUVmOzs7Ozs7OztPQVFHO0lBQ0gsbUJBQTZCLEtBQVUsRUFBRSxTQUE0RCxFQUFFLFVBQXNCO1FBQXRCLDJCQUFBLEVBQUEsY0FBc0I7UUFDekgsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBQ2xCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUV2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixLQUFLLElBQUksTUFBTSxDQUFDO29CQUNoQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDYixNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFDRCxPQUFPLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDcEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUNqQixDQUFDO29CQUNELEtBQUssSUFBSSxJQUFJLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7SUF6QmUsaUJBQVMsWUF5QnhCLENBQUE7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILGNBQXdCLEtBQVUsRUFBRSxTQUE0RCxFQUFFLFVBQW1CO1FBQ2pILElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUhlLFlBQUksT0FHbkIsQ0FBQTtJQUVEOzs7O09BSUc7SUFDSCxlQUF5QixLQUFVO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN6QyxDQUFDO0lBRmUsYUFBSyxRQUVwQixDQUFBO0lBRUQ7Ozs7T0FJRztJQUNILGNBQXdCLEtBQVU7UUFDOUIsSUFBTSxNQUFNLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDbkQsQ0FBQztJQUhlLFlBQUksT0FHbkIsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsZ0JBQTBCLEtBQVUsRUFBRSxlQUE0QyxFQUFFLFVBQXNCO1FBQXRCLDJCQUFBLEVBQUEsY0FBc0I7UUFDdEcsSUFBTSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksWUFBWSxHQUFXLENBQUMsQ0FBQztRQUM3QixJQUFJLFNBQWdDLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsU0FBUyxHQUFRLGVBQWUsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDZixLQUFLLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLDhCQUE4QjtZQUNsRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsZUFBZSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELFlBQVksRUFBRSxDQUFDO2dCQUNmLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNMLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2YsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztRQUNsRixDQUFDO1FBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBeEJlLGNBQU0sU0F3QnJCLENBQUE7SUFFRCxrRUFBa0U7SUFDbEUseUdBQXlHO0lBQ3pHLG9CQUE4QixZQUFpQixFQUFFLE1BQVcsRUFBRSxTQUE2QyxFQUFFLFlBQW9CO1FBQXBCLDZCQUFBLEVBQUEsb0JBQW9CO1FBQzdILEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxRQUFRLEdBQUcsU0FBUztnQkFDcEIsVUFBQyxLQUFRLElBQUssT0FBQSxTQUFTLENBQUMsWUFBWSxFQUFFLFVBQUMsV0FBVyxJQUFLLE9BQUEsU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxFQUF2RSxDQUF1RTtnQkFDckYsVUFBQyxLQUFRLElBQUssT0FBQSxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDO1lBQzlDLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLHNGQUFzRjtZQUM3SSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUM1QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixVQUFVLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO1lBQ0wsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2Ysb0JBQW9CLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMzRCxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQWxCZSxrQkFBVSxhQWtCekIsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsZ0JBQTBCLEtBQVUsRUFBRSxTQUE2QztRQUMvRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUZlLGNBQU0sU0FFckIsQ0FBQTtJQWtCRDtRQUNJLElBQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTlDLG1GQUFtRjtRQUNuRixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFDdkIsY0FBYyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHFCQUFxQjtZQUNuRSxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQWpCZSxhQUFLLFFBaUJwQixDQUFBO0lBRUQ7Ozs7O09BS0c7SUFDUSxhQUFLLEdBQXFDO1FBQ2pELDJFQUEyRTtRQUMzRSx3RUFBd0U7UUFDeEUsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUM7SUFFRjs7Ozs7T0FLRztJQUNILGlCQUFvQyxLQUFVLEVBQUUsUUFBa0M7UUFDOUUsTUFBTSxDQUFDLFFBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFGZSxlQUFPLFVBRXRCLENBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsb0JBQThCLEtBQVUsRUFBRSxPQUErQjtRQUNyRSxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBTyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBTmUsa0JBQVUsYUFNekIsQ0FBQTtJQUVELGtCQUFxQixJQUFPO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBZUQsNEJBQXlDLFdBQWdCLEVBQUUsV0FBZ0IsRUFBRSxjQUE2RCxFQUFFLGdCQUErRCxFQUFFLGNBQXdCO1FBQ2pPLGNBQWMsR0FBRyxjQUFjLElBQUksUUFBUSxDQUFDO1FBQzVDLHdIQUF3SDtRQUN4SCxJQUFJLElBQUksR0FBVSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQVQsQUFBUyxFQUFFLFNBQVMsQ0FBVixBQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQ3JCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsMEdBQTBHO2dCQUN6SCxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekUsNkRBQTZEO2dCQUM3RCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDN0IsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQW5CZSwwQkFBa0IscUJBbUJqQyxDQUFBO0lBY0QsZ0NBQTZDLFdBQWdCLEVBQUUsV0FBeUIsRUFBRSxnQkFBK0MsRUFBRSxjQUF3QjtRQUMvSix3SEFBd0g7UUFDeEgsSUFBSSxJQUFJLEdBQVUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFULEFBQVMsRUFBVSxDQUFDO1FBRW5ELFVBQVUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSTtZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsMEdBQTBHO2dCQUN6SCxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRiw2REFBNkQ7Z0JBQzdELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN2QixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWZlLDhCQUFzQix5QkFlckMsQ0FBQTtJQVdELDBCQUFpQyxJQUFTO1FBRXRDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIscUhBQXFIO1lBQ3JILElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTSxDQUFDO1lBQ0gseUVBQXlFO1lBQ3pFLDZHQUE2RztZQUM3Ryw0SEFBNEg7WUFDNUgsMENBQTBDO1lBQzFDLElBQUksR0FBRyxHQUFtQixFQUFFLENBQUM7WUFDN0IsYUFBYSxDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQUssRUFBRSxLQUFLO2dCQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQXZCZSx3QkFBZ0IsbUJBdUIvQixDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsNEJBQW1DLElBQWM7UUFDN0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUZlLDBCQUFrQixxQkFFakMsQ0FBQTtJQUVEOzs7Ozs7O09BT0c7SUFDVSxvQkFBWSxHQUFzRCxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakg7Ozs7OztPQU1HO0lBQ0gsc0JBQTZCLGFBQWtCLEVBQUUsSUFBYztRQUMzRCxJQUFJLE1BQU0sR0FBc0MsRUFBRSxDQUFDO1FBRW5ELFVBQVUsQ0FBb0IsYUFBYSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDbEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFBLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDL0UsQ0FBQztJQVZlLG9CQUFZLGVBVTNCLENBQUE7SUFFRDs7T0FFRztJQUNILG1CQUE2QixLQUFjO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSyxHQUFHLENBQUksS0FBSyxDQUFDLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQU0sS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFWZSxpQkFBUyxZQVV4QixDQUFBO0lBRUQsa0JBQWtCO0lBRWxCLGNBQWM7SUFFZDs7Ozs7O09BTUc7SUFDSCx1QkFBOEIsSUFBUyxFQUFFLEtBQVU7UUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFGZSxxQkFBYSxnQkFFNUIsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQTBCLElBQVU7UUFDaEMsMkZBQTJGO1FBQzNGLDhEQUE4RDtRQUU5RCx3Q0FBd0M7UUFDeEMsaUJBQWlCO1FBQ2pCLDJEQUEyRDtRQUMzRCxzQ0FBc0M7UUFDdEMsZUFBZTtRQUNmLDhCQUE4QjtRQUM5QixZQUFZO1FBQ1osTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBWmUsaUJBQVMsWUFZeEIsQ0FBQTtJQUVELGlCQUFpQjtJQUVqQixjQUFjO0lBRWQsSUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFL0QsSUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO0lBQ25DLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQUs7UUFDbkMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBSztZQUNuQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDN0IsSUFBTSxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN4RCxJQUFNLGVBQWUsR0FBYSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRS9ELG9CQUFvQixLQUFhLEVBQUUsR0FBVyxFQUFFLEVBQVU7UUFDdEQsSUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsb0ZBQW9GO0lBQ3BGLElBQU0sWUFBWSxHQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQVUsTUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTdFLHVFQUF1RTtJQUN2RSxpRkFBaUY7SUFDakYsaUZBQWlGO0lBQ2pGO1FBQ0ksWUFBWSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1QyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLHdDQUF3QztRQUNuRSxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLDREQUE0RDtRQUV4RixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUUxRixNQUFNLENBQUMsUUFBQSxZQUFZLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw0QkFBNEIsR0FBVztRQUNuQyxJQUFJLEdBQVcsQ0FBQztRQUNoQixJQUFJLEdBQUcsR0FBYSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyw4RUFBOEU7UUFDOUUsOEJBQThCO1FBQzlCLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDVCxHQUFHLEdBQUcsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBRSx1Q0FBdUM7WUFDcEYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsa0RBQWtEO1lBQ2pFLE9BQU8sS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDYixHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQ2pFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyx3Q0FBd0M7Z0JBQ3hELENBQUM7Z0JBQ0QsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLG9FQUFvRTtZQUNwRixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDtRQUNJLHVFQUF1RTtRQUN2RSxJQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsb0JBQW9CO1FBQ3BFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyx5QkFBeUI7UUFDekMsb0hBQW9IO1FBQ3BILHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyw0R0FBNEc7UUFFM0wsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsZUFBTyxHQUFpQixZQUFZLEdBQUcsYUFBYSxHQUFHLGVBQWUsQ0FBQztJQUVwRixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFekIscUJBQXFCLE9BQWU7UUFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsOEJBQXFDLE1BQWU7UUFDaEQsTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEMscUVBQXFFO1FBQ3JFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUV6QixNQUFNLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxHQUFHLE1BQU0sR0FBRyxRQUFBLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFqQmUsNEJBQW9CLHVCQWlCbkMsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsd0JBQStCLE1BQWM7UUFDekMsdUJBQXVCO1FBQ3ZCLDhDQUE4QztRQUM5QywwQ0FBMEM7UUFDMUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVwQixNQUFNLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxFQUFFLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixZQUFZLEVBQUUsQ0FBQztnQkFDZixVQUFVLEdBQUcsTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFELENBQUM7WUFFRCxNQUFNLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUM7SUFDTixDQUFDO0lBakJlLHNCQUFjLGlCQWlCN0IsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsbUJBQVcsR0FBRyxvQkFBb0IsRUFBRSxDQUFDO0lBRWxEOzs7Ozs7T0FNRztJQUNILGVBQXNCLE1BQWMsRUFBRSxTQUFrQjtRQUNwRCxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDcEUsQ0FBQztJQUhlLGFBQUssUUFHcEIsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsa0JBQXlCLEtBQWE7UUFDbEMsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFIZSxnQkFBUSxXQUd2QixDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsYUFBb0IsQ0FBVSxFQUFFLENBQVU7UUFDdEMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUZlLFdBQUcsTUFFbEIsQ0FBQTtJQUVELGdCQUFnQjtJQUVoQixnQkFBZ0I7SUFFaEI7Ozs7OztPQU1HO0lBQ0gsZ0JBQXVCLEdBQVcsRUFBRSxHQUFXO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxVQUFVLElBQUksR0FBRyxLQUFLLFVBQVUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN6RSxDQUFDO0lBTmUsY0FBTSxTQU1yQixDQUFBO0lBRUQsbUJBQW1CO0lBRW5CLGdCQUFnQjtJQUNoQjs7OztPQUlHO0lBQ1Usc0JBQWMsR0FBRyxxQkFBcUIsQ0FBQztJQUVwRDs7Ozs7Ozs7T0FRRztJQUNILGtCQUE0QixJQUFPLEVBQUUsS0FBUTtRQUN6QyxNQUFNLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFGZSxnQkFBUSxXQUV2QixDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gscUJBQStCLE1BQVcsRUFBRSxNQUFXO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQWhCZSxtQkFBVyxjQWdCMUIsQ0FBQTtJQUVELG1CQUEwQixDQUFNO1FBQzVCLElBQUksT0FBTyxHQUFXLE9BQU8sQ0FBQyxDQUFDO1FBRS9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQWRlLGlCQUFTLFlBY3hCLENBQUE7SUFFRDs7Ozs7OztNQU9FO0lBQ0YsdUJBQXVCLENBQU0sRUFBRSxDQUFNLEVBQUUsT0FBeUI7UUFDNUQsSUFBSSxDQUFTLENBQUM7UUFDZCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLE9BQU87Z0JBQ1IsSUFBSSxNQUFNLEdBQWUsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTTtvQkFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsRUFBRSxLQUFLLElBQUssT0FBQSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1lBQ3hFLEtBQUssTUFBTTtnQkFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QyxLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztZQUMzRTtnQkFDSSx1Q0FBdUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUF5QixLQUFVO1FBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFGZSxnQkFBUSxXQUV2QixDQUFBO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILGFBQTBCLEdBQWlCLEVBQUUsUUFBaUQsRUFBRSxHQUFTO1FBQ3JHLElBQUksWUFBWSxHQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBVCxBQUFTLEVBQUUsT0FBTyxDQUFSLEFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7WUFDbkIsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVE7WUFDcEMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU87WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsK0RBQStEO1FBQy9ELE1BQU0sQ0FBQyxRQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFWZSxXQUFHLE1BVWxCLENBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCwrQkFBc0MsRUFBVSxFQUFFLElBQVksRUFBRSxNQUFpQjtRQUM3RSx5Q0FBeUM7UUFDekMsTUFBTSxHQUFHLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksS0FBSyxHQUFTLElBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDakIsRUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMzQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFYZSw2QkFBcUIsd0JBV3BDLENBQUE7SUFFRDs7Ozs7T0FLRztJQUNILDRCQUE0QixJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVE7UUFDM0MsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLHFDQUFxQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBQSxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxxR0FBcUc7WUFDckcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixpREFBaUQ7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw0QkFBNEIsSUFBUyxFQUFFLEdBQVE7UUFDM0MsMkZBQTJGO1FBQzNGLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsNkVBQTZFO1FBQzdFLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsUUFBQSxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1QyxDQUFDO1FBQ0wsQ0FBQztRQUVELGdDQUFnQztRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0JBQTJCLElBQVM7UUFBRSxpQkFBaUI7YUFBakIsVUFBaUIsRUFBakIscUJBQWlCLEVBQWpCLElBQWlCO1lBQWpCLGdDQUFpQjs7UUFDbkQsa0RBQWtEO1FBQ2xELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2YsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILHlCQUF5QjtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFQZSxrQkFBVSxhQU96QixDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsMEJBQTZCLE1BQVcsRUFBRSxJQUFxQixFQUFFLFNBQWtCO1FBQy9FLGlEQUFpRDtRQUNqRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsZ0NBQWdDO1FBQ2hDLElBQUksT0FBTyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFeEIsa0VBQWtFO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsaUVBQWlFO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCx3SEFBd0g7UUFDeEgsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFRCx3Q0FBd0M7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxrQkFBNEIsTUFBVyxFQUFFLElBQVk7UUFDakQsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBSSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFIZSxnQkFBUSxXQUd2QixDQUFBO0lBRUQsbUJBQW1CO0lBRW5CLGdCQUFnQjtJQUVoQjs7Ozs7Ozs7O09BU0c7SUFDSCxrQkFBeUIsS0FBYSxFQUFFLFlBQW9CLEVBQUUsUUFBaUI7UUFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxVQUFVLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDL0MsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN0QixDQUFDO1FBQ0QsUUFBUSxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsSUFBSSxTQUFTLEtBQUssUUFBUSxDQUFDO0lBQ3RELENBQUM7SUFiZSxnQkFBUSxXQWF2QixDQUFBO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxpQ0FBd0MsS0FBYSxFQUFFLEtBQWEsRUFBRSxPQUFrQixFQUFFLE9BQXlCO1FBQy9HLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFWZSwrQkFBdUIsMEJBVXRDLENBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxnQkFBdUIsS0FBYSxFQUFFLEtBQWE7UUFDL0MsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsT0FBTyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxJQUFJLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFQZSxjQUFNLFNBT3JCLENBQUE7SUFFRDs7OztPQUlHO0lBQ0gsaUJBQXdCLEtBQWE7UUFDakMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMxQixPQUFPLE1BQU0sRUFBRSxDQUFDO1lBQ1osR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQVBlLGVBQU8sVUFPdEIsQ0FBQTtJQUdEOzs7Ozs7Ozs7T0FTRztJQUNILHFCQUE0QixHQUFXO1FBQ25DLE1BQU0sQ0FBQztZQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFKZSxtQkFBVyxjQUkxQixDQUFBO0lBQUEsQ0FBQztJQUVGOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILHNCQUE2QixNQUFjLEVBQUUsTUFBZTtRQUN4RCxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN0QixNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUUxQixNQUFNLENBQUMsVUFBVSxLQUFhO1lBQzFCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNuQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBUGUsb0JBQVksZUFPM0IsQ0FBQTtJQUFBLENBQUM7SUFFRjs7Ozs7OztPQU9HO0lBQ0gsb0JBQTJCLEtBQWEsRUFBRSxXQUFtQixFQUFFLFlBQW9CO1FBQy9FLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRmUsa0JBQVUsYUFFekIsQ0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNILHFCQUE0QixLQUFhLEVBQUUsY0FBaUM7UUFDeEUsSUFBSSxVQUFVLEdBQXNCLEVBQUUsRUFDbEMsa0JBQWtCLEdBQVksS0FBSyxDQUFDO1FBRXhDLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkUsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBakJlLG1CQUFXLGNBaUIxQixDQUFBO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxlQUFzQixLQUFhLEVBQUUsU0FBaUIsRUFBRSxLQUFhO1FBQ2pFLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDakMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBRWhCLDJCQUEyQjtZQUMzQixtREFBbUQ7WUFDbkQsMENBQTBDO1lBQzFDLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUs7b0JBQ3RCLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2pFLENBQUM7b0JBQ0csVUFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDeEQsS0FBSyxDQUFDO2dCQUNWLENBQUM7Z0JBRUQsVUFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLFVBQVUsR0FBRyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3JDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBMUJlLGFBQUssUUEwQnBCLENBQUE7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILG9CQUEyQixLQUFhLEVBQUUsWUFBb0IsRUFBRSxRQUFpQjtRQUM3RSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxRQUFRLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLEtBQUssUUFBUSxDQUFDO0lBQ2xFLENBQUM7SUFKZSxrQkFBVSxhQUl6QixDQUFBO0lBRUQ7O09BRUc7SUFDSCxpQkFBd0IsS0FBYTtRQUFFLGdCQUFtQjthQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7WUFBbkIsK0JBQW1COztRQUN0RCxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwQixPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ1gsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7Z0JBQzNCLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVCxLQUFLLENBQUM7WUFDVixDQUFDO1lBRUQsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQWZlLGVBQU8sVUFldEIsQ0FBQTtJQUVEOztPQUVHO0lBQ0gsbUJBQTBCLEtBQWE7UUFBRSxnQkFBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLCtCQUFtQjs7UUFDeEQsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDcEIsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNYLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLO2dCQUMzQixNQUFNLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsS0FBSyxDQUFDO1lBQ1YsQ0FBQztZQUVELEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFmZSxpQkFBUyxZQWV4QixDQUFBO0lBRUQ7Ozs7T0FJRztJQUNILHNCQUE2QixLQUFhLEVBQUUsTUFBYztRQUN0RCxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssSUFBSSxNQUFNLENBQUM7UUFDcEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQVBlLG9CQUFZLGVBTzNCLENBQUE7SUFFRDs7OztPQUlHO0lBQ0gsc0JBQTZCLEtBQWEsRUFBRSxNQUFjO1FBQ3RELEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsS0FBSyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQVBlLG9CQUFZLGVBTzNCLENBQUE7SUFVRCxrQkFBeUIsYUFBcUIsRUFBRSxjQUFtQjtRQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixhQUFhLENBQVcsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBQyxPQUFPO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDbkYsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBZmUsZ0JBQVEsV0FldkIsQ0FBQTtJQUVELG1CQUFtQjtJQUVuQixhQUFhO0lBRWI7Ozs7O09BS0c7SUFDSCx5QkFBZ0MsR0FBVyxFQUFFLFdBQTJCO1FBQTNCLDRCQUFBLEVBQUEsa0JBQTJCO1FBQ3BFLHVGQUF1RjtRQUN2RixrREFBa0Q7UUFDbEQsNEVBQTRFO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxRQUFRLEdBQUcsV0FBVyxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDaEQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBRWpELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUF0QmUsdUJBQWUsa0JBc0I5QixDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gscUJBQTRCLE1BQWMsRUFBRSxTQUFpQjtRQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELElBQUksZUFBZSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkQsTUFBTSxDQUFDLENBQUMsZUFBZSxLQUFLLGtCQUFrQixDQUFDLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBVGUsbUJBQVcsY0FTMUIsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsdUJBQThCLEdBQVc7UUFDckMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRmUscUJBQWEsZ0JBRTVCLENBQUE7SUFFRCxnQkFBZ0I7SUFFaEI7Ozs7O09BS0c7SUFDSCxxQkFBNEIsR0FBVztRQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRmUsbUJBQVcsY0FFMUIsQ0FBQTtJQUVEOztPQUVHO0lBQ1UsWUFBSSxHQUFHO0lBQ3BCLENBQUMsQ0FBQztJQUVGLElBQU0sY0FBYyxHQUF1QixFQUFFLENBQUM7SUFFOUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLFVBQUMsSUFBSSxJQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4SDs7Ozs7O09BTUc7SUFDSCxxQkFBNEIsSUFBUztRQUNqQyxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxjQUFjLENBQUM7SUFDMUQsQ0FBQztJQUZlLG1CQUFXLGNBRTFCLENBQUE7SUFFRDs7O09BR0c7SUFDSCxrQkFBeUIsSUFBMkIsRUFBRSxLQUFhLEVBQUUsS0FBZTtRQUNoRixJQUFNLEtBQUssR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xDLFVBQVUsQ0FBc0IsS0FBSyxFQUFFLFVBQUMsUUFBUSxFQUFFLElBQUk7WUFDbEQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUN6QyxLQUFLLEVBQUUsSUFBSTtvQkFDWCxZQUFZLEVBQUUsSUFBSTtvQkFDbEIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLFFBQVEsRUFBRSxJQUFJO2lCQUNqQixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBWmUsZ0JBQVEsV0FZdkIsQ0FBQTtJQUVELElBQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLElBQU0sY0FBYyxHQUFhLEVBQUUsQ0FBQztJQUNwQyxJQUFNLGNBQWMsR0FBc0IsRUFBRSxDQUFDO0lBRTdDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksc0JBQXNCLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUMzRCxJQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDL0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsb0NBQW9DLGtCQUEwQjtRQUMxRCxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxrQkFBa0IsR0FBRyx3QkFBd0IsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3hILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLEdBQUcsa0JBQWtCLEdBQUcsZ0NBQWdDLENBQUMsQ0FBQztRQUN2RyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCwyQkFBa0Msa0JBQTBCO1FBQ3hELDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBSGUseUJBQWlCLG9CQUdoQyxDQUFBO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCwyQkFBa0Msa0JBQTBCO1FBQ3hELDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBSGUseUJBQWlCLG9CQUdoQyxDQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsaUNBQTJDLE1BQVM7UUFDaEQsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkUsR0FBRyxDQUFDLENBQUMsSUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFNLEtBQUssR0FBUyxNQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMseUNBQXlDO1lBQzlFLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQVhlLCtCQUF1QiwwQkFXdEMsQ0FBQTtJQUVELGtDQUFrQyxLQUFhO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILDZCQUFvQyxNQUFXO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFNLElBQUksR0FBRyxPQUFPLE1BQU0sQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBZSxJQUFLLE9BQUEsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztZQUM1RSxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFNLG1CQUFpQixHQUFRLE1BQU0sQ0FBQztnQkFDdEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBaUIsRUFBRSxVQUFVLEdBQUc7b0JBQy9DLG1CQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLG1CQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxtQkFBaUIsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQWhCZSwyQkFBbUIsc0JBZ0JsQyxDQUFBO0lBa0JELElBQU0sV0FBVyxHQUFHLG1CQUFtQixDQUFDO0lBRXhDOztPQUVHO0lBQ0g7UUFDSSx1Q0FBdUM7UUFDdkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQzFDLElBQUksS0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxJQUFJLEdBQWlDLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsQ0FBWSxVQUFJLEVBQUosYUFBSSxFQUFKLGtCQUFJLEVBQUosSUFBSTtZQUFmLElBQUksR0FBRyxhQUFBO1lBQ1IsSUFBSSxJQUFJLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzVCO1FBRUQsbURBQW1EO1FBQ25ELElBQUksS0FBSyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksYUFBYSxHQUFHLEtBQUs7YUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDRixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLEVBQTNDLENBQTJDLENBQUMsQ0FBQztRQUU1RCwrRUFBK0U7UUFDL0UsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLHNEQUFzRDtZQUN0RCxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBRXpCLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBVUQsa0JBQXlCLFNBQWtCO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHVPQUF1TyxDQUFDLENBQUM7UUFDN1AsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMscUxBQThLLFNBQVMsU0FBSyxDQUFDLENBQUM7WUFDbE4sQ0FBQztZQUVELElBQUksSUFBSSxHQUFhO2dCQUNqQixNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDO1lBQ0YsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxJQUFJLEdBQWlDLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBcEJlLGdCQUFRLFdBb0J2QixDQUFBO0lBRUQ7O09BRUc7SUFDSDtRQUNJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDO1FBQ0wsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFZLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJO1lBQWYsSUFBSSxHQUFHLGFBQUE7WUFDUixNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFkZSxxQkFBYSxnQkFjNUIsQ0FBQTtJQUVELElBQU0sZUFBZSxHQUFHLHNCQUFzQixDQUFDO0lBRS9DOztPQUVHO0lBQ0g7UUFDSSxJQUFJLElBQUksR0FBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQWUsTUFBTyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNDLENBQUM7UUFFRCxxRUFBcUU7UUFDckUsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBV0Qsc0JBQTZCLEtBQWM7UUFDdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztZQUM5RixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkUsTUFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBVGUsb0JBQVksZUFTM0IsQ0FBQTtJQUVEOztPQUVHO0lBQ0g7UUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRmUseUJBQWlCLG9CQUVoQyxDQUFBO0lBRUQ7Ozs7T0FJRztJQUNIO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFBO1FBQ3hFLENBQUM7UUFFRCxNQUFNLENBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQy9DLENBQUM7SUFOZSx3QkFBZ0IsbUJBTS9CLENBQUE7SUFFRDs7O09BR0c7SUFDSDtRQUNJLElBQUksTUFBTSxHQUEyQixNQUFNLENBQUM7UUFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN6QyxDQUFDO0lBSGUsaUJBQVMsWUFHeEIsQ0FBQTtJQUVELGVBQWU7SUFDZixRQUFRLENBQUMsS0FBSyxFQUF1QjtRQUNqQyxZQUFZLEVBQUUsVUFBVSxLQUFLLEVBQUUsU0FBUztZQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELEtBQUssRUFBRSxVQUFVLFNBQVMsRUFBRSxVQUFVO1lBQ2xDLCtFQUErRTtZQUMvRSxtRUFBbUU7WUFDbkUsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsVUFBVSxFQUFFLFVBQVUsU0FBUyxFQUFFLFVBQVU7WUFDdkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztZQUMvRSxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBVSxRQUErQjtZQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsTUFBTSxFQUFFLFVBQVUsSUFBSTtZQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsVUFBVSxFQUFFLFVBQVUsT0FBTztZQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsNkNBQTZDO1FBQzdDLFdBQVcsRUFBRSxVQUFVLFdBQW1DO1lBQ3RELElBQUksR0FBRyxHQUFtQixFQUFFLENBQUM7WUFDckIsSUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7Z0JBQ3hCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sRUFBRSxVQUFVLFNBQVM7WUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVILGdCQUFnQjtJQUNoQixJQUFNLHlCQUF5QixHQUFHLG9CQUFvQixDQUFDO0lBQ3ZELElBQU0sNEJBQTRCLEdBQUcsWUFBWSxDQUFDO0lBRWxEO1FBQ0ksSUFBSSxRQUFRLEdBQUcsU0FBUyxFQUNwQixLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksT0FBTyxHQUFHLEtBQUssRUFDZixNQUFjLENBQUM7UUFFbkIsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztRQUM3RixJQUFJLGdDQUFnQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQzlLLElBQUksY0FBYyxHQUFHLGdDQUFnQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFM0UsRUFBRSxDQUFDLENBQUMsY0FBYyxJQUFJLGdDQUFnQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsVUFBQyxLQUFhO2dCQUM1RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDZixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDcEUsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsNEJBQTRCO1FBQzVCLHNDQUFzQztRQUN0QyxpR0FBaUc7UUFDakcsNERBQTREO1FBQzVELGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsMEJBQTBCO1FBQzFCLDRDQUE0QztRQUM1QyxhQUFhO1FBQ2IsMERBQTBEO1FBQzFELEVBQUU7UUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxVQUFDLEtBQWEsRUFBRSxHQUFXO2dCQUM1RSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO2dCQUNwRSxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBTSxFQUFtQjtRQUM5QixNQUFNLEVBQUUsTUFBTTtRQUNkLHVCQUF1QixFQUFFLFVBQVUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPO1lBQ3RELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQ0QsVUFBVSxFQUFFLFVBQVUsV0FBVyxFQUFFLFlBQVk7WUFDM0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDRCxXQUFXLEVBQUUsVUFBVSxjQUFjO1lBQ2pDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDRCxNQUFNLEVBQUUsVUFBVSxLQUFLO1lBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxVQUFVLEVBQUUsVUFBVSxZQUFZLEVBQUUsUUFBUTtZQUN4QyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELFFBQVEsRUFBRSxVQUFVLFlBQVksRUFBRSxRQUFRO1lBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxDQUFDO0tBQ0osRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDN0IsQ0FBQyxFQXo0RFMsT0FBTyxLQUFQLE9BQU8sUUF5NERoQjtBQUNELG1CQUFtQiIsImZpbGUiOiJ1dGlsaXRpZXMuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9