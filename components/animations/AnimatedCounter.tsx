'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useInView } from 'framer-motion'
import { useReducedMotion } from '@/components/hooks'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  once?: boolean
}

/**
 * AnimatedCounter - Animated number counting
 * Counts from 0 to target value with spring physics
 */
export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  once = true,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      springValue.set(value)
    } else if (prefersReducedMotion) {
      setDisplayValue(value)
    }
  }, [isInView, value, springValue, prefersReducedMotion])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  if (prefersReducedMotion) {
    return (
      <span ref={ref} className={className}>
        {prefix}{value.toLocaleString('pt-BR')}{suffix}
      </span>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{displayValue.toLocaleString('pt-BR')}{suffix}
    </motion.span>
  )
}
