import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/ui/code-block';
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export function GettingStartedPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Getting Started</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Getting Started
        </h1>
        <p className="text-lg text-muted-foreground">
          Follow these steps to set up your development environment and start building
          with TailStack React.
        </p>
      </div>

      <Separator />

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Prerequisites
        </h2>
        <p className="leading-7">
          Before you begin, make sure you have the following installed on your system:
        </p>
        <div className="rounded-lg border bg-card p-4">
          <ul className="space-y-3">
            <PrerequisiteItem checked>
              <span className="font-medium">Node.js</span> (v18 or higher)
            </PrerequisiteItem>
            <PrerequisiteItem checked>
              <span className="font-medium">pnpm</span> (v10 or higher) - recommended package manager
            </PrerequisiteItem>
            <PrerequisiteItem checked>
              <span className="font-medium">Git</span> - for version control
            </PrerequisiteItem>
          </ul>
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            1. Install Dependencies
          </h3>
          <p className="leading-7">
            Navigate to the project root directory and install all dependencies:
          </p>
          <CodeBlock
            code="pnpm install"
            language="bash"
          />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            2. Start Development Server
          </h3>
          <CodeBlock
            code="pnpm dev"
            language="bash"
          />
          <div className="rounded-lg border bg-muted/50 p-4 mt-4">
            <p className="text-sm text-muted-foreground mb-3">
              The application will be accessible at:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">Frontend</Badge>
                <span className="text-sm text-muted-foreground">→</span>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  http://localhost:5173
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Structure */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Project Structure
        </h2>
        <p className="leading-7">
          Here's an overview of the React project directory layout:
        </p>
        <CodeBlock
          code={`src/
├── api/           # API client functions (Direct calls)
├── components/    # Reusable UI components
│   ├── layout/    # Shared layouts
│   └── ui/        # Shadcn components
├── pages/         # Application pages
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries (utils, cn)
├── constants/     # Application constants
├── types/         # TypeScript definitions
├── App.tsx        # Main application component
└── main.tsx       # Entry point`}
          language="plaintext"
          showLineNumbers
        />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Next Steps
        </h2>
        <p className="leading-7">
          Now that you have the app running, here are some things you can explore:
        </p>
        <div className="grid gap-3">
          <div className="flex items-start gap-3 rounded-lg border p-4">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Try the Weather App</p>
              <p className="text-sm text-muted-foreground">
                See a complete example of direct API integration.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-4">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Explore Documentation</p>
              <p className="text-sm text-muted-foreground">
                Learn about the architecture and frontend design patterns.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-4">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Customize UI</p>
              <p className="text-sm text-muted-foreground">
                Modify the Shadcn components in src/components/ui.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs">
            <ArrowLeft className="h-4 w-4" />
            Introduction
          </Link>
        </Button>
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/architecture">
            Architecture
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface PrerequisiteItemProps {
  children: React.ReactNode;
  checked?: boolean;
}

function PrerequisiteItem({ children, checked }: PrerequisiteItemProps) {
  return (
    <li className="flex items-center gap-3">
      {checked ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <AlertCircle className="h-5 w-5 text-yellow-500" />
      )}
      <span className="text-sm">{children}</span>
    </li>
  );
}
