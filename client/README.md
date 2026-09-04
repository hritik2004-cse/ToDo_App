# 🖥️ Client — ToDo App Frontend

This is the **Next.js** frontend for the ToDo App. It communicates with the Express.js backend via REST API using Axios.

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.3.4 | React framework (App Router) |
| [React](https://react.dev/) | 19.2.8 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | ^4 | Accessible UI components |
| [Base UI](https://base-ui.com/) | ^1.7 | Headless UI primitives |
| [Axios](https://axios-http.com/) | ^1.20 | HTTP client |
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
│   │   ├── layout.tsx       # Root layout (fonts, metadata, icons)
│   │   ├── page.tsx         # Home / task list page
│   │   ├── globals.css      # Global styles & Tailwind theme tokens
│   │   ├── login/           # Login page
│   │   │   └── page.tsx
│   │   ├── register/        # Register page
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── icon0.svg
│   │   ├── icon1.png
│   │   ├── apple-icon.png
│   │   └── manifest.json
│   ├── components/
│   │   ├── main/            # Feature components
│   │   │   ├── NavBar.tsx
│   │   │   ├── TaskInput.tsx
│   │   │   └── TaskModel.tsx
│   │   ├── ui/              # shadcn/ui auto-generated components
│   │   └── utility/         # Shared reusable components
│   │       ├── Button.tsx
│   │       └── LinkButton.tsx
│   ├── config/
│   │   ├── axios.config.ts  # Axios instance with base URL & credentials
│   │   └── env.config.ts    # Validated environment variables
│   └── lib/
│       └── utils.ts         # cn() helper (clsx + tailwind-merge)
├── .env                     # Environment variables (gitignored)
├── components.json          # shadcn/ui config
├── next.config.ts
├── tailwind.config (via PostCSS)
└── tsconfig.json
```

---

## 🌐 Pages

| Route | Page | Description |
|---|---|---|
| `/` | `page.tsx` | Task list — view, add, complete & delete tasks |
| `/login` | `login/page.tsx` | User login |
| `/register` | `register/page.tsx` | User registration |

---

## 🎨 Design System

- **Dark theme** with CSS custom properties defined in `globals.css`
- **Color tokens:** `background`, `foreground`, `accent`, `secondary-accent`, `gray`, `placeholder`, `edit`, `delete`
- **Typography:** Inter (primary), Geist Sans, Geist Mono via `next/font`
- **Styling:** Tailwind CSS v4 with arbitrary values and custom tokens

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

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

### 3. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Other scripts

```bash
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## 🔗 API Communication

All API calls go through the configured Axios instance at `src/config/axios.config.ts`:

- Base URL from `NEXT_PUBLIC_SERVER_URL`
- `withCredentials: true` for cookie-based auth
- Base path: `/api/v1`
