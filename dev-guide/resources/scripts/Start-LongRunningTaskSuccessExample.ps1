<#

.SYNOPSIS
sleeps for 10 seconds then returns a psObject to simulate a long running task

.DESCRIPTION
sleeps for 10 seconds then returns a psObject to simulate a long running task

.ROLE
Readers

#>

Set-StrictMode -Version 5.0

Start-Sleep 10

$result = New-Object PSObject
Add-Member -InputObject $result -MemberType NoteProperty -Name "Name" -Value "TEST"

$result

