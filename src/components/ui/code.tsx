import { cn } from "@/lib/utils"
import type React from "react"

interface CodeProps {
  children: React.ReactNode
  className?: string
}

export function Code({ children, className }: CodeProps) {
  return (
    <pre className={cn("bg-muted p-4 rounded-md overflow-x-auto text-sm", className)}>
      <code>{children}</code>
    </pre>
  )
}

