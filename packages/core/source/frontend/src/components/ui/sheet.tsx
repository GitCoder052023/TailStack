import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SheetProps, SheetContentProps } from "@/types/ui"

const SheetContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => { },
})

const Sheet = ({ open = false, onOpenChange, children }: SheetProps) => {
  const [internalOpen, setInternalOpen] = React.useState(open)

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setInternalOpen(newOpen)
    onOpenChange?.(newOpen)
  }, [onOpenChange])

  React.useEffect(() => {
    setInternalOpen(open)
  }, [open])

  return (
    <SheetContext.Provider value={{ open: internalOpen, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext)

  return (
    <button
      ref={ref}
      onClick={(e) => {
        onOpenChange(true)
        onClick?.(e)
      }}
      {...props}
    />
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = "right", onClose, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(SheetContext)

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          onOpenChange(false)
          onClose?.()
        }
      }
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [open, onOpenChange, onClose])

    // Prevent body scroll when sheet is open
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [open])

    if (!open) return null

    const sideStyles = {
      left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r animate-in slide-in-from-left duration-300",
      right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l animate-in slide-in-from-right duration-300",
      top: "inset-x-0 top-0 w-full border-b animate-in slide-in-from-top duration-300",
      bottom: "inset-x-0 bottom-0 w-full border-t animate-in slide-in-from-bottom duration-300",
    }

    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0 duration-300"
          onClick={() => {
            onOpenChange(false)
            onClose?.()
          }}
        />
        {/* Content */}
        <div
          ref={ref}
          className={cn(
            "fixed z-50 gap-4 bg-background p-6 shadow-lg",
            sideStyles[side],
            className
          )}
          {...props}
        >
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => {
              onOpenChange(false)
              onClose?.()
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </>
    )
  }
)
SheetContent.displayName = "SheetContent"

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = "SheetDescription"

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription }
