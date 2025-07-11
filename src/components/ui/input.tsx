import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[var(--color-mosala-green-200)] bg-[var(--color-mosala-white)] px-3 py-2 text-base ring-offset-[var(--color-mosala-white)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-mosala-dark-900)] placeholder:text-[var(--color-mosala-dark-300)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mosala-green-300)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
