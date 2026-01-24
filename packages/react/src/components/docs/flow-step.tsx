import type { FlowStepProps } from '@/types/docs';
import { ArrowDown } from 'lucide-react';

export function FlowStep({ number, title, children }: FlowStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
        {number}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

export function FlowArrow() {
  return (
    <div className="flex justify-center pl-4">
      <ArrowDown className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
