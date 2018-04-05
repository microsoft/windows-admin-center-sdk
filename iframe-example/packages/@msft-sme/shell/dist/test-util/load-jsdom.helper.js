// Loads JSDOM and configures it so UTs can access all the features as winthin a browser
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
Object.keys(document.defaultView).forEach(function (property) {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});
var MockStorage = /** @class */ (function () {
    function MockStorage() {
        this.items = {};
    }
    MockStorage.prototype.clear = function () {
        this.items = {};
    };
    MockStorage.prototype.getItem = function (key) {
        return this.items[key];
    };
    MockStorage.prototype.key = function (index) {
        return this[index];
    };
    MockStorage.prototype.removeItem = function (key) {
        this.items[key] = undefined;
    };
    MockStorage.prototype.setItem = function (key, data) {
        this.items[key] = data;
    };
    return MockStorage;
}());
global.localStorage = new MockStorage();
global.sessionStorage = new MockStorage();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QtdXRpbC9sb2FkLWpzZG9tLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3RkFBd0Y7QUFDeEYsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZCLE1BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNoRCxNQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDdEMsTUFBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFFBQVE7SUFDaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSDtJQUFBO1FBR1ksVUFBSyxHQUFHLEVBQUUsQ0FBQztJQXVCdkIsQ0FBQztJQW5CVSwyQkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLDZCQUFPLEdBQWQsVUFBZSxHQUFXO1FBQ3RCLE1BQU0sQ0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSx5QkFBRyxHQUFWLFVBQVcsS0FBYTtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxnQ0FBVSxHQUFqQixVQUFrQixHQUFXO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFTSw2QkFBTyxHQUFkLFVBQWUsR0FBVyxFQUFFLElBQVk7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0ExQkEsQUEwQkMsSUFBQTtBQUVLLE1BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUN6QyxNQUFPLENBQUMsY0FBYyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMiLCJmaWxlIjoibG9hZC1qc2RvbS5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9