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
| [shadcn/ui](https://ui.shadcn.com/) | ^4 | Accessible UI components (AlertDialog, DropdownMenu, Drawer) |
| [Base UI](https://base-ui.com/) | ^1.7 | Headless UI primitives (Dropdown, Tooltip, Drawer) |
| [Axios](https://axios-http.com/) | ^1.20 | HTTP client with response interceptor |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.7 | Icon library |
| [Lucide React](https://lucide.dev/) | ^1.39 | Additional icon library |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | ^11 | Toast notifications |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | latest | Class name merging |
| [class-variance-authority](https://cva.style/) | ^0.7 | Component variant management |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) | ^1.4 | Tailwind animation utilities |
| pnpm | 12.4.1 | Package manager |

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
│   │   │   └── page.tsx          # Login page — renders <Login /> component
│   │   ├── register/
│   │   │   └── page.tsx          # Registration page — renders <Register /> component
│   │   ├── verify-account/
│   │   │   └── page.tsx          # Email OTP verification page — renders <VerifyAccount />
│   │   ├── forget-password/
│   │   │   └── page.tsx          # Forget password page — renders <ForgetPassword />
│   │   └── account/              # Account section (Sidebar layout)
│   │       ├── layout.tsx        # Account layout (NavBar + Sidebar + main content)
│   │       ├── profile/
│   │       │   └── page.tsx      # Profile page — renders <Profile />
│   │       ├── change-password/
│   │       │   └── page.tsx      # Change password page — renders <ChangePassword />
│   │       └── settings/
│   │           └── page.tsx      # Settings page — renders <Settings />
│   ├── components/
│   │   ├── main/                 # Feature / layout components
│   │   │   ├── Menu.tsx          # Mobile drawer navigation (Base UI Drawer) with sidebar links + logout
│   │   │   ├── NavBar.tsx        # Top navigation bar (logo, Menu drawer, login/register or profile avatar link)
│   │   │   ├── Sidebar.tsx       # Desktop sidebar navigation for the account section (data-driven links + logout)
│   │   │   ├── TaskInput.tsx     # New task form (accessible: sr-only label, aria-label on submit)
│   │   │   └── TaskModel.tsx     # Individual task card (checkbox, inline edit, delete dialog, dropdown)
│   │   ├── pages/                # Full-page client components (one per route)
│   │   │   ├── Login.tsx         # Login form logic & UI
│   │   │   ├── Register.tsx      # Registration form logic & UI
│   │   │   ├── VerifyAccount.tsx # OTP verification logic & UI
│   │   │   ├── ForgetPassword.tsx# Forget / reset password flow logic & UI
│   │   │   ├── Profile.tsx       # Profile view & edit (avatar upload, name edit)
│   │   │   ├── ChangePassword.tsx# Two-step change password: verify current → set new password
│   │   │   └── Settings.tsx      # Settings page — delete account with confirmation
│   │   ├── ui/                   # shadcn/ui + Base UI auto-generated components
│   │   │   ├── alert-dialog.tsx  # AlertDialog (shadcn/ui) — used for delete confirmations
│   │   │   ├── button.tsx        # shadcn/ui Button primitive
│   │   │   ├── drawer.tsx        # Drawer (Base UI) — mobile sidebar navigation
│   │   │   ├── dropdown-menu.tsx # DropdownMenu (shadcn/ui) — used in task options
│   │   │   └── tooltip.tsx       # Tooltip (Base UI) — accessible hover hints
│   │   └── utility/              # Shared reusable components
│   │       ├── Button.tsx        # Styled button (variants: primary, secondary, new, danger)
│   │       ├── Input.tsx         # Styled input field
│   │       ├── LinkButton.tsx    # Next.js Link styled as a button
│   │       ├── Logo.tsx          # App logo + name linking to "/"
│   │       └── SidebarLink.tsx   # Reusable sidebar link component (used by Sidebar & Menu)
│   ├── config/
│   │   ├── axios.config.ts       # Axios instance (baseURL + withCredentials)
│   │   └── env.config.ts         # Typed & exported client env vars (NEXT_PUBLIC_SERVER_URL)
│   ├── context/
│   │   └── AuthContext.tsx       # AuthProvider — user state, fetchCurrentUser, interceptor wiring
│   ├── data/
│   │   └── sidebar-links.ts      # Sidebar link config (Profile, Change Password, Settings) — shared by Sidebar & Menu
│   ├── lib/
│   │   ├── axios.ts              # Response interceptor: silent token refresh with request queue
│   │   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│   └── types/                    # Shared TypeScript types
│       ├── auth-context.types.ts # AuthContextType, AuthProviderProps, User
│       ├── button.types.ts       # ButtonVariant, ButtonProps
│       ├── input.types.ts        # InputProps
│       ├── login.types.ts        # LoginFormData
│       ├── menu.types.ts         # MenuProps (open, setOpen)
│       ├── profile.types.ts      # ProfileData
│       ├── register.types.ts     # RegisterFormData
│       ├── reset-password.types.ts # ResetPasswordProps, LinkSentModelProps, StatusVarients
│       ├── sidebar-links.types.ts # SidebarLinks, SidebarLinkProps
│       └── task.types.ts         # Task, TaskModelProps, TaskInputProps
├── .env                          # Environment variables (gitignored)
├── components.json               # shadcn/ui config
├── next.config.ts                # Next.js config (reactCompiler, removeConsole, Cloudinary remotePatterns)
└── tsconfig.json
```

---

## 🌐 Pages

| Route                     | Component                   | Description                                                           |
|---------------------------|-----------------------------|-----------------------------------------------------------------------|
| `/`                       | `page.tsx`                  | Task list — filter, add, complete & delete tasks                      |
| `/login`                  | `Login.tsx`                 | User login with email & password                                      |
| `/register`               | `Register.tsx`              | User registration                                                     |
| `/verify-account`         | `VerifyAccount.tsx`         | Enter OTP sent to email to activate account                           |
| `/forget-password`        | `ForgetPassword.tsx`        | Request a password reset OTP                                          |
| `/account/profile`        | `Profile.tsx`               | View & edit profile, upload avatar (Cloudinary, 5MB limit, type check)|
| `/account/change-password`| `ChangePassword.tsx`        | Two-step password change: verify current → set new                    |
| `/account/settings`       | `Settings.tsx`              | Account settings — permanently delete account                         |

> The `/account/*` routes share a common layout (`account/layout.tsx`) that wraps the content with **NavBar** and **Sidebar**.

---

## 🎨 Design System

- **Dark theme** with CSS custom properties defined in `globals.css`
- **Color tokens:** `background`, `foreground`, `accent`, `secondary-accent`, `gray`, `placeholder`, `edit`, `delete`
- **Typography:** Inter (primary), Geist Sans, Geist Mono via `next/font`
- **Styling:** Tailwind CSS v4 with custom tokens + `tw-animate-css` for animation utilities

---

## ♿ Accessibility

All interactive elements meet WCAG criteria:

- Every icon-only button has an `aria-label` (e.g. `"Add task"`, `"Delete task: Buy milk"`, `"More options for {task}"`)
- All form inputs have an associated `<label>` (`htmlFor` + matching `id`)
- Checkbox `id`s are unique per task (`taskStatus-{taskId}`) to avoid duplicate-ID violations
- Decorative icons carry `aria-hidden="true"` so screen readers skip them
- `sr-only` labels on screen-reader-only visually hidden labels
- Tooltips on icon-only buttons via `<Tooltip>` (Base UI) for additional context

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
6. **Account** (`/account/*`) → authenticated user can manage their account via Sidebar navigation:
   - **Profile** (`/account/profile`) — view avatar, name, email; upload new avatar with client validation (JPG, JPEG, PNG, WEBP; ≤ 5MB); edit first/last name inline
   - **Change Password** (`/account/change-password`) — two-step flow: first verify current password via `POST /user/confirm-password`, then set new password via `PATCH /user/update-password`
   - **Settings** (`/account/settings`) — account preferences

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
- **Mobile dropdown** — ellipsis button reveals Edit / Delete options on small screens (via shadcn/ui DropdownMenu)
- **Date badge** — shows `updatedAt` date in `dd MMM yy` format (hidden on mobile)

### `TaskInput.tsx`

New task form:
- Full-width input with an accent-colored submit button on the right
- Shows a spinner while adding; `sr-only` label + `aria-label` for accessibility

### `tooltip.tsx` (Base UI)

- Wraps Base UI's `Tooltip` primitives (`Provider`, `Root`, `Trigger`, `Content`, `Arrow`)
- Used to add accessible hover hints on icon-only buttons and interactive UI elements

### `drawer.tsx` (Base UI)

- Wraps Base UI's `Drawer` primitives (`Root`, `Trigger`, `Content`, `Header`, `Footer`)
- Used by `Menu.tsx` for the mobile sidebar drawer navigation

### `dropdown-menu.tsx` (shadcn/ui)

- Wraps shadcn/ui DropdownMenu primitives
- Used in `TaskModel` for the mobile ellipsis menu (Edit / Delete actions)

### `Menu.tsx`

Mobile drawer navigation:
- Uses Base UI `Drawer` with left swipe direction
- Shows `Logo` in header, data-driven sidebar links in the body, and a logout button in the footer
- Controlled via `open`/`setOpen` props passed from `NavBar`
- On link click: closes the drawer and navigates; active link highlighted with accent background

### `NavBar.tsx`

- Shows the **Menu** drawer trigger (hamburger icon, mobile only) and the **Logo** on the left
- If **logged in**: shows a circular profile image with user name linking to `/account/profile`
- If **logged out**: shows Login button (all screens) + Get Started button (desktop only)

### `Sidebar.tsx`

- Desktop-only sidebar navigation component rendered within the `/account/*` layout
- Uses data-driven links from `data/sidebar-links.ts` via `SidebarLink` component
- Includes a logout button at the bottom
- Active link highlighted with accent background and bold text

### `SidebarLink.tsx`

- Reusable link component shared by both `Sidebar` (desktop) and `Menu` (mobile drawer)
- Renders a `next/link` with icon + label, accepts custom `className` and optional `onClick` override

### `ChangePassword.tsx`

Two-step password change flow:
1. **Step 1 — Verify current password**: user enters current password → `POST /user/confirm-password`
2. **Step 2 — Set new password**: user enters new + confirm new password with show/hide toggles, real-time match indicator; submit disabled until passwords match → `PATCH /user/update-password`
- Back button to return to step 1

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm v12+

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

---

## 🖼️ Cloudinary Remote Images

Next.js Image component requires external hostnames to be whitelisted for optimization. In `next.config.ts`:

```ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  ],
}
```

