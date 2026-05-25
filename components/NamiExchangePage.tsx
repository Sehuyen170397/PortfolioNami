"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

// Desktop asset URLs (Figma MCP — expire 7 days)
const ASSETS = {
  heroBg: "https://www.figma.com/api/mcp/asset/4dc00ef2-41b6-45e0-b75d-8b57c7753fa1",
  heroBgMobile: "/nami-exchange-hero-mobile.jpg",
  competitorResearch1: "https://www.figma.com/api/mcp/asset/da11db04-f405-4274-bfe4-5245d4dc8796",
  competitorResearch2: "https://www.figma.com/api/mcp/asset/087970bd-c6dc-42b7-a88d-6ce8bcc87ae4",
  competitorResearch3: "https://www.figma.com/api/mcp/asset/1834085c-cee3-4474-8983-17c864cf9dd3",
  exploration1: "https://www.figma.com/api/mcp/asset/3775f8bd-355f-46db-92ec-ab3170aa67a0",
  exploration2: "https://www.figma.com/api/mcp/asset/acdef389-aa21-4e83-b7f9-b6325d066ac2",
  exploration3: "https://www.figma.com/api/mcp/asset/223de9c0-c90c-4e98-baa6-85a5720875bb",
  exploration4: "https://www.figma.com/api/mcp/asset/3cbb82bc-2aa2-4794-b331-03a88f32cbcc",
  exploration5: "https://www.figma.com/api/mcp/asset/3169e0c1-c327-4099-a96e-4414401140b3",
  exploration6: "https://www.figma.com/api/mcp/asset/d91cc229-d93d-49bb-8fac-892403e0e64d",
  designSystem: "https://www.figma.com/api/mcp/asset/1a5f269a-a8d1-493f-a8cf-650a4b3fba0c",
  // Before screens (old)
  oldScreen1: "https://www.figma.com/api/mcp/asset/81a77e90-b672-43f2-971e-f5c18f626a26",
  oldScreen2: "https://www.figma.com/api/mcp/asset/317d64fb-7a6c-49a3-a75c-c2ef5a8b2e6a",
  oldScreen3: "https://www.figma.com/api/mcp/asset/0b1f2aee-5068-4d63-8743-cd7827458a2c",
  oldScreen4: "https://www.figma.com/api/mcp/asset/befe006e-b574-4a9d-baab-22b54d25f49a",
  oldScreen5: "https://www.figma.com/api/mcp/asset/fdbbbba2-9c5f-4375-a583-4037d8230c61",
  // After screens (new)
  newScreen1: "https://www.figma.com/api/mcp/asset/a1313654-6ef2-4acb-84a1-c4aec5914d9c",
  newScreen2: "https://www.figma.com/api/mcp/asset/bcc80a3e-f124-47fc-ad05-a79b5b0fd041",
  newScreen3: "https://www.figma.com/api/mcp/asset/731bb76a-0dec-4a37-9425-a05081c9403b",
  newScreen4: "https://www.figma.com/api/mcp/asset/c04a03a1-8dd6-4f85-b1e9-40fc12f4f97f",
  newScreen5: "https://www.figma.com/api/mcp/asset/56f7769e-8f44-4d39-be8a-fef59ff8164a",
  // Full feature flow
  fullFeatureFlowImg: "https://www.figma.com/api/mcp/asset/0e7874e2-aa41-47ce-a20b-bc6897521a6f",
  fullFeatureFlowFigmaIcon: "https://www.figma.com/api/mcp/asset/a77f37d6-85f2-4aac-9f67-2140723d3fa5",
  fullFeatureFlowArrow: "https://www.figma.com/api/mcp/asset/51168c66-d635-4042-bd01-10714d3803d2",
  // AI - Nami Sea
  namiSeaPhone1: "https://www.figma.com/api/mcp/asset/c87b751c-6348-4464-8831-0a53dd16ec87",
  namiSeaPhone2: "https://www.figma.com/api/mcp/asset/453131e0-7918-49b9-bc86-fc038a937d81",
  namiSeaPhone3: "https://www.figma.com/api/mcp/asset/08a07aa4-efa7-477a-9b93-f97700ade384",
  namiSeaPhone4: "https://www.figma.com/api/mcp/asset/6ca24898-abdd-4ad3-aa7e-add00e6f7198",
  namiSeaPhone5: "https://www.figma.com/api/mcp/asset/24fe1694-81e6-4e0c-b310-6b156e3ea654",
  // New Refresh — separator arrow
  refreshArrow: "https://www.figma.com/api/mcp/asset/9520979d-9642-4234-bc87-e8b8c76f4413",
  // Nami Insurance banner — EN
  namiInsuranceBg: "https://www.figma.com/api/mcp/asset/6a52d784-8410-4ff9-9c07-77d62acbb0b0",
  namiInsuranceArrow: "https://www.figma.com/api/mcp/asset/81dbabd3-5b0e-4250-8cad-7b66ca3aeb72",
  // Nami Insurance banner — VI
  namiInsuranceBgVI: "https://www.figma.com/api/mcp/asset/4730dd0b-fe23-413c-8792-a8d38cda3eb0",
  namiInsuranceArrowVI: "https://www.figma.com/api/mcp/asset/862f68ee-54ec-4001-a943-b020efc49d42",
  // Nami Insurance banner — Mobile
  namiInsuranceBgMobile: "https://www.figma.com/api/mcp/asset/2c293006-fa7a-4dee-9594-4a059a53a883",
  namiInsuranceArrowMobile: "https://www.figma.com/api/mcp/asset/7ae3e4f5-f891-4a76-8376-e6351f50fd2b",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-inter font-normal text-[10px] text-[#666] tracking-[1.6px] uppercase leading-normal">
      {children}
    </p>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-inter font-semibold text-[#1f1f1f] tracking-[-2px] leading-[1.05] max-md:tracking-[-1px] ${className}`}
      style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}>
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

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const { lang } = useLang();
  const stats = lang === "en"
    ? [
        { label: "COMPANY", value: "Nami Foundation",           padCls: "pl-[40px] pr-[20px]" },
        { label: "TIME",    value: "2022 - 2026",               padCls: "px-[20px]" },
        { label: "DOMAIN",  value: "Crypto · Platform trading", padCls: "px-[20px]" },
        { label: "ROLE",    value: "Lead UI/UX Designer",       padCls: "pl-[20px] pr-[40px]" },
      ]
    : [
        { label: "Công ty",   value: "Nami Foundation",           padCls: "pl-[40px] pr-[20px]" },
        { label: "Thời gian", value: "2022 - 2026",               padCls: "px-[20px]" },
        { label: "Lĩnh vực",  value: "Crypto · Platform trading", padCls: "px-[20px]" },
        { label: "Vai trò",   value: "Lead UI/UX Designer",       padCls: "pl-[20px] pr-[40px]" },
      ];

  return (
    <section
      className="relative w-full overflow-hidden bg-white flex flex-col justify-end pb-[60px] px-[40px] gap-11 max-md:px-6 max-md:pb-[60px] max-md:gap-6"
      style={{ height: "100svh" }}
    >
      {/* Desktop background */}
      <img
        src={ASSETS.heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block"
      />
      {/* Mobile background */}
      <img
        src={ASSETS.heroBgMobile}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none md:hidden"
      />

      <div className="relative flex flex-col items-start w-full">
        {/* Desktop title */}
        <div className="hidden md:block w-full mb-[-24px] overflow-hidden">
          <motion.p
            className="font-inter font-bold text-[#1f1f1f] leading-normal whitespace-nowrap tracking-[-5px]"
            style={{ fontSize: "clamp(36px, 7vw, 100px)" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Nami Exchange
          </motion.p>
        </div>
        <div className="hidden md:block w-full overflow-hidden">
          <motion.p
            className="font-playfair font-semibold italic text-[#1f1f1f] leading-normal whitespace-nowrap tracking-[-5px]"
            style={{ fontSize: "clamp(36px, 7vw, 100px)" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            Trading crypto
          </motion.p>
        </div>

        {/* Mobile title */}
        <div className="md:hidden w-full overflow-hidden">
          <motion.p
            className="font-inter font-semibold text-[40px] text-[#1f1f1f] leading-normal whitespace-nowrap tracking-[-1px]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Nami Exchange
          </motion.p>
        </div>
        <div className="md:hidden w-full overflow-hidden">
          <motion.p
            className="font-playfair font-medium italic text-[40px] text-[#1f1f1f] leading-normal whitespace-nowrap tracking-[-1px]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            Trading crypto
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative backdrop-blur-[8px] bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.7)] rounded-[200px] p-px flex overflow-hidden w-fit max-w-[800px] max-md:rounded-[20px] max-md:grid max-md:grid-cols-2 max-md:w-full max-md:max-w-full"
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className={`flex flex-col gap-[5px] py-4 max-md:p-[16px] ${item.padCls}`}
          >
            <span className="font-inter font-normal text-[9px] text-[#1f1f1f] tracking-[1.26px] uppercase leading-normal">
              {item.label}
            </span>
            <span className="font-inter font-bold text-[13px] max-md:text-[12px] text-[#1f1f1f] tracking-[-0.13px] leading-normal whitespace-nowrap">
              {item.value}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── CONTEXT ────────────────────────────────────────────────────────────────
function Context() {
  const { lang } = useLang();
  return (
    <motion.section {...fadeUp()} className="px-[120px] py-12 max-md:px-6 max-md:py-8 w-full">
      <Body>
        {lang === "en"
          ? "Nami Exchange is a digital asset trading platform built on blockchain technology with a user-centered approach at its core. The platform focuses on delivering a simple, transparent, and efficient trading experience. Developed in Vietnam, over 95% of its users are Vietnamese, with most new users discovering the platform through referrals from Nami’s affiliate partners."
          : "Nami Exchange là một nền tảng giao dịch tài sản số mới phát triển dựa trên công nghệ blockchain và đặt user làm trọng tâm. Hướng đến trải nghiệm đơn giản - minh bạch - hiệu quả. Nền tảng phát triển tại Việt Nam với hơn 95% user là người Việt và đa số user mới thường được biết đến nền tảng thông qua lời mời của đối tác hoạt động liên kết với Nami."}
      </Body>
    </motion.section>
  );
}

// ─── SHARED SECTION WRAPPER ─────────────────────────────────────────────────
function Section({ children, className = "", noBorder = false }: { children: React.ReactNode; className?: string; noBorder?: boolean }) {
  return (
    <section className={`${noBorder ? "" : "border-t border-[rgba(0,0,0,0.1)]"} px-[120px] py-[100px] max-md:px-6 max-md:py-[60px] w-full ${className}`}>
      <div className="max-w-[1200px] w-full flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}

// ─── 01 PROBLEM STATEMENT ───────────────────────────────────────────────────
function ProblemStatement() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const bars = vi
    ? [
        { pct: "32.86%", label: "Đăng ký tài khoản", barTop: 51.44, barH: 48.56, opacity: "opacity-60" },
        { pct: "89.01%", label: "KYC",                barTop: 0,     barH: 100,   opacity: "opacity-80" },
        { pct: "22.1%",  label: "Nạp tài sản",        barTop: 67.73, barH: 32.27, opacity: "opacity-50" },
      ]
    : [
        { pct: "32.86%", label: "Sign up",      barTop: 51.44, barH: 48.56, opacity: "opacity-60" },
        { pct: "89.01%", label: "KYC",           barTop: 0,     barH: 100,   opacity: "opacity-80" },
        { pct: "22.1%",  label: "Deposit asset", barTop: 67.73, barH: 32.27, opacity: "opacity-50" },
      ];

  return (
    <Section>
      <motion.div {...fadeUp()}>
        <SectionLabel>01 — {vi ? "Vấn đề" : "Problem Statement"}</SectionLabel>
      </motion.div>
      <motion.div {...fadeUp(0.05)}>
        <SectionHeading className="max-w-[760px]">
          {vi
            ? "Nhiều user mới bỏ cuộc trong lần đầu thực hiện giao dịch"
            : "Many New Users Dropped Off During Their First Trade"}
        </SectionHeading>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] pt-9">
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5">
          <Body>
            {vi
              ? "Nami Exchange hoạt động tương tự những nền tảng giao dịch khác như Binance, OKX, BingX. Việc thiết kế trải nghiệm giữa các tính năng tương tự họ vô tình gây khó khăn cho người dùng mới trong lần giao dịch đầu tiên do lượng thông tin và thuật ngữ quá lớn."
              : "Nami Exchange operates similarly to major trading platforms such as Binance, OKX, and BingX. However, adopting interaction patterns and feature structures commonly found on these platforms unintentionally created challenges for new users, especially during their first trading experience, where the amount of information and complex terminology often felt overwhelming."}
          </Body>
          <Body>
            {vi
              ? "Giao diện không được thay đổi trong suốt hơn 3 năm hoạt động, thiếu hướng dẫn cho user, thiếu nhất quán giữa app và web khiến cho trải nghiệm user bị nhàm chán."
              : "After more than three years without major updates, the product lacked user guidance and consistency between app and web, leading to an outdated and less engaging experience."}
          </Body>
          <Body>
            {vi
              ? "Doanh nghiệp cần user mới để tham gia và phát sinh giao dịch tạo lợi nhuận. Còn user đơn giản cần ứng dụng có thể dễ dàng giao dịch và dễ sử dụng giữa muôn vàn lựa chọn nền tảng giao dịch trên thị trường. Chúng tôi nhận được yêu cầu từ PM cần một phiên bản update toàn diện cho Nami Exchange. Đồng thời phát triển AI tích hợp để làm sao để một người không có kiến thức gì về crypto cũng có thể tiếp cận và sử dụng ứng dụng dễ dàng."
              : "The business needed new users to join the platform and actively trade in order to drive revenue. Meanwhile, users simply wanted a trading app that was easy to use and accessible among countless exchange platforms on the market. We were tasked by the PM team to redesign Nami Exchange with a more comprehensive and user-friendly experience, while also exploring AI integration to help even users with no prior crypto knowledge easily access and navigate the platform."}
          </Body>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="bg-[#f2f2f2] rounded-[16px] p-8 flex flex-col gap-4 self-start">
          <span className="font-inter font-normal text-[11px] text-[#666] leading-normal">
            {vi ? "Dữ liệu thống kê tỷ lệ bỏ cuộc của NEW USER trong 1 tháng" : "New User Drop-off Rate Over One Month"}
          </span>
          <div className="flex gap-[6px] items-end justify-center pt-6 w-full">
            {bars.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col gap-[4px] items-center min-w-0">
                <div className="h-[100px] relative w-full">
                  <div
                    className={`absolute left-0 right-0 bg-[#00a854] rounded-t-[6px] ${bar.opacity}`}
                    style={{ top: `${bar.barTop}%`, height: `${bar.barH}%` }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-inter font-semibold text-[16px] text-white whitespace-nowrap leading-normal"
                    style={{ top: `${bar.barTop + bar.barH / 2}%` }}
                  >
                    {bar.pct}
                  </span>
                </div>
                <span className="font-inter font-normal text-[10px] text-[#666] leading-normal whitespace-nowrap">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
          <p className="font-inter font-normal text-[12px] text-[#666] leading-[18px]">
            {vi
              ? "Tỷ lệ user mới bỏ cuộc khi KYC rất cao, điều này phản ánh tính năng chưa thực sự tối ưu. Và điều này rất quan trọng vì user cần KYC để sử dụng tối đa các tính năng chính của nền tảng."
              : "The drop-off rate during the KYC process was significantly high among new users, indicating that the experience was not fully optimized. This was a critical issue, as completing KYC was required to unlock and use the platform's core features."}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── 02 HYPOTHESIS ──────────────────────────────────────────────────────────
function Hypothesis() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <Section>
      <motion.div {...fadeUp()}>
        <SectionLabel>02 — {vi ? "Giả thuyết" : "Hypothesis"}</SectionLabel>
      </motion.div>
      <motion.div {...fadeUp(0.05)}>
        <SectionHeading className="max-w-[760px]">
          {vi ? "Tại sao chúng tôi muốn thiết kế lại Nami Exchange" : <>"Why We Redesigned<br />Nami Exchange"</>}
        </SectionHeading>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-5">
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5">
          <Body>
            {vi
              ? "Tỷ lệ user mới và khối lượng giao dịch giảm là tín hiệu rõ rệt cho thấy nền tảng đang hoạt động thật sự bất ổn. Số lượng user mới không muốn tiếp tục sử dụng ứng dụng là minh chứng rõ ràng cho thấy những điểm chạm đầu tiên thật sự chưa tốt."
              : "Declining new user growth and trading volume revealed critical issues in the platform experience. Many first-time users dropped off early, showing that the initial user journey was not effective enough."}
          </Body>
          <Body>
            {vi
              ? "Chúng tôi tin rằng thay đổi hình ảnh giao diện sẽ là điểm chạm đầu tiên và sự hỗ trợ đến từ AI sẽ giúp cho user có cái nhìn tích cực hơn về Nami Exchange về sự đổi mới, biến hóa và hoạt động mạnh mẽ. Và là minh chứng cho việc luôn lắng nghe và đặt user làm trọng tâm trải nghiệm."
              : "We believed that a refreshed interface and AI-powered support could create a more modern and approachable experience, while reinforcing Nami Exchange's commitment to continuous innovation and user-centered design."}
          </Body>
          <Body>
            {vi
              ? "Sau khi ngồi lại nghiệm thu toàn bộ tính năng, chúng tôi tin rằng nếu chia nhỏ luồng onboarding thành các bước nhỏ phù hợp với từng tính năng, giải thích rõ lý do tại sao yêu cầu KYC, bổ sung mẹo giúp giải thích các thuật ngữ. Sẽ giúp trải nghiệm cho user mới thuận lợi để làm quen với một ứng dụng Crypto (Vốn dĩ quá nhiều thuật ngữ khó hiểu). User mới cũng sẽ hoàn thành xác minh tài khoản nhiều hơn, vì dễ dàng thao tác và sự minh bạch làm giảm lo lắng về bảo mật — rào cản tâm lý lớn nhất trong fintech."
              : "After reviewing the entire product experience, we believed that breaking the onboarding flow into smaller, feature-specific steps, clearly explaining the purpose of KYC, and providing contextual tips for complex crypto terminology would make the platform more approachable for new users. By simplifying interactions and improving transparency, we aimed to help users feel more confident completing account verification — reducing security concerns, one of the biggest psychological barriers in fintech products."}
          </Body>
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          className="border-l-[3px] border-[#37c473] pl-8 flex flex-col gap-4 self-start lg:sticky lg:top-24"
        >
          <span className="font-inter font-bold text-[11px] text-[#37c473] tracking-[0.33px] uppercase leading-normal">
            {vi ? "Giả thuyết" : "The Hypothesis"}
          </span>
          <p className="font-inter font-semibold text-[20px] text-[#1f1f1f] leading-[31.9px] max-md:text-[17px] max-md:leading-[27px]">
            {vi
              ? "Nếu hướng dẫn user mới khám phá những tính năng quan trọng nhất của ứng dụng theo một trình tự có cấu trúc, họ sẽ hiểu Nami Exchange dùng để làm gì và sử dụng như thế nào. Từ đó họ sẽ có nhiều khả năng giao dịch hơn."
              : "By introducing users to key features through a structured onboarding flow, we aimed to help them quickly understand the platform and feel more confident making their first trades."}
          </p>
          <p className="font-inter font-light text-[15px] text-[#666] leading-[24px]">
            {vi
              ? "Để sở hữu tài sản số, user không nhất thiết phải sử dụng tính năng spot mà thay vào đó có thể sử dụng Swap như một phương pháp mua tài sản số nhanh chóng và đơn giản hơn nhiều."
              : "To acquire digital assets, users did not necessarily need to use Spot trading. Instead, Swap provided a much faster and simpler way for beginners to purchase digital assets."}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── 03 RESEARCH & ANALYSIS ─────────────────────────────────────────────────
function Research() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const workstreams = vi
    ? [
        { label: "Ngôn ngữ thiết kế", body: "Đội ngũ thiết kế nghiên cứu các phong cách và xu hướng giao diện sẽ áp dụng cho version tiếp theo. Những ngôn ngữ thiết kế ảnh hưởng nhất là Human interface và material design." },
        { label: "Phân tích đối thủ",  body: "So sánh các đối thủ trong cùng một tính năng giúp chúng tôi nắm bắt được điểm yếu và điểm mạnh của họ là gì. Việc học hỏi từ họ giúp chúng tôi đưa ra các bước onboarding phù hợp và tối ưu nhất cho user." },
        { label: "Hướng đi",           body: "Việc update một phiên bản lớn như vậy cần rất nhiều thời gian và công sức. Việc xác định các nhóm tính năng ưu tiên, phân chia giai đoạn và phạm vi công việc là yếu tố giúp hoàn thành công việc đúng deadline vẫn bảo toàn chất lượng." },
      ]
    : [
        { label: "Design Language",    body: "The design team explored different interface styles and design trends for the next version of the product. Among the most influential design languages were Human Interface and Material Design." },
        { label: "Competitive Analysis", body: "Comparing competitors with similar features helped us identify both their strengths and weaknesses. Learning from these experiences allowed us to design a more effective and optimized onboarding flow for users." },
        { label: "Direction",          body: "A large-scale product update like this required significant time and effort. Prioritizing feature groups, defining project phases, and managing the scope carefully were essential to delivering the redesign on time." },
      ];

  return (
    <Section>
      <motion.div {...fadeUp()}>
        <SectionLabel>03 — {vi ? "Phân tích & Nghiên cứu" : "Research & Analysis"}</SectionLabel>
      </motion.div>
      <motion.div {...fadeUp(0.05)}>
        <SectionHeading>{vi ? "Xác định hướng đi" : "Defining the Direction"}</SectionHeading>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
        {workstreams.map((ws) => (
          <div key={ws.label} className="bg-[#f2f2f2] rounded-[16px] p-6 flex flex-col gap-[10px]">
            <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">{ws.label}</span>
            <p className="font-inter font-normal text-[14px] text-[#1f1f1f] leading-[23px]">{ws.body}</p>
          </div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5 pt-7 max-w-[640px]">
        <Body>
          {vi
            ? "Ngôn ngữ thiết kế Skeuomorphism đang dần trở lại dưới dạng neo-skeuomorphism. Sau nhiều năm với flat design khiến nhiều thiết kế quá giống nhau và thiếu đi cá tính. Neo-Skeuomorphism giúp tạo chiều sâu và cảm giác \"chạm được\" cho user. Với phần cứng mạnh mẽ như hiện tại thì với những shadow tinh tế, blur mượt, depth nhẹ nhàng sẽ giúp ngôn ngữ thiết kế mới của Nami Exchange \"đẹp mà không nặng\"."
            : "After years of flat design, many interfaces began to feel visually repetitive and lacking in personality. Neo-skeuomorphism brought back subtle depth and tactile visual cues — helping users better recognize interactive elements through shadows, layers, and elevation. Combined with modern hardware capabilities, soft shadows and lightweight blur effects allowed us to create a UI that felt both modern and visually rich without sacrificing performance."}
        </Body>
        <Body>
          {vi
            ? "Khi phân tích đối thủ bao gồm Binance, OKX, Coinbase. Chúng tôi thiết kế onboarding flow dựa trên nguyên tắc: mỗi bước đều có lý do, và user phải hiểu lý do đó trước khi thực hiện. Kết quả là flow 6 bước với context đầy đủ, thay vì 13 bước mù quáng."
            : "By studying platforms like Binance, OKX, and Coinbase, we redesigned the onboarding flow around clarity and user understanding. This led to a more guided 6-step experience, replacing the previous 13-step flow that lacked context and direction."}
        </Body>
        <Body>
          {vi
            ? "Bước xác minh user không phải là bước bắt buộc trong luồng onboarding. Nếu cố gắng nhồi nhét vào chỉ khiến user cảm thấy khó khăn khi phải trải qua quá nhiều bước mới đến màn hình chính."
            : "We chose not to force KYC verification during onboarding, allowing users to explore the platform first instead of overwhelming them with too many required steps upfront."}
        </Body>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="flex flex-col gap-2 pt-5">
        <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.88px] uppercase leading-normal">
          {vi ? "Nghiên cứu đối thủ" : "Competitor Research"}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "594/429" }}>
              <img src={ASSETS.competitorResearch1} alt="Competitor onboarding research" className="w-full h-full object-cover" />
            </div>
            <p className="font-inter font-normal text-[11px] text-[#666] leading-[15.4px]">
              {vi
                ? "Luồng onboarding của các ứng dụng hàng đầu trong crypto. Đa số đều hướng đến user tập trung tạo tài khoản nhanh để bắt đầu hành trình khám phá nhanh chóng."
                : "Onboarding flows across leading crypto platforms are largely designed to help users create an account quickly and begin exploring the product as soon as possible."}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "594/429" }}>
              <img src={ASSETS.competitorResearch2} alt="AI competitor research" className="w-full h-full object-cover" />
            </div>
            <p className="font-inter font-normal text-[11px] text-[#666] leading-[15.4px]">
              {vi
                ? "AI mục tiêu sẽ trở thành công cụ thực hiện tự động hóa, không đơn thuần chỉ là chatbot để hỏi đáp."
                : "The goal of AI was not simply to function as a chatbot, but to evolve into an automation-driven assistant capable of helping users complete tasks more efficiently."}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="pt-5 max-w-[640px]">
        <Body>
          {vi
            ? "Những sản phẩm chủ lực với lượng user lớn, có thể triển khai sớm nhằm tối ưu thời gian và nguồn lực. Trong khi đó nhóm tiềm năng và chiến lược dài hạn sẽ cần thêm thời gian để hoàn thiện và nâng cao trải nghiệm user."
            : "Core products with a large user base were prioritized for early implementation to optimize both time and resources. Meanwhile, potential and long-term strategic features required additional time for refinement and experience improvements."}
        </Body>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="max-w-[640px] pt-5">
        <div className="bg-[#f2f2f2] border border-[rgba(0,0,0,0.1)] rounded-[12px] overflow-hidden">
          <img src={ASSETS.competitorResearch3} alt="Research direction" className="w-full object-contain" />
        </div>
      </motion.div>
    </Section>
  );
}

// ─── 04 STAKEHOLDER MANAGEMENT ──────────────────────────────────────────────
function StakeholderManagement() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const listItems = vi
    ? [
        "PM (Project manager): Thường xuyên trao đổi để nắm bắt định hướng và quản lý thời gian công việc.",
        "Development: Xác định mức độ khả thi của các đề xuất thay đổi và phương án xử lý tối ưu nhất.",
        "BA (Business analyst): Hiểu rõ cấu trúc và từng thông số trong tính năng trước khi đưa ra các đề xuất phù hợp.",
      ]
    : [
        "PM (Project Manager): Regularly aligned on product direction, priorities, and project timelines.",
        "Development Team: Evaluated the feasibility of proposed changes and explored the most efficient implementation approaches.",
        "BA (Business Analyst): Provided a deeper understanding of feature structures and business logic before design decisions were made.",
      ];

  return (
    <Section>
      <motion.div {...fadeUp()}>
        <SectionLabel>04 — {vi ? "Quản lý các bên liên quan" : "Stakeholder Management"}</SectionLabel>
      </motion.div>
      <motion.div {...fadeUp(0.05)}>
        <SectionHeading>{vi ? "Giữ vững mục tiêu" : "Staying on Track"}</SectionHeading>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5 pt-5 max-w-[640px]">
        <Body>
          {vi
            ? "Khi bắt đầu thực hiện, đội thiết kế đã phải làm việc với các bộ phận liên quan:"
            : "As the project began, the design team worked closely with multiple cross-functional teams throughout the process:"}
        </Body>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          {listItems.map((item) => (
            <li key={item}>
              <span className="font-inter font-light text-[17px] text-[#1f1f1f] leading-[28px] max-md:text-[15px] max-md:leading-[25px]">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <Body>
          {vi
            ? "Bộ phận development cho chúng tôi biết rằng những hiệu ứng của thiết kế mới sẽ khiến ứng dụng ngốn GPU và hiệu suất sẽ thấp trên những thiết bị tầm trung không mạnh về CPU và RAM. Điều đó ảnh hưởng trực tiếp đến hiệu suất giao dịch trên các tính năng chính của một ứng dụng crypto. Thông tin này buộc chúng tôi phải xem xét lại hướng thiết kế. Chúng tôi đã cắt giảm hiệu ứng Blur ở hơn 60% component, chia làm 2 phiên bản cho Android và iOS để tối ưu hiệu suất."
            : "The development team raised concerns that many of the new visual effects could significantly increase GPU usage and reduce performance on mid-range devices with limited CPU and RAM capabilities. This was especially critical for a crypto trading platform, where smooth performance directly impacts the core trading experience. That feedback forced us to rethink parts of the design direction. To stay aligned with the original product goals, we reduced blur effects across more than 60% of components and created separate visual optimizations for Android and iOS to ensure better performance across devices."}
        </Body>
      </motion.div>
    </Section>
  );
}

// ─── 05 DESIGN PROCESS (+ all subsections) ──────────────────────────────────
const TASKS_EN = [
  { id: "TASK 1", emoji: "👀", title: "Understanding the Feature", body: "Before moving into the next phase, the design team needed a clear understanding of each feature's purpose, functionality, and user goals by reviewing materials such as PRDs and user guides." },
  { id: "TASK 2", emoji: "🎯", title: "Demo Options", body: "Before design reviews with the team lead, each feature was expected to include an initial concept, such as wireframes or reference-based explorations." },
  { id: "TASK 3", emoji: "✏️", title: "Design", body: "Designers worked within the established design system and aligned guidelines, while maintaining regular team check-ins to ensure consistency and reduce potential issues during execution." },
  { id: "TASK 4", emoji: "🎁", title: "Review", body: "Designs were reviewed to ensure consistency with the design system and alignment with the original product goals, while the team collaboratively shared feedback and identified potential issues throughout the process." },
  { id: "TASK 5", emoji: "⭐", title: "Final", body: "Design reviews and refinements were repeated through multiple iterations to ensure the final solution was fully aligned before handoff to PM, development, and QA/QC teams." },
  { id: "TASK 6", emoji: "🚀", title: "Handoff", body: "Final designs were handed off to development and QA/QC teams with detailed Figma documentation covering user flows, interactions, behaviors, and motion to ensure accurate implementation aligned with the PRD." },
];
const TASKS_VI = [
  { id: "Giai đoạn 1", emoji: "👀", title: "Nắm rõ tính năng", body: "Tính năng là gì? Hoạt động như thế nào? Mục tiêu hướng đến của tính năng là những vấn đề mà các bạn thiết kế phải nắm rõ trước khi nhảy qua giai đoạn 2. Tham khảo các tài liệu liên quan như PRD, User guide." },
  { id: "Giai đoạn 2", emoji: "🎯", title: "Demo phương án", body: "Trước khi catch up với trưởng nhóm thiết kế, mỗi tính năng cần được demo phương án thực hiện. Có thể là wireframe hoặc các thiết kế tham khảo." },
  { id: "Giai đoạn 3", emoji: "✏️", title: "Thiết kế", body: "Bạn thiết kế sẽ tiến hành thực hiện với design system đã tạo ra cùng với thông tin và lưu ý đã thống nhất với nhau. Trong quá trình làm cần trao đổi với team thường xuyên để tránh sai sót hoặc hỗ trợ kịp thời." },
  { id: "Giai đoạn 4", emoji: "🎁", title: "Review", body: "Thiết kế cần đảm bảo: Sử dụng đúng design system, đúng yêu cầu và mục tiêu đề ra ban đầu. Cả nhóm sẽ cùng tham gia để đóng góp ý kiến hoặc chỉ ra những vấn đề xung quanh thiết kế." },
  { id: "Giai đoạn 5", emoji: "⭐", title: "Hoàn tất", body: "Giai đoạn review đến hoàn tất được lặp lại có thể nhiều lần để đảm bảo thiết kế chuẩn xác nhất trước khi trình bày thiết kế với PM, DEV và QC." },
  { id: "Giai đoạn 6", emoji: "🚀", title: "Handoff", body: "Khi thiết kế đã hoàn tất, nó cần được bàn giao cho bộ phận tiếp theo (DEV, QC) đầy đủ và đúng với mô tả trong tài liệu PRD. Các lưu ý về thiết kế như user flow, interaction, behavior, motion đều phải được ghi chú với Figma." },
];

// ─── BEFORE / AFTER data ────────────────────────────────────────────────────
const BEFORE_SCREENS = [
  { src: ASSETS.oldScreen1, label: "Quy đổi (Cũ)" },
  { src: ASSETS.oldScreen2, label: "Màn hình chính (Cũ)" },
  { src: ASSETS.oldScreen3, label: "Thống kê (Cũ)" },
  { src: ASSETS.oldScreen4, label: "Spot (Cũ)" },
  { src: ASSETS.oldScreen5, label: "Ví (Cũ)" },
];
const AFTER_SCREENS = [
  { src: ASSETS.newScreen1, label: "Quy đổi (Mới)" },
  { src: ASSETS.newScreen2, label: "Màn hình chính (Mới)" },
  { src: ASSETS.newScreen3, label: "Thống kê (Mới)" },
  { src: ASSETS.newScreen4, label: "Spot (Mới)" },
  { src: ASSETS.newScreen5, label: "Ví (Mới)" },
];

function ScreenRow({
  screens,
  scrollRef,
  onScroll,
}: {
  screens: typeof BEFORE_SCREENS;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  onScroll?: () => void;
}) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {screens.map((s, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "227/461" }}>
              <img src={s.src} alt={s.label} className="w-full h-full object-cover" />
            </div>
            <p className="font-inter font-normal text-[11px] text-[#666] text-center leading-[15.4px]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mobile: swipe carousel */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="md:hidden flex overflow-x-auto gap-2 -mx-6 px-6 snap-x snap-mandatory scroll-pl-6 [&::-webkit-scrollbar]:hidden"
      >
        {screens.map((s, i) => (
          <div key={i} className="flex flex-col gap-2 shrink-0 w-[calc(100vw-48px)] snap-start">
            <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "227/461" }}>
              <img src={s.src} alt={s.label} className="w-full h-full object-cover" />
            </div>
            <p className="font-inter font-normal text-[11px] text-[#666] text-center leading-[15.4px]">{s.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function NewRefreshScreens() {
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  const syncFrom = (source: React.RefObject<HTMLDivElement | null>, target: React.RefObject<HTMLDivElement | null>) => () => {
    if (syncing.current || !source.current || !target.current) return;
    syncing.current = true;
    target.current.scrollLeft = source.current.scrollLeft;
    requestAnimationFrame(() => { syncing.current = false; });
  };

  return (
    <div className="flex flex-col gap-8">
      <ScreenRow screens={BEFORE_SCREENS} scrollRef={beforeRef} onScroll={syncFrom(beforeRef, afterRef)} />
      <div className="flex items-center justify-center gap-[10px] pb-3">
        <div className="rotate-90 w-9 h-9 shrink-0">
          <img src={ASSETS.refreshArrow} alt="" className="w-full h-full object-contain" />
        </div>
        <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">Refresh</span>
      </div>
      <ScreenRow screens={AFTER_SCREENS} scrollRef={afterRef} onScroll={syncFrom(afterRef, beforeRef)} />
    </div>
  );
}

const NAMI_SEA_PHONES = [
  { src: "namiSeaPhone1" as const, caption: "Suggested prompts" },
  { src: "namiSeaPhone2" as const, caption: "Chatbot responses" },
  { src: "namiSeaPhone3" as const, caption: "Guided assistance" },
  { src: "namiSeaPhone4" as const, caption: "Quick trade modal" },
  { src: "namiSeaPhone5" as const, caption: "Successful transaction" },
];

const KYC_ITEMS = [
  { caption: "Hướng dẫn chụp mặt trước CCCD", video: "https://res.cloudinary.com/diuvrdjar/video/upload/v1779431064/Screen_Recording_2026-05-08_at_11.30.36_srrr5e.mov" },
  { caption: "Hướng dẫn chụp mặt sau CCCD",   video: "https://res.cloudinary.com/diuvrdjar/video/upload/v1779431253/Screen_Recording_2026-05-08_at_11.30.36_x1ewbn.mov" },
  { caption: "Hướng dẫn quay gương mặt",       video: "https://res.cloudinary.com/diuvrdjar/video/upload/v1779431313/Screen_Recording_2026-05-08_at_11.30.36_dmfkgs.mov" },
  { caption: "Thông báo chờ xét duyệt",         video: "https://res.cloudinary.com/diuvrdjar/video/upload/v1779431379/Screen_Recording_2026-05-08_at_11.30.36_rfsoke.mov" },
];

const KEY_LEARNINGS_EN = [
  { num: "01", title: "Effects Shouldn't Just Look Good — They Should Feel Right", body: "In the early stages, overusing visual effects not only made the interface feel heavier, but also raised concerns around feasibility and performance optimization. This experience reinforced how important it is to collaborate closely with technical teams throughout the design process to ensure the direction remains both visually effective and technically practical." },
  { num: "02", title: "Change, Without Losing Familiarity", body: "While a redesign can create a fresh experience, too much change can also confuse existing users. Throughout the process, we continuously asked ourselves: \"What happens next for users when this changes?\" That mindset helped us balance innovation with familiarity across the product experience." },
  { num: "03", title: "Understand First, Design Later", body: "Understanding the product goals and direction always mattered more than designing quickly. It required proactive thinking and alignment before execution began." },
];
const KEY_LEARNINGS_VI = [
  { num: "01", title: "Hiệu ứng không chỉ cần đẹp — phải cảm giác đúng", body: "Trong giai đoạn đầu, việc lạm dụng hiệu ứng không chỉ khiến giao diện nặng nề hơn, mà còn làm nảy sinh lo ngại về tính khả thi và hiệu năng. Kinh nghiệm này nhấn mạnh tầm quan trọng của việc phối hợp chặt chẽ với đội kỹ thuật trong suốt quá trình thiết kế để đảm bảo hướng đi vừa hiệu quả về mặt thị giác vừa khả thi về mặt kỹ thuật." },
  { num: "02", title: "Thay đổi, nhưng không mất đi sự quen thuộc", body: "Dù thiết kế lại có thể tạo ra trải nghiệm mới mẻ, thay đổi quá nhiều cũng có thể gây bối rối cho người dùng hiện tại. Trong suốt quá trình, chúng tôi liên tục tự hỏi: \"Người dùng sẽ phản ứng thế nào khi điều này thay đổi?\" Tư duy đó giúp chúng tôi cân bằng giữa đổi mới và quen thuộc trong toàn bộ trải nghiệm sản phẩm." },
  { num: "03", title: "Hiểu trước, thiết kế sau", body: "Hiểu rõ mục tiêu và định hướng sản phẩm luôn quan trọng hơn thiết kế nhanh. Điều đó đòi hỏi tư duy chủ động và sự đồng thuận trước khi bắt tay thực hiện." },
];

const WHATS_NEXT_EN = [
  { num: "01", title: "User Testing & Feedback Collection", body: "Conducting testing sessions with users helped us gather feedback and identify pain points introduced in the latest version of the product. These insights allowed the team to refine the experience further and prepare improvements for the upcoming web version." },
  { num: "02", title: "Expanding & Optimizing the Design System", body: "Continuing to refine unfinished components and related documentation helped improve consistency and make the system more scalable for future development." },
  { num: "03", title: "Continuous product improvement", body: "In addition to applying similar updates across the remaining features, we continued to iterate based on data collected from both new and returning users — refining flows, improving the UI, and optimizing overall performance and experience at each planned development milestone." },
];
const WHATS_NEXT_VI = [
  { num: "01", title: "Kiểm thử người dùng & Thu thập phản hồi", body: "Tiến hành phiên kiểm thử với người dùng giúp chúng tôi thu thập phản hồi và xác định các điểm khó khăn trong phiên bản mới nhất. Những hiểu biết này cho phép đội nhóm tinh chỉnh trải nghiệm và chuẩn bị cải tiến cho phiên bản web sắp tới." },
  { num: "02", title: "Mở rộng & Tối ưu Design System", body: "Tiếp tục hoàn thiện các component chưa xong và tài liệu liên quan giúp cải thiện tính nhất quán và khả năng mở rộng của hệ thống cho phát triển trong tương lai." },
  { num: "03", title: "Cải tiến sản phẩm liên tục", body: "Ngoài việc áp dụng các cập nhật tương tự trên các tính năng còn lại, chúng tôi tiếp tục lặp đi lặp lại dựa trên dữ liệu thu thập được từ cả người dùng mới và cũ — tinh chỉnh luồng, cải thiện UI và tối ưu hóa hiệu suất tổng thể tại mỗi cột mốc phát triển được lên kế hoạch." },
];

function NumberedRow({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-[rgba(0,0,0,0.1)]">
      <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.88px] w-7 shrink-0 pt-[2px]">{num}</span>
      <div className="flex flex-col gap-[5px] flex-1">
        <p className="font-inter font-bold text-[17px] text-[#1f1f1f] leading-normal">{title}</p>
        <p className="font-inter font-normal text-[14px] text-[#666] leading-[23.1px]">{body}</p>
      </div>
    </div>
  );
}

function DesignProcess() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const TASKS = vi ? TASKS_VI : TASKS_EN;
  const KEY_LEARNINGS = vi ? KEY_LEARNINGS_VI : KEY_LEARNINGS_EN;
  const WHATS_NEXT_ITEMS = vi ? WHATS_NEXT_VI : WHATS_NEXT_EN;

  return (
    <Section>
      {/* 05 — label + heading + intro */}
      <motion.div {...fadeUp()}>
        <SectionLabel>05 — {vi ? "Quy trình thiết kế" : "Design Process"}</SectionLabel>
      </motion.div>
      <motion.div {...fadeUp(0.05)}>
        <SectionHeading>{vi ? "Hình thành ý tưởng" : "Developing the Concept"}</SectionHeading>
      </motion.div>
      <motion.div {...fadeUp(0.1)} className="pt-5 max-w-[640px]">
        <Body>
          {vi
            ? "Xác định lại mục tiêu ban đầu: Nâng cấp UI, Cải thiện flow onboarding và phát triển sản phẩm AI tích hợp."
            : "We revisited the project's original goals: upgrading the UI, improving the onboarding flow, and developing an integrated AI-powered experience."}
        </Body>
      </motion.div>

      {/* Early Explorations */}
      <motion.div {...fadeUp(0.1)} className="flex flex-col gap-[15px] pt-11">
        <div className="flex flex-col gap-2">
          <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">
            {vi ? "Triển khai ban đầu" : "Early Explorations"}
          </span>
          <Body className="max-w-[640px]">
            {vi
              ? "Trước khi bắt tay vào thiết kế chính thức, chúng tôi cần demo những phương án UI mà chúng tôi nghĩ sẽ phù hợp với định hướng. Sau đó sẽ cùng nhau ngồi lại xác định phương án nào tốt nhất."
              : "Before moving into the final design phase, we explored and presented multiple UI directions that aligned with the product vision. The team then reviewed and evaluated each approach together to determine the most suitable solution."}
          </Body>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3">
          {[ASSETS.exploration1, ASSETS.exploration2, ASSETS.exploration3, ASSETS.exploration4, ASSETS.exploration5, ASSETS.exploration6].map((src, i) => (
            <motion.div key={i} {...fadeUp(0.05 * i)} className="bg-[#eae9e9] rounded-[16px] overflow-hidden" style={{ aspectRatio: "393/295" }}>
              <img src={src} alt={`Exploration ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* New Design System */}
      <motion.div {...fadeUp(0.1)} className="flex flex-col gap-6 pt-12">
        <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">
          {vi ? "Cập nhật Design System" : "New Design System"}
        </span>
        <div className="bg-[#f2f2f2] border border-[rgba(0,0,0,0.1)] rounded-[32px] max-md:rounded-[11px] overflow-hidden">
          <img src={ASSETS.designSystem} alt="Design system colour updates" className="w-full object-contain" style={{ maxHeight: 676 }} />
        </div>
        <div className="flex flex-col gap-[6px] max-w-[640px]">
          <Body>
            {vi
              ? "Design system là thứ quan trọng trước khi thiết kế chính thức để đảm bảo tất cả các thiết kế nhất quán và thuận tiện cập nhật trong quá trình thiết kế."
              : "Establishing a design system was a crucial step before moving into the final design phase. It ensured consistency across the product and made future updates more manageable throughout the process."}
          </Body>
          <Body>
            {vi
              ? "Mỗi khi cập nhật dù nhỏ hay lớn thì cả đội ngũ thực hiện dự án đều phải ngồi lại để nắm rõ thông tin thay đổi để tránh bị sót thông tin."
              : "Every change, whether small or large, required the entire project team to review and align on updates together to avoid missing important details during implementation."}
          </Body>
        </div>
      </motion.div>

      {/* Final Design */}
      <motion.div {...fadeUp(0.1)} className="pt-11">
        <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">
          {vi ? "Hoàn thiện thiết kế" : "Final Design"}
        </span>
      </motion.div>
      <motion.div {...fadeUp(0.1)} className="max-w-[640px]">
        <Body>
          {vi
            ? "Mỗi bạn Designer trong team sẽ thực hiện thiết kế mỗi tính năng tại mỗi thời điểm theo như bản kế hoạch hướng đi đã chuẩn bị trước đó. Trước khi handoff design chính thức cho dev, cả team sẽ cần ngồi lại review chung với nhau để đảm bảo design hoàn thiện và chính xác nhất, các bạn sẽ cùng nêu lên ý kiến hoặc bổ trợ ý tưởng cho nhau."
            : "Each designer on the team was responsible for specific features based on the planned product roadmap and design direction. Before officially handing off designs to the development team, we conducted collaborative review sessions to ensure every detail was accurate and polished. Team members openly shared feedback, discussed improvements, and supported each other with ideas throughout the process."}
        </Body>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-9">
        {TASKS.map((task, i) => (
          <motion.div key={task.id} {...fadeUp(0.05 * i)} className="bg-[#f2f2f2] rounded-[16px] p-7 flex flex-col gap-[7px]">
            <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">{task.id}</span>
            <span className="text-[28px] leading-none pt-1">{task.emoji}</span>
            <p className="font-inter font-bold text-[16px] text-[#1f1f1f] leading-normal pt-[7px]">{task.title}</p>
            <p className="font-inter font-normal text-[14px] text-[#666] leading-[23.1px]">{task.body}</p>
          </motion.div>
        ))}
      </div>

      {/* New Refresh */}
      <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4 pt-[52px]">
        <span className="font-inter font-bold text-[11px] text-[#666] tracking-[0.33px] uppercase leading-normal">
          {vi ? "Sự đổi mới" : "New Refresh"}
        </span>
        <div className="flex flex-col gap-8">
          <NewRefreshScreens />
        </div>
      </motion.div>

      {/* Full Feature Flow */}
      <motion.div {...fadeUp()} className="flex flex-col gap-4 pt-[52px]">
        <div className="flex items-center justify-between w-full">
          <SectionLabel>{vi ? "Cách trình bày flow" : "Full feature flow"}</SectionLabel>
          <a
            href="https://www.figma.com/design/aDrKevKe3WoEW0H2K0rwSX/2.0-KYC_WIP?node-id=660-27854&t=nE2tyDa8y78VkaSg-4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[7px] h-8 px-[13px] py-2 border border-[rgba(0,0,0,0.1)] rounded-full bg-transparent hover:bg-[rgba(0,0,0,0.05)] transition-colors"
          >
            <img src={ASSETS.fullFeatureFlowFigmaIcon} alt="" className="w-[10px] h-[15px] object-contain" />
            <span className="font-inter font-normal text-[11px] text-[#1f1f1f] uppercase">
              {vi ? "Khám phá với Figma" : "Explore in Figma"}
            </span>
            <img src={ASSETS.fullFeatureFlowArrow} alt="" className="w-[18px] h-[18px] object-contain" />
          </a>
        </div>
        <div className="border border-[rgba(0,0,0,0.1)] rounded-[16px] overflow-hidden w-full">
          <img src={ASSETS.fullFeatureFlowImg} alt="Full feature flow" className="w-full object-cover" style={{ aspectRatio: "1198/866" }} />
        </div>
      </motion.div>

      {/* AI — Nami Sea */}
      <motion.div {...fadeUp()} className="flex flex-col gap-4 pt-12">
        <SectionLabel>AI — Nami Sea</SectionLabel>
        <div className="flex flex-col gap-5 max-w-[640px]">
          <Body>
            {vi
              ? "AI đang vượt ra ngoài vai trò chatbot truyền thống, trở thành trợ lý kỹ thuật số chủ động hơn."
              : "AI is evolving beyond traditional chatbots into a more proactive digital assistant."}
          </Body>
          <Body>
            {vi
              ? "Nami Sea được thiết kế để giúp người dùng hoàn thành nhiệm vụ nhanh hơn thông qua tự động hóa và giảm thiểu tương tác thủ công, giúp nền tảng dễ tiếp cận hơn với người dùng mới. Sản phẩm cũng giới thiệu trải nghiệm tương tác bằng giọng nói thân thiện, lấy cảm hứng từ các nền tảng AI hiện đại."
              : "Nami Sea was designed to help users complete tasks faster through automation and reduced manual interactions, making the platform more approachable for new users. The product also introduced a friendly voice-based interaction experience inspired by modern AI platforms."}
          </Body>
        </div>
        <div className="grid grid-cols-5 gap-4 max-md:grid-cols-3 max-md:gap-3">
          {NAMI_SEA_PHONES.map((phone, i) => (
            <div key={phone.caption} className={`flex flex-col gap-[9px] items-center ${i >= 3 ? "max-md:hidden" : ""}`}>
              <div className="w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "227/461" }}>
                <img src={ASSETS[phone.src]} alt={phone.caption} className="w-full h-full object-cover" />
              </div>
              <span className="font-inter font-normal text-[11px] text-[#666] text-center leading-[15.4px]">{phone.caption}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KYC */}
      <motion.div {...fadeUp()} className="flex flex-col gap-4 pt-12">
        <SectionLabel>KYC</SectionLabel>
        <div className="max-w-[640px]">
          <Body>
            {vi
              ? "Người dùng thường cảm thấy lo lắng trong quá trình xác minh KYC, sợ mắc lỗi dẫn đến bị từ chối. Vì hệ thống không thể tự động xác thực media được tải lên, chúng tôi đã thêm hướng dẫn trực quan và animation để giúp người dùng hiểu rõ yêu cầu và hoàn thành quá trình tự tin hơn."
              : "Users often felt anxious during KYC verification, fearing mistakes that could cause delays or rejection. Since the system could not automatically validate uploaded media, we added visual instructions and animations to help users better understand the requirements and complete the process more confidently."}
          </Body>
        </div>
        <div className="bg-[#1d1d1d] rounded-[16px] py-3 px-4 grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-3 w-full">
          {KYC_ITEMS.map((item) => (
            <div key={item.caption} className="flex flex-col gap-[9px] items-center">
              <div className="w-full rounded-[20px] overflow-hidden bg-[rgba(255,255,255,0.06)]" style={{ aspectRatio: "266/527" }}>
                <video src={item.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
              <span className="font-inter font-normal text-[11px] text-white text-center leading-[15.4px] whitespace-nowrap max-md:whitespace-normal">{item.caption}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Key Design Learned */}
      <motion.div {...fadeUp()} className="flex flex-col gap-4 pt-12">
        <SectionLabel>{vi ? "Bài học thiết kế" : "Key Design Learned"}</SectionLabel>
        <div className="flex flex-col w-full">
          {KEY_LEARNINGS.map((item) => <NumberedRow key={item.num} {...item} />)}
        </div>
      </motion.div>

      {/* What's Next */}
      <motion.div {...fadeUp()} className="flex flex-col gap-4 pt-12">
        <SectionLabel>{vi ? "Tiếp theo là gì" : "What's next"}</SectionLabel>
        <div className="flex flex-col w-full">
          {WHATS_NEXT_ITEMS.map((item) => <NumberedRow key={item.num} {...item} />)}
        </div>
        <p className="font-inter font-normal italic text-[14px] text-[#1f1f1f] leading-[22.4px] tracking-[-0.14px] mt-6">
          Team member: Võ Xuân Truyền, Trần Nguyên Phát, Phạm Thị Tường Vy, Trần Ngọc Kim Ngân, Võ Hoàng Vy, Hồng Thị Thanh Ngân.
        </p>
      </motion.div>
    </Section>
  );
}

// ─── NAMI INSURANCE BANNER ──────────────────────────────────────────────────
function NamiInsuranceBanner() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <a
      href="/work/nami-insurance"
      data-cursor="take a look"
      className="relative w-full overflow-hidden flex border-t border-[rgba(0,0,0,0.1)] cursor-pointer items-center max-md:items-start max-md:!min-h-0"
      style={{ minHeight: "clamp(200px, 18vw, 300px)" }}
    >
      {/* Desktop background */}
      <img src={ASSETS.namiInsuranceBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block" />
      {/* Mobile background */}
      <img src={ASSETS.namiInsuranceBgMobile} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none md:hidden" />

      {/* Desktop layout */}
      <div className="hidden md:flex relative w-full px-[120px] items-center justify-between gap-6">
        <h3
          className="font-inter font-semibold text-white leading-normal"
          style={{ fontSize: "clamp(22px, 3.3vw, 40px)" }}
        >
          {vi ? "Giải pháp tài chính phi tập trung, linh hoạt" : "Decentralize, adaptability, Financial"}
        </h3>
        <div
          className="flex items-center gap-4 rounded-full px-6 py-2 shrink-0 backdrop-blur-[24px] border border-[rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span className="font-inter font-semibold text-[24px] text-white">{vi ? "Xem dự án" : "View project"}</span>
          <img src={vi ? ASSETS.namiInsuranceArrowVI : ASSETS.namiInsuranceArrow} alt="" className="w-5 h-5 object-contain" />
        </div>
      </div>

      {/* Mobile layout — pt=36px (32+4), pb=48px (32+16), px=24px, gap=24px */}
      <div className="md:hidden relative w-full px-6 pt-9 pb-12 flex flex-col gap-6">
        <h3 className="font-inter font-semibold text-[26px] text-white leading-normal">
          {vi ? "Giải pháp tài chính phi tập trung, linh hoạt" : "Decentralize, adaptability, Financial"}
        </h3>
        <div
          className="flex items-center gap-4 rounded-full px-6 py-2 w-fit backdrop-blur-[24px] border border-[rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))", boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)" }}
        >
          <span className="font-inter font-semibold text-[20px] text-white">{vi ? "Xem dự án" : "View project"}</span>
          <img src={ASSETS.namiInsuranceArrowMobile} alt="" className="w-5 h-5 object-contain" />
        </div>
      </div>
    </a>
  );
}


// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function NamiExchangePage() {
  return (
    <>
      <Hero />
      <Context />
      <ProblemStatement />
      <Hypothesis />
      <Research />
      <StakeholderManagement />
      <DesignProcess />
      <NamiInsuranceBanner />
    </>
  );
}
