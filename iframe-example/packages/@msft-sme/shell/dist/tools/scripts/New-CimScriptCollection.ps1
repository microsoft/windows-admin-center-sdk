<#

.SYNOPSIS
Create CIM Scripts to replace CIM query by CIM cmdlet calls based on parameter provided.

.DESCRIPTION
Create CIM Scripts to replace CIM query by CIM cmdlet calls based on parameter provided.

#>

Param(
    [string]$TargetPath,
    [object]$ScriptCollection
)
function New-CimScript() {
    Param(
        [string]$targetPath,
        [object]$mapData
    )
   
    $bodySection = new-object -type System.Collections.ArrayList
    $commentSection = new-object -type System.Collections.ArrayList
    $commentSection.AddRange(@(
            "<#",
            "",
            ".SYNOPSIS",
            $mapData.Description,
            "",
            ".DESCRIPTION",
            $mapData.Description,
            "",
            ".ROLE",
            $mapData.Role,
            "",
            ".COMPONENT"))
    $commentSection.AddRange($mapData.Components)
    $commentSection.AddRange(@(
            "",
            "#>"))
    
    switch -regex ($mapData.Type) {
        "getInstanceMultiple|getBatchInstanceMultiple" {
            ## namespace the cim namespace.
            ## className the class name.
            $paramSection = new-object -type System.Collections.ArrayList
            $line = "Get-CimInstance -Namespace $($mapData.Namespace) -ClassName $($mapData.ClassName)"
            $bodySection.Add($line) | Out-Null
            break;
        }
        "getInstanceSingle|getBatchInstanceSingle" {
            ## namespace the cim namespace.
            ## lassName the class name.
            ## keyProperties the key properties object
            $parameters = Get-KeyArgumentsParameters -mapData $mapData
            $paramSection = $parameters.ParamSection
            $line = "`$keyInstance = New-CimInstance -Namespace $($mapData.Namespace) -ClassName $($mapData.ClassName)"
            $line += " -Key @($($parameters.KeyLine)) -Property @{$($parameters.PropertyLine)} -ClientOnly"
            $bodySection.Add($line) | Out-Null
            $line = "Get-CimInstance `$keyInstance"
            $bodySection.Add($line) | Out-Null
            break;
        }
        "invokeMethodInstance|invokeBatchMethodInstance" {
            ## namespace the cim namespace.
            ## className the class name.
            ## methodName the method name.
            ## keyProperties the key properties object.
            ## data the method input data.
            $parameters = Get-KeyArgumentsParameters -mapData $mapData
            $paramSection = $parameters.ParamSection
            $line = "`$keyInstance = New-CimInstance -Namespace $($mapData.Namespace) -ClassName $($mapData.ClassName)"
            $line += " -Key @($($parameters.KeyLine)) -Property @{$($parameters.PropertyLine)} -ClientOnly"
            $bodySection.Add($line) | Out-Null
            $line = "Invoke-CimMethod `$keyInstance -MethodName $($mapData.MethodName)"
            if ($parameters.ArgumentsLine -ne $null) {
                $line += " -Arguments @{$($parameters.ArgumentsLine)}"
            }

            $bodySection.Add($line) | Out-Null
            break;
        }
        "invokeMethodStatic|invokeBatchMethodStatic" {
            ## namespace the cim namespace.
            ## className the class name.
            ## methodName the method name.
            ## data the method input data.
            $parameters = Get-KeyArgumentsParameters -mapData $mapData
            $paramSection = $parameters.ParamSection
            $line = "Invoke-CimMethod -Namespace $($mapData.Namespace) -ClassName $($mapData.ClassName)"
            $line += " -MethodName $($mapData.MethodName)"
            if ($parameters.ArgumentsLine -ne $null) {
                $line += " -Arguments $($parameters.ArgumentsLine)"
            }

            $bodySection.Add($line) | Out-Null
            break;
        }
        "setInstance|setBatchInstance" {
            ## namespace the cim namespace.
            ## lassName the class name.
            ## keyProperties the key properties object.
            ## data the method input data.
            $parameters = Get-KeyArgumentsParameters -mapData $mapData
            $paramSection = $parameters.ParamSection
            $line = "New-CimInstance -Namespace $($mapData.Namespace) -ClassName $($mapData.ClassName)"
            $line += " -Key @($($parameters.KeyLine)) -Property @{$($parameters.PropertyLine)$($parameters.ArgumentsLine)}"
            $bodySection.Add($line) | Out-Null
            break;
        }
        "modifyInstance|modifyBatchInstance" {
            ## namespace the cim namespace.
            ## className the class name.
            ## keyProperties the key properties object.
            ## data the method input data.
            $parameters = Get-KeyArgumentsParameters -mapData $mapData
            $paramSection = $parameters.ParamSection
            $line = "`$instance = Get-CimInstance -Namespace $($mapData.Namespace) -ClassName $($mapData.ClassName)"
            $line += " -Key @($($parameters.KeyLine)) -Property @{$($parameters.PropertyLine)}"
            $bodySection.Add($line) | Out-Null
            $bodySection.AddRange($parameters.UpdateSection) | Out-Null
            $line = "Set-CimInstance `$instance"
            $bodySection.Add($line) | Out-Null
            break;
        }
        "deleteInstance|deleteBatchInstance" {
            ## namespace the cim namespace.
            ## className the class name.
            ## keyProperties the key properties object.
            $parameters = Get-KeyArgumentsParameters -mapData $mapData
            $paramSection = $parameters.ParamSection
            $line = "Remove-CimInstance -Namespace $($mapData.Namespace) -ClassName $($mapData.ClassName)"
            $line += " -Key @($($parameters.KeyLine)) -Property @{$($parameters.PropertyLine)}"
            $bodySection.Add($line) | Out-Null
        }
        "getInstanceQuery|getBatchInstanceQuery" {
            ## namespace the cim namespace.
            ## query the WQL string.
            $parameters = Get-KeyArgumentsParameters -mapData $mapData
            $paramSection = $parameters.ParamSection
            $line = "Get-CimInstance -Namespace $($mapData.Namespace) -Query ""$($mapData.Query)"""
            $bodySection.Add($line) | Out-Null
        }
    }

    $content = new-object -type System.Collections.ArrayList
    $content.AddRange($commentSection) | Out-Null
    $content.Add("") | Out-Null
    $content.AddRange($paramSection) | Out-Null
    $content.Add("") | Out-Null
    $content.AddRange($bodySection) | Out-Null
    $path = "$targetPath\$($mapData.Name).ps1"
    Write-Host $path -BackgroundColor Blue
    Set-Content -Path $path -Value $content -Encoding UTF8
}

