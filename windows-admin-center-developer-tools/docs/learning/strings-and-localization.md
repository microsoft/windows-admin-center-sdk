#Learning about Windows Admin Center Extensions: Strings and Localization

Let’s go more in-depth into the Windows Admin Center Extensions SDK.  In this document, we’ll cover strings and localization.

## Strings and Localization

In order to enable localization on all strings that are rendered on the presentation layer, you should take advantage of the already set up "strings.resjson".  This file can be found under "/src/resources/strings".  When you need to add a new string to your extension, open up this resjson file and add a new entry.  The existing structure follows this format:

``` ts
"<YourExtensionName>_<Component>_<Accessor>": "Your string value goes here.",
```

You can use any format you like, just be aware that the generation process (the process that takes the resjson and outputs the usable TypeScript class) will convert underscore to periods.

Example:
``` ts
"HelloWorld_cim_title": "CIM Component",
```
will generate the following accessor structure:
``` ts
MsftSme.resourcesStrings<Strings>().HelloWorld.cim.title;
```

##Generating Localization

More information about generating localization will be available here soon.