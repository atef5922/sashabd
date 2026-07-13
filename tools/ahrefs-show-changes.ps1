param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath,
  [string]$Key = "URL",
  [string[]]$Fields = @("H1", "H1 previous", "Title", "Title previous")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $CsvPath)) {
  throw "CSV not found: $CsvPath"
}

function Import-AhrefsCsv($path) {
  $rows = @(Import-Csv -LiteralPath $path)
  if ($rows.Count -gt 0 -and @($rows[0].PSObject.Properties).Count -eq 1) {
    $onlyHeader = [string](@($rows[0].PSObject.Properties)[0].Name)
    if ($onlyHeader -match "`t") {
      $rows = @(Import-Csv -LiteralPath $path -Delimiter "`t")
    }
  }
  $norm = foreach ($row in $rows) {
    $normalized = [ordered]@{}
    foreach ($prop in $row.PSObject.Properties) {
      $name = [string]$prop.Name
      if ($name.Length -ge 2 -and $name[0] -eq '"' -and $name[$name.Length - 1] -eq '"') {
        $name = $name.Substring(1, $name.Length - 2)
      }
      $normalized[$name] = $prop.Value
    }
    [pscustomobject]$normalized
  }
  return @($norm)
}

$rows = @(Import-AhrefsCsv -path $CsvPath)
foreach ($r in $rows) {
  Write-Output ("- " + $r.$Key)
  foreach ($f in $Fields) {
    if ($r.PSObject.Properties.Name -contains $f) {
      $val = [string]$r.$f
      Write-Output ("    " + $f + ": " + $val)
    }
  }
  Write-Output ""
}

