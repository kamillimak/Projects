param(
  [Parameter(Mandatory = $true)]
  [string]$Slug,

  [string]$ProjectTitle = ""
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$projectDir = Join-Path $Root (Join-Path "projects" $Slug)
$metaPath = Join-Path $projectDir "meta.json"
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$utf8Strict = [System.Text.UTF8Encoding]::new($false, $true)

function Read-Utf8([string]$Path) {
  return [System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $Path).Path, $utf8Strict)
}

function Write-Utf8([string]$Path, [string]$Text) {
  [System.IO.File]::WriteAllText((Resolve-Path -LiteralPath $Path).Path, $Text, $utf8NoBom)
}

function ConvertTo-HtmlText([string]$Text) {
  return [System.Net.WebUtility]::HtmlEncode($Text)
}

function Get-VersionLabel([int]$Index) {
  return "v$($Index + 1)"
}

if (-not (Test-Path -LiteralPath $metaPath -PathType Leaf)) {
  throw "Missing meta.json for $Slug"
}

$meta = Read-Utf8 $metaPath | ConvertFrom-Json
$versions = @($meta.versions)

if (-not $versions -or $versions.Count -eq 0) {
  $versions = @("index.html")
}

if (-not $ProjectTitle) {
  $ProjectTitle = if ($meta.title) { [string]$meta.title } else { $Slug }
}

$encodedTitle = ConvertTo-HtmlText $ProjectTitle
$styleLink = '<link rel="stylesheet" href="../../assets/project-bar.css">'

for ($i = 0; $i -lt $versions.Count; $i++) {
  $version = [string]$versions[$i]
  $filePath = Join-Path $projectDir $version

  if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
    Write-Warning "Skipping missing version file: $filePath"
    continue
  }

  $links = for ($j = 0; $j -lt $versions.Count; $j++) {
    $label = Get-VersionLabel $j
    $href = ConvertTo-HtmlText ([string]$versions[$j])
    if ($j -eq $i) {
      "<span class=""pbar-current"">$label</span>"
    } else {
      "<a href=""$href"">$label</a>"
    }
  }

  $bar = @"
<div id="portfolio-bar">
  <a href="../../index.html#projects" class="pbar-back">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Powr&oacute;t do portfolio
  </a>
  <div class="pbar-center"><span class="pbar-badge">$encodedTitle</span><span class="pbar-label">$(Get-VersionLabel $i)</span></div>
  <div class="pbar-nav">$($links -join '')</div>
</div>
"@

  $html = Read-Utf8 $filePath

  $html = [regex]::Replace(
    $html,
    '<style id="portfolio-bar-style">.*?</style>\s*',
    '',
    [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  if ($html -notmatch [regex]::Escape($styleLink)) {
    $html = $html -replace '</head>', "  $styleLink`r`n</head>"
  }

  if ($html -match '<div id="portfolio-bar">') {
    $html = [regex]::Replace(
      $html,
      '<div id="portfolio-bar">[\s\S]*?<div class="pbar-nav">[\s\S]*?</div>\s*</div>',
      [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $bar },
      [System.Text.RegularExpressions.RegexOptions]::Singleline
    )
  } else {
    $html = $html -replace '<body([^>]*)>', "<body`$1>$bar"
  }

  Write-Utf8 $filePath $html
  Write-Output "Synced projects/$Slug/$version"
}
