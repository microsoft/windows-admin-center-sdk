<#

.SYNOPSIS
Example script that will throw an exception after a specified time.

.DESCRIPTION
Example script that will throw an exception after a specified time.

.ROLE
Readers

#>

Param
(
    [Parameter(Mandatory = $true)]
    [int]$wait
)

Write-Progress -Activity "Running" -PercentComplete 50
Start-Sleep $wait
throw "=== Exception Exception Exception === ($wait)"

