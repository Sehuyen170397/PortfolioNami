"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform, useMotionValue } from "framer-motion";
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
  const { scrollY } = useScroll();

  // scrolled state: used only for isDark text colors and mobile nav animate
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
    if (menuOpen) setMenuOpen(false);
  });

  // Smooth 0→1 progress as user scrolls 0→60px — drives all visual transitions
  const sp = useTransform(scrollY, [0, 60], [0, 1], { clamp: true });

  // Viewport width as a MotionValue so desktop nav width interpolates correctly
  const vpWidthMV = useMotionValue(1440);
  useEffect(() => {
    vpWidthMV.set(window.innerWidth);
    const onResize = () => vpWidthMV.set(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [vpWidthMV]);

  // Desktop wrapper: top slides 0 → 24px
  const desktopTop = useTransform(sp, [0, 1], [0, 24]);

  // Desktop nav motion values
  const navWidth = useTransform(
    [sp, vpWidthMV] as const,
    ([s, vp]: number[]) => vp * (1 - s) + 800 * s
  );
  const navBorderRadius = useTransform(sp, [0, 1], [0, 200]);
  const navBg = useTransform(sp, [0, 1], ["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]);
  const navBorderColor = useTransform(sp, [0, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.1)"]);
  const navBlur = useTransform(sp, (v) => `blur(${v * 40}px)`);
  const navPaddingRight = useTransform(sp, [0, 1], [40, 24]);

  // Mobile wrapper: padding slides 0 → 16px
  const mobilePaddingLR = useTransform(sp, [0, 1], [0, 16]);
  const mobilePaddingTop = useTransform(sp, [0, 1], [0, 16]);

  const { lang, toggleLang } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On non-home pages prefix hash with "/" so the browser navigates home then scrolls
  const sh = (hash: string) => isHome ? hash : `/${hash}`;

  // Dark hero: white text when unscrolled on pages with dark backgrounds
  const isDark = variant === "dark" && !scrolled;
  // For mobile: revert to dark when menu is open (bg becomes glassy white)
  const isMobileDark = isDark && !menuOpen;

  const desktopLinks = lang === "en"
    ? [
        { label: "WORK", href: sh("#work") },
        { label: "About", href: sh("#about") },
        { label: "Contact", href: sh("#contact") },
      ]
    : [
        { label: "DỰ ÁN", href: sh("#work") },
        { label: "GIỚI THIỆU", href: sh("#about") },
        { label: "LIÊN HỆ", href: sh("#contact") },
      ];

  const mobileLinks = lang === "en"
    ? [
        { label: "Work", href: sh("#work") },
        { label: "About", href: sh("#about") },
        { label: "Contact", href: sh("#contact") },
      ]
    : [
        { label: "Dự án", href: sh("#work") },
        { label: "Giới thiệu", href: sh("#about") },
        { label: "Liên hệ", href: sh("#contact") },
      ];

  return (
    <>
      {/* ── Desktop ── */}
      <motion.div
        className="fixed inset-x-0 z-[100] hidden md:flex justify-center pointer-events-none"
        style={{ top: desktopTop }}
      >
        <motion.nav
          className="flex items-center justify-between border pointer-events-auto"
          style={{
            width: navWidth,
            borderRadius: navBorderRadius,
            backgroundColor: navBg,
            backdropFilter: navBlur,
            borderColor: navBorderColor,
            borderWidth: 0.5,
            borderStyle: "solid",
            paddingLeft: 40,
            paddingRight: navPaddingRight,
            paddingTop: 22,
            paddingBottom: 22,
          }}
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
              className={`rounded-full h-8 flex items-center gap-[7px] px-4 py-2 backdrop-blur-md transition-all duration-300 cursor-pointer border ${
                isDark
                  ? "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.12)] shadow-[inset_1px_1.5px_1.5px_rgba(255,255,255,0.25),inset_-1px_-1px_1px_rgba(0,0,0,0.2),0px_4px_16px_rgba(0,0,0,0.2)] hover:bg-[rgba(255,255,255,0.22)] hover:shadow-[inset_1px_1.5px_1.5px_rgba(255,255,255,0.3),inset_-1px_-1px_1px_rgba(0,0,0,0.15),0px_6px_20px_rgba(0,0,0,0.25)]"
                  : "border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.55)] shadow-[inset_1px_1.5px_1.5px_rgba(255,255,255,0.85),inset_-1px_-1px_1px_rgba(0,0,0,0.08),0px_4px_16px_rgba(0,0,0,0.08)] hover:bg-[rgba(255,255,255,0.75)] hover:shadow-[inset_1px_1.5px_1.5px_rgba(255,255,255,0.9),inset_-1px_-1px_1px_rgba(0,0,0,0.06),0px_6px_20px_rgba(0,0,0,0.1)]"
              }`}
            >
              <span className={`font-inter text-[11px] ${lang === "en" ? "font-semibold" : "font-normal"} ${isDark ? (lang === "en" ? "text-[#fafafa]" : "text-[#adadad]") : (lang === "en" ? "text-[#1f1f1f]" : "text-[#666]")}`}>EN</span>
              <span className={`font-inter text-[11px] ${lang === "vi" ? "font-semibold" : "font-normal"} ${isDark ? (lang === "vi" ? "text-[#fafafa]" : "text-[#adadad]") : (lang === "vi" ? "text-[#1f1f1f]" : "text-[#666]")}`}>.VI</span>
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* ── Mobile backdrop — closes menu on outside tap ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile ── */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[100] flex md:hidden pointer-events-none"
        style={{
          paddingLeft: mobilePaddingLR,
          paddingRight: mobilePaddingLR,
          paddingTop: mobilePaddingTop,
        }}
      >
        <motion.nav
          initial={false}
          animate={
            scrolled
              ? {
                  borderRadius: menuOpen ? 32 : 200,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  borderColor: "rgba(0,0,0,0.1)",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 16,
                  paddingBottom: 16,
                }
              : {
                  borderRadius: 0,
                  backgroundColor: menuOpen ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0)",
                  backdropFilter: menuOpen ? "blur(10px)" : "blur(0px)",
                  borderColor: "rgba(0,0,0,0)",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                  paddingBottom: 20,
                }
          }
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col pointer-events-auto border"
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
                        setMenuOpen(false);
                        if (isHome) {
                          e.preventDefault();
                          setTimeout(() => {
                            const el = document.getElementById(href.replace("#", ""));
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }, 300);
                        }
                        // When not on home, let the default <a> navigate to /#section
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
                      <span className={`font-inter text-[11px] ${lang === "en" ? "font-semibold text-[#1f1f1f]" : "font-normal text-[#666]"}`}>EN</span>
                      <span className={`font-inter text-[11px] ${lang === "vi" ? "font-semibold text-[#1f1f1f]" : "font-normal text-[#666]"}`}>.VI</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>
    </>
  );
}
