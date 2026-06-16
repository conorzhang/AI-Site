export type Work = {
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  tags: string[];
  metric: string;
  previewImage?: string;
  tone: "blue" | "green" | "lime" | "cyan";
};

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
export const basePath = configuredBasePath === undefined ? "/enterprise-ux-demo" : configuredBasePath;

export const categories = [
  { key: "ERP", label: "业务对象建模", tone: "blue", previewTone: "dark", image: `${basePath}/images/category-previews/erp.webp` },
  { key: "CRM", label: "页面与流程建模", tone: "green", previewTone: "dark", image: `${basePath}/images/category-previews/crm.webp` },
  { key: "HR", label: "组件能力产品化", tone: "cyan", previewTone: "dark", image: `${basePath}/images/category-previews/hr.webp` },
  { key: "OA", label: "AI 助手产品设计", tone: "lime", previewTone: "dark", image: `${basePath}/images/category-previews/oa.webp` },
  { key: "SCM", label: "Design Token / DTS", tone: "green", previewTone: "dark", image: `${basePath}/images/category-previews/scm.webp` },
  { key: "PM", label: "行业模板与方案沉淀", tone: "blue", previewTone: "dark", image: `${basePath}/images/category-previews/pm.webp` },
  { key: "Dashboard", label: "数据可视化看板", tone: "cyan", previewTone: "dark", image: `${basePath}/images/category-previews/dashboard.webp` }
];

export const cues = [
  ["业务对象建模", "抽象业务实体、字段、状态、权限与配置关系，支撑低代码系统搭建"],
  ["页面与流程建模", "梳理列表、详情、编辑、审批、异常处理等页面与流程闭环"],
  ["组件能力产品化", "定义组件属性、状态、API、浏览态、只读态、国际化等标准能力"],
  ["AI 助手产品设计", "基于 RAG、Workflow、Agent Skill 设计知识问答与工单辅助处理方案"],
  ["Design Token / DTS", "推动主题变量、颜色、字号、圆角、间距等跨端一致性与可配置能力"],
  ["行业模板与方案沉淀", "沉淀表单、列表、卡片、看板等信息化系统模板，降低重复建设成本"]
];

export const works: Work[] = [
  {
    id: "erp",
    title: "低代码组件知识库 AI 问答",
    subtitle: "基于 Dify、RAG、Workflow 构建组件知识问答，提升研发与实施问题定位效率",
    eyebrow: "LOW-CODE COMPONENT KNOWLEDGE QA",
    tags: ["Dify", "RAG", "Workflow", "知识库"],
    metric: "86%",
    previewImage: `${basePath}/images/work-previews/oa.webp`,
    tone: "blue"
  },
  {
    id: "crm",
    title: "工单客服 AI 助手",
    subtitle: "通过信息抽取、智能归因、历史工单召回与人工审核边界，提升工单流转效率",
    eyebrow: "AI TICKET SERVICE ASSISTANT",
    tags: ["工单", "归因", "召回", "审核"],
    metric: "72%",
    previewImage: `${basePath}/images/work-previews/crm.webp`,
    tone: "green"
  },
  {
    id: "hr",
    title: "低代码组件平台能力建设",
    subtitle: "负责 Web / 移动组件需求规划、属性配置、状态规则、API 标准与上线验证",
    eyebrow: "LOW-CODE COMPONENT PLATFORM",
    tags: ["组件", "配置", "API", "验证"],
    metric: "64%",
    previewImage: `${basePath}/images/work-previews/hr.webp`,
    tone: "cyan"
  },
  {
    id: "oa",
    title: "国际化与多端适配方案",
    subtitle: "推动 RTL 布局、多语言录入、多时区转换、海外项目页面适配等能力落地",
    eyebrow: "I18N AND MULTI-END ADAPTATION",
    tags: ["RTL", "多语言", "多时区", "适配"],
    metric: "91%",
    previewImage: `${basePath}/images/work-previews/erp.webp`,
    tone: "lime"
  }
];

export const strengths = [
  ["复杂需求结构化能力", "能将业务诉求拆解为对象、字段、状态、权限、流程、异常与配置规则", `${basePath}/images/strength-icons/strength-1.webp`, `${basePath}/images/strength-icons/strength-1-green.webp`],
  ["低代码产品设计", "熟悉表单、列表、子表、组件属性、页面模板、配置面板等低代码核心能力", `${basePath}/images/strength-icons/strength-2.webp`, `${basePath}/images/strength-icons/strength-2-green.webp`],
  ["AI 产品 0-1 落地", "设计 RAG 问答、Workflow、Agent Skill、人机协同审核等 AI 产品方案", `${basePath}/images/strength-icons/strength-3.webp`, `${basePath}/images/strength-icons/strength-3-green.webp`],
  ["技术理解与研发协同", "能阅读 API 文档，理解前后端实现约束，与研发对齐方案边界和排期风险", `${basePath}/images/strength-icons/strength-4.webp`, `${basePath}/images/strength-icons/strength-4-green.webp`],
  ["数据驱动迭代", "基于工单、Bad Case、问答日志、采纳率和重复咨询问题推动持续优化", `${basePath}/images/strength-icons/strength-5.webp`, `${basePath}/images/strength-icons/strength-5-green.webp`]
];

export const timeline = [
  ["2016.01 - 2019.06", "易联通达", "交互设计师", "负责新能源充电场景下 APP、车载端与数据大屏的交互设计与信息展示优化。"],
  ["2019.06 - 2021.08", "基本立子", "产品设计师", "负责物联网设备监控、工程流程数字化产品的需求分析、流程设计、监控看板与异常处置链路方案。"],
  ["2021.09 - 至今", "用友网络", "产品经理", "负责云平台低代码 Web / 移动组件产品规划、需求评审、方案输出、研发协同、测试验证与上线推进"]
];
