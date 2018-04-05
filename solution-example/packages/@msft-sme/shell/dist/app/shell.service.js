import { Injectable } from '@angular/core';
var ShellService = (function () {
    function ShellService() {
        this.internalDayZeroEnabled = false;
    }
    Object.defineProperty(ShellService.prototype, "dayZeroEnabled", {
        get: function () {
            return this.internalDayZeroEnabled;
        },
        set: function (value) {
            this.internalDayZeroEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShellService;
}());
export { ShellService };
ShellService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ShellService.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGVsbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxlQUFBLENBQWdCO0FBRzNDO0lBQUE7UUFDWSwyQkFBc0IsR0FBRyxLQUFLLENBQUM7SUFlM0MsQ0FBQztJQWJHLHNCQUFXLHdDQUFjO2FBQXpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztRQUN2QyxDQUFDO2FBRUQsVUFBMEIsS0FBYztZQUNwQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLENBQUM7OztPQUpBO0lBV0wsbUJBQUM7QUFBRCxDQWhCQSxBQWdCQzs7QUFOTSx1QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Q0FDbkIsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDJCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6InNoZWxsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9