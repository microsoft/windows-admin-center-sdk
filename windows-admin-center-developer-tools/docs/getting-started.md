# Getting Started with Windows Admin Center Extensions #

Let’s get started with the Windows Admin Center Extensions SDK!  In this document, we’ll cover installing prerequisites, downloading SDK source code, building and side loading your extension, and renaming your extension.

## Extensions SDK Prerequisites ##

Before you start developing in Windows Admin Center Extensions, download and install the following prerequisites:

- Windows Admin Center, available [here](http://aka.ms/smebits)
- Visual Studio or [Visual Studio Code](http://code.visualstudio.com)
- [Node Package Manager](https://npmjs.com/get-npm) (for downloading build dependencies)  
- [Nuget](https://www.nuget.org/downloads) (for publishing extensions)

## Download Source Code ##

The source code and dependencies are available from the Windows Admin Center team as a zip file.

## Install Dependencies ##

Install dependencies for your project with npm.
-	Install global dependencies for your project:
	```
	npm install npm@5.5.1 -g
	npm install @angular/cli@1.6.5 -g
	npm install -g gulp
    npm install typescript@2.5.3 -g
    npm install tslint@5.7.0 -g
    npm isntall -g windows-admin-center-cli

	```

### Install the Developer Tools ###

As an optional tool, we provide the Windows Admin Center Developer Tools as an optional extension that you can download and install in your instance of the gateway.

To install the extension, click the Settings gear in the top right hand corner of Windows Admin Center, and then click "Extensions" in the navigation menu on the right side of the page.  From the table that loads under "Available Extensions" (assuming you have not already performed the installation), click Windows Admin Center Developer Tools, and click "Install".

This process requires Admin permissions to update files on the local file system, so you will need to accept the elevation confirmation and wait for the page to refresh.  You will notice a notification in the top right hand bar, and the tables will refresh when the install is complete.

The Developer Tools are a new solution that is available to you from the "Installed Solutions" drop down next to the product name.  Select it, and then choose a server to connect to from the following connection list.

You can use the Developer Tools as a simple solution from which you can start building your extension.

## Creating your own extension ##

With the addition of the Windows Admin Center CLI, we now have a simple, streamlined process for creating your own custom Windows Admin Center extension.  If you followed the "Install Dependencies" section of the document, you already have the CLI installed, and can open up a CMD, CD to the directory in which you want to create the tool, and then type:

```
wac create --company <Your Company Here> --tool <Your Tool Name Here>
```

and press enter.  This will create a new folder, and fill it with all the components you need to get up and running with a new tool.

In order to use a company or tool name with spaces, make sure to enclose the entire name in double quotes like so:

```
wac create --company "My Company" --tool "My Tool"
```

The CLI will automatically convert spaces to "-" for internal settings, but keep spaces for all public visible fields.

### Building the Extension ###

Once the wac create command completes, you have everything you need to run your new extension.  Cd into the new directory that was created:
```
cd MyTestProject
```

and then you need to install all dependencies bofore building.

```
npm install
```

Once that completes follow it up with the following:

```
gulp build
```

and then

```
gulp serve -p 4200
```

Please not that the 4200 is just the port that the extension gets hosted on.  You can choose any port number as long as it's not already in use.

## Honolulu Extensions SDK in-depth ##

For a more in-depth look at Honolulu extensions SDK sample source code, click [here](extensions-in-depth.md).
