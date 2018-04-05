"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newline = '\n';
exports.spacer = '\t';
function regexEscape(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
exports.regexEscape = regexEscape;
function regexReplaceAll(input, searchValue, replaceValue) {
    return input.replace(new RegExp(regexEscape(searchValue), 'g'), replaceValue);
}
exports.regexReplaceAll = regexReplaceAll;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGFzc2lmeS9jbGFzc2lmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNhLFFBQUEsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNmLFFBQUEsTUFBTSxHQUFHLElBQUksQ0FBQztBQW9DM0IscUJBQTRCLEdBQVc7SUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUZELGtDQUVDO0FBRUQseUJBQWdDLEtBQWEsRUFBRSxXQUFtQixFQUFFLFlBQW9CO0lBQ3BGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNsRixDQUFDO0FBRkQsMENBRUMiLCJmaWxlIjoiY2xhc3NpZnkvY2xhc3NpZnkuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==
