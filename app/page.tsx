"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

const cueIcons = ["video", "modal", "scroll", "layers", "magnet", "transition"] as const;

export default function Home() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const { scrollYProgress } = useScroll();
  const heroGlowY = useTransform(scrollYProgress, [0, 0.24], [0, 92]);
  const heroScreenY = useTransform(scrollYProgress, [0, 0.24], [0, -54]);

  function scrollCarousel(direction: "prev" | "next") {
    carouselRef.current?.scrollBy({ left: direction === "next" ? 360 : -360, behavior: "smooth" });
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
  }

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
            <span>/ Product Designer</span>
          </a>
          <div className="nav-links">
            <a href="#selected-works">工作案例</a>
            <a href="#about">个人经历</a>
            <a href="#contact">联系方式</a>
          </div>
          <MagneticButton href="#contact" className="nav-cta">
            联系我
          </MagneticButton>
        </motion.nav>

        <section id="top" className="hero-section">
          <div className="hero-bg-layer" aria-hidden>
            <img src={`${basePath}/images/hero-bg.png`} alt="" />
          </div>
          <motion.div className="hero-ambient hero-ambient-one" style={{ y: heroGlowY }} />
          <motion.div className="hero-ambient hero-ambient-two" style={{ y: heroScreenY }} />
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
                面向企业解决方案的交互设计与作品展示
              </motion.p>
              <motion.p className="hero-description" variants={reveal}>
                专注 ToB 企业级系统的交互设计与体验优化
                <br />
                低代码平台实践 · 组件化模板沉淀 · 高效敏捷的设计交付
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
            <motion.div className="hero-screen-wrap" style={{ y: heroScreenY }} initial={{ opacity: 0, x: 70, rotateY: -12 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 1.05, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
              <div className="hero-dashboard-screen screen-floating">
                <img src={`${basePath}/images/hero-dashboard.png`} alt="企业数据分析后台界面预览" />
              </div>
            </motion.div>
          </div>

          <motion.div id="templates" className="hero-carousel-wrap" variants={stagger} initial="hidden" animate="visible">
            <button type="button" className="carousel-arrow" aria-label="向左滚动模板作品" onClick={() => scrollCarousel("prev")}>
              <IconGlyph name="arrow" className="arrow-left" />
            </button>
            <div className="category-track" ref={carouselRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
              {categories.map((item, index) => (
                <motion.article className={`category-card tone-${item.tone} preview-${item.previewTone}`} key={item.key} variants={reveal}>
                  <div className="category-preview">
                    <img src={item.image} alt={`${item.key} ${item.name} 预览截图`} className="category-preview-image" />
                    <div className="category-card-caption">
                      <h2>{item.key}</h2>
                      <p>{item.name}</p>
                    </div>
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
              <motion.div className="cue-item" variants={reveal} key={title}>
                <IconGlyph name={cueIcons[index]} className="cue-icon" />
                <div>
                  <b>{title}</b>
                  <span>{label}</span>
                </div>
              </motion.div>
            ))}
          </motion.section>
        </section>

        <motion.section id="selected-works" className="section-wrap selected-section" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}>
          <motion.div className="section-heading" variants={reveal}>
            <h2>
              SELECTED WORKS <em>/</em>
              <span>解决方案案例</span>
            </h2>
            <MagneticButton href="#selected-works" variant="ghost">
              查看全部案例
            </MagneticButton>
          </motion.div>
          <div className="works-grid">
            {works.map((work) => (
              <motion.div key={work.id} variants={reveal}>
                <TiltCard className="work-card" label={`打开 ${work.title} 案例预览`} onClick={() => setSelectedWork(work)}>
                  <div className="work-preview" data-video-path={`${basePath}${work.videoPath}`}>
                    <MockEnterpriseScreen work={work} compact />
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
            <img src={`${basePath}/images/mascot.png`} alt="Chohn 企业 UX 科技主形象" />
          </motion.div>
          <motion.div className="about-copy" variants={reveal}>
            <h2>
              Hi, I am <span>Chohn!</span>
            </h2>
            <h3>ToB 交互设计师 &amp; 企业解决方案设计专家</h3>
            <p>拥有 5+ 年企业级产品设计经验，专注于 ERP、CRM、HR、OA、供应链、项目管理与数据可视化等领域。</p>
            <p>擅长将复杂业务抽象为高效的产品体验，沉淀可复用的模板与组件体系，助力企业数字化升级。</p>
            <div className="stats-row">
              {[
                ["5+", "行业经验"],
                ["30+", "页面模板"],
                ["200+", "企业页面资产"]
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
              <span>核心优势</span>
            </h2>
          </motion.div>
          <div className="strength-grid">
            {strengths.map(([title, text, image, hoverImage]) => (
              <motion.div key={title} variants={reveal}>
                <TiltCard className="strength-card">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="strength-icon-stack" aria-hidden>
                    <img src={image} alt="" className="strength-icon-art strength-icon-default" />
                    <img src={hoverImage} alt="" className="strength-icon-art strength-icon-green" />
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
              BETTER <span>ENTERPRISE</span>
              <br />
              EXPERIENCES
            </h2>
            <MagneticButton href="mailto:chohn_top@qq.com">联系我</MagneticButton>
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
              <img src={`${basePath}/images/contact-qr.png`} alt="微信联系我二维码" className="qr-image" />
              <p>微信扫码联系我</p>
            </div>
          </motion.aside>
        </motion.section>

        <footer className="footer section-wrap">
          <a href="#top" className="brand">
            <strong>Chohn</strong>
            <span>/ Product Designer</span>
          </a>
          <div className="footer-meta">
            <div className="beian-records">
              <a
                href="https://beian.mps.gov.cn/#/query/webSearch?code=11011402056061"
                target="_blank"
                rel="noreferrer"
                className="beian-mps-link"
              >
                <img src={`${basePath}/images/beian-mps-icon.png`} alt="" width={16} height={16} />
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
