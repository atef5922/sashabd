$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $root

function Remove-IfExists([string]$path) {
  if (Test-Path $path) {
    Remove-Item $path -Recurse -Force
  }
}

Write-Host "Cleaning previous artifacts..."
Remove-IfExists ".next"
Remove-IfExists "out"
Remove-IfExists "out.zip"

Write-Host "Running production build..."
npm run build
if ($LASTEXITCODE -ne 0) {
  throw "Build failed."
}

$requiredFiles = @(
  "out/index.html",
  "out/404.html",
  "out/robots.txt",
  "out/sitemap.xml",
  "out/.htaccess",
  "out/_headers",
  "out/_redirects"
)

foreach ($file in $requiredFiles) {
  if (-not (Test-Path $file)) {
    throw "Required deploy file missing: $file"
  }
}

Write-Host "Validating exported HTML asset references..."
$outDir = Join-Path $root "out"
$htmlFiles = Get-ChildItem $outDir -Recurse -Filter "*.html"
$assetRegex = '/_next/static/[A-Za-z0-9._/\-]+'
$missingAssets = New-Object System.Collections.Generic.List[string]
$viteReferences = New-Object System.Collections.Generic.List[string]
$allAssetReferences = New-Object System.Collections.Generic.HashSet[string]

foreach ($htmlFile in $htmlFiles) {
  $content = Get-Content -Raw $htmlFile.FullName

  if ($content -match '/@vite/client') {
    $viteReferences.Add($htmlFile.FullName)
  }

  $matches = [System.Text.RegularExpressions.Regex]::Matches($content, $assetRegex) |
    ForEach-Object { $_.Value.TrimEnd("\") } |
    Sort-Object -Unique

  foreach ($assetRef in $matches) {
    $assetPath = $assetRef.TrimStart("/").Replace("/", "\")
    [void]$allAssetReferences.Add($assetRef)
    if (-not (Test-Path (Join-Path $outDir $assetPath))) {
      $missingAssets.Add("$($htmlFile.FullName) -> $assetRef")
    }
  }
}

if ($viteReferences.Count -gt 0) {
  throw ("Unexpected production reference to /@vite/client found in:`n" + ($viteReferences -join "`n"))
}

if ($missingAssets.Count -gt 0) {
  throw ("Missing referenced _next asset(s):`n" + ($missingAssets -join "`n"))
}

Write-Host "Creating RSC compatibility aliases..."
$rscAliasCount = 0
$rscRootDirs = Get-ChildItem $outDir -Recurse -Directory -Filter "__next.*"
foreach ($rscRootDir in $rscRootDirs) {
  $parentDir = Split-Path -Parent $rscRootDir.FullName
  $prefix = Split-Path -Leaf $rscRootDir.FullName
  $rscRootPath = $rscRootDir.FullName.TrimEnd("\", "/")
  $rscFiles = Get-ChildItem $rscRootDir.FullName -Recurse -File -Filter "*.txt"

  foreach ($rscFile in $rscFiles) {
    $relative = $rscFile.FullName.Substring($rscRootPath.Length + 1)
    $aliasName = $prefix + "." + ($relative -replace "[\\/]", ".")
    $aliasPath = Join-Path $parentDir $aliasName
    Copy-Item -LiteralPath $rscFile.FullName -Destination $aliasPath -Force
    $rscAliasCount++
  }
}

$deployInstructions = @"
SASHABD STATIC DEPLOY PACKAGE

Important deploy steps:
1. Delete old public_html/_next/ before extracting this package.
2. Delete old index.html and route folders if your panel does not fully overwrite files.
3. Extract this zip directly inside public_html/ so _next/, .htaccess, _headers, and route folders stay at web root.
4. If Cloudflare/CDN is enabled, purge cache after upload.
5. Verify:
   - / loads
   - /robots.txt loads
   - /sitemap.xml loads
   - a few internal pages open without old UI/chunk errors
"@
Set-Content -Path "out/DEPLOY-IMPORTANT.txt" -Value $deployInstructions -NoNewline

$manifest = [ordered]@{
  generatedAt = (Get-Date).ToString("s")
  htmlFileCount = $htmlFiles.Count
  nextAssetReferenceCount = $allAssetReferences.Count
  rscCompatibilityAliasCount = $rscAliasCount
  sampleAssetReferences = @($allAssetReferences | Select-Object -First 20)
}
$manifest | ConvertTo-Json -Depth 4 | Set-Content -Path "out/deploy-manifest.json"

Write-Host "Creating deploy zip..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory((Join-Path $root "out"), (Join-Path $root "out.zip"), [System.IO.Compression.CompressionLevel]::Optimal, $false)

$zip = [System.IO.Compression.ZipFile]::OpenRead((Join-Path $root "out.zip"))
try {
  $zipEntries = $zip.Entries | Select-Object -ExpandProperty FullName
  foreach ($entry in @(".htaccess", "_headers", "_redirects", "deploy-manifest.json", "DEPLOY-IMPORTANT.txt")) {
    if ($zipEntries -notcontains $entry) {
      throw "Zip verification failed. Missing entry: $entry"
    }
  }
} finally {
  $zip.Dispose()
}

Write-Host "Build package ready: $root\out.zip"
