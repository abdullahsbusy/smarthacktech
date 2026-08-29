"use client";

import { useEffect, useRef } from "react";

/* Animated IoT-network particle field behind the home hero. Ported 1:1
   from app.js's #12 (animated IoT network hero canvas): capped point
   count, pauses off-screen / tab-hidden / reduced-motion. */

type Point = { x: number; y: number; vx: number; vy: number };

export function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let pts: Point[] = [];
    let raf = 0;
    let running = false;
    let onScreen = true;

    function size() {
      if (!cv) return;
      w = cv.width = cv.offsetWidth;
      h = cv.height = cv.offsetHeight;
      const count = Math.min(46, Math.round((w * h) / 22000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (let a = 0; a < pts.length; a++) {
        const p = pts[a];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let b = a + 1; b < pts.length; b++) {
          const q = pts[b];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(212,175,55,${0.18 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(212,175,55,.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, 7);
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    function start() {
      if (running) return;
      running = true;
      draw();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    size();
    start();

    function onResize() {
      stop();
      size();
      if (onScreen && !document.hidden) start();
    }
    function onVisibility() {
      if (document.hidden) stop();
      else if (onScreen) start();
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0].isIntersecting;
          if (onScreen && !document.hidden) start();
          else stop();
        },
        { threshold: 0 }
      );
      observer.observe(cv);
    }

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full" aria-hidden="true" />;
}
