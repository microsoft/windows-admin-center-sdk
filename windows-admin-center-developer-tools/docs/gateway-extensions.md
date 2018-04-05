# Project Honolulu Extensions: Gateway Extensions
Gateway extensions are modules that are written and loaded into the Honolulu Gateway service at runtime.  With the previous extensions, we were writing UI based components, but the Gateway Extensions are more of an API extension than anything else.  These modules will be loaded into a seperate AppDomain from the existing gateway process, but use the same level of elevation for rights.

Currently the Honolulu appliation comes pre-packaged with two extensions, one for executing PowerShell commands, and the other for executing CIM / WMI commands.

## Developing a Gateway Extension
There are two basic requirements for any code that will be hosted as an extension:
1) It needs to inherit from MarshalByRefObject from the System namespace to allow marshalling across app domains.
2) It needs to implement the IFeature interface from the Microsoft.ManagementExperience.FeatureInterfaces namespace.

An example extension can be found in the SampleFeature folder.

Once you have implemented your extension, the next step is to get it loaded in the Gateway process.  By default the Gateway process looks for all plugins in a "plugins" folder in the Application Data folder of the current machine (using the CommonApplicationData value of the Environment.SpecialFolder enumearation, on Windows 10 this correlates to: C:\ProgramData\Server Management Experience).  You can override this behavior by updating the "StaticsFolder" configuration value.  If you're debugging locally, this setting is in the App.Config of the Desktop solution.  This override will only work if running a debug build.

Inside the plugins folder (C:\ProgramData\Server Management Experience\plugins), create a new folder whos name matches the Name property value of the Feature that you implemented.  Inside the new folder, place your new Feature DLL, and restart the Honolulu process.  Once the process starts up again, you will be able to exercise the code by issuing a GET, PUT, PATCH, DELETE, or POST to http(s)://<domain / localhost>/api/nodes/{node}/features/{feature name}/{identifier}

## Testing a Gateway Extension
In order to debug an extension you will need to make sure the feature DLL has be copied to the appropriate "plugins" directory mentioned above.  Start Visual Studio (2017), and then click the Debug menu and select "Attach to Process".  In the next window, scroll through the Available Processes list and select SMEDesktop.exe, and then click "Attach".  Once the debugger starts, you can place a breakpoint in your feature code and then exercise through the above url format.  For our Sample Feature (feature name: "Sample Uno") the url is: "http://localhost:6516/api/nodes/fake-server.my.domain.com/features/Sample Uno".

## Deploying a Gateway Extension
Publishing extensions will be available in the future.  At this point in time you will need to manually move the DLL as detailed above.