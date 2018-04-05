export declare class AssetManager {
    static version: number;
    private static storageKey;
    private static defaultTheme;
    private static assets;
    static theme: string;
    static getAssetLocationPath(relativePath: string): string;
    static initialize(production: boolean): void;
}
