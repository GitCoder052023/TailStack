# TailStack

![TailStack Logo](assets/logo.png)

<div align="center">

**The Ultimate Production-Grade Monorepo Architecture Template for ERN Stack (Express, React, Node.js)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](Docs/CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg)](https://tailwindcss.com/)

[Report Bug](https://github.com/GitCoder052023/TailStack/issues) · [Request Feature](https://github.com/GitCoder052023/TailStack/issues)

</div>

---

## Introduction

**TailStack** is a Production-Grade **Project Architecture** and boilerplate designed to serve as a robust starting point for your **ERN** (Express, React, Node.js) monorepos.

It implements the **TailStack Architecture**—a proven structure I personally use for full-stack development—providing a scalable, secure, and maintainable foundation. It includes industry-standard tooling, rigorous linting, and a beautiful UI system, all pre-configured so you can hit the ground running.

**Not a rigid framework**, TailStack is designed to be fully customizable. Whether you are building a startup MVP or a large-scale enterprise solution, it offers the perfect customizable launchpad to adapt to your specific needs.

## Features

### Frontend (Client)
Experience a modern, lightning-fast development environment:
- **Vite**: Next-generation frontend tooling.
- **React**: Built on the world's most popular UI library.
- **Tailwind CSS**: Utility-first CSS for rapid UI development.
- **Shadcn UI**: Reusable, accessible, and customizable components.
- **Lucide React**: Beautiful & consistent icons.
- **Sonner**: An opinionated toast component for React.
- **React Router**: Declarative routing for your application.
- **Weather App Demo**: Includes a fully functional multi-page weather application to showcase the architecture.

###  Backend (Server)
A robust and scalable server-side foundation:
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Type safety for reliable and maintainable code.
- **Node Cluster**: Utilizes multi-core systems for maximum performance.
- **Security**: Pre-configured **CORS** and security best practices.

###  Monorepo & Development Tools
TailStack allows you to focus on code, not configuration:
- **Commitlint**: Enforces Conventional Commits for clean history.
- **Husky**: Git hooks for pre-commit linting and security checks.
- **Automation Scripts**: Smart Automation utilities for high-velocity development (in `scripts/`):
  - `clean.ps1`: Lightning-fast deep purge of `node_modules` and locks.
  - `install.ps1`: parallel installer with intelligent CPU/RAM load monitoring.
- **Documentation**: Ready-to-use `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md`.
- **Configs**: Standardized `.npmrc`, `.nvmrc`, and `.node-version` for consistent environments.

## Packages

TailStack provides three distinct architecture templates within the `packages/` directory:

### 1. [Core](./packages/core) (Monorepo)
The flagship **TailStack Architecture**. A complete monorepo setup featuring an **ERN Stack** (Express, React, Node.js) with pre-configured inter-service communication, shared configurations, and deployment-ready workflows.
- **Best for**: Full-stack applications, startups, and complex projects requiring a unified codebase.

### 2. [React](./packages/react) (Frontend Only)
A focused frontend project architecture based on **Vite + React**. It includes a premium UI setup with Tailwind CSS 4, Shadcn UI, and modern routing.
- **Best for**: Client-side applications, dashboards, and landing pages.

### 3. [Node](./packages/node) (Backend Only)
A robust backend foundation using **Express + TypeScript**. It features advanced Node.js optimizations like clustering, security best practices, and a clean directory structure.
- **Best for**: REST APIs, microservices, and backend-only utilities.

---

### Automation Scripts

TailStack includes advanced Automation scripts to manage your monorepo efficiently:

#### 1. Smart Clean (`scripts/clean.ps1`)
A high-velocity two-phase purge that removes all `node_modules` and `pnpm-lock.yaml` files.
- **Speed**: Uses parallel processing for faster deletion.
- **Reliability**: Forcefully kills locking processes (Node, VS Code) and uses a 3-retry verification loop for stubborn files.

#### 2. Smart Install (`scripts/install.ps1`)
A  parallel installer designed for stability on any hardware.
- **Parallelism**: Installs dependencies for all projects in the monorepo concurrently.
- **Load Monitoring**: Intelligent state machine that monitors CPU and RAM. It automatically suspends installation processes if system load exceeds 90% and resumes when it drops below 75%.
- **Anti-Crash**: Prevents system hangs during heavy dependency resolution.

---

## Getting Started

TailStack is distributed as a set of standalone templates. You can quickly scaffold a new project by pulling a specific architecture directly from the `packages/` directory using `npx degit` or `curl`. This allows you to start a new project with a clean Git history.

### Quick Start (Recommended)

Run the following command in your terminal, replacing `<template>` with `core`, `react`, or `node`, and `<project-name>` with your desired folder name.

```bash
# Usage: npx degit GitCoder052023/TailStack/packages/<template> <project-name>

# Example: Scaffold the full ERN Monorepo
npx degit GitCoder052023/TailStack/packages/core my-awesome-app

# Example: Scaffold only the React Frontend into the current directory
npx degit GitCoder052023/TailStack/packages/react .

```

### Method B: Using curl (Lightweight / No Node.js required)

If you don't have Node.js installed or prefer a shell-native way, use this command to download and extract only the specific package:

```bash
# Usage: replace <template> with core, react, or node
curl -L https://github.com/GitCoder052023/TailStack/archive/refs/heads/main.tar.gz | tar -xz --strip-components=2 TailStack-main/packages/<template>

```

### Manual Installation

If you prefer to explore the entire repository or contribute to the project, you can clone the monorepo manually:

1. **Clone the repository:**
```bash
git clone https://github.com/GitCoder052023/TailStack.git

```


2. **Navigate to your desired architecture:**
```bash
cd TailStack/packages/[core|react|node]

```


3. **Initialize dependencies:**
Follow the specific `README.md` instructions found within each package directory to set up environment and start development within that template.

## Contributing

Contributions are what make the open-source community such an amazing place. We welcome improvements to any of our templates! Please see [CONTRIBUTING.md](Docs/CONTRIBUTING.md) for details.

---

<p align="center">
  Built with the <strong>TailStack Architecture</strong>.
</p>