function Get-KeyArgumentsParameters {
    Param(
        [object]$mapData
    )

    $paramSection = new-object -type System.Collections.ArrayList
    $paramSection.Add("Param(") | Out-Null

    if ($mapData.KeyProperties -ne $null) {
        $keyLine = ""
        $keySeparator = ""
        $propLine = ""
        foreach ($key in $mapData.KeyProperties) {
            $paramSection.Add("[$($key.Type)]`$$($key.Name)") | Out-Null
            $keyLine += "$keySeparator'$($key.Name)'"
            $propLine += "$($key.Name)=`$$($key.Name);"
            $keySeparator = ","
        }
    }


    $updateSection = new-object -type System.Collections.ArrayList
    $updateSection.Add("") | Out-Null
    if ($mapData.Arguments -ne $null) {
        $dataLine = ""
        foreach ($data in $mapData.Arguments) {
            $paramSection.Add("[$($data.Type)]`$$($data.Name)") | Out-Null
            $dataLine += "$($data.Name)=`$$($data.Name);"
            $updateSection.Add("`$instance.$($data.Name)=`$$($data.Name)") | Out-Null
        }
    }

    if ($paramSection.Count -gt 2) {
        for ($i = 1; $i -lt $paramSection.Count - 1; $i++) {
            $paramSection[$i] += ","
        }
    }

    $paramSection.Add(")") | Out-Null
    return @{
        Keyline       = $keyLine;
        PropertyLine  = $propLine;
        ArgumentsLine = $dataLine;
        UpdateSection = $updateSection;
        ParamSection  = $paramSection;
    }
}

if (-not (Test-Path $TargetPath)) {
    new-item -Path $TargetPath -ItemType Directory | Out-Null
}

foreach ($mapData in $scriptCollection) {
    New-CimScript -TargetPath $TargetPath -MapData $mapData
}
