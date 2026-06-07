"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const ASSETS = {
  // Desktop EN — Figma 648-23426
  heroBg: "/nami-insurance-hero.jpg",
  graphic: "/nami-insurance-lm-graphic.png",
  imgOnchain: "/nami-insurance-onchain.png",
  imgMuaBaoHiem: "/nami-insurance-contract.png",
  imgHoaHong: "/nami-insurance-referral.jpg",
  imgEmail: "/nami-insurance-email.jpg",
  designSystem1: "/nami-insurance-ds1.jpg",
  designSystem2: "/nami-insurance-ds2.jpg",
  designSystem3: "/nami-insurance-ds3.jpg",
  imgContainer: "/nami-insurance-container.jpg",
  highwayBg: "/nami-insurance-highway.jpg",
  arrow: "/nex-insurance-arrow.svg",
  // Desktop VI — same images as EN
  graphicVI: "/nami-insurance-lm-graphic.png",
  imgOnchainVI: "/nami-insurance-onchain.png",
  imgMuaBaoHiemVI: "/nami-insurance-contract.png",
  imgHoaHongVI: "/nami-insurance-referral.jpg",
  imgEmailVI: "/nami-insurance-email.jpg",
  designSystem1VI: "/nami-insurance-ds1.jpg",
  designSystem2VI: "/nami-insurance-ds2.jpg",
  designSystem3VI: "/nami-insurance-ds3.jpg",
  imgContainerVI: "/nami-insurance-container.jpg",
  highwayBgVI: "/nami-insurance-highway.jpg",
  arrowVI: "/nex-insurance-arrow.svg",
  // Mobile
  heroBgMobile: "/nami-insurance-hero-mobile.jpg",
  graphicMobile: "/nami-insurance-lm-graphic.png",
  imgOnchainMobile: "/nami-insurance-onchain.png",
  imgMuaBaoHiemMobile: "/nami-insurance-contract.png",
  imgHoaHongMobile: "/nami-insurance-referral.jpg",
  imgEmailMobile: "/nami-insurance-email.jpg",
  designSystem1Mobile: "/nami-insurance-ds1.jpg",
  designSystem2Mobile: "/nami-insurance-ds2.jpg",
  designSystem3Mobile: "/nami-insurance-ds3.jpg",
  imgContainerMobile: "/nami-insurance-container.jpg",
  highwayBannerMobile: "/nami-insurance-highway-mobile.jpg",
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
    <p className={`font-inter font-light text-[17px] text-[#1f1f1f] leading-[28px] max-md:text-[15px] max-md:leading-[25px] ${className}`}>
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

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { lang } = useLang();
  const stats =
    lang === "en"
      ? [
          { label: "COMPANY",  value: "Nami Foundation", padCls: "pl-[40px] pr-[20px]" },
          { label: "TIME",     value: "2022 - 2024",     padCls: "px-[20px]" },
          { label: "DOMAIN",   value: "Dafi Insurance",   padCls: "px-[20px]" },
          { label: "ROLE",     value: "UI/UX Designer",  padCls: "pl-[20px] pr-[40px]" },
        ]
      : [
          { label: "Công ty",    value: "Nami Foundation", padCls: "pl-[40px] pr-[20px]" },
          { label: "Thời gian",  value: "2022 - 2024",     padCls: "px-[20px]" },
          { label: "Lĩnh vực",   value: "Dafi Insurance",  padCls: "px-[20px]" },
          { label: "Vai trò",    value: "UI/UX Designer",  padCls: "pl-[20px] pr-[40px]" },
        ];

  return (
    <section
      className="relative w-full overflow-hidden bg-white flex flex-col justify-end pb-[60px] px-[40px] gap-11 max-md:px-6 max-md:pb-[60px] max-md:gap-6"
      style={{ height: "100svh" }}
    >
      <img src={ASSETS.heroBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block" />
      <img src={ASSETS.heroBgMobile} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none md:hidden" />

      <div className="relative flex flex-col items-start w-full">
        <div className="hidden md:block w-full mb-[-24px] overflow-hidden">
          <motion.p
            className="font-inter font-bold text-white leading-normal whitespace-nowrap tracking-[-5px]"
            style={{ fontSize: "clamp(36px, 7vw, 100px)" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Nami Insurance
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
            DAFI
          </motion.p>
        </div>
        <div className="md:hidden w-full overflow-hidden">
          <motion.p
            className="font-inter font-semibold text-[40px] text-white leading-normal whitespace-nowrap tracking-[-1px]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Nami Insurance
          </motion.p>
        </div>
        <div className="md:hidden w-full overflow-hidden">
          <motion.p
            className="font-playfair font-medium italic text-[40px] text-white leading-normal whitespace-nowrap tracking-[-1px]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            DAFI
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative backdrop-blur-[8px] bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] rounded-[200px] p-px flex overflow-hidden w-fit max-w-[800px] max-md:rounded-[20px] max-md:grid max-md:grid-cols-2 max-md:w-full max-md:max-w-full"
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
      {vi ? (
        <Body>
          Bảo hiểm Nami Insurance ứng dụng công nghệ blockchain, biến rủi ro thành cơ hội trong hoạt động giao dịch tài sản số đầu tiên trên thế giới. Nami Insurance không giữ tài sản (Non-Custodial) và luôn hướng tới việc bảo vệ giá trị tài sản của người dùng. Với Nami Insurance, người dùng được quyền lựa chọn loại tài sản cần bảo hiểm, đặt khoản ký quỹ phù hợp với mức giá cần bảo hiểm và kỳ hạn bảo hiểm. Đổi lại, người dùng sẽ nhận được khoản chi trả bảo hiểm tương ứng khi tài sản chạm mức giá đã thiết lập trước đó.
        </Body>
      ) : (
        <div className="flex flex-col gap-4">
          <Body>
            Nami Insurance is a blockchain-powered insurance platform designed to transform risk into opportunity for digital asset trading.
          </Body>
          <Body>
            Built as a non-custodial solution, the platform focuses on protecting the value of users&apos; assets while giving them full control over their funds. Users can choose which assets to insure, set their preferred coverage price, collateral amount, and insurance duration. In return, they receive insurance payouts when the asset reaches the predefined price condition.
          </Body>
        </div>
      )}
    </motion.section>
  );
}

// ─── GRAPHIC ──────────────────────────────────────────────────────────────────
function Graphic() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <motion.div {...fadeUp()} className="w-full">
      <img src={vi ? ASSETS.graphicVI : ASSETS.graphic} alt="" className="hidden md:block w-full object-cover" />
      <img src={ASSETS.graphicMobile} alt="" className="md:hidden w-full object-cover" />
    </motion.div>
  );
}

