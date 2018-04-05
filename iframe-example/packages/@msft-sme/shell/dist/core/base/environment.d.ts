declare namespace MsftSme {
    interface MsftSmeInit {
        mode: number;
        moduleName?: string;
        shellOrigin?: string;
        isProduction?: boolean;
        sessionId?: string;
        logLevel?: number;
        websocket?: boolean;
    }
    interface MsftSmeEnvironment {
        name: string;
        origin: string;
        signature: string;
        shell: {
            name: string;
            origin: string;
        };
        modules: any[];
        version: string;
    }
    interface MsftSmeAssets {
        css: string[];
        js: string[];
    }
    interface MsftSmeResources {
        localeId: string;
        strings: any;
        theme: string;
        assets: MsftSmeAssets;
        accessibilityMode: boolean;
    }
    interface SMEWindow extends Window {
        MsftSme: {
            Init: MsftSmeInit;
            Environment: MsftSmeEnvironment;
            Resources: MsftSmeResources;
        };
    }
    interface MessageEventListener extends EventListener {
        (evt: MessageEvent): void;
    }
    interface Element {
        focus(): void;
    }
    interface StringMap<T> {
        [key: string]: T;
    }
    interface NumberMap<T> {
        [key: number]: T;
        length?: number;
    }
    interface NameValue<N, T> {
        name: N;
        value: T;
    }
    interface Action {
        (): void;
    }
    interface Action1<T> {
        (arg: T): void;
    }
    interface Action2<T1, T2> {
        (arg1: T1, arg2: T2): void;
    }
    interface Action3<T1, T2, T3> {
        (arg1: T1, arg2: T2, arg3: T3): void;
    }
    interface Func<R> {
        (): R;
    }
    interface Func1<T, R> {
        (arg: T): R;
    }
    type Primitive = number | string | Date | boolean;
    interface StringMapPrimitive extends StringMap<StringMapRecursive | Primitive | Array<Primitive | StringMapRecursive>> {
    }
    type StringMapRecursive = StringMapPrimitive;
    interface Obsolete {
    }
    interface CollatorOptions extends Intl.CollatorOptions {
    }
    interface Map<K, V> {
        delete(key: K): boolean;
        get(key: K): V;
        has(key: K): boolean;
        set(key: K, value: V): void;
        clear(): void;
        forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    }
    interface RandomSource {
        getRandomValues(array: ArrayBufferView): ArrayBufferView;
    }
}
