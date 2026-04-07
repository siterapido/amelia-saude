'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { MagneticButton, SplitText } from '@/components/animations'

type CTAVariant = 'light' | 'purple'

interface CTABannerProps {
  variant: CTAVariant
  heading: string
  subheading?: string
  ctaText: string
}

/**
 * CTA Banner Component
 * Clean call-to-action sections - light or purple variants
 */
export const CTABanner: React.FC<CTABannerProps> = ({
  variant,
  heading,
  subheading,
  ctaText,
}) => {
  const isPurple = variant === 'purple'

  return (
    <section className={cn(
      'relative py-16 md:py-24 overflow-hidden',
      isPurple
        ? 'bg-gradient-to-br from-[#5E4985] to-[#7B6CB1]'
        : 'bg-[#F8F6FB]'
    )}>
      <Container>
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Text */}
          <div className="relative z-10">
            <h3 className={cn(
              'font-display text-2xl md:text-3xl mb-2',
              isPurple ? 'text-white' : 'text-[#1A1A2E]'
            )}>
              <SplitText type="words" stagger={0.04}>
                {heading}
              </SplitText>
            </h3>
            {subheading && (
              <motion.p
                className={cn('text-lg', isPurple ? 'text-white/70' : 'text-gray-500')}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {subheading}
              </motion.p>
            )}
          </div>

          {/* CTA */}
          <MagneticButton strength={0.3}>
            <Button
              variant={isPurple ? 'secondary' : 'primary'}
              size="lg"
              className={cn(
                'relative z-10 flex-shrink-0 !rounded-xl',
                isPurple
                  ? '!bg-white !text-gold-primary hover:!bg-gray-50 !border-none'
                  : '!bg-gold-primary !text-white hover:!bg-gold-signature shadow-gold-sm'
              )}
              onClick={() => {
                const phoneNumber = '5521999999999'
                const message = 'Olá! Quero saber mais sobre os planos da Amélia Saúde!'
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
              }}
            >
              {ctaText}
            </Button>
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  )
}
