param(
  [Parameter(Mandatory = $true)]
  [string]$Slug,

  [string]$ProjectTitle = ""
)

$ErrorActionPreference = "Stop"

$projectDir = Join-Path "projects" $Slug
$metaPath = Join-Path $projectDir "meta.json"

if (-not (Test-Path $metaPath)) {
  throw "Missing meta.json for $Slug"
}

$meta = Get-Content -LiteralPath $metaPath -Raw | ConvertFrom-Json
$versions = @($meta.versions)

if (-not $versions -or $versions.Count -eq 0) {
  $versions = @("index.html")
}

if (-not $ProjectTitle) {
  $ProjectTitle = if ($meta.title) { $meta.title } else { $Slug }
}

$style = @'
<style id="portfolio-bar-style">
#portfolio-bar{position:fixed;top:0;left:0;right:0;height:48px;min-height:0;background:#0F140A;border-bottom:1px solid rgba(184,224,64,0.2);display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:99999;font-family:system-ui,-apple-system,sans-serif;gap:16px;box-sizing:border-box}
#portfolio-bar a{text-decoration:none;display:inline-flex;align-items:center;gap:7px;font-size:.72rem;font-weight:600;letter-spacing:.06em;white-space:nowrap}
.pbar-back{color:rgba(255,255,255,.65);transition:color .2s}.pbar-back:hover{color:#B8E040}.pbar-back svg{flex-shrink:0}.pbar-center{display:flex;align-items:center;gap:8px;min-width:0}.pbar-badge{background:#B8E040;color:#0F140A;font-size:.6rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:3px}.pbar-label{font-size:.72rem;font-weight:500;color:rgba(255,255,255,.45);letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pbar-nav{display:flex;align-items:center;gap:4px}.pbar-nav a,.pbar-nav span{color:rgba(255,255,255,.45);padding:6px 10px;border:1px solid rgba(255,255,255,.1);border-radius:4px;font-size:.68rem;font-weight:600;transition:color .2s,border-color .2s,background .2s}.pbar-nav a:hover{color:#B8E040;border-color:rgba(184,224,64,.4);background:rgba(184,224,64,.06)}.pbar-nav .pbar-current{color:#0F140A;background:#B8E040;border-color:#B8E040;pointer-events:none}.pbar-sep{width:1px;height:20px;background:rgba(255,255,255,.1);flex-shrink:0}body{padding-top:48px!important}body>nav,nav.solid,nav#nav,nav#navbar,#root header[class*="top-0"],#root nav[class*="top-0"],#root .sticky.top-0,#root .fixed.top-0{top:48px!important}@media(max-width:720px){#portfolio-bar{padding:0 12px}.pbar-label{display:none}.pbar-nav a,.pbar-nav span{padding:5px 7px}.pbar-center{display:none}}
</style>
'@

function Get-VersionLabel($index) {
  "v$($index + 1)"
}

for ($i = 0; $i -lt $versions.Count; $i++) {
  $version = [string]$versions[$i]
  $filePath = Join-Path $projectDir $version

  if (-not (Test-Path $filePath)) {
    Write-Warning "Skipping missing version file: $filePath"
    continue
  }

  $links = for ($j = 0; $j -lt $versions.Count; $j++) {
    $label = Get-VersionLabel $j
    if ($j -eq $i) {
      "<span class=`"pbar-current`">$label</span>"
    } else {
      "<a href=`"$([string]$versions[$j])`">$label</a>"
    }
  }

  $bar = @"
<div id="portfolio-bar">
  <a href="../../index.html#projects" class="pbar-back">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Powr&oacute;t do portfolio
  </a>
  <div class="pbar-center"><span class="pbar-badge">$ProjectTitle</span><span class="pbar-label">$(Get-VersionLabel $i)</span></div>
  <div class="pbar-nav">$($links -join '')</div>
</div>
"@

  $html = Get-Content -LiteralPath $filePath -Raw
  if ($html -match '<style id="portfolio-bar-style">') {
    $html = [regex]::Replace($html, '<style id="portfolio-bar-style">.*?</style>', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $style }, [System.Text.RegularExpressions.RegexOptions]::Singleline)
  } else {
    $html = $html -replace '</head>', "$style</head>"
  }

  if ($html -match '<div id="portfolio-bar">') {
    $html = [regex]::Replace($html, '<div id="portfolio-bar">.*?</div>\s*(?=<nav|<header|<main|<div id="root")', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $bar }, [System.Text.RegularExpressions.RegexOptions]::Singleline)
  } else {
    $html = $html -replace '<body([^>]*)>', "<body`$1>$bar"
  }

  Set-Content -LiteralPath $filePath -Value $html -Encoding UTF8
  Write-Output "Synced $filePath"
}
