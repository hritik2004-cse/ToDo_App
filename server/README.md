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
│   │   └── cloudinary.config.ts     # Cloudinary setup (profile image uploads)
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
│   │   │   ├── login.service.ts          # Login + JWT issuance + refresh token hashing
│   │   │   ├── account.service.ts        # Logout, delete account, refresh token
│   │   │   ├── verify-email.service.ts   # OTP verification
│   │   │   └── password.service.ts       # Forget & reset password
│   │   └── user/
│   │       └── user.service.ts           # getCurrentUser, profile updates
│   ├── models/
│   │   └── user.model.ts            # Mongoose User schema (pre-save hook for bcrypt)
│   ├── dto/
│   │   └── auth/
│   │       ├── login.dto.ts
│   │       ├── register.dto.ts
│   │       ├── verify-email.dto.ts
│   │       ├── resend-verify-email.dto.ts
│   │       ├── forget-password.dto.ts
│   │       └── reset-password.dto.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts            # JWT access token guard (sets req.userId)
│   │   ├── validate-data.middleware.ts   # Zod request body validation
│   │   └── error-handler.middleware.ts   # Global error handler (AppError + 500)
│   ├── types/
│   │   ├── express.types.ts         # Extends Express Request with userId: string
│   │   ├── jwt.types.ts             # TokenPayload interface { sub: string }
│   │   ├── user.types.ts            # IUser interface for Mongoose
│   │   ├── task.types.ts            # Task-related types
│   │   └── email-js.types.ts        # SendEmailOptions type
│   └── utils/
│       ├── app-error.utils.ts       # AppError class (statusCode + message)
│       ├── jwt.utils.ts             # generateAccessToken, generateRefreshToken, verify*
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

| Method | Endpoint  | Description       |
|--------|-----------|-------------------|
| `GET`  | `/health` | API liveness check|

### Auth — `/api/v1/auth`

| Method   | Endpoint                 | Description                              | Auth Required |
|----------|--------------------------|------------------------------------------|---------------|
| `POST`   | `/register`              | Register user & send verification OTP   | ❌            |
| `POST`   | `/login`                 | Login → sets access + refresh cookies   | ❌            |
| `POST`   | `/logout`                | Clear auth cookies                       | ✅            |
| `POST`   | `/verify-email`          | Verify email with OTP                   | ❌            |
| `POST`   | `/resend-verify-email`   | Resend verification OTP                 | ❌            |
| `POST`   | `/forget-password`       | Send password reset OTP to email        | ❌            |
| `POST`   | `/reset-password`        | Reset password using OTP                | ❌            |
| `DELETE` | `/delete-account`        | Permanently delete account              | ✅            |

### Tasks — `/api/v1/task`

| Method   | Endpoint       | Description                      | Auth Required |
|----------|----------------|----------------------------------|---------------|
| `POST`   | `/add`         | Create a new task                | ✅            |
| `PATCH`  | `/update/:id`  | Update a task (name / status)    | ✅            |
| `DELETE` | `/delete/:id`  | Delete a task                    | ✅            |

### User — `/api/v1/user`

| Method | Endpoint               | Description                   | Auth Required |
|--------|------------------------|-------------------------------|---------------|
| `GET`  | `/`                    | Get logged-in user profile    | ✅            |
| `POST` | `/update-profile`      | Update name/details           | ✅            |
| `POST` | `/update-password`     | Change password               | ✅            |
| `POST` | `/update-profile-img`  | Update profile image          | ✅            |

---

## 🔐 Authentication

- On **login**, the server issues two JWTs:
  - **Access token** (short-lived, e.g. `15m`) — stored in an HTTP-only cookie
  - **Refresh token** (long-lived, e.g. `7d`) — hashed with bcrypt and stored in MongoDB + sent as HTTP-only cookie
- The `auth.middleware.ts` guard verifies the access token and attaches `req.userId`
- Cookies are set with `httpOnly: true`, `secure: true` in production, and `sameSite: "none"` in production / `"lax"` in development
- Passwords are hashed by a Mongoose `pre("save")` hook — **never stored in plaintext**

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
Request → Route → auth.middleware (guard) → validate.middleware (Zod) → Controller → Service → Model → MongoDB
                                                                                          ↓
                                                                                    EmailJS (OTP)
                                                                                    jwt.utils (tokens)
```

- **Routes** attach middlewares and controllers to endpoints
- **Middlewares** handle auth guarding (`auth.middleware`) and input validation (`validate-data.middleware`)
- **Controllers** handle HTTP request/response, call services, set cookies
- **Services** contain all business logic, decoupled from HTTP
- **Models** define MongoDB schemas; password hashing happens in the `pre("save")` hook
- **DTOs** are Zod schemas that validate and type-infer request bodies
- **Utils** provide `AppError`, JWT helpers, and OTP utilities
