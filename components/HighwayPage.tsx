"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const ASSETS = {
  // Desktop EN — 741-35760
  heroBg: "/highway-hero.jpg",
  avatarNew: "/highway-avatar.jpg",
  avatarExp: "/highway-avatar.jpg",
  mobileFlow: "/highway-flow-mobile.jpg",
  responsiveFlow: "/highway-flow-responsive.jpg",
  websiteFlow: "/highway-flow-website.jpg",
  onboarding: "https://www.figma.com/api/mcp/asset/2cf9c5f1-e865-4306-8e5d-566c8c3e514b",
  onboardingHome3: "/highway-home.png",
  otherFeatures: "/highway-features.jpg",
  namiExchangeBanner: "/highway-nami-exchange.jpg",
  arrowSvg: "https://www.figma.com/api/mcp/asset/93665517-db9a-479c-b6b9-c4028f69aa35",
  arrowBannerSvg: "/nex-insurance-arrow.svg",
  // Desktop VI — 733-33753 (different flow diagrams + onboarding in VI)
  mobileFlowVI: "https://www.figma.com/api/mcp/asset/360b2fb2-1d77-4308-8289-6c0909fce53e",
  responsiveFlowVI: "https://www.figma.com/api/mcp/asset/c3ee1735-d620-40c7-b45d-d77c1ab71ec5",
  websiteFlowVI: "https://www.figma.com/api/mcp/asset/5745e2d5-019e-433d-bba5-2493679ea29a",
  onboardingVI: "https://www.figma.com/api/mcp/asset/d30095e3-2d74-462b-a382-f42fd29ecffe",
  otherFeaturesVI: "https://www.figma.com/api/mcp/asset/c9948a55-bfa9-42c5-bd08-751a023a9214",
  namiExchangeBannerVI: "https://www.figma.com/api/mcp/asset/2c0bacbe-d895-404a-a62a-42931ed1ae0e",
  arrowSvgVI: "https://www.figma.com/api/mcp/asset/ee573f49-a318-4f43-82ee-bbffca856ce3",
  avatarNewVI: "https://www.figma.com/api/mcp/asset/8a7c1845-688f-4846-81ea-1ae50847c525",
  avatarExpVI: "https://www.figma.com/api/mcp/asset/c7e5b7ab-892a-4c68-b4db-4caf56e38d11",
  // Mobile — 733-34332
  heroBgMobile: "/highway-hero-mobile.jpg",
  avatarNewMobile: "https://www.figma.com/api/mcp/asset/09df8837-a20a-4180-878e-d87181896012",
  avatarExpMobile: "https://www.figma.com/api/mcp/asset/440cb1e0-e824-458e-b464-7310f09cc2fc",
  mobileFlowMobile: "/highway-flow-mobile.jpg",
  responsiveFlowMobile: "/highway-flow-responsive.jpg",
  websiteFlowMobile: "/highway-flow-website.jpg",
  onboardingMobile: "https://www.figma.com/api/mcp/asset/8d94bf70-87b8-4f7d-a14c-705b7e249933",
  otherFeaturesMobile: "/highway-features.jpg",
  namiExchangeBannerMobile: "/highway-nami-exchange-mobile.jpg",
  arrowMobile: "/nex-insurance-arrow.svg",
};

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-inter font-semibold text-[#1f1f1f] tracking-[-2px] leading-[1.05] max-md:tracking-[-1px] ${className}`}
      style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
    >
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-inter font-light text-[17px] text-[#1f1f1f] leading-[28px] max-md:text-[15px] max-md:leading-[24px] ${className}`}>
      {children}
    </p>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  };
}

