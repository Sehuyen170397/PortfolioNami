"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navWidth, setNavWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) setNavWidth(wrapperRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* ── Desktop ── */}
      <div
        ref={wrapperRef}
        className="fixed inset-x-0 top-0 z-[100] hidden md:flex justify-center pointer-events-none"
      >
        <motion.nav
          initial={false}
          animate={
            scrolled
              ? {
                  width: 800,
                  borderRadius: 200,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(40px)",
                  borderColor: "rgba(0,0,0,0.1)",
                  paddingLeft: 40,
                  paddingRight: 24,
                  paddingTop: 22,
                  paddingBottom: 22,
                  y: 24,
                }
              : {
                  width: navWidth || "100%",
                  borderRadius: 0,
                  backgroundColor: "rgba(255,255,255,0)",
                  backdropFilter: "blur(0px)",
                  borderColor: "rgba(0,0,0,0)",
                  paddingLeft: 40,
                  paddingRight: 40,
                  paddingTop: 22,
                  paddingBottom: 22,
                  y: 0,
                }
          }
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border pointer-events-auto"
          style={{ borderWidth: 0.5, borderStyle: "solid" }}
        >
          <a
            href="#"
            className="font-playfair italic font-semibold text-[20px] text-[#1f1f1f] tracking-[-0.3px] leading-normal"
          >
            Truyen
          </a>

          <div className="flex items-center gap-9">
            <div className="flex items-center gap-7">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-inter font-normal text-[12px] text-[#1f1f1f] uppercase tracking-wide leading-normal hover:opacity-50 transition-opacity"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="border border-[rgba(0,0,0,0.2)] rounded-full h-8 flex items-center gap-[7px] px-4 py-2 backdrop-blur-sm bg-[rgba(255,255,255,0.1)]">
              <span className="font-inter text-[11px] text-[#1f1f1f] font-semibold">EN.</span>
              <span className="font-inter text-[11px] text-[#666] uppercase">VI</span>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex md:hidden items-center justify-between px-5 py-5 bg-white/80 backdrop-blur-[10px] border-b border-[rgba(0,0,0,0.06)]">
        <a
          href="#"
          className="font-playfair italic font-semibold text-[15px] text-[#1f1f1f] tracking-[-0.3px]"
        >
          Truyen
        </a>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex flex-col gap-[5px] w-6 items-end p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-[1.5px] w-full bg-[#1f1f1f] transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[6.75px]" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] bg-[#1f1f1f] transition-all duration-300 ${
              menuOpen ? "opacity-0 w-0" : "w-4"
            }`}
          />
          <span
            className={`block h-[1.5px] w-full bg-[#1f1f1f] transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[6.75px]" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[65px] inset-x-0 z-[99] md:hidden bg-white/95 backdrop-blur-md border-b border-[rgba(0,0,0,0.1)]"
          >
            <div className="flex flex-col px-6">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-inter font-normal text-[13px] text-[#1f1f1f] uppercase tracking-wide py-4 border-b border-[rgba(0,0,0,0.08)] last:border-0 hover:opacity-60 transition-opacity"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
