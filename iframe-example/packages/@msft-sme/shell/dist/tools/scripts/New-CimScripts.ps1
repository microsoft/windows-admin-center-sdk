<#

.SYNOPSIS
Create CIM Scripts to replace CIM query by CIM cmdlet calls based on parameter provided.

.DESCRIPTION
Create CIM Scripts to replace CIM query by CIM cmdlet calls based on parameter provided.

.EXAMPLE
cd <repo_root>
powershell .\tools\script\New-CimScripts.ps1

#>

$TargetPath = ".\src\resources\scripts"
$ScriptCollection = @(
    @{
        Name        = "Get-CimWin32ComputerSystem";
        Description = "Gets Win32_ComputerSystem object.";
        Role        = "Reader";
        Components  = @("ShellCore");
        Type        = "getInstanceMultiple";
        Namespace   = "root/cimv2";
        ClassName   = "Win32_ComputerSystem";
    },
    @{
        Name        = "Get-CimWin32Processor";
        Description = "Gets Win32_Processor object.";
        Role        = "Reader";
        Components  = @("ShellCore");
        Type        = "getInstanceMultiple";
        Namespace   = "root/cimv2";
        ClassName   = "Win32_Processor";
    },
    @{
        Name        = "Get-CimWin32PhysicalMemory";
        Description = "Gets Win32_PhysicalMemory object.";
        Role        = "Reader";
        Components  = @("ShellCore");
        Type        = "getInstanceMultiple";
        Namespace   = "root/cimv2";
        ClassName   = "Win32_PhysicalMemory";
    },
    @{
        Name        = "Get-CimWin32LogicailDisk";
        Description = "Gets Win32_LogicalDisk object.";
        Role        = "Reader";
        Components  = @("ShellCore");
        Type        = "getInstanceMultiple";
        Namespace   = "root/cimv2";
        ClassName   = "Win32_LogicalDisk";
    },
    @{
        Name        = "Get-CimWin32NetworkAdapter";
        Description = "Gets Win32_NetworkAdapter object.";
        Role        = "Reader";
        Components  = @("ShellCore");
        Type        = "getInstanceMultiple";
        Namespace   = "root/cimv2";
        ClassName   = "Win32_NetworkAdapter";
    }
    <#
 Sample definition for each type.

    @{
        Name          = "Get-RegistryKey";
        Description   = "Gets Registry Key instance.";
        Role          = "Administrator";
        Components    = @("Core");
        Type          = "getInstanceSingle";
        Namespace     = "root/microsoft/windows/managementtools";
        ClassName     = "MSFT_MTRegistryKey";
        KeyProperties = @(
            @{
                Name = "Name";
                Type = "string";
            })
    },
    @{
        Name          = "Get-RegistryValuesOnKey";
        Description   = "Gets Registry Values on a registry key.";
        Role          = "Administrator";
        Components    = @("Core");
        Type          = "invokeMethodInstance";
        Namespace     = "root/microsoft/windows/managementtools";
        ClassName     = "MSFT_MTRegistryKey";
        MethodName    = "GetValues";
        KeyProperties = @(
            @{
                Name = "Name";
                Type = "string";
            });
        Arguments     = @(
            @{
                Name = "Data";
                Type = "object";
            }
        )
    },
    @{
        Name        = "Get-RegistryValue";
        Description = "Gets Registry Value.";
        Role        = "Administrator";
        Components  = @("Core");
        Type        = "invokeMethodStatic";
        Namespace   = "root/microsoft/windows/managementtools";
        ClassName   = "MSFT_MTRegistryValue";
        MethodName  = "GetValue";
        Arguments   = @(
            @{
                Name = "Name";
                Type = "string";
            }
        )
    },
    @{
        Name          = "New-RegistryStringValue";
        Description   = "New Registry String Value.";
        Role          = "Administrator";
        Components    = @("Core");
        Type          = "setInstance";
        Namespace     = "root/microsoft/windows/managementtools";
        ClassName     = "MSFT_MTRegistryString";
        KeyProperties = @(
            @{
                Name = "Name";
                Type = "string";
            });
        Arguments     = @(
            @{
                Name = "Data";
                Type = "string";
            },
            @{
                Name  = "Type";
                Type  = "System.Uint32";
                Value = 1;
            }
        )
    },
    @{
        Name          = "Set-RegistryStringValue";
        Description   = "Sets Registry Value.";
        Role          = "Administrator";
        Components    = @("Core");
        Type          = "modifyInstance";
        Namespace     = "root/microsoft/windows/managementtools";
        ClassName     = "MSFT_MTRegistryString";
        KeyProperties = @(
            @{
                Name = "Name";
                Type = "string";
            });
        Arguments     = @(
            @{
                Name = "Data";
                Type = "string";
            });
    },
    @{
        Name          = "Remove-RegistryStringValue";
        Description   = "Removes Registry Value.";
        Role          = "Administrator";
        Components    = @("Core");
        Type          = "deleteInstance";
        Namespace     = "root/microsoft/windows/managementtools";
        ClassName     = "MSFT_MTRegistryString";
        KeyProperties = @(
            @{
                Name = "Name";
                Type = "string";
            });
    },
    @{
        Name          = "Get-RegistryStringValueCustom";
        Description   = "Gets Registry Value.";
        Role          = "Administrator";
        Components    = @("Core");
        Type          = "getInstanceQuery";
        Namespace     = "root/cimv2";
        Query         = "Select * from Win32_Process where Name='`$Name'";
        Arguments = @(
            @{
                Name = "Name";
                Type = "string";
            });
    }
#>
)

.\tools\scripts\New-CimScriptCollection.ps1 -TargetPath $TargetPath -ScriptCollection $ScriptCollection