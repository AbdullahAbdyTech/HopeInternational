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
                if (window.db && form.id === 'studentForm') {
                    window.db.collection('studentRegistrations').add(data)
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
