'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { SplitText, GradientText } from '@/components/animations'
import { useReducedMotion } from '@/components/hooks'

interface SectionHeaderProps {
  title: string
  highlight?: string
  subtitle?: string
  className?: string
  centered?: boolean
  dark?: boolean
}

/**
 * SectionHeader - Reusable animated section header
 * Features SplitText title, optional gradient highlight, and animated underline
 */
export function SectionHeader({
  title,
  highlight,
  subtitle,
  className = '',
  centered = true,
  dark = true,
}: SectionHeaderProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  const textColor = dark ? 'text-white' : 'text-black-premium'
  const subtitleColor = dark ? 'text-platinum' : 'text-black-premium/70'

  return (
    <div
      ref={ref}
      className={`space-y-4 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className={`font-display font-bold text-3xl md:text-4xl lg:text-5xl ${textColor}`}>
        <SplitText type="words" stagger={0.04}>
          {title}
        </SplitText>
        {highlight && (
          <>
            {' '}
            <GradientText className="font-display font-bold">
              {highlight}
            </GradientText>
          </>
        )}
      </h2>

      {/* Animated underline */}
      <motion.div
        className={`h-1 bg-gradient-to-r from-gold-primary to-gold-signature rounded-full ${centered ? 'mx-auto' : ''}`}
        initial={{ width: 0, opacity: 0 }}
        animate={isInView && !prefersReducedMotion ? { width: 80, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {subtitle && (
        <motion.p
          className={`text-lg ${subtitleColor} max-w-2xl ${centered ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
