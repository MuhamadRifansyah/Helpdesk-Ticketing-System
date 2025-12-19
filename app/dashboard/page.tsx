
export default function DashboardPage() {
  return (
    <div style={{ padding: 40 }} className="page-animate">
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Dashboard</h1>
      <p style={{ color: "#64748b", marginBottom: 32 }}>
        Helpdesk system overview
      </p>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          marginBottom: 40,
        }}
      >
        <StatCard title="Total Tickets" value="120" color="#2563eb" />
        <StatCard title="Open" value="35" color="#dc2626" />
        <StatCard title="In Progress" value="20" color="#ca8a04" />
        <StatCard title="Closed" value="65" color="#16a34a" />
      </div>

      {/* BOTTOM SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
        }}
      >
        <RecentActivity />
        <StatusProgress />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="page-animate"
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${color}`,
      }}
    >
      <p style={{ color: "#64748b", marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 32, fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    "TCK-001 created by User",
    "TCK-002 moved to In Progress",
    "TCK-003 closed successfully",
    "User reset password",
  ];

  return (
    <div style={cardStyle} className="page-animate">
      <h3 style={cardTitle}>Recent Activity</h3>
      <ul style={{ paddingLeft: 18 }}>
        {activities.map((a, i) => (
          <li key={i} style={{ marginBottom: 10, color: "#334155" }}>
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusProgress() {
  return (
    <div style={cardStyle}>
      <h3 style={cardTitle}>Ticket Progress</h3>

      <Progress label="Open" percent={29} color="#dc2626" />
      <Progress label="In Progress" percent={17} color="#ca8a04" />
      <Progress label="Closed" percent={54} color="#16a34a" />
    </div>
  );
}

function Progress({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div
        style={{
          height: 10,
          background: "#e5e7eb",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const cardTitle = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
};
