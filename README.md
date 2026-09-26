
# 📝 ToDo App

A full-stack Todo application built with a **Next.js** frontend and an **Express.js** REST API backend. The project is organized as a monorepo with separate `client` and `server` workspaces managed by **pnpm**.

---

## ✨ Features

- 🔐 User authentication (Register / Login / Logout) with JWT access & refresh tokens stored in HTTP-only cookies
- 🔄 Silent token refresh via Axios interceptor — concurrent 401s are queued and replayed after a single refresh call
- 📧 Email verification via OTP after registration
- 🔑 Forgot password & reset password flow via OTP
- 🗑️ Delete account
- ✅ Create, view, complete, delete, and **inline-edit** tasks
- 📌 Task status tracking with filter tabs (All / Pending / Completed)
- ✏️ Inline task editing — clicking edit highlights the task border in accent color; save with one click
- 👤 Profile page with live user info (first name, last name, email) and profile avatar
- 🖼️ Profile image upload with Cloudinary and Multer memory storage — automatic cleanup/deletion of old avatar on Cloudinary
- 📝 Profile editing — update first name and last name
- 🔒 Two-step password change — confirm current password first, then set new password (prevents same-password reuse)
- 🗂️ Account section with Sidebar navigation (Profile / Change Password / Settings)
- 📱 Mobile drawer menu (Base UI Drawer) — swipeable sidebar navigation with logout on small screens
- 🌙 Dark-themed, responsive UI with accessibility support (ARIA labels, sr-only labels, unique IDs)
- 🔒 Password & refresh token hashing with bcrypt
- 🔁 Refresh token rotation with optimistic locking (prevents token reuse attacks)
- ✅ Input validation with Zod (server) and TypeScript (client)
- 🌐 Environment-aware cookie security (`secure` + `sameSite` in production)
- 🧹 Console logs automatically stripped in production builds (Next.js SWC compiler)
- 🧩 Shared `Input`, `Button`, `LinkButton`, `SidebarLink`, and `Logo` utility components with types in `types/`
- 📂 Data-driven sidebar links — link config lives in `data/sidebar-links.ts`, reused by both Sidebar and mobile Menu
- ☁️ Cloudinary integration for secure image hosting & Next.js Image remote pattern optimization
- 🔔 Tooltip UI component (Base UI) for accessible hover hints

---

## 🗂️ Project Structure

``````
To-Do_List/
├── client/                          # Next.js frontend
│   ├── src/
│   │   ├── app/                     # App Router pages
│   │   │   ├── layout.tsx           # Root layout (AuthProvider, fonts, metadata, ToastContainer)
│   │   │   ├── page.tsx             # Home / task list (filter, add, complete, delete)
│   │   │   ├── globals.css          # Global styles & Tailwind theme tokens
│   │   │   ├── manifest.json        # PWA web app manifest
│   │   │   ├── login/               # Login page
│   │   │   ├── register/            # Registration page
│   │   │   ├── verify-account/      # Email OTP verification page
│   │   │   ├── forget-password/     # Forget / reset password page
│   │   │   └── account/             # Account section (NavBar + Sidebar layout)
│   │   │       ├── layout.tsx       # Account layout
│   │   │       ├── profile/         # Profile page
│   │   │       ├── change-password/  # Change password page
│   │   │       └── settings/        # Settings page (delete account)
│   │   ├── components/
│   │   │   ├── main/                # Feature / layout components (NavBar, Sidebar, Menu, TaskInput, TaskModel)
│   │   │   ├── pages/               # Full-page client components (Login, Register, Profile, etc.)
│   │   │   ├── ui/                  # shadcn/ui + Base UI components (AlertDialog, Drawer, Dropdown, Tooltip)
│   │   │   └── utility/             # Shared components (Button, Input, LinkButton, Logo, SidebarLink)
│   │   ├── config/                  # Axios instance & typed env vars
│   │   ├── context/                 # AuthContext (user state, fetchCurrentUser, interceptor wiring)
│   │   ├── data/                    # Data-driven configs (sidebar-links.ts)
│   │   ├── lib/                     # Axios interceptor (silent token refresh) & cn() utility
│   │   └── types/                   # Shared TypeScript types
│   └── README.md                    # Frontend details
├── server/                          # Express.js backend
│   ├── src/
│   │   ├── server.ts                # Entry point — Express app setup & server start
│   │   ├── config/                  # DB, env, cookie, EmailJS, Cloudinary configs
│   │   ├── constants/               # Token maxAge values
│   │   ├── routes/                  # Auth, Task, User route definitions
│   │   ├── controllers/             # Route handlers (auth, task, user)
│   │   ├── service/                 # Business logic (auth/, task/, user/)
│   │   ├── models/                  # Mongoose schemas (User, Task)
│   │   ├── dto/                     # Zod validation schemas (auth/, tasks/, user/)
│   │   ├── middlewares/             # Auth guard, Multer upload, Zod validation, error handler
│   │   ├── types/                   # Shared TypeScript interfaces
│   │   └── utils/                   # AppError, JWT, OTP, email masking helpers
│   └── README.md                    # Backend details
└── README.md                        # ← You are here
``````

