# 🔧 Server — ToDo App Backend

This is the **Express.js** REST API backend for the ToDo App. It handles authentication, task management, and user data with MongoDB as the database.

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Express.js](https://expressjs.com/) | ^5.2.1 | Web framework |
| [TypeScript](https://www.typescriptlang.org/) | ^7 | Type safety |
| [Mongoose](https://mongoosejs.com/) | ^9.9.4 | MongoDB ODM |
| [Zod](https://zod.dev/) | ^4.5.4 | Request validation / DTOs |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0.3 | JWT auth tokens |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | ^6.0.0 | Password hashing |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | ^1.4.7 | HTTP-only cookie handling |
| [cors](https://github.com/expressjs/cors) | ^2.8.6 | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Environment variable loading |
| [tsx](https://github.com/privatenumber/tsx) | ^4.23 | TypeScript execution (dev) |
| pnpm | 11.24.0 | Package manager |

---

## 📁 Folder Structure

```
server/
├── src/
│   ├── server.ts            # Entry point — Express app setup & server start
│   ├── config/
│   │   ├── db.config.ts     # MongoDB connection (Mongoose)
│   │   └── env.config.ts    # Validated environment variables
│   ├── routes/
│   │   ├── auth.routes.ts   # /api/v1/auth
│   │   ├── tasks.routes.ts  # /api/v1/task
│   │   └── user.routes.ts   # /api/v1/user
│   ├── controllers/         # Route handler logic
│   ├── service/             # Business logic layer
│   ├── models/              # Mongoose schemas & models
│   ├── dto/                 # Zod schemas for request validation
│   ├── middlewares/
│   │   └── error-handler.middleware.ts  # Global error handler
│   ├── types/               # Shared TypeScript types & interfaces
│   └── utils/               # Helper utilities
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment variable template
├── package.json
└── tsconfig.json
```

---

## 🌐 API Routes

Base URL: `http://localhost:{PORT}/api/v1`

### Auth — `/api/v1/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login & receive JWT cookie | ❌ |
| `POST` | `/logout` | Clear auth cookie | ✅ |

### Tasks — `/api/v1/task`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/` | Get all tasks for logged-in user | ✅ |
| `POST` | `/` | Create a new task | ✅ |
| `PUT` | `/:id` | Update a task (name / status) | ✅ |
| `DELETE` | `/:id` | Delete a task | ✅ |

### User — `/api/v1/user`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/` | Get logged-in user profile | ✅ |

---

## 🔐 Authentication

- JWT tokens are issued on login/register and stored in **HTTP-only cookies** (not accessible via JS)
- CORS is configured to allow only the client origin with `credentials: true`
- Passwords are hashed with **bcrypt** before storage

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm v11+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

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
PORT=8000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### 3. Run development server

```bash
pnpm dev
```

Server starts at [http://localhost:8000](http://localhost:8000)

### Other scripts

```bash
pnpm build    # Compile TypeScript → dist/
pnpm start    # Run compiled production build
```

---

## 🏗️ Architecture

```
Request → Route → Middleware → Controller → Service → Model → MongoDB
                                                ↑
                                          DTO (Zod validation)
```

- **Routes** define endpoints and attach controllers
- **Controllers** handle HTTP request/response
- **Services** contain business logic (decoupled from HTTP layer)
- **Models** define MongoDB schemas via Mongoose
- **DTOs** validate incoming request data with Zod
- **Middlewares** handle cross-cutting concerns (auth guard, error handler)
