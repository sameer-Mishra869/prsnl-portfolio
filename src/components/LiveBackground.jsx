import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// ─── Particle class ──────────────────────────────────────────────────────────
class Particle {
  constructor(canvas, palette) {
    this.canvas = canvas;
    this.palette = palette;
    this.reset();
  }

  reset() {
    const { width, height } = this.canvas;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2.2 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.opacity = Math.random() * 0.55 + 0.12;
    this.color = this.palette[Math.floor(Math.random() * this.palette.length)];
    this.pulse = Math.random() * Math.PI * 2; // phase offset for pulsing
    this.pulseSpeed = Math.random() * 0.018 + 0.008;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += this.pulseSpeed;

    const { width, height } = this.canvas;
    // Wrap around edges
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    if (this.y < -10) this.y = height + 10;
    if (this.y > height + 10) this.y = -10;
  }

  draw(ctx) {
    const dynamicOpacity = this.opacity * (0.75 + 0.25 * Math.sin(this.pulse));
    ctx.save();
    ctx.globalAlpha = dynamicOpacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ─── Orb class ───────────────────────────────────────────────────────────────
class Orb {
  constructor(canvas, colors, index) {
    this.canvas = canvas;
    this.colors = colors;
    this.index = index;
    this.reset();
  }

  reset() {
    const { width, height } = this.canvas;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.targetX = Math.random() * width;
    this.targetY = Math.random() * height;
    this.radius = Math.random() * 220 + 140;
    this.colorA = this.colors[this.index % this.colors.length];
    this.colorB = this.colors[(this.index + 1) % this.colors.length];
    this.speed = Math.random() * 0.0008 + 0.0004;
    this.angle = Math.random() * Math.PI * 2;
    this.orbitRadius = Math.random() * 180 + 80;
    this.centerX = Math.random() * width;
    this.centerY = Math.random() * height;
    this.opacity = Math.random() * 0.22 + 0.1;
  }

  update() {
    this.angle += this.speed;
    this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
    this.y = this.centerY + Math.sin(this.angle * 0.7) * this.orbitRadius;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    const grad = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    grad.addColorStop(0, this.colorA);
    grad.addColorStop(0.5, this.colorB);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function LiveBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ particles: [], orbs: [], mouse: { x: -9999, y: -9999 } });
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ── Color palettes ──
    const lightParticlePalette = ["#d36b46", "#e6a15c", "#8da080", "#c8a882", "#b8886a"];
    const darkParticlePalette  = ["#e07e59", "#f2b880", "#a4b59c", "#e0c4a0", "#c87a55"];

    const lightOrbColors = [
      "rgba(211,107,70,0.7)",
      "rgba(230,161,92,0.6)",
      "rgba(141,160,128,0.5)",
      "rgba(232,197,147,0.55)",
    ];
    const darkOrbColors = [
      "rgba(224,126,89,0.75)",
      "rgba(242,184,128,0.6)",
      "rgba(164,181,156,0.5)",
      "rgba(247,213,165,0.55)",
    ];

    const palette = isDark ? darkParticlePalette : lightParticlePalette;
    const orbColors = isDark ? darkOrbColors : lightOrbColors;

    // ── Resize handler ──
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      const PARTICLE_COUNT = Math.min(Math.floor((canvas.width * canvas.height) / 7000), 160);
      const ORB_COUNT = 6;

      stateRef.current.particles = Array.from({ length: PARTICLE_COUNT }, () =>
        new Particle(canvas, palette)
      );
      stateRef.current.orbs = Array.from({ length: ORB_COUNT }, (_, i) =>
        new Orb(canvas, orbColors, i)
      );
    };

    // ── Mouse tracking for subtle interaction ──
    const onMouseMove = (e) => {
      stateRef.current.mouse.x = e.clientX;
      stateRef.current.mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Draw connection lines between nearby particles ──
    const drawConnections = (particles) => {
      const maxDist = 90;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = isDark ? "#e07e59" : "#d36b46";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // ── Draw subtle dot grid ──
    const drawGrid = () => {
      const spacing = 55;
      const dotSize = 0.9;
      const dotAlpha = isDark ? 0.055 : 0.08;
      ctx.save();
      ctx.fillStyle = isDark ? "#e07e59" : "#b8886a";
      ctx.globalAlpha = dotAlpha;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // ── Mouse-attracted glow ──
    const drawMouseGlow = () => {
      const { x, y } = stateRef.current.mouse;
      if (x < 0 || x > canvas.width) return;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 160);
      grad.addColorStop(0, isDark ? "rgba(224,126,89,0.08)" : "rgba(211,107,70,0.06)");
      grad.addColorStop(1, "transparent");
      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 160, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // ── Animation loop ──
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dot grid (static)
      drawGrid();

      // Draw & update orbs (deep background layer)
      stateRef.current.orbs.forEach((orb) => {
        orb.update();
        orb.draw(ctx);
      });

      // Draw connection lines
      drawConnections(stateRef.current.particles);

      // Draw mouse glow
      drawMouseGlow();

      // Draw & update particles (top layer)
      stateRef.current.particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 1,
      }}
      aria-hidden="true"
    />
  );
}
