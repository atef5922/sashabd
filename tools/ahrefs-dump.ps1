param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath,
  [int]$First = 20
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $CsvPath)) {
  throw "CSV not found: $CsvPath"
}

function Import-AhrefsCsv($path) {
  $rows = @(Import-Csv -LiteralPath $path)

  # Ahrefs exports are sometimes TSV with .csv extension.
  if ($rows.Count -gt 0 -and @($rows[0].PSObject.Properties).Count -eq 1) {
    $onlyHeader = [string](@($rows[0].PSObject.Properties)[0].Name)
    if ($onlyHeader -match "`t") {
      $rows = @(Import-Csv -LiteralPath $path -Delimiter "`t")
    }
  }

  # Normalize headers by stripping surrounding double-quotes.
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

Write-Output ("rows=" + $rows.Count)
Write-Output ("columns=" + (@($rows[0].PSObject.Properties | ForEach-Object Name) -join ", "))
Write-Output ""

$rows | Select-Object -First $First | Format-Table -AutoSize
