import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Cloud } from 'lucide-react';

export function DocsOverview() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Documentation Overview</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the TailStack documentation. This guide will help you understand
          the architecture and get started with development.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Learn how to set up your development environment and run the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/docs/getting-started">
              <Button variant="outline" className="w-full gap-2">
                Read Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Architecture</CardTitle>
            <CardDescription>
              Understand the project structure and design patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/docs/architecture">
              <Button variant="outline" className="w-full gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frontend Guide</CardTitle>
            <CardDescription>
              Explore the React frontend structure and components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/docs/frontend">
              <Button variant="outline" className="w-full gap-2">
                View Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backend Guide</CardTitle>
            <CardDescription>
              Learn about the Express server setup and API structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/docs/backend">
              <Button variant="outline" className="w-full gap-2">
                View Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
          <CardDescription>Technologies used in this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>React</Badge>
            <Badge>TypeScript</Badge>
            <Badge>Tailwind CSS 4</Badge>
            <Badge>shadcn/ui</Badge>
            <Badge>Vite</Badge>
            <Badge>Express</Badge>
            <Badge>Node.js</Badge>
            <Badge>React Router</Badge>
            <Badge>Axios</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

