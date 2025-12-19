"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Eye, 
  Pencil, 
  Trash2, 
  Plus, 
  Lock,
  AlertCircle,
  Clock,
  CheckCircle2,
  X
} from "lucide-react";

type Ticket = {
  id: string;
  title: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  description: string;
};

type User = {
  email: string;
  role: "admin" | "agent" | "user";
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [viewTicket, setViewTicket] = useState<Ticket | null>(null);
  const [editTicket, setEditTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const initData = async () => {
      try {
        // 1. Cek User Session
        const resUser = await fetch("/api/auth/me");
        if (!resUser.ok) throw new Error("Unauthorized");
        const userData = await resUser.json();
        setUser(userData);

        // 2. Mock Data Tickets
        const mockTickets: Ticket[] = [
          {
            id: "T-101",
            title: "Printer macet di lantai 2",
            status: "in-progress",
            priority: "medium",
            assignedTo: "agent@local",
            createdBy: "user@local",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            description: "Kertas nyangkut terus setiap kali print dokumen tebal lebih dari 10 halaman.",
          },
          {
            id: "T-102",
            title: "Email outlook tidak bisa dibuka",
            status: "open",
            priority: "high",
            assignedTo: "agent@local",
            createdBy: "boss@local",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            description: "Muncul error connection timeout saat buka outlook di laptop utama.",
          },
          {
            id: "T-103",
            title: "Request install Adobe Photoshop",
            status: "closed",
            priority: "low",
            assignedTo: "agent@local",
            createdBy: "design@local",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            description: "Mohon diinstall Adobe Photoshop CC 2024 untuk keperluan tim desain marketing.",
          },
          {
            id: "T-104",
            title: "Wifi lambat di ruang meeting",
            status: "open",
            priority: "high",
            assignedTo: "other@local", // Tiket milik agent lain
            createdBy: "guest@local",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            description: "Sinyal wifi di ruang meeting lantai 3 putus nyambung saat video call.",
          },
        ];

        // 3. Filter Logic berdasarkan Role
        let finalTickets = mockTickets;
        if (userData.role === "user") {
          // User hanya lihat tiket buatannya sendiri (disimulasikan dengan createdBy atau email)
          // Karena ini mock, kita anggap user@local melihat semua yg createdBy dia, 
          // tapi untuk demo kita tampilkan sebagian saja agar terlihat bedanya.
          finalTickets = mockTickets.filter(t => t.createdBy === userData.email || t.createdBy === "user@local");
        }
        // Agent & Admin melihat SEMUA tiket (All Tickets)

        setTickets(finalTickets);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // Helper Permissions
  const canCreate = user?.role === "user"; // Hanya user yang create (sesuai prompt agent tidak bisa create)
  const canDelete = user?.role === "admin";
  const canEdit = (ticket: Ticket) => {
    if (user?.role === "admin") return true;
    if (user?.role === "agent") return ticket.assignedTo === user?.email; // Agent hanya bisa edit milik sendiri
    return false; // User tidak bisa edit status
  };

  // Filter Tampilan
  const filteredTickets = tickets.filter(t => {
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this ticket? This action cannot be undone.")) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTicket) return;
    setTickets((prev) =>
      prev.map((t) => (t.id === editTicket.id ? editTicket : t))
    );
    setEditTicket(null);
  };

  if (loading) return <div style={{ padding: 32 }}>Loading tickets...</div>;

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 className="page-title">
            {user?.role === "user" ? "My Tickets" : "All Tickets"}
          </h1>
          <p className="page-subtitle">
            {user?.role === "user" 
              ? "Daftar laporan masalah yang Anda kirimkan." 
              : "Daftar semua tiket masuk dari seluruh user."}
          </p>
        </div>
        {canCreate && (
          <Link href="/dashboard/tickets/create" className="btn-primary">
            <Plus size={18} style={{ marginRight: "0.5rem" }} /> Create Ticket
          </Link>
        )}
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "1rem", borderBottom: "1px solid #e2e8f0", display: "flex", gap: "1rem", alignItems: "center", backgroundColor: "#f8fafc" }}>
          <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
            <Search size={16} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.5rem 0.5rem 0.5rem 2.25rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", backgroundColor: "white" }}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
              <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>ID</th>
              <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Subject</th>
              <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Assigned To</th>
              <th style={{ padding: "1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem", fontWeight: 600, color: "#2563eb" }}>{ticket.id}</td>
                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: 500, color: "#1e293b" }}>{ticket.title}</div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Created {new Date(ticket.createdAt).toLocaleDateString()}</div>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span style={{ 
                    display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize",
                    backgroundColor: ticket.status === "open" ? "#eff6ff" : ticket.status === "in-progress" ? "#fefce8" : "#f1f5f9",
                    color: ticket.status === "open" ? "#2563eb" : ticket.status === "in-progress" ? "#ca8a04" : "#64748b"
                  }}>
                    {ticket.status === "open" ? <AlertCircle size={12} /> : ticket.status === "in-progress" ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                    {ticket.status.replace("-", " ")}
                  </span>
                </td>
                <td style={{ padding: "1rem", color: "#64748b", fontSize: "0.9rem" }}>
                  {ticket.assignedTo}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                    {/* View Button (Semua Role) */}
                    <button 
                      onClick={() => setViewTicket(ticket)}
                      className="btn-icon" 
                      style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", color: "#64748b" }} 
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Edit Button (Conditional) */}
                    {canEdit(ticket) ? (
                      <button 
                        onClick={() => setEditTicket(ticket)}
                        className="btn-icon" style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", color: "#2563eb" }} title="Edit Ticket"
                      >
                        <Pencil size={16} />
                      </button>
                    ) : user?.role === "agent" && (
                      // Tampilkan Lock icon jika agent melihat tiket orang lain
                      <button disabled style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #f1f5f9", background: "#f8fafc", cursor: "not-allowed", color: "#cbd5e1" }} title="Locked (Not Assigned to You)">
                        <Lock size={16} />
                      </button>
                    )}

                    {/* Delete Button (Admin Only) */}
                    {canDelete && (
                      <button 
                        onClick={() => handleDelete(ticket.id)}
                        className="btn-icon" style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #fee2e2", background: "#fef2f2", cursor: "pointer", color: "#ef4444" }} title="Delete Ticket"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTickets.length === 0 && (
          <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>
            No tickets found.
          </div>
        )}
      </div>

      {/* MODAL VIEW DETAIL */}
      {viewTicket && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div className="card" style={{ width: "100%", maxWidth: "500px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Ticket Details</h3>
              <button onClick={() => setViewTicket(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Subject</label>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "#1e293b" }}>{viewTicket.title}</div>
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Description</label>
                <div style={{ fontSize: "0.95rem", color: "#334155", lineHeight: "1.5", backgroundColor: "#f8fafc", padding: "0.75rem", borderRadius: "6px", marginTop: "0.25rem" }}>{viewTicket.description}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Status</label>
                  <div style={{ textTransform: "capitalize", fontWeight: 500 }}>{viewTicket.status}</div>
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Priority</label>
                  <div style={{ textTransform: "capitalize", fontWeight: 500 }}>{viewTicket.priority}</div>
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Assigned To</label>
                  <div>{viewTicket.assignedTo}</div>
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Created By</label>
                  <div>{viewTicket.createdBy}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT TICKET */}
      {editTicket && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div className="card" style={{ width: "100%", maxWidth: "450px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Edit Ticket</h3>
              <button onClick={() => setEditTicket(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Status</label>
                <select 
                  value={editTicket.status}
                  onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value as any })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Priority</label>
                <select 
                  value={editTicket.priority}
                  onChange={(e) => setEditTicket({ ...editTicket, priority: e.target.value as any })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Assigned To</label>
                <input 
                  type="text"
                  value={editTicket.assignedTo}
                  onChange={(e) => setEditTicket({ ...editTicket, assignedTo: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setEditTicket(null)} className="btn-secondary" style={{ background: "transparent", border: "1px solid #cbd5e1", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: "0.5rem 1.5rem" }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
