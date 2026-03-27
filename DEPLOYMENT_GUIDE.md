# Herway Website - Quick Start & Deployment Guide

## Local Testing

### Option 1: Direct File Opening (Quick Test)
1. Open `index.html` in your web browser
2. Navigate through the different pages
3. Test the forms and responsive design on mobile

### Option 2: Local Web Server (Recommended for PWA Testing)

#### Using Python 3:
```bash
# Navigate to the Herway folder
cd c:\Users\CodeS\Desktop\Sites\Herway

# Start local server
python -m http.server 8000

# Access at http://localhost:8000
```

#### Using Node.js (with http-server):
```bash
# Install http-server globally
npm install -g http-server

# Navigate to Herway folder
cd c:\Users\CodeS\Desktop\Sites\Herway

# Start server
http-server -p 8000

# Access at http://localhost:8000
```

#### Using Windows IIS:
1. Open IIS Manager
2. Right-click on Sites and select "Add Website"
3. Set Physical Path to your Herway folder
4. Set binding to `localhost`
5. Click OK

## What's Included

### Core Files
- ✅ 5 HTML Pages (Home, Book, Drivers, About, Contact)
- ✅ Professional CSS Stylesheet (Responsive)
- ✅ JavaScript Functionality (Forms, Mobile Menu, PWA)
- ✅ PWA Configuration (Manifest, Service Worker)
- ✅ SVG Icon Assets

### Configuration Files
- ✅ `.htaccess` - Apache server configuration
- ✅ `robots.txt` - SEO optimization
- ✅ `sitemap.xml` - XML sitemap
- ✅ `manifest.json` - PWA manifest
- ✅ `service-worker.js` - Offline support

### Documentation
- ✅ `README.md` - Complete documentation
- ✅ This guide

## Before Going Live

### 1. Update Branding & Contact Info

#### WhatsApp Link (in all HTML files):
Find: your current WhatsApp URL in the HTML files
Replace with: `https://wa.me/447700000000` (example format)

To create WhatsApp link:
- Go to https://wa.me/
- Enter your number with country code (e.g., +447700000000)
- Use the generated link

#### Email Address (in all HTML files):
Find: `info@herway.co.uk`
Replace with: `your-actual-email@domain.com`

#### Domain Name (in config files):
- Update `sitemap.xml`: Replace `https://herway.co.uk` with your domain
- Update `robots.txt`: Replace domain reference
- Update `.htaccess`: Add your domain if using HTTPS

### 2. Replace Placeholder Images

Current SVG images in `/images/` folder:
- `hero-banner.png` - Homepage hero
- `about-banner.svg` - About page image
- `favicon.svg` - Browser tab icon
- `icon-192.svg` - App icon (small)
- `icon-512.svg` - App icon (large)
- `icon-maskable.svg` - App icon (maskable)
- `apple-touch-icon.svg` - iOS home screen icon

To replace:
1. Keep the same filenames
2. Ensure SVG format for scalability
3. Or convert to PNG with transparency

### 3. Update Service Pricing

Edit `book.html` - Pricing Info Section:
```html
<div class="pricing-card">
    <h3>Standard Rides</h3>
    <p>From £15</p>
    <p class="small">Pricing varies by distance and location</p>
</div>
```

Update prices to match your rates.

### 4. Update Service Areas

Edit `contact.html` - Service Areas Section:
Update information about which areas you currently serve.

### 5. Set Up Domain & Hosting

#### Option A: Traditional Web Hosting
1. Purchase domain (e.g., herway.co.uk)
2. Get hosting with Apache server (or Node.js)
3. Upload all files via FTP
4. Enable HTTPS with SSL certificate
5. Update domain in config files

#### Option B: Free Hosting (Netlify)
1. Go to https://netlify.com
2. Sign up for free account
3. Drag & drop the Herway folder
4. Add custom domain
5. HTTPS enabled automatically

#### Option C: Free Hosting (GitHub Pages + Vercel)
1. Create GitHub repository
2. Push Herway folder to repo
3. Connect to Vercel
4. Automatic deployment on every push

### 6. Enable HTTPS

HTTPS is required for:
- PWA installation
- Secure form submissions
- Better SEO

