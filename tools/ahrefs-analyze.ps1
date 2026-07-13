param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $CsvPath)) {
  throw "CSV not found: $CsvPath"
}

$rawRows = @(Import-Csv -LiteralPath $CsvPath)

# Ahrefs "CSV" exports are sometimes TSV (tab-delimited) with a .csv extension.
if (@($rawRows).Count -gt 0 -and @($rawRows[0].PSObject.Properties).Count -eq 1) {
  $onlyHeader = [string](@($rawRows[0].PSObject.Properties)[0].Name)
  if ($onlyHeader -match "`t") {
    $rawRows = @(Import-Csv -LiteralPath $CsvPath -Delimiter "`t")
  }
}

# Some Ahrefs exports include header names with literal double-quotes, e.g. `"Title length"`.
# Normalize headers by stripping surrounding double-quotes so the rest of the script can use clean names.
$rows = foreach ($row in $rawRows) {
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
$rows = @($rows)

function ToInt($value) {
  if ($null -eq $value -or $value -eq "") { return 0 }
  return [int]$value
}

$tooLongTitle = $rows | Where-Object { (ToInt $_."Title length") -gt 60 }
$tooLongMeta = $rows | Where-Object { (ToInt $_."Meta description length") -gt 160 }
$missingH1 = $rows | Where-Object { -not $_.H1 -or $_.H1.Trim() -eq "" }
$nonIndexable = $rows | Where-Object { $_."Is indexable page" -match "No" }
$badCanonical = $rows | Where-Object { $_."Canonical URL" -and $_."URL" -and $_."Canonical URL" -ne $_."URL" }

Write-Output ("rows=" + @($rows).Count)
Write-Output ("tooLongTitle=" + @($tooLongTitle).Count)
Write-Output ("tooLongMeta=" + @($tooLongMeta).Count)
Write-Output ("missingH1=" + @($missingH1).Count)
Write-Output ("nonIndexable=" + @($nonIndexable).Count)
Write-Output ("canonicalDiff=" + @($badCanonical).Count)

Write-Output ""
Write-Output "Top tooLongTitle URLs:"
$tooLongTitle | Select-Object -First 20 -Property "URL","Title length","Title" | Format-Table -AutoSize

Write-Output ""
Write-Output "Top tooLongMeta URLs:"
$tooLongMeta | Select-Object -First 20 -Property "URL","Meta description length","Meta description" | Format-Table -AutoSize

Write-Output ""
Write-Output "Top missingH1 URLs:"
$missingH1 | Select-Object -First 20 -Property "URL","Title","H1" | Format-Table -AutoSize
