# TailStack - React Architecture

![TailStack Logo](../../assets/logo.png)

This is the standalone **React Frontend Architecture** template from TailStack. It provides a modern, high-performance foundation for building client-side applications.

## 🚀 Technical Stack

- **Vite 6**: Lightning-fast build tool and dev server.
- **React 19**: The latest version of the world's most popular UI library.
- **Tailwind CSS 4**: Utility-first CSS with the new engine for better performance.
- **Shadcn UI**: Accessible and customizable UI components.
- **Lucide React**: Clean and consistent icon set.
- **React Router 7**: Robust routing for single-page applications.
- **Sonner**: Opinionated toast notifications.

### Agent Skills
TailStack comes supercharged with pre-configured **Agent Skills** to accelerate AI-driven development.

#### What are Agent Skills?
Skills are reusable capabilities for AI agents. They provide procedural knowledge that helps agents accomplish specific tasks more effectively. Think of them as plugins or extensions that enhance what your AI agents can do, enabling them to write, refactor, and optimize code with greater precision and domain-specific expertise.

#### Pre-configured Skills in TailStack
1. **Vercel React Best Practices**: A comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. It contains 57 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.
- **Official Docs**: [https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices)

2. **Tailwind v4 + shadcn/ui Production Stack**: This skill enables AI agents to correctly generate, modify, and work with components from shadcn/ui and the new Tailwind CSS v4 engine. It understands the nuances of both technologies, ensuring idiomatic and production-quality results.

- **Official Docs**: [https://skills.sh/jezweb/claude-skills/tailwind-v4-shadcn](https://skills.sh/jezweb/claude-skills/tailwind-v4-shadcn)

#### Default Supported Agents 
- Gemini
- Claude
- Codex
- Cursor 
- Opencode
- Trae

## 📂 Structure

```bash
react/
├── src/
│   ├── components/     # Reusable UI components (Shadcn + Custom)
│   ├── pages/          # Application pages/screens
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── public/             # Static assets
```

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```
The application will be accessible at `http://localhost:5173`.

### 3. Build for Production
```bash
pnpm build
```

---

Built with the [TailStack Architecture](https://github.com/GitCoder052023/TailStack/blob/main/README.md).
