import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function BackendPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Backend Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn about the Express server structure, API design, and best practices.
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
              <h3 className="font-semibold mb-2">Express.js</h3>
              <p className="text-sm text-muted-foreground">
                Fast, unopinionated web framework for Node.js
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">TypeScript</h3>
              <p className="text-sm text-muted-foreground">
                Type-safe server-side development
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Axios</h3>
              <p className="text-sm text-muted-foreground">
                HTTP client for making external API requests
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">CORS</h3>
              <p className="text-sm text-muted-foreground">
                Cross-Origin Resource Sharing configured for frontend communication
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
            <CardTitle>Server Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{`src/
├── routes/          # API route definitions
│   ├── index.ts
│   └── weather.routes.ts
├── controller/      # Route controllers
│   └── weather.controller.ts
├── services/        # Business logic layer
│   └── weather.service.ts
├── middlewares/     # Express middlewares
│   └── cors.ts
├── config/         # Configuration files
│   └── index.ts
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server entry point`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Design</h2>
        <Card>
          <CardHeader>
            <CardTitle>RESTful Endpoints</CardTitle>
            <CardDescription>
              Example: Weather API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">GET /api/weather/location</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Get weather by location name
              </p>
              <pre className="bg-muted p-2 rounded text-xs">
                <code>Query params: ?location=London</code>
              </pre>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">GET /api/weather/coordinates</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Get weather by coordinates
              </p>
              <pre className="bg-muted p-2 rounded text-xs">
                <code>Query params: ?lat=51.5074&lon=-0.1278</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Architecture Pattern</h2>
        <Card>
          <CardHeader>
            <CardTitle>Layered Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h3 className="font-semibold mb-1">Routes Layer</h3>
                <p className="text-muted-foreground">
                  Define API endpoints and map them to controllers
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-1">Controller Layer</h3>
                <p className="text-muted-foreground">
                  Handle HTTP requests, validate input, and send responses
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-1">Service Layer</h3>
                <p className="text-muted-foreground">
                  Contains business logic and external API calls
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

