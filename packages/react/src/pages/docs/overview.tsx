import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DocLinkCard } from '@/components/docs/doc-link-card';
import { ArrowRight, BookOpen, Layers, Code2, Globe } from 'lucide-react';

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
          Welcome to the TailStack React documentation. This guide will help you understand
          the architecture and get started with development.
        </p>
      </div>

      <Separator />

      {/* What is TailStack */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          What is TailStack React?
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          TailStack React is a production-grade frontend architecture template designed for building
          modern client-side applications. It focuses on performance, scalability, and a superior developer experience.
        </p>
        <p className="leading-7">
          The template includes pre-configured TypeScript support, Tailwind CSS 4,
          shadcn/ui components, and a weather application demo that fetches data directly from a public API.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Tech Stack
        </h2>
        <p className="leading-7">
          TailStack React uses the following technologies:
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full">React 19</Badge>
          <Badge className="rounded-full">TypeScript</Badge>
          <Badge className="rounded-full">Tailwind CSS 4</Badge>
          <Badge className="rounded-full">shadcn/ui</Badge>
          <Badge className="rounded-full">Vite</Badge>
          <Badge className="rounded-full">React Router</Badge>
          <Badge className="rounded-full">Axios</Badge>
          <Badge className="rounded-full">Sonner</Badge>
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
            title="API Integration"
            description="Learn how to call external APIs directly from the client."
            href="/docs/backend"
            icon={<Globe className="h-5 w-5" />}
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
