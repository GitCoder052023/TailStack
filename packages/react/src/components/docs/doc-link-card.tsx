import { Link } from 'react-router-dom';
import type { DocLinkCardProps } from '@/types/docs';

export function DocLinkCard({ title, description, href, icon }: DocLinkCardProps) {
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
