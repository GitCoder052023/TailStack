import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCopy } from "@/hooks/use-copy"
import type { CodeBlockProps } from "@/types/ui"

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language, showLineNumbers = false, filename, ...props }, ref) => {
    const { copied, copy } = useCopy()

    const lines = code.split("\n")

    return (
      <div
        ref={ref}
        className={cn(
          "relative group rounded-lg border bg-zinc-950 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        {/* Header with filename */}
        {(filename || language) && (
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
            <span className="text-xs text-zinc-400 font-mono">
              {filename || language}
            </span>
            <button
              onClick={() => copy(code)}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Code content */}
        <div className="relative overflow-x-auto">
          {/* Copy button (when no header) */}
          {!filename && !language && (
            <button
              onClick={() => copy(code)}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-zinc-800/80 px-2 py-1 text-xs text-zinc-400 opacity-0 backdrop-blur transition-all group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-300"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}

          <pre className="p-4 text-sm leading-relaxed">
            <code className="font-mono text-zinc-50">
              {showLineNumbers ? (
                <div className="flex">
                  <div className="flex flex-col pr-4 text-right text-zinc-500 select-none border-r border-zinc-800 mr-4">
                    {lines.map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    {lines.map((line, i) => (
                      <div key={i}>{line || " "}</div>
                    ))}
                  </div>
                </div>
              ) : (
                code
              )}
            </code>
          </pre>
        </div>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
