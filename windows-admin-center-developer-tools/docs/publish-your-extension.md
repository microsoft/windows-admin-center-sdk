# Publishing an Extension

At this time, Tool and Solution extensions are the only extensions that support publishing.  Extensions are deployed to an accessible NuGet feed (either public or private to your organization), and then configured within Honolulu.

## Build your extension website

If you use the Honolulu build tools, this is everything inside the “bundle” directory of your repository after running ‘gulp build’. At a bare minimum, you must have a correctly declared manifest.json, index.html (the entry point to your extension), and correctly interface with the Honolulu core APIs. Other than the manifest, these come for free if you’re using the Honolulu libraries.

## Create nuspec file

Extensions are deployed as NuGet packages. The first step is to author a nuspec file that declares the contents of your extension package. The structure is very simple. Working from the example nuspec (see below), there are only a few requirements. 

The ‘id’ field is the extension’s name. Best practice is that this matches the “name” field in the manifest file. It must be a valid nuget package name.
Version is the package’s version. Using SemVer conventions is recommended but not required.
Authors, owners, copyright, and tags are metadata used by nuget and displayed from the Honolulu package manager.

The file declaration illustrates the only requirement for the structure of a package. All of the extension website contents must be packaged into a folder called “ux”. In the example nuspec we assume that the site contents are built under the “bundle” folder at the root of the repository.

```
<?xml version="1.0"?>
<package>
  <metadata>
    <id>contoso.example</id>
    <version>0.1.0</version>
    <authors>Contoso Corp</authors>
    <owners>Contoso Corp</owners>
    <description>Example Description</description>
    <copyright>Copyright 2017</copyright>
    <tags>Keywords go here </tags>
  </metadata>
  <files>
    <file src="bundle\**\*.*" target="ux" />
  </files>
</package>
```

## Package extension

This is accomplished by running “nuget pack my_extension.nuspec” which creates the extension nupkg file. 

## Publish extension 

Now that there’s a package, it needs to be published somewhere. The simplest solution is to use a fileshare that contains the nupkg files that you’d like to distribute. Honolulu does not (yet) support package sources that require credential providers, so fileshares offer the easiest way to control permissions. For other options, see: https://docs.microsoft.com/en-us/nuget/hosting-packages/overview. The exact steps to publish the extension package will vary depending on which hosting solution is used.

## Consume the extension from Honolulu

From the Honolulu home page, go to settings (top right corner), then “manage extensions”, and then “settings.” From there, supply the nuget package feed uri that you would like to use (a file share should be formatted like \\my-share\directory-containing-extensions). If your gateway is running on a windows 10 machine, you may be prompted to elevate first. Once this step is completed, your extensions should appear under “available extensions.”
