import { Pipe } from '@angular/core';
var HighlightPipe = (function () {
    function HighlightPipe() {
    }
    HighlightPipe.prototype.transform = function (attribute, search, highlightClass) {
        if (search === undefined || search === null || search === '' || attribute == null) {
            return attribute;
        }
        highlightClass = highlightClass || 'highlight';
        // escape regex control chars
        // *.exe searched literally instead of giving error for invalid regular expression
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        // g is global modifier for all matches
        // i is case-insensitive modifier
        var regex = new RegExp(pattern, 'gi');
        var text = attribute.toString();
        return text.replace(regex, function (match) { return "<span class=\"" + highlightClass + "\">" + match + "</span>"; });
    };
    return HighlightPipe;
}());
export { HighlightPipe };
HighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'smeHighlight' },] },
];
/** @nocollapse */
HighlightPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvaGlnaGxpZ2h0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUEsRUFBb0IsTUFBTyxlQUFBLENBQWdCO0FBR3BEO0lBQUE7SUF5QkEsQ0FBQztJQXhCUSxpQ0FBUyxHQUFoQixVQUFpQixTQUFTLEVBQUUsTUFBYyxFQUFFLGNBQXVCO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUVELGNBQWMsR0FBRyxjQUFjLElBQUksV0FBVyxDQUFDO1FBRS9DLDZCQUE2QjtRQUM3QixrRkFBa0Y7UUFDbEYsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1RSx1Q0FBdUM7UUFDdkMsaUNBQWlDO1FBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0QyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsbUJBQWdCLGNBQWMsV0FBSyxLQUFLLFlBQVMsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFPSCxvQkFBQztBQUFELENBekJBLEFBeUJDOztBQU5NLHdCQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFBRyxFQUFFO0NBQ2pELENBQUM7QUFDRixrQkFBa0I7QUFDWCw0QkFBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQyIsImZpbGUiOiJoaWdobGlnaHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=