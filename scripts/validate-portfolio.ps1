param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'
$errors = New-Object System.Collections.Generic.List[string]

function Add-ValidationError([string]$message) {
  $errors.Add($message) | Out-Null
}

function Test-RelativeFile([string]$relativePath) {
  $path = Join-Path $Root ($relativePath -replace '/', [IO.Path]::DirectorySeparatorChar)
  return Test-Path -LiteralPath $path -PathType Leaf
}

function Read-Text([string]$path) {
  return Get-Content -LiteralPath $path -Encoding UTF8 -Raw
}

function Get-DisplayPath([string]$path) {
  $rootUri = [Uri]((Resolve-Path -LiteralPath $Root).Path.TrimEnd('\') + '\')
  $pathUri = [Uri]((Resolve-Path -LiteralPath $path).Path)
  return [Uri]::UnescapeDataString($rootUri.MakeRelativeUri($pathUri).ToString())
}

function Test-Mojibake {
  $suspects = @(
    ([char]0x00C4).ToString(),
    ([char]0x0139).ToString(),
    ([char]0x0102).ToString(),
    (([char]0x00E2).ToString() + ([char]0x20AC).ToString()),
    ([char]0x00C2).ToString(),
    ([char]0xFFFD).ToString()
  )

  $scanFiles = @()
  foreach ($name in @('index.html', 'README.md', 'PORTFOLIO-GUIDELINES.md', 'PROJECT-INTEGRATION.md', 'CLAUDE-HANDOFF.md')) {
    $path = Join-Path $Root $name
    if (Test-Path -LiteralPath $path -PathType Leaf) {
      $scanFiles += Get-Item -LiteralPath $path
    }
  }

  $projectsPath = Join-Path $Root 'projects'
  if (Test-Path -LiteralPath $projectsPath -PathType Container) {
    $scanFiles += Get-ChildItem -LiteralPath $projectsPath -Recurse -File |
      Where-Object {
        $_.FullName -notmatch '\\node_modules\\|\\_source\\|\\dist\\assets\\' -and
        ($_.Extension -eq '.html' -or $_.Name -eq 'meta.json')
      }
  }

  foreach ($file in $scanFiles) {
    $lines = [IO.File]::ReadAllLines($file.FullName, [Text.Encoding]::UTF8)
    for ($lineIndex = 0; $lineIndex -lt $lines.Count; $lineIndex++) {
      foreach ($suspect in $suspects) {
        if ($lines[$lineIndex].Contains($suspect)) {
          $snippet = $lines[$lineIndex].Trim()
          if ($snippet.Length -gt 120) {
            $snippet = $snippet.Substring(0, 120) + '...'
          }
          Add-ValidationError "Possible mojibake in $(Get-DisplayPath $file.FullName):$($lineIndex + 1) => $snippet"
          break
        }
      }
    }
  }
}

$metaFiles = Get-ChildItem -LiteralPath $Root -Recurse -Filter 'meta.json' -File |
  Where-Object { $_.FullName -notmatch '\\node_modules\\|\\sources\\|\\_source\\' }

Test-Mojibake

foreach ($meta in $metaFiles) {
  try {
    $json = Read-Text $meta.FullName | ConvertFrom-Json
  } catch {
    Add-ValidationError "Invalid JSON: $($meta.FullName)"
    continue
  }

  if ($meta.FullName -match '\\projects\\([^\\]+)\\meta\.json$') {
    $projectDir = Split-Path $meta.FullName -Parent
    $indexPath = Join-Path $projectDir 'index.html'

    if (!(Test-Path -LiteralPath $indexPath -PathType Leaf)) {
      Add-ValidationError "Missing index.html for project: $($json.id)"
    }

    if ($json.PSObject.Properties.Name -contains 'versions') {
      foreach ($version in $json.versions) {
        $versionPath = Join-Path $projectDir $version
        if (!(Test-Path -LiteralPath $versionPath -PathType Leaf)) {
          Add-ValidationError "Missing version '$version' for project: $($json.id)"
        }
      }
    }

    $versions = @($json.versions)
    if (-not $versions -or $versions.Count -eq 0) {
      $versions = @('index.html')
    }

    foreach ($version in $versions) {
      $versionPath = Join-Path $projectDir $version
      if (!(Test-Path -LiteralPath $versionPath -PathType Leaf)) {
        continue
      }

      $versionHtml = Read-Text $versionPath
      if ($versionHtml -notmatch '\.\./\.\./index\.html#projects') {
        Add-ValidationError "Missing return navigation in project target: projects/$($meta.Directory.Name)/$version"
      }

      if ($versions.Count -gt 1) {
        foreach ($sibling in $versions) {
          if ($sibling -eq $version) {
            continue
          }
          if ($versionHtml -notmatch [regex]::Escape("href=`"$sibling`"")) {
            Add-ValidationError "Missing version link '$sibling' in projects/$($meta.Directory.Name)/$version"
          }
        }
      }
    }
  }
}

$portfolioPages = @('index.html') |
  ForEach-Object { Join-Path $Root $_ } |
  Where-Object { Test-Path -LiteralPath $_ -PathType Leaf }

$previewTargets = New-Object System.Collections.Generic.HashSet[string]

foreach ($page in $portfolioPages) {
  $html = Read-Text $page
  $pageName = Split-Path $page -Leaf

  foreach ($match in [regex]::Matches($html, 'data-preview="([^"]+)"')) {
    $target = $match.Groups[1].Value
    $previewTargets.Add($target) | Out-Null
    if (!(Test-RelativeFile $target)) {
      Add-ValidationError "Missing data-preview target in ${pageName}: $target"
    }
  }

  foreach ($match in [regex]::Matches($html, 'data-versions="([^"]+)"')) {
    $versions = $match.Groups[1].Value.Split(',')
    foreach ($version in $versions) {
      $parts = $version.Split('|')
      if ($parts.Count -ne 2 -or [string]::IsNullOrWhiteSpace($parts[1])) {
        Add-ValidationError "Malformed data-versions entry in ${pageName}: $version"
        continue
      }
      if (!(Test-RelativeFile $parts[1])) {
        Add-ValidationError "Missing data-versions target in ${pageName}: $($parts[1])"
      }
    }
  }

  foreach ($match in [regex]::Matches($html, 'href="(projects/[^"]+\.html)"')) {
    $target = $match.Groups[1].Value
    if (!(Test-RelativeFile $target)) {
      Add-ValidationError "Missing project href target in ${pageName}: $target"
    }
  }
}

foreach ($target in $previewTargets) {
  $path = Join-Path $Root ($target -replace '/', [IO.Path]::DirectorySeparatorChar)
  if (!(Test-Path -LiteralPath $path -PathType Leaf)) {
    continue
  }

  $projectHtml = Read-Text $path
  if ($projectHtml -notmatch '\.\./\.\./index\.html#projects') {
    Add-ValidationError "Missing return navigation in project target: $target"
  }
}

if ($errors.Count -gt 0) {
  Write-Host "Portfolio validation failed:" -ForegroundColor Red
  foreach ($errorMessage in $errors) {
    Write-Host " - $errorMessage" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Portfolio validation passed." -ForegroundColor Green
