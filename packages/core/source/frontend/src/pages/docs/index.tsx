import { Link, Outlet } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { docsSections } from '@/constants/DocsSections';
import { useNavigation } from '@/hooks/use-navigation';
import { useToggle } from '@/hooks/use-toggle';

export function DocsPage() {
  const { isActive } = useNavigation();
  const [sidebarOpen, , setSidebarOpen] = useToggle(false);

  const SidebarContent = () => (
    <div className="w-full ml-5">
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          Getting Started
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {docsSections.slice(0, 2).map((section) => (
            <Link
              key={section.path}
              to={section.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                isActive(section.path)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="pb-4">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          Guides
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {docsSections.slice(2).map((section) => (
            <Link
              key={section.path}
              to={section.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                isActive(section.path)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container flex-1">
      <div className="flex-1 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Mobile Sidebar Toggle */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 md:hidden fixed bottom-4 right-4 z-40 shadow-lg bg-background">
            <Menu className="h-4 w-4 mr-2" />
            Menu
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] pr-0">
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
              <SidebarContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <SidebarContent />
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
