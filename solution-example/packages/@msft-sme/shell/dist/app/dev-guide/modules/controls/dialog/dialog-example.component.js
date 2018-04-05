import { Component } from '@angular/core';
import { Observable } from 'rxjs';
var DialogExampleComponent = (function () {
    /**
     * Initializes a new instancec of the DialogExampleComponent class.
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
    DialogExampleComponent.prototype.onClickConfirmationListDialog = function () {
        var strings = [];
        for (var i = 0; i < 15; i++) {
            strings.push('list item ' + i);
        }
        var obs = Observable.timer(2000).flatMap(function (_) { return Observable.of(strings); });
        var subject = this.dialogService.show('confirmation-list-dialog', {
            cancelButtonText: 'Cancel',
            checkboxText: 'Click here to do a thing!',
            confirmButtonText: 'OK',
            listDataSource: obs,
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
    return DialogExampleComponent;
}());
export { DialogExampleComponent };
DialogExampleComponent.decorators = [
    { type: Component, args: [{
                selector: 'sme-ng2-controls-dialog-example',
                template: "\n      <div class=\"m-l-xxs tool-container\">\n        <div>\n          <h3>Message Dialog Example</h3>\n          <button (click)=\"onClickMessageDialog()\">Click me for a message dialog!</button>\n        </div>\n\n        <div>\n          <h3>Message Dialog with Link Example</h3>\n          <button (click)=\"onClickMessageDialogWithLink()\">Click me for a message dialog with link!</button>\n        </div>\n\n        <div>\n          <h3>Confirmation Dialog Example</h3>\n          <button (click)=\"onClickConfirmationDialog()\">Click me for a confirmation dialog!</button>\n        </div>\n\n        <div>\n          <h3>Confirmation Dialog Double Check Example</h3>\n          <button (click)=\"onClickDoubleCheckConfirmationDialog()\">Click me for a confirmation dialog with a double check (confirm button disabled if double check box unchecked)!</button>\n        </div>\n\n         <div>\n          <h3>Confirmation List Dialog Example</h3>\n          <button (click)=\"onClickConfirmationListDialog()\">Click me for a confirmation list dialog!</button>\n        </div>\n\n         <div>\n          <h3>Custom Full screen Dialog Example</h3>\n          <button (click)=\"onClickFullScreenDialog()\">Click me for a full screen dialog!</button>\n        </div>\n         <div>\n          <h3>Custom dialog that opens a dialog</h3>\n          <button (click)=\"onClickConfirmationDialogChain()\">Click me for a dialog that opens another dialog!</button>\n        </div>\n      </div>\n\n      <sme-message-dialog id=\"message-dialog\"></sme-message-dialog>\n      <sme-confirmation-dialog id=\"confirmation-dialog\"></sme-confirmation-dialog>\n      <sme-confirmation-list-dialog id=\"confirmation-list-dialog\"></sme-confirmation-list-dialog>\n      <sme-dialog-example-full-screen-dialog id=\"full-screen-dialog\"></sme-dialog-example-full-screen-dialog>\n      <sme-dialog-example-dialog-chain id=\"dialog-chain\"></sme-dialog-example-dialog-chain>\n    "
            },] },
];
/** @nocollapse */
DialogExampleComponent.ctorParameters = function () { return [
    null,
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9kaWFsb2cvZGlhbG9nLWV4YW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFBLEVBQVUsTUFBTyxlQUFBLENBQWdCO0FBRzFDLE9BQU8sRUFBRSxVQUFBLEVBQVcsTUFBTyxNQUFBLENBQU87QUFpQmxDO0lBTUk7Ozs7T0FJRztJQUNILGdDQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFJLENBQUM7SUFUdkMsc0NBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBU0Q7O09BRUc7SUFDSSxxREFBb0IsR0FBM0I7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBcUMsZ0JBQWdCLEVBQUU7WUFDeEYsVUFBVSxFQUFFLGFBQWE7WUFDekIsT0FBTyxFQUFFLDZFQUE2RTtZQUN0RixLQUFLLEVBQUUsV0FBVztTQUNyQixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNyQixFQUFFO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2REFBNEIsR0FBbkM7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBcUMsZ0JBQWdCLEVBQUU7WUFDeEYsVUFBVSxFQUFFLGNBQWM7WUFDMUIsT0FBTyxFQUFFLGdEQUFnRDtZQUN6RCxLQUFLLEVBQUUsWUFBWTtZQUNuQixZQUFZLEVBQUUsRUFBRSxHQUFHLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtTQUN4RSxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNyQixFQUFFO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwREFBeUIsR0FBaEM7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBc0QscUJBQXFCLEVBQUU7WUFDOUcsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixZQUFZLEVBQUUsMkJBQTJCO1lBQ3pDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsT0FBTyxFQUFFLDZFQUE2RTtZQUN0RixLQUFLLEVBQUUsV0FBVztTQUNyQixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNyQixFQUFFO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxRUFBb0MsR0FBM0M7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBc0QscUJBQXFCLEVBQUU7WUFDOUcsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixZQUFZLEVBQUUsMkJBQTJCO1lBQ3pDLGVBQWUsRUFBRSwwQ0FBMEM7WUFDM0QsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixPQUFPLEVBQUUsNkVBQTZFO1lBQ3RGLEtBQUssRUFBRSxXQUFXO1NBQ3JCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ3JCLEVBQUU7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLDhEQUE2QixHQUFwQztRQUNJLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUMzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUV4RSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBOEQsMEJBQTBCLEVBQUU7WUFDM0gsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixZQUFZLEVBQUUsMkJBQTJCO1lBQ3pDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsY0FBYyxFQUFFLDBCQUEwQjtZQUMxQyxjQUFjLEVBQUUsa0JBQWtCO1NBQ3JDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO1lBQ3JCLGdCQUFnQjtRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNJLHdEQUF1QixHQUE5QjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFnRSxvQkFBb0IsRUFBRTtZQUN2SCxLQUFLLEVBQUUsY0FBYztZQUNyQixLQUFLLEVBQUUsa0NBQWtDO1NBQzVDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFxQztZQUNwRCxnQkFBZ0I7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrREFBOEIsR0FBckM7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBc0QsY0FBYyxFQUFFO1lBQ3ZHLGdCQUFnQixFQUFFLFFBQVE7WUFDMUIsWUFBWSxFQUFFLGdEQUFnRDtZQUM5RCxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLE9BQU8sRUFBRSxpRkFBaUY7WUFDMUYsS0FBSyxFQUFFLGNBQWM7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDckIsb0JBQW9CO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXFETCw2QkFBQztBQUFELENBM0xBLEFBMkxDOztBQXBETSxpQ0FBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLFFBQVEsRUFBRSxpN0RBMENUO2FBQ0osRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHFDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixJQUFJO0NBQ0gsRUFGNkYsQ0FFN0YsQ0FBQyIsImZpbGUiOiJkaWFsb2ctZXhhbXBsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9