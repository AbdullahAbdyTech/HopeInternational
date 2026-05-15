"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  radius: number;
  opacity: number;
  color: string;
  phase: number;
  twinkleSpeed: number;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  color: string;
  phase: number;
  twinkleSpeed: number;
};

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let particles: Particle[] = [];
    let stars: Star[] = [];
    let animationFrame = 0;
    let running = true;
    const mouse = { x: -1000, y: -1000 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = ["255,255,255", "248,231,179", "125,229,255", "244,170,255", "229,168,32"];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = parent.offsetWidth * pixelRatio;
      canvas.height = parent.offsetHeight * pixelRatio;
      canvas.style.width = `${parent.offsetWidth}px`;
      canvas.style.height = `${parent.offsetHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createParticles = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const galaxyCount = Math.min(Math.floor((width * height) / 13500), 92);
      const starCount = Math.min(Math.floor((width * height) / 8500), 150);
      const centerX = width * 0.7;
      const centerY = height * 0.43;
      const galaxyRadius = Math.max(width, height) * 0.5;

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.25,
        opacity: Math.random() * 0.42 + 0.24,
        color: palette[Math.floor(Math.random() * palette.length)],
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.0014 + 0.0007
      }));

      particles = Array.from({ length: galaxyCount }, (_, index) => {
        const arm = index % 4;
        const orbit = Math.pow(Math.random(), 0.58) * galaxyRadius;
        const baseAngle = Math.random() * Math.PI * 2 + arm * (Math.PI / 2);
        const spiralAngle = baseAngle + orbit * 0.0075;
        const spread = (Math.random() - 0.5) * Math.min(92, width * 0.09);
        const tangentX = Math.cos(spiralAngle + Math.PI / 2) * spread;
        const tangentY = Math.sin(spiralAngle + Math.PI / 2) * spread * 0.48;

        return {
          x: centerX + Math.cos(spiralAngle) * orbit + tangentX,
          y: centerY + Math.sin(spiralAngle) * orbit * 0.46 + tangentY,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          driftX: (Math.random() - 0.5) * 0.006,
          driftY: (Math.random() - 0.5) * 0.006,
          radius: Math.random() * 1.45 + 0.65,
          opacity: Math.random() * 0.28 + 0.18,
          color: palette[Math.floor(Math.random() * palette.length)],
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.0018 + 0.001
        };
      });
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const time = performance.now();
      const centerX = width * 0.7;
      const centerY = height * 0.43;
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(2,6,23,0.14)");
      gradient.addColorStop(0.48, "rgba(30,41,80,0.1)");
      gradient.addColorStop(1, "rgba(3,7,18,0.02)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const nebula = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.62);
      nebula.addColorStop(0, "rgba(255,255,255,0.14)");
      nebula.addColorStop(0.18, "rgba(125,229,255,0.11)");
      nebula.addColorStop(0.42, "rgba(244,170,255,0.075)");
      nebula.addColorStop(0.7, "rgba(229,168,32,0.04)");
      nebula.addColorStop(1, "rgba(2,6,23,0)");
      context.fillStyle = nebula;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "lighter";

      stars.forEach((star) => {
        const pulse = 0.68 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.32;
        const alpha = star.opacity * pulse;
        context.beginPath();
        context.arc(star.x, star.y, star.radius * (0.8 + pulse * 0.35), 0, Math.PI * 2);
        context.fillStyle = `rgba(${star.color},${alpha})`;
        context.fill();

        if (star.radius > 0.9 && alpha > 0.35) {
          context.strokeStyle = `rgba(${star.color},${alpha * 0.5})`;
          context.lineWidth = 0.45;
          context.beginPath();
          context.moveTo(star.x - star.radius * 3, star.y);
          context.lineTo(star.x + star.radius * 3, star.y);
          context.moveTo(star.x, star.y - star.radius * 3);
          context.lineTo(star.x, star.y + star.radius * 3);
          context.stroke();
        }
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 118) {
            const opacity = (1 - distance / 118) * 0.1;
            context.strokeStyle = `rgba(125,229,255,${opacity})`;
            context.lineWidth = 0.45;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        const mdx = particle.x - mouse.x;
        const mdy = particle.y - mouse.y;
        const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mouseDistance > 0 && mouseDistance < 170) {
          const force = ((170 - mouseDistance) / 170) * 0.018;
          particle.vx += (mouse.x - particle.x) * force * 0.002;
          particle.vy += (mouse.y - particle.y) * force * 0.002;

          context.strokeStyle = `rgba(248,231,179,${force * 2.6})`;
          context.lineWidth = 0.55;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(mouse.x, mouse.y);
          context.stroke();
        }

        const orbitDx = particle.x - centerX;
        const orbitDy = (particle.y - centerY) / 0.48;
        const orbitDistance = Math.max(Math.sqrt(orbitDx * orbitDx + orbitDy * orbitDy), 1);
        particle.vx += (-orbitDy / orbitDistance) * 0.008;
        particle.vy += (orbitDx / orbitDistance) * 0.0038;
        particle.vx += particle.driftX;
        particle.vy += particle.driftY;
        particle.vx *= 0.988;
        particle.vy *= 0.988;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -24) particle.x = width + 24;
        if (particle.x > width + 24) particle.x = -24;
        if (particle.y < -24) particle.y = height + 24;
        if (particle.y > height + 24) particle.y = -24;

        const pulse = 0.7 + Math.sin(time * particle.twinkleSpeed + particle.phase) * 0.3;
        const glow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 8
        );
        glow.addColorStop(0, `rgba(${particle.color},${particle.opacity * pulse * 0.38})`);
        glow.addColorStop(1, `rgba(${particle.color},0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(${particle.color},${particle.opacity * pulse})`;
        context.fill();
      });

      context.restore();

      if (running && !reduceMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;

      if (nextX < 0 || nextY < 0 || nextX > rect.width || nextY > rect.height) {
        mouse.x = -1000;
        mouse.y = -1000;
        return;
      }

      mouse.x = nextX;
      mouse.y = nextY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const onResize = () => {
      resize();
      createParticles();
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}
