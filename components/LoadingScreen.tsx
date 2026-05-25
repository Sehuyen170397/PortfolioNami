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
  const almostRef = useRef<HTMLSpanElement>(null);

  const setProgressText = (p: number) => {
    if (progressRef.current) progressRef.current.textContent = `${p}%`;
  };

  const showAlmost = () => {
    if (almostRef.current) almostRef.current.style.opacity = "1";
  };

  const hideAlmost = () => {
    if (almostRef.current) almostRef.current.style.opacity = "0";
  };

  useEffect(() => {
    const startTime = performance.now();
    let progressRaf: number;
    let done = false;
    let currentP = 0;
    let almostTimer: ReturnType<typeof setTimeout> | null = null;

    const iconInterval = setInterval(() => {
      if (done) return;
      setIconIdx((prev) => (prev + 1) % ICONS.length);
    }, 700);

    const rampToHundred = () => {
      hideAlmost();
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
            setTimeout(() => setVisible(false), 1100);
          }, 200);
        }
      };
      requestAnimationFrame(ramp);
    };

    const onLoad = () => {
      if (done) return;
      done = true;
      if (almostTimer) clearTimeout(almostTimer);
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
      setProgressText(p);
      // Start 2s timer when first hitting 99%
      if (p === 99 && !almostTimer) {
        almostTimer = setTimeout(showAlmost, 2000);
      }
      progressRaf = requestAnimationFrame(tick);
    };
    progressRaf = requestAnimationFrame(tick);

    return () => {
      done = true;
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

      {/* Content — fades out as bars start sliding */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col items-center" style={{ gap: 48 }}>
          {/* Percentage + circle */}
          <div className="flex flex-col items-center" style={{ gap: 24 }}>
            <div className="flex flex-col items-center" style={{ gap: 4 }}>
              <span ref={progressRef} className="font-inter font-medium text-[#1f1f1f] leading-normal text-2xl md:text-[22px]">
                0%
              </span>
              <span
                ref={almostRef}
                className="font-inter font-light text-[#1f1f1f] text-sm"
                style={{ opacity: 0, transition: "opacity 0.4s ease" }}
              >
                ...almost done
              </span>
            </div>

            <div
              className="relative bg-white rounded-full flex items-center justify-center w-40 h-40 md:w-[140px] md:h-[140px]"
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconIdx}
                  src={ICONS[iconIdx]}
                  alt=""
                  className="object-cover w-32 h-32 rounded-[53px] md:w-[112px] md:h-[112px] md:rounded-[37px]"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center px-4 md:px-0" style={{ lineHeight: 1.75 }}>
            <p className="m-0 text-xl md:text-[17px]">
              <span className="font-inter font-light text-[#1f1f1f]">
                This website was built with{" "}
              </span>
              <span className="font-playfair italic font-medium text-[#1f1f1f]">
                Claude Code, Figma MCP
              </span>
            </p>
            <p className="m-0 font-inter font-light text-[#1f1f1f] text-xl md:text-[17px]">
              and ... crafted entirely by myself.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
