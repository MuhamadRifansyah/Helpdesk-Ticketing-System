"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  Users,
  PlusCircle,
  User,
  CircleHelp,
  Inbox,
  BarChart,
  Settings,
  LineChart,
} from "lucide-react";

type Role = "admin" | "agent" | "user";

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setRole(data?.role ?? "user");
        setLoading(false);
      })
      .catch(() => {
        setRole("user");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <aside className="sidebar">
        <div className="sidebar-brand">Helpdesk</div>
        <p style={{ color: "#94a3b8", fontSize: 14 }}>
          Loading menu...
        </p>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">Helpdesk</div>

      <nav className="sidebar-nav">
        {/* ADMIN */}
        {role === "admin" && (
          <>
            <SidebarLink
              href="/dashboard"
              active={pathname === "/dashboard"}
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
            />
            <SidebarLink
              href="/dashboard/tickets"
              active={pathname.startsWith("/dashboard/tickets")}
              icon={<Ticket size={18} />}
              label="Tickets"
            />
            <SidebarLink
              href="/dashboard/users"
              active={pathname.startsWith("/dashboard/users")}
              icon={<Users size={18} />}
              label="Users"
            />
            <SidebarLink
              href="/dashboard/reports"
              active={pathname.startsWith("/dashboard/reports")}
              icon={<LineChart size={18} />}
              label="Reports"
            />
            <SidebarLink
              href="/dashboard/settings"
              active={pathname.startsWith("/dashboard/settings")}
              icon={<Settings size={18} />}
              label="Settings"
            />
            <SidebarLink
              href="/dashboard/profile"
              active={pathname === "/dashboard/profile"}
              icon={<User size={18} />}
              label="My Profile"
            />
          </>
        )}

        {/* USER */}
        {role === "user" && (
          <>
            <SidebarLink
              href="/dashboard/tickets"
              active={pathname.startsWith("/dashboard/tickets")}
              icon={<Ticket size={18} />}
              label="My Tickets"
            />
            <SidebarLink
              href="/dashboard/tickets/create"
              active={pathname === "/dashboard/tickets/create"}
              icon={<PlusCircle size={18} />}
              label="Create Ticket"
            />
            <SidebarLink
              href="/dashboard/profile"
              active={pathname === "/dashboard/profile"}
              icon={<User size={18} />}
              label="My Profile"
            />
            <SidebarLink
              href="/dashboard/help"
              active={pathname === "/dashboard/help"}
              icon={<CircleHelp size={18} />}
              label="Help"
            />
          </>
        )}

        {/* AGENT */}
        {role === "agent" && (
          <>
            <SidebarLink
              href="/dashboard"
              active={pathname === "/dashboard"}
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
            />
            <SidebarLink
              href="/dashboard/assigned"
              active={pathname.startsWith("/dashboard/assigned")}
              icon={<Inbox size={18} />}
              label="Assigned Tickets"
            />
            <SidebarLink
              href="/dashboard/tickets"
              active={pathname.startsWith("/dashboard/tickets")}
              icon={<Ticket size={18} />}
              label="All Tickets"
            />
          <SidebarLink
            href="/dashboard/performance"
            active={pathname === "/dashboard/performance"}
            icon={<BarChart size={18} />}
            label="My Performance"
          />
          <SidebarLink
            href="/dashboard/profile"
            active={pathname === "/dashboard/profile"}
            icon={<User size={18} />}
            label="My Profile"
          />
          </>
        )}
      </nav>
    </aside>
  );
}

/* ========= HELPER ========= */
function SidebarLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`sidebar-link ${
        active ? "sidebar-link-active" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
