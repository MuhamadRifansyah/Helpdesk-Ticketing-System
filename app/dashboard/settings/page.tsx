"use client";

import { useState } from "react";
import { Save, Monitor, Clock, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  const [systemName, setSystemName] = useState("Helpdesk Ticketing System");
  const [slaResponse, setSlaResponse] = useState("24");
  const [theme, setTheme] = useState("light");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved (Dummy)!");
  };

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">System Settings</h1>
        <p className="page-subtitle">Konfigurasi global aplikasi dan parameter operasional.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px" }}>
        
        {/* General Settings */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ background: "#f1f5f9", padding: "8px", borderRadius: "8px", color: "#475569" }}>
              <SettingsIcon size={24} />
            </div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>General Information</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>System Name</label>
              <input 
                type="text" 
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
              />
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>Nama yang akan tampil di header dan email notifikasi.</p>
            </div>
          </div>
        </div>

        {/* SLA Settings */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ background: "#fefce8", padding: "8px", borderRadius: "8px", color: "#ca8a04" }}>
              <Clock size={24} />
            </div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Service Level Agreement (SLA)</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Response Time Target (Hours)</label>
              <input 
                type="number" 
                value={slaResponse}
                onChange={(e) => setSlaResponse(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Resolution Time Target (Hours)</label>
              <input 
                type="number" 
                defaultValue="48"
                style={{ width: "100%", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
              />
            </div>
          </div>
        </div>

        {/* Appearance (Future) */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ background: "#f3e8ff", padding: "8px", borderRadius: "8px", color: "#9333ea" }}>
              <Monitor size={24} />
            </div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Appearance</h2>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.75rem", fontSize: "0.9rem", fontWeight: 500 }}>Theme Preference</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input 
                  type="radio" 
                  name="theme" 
                  value="light" 
                  checked={theme === "light"} 
                  onChange={() => setTheme("light")}
                />
                <span>Light Mode</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", opacity: 0.6 }}>
                <input 
                  type="radio" 
                  name="theme" 
                  value="dark" 
                  disabled
                />
                <span>Dark Mode (Coming Soon)</span>
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn-primary" style={{ padding: "0.75rem 2rem" }}>
            <Save size={18} style={{ marginRight: "0.5rem" }} /> Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}
