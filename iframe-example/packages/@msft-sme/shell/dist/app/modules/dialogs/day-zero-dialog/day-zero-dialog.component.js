var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ViewChild } from '@angular/core';
import { BaseDialogComponent, DialogCloseReason, DialogService } from '../../../../angular';
var DayZeroDialogPane = /** @class */ (function () {
    function DayZeroDialogPane() {
    }
    return DayZeroDialogPane;
}());
export { DayZeroDialogPane };
var DayZeroDialogComponent = /** @class */ (function (_super) {
    __extends(DayZeroDialogComponent, _super);
    /**
     * Initializes a new instance of the Day Zero Dialog class.
     */
    function DayZeroDialogComponent(dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.dialogPanes = [];
        _this.strings = MsftSme.resourcesStrings();
        _this.currentIndex = 0;
        _this.id = DayZeroDialogComponent.dayZeroDialogComponentId;
        _this.createDialogPanes();
        return _this;
    }
    DayZeroDialogComponent.prototype.createDialogPanes = function () {
        for (var i = 0; i < DayZeroDialogComponent.numberOfPanes; i++) {
            var newPane = new DayZeroDialogPane();
            var currentPaneId = this.getPaneId(i);
            newPane.paneId = currentPaneId;
            newPane.gifPath = "url(\"" + DayZeroDialogComponent.gifs[i] + "\")";
            newPane.title = this.strings.MsftSmeShell.App.DayZeroDialog[currentPaneId].Title;
            newPane.subtext = this.strings.MsftSmeShell.App.DayZeroDialog[currentPaneId].Subtext;
            if (i === 0) {
                newPane.leftButtonText = this.strings.MsftSmeShell.App.DayZeroDialog.SkipTour;
            }
            else {
                newPane.leftButtonText = this.strings.MsftSmeShell.App.DayZeroDialog.Back;
            }
            if (i === DayZeroDialogComponent.numberOfPanes - 1) {
                newPane.rightButtonText = this.strings.MsftSmeShell.App.DayZeroDialog.Finish;
            }
            else {
                newPane.rightButtonText = this.strings.MsftSmeShell.App.DayZeroDialog.Next;
            }
            this.dialogPanes.push(newPane);
        }
    };
    DayZeroDialogComponent.prototype.leftButtonClick = function () {
        if (this.currentIndex === 0) {
            this.hide();
        }
        else {
            this.currentIndex--;
            this.panel.activate(this.getPaneId(this.currentIndex));
        }
    };
    DayZeroDialogComponent.prototype.rightButtonClick = function () {
        if (this.currentIndex === (DayZeroDialogComponent.numberOfPanes - 1)) {
            this.hide();
        }
        else {
            this.currentIndex++;
            this.panel.activate(this.getPaneId(this.currentIndex));
        }
    };
    DayZeroDialogComponent.prototype.getPaneId = function (index) {
        var paneIdFormat = 'Page{0}';
        return paneIdFormat.format(index + 1);
    };
    DayZeroDialogComponent.prototype.goToPane = function (index) {
        this.currentIndex = index;
        this.panel.activate(this.getPaneId(this.currentIndex));
    };
    DayZeroDialogComponent.prototype.closeRequested = function (reason) {
        if (reason !== DialogCloseReason.SoftDismiss) {
            this.hide();
        }
    };
    DayZeroDialogComponent.dayZeroDialogComponentId = 'day-zero-dialog';
    DayZeroDialogComponent.gifs = [
        '/assets/gifs/Honolulu-Welcome.gif',
        '/assets/images/Feedback.png'
    ];
    DayZeroDialogComponent.numberOfPanes = 2;
    DayZeroDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-day-zero-dialog',
                    template: "\n      <sme-dialog #dialog dialogMode=\"centered-large\">\n          <sme-dialog-content *ngIf=\"dialog.visible\">\n              <div *ngIf=\"dialogPanes.length > 0\">\n                  <sme-guided-panel #panel [firstPaneId]=\"getPaneId(0)\" class=\"dialogSpacing center\">\n                      <div *ngFor=\"let page of dialogPanes\">\n                          <sme-guided-pane #pane [paneId]=\"page.paneId\">\n                              <div class=\"sme-layout-relative sme-position-flex-auto\">\n                                  <div class=\"dialog-media\" [style.background-image]=\"page.gifPath\"></div>\n                                  <ol class=\"carousel-indicators\">\n                                      <li *ngFor=\"let paneItem of dialogPanes\" [ngClass]=\"{'active': currentIndex === dialogPanes.indexOf(paneItem)}\" (click)=\"goToPane(dialogPanes.indexOf(paneItem))\"></li>\n                                  </ol>\n                                  <div class=\"description\">\n                                      <h4>{{ page.title }}</h4>\n                                      <p>{{ page.subtext }}</p>\n                                      <p *ngIf=\"page.secondarySubtext\">{{ page.secondarySubtext }}</p>\n                                  </div>\n                              </div>\n                              <div class=\"sme-position-flex-none sme-padding-inset-sm\">\n                                  <button type=\"button\" class=\"btn\" (click)=\"leftButtonClick()\">{{ page.leftButtonText }}</button>\n                                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"rightButtonClick()\" autofocus>{{ page.rightButtonText }}</button>\n                              </div>\n                          </sme-guided-pane>\n                      </div>\n                  </sme-guided-panel>\n              </div>\n          </sme-dialog-content>\n      </sme-dialog>\n    ",
                    styles: ["\n      :host>>>sme-backdrop {\n          /* this addresses a strange bug in edge that casuese scroll bars to appear do to a rendering problem with the transform(translate.... on the dialogs 'relative-center' class */\n          overflow: hidden !important;\n      }\n\n      :host>>>h4 {\n          color: #0078D7;\n          padding-bottom: 12px !important;\n      }\n\n      :host>>>p {\n          padding-bottom: 0px !important;\n      }\n\n      :host>>>.btn {\n          background: white;\n          color: black;\n          margin: 0 !important;\n      }\n\n      :host>>>.btn.btn-primary {\n          background: white;\n          color: #0078D7;\n          margin: 0;\n      }\n\n      :host>>>.btn.btn-primary:hover,\n      :host>>>.btn.btn-primary:focus {\n          background: white;\n          color: #0078D7;\n          text-decoration: underline;\n      }\n\n      :host>>>.btn:hover,\n      :host>>>.btn:focus {\n          background: white;\n          color: black;\n          text-decoration: underline;\n      }\n\n      .center {\n          text-align: center;\n      }\n\n      .dialog-media {\n          height: 100vh;\n          width: 100vw;\n          max-height: 500px;\n          max-width: 800px;\n          padding-bottom: 10px;\n          background-position: center;\n          background-repeat: no-repeat;\n          background-size: contain;\n          background-color: #F2F2F2;\n      }\n\n      @media screen and (max-height: 700px) {\n          .dialog-media {\n              height: 65vh;\n              min-height: 250px;\n          }\n      }\n\n      .description {\n          margin-right: 24px;\n          margin-left: 24px;\n      }\n\n      :host>>>.carousel-indicators .active {\n          background-color: #0078D7;\n          border: 0px;\n          margin: 5px;\n          width: 10px;\n          height: 10px;\n      }\n\n      :host>>>.carousel-indicators li {\n          border: 1px solid #0078D7;\n          margin: 5px;\n      }\n\n      .carousel-indicators {\n          position: relative;\n          bottom: 0px;\n          margin-bottom: 0px;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    DayZeroDialogComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    DayZeroDialogComponent.propDecorators = {
        'panel': [{ type: ViewChild, args: ['panel',] },],
    };
    return DayZeroDialogComponent;
}(BaseDialogComponent));
export { DayZeroDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2RpYWxvZ3MvZGF5LXplcm8tZGlhbG9nL2RheS16ZXJvLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQWtCLFNBQUEsRUFBVSxNQUFPLGVBQUEsQ0FBZ0I7QUFFNUQsT0FBTyxFQUNILG1CQUFtQixFQUNuQixpQkFBaUIsRUFHakIsYUFBYSxFQUVoQixNQUFNLHFCQUFBLENBQXNCO0FBRzdCO0lBQUE7SUFRQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTs7QUFHRDtJQUE0QywwQ0FBZ0Q7SUFleEY7O09BRUc7SUFDSCxnQ0FBWSxhQUE0QjtRQUF4QyxZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQUd2QjtRQVhNLGlCQUFXLEdBQXdCLEVBQUUsQ0FBQztRQUN0QyxhQUFPLEdBQVksT0FBTyxDQUFDLGdCQUFnQixFQUFXLENBQUM7UUFDdEQsa0JBQVksR0FBRyxDQUFDLENBQUM7UUFPckIsS0FBSSxDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQztRQUMxRCxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7SUFDN0IsQ0FBQztJQUVPLGtEQUFpQixHQUF6QjtRQUNJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsc0JBQXNCLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUQsSUFBSSxPQUFPLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUN6RCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxPQUFPLEdBQUksV0FBUSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQUksQ0FBQztZQUM5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Q0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQWhGYSwrQ0FBd0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM3QywyQkFBSSxHQUFHO1FBQ2pCLG1DQUFtQztRQUNuQyw2QkFBNkI7S0FDaEMsQ0FBQztJQUNZLG9DQUFhLEdBQUcsQ0FBQyxDQUFDO0lBNEU3QixpQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSw2NURBNEJUO29CQUNELE1BQU0sRUFBRSxDQUFDLHdrRUF1RlIsQ0FBQztpQkFDTCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztLQUN0QixFQUY2RixDQUU3RixDQUFDO0lBQ0sscUNBQWMsR0FBMkM7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRyxFQUFFLEVBQUU7S0FDakQsQ0FBQztJQUNGLDZCQUFDO0NBbk5ELEFBbU5DLENBbk4yQyxtQkFBbUIsR0FtTjlEO1NBbk5ZLHNCQUFzQiIsImZpbGUiOiJkYXktemVyby1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==