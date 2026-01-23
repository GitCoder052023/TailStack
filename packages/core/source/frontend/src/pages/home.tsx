import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Cloud, Code, Zap } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">TailStack</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          The Ultimate Production-Grade Monorepo Architecture Template for ERN Stack
          (Express, React, Node.js)
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/docs">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/weather">
            <Button size="lg" variant="outline" className="gap-2">
              <Cloud className="h-4 w-4" />
              Try Weather App
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>
                Built with React, TypeScript, Tailwind CSS 4, and shadcn/ui
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Powered by Vite for instant HMR and optimized builds
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Well Documented</CardTitle>
              <CardDescription>
                Comprehensive documentation to get you started quickly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Cloud className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Weather Demo</CardTitle>
              <CardDescription>
                Full-stack weather application showcasing the architecture
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Production Ready</CardTitle>
              <CardDescription>
                Pre-configured with best practices and security measures
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Type Safe</CardTitle>
              <CardDescription>
                End-to-end TypeScript for reliable and maintainable code
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Quick Start</h2>
        <Card>
          <CardHeader>
            <CardTitle>Get Started in Minutes</CardTitle>
            <CardDescription>
              Follow our documentation to set up your development environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/docs">
              <Button className="w-full gap-2">
                <BookOpen className="h-4 w-4" />
                Read Documentation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

