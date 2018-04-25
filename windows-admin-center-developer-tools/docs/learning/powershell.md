# Learning about Windows Admin Center Extensions: Powershell
Let’s go more in-depth into the Windows Admin Center Extensions SDK.  In this document, we’ll cover adding PowerShell commands to your extension.

## PowerShell in TypeScript
The gulp build process has a generate step that will take any ".ps1" that is placed in the "/src/resources/scripts" folder, and build them into the "powershell-scripts" class under "/src/generated" folder.  Please note that you should not manually update the "powershell-scripts.ts" nor the "strings.ts" files becaue they will be overwritten on the next generate.

### Adding your own PowerShell script
More information about adding your own PowerShell script will be available here soon.

### PowerShell Session Management
When working with PowerShell in Honolulu, sessions are a required component of the script execution process.  In order to execute scripts on remote managed servers, PowerShell makes use of runspaces.  Honolulu has encompassed the runspace creation and management in a PowerShellSession object to manage lifetime, and enable runspace reuse for sequential script execution.

Every component will need to create a reference to a session object that is created by the AppContextService class using three different options:

``` ts
this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName);
```
By just providing the node name to the createSession method, a new PowerShell session will be created, used, and then immediately destroyed upon completion of the PowerShell call.  This functionality is good for one off calls, but repeated use is discouraged for performance reasons.  A session takes approximately 1 second to create, so continuous recycling of sessions can create execution slowdowns.

``` ts
this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName, '<session key>');
```
The first optional parameter is the "key" parameter.  This will create a keyed session that can be looked up, and reused, even across components (meaning that Component1 can create a session with key "SME-ROCKS" and Component2 can utilize that same session for execution).  

``` ts
this.psSession = this.appContextService.powerShell.createSession(this.appContextService.activeConnection.nodeName, '<session key>', <PowerShellSessionRequestOptions>);
```

### Common Patterns
It is most common to create a keyed session in the ngOnInit method, and then dispose of it in an ngOnDestroy.  This pattern is used where there are mutliple PowerShell scripts executed in a component but the underlying session IS NOT shared across components.

It is also recommended to make sure session creation is managed inside of Components rather than services to ensure that lifetime and cleanup can be managed properly.  