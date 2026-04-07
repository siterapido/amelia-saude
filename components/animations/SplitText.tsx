'use client'

import React from 'react'
import { motion, Variants, useInView } from 'framer-motion'
import { useReducedMotion } from '@/components/hooks'

interface SplitTextProps {
  children: string
  type?: 'words' | 'chars'
  stagger?: number
  duration?: number
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  once?: boolean
}

/**
 * SplitText - Reveal animation for text
 * Animates text word-by-word or character-by-character with blur + translate effect
 */
export function SplitText({
  children,
  type = 'words',
  stagger = 0.05,
  duration = 0.6,
  delay = 0,
  className = '',
  as: Tag = 'span',
  once = true,
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = React.useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once, amount: 0.3 })

  // Return static text if user prefers reduced motion
  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  const elements = type === 'words' ? children.split(' ') : children.split('')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1], // Premium ease curve
      },
    },
  }

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {elements.map((element, index) => (
        <motion.span
          key={`${element}-${index}`}
          className="inline-block"
          variants={itemVariants}
          style={{ willChange: 'opacity, transform, filter' }}
        >
          {element}
          {type === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  )
}
