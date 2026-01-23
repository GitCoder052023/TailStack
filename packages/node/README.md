# TailStack - Node.js Architecture

![TailStack Logo](../../assets/logo.png)

This is the standalone **Node.js/Express Backend Architecture** template from TailStack. It provides a secure, scalable, and performance-optimized foundation for building REST APIs and microservices.

## 🚀 Technical Stack

- **Express 5**: Fast, unopinionated, minimalist web framework.
- **TypeScript**: Full type safety for backend logic.
- **Node Cluster**: Built-in support for utilizing multi-core systems.
- **Security**: Pre-configured **CORS**, **Cookie Parser**, and environment management.
- **TSX**: Modern TypeScript execution for development.

## 📂 Structure

```bash
node/
├── src/
│   ├── cluster/        # Multi-core clustering logic
│   ├── routes/         # API Route definitions
│   ├── index.ts        # Server entry point
│   └── app.ts          # Express application setup
├── .env.example        # Environment variable template
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
Rename `.env.example` to `.env` and adjust the variables.

### 3. Start Development Server
```bash
pnpm dev
```
(Note: Ensure your `package.json` has a `dev` script. If not, you can run `npx tsx src/index.ts`)

### 4. Build for Production
```bash
pnpm build
```

---

Built with the [TailStack Architecture](../../README.md).
