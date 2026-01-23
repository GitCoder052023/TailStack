import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function GettingStartedPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Getting Started</h1>
        <p className="text-lg text-muted-foreground">
          Follow these steps to set up your development environment and start building
          with TailStack.
        </p>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <Card>
          <CardHeader>
            <CardTitle>Required Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Make sure you have the following installed:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Node.js (v18 or higher)</li>
              <li>pnpm (v10 or higher) - recommended package manager</li>
              <li>Git</li>
              <li>Code editor (VS Code recommended)</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Install Dependencies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Navigate to the core package directory and install dependencies:</p>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>cd packages/core{'\n'}pnpm install</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Start Development Servers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Run both frontend and backend concurrently:</p>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>pnpm dev</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              This will start:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Frontend at <Badge variant="outline">http://localhost:5173</Badge></li>
              <li>Backend at <Badge variant="outline">http://localhost:5000</Badge></li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Project Structure</h2>
        <Card>
          <CardHeader>
            <CardTitle>Directory Layout</CardTitle>
            <CardDescription>
              Understanding the project organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{`core/
├── source/
│   ├── frontend/     # React + Vite client
│   │   └── src/
│   │       ├── api/          # API client functions
│   │       ├── components/   # React components
│   │       ├── pages/        # Page components
│   │       ├── hooks/        # Custom React hooks
│   │       └── types/       # TypeScript types
│   └── Server/       # Express + TypeScript server
│       └── src/
│           ├── routes/      # API routes
│           ├── controller/  # Route controllers
│           ├── services/    # Business logic
│           └── types/       # TypeScript types
└── scripts/          # Automation scripts`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <Card>
          <CardHeader>
            <CardTitle>Explore the Codebase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Check out the <Badge variant="outline">Weather App</Badge> to see a full-stack example</li>
              <li>Review the <Badge variant="outline">Architecture</Badge> documentation</li>
              <li>Explore the <Badge variant="outline">shadcn/ui</Badge> components</li>
              <li>Read the <Badge variant="outline">API</Badge> documentation</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

