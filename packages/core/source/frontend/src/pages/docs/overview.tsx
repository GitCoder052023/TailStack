import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, Layers, Code2, Server } from 'lucide-react';
import type { DocLinkCardProps } from '@/types/docs';
import { ALL_TECH_STACK } from '@/constants/TechStack';

export function DocsOverview() {

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground">Docs</Link>
        <span>/</span>
        <span className="text-foreground">Introduction</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the TailStack documentation. This guide will help you understand
          the architecture and get started with development.
        </p>
      </div>

      <Separator />

      {/* What is TailStack */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          What is TailStack?
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          TailStack is a production-grade monorepo architecture template designed for building
          modern full-stack applications using the ERN stack (Express, React, Node.js).
          It provides a solid foundation with best practices, clean code organization,
          and modern tooling.
        </p>
        <p className="leading-7">
          The template includes pre-configured TypeScript support, Tailwind CSS 4,
          shadcn/ui components, and a complete weather application demo showcasing
          the full-stack architecture.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Tech Stack
        </h2>
        <p className="leading-7">
          TailStack uses the following technologies:
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_TECH_STACK.map((tech) => (
            <Badge key={tech} className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Explore the Docs
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <DocLinkCard
            title="Getting Started"
            description="Learn how to set up your development environment."
            href="/docs/getting-started"
            icon={<BookOpen className="h-5 w-5" />}
          />
          <DocLinkCard
            title="Architecture"
            description="Understand the project structure and design patterns."
            href="/docs/architecture"
            icon={<Layers className="h-5 w-5" />}
          />
          <DocLinkCard
            title="Frontend Guide"
            description="Explore the React frontend structure and components."
            href="/docs/frontend"
            icon={<Code2 className="h-5 w-5" />}
          />
          <DocLinkCard
            title="Backend Guide"
            description="Learn about the Express server setup and API design."
            href="/docs/backend"
            icon={<Server className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        <div />
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/docs/getting-started">
            Getting Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DocLinkCard({ title, description, href, icon }: DocLinkCardProps) {
  return (
    <Link
      to={href}
      className="group flex flex-col gap-2 rounded-lg border p-4 transition-all hover:bg-muted/50 hover:border-foreground/20"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}

