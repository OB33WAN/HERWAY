'use strict';

const FormHandler = {
    validators: {
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => value.trim() === '' || (/^[\d\s+\-().]+$/.test(value) && value.replace(/\D/g, '').length >= 8),
        text: (value) => value.trim().length >= 2,
        textarea: (value) => value.trim().length >= 10
    },

    init() {
        document.querySelectorAll('form').forEach((form) => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));

            form.querySelectorAll('input, textarea, select').forEach((field) => {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
                field.addEventListener('change', () => this.clearFieldError(field));
            });
        });
    },

    validateField(field) {
        if (field.type === 'checkbox') {
            if (field.required && !field.checked) {
                this.showFieldError(field, 'Please confirm this field to continue');
                return false;
            }
            this.clearFieldError(field);
            return true;
        }

        const value = field.value.trim();

        if (field.required && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (!value) {
            this.clearFieldError(field);
            return true;
        }

        if (field.type === 'email' && !this.validators.email(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }

        if (field.name.toLowerCase().includes('phone') && !this.validators.phone(value)) {
            this.showFieldError(field, 'Please enter a valid phone number');
            return false;
        }

        if (field.tagName.toLowerCase() === 'textarea' && !this.validators.textarea(value)) {
            this.showFieldError(field, 'Please add at least 10 characters');
            return false;
        }

        if (field.type === 'text' && field.required && !this.validators.text(value)) {
            this.showFieldError(field, 'Please add at least 2 characters');
            return false;
        }

        this.clearFieldError(field);
        return true;
    },

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');

        const target = field.closest('.form-group') || field.parentElement;
        const error = document.createElement('span');
        error.className = 'field-error';
        error.textContent = message;
        target.appendChild(error);
    },

    clearFieldError(field) {
        field.classList.remove('error');
        const target = field.closest('.form-group') || field.parentElement;
        const error = target.querySelector('.field-error');
        if (error) error.remove();
    },

    async handleSubmit(e, form) {
        e.preventDefault();

        const fields = form.querySelectorAll('input:not([type="submit"]):not([type="hidden"]), textarea, select');
        let valid = true;

        fields.forEach((field) => {
            if (!this.validateField(field)) valid = false;
        });

        if (!valid) {
            this.showFormMessage(form, 'error', 'Please fix the highlighted fields and try again.');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        try {
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());

            const remoteSubmit = form.dataset.remoteSubmit === 'true' && form.action;
            if (remoteSubmit) {
                await this.submitToRemote(form, formData);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 900));
                this.storeSubmission(payload, form.id || form.name || 'travel_form');
            }

            this.showFormMessage(form, 'success', 'Thanks, your enquiry has been received. You will hear back shortly.');
            form.reset();

            if (window.CuratedAppAPI?.trackEvent) {
                window.CuratedAppAPI.trackEvent('form_submission', { form: form.id || form.name || 'travel_form' });
            }
        } catch (error) {
            this.showFormMessage(form, 'error', 'Something went wrong while submitting. Please try again.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    },

    async submitToRemote(form, formData) {
        const response = await fetch(form.action, {
            method: (form.method || 'POST').toUpperCase(),
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Remote submission failed');
        }
    },

    showFormMessage(form, type, message) {
        form.querySelectorAll('.form-message').forEach((msg) => msg.remove());

        const div = document.createElement('div');
        div.className = `form-message form-${type}`;
        div.textContent = message;
        form.prepend(div);
    },

    storeSubmission(payload, formName) {
        const key = 'wanderlust_submissions';
        const submissions = JSON.parse(localStorage.getItem(key) || '[]');
        submissions.push({ form: formName, payload, date: new Date().toISOString() });
        if (submissions.length > 120) submissions.shift();
        localStorage.setItem(key, JSON.stringify(submissions));
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FormHandler.init());
} else {
    FormHandler.init();
}

const style = document.createElement('style');
style.textContent = `
.field-error {
    color: var(--coral);
    font-size: 0.84rem;
    display: block;
    margin-top: 0.3rem;
}

input.error,
textarea.error,
select.error {
    border-color: #d44f35 !important;
}

.form-message {
    border-radius: 10px;
    padding: 0.72rem 0.85rem;
    margin-bottom: 0.9rem;
    font-weight: 600;
}

.form-success {
    background: color-mix(in srgb, var(--sea) 16%, transparent);
    color: var(--sea-deep);
}

.form-error {
    background: color-mix(in srgb, var(--coral) 16%, transparent);
    color: var(--sea-deep);
}
`;
document.head.appendChild(style);
