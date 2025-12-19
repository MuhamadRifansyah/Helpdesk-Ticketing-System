"use client";

import { useEffect, useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Admin System",
    email: "admin@helpdesk.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Support Agent",
    email: "agent@helpdesk.com",
    role: "agent",
    status: "active",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@mail.com",
    role: "user",
    status: "inactive",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<typeof usersData>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setUsers(usersData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ padding: 32 }} className="page-animate">
      <h1 className="page-title">Users</h1>
      <p className="page-subtitle">Manage helpdesk users</p>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td>
                      <div className="skeleton skeleton-row" />
                    </td>
                    <td>
                      <div className="skeleton skeleton-row" />
                    </td>
                    <td>
                      <div className="skeleton skeleton-badge" />
                    </td>
                    <td>
                      <div className="skeleton skeleton-badge" />
                    </td>
                  </tr>
                ))
              : users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <strong>{u.name}</strong>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge badge-${u.role}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${u.status}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
