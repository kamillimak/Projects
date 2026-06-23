param(
  [Parameter(Mandatory = $true)]
  [string]$Slug,

  [string]$Version = "index.html",
  [int]$Port = 8765,
  [string]$Output = "",
  [int]$Width = 1440,
  [int]$Height = 900,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$projectPath = Join-Path $Root (Join-Path "projects" (Join-Path $Slug $Version))

if (-not (Test-Path -LiteralPath $projectPath -PathType Leaf)) {
  throw "Project version not found: projects/$Slug/$Version"
}

if (-not $Output) {
  $safeVersion = if ($Version -eq "index.html") { "preview" } else { [IO.Path]::GetFileNameWithoutExtension($Version) }
  $Output = Join-Path $Root "assets/previews/$Slug-$safeVersion.png"
} elseif (-not [IO.Path]::IsPathRooted($Output)) {
  $Output = Join-Path $Root $Output
}

$outputDir = Split-Path $Output -Parent
if (-not (Test-Path -LiteralPath $outputDir -PathType Container)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$edgeCandidates = @(@(
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { $_ -and (Test-Path -LiteralPath $_ -PathType Leaf) })

if (-not $edgeCandidates -or $edgeCandidates.Count -eq 0) {
  throw "Microsoft Edge was not found. Install Edge or adapt this script to another Chromium browser."
}

$edge = $edgeCandidates[0]
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$serverStarted = $false
$serverProcess = $null

try {
  try {
    $listener.Start()
    $listener.Stop()
    $serverStarted = $true
  } catch {
    $serverStarted = $false
  }

  if ($serverStarted) {
    $serverProcess = Start-Process -FilePath "python" -ArgumentList @("-m", "http.server", "$Port", "--bind", "127.0.0.1") -WorkingDirectory $Root -WindowStyle Hidden -PassThru
    Start-Sleep -Milliseconds 800
  }

  $urlVersion = $Version -replace '\\', '/'
  $url = "http://127.0.0.1:$Port/projects/$Slug/$urlVersion"

  Write-Host "Preview URL: $url"
  Write-Host "Output: $Output"

  if ($DryRun) {
    return
  }

  $edgeArguments = @(
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=$Width,$Height",
    "--screenshot=$Output",
    $url
  )

  $edgeProcess = Start-Process -FilePath $edge -ArgumentList $edgeArguments -WindowStyle Hidden -Wait -PassThru
  if ($edgeProcess.ExitCode -ne 0) {
    throw "Microsoft Edge screenshot failed with exit code $($edgeProcess.ExitCode)."
  }

  if (-not (Test-Path -LiteralPath $Output -PathType Leaf)) {
    throw "Screenshot was not created: $Output"
  }

  Write-Host "Preview generated." -ForegroundColor Green
} finally {
  if ($serverProcess -and -not $serverProcess.HasExited) {
    Stop-Process -Id $serverProcess.Id -Force
  }
}
