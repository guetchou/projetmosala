import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-300)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] hover:bg-[var(--color-mosala-green-600)]",
        secondary:
          "border-transparent bg-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-dark-900)] hover:bg-[var(--color-mosala-yellow-600)]",
        destructive:
          "border-transparent bg-[var(--color-mosala-red-500)] text-[var(--color-mosala-white)] hover:bg-[var(--color-mosala-red-600)]",
        outline: "text-[var(--color-mosala-dark-900)] border-[var(--color-mosala-green-500)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