#### Free SSL Certificate:
- Use Let's Encrypt (automatic on Netlify/Vercel)
- Or through your hosting provider

### 7. Test Form Submissions

Current behavior: Forms save to browser's localStorage
For production, you need:

#### Option A: Email Service
Use Formspree (free tier):
1. Go to https://formspree.io
2. Create project
3. Update form action:
```html
<form action="https://formspree.io/f/abc123example" method="POST">
```

#### Option B: Custom Backend
Develop API with Node.js or Python to:
- Receive form data
- Send email notifications
- Store in database
- Manage driver applications with verification

#### Option C: Firebase
Use Firebase for:
- Form storage
- Real-time updates
- Authentication

## Deployment Steps

### Step 1: Get Hosting
Choose from: Netlify, Vercel, traditional host, or VPS

### Step 2: Get Domain
Purchase domain from: GoDaddy, Namecheap, etc.

### Step 3: Prepare Files
- [ ] Update all contact info
- [ ] Replace placeholder images
- [ ] Update pricing
- [ ] Update service areas
- [ ] Set up email/form handling
- [ ] Update sitemap.xml with domain
- [ ] Test locally

### Step 4: Deploy
Push all files to your hosting

### Step 5: Configure
- [ ] Set up HTTPS
- [ ] Update DNS records
- [ ] Test all links
- [ ] Test on mobile
- [ ] Verify PWA installation works

### Step 6: Test
- [ ] All pages load
- [ ] Mobile responsive
- [ ] Forms work
- [ ] Links function
- [ ] PWA installs on mobile
- [ ] Offline mode works

### Step 7: Monitor
- [ ] Check form submissions
- [ ] Monitor page performance
- [ ] Track user errors
- [ ] Update content regularly

## PWA Features

### Installation
Users can:
1. Visit website on mobile
2. See install prompt
3. Install to home screen
4. Run as native-like app

### Offline Mode
- Core pages work offline
- Previously loaded images cached
- Graceful offline experience

### Performance
- Faster load times
- Reduced data usage
- Smooth animations

## Mobile Optimization

Website is fully responsive:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (480px - 768px)
- ✅ Small phones (< 480px)

Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet devices

## SEO Optimization

Included features:
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Semantic HTML
- ✅ Mobile-friendly
- ✅ Sitemap.xml
- ✅ robots.txt
- ✅ Fast loading

To improve:
1. Add local business schema
2. Build quality backlinks
3. Create blog content
4. Regular content updates
5. Monitor Google Search Console

## Analytics Setup

Recommended:
1. Google Analytics 4
2. Google Search Console
3. Hotjar for heatmaps

## Backup

Before launch:
```bash
# Backup your Herway folder
cd Desktop/Sites
Copy-Item -Path .\Herway -Destination .\Herway_Backup -Recurse
```

## Support & Customization

For additional features:
- Real-time booking system
- Payment integration
- Driver tracking
- Customer reviews
- Admin dashboard
- Multi-language support

Consider hiring a developer for these advanced features.

## Troubleshooting

### Forms not working?
- Check browser console (F12) for errors
- Ensure email service is configured
- Test locally first

### PWA not installing?
- Ensure HTTPS is enabled
- Check manifest.json is valid
- Open DevTools > Application
- Look for manifest errors

### Responsive design issues?
- Clear browser cache
- Test in different browsers
- Check mobile viewport settings

### Performance slow?
- Enable gzip compression (.htaccess)
- Optimize images
- Use CDN for static files
- Enable caching

## Next Steps

1. ✅ Customize with your information
2. ✅ Test thoroughly locally
3. ✅ Set up hosting & domain
4. ✅ Deploy to production
5. ✅ Monitor and update regularly

## Contact Information Format

When updating, use this format:

WhatsApp International Format:
```
+44 7700 000000  →  +447700000000
```

Email:
```
your-email@yourdomain.com
```

## Have Questions?

Refer to:
1. `README.md` - Full documentation
2. HTML files - Check comments
3. CSS file - Variable definitions
4. Browser console - JavaScript errors

---

**Website Version:** 1.0
**Last Updated:** March 2024

Good luck with your Herway launch! 🚕👩