> See [client/README.md](./client/README.md) for frontend setup and [server/README.md](./server/README.md) for backend setup.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v12+
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- [EmailJS](https://www.emailjs.com/) account (for OTP emails)
- [Cloudinary](https://cloudinary.com/) account (for profile image uploads)

### 1. Clone the repository

``````bash
git clone https://github.com/your-username/To-Do_List.git
cd To-Do_List
``````

### 2. Install dependencies

``````bash
pnpm install
``````

### 3. Configure environment variables

``````bash
cp server/.env.example server/.env
``````

Fill in the required values (see `server/README.md` for the full variable list).

### 4. Run in development

``````bash
# Start the backend
cd server && pnpm dev

# In a new terminal, start the frontend
cd client && pnpm dev
``````

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |

---

## 🔗 API Overview

Base URL: `/api/v1`

### Auth
| Method   | Route                            | Auth | Description                           |
|----------|----------------------------------|------|---------------------------------------|
| `POST`   | `/auth/register`                 | ❌   | Register & trigger email OTP          |
| `POST`   | `/auth/login`                    | ❌   | Login — sets access + refresh cookies |
| `POST`   | `/auth/logout`                   | ✅   | Logout — clears cookies               |
| `POST`   | `/auth/refresh`                  | ❌   | Issue new access + refresh tokens     |
| `POST`   | `/auth/verify-email`             | ❌   | Verify email with OTP                 |
| `POST`   | `/auth/resend-verify-email`      | ❌   | Resend verification OTP               |
| `POST`   | `/auth/forget-password`          | ❌   | Request password reset OTP            |
| `POST`   | `/auth/resend-forget-password`   | ❌   | Resend password reset OTP             |
| `POST`   | `/auth/reset-password`           | ❌   | Reset password with OTP               |
| `DELETE` | `/auth/delete-account`           | ✅   | Delete authenticated user account     |

### Tasks
| Method   | Route                        | Auth | Description                     |
|----------|------------------------------|------|---------------------------------|
| `GET`    | `/task/all`                  | ✅   | Get all tasks for user          |
| `POST`   | `/task/add`                  | ✅   | Create a new task               |
| `PATCH`  | `/task/update/:id`           | ✅   | Update task name (inline edit)  |
| `PATCH`  | `/task/update/status/:id`    | ✅   | Toggle task completed status    |
| `DELETE` | `/task/delete/:id`           | ✅   | Delete a task                   |

### User
| Method  | Route                     | Auth | Description                                         |
|---------|---------------------------|------|-----------------------------------------------------|
| `GET`   | `/user/me`                | ✅   | Get current user profile                            |
| `PATCH` | `/user/update-profile`    | ✅   | Update first name and last name                     |
| `POST`  | `/user/confirm-password`  | ✅   | Verify current password before allowing changes     |
| `PATCH` | `/user/update-password`   | ✅   | Update password with validation                     |
| `PATCH` | `/user/update-profile-img`| ✅   | Upload & update profile image (Multer + Cloudinary) |

---

## 📦 Tech Stack

| Layer           | Technology                                                 |
|-----------------|------------------------------------------------------------|
| Frontend        | Next.js 16.3, React 19.2, TypeScript 5                     |
| Styling         | Tailwind CSS v4, Base UI 1.7, shadcn/ui 4                  |
| HTTP Client     | Axios 1.20 with response interceptor (silent token refresh)|
| Backend         | Express.js 5.2, TypeScript 7                               |
| Database        | MongoDB + Mongoose 9.9 (User + Task models)                |
| Auth            | JWT (access + refresh rotation), bcrypt 6, HTTP-only cookies|
| File Uploads    | Multer 1.4 (memoryStorage), Cloudinary v2 SDK              |
| Email / OTP     | EmailJS (REST API)                                         |
| Validation      | Zod 4 (server), TypeScript (client)                        |
| Package Manager | pnpm 12.4                                                  |

---

## 📄 License

ISC