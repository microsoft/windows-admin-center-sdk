 <#

.SYNOPSIS
Returns a specific service.

.DESCRIPTION
Returns a specific service.

.ROLE
Readers

#>

Param
(
     [Parameter(Mandatory = $true)]
     [string]$name
)

Get-Service -Name $name