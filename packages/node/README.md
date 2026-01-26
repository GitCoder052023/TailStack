# TailStack - Node.js Architecture

![TailStack Logo](../../assets/logo.png)

This is the standalone **Node.js/Express Backend Architecture** template from TailStack. It provides a secure, scalable, and performance-optimized foundation for building REST APIs and microservices.

## 🚀 Technical Stack

- **Express 5**: Fast, unopinionated, minimalist web framework.
- **TypeScript**: Full type safety for backend logic.
- **Node Cluster**: Built-in support for utilizing multi-core systems.
- **Security**: Pre-configured **CORS**, **Cookie Parser**, and environment management.
- **TSX**: Modern TypeScript execution for development.

## Agent Skills
TailStack comes supercharged with pre-configured **Agent Skills** to accelerate AI-driven development.

### What are Agent Skills?
Skills are reusable capabilities for AI agents. They provide procedural knowledge that helps agents accomplish specific tasks more effectively. Think of them as plugins or extensions that enhance what your AI agents can do, enabling them to write, refactor, and optimize code with greater precision and domain-specific expertise.

### Pre-configured Skills in TailStack
  
1. **Node.js Backend Patterns**: This Skill is a Comprehensive guidance for building scalable, maintainable, and production-ready Node.js backend applications with modern frameworks, architectural patterns, and best practices.
- **Official Docs**: [https://skills.sh/wshobson/agents/nodejs-backend-patterns](https://skills.sh/wshobson/agents/nodejs-backend-patterns)

### Default Supported Agents 
- Gemini
- Claude
- Codex
- Cursor 
- Opencode
- Trae

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
