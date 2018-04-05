// Loads JSDOM and configures it so UTs can access all the features as winthin a browser
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
// load jQuery that is needed by signalR
global.window.jQuery = require('jquery/dist/jquery.js');
global.$ = global.window.jQuery;
global.window.Event = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QtdXRpbC9sb2FkLWpzZG9tLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx3RkFBd0Y7QUFDeEYsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZCLE1BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNoRCxNQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDdEMsTUFBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBRTNDLHdDQUF3QztBQUNsQyxNQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUN6RCxNQUFPLENBQUMsQ0FBQyxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ3hDLE1BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO0lBQ2hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUg7SUFBQTtRQUdZLFVBQUssR0FBRyxFQUFFLENBQUM7SUF1QnZCLENBQUM7SUFuQlUsMkJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSw2QkFBTyxHQUFkLFVBQWUsR0FBVztRQUN0QixNQUFNLENBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0seUJBQUcsR0FBVixVQUFXLEtBQWE7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sZ0NBQVUsR0FBakIsVUFBa0IsR0FBVztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sNkJBQU8sR0FBZCxVQUFlLEdBQVcsRUFBRSxJQUFZO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDTCxrQkFBQztBQUFELENBMUJBLEFBMEJDLElBQUE7QUFFSyxNQUFPLENBQUMsWUFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDekMsTUFBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDIiwiZmlsZSI6ImxvYWQtanNkb20uaGVscGVyLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvc291cmNlL21zZnQtc21lLWlmcmFtZS1leHRlbnNpb24vaW5saW5lU3JjLyJ9