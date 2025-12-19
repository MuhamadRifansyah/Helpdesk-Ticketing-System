"use client";

import { useEffect, useState } from "react";
import { Inbox, Filter, Clock, AlertCircle, CheckCircle2, X } from "lucide-react";

type Ticket = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  assignedTo?: string;
};

export default function AssignedTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "in-progress">("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    // Simulasi fetch data
    const loadTickets = () => {
      // Mock data (Nanti diganti API)
      const mockTickets: Ticket[] = [
        {
          id: "T-101",
          title: "Printer macet di lantai 2",
          description: "Kertas nyangkut terus setiap kali print dokumen tebal.",
          status: "in-progress",
          priority: "medium",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 jam lalu
          assignedTo: "agent@local",
        },
        {
          id: "T-102",
          title: "Email outlook tidak bisa dibuka",
          description: "Muncul error connection timeout saat buka outlook.",
          status: "open",
          priority: "high",
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 menit lalu
          assignedTo: "agent@local",
        },
        {
          id: "T-103",
          title: "Request install Adobe Photoshop",
          description: "Untuk keperluan tim desain marketing.",
          status: "closed",
          priority: "low",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 hari lalu
          assignedTo: "agent@local",
        },
         {
          id: "T-104",
          title: "Wifi lambat di ruang meeting",
          description: "Sinyal putus nyambung.",
          status: "open",
          priority: "high",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          assignedTo: "other@local",
        },
      ];

      // 1. Filter hanya yang assigned ke current agent (simulasi agent@local)
      const myTickets = mockTickets.filter(t => t.assignedTo === "agent@local");
      
      // 2. Sort terbaru (Newest first)
      myTickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setTickets(myTickets);
      setLoading(false);
    };

    loadTickets();
  }, []);

  // Filter tampilan berdasarkan status yang dipilih
  const filteredTickets = tickets.filter(ticket => {
    if (filterStatus === "all") return ticket.status === "open" || ticket.status === "in-progress";
    return ticket.status === filterStatus;
  });

  const handleUpdateStatus = (status: "open" | "in-progress" | "closed") => {
    if (!selectedTicket) return;
    
    setTickets((prev) => 
      prev.map((t) => (t.id === selectedTicket.id ? { ...t, status } : t))
    );
    setSelectedTicket(null);
  };

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">Assigned Tickets</h1>
        <p className="page-subtitle">Tiket yang ditugaskan kepada Anda untuk diselesaikan.</p>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748b", fontWeight: 500 }}>
          <Filter size={18} /> Filter:
        </div>
        <button 
          onClick={() => setFilterStatus("all")}
          className={`badge ${filterStatus === "all" ? "badge-primary" : "badge-outline"}`}
          style={{ cursor: "pointer", border: filterStatus === "all" ? "none" : "1px solid #cbd5e1", background: filterStatus === "all" ? "#2563eb" : "transparent", color: filterStatus === "all" ? "white" : "#64748b" }}
        >
          All Active
        </button>
        <button 
          onClick={() => setFilterStatus("open")}
          className="badge"
          style={{ cursor: "pointer", border: "1px solid #cbd5e1", background: filterStatus === "open" ? "#eff6ff" : "transparent", color: filterStatus === "open" ? "#2563eb" : "#64748b" }}
        >
          Open
        </button>
        <button 
          onClick={() => setFilterStatus("in-progress")}
          className="badge"
          style={{ cursor: "pointer", border: "1px solid #cbd5e1", background: filterStatus === "in-progress" ? "#fefce8" : "transparent", color: filterStatus === "in-progress" ? "#ca8a04" : "#64748b" }}
        >
          In Progress
        </button>
      </div>

      {/* Ticket List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {loading ? (
          <p style={{ color: "#94a3b8" }}>Loading tickets...</p>
        ) : filteredTickets.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <Inbox size={48} style={{ margin: "0 auto 1rem", color: "#cbd5e1" }} />
            <h3 style={{ color: "#475569", marginBottom: "0.5rem" }}>No tickets found</h3>
            <p style={{ color: "#94a3b8" }}>Tidak ada tiket dengan status {filterStatus} yang ditugaskan ke Anda.</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div key={ticket.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 600, color: "#2563eb" }}>{ticket.id}</span>
                  <span style={{ 
                    display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize",
                    backgroundColor: ticket.status === "open" ? "#eff6ff" : "#fefce8",
                    color: ticket.status === "open" ? "#2563eb" : "#ca8a04"
                  }}>
                    {ticket.status === "open" ? <AlertCircle size={12} /> : <Clock size={12} />} {ticket.status.replace("-", " ")}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Clock size={14} /> {new Date(ticket.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.25rem" }}>{ticket.title}</h3>
                <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>{ticket.description}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                 <button 
                   className="btn-primary" 
                   style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                   onClick={() => setSelectedTicket(ticket)}
                 >
                   Update Status
                 </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Update Status */}
      {selectedTicket && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", 
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50
        }}>
          <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Update Status</h3>
              <button 
                onClick={() => setSelectedTicket(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ marginBottom: "1.5rem", color: "#64748b", fontSize: "0.95rem" }}>
              Pilih status baru untuk tiket <strong>{selectedTicket.id}</strong>:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <StatusOption 
                label="Open" 
                active={selectedTicket.status === "open"} 
                onClick={() => handleUpdateStatus("open")}
                color="#2563eb"
                bgColor="#eff6ff"
              />
              <StatusOption 
                label="In Progress" 
                active={selectedTicket.status === "in-progress"} 
                onClick={() => handleUpdateStatus("in-progress")}
                color="#ca8a04"
                bgColor="#fefce8"
              />
              <StatusOption 
                label="Closed" 
                active={selectedTicket.status === "closed"} 
                onClick={() => handleUpdateStatus("closed")}
                color="#16a34a"
                bgColor="#f0fdf4"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusOption({ label, active, onClick, color, bgColor }: { label: string, active: boolean, onClick: () => void, color: string, bgColor: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
        border: active ? `1px solid ${color}` : "1px solid #e2e8f0",
        backgroundColor: active ? bgColor : "white",
        cursor: "pointer",
        textAlign: "left",
        fontSize: "0.95rem",
        fontWeight: 500,
        color: active ? color : "#1e293b",
        transition: "all 0.2s"
      }}
    >
      {label}
      {active && <CheckCircle2 size={18} />}
    </button>
  );
}