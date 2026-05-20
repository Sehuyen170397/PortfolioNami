"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ASSETS = {
  containerNamiExchange:
    "https://www.figma.com/api/mcp/asset/cdfd7fe6-2023-44b3-abb7-6514e8a9d70f",
  containerInsurance:
    "https://www.figma.com/api/mcp/asset/ae7b3cdf-c097-4ffe-8790-4f94315d49f6",
  containerHighway:
    "https://www.figma.com/api/mcp/asset/f5e69061-701f-4d9a-8eeb-3a4ea54483b1",
};

// Card height is set explicitly via inline style — no measurement needed
const CARD_H = 700;
const PEEK = 80;

const projects = [
  {
    id: "nami-exchange",
    category: "Nami Exchange / Mobile app & Website",
    title:
      "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products",
    domain: "Crypto",
    years: "3+",
    label: "Years partnership",
    image: ASSETS.containerNamiExchange,
    dark: false,
  },
  {
    id: "nami-insurance",
    category: "Nami Insurance / Website",
    title: "Decentralize, adaptability, Financial",
    domain: "Dafi Insurance",
    years: "1+",
    label: "Years partnership",
    image: ASSETS.containerInsurance,
    dark: true,
  },
  {
    id: "highway",
    category: "Highway / Mobile app",
    title: "Simplifying Access to Digital Assets",
    domain: "Crypto",
    years: "1+",
    label: "Years partnership",
    image: ASSETS.containerHighway,
    dark: true,
  },
];

function ArrowUpRight({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 15L15 5M15 5H7M15 5v8"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkCardDesktop({
  project,
  index,
  cardRef,
}: {
  project: (typeof projects)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const tc = project.dark ? "text-white" : "text-[#1f1f1f]";
  const arrowColor = project.dark ? "white" : "#1f1f1f";

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 overflow-hidden rounded-[40px] border border-[rgba(0,0,0,0.1)] flex"
      style={{ zIndex: (index + 1) * 10 }}
    >
      {/* Image — full bleed background */}
      <div className="flex-1 overflow-hidden rounded-xl relative min-w-0">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Content overlay — left panel */}
      <div className="absolute left-0 top-0 w-[680px] h-full p-[60px] flex flex-col gap-5">
        <div className="flex flex-1 flex-col justify-between pb-4 pt-1">
          <div className="flex flex-col gap-6">
            <p className={`font-inter font-normal text-[16px] leading-normal ${tc}`}>
              {project.category}
            </p>
            <h3 className={`font-inter font-semibold text-[40px] leading-tight ${tc}`}>
              {project.title}
            </h3>
          </div>
          <button className="flex items-center gap-4 bg-[rgba(0,0,0,0.1)] backdrop-blur-[8px] border border-[rgba(0,0,0,0.2)] rounded-full px-6 py-2 w-fit hover:bg-[rgba(0,0,0,0.18)] transition-colors">
            <span className={`font-inter font-semibold text-[24px] ${tc}`}>
              View Project
            </span>
            <ArrowUpRight color={arrowColor} />
          </button>
        </div>

        <div className="flex gap-8 pt-5">
          <div className="flex flex-col gap-3">
            <span className={`font-inter font-bold text-[24px] leading-normal ${tc}`}>
              {project.domain}
            </span>
            <span className={`font-inter font-normal text-[16px] leading-normal ${tc} opacity-70`}>
              Domain
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className={`font-inter font-bold text-[24px] leading-normal ${tc}`}>
              {project.years}
            </span>
            <span className={`font-inter font-normal text-[16px] leading-normal ${tc} opacity-70`}>
              {project.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCardMobile({ project }: { project: (typeof projects)[0] }) {
  const tc = project.dark ? "text-white" : "text-[#1f1f1f]";
  const arrowColor = project.dark ? "white" : "#1f1f1f";
  const cardBg = project.dark ? "" : "bg-[#f2f2f2]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full overflow-hidden rounded-[24px] border border-[rgba(0,0,0,0.1)] flex flex-col ${cardBg}`}
    >
      <div className="h-[220px] overflow-hidden relative rounded-t-[12px]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-4 pt-3 pb-5">
        <div className="flex flex-col gap-4 pt-2">
          <p className={`font-inter font-normal text-[14px] leading-normal ${tc}`}>
            {project.category}
          </p>
          <h3 className={`font-inter font-semibold text-[22px] leading-tight ${tc}`}>
            {project.title}
          </h3>
        </div>
        <button className="flex items-center gap-3 bg-[rgba(0,0,0,0.1)] backdrop-blur-[8px] border border-[rgba(0,0,0,0.2)] rounded-full px-5 py-2 w-fit mt-2 hover:bg-[rgba(0,0,0,0.15)] transition-colors">
          <span className={`font-inter font-semibold text-[18px] ${tc}`}>View Project</span>
          <ArrowUpRight color={arrowColor} />
        </button>
        <div className="flex gap-8 pt-3 border-t border-[rgba(0,0,0,0.08)] mt-1">
          <div className="flex flex-col gap-1.5">
            <span className={`font-inter font-semibold text-[18px] ${tc}`}>{project.domain}</span>
            <span className={`font-inter font-light text-[13px] ${tc} opacity-70`}>Domain</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={`font-inter font-semibold text-[18px] ${tc}`}>{project.years}</span>
            <span className={`font-inter font-light text-[13px] ${tc} opacity-70`}>{project.label}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ViewMoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M5 13L13 5M13 5H7M13 5v6"
        stroke="#1f1f1f"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const [c0, c1, c2] = cardRefs.current;
      if (!c0 || !c1 || !c2) return;

      /*
       * Deck-of-cards stacking (yellowpeach-style):
       *
       * All cards are position:absolute inset:0 inside a CARD_H-tall container.
       * c0 is at y=0 (fully visible).
       * c1 starts at y = CARD_H - PEEK so only PEEK px peek at the bottom.
       * c2 starts at y = CARD_H (fully below the clipping container).
       *
       * z-index order: c0=10 < c1=20 < c2=30  so each new card slides on top.
       *
       * CARD_H is used directly — the container has an explicit inline style
       * matching this constant, so measuring is unnecessary.
       */
      gsap.set(c0, { y: 0 });
      gsap.set(c1, { y: CARD_H - PEEK }); // 620px down → 80px visible at bottom
      gsap.set(c2, { y: CARD_H });         // 700px down → fully hidden

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${CARD_H * 2}`, // 1400px of scroll for 2 transitions
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate(self) {
            if (!counterRef.current) return;
            const idx = Math.min(2, Math.floor(self.progress * 2.99));
            counterRef.current.textContent = String(idx + 1).padStart(2, "0");
          },
          onLeave() {
            // After last card is fully visible, scroll to About
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          },
        },
      });

      // Header fades out during the first ~35% of scroll progress
      if (headerRef.current) {
        tl.to(headerRef.current, { opacity: 0, duration: 0.35, ease: "none" }, 0);
      }

      // Transition 1 (tl position 0 → 1): c1 covers c0, c2 moves to peek position
      tl.to(c1, { y: 0, duration: 1, ease: "none" }, 0)
        .to(c2, { y: CARD_H - PEEK, duration: 1, ease: "none" }, 0);

      // Transition 2 (tl position 1 → 2): c2 covers c1
      tl.to(c2, { y: 0, duration: 1, ease: "none" }, 1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      /*
       * z-[50]: ensures this section stays above AboutSection (z-auto) when
       * GSAP makes it position:fixed during the pin phase.
       */
      className="flex flex-col gap-6 items-start pb-[120px] pt-[120px] px-[40px] relative w-full bg-white max-md:pt-[80px] max-md:pb-[60px] max-md:px-6 z-[50]"
    >
      {/* Header — starts visible, GSAP fades to opacity:0 on first scroll */}
      <div
        ref={headerRef}
        className="w-full flex flex-col items-center justify-center pb-6"
      >
        <h2
          className="font-playfair font-medium italic text-[#1f1f1f] tracking-[-1px] leading-normal whitespace-nowrap"
          style={{ fontSize: "clamp(36px, 7vw, 100px)" }}
        >
          Selected Work
        </h2>
      </div>

      {/* ── Desktop card stack ── */}
      <div className="relative hidden md:block w-full" style={{ height: CARD_H }}>
        {/* Clipping container */}
        <div className="relative overflow-hidden w-full h-full">
          {projects.map((project, i) => (
            <WorkCardDesktop
              key={project.id}
              project={project}
              index={i}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* Counter — 01 / 03 */}
        <div className="absolute bottom-7 right-0 flex items-baseline gap-[6px] pointer-events-none select-none">
          <span
            ref={counterRef}
            className="font-inter font-light text-[44px] text-[#1f1f1f] tabular-nums leading-none"
          >
            01
          </span>
          <span className="font-inter font-light text-[15px] text-[#bbb] leading-none">
            /&nbsp;03
          </span>
        </div>
      </div>

      {/* ── Mobile: plain vertical list ── */}
      <div className="md:hidden w-full flex flex-col gap-4">
        {projects.map((project) => (
          <WorkCardMobile key={project.id} project={project} />
        ))}
      </div>

      {/* ── "Looking for more?" footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-[rgba(0,0,0,0.1)] flex flex-wrap items-center justify-between pt-12 w-full gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-inter font-semibold text-[14px] text-[#1f1f1f] leading-normal">
            Looking for more?
          </p>
          <p className="font-inter font-normal text-[13px] text-[#666] leading-[1.6]">
            Discover more of my work, including projects that haven&apos;t launched yet
          </p>
        </div>
        <button className="h-8 flex items-center">
          <div className="flex items-center gap-[7px] border border-[rgba(0,0,0,0.2)] bg-[rgba(255,255,255,0.1)] rounded-full h-8 px-[13px] py-2 hover:bg-[rgba(0,0,0,0.05)] transition-colors">
            <span className="font-inter font-normal text-[11px] text-[#1f1f1f] uppercase">
              View More
            </span>
            <ViewMoreIcon />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
