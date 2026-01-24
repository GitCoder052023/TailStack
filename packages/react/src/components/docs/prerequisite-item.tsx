import type { PrerequisiteItemProps } from '@/types/docs';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function PrerequisiteItem({ children, checked }: PrerequisiteItemProps) {
  return (
    <li className="flex items-center gap-3">
      {checked ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <AlertCircle className="h-5 w-5 text-yellow-500" />
      )}
      <span className="text-sm">{children}</span>
    </li>
  );
}
