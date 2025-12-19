"use client";

import { CircleHelp, Mail, Phone, ExternalLink } from "lucide-react";

export default function HelpPage() {
  return (
    <div style={{ padding: 32 }} className="page-animate">
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">Help Center</h1>
        <p className="page-subtitle">
          Pusat bantuan dan informasi kontak support.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {/* FAQ Section */}
        <div className="card" style={{ height: "fit-content" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ background: "#eff6ff", padding: "8px", borderRadius: "8px", color: "#2563eb" }}>
              <CircleHelp size={24} />
            </div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <FaqItem
              question="Bagaimana cara membuat tiket baru?"
              answer="Navigasi ke menu 'Create Ticket' di sidebar, isi formulir dengan detail masalah Anda, dan klik Submit."
            />
            <FaqItem
              question="Berapa lama waktu respon?"
              answer="Standard SLA kami adalah 1x24 jam untuk respon pertama pada hari kerja (Senin - Jumat)."
            />
            <FaqItem
              question="Apakah tiket bisa diedit?"
              answer="Demi integritas data, tiket yang sudah disubmit tidak dapat diubah. Silakan tambahkan komentar atau buat tiket baru jika ada kesalahan fatal."
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="card" style={{ height: "fit-content" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ background: "#f0fdf4", padding: "8px", borderRadius: "8px", color: "#16a34a" }}>
              <Phone size={24} />
            </div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>Contact Support</h2>
          </div>
          
          <p style={{ color: "#64748b", marginBottom: "1.5rem", lineHeight: "1.6" }}>
            Jika Anda membutuhkan bantuan mendesak atau masalah teknis yang kompleks, silakan hubungi tim IT Support kami secara langsung.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ContactItem icon={<Mail size={18} />} label="Email Support" value="support@helpdesk.local" />
            <ContactItem icon={<Phone size={18} />} label="Call Center" value="(021) 555-0123" />
            <ContactItem icon={<ExternalLink size={18} />} label="Knowledge Base" value="wiki.helpdesk.local" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem", color: "#1e293b" }}>{question}</h3>
      <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.6 }}>{answer}</p>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#475569" }}>
        {icon}
        <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{label}</span>
      </div>
      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0f172a" }}>{value}</span>
    </div>
  );
}