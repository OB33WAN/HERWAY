'use strict';

const CONFIG = {
    storagePrefix: 'wanderlust_',
    scrollOffset: 84
};

const elements = {
    body: document.body,
    menuToggle: document.getElementById('menuToggle'),
    navLinks: document.getElementById('navLinks'),
    navLinkItems: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('themeToggle'),
    featuredPackages: document.getElementById('featuredProperties'),
    quickSearchForm: document.getElementById('quickSearchForm'),
    newsletterForm: document.getElementById('newsletterForm')
};

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initCookieConsent();
    initCookieSettingsTrigger();
    applyConsentPreferences();
    initFeaturedPackages();
    initSearchForm();
    initNewsletter();
    initSmoothScroll();
    initScrollAnimations();
    initAccessibility();
    trackPageView();
});

function initThemeToggle() {
    if (!elements.themeToggle) return;
    const savedTheme = localStorage.getItem(CONFIG.storagePrefix + 'theme') || 'dark';

    if (savedTheme === 'light') {
        elements.body.classList.add('light-mode');
        elements.themeToggle.textContent = '☾';
    } else {
        elements.themeToggle.textContent = '☀';
    }

    elements.themeToggle.addEventListener('click', () => {
        const isLight = elements.body.classList.toggle('light-mode');
        localStorage.setItem(CONFIG.storagePrefix + 'theme', isLight ? 'light' : 'dark');
        elements.themeToggle.textContent = isLight ? '☾' : '☀';
        trackEvent('theme_toggle', { theme: isLight ? 'light' : 'dark' });
    });
}

function initMobileMenu() {
    elements.menuToggle?.addEventListener('click', () => {
        elements.navLinks?.classList.toggle('active');
    });

    elements.navLinkItems.forEach((link) => {
        link.addEventListener('click', () => {
            elements.navLinks?.classList.remove('active');
        });
    });
}

function initFeaturedPackages() {
    if (!elements.featuredPackages) return;

    const packages = (window.TRAVEL_PACKAGES || []).slice(0, 3);
    if (!packages.length) {
        elements.featuredPackages.innerHTML = '<p>Example journey catalogue is currently updating. Please check back shortly.</p>';
        return;
    }

    renderPackages(packages, elements.featuredPackages, 'pages');
}

function formatJourneyType(type) {
    const labels = {
        culture: 'Culture',
        adventure: 'Adventure',
        coastal: 'Coastal Escape',
        family: 'Family',
        luxury: 'Luxury',
        scuba: 'Scuba Diving',
        cruise: 'Cruise'
    };

    return labels[type] || type;
}

function renderPackages(packages, container, pagePrefix = 'pages') {
    container.innerHTML = packages.map((pkg) => {
        const highlights = pkg.highlights.slice(0, 2).map((item) => `<li>${item}</li>`).join('');
        const itinerary = pkg.sampleItinerary[0] || '';
        const detailUrl = resolveDetailPath(pkg.detailPage, pagePrefix);

        return `
            <article class="property-card reveal ${pkg.soloFriendly ? 'solo-package' : ''}" data-package-id="${pkg.id}">
                <div class="property-image-container">
                    <img src="${resolveImagePath(pkg.image, pagePrefix)}" alt="${pkg.title} in ${pkg.destination}" class="property-image" loading="lazy">
                    <span class="property-badge">${pkg.badge}</span>
                </div>
                <div class="property-content">
                    ${pkg.soloFriendly ? '<p class="solo-note">Solo Traveller Package</p>' : ''}
                    <div class="property-header">
                        <h3 class="property-title">${pkg.title}</h3>
                        <span class="property-price">${pkg.priceLabel}</span>
                    </div>
                    <p class="property-location"><strong>Destination:</strong> ${pkg.destination}</p>
                    <p><strong>Journey Style:</strong> ${formatJourneyType(pkg.type)}</p>
                    <p class="journey-subcategory"><strong>Duration:</strong> ${pkg.durationDays} days</p>
                    <p class="property-description">${pkg.description}</p>
                    <p class="pricing-mini-note"><strong>Price note:</strong> Experience-only guide price, flights excluded, based on current supplier rates.</p>
                    <ul class="card-list">${highlights}</ul>
                    <p class="itinerary-snippet"><strong>Sample:</strong> ${itinerary}</p>
                    <div class="property-actions">
                        <a href="${detailUrl}" class="property-btn-primary">View Example</a>
                        <button class="property-btn-secondary" onclick="enquirePackage(${pkg.id})">Enquire</button>
                        ${pkg.soloFriendly ? `<button class="property-btn-secondary" onclick="enquireSoloPackage(${pkg.id})">Enquire as Solo Traveller</button>` : ''}
                    </div>
                </div>
            </article>
        `;
    }).join('');

    initScrollAnimations();
}

function resolveImagePath(rawPath, pagePrefix) {
    if (pagePrefix === 'pages') {
        return rawPath.replace('../', '');
    }
    return rawPath;
}

