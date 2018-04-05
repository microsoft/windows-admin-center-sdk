function Get-ClusterInventory {
<#

.SYNOPSIS
Retrieves the inventory data for a cluster.

.DESCRIPTION
Retrieves the inventory data for a cluster.

.ROLE
Reader

.COMPONENT
ShellCore

#>

import-module CimCmdlets
$computerSystem = Get-CimInstance Win32_ComputerSystem
$computerName = $computerSystem.DNSHostName
if ($computerName -eq $null) {
    $computerName = $computerSystem.Name
}

## check if cluster cmdlets are installed on this node
$isClusterCmdletAvailable = $false;
if (Get-Command "Get-Cluster" -ErrorAction SilentlyContinue) {
    $isClusterCmdletAvailable = $true;
}

## get cluster info
$cluster = Get-CimInstance -Namespace root/mscluster MSCluster_Cluster
$clusterFqdn = $cluster.fqdn

$isS2dEnabled = $false
if ($cluster.S2DEnabled -eq 1) {
    $isS2dEnabled = $true
}

## check if cluster health cmdlet available on the cluster
$isClusterHealthCmdletAvailable = $false
if (Get-Command -Name "Get-HealthFault" -ErrorAction SilentlyContinue) {
    $isClusterHealthCmdletAvailable = $true
}

## check if britannica (sddc management resources) are available on the cluster
$isBritannicaEnabled = $false;
if (Get-CimInstance -Namespace root/sddc -ClassName __NAMESPACE -ErrorAction SilentlyContinue) {
    $isBritannicaEnabled = $true
}

$result = New-Object PSObject
$result | Add-Member -MemberType NoteProperty -Name 'Fqdn' -Value $clusterFqdn
$result | Add-Member -MemberType NoteProperty -Name 'IsS2DEnabled' -Value $isS2dEnabled
$result | Add-Member -MemberType NoteProperty -Name 'IsClusterHealthCmdletAvailable' -Value $isClusterHealthCmdletAvailable
$result | Add-Member -MemberType NoteProperty -Name 'IsBritannicaEnabled' -Value $isBritannicaEnabled
$result | Add-Member -MemberType NoteProperty -Name 'IsClusterCmdletAvailable' -Value $isClusterCmdletAvailable
$result | Add-Member -MemberType NoteProperty -Name 'CurrentClusterNode' -Value $computerName
$result

}
function Get-ClusterNodes {
<#

.SYNOPSIS
Retrieves the inventory data for cluster nodes in a particular cluster.

.DESCRIPTION
Retrieves the inventory data for cluster nodes in a particular cluster.

.ROLE
Reader

.COMPONENT
ShellCore

#>

import-module CimCmdlets
$cmdletInfo = Get-Command 'Get-ClusterNode' -ErrorAction SilentlyContinue
$isClusterCmdletAvailable = ($cmdletInfo -and $cmdletInfo.Name -eq "Get-ClusterNode")

if ($isClusterCmdletAvailable) {
    $clusterNodes = Get-ClusterNode | Select-Object DrainStatus, DynamicWeight, Name, NodeWeight, FaultDomain, State
}
else {
    $clusterNodes = Get-CimInstance -Namespace root/mscluster MSCluster_Node -ErrorAction Stop
}

$clusterNodeMap = @{}

foreach ($clusterNode in $clusterNodes) {
    $clusterNodeName = $clusterNode.Name
    if ($clusterNode -ne $null) {
        $clusterNodeName = $clusterNodeName.ToLower()
    }

    $clusterNodeFqdn = ([System.Net.Dns]::GetHostEntry($clusterNodeName)).HostName
    $clusterNodeResult = New-Object PSObject
    $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'FullyQualifiedDomainName' -Value $clusterNodeFqdn
    $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'Name' -Value $clusterNodeName
    $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'DynamicWeight' -Value $clusterNode.DynamicWeight
    $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'NodeWeight' -Value $clusterNode.NodeWeight
    $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'FaultDomain' -Value $clusterNode.FaultDomain
    $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'State' -Value $clusterNode.State

    if ($isClusterCmdletAvailable) {
        $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'DrainStatus' -Value $clusterNode.DrainStatus
    }
    else {
        $clusterNodeResult | Add-Member -MemberType NoteProperty -Name 'DrainStatus' -Value $clusterNode.NodeDrainStatus
    }

    $clusterNodeMap.Add($clusterNodeName, $clusterNodeResult)
}

$clusterNodeMap

}
function Get-ServerInventory {
<#

.SYNOPSIS
Retrieves the inventory data for a server.

.DESCRIPTION
Retrieves the inventory data for a server.

.ROLE
Reader

.COMPONENT
ShellCore

#>

import-module CimCmdlets
$isAdministrator = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
$operatingSystem = Get-CimInstance Win32_OperatingSystem
$computerSystem = Get-CimInstance Win32_ComputerSystem

$computerName = $computerSystem.DNSHostName
if ($computerName -eq $null) {
    $computerName = $computerSystem.Name
}

$fqdn = ([System.Net.Dns]::GetHostEntry($computerName)).HostName
$namespaces = Get-CimInstance -Namespace root/microsoft/windows -ClassName __NAMESPACE
$managementToolsAvailable = ($namespaces | Where-Object { $_.Name -ieq "ManagementTools" -or $_Name -ieq "ManagementTools2" }) -ne $null
$serverManagerAvailable = ($namespaces | Where-Object { $_.Name -ieq "ServerManager" }) -ne $null
$isCluster = $false
$clusterFqdn = $null

$isWmfInstalled = $false

$operatingSystemVersion = $OperatingSystem.Version;
$windows2016Version = [Version]'10.0';
$windows2012Version = [Version]'6.2';

if ($operatingSystemVersion -ge $windows2016Version) {
    # It's okay to assume that 2016 and up comes with WMF 5 or higher installed
    $isWmfInstalled = $true;
}
elseif ($operatingSystemVersion -ge $windows2012Version) {
    # Windows 2012/2012R2 are supported as long as WMF 5 or higher is installed
    $registryKey = 'HKLM:\SOFTWARE\Microsoft\PowerShell\3\PowerShellEngine';
    $registryKeyValue = Get-ItemProperty -Path $registryKey -Name PowerShellVersion -ErrorAction SilentlyContinue;
    if ($registryKeyValue -and ($registryKeyValue.Length -ne 0)) {
        $installedWmfVersion = [Version]$registryKeyValue.PowerShellVersion;
        if ($installedWmfVersion -ge [Version]'5.0') {
            $isWmfInstalled = $true;
        }
    }
}

$isTsdbEnabled = $false;
if (Get-Command "Get-HealthMetric" -ErrorAction SilentlyContinue) {
    $isTsdbEnabled = $true;
}

$getVmCommand = Get-Command "Get-VM" -ErrorAction SilentlyContinue
$isHyperVPowershellInstalled = $getVmCommand -and $getVmCommand.Name -eq "Get-VM"

$vmmsService = Get-Service -Name "VMMS" -ErrorAction SilentlyContinue;
$isHyperVRoleInstalled = $vmmsService -and $vmmsService.Name -eq "VMMS"

try {
    $cluster = Get-CimInstance -Namespace root/mscluster MSCluster_Cluster -ErrorAction Stop
    $isCluster = $true
    $clusterFqdn = $cluster.fqdn
}
catch {
    ## ignore if namespace is not available.
}

$result = New-Object PSObject
$result | Add-Member -MemberType NoteProperty -Name 'IsAdministrator' -Value $isAdministrator
$result | Add-Member -MemberType NoteProperty -Name 'OperatingSystem' -Value $operatingSystem
$result | Add-Member -MemberType NoteProperty -Name 'ComputerSystem' -Value $computerSystem
$result | Add-Member -MemberType NoteProperty -Name 'Fqdn' -Value $fqdn
$result | Add-Member -MemberType NoteProperty -Name 'IsManagementToolsAvailable' -Value $managementToolsAvailable
$result | Add-Member -MemberType NoteProperty -Name 'IsServerManagerAvailable' -Value $serverManagerAvailable
$result | Add-Member -MemberType NoteProperty -Name 'IsCluster' -Value $isCluster
$result | Add-Member -MemberType NoteProperty -Name 'ClusterFqdn' -Value $clusterFqdn
$result | Add-Member -MemberType NoteProperty -Name 'IsWmfInstalled' -Value $isWmfInstalled
$result | Add-Member -MemberType NoteProperty -Name 'IsTsdbEnabled' -Value $isTsdbEnabled
$result | Add-Member -MemberType NoteProperty -Name 'IsHyperVRoleInstalled' -Value $isHyperVRoleInstalled
$result | Add-Member -MemberType NoteProperty -Name 'IsHyperVPowershellInstalled' -Value $isHyperVPowershellInstalled
$result

}
function Get-CimFindProcessWithName {
<#

.SYNOPSIS
Gets Registry Value.

.DESCRIPTION
Gets Registry Value.

.ROLE
Administrator

.COMPONENT
Core

#>

Param(
[string]$Name
)

Get-CimInstance -Namespace root/cimv2 -Query "Select * from Win32_Process where Name='$Name'"

}
function Get-CimRegistryKey {
<#

.SYNOPSIS
Gets Registry Key instance.

.DESCRIPTION
Gets Registry Key instance.

.ROLE
Administrator

.COMPONENT
Core

#>

Param(
[string]$Name
)

$keyInstance = New-CimInstance -Namespace root/microsoft/windows/managementtools -ClassName MSFT_MTRegistryKey -Key @('Name') -Property @{Name=$Name;} -ClientOnly
Get-CimInstance $keyInstance

}
function Get-CimRegistryValue {
<#

.SYNOPSIS
Gets Registry Value.

.DESCRIPTION
Gets Registry Value.

.ROLE
Administrator

.COMPONENT
Core

#>

Param(
[string]$Name
)

Invoke-CimMethod -Namespace root/microsoft/windows/managementtools -ClassName MSFT_MTRegistryValue -MethodName GetValue -Arguments @{Name=$Name;}

}
function Get-CimRegistryValuesOnKey {
<#

.SYNOPSIS
Gets Registry Values on a registry key.

.DESCRIPTION
Gets Registry Values on a registry key.

.ROLE
Administrator

.COMPONENT
Core

#>

Param(
[string]$Name
)

$keyInstance = New-CimInstance -Namespace root/microsoft/windows/managementtools -ClassName MSFT_MTRegistryKey -Key @('Name') -Property @{Name=$Name;} -ClientOnly
Invoke-CimMethod $keyInstance -MethodName GetValues

}
function Get-CimWin32ComputerSystem {
<#

.SYNOPSIS
Gets Win32_ComputerSystem object.

.DESCRIPTION
Gets Win32_ComputerSystem object.

.ROLE
Reader

.COMPONENT
ShellCore

#>


Get-CimInstance -Namespace root/cimv2 -ClassName Win32_ComputerSystem

}
function Get-CimWin32LogicalDisk {
<#

.SYNOPSIS
Gets Win32_LogicalDisk object.

.DESCRIPTION
Gets Win32_LogicalDisk object.

.ROLE
Reader

.COMPONENT
ShellCore

#>


Get-CimInstance -Namespace root/cimv2 -ClassName Win32_LogicalDisk

}
function Get-CimWin32NetworkAdapter {
<#

.SYNOPSIS
Gets Win32_NetworkAdapter object.

.DESCRIPTION
Gets Win32_NetworkAdapter object.

.ROLE
Reader

.COMPONENT
ShellCore

#>


Get-CimInstance -Namespace root/cimv2 -ClassName Win32_NetworkAdapter

}
function Get-CimWin32OperatingSystem {
<#

.SYNOPSIS
Gets Win32_OperatingSystem object.

.DESCRIPTION
Gets Win32_OperatingSystem object.

.ROLE
Reader

.COMPONENT
ShellCore

#>


Get-CimInstance -Namespace root/cimv2 -ClassName Win32_OperatingSystem

}
function Get-CimWin32PhysicalMemory {
<#

.SYNOPSIS
Gets Win32_PhysicalMemory object.

.DESCRIPTION
Gets Win32_PhysicalMemory object.

.ROLE
Reader

.COMPONENT
ShellCore

#>


Get-CimInstance -Namespace root/cimv2 -ClassName Win32_PhysicalMemory

}
function Get-CimWin32Processor {
<#

.SYNOPSIS
Gets Win32_Processor object.

.DESCRIPTION
Gets Win32_Processor object.

.ROLE
Reader

.COMPONENT
ShellCore

#>


Get-CimInstance -Namespace root/cimv2 -ClassName Win32_Processor

}
function New-CimRegistryStringValue {
<#

.SYNOPSIS
New Registry String Value.

.DESCRIPTION
New Registry String Value.

.ROLE
Administrator

.COMPONENT
Core

#>

Param(
[string]$Name,
[string]$Data,
[System.Uint32]$Type
)

New-CimInstance -Namespace root/microsoft/windows/managementtools -ClassName MSFT_MTRegistryString -Key @('Name') -Property @{Name=$Name;Data=$Data;Type=$Type;}

}
function Remove-CimRegistryStringValue {
<#

.SYNOPSIS
Removes Registry Value.

.DESCRIPTION
Removes Registry Value.

.ROLE
Administrator

.COMPONENT
Core

#>

Param(
[string]$Name
)

$instance = New-CimInstance -Namespace root/microsoft/windows/managementtools -ClassName MSFT_MTRegistryString -Key @('Name') -Property @{Name=$Name;} -ClientOnly
Remove-CimInstance $instance

}
function Set-CimRegistryStringValue {
<#

.SYNOPSIS
Sets Registry Value.

.DESCRIPTION
Sets Registry Value.

.ROLE
Administrator

.COMPONENT
Core

#>

Param(
[string]$Name,
[string]$Data
)

$instance = New-CimInstance -Namespace root/microsoft/windows/managementtools -ClassName MSFT_MTRegistryString -Key @('Name') -Property @{Name=$Name;} -ClientOnly
$instance = Get-CimInstance $instance

$instance.Data=$Data
Set-CimInstance $instance

}
