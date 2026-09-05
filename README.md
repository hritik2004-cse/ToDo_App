# 📝 ToDo App

A full-stack Todo application built with a **Next.js** frontend and an **Express.js** REST API backend. The project is organized as a monorepo with separate `client` and `server` workspaces managed by **pnpm**.

---

## ✨ Features

- 🔐 User authentication (Register / Login / Logout) with HTTP-only cookies
- 📧 Email verification via OTP (EmailJS)
- 🔑 Forgot password & reset password flow
- 🗑️ Delete account
- ✅ Create, read, update, and delete tasks
- 📌 Task status tracking (pending / completed)
- 🌙 Dark-themed, responsive UI
- 🔒 Password hashing with bcrypt
- ✅ Input validation with Zod (server) and TypeScript (client)

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
git clone https://github.com/hritik2004-cse/ToDo_App
cd ToDo_App
```

### 2. Install dependencies

```bash
# Install all workspace dependencies
pnpm install
```

### 3. Configure environment variables

```bash
# Server
cp server/.env.example server/.env
```

Fill in the required values in each `.env` file.

### 4. Run in development

```bash
# Start the backend
cd server && pnpm dev

# In a new terminal, start the frontend
cd client && pnpm dev
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:3000  |
| Backend  | http://localhost:5000  |

---

## 🔗 API Overview

Base URL: `/api/v1`

| Route                             | Description                        |
|-----------------------------------|------------------------------------|
| `POST /auth/register`             | Register a new user                |
| `POST /auth/login`                | Login & receive auth cookie        |
| `POST /auth/logout`               | Logout & clear auth cookie         |
| `POST /auth/verify-email`         | Verify email with OTP              |
| `POST /auth/resend-verify-email`  | Resend email verification OTP      |
| `POST /auth/forget-password`      | Request password reset OTP         |
| `POST /auth/reset-password`       | Reset password with OTP            |
| `DELETE /auth/delete-account`     | Delete authenticated user account  |
| `GET  /task`                      | Get all tasks                      |
| `POST /task`                      | Create a task                      |
| `PUT  /task/:id`                  | Update a task                      |
| `DELETE /task/:id`                | Delete a task                      |
| `GET  /user`                      | Get user profile                   |

---

## 📦 Tech Stack

| Layer          | Technology                               |
|----------------|------------------------------------------|
| Frontend       | Next.js 16, React 19, TypeScript         |
| Styling        | Tailwind CSS v4, shadcn/ui               |
| Backend        | Express.js v5, TypeScript                |
| Database       | MongoDB + Mongoose                       |
| Auth           | bcrypt, HTTP-only cookies                |
| Email / OTP    | EmailJS                                  |
| Validation     | Zod (server), TypeScript (client)        |
| Package Manager| pnpm v11 (workspaces)                    |

---

## 📄 License

ISC
