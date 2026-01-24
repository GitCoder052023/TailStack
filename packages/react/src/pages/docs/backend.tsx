import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/ui/code-block';
import { TechCard } from '@/components/docs/tech-card';
import { ArrowLeft, Globe, Zap, Shield, Code } from 'lucide-react';

export function BackendPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">API Integration</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          API Integration Guide
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn how to integrate external APIs directly from your React application.
        </p>
      </div>

      <Separator />

      {/* Integration Strategy */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Client-Side Integration
        </h2>
        <p className="leading-7">
          In this React-only template, external APIs are consumed directly from the client. This approach simplifies the architecture by removing the need for a proxy server, making it ideal for prototypes, small-scale apps, or when using public APIs.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <TechCard
            icon={<Zap className="h-5 w-5" />}
            title="Axios"
            description="Robust HTTP client for making API requests"
            color="text-purple-500"
          />
          <TechCard
            icon={<Globe className="h-5 w-5" />}
            title="Direct Calls"
            description="No proxy server required for public endpoints"
            color="text-blue-500"
          />
          <TechCard
            icon={<Shield className="h-5 w-5" />}
            title="Type Safety"
            description="Full TypeScript support for API responses"
            color="text-green-500"
          />
          <TechCard
            icon={<Code className="h-5 w-5" />}
            title="Transformation"
            description="Transform raw API data directly in the service layer"
            color="text-orange-500"
          />
        </div>
      </div>

      {/* Example: Weather API */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Example: Weather API
        </h2>
        <p className="leading-7">
          The weather feature demonstrates how to fetch, transform, and display data from a public API (`wttr.in`).
        </p>
        <CodeBlock
          code={`// src/api/weather.api.ts
import axios from 'axios';
import type { WeatherData } from '@/types/weather';

const BASE_URL = 'https://wttr.in';

export const weatherApi = {
  getWeatherByLocation: async (location: string): Promise<WeatherData> => {
    const response = await axios.get(\`\${BASE_URL}/\${location}?format=j1\`);
    const data = response.data;
    
    // Transform data accurately for the UI
    return {
      location: {
        name: data.nearest_area[0].areaName[0].value,
        // ... other mapping
      },
      current: {
        temp_c: parseFloat(data.current_condition[0].temp_C),
        // ... other mapping
      }
    };
  }
};`}
          language="typescript"
          showLineNumbers
        />
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Best Practices
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Environment Variables:</strong> Store API keys and base URLs in `.env` files.</li>
          <li><strong>Error Handling:</strong> Always wrap API calls in try-catch blocks to handle network issues.</li>
          <li><strong>Data Transformation:</strong> Keep your UI logic clean by transforming API responses in the service/api layer.</li>
          <li><strong>Loading States:</strong> Use hooks or state management to handle loading and error states in the UI.</li>
        </ul>
      </div>

      {/* Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/frontend">
            <ArrowLeft className="h-4 w-4" />
            Frontend Guide
          </Link>
        </Button>
        <div />
      </div>
    </div>
  );
}
