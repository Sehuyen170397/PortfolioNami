"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useLang } from "@/contexts/LanguageContext";

const MAILTO = "mailto:truyen17031997@gmail.com";

const footerLinks = [
  { label: "Email", href: MAILTO },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/xuan-truyen-vo-a78914229/" },
  { label: "Dribbble", href: "https://dribbble.com/Sehuyen" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Behance", href: "https://www.behance.net/truynv" },
];

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="4.5" width="8.5" height="10" rx="1.8" stroke="#666" strokeWidth="1.2" />
      <rect x="5.5" y="1.5" width="8.5" height="10" rx="1.8" fill="white" stroke="#666" strokeWidth="1.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 8.5L6 12L13.5 4.5" stroke="#37c473" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowTopRight() {
  return (
    <svg
      width="0.7em"
      height="0.7em"
      viewBox="0 0 18 18"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle", marginBottom: "0.12em" }}
    >
      <path
        d="M3 15L15 3M15 3H5M15 3V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactSection() {
  const { lang } = useLang();
  const tickerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const mobileTickerRef = useRef<HTMLDivElement>(null);
  const mobileTweenRef = useRef<gsap.core.Tween | null>(null);
  const [mobilePressing, setMobilePressing] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    if (!tickerRef.current) return;
    const el = tickerRef.current;
    const totalW = el.scrollWidth / 2;
    tweenRef.current = gsap.to(el, {
      x: -totalW,
      duration: 18,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tweenRef.current?.kill();
    };
  }, [lang]);

  useEffect(() => {
    if (!mobileTickerRef.current) return;
    const el = mobileTickerRef.current;
    const totalW = el.scrollWidth / 2;
    mobileTweenRef.current = gsap.to(el, {
      x: -totalW,
      duration: 18,
      ease: "none",
      repeat: -1,
    });
    return () => {
      mobileTweenRef.current?.kill();
    };
  }, [lang]);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.resume();

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text).catch(() => {});
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col gap-3 items-start pt-[120px] pb-[80px] px-[40px] relative w-full bg-white max-md:px-6 max-md:pt-[60px] max-md:pb-[40px]"
    >
      {/* Desktop scrolling ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full overflow-hidden relative hidden md:block"
      >
        {/* Ticker container — group enables child hover transitions */}
        <div
          className="group h-[152px] overflow-hidden relative rounded-[100px] w-full max-w-[1360px] mx-auto cursor-pointer"
          style={{ background: "#f2f2f2" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => { window.location.href = MAILTO; }}
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-r from-[#f2f2f2] to-transparent pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-l from-[#f2f2f2] to-transparent pointer-events-none" />

          {/* Ticker track */}
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <div ref={tickerRef} className="flex items-center gap-[48px] whitespace-nowrap">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-[48px] flex-shrink-0">
                  <span
                    className="font-playfair font-medium italic text-[#1f1f1f] whitespace-nowrap select-none"
                    style={{ fontSize: "clamp(32px, 4vw, 60px)" }}
                  >
                    {lang === "en" ? "Ready to get in touch?" : "Sẵn sàng kết nối chưa?"}
                  </span>
                  {/* Let's talk pill — color transitions on group hover */}
                  <span
                    className="flex items-center gap-2 rounded-full px-6 py-[7px] flex-shrink-0
                      bg-white group-hover:bg-[#37c473]
                      transition-colors duration-300"
                  >
                    <span
                      className="font-inter font-semibold text-[32px] tracking-[-1px] leading-none
                        text-[#1f1f1f] group-hover:text-white
                        transition-colors duration-300"
                    >
                      {lang === "en" ? "Let's talk" : "Kết nối ngay"} <ArrowTopRight />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile scrolling ticker — pill shape, 16px margins */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:hidden"
        style={{ width: "calc(100% + 16px)", marginLeft: "-8px" }}
      >
        <div
          className="h-[81px] overflow-hidden relative rounded-[200px] w-full cursor-pointer"
          style={{ background: "#f2f2f2" }}
          onPointerDown={() => setMobilePressing(true)}
          onPointerUp={() => setMobilePressing(false)}
          onPointerLeave={() => setMobilePressing(false)}
          onClick={() => { window.location.href = MAILTO; }}
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-[60px] z-10 bg-gradient-to-r from-[#f2f2f2] to-transparent pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-[60px] z-10 bg-gradient-to-l from-[#f2f2f2] to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center overflow-hidden">
            <div ref={mobileTickerRef} className="flex items-center gap-[48px] whitespace-nowrap">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-[48px] flex-shrink-0">
                  <span className="font-playfair font-medium italic text-[#1f1f1f] text-[32px] whitespace-nowrap select-none">
                    {lang === "en" ? "Ready to contact?" : "Sẵn sàng kết nối?"}
                  </span>
                  <span
                    className={`flex items-center gap-2 rounded-full px-4 py-[7px] flex-shrink-0 transition-colors duration-200 ${
                      mobilePressing ? "bg-[#37c473]" : "bg-white"
                    }`}
                  >
                    <span className={`font-inter font-semibold text-[24px] tracking-[-1px] leading-none transition-colors duration-200 ${
                      mobilePressing ? "text-white" : "text-[#1f1f1f]"
                    }`}>
                      {lang === "en" ? "Let's talk" : "Kết nối ngay"} <ArrowTopRight />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer row */}
      <div className="flex items-end justify-between pt-[116px] w-full max-md:flex-col max-md:items-start max-md:gap-10 max-md:pt-[60px]">
        {/* Contact info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-inter font-normal text-[13px] text-[#666] leading-[20.8px]">
              truyen17031997@gmail.com
            </span>
            <button
              onClick={() => copyToClipboard("truyen17031997@gmail.com", "email")}
              className="p-[2px] hover:opacity-60 transition-opacity"
              aria-label="Copy email"
            >
              {copiedEmail ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-inter font-normal text-[13px] text-[#666] leading-[20.8px]">
              (+84) 399 712 946
            </span>
            <button
              onClick={() => copyToClipboard("+84399712946", "phone")}
              className="p-[2px] hover:opacity-60 transition-opacity"
              aria-label="Copy phone"
            >
              {copiedPhone ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
          <span className="font-inter font-normal text-[13px] text-[#666] leading-[20.8px]">
            Ho Chi Minh, Vietnam
          </span>
        </div>

        {/* Nav links */}
        <div className="flex gap-6 items-center max-md:justify-between max-md:w-full max-md:gap-0">
          {footerLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter font-normal text-[11px] text-[#666] uppercase hover:text-[#1f1f1f] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom border + copyright */}
      <div className="border-t border-[rgba(12,12,11,0.1)] flex flex-col items-center pt-[33px] w-full">
        <span className="font-inter font-normal text-[11px] text-[#666] text-center uppercase">
          © 2026 Vo Xuan Truyen · UI/UX Designer
        </span>
      </div>
    </section>
  );
}
