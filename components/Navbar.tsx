"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

function MenuIcon({ color = "#1f1f1f" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <line x1="2" y1="8.5" x2="22" y2="8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="15.5" x2="22" y2="15.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ color = "#1f1f1f" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18M18 6L6 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar({ variant }: { variant?: "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navWidth, setNavWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
    if (menuOpen) setMenuOpen(false);
  });

  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) setNavWidth(wrapperRef.current.offsetWidth);
      setViewportWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { lang, toggleLang } = useLang();

  // Dark hero: white text when unscrolled on pages with dark backgrounds
  const isDark = variant === "dark" && !scrolled;
  // For mobile: revert to dark when menu is open (bg becomes glassy white)
  const isMobileDark = isDark && !menuOpen;

  const desktopLinks = lang === "en"
    ? [
        { label: "WORK", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "DỰ ÁN", href: "#work" },
        { label: "GIỚI THIỆU", href: "#about" },
        { label: "LIÊN HỆ", href: "#contact" },
      ];

  const mobileLinks = lang === "en"
    ? [
        { label: "Work", href: "#work" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Dự án", href: "#work" },
        { label: "Giới thiệu", href: "#about" },
        { label: "Liên hệ", href: "#contact" },
      ];

  const pillWidth = viewportWidth > 0 ? viewportWidth - 32 : 358;

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
            href="/"
            className={`font-playfair italic font-semibold text-[20px] tracking-[-0.3px] leading-normal transition-colors ${isDark ? "text-[#fafafa]" : "text-[#1f1f1f]"}`}
          >
            Truyen
          </a>

          <div className="flex items-center gap-9">
            <div className="flex items-center gap-7">
              {desktopLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`font-inter font-normal text-[12px] uppercase tracking-wide leading-normal hover:opacity-50 transition-opacity ${isDark ? "text-[#fafafa]" : "text-[#1f1f1f]"}`}
                >
                  {label}
                </a>
              ))}
            </div>
            <button
              onClick={toggleLang}
              className={`rounded-full h-8 flex items-center gap-[7px] px-4 py-2 backdrop-blur-[8px] transition-colors cursor-pointer border ${
                isDark
                  ? "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)]"
                  : "border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.08)]"
              }`}
            >
              <span className={`font-inter text-[11px] ${lang === "en" ? "font-semibold" : "font-normal"} ${isDark ? (lang === "en" ? "text-[#fafafa]" : "text-[#adadad]") : (lang === "en" ? "text-[#1f1f1f]" : "text-[#666]")}`}>EN</span>
              <span className={`font-inter text-[11px] ${lang === "vi" ? "font-semibold" : "font-normal"} ${isDark ? (lang === "vi" ? "text-[#fafafa]" : "text-[#adadad]") : (lang === "vi" ? "text-[#1f1f1f]" : "text-[#666]")}`}>.VI</span>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile backdrop — closes menu on outside tap ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile ── */}
      <div className="fixed inset-x-0 top-0 z-[100] flex md:hidden justify-center pointer-events-none">
        <motion.nav
          initial={false}
          animate={
            scrolled
              ? {
                  width: pillWidth,
                  borderRadius: menuOpen ? 32 : 200,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  borderColor: "rgba(0,0,0,0.1)",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 16,
                  paddingBottom: 16,
                  y: 16,
                }
              : {
                  width: viewportWidth || 390,
                  borderRadius: 0,
                  backgroundColor: menuOpen ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0)",
                  backdropFilter: menuOpen ? "blur(10px)" : "blur(0px)",
                  borderColor: "rgba(0,0,0,0)",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                  paddingBottom: 20,
                  y: 0,
                }
          }
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col pointer-events-auto border"
          style={{ borderWidth: 0.5, borderStyle: "solid" }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between w-full">
            <a
              href="/"
              className={`font-playfair italic font-semibold text-[15px] tracking-[-0.3px] transition-colors ${isMobileDark ? "text-[#fafafa]" : "text-[#1f1f1f]"}`}
            >
              Truyen
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-6 h-6 flex items-center justify-center"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen
                ? <CloseIcon color="#1f1f1f" />
                : <MenuIcon color={isMobileDark ? "#fafafa" : "#1f1f1f"} />}
            </button>
          </div>

          {/* Expandable menu — inside the nav */}
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                key="mobile-links"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col overflow-hidden"
              >
                <div className="flex flex-col gap-4 pt-4">
                  {mobileLinks.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        setTimeout(() => {
                          const el = document.getElementById(href.replace("#", ""));
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 300);
                      }}
                      className="font-inter font-light text-[15px] text-[#1f1f1f] py-[2px] hover:opacity-60 transition-opacity"
                    >
                      {label}
                    </a>
                  ))}
                  <div className="flex items-center justify-between py-[2px]">
                    <span className="font-inter font-light text-[15px] text-[#1f1f1f]">
                      {lang === "en" ? "Language" : "Ngôn ngữ"}
                    </span>
                    <button
                      onClick={toggleLang}
                      className="border border-[rgba(0,0,0,0.1)] rounded-full h-8 flex items-center gap-[7px] px-4 py-2 backdrop-blur-[8px] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(0,0,0,0.08)] transition-colors cursor-pointer"
                    >
                      <span className={`font-inter text-[11px] ${lang === "en" ? "font-semibold text-[#1f1f1f]" : "font-normal text-[#666]"}`}>EN.</span>
                      <span className={`font-inter text-[11px] ${lang === "vi" ? "font-semibold text-[#1f1f1f]" : "font-normal text-[#666]"}`}>VI</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
