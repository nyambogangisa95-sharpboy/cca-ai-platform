# GitHub Push Setup Script for Corporate Career Academy AI Platform
# Replace YOUR_GITHUB_USERNAME with your actual GitHub username

$GitHubUsername = "nyambogangisa95-sharpboy"
$GitHubEmail = "nyambogangisa95@gmail.com"
$RepoName = "cca-ai-platform"

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " Corporate Career Academy - Git Setup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Configuring Git with your email..." -ForegroundColor Yellow
git config --global user.email $GitHubEmail
git config --global user.name $GitHubUsername

Write-Host "2. Checking if this is already a git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "   Repository already initialized." -ForegroundColor Green
} else {
    Write-Host "   Initializing new git repository..." -ForegroundColor Green
    git init
    git branch -M main
}

Write-Host ""
Write-Host "3. Adding all files..." -ForegroundColor Yellow
git add .

Write-Host "4. Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial Corporate Career Academy AI platform - Express backend with OpenAI and Pinecone RAG"

Write-Host "5. Setting up remote origin..." -ForegroundColor Yellow
git remote remove origin -ErrorAction SilentlyContinue
git remote add origin "https://github.com/$GitHubUsername/$RepoName.git"

Write-Host "6. Pushing to GitHub (main branch)..." -ForegroundColor Yellow
Write-Host "   (You may be prompted for your GitHub credentials)" -ForegroundColor Gray
git push -u origin main

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host " SUCCESS! Your repo is now on GitHub" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your repository is available at:" -ForegroundColor Cyan
Write-Host "https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Cyan
Write-Host ""
