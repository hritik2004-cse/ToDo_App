# 📝 ToDo App

A full-stack Todo application built with a **Next.js** frontend and an **Express.js** REST API backend. The project is organized as a monorepo with separate `client` and `server` workspaces managed by **pnpm**.

---

## ✨ Features

- 🔐 User authentication (Register / Login / Logout) with JWT access & refresh tokens stored in HTTP-only cookies
- 📧 Email verification via OTP (EmailJS) after registration
- 🔑 Forgot password & reset password flow via OTP
- 🗑️ Delete account
- ✅ Create, read, update, and delete tasks
- 📌 Task status tracking (daily / urgent / completed)
- 🌙 Dark-themed, responsive UI
- 🔒 Password hashing with bcrypt
- ✅ Input validation with Zod (server) and TypeScript (client)
- 🌐 Environment-aware cookie security (secure + sameSite in production)

---

## 🗂️ Project Structure

```
To-Do_List/
├── client/          # Next.js frontend
│   └── README.md    # Frontend details
├── server/          # Express.js backend
│   └── README.md    # Backend details
└── README.md        # ← You are here
```

> See [`client/README.md`](./client/README.md) for frontend setup and [`server/README.md`](./server/README.md) for backend setup.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v11+
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- [EmailJS](https://www.emailjs.com/) account (for OTP emails)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/To-Do_List.git
cd To-Do_List
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
cp server/.env.example server/.env
```

Fill in the required values (see `server/README.md` for the full variable list).

### 4. Run in development

```bash
# Start the backend
cd server && pnpm dev

# In a new terminal, start the frontend
cd client && pnpm dev
```

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |

---

## 🔗 API Overview

Base URL: `/api/v1`

### Auth
| Route                              | Description                       |
|------------------------------------|-----------------------------------|
| `POST /auth/register`              | Register & trigger email OTP      |
| `POST /auth/login`                 | Login — sets access + refresh cookies |
| `POST /auth/logout`                | Logout — clears cookies           |
| `POST /auth/verify-email`          | Verify email with OTP             |
| `POST /auth/resend-verify-email`   | Resend verification OTP           |
| `POST /auth/forget-password`       | Request password reset OTP        |
| `POST /auth/reset-password`        | Reset password with OTP           |
| `DELETE /auth/delete-account`      | Delete authenticated user account |

### Tasks
| Route                   | Description       |
|-------------------------|-------------------|
| `POST /task/add`        | Create a task     |
| `PATCH /task/update/:id`| Update a task     |
| `DELETE /task/delete/:id`| Delete a task    |

### User
| Route                          | Description              |
|--------------------------------|--------------------------|
| `GET /user`                    | Get current user profile |
| `POST /user/update-profile`    | Update name/details      |
| `POST /user/update-password`   | Change password          |
| `POST /user/update-profile-img`| Update profile image     |

---

## 📦 Tech Stack

| Layer           | Technology                                        |
|-----------------|---------------------------------------------------|
| Frontend        | Next.js 16, React 19, TypeScript                  |
| Styling         | Tailwind CSS v4, shadcn/ui                        |
| Backend         | Express.js v5, TypeScript                         |
| Database        | MongoDB + Mongoose                                |
| Auth            | JWT (access + refresh tokens), bcrypt, HTTP-only cookies |
| Email / OTP     | EmailJS                                           |
| Validation      | Zod (server), TypeScript (client)                 |
| Package Manager | pnpm v11 (workspaces)                             |

---

## 📄 License

ISC
