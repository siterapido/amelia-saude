'use client'

import React, { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useMousePosition, useReducedMotion } from '@/components/hooks'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  glareEnabled?: boolean
  scale?: number
}

/**
 * TiltCard - 3D perspective effect on hover
 * Adds depth and interactivity to cards with optional glare effect
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glareEnabled = true,
  scale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { normalizedX, normalizedY } = useMousePosition(ref)
  const prefersReducedMotion = useReducedMotion()

  // Spring config for smooth movement
  const springConfig = { damping: 20, stiffness: 200 }

  // Create smooth animated values
  const rotateX = useSpring(
    useTransform(() => (isHovered ? -normalizedY * maxTilt : 0)),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(() => (isHovered ? normalizedX * maxTilt : 0)),
    springConfig
  )
  const scaleValue = useSpring(isHovered ? scale : 1, springConfig)

  // Glare position
  const glareX = useTransform(() => (normalizedX + 1) * 50)
  const glareY = useTransform(() => (normalizedY + 1) * 50)
  const glareOpacity = useSpring(isHovered ? 0.15 : 0, springConfig)

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX,
        rotateY,
        scale: scaleValue,
        willChange: 'transform',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* Glare overlay */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              () =>
                `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.8) 0%, transparent 50%)`
            ),
          }}
        />
      )}
    </motion.div>
  )
}
