import * as React from "react"
import { cn } from "@/lib/utils"
import type { ScrollAreaProps } from "@/types/ui"

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          orientation === "horizontal" ? "overflow-x-auto" : "overflow-y-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
