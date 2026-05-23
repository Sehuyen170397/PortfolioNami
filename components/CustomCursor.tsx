"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const SECTION_LABELS: Record<string, string> = {
  hero: "Hi",
  work: "Take a look",
  about: "Thank u",
  contact: "Don't wait",
};

const WORK_PAGE_LABEL = "Truyen";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("Hi");
  const pathname = usePathname();

  // Derive label from pathname on work pages
  const isWorkPage = pathname.startsWith("/work/");

  // Animate text swap
  const animateLabel = (next: string) => {
    const el = labelRef.current;
    if (!el || el.textContent === next) return;
    gsap.to(el, {
      opacity: 0,
      y: -6,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        setLabel(next);
        gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" });
      },
    });
  };

  // Section observer — only on homepage
  useEffect(() => {
    if (isWorkPage) {
      animateLabel(WORK_PAGE_LABEL);
      return;
    }

    const sections = Object.keys(SECTION_LABELS);
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) animateLabel(SECTION_LABELS[id]);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isWorkPage, pathname]);

  // Mouse follow + hover
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0 });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(el, { opacity: 1, duration: 0.4 });
      }
      gsap.to(el, {
        x: e.clientX + 18,
        y: e.clientY + 4,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onDocLeave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    const onDocEnter = () => { if (visible) gsap.to(el, { opacity: 1, duration: 0.3 }); };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button'], input, textarea, select")) {
        gsap.to(el, { scale: 1.15, duration: 0.3, ease: "power3.out" });
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button'], input, textarea, select")) {
        gsap.to(el, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        borderRadius: 100,
        padding: "4px 8px",
        gap: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      <span
        ref={labelRef}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 600,
          fontSize: 11,
          color: "white",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}
