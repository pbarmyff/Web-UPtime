<div align="center">
  <h1>UptimeMonitor: Open Source Next.js Uptime Tracker</h1>
  <p><strong>A self-hosted, production-ready Pingdom alternative built entirely on Next.js 15.</strong></p>
  <p>Monitor your websites, APIs, and Cron jobs. Track incidents, track SSL certificates, and generate beautiful free status pages without relying on a separate backend.</p>
</div>

![UptimeMonitor Landing Page](./public/screenshots/landing.png)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-blue?style=flat&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Why UptimeMonitor?

If you are looking for an **open source uptime monitor**, a **self-hosted Pingdom alternative**, or a **free status page generator**, UptimeMonitor delivers a premium enterprise experience straight out of the box.

Unlike typical Next.js apps that rely on Vercel Cron or external services to trigger background tasks, **UptimeMonitor** runs its own persistent monitoring engine natively inside Next.js using `instrumentation.ts`.

## 🚀 Core Features

### 📡 API Monitoring & Uptime Tracking
*   **Multi-Protocol Checks:** Native support for HTTP(S), PING, and HEARTBEAT (Cron) checks.
*   **Deep Inspection:** Configure HTTP methods, custom request bodies, specific headers, and validate response payloads for specific keywords.
*   **Smart Retry Logic:** Say goodbye to false positives. Configure automatic retries on transient network errors before an incident is declared.

### 🔒 Security & SSL Monitoring
*   **SSL Expiry Tracking:** Automatically intercepts HTTPS handshakes to read the underlying `PeerCertificate`, alerting you days before an SSL cert expires.
*   **Role-Based Access Control (RBAC):** Integrated NextAuth.js v4. The first user to register is automatically elevated to `ADMIN`.
*   **In-Memory Rate Limiting:** Built-in protection against brute-force login attempts and DDoS attacks on public API endpoints.
*   **Anti-Mass Assignment:** All `PATCH` and `POST` routes are strictly typed using **Zod** validation schemas.

### 📢 Incident Management & Alerting
*   **Automated Lifecycle:** When a monitor fails, an `ONGOING` incident is created. When it recovers, the incident is automatically marked `RESOLVED`.
*   **Alert Rules:** Configure Webhook and Email alerts to notify your team the second an outage occurs.
*   **Maintenance Windows:** Schedule maintenance windows to temporarily suppress downtime alerts and pause pinging.

### 🌐 Free Status Page Generator
*   Generate beautiful, responsive, public-facing pages (`/status/[slug]`) to transparently communicate system health and ongoing incidents with your customers.

## 💾 Multi-Database Support (SQLite, PostgreSQL, MySQL)

UptimeMonitor uses Prisma ORM and dynamically switches database providers entirely through environment variables. By default, it uses a local SQLite database for zero-config rapid development.

When you run `npm run dev`, `npm run build`, or `npm run db:push`, a pre-script automatically configures Prisma based on your `.env` file.

**For local SQLite (Default):**
Leave your `.env` completely empty, or set it explicitly:
```env
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./dev.db"
```

**For PostgreSQL (Supabase / Neon / Vercel Postgres):**
Update your `.env`:
```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgres://user:password@host:5432/dbname"
```

**For MySQL (PlanetScale / RDS):**
Update your `.env`:
```env
DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://user:password@host:3306/dbname"
```

After updating your `.env`, sync your database:
```bash
npm run db:push
```

## 🛠️ Getting Started Locally

### Prerequisites
*   Node.js 20+
*   npm or pnpm

### Quick Setup

1.  **Clone & Install Dependencies**
    ```bash
    git clone https://github.com/your-username/uptime-monitor.git
    cd uptime-monitor
    npm install
    ```

2.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_PROVIDER="sqlite"
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_SECRET="your_super_secret_random_key_here"
    NEXTAUTH_URL="http://localhost:3000"
    ```

3.  **Initialize the Database**
    ```bash
    npm run db:push
    ```

4.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    *Note: Next.js HMR (Hot Module Replacement) can sometimes trigger multiple background loops in development. For accurate background polling behavior, test against a production build.*

### Production Build
```bash
npm run build
npm run start
```

## 🎨 UI/UX Design

UptimeMonitor features a highly custom, premium aesthetic referred to as **Deep Navy Modern**.
*   **Theme:** `#070D1F` Background, `#0F1A35` Surface, `#4FFFB0` Electric Accent.
*   **Typography:** Google Fonts Inter (sans) and Syne (display/headings).
*   **Styling Rules:** Absolutely no drop shadows, no rounded corners (`rounded-none`), and no generic component libraries. Relies heavily on asymmetric grid layouts and sharp flat borders.
*   **Framer Motion:** Extensive use of `framer-motion` for entrance animations, staggered grid load-ins, scroll-linked parallax, and micro-interactions. Includes a custom mouse-tracking cursor.

## 📝 License
This project is open-sourced software licensed under the MIT license.
