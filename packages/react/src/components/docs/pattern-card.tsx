import type { PatternCardProps } from '@/types/docs';

export function PatternCard({ title, description }: PatternCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
