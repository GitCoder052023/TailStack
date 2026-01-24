import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants, badgeVariants } from "@/constants/ui-variants"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> { }

export interface SheetProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right" | "top" | "bottom";
  onClose?: () => void;
}

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { }
