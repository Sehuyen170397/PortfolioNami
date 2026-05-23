"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useLang } from "@/contexts/LanguageContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Figma node 2022:24517 assets
const ASSETS = {
  f02: "https://www.figma.com/api/mcp/asset/93895430-5b57-43bc-bfb3-e41d285f0c93",
  f04: "https://www.figma.com/api/mcp/asset/dddd06aa-4715-4ef0-b038-034ca071bce0",
  f07: "https://www.figma.com/api/mcp/asset/70032c70-a984-4e36-b634-98d105201625",
  f09: "https://www.figma.com/api/mcp/asset/abb89005-9326-45ec-a6ff-bb22aa205535",
  f10: "https://www.figma.com/api/mcp/asset/86723249-9219-492a-b885-51904c1d5556",
  f11: "https://www.figma.com/api/mcp/asset/7c1b78fa-8af9-496a-997c-10cbc7b38ee7",
  f12: "https://www.figma.com/api/mcp/asset/cf89c484-8ab1-48d7-b59d-df160e1caa0a",
  f06: "https://www.figma.com/api/mcp/asset/afdfd3f6-c452-461c-829d-9db6b824c0a6",
};

// Per-frame parallax depth — indices 0-11 desktop, 12-23 mobile
const PARALLAX_Y = [
  60, 30, 45, 25, 50, 35, 40, 55, 30, 20, 45, 35,
  30, 15, 22, 12, 25, 17, 20, 27, 15, 10, 22, 17,
];

// Cumulative ms at which each step transition fires (6 transitions → 7 steps)
const STEP_SCHEDULE = [2000, 4000, 6000, 8000, 10000, 12000];

function StepContent({ step, lang }: { step: number; lang: string }) {
  const vi = lang === "vi";

  // Step 0 — "Truyen Vo"
  if (step === 0) {
    return (
      <p
        className="font-inter font-semibold text-[#1f1f1f] whitespace-nowrap text-center"
        style={{ fontSize: "clamp(40px, 7vw, 100px)", letterSpacing: "clamp(-3px, -0.21vw, -1px)" }}
      >
        Truyen Vo
      </p>
    );
  }

  // Step 1 — "UI/UX Designer"
  if (step === 1) {
    return (
      <p
        className="font-inter font-semibold text-[#1f1f1f] whitespace-nowrap text-center"
        style={{ fontSize: "clamp(40px, 7vw, 100px)", letterSpacing: "-3px" }}
      >
        {"UI/UX "}
        <span className="font-playfair italic font-medium">Designer</span>
      </p>
    );
  }

  // Step 2 — "Skills / Design system"
  if (step === 2) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <p
          className="font-playfair italic font-medium text-[#1f1f1f] text-center tracking-[-1px]"
          style={{ fontSize: "clamp(28px, 3.9vw, 56px)" }}
        >
          Skills
        </p>
        <p
          className="font-inter font-semibold text-[#1f1f1f] whitespace-nowrap"
          style={{ fontSize: "clamp(30px, 5.6vw, 80px)", letterSpacing: "-2.4px" }}
        >
          Design system
        </p>
      </div>
    );
  }

  // Step 3 — "Skills / Prototyping"
  if (step === 3) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <p
          className="font-playfair italic font-medium text-[#1f1f1f] text-center tracking-[-1px]"
          style={{ fontSize: "clamp(28px, 3.9vw, 56px)" }}
        >
          Skills
        </p>
        <p
          className="font-inter font-semibold text-[#1f1f1f] whitespace-nowrap"
          style={{ fontSize: "clamp(30px, 5.6vw, 80px)", letterSpacing: "-2.4px" }}
        >
          Prototyping
        </p>
      </div>
    );
  }

  // Step 4 — "Skills / Visual design"
  if (step === 4) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <p
          className="font-playfair italic font-medium text-[#1f1f1f] text-center tracking-[-1px]"
          style={{ fontSize: "clamp(28px, 3.9vw, 56px)" }}
        >
          Skills
        </p>
        <p
          className="font-inter font-semibold text-[#1f1f1f] whitespace-nowrap"
          style={{ fontSize: "clamp(30px, 5.6vw, 80px)", letterSpacing: "-2.4px" }}
        >
          Visual design
        </p>
      </div>
    );
  }

  // Step 5 — "...and much more"
  if (step === 5) {
    return (
      <p
        className="font-inter font-semibold text-[#1f1f1f] text-center"
        style={{ fontSize: "clamp(40px, 5.6vw, 80px)", letterSpacing: "-1px" }}
      >
        {"...and much "}
        <span className="font-playfair italic font-medium">more</span>
      </p>
    );
  }

  // Step 6 — final "Welcome!" + bio (resting state)
  return (
    <div className="flex flex-col items-center gap-[10px] w-[460px] max-md:w-full max-md:px-6">
      <h1
        className="font-playfair font-medium italic text-[#1f1f1f] tracking-[-1px] leading-normal whitespace-nowrap"
        style={{ fontSize: "clamp(48px, 6.5vw, 100px)" }}
      >
        {vi ? "Xin chào!" : "Welcome!"}
      </h1>
      <p className="font-inter font-light text-[15px] text-[#666] text-center leading-[24px]">
        {vi
          ? `Lớn lên ở Vũng Tàu, hiện đang "đóng đô" tại TP.HCM. Mình có hơn 3 năm làm việc trong crypto, fintech và bảo hiểm, cùng 4+ năm "lăn lộn" trong ngành thiết kế, từ graphic design đến UX/UI.`
          : "Vung Tau raised, Ho Chi Minh based. I have over 3 years of experience in crypto, fintech, and insurance. More than four years in design industry include graphic design."}
      </p>
    </div>
  );
}

export default function HeroSection() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Advance through the 7 hero states on page load
  useEffect(() => {
    const timeouts = STEP_SCHEDULE.map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Oscillating float ──
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `${(i % 2 === 0 ? -1 : 1) * (8 + (i % 3) * 4)}px`,
          duration: 2.5 + i * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });

      // ── Scroll parallax on each frame outer wrapper ──
      parallaxRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: -PARALLAX_Y[i],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ── Center content: scale + fade + rise as hero scrolls out ──
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -100,
          scale: 0.9,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "55% top",
            scrub: 1.2,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const setFloatRef = (i: number) => (el: HTMLDivElement | null) => {
    floatRefs.current[i] = el;
  };
  const setParallaxRef = (i: number) => (el: HTMLDivElement | null) => {
    parallaxRefs.current[i] = el;
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-white w-full overflow-x-clip max-md:!min-h-screen"
      style={{ minHeight: "max(100vh, 1110px)" }}
    >
      {/* ── Page-load curtain: slides upward to reveal the page ── */}
      <motion.div
        className="fixed inset-0 z-[300] bg-white pointer-events-none origin-top"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.0, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Frame 01 — left:424, top:-172, 246×418, -rotate-10, colored border ── */}
      <div
        ref={setParallaxRef(0)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ left: 424, top: -172, width: 246, height: 418 }}
      >
        <div ref={setFloatRef(0)}>
          <div
            className="-rotate-[10deg]"
            style={{ width: 181, height: 393, marginLeft: "auto", marginRight: "auto" }}
          >
            <div
              className="w-full h-full rounded-[18px] overflow-hidden"
              style={{ border: "1.5px solid #c3ffdd", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
            >
              <video
                src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733637/creative_suggest_welcome-video-780x1688-compressed_2_quwwwb.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Frame 02 — right:448, top:29, 80×80, round photo ── */}
      <div
        ref={setParallaxRef(1)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ right: 448, top: 29, width: 80, height: 80 }}
      >
        <div ref={setFloatRef(1)}>
          <img src={ASSETS.f02} alt="" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>

      {/* ── Frame 03 — right:-204, top:220, 487×327, -rotate-10, colored border ── */}
      <div
        ref={setParallaxRef(2)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ right: -204, top: 220, width: 487, height: 327 }}
      >
        <div ref={setFloatRef(2)}>
          <div className="-rotate-[10deg]" style={{ width: 450, height: 253 }}>
            <div
              className="w-full h-full rounded-[18px] overflow-hidden"
              style={{ border: "1.5px solid #4f00bd", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
            >
              <video
                src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733576/SCI_Lab_lqdaou.mov"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Frame 04 — left:287, top:55, 80×80, round photo ── */}
      <div
        ref={setParallaxRef(3)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ left: 287, top: 55, width: 80, height: 80 }}
      >
        <div ref={setFloatRef(3)}>
          <img src={ASSETS.f04} alt="" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>

      {/* ── Frame 05 — left:-215, top:228, 494×331, rotate-10, colored border ── */}
      <div
        ref={setParallaxRef(4)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ left: -215, top: 228, width: 494, height: 331 }}
      >
        <div ref={setFloatRef(4)}>
          <div className="rotate-[10deg]" style={{ width: 457, height: 256 }}>
            <div
              className="w-full h-full rounded-[18px] overflow-hidden"
              style={{ border: "1.5px solid #05261a", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
            >
              <video
                src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733701/Screen_Recording_2026-04-25_at_11.31.09_mkvixd.mov"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Frame 06 — left:268, top:743, 216×367, -rotate-10, app screenshot ── */}
      <div
        ref={setParallaxRef(5)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ left: 268, top: 743, width: 216, height: 367 }}
      >
        <div ref={setFloatRef(5)}>
          <div className="-rotate-[10deg]">
            <div
              className="overflow-hidden rounded-[18px]"
              style={{ width: 159, height: 345, border: "1.5px solid rgba(0,0,0,0.1)", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
            >
              <img src={ASSETS.f06} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Frame 07 — left:562, top:695, 98×98, round photo, -rotate-15 ── */}
      <div
        ref={setParallaxRef(6)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ left: 562, top: 695, width: 98, height: 98 }}
      >
        <div ref={setFloatRef(6)}>
          <div className="-rotate-[15deg]">
            <img src={ASSETS.f07} alt="" className="w-[80px] h-[80px] rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* ── Frame 08 — right:448.5, top:704, 212×361, rotate-10, colored border ── */}
      <div
        ref={setParallaxRef(7)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ right: 448.5, top: 704, width: 212, height: 361 }}
      >
        <div ref={setFloatRef(7)}>
          <div className="rotate-[10deg]">
            <div
              className="rounded-[17px] overflow-hidden"
              style={{ width: 156, height: 339, border: "1.5px solid #cd0518", boxShadow: "0 0 42px rgba(0,0,0,0.1)" }}
            >
              <video
                src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733412/Insurance_takxqq.mov"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Frame 09 — left:-52, top:799, 147×147, rotate-15 ── */}
      <div
        ref={setParallaxRef(8)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ left: -52, top: 799, width: 147, height: 147 }}
      >
        <div ref={setFloatRef(8)}>
          <div className="rotate-[15deg]">
            <img src={ASSETS.f09} alt="" className="w-[120px] h-[120px] object-cover" />
          </div>
        </div>
      </div>

      {/* ── Frame 10 — right:93, top:22, 60×60, round, glass shadow ── */}
      <div
        ref={setParallaxRef(9)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ right: 93, top: 22, width: 60, height: 60 }}
      >
        <div
          ref={setFloatRef(9)}
          className="w-full h-full backdrop-blur-[9px] overflow-hidden rounded-full glass-shadow"
        >
          <img src={ASSETS.f10} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      {/* ── Frame 11 — right:-29, top:773, 171×171, round photo, -rotate-15 ── */}
      <div
        ref={setParallaxRef(10)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ right: -29, top: 773, width: 171, height: 171 }}
      >
        <div ref={setFloatRef(10)}>
          <div className="-rotate-[15deg]">
            <img src={ASSETS.f11} alt="" className="w-[140px] h-[140px] rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* ── Frame 12 — right:268, top:617, 98×98, round photo, -rotate-15 ── */}
      <div
        ref={setParallaxRef(11)}
        className="absolute pointer-events-none max-md:hidden"
        style={{ right: 268, top: 617, width: 98, height: 98 }}
      >
        <div ref={setFloatRef(11)}>
          <div className="-rotate-[15deg]">
            <img src={ASSETS.f12} alt="" className="w-[80px] h-[80px] rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* ── Mobile Frames — only visible below md breakpoint ── */}

      {/* Mobile Frame 01 — left:116, top:-78, -rotate-10, green border, video */}
      <div ref={setParallaxRef(12)} className="absolute pointer-events-none md:hidden" style={{ left: 116, top: -78, width: 123, height: 209 }}>
        <div ref={setFloatRef(12)}>
          <div className="-rotate-[10deg]" style={{ width: 90.5, height: 196.5, marginLeft: "auto", marginRight: "auto" }}>
            <div className="w-full h-full rounded-[9px] overflow-hidden" style={{ border: "0.75px solid #c3ffdd", boxShadow: "0 0 22px rgba(0,0,0,0.1)" }}>
              <video src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733637/creative_suggest_welcome-video-780x1688-compressed_2_quwwwb.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Frame 02 — right:155, top:172, 40×40 round */}
      <div ref={setParallaxRef(13)} className="absolute pointer-events-none md:hidden" style={{ right: 155, top: 172, width: 40, height: 40 }}>
        <div ref={setFloatRef(13)}>
          <img src={ASSETS.f02} alt="" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>

      {/* Mobile Frame 03 — right:-115, top:130, -rotate-10, purple border, video */}
      <div ref={setParallaxRef(14)} className="absolute pointer-events-none md:hidden" style={{ right: -115, top: 130, width: 243, height: 163 }}>
        <div ref={setFloatRef(14)}>
          <div className="-rotate-[10deg]" style={{ width: 225, height: 126.5 }}>
            <div className="w-full h-full rounded-[9px] overflow-hidden" style={{ border: "0.75px solid #4f00bd", boxShadow: "0 0 22px rgba(0,0,0,0.1)" }}>
              <video src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733576/SCI_Lab_lqdaou.mov" autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Frame 04 — left:50, top:71, -rotate-15, round photo */}
      <div ref={setParallaxRef(15)} className="absolute pointer-events-none md:hidden" style={{ left: 50, top: 71, width: 49, height: 49 }}>
        <div ref={setFloatRef(15)}>
          <div className="-rotate-[15deg]">
            <img src={ASSETS.f04} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile Frame 05 — left:-102, top:148, rotate-10, dark green border, video */}
      <div ref={setParallaxRef(16)} className="absolute pointer-events-none md:hidden" style={{ left: -102, top: 148, width: 247, height: 165 }}>
        <div ref={setFloatRef(16)}>
          <div className="rotate-[10deg]" style={{ width: 228.5, height: 128 }}>
            <div className="w-full h-full rounded-[9px] overflow-hidden" style={{ border: "0.75px solid #05261a", boxShadow: "0 0 22px rgba(0,0,0,0.1)" }}>
              <video src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733701/Screen_Recording_2026-04-25_at_11.31.09_mkvixd.mov" autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Frame 06 — left:74, bottom:80, -rotate-10, app screenshot */}
      <div ref={setParallaxRef(17)} className="absolute pointer-events-none md:hidden" style={{ left: 74, top: 698, width: 108, height: 183 }}>
        <div ref={setFloatRef(17)}>
          <div className="-rotate-[10deg]">
            <div className="overflow-hidden rounded-[9px]" style={{ width: 79.5, height: 172, border: "0.75px solid rgba(0,0,0,0.1)", boxShadow: "0 0 22px rgba(0,0,0,0.1)" }}>
              <img src={ASSETS.f06} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Frame 07 — left:162, bottom:80, -rotate-15, round photo */}
      <div ref={setParallaxRef(18)} className="absolute pointer-events-none md:hidden" style={{ left: 162, top: 614, width: 49, height: 49 }}>
        <div ref={setFloatRef(18)}>
          <div className="-rotate-[15deg]">
            <img src={ASSETS.f07} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile Frame 08 — left:207, bottom:80, rotate-10, red border, video */}
      <div ref={setParallaxRef(19)} className="absolute pointer-events-none md:hidden" style={{ left: 207, top: 668, width: 106, height: 180 }}>
        <div ref={setFloatRef(19)}>
          <div className="rotate-[10deg]">
            <div className="rounded-[8.5px] overflow-hidden" style={{ width: 78, height: 169.5, border: "0.75px solid #cd0518", boxShadow: "0 0 21px rgba(0,0,0,0.1)" }}>
              <video src="https://res.cloudinary.com/diuvrdjar/video/upload/v1777733412/Insurance_takxqq.mov" autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Frame 09 — left:-49, bottom:80, rotate-15 */}
      <div ref={setParallaxRef(20)} className="absolute pointer-events-none md:hidden" style={{ left: -49, top: 630, width: 98, height: 98 }}>
        <div ref={setFloatRef(20)}>
          <div className="rotate-[15deg]">
            <img src={ASSETS.f09} alt="" className="w-[80px] h-[80px] object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile Frame 10 — right:36, top:51, 40×40 glass round */}
      <div ref={setParallaxRef(21)} className="absolute pointer-events-none md:hidden" style={{ right: 36, top: 51, width: 40, height: 40 }}>
        <div ref={setFloatRef(21)} className="w-full h-full backdrop-blur-[9px] overflow-hidden rounded-full glass-shadow">
          <img src={ASSETS.f10} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      </div>

      {/* Mobile Frame 11 — left:322, bottom:80, -rotate-15, 100×100 round */}
      <div ref={setParallaxRef(22)} className="absolute pointer-events-none md:hidden" style={{ left: 322, top: 714, width: 122, height: 122 }}>
        <div ref={setFloatRef(22)}>
          <div className="-rotate-[15deg]">
            <img src={ASSETS.f11} alt="" className="w-[100px] h-[100px] rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile Frame 12 — left:341, bottom:80, -rotate-15, 40×40 round */}
      <div ref={setParallaxRef(23)} className="absolute pointer-events-none md:hidden" style={{ left: 341, top: 575, width: 49, height: 49 }}>
        <div ref={setFloatRef(23)}>
          <div className="-rotate-[15deg]">
            <img src={ASSETS.f12} alt="" className="w-[40px] h-[40px] rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* ── Center text — animated step sequence ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div ref={contentRef} className="md:-mt-[120px] max-md:-mt-[40px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step >= 2 && step <= 4 ? (
              // Steps 2-4 share key="skills" so the outer div stays mounted.
              // "Skills" label is a plain element — never re-animates between steps 2→3→4.
              // Only the skill name below it is inside its own AnimatePresence.
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.18, ease: "easeIn" } }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-0.5"
              >
                <p
                  className="font-playfair italic font-medium text-[#1f1f1f] text-center tracking-[-1px]"
                  style={{ fontSize: "clamp(32px, 3.9vw, 56px)" }}
                >
                  Skills
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={step}
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.15, ease: "easeIn" } }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-inter font-semibold text-[#1f1f1f] whitespace-nowrap"
                    style={{ fontSize: "clamp(40px, 5.6vw, 80px)", letterSpacing: "clamp(-2.4px, -0.167vw, -1px)" }}
                  >
                    {step === 2 ? "Design system" : step === 3 ? "Prototyping" : "Visual design"}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.18, ease: "easeIn" } }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: step === 0 ? 0.4 : 0 }}
                className="flex items-center justify-center"
              >
                <StepContent step={step} lang={lang} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
