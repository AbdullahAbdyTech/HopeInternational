// ===== AI-INSPIRED VISUAL EFFECTS =====
// Neural particles, cursor glow, 3D tilt, magnetic buttons, parallax orbs

(function () {
    'use strict';

    // ─── NEURAL NETWORK PARTICLE SYSTEM ───
    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: -1000, y: -1000 };
        let animFrame;
        const palette = ['255,255,255', '248,231,179', '125,229,255', '244,170,255', '229,168,32'];

        function resize() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 95);
            const centerX = canvas.width * 0.68;
            const centerY = canvas.height * 0.43;
            const galaxyRadius = Math.max(canvas.width, canvas.height) * 0.5;
            for (let i = 0; i < count; i++) {
                const arm = i % 4;
                const orbit = Math.pow(Math.random(), 0.58) * galaxyRadius;
                const baseAngle = Math.random() * Math.PI * 2 + arm * (Math.PI / 2);
                const spiralAngle = baseAngle + orbit * 0.0075;
                const spread = (Math.random() - 0.5) * Math.min(92, canvas.width * 0.09);

                particles.push({
                    x: centerX + Math.cos(spiralAngle) * orbit + Math.cos(spiralAngle + Math.PI / 2) * spread,
                    y: centerY + Math.sin(spiralAngle) * orbit * 0.46 + Math.sin(spiralAngle + Math.PI / 2) * spread * 0.48,
                    vx: (Math.random() - 0.5) * 0.1,
                    vy: (Math.random() - 0.5) * 0.1,
                    driftX: (Math.random() - 0.5) * 0.006,
                    driftY: (Math.random() - 0.5) * 0.006,
                    radius: Math.random() * 1.45 + 0.65,
                    opacity: Math.random() * 0.28 + 0.18,
                    color: palette[Math.floor(Math.random() * palette.length)],
                    phase: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.0018 + 0.001
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = performance.now();
            const centerX = canvas.width * 0.68;
            const centerY = canvas.height * 0.43;

            const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            bg.addColorStop(0, 'rgba(2,6,23,0.18)');
            bg.addColorStop(0.5, 'rgba(30,41,80,0.12)');
            bg.addColorStop(1, 'rgba(3,7,18,0.04)');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const nebula = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(canvas.width, canvas.height) * 0.62);
            nebula.addColorStop(0, 'rgba(255,255,255,0.13)');
            nebula.addColorStop(0.2, 'rgba(125,229,255,0.1)');
            nebula.addColorStop(0.44, 'rgba(244,170,255,0.07)');
            nebula.addColorStop(0.74, 'rgba(229,168,32,0.04)');
            nebula.addColorStop(1, 'rgba(2,6,23,0)');
            ctx.fillStyle = nebula;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 126) {
                        const opacity = (1 - dist / 126) * 0.1;
                        ctx.strokeStyle = `rgba(125,229,255,${opacity})`;
                        ctx.lineWidth = 0.45;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles and mouse interaction
            particles.forEach(p => {
                // Mouse repulsion
                const mdx = p.x - mouse.x;
                const mdy = p.y - mouse.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist > 0 && mDist < 180) {
                    const force = (180 - mDist) / 180 * 0.018;
                    p.vx += (mouse.x - p.x) * force * 0.002;
                    p.vy += (mouse.y - p.y) * force * 0.002;

                    // Draw connection to mouse
                    const lineOpacity = (1 - mDist / 180) * 0.12;
                    ctx.strokeStyle = `rgba(248,231,179,${lineOpacity})`;
                    ctx.lineWidth = 0.55;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                const orbitDx = p.x - centerX;
                const orbitDy = (p.y - centerY) / 0.48;
                const orbitDistance = Math.max(Math.sqrt(orbitDx * orbitDx + orbitDy * orbitDy), 1);
                p.vx += (-orbitDy / orbitDistance) * 0.008;
                p.vy += (orbitDx / orbitDistance) * 0.0038;
                p.vx += p.driftX;
                p.vy += p.driftY;

                // Damping
                p.vx *= 0.988;
                p.vy *= 0.988;

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < -24) p.x = canvas.width + 24;
                if (p.x > canvas.width + 24) p.x = -24;
                if (p.y < -24) p.y = canvas.height + 24;
                if (p.y > canvas.height + 24) p.y = -24;

                const pulse = 0.7 + Math.sin(time * p.twinkleSpeed + p.phase) * 0.3;
                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 8);
                glow.addColorStop(0, `rgba(${p.color},${p.opacity * pulse * 0.38})`);
                glow.addColorStop(1, `rgba(${p.color},0)`);
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 8, 0, Math.PI * 2);
                ctx.fill();

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color},${p.opacity * pulse})`;
                ctx.fill();
            });

            ctx.restore();
            animFrame = requestAnimationFrame(drawParticles);
        }

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        canvas.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        // Make canvas interactive for particles only
        canvas.style.pointerEvents = 'auto';
        canvas.style.cursor = 'default';

        resize();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });
    }

    // ─── CUSTOM CURSOR GLOW ───
    function initCursorGlow() {
        if (window.matchMedia('(hover: none)').matches) return;

        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        let glowX = 0, glowY = 0, currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            glowX = e.clientX;
            glowY = e.clientY;
            glow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            glow.classList.remove('active');
        });

        function animateGlow() {
            currentX += (glowX - currentX) * 0.08;
            currentY += (glowY - currentY) * 0.08;
            glow.style.left = currentX + 'px';
            glow.style.top = currentY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // ─── 3D TILT EFFECT ON CARDS ───
    function initTiltCards() {
        const cards = document.querySelectorAll('.service-card, .why-card, .testimonial-card, .stat-card, .hero-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // ─── MAGNETIC BUTTON EFFECT ───
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.classList.add('btn-magnetic');

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ─── PARALLAX FLOATING ORBS ───
    function initParallaxOrbs() {
        const orbContainer = document.createElement('div');
        orbContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
        document.body.appendChild(orbContainer);

        const orbData = [
            { class: 'parallax-orb-1', x: '15%', y: '25%', speed: 0.02 },
            { class: 'parallax-orb-2', x: '80%', y: '15%', speed: 0.035 },
            { class: 'parallax-orb-3', x: '60%', y: '70%', speed: 0.025 },
            { class: 'parallax-orb-1', x: '90%', y: '55%', speed: 0.03 },
            { class: 'parallax-orb-2', x: '25%', y: '80%', speed: 0.02 },
            { class: 'parallax-orb-3', x: '45%', y: '40%', speed: 0.04 },
        ];

        const orbs = orbData.map(data => {
            const orb = document.createElement('div');
            orb.className = `parallax-orb ${data.class}`;
            orb.style.left = data.x;
            orb.style.top = data.y;
            orbContainer.appendChild(orb);
            // Show after brief delay
            setTimeout(() => orb.classList.add('visible'), 500);
            return { el: orb, speed: data.speed, baseX: parseFloat(data.x), baseY: parseFloat(data.y) };
        });

        let scrollY = 0;
        let mouseX = 0, mouseY = 0;

        window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animateOrbs() {
            orbs.forEach(orb => {
                const offsetX = mouseX * 30 * orb.speed * 10;
                const offsetY = (scrollY * orb.speed * -1) + (mouseY * 20 * orb.speed * 10);
                orb.el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
            requestAnimationFrame(animateOrbs);
        }
        animateOrbs();
    }

    // ─── TEXT REVEAL ANIMATION ───
    function initTextReveal() {
        const heroH1 = document.querySelector('.hero h1');
        if (!heroH1) return;

        // Apply gradient animation to highlight text
        const highlight = heroH1.querySelector('.highlight');
        if (highlight) {
            highlight.classList.add('gradient-text-animated');
        }
    }

    // ─── MORPHING BLOBS IN SECTIONS ───
    function initMorphingBlobs() {
        const sections = [
            { selector: '.services', blob1: { top: '-100px', right: '-80px' }, blob2: { bottom: '-80px', left: '-60px' } },
            { selector: '.why-us', blob1: { top: '-60px', left: '-100px' }, blob3: { bottom: '-50px', right: '-80px' } },
            { selector: '.testimonials', blob2: { top: '-80px', right: '-100px' }, blob1: { bottom: '-60px', left: '-80px' } },
        ];

        sections.forEach(sec => {
            const el = document.querySelector(sec.selector);
            if (!el) return;
            el.style.position = 'relative';
            el.style.overflow = 'hidden';

            Object.keys(sec).forEach(key => {
                if (key === 'selector') return;
                const blobClass = key.replace(/\d/, '') + '-' + key.slice(-1);
                const blob = document.createElement('div');
                blob.className = `ai-blob ai-blob-${key.slice(-1)}`;
                Object.assign(blob.style, sec[key]);
                blob.style.position = 'absolute';
                el.appendChild(blob);
            });
        });
    }

    // ─── CARD SHIMMER EFFECT ───
    function initCardShimmer() {
        document.querySelectorAll('.service-card, .testimonial-card, .why-card').forEach(card => {
            card.classList.add('card-shimmer');
        });
    }

    // ─── SCALE-IN FOR SUBJECT PILLS ───
    function initSubjectPillsAnimation() {
        const pills = document.querySelectorAll('.subject-pill');
        if (!pills.length) return;

        pills.forEach((pill, i) => {
            pill.classList.add('scale-in');
            pill.style.transitionDelay = `${i * 0.06}s`;
        });

        const pillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.scale-in').forEach(el => el.classList.add('visible'));
                    pillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const grid = document.querySelector('.subjects-grid');
        if (grid) pillObserver.observe(grid);
    }

    // ─── SMOOTH NUMBER GLOW ON STATS ───
    function initStatGlow() {
        document.querySelectorAll('.stat-number').forEach(num => {
            num.style.textShadow = '0 0 20px rgba(13,115,119,0.3)';
        });
    }

    // ─── SECTION GLOW DIVIDERS ───
    function initGlowDividers() {
        const sections = document.querySelectorAll('.services, .why-us, .subjects, .testimonials');
        sections.forEach(sec => {
            const hr = document.createElement('hr');
            hr.className = 'section-glow-divider';
            sec.parentNode.insertBefore(hr, sec);
        });
    }

    // ─── INITIALIZE ALL EFFECTS ───
    function init() {
        initParticles();
        initTiltCards();
        initMagneticButtons();
        initTextReveal();
        initCardShimmer();
        initSubjectPillsAnimation();
        initStatGlow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
