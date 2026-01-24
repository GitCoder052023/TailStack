import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PatternCard } from '@/components/docs/pattern-card';
import { FlowStep, FlowArrow } from '@/components/docs/flow-step';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';

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
          Understanding the TailStack React architecture and design patterns.
        </p>
      </div>

      <Separator />

      {/* Project Structure */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Project Structure
        </h2>
        <p className="leading-7">
          TailStack React follows a modular structure that separates UI components, application logic, and data orchestration.
        </p>

        <div className="grid gap-4 sm:grid-cols-1">
          {/* Frontend Package */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Core Framework</h3>
                <p className="text-xs text-muted-foreground font-mono">src/</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Vite 6 Development Environment
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                React 19 with Modern Hooks
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Tailwind CSS 4 + Shadcn UI
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Type-safe API Clients (Axios)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Centralized State & Routing
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                Modular Page-based Navigation
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
          We use established patterns to ensure the code remains maintainable as your project grows:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <PatternCard
            title="Component-Based UI"
            description="Built using atomic design principles with Shadcn UI components as the building blocks."
          />
          <PatternCard
            title="Direct API Integration"
            description="Decoupled API logic in src/api/ allowing components to remain focused on presentation."
          />
          <PatternCard
            title="Type First Development"
            description="TypeScript interfaces define the contract for all data structures throughout the app."
          />
          <PatternCard
            title="Layout Pattern"
            description="Application-wide shell and navigation consistent across all routes using Layout components."
          />
        </div>
      </div>

      {/* Data Flow */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Client-to-API Flow
        </h2>
        <p className="leading-7">
          Since there is no backend proxy, data flows directly from the browser to external services:
        </p>

        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <FlowStep number={1} title="User Interaction">
              User interacts with a React component (e.g., searches for a city)
            </FlowStep>
            <FlowArrow />
            <FlowStep number={2} title="API Service Layer">
              Component triggers an async function in <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">src/api/</code>
            </FlowStep>
            <FlowArrow />
            <FlowStep number={3} title="Direct HTTP Request">
              Axios sends a request directly to the external API endpoint (e.g. wttr.in)
            </FlowStep>
            <FlowArrow />
            <FlowStep number={4} title="Data Transformation">
              The API service transforms raw JSON response into internal TypeScript formats
            </FlowStep>
            <FlowArrow />
            <FlowStep number={5} title="UI Update">
              Component receives the typed data and updates the React state/UI
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
