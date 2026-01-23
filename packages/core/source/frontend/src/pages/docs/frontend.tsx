import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function FrontendPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Frontend Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn about the React frontend structure, components, and best practices.
        </p>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Technology Stack</h2>
        <Card>
          <CardHeader>
            <CardTitle>Core Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">React 19</h3>
              <p className="text-sm text-muted-foreground">
                Modern React with hooks and functional components
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">TypeScript</h3>
              <p className="text-sm text-muted-foreground">
                Full type safety across the application
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Vite</h3>
              <p className="text-sm text-muted-foreground">
                Lightning-fast build tool with instant HMR
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Tailwind CSS 4</h3>
              <p className="text-sm text-muted-foreground">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">shadcn/ui</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful, accessible, and customizable component library
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">React Router</h3>
              <p className="text-sm text-muted-foreground">
                Declarative routing for single-page applications
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Directory Structure</h2>
        <Card>
          <CardHeader>
            <CardTitle>Frontend Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{`src/
├── api/              # API client functions
│   └── weather.api.ts
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── layout/      # Layout components
│   └── ...
├── pages/           # Page components
│   ├── home.tsx
│   ├── docs/
│   └── weather.tsx
├── hooks/           # Custom React hooks
│   └── use-theme.ts
├── types/           # TypeScript type definitions
├── config/          # Configuration files
├── lib/             # Utility functions
└── utils/           # Helper functions`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Theme Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built-in light/dark theme toggle using CSS variables and localStorage
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Centralized API client using Axios for server communication
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pre-configured shadcn/ui components ready to use
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Shared types between frontend and backend for consistency
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

