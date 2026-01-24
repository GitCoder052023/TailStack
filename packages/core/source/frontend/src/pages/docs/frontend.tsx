import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/ui/code-block';
import { ArrowLeft, ArrowRight, Palette, Zap, Layout, Shield } from 'lucide-react';
import type { TechCardProps, FeatureCardProps } from '@/types/docs';

export function FrontendPage() {

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Frontend</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Frontend Guide
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn about the React frontend structure, components, and best practices.
        </p>
      </div>

      <Separator />

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Technology Stack
        </h2>
        <p className="leading-7">
          The frontend is built with modern tools and libraries:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <TechCard
            icon={<Zap className="h-5 w-5" />}
            title="React 19"
            description="Modern React with hooks and functional components"
            color="text-blue-500"
          />
          <TechCard
            icon={<Shield className="h-5 w-5" />}
            title="TypeScript"
            description="Full type safety across the application"
            color="text-blue-600"
          />
          <TechCard
            icon={<Zap className="h-5 w-5" />}
            title="Vite"
            description="Lightning-fast build tool with instant HMR"
            color="text-purple-500"
          />
          <TechCard
            icon={<Palette className="h-5 w-5" />}
            title="Tailwind CSS 4"
            description="Utility-first CSS framework for rapid UI development"
            color="text-cyan-500"
          />
          <TechCard
            icon={<Layout className="h-5 w-5" />}
            title="shadcn/ui"
            description="Beautiful, accessible, and customizable components"
            color="text-foreground"
          />
          <TechCard
            icon={<Zap className="h-5 w-5" />}
            title="React Router"
            description="Declarative routing for single-page applications"
            color="text-red-500"
          />
        </div>
      </div>

      {/* Directory Structure */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Directory Structure
        </h2>
        <p className="leading-7">
          The frontend follows a clean and organized directory structure:
        </p>
        <CodeBlock
          code={`src/
├── api/              # API client functions
│   └── weather.api.ts
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── layout/       # Layout components
│   └── ...
├── pages/            # Page components
│   ├── home.tsx
│   ├── docs/
│   └── weather.tsx
├── hooks/            # Custom React hooks
│   └── use-theme.ts
├── types/            # TypeScript type definitions
├── config/           # Configuration files
├── lib/              # Utility functions
└── utils/            # Helper functions`}
          language="plaintext"
          showLineNumbers
        />
      </div>

      {/* Key Concepts */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Key Concepts
        </h2>

        {/* Components */}
        <div className="space-y-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Components
          </h3>
          <p className="leading-7">
            Components are organized into two main categories:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                components/ui/
              </code>
              {" "}- shadcn/ui primitives like Button, Card, Input
            </li>
            <li>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                components/layout/
              </code>
              {" "}- Layout components like Navbar, Footer
            </li>
          </ul>
        </div>

        {/* Pages */}
        <div className="space-y-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Pages
          </h3>
          <p className="leading-7">
            Pages represent full views in the application and are connected to routes:
          </p>
          <CodeBlock
            code={`// App.tsx - Route configuration
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/weather" element={<WeatherPage />} />
  <Route path="/docs" element={<DocsPage />}>
    <Route index element={<DocsOverview />} />
    <Route path="getting-started" element={<GettingStartedPage />} />
  </Route>
</Routes>`}
            language="tsx"
          />
        </div>

        {/* API Client */}
        <div className="space-y-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            API Client
          </h3>
          <p className="leading-7">
            API calls are centralized in the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">api/</code> directory
            using Axios for type-safe HTTP requests:
          </p>
          <CodeBlock
            code={`// api/weather.api.ts
import axios from 'axios';
import type { WeatherData } from '@/types/weather';

const API_BASE = 'http://localhost:5000/api';

export const weatherApi = {
  getWeatherByLocation: async (location: string): Promise<WeatherData> => {
    const response = await axios.get(\`\${API_BASE}/weather/location\`, {
      params: { location },
    });
    return response.data;
  },
};`}
            language="typescript"
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Key Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureCard
            title="Theme Support"
            description="Built-in light/dark theme toggle using CSS variables and localStorage persistence."
          />
          <FeatureCard
            title="API Integration"
            description="Centralized API client using Axios for type-safe server communication."
          />
          <FeatureCard
            title="Component Library"
            description="Pre-configured shadcn/ui components ready to use and customize."
          />
          <FeatureCard
            title="Type Safety"
            description="Shared types between frontend and backend for consistency."
          />
        </div>
      </div>

      {/* Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/architecture">
            <ArrowLeft className="h-4 w-4" />
            Architecture
          </Link>
        </Button>
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/backend">
            Backend
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function TechCard({ icon, title, description, color }: TechCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

