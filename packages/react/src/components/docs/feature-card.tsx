import type { FeatureCardProps } from '@/types/docs';

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
