// Sticky header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
});
nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
    }
});

// Floating WhatsApp contact button
if (!document.querySelector('.whatsapp-float')) {
    const whatsapp = document.createElement('a');
    whatsapp.className = 'whatsapp-float';
    whatsapp.href = 'https://wa.me/923014809150';
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    whatsapp.setAttribute('aria-label', 'Chat on WhatsApp at +92 301 4809150');
    whatsapp.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 4.5A11.43 11.43 0 0 0 6.2 21.75L4.9 26.5l4.86-1.27A11.43 11.43 0 1 0 16.04 4.5Zm0 2.07a9.36 9.36 0 1 1-5.03 17.25l-.36-.22-2.88.75.77-2.8-.24-.37A9.36 9.36 0 0 1 16.04 6.57Zm-4.1 4.93c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.62 0 1.55 1.13 3.05 1.28 3.26.16.2 2.18 3.5 5.39 4.77 2.67 1.05 3.21.84 3.79.79.58-.06 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.15-.21.32-.81 1.03-.99 1.24-.18.21-.37.24-.68.08-.32-.16-1.33-.49-2.54-1.57-.94-.84-1.57-1.87-1.76-2.18-.18-.32-.02-.49.14-.65.14-.14.31-.37.47-.55.16-.19.21-.32.31-.53.11-.21.06-.4-.02-.55-.08-.16-.71-1.72-.97-2.36-.26-.62-.52-.54-.71-.55h-.62Z"/></svg>';
    document.body.appendChild(whatsapp);
}

if (!document.querySelector('.social-float')) {
    const social = document.createElement('div');
    social.className = 'social-float';
    social.innerHTML = ''
        + '<a href="https://www.facebook.com/share/1Au3StHi1W/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">'
        + '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2V8.6H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z"/></svg>'
        + '</a>'
        + '<a href="https://www.instagram.com/hitutoracademy" target="_blank" rel="noopener noreferrer" aria-label="Instagram">'
        + '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2.1"/><circle cx="12" cy="12" r="4.1" stroke="currentColor" stroke-width="2.1"/><circle cx="17.3" cy="6.7" r="1.25" fill="currentColor"/></svg>'
        + '</a>';
    document.body.appendChild(social);
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const update = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                };
                update();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
const statsSection = document.getElementById('stats');
if (statsSection) counterObserver.observe(statsSection);

const FORM_EMAIL_RECIPIENT = 'hopeinternationaltutoracademy@gmail.com';
const FORM_EMAIL_ENDPOINT = 'https://flowform.to/submit';
const STUDENT_PROMPT_DISMISSED_KEY = 'student-registration-prompt-dismissed';

function isRegistrationPage() {
    return window.location.pathname.endsWith('/student-registration')
        || window.location.pathname.endsWith('/student-registration.html')
        || window.location.pathname.endsWith('/teacher-registration')
        || window.location.pathname.endsWith('/teacher-registration.html');
}

function closeStudentPrompt() {
    const prompt = document.getElementById('studentRegistrationPrompt');
    if (prompt) {
        prompt.remove();
    }
    sessionStorage.setItem(STUDENT_PROMPT_DISMISSED_KEY, 'true');
}

function createStudentRegistrationPrompt() {
    if (document.getElementById('studentRegistrationPrompt')) return;
    if (isRegistrationPage()) {
        sessionStorage.setItem(STUDENT_PROMPT_DISMISSED_KEY, 'true');
        return;
    }
    if (sessionStorage.getItem(STUDENT_PROMPT_DISMISSED_KEY) === 'true') return;

    const prompt = document.createElement('div');
    prompt.id = 'studentRegistrationPrompt';
    prompt.className = 'student-prompt';
    prompt.setAttribute('role', 'dialog');
    prompt.setAttribute('aria-modal', 'true');
    prompt.setAttribute('aria-labelledby', 'studentPromptTitle');
    prompt.innerHTML = `
        <div class="student-prompt-card">
            <button type="button" class="student-prompt-close" aria-label="Close student registration form">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
            <div class="student-prompt-head">
                <span>Student Registration</span>
                <h2 id="studentPromptTitle">Find Home & Online Tutors Worldwide</h2>
                <p>Submit your details to get matched with a verified tutor in your country or location. You can close this form to continue to the homepage.</p>
            </div>
            <form id="studentPromptForm" data-validate>
                <div class="form-row">
                    <div class="form-group"><label for="promptStudentName">Student Name *</label><input type="text" id="promptStudentName" name="studentName" required placeholder="Full name"></div>
                    <div class="form-group"><label for="promptParentName">Parent/Guardian Name *</label><input type="text" id="promptParentName" name="parentName" required placeholder="Parent's name"></div>
                </div>
                <div class="form-row">
                    <div class="form-group"><label for="promptEmail">Email Address *</label><input type="email" id="promptEmail" name="email" required placeholder="email@example.com"></div>
                    <div class="form-group"><label for="promptPhone">Phone Number *</label><input type="tel" id="promptPhone" name="phone" required placeholder="+92 3XX XXXXXXX"></div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="promptGrade">Grade/Class *</label>
                        <select id="promptGrade" name="grade" required>
                            <option value="">Select Grade</option>
                            <option>Play Group / Nursery</option><option>KG / Prep</option><option>Class 1-5</option><option>Class 6-8</option><option>Class 9-10 (Matric)</option><option>Class 11-12 (FSc/ICS)</option><option>O-Levels</option><option>A-Levels</option><option>University</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="promptCity">Country / Location *</label>
                        <select id="promptCity" name="city" required>
                            <option value="">Select Country / Location</option>
                            <option>Pakistan</option><option>Saudi Arabia</option><option>United Arab Emirates</option><option>United Kingdom</option><option>United States</option><option>Canada</option><option>Australia</option><option>Qatar</option><option>Oman</option><option>Kuwait</option><option>Other Country</option>
                        </select>
                    </div>
                </div>
                <div class="form-group"><label for="promptAddress">Address *</label><textarea id="promptAddress" name="address" required placeholder="House no, area, city, country..."></textarea></div>
                <div class="form-group"><label for="promptSubjects">Subjects Needed *</label><input type="text" id="promptSubjects" name="subjects" required placeholder="e.g. Mathematics, Physics, English"></div>
                <div class="form-group">
                    <label for="promptTutoringType">Tutoring Type *</label>
                    <select id="promptTutoringType" name="tutoringType" required>
                        <option value="">Select Type</option>
                        <option>Home Tutoring</option>
                        <option>Online Tutoring</option>
                        <option>Both</option>
                    </select>
                </div>
                <div class="form-group"><label for="promptMessage">Additional Message</label><textarea id="promptMessage" name="message" placeholder="Any specific requirements or preferred timings..."></textarea></div>
                <button type="submit" class="btn btn-primary" style="width:100%;">Submit Registration</button>
            </form>
        </div>
    `;

    document.body.appendChild(prompt);
    prompt.querySelector('.student-prompt-close').addEventListener('click', closeStudentPrompt);
    bindValidatedForm(prompt.querySelector('form'));
}

