'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MagneticButton } from '@/components/animations'
import { useReducedMotion } from '@/components/hooks'

/**
 * Hero Section Component
 * Clean, minimal full-screen hero with elegant typography
 * Inspired by Alice's light aesthetic with Amélia's purple palette
 */
export const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0])
  const contentY = useTransform(scrollY, [0, 300], [0, 40])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Subtle background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(123,108,177,0.08) 0%, rgba(94,73,133,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={!prefersReducedMotion ? {
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6],
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[15%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(94,73,133,0.06) 0%, rgba(168,153,204,0.03) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={!prefersReducedMotion ? {
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.7, 0.5],
          } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-28 pb-20 text-center">
        <motion.div
          className="max-w-[800px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: prefersReducedMotion ? 0 : contentY }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/8 border border-gold-primary/15 text-gold-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
              Operadora de Planos de Saúde
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="font-display leading-[1.05] tracking-tight text-[#1A1A2E]">
              <span className="block text-[clamp(2.5rem,6vw,4.5rem)]">
                Planos que cuidam
              </span>
              <span className="block text-[clamp(2.5rem,6vw,4.5rem)] text-gold-primary">
                de você de verdade
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={itemVariants} className="mb-12 max-w-[600px] mx-auto">
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-body">
              Conectamos você aos melhores médicos, clínicas, centros médicos e laboratórios, sem burocracias.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={0.1}>
              <Button
                variant="primary"
                size="lg"
                className="!bg-gold-primary !text-white hover:!bg-gold-signature !px-10 !py-6 !text-base font-semibold min-w-[200px] rounded-2xl shadow-gold-md transition-all duration-300 hover:shadow-gold-lg hover:-translate-y-0.5"
                onClick={() => {
                  const phoneNumber = '5521999999999'
                  const message = 'Olá! Gostaria de conhecer os planos da Amélia Saúde.'
                  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
                }}
              >
                Fale Conosco
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.1}>
              <Button
                variant="secondary"
                size="lg"
                className="!border-gold-primary/20 !text-gold-primary hover:!bg-gold-primary/5 !px-10 !py-6 !text-base font-semibold min-w-[200px] rounded-2xl transition-all duration-300"
                onClick={() => {
                  document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Conheça Nossos Planos
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-2">
              {[
                { src: '/avatars/avatar-1.jpg', alt: 'Beneficiário' },
                { src: '/avatars/avatar-2.jpg', alt: 'Beneficiária' },
                { src: '/avatars/avatar-3.jpg', alt: 'Beneficiário' },
                { src: '/avatars/avatar-4.jpg', alt: 'Beneficiária' },
              ].map((person, i) => (
                <img
                  key={i}
                  src={person.src}
                  alt={person.alt}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-[#1A1A2E] font-semibold">+2.500</span> famílias protegidas
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity: prefersReducedMotion ? 0.6 : scrollIndicatorOpacity }}
        animate={!prefersReducedMotion ? { y: [0, 8, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-3 rounded-full border border-gray-200 text-gray-400 hover:text-gold-primary hover:border-gold-primary/30 transition-colors duration-300"
          aria-label="Rolar para baixo"
        >
          <ChevronDown size={20} />
        </button>
      </motion.div>
    </section>
  )
}
