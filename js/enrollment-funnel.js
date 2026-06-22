// Student enrollment funnel submission and validation.
(function () {
    'use strict';

    var FORM_ID = 'enrollmentLeadForm';
    var ENDPOINT = '/api/enrollment-lead.php';
    var EMAIL_ENDPOINT = 'https://flowform.to/submit';
    var EMAIL_RECIPIENT = 'hopeinternationaltutoracademy@gmail.com';

    function trim(value) {
        return String(value || '').trim();
    }

    function setStatus(form, type, message) {
        var status = form.querySelector('[data-form-status]');
        if (!status) return;
        status.className = 'form-status form-status-' + type;
        status.textContent = message;
        status.hidden = false;
    }

    function clearErrors(form) {
        form.querySelectorAll('.field-error').forEach(function (error) {
            error.textContent = '';
        });
        form.querySelectorAll('[aria-invalid="true"]').forEach(function (field) {
            field.removeAttribute('aria-invalid');
        });
    }

    function showError(form, name, message) {
        var field = form.elements[name];
        var error = form.querySelector('[data-error-for="' + name + '"]');

        if (field) {
            field.setAttribute('aria-invalid', 'true');
        }

        if (error) {
            error.textContent = message;
        }
    }

    function readLead(form) {
        return {
            fullName: trim(form.elements.fullName && form.elements.fullName.value),
            email: trim(form.elements.email && form.elements.email.value),
            phone: trim(form.elements.phone && form.elements.phone.value),
            city: trim(form.elements.city && form.elements.city.value),
            courseProgram: trim(form.elements.courseProgram && form.elements.courseProgram.value),
            message: trim(form.elements.message && form.elements.message.value),
            website: trim(form.elements.website && form.elements.website.value)
        };
    }

    function validateLead(form, lead) {
        var valid = true;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var phonePattern = /^[0-9+\-()\s]{7,20}$/;

        clearErrors(form);

        if (lead.fullName.length < 2) {
            showError(form, 'fullName', 'Enter the student or parent full name.');
            valid = false;
        }

        if (!emailPattern.test(lead.email)) {
            showError(form, 'email', 'Enter a valid email address.');
            valid = false;
        }

        if (!phonePattern.test(lead.phone)) {
            showError(form, 'phone', 'Enter a valid phone number.');
            valid = false;
        }

        if (lead.city.length < 2) {
            showError(form, 'city', 'Enter your city or country.');
            valid = false;
        }

        if (lead.courseProgram.length < 2) {
            showError(form, 'courseProgram', 'Select or enter a course/program.');
            valid = false;
        }

        if (lead.message.length > 1000) {
            showError(form, 'message', 'Keep the message under 1000 characters.');
            valid = false;
        }

        return valid;
    }

    function sendBrowserEmail(lead) {
        var emailData = new FormData();

        Object.keys(lead).forEach(function (key) {
            if (key !== 'website') {
                emailData.append(key, lead[key]);
            }
        });

        emailData.append('_to', EMAIL_RECIPIENT);
        emailData.append('_replyto', lead.email);
        emailData.append('_subject', 'New Student Enrollment Lead - Hope International Tutor Academy');
        emailData.append('formType', 'Student Enrollment Lead');
        emailData.append('submittedAt', new Date().toISOString());

        return fetch(EMAIL_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: emailData
        });
    }

    function redirectToThankYou(lead, leadEventId, registrationEventId) {
        var thankYouUrl = new URL('/thank-you', window.location.origin);
        thankYouUrl.searchParams.set('event_id', leadEventId);
        thankYouUrl.searchParams.set('registration_event_id', registrationEventId);
        thankYouUrl.searchParams.set('program', lead.courseProgram);
        window.location.href = thankYouUrl.pathname + thankYouUrl.search;
    }

    async function submitLead(form) {
        var lead = readLead(form);
        var button = form.querySelector('button[type="submit"]');
        var originalText = button ? button.textContent : '';
        var tracking = window.HITA_META_TRACKING;
        var leadEventId = tracking ? tracking.generateEventId('Lead') : 'hita-lead-' + Date.now();
        var registrationEventId = tracking ? tracking.generateEventId('CompleteRegistration') : 'hita-registration-' + Date.now();
        var response;
        var result;

        if (!validateLead(form, lead)) {
            setStatus(form, 'error', 'Please correct the highlighted fields.');
            return;
        }

        if (lead.website) {
            window.location.href = '/thank-you';
            return;
        }

        if (button) {
            button.disabled = true;
            button.textContent = 'Submitting...';
        }

        setStatus(form, 'info', 'Submitting your enrollment request...');

        try {
            response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'submit_enrollment',
                    lead: lead,
                    event_id: leadEventId,
                    registration_event_id: registrationEventId,
                    event_source_url: window.location.href,
                    fbp: tracking ? tracking.getCookie('_fbp') : '',
                    fbc: tracking ? tracking.getCookie('_fbc') : ''
                })
            });

            result = await response.json().catch(function () {
                return {};
            });

            if (!response.ok || !result.ok) {
                if (result.errors) {
                    Object.keys(result.errors).forEach(function (field) {
                        showError(form, field, result.errors[field]);
                    });
                }
                throw new Error(result.message || 'Unable to submit your enrollment request right now.');
            }

            if (result.email_sent !== true) {
                await sendBrowserEmail(lead);
            }

            redirectToThankYou(lead, leadEventId, registrationEventId);
        } catch (error) {
            if (!response || response.status >= 500) {
                try {
                    await sendBrowserEmail(lead);
                    redirectToThankYou(lead, leadEventId, registrationEventId);
                    return;
                } catch (fallbackError) {
                    console.warn('Browser email fallback failed.', fallbackError);
                }
            }

            setStatus(form, 'error', error.message || 'Unable to submit your enrollment request right now.');
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = originalText;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById(FORM_ID);
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submitLead(form);
        });
    });
})();
