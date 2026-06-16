import { Work } from "@/data/works";

type MockEnterpriseScreenProps = {
  work?: Work;
  compact?: boolean;
  floating?: boolean;
};

export function MockEnterpriseScreen({ work, compact = false, floating = false }: MockEnterpriseScreenProps) {
  const tone = work?.tone ?? "lime";
  const screenKind = work?.id ?? "overview";
  const kpis = getScreenKpis(work);
  return (
    <div className={`enterprise-screen tone-${tone} screen-${screenKind} ${compact ? "screen-compact" : ""} ${floating ? "screen-floating" : ""}`}>
      <div className="screen-sidebar">
        <span className="screen-logo" />
        {Array.from({ length: 7 }).map((_, index) => (
          <span key={index} className={`screen-nav-dot ${index === 1 ? "active" : ""}`} />
        ))}
      </div>
      <div className="screen-body">
        <div className="screen-topbar">
          <div>
            <span className="screen-label">{work?.title ?? "企业经营总览"}</span>
            <strong>{work?.subtitle ?? "多业务系统实时协同"}</strong>
          </div>
          <div className="screen-status">
            <span />
            LIVE OPS
          </div>
        </div>
        <div className="kpi-grid">
          {kpis.map(([label, value]) => (
            <div className="kpi-card" key={label}>
              <small>{label}</small>
              <b>{value}</b>
            </div>
          ))}
        </div>
        <ScreenMain workId={work?.id ?? "erp"} />
      </div>
    </div>
  );
}

function getScreenKpis(work?: Work): [string, string][] {
  if (work?.id === "crm") {
    return [
      ["客户数", "6,842"],
      ["商机", "428"],
      ["转化率", "72%"],
      ["回款", "¥812万"]
    ];
  }

  if (work?.id === "hr") {
    return [
      ["在职人数", "1,286"],
      ["招聘中", "28"],
      ["出勤率", "96%"],
      ["人效", "64%"]
    ];
  }

  if (work?.id === "oa") {
    return [
      ["待办", "128"],
      ["流程", "2,034"],
      ["通过率", "91%"],
      ["文档", "8,412"]
    ];
  }

  return [
    ["流程效率", "32.7%"],
    ["进行中", "2,034"],
    ["达成率", work?.metric ?? "86%"],
    ["资产数", "8,412"]
  ];
}

function ScreenMain({ workId }: { workId: string }) {
  if (workId === "crm") return <CrmScreenMain />;
  if (workId === "hr") return <HrScreenMain />;
  if (workId === "oa") return <OaScreenMain />;
  return <OverviewScreenMain />;
}

function OverviewScreenMain() {
  return (
    <div className="screen-main-grid overview-grid">
      <div className="chart-panel line-panel">
        <div className="panel-head">
          <span>业务趋势</span>
          <i />
        </div>
        <svg viewBox="0 0 240 92" className="line-chart" aria-hidden="true">
          <path d="M8 76 C30 42, 48 62, 66 35 S105 32, 124 51 S158 80, 178 40 S213 22, 232 28" />
          <path d="M8 66 C38 58, 48 34, 72 45 S110 71, 133 36 S170 21, 188 44 S215 72, 232 46" />
        </svg>
      </div>
      <div className="chart-panel donut-panel">
        <div className="donut" />
        <div className="donut-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="chart-panel table-panel">
        {["需求池", "合同审批", "库存预警", "项目看板"].map((row, index) => (
          <div className="mock-row" key={row}>
            <span>{row}</span>
            <i style={{ width: `${62 + index * 9}%` }} />
            <b>{index % 2 ? "进行中" : "已同步"}</b>
          </div>
        ))}
      </div>
      <div className="chart-panel bar-panel">
        {[42, 72, 56, 86, 63, 94, 68].map((height, index) => (
          <span key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

function CrmScreenMain() {
  return (
    <div className="screen-main-grid crm-grid">
      <div className="chart-panel crm-funnel-panel">
        {[86, 68, 52, 36].map((width, index) => (
          <span key={width} style={{ width: `${width}%` }}>
            <i />
            <b>{["线索", "商机", "报价", "成交"][index]}</b>
          </span>
        ))}
      </div>
      <div className="chart-panel crm-avatar-panel">
        {["A", "B", "C", "D"].map((item, index) => (
          <span key={item} style={{ ["--avatar-index" as string]: index }} />
        ))}
      </div>
      <div className="chart-panel crm-list-panel">
        {["重点客户", "续约跟进", "回款确认"].map((row, index) => (
          <div className="mock-row" key={row}>
            <span>{row}</span>
            <i style={{ width: `${72 - index * 12}%` }} />
            <b>{index === 0 ? "高" : "中"}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function HrScreenMain() {
  return (
    <div className="screen-main-grid hr-grid">
      <div className="chart-panel org-panel">
        <span className="org-node root" />
        <span className="org-node node-a" />
        <span className="org-node node-b" />
        <span className="org-node node-c" />
        <i />
      </div>
      <div className="chart-panel hr-bars-panel">
        {[82, 58, 74, 44].map((width, index) => (
          <span key={width} style={{ width: `${width}%`, ["--bar-index" as string]: index }} />
        ))}
      </div>
      <div className="chart-panel hr-roster-panel">
        {["招聘", "绩效", "考勤"].map((row, index) => (
          <div className="mock-row" key={row}>
            <span>{row}</span>
            <i style={{ width: `${58 + index * 12}%` }} />
            <b>{index === 1 ? "评估" : "正常"}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function OaScreenMain() {
  return (
    <div className="screen-main-grid oa-grid">
      <div className="chart-panel flow-panel">
        {["提交", "审核", "会签", "归档"].map((item, index) => (
          <span key={item} style={{ ["--flow-index" as string]: index }}>
            <i />
            <b>{item}</b>
          </span>
        ))}
      </div>
      <div className="chart-panel task-stack-panel">
        {[0, 1, 2].map((item) => (
          <span key={item} />
        ))}
      </div>
      <div className="chart-panel oa-timeline-panel">
        {["审批通过", "待补充", "已抄送"].map((row, index) => (
          <div className="mock-row" key={row}>
            <span>{row}</span>
            <i style={{ width: `${70 - index * 10}%` }} />
            <b>{index === 1 ? "待办" : "完成"}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
