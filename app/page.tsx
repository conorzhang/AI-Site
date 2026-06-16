"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { basePath, categories, cues, strengths, timeline, Work, works } from "@/data/works";
import { IconGlyph } from "@/components/IconGlyph";
import { MagneticButton } from "@/components/MagneticButton";
import { MockEnterpriseScreen } from "@/components/MockEnterpriseScreen";
import { TiltCard } from "@/components/TiltCard";
import { WorkPreviewModal } from "@/components/WorkPreviewModal";

const reveal = {
  hidden: { opacity: 0, y: 54 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cueIcons = ["entity", "modal", "component", "ai", "style", "template"] as const;
const loopCategories = [...categories, ...categories, ...categories];

export default function Home() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselReadyRef = useRef(false);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  function getCarouselSegmentWidth() {
    const node = carouselRef.current;
    if (!node) return 0;
    return node.scrollWidth / 3;
  }

  function getCarouselStep() {
    const node = carouselRef.current;
    if (!node) return 186;
    const card = node.querySelector<HTMLElement>(".category-card");
    if (!card) return 186;
    const gap = Number.parseFloat(getComputedStyle(node).columnGap || getComputedStyle(node).gap || "18");
    return card.offsetWidth + gap;
  }

  function normalizeCarouselScroll() {
    const node = carouselRef.current;
    if (!node || !carouselReadyRef.current) return;

    const segment = getCarouselSegmentWidth();
    if (segment <= 0) return;

    if (node.scrollLeft < segment) {
      node.scrollLeft += segment;
    } else if (node.scrollLeft >= segment * 2) {
      node.scrollLeft -= segment;
    }
  }

  function scrollCarousel(direction: "prev" | "next") {
    const node = carouselRef.current;
    if (!node) return;
    const step = getCarouselStep();
    node.scrollBy({ left: direction === "next" ? step : -step, behavior: "smooth" });
    window.setTimeout(() => normalizeCarouselScroll(), 420);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const node = carouselRef.current;
    if (!node) return;
    dragState.current = { active: true, startX: event.clientX, scrollLeft: node.scrollLeft };
    node.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = carouselRef.current;
    if (!node || !dragState.current.active) return;
    node.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX) * 1.15;
  }

  function stopDrag(event: React.PointerEvent<HTMLDivElement>) {
    const node = carouselRef.current;
    dragState.current.active = false;
    if (node?.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
    requestAnimationFrame(() => normalizeCarouselScroll());
  }

  useLayoutEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    const setToMiddle = () => {
      const segment = node.scrollWidth / 3;
      if (segment <= 0) return false;
      node.scrollLeft = segment;
      carouselReadyRef.current = true;
      return true;
    };

    let resizeObserver: ResizeObserver | undefined;

    if (!setToMiddle()) {
      resizeObserver = new ResizeObserver(() => {
        if (setToMiddle()) resizeObserver?.disconnect();
      });
      resizeObserver.observe(node);
    }

    const onResize = () => {
      if (!carouselReadyRef.current) return;
      normalizeCarouselScroll();
    };

    window.addEventListener("resize", onResize);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    const onScrollEnd = () => normalizeCarouselScroll();
    node.addEventListener("scrollend", onScrollEnd);

    return () => node.removeEventListener("scrollend", onScrollEnd);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <main className="site-shell">
        <motion.nav className="navbar" initial={{ opacity: 0, y: -22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <a href="#top" className="brand">
            <strong>Chohn</strong>
            <span>/ AI 产品经理 / ToB 平台产品</span>
          </a>
          <div className="nav-links">
            <a href="#selected-works">项目案例</a>
            <a href="#about">工作经历</a>
            <a href="#contact">联系方式</a>
          </div>
          <MagneticButton href="#contact" className="nav-cta">
            联系我
          </MagneticButton>
        </motion.nav>

        <section id="top" className="hero-section">
          <div className="hero-bg-layer" aria-hidden>
            <img src={`${basePath}/images/hero-bg.webp`} alt="" fetchPriority="high" decoding="async" />
          </div>
          <div className="hero-ambient hero-ambient-one" />
          <div className="hero-ambient hero-ambient-two" />
          <div className="mountain-layer" />
          <div className="hero-grid">
            <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="visible">
              <motion.h1 className="hero-title" variants={reveal} transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}>
                <span className="hero-title-stack">
                  <span className="hero-title-top">
                    <span className="hero-title-tob">ToB</span>
                    <span className="hero-title-enterprise">ENTERPRISE</span>
                  </span>
                  <span className="hero-title-main">
                    PORTFOLIO
                    <span className="hero-sparkles" aria-hidden>
                      <svg className="hero-sparkle hero-sparkle-sm" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2.4 13.2 8.2 19 9.4 13.2 10.6 12 16.4 10.8 10.6 5 9.4 10.8 8.2Z" fill="currentColor" />
                      </svg>
                      <svg className="hero-sparkle hero-sparkle-lg" viewBox="0 0 24 24" fill="none">
                        <path d="M12 1.8 13.7 9.1 21 10.8 13.7 12.5 12 19.8 10.3 12.5 3 10.8 10.3 9.1Z" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                </span>
              </motion.h1>
              <motion.p className="hero-subtitle" variants={reveal}>
                低代码能力建设与 AI 辅助方案
              </motion.p>
              <motion.p className="hero-description" variants={reveal}>
                专注 ToB 产品设计，覆盖应用构建、组件功能配置、企业主题定制与 AI 场景落地。
                <br />
                深耕低代码平台实践，沉淀系统模板资产，驱动高效敏捷的设计交付。
              </motion.p>
              <motion.div className="scroll-cue" variants={reveal}>
                <svg className="scroll-cue-icon" viewBox="0 0 32 32" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="4.2" fill="currentColor" />
                  <path
                    d="M8 12.4v8.4c0 2.6 2.1 4.7 4.7 4.7h8.2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="24.8" cy="25.5" r="1.8" fill="currentColor" />
                </svg>
                SCROLL TO EXPLORE
              </motion.div>
            </motion.div>
            <motion.div className="hero-screen-wrap" initial={{ opacity: 0, x: 70, rotateY: -12 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 1.05, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
              <div className="hero-dashboard-screen screen-floating">
                <img src={`${basePath}/images/hero-dashboard.webp`} alt="企业数据分析后台界面预览" fetchPriority="high" decoding="async" />
              </div>
            </motion.div>
          </div>

          <motion.div id="templates" className="hero-carousel-wrap" variants={stagger} initial="hidden" animate="visible">
            <button type="button" className="carousel-arrow" aria-label="向左滚动模板作品" onClick={() => scrollCarousel("prev")}>
              <IconGlyph name="arrow" className="arrow-left" />
            </button>
            <div className="category-track" ref={carouselRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
              {loopCategories.map((item, index) => (
                <motion.article
                  className={`category-card tone-${item.tone} preview-${item.previewTone}`}
                  data-category={item.key}
                  key={`${item.key}-${index}`}
                  variants={reveal}
                >
                  <div className="category-preview">
                    <img src={item.image} alt="" className="category-preview-image" loading="lazy" decoding="async" />
                    <div className="preview-scan" />
                  </div>
                </motion.article>
              ))}
            </div>
            <button type="button" className="carousel-arrow" aria-label="向右滚动模板作品" onClick={() => scrollCarousel("next")}>
              <IconGlyph name="arrow" />
            </button>
          </motion.div>

          <div className="hero-cues-bridge" aria-hidden />

          <motion.section className="interaction-cues section-wrap" variants={stagger} initial="hidden" animate="visible">
            {cues.map(([title, label], index) => (
              <motion.div className="cue-item" variants={reveal} key={`cue-${index}`}>
                <IconGlyph name={cueIcons[index]} className="cue-icon" />
                <div>
                  <b>{title}</b>
                  <span>{label}</span>
                </div>
              </motion.div>
            ))}
          </motion.section>
        </section>

        <LegacyProjectShowcase />

        <motion.section id="selected-works" className="section-wrap selected-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
          <motion.div className="section-heading" variants={reveal}>
            <h2>
              SELECTED WORKS &amp; OUTCOMES <em>/</em>
              <span>产品方案与落地成果</span>
            </h2>
            <MagneticButton href="#selected-works" variant="ghost">
              查看全部案例
            </MagneticButton>
          </motion.div>
          <div className="works-grid">
            {works.map((work) => (
              <motion.div key={work.id} variants={reveal}>
                <TiltCard className="work-card" label={`打开 ${work.title} 案例预览`} onClick={() => setSelectedWork(work)}>
                  <div className="work-preview">
                    {work.previewImage ? (
                      <img src={work.previewImage} alt="" className="work-preview-image" loading="lazy" decoding="async" />
                    ) : (
                      <MockEnterpriseScreen work={work} compact />
                    )}
                    <span className="video-shimmer" />
                    <span className="work-play">
                      <IconGlyph name="play" />
                    </span>
                  </div>
                  <div className="work-copy">
                    <h3>{work.title}</h3>
                    <p>{work.subtitle}</p>
                    <span>{work.eyebrow}</span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="about" className="section-wrap about-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
          <motion.div className="mascot-panel" variants={reveal}>
            <img src={`${basePath}/images/mascot.webp`} alt="Chohn 企业 UX 科技主形象" loading="lazy" decoding="async" />
          </motion.div>
          <motion.div className="about-copy" variants={reveal}>
            <h2>
              Hi, I am <span>Chohn!</span>
            </h2>
            <h3>AI 产品经理 / ToB 平台产品经理</h3>
            <p>具备 5 年以上 ToB 平台与低代码产品经验，长期参与企业级组件库、低代码设计器、主题体系、国际化适配和 AI 助手方案建设。</p>
            <p>擅长把复杂业务需求拆解为对象模型、页面结构、流程规则、组件配置与可交付的产品方案。</p>
            <div className="stats-row">
              {[
                ["5+", "ToB 产品经验"],
                ["30+", "组件 / 配置能力设计"],
                ["200+", "工单 / 需求问题沉淀"]
              ].map(([value, label]) => (
                <div className="stat-item" key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="timeline">
              {timeline.map(([date, company, role, desc]) => (
                <div className="timeline-item" key={date}>
                  <span className="timeline-dot" />
                  <b>{date}</b>
                  <strong>{company}</strong>
                  <em>{role}</em>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section className="section-wrap strengths-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
          <motion.div className="section-heading compact-heading" variants={reveal}>
            <h2>
              CORE STRENGTHS <em>/</em>
              <span>核心产品能力</span>
            </h2>
          </motion.div>
          <div className="strength-grid">
            {strengths.map(([title, text, image, hoverImage]) => (
              <motion.div key={title} variants={reveal}>
                <TiltCard className="strength-card">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="strength-icon-stack" aria-hidden>
                    <img src={image} alt="" className="strength-icon-art strength-icon-default" loading="lazy" decoding="async" />
                    <img src={hoverImage} alt="" className="strength-icon-art strength-icon-green" loading="lazy" decoding="async" />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" className="section-wrap contact-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
          <motion.div className="contact-title" variants={reveal}>
            <h2>
              LET’S BUILD
              <br />
              BETTER <span>TOB PRODUCT</span>
              <br />
              SOLUTIONS
            </h2>
            <MagneticButton href="#selected-works">查看项目案例</MagneticButton>
          </motion.div>
          <motion.aside className="contact-card" variants={reveal}>
            <div className="contact-info">
              <h3>CONTACT</h3>
              <p>
                <span>手机：</span>18510936952
              </p>
              <p>
                <span>微信：</span>chohn_top
              </p>
              <p>
                <span>邮箱：</span>chohn_top@qq.com
              </p>
            </div>
            <div className="qr-box" aria-label="微信扫码联系我">
              <img src={`${basePath}/images/contact-qr.png`} alt="微信联系我二维码" className="qr-image" loading="lazy" decoding="async" />
              <p>微信扫码联系我</p>
            </div>
          </motion.aside>
        </motion.section>

        <footer className="footer section-wrap">
          <a href="#top" className="brand">
            <strong>Chohn</strong>
            <span>/ AI Product Manager</span>
          </a>
          <div className="footer-meta">
            <div className="beian-records">
              <a
                href="https://beian.mps.gov.cn/#/query/webSearch?code=11011402056061"
                target="_blank"
                rel="noreferrer"
                className="beian-mps-link"
              >
                <img src={`${basePath}/images/beian-mps-icon.png`} alt="" width={16} height={16} loading="lazy" decoding="async" />
                京公网安备11011402056061号
              </a>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="beian-icp-link">
                京ICP备2026027567号
              </a>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        <WorkPreviewModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      </AnimatePresence>
    </>
  );
}

function LegacyProjectShowcase() {
  const insightItems = [
    ["问题", "中后台系统的任务状态流转、权限控制与数据密度常因设计不一致导致信息层级混乱，用户难以快速定位高风险项。"],
    ["方案", "以任务生命周期为主线，设计状态机驱动的表格交互；集成风险洞察面板、批量操作与权限按钮级管控。"],
    ["输出", "可交互的 TaskTable 原型，支持状态流转、进度可视化、风险分级、RTL 适配与多语言输入验证。"],
    ["交付", "演示环境隔离、角色切换模拟、规范模式开关与错误态注入，确保设计系统可验证、可复现。"]
  ];

  return (
        <motion.section className="section-wrap legacy-projects-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
          <motion.div className="section-heading legacy-heading" variants={reveal}>
            <h2>
              ENTERPRISE AI EXPLORATION <em>/</em>
              <span>企业应用 AI 探索</span>
            </h2>
            <MagneticButton href="https://chohn.top/PM-system/" variant="ghost">
              打开在线演示
            </MagneticButton>
          </motion.div>

      <motion.article className="legacy-main-project" variants={reveal}>
        <div className="legacy-project-copy">
          <span>原型展示</span>
          <h3>任务工作台</h3>
          <p>任务流转闭环、组件状态、权限与 Spec 规则集中演示</p>
        </div>
        <div className="legacy-main-layout">
          <div className="legacy-main-left">
            <LegacyPmMockup />
            <div className="legacy-tech-tags">
              {["React 19", "TypeScript", "Ant Design", "Zustand", "Mock Service Worker"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="legacy-insight-list">
            {insightItems.map(([title, text]) => (
              <div className="legacy-insight-card" key={title}>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
            <a href="https://chohn.top/PM-system/" className="legacy-open-link">
              打开任务工作台
              <IconGlyph name="arrow" />
            </a>
          </div>
        </div>
      </motion.article>

      <motion.div className="legacy-secondary-grid" variants={stagger}>
        <LegacyToolCard
          title="JD 智能分析"
          subtitle="职位描述智能分析"
          description="通过规则脚本解析摘要，接入语义识别与企业认证 API，完成信息抽取、风险提示与可信度校验。"
          tags={["AI PM", "岗位分类", "风险提示", "企业审计"]}
          href="https://chohn.top/jd-analyzer/"
          tone="green"
        />
        <LegacyToolCard
          title="AI 提取文字"
          subtitle="招聘截图 OCR 识别"
          description="过滤 UI 噪声，输出结构化文本供下游分析，支持稳定化部署与规则兜底。"
          tags={["PP-OCRv5", "噪声过滤", "规则兜底"]}
          href="https://chohn.top/stable-ocr/"
          tone="cyan"
        />
      </motion.div>
    </motion.section>
  );
}

function LegacyPmMockup() {
  const rows = [
    ["待开始", "高", "SL", "12%", "中"],
    ["进行中", "高", "LY", "0%", "高"],
    ["待验收", "中", "MC", "82%", "中"],
    ["已完成", "中", "OA", "100%", "低"],
    ["进行中", "低", "OA", "36%", "低"]
  ];

  return (
    <div className="legacy-browser legacy-pm-browser">
      <div className="legacy-browser-chrome">
        <span />
        <span />
        <span />
        <b>chohn.top/PM-system/</b>
      </div>
      <div className="legacy-pm-app">
        <div className="legacy-pm-topbar">
          <div>
            <i>项</i>
            <b>项目管理系统</b>
          </div>
          <span>风险 2</span>
        </div>
        <div className="legacy-pm-body">
          <div className="legacy-pm-sidebar">
            {["⌂", "◈", "○", "◎"].map((item, index) => (
              <span className={index === 0 ? "active" : ""} key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="legacy-pm-content">
            <div className="legacy-pm-stats">
              {[
                ["任务总数", "12"],
                ["进行中", "3"],
                ["待验收", "2"],
                ["高风险", "2"]
              ].map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="legacy-pm-head">
              <div>
                <b>任务工作台</b>
                <span>任务流转闭环、组件状态、权限和 Spec 规则集中演示</span>
              </div>
              <button>+ 新建</button>
            </div>
            <div className="legacy-pm-grid">
              <div className="legacy-pm-table">
                <div className="legacy-pm-table-head">
                  <span>任务列表</span>
                  <i>☰</i>
                </div>
                {rows.map(([status, priority, user, progress, risk], index) => (
                  <div className="legacy-pm-row" key={`${status}-${index}`}>
                    <span className="fake-line" />
                    <em className={`status status-${index}`}>{status}</em>
                    <em>{priority}</em>
                    <b>{user}</b>
                    <i style={{ width: progress }}>{progress}</i>
                    <em>{risk}</em>
                  </div>
                ))}
              </div>
              <div className="legacy-pm-risk">
                <b>风险洞察</b>
                <div>
                  <span>2</span>
                  <span>7</span>
                  <span>0</span>
                </div>
                <button>生成提示</button>
                <p>
                  <i />
                  <i />
                  <i />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegacyToolCard({ title, subtitle, description, tags, href, tone }: { title: string; subtitle: string; description: string; tags: string[]; href: string; tone: "green" | "cyan" }) {
  return (
    <motion.article className={`legacy-tool-card tone-${tone}`} variants={reveal}>
      <div className="legacy-browser legacy-tool-browser">
        <div className="legacy-browser-chrome">
          <span />
          <span />
          <span />
          <b>{title}</b>
          <em>online</em>
        </div>
        <div className="legacy-tool-body">
          {tone === "green" ? (
            <>
              <div className="legacy-jd-panel">
                <h4>{subtitle}</h4>
                <p>{description}</p>
              </div>
              <div className="legacy-score-ring">78%</div>
            </>
          ) : (
            <>
              <div className="legacy-upload-box">拖入招聘截图<br />或工作流上传图片</div>
              <div className="legacy-ocr-lines">
                <span />
                <span />
                <span />
                <span />
                <i />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="legacy-tool-meta">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <a href={href} aria-label={`打开 ${title}`}>
          <IconGlyph name="arrow" />
        </a>
      </div>
      <div className="legacy-tech-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </motion.article>
  );
}
