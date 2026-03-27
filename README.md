# Herway - Women-Only Taxi Service Website

A professional, user-friendly PWA (Progressive Web App) website for a women-by-women taxi service in the UK.

## Features

✨ **Modern Design**
- Responsive layout that works on all devices
- Professional pink and purple color scheme
- Smooth animations and transitions
- Easy-to-navigate interface

🚕 **Service Features**
- Taxi booking system
- Airport transfers with parking cost information
- School run services
- WhatsApp integration for quick bookings

👩 **Women-Focused Safety**
- Comprehensive safety standards section
- Driver verification process documentation
- DBS check information
- Driver cancellation rights policy
- Female passenger preferences

👨‍💼 **Driver Management**
- Detailed driver application process
- 8-step verification timeline
- Safety policies and conduct standards
- Driver benefits section
- PVH license guidance

💬 **Communication**
- Contact form for enquiries
- FAQs section
- Multiple booking methods
- Service area information

📱 **PWA (Progressive Web App)**
- Installable on mobile devices and desktop
- Offline functionality with service worker
- Caching strategy for fast loading
- Add to home screen capability
- App shortcuts for quick actions

## File Structure

```
Herway/
├── index.html               # Home page
├── book.html                # Booking page
├── drivers.html             # Driver application page
├── about.html               # Safety & company info
├── contact.html             # Contact & FAQ page
├── legal.html               # Legal & compliance checklist
├── privacy-policy.html      # GDPR privacy policy
├── terms-of-service.html    # Terms of service
├── styles.css               # Main stylesheet (responsive design)
├── app.js                   # JavaScript functionality
├── manifest.json            # PWA manifest
├── service-worker.js        # Service worker for offline support
├── .htaccess                # Apache configuration
├── robots.txt               # SEO configuration
├── sitemap.xml              # XML sitemap for SEO
├── README.md                # This file
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
└── images/                  # Image assets
    ├── hero-banner.png
    ├── about-banner.svg
    ├── favicon.svg
    ├── icon-192.svg
    ├── icon-512.svg
    ├── icon-maskable.svg
    └── apple-touch-icon.svg
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (Vanilla)** - No dependencies required
- **Web APIs** - Service Worker, localStorage
- **SVG** - Lightweight vector graphics

## Key Sections

### 1. Home Page (index.html)
- Hero section with call-to-action
- Why choose Herway section
- Service offerings overview
- Safety assurance highlights
- CTA section
- Professional footer

### 2. Booking Page (book.html)
- Two booking methods: WhatsApp and contact form
- Comprehensive booking form with:
  - Passenger details
  - Pickup and destination
  - Child traveler options
  - Trip type selection (standard, airport, school)
  - Cost indicators
- Service pricing table

### 3. Driver Page (drivers.html)
- Driver requirements checklist
- 8-step application and verification process
- Safety & conduct policies
- Driver benefits
- Driver application form
- Full timeline visualization

### 4. About Page (about.html)
- Company mission and values
- Safety standards documentation
- Driver verification process details
- How the service works (6-step process)
- Why Herway exists
- Driver safety commitments

### 5. Contact Page (contact.html)
- Multiple contact methods
- Contact form
- Comprehensive FAQ section
- Service area information

### 6. Legal & Compliance Page (legal.html)
- Comprehensive compliance checklist covering:
  - Taxi licensing & operations
  - Insurance requirements
  - Background checks & safeguarding (DBS)
  - Data protection & GDPR compliance
  - Employment & health & safety laws
  - Accessibility & inclusive service
  - Consumer rights & complaints
  - Tax & financial compliance
  - Environmental standards
  - Marketing & advertising compliance
  - Vehicle regulations & road safety
  - Fraud & crime prevention
- Links to regulatory bodies
- Regular audit schedule
- Compliance contact information

### 7. Privacy Policy Page (privacy-policy.html)
- GDPR compliant privacy policy
- Information collection & use
- Data security measures
- User rights under UK GDPR
- Cookie & tracking policy
- Data subject rights & procedures
- Complaint procedures with ICO

### 8. Terms of Service Page (terms-of-service.html)
- Service descriptions
- Booking & reservation terms
- Pricing & payment policies
- Passenger responsibilities & conduct
- Child safety requirements
- Accessibility support standards
- Liability limitations
- Lost property procedures
- Driver standards & conduct
- Complaints & dispute resolution process
- Indemnification clauses

## Features Implemented

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Touch-friendly buttons and forms
- Flexible grid layouts

### Form Handling
- Contact form with validation
- Booking form with dynamic sections
- Driver application form
- Local storage for form data persistence
- Success notifications

### PWA Features
- **Manifest.json** - App metadata, icons, shortcuts
- **Service Worker** - Offline support, caching strategy
- **Installable** - Add to home screen on mobile
- **App Shortcuts** - Quick access to key pages

### User Experience
- Smooth scrolling
- Active navigation highlighting
- Mobile menu toggle
- Form validation feedback
- Success notifications with animations

## Customization Guide

### Branding
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #FF6B9D;      /* Main brand color */
    --primary-dark: #E84B7E;       /* Darker variant */
    --secondary-color: #6B5B95;    /* Secondary color */
    /* ... */
}
```

