# Learning about Windows Admin Center Extensions: Dialogs
Let’s go more in-depth into the Windows Admin Center Extensions SDK. In this document, we’ll cover dialogs.

## Dialog Service
The Dialog Service is an injectable dependency that your tool should include when you would like to show confirmation, input or alert dialogs to your user. It is located in the shell and is used to keep consistent dialogs throughout Windows Admin Center.

To include it into your tool's base component, be sure to import the class from the shell package and inject the existing service into your constructor (as shown in Typescript):

```ts
import { DialogService } from '@msft-sme/shell/angular';

@Component({
    selector: 'example-tool',
    templateUrl: './example-tool.component.html',
    styleUrls: ['./example-tool.component.css']
})

export class ExampleToolComponent {

    public constructor(
        private dialogService: DialogService) { 
    }
}
```

The example above will assign the currently existing 'DialogService' class to a local variable 'dialogService' in which you can execute the methods defined within.

## Strings and Localization
If you haven't already, be sure to visit the *Strings and Localization* documentation within this SDK to familiarize yourself with how to create and retrieve localized strings for different languages/regions. All visual text that the user can see should be passed through our localization process.

Once you have stored all necessary strings, you can pull it into your component:

```ts
    public strings = MsftSme.resourcesStrings<Strings>().ExampleTool;
```

Assuming that all our strings were saved with the 'ExampleTool' prefix within the 'strings.resjson' file, we can choose to capture only the strings with that prefix.

## Confirmation Dialogs
One of the most common dialogs we use within the Admin Center is confirmation dialogs. This is used to pause any given action and present the user with a confirmation option that will either continue or cancel the action. This should be used during all destructive procedures such as deleting, renaming or changing data that isn't easily reversible.

To use the confirmation dialog, you'll need to use the 'showConfirmation' method and define the content of the dialog object. In this example, we just use our localized strings that we imported earlier:

```ts
    public deleteSomething() {
        this.dialogService.showConfirmation({
            confirmButtonText: this.strings.Dialogs.Buttons.delete,
            cancelButtonText: this.strings.Dialogs.Buttons.cancel,
            title: this.strings.Dialogs.DeleteSomething.title
            message: this.strings.Dialogs.DeleteSomething.message
        })
    }
```

To make the dialog fully functional, you'll need to then 'subscribe' to the calling method so that you can take the appropriate action based on the result of the user's selection:

```ts
    public deleteSomething() {
        this.dialogService.showConfirmation({
            confirmButtonText: this.strings.Dialogs.Buttons.delete,
            cancelButtonText: this.strings.Dialogs.Buttons.cancel,
            title: this.strings.Dialogs.DeleteSomething.title
            message: this.strings.Dialogs.DeleteSomething.message
        }).subscribe((result: ConfirmationDialogResult) => {
            if (result.confirmed) {
                // Continue with deleting something
            }

            // Else, do nothing
        })
    }
```

## Action Pane Dialogs

The other common dialog used is the Action Pane dialog. This is a dialog that slides in from the right side of the screen and is highly customizable.