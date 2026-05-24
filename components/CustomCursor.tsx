"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const SECTION_LABELS: Record<string, string> = {
  hero: "hi",
  work: "take a look",
  about: "thank u",
  contact: "don't wait",
};

const WORK_PAGE_LABEL = "truyen";
const NAV_HOVER_LABEL = "back to home";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("Hi");
  const pathname = usePathname();

  const isWorkPage = pathname.startsWith("/work/");
  const isWorkPageRef = useRef(isWorkPage);
  useEffect(() => { isWorkPageRef.current = isWorkPage; }, [isWorkPage]);

  // Animate text swap — stable via ref
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
  const animateLabelRef = useRef(animateLabel);
  useEffect(() => { animateLabelRef.current = animateLabel; });

  // Section observer — homepage only
  useEffect(() => {
    if (isWorkPage) {
      animateLabel(WORK_PAGE_LABEL);
      return;
    }

    const observers: IntersectionObserver[] = [];
    Object.keys(SECTION_LABELS).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) animateLabelRef.current(SECTION_LABELS[id]); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isWorkPage, pathname]);

  // Mouse follow + hover
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0 });

    if (!window.matchMedia("(pointer: fine)").matches) return;

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
      const target = e.target as Element;
      if (!target.closest("a, button, [role='button'], input, textarea, select")) return;
      gsap.to(el, { scale: 1.15, duration: 0.3, ease: "power3.out" });
      if (isWorkPageRef.current && target.closest("nav")) {
        animateLabelRef.current(NAV_HOVER_LABEL);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("a, button, [role='button'], input, textarea, select")) return;
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power3.out" });
      if (isWorkPageRef.current && target.closest("nav")) {
        animateLabelRef.current(WORK_PAGE_LABEL);
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
      className="max-md:hidden fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        borderRadius: 100,
        padding: "4px 8px",
        gap: 7,
        background: "white",
        mixBlendMode: "exclusion",
      }}
    >
      <span
        ref={labelRef}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 500,
          fontSize: "11px",
          lineHeight: "normal",
          color: "black",
          whiteSpace: "nowrap",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {label}
      </span>
    </div>
  );
}