### Contact Information
Update WhatsApp and email links in all HTML files:
- Replace each WhatsApp link with your real WhatsApp business link in international format (example: `https://wa.me/447700000000`)
- Replace `info@herway.co.uk` with your email address

### Pricing
Update pricing in `book.html` pricing section:
- Standard rides starting price
- Airport transfer pricing
- School run rates
- Hourly rates

### Service Areas
Update service area information in `contact.html` service areas section

## Deployment Instructions

### Local Testing
1. Open `index.html` in a modern web browser
2. Use browser DevTools to test responsive design
3. Test on multiple devices

### Live Deployment

#### On Apache Server
1. Upload all files to your web server
2. Ensure `.htaccess` is properly configured
3. Enable mod_rewrite if not already enabled
4. Update WhatsApp and email links

#### On Netlify/Vercel
1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Set build command: (none needed)
4. Set publish directory: `/` (root)

#### On Node/Express
```javascript
const express = require('express');
const app = express();
app.use(express.static('.'));
app.listen(3000, () => console.log('Server running on port 3000'));
```

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Mobile browsers (iOS Safari 11+, Chrome Mobile)

## Performance Optimization

## Additional Compliance Files

The following repository-level compliance/support files are included:

- GDPR.md
- COOKIES.md
- PRIVACY.md
- TERMS_OF_USE.md
- TERMS_OF_SERVICE.md
- LICENSE
- llms.txt

## Ownership and Copyright

Copyrighted to HERWAY Octopye Digital Designs (https://octopye.com) Created

- SVG images for icons (scalable, lightweight)
- CSS Grid and Flexbox for efficient layouts
- Service Worker caching strategy
- Minified CSS and JS recommended for production
- Lazy loading for images

## Security Considerations

- HTTPS://recommended for PWA
- Content Security Policy headers recommended
- Sanitize user inputs server-side
- Secure backend API for form submissions
- GDPR compliance for data collection

## Future Enhancements

- Real-time booking system
- Payment integration
- Driver GPS tracking
- Customer reviews/ratings
- Push notifications
- Multi-language support
- Dark mode theme
- Advanced analytics

## Support & Customization

This website provides a complete foundation. For additional features:
- Backend integration for real bookings
- Payment gateway setup
- Email notification system
- Database for form submissions
- Admin dashboard for managing drivers

## License

Created for Herway Women-Only Taxi Service

## Notes

- All placeholder images are SVG format (scalable)
- Replace placeholder images with actual Herway branding
- Update all contact information before launch
- Test PWA installation on Android and iOS devices
- Consider adding SSL certificate for HTTPS
- Set up backend API for form handling

---

**Last Updated:** March 2024
**Version:** 1.0
