import React from 'react'
import { cn } from '@/lib/utils/cn'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'tight'
}

/**
 * Premium Container Component
 * Responsive container with max-width and padding
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full mx-auto px-6 md:px-8 lg:px-20',
        size === 'default' && 'max-w-container',
        size === 'tight' && 'max-w-container-tight',
        className,
      )}
      {...props}
    />
  ),
)

Container.displayName = 'Container'
