import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Server, Database, Shield, Zap } from 'lucide-react';

export function BackendPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Backend</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Backend Guide
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn about the Express server structure, API design, and best practices.
        </p>
      </div>

      <Separator />

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Technology Stack
        </h2>
        <p className="leading-7">
          The backend is built with Node.js and Express:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <TechCard
            icon={<Server className="h-5 w-5" />}
            title="Express.js"
            description="Fast, unopinionated web framework for Node.js"
            color="text-green-500"
          />
          <TechCard
            icon={<Shield className="h-5 w-5" />}
            title="TypeScript"
            description="Type-safe server-side development"
            color="text-blue-600"
          />
          <TechCard
            icon={<Zap className="h-5 w-5" />}
            title="Axios"
            description="HTTP client for making external API requests"
            color="text-purple-500"
          />
          <TechCard
            icon={<Database className="h-5 w-5" />}
            title="CORS"
            description="Cross-Origin Resource Sharing configured for frontend"
            color="text-orange-500"
          />
        </div>
      </div>

      {/* Directory Structure */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Directory Structure
        </h2>
        <p className="leading-7">
          The server follows a layered architecture pattern:
        </p>
        <CodeBlock
          code={`src/
├── routes/           # API route definitions
│   ├── index.ts
│   └── weather.routes.ts
├── controller/       # Route controllers
│   └── weather.controller.ts
├── services/         # Business logic layer
│   └── weather.service.ts
├── middlewares/      # Express middlewares
│   └── cors.ts
├── config/           # Configuration files
│   └── index.ts
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── app.ts            # Express app setup
└── server.ts         # Server entry point`}
          language="plaintext"
          showLineNumbers
        />
      </div>

      {/* API Design */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          API Design
        </h2>
        <p className="leading-7">
          The API follows RESTful design principles. Here's the Weather API as an example:
        </p>

        <div className="space-y-4">
          <EndpointCard
            method="GET"
            endpoint="/api/weather/location"
            description="Get weather by location name"
            params="?location=London"
          />
          <EndpointCard
            method="GET"
            endpoint="/api/weather/coordinates"
            description="Get weather by GPS coordinates"
            params="?lat=51.5074&lon=-0.1278"
          />
        </div>
      </div>

      {/* Architecture Pattern */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Layered Architecture
        </h2>
        <p className="leading-7">
          The backend follows a clean layered architecture for maintainability:
        </p>

        <div className="space-y-4">
          {/* Routes Layer */}
          <LayerCard
            title="Routes Layer"
            description="Define API endpoints and map them to controllers"
            code={`// routes/weather.routes.ts
import { Router } from 'express';
import { WeatherController } from '../controller/weather.controller';

const router = Router();
const controller = new WeatherController();

router.get('/location', controller.getByLocation);
router.get('/coordinates', controller.getByCoordinates);

export default router;`}
          />

          {/* Controller Layer */}
          <LayerCard
            title="Controller Layer"
            description="Handle HTTP requests, validate input, and send responses"
            code={`// controller/weather.controller.ts
import { Request, Response } from 'express';
import { WeatherService } from '../services/weather.service';

export class WeatherController {
  private weatherService = new WeatherService();

  getByLocation = async (req: Request, res: Response) => {
    const { location } = req.query;
    const data = await this.weatherService.getByLocation(location as string);
    res.json(data);
  };
}`}
          />

          {/* Service Layer */}
          <LayerCard
            title="Service Layer"
            description="Contains business logic and external API calls"
            code={`// services/weather.service.ts
import axios from 'axios';

export class WeatherService {
  async getByLocation(location: string) {
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: { key: process.env.API_KEY, q: location }
    });
    return response.data;
  }
}`}
          />
        </div>
      </div>

      {/* Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/frontend">
            <ArrowLeft className="h-4 w-4" />
            Frontend
          </Link>
        </Button>
        <div />
      </div>
    </div>
  );
}

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
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

interface EndpointCardProps {
  method: string;
  endpoint: string;
  description: string;
  params: string;
}

function EndpointCard({ method, endpoint, description, params }: EndpointCardProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="flex items-center gap-3 border-b bg-muted/50 px-4 py-3">
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400">
          {method}
        </Badge>
        <code className="font-mono text-sm">{endpoint}</code>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div>
          <span className="text-xs text-muted-foreground">Query params: </span>
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">
            {params}
          </code>
        </div>
      </div>
    </div>
  );
}

interface LayerCardProps {
  title: string;
  description: string;
  code: string;
}

function LayerCard({ title, description, code }: LayerCardProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <CodeBlock code={code} language="typescript" />
    </div>
  );
}
