This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 🛠️ Helpdesk Ticketing System (Front-end)

A role-based **Helpdesk Ticketing System** built with **Next.js (App Router)** that simulates a real-world customer support workflow between **Users, Agents, and Admins**.

Project ini dibuat untuk **portfolio**, **latihan sistem enterprise**, frontend / fullstack**.

---

## ✨ Features Overview

### 👤 User (Pelapor)
- Create support ticket
- View **only their own tickets**
- Track ticket status:
  - Open
  - In Progress
  - Closed
- Search & filter tickets
- Clean & simple UI

❌ User **cannot**:
- Change ticket status
- View other users’ tickets
- Assign agents

📌 Goal:  
> “Laporan saya sudah diproses atau belum?”

---

### 🧑‍💼 Agent (Support Staff)
- View assigned tickets
- Update ticket status:
  - Open → In Progress → Closed
- Focused workflow for handling issues

❌ Agent **cannot**:
- Manage users
- Assign tickets to other agents

---

### 👑 Admin (System Owner)
- Dashboard with statistics
- View **all tickets**
- Assign tickets to agents
- Manage users (Admin / Agent / User)
- Role-based sidebar & access control

---

## 🔐 Role-Based Access Control

| Feature | User | Agent | Admin |
|------|------|-------|-------|
| Login | ✅ | ✅ | ✅ |
| Create Ticket | ✅ | ❌ | ❌ |
| View Own Tickets | ✅ | ❌ | ❌ |
| View All Tickets | ❌ | ✅ | ✅ |
| Update Ticket Status | ❌ | ✅ | ⚠️ |
| Assign Agent | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

---

## 🧭 Sidebar Menu by Role

### User
- Tickets
- Create Ticket

### Agent
- Tickets

### Admin
- Dashboard
- Tickets
- Users

---

## 🖥️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Global CSS (custom design system)
- **Icons**: lucide-react
- **State Management**: React Hooks
- **Auth**: Dummy API (mock backend)
- **UI Enhancements**:
  - Skeleton loading
  - Animations
  - Role-based rendering

---

## 🎨 UI & UX Highlights

- Consistent global design system
- Card-based layout
- Skeleton loading for better UX
- Smooth page animation
- Clean enterprise-style dashboard

---

http://localhost:3000/login

| Role  | Email                                           | Password |
| ----- | ----------------------------------------------- | -------- |
| Admin | [admin@helpdesk.com](mailto:admin@helpdesk.com) | admin123 |
| Agent | [agent@helpdesk.com](mailto:agent@helpdesk.com) | agent123 |
| User  | [john@mail.com](mailto:john@mail.com)           | user123  |





## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
