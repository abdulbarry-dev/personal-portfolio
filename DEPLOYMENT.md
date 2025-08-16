# 🚀 GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 📋 Prerequisites

Before the workflow can deploy your site, make sure you have:

### 1. GitHub Pages Settings
- Go to your repository **Settings** → **Pages**
- Under **Source**, select **GitHub Actions**
- Save the changes

### 2. Repository Permissions
The workflow uses the following permissions (already configured in `deploy.yml`):
- `contents: read` - To checkout the repository
- `pages: write` - To deploy to GitHub Pages  
- `id-token: write` - For secure deployment

## 🔄 Automatic Deployment

### Triggers
The deployment runs automatically when:
- ✅ You push commits to the `main` branch
- ✅ You manually trigger it from the **Actions** tab

### Deployment Process
1. **Build Phase**
   - Installs Node.js 20.x
   - Installs dependencies with `npm ci`
   - Validates package integrity
   - Runs `npm run generate` to build the static site
   - Verifies build output

2. **Deploy Phase**
   - Uploads build artifacts to GitHub Pages
   - Deploys to the `github-pages` environment

3. **Performance Monitoring** (Optional)
   - Runs Lighthouse CI for performance analysis
   - Generates performance reports

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures
- **Node.js version**: Workflow uses Node.js 20.x (matches your `engines` requirement)
- **Dependencies**: Uses `npm ci` for reproducible builds
- **Memory**: Configured with `--max_old_space_size=4096` for large builds

#### Deployment Issues
- Check that **GitHub Pages** is enabled in repository settings
- Verify the **Source** is set to **GitHub Actions**
- Ensure the repository is public or you have GitHub Pro/Enterprise

#### Performance Monitoring
- Lighthouse CI runs after deployment
- Reports are uploaded to temporary public storage
- Failures don't block deployment (continues on error)

### Manual Deployment
If you need to deploy manually:
```bash
npm run generate
# The built files will be in .output/public/
```

## 📊 Performance Monitoring

The workflow includes Lighthouse CI that checks:
- ⚡ **Performance** (warning if < 90%)
- ♿ **Accessibility** (error if < 95%)
- ✅ **Best Practices** (warning if < 90%)
- 🔍 **SEO** (error if < 95%)
- 📱 **PWA** (warning if < 80%)

## 🌐 Site URLs

After deployment, your site will be available at:
- **Main site**: `https://abdulbarry-dev.github.io/personal-portfolio/`
- **Pages tested by Lighthouse**:
  - Homepage: `/`
  - Projects: `/projects`
  - Blog: `/blog`
  - Contact: `/contact`

## 🔧 Workflow Configuration

Key files for deployment:
- `.github/workflows/deploy.yml` - Main deployment workflow
- `.lighthouserc.js` - Lighthouse CI configuration
- `public/404.html` - SPA routing for GitHub Pages
- `public/200.html` - Fallback for client-side routing
- `nuxt.config.ts` - Build configuration

## 📝 Best Practices Implemented

### Security
- Uses latest GitHub Actions (`@v4`)
- Minimal required permissions
- No secrets or tokens needed for public sites

### Performance
- Node.js caching for faster builds
- Clean installs with `npm ci`
- Build verification before deployment
- Concurrent deployment prevention

### Reliability
- Full dependency validation
- Build output verification
- Graceful error handling
- Manual deployment option available

## 🚀 Next Steps

1. **Push to main branch** - Deployment will start automatically
2. **Check Actions tab** - Monitor deployment progress
3. **Visit your site** - Check the deployed result
4. **Review Lighthouse reports** - Monitor performance over time

Your site will automatically rebuild and redeploy every time you push changes to the main branch! 🎉
