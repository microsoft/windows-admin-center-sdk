import util = require('../util/util');
export interface PublishOptions {
    version: string;
    tags: string[];
}
export interface NpmPackageDependencyMap {
    [key: string]: string;
}
export interface NpmPackage {
    name?: string;
    version?: string;
    dependencies?: NpmPackageDependencyMap;
    devDependencies?: NpmPackageDependencyMap;
    peerDependencies?: NpmPackageDependencyMap;
    optionalDependencies?: NpmPackageDependencyMap;
    private?: boolean;
}
export declare function readPackage(): NpmPackage;
export declare function writePackage(pkg: any): void;
export declare function update(done?: util.GulpDoneFunction): void;
export declare function getTags(name: string, cb: (err: Error, tags?: {
    [key: string]: string;
}) => void): void;
export declare function getLatestVersion(name: string, cb: (err: Error, version?: string) => void): void;
export declare function addTags(name: string, options: PublishOptions, cb: util.GulpDoneFunction): void;
export declare function publish(confirm: boolean, options: PublishOptions, callback: util.GulpDoneFunction): void;
export declare function validateDependencies(pkg: NpmPackage, prod: boolean, callback: util.GulpDoneFunction): void;
