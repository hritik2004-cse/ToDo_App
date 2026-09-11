# 🔧 Server — ToDo App Backend

This is the **Express.js** REST API backend for the ToDo App. It handles authentication (OTP-based email verification, JWT access/refresh token rotation, password reset), task management, and user data with MongoDB.

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Express.js](https://expressjs.com/) | ^5.2.1 | Web framework |
| [TypeScript](https://www.typescriptlang.org/) | ^7 | Type safety |
| [Mongoose](https://mongoosejs.com/) | ^9.9.4 | MongoDB ODM |
| [Zod](https://zod.dev/) | ^4.5.4 | Request validation / DTOs |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | ^6.0.0 | Password & refresh token hashing |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0.3 | Access & refresh JWT tokens |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | ^1.4.7 | HTTP-only cookie handling |
| [cors](https://github.com/expressjs/cors) | ^2.8.6 | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Environment variable loading |
| [EmailJS](https://www.emailjs.com/) | REST API | Transactional OTP emails |
| [tsx](https://github.com/privatenumber/tsx) | ^4.23 | TypeScript execution (dev) |
| pnpm | 11.24.0 | Package manager |

---

## 📁 Folder Structure

```
server/
├── src/
│   ├── server.ts                    # Entry point — Express app setup & server start
│   ├── config/
│   │   ├── db.config.ts             # MongoDB connection (Mongoose)
│   │   ├── env.config.ts            # Validated & exported environment variables
│   │   ├── cookie.config.ts         # Shared CookieOptions (httpOnly, secure, sameSite)
│   │   ├── emailjs.config.ts        # sendEmail() helper via EmailJS REST API
│   │   └── cloudinary.config.ts     # Cloudinary SDK config (profile image uploads)
│   ├── constants/
│   │   └── auth.constants.ts        # Token maxAge values (accessTokenExpiry, refreshTokenExpiry)
│   ├── routes/
│   │   ├── auth.routes.ts           # /api/v1/auth
│   │   ├── tasks.routes.ts          # /api/v1/task
│   │   └── user.routes.ts           # /api/v1/user
│   ├── controllers/
│   │   ├── auth.controller.ts       # Auth route handlers
│   │   ├── task.controller.ts       # Task route handlers
│   │   └── user.controller.ts       # User route handlers
│   ├── service/
│   │   ├── auth/
│   │   │   ├── register.service.ts       # Registration + OTP email
│   │   │   ├── login.service.ts          # Login + JWT issuance + refresh token rotation
│   │   │   ├── account.service.ts        # Logout, delete account
│   │   │   ├── verify-email.service.ts   # OTP verification
│   │   │   └── password.service.ts       # Forget & reset password
│   │   ├── task/
│   │   │   └── task.service.ts           # getAllTasks, addTask, updateTask, updateTaskStatus, deleteTask
│   │   └── user/
│   │       └── user.service.ts           # getUser (profile fetch)
│   ├── models/
│   │   ├── user.model.ts            # Mongoose User schema (bcrypt pre-save hook)
│   │   └── task.model.ts            # Mongoose Task schema (userId ref, status, isCompleted)
│   ├── dto/
│   │   ├── auth/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   ├── verify-email.dto.ts
│   │   │   ├── resend-verify-email.dto.ts
│   │   │   ├── forget-password.dto.ts
│   │   │   └── reset-password.dto.ts
│   │   └── tasks/
│   │       └── add-task.dto.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts            # JWT access token guard (sets req.userId), passes errors to next()
│   │   ├── validate-data.middleware.ts   # Zod request body validation
│   │   └── error-handler.middleware.ts   # Global error handler (AppError → status code, 500 fallback)
│   ├── types/
│   │   ├── express.types.ts         # Extends Express Request with userId: string
│   │   ├── jwt.types.ts             # TokenPayload interface { sub: string }
│   │   ├── task.types.ts            # TaskItems interface for Mongoose (userId, task, status, isCompleted)
│   │   ├── user.types.ts            # IUser interface for Mongoose (firstName, lastName, profileImg, etc.)
│   │   └── email-js.types.ts        # SendEmailOptions & EmailTemplateParams interfaces
│   └── utils/
│       ├── app-error.utils.ts       # AppError class (statusCode + message)
│       ├── jwt.utils.ts             # generateAccessToken, generateRefreshToken, verify*
│       ├── mask-email.utils.ts      # maskEmail() helper — obfuscates email for OTP UX
│       ├── otp.utils.ts             # OTP generation & hashing helpers
│       └── token.utils.ts           # Generic token helpers
├── .env                     # Environment variables (gitignored)
├── .env.example             # Template — copy this to .env
├── package.json
└── tsconfig.json
```

---

## 🌐 API Routes

Base URL: `http://localhost:{PORT}/api/v1`

### Health Check

| Method | Endpoint  | Description        |
|--------|-----------|--------------------| 
| `GET`  | `/health` | API liveness check |

### Auth — `/api/v1/auth`

| Method   | Endpoint                   | Auth | Description                             |
|----------|----------------------------|------|-----------------------------------------|
| `POST`   | `/register`                | ❌   | Register user & send verification OTP   |
| `POST`   | `/login`                   | ❌   | Login → sets access + refresh cookies   |
| `POST`   | `/logout`                  | ✅   | Clear auth cookies                      |
| `POST`   | `/refresh`                 | ❌   | Issue new access + refresh tokens       |
| `POST`   | `/verify-email`            | ❌   | Verify email with OTP                   |
| `POST`   | `/resend-verify-email`     | ❌   | Resend verification OTP                 |
| `POST`   | `/forget-password`         | ❌   | Send password reset OTP to email        |
| `POST`   | `/resend-forget-password`  | ❌   | Resend password reset OTP               |
| `POST`   | `/reset-password`          | ❌   | Reset password using OTP                |
| `DELETE` | `/delete-account`          | ✅   | Permanently delete account              |

### Tasks — `/api/v1/task`

All task routes require authentication (`authMiddle` applied at the router level).

| Method   | Endpoint             | Description                    |
|----------|----------------------|--------------------------------|
| `GET`    | `/all`               | Get all tasks for the user     |
| `POST`   | `/add`               | Create a new task              |
| `PATCH`  | `/update/:id`        | Update a task's name           |
| `PATCH`  | `/update/status/:id` | Toggle task completed status   |
| `DELETE` | `/delete/:id`        | Delete a task                  |

### User — `/api/v1/user`

| Method | Endpoint | Auth | Description                  |
|--------|----------|------|------------------------------|
| `GET`  | `/me`    | ✅   | Get logged-in user profile   |

---

## 🔐 Authentication

### Token Strategy

- On **login**, two JWTs are issued:
  - **Access token** (short-lived, e.g. `15m`) — stored in an HTTP-only cookie
  - **Refresh token** (long-lived, e.g. `7d`) — hashed with bcrypt and stored in MongoDB + sent as HTTP-only cookie
- On **refresh** (`POST /auth/refresh`):
  - Server verifies the refresh token cookie
  - Issues a **new** access token and a **new** refresh token (rotation)
  - Old refresh token hash is replaced atomically using `findOneAndUpdate` with the current hash as the filter — preventing replay attacks ("Refresh token already used" if the token was already rotated)
- The `/auth/refresh` endpoint is **not** protected by `authMiddle` (by design — the access token is already expired)

### `auth.middleware.ts`

- Reads `accessToken` from cookies
- Calls `verifyAccessToken()` — throws `AppError(401, ...)` on missing or expired token
- Uses `try/catch` + `next(error)` to pass errors to the global error handler (synchronous Express middlewares must use `next(error)`, not `throw`)

### Cookies

| Cookie         | httpOnly | Secure (prod) | SameSite            |
|----------------|----------|---------------|---------------------|
| `accessToken`  | ✅       | ✅            | `none` / `lax` (dev)|
| `refreshToken` | ✅       | ✅            | `none` / `lax` (dev)|

---

## 🗄️ Data Models

### User Model (`user.model.ts`)

| Field               | Type      | Notes                                       |
|---------------------|-----------|---------------------------------------------|
| `firstName`         | `String`  | Required, trimmed                           |
| `lastName`          | `String`  | Optional, default `""`                      |
| `email`             | `String`  | Required, unique, lowercase                 |
| `password`          | `String`  | Required, `select: false`, bcrypt-hashed    |
| `isVerified`        | `Boolean` | Default `false`                             |
| `verificationOTP`   | `String`  | Hashed OTP for email verification           |
| `otpExpiry`         | `Date`    | OTP expiration timestamp                    |
| `profileImg`        | `Object`  | `{ publicId: String, url: String }`         |
| `refreshToken`      | `String`  | Hashed refresh token (rotation)             |
| `resetToken`        | `String`  | Hashed password reset token                 |
| `resetTokenExpiry`  | `Date`    | Reset token expiration timestamp            |
| `createdAt`         | `Date`    | Auto (Mongoose timestamps)                  |
| `updatedAt`         | `Date`    | Auto (Mongoose timestamps)                  |

### Task Model (`task.model.ts`)

| Field         | Type       | Notes                                        |
|---------------|------------|----------------------------------------------|
| `userId`      | `ObjectId` | Ref → `User`, required                       |
| `task`        | `String`   | Required, trimmed                            |
| `status`      | `String`   | Enum: `"pending"` / `"completed"`, default `"pending"` |
| `isCompleted` | `Boolean`  | Default `false`                              |
| `createdAt`   | `Date`     | Auto (Mongoose timestamps), used for sort    |
| `updatedAt`   | `Date`     | Auto (Mongoose timestamps)                   |

Tasks are always returned sorted by `createdAt` descending (newest first).

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm v11+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [EmailJS](https://www.emailjs.com/) account with a service, two templates, and API keys

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
NODE_ENV=development
SALT_ROUNDS=10
OTP_EXPIRY_DURATION=900000        # 15 minutes in ms
TOKEN_EXPIRY_DURATION=900000      # 15 minutes in ms
MONGODB_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:3000

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

# EmailJS
EMAIL_JS_SERVICE_ID=your_service_id
EMAIL_JS_PUBLIC_KEY=your_public_key
EMAIL_JS_PRIVATE_KEY=your_private_key
EMAIL_JS_VERIFY_EMAIL_TEMPLATE_ID=your_verify_template_id
EMAIL_JS_RESET_PASSWORD_TEMPLATE_ID=your_reset_template_id
```

> All variables are validated at startup — the server throws immediately if any are missing or invalid.

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
Request → Route → auth.middleware (guard) → validate.middleware (Zod) → Controller → Service → MongoDB
                                                                                         ↓
                                                                                   EmailJS (OTP)
                                                                                   jwt.utils (tokens)
                  ↓ errors
            error-handler.middleware (AppError → HTTP response)
```

- **Routes** attach middlewares and controllers to endpoints
- **Middlewares** handle auth guarding (`auth.middleware`) and input validation (`validate-data.middleware`); errors are always passed via `next(error)`
- **Controllers** handle HTTP request/response, call services, set cookies
- **Services** contain all business logic, decoupled from HTTP
- **Models** define MongoDB schemas (User with bcrypt pre-save hook, Task with `status` + `isCompleted` fields)
- **DTOs** are Zod schemas that validate and type-infer request bodies
- **Utils** provide `AppError`, JWT helpers, OTP utilities, and email masking (`mask-email.utils.ts`)
- **Types** are shared TypeScript interfaces (`IUser`, `TaskItems`, `TokenPayload`, `SendEmailOptions`)