function resolveDetailPath(rawPath, pagePrefix) {
    if (!rawPath) return `${pagePrefix}/properties.html`;
    if (rawPath.startsWith('http')) return rawPath;
    if (pagePrefix === 'pages') return `${pagePrefix}/${rawPath}`;
    return rawPath;
}

function initSearchForm() {
    elements.quickSearchForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const destination = document.getElementById('searchDestination')?.value || '';
        const type = document.getElementById('searchType')?.value || '';
        const budget = document.getElementById('searchBudget')?.value || '';

        const params = new URLSearchParams();
        if (destination) params.set('destination', destination);
        if (type) params.set('type', type);
        if (budget) params.set('budget', budget);

        trackEvent('quick_search', { destination, type, budget });
        window.location.href = `pages/properties.html?${params.toString()}`;
    });
}

function initNewsletter() {
    elements.newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = elements.newsletterForm.querySelector('input[type="email"]');
        const email = input?.value.trim();
        if (!email) return;

        localStorage.setItem(CONFIG.storagePrefix + 'newsletter', email);
        input.value = '';

        const notice = document.createElement('p');
        notice.className = 'success-inline';
        notice.textContent = 'Thanks, you are subscribed to travel notes.';
        elements.newsletterForm.appendChild(notice);

        setTimeout(() => notice.remove(), 4000);
        trackEvent('newsletter_signup', { email });
    });
}

function enquirePackage(packageId) {
    const selectedPackage = (window.TRAVEL_PACKAGES || []).find((item) => item.id === packageId);
    const contactPath = window.location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html';
    if (!selectedPackage) {
        window.location.href = contactPath;
        return;
    }

    sessionStorage.setItem(CONFIG.storagePrefix + 'selected_package', JSON.stringify(selectedPackage));
    const target = `${contactPath}?package=${encodeURIComponent(selectedPackage.title)}`;
    window.location.href = target;
}

function enquireSoloPackage(packageId) {
    const selectedPackage = (window.TRAVEL_PACKAGES || []).find((item) => item.id === packageId);
    const contactPath = window.location.pathname.includes('/pages/') ? 'contact.html' : 'pages/contact.html';
    if (!selectedPackage) {
        window.location.href = `${contactPath}?solo=1`;
        return;
    }

    sessionStorage.setItem(CONFIG.storagePrefix + 'selected_package', JSON.stringify(selectedPackage));
    const target = `${contactPath}?package=${encodeURIComponent(selectedPackage.title)}&solo=1`;
    window.location.href = target;
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - CONFIG.scrollOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

function initScrollAnimations() {
    const animated = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!animated.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -70px 0px' });

    animated.forEach((node) => observer.observe(node));
}

function initAccessibility() {
    const skip = document.createElement('a');
    skip.href = '#main';
    skip.textContent = 'Skip to main content';
    skip.className = 'visually-hidden';
    document.body.prepend(skip);

    skip.addEventListener('focus', () => skip.classList.remove('visually-hidden'));
    skip.addEventListener('blur', () => skip.classList.add('visually-hidden'));
}

function initCookieConsent() {
    const key = CONFIG.storagePrefix + 'cookie_consent';
    const consent = JSON.parse(localStorage.getItem(key) || 'null');
    if (consent) return;

    const banner = document.createElement('aside');
    banner.className = 'consent-banner';
    banner.id = 'consentBanner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
        <h3 class="consent-title">Cookies and Privacy</h3>
        <p>We use essential cookies for core functionality and optional cookies for analytics to improve your experience. See our <a href="${resolvePolicyPath('cookies')}">Cookie Policy</a> and <a href="${resolvePolicyPath('privacy')}">Privacy Policy</a>.</p>
        <div class="consent-actions">
            <button class="btn btn-primary" id="consentAcceptAll">Accept All</button>
            <button class="btn btn-secondary" id="consentReject">Reject Optional</button>
            <button class="btn btn-outline" id="consentManage">Manage Preferences</button>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('consentAcceptAll')?.addEventListener('click', () => {
        saveConsent({ essential: true, analytics: true, marketing: false });
        banner.remove();
    });

    document.getElementById('consentReject')?.addEventListener('click', () => {
        saveConsent({ essential: true, analytics: false, marketing: false });
        banner.remove();
    });

    document.getElementById('consentManage')?.addEventListener('click', () => {
        openConsentModal();
    });
}

function initCookieSettingsTrigger() {
    document.querySelectorAll('.cookie-settings-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            openConsentModal();
        });
    });
}

