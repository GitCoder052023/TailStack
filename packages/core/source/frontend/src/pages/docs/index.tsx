import { Link, Outlet } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Settings, 
  Layers,
  Server,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

const docsSections = [
  { path: '/docs', label: 'Overview', icon: BookOpen },
  { path: '/docs/getting-started', label: 'Getting Started', icon: Settings },
  { path: '/docs/architecture', label: 'Architecture', icon: Layers },
  { path: '/docs/frontend', label: 'Frontend', icon: Globe },
  { path: '/docs/backend', label: 'Backend', icon: Server },
];

export function DocsPage() {
  const location = useLocation();

  return (
    <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
      {/* Sidebar */}
      <aside className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {docsSections.map((section) => {
              const Icon = section.icon;
              const isActive = location.pathname === section.path;
              return (
                <Link key={section.path} to={section.path}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-2',
                      isActive && 'bg-secondary'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </Button>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </aside>

      {/* Content */}
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}

