param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath
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

  # Normalize headers by stripping surrounding double-quotes (some exports include literal quotes).
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

$rows = Import-AhrefsCsv -path $CsvPath
Write-Output ("rows=" + $rows.Count)
Write-Output ("columns=" + (@($rows[0].PSObject.Properties | ForEach-Object Name) -join ", "))
Write-Output ""

# Heuristics: Ahrefs "Duplicate content" exports usually include a "Duplicate URL" or "Duplicate group" concept.
# We'll print a few rows and also summarize duplicates by any obvious key column.

Write-Output "Sample rows:"
$rows | Select-Object -First 10 | Format-Table -AutoSize

$groupKeyCandidates = @(
  "Duplicate group",
  "Duplicate group ID",
  "Duplicate group id",
  "Group",
  "Group ID",
  "Duplicate content hash",
  "Content hash",
  "Hash",
  "Duplicate URL",
  "Duplicate URL 1",
  "Duplicate URL 2",
  "URL",
  "Canonical URL"
)

$foundKeys = $groupKeyCandidates | Where-Object { $rows[0].PSObject.Properties.Name -contains $_ }
Write-Output ""
Write-Output ("Detected key columns: " + ($foundKeys -join ", "))

foreach ($key in $foundKeys) {
  Write-Output ""
  Write-Output ("Top groups by '" + $key + "':")
  $rows |
    Group-Object -Property $key |
    Sort-Object Count -Descending |
    Select-Object -First 10 Count, Name |
    Format-Table -AutoSize
}

