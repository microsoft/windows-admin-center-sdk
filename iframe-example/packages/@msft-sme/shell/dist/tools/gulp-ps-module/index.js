'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var gutil = require("gulp-util");
var through2 = require("through2");
var Vinyl = require("vinyl");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-ps-module';
function getDefinition(name, version, guid, functionsList) {
    // tslint:disable:max-line-length
    var definition = "#\n# Module manifest for module '{{Name}}'\n#\n\n@{\n\n# Script module or binary module file associated with this manifest.\nRootModule = '{{Name}}.psm1'\n\n# Version number of this module.\nModuleVersion = '{{Version}}'\n\n# Supported PSEditions\n# CompatiblePSEditions = @()\n\n# ID used to uniquely identify this module\nGUID = '{{Guid}}'\n\n# Author of this module\nAuthor = 'SME'\n\n# Company or vendor of this module\nCompanyName = 'Microsoft'\n\n# Copyright statement for this module\nCopyright = '(c) 2018 Microsoft. All rights reserved.'\n\n# Description of the functionality provided by this module\n# Description = ''\n\n# Minimum version of the Windows PowerShell engine required by this module\nPowerShellVersion = '5.0'\n\n# Name of the Windows PowerShell host required by this module\n# PowerShellHostName = ''\n\n# Minimum version of the Windows PowerShell host required by this module\n# PowerShellHostVersion = ''\n\n# Minimum version of Microsoft .NET Framework required by this module. This prerequisite is valid for the PowerShell Desktop edition only.\n# DotNetFrameworkVersion = ''\n\n# Minimum version of the common language runtime (CLR) required by this module. This prerequisite is valid for the PowerShell Desktop edition only.\n# CLRVersion = ''\n\n# Processor architecture (None, X86, Amd64) required by this module\n# ProcessorArchitecture = ''\n\n# Modules that must be imported into the global environment prior to importing this module\n# RequiredModules = @()\n\n# Assemblies that must be loaded prior to importing this module\n# RequiredAssemblies = @()\n\n# Script files (.ps1) that are run in the caller's environment prior to importing this module.\n# ScriptsToProcess = @()\n\n# Type files (.ps1xml) to be loaded when importing this module\n# TypesToProcess = @()\n\n# Format files (.ps1xml) to be loaded when importing this module\n# FormatsToProcess = @()\n\n# Modules to import as nested modules of the module specified in RootModule/ModuleToProcess\nNestedModules = @()\n\n# Functions to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no functions to export.\nFunctionsToExport = @(\n{{FunctionsList}}\n)\n\n# Cmdlets to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no cmdlets to export.\nCmdletsToExport = @()\n\n# Variables to export from this module\nVariablesToExport = '*'\n\n# Aliases to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no aliases to export.\nAliasesToExport = @()\n\n# DSC resources to export from this module\n# DscResourcesToExport = @()\n\n# List of all modules packaged with this module\n# ModuleList = @()\n\n# List of all files packaged with this module\n# FileList = @()\n\n# Private data to pass to the module specified in RootModule/ModuleToProcess. This may also contain a PSData hashtable with additional module metadata used by PowerShell.\nPrivateData = @{\n\n    PSData = @{\n\n        # Tags applied to this module. These help with module discovery in online galleries.\n        # Tags = @()\n\n        # A URL to the license for this module.\n        # LicenseUri = ''\n\n        # A URL to the main website for this project.\n        # ProjectUri = ''\n\n        # A URL to an icon representing this module.\n        # IconUri = ''\n\n        # ReleaseNotes of this module\n        # ReleaseNotes = ''\n\n    } # End of PSData hashtable\n\n} # End of PrivateData hashtable\n\n# HelpInfo URI of this module\n# HelpInfoURI = ''\n\n# Default prefix for commands exported from this module. Override the default prefix using Import-Module -Prefix.\n# DefaultCommandPrefix = ''\n\n}\n\n";
    // tslint:enable:max-line-length
    // calling {{Name}} twice since it's used two times on the template.
    return definition
        .split('\n')
        .join('\r\n')
        .replace('{{Name}}', name)
        .replace('{{Name}}', name)
        .replace('{{Version}}', version)
        .replace('{{Guid}}', guid)
        .replace('{{FunctionsList}}', functionsList);
}
function gulpPowerShellModule(options) {
    function extendError(pError, error) {
        if (error && (typeof error === 'object')) {
            ['name', 'errno'].forEach(function (property) {
                if (property in error) {
                    // tslint:disable-next-line:no-invalid-this
                    this[property] = error[property];
                }
            }, pError);
        }
        return pError;
    }
    //
    // (Options):
    //
    // name.
    //   name of module: string;
    // version.
    //   version of module: string; (default: 1.0.0)
    // guid.
    //   GUID string of module: string
    //
    // override options settings if not specified.
    options = Object.assign(options || { version: '1.0.0' });
    var scriptCollection = {};
    return through2.obj(
    /**
     * @this {Transform}
     */
    function (file, encoding, callback) {
        var scriptName = file.relative.replace('.ps1', '');
        scriptCollection[scriptName] = file.contents.toString();
        return callback();
    }, 
    /**
     * @this {Flush}
     */
    function (callback) {
        try {
            var contents = '';
            var scriptList = '';
            for (var scriptName in scriptCollection) {
                if (scriptCollection.hasOwnProperty(scriptName)) {
                    contents += 'function ' + scriptName + ' {\r\n';
                    contents += scriptCollection[scriptName];
                    contents += '\r\n}\r\n';
                    scriptList += '\r\n    \'' + scriptName + '\',';
                }
            }
            var psm1File = new Vinyl({
                cwd: './',
                path: options.name + '.psm1',
                contents: new Buffer(contents, 'utf8')
            });
            // tslint:disable-next-line:no-invalid-this
            this.push(psm1File);
            var definition = getDefinition(options.name, options.version, options.guid, scriptList.substr(2, scriptList.length - 3));
            var psd1File = new Vinyl({
                cwd: './',
                path: options.name + '.psd1',
                contents: new Buffer(definition, 'utf8')
            });
            // tslint:disable-next-line:no-invalid-this
            this.push(psd1File);
        }
        catch (e) {
            var error = (!e.plugin || (e.plugin !== PLUGIN_NAME)) ? extendError(new PluginError(PLUGIN_NAME, e.message), e) : e;
            gutil.log(error);
        }
        callback();
    });
}
;
module.exports = gulpPowerShellModule;
//# sourceMappingURL=index.js.map