function getFormType(form) {
    if (form.id === 'studentForm' || form.id === 'studentPromptForm') return 'Student Registration';
    if (form.id === 'teacherForm') return 'Teacher Registration';
    return 'Contact Message';
}

function getFormSubject(form) {
    if (form.id === 'studentForm' || form.id === 'studentPromptForm') return 'New Student Registration - Hope International Tutor Academy';
    if (form.id === 'teacherForm') return 'New Teacher Application - Hope International Tutor Academy';
    return 'New Contact Message - Hope International Tutor Academy';
}

function sendFormEmail(form, data) {
    const emailData = new FormData();

    Object.keys(data).forEach(key => {
        emailData.append(key, data[key]);
    });

    emailData.append('_to', FORM_EMAIL_RECIPIENT);
    emailData.append('formType', getFormType(form));
    emailData.append('_subject', getFormSubject(form));

    if (data.email) {
        emailData.append('_replyto', data.email);
    }

    return fetch(FORM_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: emailData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Email notification failed');
        }
        return response;
    });
}

function bindValidatedForm(form) {
    if (!form || form.dataset.validationBound === 'true') return;

    form.dataset.validationBound = 'true';
    form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('[required]');
            let valid = true;
            inputs.forEach(input => {
                input.style.borderColor = '';
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    valid = false;
                }
                if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                    input.style.borderColor = '#e74c3c';
                    valid = false;
                }
                if (input.type === 'tel' && input.value && !/^[\d\s\-+()]{7,15}$/.test(input.value)) {
                    input.style.borderColor = '#e74c3c';
                    valid = false;
                }
            });
            if (valid) {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Submitting...';
                btn.disabled = true;

                // Collect form data
                const data = {};
                new FormData(form).forEach((v, k) => { data[k] = v; });
                data.submittedAt = new Date().toISOString();
                const firestoreData = { ...data, source: 'static-html' };

                // Save to Firestore if available
                var collection = form.id === 'studentForm' ? 'studentRegistrations'
                    : form.id === 'studentPromptForm' ? 'studentRegistrations'
                    : form.id === 'teacherForm' ? 'teacherRegistrations' : null;

                const saveSubmission = window.db && collection
                    ? window.db.collection(collection).add(firestoreData).catch(error => {
                        console.warn('Firestore save failed after form submission.', error);
                    })
                    : Promise.resolve();

                sendFormEmail(form, data)
                    .then(() => saveSubmission)
                    .then(() => {
                        btn.textContent = 'Submitted Successfully!';
                        btn.style.background = '#22c55e';
                        form.reset();
                        if (form.id === 'studentPromptForm') {
                            setTimeout(closeStudentPrompt, 1200);
                        }
                    })
                    .catch(() => {
                        btn.textContent = 'Error! Try Again';
                        btn.style.background = '#e74c3c';
                    })
                    .finally(() => {
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.style.background = '';
                            btn.disabled = false;
                        }, 3000);
                    });
            }
        });
}

// Form validation (for registration pages)
document.addEventListener('DOMContentLoaded', () => {
    var navigationEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (isRegistrationPage()) {
        document.body.classList.add('registration-page');
        sessionStorage.setItem(STUDENT_PROMPT_DISMISSED_KEY, 'true');
    } else if (navigationEntry && navigationEntry.type === 'reload') {
        document.body.classList.remove('registration-page');
        sessionStorage.removeItem(STUDENT_PROMPT_DISMISSED_KEY);
    } else {
        document.body.classList.remove('registration-page');
    }

    document.querySelectorAll('form[data-validate]').forEach(bindValidatedForm);
    createStudentRegistrationPrompt();
});
