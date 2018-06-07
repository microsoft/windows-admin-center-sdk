# Learning about Windows Admin Center Extensions: Dialogs
Let’s go more in-depth into the Windows Admin Center Extensions SDK. In this document, we’ll cover dialogs.

## Dialog Service
The Dialog Service is an injectable dependency that your tool should include when you would like to show confirmation, input or alert dialogs to your user. It is located in the shell and should always be used to keep consistent dialogs throughout Windows Admin Center.

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

To use the confirmation dialog, you'll need to use the 'showConfirmation' method and define the content of the dialog object. In this example, we just use our localized strings that we imported earlier and assign them to pre-defined properties:

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

The other common dialog used is the Action Pane dialog. You will see this type of dialog any time you need to input a form, provide credentials or any other data manipulation. This dialog typically slides in from the right side of the screen and is completely customizable for the functionality of your tool.

Because of it's loosely defined implementation, you will need to build a custom dialog component which will extend the shell's 'BaseDialogComponent' and define it's content as necessary.

For example, let's say that we have a listed action called 'Rename' and we need to provide a dialog in which the user can input a new name for an item. In order to create this new dialog, we are going to create some common Angular component files:

* rename-dialog.component.css
* rename-dialog.component.html
* rename-dialog.component.ts
* rename-dialog.module.ts

In the 'module.ts' file, we'll import some common Angular components, import the Shell's dialog module and declare/export our own component: 

```ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@msft-sme/shell/angular';

import { RenameDialogComponent } from './rename-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    FormsModule
  ],
  declarations: [RenameDialogComponent],
  exports: [RenameDialogComponent]
})
export class RenameDialogModule { }

```

In the 'component.ts' file, we'll do 3 things:

1. Import the following necessary dependancies:

```ts
import { Component } from '@angular/core';
import { BaseDialogComponent, DialogOptions, DialogResult, DialogService } from '@msft-sme/shell/angular';

import { Subject } from 'rxjs/Subject';
import { Strings } from '/src/generated/strings';
```

2. Define our dialog option and dialog result interfaces (this will determine what information can be input/output through the dialog) :

```ts
export interface RenameDialogOptions extends DialogOptions {
  objectToRename?: Object;

  objectCurrentName?: string;

}

export interface RenameDialogResult extends DialogResult {

  confirmed: boolean;

  objectNewName?: string;
}
```

*Note: Any property with a '?' suffix means that it is optional. You can see that at the very least, we want our dialog to tell us when there has been a confirmed change or not.*

3. Build the component itself by using the Angular '@Component' decorator and extending the Shell's 'BaseDialogComponent':

```ts
@Component({
  selector: 'rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent extends BaseDialogComponent<RenameDialogOptions, RenameDialogResult> {

  public objectCurrentName: string;

  public objectNewName: string;

  public strings = MsftSme.resourcesStrings<Strings>().ExampleTool;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  public onConfirmClick(): void {
    this.hide({
      confirmed: true,
      objectNewName: this.objectNewName
    });
}

  public onCancelClick(): void {
    this.hide({
      confirmed: false
    });
  }

  public show(options: RenameDialogOptions): Subject<RenameDialogResult> {
    this.objectCurrentName = options.objectCurrentName;
    this.objectNewName = '';
    return super.show(options);
  }
}
```

*Note: In the example above, 'this.hide()' is a method provided by the base class. It will hide (close) your dialog with the option of passing it any information from the 'DialogResult' interface defined earlier.*

Lastly, in the 'component.html' file we'll include the following structure:

```ts
<sme-dialog #dialog dialogMode="pane">
  <sme-dialog-header>
    <h4 id="sme-dialog-title">{{strings.Dialogs.Rename.title}}</h4>
  </sme-dialog-header>
  <sme-dialog-content>
    <form>
      <div class="form-group form-stretch">
        <div class="form-input">
          <label>{{strings.Dialogs.Rename.Current.label}}</label>
          <div>{{this.objectCurrentName}}</div>
        </div>
        <div class="form-input">
          <label for="rename" class="control-label">{{strings.Dialogs.Rename.NewName.label}}</label>
          <input id="rename" type="text" class="form-control" [(ngModel)]="objectNewName" name="objectNewName"/>
        </div>
      </div>
    </form>
  </sme-dialog-content>
  <sme-dialog-footer>
    <form>
      <div class="pull-right">
        <button type="submit" class="btn btn-primary" [disabled]="!objectNewName || objectNewName === ''" (click)="onConfirmClick()">{{strings.Dialogs.Rename.ConfirmButton.text}}</button>
        <button type="button" class="btn" (click)="onCancelClick()">{{strings.Dialogs.Rename.CancelButton.text}}</button>
      </div>
    </form>
  </sme-dialog-footer>
</sme-dialog>
```

*Note: Be sure to follow this structure closely! All of the 'sme-' prefixed tags and classes shown in this example are required for uniformity. Other than that, feel free to add in more elements, styles, and forms as necessary.*

Once you have all of these pieces put together, you can now call out your dialog from your tool's main component. For example:

```ts
this.dialogService.show<RenameDialogOptions, RenameDialogResult>(
            'renameDialog',
            {
                objectCurrentName: this.myObject.name,
                objectToRename: this.myObject
            }
        ).subscribe((result) => {
            if (result && result.confirmed) {
                // Run logic for changing and saving name
            }
        })
```

In the example above, you can see that when we call 'this.dialogService.show', we provide the dialog's selector (string) and the dialog option data (as defined in the 'DialogOptions' interface) as parameters.

## Additional Information

You'll notice that we did not provide an example for the 'rename-dialog.component.css' file. That is because it's a style file and does not affect functionality. You will only need to provide styling rules in the case that you need to style something unique to your dialog.

We covered two of the most common dialogs that are used by the Dialog Service. To learn more about any additional functionality, be sure to check out the interfaces/definitions contained within the imported 'DialogService' class itself.

