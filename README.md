# use-synk.com

The landing page and waitlist for **Synk** — an open-source, AI-native documentation tool that automatically generates and keeps your docs in sync with your codebase.

> **Closed beta coming soon.** Join the waitlist at [use-synk.com](https://use-synk.com/).

---

## What is Synk?

Synk lets developers focus on writing code while it handles documentation automatically. It watches your codebase for changes and uses AI to generate, update, and maintain accurate documentation — so your docs never fall behind.

Key highlights:
- **AI-native** — Documentation generated and updated by AI as your code evolves
- **Framework-agnostic** — Works with any language or framework
- **Open-source** — Self-hostable, transparent, and community-driven
- **Always in sync** — Docs stay current without manual effort

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, Shadcn UI |
| Database | PostgreSQL via [Neon](https://neon.tech) Serverless |
| ORM | Drizzle ORM |
| Email | Resend + React Email |
| Forms | TanStack React Form + Zod |
| Linting | Biome |
| Package Manager | Bun |

---

## Project Structure

```
use-synk.com/
├── src/
│   ├── app/
│   │   ├── (app)/              # Route group for the main site
│   │   │   ├── page.tsx        # Home page
│   │   │   └── legal/          # Privacy policy & Terms of service (MDX)
│   │   └── actions/
│   │       └── waitlist.ts     # Server action: waitlist signup
│   ├── components/
│   │   ├── sections/           # Page sections (hero, features, roadmap, callout)
│   │   └── ui/                 # Reusable UI components
│   ├── db/
│   │   ├── schema.ts           # Drizzle ORM schema
│   │   └── index.ts            # Database client
│   ├── emails/
│   │   └── waitlist-confirmation.tsx  # Transactional email template
│   ├── lib/
│   │   ├── config.ts           # Site config and routes
│   │   ├── resend.ts           # Email client
│   │   └── utils.ts            # Utility helpers
│   └── env.js                  # Environment variable validation
├── public/                     # Static assets
├── drizzle.config.ts           # Drizzle migration config
├── biome.jsonc                 # Linter and formatter config
└── next.config.js              # Next.js config (MDX support)
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.3.0`
- A PostgreSQL database (a free [Neon](https://neon.tech) project works great)
- A [Resend](https://resend.com) account for transactional email

### 1. Clone the repository

```bash
git clone https://github.com/use-synk/use-synk.com.git
cd use-synk.com
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string (e.g. from Neon) |
| `RESEND_API_KEY` | Yes | API key from your Resend account |
| `UNSUBSCRIBE_SECRET` | Yes | Secret for signing unsubscribe links (min. 32 characters) |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL (defaults to `http://localhost:3000`) |

### 4. Set up the database

Generate and apply the database migrations:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

### 5. Start the development server

```bash
bun dev
```

The app is now running at [http://localhost:3000](http://localhost:3000).

### Preview email templates

To preview transactional email templates locally:

```bash
bun email
```

The React Email preview server runs at [http://localhost:3001](http://localhost:3001).

---

## Available Scripts

| Script | Description |
|---|---|
| `bun dev` | Start the Next.js dev server with Turbo |
| `bun build` | Build for production |
| `bun start` | Start the production server |
| `bun preview` | Build and start production server |
| `bun email` | Start the React Email preview server |
| `bun check` | Run Biome linter and formatter checks |
| `bun check:write` | Auto-fix linting and formatting issues |
| `bun check:unsafe` | Auto-fix including unsafe rules |
| `bun typecheck` | Run TypeScript type checking |

---

## Contributing

We welcome contributions of all kinds — bug reports, feature suggestions, documentation improvements, and code changes.

### Reporting issues

Before opening an issue, please check if one already exists. When filing a bug report, include:
- A clear description of the problem
- Steps to reproduce it
- What you expected to happen vs. what actually happened
- Your environment (OS, Bun version, Node version if relevant)

Open issues at: [github.com/use-synk/use-synk.com/issues](https://github.com/use-synk/use-synk.com/issues)

### Development workflow

1. **Fork** the repository and clone your fork locally.

2. **Create a branch** from `master` for your change:
   ```bash
   git checkout -b feat/my-feature
   # or
   git checkout -b fix/my-bug
   ```
   Use a descriptive prefix: `feat/`, `fix/`, `docs/`, `refactor/`, `chore/`.

3. **Make your changes.** Follow the conventions described below.

4. **Check your code** before committing:
   ```bash
   bun check:write   # Fix formatting and linting
   bun typecheck     # Ensure no TypeScript errors
   ```

5. **Commit your changes** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add email unsubscribe link
   fix: resolve duplicate waitlist signup error
   docs: update environment variable docs
   ```

6. **Push your branch** and open a pull request against `master`.

7. **Describe your PR** — explain what changed, why, and how to test it. Link to any relevant issues.

### Code conventions

This project uses [Biome](https://biomejs.dev/) for both linting and formatting — there is no separate ESLint or Prettier config.

- **Indentation:** Tabs (width 1)
- **Imports:** Organized and sorted automatically by Biome
- **Tailwind classes:** Must be sorted (enforced via `useSortedClasses`). Use the `cn()`, `clsx()`, or `cva()` helpers.
- **TypeScript:** Strict mode is enabled. Avoid `any` unless absolutely necessary.
- **Server vs. Client:** Prefer React Server Components. Only add `"use client"` when you need browser APIs or interactivity.
- **Environment variables:** All env vars must be declared and validated in `src/env.js`.

Running `bun check:write` before committing will automatically fix most style issues.

### Pull request checklist

Before submitting a PR, confirm the following:

- [ ] `bun check:write` passes with no errors
- [ ] `bun typecheck` passes with no errors
- [ ] The change is scoped — one feature or fix per PR
- [ ] New environment variables are added to `.env.example` and `src/env.js`
- [ ] Any new pages or routes are accessible and responsive

---

## License

This project's source is available publicly. See [LICENSE](./LICENSE) for details.