// ─── SECTION 01 — FLEXIBLE ACCESSIBILITY ─────────────────────────────────────
function Section01() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <section className="px-[120px] py-[100px] max-md:px-6 max-md:py-[48px] w-full">
      <div className="grid grid-cols-2 gap-6 items-start max-md:grid-cols-1 max-md:gap-8">
        <motion.div {...fadeUp()} className="flex flex-col gap-8 md:pt-[108px]">
          <SectionHeading>
            {vi ? "Hoạt động linh hoạt" : "Flexible Accessibility"}
          </SectionHeading>
          {vi ? (
            <div className="flex flex-col gap-4">
              <Body>
                Nami Insurance hỗ trợ cho người dùng hình thức hoạt động linh hoạt phù hợp với từng tệp người dùng khác nhau.
              </Body>
              <ul className="list-disc pl-6 flex flex-col gap-3">
                <li>
                  <Body>
                    Được tích hợp trên nền tảng giao dịch Nami Exchange. Nên hình thức hoạt động Off-chain giúp các hoạt động mua bảo hiểm nhanh chóng với chi phí rẻ hơn.
                  </Body>
                </li>
                <li>
                  <Body>
                    Ngoài ra người dùng cũng có thể kết nối với ví bên thứ ba như Metamask, Coinbase Wallet, Coin98,... Với hình thức On-chain và xử lý trực tiếp với mạng lưới Blockchain nhằm tăng độ bảo mật và tin cậy cao khi người dùng đã có sẵn các ví từ bên thứ ba.
                  </Body>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Body>Nami Insurance was designed to support flexible usage models tailored to different types of users.</Body>
              <Body>Integrated directly into Nami Exchange, the platform supports off-chain transactions for faster interactions and lower transaction costs.</Body>
              <Body>In addition, users can connect third-party wallets such as MetaMask, Coinbase Wallet, and Coin98 to access on-chain functionality, allowing transactions to be processed directly through the blockchain for increased security and transparency.</Body>
            </div>
          )}
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="w-full overflow-hidden rounded-[16px]">
          <img src={vi ? ASSETS.imgOnchainVI : ASSETS.imgOnchain} alt="Flexible Accessibility" className="hidden md:block w-full object-cover" />
          <img src={ASSETS.imgOnchainMobile} alt="Flexible Accessibility" className="md:hidden w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 02 — INSURANCE CONTRACT ─────────────────────────────────────────
