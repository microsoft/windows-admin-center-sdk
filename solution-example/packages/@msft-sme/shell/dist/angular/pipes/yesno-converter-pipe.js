import { Pipe } from '@angular/core';
var YesNoConverterPipe = (function () {
    function YesNoConverterPipe() {
        this.strings = MsftSme.resourcesStrings();
    }
    YesNoConverterPipe.prototype.transform = function (value) {
        return value ? this.strings.MsftSmeShell.Angular.Common.yes : this.strings.MsftSmeShell.Angular.Common.no;
    };
    return YesNoConverterPipe;
}());
export { YesNoConverterPipe };
YesNoConverterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'smeBooleanToYesNoConverter'
            },] },
];
/** @nocollapse */
YesNoConverterPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMveWVzbm8tY29udmVydGVyLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUEsRUFBb0IsTUFBTyxlQUFBLENBQWdCO0FBSXBEO0lBQUE7UUFFWSxZQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7SUFhMUQsQ0FBQztJQVhVLHNDQUFTLEdBQWhCLFVBQWlCLEtBQWM7UUFDM0IsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUM5RyxDQUFDO0lBU0wseUJBQUM7QUFBRCxDQWZBLEFBZUM7O0FBUk0sNkJBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsNEJBQTRCO2FBQ3JDLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxpQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJ5ZXNuby1jb252ZXJ0ZXItcGlwZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=