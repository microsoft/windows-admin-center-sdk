# Project Honolulu - Solution Extension #

A solution extension is the top level UI building blocks that compose the foundation for Honolulu.  When you open up the application for the first time, the Connections page is an example of a Solution.  If you click the carrot in the Project Honolulu header, the drop down is full of other solutions including Server Manager, Computer Management, Failover Cluster Manager, Hyper-Converged Cluster Manager.  The Extension Manager is another good example of a solution.  
Another way to think of them is: tools are included in Solutions, while Solutions are made up of individual tools.  This document will walk you through how to configure your extension to be a solution.

## Solution Manifest Changes ##

All of the changes required to configure your extension as a Solution are confined to the manifest.json file in {extension root}\src.  

Open up the manifest file and find the "entryPoints" array, the first (currently only) entry has an "entryPointType" of "tool".  This designates the extension as a tool that will be loaded in the tools menu on a solution.  In order to make a solution, we need to change this value to "solution".  You will also need to update the "name" and "urlName" properties.

The next property that needs to be changed is "rootNavigationBehavior".  This propery has two valid values: "connections" or "path".  The "connections" behavior is detailed later in the documentation.

### path as a rootNavigationBehavior ###

Set the value to "path", and then delete the "requirements" property, and leave the "path" property as an empty string.  You have have completed the minimal required configuration to build a solution extension.  Save the file, and gulp build -> gulp serve as you would a tool, and then side load the extension into your local Honolulu extension.

A valid manifest entryPoints array looks like this:
```
    "entryPoints": [
        {
          "entryPointType": "solution",
          "name": "main",
          "urlName": "testsln",
          "displayName": "resources:strings:displayName",
          "description": "resources:strings:description",
          "icon": "sme-icon:icon-win-powerShell",
          "path": "",
          "rootNavigationBehavior": "path"
        }
    ],
```

Tools built with this kind of structure will not required connections to load, but won't have node connectivity functionality either.

### connections as a rootNavigationBehavior ###

When you set the rootNavigationBehavior property to "connections", you are telling the Honolulu Shell that there will be a connected node (always a server of some sorts) that it should connect to, and verify connection status.  With this, there are 2 steps in verifying connection.  1) Honolulu will attempt to make an attempt to log into the node with your credentials (for establishing the remote PowerShell session), and 2) it will execute the PowerShell script you provide to identify if the node is in a connectable state.

A valid solution definition with connections will look like this:

``` json
        {
          "entryPointType": "solution",
          "name": "example",
          "urlName": "solutionexample",
          "displayName": "resources:strings:displayName",
          "description": "resources:strings:description",
          "icon": "sme-icon:icon-win-powerShell",
          "rootNavigationBehavior": "connections",
          "connections": {
            "header": "resources:strings:connectionsListHeader",
            "connectionTypes": [
                "msft.sme.connection-type.example"
                ]
            },
            "tools": {
                "enabled": false,
                "defaultTool": "solution"
            }
        },
```

When the rootNavigationBehavior is set to "connections" you are required to build out the connections definition in the  manifest.  This inclued the "header" property (will be used to display in your solution header when a user selects it from the menu), a connectionTypes array (this will specify which connectionTypes are used in the solution.  More on that in the connectionProvider documentation.).

### Enabling and disabling the tools menu ###

The final property to talk about in the solution definition is the "tools" property.  This will dictate if the tools menu is displayed, as well as the tool that will be loaded.  When enabled, Honolulu will render the left hand tools menu.  With defaultTool, it is required that you add a tool entry point to the manifest in order to load the appropriate resources.  The value of "defaultTool" needs to be the "name" property of the tool as it is defined in the manifest.

## Connections and Connection Providers ##

Connections and Connection Providers can be found [here](connection-provider.md).