# How to Push to GitHub

Git is not available in the current environment, so you need to run the setup script on your local machine.

## Prerequisites

1. **Git installed** - Download from https://git-scm.com/
2. **GitHub account** - Create one at https://github.com/ if you don't have one
3. **GitHub SSH key or token** configured (or use HTTPS with your GitHub password)

## Steps

### Option 1: Using PowerShell (Recommended for Windows)

1. Open PowerShell in the `c:\cca-ai-platform` directory
2. Allow script execution (one-time):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Edit `push-to-github.ps1` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
4. Run the script:
   ```powershell
   .\push-to-github.ps1
   ```

### Option 2: Using Command Prompt (cmd.exe)

1. Open Command Prompt in the `c:\cca-ai-platform` directory
2. Edit `push-to-github.bat` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
3. Run the batch file:
   ```cmd
   push-to-github.bat
   ```

### Option 3: Manual Commands

Run these commands one by one in your terminal:

```bash
# Configure git with your details
git config --global user.email "nyambogangisa95@gmail.com"
git config --global user.name "YOUR_GITHUB_USERNAME"

# Initialize git repo (if not already done)
git init
git branch -M main

# Stage all files
git add .

# Create initial commit
git commit -m "Initial Corporate Career Academy AI platform - Express backend with OpenAI and Pinecone RAG"

# Add remote origin (replace YOUR_GITHUB_USERNAME with your username)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/cca-ai-platform.git

# Push to GitHub
git push -u origin main
```

## After Pushing

Once your code is on GitHub:

1. Go to https://github.com/YOUR_GITHUB_USERNAME/cca-ai-platform
2. Create a new **Environment variable** secret for deployment
3. Connect the repository to Vercel:
   - Visit https://vercel.com
   - Click "New Project"
   - Import from GitHub
   - Select your `cca-ai-platform` repository
   - Add environment variables from `.env.example`
   - Deploy

## GitHub Authentication

When running `git push`, you may be prompted for credentials:
- **HTTPS**: Use your GitHub username and a Personal Access Token (PAT)
  - Generate PAT at https://github.com/settings/tokens
- **SSH**: Make sure your SSH key is registered
  - Guide: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## Troubleshooting

- **"git: command not found"**: Install git from https://git-scm.com/
- **"fatal: remote origin already exists"**: Run `git remote remove origin` first
- **"fatal: not a git repository"**: Run `git init` first
- **Authentication fails**: Check your GitHub credentials or PAT
