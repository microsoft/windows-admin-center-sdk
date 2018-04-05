import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from '@msft-sme/shell/angular';
var DialogExampleComponent = /** @class */ (function () {
    /**
     * Initializes a new instance of the DialogExampleComponent class.
     *
     * @param dialogService The dialog service provider.
     */
    function DialogExampleComponent(dialogService) {
        this.dialogService = dialogService;
    }
    DialogExampleComponent.navigationTitle = function (appContextService, snapshot) {
        return 'sme-dialog';
    };
    /**
     * The method to run when the message dialog button is clicked.
     */
    DialogExampleComponent.prototype.onClickMessageDialog = function () {
        var subject = this.dialogService.show('message-dialog', {
            buttonText: 'Button Text',
            message: 'Check the console for a logging of the result when you dismiss this dialog!',
            title: 'My title!'
        });
        subject.subscribe(function (result) {
            //
        });
    };
    /**
     * The method to run when the message dialog button is clicked.
     */
    DialogExampleComponent.prototype.onClickMessageDialogWithLink = function () {
        var subject = this.dialogService.show('message-dialog', {
            buttonText: 'Button Text2',
            message: 'Check out microsoft site for more information!',
            title: 'My title2!',
            externalLink: { url: 'http://www.microsoft.com', title: 'Microsoft' }
        });
        subject.subscribe(function (result) {
            //
        });
    };
    /**
     * The method called when the message dialog with checkbox button is clicked.
     */
    DialogExampleComponent.prototype.onClickMessageDialogWithCheckbox = function () {
        var subject = this.dialogService.show('message-dialog', {
            buttonText: 'Button Text2',
            message: 'Check out microsoft site for more information!',
            title: 'My title2!',
            checkboxText: 'Do not show this message again'
        });
        subject.subscribe(function (result) {
            console.log(result);
        });
    };
    /**
     * The method to run when the confirmation dialog button is clicked.
     */
    DialogExampleComponent.prototype.onClickConfirmationDialog = function () {
        var subject = this.dialogService.show('confirmation-dialog', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Click here to do a thing!',
            confirmButtonText: 'OK',
            message: 'Check the console for a logging of the result when you dismiss this dialog!',
            title: 'My title!'
        });
        subject.subscribe(function (result) {
            //
        });
    };
    /**
     * The method to run when the double check confirmation dialog button is clicked.
     */
    DialogExampleComponent.prototype.onClickDoubleCheckConfirmationDialog = function () {
        var subject = this.dialogService.show('confirmation-dialog', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Click here to do a thing!',
            doubleCheckText: 'Click here to enable the confirm button!',
            confirmButtonText: 'OK',
            message: 'Check the console for a logging of the result when you dismiss this dialog!',
            title: 'My title!'
        });
        subject.subscribe(function (result) {
            //
        });
    };
    /**
     * The method to run when the confirmation dialog button is clicked.
     */
    DialogExampleComponent.prototype.onClickConfirmationListDialog = function (listT) {
        var strings = [];
        for (var i = 0; i < 50; i++) {
            strings.push({ title: 'list item #' + i, value: 'list item #' + i });
            // strings.push('list item ' + i);
        }
        var obs = Observable.timer(2000).flatMap(function (_) { return Observable.of(strings); });
        var subject = this.dialogService.show('confirmation-list-dialog', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Click here to do a thing!',
            confirmButtonText: 'OK',
            listDataSource: obs,
            listType: listT,
            title: 'My title!',
            listFooterText: 'This is the list footer.',
            listHeaderText: 'The list header:'
        });
        subject.subscribe(function (result) {
            // handle result
        });
    };
    /**
     * The method to run when the full screen dialog button is clicked.
     */
    DialogExampleComponent.prototype.onClickFullScreenDialog = function () {
        var subject = this.dialogService.show('full-screen-dialog', {
            title: 'Full screen!',
            label: 'Very sad label in a huge dialog.'
        });
        subject.subscribe(function (result) {
            // handle result
        });
    };
    /**
     * The method to run when the confirmation dialog button is clicked.
     */
    DialogExampleComponent.prototype.onClickConfirmationDialogChain = function () {
        var subject = this.dialogService.show('dialog-chain', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Do not show another dialog confirmation dialog',
            confirmButtonText: 'OK',
            message: 'This should open another dialog when you click OK and the checkbox is unchecked',
            title: 'first dialog'
        });
        subject.subscribe(function (result) {
            // handle the result
        });
    };
    DialogExampleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-controls-dialog-example',
                    template: "\n      <div class=\"m-l-xxs tool-container\">\n        <div>\n          <h3>Message Dialog Example</h3>\n          <button (click)=\"onClickMessageDialog()\">Click me for a message dialog!</button>\n        </div>\n\n        <div>\n          <h3>Message Dialog with Link Example</h3>\n          <button (click)=\"onClickMessageDialogWithLink()\">Click me for a message dialog with link!</button>\n        </div>\n\n        <div>\n          <h3>Message Dialog with Checkbox Example</h3>\n          <button (click)=\"onClickMessageDialogWithCheckbox()\">Click me for a message dialog with a checkbox!</button>\n        </div>\n\n        <div>\n          <h3>Confirmation Dialog Example</h3>\n          <button (click)=\"onClickConfirmationDialog()\">Click me for a confirmation dialog!</button>\n        </div>\n\n        <div>\n          <h3>Confirmation Dialog Double Check Example</h3>\n          <button (click)=\"onClickDoubleCheckConfirmationDialog()\">Click me for a confirmation dialog with a double check (confirm button disabled if double check box unchecked)!</button>\n        </div>\n\n        <div>\n          <h3>Confirmation List Dialog Example</h3>\n          <button (click)=\"onClickConfirmationListDialog()\">Click me for a confirmation dialog with a list!</button>\n          <button (click)=\"onClickConfirmationListDialog('radio')\">Click me for a confirmation dialog with a radio list!</button>\n        </div>\n\n        <div>\n          <h3>Custom Full screen Dialog Example</h3>\n          <button (click)=\"onClickFullScreenDialog()\">Click me for a full screen dialog!</button>\n        </div>\n        <div>\n          <h3>Custom dialog that opens a dialog</h3>\n          <button (click)=\"onClickConfirmationDialogChain()\">Click me for a dialog that opens another dialog!</button>\n        </div>\n      </div>\n\n      <sme-message-dialog id=\"message-dialog\"></sme-message-dialog>\n      <sme-confirmation-dialog id=\"confirmation-dialog\"></sme-confirmation-dialog>\n      <sme-confirmation-list-dialog id=\"confirmation-list-dialog\"></sme-confirmation-list-dialog>\n      <sme-dialog-example-full-screen-dialog id=\"full-screen-dialog\"></sme-dialog-example-full-screen-dialog>\n      <sme-dialog-example-dialog-chain id=\"dialog-chain\"></sme-dialog-example-dialog-chain>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogExampleComponent.ctorParameters = function () { return [
        { type: DialogService, },
    ]; };
    return DialogExampleComponent;
}());
export { DialogExampleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kaWFsb2cvZGlhbG9nLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBRzFDLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxNQUFBLENBQU87QUFFbEMsT0FBTyxFQVFILGFBQWEsRUFHaEIsTUFBTSx5QkFBQSxDQUEwQjtBQUtqQztJQU1JOzs7O09BSUc7SUFDSCxnQ0FBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDO0lBVHZDLHNDQUFlLEdBQTdCLFVBQThCLGlCQUFvQyxFQUFFLFFBQWdDO1FBQ2hHLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQVNEOztPQUVHO0lBQ0kscURBQW9CLEdBQTNCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDcEQsVUFBVSxFQUFFLGFBQWE7WUFDekIsT0FBTyxFQUFFLDZFQUE2RTtZQUN0RixLQUFLLEVBQUUsV0FBVztTQUNyQixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNyQixFQUFFO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2REFBNEIsR0FBbkM7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBcUMsZ0JBQWdCLEVBQUU7WUFDeEYsVUFBVSxFQUFFLGNBQWM7WUFDMUIsT0FBTyxFQUFFLGdEQUFnRDtZQUN6RCxLQUFLLEVBQUUsWUFBWTtZQUNuQixZQUFZLEVBQUUsRUFBRSxHQUFHLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtTQUN4RSxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxD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QUFJLENBQWdFLG9CQUFvQixFQUFFO1lBQ3ZILEtBQUssRUFBRSxjQUFjO1lBQ3JCLEtBQUssRUFBRSxrQ0FBa0M7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQXFDO1lBQ3BELGdCQUFnQjtRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLCtEQUE4QixHQUFyQztRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFzRCxjQUFjLEVBQUU7WUFDdkcsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixZQUFZLEVBQUUsZ0RBQWdEO1lBQzlELGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxFQUFFLGlGQUFpRjtZQUMxRixLQUFLLEVBQUUsY0FBYztTQUN4QixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNyQixvQkFBb0I7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0UsaUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxRQUFRLEVBQUUsOHdFQWdEVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gscUNBQWMsR0FBbUUsY0FBTSxPQUFBO1FBQzlGLEVBQUMsSUFBSSxFQUFFLGFBQWEsR0FBRztLQUN0QixFQUY2RixDQUU3RixDQUFDO0lBQ0YsNkJBQUM7Q0FuTkQsQUFtTkMsSUFBQTtTQW5OWSxzQkFBc0IiLCJmaWxlIjoiZGlhbG9nLWV4YW1wbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==