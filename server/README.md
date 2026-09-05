# 🔧 Server — ToDo App Backend

This is the **Express.js** REST API backend for the ToDo App. It handles authentication (including OTP-based email verification and password reset), task management, and user data with MongoDB as the database.

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Express.js](https://expressjs.com/) | ^5.2.1 | Web framework |
| [TypeScript](https://www.typescriptlang.org/) | ^7 | Type safety |
| [Mongoose](https://mongoosejs.com/) | ^9.9.4 | MongoDB ODM |
| [Zod](https://zod.dev/) | ^4.5.4 | Request validation / DTOs |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | ^6.0.0 | Password hashing |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | ^1.4.7 | HTTP-only cookie handling |
| [cors](https://github.com/expressjs/cors) | ^2.8.6 | Cross-origin resource sharing |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0.3 | JWT auth tokens |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Environment variable loading |
| [EmailJS](https://www.emailjs.com/) | REST API | Transactional OTP emails |
| [tsx](https://github.com/privatenumber/tsx) | ^4.23 | TypeScript execution (dev) |
| pnpm | 11.24.0 | Package manager |

---

## 📁 Folder Structure

```
server/
├── src/
│   ├── server.ts            # Entry point — Express app setup & server start
│   ├── config/
│   │   ├── db.config.ts          # MongoDB connection (Mongoose)
│   │   ├── env.config.ts         # Validated environment variables
│   │   ├── emailjs.config.ts     # EmailJS sendEmail helper
│   │   └── cloudinary.config.ts  # Cloudinary setup (file uploads)
│   ├── routes/
│   │   ├── auth.routes.ts   # /api/v1/auth
│   │   ├── tasks.routes.ts  # /api/v1/task
│   │   └── user.routes.ts   # /api/v1/user
│   ├── controllers/         # Route handler logic
│   ├── service/
│   │   └── auth/            # Auth business logic (register, login, OTP, etc.)
│   ├── models/              # Mongoose schemas & models
│   │   └── user.model.ts
│   ├── dto/                 # Zod schemas for request validation
│   │   └── auth/
│   │       ├── login.dto.ts
│   │       ├── register.dto.ts
│   │       ├── verify-email.dto.ts
│   │       ├── resend-verify-email.dto.ts
│   │       ├── forget-password.dto.ts
│   │       └── reset-password.dto.ts
│   ├── middlewares/
│   │   ├── validate-data.middleware.ts   # Zod request validation middleware
│   │   └── error-handler.middleware.ts   # Global error handler
│   ├── types/               # Shared TypeScript types & interfaces
│   └── utils/
│       ├── app-error.utils.ts   # AppError class for structured errors
│       ├── otp.utils.ts         # OTP generation & hashing helpers
│       └── token.utils.ts       # JWT sign/verify helpers
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment variable template
├── package.json
└── tsconfig.json
```

---

## 🌐 API Routes

Base URL: `http://localhost:{PORT}/api/v1`

### Auth — `/api/v1/auth`

| Method   | Endpoint                | Description                          | Auth Required |
|----------|-------------------------|--------------------------------------|---------------|
| `POST`   | `/register`             | Register a new user & send OTP       | ❌            |
| `POST`   | `/login`                | Login & receive JWT cookie           | ❌            |
| `POST`   | `/logout`               | Clear auth cookie                    | ✅            |
| `POST`   | `/verify-email`         | Verify email with OTP                | ❌            |
| `POST`   | `/resend-verify-email`  | Resend email verification OTP        | ❌            |
| `POST`   | `/forget-password`      | Request a password reset OTP         | ❌            |
| `POST`   | `/reset-password`       | Reset password using OTP             | ❌            |
| `DELETE` | `/delete-account`       | Delete the authenticated user account| ✅            |

### Tasks — `/api/v1/task`

| Method   | Endpoint | Description                        | Auth Required |
|----------|----------|------------------------------------|---------------|
| `GET`    | `/`      | Get all tasks for logged-in user   | ✅            |
| `POST`   | `/`      | Create a new task                  | ✅            |
| `PUT`    | `/:id`   | Update a task (name / status)      | ✅            |
| `DELETE` | `/:id`   | Delete a task                      | ✅            |

### User — `/api/v1/user`

| Method | Endpoint | Description                   | Auth Required |
|--------|----------|-------------------------------|---------------|
| `GET`  | `/`      | Get logged-in user profile    | ✅            |

---

## 🔐 Authentication

- JWT tokens are issued on login/register and stored in **HTTP-only cookies** (not accessible via JS)
- CORS is configured to allow only the client origin with `credentials: true`
- Passwords are hashed with **bcrypt** before storage
- Email verification and password reset use **time-limited OTPs** sent via **EmailJS**

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm v11+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [EmailJS](https://www.emailjs.com/) account with a service, templates, and API keys

### 1. Install dependencies

```bash
cd server
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

```env
PORT=5000
SALT_ROUNDS=10
OTP_EXPIRY_DURATION=900000       # 15 minutes in ms
TOKEN_EXPIRY_DURATION=900000     # 15 minutes in ms
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:3000

# EmailJS
EMAIL_JS_SERVICE_ID=your_service_id
EMAIL_JS_PUBLIC_KEY=your_public_key
EMAIL_JS_PRIVATE_KEY=your_private_key
EMAIL_JS_VERIFY_EMAIL_TEMPLATE_ID=your_verify_template_id
EMAIL_JS_RESET_PASSWORD_TEMPLATE_ID=your_reset_template_id
```

> All variables are validated at startup — the server will throw if any are missing or invalid.

### 3. Run development server

```bash
pnpm dev
```

Server starts at [http://localhost:5000](http://localhost:5000)

### Other scripts

```bash
pnpm build    # Compile TypeScript → dist/
pnpm start    # Run compiled production build
```

---

## 🏗️ Architecture

```
Request → Route → Middleware (validate) → Controller → Service → Model → MongoDB
                                                            ↑
                                                    DTO (Zod validation)
                                                    EmailJS (OTP emails)
```

- **Routes** define endpoints and attach controllers
- **Controllers** handle HTTP request/response
- **Services** contain business logic (decoupled from HTTP layer)
- **Models** define MongoDB schemas via Mongoose
- **DTOs** validate incoming request data with Zod
- **Middlewares** handle cross-cutting concerns (validation, auth guard, error handler)
- **Utils** provide reusable helpers: `AppError`, OTP generation, JWT signing
