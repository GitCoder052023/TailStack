import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/constants/ui-variants"
import type { ButtonProps } from "@/types/ui"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement> }>, {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props,
      })
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
