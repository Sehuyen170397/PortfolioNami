"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Figma node 2022:24517 assets
// Frame images — left-constrained frames use `left:`, right-constrained use `right:`
const ASSETS = {
  // Round avatars / photos
  f02: "https://www.figma.com/api/mcp/asset/73981299-3723-456e-993e-d465b5e7e343",
  f04: "https://www.figma.com/api/mcp/asset/98930378-049c-4099-bc8c-a7105d293be2",
  f07: "https://www.figma.com/api/mcp/asset/4002fa5d-11bc-4a87-81a3-bf884836d960",
  f09: "https://www.figma.com/api/mcp/asset/100da036-6851-465e-b153-1910b3d51a26",
  f10: "https://www.figma.com/api/mcp/asset/7df3ab87-67db-4080-a861-2116b0dfb5ae",
  f11: "https://www.figma.com/api/mcp/asset/f20d6712-f4d6-4454-94bd-b7a86740ba0f",
  f12: "https://www.figma.com/api/mcp/asset/6e9c2536-d8ac-4a55-b9a3-473c4bd41862",
  // App screenshot
  f06: "https://www.figma.com/api/mcp/asset/8774e628-b070-4701-8c94-f19887df7a3b",
};

export default function HeroSection() {
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert();
  }, []);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    floatRefs.current[i] = el;
  };

  return (
    <section
      className="relative bg-white w-full overflow-x-clip"
      style={{ minHeight: "max(100vh, 1110px)" }}
    >
      {/* ── Frame 01 — left:424, top:-172, 246×418, -rotate-10, colored border ── */}
      <div
        ref={setRef(0)}
        className="absolute pointer-events-none"
        style={{ left: 424, top: -172, width: 246, height: 418 }}
      >
        <div
          className="-rotate-[10deg]"
          style={{ width: 181, height: 393, marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            className="w-full h-full rounded-[18px]"
            style={{ border: "1.5px solid #c3ffdd", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>

      {/* ── Frame 02 — right:448, top:29, 80×80, round photo ── */}
      <div
        ref={setRef(1)}
        className="absolute pointer-events-none"
        style={{ right: 448, top: 29, width: 80, height: 80 }}
      >
        <img
          src={ASSETS.f02}
          alt=""
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* ── Frame 03 — right:-204, top:220, 487×327, -rotate-10, colored border ── */}
      <div
        ref={setRef(2)}
        className="absolute pointer-events-none"
        style={{ right: -204, top: 220, width: 487, height: 327 }}
      >
        <div className="-rotate-[10deg]" style={{ width: 450, height: 253 }}>
          <div
            className="w-full h-full rounded-[18px]"
            style={{ border: "1.5px solid #4f00bd", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>

      {/* ── Frame 04 — left:287, top:55, 80×80, round photo ── */}
      <div
        ref={setRef(3)}
        className="absolute pointer-events-none"
        style={{ left: 287, top: 55, width: 80, height: 80 }}
      >
        <img
          src={ASSETS.f04}
          alt=""
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* ── Frame 05 — left:-215, top:228, 494×331, rotate-10, colored border ── */}
      <div
        ref={setRef(4)}
        className="absolute pointer-events-none"
        style={{ left: -215, top: 228, width: 494, height: 331 }}
      >
        <div className="rotate-[10deg]" style={{ width: 457, height: 256 }}>
          <div
            className="w-full h-full rounded-[18px]"
            style={{ border: "1.5px solid #05261a", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>

      {/* ── Frame 06 — left:268, top:743, 216×367, -rotate-10, app screenshot ── */}
      <div
        ref={setRef(5)}
        className="absolute pointer-events-none"
        style={{ left: 268, top: 743, width: 216, height: 367 }}
      >
        <div className="-rotate-[10deg]">
          <div
            className="overflow-hidden rounded-[18px]"
            style={{ width: 159, height: 345, border: "1.5px solid rgba(0,0,0,0.1)", boxShadow: "0 0 45px rgba(0,0,0,0.1)" }}
          >
            <img src={ASSETS.f06} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* ── Frame 07 — left:562, top:695, 98×98, round photo, -rotate-15 ── */}
      <div
        ref={setRef(6)}
        className="absolute pointer-events-none"
        style={{ left: 562, top: 695, width: 98, height: 98 }}
      >
        <div className="-rotate-[15deg]">
          <img
            src={ASSETS.f07}
            alt=""
            className="w-[80px] h-[80px] rounded-full object-cover"
          />
        </div>
      </div>

      {/* ── Frame 08 — right:448.5, top:704, 212×361, rotate-10, colored border ── */}
      <div
        ref={setRef(7)}
        className="absolute pointer-events-none"
        style={{ right: 448.5, top: 704, width: 212, height: 361 }}
      >
        <div className="rotate-[10deg]">
          <div
            className="rounded-[17px]"
            style={{ width: 156, height: 339, border: "1.5px solid #cd0518", boxShadow: "0 0 42px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>

      {/* ── Frame 09 — left:-52, top:799, 147×147, rotate-15 ── */}
      <div
        ref={setRef(8)}
        className="absolute pointer-events-none"
        style={{ left: -52, top: 799, width: 147, height: 147 }}
      >
        <div className="rotate-[15deg]">
          <img
            src={ASSETS.f09}
            alt=""
            className="w-[120px] h-[120px] object-cover"
          />
        </div>
      </div>

      {/* ── Frame 10 — right:93, top:22, 60×60, round, glass shadow ── */}
      <div
        ref={setRef(9)}
        className="absolute pointer-events-none backdrop-blur-[9px] overflow-hidden rounded-full glass-shadow"
        style={{ right: 93, top: 22, width: 60, height: 60 }}
      >
        <img
          src={ASSETS.f10}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* ── Frame 11 — right:-29, top:773, 171×171, round photo, -rotate-15 ── */}
      <div
        ref={setRef(10)}
        className="absolute pointer-events-none"
        style={{ right: -29, top: 773, width: 171, height: 171 }}
      >
        <div className="-rotate-[15deg]">
          <img
            src={ASSETS.f11}
            alt=""
            className="w-[140px] h-[140px] rounded-full object-cover"
          />
        </div>
      </div>

      {/* ── Frame 12 — right:268, top:617, 98×98, round photo, -rotate-15 ── */}
      <div
        ref={setRef(11)}
        className="absolute pointer-events-none"
        style={{ right: 268, top: 617, width: 98, height: 98 }}
      >
        <div className="-rotate-[15deg]">
          <img
            src={ASSETS.f12}
            alt=""
            className="w-[80px] h-[80px] rounded-full object-cover"
          />
        </div>
      </div>

      {/* ── Center text ── */}
      {/*
       * Plain div for absolute centering so Framer Motion's transform:none
       * at rest doesn't overwrite the CSS translate.
       */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col items-center gap-[10px] w-[460px] max-md:w-[300px] max-md:px-6"
        >
          <h1
            className="font-playfair font-medium italic text-[#1f1f1f] tracking-[-1px] leading-normal whitespace-nowrap"
            style={{ fontSize: "clamp(48px, 6.5vw, 100px)" }}
          >
            Welcome!
          </h1>
          <p className="font-inter font-light text-[15px] text-[#666] text-center leading-[24px]">
            Vung Tau raised, Ho Chi Minh based. More than three years of
            experience across crypto, fintech and insurance. More than four
            years in design industry include graphic design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
