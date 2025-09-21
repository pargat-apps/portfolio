# Deployment Guide

This guide covers various deployment options for your portfolio website.

## 🚀 Quick Deploy Options

### Netlify (Recommended)
1. **Connect Repository**
   - Fork this repository to your GitHub account
   - Go to [Netlify](https://netlify.com) and sign up/login
   - Click "New site from Git" and connect your GitHub repo

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18 or higher
   ```

3. **Environment Variables** (if needed)
   ```
   VITE_GITHUB_TOKEN=your_github_token (optional, for higher API limits)
   ```

### Vercel
1. **Deploy with Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in your project directory
   - Follow the prompts

2. **Or use the Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

### GitHub Pages
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... other config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

### Firebase Hosting
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Build Optimization

### Performance Tips
1. **Enable build optimizations in vite.config.js**
   ```javascript
   export default defineConfig({
     build: {
       minify: 'terser',
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             animations: ['framer-motion'],
           }
         }
       }
     }
   })
   ```

2. **Add compression**
   ```bash
   npm install --save-dev vite-plugin-compression
   ```

### SEO Optimization
1. **Update meta tags** in `index.html` with your information
2. **Add robots.txt** in the `public` folder
3. **Generate sitemap** for better search engine indexing

## 🌐 Custom Domain

### Netlify Custom Domain
1. Go to Site settings → Domain management
2. Add your custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic with Netlify)

### Vercel Custom Domain
1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS records
4. SSL is automatically provisioned

## 📊 Analytics & Monitoring

### Google Analytics
Add to `index.html` before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Web Vitals Monitoring
Consider adding web vitals monitoring for performance tracking:
```bash
npm install web-vitals
```

## 🔒 Security Headers

Add security headers for production deployment:

### Netlify (_headers file)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🚨 Common Issues

### Build Failures
- **Node.js version**: Ensure Node.js 16+ is used
- **Memory issues**: Increase Node.js memory limit: `NODE_OPTIONS="--max-old-space-size=4096"`
- **API limits**: Add GitHub token for higher API rate limits

### Performance Issues
- **Large bundle size**: Enable code splitting and tree shaking
- **Slow loading**: Implement lazy loading for components
- **API timeouts**: Add proper error handling and loading states

### SEO Issues
- **Meta tags**: Ensure all meta tags are properly filled
- **Structured data**: Validate JSON-LD markup
- **Mobile optimization**: Test on mobile devices and fix responsive issues

## 📈 Post-Deployment Checklist

- [ ] Website loads correctly on all devices
- [ ] All links and forms work properly
- [ ] GitHub API integration is functioning
- [ ] Dark/light theme toggle works
- [ ] Contact form submissions are handled
- [ ] SEO meta tags are complete
- [ ] Performance scores are acceptable (Lighthouse)
- [ ] SSL certificate is active
- [ ] Custom domain is properly configured
- [ ] Analytics tracking is working

## 🛠️ Maintenance

### Regular Updates
- Keep dependencies updated: `npm audit` and `npm update`
- Monitor GitHub API rate limits
- Update personal information and projects regularly
- Review and update SEO meta tags

### Performance Monitoring
- Use Lighthouse CI for automated performance testing
- Monitor Core Web Vitals
- Regular accessibility audits

---

Need help with deployment? Feel free to reach out or create an issue in the repository!
