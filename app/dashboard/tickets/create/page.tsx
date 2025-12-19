"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTicketPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // dummy submit (nanti ke backend)
    console.log({
      title,
      description,
      category,
    });

    // redirect ke tickets list
    router.push("/dashboard/tickets");
  }

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <h1 className="page-title">Create Ticket</h1>
      <p className="page-subtitle">
        Describe your issue so we can help you
      </p>

      <div className="card" style={{ maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              placeholder="Short summary of your issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* CATEGORY */}
          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>General</option>
              <option>Login</option>
              <option>Billing</option>
              <option>Technical</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: 24 }}>
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Explain your problem in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>

          <button className="btn-primary" type="submit">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
