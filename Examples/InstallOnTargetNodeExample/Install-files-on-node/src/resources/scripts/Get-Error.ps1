<#

.SYNOPSIS
Example script that will return an error after a specified time.

.DESCRIPTION
Example script that will return an error after a specified time.

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
Write-Error "=== Error Error Error === ($wait)"

