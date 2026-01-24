import * as React from "react"
import { cn } from "@/lib/utils"
import type { InlineCodeProps } from "@/types/ui"

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className
        )}
        {...props}
      />
    )
  }
)
InlineCode.displayName = "InlineCode"

export { InlineCode }
