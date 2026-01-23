import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ArchitecturePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Architecture</h1>
        <p className="text-lg text-muted-foreground">
          Understanding the TailStack architecture and design patterns.
        </p>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Monorepo Structure</h2>
        <Card>
          <CardHeader>
            <CardTitle>Package Organization</CardTitle>
            <CardDescription>
              TailStack uses a monorepo structure for better code organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Frontend Package</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Located in <code className="bg-muted px-1 rounded">source/frontend/</code>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>React application with Vite</li>
                <li>TypeScript for type safety</li>
                <li>Tailwind CSS 4 for styling</li>
                <li>shadcn/ui components</li>
                <li>React Router for navigation</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Backend Package</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Located in <code className="bg-muted px-1 rounded">source/Server/</code>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Express.js server</li>
                <li>TypeScript for type safety</li>
                <li>RESTful API architecture</li>
                <li>Service layer pattern</li>
                <li>Controller-Route separation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Design Patterns</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>MVC Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Backend follows Model-View-Controller pattern with clear separation
                of concerns: Routes → Controllers → Services
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component-Based</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Frontend uses React's component-based architecture with reusable
                UI components from shadcn/ui
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Client Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Centralized API client in <code className="bg-muted px-1 rounded">src/api/</code>
                for all server communication
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Shared TypeScript types ensure consistency between frontend
                and backend
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Flow</h2>
        <Card>
          <CardHeader>
            <CardTitle>Request Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">1.</span>
                <span>User interacts with React component</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">2.</span>
                <span>Component calls API client function</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">3.</span>
                <span>API client sends HTTP request to Express server</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">4.</span>
                <span>Express route receives request</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">5.</span>
                <span>Controller processes request</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">6.</span>
                <span>Service layer handles business logic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">7.</span>
                <span>Response sent back to frontend</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

