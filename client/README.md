# 🖥️ Client — ToDo App Frontend

This is the **Next.js** frontend for the ToDo App. It communicates with the Express.js backend via REST API using Axios, with a response interceptor that silently refreshes expired access tokens.

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.3.4 | React framework (App Router) |
| [React](https://react.dev/) | 19.2.8 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | ^4 | Accessible UI components |
| [Base UI](https://base-ui.com/) | ^1.7 | Headless UI primitives (Dropdown, AlertDialog) |
| [Axios](https://axios-http.com/) | ^1.20 | HTTP client with response interceptor |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.7 | Icon library |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | ^11 | Toast notifications |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | latest | Class name merging |
| pnpm | 11.24.0 | Package manager |

---

## 📁 Folder Structure

```
client/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout (AuthProvider, fonts, metadata, ToastContainer)
│   │   ├── page.tsx         # Home / task list page
│   │   ├── globals.css      # Global styles & Tailwind theme tokens
│   │   ├── login/           # Login page
│   │   │   └── page.tsx
│   │   ├── register/        # Register page
│   │   │   └── page.tsx
│   │   ├── verify-account/  # Email OTP verification page (post-register)
│   │   │   └── page.tsx
│   │   └── forget-password/ # Forget password page
│   │       └── page.tsx
│   ├── components/
│   │   ├── main/            # Feature components
│   │   │   ├── NavBar.tsx   # Top navigation bar
│   │   │   ├── TaskInput.tsx# New task form (accessible: labelled input + aria-label on submit)
│   │   │   └── TaskModel.tsx# Individual task card (checkbox, delete, edit, dropdown)
│   │   ├── ui/              # shadcn/ui + Base UI auto-generated components
│   │   └── utility/         # Shared reusable components
│   │       ├── Button.tsx
│   │       ├── LinkButton.tsx
│   │       └── Logo.tsx
│   ├── config/
│   │   └── axios.config.ts  # Axios instance (baseURL + withCredentials)
│   ├── context/
│   │   └── AuthContext.tsx  # AuthProvider — user state, fetchCurrentUser, interceptor wiring
│   ├── lib/
│   │   ├── axios.ts         # Response interceptor: silent token refresh with request queue
│   │   └── utils.ts         # cn() helper (clsx + tailwind-merge)
│   └── types/               # Shared TypeScript types
│       ├── auth-context.types.ts
│       └── task.types.ts
├── .env                     # Environment variables (gitignored)
├── components.json          # shadcn/ui config
├── next.config.ts           # Next.js config (reactCompiler, removeConsole in production)
└── tsconfig.json
```

---

## 🌐 Pages

| Route              | Page                        | Description                                      |
|--------------------|-----------------------------|--------------------------------------------------|
| `/`                | `page.tsx`                  | Task list — view, add, complete & delete tasks   |
| `/login`           | `login/page.tsx`            | User login with email & password                 |
| `/register`        | `register/page.tsx`         | User registration                                |
| `/verify-account`  | `verify-account/page.tsx`   | Enter OTP sent to email to activate account      |
| `/forget-password` | `forget-password/page.tsx`  | Request a password reset OTP                     |

---

## 🎨 Design System

- **Dark theme** with CSS custom properties defined in `globals.css`
- **Color tokens:** `background`, `foreground`, `accent`, `secondary-accent`, `gray`, `placeholder`, `edit`, `delete`
- **Typography:** Inter (primary), Geist Sans, Geist Mono via `next/font`
- **Styling:** Tailwind CSS v4 with custom tokens

---

## ♿ Accessibility

All interactive elements meet WCAG criteria:

- Every icon-only button has an `aria-label` (e.g. `"Add task"`, `"Delete task: Buy milk"`)
- All form inputs have an associated `<label>` (`htmlFor` + matching `id`)
- Checkbox `id`s are unique per task (`taskStatus-{taskId}`) to avoid duplicate-ID violations
- Decorative icons carry `aria-hidden="true"` so screen readers skip them

---

## 🔗 API Communication

All API calls go through the Axios instance at `src/config/axios.config.ts`:

- **Base URL:** `NEXT_PUBLIC_SERVER_URL/api/v1`
- **`withCredentials: true`** — sends HTTP-only cookies on every request

### Silent Token Refresh (`src/lib/axios.ts`)

The response interceptor handles expired access tokens transparently:

1. Any `401` response triggers a `POST /auth/refresh` call
2. If **multiple requests** fail with `401` simultaneously, they are **queued** — only one refresh call is made
3. On success → all queued requests are replayed with the new cookie
4. On failure → all queued requests are rejected and `onAuthFailure` clears the user state (logout)

The interceptor is registered as a **side-effect import** from `AuthContext.tsx`, so it's always active when the app is mounted.

---

## 🔐 Auth Flow

1. **Register** (`/register`) → server sends a verification OTP to the user's email
2. **Verify Account** (`/verify-account`) → user enters OTP to activate account → redirected to `/login`
3. **Login** (`/login`) → server sets `accessToken` + `refreshToken` HTTP-only cookies → redirected to `/`
4. **Silent Refresh** → Axios interceptor automatically refreshes the access token on `401` without user interaction
5. **Forgot Password** → user requests a reset OTP via email → resets password with OTP

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm v11+

### 1. Install dependencies

```bash
cd client
pnpm install
```

### 2. Set up environment variables

Create a `.env` file:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

### 3. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Other scripts

```bash
pnpm build    # Build for production (also strips console.* via SWC)
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## 🧹 Production Console Stripping

`next.config.ts` uses the SWC compiler to remove all `console.*` calls from production bundles at **compile time** (not runtime). `console.error` is preserved for error monitoring.

```ts
compiler: {
  removeConsole: process.env.NODE_ENV === "production"
    ? { exclude: ["error"] }
    : false,
}
```
