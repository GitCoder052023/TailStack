import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Layers, Workflow, ArrowDown } from 'lucide-react';
import type { PatternCardProps, FlowStepProps } from '@/types/docs';

export function ArchitecturePage() {

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Architecture</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Architecture
        </h1>
        <p className="text-lg text-muted-foreground">
          Understanding the TailStack architecture and design patterns.
        </p>
      </div>

      <Separator />

      {/* Monorepo Structure */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Monorepo Structure
        </h2>
        <p className="leading-7">
          TailStack uses a monorepo structure to organize the frontend and backend
          packages together. This approach provides several benefits including shared
          dependencies, consistent tooling, and easier code sharing.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Frontend Package */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Frontend Package</h3>
                <p className="text-xs text-muted-foreground font-mono">source/frontend/</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                React application with Vite
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                TypeScript for type safety
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Tailwind CSS 4 for styling
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                shadcn/ui components
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                React Router for navigation
              </li>
            </ul>
          </div>

          {/* Backend Package */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Backend Package</h3>
                <p className="text-xs text-muted-foreground font-mono">source/Server/</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Express.js server
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                TypeScript for type safety
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                RESTful API architecture
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Service layer pattern
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Controller-Route separation
              </li>
            </ul>
          </div>

          {/* Automation Scripts */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <Workflow className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Automation Scripts</h3>
                <p className="text-xs text-muted-foreground font-mono">scripts/</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Cross-platform (PowerShell & Bash)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Smart Clean: Parallel `node_modules` purge
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Smart Install: Parallel pnpm orchestration
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Intelligent load monitoring (CPU & RAM)
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Design Patterns */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Design Patterns
        </h2>
        <p className="leading-7">
          TailStack follows established design patterns to ensure maintainable and scalable code:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <PatternCard
            title="MVC Pattern"
            description="Backend follows Model-View-Controller pattern with clear separation of concerns: Routes → Controllers → Services"
          />
          <PatternCard
            title="Component-Based"
            description="Frontend uses React's component-based architecture with reusable UI components from shadcn/ui"
          />
          <PatternCard
            title="API Client Pattern"
            description="Centralized API client in src/api/ for all server communication with type-safe requests"
          />
          <PatternCard
            title="Type Safety"
            description="Shared TypeScript types ensure consistency between frontend and backend"
          />
        </div>
      </div>

      {/* Data Flow */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Request Flow
        </h2>
        <p className="leading-7">
          Here's how data flows through the application from user interaction to server response:
        </p>

        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <FlowStep number={1} title="User Interaction">
              User interacts with a React component in the UI
            </FlowStep>
            <FlowArrow />
            <FlowStep number={2} title="API Call">
              Component calls an API client function from <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">src/api/</code>
            </FlowStep>
            <FlowArrow />
            <FlowStep number={3} title="HTTP Request">
              API client sends an HTTP request to the Express server
            </FlowStep>
            <FlowArrow />
            <FlowStep number={4} title="Route Handler">
              Express route receives and validates the request
            </FlowStep>
            <FlowArrow />
            <FlowStep number={5} title="Controller">
              Controller processes the request and coordinates the response
            </FlowStep>
            <FlowArrow />
            <FlowStep number={6} title="Service Layer">
              Service layer handles business logic and external API calls
            </FlowStep>
            <FlowArrow />
            <FlowStep number={7} title="Response">
              Data flows back through the chain to update the UI
            </FlowStep>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/getting-started">
            <ArrowLeft className="h-4 w-4" />
            Getting Started
          </Link>
        </Button>
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/frontend">
            Frontend
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function PatternCard({ title, description }: PatternCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function FlowStep({ number, title, children }: FlowStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
        {number}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}


function FlowArrow() {
  return (
    <div className="flex justify-center pl-4">
      <ArrowDown className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
