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
| [shadcn/ui](https://ui.shadcn.com/) | ^4 | Accessible UI components (AlertDialog) |
| [Base UI](https://base-ui.com/) | ^1.7 | Headless UI primitives (Dropdown) |
| [Axios](https://axios-http.com/) | ^1.20 | HTTP client with response interceptor |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.7 | Icon library |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | ^11 | Toast notifications |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | latest | Class name merging |
| pnpm | 11.24.0 | Package manager |

---

## 📁 Folder Structure

```
client/
├── public/                       # Static assets (icons, images)
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout (AuthProvider, fonts, metadata, ToastContainer)
│   │   ├── page.tsx              # Home / task list page (filter tabs, TaskInput, TaskModel list)
│   │   ├── globals.css           # Global styles & Tailwind theme tokens
│   │   ├── manifest.json         # PWA web app manifest
│   │   ├── login/
│   │   │   └── page.tsx          # Login page (email + password, show/hide toggle)
│   │   ├── register/
│   │   │   └── page.tsx          # Registration page
│   │   ├── verify-account/
│   │   │   └── page.tsx          # Email OTP verification page (post-register)
│   │   ├── forget-password/
│   │   │   └── page.tsx          # Forget password page (OTP-based reset flow)
│   │   └── profile/
│   │       └── page.tsx          # Profile page (avatar, first name, last name, email)
│   ├── components/
│   │   ├── main/                 # Feature components
│   │   │   ├── NavBar.tsx        # Top navigation bar (logo, login/register or profile avatar link)
│   │   │   ├── TaskInput.tsx     # New task form (accessible: sr-only label, aria-label on submit)
│   │   │   └── TaskModel.tsx     # Individual task card (checkbox, inline edit, delete dialog, dropdown)
│   │   ├── ui/                   # shadcn/ui + Base UI auto-generated components
│   │   └── utility/              # Shared reusable components
│   │       ├── Button.tsx        # Styled button (variants: primary, secondary, new, danger)
│   │       ├── Input.tsx         # Styled input field
│   │       ├── LinkButton.tsx    # Next.js Link styled as a button
│   │       └── Logo.tsx          # App logo + name linking to "/"
│   ├── config/
│   │   ├── axios.config.ts       # Axios instance (baseURL + withCredentials)
│   │   └── env.config.ts         # Typed & exported client env vars (NEXT_PUBLIC_SERVER_URL)
│   ├── context/
│   │   └── AuthContext.tsx       # AuthProvider — user state, fetchCurrentUser, interceptor wiring
│   ├── lib/
│   │   ├── axios.ts              # Response interceptor: silent token refresh with request queue
│   │   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│   └── types/                    # Shared TypeScript types
│       ├── auth-context.types.ts # AuthContextType, AuthProviderProps, User
│       ├── button.types.ts       # ButtonVariant, ButtonProps
│       ├── input.types.ts        # InputProps
│       ├── login.types.ts        # LoginFormData
│       ├── register.types.ts     # RegisterFormData
│       ├── reset-password.types.ts # ResetPasswordProps, LinkSentModelProps, StatusVarients
│       └── task.types.ts         # Task, TaskModelProps, TaskInputProps
├── .env                          # Environment variables (gitignored)
├── components.json               # shadcn/ui config
├── next.config.ts                # Next.js config (reactCompiler, removeConsole in production)
└── tsconfig.json
```

---

## 🌐 Pages

| Route              | Page                        | Description                                        |
|--------------------|-----------------------------|----------------------------------------------------|
| `/`                | `page.tsx`                  | Task list — filter, add, complete & delete tasks   |
| `/login`           | `login/page.tsx`            | User login with email & password                   |
| `/register`        | `register/page.tsx`         | User registration                                  |
| `/verify-account`  | `verify-account/page.tsx`   | Enter OTP sent to email to activate account        |
| `/forget-password` | `forget-password/page.tsx`  | Request a password reset OTP                       |
| `/profile`         | `profile/page.tsx`          | View/edit profile (avatar, name, email)            |

---

## 🎨 Design System

- **Dark theme** with CSS custom properties defined in `globals.css`
- **Color tokens:** `background`, `foreground`, `accent`, `secondary-accent`, `gray`, `placeholder`, `edit`, `delete`
- **Typography:** Inter (primary), Geist Sans, Geist Mono via `next/font`
- **Styling:** Tailwind CSS v4 with custom tokens

---

## ♿ Accessibility

All interactive elements meet WCAG criteria:

- Every icon-only button has an `aria-label` (e.g. `"Add task"`, `"Delete task: Buy milk"`, `"More options for {task}"`)
- All form inputs have an associated `<label>` (`htmlFor` + matching `id`)
- Checkbox `id`s are unique per task (`taskStatus-{taskId}`) to avoid duplicate-ID violations
- Decorative icons carry `aria-hidden="true"` so screen readers skip them
- `sr-only` labels on screen-reader-only visually hidden labels

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
5. **Forgot Password** (`/forget-password`) → user requests a reset OTP via email → resets password with OTP
6. **Profile** (`/profile`) → authenticated user can view their avatar, name and email

### Auth Context (`src/context/AuthContext.tsx`)

- Provides `user`, `userLoading`, `setUser`, `setUserLoading`, `fetchCurrentUser` to all children
- On mount: registers the `onAuthFailure` handler (clears user on refresh failure) and calls `fetchCurrentUser()`
- `fetchCurrentUser()` hits `GET /user/me` — sets `user` or clears it on error

---

## 🧩 Components

### `TaskModel.tsx`

Individual task card with:
- **Checkbox** — marks task as completed (optimistic UI, one-way — disabled once checked)
- **Inline edit** — clicking the edit button makes the text input editable; border turns accent-colored; save with the save icon button
- **Delete dialog** — AlertDialog confirmation before deleting (via shadcn/ui)
- **Mobile dropdown** — ellipsis button reveals Edit / Delete options on small screens (via Base UI Dropdown)
- **Date badge** — shows `updatedAt` date in `dd MMM yy` format (hidden on mobile)

### `TaskInput.tsx`

New task form:
- Full-width input with an accent-colored submit button on the right
- Shows a spinner while adding; `sr-only` label + `aria-label` for accessibility

### `NavBar.tsx`

- Shows the **Logo** on the left
- If **logged in**: shows a circular profile image linking to `/profile`
- If **logged out**: shows Login button (all screens) + Get Started button (desktop only)

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