function Section02() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <section className="w-full">
      <div className="px-[120px] pt-[100px] pb-[60px] max-md:px-6 max-md:pt-[48px] max-md:pb-[32px]">
        <motion.div {...fadeUp()} className="flex flex-col gap-4 max-w-[640px]">
          <SectionHeading>
            {vi ? "Mua bảo hiểm" : "Insurance contract"}
          </SectionHeading>
          <div className="flex flex-col gap-4 pt-5">
            {vi ? (
              <Body>
                Có nhiều phương thức để người dùng tiếp cận và dẫn đến hành vi mở hợp đồng bảo hiểm ngay trên sản phẩm như Thị trường, Bảng tính, Blog. Người dùng có thể tự động điều chỉnh mức độ bảo hiểm dựa trên các yếu tố như biến động thị trường, khẩu vị rủi ro cá nhân và mục tiêu đầu tư. Trong user flow ở những tính năng này luôn được cài cắm các shortcut hay entry point để kích thích người dùng mở hợp đồng bảo hiểm tức thì.
              </Body>
            ) : (
              <>
                <Body>Users could access and open insurance contracts through multiple entry points across the product, including the Marketplace, Calculator, and Blog.</Body>
                <Body>The platform also allowed users to adjust their insurance coverage based on market volatility, personal risk appetite, and investment goals.</Body>
                <Body>Throughout these flows, shortcut actions and strategic entry points were intentionally designed to encourage faster and more seamless insurance purchases.</Body>
              </>
            )}
          </div>
        </motion.div>
      </div>
      <motion.div {...fadeUp(0.1)}>
        <img src={vi ? ASSETS.imgMuaBaoHiemVI : ASSETS.imgMuaBaoHiem} alt="Insurance contract" className="hidden md:block w-full object-cover" />
        <img src={ASSETS.imgMuaBaoHiemMobile} alt="Insurance contract" className="md:hidden w-full object-cover" />
      </motion.div>
    </section>
  );
}

// ─── SECTION 03 — REFERRAL PROGRAM ───────────────────────────────────────────
function Section03() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <section className="w-full">
      <div className="px-[120px] pt-[100px] pb-[40px] max-md:px-6 max-md:pt-[48px] max-md:pb-[32px]">
        <motion.div {...fadeUp()} className="flex flex-col gap-4 max-w-[640px]">
          <SectionHeading>
            {vi ? "Hoa hồng từ bạn bè" : "Referral program"}
          </SectionHeading>
          <div className="flex flex-col gap-4 pt-5">
            {vi ? (
              <>
                <Body>
                  Với mỗi người dùng mới được giới thiệu thành công và sử dụng sản phẩm Nami Insurance, người giới thiệu sẽ nhận được phần trăm hoa hồng từ số tài sản ký quỹ trong hợp đồng bảo hiểm của người được giới thiệu.
                </Body>
                <Body>
                  Cơ chế nhận hoa hồng của người dùng khá phức tạp khi có thể nhận hoa hồng đa tầng từ F1 → F4, việc cung cấp một bảng thống kê danh sách bạn bè với các bộ lọc tối ưu giúp người dùng dễ dàng tra soát. Thống kê lợi nhuận, ký quỹ hay payback được thể hiện dạng biểu đồ cột theo các bộ lọc ngày, tuần, tháng, năm cũng giúp người dùng quản lý triệt để và góp phần lan tỏa sản phẩm đến nhiều người dùng trong cộng đồng.
                </Body>
              </>
            ) : (
              <>
                <Body>Users who successfully referred new users to Nami Insurance received commission rewards based on the collateral value of the referred users&apos; insurance contracts.</Body>
                <Body>Since the referral system supported multi-level commissions from F1 to F4, managing rewards could quickly become complex. To simplify this experience, we designed an optimized dashboard with filtering tools that allowed users to easily track referrals and commission activities.</Body>
                <Body>Key metrics such as profit, collateral, and payback were visualized through bar charts with daily, weekly, monthly, and yearly filters — helping users better manage performance while encouraging broader community-driven growth.</Body>
              </>
            )}
          </div>
        </motion.div>
      </div>
      <motion.div {...fadeUp(0.1)}>
        <img src={vi ? ASSETS.imgHoaHongVI : ASSETS.imgHoaHong} alt="Referral program" className="hidden md:block w-full object-cover" />
        <img src={ASSETS.imgHoaHongMobile} alt="Referral program" className="md:hidden w-full object-cover" />
      </motion.div>
    </section>
  );
}

