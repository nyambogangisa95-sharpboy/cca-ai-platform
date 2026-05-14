@echo off
REM GitHub Push Setup Script for Corporate Career Academy AI Platform
REM Replace YOUR_GITHUB_USERNAME with your actual GitHub username

setlocal enabledelayedexpansion

echo.
echo ======================================
echo  Corporate Career Academy - Git Setup
echo ======================================
echo.

REM Set your GitHub details
set GITHUB_USERNAME=YOUR_GITHUB_USERNAME
set GITHUB_EMAIL=nyambogangisa95@gmail.com
set REPO_NAME=cca-ai-platform

echo Configuring Git...
git config --global user.email "%GITHUB_EMAIL%"
git config --global user.name "%GITHUB_USERNAME%"

echo Checking if this is already a git repository...
if exist .git (
    echo Repository already initialized.
) else (
    echo Initializing new git repository...
    git init
    git branch -M main
)

echo.
echo Adding all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial Corporate Career Academy AI platform - Express backend with OpenAI and Pinecone RAG"

echo.
echo Setting up remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo Pushing to GitHub (main branch)...
git push -u origin main

echo.
echo ======================================
echo  SUCCESS! Your repo is now on GitHub
echo ======================================
echo.
echo Your repository is available at:
echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
pause
