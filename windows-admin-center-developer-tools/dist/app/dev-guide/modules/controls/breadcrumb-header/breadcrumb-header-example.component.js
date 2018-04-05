import { Component } from '@angular/core';
import { BreadcrumbSeparator } from '@msft-sme/shell/angular';
var BreadcrumbHeaderExampleComponent = /** @class */ (function () {
    function BreadcrumbHeaderExampleComponent() {
        this.itemsList = [];
    }
    BreadcrumbHeaderExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-breadcrumb-header';
    };
    BreadcrumbHeaderExampleComponent.prototype.getStartingData = function () {
        return [
            {
                label: 'item 1',
                clickable: true,
                bold: true,
                command: function (event) { return alert('item 1'); }
            },
            {
                label: 'item 2',
                clickable: true,
                command: function (event) { return alert('item 2'); }
            },
            {
                label: 'item 3',
                clickable: false,
                bold: true
            }
        ];
    };
    BreadcrumbHeaderExampleComponent.prototype.ngOnInit = function () {
        this.separator1 = BreadcrumbSeparator.BackSlash;
        this.separator2 = BreadcrumbSeparator.ChevronRight;
        this.separator3 = BreadcrumbSeparator.Slash;
        this.itemsList = this.getStartingData();
    };
    BreadcrumbHeaderExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-breadcrumb-header-example',
                    template: "\n      <sme-breadcrumb-header [breadcrumbSeparator]=\"separator1\" [breadcrumbItems]=\"itemsList\"></sme-breadcrumb-header>\n      <sme-breadcrumb-header [breadcrumbSeparator]=\"separator2\" [breadcrumbItems]=\"itemsList\"></sme-breadcrumb-header>\n      <sme-breadcrumb-header [breadcrumbSeparator]=\"separator3\" [breadcrumbItems]=\"itemsList\"></sme-breadcrumb-header>\n    "
                },] },
    ];
    /** @nocollapse */
    BreadcrumbHeaderExampleComponent.ctorParameters = function () { return []; };
    return BreadcrumbHeaderExampleComponent;
}());
export { BreadcrumbHeaderExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9icmVhZGNydW1iLWhlYWRlci9icmVhZGNydW1iLWhlYWRlci1leGFtcGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFzRCxNQUFPLGVBQUEsQ0FBZ0I7QUFFdEYsT0FBTyxFQUlILG1CQUFtQixFQUN0QixNQUFNLHlCQUFBLENBQTBCO0FBR2pDO0lBQUE7UUFDVyxjQUFTLEdBQXFCLEVBQUUsQ0FBQztJQWtENUMsQ0FBQztJQTdDaUIsZ0RBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLHVCQUF1QixDQUFDO0lBQ25DLENBQUM7SUFFTywwREFBZSxHQUF2QjtRQUVJLE1BQU0sQ0FBQztZQUNDO2dCQUNJLEtBQUssRUFBRSxRQUFRO2dCQUNmLFNBQVMsRUFBRSxJQUFJO2dCQUNmLElBQUksRUFBRSxJQUFJO2dCQUNWLE9BQU8sRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBZixDQUFlO2FBQ3BDO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFmLENBQWU7YUFDcEM7WUFDRDtnQkFDSSxLQUFLLEVBQUUsUUFBUTtnQkFDZixTQUFTLEVBQUUsS0FBSztnQkFDaEIsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQUM7SUFDVixDQUFDO0lBRU0sbURBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDRSwyQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSw0Q0FBNEM7b0JBQ3RELFFBQVEsRUFBRSw0WEFJVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0NBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRix1Q0FBQztDQW5ERCxBQW1EQyxJQUFBO1NBbkRZLGdDQUFnQyIsImZpbGUiOiJicmVhZGNydW1iLWhlYWRlci1leGFtcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL1NvdXJjZS9iYXNlL21zZnQtc21lLWRldmVsb3Blci10b29scy9pbmxpbmVTcmMvIn0=