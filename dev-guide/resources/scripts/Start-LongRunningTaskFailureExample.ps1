<#

.SYNOPSIS
sleeps for 10 seconds then throws a complex exception to simulate a long running task failure

.DESCRIPTION
sleeps for 10 seconds then throws a complex exception to simulate a long running task failure

.ROLE
Readers

#>

Set-StrictMode -Version 5.0

Start-Sleep 10

$ex = new-object System.Exception -ArgumentList @(,"My error message")
$ex.Data["success"] = @("1", "2", "3")
$ex.Data["failed"] = @("4", "5", "6")
throw $ex
