/* tslint:disable */
// this code has been worked on other platform, and refactoring may cause other problem so keeps as is.
namespace StringUtilities {
    'use strict';
    const FunctionGlobal = Function;
    const MathGlobal = Math;
    const ObjectGlobal = Object;

    export interface StringMap<T> {
        [key: string]: T;
    }

    // See Mark Miller’s explanation of what this does.
    // http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
    //
    // For example:
    // const array_slice: <T>(target: T[]|IArguments, start?: number, end?: number) => T[] = MsPortalFx.uncurryThis(Array.prototype.slice);
    // Then the call can be strong typed, rather than call/apply with only runtime check.
    //
    // This also **might** have the nice side-effect of reducing the size of
    // the minified code by reducing x.call() to merely x()
    const call = FunctionGlobal.call;
    const apply = FunctionGlobal.apply;
    export function uncurryThis(f: (...args: any[]) => any): (...args: any[]) => any {
        return function () {
            return call.apply(f, arguments);
        };
    }

    const _applyCall: (f: (...args: any[]) => any, target: any, args: any[] | IArguments) => any = uncurryThis(apply);
    export const applyCall = _applyCall;
    export const applyUncurry = _applyCall; // most uncurry function can be call by _applyCall  except for array_concat; (see below.)

    // declare variable such that  minimize better and code readibility
    const array_prototype = Array.prototype;
    const array_prototype_concat = array_prototype.concat; // array concat does not work well with uncurryThis since it flatten the arguments array.
    const array_prototype_push = array_prototype.push;
    const array_forEach: <T>(target: T[] | IArguments, callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any) => void = uncurryThis(array_prototype.forEach);
    const array_isArray = Array.isArray;
    const string_prototype = String.prototype;

    /** string.ts */
    const namedFormatSpecifierRegex = /\{[a-zA-Z$_\d]*\}/g;
    const numberedFormatSpecifierRegex = /\{(\d+)\}/g;
    /**
     * Detect a value is null.
     *
     * @param value The value to check against null.
     * @return boolean.
     */
    export function isNull(value: any): boolean {
        return value === null;
    }

    export function forEachKey<T>(obj: any, iterator: (key: any, value: T) => void): void {
        array_forEach(Object.keys(obj), (k) => {
            iterator(k, obj[k]);
        });
    }

    /**
     * Applies polyfills as properties to the prototype of the given object.
     * If force is specified the polyfills will overwrite any existing properties.
     */
    export function polyfill(type: { prototype: Object }, fills: Object, force?: boolean) {
        const proto = <any>type.prototype;
        forEachKey(<StringMap<Function>>fills, (funcName, func) => {
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

    function format(this: String): String {
        var restArgs = arguments,
            value = this;

        var matched = false,
            retVal: string;

        var isFormatObject = restArgs.length === 1 && restArgs[0] && typeof restArgs[0] === "object";
        var isFormatObjectWithTokenFormatter = restArgs.length === 2 && restArgs[0] && typeof restArgs[0] === "object" && (typeof restArgs[1] === "function" || restArgs[1] === null);
        var tokenFormatter = isFormatObjectWithTokenFormatter ? restArgs[1] : null;

        if (isFormatObject || isFormatObjectWithTokenFormatter) {
            var actualArg = restArgs[0];
            retVal = value.replace(namedFormatSpecifierRegex, (match: string) => {
                var name = match.substring(1, match.length - 1);
                if (actualArg.hasOwnProperty(name)) {
                    matched = true;
                    var tokenValue = actualArg[name];
                    return tokenFormatter ? tokenFormatter(tokenValue) : tokenValue;
                } else {
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
            retVal = value.replace(numberedFormatSpecifierRegex, (match: string, num: number) => {
                if (num < restArgs.length) {
                    var tokenValue = restArgs[num];
                    return tokenFormatter ? tokenFormatter(tokenValue) : tokenValue;
                } else {
                    return match;
                }
            });
        }

        return retVal;
    }

    /**
     * Compares two software versions, assuming that a valid version is a 4 part dot seperated number.
     *
     * @param currentVersion The current software version.
     * @param targetVersion The version that is available for download.
     *
     * @returns 0 if versions are the same; 1 if a newer version is available for download; -1 for a current version that is downlevel.
     */
    export function CompareVersions(currentVersion: string, targetVersion: string): number {

        if (isNull(currentVersion) || isNull(targetVersion)) {
            return 0;
        }

        let currentVersionParts = currentVersion.split('.').map(Number);

        // Target version is going to be hyphen separated as opposed to dot; due to limitations from aka.ms site.
        let targetVersionParts = targetVersion.split('-').map(Number);

        // We don't want to be too strict on the format; and allow ourselves room for change in the future without breaking customers experience.
        if (currentVersionParts.length !== 4 || targetVersionParts.length !== 4) {
            return 0;
        }

        // Always assuming a 4 part number.
        for (let i = 0; i <= 3; i++) {
            if (targetVersionParts[i] === currentVersionParts[i]) {
                continue;
            }
            else if (targetVersionParts[i] > currentVersionParts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }

        return 0;
    }

    polyfill(String, <StringPolyfills>{
        format: format
    }, /* force */ true);

}
/* tslint:enable */