function openConsentModal() {
    let modal = document.getElementById('consentModal');
    if (modal) {
        modal.classList.remove('consent-hidden');
        return;
    }

    const existing = getConsent();
    modal = document.createElement('div');
    modal.className = 'consent-modal';
    modal.id = 'consentModal';
    modal.innerHTML = `
        <div class="consent-modal-panel" role="dialog" aria-label="Cookie preferences">
            <h3>Cookie Preferences</h3>
            <p>Manage which cookies are enabled. Essential cookies are always active.</p>
            <div class="consent-option">
                <div>
                    <strong>Essential Cookies</strong>
                    <p>Required for navigation, security, and form handling.</p>
                </div>
                <label class="switch" aria-label="Essential cookies enabled">
                    <input type="checkbox" checked disabled>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="consent-option">
                <div>
                    <strong>Analytics Cookies</strong>
                    <p>Help us understand usage and improve journeys and content.</p>
                </div>
                <label class="switch" aria-label="Toggle analytics cookies">
                    <input type="checkbox" id="prefAnalytics" ${existing?.analytics ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="consent-option">
                <div>
                    <strong>Marketing Cookies</strong>
                    <p>Used for campaign attribution and remarketing where applicable.</p>
                </div>
                <label class="switch" aria-label="Toggle marketing cookies">
                    <input type="checkbox" id="prefMarketing" ${existing?.marketing ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="consent-actions">
                <button class="btn btn-primary" id="saveConsentPrefs">Save Preferences</button>
                <button class="btn btn-secondary" id="closeConsentPrefs">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('saveConsentPrefs')?.addEventListener('click', () => {
        const analytics = Boolean(document.getElementById('prefAnalytics')?.checked);
        const marketing = Boolean(document.getElementById('prefMarketing')?.checked);
        saveConsent({ essential: true, analytics, marketing });
        document.getElementById('consentBanner')?.remove();
        modal?.classList.add('consent-hidden');
    });

    document.getElementById('closeConsentPrefs')?.addEventListener('click', () => {
        modal?.classList.add('consent-hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('consent-hidden');
    });
}

function saveConsent(settings) {
    const key = CONFIG.storagePrefix + 'cookie_consent';
    const payload = { ...settings, timestamp: new Date().toISOString() };
    localStorage.setItem(key, JSON.stringify(payload));
    applyConsentPreferences();
    document.dispatchEvent(new CustomEvent('consent:updated', { detail: payload }));
}

function getConsent() {
    const key = CONFIG.storagePrefix + 'cookie_consent';
    return JSON.parse(localStorage.getItem(key) || 'null');
}

function canTrackAnalytics() {
    const consent = getConsent();
    return Boolean(consent?.analytics);
}

function applyConsentPreferences() {
    const consent = getConsent();
    if (!consent) return;
    activateDeferredScripts(consent);
}

function activateDeferredScripts(consent) {
    const deferredScripts = document.querySelectorAll('script[type="text/plain"][data-consent-category]');
    deferredScripts.forEach((script) => {
        if (script.dataset.consentLoaded === 'true') return;

        const category = script.dataset.consentCategory;
        if (!consent[category]) return;

        const liveScript = document.createElement('script');
        Array.from(script.attributes).forEach((attribute) => {
            if (attribute.name === 'type' || attribute.name === 'data-consent-category' || attribute.name === 'data-consent-loaded') {
                return;
            }
            liveScript.setAttribute(attribute.name, attribute.value);
        });

        if (script.src) {
            liveScript.src = script.src;
        } else {
            liveScript.textContent = script.textContent;
        }

        script.dataset.consentLoaded = 'true';
        script.parentNode?.insertBefore(liveScript, script.nextSibling);
    });
}

function resolvePolicyPath(policy) {
    const inRoot = window.location.pathname.includes('/index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    if (inRoot) {
        return policy === 'cookies' ? 'pages/cookies.html' : 'pages/privacy.html';
    }

    if (window.location.pathname.includes('/pages/packages/')) {
        return policy === 'cookies' ? '../cookies.html' : '../privacy.html';
    }

    return policy === 'cookies' ? 'cookies.html' : 'privacy.html';
}

function trackPageView() {
    if (!canTrackAnalytics()) return;
    const views = JSON.parse(localStorage.getItem(CONFIG.storagePrefix + 'views') || '[]');
    views.push({ title: document.title, url: window.location.href, date: new Date().toISOString() });
    if (views.length > 80) views.shift();
    localStorage.setItem(CONFIG.storagePrefix + 'views', JSON.stringify(views));
}

function trackEvent(eventName, eventData = {}) {
    if (!canTrackAnalytics()) return;
    const events = JSON.parse(localStorage.getItem(CONFIG.storagePrefix + 'events') || '[]');
    events.push({ eventName, eventData, date: new Date().toISOString() });
    if (events.length > 150) events.shift();
    localStorage.setItem(CONFIG.storagePrefix + 'events', JSON.stringify(events));
}

window.CuratedAppAPI = {
    renderPackages,
    enquirePackage,
    enquireSoloPackage,
    trackEvent,
    openConsentModal,
    getConsent
};

window.enquirePackage = enquirePackage;
window.enquireSoloPackage = enquireSoloPackage;
