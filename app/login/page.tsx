"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Email atau password salah.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8fafc", // Slate-50
      padding: "1rem"
    }}>
      <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="page-title" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Sign in to access your dashboard</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#fee2e2",
            color: "#ef4444",
            padding: "0.75rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "#334155" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "#334155" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
                  outline: "none"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              justifyContent: "center",
              padding: "0.875rem",
              fontSize: "1rem",
              fontWeight: 600
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem" }}>Demo Credentials:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", color: "#475569" }}>admin@mail.com</span>
            <span style={{ background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", color: "#475569" }}>agent@mail.com</span>
            <span style={{ background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", color: "#475569" }}>user@mail.com</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.5rem" }}>Password: <strong>123</strong></p>
        </div>
      </div>
    </div>
  );
}
