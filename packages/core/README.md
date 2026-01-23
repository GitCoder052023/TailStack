# TailStack

![TailStack Logo](assets/logo.png)

<div align="center">

**The Ultimate Production-Grade Monorepo Architecture Template for ERN Stack (Express, React, Node.js)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](Docs/CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg)](https://tailwindcss.com/)

[Report Bug](https://github.com/yourusername/tailstack/issues) · [Request Feature](https://github.com/yourusername/tailstack/issues)

</div>

---

## Introduction

**TailStack** is a Production-Grade **Project Architecture** and boilerplate designed to serve as a robust starting point for your **ERN** (Express, React, Node.js) monorepos.

It implements the **TailStack Architecture**—a proven structure I personally use for full-stack development—providing a scalable, secure, and maintainable foundation. It includes industry-standard tooling, rigorous linting, and a beautiful UI system, all pre-configured so you can hit the ground running.

**Not a rigid framework**, TailStack is designed to be fully customizable. Whether you are building a startup MVP or a large-scale enterprise solution, it offers the perfect customizable launchpad to adapt to your specific needs.

## Features

### Frontend (Client)
Experience a modern, lightning-fast development environment:
- ** Vite**: Next-generation frontend tooling.
- ** React**: Built on the world's most popular UI library.
- ** Tailwind CSS**: Utility-first CSS for rapid UI development.
- ** Shadcn UI**: Reusable, accessible, and customizable components.
- ** Lucide React**: Beautiful & consistent icons.
- ** Sonner**: An opinionated toast component for React.
- ** React Router**: Declarative routing for your application.
- ** Weather App Demo**: Includes a fully functional multi-page weather application to showcase the architecture.

###  Backend (Server)
A robust and scalable server-side foundation:
- ** Express**: Fast, unopinionated, minimalist web framework for Node.js.
- ** TypeScript**: Type safety for reliable and maintainable code.
- ** Node Cluster**: Utilizes multi-core systems for maximum performance.
- ** Security**: Pre-configured **CORS** and security best practices.

###  Monorepo & DevOps Tools
TailStack allows you to focus on code, not configuration:
- ** Commitlint**: Enforces Conventional Commits for clean history.
- ** Husky**: Git hooks for pre-commit linting and security checks.
- ** Shell Scripts**: Automated utilities for repetitive tasks (in `scripts/`).
- ** Documentation**: Ready-to-use `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md`.
- ** Configs**: Standardized `.npmrc`, `.nvmrc`, and `.node-version` for consistent environments.

## Project Structure

A glimse into the **TailStack** organization:

```bash
TailStack/
├── assets/                 # Static assets (images, logos)
├── Docs/                   # Application & Community documentation
│   ├── CODE_OF_CONDUCT.md
│   ├── CONTRIBUTING.md
│   └── SECURITY.md
├── scripts/                # internal shell automation scripts
├── source/
│   ├── frontend/           # The Vite+React Client Application
│   │   ├── src/
│   │   │   ├── components/ # Shadcn UI & Custom Components
│   │   │   ├── pages/      # pages
│   │   │   └── ...
│   │   └── vite.config.ts
│   └── Server/             # The Express+TS Backend Application
│       ├── src/
│       │   ├── cluster/    # Node Cluster logic
│       │   ├── routes/     # API Routes
│       │   └── ...
│       └── tsconfig.json
├── .husky/                 # Git hooks configuration
├── package.json            # Root workspace configuration
└── README.md
```

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **pnpm** (TailStack uses pnpm)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/GitCoder052023/TailStack.git
    cd TailStack
    ```

2.  **Install Dependencies**
    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Navigate to `source/frontend` and `source/Server`, and rename `.env.example` to `.env`. Update variables as needed.

### Running the Application

To start both the client and server concurrently in development mode:

```bash
npm run dev
```

- **Frontend**: Accessible at `http://localhost:5173`
- **Backend**: API server running on `http://localhost:3000` (or your configured port)

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

---

<p align="center">
  Built with the <strong>TailStack Architecture</strong>.
</p>
