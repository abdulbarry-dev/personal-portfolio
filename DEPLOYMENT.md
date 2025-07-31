# 🚀 GitHub Pages Deployment Guide

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to a GitHub repository
2. **GitHub Secrets**: Set up the following secrets in your repository settings

## 🔐 Required GitHub Secrets

Go to your GitHub repository → Settings → Secrets and Variables → Actions → New repository secret:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
NUXT_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## ⚙️ GitHub Pages Settings

1. Go to your repository → Settings → Pages
2. Under "Source", select **GitHub Actions**
3. Save the settings

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (Recommended)
- Push to the `main` branch triggers automatic deployment
- GitHub Actions will build and deploy your site
- Check the Actions tab for deployment status

### Method 2: Manual Deployment
```bash
# Build and deploy manually
npm run deploy
```

### Method 3: Manual Trigger
- Go to Actions tab in your GitHub repository
- Click "Deploy to GitHub Pages"
- Click "Run workflow"

## 📁 Build Output

- Generated site: `.output/public/`
- All routes are pre-rendered for optimal performance
- Sitemap.xml is automatically generated
- CNAME file ensures custom domain works

## 🌐 Custom Domain

Your custom domain `abdulbarry.me` is configured via:
- `public/CNAME` file contains your domain
- GitHub Pages will automatically set up the domain
- DNS should point to GitHub Pages servers

## ✅ Deployment Checklist

- [ ] GitHub repository exists and code is pushed
- [ ] Secrets are configured in GitHub repository
- [ ] GitHub Pages source is set to "GitHub Actions"
- [ ] Custom domain DNS is configured
- [ ] Build completes successfully locally (`npm run generate`)

## 🐛 Troubleshooting

### Build Fails
- Check GitHub Actions logs for errors
- Verify all secrets are properly set
- Ensure dependencies are correctly installed

### Site Not Loading
- Check GitHub Pages settings
- Verify CNAME file has correct domain
- Check DNS configuration for custom domain

### Environment Variables
- All environment variables must be added as GitHub Secrets
- Production URLs should be used in secrets
- Local `.env` file is not deployed

## 📊 Performance

Your site is optimized for GitHub Pages:
- Static site generation (SSG)
- Pre-rendered routes
- Optimized assets
- SEO-friendly sitemap
- Fast loading times

## 🔄 Updates

To update your site:
1. Make changes locally
2. Test with `npm run generate`
3. Push to main branch
4. GitHub Actions will automatically deploy

Your portfolio will be live at: **https://abdulbarry.me** 🎉