// ─── SECTION 04 — EMAIL TEMPLATE ──────────────────────────────────────────────
function Section04() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <section className="px-[120px] pt-[200px] pb-[100px] max-md:px-6 max-md:pt-[96px] max-md:pb-[48px] w-full">
      <div className="grid grid-cols-2 gap-6 items-start max-md:grid-cols-1 max-md:gap-8">
        <motion.div {...fadeUp()} className="flex flex-col gap-8 md:pt-[108px] max-w-[640px]">
          <SectionHeading>
            {vi ? "Biểu mẫu gửi email" : "Email template"}
          </SectionHeading>
          <div className="flex flex-col gap-4">
            {vi ? (
              <>
                <Body>
                  Mỗi bước kích hoạt mở bảo hiểm thành công, điều chỉnh hợp đồng hay hợp đồng bị thanh lý thì hệ thống đều sẽ gửi cho người dùng email thông báo.
                </Body>
                <Body>
                  Chúng tôi đã thiết kế các biểu mẫu được đính kèm trong mail khi gửi một cách trực quan nhất để giúp người dùng scan thông tin nhanh nhất.
                </Body>
              </>
            ) : (
              <>
                <Body>The system automatically sent email notifications whenever users successfully activated insurance, adjusted contracts, or when contracts were liquidated.</Body>
                <Body>To improve readability and help users quickly scan important information, we designed clear and visually structured email templates for each notification type.</Body>
              </>
            )}
          </div>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="w-full overflow-hidden">
          <img src={vi ? ASSETS.imgEmailVI : ASSETS.imgEmail} alt="Email template" className="hidden md:block w-full object-cover rounded-[20px]" />
          <img src={ASSETS.imgEmailMobile} alt="Email template" className="md:hidden w-full object-cover rounded-[20px]" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 05 — DESIGN SYSTEM ──────────────────────────────────────────────
