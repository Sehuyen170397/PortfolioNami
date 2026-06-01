"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const ASSETS = {
  containerNamiExchange: "/work/nami-exchange.jpg",
  containerInsurance: "/work/nami-insurance.jpg",
  containerHighway: "/work/highway.jpg",
  mobileNamiExchange: "/work/nami-exchange-mobile.jpg",
  mobileInsurance: "/work/nami-insurance-mobile.jpg",
  mobileHighway: "/work/highway-mobile.jpg",
};

const projectsEN = [
  {
    id: "nami-exchange",
    category: "Nami Exchange / Mobile app & Website",
    title: "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products",
    domain: "Crypto",
    years: "3+",
    label: "Years partnership",
    domainLabel: "Domain",
    cta: "View Project",
    image: ASSETS.containerNamiExchange,
    mobileImage: ASSETS.mobileNamiExchange,
    dark: false,
    glassButton: true,
    desktopLink: "/work/nami-exchange",
    mobileLink: "/work/nami-exchange",
  },
  {
    id: "nami-insurance",
    category: "Nami Insurance / Website",
    title: "Decentralize, adaptability, Financial",
    domain: "Dafi Insurance",
    years: "1+",
    label: "Years partnership",
    domainLabel: "Domain",
    cta: "View Project",
    image: ASSETS.containerInsurance,
    mobileImage: ASSETS.mobileInsurance,
    dark: true,
    glassButton: true,
    desktopLink: "/work/nami-insurance",
    mobileLink: "/work/nami-insurance",
  },
  {
    id: "highway",
    category: "Highway / Mobile app",
    title: "Simplifying Access to Digital Assets",
    domain: "Crypto",
    years: "1+",
    label: "Years partnership",
    domainLabel: "Domain",
    cta: "View Project",
    image: ASSETS.containerHighway,
    mobileImage: ASSETS.mobileHighway,
    dark: true,
    glassButton: true,
    desktopLink: "/work/highway",
    mobileLink: "/work/highway",
  },
];

