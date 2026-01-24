import { ReactNode } from 'react';

export interface TechCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
  features?: string[];
}

export interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export interface PrerequisiteItemProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  checked?: boolean;
}

export interface EndpointCardProps {
  method: string;
  endpoint: string;
  description: string;
  params: string;
}

export interface LayerCardProps {
  title: string;
  description: string;
  code?: string;
  items?: string[];
}

export interface PatternCardProps {
  title: string;
  description: string;
}

export interface FlowStepProps {
  number: string | number;
  title: string;
  description?: string;
  children?: ReactNode;
}

export interface QuickLinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
}

export type DocLinkCardProps = QuickLinkCardProps;