function GradientText({ gradient, children, className = "" }: { gradient: string; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`font-inter font-bold text-[20px] leading-normal bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { lang } = useLang();
  const vi = lang === "vi";

  const stats = vi
    ? [
        { label: "Công ty",    value: "Nami Foundation", padCls: "pl-[40px] pr-[20px]" },
        { label: "Thời gian",  value: "2024 - 2025",     padCls: "px-[20px]" },
        { label: "Lĩnh vực",   value: "Blockchain",      padCls: "px-[20px]" },
        { label: "Vai trò",    value: "UI/UX Designer",  padCls: "pl-[20px] pr-[40px]" },
      ]
    : [
        { label: "COMPANY",  value: "Nami Foundation", padCls: "pl-[40px] pr-[20px]" },
        { label: "TIME",     value: "2024 - 2025",     padCls: "px-[20px]" },
        { label: "DOMAIN",   value: "Blockchain",      padCls: "px-[20px]" },
        { label: "ROLE",     value: "UI/UX Designer",  padCls: "pl-[20px] pr-[40px]" },
      ];

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-end pb-[60px] px-[40px] gap-11 max-md:px-6 max-md:pb-[60px] max-md:gap-6"
      style={{ height: "100svh" }}
    >
      <img src={ASSETS.heroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block" />
      <img src={ASSETS.heroBgMobile} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none md:hidden" />

      <div className="relative flex flex-col items-start w-full">
        {/* Desktop */}
        <div className="hidden md:block w-full mb-[-24px] overflow-hidden">
          <motion.p
            className="font-inter font-bold text-white leading-normal whitespace-nowrap tracking-[-5px]"
            style={{ fontSize: "clamp(36px, 7vw, 100px)" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Highway
          </motion.p>
        </div>
        <div className="hidden md:block w-full overflow-hidden">
          <motion.p
            className="font-playfair font-semibold italic text-white leading-normal whitespace-nowrap tracking-[-5px]"
            style={{ fontSize: "clamp(36px, 7vw, 100px)" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            Financial Bridge
          </motion.p>
        </div>
        {/* Mobile */}
        <div className="md:hidden w-full overflow-hidden">
          <motion.p
            className="font-inter font-semibold text-[40px] text-white leading-normal tracking-[-1px]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Highway
          </motion.p>
        </div>
        <div className="md:hidden w-full overflow-hidden">
          <motion.p
            className="font-playfair font-medium italic text-[40px] text-white leading-normal tracking-[-1px]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            Financial Bridge
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative backdrop-blur-[8px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.3)] rounded-[200px] p-px flex overflow-hidden w-fit max-w-[800px] max-md:rounded-[20px] max-md:grid max-md:grid-cols-2 max-md:w-full max-md:max-w-full"
      >
        {stats.map((item) => (
          <div key={item.label} className={`flex flex-col gap-[5px] py-4 max-md:p-[16px] ${item.padCls}`}>
            <span className="font-inter font-normal text-[9px] text-white tracking-[1.26px] uppercase leading-normal">{item.label}</span>
            <span className="font-inter font-bold text-[13px] max-md:text-[12px] text-white tracking-[-0.13px] leading-normal whitespace-nowrap">{item.value}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
function Context() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <motion.section {...fadeUp()} className="px-[120px] py-12 max-md:px-6 max-md:py-8 w-full">
      <Body>
        {vi
          ? "Highway là ứng dụng cầu nối tài chính số giúp người dùng tại Việt Nam nạp - rút - mua - bán crypto trực tiếp bằng VND thông qua ngân hàng/fintech, không cần qua sàn giao dịch hay OTC phức tạp. Đối tượng sử dụng chính sẽ là người mới tìm hiểu crypto, chưa từng giao dịch. Hay người cần chuyển đổi VND sang USDT/BTC một cách hợp pháp. Sản phầm đóng vai trò như gateway cho hệ sinh thái Web3/CEX tại Việt Nam. Có thể tích hợp vào nền tảng giao dịch, ví, nền tảng GameFi, DeFi để giúp người mới bước vào thị trường dễ dàng. Là lớp giao tiếp fiat đầu tiên, thúc đẩy dòng tiền hợp pháp hóa vào thị trường crypto."
          : "Highway is a digital finance bridge that allows users in Vietnam to deposit, withdraw, buy, and sell crypto directly using VND through local banking and fintech services — without relying on complex exchanges or OTC processes. The platform primarily targets crypto newcomers and users looking for a simpler, more legitimate way to convert VND into assets such as USDT or BTC. Designed as a gateway for the Web3 and CEX ecosystem in Vietnam, Highway can be integrated into exchanges, wallets, GameFi, and DeFi platforms to make crypto adoption more accessible for new users. It serves as a fiat on-ramp layer that helps bring legally compliant capital into the crypto market."
        }
      </Body>
    </motion.section>
  );
}

// ─── STATS CARD ───────────────────────────────────────────────────────────────
type StatCard =
  | { kind: "single"; label: string; value: string; sub: string; gradient?: string; bg: string; gradientBorder?: string; grow?: boolean; mobileWide?: boolean; desktopMinW?: string }
  | { kind: "dual"; label: string; row1: { label: string; value: string }; row2: { label: string; value: string }; bg: string; grow?: boolean; mobileWide?: boolean; desktopMinW?: string };

function StatCardEl({ card }: { card: StatCard }) {
  const gradientBorder = card.kind === "single" ? card.gradientBorder : undefined;
  // On mobile all cards grow to fill the row; on desktop only grow-flagged cards do
  const growCls = card.grow ? "flex-[1_0_0]" : "shrink-0 max-md:flex-[1_0_0]";

  return (
    <div
      className={`flex flex-col h-[160px] items-start justify-between ${card.desktopMinW ?? "min-w-[180px]"} ${card.mobileWide ? "" : "max-md:min-w-[167px]"} p-5 rounded-[28px] max-md:rounded-[24px] ${growCls} ${gradientBorder ? "gradient-border" : ""}`}
      style={{ backgroundColor: card.bg, "--gb": gradientBorder } as React.CSSProperties}
    >
      <span className="font-inter font-bold text-[11px] text-[#1f1f1f] tracking-[0.33px] uppercase leading-normal">
        {card.label}
      </span>
      {card.kind === "single" ? (
        <div className="flex flex-col gap-2 items-end w-full">
          {card.gradient ? (
            <GradientText gradient={card.gradient}>{card.value}</GradientText>
          ) : (
            <span className="font-inter font-bold text-[20px] text-[#1f1f1f] leading-normal">{card.value}</span>
          )}
          <span className="font-inter font-light max-md:font-normal text-[15px] max-md:text-[13px] text-[#666] leading-[24px] max-md:leading-[20.8px] text-right">{card.sub}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-1 items-end w-full">
          {[card.row1, card.row2].map((row) => (
            <div key={row.label} className="flex items-baseline gap-2">
              <span className="font-inter font-light max-md:font-normal text-[15px] max-md:text-[13px] text-[#666] leading-[24px] max-md:leading-[20.8px]">{row.label}</span>
              <span className="font-inter font-bold text-[20px] text-[#1f1f1f] leading-normal">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── USER SEGMENT CARD ────────────────────────────────────────────────────────
type SegmentVariant = "green" | "red";
type BulletItem = { bold: string; normal: string };

function UserSegmentCard({
  variant,
  avatarSrc,
  title,
  subtitle,
  items,
}: {
  variant: SegmentVariant;
  avatarSrc: string;
  title: string;
  subtitle: string;
  items: BulletItem[];
}) {
  const borderColor = variant === "green" ? "rgba(55,196,115,0.3)" : "rgba(207,40,51,0.3)";
  const bgColor = variant === "green" ? "rgba(55,196,115,0.1)" : "rgba(207,40,51,0.1)";

  return (
    <div
      className="flex flex-col gap-12 max-md:gap-6 items-start pb-12 max-md:pb-5 pt-8 max-md:pt-4 px-8 max-md:px-4 rounded-[92px] max-md:rounded-[52px]"
      style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}
    >
      {/* Avatar header */}
      <div
        className="relative flex gap-6 max-md:gap-3 items-center p-4 max-md:p-2 rounded-full w-full"
        style={{ border: `1px solid ${borderColor}`, backgroundColor: "white" }}
      >
        <div
          className="relative w-24 h-24 max-md:w-14 max-md:h-14 rounded-full shrink-0 overflow-hidden"
          style={{ border: "0.5px solid rgba(0,0,0,0.1)", boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.1)" }}
        >
          <img src={avatarSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2 max-md:gap-1 flex-1 min-w-0">
          <span className="font-inter font-bold text-[24px] max-md:text-[16px] text-[#1f1f1f] leading-normal whitespace-nowrap">{title}</span>
          <span className="font-inter font-light text-[12px] max-md:text-[11px] text-[#666] leading-normal">{subtitle}</span>
        </div>
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ boxShadow: "inset -2px 2px 4px 0px rgba(0,0,0,0.15)" }}
        />
      </div>
      {/* Bullet list */}
      <ul className="flex flex-col gap-3 w-full list-none">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[14px] leading-[23px] text-[#1f1f1f]">
            <span className="shrink-0 mt-[5px] w-[5px] h-[5px] rounded-full bg-[#1f1f1f]" />
            <span>
              <span className="font-inter font-semibold">{item.bold}</span>
              <span className="font-inter font-normal">{item.normal}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── SECTION 01 — USER INSIGHTS ───────────────────────────────────────────────
function Section01() {
  const { lang } = useLang();
  const vi = lang === "vi";

  const statCards: StatCard[] = vi
    ? [
        { kind: "single", label: "Phương thức giao dịch", value: "74.4%", sub: "trên CEX", gradient: "linear-gradient(108deg, rgb(0,156,110), rgb(0,54,38))", bg: "rgba(66,182,148,0.3)", gradientBorder: "linear-gradient(135deg, rgba(0,156,110,0.85), rgba(0,54,38,0.3))", desktopMinW: "min-w-[210px]" },
        { kind: "single", label: "Độ tuổi trung bình", value: "75%", sub: "18-34 tuổi", bg: "#f2f2f2" },
        { kind: "single", label: "Thu nhập trung bình", value: "68%", sub: "từ dưới 10-25M/tháng", gradient: "linear-gradient(115deg, rgb(255,59,101), rgb(153,35,61))", bg: "rgba(191,37,70,0.13)", gradientBorder: "linear-gradient(135deg, rgba(255,59,101,0.8), rgba(153,35,61,0.3))", grow: true, mobileWide: true },
        { kind: "dual", label: "Tỷ lệ lãi lỗ 2024", row1: { label: "lãi", value: "56.3%" }, row2: { label: "lỗ", value: "43.7%" }, bg: "#f2f2f2", desktopMinW: "min-w-[210px]" },
        { kind: "single", label: "Nơi sinh sống", value: "80%", sub: "Hồ Chí Minh, Hà Nội", gradient: "linear-gradient(113deg, rgb(110,150,110), rgb(185,252,185))", bg: "rgba(185,252,185,0.3)", gradientBorder: "linear-gradient(135deg, rgba(185,252,185,0.9), rgba(110,150,110,0.35))", grow: true },
        { kind: "single", label: "Thị hiếu chung", value: "75%", sub: "lạc quan về thị trường", gradient: "linear-gradient(106deg, rgb(145,131,76), rgb(247,223,130))", bg: "rgba(247,223,130,0.3)", gradientBorder: "linear-gradient(135deg, rgba(247,223,130,0.9), rgba(145,131,76,0.35))", grow: true, desktopMinW: "min-w-[340px]" },
        { kind: "dual", label: "Giới tính", row1: { label: "nam", value: "75%" }, row2: { label: "nữ", value: "25%" }, bg: "#f2f2f2" },
        { kind: "single", label: "Danh mục đầu tư", value: "80%", sub: "đầu tư 1 nửa danh mục vào crypto", bg: "#f2f2f2", grow: true },
        { kind: "single", label: "Nguồn Tin tức", value: "59.7%", sub: "từ nhóm cộng đồng và KOL", gradient: "linear-gradient(122deg, rgb(255,59,101), rgb(153,35,61))", bg: "rgba(191,37,70,0.13)", gradientBorder: "linear-gradient(135deg, rgba(255,59,101,0.8), rgba(153,35,61,0.3))", grow: true },
        { kind: "single", label: "Quyết định đầu tư bởi", value: "80%", sub: "lời khuyên từ bạn bè và cộng đồng chia sẻ tín hiệu", gradient: "linear-gradient(111deg, rgb(69,114,129), rgb(123,204,231))", bg: "rgba(123,204,231,0.3)", gradientBorder: "linear-gradient(135deg, rgba(123,204,231,0.9), rgba(69,114,129,0.35))", grow: true, mobileWide: true },
      ]
    : [
        { kind: "single", label: "Trading methods", value: "74.4%", sub: "on CEX", gradient: "linear-gradient(108deg, rgb(0,156,110), rgb(0,54,38))", bg: "rgba(66,182,148,0.3)", gradientBorder: "linear-gradient(135deg, rgba(0,156,110,0.85), rgba(0,54,38,0.3))", desktopMinW: "min-w-[210px]" },
        { kind: "single", label: "Average age", value: "75%", sub: "18-34 age", bg: "#f2f2f2" },
        { kind: "single", label: "Average income", value: "68%", sub: "10-25M/month", gradient: "linear-gradient(115deg, rgb(255,59,101), rgb(153,35,61))", bg: "rgba(191,37,70,0.13)", gradientBorder: "linear-gradient(135deg, rgba(255,59,101,0.8), rgba(153,35,61,0.3))", grow: true, mobileWide: true },
        { kind: "dual", label: "2024 profit & loss ratio", row1: { label: "profit", value: "56.3%" }, row2: { label: "loss", value: "43.7%" }, bg: "#f2f2f2", desktopMinW: "min-w-[210px]" },
        { kind: "single", label: "Living location", value: "80%", sub: "Ho Chi Minh, Ha Noi", gradient: "linear-gradient(113deg, rgb(110,150,110), rgb(185,252,185))", bg: "rgba(185,252,185,0.3)", gradientBorder: "linear-gradient(135deg, rgba(185,252,185,0.9), rgba(110,150,110,0.35))", grow: true },
        { kind: "single", label: "General", value: "75%", sub: "market optimism", gradient: "linear-gradient(106deg, rgb(145,131,76), rgb(247,223,130))", bg: "rgba(247,223,130,0.3)", gradientBorder: "linear-gradient(135deg, rgba(247,223,130,0.9), rgba(145,131,76,0.35))", grow: true, desktopMinW: "min-w-[340px]" },
        { kind: "dual", label: "Gender", row1: { label: "male", value: "75%" }, row2: { label: "female", value: "25%" }, bg: "#f2f2f2" },
        { kind: "single", label: "Investment Portfolio", value: "80%", sub: "allocating over 50% of portfolio into crypto", bg: "#f2f2f2", grow: true },
        { kind: "single", label: "News sources", value: "59.7%", sub: "Community & KOL Influence", gradient: "linear-gradient(122deg, rgb(255,59,101), rgb(153,35,61))", bg: "rgba(191,37,70,0.13)", gradientBorder: "linear-gradient(135deg, rgba(255,59,101,0.8), rgba(153,35,61,0.3))", grow: true },
        { kind: "single", label: "Investment decision", value: "80%", sub: "by friends and trusted signal-sharing communities", gradient: "linear-gradient(111deg, rgb(69,114,129), rgb(123,204,231))", bg: "rgba(123,204,231,0.3)", gradientBorder: "linear-gradient(135deg, rgba(123,204,231,0.9), rgba(69,114,129,0.35))", grow: true, mobileWide: true },
      ];

  const newUserItems: BulletItem[] = vi
    ? [
        { bold: "Độ tuổi: ", normal: "18-25 tuổi." },
        { bold: "Giới tính: ", normal: "80% nam, 20% nữ." },
        { bold: "Nghề nghiệp: ", normal: "nhân viên văn phòng, freelancer, nhà sáng tạo nội dung, một phần nhà đầu tư chứng khoán mới." },
        { bold: "Khu vực: ", normal: "Chủ yếu TP.HCM và Hà Nội." },
        { bold: "Thu nhập trung bình: ", normal: "10 - 25 triệu VND/tháng." },
        { bold: "Tỷ lệ sở hữu crypto: ", normal: "Chưa hoặc rất ít; đa số mới tham gia cộng đồng, chưa từng giao dịch." },
        { bold: "Hành vi chính: ", normal: "Theo dõi cộng đồng/KOL, nhận thông tin từ bạn bè (80% đầu tư theo lời khuyên)." },
        { bold: "Painpoints: ", normal: "Lo ngại rủi ro pháp lý và bảo mật, thiếu trải nghiệm thân thiện vì giao diện phức tạp và thiếu hướng dẫn rõ ràng." },
      ]
    : [
        { bold: "Age: ", normal: "18–25 years old" },
        { bold: "Gender: ", normal: "80% male, 20% female" },
        { bold: "Occupation: ", normal: "Office workers, freelancers, content creators, and beginner stock investors" },
        { bold: "Location: ", normal: "Primarily Ho Chi Minh City and Hanoi" },
        { bold: "Average Income: ", normal: "10–25 million VND/month" },
        { bold: "Crypto Ownership: ", normal: "Little to none; most are new to crypto communities and have never traded before" },
        { bold: "Primary Behaviors: ", normal: "Follow communities and KOLs, often influenced by friends and recommendations (80% invest based on referrals)" },
        { bold: "Painpoints: ", normal: "Concerned about legal and security risks, complex interfaces, and lack of clear guidance" },
      ];

  const expUserItems: BulletItem[] = vi
    ? [
        { bold: "Độ tuổi chủ đạo: ", normal: "25 - 34 tuổi." },
        { bold: "Giới tính: ", normal: "75% nam, 25% nữ." },
        { bold: "Nghề nghiệp: ", normal: "trader cá nhân, nhà đầu tư DeFi/GameFi/NFT, freelancer nhận thanh toán bằng crypto, game thủ." },
        { bold: "Khu vực: ", normal: "Chủ yếu TP.HCM và Hà Nội." },
        { bold: "Thu nhập trung bình: ", normal: "20 - 40 triệu VND/tháng, một số cao hơn nhờ lợi nhuận giao dịch." },
        { bold: "Tỷ lệ sở hữu crypto: ", normal: "80% dành ít nhất một nửa tài sản cho crypto." },
        { bold: "Hành vi chính: ", normal: "Đã quen với việc giao dịch crypto, nhưng vẫn gặp rào cản khi nạp/rút VND qua kênh chính thức." },
        { bold: "Painpoints: ", normal: "Thiếu kênh on-ramp chính thức, hợp lệ khiến người dùng phải dùng các phương thức không minh bạch, rủi ro và đắt đỏ." },
      ]
    : [
        { bold: "Main Age Group: ", normal: "25–34 years old" },
        { bold: "Gender: ", normal: "75% male, 25% female" },
        { bold: "Occupation: ", normal: "Individual traders, DeFi/GameFi/NFT investors, crypto-paid freelancers, gamers" },
        { bold: "Location: ", normal: "Primarily Ho Chi Minh City and Hanoi" },
        { bold: "Average Income: ", normal: "20–40 million VND/month, with some earning more through trading profits" },
        { bold: "Crypto Allocation: ", normal: "80% allocate at least half of their assets into crypto" },
        { bold: "Primary Behaviors: ", normal: "Familiar with crypto trading but still face friction when depositing or withdrawing VND through official channels" },
        { bold: "Pain Points: ", normal: "Lack of official and compliant fiat on-ramp channels, forcing users to rely on expensive and less transparent alternatives" },
      ];

  return (
    <section className="px-[120px] py-[100px] max-md:px-6 max-md:py-[48px] w-full">
      <div className="flex flex-col gap-12 max-md:gap-10">
        {/* Heading + body */}
        <motion.div {...fadeUp()} className="flex flex-col gap-8">
          <SectionHeading>{vi ? "Chân dung tổng quan" : "User Insights"}</SectionHeading>
          <Body>
            {vi
              ? "Theo khảo sát cho thấy pain point của người dùng mới là họ lo ngại rủi ro pháp lý và bảo mật, thiếu trải nghiệm thân thiện, dễ tiếp cận vì giao diện phức tạp và thiếu hướng dẫn rõ ràng. Trong khi đó người dùng cũ thì lại thiếu kênh on-ramp chính thức, hợp lệ khiến người dùng phải dùng các phương thức không minh bạch, rủi ro và đắt đỏ."
              : "Research showed that new users were mainly concerned about legal and security risks, while also struggling with complex interfaces and unclear guidance that made crypto difficult to approach. Meanwhile, experienced users lacked an official and trustworthy fiat on-ramp, forcing them to rely on opaque, risky, and often expensive alternatives."
            }
          </Body>
        </motion.div>

        {/* Stats cards */}
        <motion.div {...fadeUp(0.05)} className="flex flex-col gap-3">
          <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.88px] uppercase leading-normal">
            {vi ? "Báo cáo thị trường Crypto Việt Nam 2024 từ Coin68" : "Vietnam Crypto Market Report 2024 — Coin68"}
          </span>
          <div className="flex flex-wrap content-start gap-3 max-md:gap-2 pt-5">
            {statCards.map((card, i) => (
              <StatCardEl key={i} card={card} />
            ))}
          </div>
        </motion.div>

        {/* User segments */}
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-3">
          <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.88px] uppercase leading-normal">
            {vi ? "Phân khúc người dùng" : "User Segments"}
          </span>
          <div className="grid grid-cols-2 gap-3 pt-5 max-md:grid-cols-1">
            <UserSegmentCard
              variant="green"
              avatarSrc={vi ? ASSETS.avatarNewVI : ASSETS.avatarNew}
              title={vi ? "Người dùng mới" : "New Users"}
              subtitle={vi ? "Nhóm đang tìm hiểu hoặc mới bước chân vào thị trường" : "Users Exploring or Entering the Market for the First Time"}
              items={newUserItems}
            />
            <UserSegmentCard
              variant="red"
              avatarSrc={vi ? ASSETS.avatarExpVI : ASSETS.avatarExp}
              title={vi ? "Người dùng đã giao dịch" : "Experienced Users"}
              subtitle={vi ? "Nhóm có kinh nghiệm, đã sở hữu và giao dịch" : "Users with Existing Crypto Ownership and Trading Experience"}
              items={expUserItems}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 02 — MULTI-PLATFORM ─────────────────────────────────────────────
function Section02() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <section className="px-[120px] pt-[100px] pb-0 max-md:px-6 max-md:pt-[48px] w-full flex flex-col gap-12 max-md:gap-8">
      <motion.div {...fadeUp()} className="flex flex-col gap-3">
        <SectionHeading>
          {vi ? (
            <>Truy cập từ các<br />nền tảng thiết bị</>
          ) : (
            "Multi-Platform Accessibility"
          )}
        </SectionHeading>
        <div className="flex flex-col gap-4 pt-5 max-w-[640px]">
          {vi ? (
            <Body>
              {`Sản phẩm được mở rộng luồng truy cập từ nhiều nền tảng khác nhau như: Website & App Nami Exchange, App clip, NFC. Trong giai đoạn đầu sẽ tập trung vào liên kết với các sản phẩm đã phát triển trước đó như Nami Exchange.`}
            </Body>
          ) : (
            <>
              <Body>
                The product expanded access across multiple platforms and devices, including the Nami Exchange website, mobile app, App Clip, and NFC interactions.
              </Body>
              <Body>
                During the initial phase, the focus was placed on integrating with existing ecosystem products such as Nami Exchange to accelerate adoption and create a more seamless user experience.
              </Body>
            </>
          )}
        </div>
      </motion.div>

      {/* Desktop 2x2 grid */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {/* Row 1 col 1 — Direction card */}
        <motion.div
          {...fadeUp(0.05)}
          className="bg-[#f2f2f2] border border-[rgba(0,0,0,0.1)] rounded-[32px] p-8 flex flex-col gap-6 aspect-[594/334]"
        >
          <div className="flex flex-col gap-4 pb-6 border-b border-[rgba(0,0,0,0.1)]">
            <span className="font-inter font-bold text-[20px] text-[#1f1f1f] leading-normal">{vi ? "Định hướng" : "Direction"}</span>
            <span className="font-inter font-normal text-[14px] text-[#1f1f1f] leading-[23px]">
              {vi
                ? "Giúp người dùng có thể truy cập tính năng trên các nền tảng thiết bị một cách dễ dàng, cung cấp đầy đủ thông tin khi trải nghiệm."
                : "Enable users to access features seamlessly across multiple platforms and devices while providing clear and sufficient information throughout the experience."}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-inter font-bold text-[20px] text-[#1f1f1f] leading-normal">{vi ? "Nhu cầu" : "User Needs"}</span>
            <span className="font-inter font-normal text-[14px] text-[#1f1f1f] leading-[23px]">
              {vi
                ? "Trong quá trình khám phá sản phẩm Nami Exchange, người dùng mong muốn sở hữu, giao dịch tài sản số nhanh chóng."
                : "While exploring the Nami Exchange ecosystem, users wanted a faster and more accessible way to own and trade digital assets."}
            </span>
          </div>
        </motion.div>
        {/* Row 1 col 2 — Website flow */}
        <motion.div {...fadeUp(0.1)} className="rounded-[32px] overflow-hidden aspect-[594/334]">
          <img src={vi ? ASSETS.websiteFlowVI : ASSETS.websiteFlow} alt="Website flow" className="w-full h-full object-cover" />
        </motion.div>
        {/* Row 2 col 1 — Responsive flow */}
        <motion.div {...fadeUp(0.1)} className="rounded-[32px] overflow-hidden aspect-[594/334]">
          <img src={vi ? ASSETS.responsiveFlowVI : ASSETS.responsiveFlow} alt="Responsive flow" className="w-full h-full object-cover" />
        </motion.div>
        {/* Row 2 col 2 — Mobile flow */}
        <motion.div {...fadeUp(0.15)} className="rounded-[32px] overflow-hidden aspect-[594/334]">
          <img src={vi ? ASSETS.mobileFlowVI : ASSETS.mobileFlow} alt="Mobile flow" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden flex flex-col gap-3">
        <motion.div {...fadeUp()} className="bg-[#f2f2f2] border border-[rgba(0,0,0,0.1)] rounded-[24px] p-5 flex flex-col gap-6">
          <div className="flex flex-col gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <span className="font-inter font-bold text-[16px] text-[#1f1f1f] leading-normal">{vi ? "Định hướng" : "Direction"}</span>
            <span className="font-inter font-normal text-[14px] text-[#1f1f1f] leading-[23px]">
              {vi
                ? "Giúp người dùng có thể truy cập tính năng trên các nền tảng thiết bị một cách dễ dàng, cung cấp đầy đủ thông tin khi trải nghiệm."
                : "Enable users to access features seamlessly across multiple platforms and devices while providing clear and sufficient information throughout the experience."}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-inter font-bold text-[16px] text-[#1f1f1f] leading-normal">{vi ? "Nhu cầu" : "User Needs"}</span>
            <span className="font-inter font-normal text-[14px] text-[#1f1f1f] leading-[23px]">
              {vi
                ? "Trong quá trình khám phá sản phẩm Nami Exchange, người dùng mong muốn sở hữu, giao dịch tài sản số nhanh chóng."
                : "While exploring the Nami Exchange ecosystem, users wanted a faster and more accessible way to own and trade digital assets."}
            </span>
          </div>
        </motion.div>
        <motion.div {...fadeUp(0.05)} className="rounded-[24px] overflow-hidden h-[192px]">
          <img src={ASSETS.websiteFlowMobile} alt="Website flow" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="rounded-[24px] overflow-hidden h-[192px]">
          <img src={ASSETS.mobileFlowMobile} alt="Mobile flow" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div {...fadeUp(0.15)} className="rounded-[24px] overflow-hidden h-[192px]">
          <img src={ASSETS.responsiveFlowMobile} alt="Responsive flow" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 03 — FEATURE ─────────────────────────────────────────────────────
function Section03() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <section className="px-[120px] py-[100px] max-md:px-6 max-md:py-[48px] w-full flex flex-col gap-12 max-md:gap-10">
      {/* Heading + bullet list */}
      <motion.div {...fadeUp()} className="flex flex-col gap-3 max-w-[640px]">
        <SectionHeading>{vi ? "Tính năng" : "Feature"}</SectionHeading>
        <div className="pt-5 flex flex-col gap-0">
          <Body>
            {vi
              ? "Để hoàn thiện nhanh chóng giai đoạn 1, chúng mình đã tập trung vào mục đích chính của sản phẩm:"
              : "To accelerate the completion of Phase 1, we focused on the product's core objectives:"
            }
          </Body>
          <ul className="list-disc pl-6 flex flex-col gap-1 mt-1">
            {vi ? (
              <>
                <li><Body>Cung cấp mua, bán crypto trực tiếp bằng VND qua kết nối ngân hàng/fintech.</Body></li>
                <li><Body>Giao diện đơn giản, tương tự app ngân hàng, phù hợp người mới.</Body></li>
                <li><Body>Thiết kế UX hướng tới người dùng đại chúng: &quot;một app như ngân hàng, người dùng mới cũng dùng được&quot;.</Body></li>
              </>
            ) : (
              <>
                <li><Body>Enable users to deposit, withdraw, buy, and sell crypto directly with VND through banking and fintech integrations</Body></li>
                <li><Body>Create a simple interface inspired by familiar banking applications, making it approachable for beginners</Body></li>
                <li><Body>Design an accessible user experience tailored for mass adoption — &quot;a banking-like app that even new users can use comfortably&quot;</Body></li>
              </>
            )}
          </ul>
        </div>
      </motion.div>

      {/* Onboarding subsection */}
      <motion.div {...fadeUp(0.05)} className="flex flex-col gap-6 max-md:gap-4">
        <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">Onboarding</span>
        <Body className="max-w-[640px]">
          {vi
            ? "Onboarding của Highway rất đơn giản và diễn ra nhanh chóng. Tập trung hiển thị các điểm mạnh và tinh thần của sản phẩm thông qua nội dung và hiển thị UI."
            : "Highway's onboarding experience was designed to be simple and fast, focusing on communicating the product's strengths and vision through both content and UI presentation."}
        </Body>
        {/* Desktop onboarding container — aspect-[8/5] = 1200:750 at design width */}
        <div className="hidden md:block relative bg-black rounded-[56px] overflow-hidden aspect-[8/5]">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ gap: "5.5%" }}
          >
            {[
              "https://res.cloudinary.com/diuvrdjar/video/upload/v1779510617/Screen_Recording_2026-05-16_at_10.32.51_keqvpw.mov",
              "https://res.cloudinary.com/diuvrdjar/video/upload/v1779510711/Screen_Recording_2026-05-16_at_10.35.21_vcjc2b.mov",
            ].map((src) => (
              <video
                key={src}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="shrink-0 rounded-[36px] object-cover aspect-[300/609]"
                style={{ height: "82%", width: "auto" }}
              />
            ))}
            <img
              src={ASSETS.onboardingHome3}
              alt=""
              className="shrink-0 object-contain aspect-[300/609]"
              style={{ height: "82%", width: "auto" }}
            />
          </div>
        </div>
        {/* Mobile onboarding container */}
        <div className="md:hidden bg-black rounded-[56px] overflow-hidden pt-5 pb-5 flex flex-col items-center gap-6">
          {[
            "https://res.cloudinary.com/diuvrdjar/video/upload/v1779510617/Screen_Recording_2026-05-16_at_10.32.51_keqvpw.mov",
            "https://res.cloudinary.com/diuvrdjar/video/upload/v1779510711/Screen_Recording_2026-05-16_at_10.35.21_vcjc2b.mov",
          ].map((src) => (
            <video
              key={src}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-[300px] max-w-full shrink-0 rounded-[36px] object-cover aspect-[300/609]"
            />
          ))}
          <img
            src={ASSETS.onboardingHome3}
            alt=""
            className="w-[300px] max-w-full shrink-0 object-contain aspect-[300/609]"
          />
        </div>
      </motion.div>

      {/* Other features subsection */}
      <motion.div {...fadeUp(0.05)} className="flex flex-col gap-6 max-md:gap-4">
        <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">
          {vi ? "TÍNH NĂNG KHÁC" : "OTHER FEATURES"}
        </span>
        <Body className="max-w-[640px]">
          {vi
            ? "Ngoài tính năng chính để sỡ hữu tài sản số một cách nhanh chóng, sản phẩm còn chứa những tính năng bổ trợ để hoàn thiện trải nghiệm như: Ví, thị trường, bán tài sản, tìm kiếm, xác minh tài khoản,..."
            : "Beyond its core functionality of enabling quick access to digital assets, the platform also included supporting features such as Wallets, Market, Asset Selling, Search, and Account Verification to create a more complete user experience."}
        </Body>
        {/* Desktop full-width image */}
        <div className="hidden md:block w-full rounded-[56px] overflow-hidden aspect-[4/3]">
          <img
            src={vi ? ASSETS.otherFeaturesVI : ASSETS.otherFeatures}
            alt="Other features"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Mobile image */}
        <div className="md:hidden w-full rounded-[24px] overflow-hidden" style={{ height: "257px" }}>
          <img
            src={ASSETS.otherFeaturesMobile}
            alt="Other features"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── SECTION 05 — AND MUCH MORE ───────────────────────────────────────────────
function Section05() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <section className="px-[120px] py-[100px] max-md:px-6 max-md:py-[48px] w-full">
      <motion.div {...fadeUp()} className="flex flex-col gap-3 max-w-[640px]">
        <SectionHeading>{vi ? "Còn nhiều hơn nữa" : "And much more"}</SectionHeading>
        <div className="flex flex-col gap-4 pt-5">
          {vi ? (
            <Body>
              {`Highway đang trong quá trình MVP - Phát triển & kiểm thử với các hoạt động chính như: Nghiên cứu thị trường & nhu cầu người dùng, xây dựng sản phẩm thử nghiệm và kiểm thử nội bộ & bên ngoài. Nên nội dung liên quan đến dự án sẽ được mình cập nhật khi có thông tin và được triển khai trong những giai đoạn tiếp theo nhé.`}
            </Body>
          ) : (
            <>
              <Body>
                Highway is currently in the MVP development and testing phase, with key activities including market and user research, prototype development, and both internal and external testing.
              </Body>
              <Body>
                More project details will be updated gradually as new information becomes available and future phases are implemented.
              </Body>
            </>
          )}
        </div>
      </motion.div>
      <motion.div {...fadeUp(0.05)} className="pt-6">
        <p className="font-inter font-normal italic text-[14px] text-[#1f1f1f] leading-[22px] tracking-[-0.14px]">
          Team member: Võ Xuân Truyền, Trần Nguyên Phát, Phạm Thị Tường Vy.
        </p>
      </motion.div>
    </section>
  );
}

// ─── NAMI EXCHANGE BANNER ─────────────────────────────────────────────────────
function NamiExchangeBanner() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <a
      href="/work/nami-exchange"
      data-cursor="take a look"
      className="relative w-full overflow-hidden flex cursor-pointer items-center max-md:items-start"
      style={{ minHeight: "clamp(180px, 16.7vw, 240px)" }}
    >
      {/* Desktop bg */}
      <img
        src={vi ? ASSETS.namiExchangeBannerVI : ASSETS.namiExchangeBanner}
        alt=""
        className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Mobile bg */}
      <img
        src={ASSETS.namiExchangeBannerMobile}
        alt=""
        className="md:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Desktop content */}
      <div className="hidden md:flex relative w-full px-[120px] items-center gap-8">
        <h3 className="font-inter font-semibold text-[40px] text-[#1f1f1f] leading-normal flex-1 min-w-0">
          {vi
            ? "Nền tảng giao dịch tài sản số với các sản phẩm Spot, Futures và Auto-Invest"
            : "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products"}
        </h3>
        <div
          className="flex items-center gap-4 rounded-full px-6 py-2 shrink-0 backdrop-blur-[24px] border border-[rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span className="font-inter font-semibold text-[24px] text-[#1f1f1f]">
            {vi ? "Xem dự án" : "View project"}
          </span>
          <img src={ASSETS.arrowBannerSvg} alt="" className="w-5 h-5 object-contain" />
        </div>
      </div>

      {/* Mobile content */}
      <div className="md:hidden relative w-full px-6 pt-8 pb-10 flex flex-col gap-5">
        <h3 className="font-inter font-semibold text-[26px] text-[#1f1f1f] leading-normal">
          {vi
            ? "Nền tảng giao dịch tài sản số với các sản phẩm Spot, Futures và Auto-Invest"
            : "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products"}
        </h3>
        <div
          className="flex items-center gap-4 rounded-full px-6 py-2 w-fit backdrop-blur-[24px] border border-[rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span className="font-inter font-semibold text-[20px] text-[#1f1f1f]">
            {vi ? "Xem dự án" : "View project"}
          </span>
          <img src={ASSETS.arrowMobile} alt="" className="w-5 h-5 object-contain" />
        </div>
      </div>
    </a>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HighwayPage() {
  return (
    <>
      <Hero />
      <Context />
      <Section01 />
      <Section02 />
      <Section03 />
      <Section05 />
      <NamiExchangeBanner />
    </>
  );
}
