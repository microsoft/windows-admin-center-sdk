import { Pipe } from '@angular/core';
var YesNoConverterPipe = /** @class */ (function () {
    function YesNoConverterPipe() {
        this.strings = MsftSme.resourcesStrings();
    }
    YesNoConverterPipe.prototype.transform = function (value) {
        return value ? this.strings.MsftSmeShell.Angular.Common.yes : this.strings.MsftSmeShell.Angular.Common.no;
    };
    YesNoConverterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'smeBooleanToYesNoConverter'
                },] },
    ];
    /** @nocollapse */
    YesNoConverterPipe.ctorParameters = function () { return []; };
    return YesNoConverterPipe;
}());
export { YesNoConverterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMveWVzbm8tY29udmVydGVyLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUEsRUFBb0IsTUFBTyxlQUFBLENBQWdCO0FBSXBEO0lBQUE7UUFFWSxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7SUFhMUQsQ0FBQztJQVhVLHNDQUFTLEdBQWhCLFVBQWlCLEtBQWM7UUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQzlHLENBQUM7SUFDRSw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ2pCLElBQUksRUFBRSw0QkFBNEI7aUJBQ3JDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztJQUNGLHlCQUFDO0NBZkQsQUFlQyxJQUFBO1NBZlksa0JBQWtCIiwiZmlsZSI6Inllc25vLWNvbnZlcnRlci1waXBlLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==