# Getting Started with Windows Admin Center Extensions

Let’s get started with the Windows Admin Center Extensions SDK!  In this document, we’ll cover installing prerequisites, downloading SDK source code, building and side loading your extension, and renaming your extension.

## Extensions SDK Prerequisites

Before you start developing in Windows Admin Center Extensions, download and install the following prerequisites:

- Windows Admin Center, available [here](http://aka.ms/smebits)
- Visual Studio or [Visual Studio Code](http://code.visualstudio.com)
- [Node Package Manager](https://npmjs.com/get-npm) (for downloading build dependencies)  
- [Nuget](https://www.nuget.org/downloads) (for publishing extensions)

## Download Source Code

The source code and dependencies are available from the Windows Admin Center team as a zip file.

## Install Dependencies

Install dependencies for your project with npm.
-	Install global dependencies for your project:
	```
	npm install npm@5.5.1 -g
	npm install @angular/cli@1.6.5 -g
	npm install -g gulp
    npm install typescript@2.5.3 -g
    npm install tslint@5.7.0 -g

	```

- Install local dependencies for your project (project.json):
    ```
    npm install
    ```

## Build Sample Extension

To build the sample extension, open a command window, change directory to the unpacked source directory "cd C:\<your root>\msft-sme-developer-tools", and then you're ready to build.

-	Build and serve with gulp:
	``` js
	gulp build
	gulp serve -p 4201
	```

Note that you need to choose a port that is currently free.  Make sure you do not attempt to use the port that Honolulu is running on.

## Side Loading Sample Extension

Your project can be side loaded into a local instance of Honolulu for testing by attaching the locally served project into Honolulu.  
-	Launch Windows Admin Center in a web browser 
-	Open the debugger (F12)
-	Open the Console and type the following command:
	``` ts
	MsftSme.sideLoad("http://localhost:4201")
	```
-	Refresh the web browser
Your project will now be visible in the Tools list with (side loaded) next to the name.

## Renaming your extension

To change the displayed name of the extension within Honolulu, navigate to the manifest.json file locacted in the msft-sme-developer-tools/src folder.  Inside this JSON file, change the "displayName" and "description" properties of all the specific local objects within the resources collection (starting on line 37).  This will only change the rendered Display Name for the extension.

## Removing sample code from your extension

Once you are familiar will the code and structure of the extensions, you can also use this project as the starting point for a clean extension.  To start fresh:  Navigate to the msft-sme-developer-tools/src/app directory, and make a new directory with the name of your extension.
Inside this new folder, make 4 new files:
	<your-extension-name>.component.html
	<your-extension-name>.component.ts
	<your-extension-name>.module.ts
	<your-extension-name>.routing.ts

Add the following code to the *.component.html file:
	``` html
	<div class="stretch-absolute flex-layout vertical">
		<div class="auto-flex-size relative">
			<router-outlet></router-outlet>
		</div>
	</div>
	```

Copy the contents of hello.component.ts and change the selector and template urls, replacing "hello" with the name of your extension (lines 21 and 22).  Change the class name, replacing 'Hello' with your extension name (line 24).
On line 35 change the source, replacing 'hello' with your extension name.

Add this to the new .module.ts file:

``` ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ActionsModule,
    AlertBarModule,
    DetailsModule,
    LoadingWheelModule,
    MasterViewModule,
    SmeStylesModule,
    SplitViewModule,
    SvgModule,
    ToolHeaderModule
} from '@microsoft/windows-admin-center-sdk/core';
import { HelloComponent } from './hello.component';
import { routing } from './hello.routing';

import { ContextMenuModule, DataTableModule, SharedModule, TreeTableModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        HelloComponent
    ],
    providers: [
    ],
    imports: [
        ActionsModule,
        AlertBarModule,
        CommonModule,
        DataTableModule,
        DetailsModule,
        FormsModule,
        LoadingWheelModule,
        SmeStylesModule,
        SvgModule,
        routing,
        ToolHeaderModule,
        TreeTableModule,
        SplitViewModule,
        MasterViewModule
    ]
})
export class HelloModule { }

```
Make sure you change every instance of "Hello" to your extension name.

Next, open up the "app-routing.module.ts" file  in the /src/app directory.  On line 15 change all the instances of "Hello" to your extension name.

## Honolulu Extensions SDK in-depth

For a more in-depth look at Honolulu extensions SDK sample source code, click [here](extensions-in-depth.md).
