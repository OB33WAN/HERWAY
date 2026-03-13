'use strict';

function getSlugFromPath() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || '';
    return filename.replace('.html', '');
}

function formatJourneyType(type) {
    const labels = {
        culture: 'Culture',
        adventure: 'Adventure',
        coastal: 'Coastal Escape',
        family: 'Family',
        luxury: 'Luxury',
        scuba: 'Scuba Diving'
    };

    return labels[type] || type;
}

function renderPackageDetail() {
    const slug = getSlugFromPath();
    const packages = window.TRAVEL_PACKAGES || [];
    const pkg = packages.find((item) => item.slug === slug);
    const mount = document.getElementById('packageDetailMount');

    if (!pkg || !mount) {
        if (mount) {
            mount.innerHTML = '<article class="form-card"><h2>Example journey not found</h2><p>Please return to the example journey catalogue.</p><a class="btn btn-primary" href="../properties.html">Back to Example Journeys</a></article>';
        }
        return;
    }

    document.title = `${pkg.title} | Wanderlust Example Journeys`;

    const highlightList = pkg.highlights.map((h) => `<li>${h}</li>`).join('');
    const itineraryList = pkg.sampleItinerary.map((step) => `<li>${step}</li>`).join('');

    mount.innerHTML = `
        <section class="hero hero-mini">
            <div class="hero-content hero-single-col">
                <div class="hero-text">
                    <p class="kicker">Bespoke Example Journey</p>
                    <h1 class="hero-title">${pkg.title}</h1>
                    <p class="hero-subtitle">${pkg.description}</p>
                </div>
            </div>
        </section>

        <section class="padding-4 max-width-900">
            <article class="property-card">
                <div class="property-image-container">
                    <img src="../../${pkg.image.replace('../', '')}" alt="${pkg.title} in ${pkg.destination}" class="property-image" loading="lazy">
                    <span class="property-badge">${pkg.badge}</span>
                </div>
                <div class="property-content">
                    <div class="property-header">
                        <h2>${pkg.destination}</h2>
                        <span class="property-price">${pkg.priceLabel}</span>
                    </div>
                    <p><strong>Journey Style:</strong> ${formatJourneyType(pkg.type)}</p>
                    <p class="journey-subcategory"><strong>Duration:</strong> ${pkg.durationDays} days</p>
                    <p><strong>Ideal for:</strong> ${pkg.travellers}</p>

                    <h3>Journey Highlights</h3>
                    <ul class="card-list">${highlightList}</ul>

                    <h3>Sample Itinerary</h3>
                    <ul class="card-list">${itineraryList}</ul>

                    <p class="muted">Every itinerary shown here is an example starting point and can be reshaped around certification level, preferred pace, hotel style, and travel dates.</p>

                    <div class="property-actions">
                        <a class="property-btn-primary" href="../contact.html?package=${encodeURIComponent(pkg.title)}">Enquire About This Example</a>
                        <a class="property-btn-secondary" href="../booking.html">Request a Fully Bespoke Version</a>
                    </div>
                </div>
            </article>
        </section>
    `;

    addSchema(pkg);
}

function addSchema(pkg) {
    const schema = {
        '@context': 'https://schema.org',
        ...pkg.schema,
        image: `https://wanderlusttraveladvisory.com/${pkg.image.replace('../', '')}`,
        url: `https://wanderlusttraveladvisory.com/pages/packages/${pkg.slug}.html`
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', renderPackageDetail);