function Section05() {
  const { lang } = useLang();
  const vi = lang === "vi";

  const desktopImages = vi
    ? [ASSETS.designSystem1VI, ASSETS.designSystem2VI, ASSETS.designSystem3VI]
    : [ASSETS.designSystem1, ASSETS.designSystem2, ASSETS.designSystem3];

  return (
    <section className="px-[120px] py-[100px] max-md:px-6 max-md:py-[48px] w-full">
      <motion.div {...fadeUp()} className="flex flex-col gap-4 mb-11 max-md:mb-8 max-w-[640px]">
        <SectionHeading>Design system</SectionHeading>
        <div className="flex flex-col gap-4 pt-5">
          {vi ? (
            <Body>
              Hoạt động chính của hệ thống là website và trên Nami Exchange sẽ là mobile responsive. Nên design system được thiết kệ hai phiên bản riêng biệt nhằm đảm bảo tối ưu và linh hoạt, hai phiên bản này có tính liên kết mật thiết và đồng nhất để thích nghi với nhiều kích thước màn hình khác nhau.
            </Body>
          ) : (
            <>
              <Body>The platform&apos;s primary experience was designed for web, while Nami Exchange supported the product through a mobile-responsive version.</Body>
              <Body>To ensure flexibility and optimal usability across devices, the design system was built in two dedicated versions while maintaining strong consistency and visual alignment between them. This approach allowed the experience to adapt seamlessly across different screen sizes.</Body>
            </>
          )}
        </div>
      </motion.div>

      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        {desktopImages.map((src, i) => (
          <motion.div key={i} {...fadeUp(i * 0.05)} className="overflow-hidden rounded-[32px] border border-[rgba(0,0,0,0.1)]" style={{ aspectRatio: "392/600" }}>
            <img src={src} alt={`Design system ${i + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col gap-4">
        {[ASSETS.designSystem1Mobile, ASSETS.designSystem2Mobile, ASSETS.designSystem3Mobile].map((src, i) => (
          <motion.div key={i} {...fadeUp(i * 0.05)} className="overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.1)]">
            <img src={src} alt={`Design system ${i + 1}`} className="w-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTAINER IMAGE ──────────────────────────────────────────────────────────
function ContainerImage() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <motion.div {...fadeUp()} className="w-full">
      <img src={vi ? ASSETS.imgContainerVI : ASSETS.imgContainer} alt="" className="hidden md:block w-full object-cover" />
      <img src={ASSETS.imgContainerMobile} alt="" className="md:hidden w-full object-cover" />
    </motion.div>
  );
}

// ─── TEAM MEMBER ──────────────────────────────────────────────────────────────
function TeamMember() {
  return (
    <section className="px-[120px] py-[100px] max-md:px-6 max-md:py-[48px] w-full">
      <motion.p
        {...fadeUp()}
        className="font-inter font-normal italic text-[14px] text-[#1f1f1f] leading-[22.4px] tracking-[-0.14px]"
      >
        Team member: Võ Xuân Truyền, Trần Nguyễn Phương Linh.
      </motion.p>
    </section>
  );
}

// ─── HIGHWAY BANNER ───────────────────────────────────────────────────────────
function HighwayBanner() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <a
      href="/work/highway"
      data-cursor="take a look"
      className="relative w-full overflow-hidden flex cursor-pointer items-center max-md:items-start max-md:!min-h-0"
      style={{ minHeight: "clamp(200px, 18vw, 300px)" }}
    >
      <img src={vi ? ASSETS.highwayBgVI : ASSETS.highwayBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block" />
      <img src={ASSETS.highwayBannerMobile} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none md:hidden" />

      <div className="hidden md:flex relative w-full px-[120px] items-center justify-between gap-6">
        <h3 className="font-inter font-semibold text-white leading-normal" style={{ fontSize: "clamp(22px, 3.3vw, 40px)" }}>
          {vi ? "Sở hữu tài sản số trở nên dễ dàng hơn" : "Simplifying Digital Asset Ownership"}
        </h3>
        <div
          className="flex items-center gap-4 rounded-full px-6 py-2 shrink-0 backdrop-blur-[24px] border border-[rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span className="font-inter font-semibold text-[24px] text-white">{vi ? "Xem dự án" : "View project"}</span>
          <img src={vi ? ASSETS.arrowVI : ASSETS.arrow} alt="" className="w-5 h-5 object-contain" />
        </div>
      </div>

      <div className="md:hidden relative w-full px-6 pt-9 pb-12 flex flex-col gap-6">
        <h3 className="font-inter font-semibold text-[26px] text-white leading-normal">
          {vi ? "Sở hữu tài sản số trở nên dễ dàng hơn" : "Simplifying Digital Asset Ownership"}
        </h3>
        <div
          className="flex items-center gap-4 rounded-full px-6 py-2 w-fit backdrop-blur-[24px] border border-[rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span className="font-inter font-semibold text-[20px] text-white">{vi ? "Xem dự án" : "View project"}</span>
          <img src={ASSETS.arrowMobile} alt="" className="w-5 h-5 object-contain" />
        </div>
      </div>
    </a>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function NamiInsurancePage() {
  return (
    <>
      <Hero />
      <Context />
      <Graphic />
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <ContainerImage />
      <TeamMember />
      <HighwayBanner />
    </>
  );
}
