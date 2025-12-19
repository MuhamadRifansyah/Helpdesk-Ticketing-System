"use client";

import Link from "next/link";
import { use, useState } from "react";

type Status = "open" | "in-progress" | "closed";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function TicketDetailPage({ params }: PageProps) {
  const { id } = use(params); // ✅ FIX NEXT 16

  const [status, setStatus] = useState<Status>("open");

  const ticket = {
    id,
    title: "Login error",
    description:
      "User cannot login to the system using correct credentials. The issue happens on multiple browsers and devices.",
    createdAt: "2025-01-15",
    reporter: "John Doe",
  };

  function handleChangeStatus() {
    if (status === "open") setStatus("in-progress");
    else if (status === "in-progress") setStatus("closed");
  }

  function statusLabel(s: Status) {
    if (s === "in-progress") return "In Progress";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <div style={{ padding: 32 }} className="page-animate">
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 className="page-title">{ticket.title}</h1>
          <p className="page-subtitle">
            Ticket ID: <strong>{ticket.id}</strong>
          </p>
        </div>

        <span className={`badge badge-${status.replace("-", "")}`}>
          {statusLabel(status)}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Description</h3>
        <p style={{ lineHeight: 1.6 }}>{ticket.description}</p>
      </div>

      {/* META INFO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <Meta label="Reporter" value={ticket.reporter} />
        <Meta label="Created At" value={ticket.createdAt} />
        <Meta label="Current Status" value={statusLabel(status)} />
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: 16 }}>
        {status !== "closed" && (
          <button
            onClick={handleChangeStatus}
            className="btn-primary"
          >
            {status === "open"
              ? "Start Progress"
              : "Close Ticket"}
          </button>
        )}

        <Link href="/dashboard/tickets" className="link">
          ← Back to Tickets
        </Link>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p style={{ color: "#64748b", fontSize: 14 }}>{label}</p>
      <p style={{ fontWeight: 600 }}>{value}</p>
    </div>
  );
}
