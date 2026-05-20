"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  { company: "Nami Foundation", role: "Lead UI/UX Designer", years: "2025 - Now" },
  { company: "Nami Foundation", role: "UI/UX Designer", years: "2023 - 2025" },
  { company: "Gameloft Vietnam", role: "Graphic Designer", years: "2019 - 2022" },
  { company: "P&G Vietnam", role: "Machine Operator", years: "2017 - 2019" },
  { company: "Bosch Global Software Technologies", role: "Tester Internship", years: "2016" },
];

const awards = [
  { title: "UI/UX Designer of the Year", org: "Nami Foundation", year: "2024" },
  { title: "Outstanding Newcomer Award", org: "P&G Vietnam", year: "2018" },
];

const skills = [
  "Design Systems",
  "Cross-functional",
  "Document Reading Skills",
  "Prototyping",
  "Research & Synthesis",
  "Stakeholder Alignment",
  "Design × Engineering",
  "Product Strategy",
  "Good Vibes",
];

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

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip reveal: h2 rises up through overflow-hidden wrapper on enter
      gsap.from(headerTextRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerWrapRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Exit parallax: header fades and rises as section scrolls past viewport top
      gsap.to(headerWrapRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "25% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="flex flex-col gap-10 items-start px-10 py-[120px] relative w-full bg-white max-md:px-6 max-md:py-[60px] max-md:gap-8"
    >
      {/* Header */}
      <div ref={headerWrapRef} className="flex flex-col items-start w-full overflow-hidden">
        <h2
          ref={headerTextRef}
          className="font-playfair font-medium italic text-[#1f1f1f] tracking-[-1px] leading-normal"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          My Story
        </h2>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-x-[80px] gap-y-[60px] w-full">

        {/* Left — bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <p className="font-inter font-light text-[22px] leading-[35.64px] text-[#1f1f1f] max-md:text-[17px] max-md:leading-[28px]">
            UI/UX Designer with 3+ years at Nami Foundation.{" "}
            <span className="text-[#666]">
              Designing crypto products such as exchanges and decentralized
              insurance, while supporting growth through campaigns, events, and
              product-driven initiatives.
            </span>
          </p>
          <p className="font-inter font-light text-[22px] leading-[35.64px] text-[#666] max-md:text-[17px] max-md:leading-[28px]">
            I collaborate closely with cross-functional teams including Business
            Analysts, Developers, QA/QC, and Product Managers throughout the
            development process.{" "}
            <span className="text-[#1f1f1f]">
              I prioritize understanding the problem or feature requirements
              first
            </span>
            , rather than jumping straight into Figma.
          </p>
          <p className="font-inter font-light text-[22px] leading-[35.64px] text-[#666] max-md:text-[17px] max-md:leading-[28px]">
            My transition from engineer to UI/UX Designer enables me to work
            effectively in teams and approach{" "}
            <span className="text-[#1f1f1f]">
              design with a structured, process-driven mindset
            </span>
            .
          </p>
          <p className="font-inter font-light text-[22px] leading-[35.64px] text-[#666] max-md:text-[17px] max-md:leading-[28px]">
            In 2024, I was honored to receive the "
            <span className="text-[#1f1f1f]">UI/UX Designer of the Year</span>"
            award at Nami Foundation. This recognition motivates me to continue
            growing toward a Lead UI/UX Designer role.
          </p>

          <button className="flex items-center gap-[7px] border border-[rgba(0,0,0,0.2)] bg-[rgba(255,255,255,0.1)] rounded-full h-8 px-[13px] py-2 w-fit hover:bg-[rgba(0,0,0,0.05)] transition-colors mt-2">
            <span className="font-inter font-normal text-[11px] text-[#1f1f1f] uppercase">
              View CV
            </span>
            <ViewMoreIcon />
          </button>
        </motion.div>

        {/* Right — lists */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex flex-col gap-11"
        >
          {/* Experience */}
          <div className="flex flex-col gap-4">
            <p className="font-playfair font-semibold text-[10px] text-[#666] tracking-[1.4px] uppercase">
              Experience
            </p>
            <div className="flex flex-col">
              {experience.map((item) => (
                <div
                  key={item.company + item.role}
                  className="relative border-b border-[rgba(0,0,0,0.1)] h-[63px] flex-shrink-0"
                >
                  <div className="absolute left-0 top-[14px] flex flex-col gap-0.5">
                    <span className="font-inter font-semibold text-[14px] text-[#1f1f1f] leading-normal">
                      {item.company}
                    </span>
                    <span className="font-inter font-light text-[12px] text-[#666] capitalize">
                      {item.role}
                    </span>
                  </div>
                  <span className="absolute right-0 top-[14px] font-inter font-normal text-[11px] text-[#666] leading-normal">
                    {item.years}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="flex flex-col gap-4">
            <p className="font-playfair font-semibold text-[10px] text-[#666] tracking-[1.4px] uppercase">
              Awards
            </p>
            <div className="flex flex-col">
              {awards.map((item) => (
                <div
                  key={item.title}
                  className="relative border-b border-[rgba(0,0,0,0.1)] h-[63px] flex-shrink-0"
                >
                  <div className="absolute left-0 top-[14px] flex flex-col gap-0.5">
                    <span className="font-inter font-semibold text-[14px] text-[#1f1f1f] leading-normal">
                      {item.title}
                    </span>
                    <span className="font-inter font-light text-[12px] text-[#666] capitalize">
                      {item.org}
                    </span>
                  </div>
                  <span className="absolute right-0 top-[14px] font-inter font-normal text-[11px] text-[#666] leading-normal">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-6">
            <p className="font-playfair font-semibold text-[10px] text-[#666] tracking-[1.4px] uppercase">
              Skills
            </p>
            <div className="flex flex-wrap gap-[10px]">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[rgba(0,0,0,0.1)] rounded-full px-[15px] py-[7px] font-inter font-normal text-[11px] text-[#666] leading-[15.4px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
