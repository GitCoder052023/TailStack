import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { docsSections } from '@/constants/DocsSections';
import type { DocsSidebarProps } from '@/types/docs';

export function DocsSidebar({ onItemClick, pathname }: DocsSidebarProps) {
  const isActive = (path: string) => pathname === path;

  return (
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
              onClick={onItemClick}
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
              onClick={onItemClick}
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
}
