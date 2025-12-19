"use client";

import { CheckCircle2, Clock, Ticket } from "lucide-react";

export default function PerformancePage() {
  // Dummy data statis
  const stats = {
    totalHandled: 45,
    totalClosed: 42,
    avgResponseTime: "12 Menit",
  };

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">My Performance</h1>
        <p className="page-subtitle">Metrik kinerja dan statistik penyelesaian tiket Anda.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        <StatCard 
          label="Total Tickets Handled" 
          value={stats.totalHandled.toString()} 
          icon={<Ticket size={24} color="#2563eb" />} 
          bg="#eff6ff" 
        />
        <StatCard 
          label="Tickets Closed" 
          value={stats.totalClosed.toString()} 
          icon={<CheckCircle2 size={24} color="#16a34a" />} 
          bg="#f0fdf4" 
        />
        <StatCard 
          label="Avg Response Time" 
          value={stats.avgResponseTime} 
          icon={<Clock size={24} color="#ca8a04" />} 
          bg="#fefce8" 
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, bg }: { label: string; value: string; icon: React.ReactNode; bg: string }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem" }}>
      <div style={{ 
        width: "56px", height: "56px", borderRadius: "12px", backgroundColor: bg, 
        display: "flex", alignItems: "center", justifyContent: "center" 
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "0.25rem", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a" }}>{value}</div>
      </div>
    </div>
  );
}