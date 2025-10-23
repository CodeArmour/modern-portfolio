import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const errorLineVariants = cva('pt-1 text-sm transition-all', {
  variants: {
    variant: {
      error: 'text-destructive',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
      success: 'text-green-600',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'error',
    size: 'default',
  },
})

export interface ErrorLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorLineVariants> {
  message: string | undefined | null
}

function ErrorLine({
  className,
  variant,
  size,
  message,
  ...props
}: ErrorLineProps) {
  if (!message) return null

  return (
    <div
      data-slot="error-line"
      className={cn(errorLineVariants({ variant, size, className }))}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <span className="flex-1">{message}</span>
    </div>
  )
}

export { ErrorLine, errorLineVariants }