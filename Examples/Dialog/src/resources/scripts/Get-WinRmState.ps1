<#

.SYNOPSIS
Checks for WimRM service every 2 seconds, 30 times.

.DESCRIPTION
Checks for WimRM service every 2 seconds, 30 times.

.ROLE
Readers

#>

Write-Progress -Activity "Running" -PercentComplete 0
1..30 | ForEach-Object {
    Start-Sleep 2
    $p = [math]::floor($_/30 * 100)
    Write-Progress -Activity "Running" -PercentComplete $p
    Get-Service winrm
}