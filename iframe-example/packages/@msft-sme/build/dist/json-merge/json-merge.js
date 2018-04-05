'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util/util");
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
function mergeJsonInFolders(targetFolderPathRoot, sourceFoldersPathRoot) {
    var targetFilesContentMap = {};
    // ensurePathExists expects an actual file path to build the folder path
    util.ensurePathExists(targetFolderPathRoot + '/aFile.json');
    var targetFiles = util.getFilePaths(targetFolderPathRoot);
    targetFiles.forEach(function (targetFile) {
        var relativePath = targetFile.substring(targetFolderPathRoot.length + 1, targetFile.length);
        targetFilesContentMap[relativePath] = util.readJSON(targetFile);
    });
    sourceFoldersPathRoot.forEach(function (sourceFolderPathRoot) {
        var sourceFiles = util.getFilePaths(sourceFolderPathRoot);
        sourceFiles.forEach(function (sourceFile) {
            var relativePath = sourceFile.substring(sourceFolderPathRoot.length + 1, sourceFile.length);
            var sourceJson = util.readJSON(sourceFile);
            mergeJsons(relativePath, sourceJson, targetFilesContentMap);
        });
    });
    // tslint:disable-next-line:forin
    for (var path in targetFilesContentMap) {
        var targetFilePath = targetFolderPathRoot + '/' + path;
        util.ensurePathExists(targetFilePath);
        util.writeJsonNoSpace(targetFilePath, targetFilesContentMap[path]);
    }
}
exports.mergeJsonInFolders = mergeJsonInFolders;
function mergeJsons(relativePath, sourceJson, targetFilesContentMap) {
    if (targetFilesContentMap[relativePath]) {
        util.extend(targetFilesContentMap[relativePath], [sourceJson]);
    }
    else {
        targetFilesContentMap[relativePath] = sourceJson;
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qc29uLW1lcmdlL2pzb24tbWVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLG1DQUFzQztBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsNEJBQW1DLG9CQUE0QixFQUFFLHFCQUErQjtJQUM1RixJQUFJLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztJQUMvQix3RUFBd0U7SUFDeEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBQzVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUMxRCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtRQUMzQixJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVGLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFcEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxvQkFBb0I7UUFDL0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFELFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1lBQzNCLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUzQyxVQUFVLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxpQ0FBaUM7SUFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUkscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksY0FBYyxHQUFHLG9CQUFvQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0FBQ0wsQ0FBQztBQTNCRCxnREEyQkM7QUFFRCxvQkFBb0IsWUFBb0IsRUFBRSxVQUFlLEVBQUUscUJBQXlCO0lBQ2hGLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixxQkFBcUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDckQsQ0FBQztBQUNMLENBQUMiLCJmaWxlIjoianNvbi1tZXJnZS9qc29uLW1lcmdlLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=
