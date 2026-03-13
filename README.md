# Wanderlust Website

A responsive static website for an independent travel advisor where visitors can:

- Browse bespoke example journeys in a catalogue
- View destination details, highlights, sample itineraries, and starting prices
- Enquire directly about any package
- Submit a bespoke trip request with destination ideas, dates, budget, and traveler count
- Read testimonials and service details

## Project Structure

- index.html: Homepage with featured packages, trust signals, testimonials, and CTAs
- pages/properties.html: Example journey catalogue with filters and enquiry actions
- pages/packages/*.html: Shareable package detail pages (one URL per package)
- pages/booking.html: Bespoke trip request form
- pages/contact.html: Package enquiry and general contact forms
- pages/services.html: Advisory services overview
- pages/about.html: Advisor story and trust positioning
- pages/faq.html: Searchable FAQ section
- pages/privacy.html: Privacy policy
- pages/terms.html: Terms of service
- pages/gdpr.html: GDPR rights and request process
- pages/cookies.html: Cookie policy and consent controls
- data/properties.js: Travel package dataset
- js/main.js: Navigation, theme, featured package rendering, tracking helpers
- js/forms.js: Shared form validation and submission UX
- css/style.css: Core visual system and responsive layouts
- css/animations.css: Motion and reveal effects

## Local Preview

Open index.html directly in a browser, or run a local server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Notes

- Package pricing is presented as starting guidance and ranges.
- Contact and bespoke forms submit to FormSubmit endpoint and can be redirected to CRM or other providers.
- Sitewide cookie consent banner supports Accept, Reject Optional, and granular preference management.
- Deferred third-party vendor scripts can be gated by consent category using `type="text/plain"` plus `data-consent-category="analytics"` or `data-consent-category="marketing"`.
- Replace contact details and domain references before production launch.

## Consent-Gated Vendor Scripts

Optional third-party scripts can be added without loading them before consent:

```html
<script
	type="text/plain"
	data-consent-category="analytics"
	src="https://example.com/analytics.js">
</script>
```

Supported categories in the consent UI are:

- essential
- analytics
- marketing

Scripts in optional categories are activated only after the visitor grants consent for that category.
