# 🛠️ Helpdesk Ticketing System (Front-end)

A **role-based Helpdesk Ticketing System** built with **Next.js (App Router)** that simulates a real-world enterprise support workflow between **User (Pelapor)**, **Agent**, and **Admin**.

> 📌 Project ini dibuat untuk **portfolio**, **latihan sistem enterprise**, dan showcase **frontend / fullstack capability**.

---

## 🖼️ Preview
## Admin
<img width="1340" height="591" alt="Dashboard Preview" src="https://github.com/user-attachments/assets/a95738bc-762b-4058-86d9-4d2f32f5438a" />
<img width="1338" height="597" alt="image" src="https://github.com/user-attachments/assets/678edbc8-a892-437b-a266-83cbeb8481f6" />
<img width="1337" height="594" alt="image" src="https://github.com/user-attachments/assets/650c94c8-84b0-40e0-85d5-d8ec7aae1265" />
<img width="1355" height="587" alt="image" src="https://github.com/user-attachments/assets/ea457e5b-3121-4056-8255-b59f520a259c" />
<img width="1330" height="600" alt="image" src="https://github.com/user-attachments/assets/ce915544-c2c4-4548-a228-3d289b7e717f" />
<img width="1328" height="588" alt="image" src="https://github.com/user-attachments/assets/3efea49c-12ce-4fbc-9bc3-e0ac33225767" />
---
## Agent
<img width="1320" height="594" alt="image" src="https://github.com/user-attachments/assets/c7a40da6-fe25-463d-8bb7-5af2fe2d6bf6" />
<img width="1323" height="592" alt="image" src="https://github.com/user-attachments/assets/5033deb7-81fe-4185-a851-6dcd7742764c" />
<img width="1351" height="591" alt="image" src="https://github.com/user-attachments/assets/9b925dfc-280d-4c64-a83f-d7a8451f625f" />
<img width="1337" height="589" alt="image" src="https://github.com/user-attachments/assets/5ce2c8f7-a590-4331-b079-01f03f311486" />
---
## User(Pelapor)
<img width="1347" height="602" alt="image" src="https://github.com/user-attachments/assets/4f5a9f7e-de8b-4838-b827-9b5f822648c2" />
<img width="903" height="590" alt="image" src="https://github.com/user-attachments/assets/da82fb77-e5bf-4e80-a127-52d893de5af6" />
<img width="1311" height="589" alt="image" src="https://github.com/user-attachments/assets/ad255333-a86f-4e61-ae85-2aff91a24d32" />
<img width="1332" height="576" alt="image" src="https://github.com/user-attachments/assets/77387c2d-1b50-4051-9bb5-440ecad9a129" />


## 🧑‍💻 System Roles Overview

Sistem dibagi menjadi **3 role utama**, masing-masing dengan fitur dan batasan yang jelas untuk mensimulasikan sistem helpdesk di dunia kerja.

---

## 👤 User (Pelapor)

Role untuk user yang melaporkan masalah atau request.

### ✅ Features

* Login ke sistem
* Create support ticket
* View **hanya tiket milik sendiri**
* Track status tiket:

  * Open
  * In Progress
  * Closed
* Search & filter tiket
* Clean & simple UI

### ❌ Limitations

* Tidak bisa mengubah status tiket
* Tidak bisa melihat tiket user lain
* Tidak bisa assign agent

🎯 **User Goal**

> “Laporan saya sudah diproses atau belum?”

---

## 🧑‍💼 Agent (Support Staff)

Role untuk staff support yang menangani tiket.

### ✅ Features

* Login sebagai agent
* View tiket yang ditugaskan
* Update status tiket:

  * Open → In Progress → Closed
* Fokus pada workflow penyelesaian masalah

### ❌ Limitations

* Tidak bisa manage user
* Tidak bisa assign tiket ke agent lain

🎯 **Agent Goal**

> “Selesaikan tiket dengan cepat dan terstruktur.”

---

## 👑 Admin (System Owner)

Role dengan akses penuh untuk monitoring dan manajemen sistem.

### ✅ Features

* Dashboard dengan statistik
* View **semua tiket**
* Assign tiket ke agent
* Manage users:

  * Admin
  * Agent
  * User
* Role-based sidebar & access control

🎯 **Admin Goal**

> “Pastikan semua tiket ter-handle dengan baik.”

---

## 🔐 Role-Based Access Control

| Feature              | User | Agent | Admin |
| -------------------- | ---- | ----- | ----- |
| Login                | ✅    | ✅     | ✅     |
| Create Ticket        | ✅    | ❌     | ❌     |
| View Own Tickets     | ✅    | ❌     | ❌     |
| View All Tickets     | ❌    | ✅     | ✅     |
| Update Ticket Status | ❌    | ✅     | ⚠️    |
| Assign Agent         | ❌    | ❌     | ✅     |
| Manage Users         | ❌    | ❌     | ✅     |

⚠️ *Admin hanya bisa update status jika dibutuhkan (override).*

---

## 🧭 Sidebar Menu by Role

### User

* Tickets
* Create Ticket

### Agent

* Tickets

### Admin

* Dashboard
* Tickets
* Users

---

## 🖥️ Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Global CSS (custom design system)
* **Icons**: lucide-react
* **State Management**: React Hooks
* **Auth**: Dummy API (mock backend)
* **UI Enhancements**:

  * Skeleton loading
  * Animations
  * Role-based rendering

---

## 🎨 UI & UX Highlights

* Consistent global design system
* Card-based enterprise layout
* Skeleton loading untuk UX lebih smooth
* Page transition animation
* Clean & modern dashboard

---

## 🔑 Demo Accounts

URL: [http://localhost:3000/login](http://localhost:3000/login)

| Role  | Email                                           | Password |
| ----- | ----------------------------------------------- | -------- |
| Admin | [admin@helpdesk.com](mailto:admin@helpdesk.com) | admin123 |
| Agent | [agent@helpdesk.com](mailto:agent@helpdesk.com) | agent123 |
| User  | [john@mail.com](mailto:john@mail.com)           | user123  |

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) di browser.

---

## 👨‍💻 Author

**Muhamad Rifansyah**
IT Support · RPA Developer · Web Developer

---

> 💡 Catatan: Backend masih menggunakan **mock / dummy API**. Struktur project sudah siap untuk dikembangkan ke backend re
