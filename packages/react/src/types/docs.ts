import type { ReactNode } from 'react';

export interface TechCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
}

export interface PatternCardProps {
  title: string;
  description: string;
}

export interface FlowStepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export interface PrerequisiteItemProps {
  children: ReactNode;
  checked?: boolean;
}

export interface DocLinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export interface DocsSidebarProps {
  onItemClick?: () => void;
  pathname: string;
}
