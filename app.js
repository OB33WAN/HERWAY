// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered successfully:', registration);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}

const SAME_DAY_NOTICE_HOURS = 3;

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize forms
    initializeBookingForm();
    initializeDriverApplicationForm();
    initializeEnquiryForm();

    // Initialize dynamic form sections
    let childTravelerCheckbox = document.getElementById('childTraveler');
    if (childTravelerCheckbox) {
        childTravelerCheckbox.addEventListener('change', toggleChildDetails);
    }

    let childSeatsNeededSelect = document.getElementById('childSeatsNeeded');
    if (childSeatsNeededSelect) {
        childSeatsNeededSelect.addEventListener('change', toggleChildSeatCount);
    }

    let tripTypeSelect = document.getElementById('tripType');
    if (tripTypeSelect) {
        tripTypeSelect.addEventListener('change', toggleTripTypeOptions);
    }

    const bookingDateInput = document.getElementById('date');
    const bookingTimeInput = document.getElementById('time');
    if (bookingDateInput && bookingTimeInput) {
        bookingDateInput.addEventListener('change', setBookingDateAndTimeConstraints);
        bookingTimeInput.addEventListener('focus', setBookingDateAndTimeConstraints);
        setBookingDateAndTimeConstraints();
    }

    initializeThemeToggle();
});

function initializeThemeToggle() {
    const savedTheme = localStorage.getItem('siteTheme');
    const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (preferredDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);

    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle light and dark theme');
    toggleButton.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';

    toggleButton.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('siteTheme', nextTheme);
        toggleButton.textContent = nextTheme === 'dark' ? 'LIGHT' : 'DARK';
    });

    navContainer.appendChild(toggleButton);
}

// Booking Form Initialization and Handling
function initializeBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            pickup: formData.get('pickup'),
            destination: formData.get('destination'),
            date: formData.get('date'),
            time: formData.get('time'),
            passengers: formData.get('passengers'),
            maleTraveler: formData.get('maleTraveler') ? 'Yes' : 'No',
            childTraveler: formData.get('childTraveler') ? 'Yes' : 'No',
            driverPreference: formData.get('driverPreference') || 'female-first',
            tripType: formData.get('tripType'),
            timestamp: new Date().toLocaleString()
        };

        if (!isValidSameDayBookingTime(data.date, data.time)) {
            showNotification('Same-day bookings require at least 3 hours notice. Please select a later time.', 'error');
            return;
        }

        // Additional fields based on trip type
        if (data.tripType === 'airport') {
            data.airport = formData.get('airport');
        }

        if (data.childTraveler === 'Yes') {
            data.numChildren = formData.get('numChildren');
            data.childAges = formData.get('childAges');
            data.carSeat = formData.get('carSeat') ? 'Yes' : 'No';
            data.childSeatsNeeded = formData.get('childSeatsNeeded') || 'Not specified';
            data.childSeatCount = formData.get('childSeatCount') || '0';
        }

        // Save to localStorage for persistence
        let bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
        bookingHistory.push(data);
        localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

        // Reset form
        form.reset();
        const childDetails = document.getElementById('childDetails');
        if (childDetails) {
            childDetails.classList.add('hidden');
        }
        const childSeatCountGroup = document.getElementById('childSeatCountGroup');
        if (childSeatCountGroup) {
            childSeatCountGroup.classList.add('hidden');
        }
        const airportOptions = document.getElementById('airportOptions');
        if (airportOptions) {
            airportOptions.classList.add('hidden');
        }
        setBookingDateAndTimeConstraints();

        // Show success message
        showNotification('Booking request submitted! We\'ll contact you within 30 minutes.', 'success');

        // In a real application, you would send this data to your server
        console.log('Booking Data:', data);
    });
}

// Driver Application Form
function initializeDriverApplicationForm() {
    const form = document.getElementById('driverApplicationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('driverName'),
            email: formData.get('driverEmail'),
            phone: formData.get('driverPhone'),
            location: formData.get('location'),
            experience: formData.get('experience'),
            pvhStatus: formData.get('pvhStatus'),
            vehicleType: formData.get('vehicleType'),
            vehicleYear: formData.get('vehicleYear'),
            insuranceStatus: formData.get('insuranceStatus'),
            dbsStatus: formData.get('dbsStatus'),
            dbsDate: formData.get('dbsDate'),
            additionalInfo: formData.get('additionalInfo'),
            timestamp: new Date().toLocaleString()
        };

        // Save to localStorage
        let driverApplications = JSON.parse(localStorage.getItem('driverApplications')) || [];
        driverApplications.push(data);
        localStorage.setItem('driverApplications', JSON.stringify(driverApplications));

        form.reset();
        showNotification('Thank you for applying! We\'ll review your application and contact you within 48 hours.', 'success');
        console.log('Driver Application Data:', data);
    });
}

