export type Work = {
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  tags: string[];
  metric: string;
  videoPath: string;
  tone: "blue" | "green" | "lime" | "cyan";
};

export const basePath = "/enterprise-ux-demo";

export const categories = [
  { key: "ERP", name: "企业资源计划", tone: "blue", previewTone: "light", image: `${basePath}/images/category-previews/erp.png` },
  { key: "CRM", name: "客户关系管理", tone: "green", previewTone: "dark", image: `${basePath}/images/category-previews/crm.png` },
  { key: "HR", name: "人力资源管理", tone: "cyan", previewTone: "dark", image: `${basePath}/images/category-previews/hr.png` },
  { key: "OA", name: "协同办公系统", tone: "lime", previewTone: "light", image: `${basePath}/images/category-previews/oa.png` },
  { key: "SCM", name: "供应链管理", tone: "green", previewTone: "dark", image: `${basePath}/images/category-previews/scm.png` },
  { key: "PM", name: "项目管理", tone: "blue", previewTone: "light", image: `${basePath}/images/category-previews/pm.png` },
  { key: "Dashboard", name: "数据可视化看板", tone: "cyan", previewTone: "dark", image: `${basePath}/images/category-previews/dashboard.png` }
];

export const cues = [
  ["HOVER VIDEO PREVIEW", "悬停视频预览"],
  ["MODAL CASE PREVIEW", "案例模态预览"],
  ["SCROLL REVEAL", "滚动动画呈现"],
  ["PARALLAX LAYERS", "视差层次背景"],
  ["CARD TILT / MAGNETIC", "卡片倾斜吸附"],
  ["SMOOTH TRANSITIONS", "顺滑切换过渡"]
];

export const works: Work[] = [
  {
    id: "erp",
    title: "ERP 管理系统",
    subtitle: "一体化资源管理与业务协同",
    eyebrow: "ENTERPRISE RESOURCE PLANNING",
    tags: ["采购", "库存", "财务", "审批"],
    metric: "86%",
    videoPath: "/videos/erp.mp4",
    tone: "blue"
  },
  {
    id: "crm",
    title: "CRM 客户管理",
    subtitle: "客户全生命周期管理",
    eyebrow: "CUSTOMER RELATIONSHIP MANAGEMENT",
    tags: ["线索", "商机", "客户", "回款"],
    metric: "72%",
    videoPath: "/videos/crm.mp4",
    tone: "green"
  },
  {
    id: "hr",
    title: "HR 人力资源管理",
    subtitle: "组织发展与人才管理平台",
    eyebrow: "HUMAN RESOURCE MANAGEMENT",
    tags: ["组织", "招聘", "绩效", "人才"],
    metric: "64%",
    videoPath: "/videos/hr.mp4",
    tone: "cyan"
  },
  {
    id: "oa",
    title: "OA 协同办公",
    subtitle: "高效协同 · 流程驱动",
    eyebrow: "OFFICE AUTOMATION",
    tags: ["流程", "日程", "任务", "文档"],
    metric: "91%",
    videoPath: "/videos/oa.mp4",
    tone: "lime"
  }
];

export const strengths = [
  ["完整项目主导能力", "从 0-1 规划与落地，把控体验与商业目标", `${basePath}/images/strength-icons/strength-1.png`, `${basePath}/images/strength-icons/strength-1-green.png`],
  ["品牌视觉体系搭建", "建立统一的设计语言，提升品牌价值与认知", `${basePath}/images/strength-icons/strength-2.png`, `${basePath}/images/strength-icons/strength-2-green.png`],
  ["AI 设计提效", "智能工具赋能设计流程，提升效率与质量", `${basePath}/images/strength-icons/strength-3.png`, `${basePath}/images/strength-icons/strength-3-green.png`],
  ["设计管理统筹", "规范设计流程与资产体系，保障团队高效协同", `${basePath}/images/strength-icons/strength-4.png`, `${basePath}/images/strength-icons/strength-4-green.png`],
  ["跨部门协同", "深度协作推动项目落地，创造业务价值", `${basePath}/images/strength-icons/strength-5.png`, `${basePath}/images/strength-icons/strength-5-green.png`]
];

export const timeline = [
  ["2019.06 - 2021.08", "某软件科技有限公司", "UI/UX 设计师", "负责企业应用产品设计与优化"],
  ["2021.09 - 2023.11", "某数字科技有限公司", "高级交互设计师", "主导多条产品线设计体系搭建"],
  ["2023.12 - 至今", "某智能科技有限公司", "设计专家", "负责企业数字化解决方案设计"]
];
