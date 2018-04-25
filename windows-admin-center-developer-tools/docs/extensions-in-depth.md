# Windows Admin Center Extensions: In Depth

Let’s go more in-depth into the Windows Admin Center Extensions SDK.  In this document, we’ll cover routing, strings and localization, and incorporating PowerShell into your extension.

## Tools and Languages Used

Windows Admin Center is built with languages including Angular and TypeScript for the web stack, and C# for service mode modules, and tools including Node, and Gulp.  For an in-depth look at languages and tools used, click [here](tools-and-languages.md).

## Project Structure

For a walkthrough of how the code in our sample API module is structured, click [here](project-structure.md).

## Routing

Honolulu uses Angular Routing, with lazy loading to reduce bandwidth and increase responsiveness.  To learn more about Routing in Honolulu, click [here](learning/routing.md).

## Strings and Localization

To learn more about localizing strings that are rendered on the presentation layer in Honolulu, click [here](learning/strings-and-localization.md).

## Writing PowerShell

Honolulu has been designed so that custom PowerShell scripts can be incorporated into extension to extend functionality to nodes that are configured and managed by the extension.  To learn more about incorporating PowerShell into your extension, click [here](learning/powershell.md).
