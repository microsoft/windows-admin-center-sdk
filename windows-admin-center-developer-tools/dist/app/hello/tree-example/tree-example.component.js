import { Component, EventEmitter, Output } from '@angular/core';
import { TestData } from './testData';
var TreeExampleComponent = /** @class */ (function () {
    function TreeExampleComponent() {
        this.onSelectionChange = new EventEmitter();
        this.strings = MsftSme.resourcesStrings();
        this.loading = true;
    }
    /**
     * Information on PrimeNG's TreeTable can be found here:
     * https://www.primefaces.org/primeng/#/treetable
     */
    TreeExampleComponent.prototype.ngOnInit = function () {
        this.treeData = [TestData];
        this.loading = false;
    };
    TreeExampleComponent.prototype.getIconCssClasses = function (nodeName) {
        // todo
    };
    /**
     * The method to run when a node is selected.
     */
    TreeExampleComponent.prototype.onNodeSelect = function (event) {
        this.onSelectionChange.emit(event.node.data.data);
    };
    /**
     * The method to run when a node is expanded.
     */
    TreeExampleComponent.prototype.onNodeExpand = function (event) {
        // let node = event.node;
        // const selectedPath = node.data.path;
        // if (!this.pathIsLoaded(selectedPath)) {
        //     this.markNodeAsLoading(node);
        //     this.pushAgent(selectedPath, node);
        // }
    };
    TreeExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-tree-example',
                    template: "\n    <sme-tree-table [items]=\"treeData\" [(selection)]=\"selectedData\" (onNodeSelect)=\"onNodeSelect($event)\" class=\"sme-layout-absolute sme-position-inset-none\" [showHeader]=\"false\"\n    [showGrid]=\"false\" [showLeftMargin]=\"false\">\n        <sme-tree-table-column field=\"label\" header=\"Name\" sortable=\"true\" width=\"40%\">\n            <ng-template let-data>\n                <span *ngIf=\"data.type==='folder'\" class=\"sme-icon sme-icon-folder\"></span>\n                <span *ngIf=\"data.type!=='folder'\" class=\"placeholder\"></span>\n                <strong>{{data.label}}</strong>\n            </ng-template>\n        </sme-tree-table-column>                \n    </sme-tree-table>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    TreeExampleComponent.ctorParameters = function () { return []; };
    TreeExampleComponent.propDecorators = {
        'onSelectionChange': [{ type: Output },],
    };
    return TreeExampleComponent;
}());
export { TreeExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9oZWxsby90cmVlLWV4YW1wbGUvdHJlZS1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLFlBQUEsRUFBc0IsTUFBQSxFQUFPLE1BQU8sZUFBQSxDQUFnQjtBQUl4RSxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sWUFBQSxDQUFhO0FBR3RDO0lBUUU7UUFOTyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBT3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHVDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVNLGdEQUFpQixHQUF4QixVQUF5QixRQUFRO1FBQy9CLE9BQU87SUFDVCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQ0FBWSxHQUFuQixVQUFvQixLQUFVO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVDOztPQUVHO0lBQ0ksMkNBQVksR0FBbkIsVUFBb0IsS0FBVTtRQUM1Qix5QkFBeUI7UUFDekIsdUNBQXVDO1FBQ3ZDLDBDQUEwQztRQUMxQyxvQ0FBb0M7UUFDcEMsMENBQTBDO1FBQzFDLElBQUk7SUFDUixDQUFDO0lBQ0ksK0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsMHNCQVdUO29CQUNELE1BQU0sRUFBRSxDQUFDLFFBRVIsQ0FBQztpQkFDSCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUNBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDSyxtQ0FBYyxHQUEyQztRQUNoRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO0tBQ3ZDLENBQUM7SUFDRiwyQkFBQztDQXRFRCxBQXNFQyxJQUFBO1NBdEVZLG9CQUFvQiIsImZpbGUiOiJ0cmVlLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==