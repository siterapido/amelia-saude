'use client'

import { useEffect, useState, RefObject } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

/**
 * Hook to track mouse position relative to an element
 * Returns normalized values from -1 to 1 for center-based calculations
 */
export function useMousePosition(ref: RefObject<HTMLElement | null>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Normalize to -1 to 1 range (center is 0)
      const normalizedX = (x / rect.width) * 2 - 1
      const normalizedY = (y / rect.height) * 2 - 1

      setPosition({
        x,
        y,
        normalizedX: Math.max(-1, Math.min(1, normalizedX)),
        normalizedY: Math.max(-1, Math.min(1, normalizedY)),
      })
    }

    const handleMouseLeave = () => {
      setPosition({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref])

  return position
}
