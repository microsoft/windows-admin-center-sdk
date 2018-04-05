/**
 * Recursively merges JSON files with the same name and same subPath from the sourceFolders into the JSON files
 * in the targetFolderPath.
 *
 * @example
 *  src/assets/resources/strings/ <- targetFolderPath
 *                              strings.json
 *                              es/strings.json
 *                              pt/strings.json
 * [
 *     'node_modules/@msft-sme/core/dist/assets/resources/strings',
 *     'node_modules/@msft-sme/ng2/dist/assets/resources/strings'
 * ] <- sourceFoldersPath
 *
 *                               src/assets/resources/strings/strings.json contents are merged with the contents of
 *  node_modules/@msft-sme/core/dist/assets/resources/strings/strings.json and
 *  node_modules/@msft-ng2/core/dist/assets/resources/strings/strings.json
 *  and the source file is overwritten by the merged content
 *
 * @param targetFolderPathRoot {string} The path of the base folder where the destination files are placed.
 * @param sourceFoldersPathRoot {string[]} The array of paths to the source folders from where to read the JSON files to merge
 */
export declare function mergeJsonInFolders(targetFolderPathRoot: string, sourceFoldersPathRoot: string[]): void;
