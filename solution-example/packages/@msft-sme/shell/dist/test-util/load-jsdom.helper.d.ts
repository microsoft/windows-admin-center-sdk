declare let jsdom: any;
declare class MockStorage implements Storage {
    length: number;
    private items;
    [index: number]: string;
    clear(): void;
    getItem(key: string): string;
    key(index: number): string;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
}
