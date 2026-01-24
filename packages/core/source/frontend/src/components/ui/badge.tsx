import { cn } from "@/lib/utils"
import { badgeVariants } from "@/constants/ui-variants"
import type { BadgeProps } from "@/types/ui"

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