const projectsVI = [
  {
    id: "nami-exchange",
    category: "Nami Exchange / Mobile app & Website",
    title: "Nền tảng giao dịch tài sản số với các sản phẩm Spot, Futures và Auto-Invest",
    domain: "Crypto",
    years: "3+",
    label: "Thời gian đồng hành",
    domainLabel: "Lĩnh vực",
    cta: "Xem dự án",
    image: ASSETS.containerNamiExchange,
    mobileImage: ASSETS.mobileNamiExchange,
    dark: false,
    glassButton: true,
    desktopLink: "/work/nami-exchange",
    mobileLink: "/work/nami-exchange",
  },
  {
    id: "nami-insurance",
    category: "Nami Insurance / Website",
    title: "Giải pháp tài chính phi tập trung, linh hoạt",
    domain: "Dafi Insurance",
    years: "1+",
    label: "Thời gian đồng hành",
    domainLabel: "Lĩnh vực",
    cta: "Xem dự án",
    image: ASSETS.containerInsurance,
    mobileImage: ASSETS.mobileInsurance,
    dark: true,
    glassButton: true,
    desktopLink: "/work/nami-insurance",
    mobileLink: "/work/nami-insurance",
  },
  {
    id: "highway",
    category: "Highway / Mobile app",
    title: "Sở hữu tài sản số trở nên dễ dàng hơn",
    domain: "Crypto",
    years: "1+",
    label: "Thời gian đồng hành",
    domainLabel: "Lĩnh vực",
    cta: "Xem dự án",
    image: ASSETS.containerHighway,
    mobileImage: ASSETS.mobileHighway,
    dark: true,
    glassButton: true,
    desktopLink: "/work/highway",
    mobileLink: "/work/highway",
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

function WorkCardDesktop({ project }: { project: (typeof projectsEN)[0] }) {
  const tc = project.dark ? "text-white" : "text-[#1f1f1f]";
  const arrowColor = project.dark ? "white" : "#1f1f1f";
  const handleClick = () => {
    if (!project.desktopLink) return;
    if (project.desktopLink.startsWith("/")) {
      window.location.href = project.desktopLink;
    } else {
      window.open(project.desktopLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-[40px] border border-[rgba(0,0,0,0.1)] flex w-full ${project.desktopLink ? "cursor-pointer" : ""}`}
      style={{ height: "clamp(450px, calc(51.5vw - 41.2px), 700px)" }}
      onClick={handleClick}
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
      <div
        className="absolute left-0 top-0 w-1/2 h-full flex flex-col gap-5"
        style={{ padding: "clamp(28px, 4.2vw, 60px)" }}
      >
        <div className="flex flex-1 flex-col justify-between pb-4 pt-1">
          <div className="flex flex-col gap-6">
            <p className={`font-inter font-normal leading-normal ${tc}`} style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}>
              {project.category}
            </p>
            <h3 className={`font-inter font-semibold leading-tight ${tc}`} style={{ fontSize: "clamp(22px, 2.8vw, 40px)" }}>
              {project.title}
            </h3>
          </div>
          {project.glassButton ? (
            <div
              className="flex items-center gap-4 rounded-full px-6 py-2 w-fit backdrop-blur-[24px] border border-[rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <span className={`font-inter font-semibold ${project.dark ? "text-white" : "text-[#1f1f1f]"}`} style={{ fontSize: "clamp(16px, 1.7vw, 24px)" }}>{project.cta}</span>
              <ArrowUpRight color={project.dark ? "white" : "#1f1f1f"} />
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-[rgba(0,0,0,0.1)] backdrop-blur-[8px] border border-[rgba(0,0,0,0.2)] rounded-full px-6 py-2 w-fit hover:bg-[rgba(0,0,0,0.18)] transition-colors">
              <span className={`font-inter font-semibold ${tc}`} style={{ fontSize: "clamp(16px, 1.7vw, 24px)" }}>{project.cta}</span>
              <ArrowUpRight color={arrowColor} />
            </div>
          )}
        </div>

        <div className="flex gap-8 pt-5">
          <div className="flex flex-col gap-3">
            <span className={`font-inter font-bold leading-normal ${tc}`} style={{ fontSize: "clamp(14px, 1.7vw, 24px)" }}>
              {project.domain}
            </span>
            <span className={`font-inter font-normal leading-normal ${tc} opacity-70`} style={{ fontSize: "clamp(12px, 1.1vw, 16px)" }}>
              {project.domainLabel}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className={`font-inter font-bold leading-normal ${tc}`} style={{ fontSize: "clamp(14px, 1.7vw, 24px)" }}>
              {project.years}
            </span>
            <span className={`font-inter font-normal leading-normal ${tc} opacity-70`} style={{ fontSize: "clamp(12px, 1.1vw, 16px)" }}>
              {project.label}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorkCardMobile({ project }: { project: (typeof projectsEN)[0] }) {
  const handleClick = () => {
    if (!project.mobileLink) return;
    if (project.mobileLink.startsWith("/")) {
      window.location.href = project.mobileLink;
    } else {
      window.open(project.mobileLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full overflow-hidden rounded-[24px] flex flex-col bg-[#f2f2f2] ${project.mobileLink ? "cursor-pointer" : ""}`}
      style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
      onClick={handleClick}
    >
      <div className="overflow-hidden relative rounded-t-[12px] shrink-0" style={{ height: "clamp(220px, calc(89.5vw - 43px), 342px)" }}>
        <img
          src={project.mobileImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 px-4 pt-3 pb-4">
        <div className="flex flex-1 flex-col justify-between pt-2 pb-3">
          <div className="flex flex-col gap-6">
            <p className="font-inter font-normal text-[16px] text-[#1f1f1f] leading-normal">
              {project.category}
            </p>
            <h3 className="font-inter font-semibold text-[26px] text-[#1f1f1f] leading-tight">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-4 bg-[rgba(0,0,0,0.1)] backdrop-blur-[8px] border border-[rgba(0,0,0,0.1)] rounded-full px-6 py-2 w-fit mt-6 hover:bg-[rgba(0,0,0,0.15)] transition-colors">
            <span className="font-inter font-semibold text-[20px] text-[#1f1f1f]">{project.cta}</span>
            <ArrowUpRight color="#1f1f1f" />
          </div>
        </div>
        <div className="flex gap-8 pt-3 border-t border-[rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-3">
            <span className="font-inter font-semibold text-[20px] text-[#1f1f1f]">{project.domain}</span>
            <span className="font-inter font-light text-[15px] text-[#1f1f1f]">{project.domainLabel}</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-inter font-semibold text-[20px] text-[#1f1f1f]">{project.years}</span>
            <span className="font-inter font-light text-[15px] text-[#1f1f1f]">{project.label}</span>
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
  const { lang } = useLang();
  const projects = lang === "en" ? projectsEN : projectsVI;
  const sectionRef = useRef<HTMLElement>(null);
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  // Desktop card refs
  const card0WrapRef = useRef<HTMLDivElement>(null);
  const card1WrapRef = useRef<HTMLDivElement>(null);
  // Mobile card refs
  const mobileCard0WrapRef = useRef<HTMLDivElement>(null);
  const mobileCard1WrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip reveal: fires on both breakpoints
      gsap.from(headerTextRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerWrapRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const mm = gsap.matchMedia();

      // ── Desktop (≥768px) ──
      // Navbar bottom ≈ 100px (y:24 + pt:22 + h-8:32 + pb:22). Card gap 24px → pin at 124px.
      mm.add("(min-width: 768px)", () => {
        gsap.to(headerWrapRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: headerWrapRef.current,
            start: "bottom 200px",
            end: "bottom 100px",
            scrub: true,
          },
        });

        const cardH = card0WrapRef.current?.offsetHeight ?? 700;
        const GAP = 24; // gap-6
        const phase = cardH + GAP; // scroll distance for one card to cover the next

        // Card 0: pinned while cards 1 and 2 stack on top
        gsap.timeline({
          scrollTrigger: {
            trigger: card0WrapRef.current,
            start: "top 124px",
            end: `+=${phase * 2}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        })
          .to(card0WrapRef.current, { scale: 0.94, ease: "none", duration: 2, force3D: true }, 0)
          .to(card0WrapRef.current, { opacity: 0.5, ease: "none", duration: 0.5 }, 1)
          .to(card0WrapRef.current, { opacity: 0, ease: "none", duration: 0.5 }, 1.5)
          .set({}, {}, 4);

        // Card 1: dims to 50% mid-pin then fades fully out before pin ends
        gsap.timeline({
          scrollTrigger: {
            trigger: card1WrapRef.current,
            start: "top 124px",
            end: `+=${phase}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        })
          .to(card1WrapRef.current, { scale: 0.94, ease: "none", duration: 2, force3D: true }, 0)
          .to(card1WrapRef.current, { opacity: 0.5, ease: "none", duration: 0.5 }, 1)
          .to(card1WrapRef.current, { opacity: 0, ease: "none", duration: 0.5 }, 1.5)
          .set({}, {}, 2);
      });

      // ── Mobile (<768px) ──
      // Navbar bottom ≈ 72px (y:16 + pt:16 + h-6:24 + pb:16). Card gap-4=16px → pin at 96px.
      mm.add("(max-width: 767px)", () => {
        gsap.to(headerWrapRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: headerWrapRef.current,
            start: "bottom 160px",
            end: "bottom 72px",
            scrub: true,
          },
        });

        // Measure each card separately — heights differ due to varying title lengths
        const C0H = mobileCard0WrapRef.current?.offsetHeight ?? 580;
        const C1H = mobileCard1WrapRef.current?.offsetHeight ?? 580;
        const GAP = 16; // gap-4

        // Phase distances (pixels of scroll each phase requires)
        const c0p1 = C0H + GAP; // card 1 travels to cover card 0
        const c0p2 = C1H + GAP; // card 2 travels to cover card 1
        const c0total = c0p1 + c0p2;

        // Card 0: phase 1 → scale + full opacity fade (1→0.5→0); phase 2 holds at 0
        gsap.timeline({
          scrollTrigger: {
            trigger: mobileCard0WrapRef.current,
            start: "top 96px",
            end: `+=${c0total}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        })
          .to(mobileCard0WrapRef.current, { scale: 0.94, ease: "none", duration: c0p1, force3D: true }, 0)
          .to(mobileCard0WrapRef.current, { opacity: 0.5, ease: "none", duration: c0p1 / 4 }, c0p1 / 2)
          .to(mobileCard0WrapRef.current, { opacity: 0, ease: "none", duration: c0p1 / 4 }, c0p1 * 3 / 4)
          .set({}, {}, c0total);

        // Card 1: dims to 50% then fades fully out before pin ends
        gsap.timeline({
          scrollTrigger: {
            trigger: mobileCard1WrapRef.current,
            start: "top 96px",
            end: `+=${c0p2}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        })
          .to(mobileCard1WrapRef.current, { scale: 0.94, ease: "none", duration: c0p2, force3D: true }, 0)
          .to(mobileCard1WrapRef.current, { opacity: 0.5, ease: "none", duration: c0p2 / 4 }, c0p2 / 2)
          .to(mobileCard1WrapRef.current, { opacity: 0, ease: "none", duration: c0p2 / 4 }, c0p2 * 3 / 4)
          .set({}, {}, c0p2);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-[50] flex flex-col gap-6 items-start pb-[120px] pt-[120px] px-[40px] w-full bg-white max-md:pt-[80px] max-md:pb-[60px] max-md:px-6 max-md:gap-6"
    >
      {/* Header */}
      <div ref={headerWrapRef} className="w-full flex flex-col items-center justify-center pb-6 max-md:pb-0 overflow-hidden">
        <h2
          ref={headerTextRef}
          className="font-playfair font-medium italic text-[#1f1f1f] tracking-[-1px] leading-normal whitespace-nowrap"
          style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
        >
          {lang === "en" ? "Selected Work" : "Dự án tiêu biểu"}
        </h2>
      </div>

      {/* Desktop: vertical list */}
      <div className="hidden md:flex flex-col gap-6 w-full">
        <div ref={card0WrapRef} className="w-full relative" style={{ zIndex: 10, willChange: "transform, opacity" }}>
          <WorkCardDesktop project={projects[0]} />
        </div>
        <div ref={card1WrapRef} className="w-full relative" style={{ zIndex: 20, willChange: "transform, opacity" }}>
          <WorkCardDesktop project={projects[1]} />
        </div>
        <div className="w-full relative" style={{ zIndex: 30 }}>
          <WorkCardDesktop project={projects[2]} />
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden w-full flex flex-col gap-4">
        <div ref={mobileCard0WrapRef} className="w-full relative" style={{ zIndex: 10, willChange: "transform, opacity" }}>
          <WorkCardMobile project={projects[0]} />
        </div>
        <div ref={mobileCard1WrapRef} className="w-full relative" style={{ zIndex: 20, willChange: "transform, opacity" }}>
          <WorkCardMobile project={projects[1]} />
        </div>
        <div className="w-full relative" style={{ zIndex: 30 }}>
          <WorkCardMobile project={projects[2]} />
        </div>
      </div>

      {/* "Looking for more?" footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between pt-12 w-full gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-inter font-semibold text-[14px] text-[#1f1f1f] leading-normal">
            {lang === "en" ? "Looking for more?" : "Chưa hết đâu nhé"}
          </p>
          <p className="font-inter font-normal text-[13px] text-[#666] leading-[1.6]">
            {lang === "en"
              ? "Discover more of my work, including projects that haven't launched yet"
              : "Xem thêm các thiết kế khác của mình — có cả những dự án chưa kịp ra mắt nữa 👀"}
          </p>
        </div>
        <a
          href="https://www.figma.com/design/ed3URelEgkENB6iPJMEU46/Truyen-Projects?node-id=0-1&t=6BAKX9cndN1Rs49c-1"
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 flex items-center"
        >
          <div className="flex items-center gap-[7px] border border-[rgba(0,0,0,0.2)] bg-[rgba(255,255,255,0.1)] rounded-full h-8 px-[13px] py-2 hover:bg-[rgba(0,0,0,0.05)] transition-colors">
            <span className="font-inter font-normal text-[11px] text-[#1f1f1f] uppercase">
              {lang === "en" ? "View More" : "Xem thêm"}
            </span>
            <ViewMoreIcon />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
