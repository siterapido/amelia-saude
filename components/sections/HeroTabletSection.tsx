'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { TabletVisualization } from '@/components/ui/TabletVisualization'
import { useReducedMotion } from '@/components/hooks'

/**
 * Seção do mockup do tablet — entre a hero e “Sobre nós”.
 * Âncora: #app-preview (seta da hero rola até aqui).
 */
export const HeroTabletSection = () => {
  const prefersReducedMotion = useReducedMotion()
  const reduced = prefersReducedMotion

  return (
    <section
      id="app-preview"
      data-navbar-theme="light"
      aria-labelledby="hero-tablet-heading"
      className="relative w-full overflow-hidden bg-black-premium border-t border-gold-primary/10 pb-20 pt-10 md:pt-14 md:pb-24 lg:pb-28"
    >
      <Container className="relative z-10">
        <motion.h2
          id="hero-tablet-heading"
          className="font-display text-center text-lg md:text-xl text-[#1A1A2E]/80 mb-10 md:mb-14 max-w-2xl mx-auto font-medium"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Seu plano na palma da mão — portal e app pensados para você
        </motion.h2>
        <motion.div
          className="flex justify-center"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <TabletVisualization variant="dashboard" className="max-w-[min(100%,520px)]" />
        </motion.div>
      </Container>
    </section>
  )
}
