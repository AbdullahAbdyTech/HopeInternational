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

// Form validation (for registration pages)
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
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
                btn.textContent = 'Submitting...';
                btn.disabled = true;

                // Collect form data
                const data = {};
                new FormData(form).forEach((v, k) => { data[k] = v; });
                data.submittedAt = new Date().toISOString();

                // Save to Firestore if available
                var collection = form.id === 'studentForm' ? 'studentRegistrations'
                    : form.id === 'teacherForm' ? 'teacherRegistrations' : null;

                if (window.db && collection) {
                    window.db.collection(collection).add(data)
                        .then(() => {
                            btn.textContent = 'Submitted Successfully!';
                            btn.style.background = '#22c55e';
                            form.reset();
                        })
                        .catch(() => {
                            btn.textContent = 'Error! Try Again';
                            btn.style.background = '#e74c3c';
                            btn.disabled = false;
                        })
                        .finally(() => {
                            setTimeout(() => {
                                btn.textContent = 'Submit Registration';
                                btn.style.background = '';
                                btn.disabled = false;
                            }, 3000);
                        });
                } else {
                    btn.textContent = 'Submitted Successfully!';
                    btn.style.background = '#22c55e';
                    form.reset();
                    setTimeout(() => {
                        btn.textContent = 'Submit';
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                }
            }
        });
    });
});
