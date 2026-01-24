import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BookOpen,
  Cloud,
  Code2,
  Zap,
  Layers,
  Terminal,
  Sparkles,
  Github,
} from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative flex flex-col items-center justify-center gap-4 py-20 md:py-28 lg:py-36">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Production Ready Template
          </Badge>

          {/* Title */}
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            The Foundation for your
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text">
              {" "}Modern React Application
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-[750px] text-center text-base text-muted-foreground sm:text-lg md:text-xl">
            A production-grade React architecture template.
            Built with React 19, TypeScript, Tailwind CSS 4, and Shadcn UI.
            <span className="hidden sm:inline"> Start here, then make it your own.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/docs/getting-started">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Tech Stack Badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['React 19', 'TypeScript', 'Tailwind CSS 4', 'Vite', 'Shadcn UI'].map((tech) => (
              <Badge key={tech} variant="outline" className="rounded-full">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
            Everything you need
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            This template includes everything you need to build high-performance React applications.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Cards */}
          <FeatureCard
            icon={<Code2 className="h-10 w-10" />}
            title="Modern Stack"
            description="Built with React 19, TypeScript, Tailwind CSS 4, and shadcn/ui components for a cutting-edge development experience."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Lightning Fast"
            description="Powered by Vite for instant hot module replacement and optimized production builds."
          />
          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="Well Documented"
            description="Comprehensive documentation to guide you through every aspect of the architecture."
          />
          <FeatureCard
            icon={<Cloud className="h-10 w-10" />}
            title="Weather Demo"
            description="Clean weather application showcasing direct API integration from the client."
          />
          <FeatureCard
            icon={<Layers className="h-10 w-10" />}
            title="Clean Architecture"
            description="Follows best practices with clear separation of concerns and modular code organization."
          />
          <FeatureCard
            icon={<Terminal className="h-10 w-10" />}
            title="Type Safe"
            description="End-to-end TypeScript support for reliable, maintainable, and error-free code."
          />
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
