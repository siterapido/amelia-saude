'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/components/hooks'

interface ParallaxLayerProps {
  children: React.ReactNode
  className?: string
  speed?: number // 0.5 = slower, 1 = normal, 2 = faster
  direction?: 'up' | 'down'
}

/**
 * ParallaxLayer - Creates depth through scroll-based movement
 * Elements move at different speeds relative to scroll
 */
export function ParallaxLayer({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const multiplier = direction === 'up' ? -1 : 1
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * multiplier])
  const y = useSpring(yRange, { damping: 20, stiffness: 100 })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  )
}
