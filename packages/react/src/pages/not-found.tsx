import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, FileQuestion } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="container flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>

        {/* 404 */}
        <h1 className="mb-2 text-6xl font-bold tracking-tighter">404</h1>

        {/* Title */}
        <h2 className="mb-2 text-xl font-semibold">Page not found</h2>

        {/* Description */}
        <p className="mb-8 text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/" className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
