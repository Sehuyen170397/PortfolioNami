"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = [
  "/loading-icons/icon-1.png",
  "/loading-icons/icon-2.png",
  "/loading-icons/icon-3.png",
  "/loading-icons/icon-4.png",
  "/loading-icons/icon-5.png",
  "/loading-icons/icon-6.png",
  "/loading-icons/icon-7.png",
  "/loading-icons/icon-8.png",
];

const COLS = 9;
const ROWS = 6;

export default function LoadingScreen() {
  const [iconIdx, setIconIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Preload all icons immediately so transitions are smooth
  useEffect(() => {
    ICONS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const setProgressText = (p: number) => {
    if (progressRef.current) progressRef.current.textContent = `${p}%`;
  };

  useEffect(() => {
    const startTime = performance.now();
    let progressRaf: number;
    let done = false;
    let currentP = 0;
    let almostTimer: ReturnType<typeof setTimeout> | null = null;
    let typeTimer: ReturnType<typeof setTimeout> | null = null;
    let frozenAt99 = false;

    const MEDIUM = " ... ";
    const LIGHT = "Almost done 🕺";
    const FULL = MEDIUM + LIGHT;

    const showAlmost = () => {
      let charIdx = 0;
      const typeNext = () => {
        charIdx++;
        const med = FULL.slice(0, Math.min(charIdx, MEDIUM.length));
        const light = charIdx > MEDIUM.length
          ? FULL.slice(MEDIUM.length, charIdx)
          : "";
        if (progressRef.current) {
          progressRef.current.innerHTML =
            `99%<span style="font-weight:500">${med}</span>` +
            (light ? `<span style="font-weight:300">${light}</span>` : "");
        }
        if (charIdx < FULL.length) {
          typeTimer = setTimeout(typeNext, 55);
        }
      };
      typeNext();
    };

    const iconInterval = setInterval(() => {
      if (done) return;
      setIconIdx((prev) => (prev + 1) % ICONS.length);
    }, 1300);

    const rampToHundred = () => {
      frozenAt99 = false;
      const rampStart = performance.now();
      const baseP = currentP;
      const ramp = (now: number) => {
        const t = Math.min((now - rampStart) / 250, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setProgressText(Math.round(baseP + (100 - baseP) * eased));
        if (t < 1) {
          requestAnimationFrame(ramp);
        } else {
          setProgressText(100);
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => {
              setVisible(false);
              window.dispatchEvent(new Event("loader:done"));
            }, 1100);
          }, 200);
        }
      };
      requestAnimationFrame(ramp);
    };

    const onLoad = () => {
      if (done) return;
      done = true;
      if (almostTimer) clearTimeout(almostTimer);
      if (typeTimer) clearTimeout(typeTimer);
      clearInterval(iconInterval);
      cancelAnimationFrame(progressRaf);
      setTimeout(rampToHundred, 200);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    const tick = (now: number) => {
      if (done) return;
      const elapsed = now - startTime;
      const fast = Math.sqrt(elapsed) * 1.8;
      const p = fast <= 88
        ? Math.round(fast)
        : Math.min(99, Math.round(88 + Math.sqrt(elapsed - 2394) * 0.22));
      currentP = p;
      // Stop overwriting once frozen at 99 — prevents clobbering showAlmost's innerHTML
      if (!frozenAt99) {
        setProgressText(p);
      }
      if (p === 99 && !almostTimer) {
        frozenAt99 = true;
        almostTimer = setTimeout(showAlmost, 3500);
      }
      progressRaf = requestAnimationFrame(tick);
    };
    progressRaf = requestAnimationFrame(tick);

    return () => {
      done = true;
      if (almostTimer) clearTimeout(almostTimer);
      if (typeTimer) clearTimeout(typeTimer);
      clearInterval(iconInterval);
      cancelAnimationFrame(progressRaf);
      window.removeEventListener("load", onLoad);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* Mosaic grid — tiles dissolve diagonally from top-left */}
      {Array.from({ length: ROWS }).map((_, row) =>
        Array.from({ length: COLS }).map((_, col) => (
          <motion.div
            key={`${row}-${col}`}
            className="absolute bg-white"
            style={{
              left: `${(col / COLS) * 100}%`,
              top: `${(row / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
            }}
            animate={exiting ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{
              duration: 0.38,
              delay: exiting ? (col + row) * 0.042 : 0,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))
      )}

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col items-center gap-[60px] md:gap-[80px]">
          {/* Percentage */}
          <span
            ref={progressRef}
            className="font-inter font-light text-[#1f1f1f] leading-normal text-[15px] md:text-[24px] text-center"
          >
            0%
          </span>

          {/* Circle */}
          <motion.div
            className="relative bg-white rounded-full flex items-center justify-center w-[120px] h-[120px] md:w-[200px] md:h-[200px]"
            animate={{
              filter: [
                "drop-shadow(-8px 32px 16px rgba(10,221,95,0.4))",
                "drop-shadow(-16px 0px 20px rgba(14,157,254,0.4))",
                "drop-shadow(0px -26px 20px rgba(172,127,250,0.4))",
                "drop-shadow(8px 0px 10px rgba(255,199,72,0.4))",
                "drop-shadow(8px 8px 10px rgba(217,31,46,0.4))",
                "drop-shadow(-8px 32px 16px rgba(10,221,95,0.4))",
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={iconIdx}
                src={ICONS[iconIdx]}
                alt=""
                className="object-cover w-[96px] h-[96px] rounded-[40px] md:w-[160px] md:h-[160px] md:rounded-[67px]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Tagline */}
          <div className="text-center px-4 md:px-0" style={{ lineHeight: 1.75 }}>
            <p className="m-0 text-[15px] md:text-[24px]">
              <span className="font-inter font-light text-[#1f1f1f]">
                This website was built with
              </span>
              <span className="hidden md:inline font-inter font-light text-[#1f1f1f]">{" "}</span>
              <br className="md:hidden" />
              <span className="font-playfair italic font-medium text-[#1f1f1f]">
                Claude Code, Figma MCP
              </span>
            </p>
            <p className="m-0 font-inter font-light text-[#1f1f1f] text-[15px] md:text-[24px]">
              and ... crafted entirely by myself.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
