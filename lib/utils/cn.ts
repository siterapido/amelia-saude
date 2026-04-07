import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function to merge Tailwind CSS classes with conflict resolution
 * Useful for combining conditional classes without style conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
