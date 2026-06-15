import { Work } from "@/data/works";

type MockEnterpriseScreenProps = {
  work?: Work;
  compact?: boolean;
  floating?: boolean;
};

export function MockEnterpriseScreen({ work, compact = false, floating = false }: MockEnterpriseScreenProps) {
  const tone = work?.tone ?? "lime";
  return (
    <div className={`enterprise-screen tone-${tone} ${compact ? "screen-compact" : ""} ${floating ? "screen-floating" : ""}`}>
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
          {["32.7%", "2,034", work?.metric ?? "86%", "8,412"].map((value, index) => (
            <div className="kpi-card" key={value}>
              <small>{["流程效率", "进行中", "达成率", "资产数"][index]}</small>
              <b>{value}</b>
            </div>
          ))}
        </div>
        <div className="screen-main-grid">
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
      </div>
    </div>
  );
}
