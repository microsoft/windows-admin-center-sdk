<#

.SYNOPSIS
Search non ascii code in ps1 files.

.DESCRIPTION
Search non ascii code in ps1 files.

#>

$files = get-childitem -Path *.ps1 -Recurse


foreach ($file in $files) {
    $content = Get-Content $file
    $i = 0
    foreach ($line in $content) {
        $i++
        $chars = $line.ToCharArray()
        for ($j = 0; $j -lt $chars.Count; $j++) {
            $char = $chars[$j]
            [System.Int32]$code = $char
            if ($code -gt 0x7f) {
                $point = ""
                if ($j -gt 0) {
                    1..$j | %{ $point += " " }
                }

                Write-Host -ForegroundColor Yellow "File: $($file.FullName), Line: $i, Position: $j, Char: '$char'"
                Write-Host -ForegroundColor Yellow $line
                Write-Host -ForegroundColor Yellow "$point^---see"
                break;
            }
        }
    }
}
