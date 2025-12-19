"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Shield, Calendar, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data user dari session
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Unauthorized");
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        // Jika gagal (misal session habis), redirect ke login
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div style={{ padding: 32 }} className="page-animate">
        <h1 className="page-title">My Profile</h1>
        <div className="card">
          <p style={{ color: "#64748b" }}>Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <h1 className="page-title" >My Profile</h1>
      
      <div className="card" style={{ maxWidth: "600px" }} >
        {/* Header Profile */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "1.5rem", 
          paddingBottom: "2rem", 
          marginBottom: "2rem", 
          borderBottom: "1px solid #f1f5f9" 
        }}>
          <div style={{ 
            width: "80px", 
            height: "80px", 
            borderRadius: "50%", 
            backgroundColor: "#f1f5f9", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "#64748b"
          }}>
            <User size={40} />
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "#0f172a" }}>
              {user.name || user.email.split("@")[0]}
            </h2>
            <span style={{ 
              display: "inline-block", 
              padding: "0.25rem 0.75rem", 
              borderRadius: "9999px", 
              fontSize: "0.75rem", 
              fontWeight: 600, 
              backgroundColor: "#e0f2fe", 
              color: "#0284c7",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              {user.role}
            </span>
          </div>
        </div>

        {/* Details List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <ProfileItem 
            icon={<Mail size={18} />} 
            label="Email Address" 
            value={user.email} 
          />
          <ProfileItem 
            icon={<Shield size={18} />} 
            label="Account Role" 
            value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
          />
          <ProfileItem 
            icon={<Calendar size={18} />} 
            label="Member Since" 
            value={new Date().toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })} 
          />
        </div>

        {/* Logout Button */}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
          <button 
            onClick={handleLogout}
            className="btn-primary"
            style={{ backgroundColor: "#ef4444", borderColor: "#ef4444", width: "100%", justifyContent: "center" }}
          >
            <LogOut size={18} style={{ marginRight: "0.5rem" }} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
      <div style={{ marginTop: "2px", color: "#94a3b8" }}>{icon}</div>
      <div>
        <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.25rem" }}>{label}</div>
        <div style={{ fontSize: "1rem", fontWeight: 500, color: "#1e293b" }}>{value}</div>
      </div>
    </div>
  );
}
