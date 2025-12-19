"use client";

import { BarChart3, PieChart } from "lucide-react";

export default function ReportsPage() {
  // Dummy Data untuk Analytics
  const agentStats = [
    { name: "Agent Sarah", closed: 45, target: 50 },
    { name: "Agent Budi", closed: 32, target: 50 },
    { name: "Agent John", closed: 28, target: 50 },
    { name: "Agent Dewi", closed: 15, target: 50 },
  ];

  const statusStats = [
    { status: "Open", count: 12, color: "#3b82f6" },       // Blue
    { status: "In Progress", count: 8, color: "#eab308" }, // Yellow
    { status: "Closed", count: 120, color: "#22c55e" },    // Green
  ];

  // Helper untuk kalkulasi persentase bar
  const maxClosed = Math.max(...agentStats.map(a => a.closed));
  const totalTickets = statusStats.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-subtitle">Ringkasan performa tim dan distribusi tiket operasional.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
        
        {/* CHART 1: Closed per Agent (Productivity) */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ background: "#eff6ff", padding: "8px", borderRadius: "8px", color: "#2563eb" }}>
              <BarChart3 size={24} />
            </div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Tickets Closed per Agent</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {agentStats.map((agent) => (
              <div key={agent.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  <span style={{ fontWeight: 500, color: "#1e293b" }}>{agent.name}</span>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>{agent.closed} <span style={{ fontWeight: 400, fontSize: "0.8rem" }}>/ {agent.target}</span></span>
                </div>
                {/* Bar Background */}
                <div style={{ width: "100%", height: "8px", backgroundColor: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                  {/* Bar Fill */}
                  <div style={{ 
                    width: `${(agent.closed / 50) * 100}%`, // Asumsi target max 50 untuk visualisasi
                    height: "100%", 
                    backgroundColor: "#3b82f6", 
                    borderRadius: "4px" 
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 2: Ticket Status Distribution (Operational Health) */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ background: "#f0fdf4", padding: "8px", borderRadius: "8px", color: "#16a34a" }}>
              <PieChart size={24} />
            </div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Ticket Status Distribution</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {statusStats.map((item) => (
              <div key={item.status}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  <span style={{ fontWeight: 500, color: "#1e293b" }}>{item.status}</span>
                  <span style={{ color: "#64748b" }}>{item.count} tickets</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                   <div style={{ flex: 1, height: "10px", backgroundColor: "#f1f5f9", borderRadius: "6px", overflow: "hidden" }}>
                    <div style={{ 
                      width: `${(item.count / totalTickets) * 100}%`, 
                      height: "100%", 
                      backgroundColor: item.color, 
                      borderRadius: "6px" 
                    }} />
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "#64748b", minWidth: "35px", textAlign: "right", fontWeight: 500 }}>
                    {Math.round((item.count / totalTickets) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}