// Enquiry Form
function initializeEnquiryForm() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('enquiryName'),
            email: formData.get('enquiryEmail'),
            phone: formData.get('enquiryPhone'),
            enquiryType: formData.get('enquiryType'),
            subject: formData.get('enquirySubject'),
            message: formData.get('enquiryMessage'),
            timestamp: new Date().toLocaleString()
        };

        // Save to localStorage
        let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
        enquiries.push(data);
        localStorage.setItem('enquiries', JSON.stringify(enquiries));

        form.reset();
        showNotification('Your enquiry has been sent! We\'ll respond within 24 hours.', 'success');
        console.log('Enquiry Data:', data);
    });
}

// Toggle Child Details Section
function toggleChildDetails() {
    const childTravelerCheckbox = document.getElementById('childTraveler');
    const childDetailsSection = document.getElementById('childDetails');
    const childSeatsNeededSelect = document.getElementById('childSeatsNeeded');
    const childSeatCountGroup = document.getElementById('childSeatCountGroup');
    const childSeatCountInput = document.getElementById('childSeatCount');
    
    if (!childTravelerCheckbox || !childDetailsSection) return;

    if (childTravelerCheckbox.checked) {
        childDetailsSection.classList.remove('hidden');
    } else {
        childDetailsSection.classList.add('hidden');
        if (childSeatsNeededSelect) {
            childSeatsNeededSelect.value = '';
        }
        if (childSeatCountGroup) {
            childSeatCountGroup.classList.add('hidden');
        }
        if (childSeatCountInput) {
            childSeatCountInput.value = '';
            childSeatCountInput.required = false;
        }
    }
}

function toggleChildSeatCount() {
    const childSeatsNeededSelect = document.getElementById('childSeatsNeeded');
    const childSeatCountGroup = document.getElementById('childSeatCountGroup');
    const childSeatCountInput = document.getElementById('childSeatCount');

    if (!childSeatsNeededSelect || !childSeatCountGroup || !childSeatCountInput) return;

    if (childSeatsNeededSelect.value === 'yes') {
        childSeatCountGroup.classList.remove('hidden');
        childSeatCountInput.required = true;
    } else {
        childSeatCountGroup.classList.add('hidden');
        childSeatCountInput.required = false;
        childSeatCountInput.value = '';
    }
}

// Toggle Trip Type Options
function toggleTripTypeOptions() {
    const tripTypeSelect = document.getElementById('tripType');
    const airportOptions = document.getElementById('airportOptions');
    
    if (!tripTypeSelect) return;

    const tripType = tripTypeSelect.value;

    if (airportOptions) {
        if (tripType === 'airport') {
            airportOptions.classList.remove('hidden');
        } else {
            airportOptions.classList.add('hidden');
        }
    }
}

function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getSameDayMinimumTime() {
    const minDateTime = new Date();
    minDateTime.setMinutes(minDateTime.getMinutes() + (SAME_DAY_NOTICE_HOURS * 60));
    minDateTime.setSeconds(0, 0);
    return minDateTime;
}

function setBookingDateAndTimeConstraints() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    if (!dateInput || !timeInput) return;

    const today = new Date();
    const todayStr = formatDateForInput(today);
    dateInput.min = todayStr;

    if (dateInput.value === todayStr) {
        const minimumTimeStr = getSameDayMinimumTime().toTimeString().slice(0, 5);
        timeInput.min = minimumTimeStr;

        if (timeInput.value && timeInput.value < minimumTimeStr) {
            timeInput.value = '';
        }
    } else {
        timeInput.removeAttribute('min');
    }
}

function isValidSameDayBookingTime(dateValue, timeValue) {
    if (!dateValue || !timeValue) return true;

    const todayStr = formatDateForInput(new Date());
    if (dateValue !== todayStr) {
        return true;
    }

    const minimumTimeStr = getSameDayMinimumTime().toTimeString().slice(0, 5);
    return timeValue >= minimumTimeStr;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-in;
        font-weight: 500;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @media (max-width: 480px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// Form Validation Helper
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active link highlighting based on current page
function setActiveNavLink() {
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Run on page load
window.addEventListener('load', setActiveNavLink);

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('PWA can be installed');
});

// Handle install button if you add one
function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
}