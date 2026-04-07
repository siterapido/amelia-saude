'use client'

import React, { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useMousePosition, useReducedMotion } from '@/components/hooks'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

/**
 * MagneticButton - Button that subtly follows cursor
 * Creates an interactive, premium feel for CTAs
 */
export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { normalizedX, normalizedY } = useMousePosition(ref)
  const prefersReducedMotion = useReducedMotion()

  const springConfig = { damping: 15, stiffness: 150 }

  const x = useSpring(
    useTransform(() => (isHovered ? normalizedX * 20 * strength : 0)),
    springConfig
  )
  const y = useSpring(
    useTransform(() => (isHovered ? normalizedY * 20 * strength : 0)),
    springConfig
  )

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        x,
        y,
        willChange: 'transform',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  )
}
