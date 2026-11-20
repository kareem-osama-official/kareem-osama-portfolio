# Kareem Osama — Signature Developer Portfolio & CMS

> **High-Performance Engineering Portfolio & Native Content Management System**  
> Combining experimental brutalist art direction, systems architecture depth, interactive telemetry, and a built-in administrative operating system.

---

## 🌟 Overview

This project is the official, bespoke developer portfolio for **Kareem Osama** — an ambitious software engineer specializing in low-level systems architecture, high-performance web engineering, and digital product design.

Designed and engineered from scratch with a distinctive dark canvas aesthetic (`#07080a` / `#0c0e14`), mint hairline technical accents (`#00ff9d`), live telemetry feeds, interactive engineering visualizers, and seamless bilingual support (English LTR and Arabic Cairo RTL).

---

## ✨ Key Features

### 1. Distinctive Visual & Motion Design
- **Brutalist Technical Interface:** Hairline dividers, mono code badges, precision grids, and telemetry badges.
- **Authentic Portrait Treatment:** High-resolution bust crop of Kareem Osama (`public/images/kareem-osama.jpg`) integrated into a customized technical frame with status pills and coordinates.
- **Interactive Engineering Previews:**
  - **Nexora Visualizer:** C++ memory allocator with live buffer pool allocation simulation.
  - **AlgoMind Visualizer:** Interactive Binary Search Tree (BST) visualizer with in-order traversal steps.
  - **Digital Atelier:** Admin telemetry dashboard with real-time FPS, cache hit ratios, and latency graphs.

### 2. Full Bilingual Architecture (English & Arabic)
- Instant toggle between English (LTR) and Arabic (RTL).
- Arabic mode powered by Google's **Cairo** font with proper contextual RTL mirroring, typography weighting, and native Arabic technical phrasing.

### 3. Integrated Admin Operating System (`/admin`)
Built-in administrative control center with session-based authentication:
- **Dashboard Overview:** Metric cards, recent activity logs, and system health monitors.
- **Profile Manager:** Update bio, hero copy, titles, social links, and coordinates.
- **Project CMS:** Add, edit, reorder, and publish engineering projects and case studies.
- **Skills Matrix:** Manage categories, proficiency percentages, and tool statuses.
- **Experience & Journey:** Curate career milestones and engineering timeline.
- **Message Dispatch:** Review incoming client inquiries and contact dispatches.
- **Media Library:** Asset management and portrait controls.
- **Appearance & Settings:** Theme overrides, security configuration, and cache purging.

### 4. Zero-Dependency Native SQLite Engine
- Utilizes Node.js native `DatabaseSync` (`node:sqlite`) with **Write-Ahead Logging (WAL)**.
- Automatic schema generation and seed provisioning on first boot (`data/portfolio.db`).
- Zero external database services or cloud connection strings required for local execution.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, React 19) |
| **Styling** | Tailwind CSS v4, Custom CSS Variables |
| **Icons** | Lucide React |
| **Database** | Node.js native `node:sqlite` (DatabaseSync, WAL mode) |
| **Typography** | Space Grotesk, JetBrains Mono, Cairo |
| **Runtime** | Node.js 20+ / 24+ |

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v20.0.0 or later (v24 recommended for native `node:sqlite`)
- **npm**, **pnpm**, or **yarn**

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <YOUR_REPOSITORY_URL>
cd <PORTFOLIO_DIR>
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```
*(The defaults in `.env.example` are pre-configured to run out of the box locally).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal output) in your browser.

### 5. Access the Admin Dashboard
Navigate to `/admin` in your browser:
- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@kareemosama.dev`
- **Password:** `KareemOsama2026!SecureAdmin`
*(Credentials can be updated in `.env` and `/admin/settings`).*

### 6. Production Build
Verify compilation and produce optimized production bundle:
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── data/                      # SQLite persistence (portfolio.db, auto-seeded)
├── public/
│   ├── images/                # Authentic portrait (kareem-osama.jpg)
│   └── ...
├── src/
│   ├── app/
│   │   ├── admin/             # Admin Dashboard sub-routes (/profile, /projects, /skills, etc.)
│   │   ├── api/               # API endpoints (auth, projects, skills, contact, etc.)
│   │   ├── globals.css        # Global styles & Cairo RTL font definitions
│   │   ├── layout.tsx         # Root layout with LanguageProvider
│   │   └── page.tsx           # Signature portfolio single-page application
│   ├── components/            # UI components (Header, Hero, Projects, Skills, Contact, Footer, etc.)
│   ├── context/               # LanguageContext (EN/AR state & translations)
│   ├── data/                  # Static fallbacks and data models
│   ├── lib/                   # db.ts (SQLite engine), auth.ts, crypto.ts
│   └── types/                 # TypeScript interfaces and node:sqlite type declarations
├── .env.example               # Template environment configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 🔒 Security & Code Integrity

- **Independent Project:** Standalone codebase with no external system dependencies.
- **Commit Safety:** `.gitignore` excludes binary SQLite databases and active WAL logs (`data/*.db*`), ensuring clean version control.
- **Session Security:** Signed cookies with constant-time cryptographic verification (`src/lib/crypto.ts`).

---

## 📜 License

Created with precision for **Kareem Osama**. All rights reserved.
