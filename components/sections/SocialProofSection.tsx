'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedCounter, TiltCard } from '@/components/animations'
import { Check, Users, Clock, Smile } from 'lucide-react'

/**
 * Social Proof Section
 * Display credibility indicators, numbers, and testimonials
 */
export const SocialProofSection = () => {
  const stats = [
    {
      icon: Clock,
      number: 10,
      suffix: '+',
      label: 'Anos de experiência',
    },
    {
      icon: Users,
      number: 5000,
      suffix: '+',
      label: 'Clientes satisfeitos',
    },
    {
      icon: Clock,
      displayValue: '24/7',
      label: 'Suporte disponível',
    },
    {
      icon: Smile,
      number: 98,
      suffix: '%',
      label: 'Taxa de satisfação',
    },
  ]

  return (
    <section className="relative py-24 md:py-32 lg:py-48 glass-section-dark glass-overlay noise-overlay gradient-flow ambient-glow-center">
      <Container>
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <SectionHeader
            title="Credibilidade e"
            highlight="Confiança"
            subtitle="Números que falam por si: experiência, satisfação e compromisso com você"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const floatDelayClass = ['card-float', 'card-float-delay-1', 'card-float-delay-2', 'card-float-delay-3'][index % 4]
            return (
              <motion.div
                key={index}
                className={`text-center group ${floatDelayClass}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <TiltCard maxTilt={4} glareEnabled={false} className="inline-block">
                  <div className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold-primary/12 border border-gold-primary/25 flex items-center justify-center transition-all duration-300 group-hover:shadow-gold-glow group-hover:bg-gold-primary/18">
                        <Icon className="w-8 h-8 text-gold-primary icon-glow-sm" />
                      </div>
                    </div>
                    <p className="text-5xl font-bold stats-number mb-2">
                      {stat.displayValue ? (
                        stat.displayValue
                      ) : (
                        <AnimatedCounter
                          value={stat.number!}
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      )}
                    </p>
                    <p className="text-platinum">{stat.label}</p>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 items-center py-12 border-t border-b border-gray-border relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Decorative gradient lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-separator" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-separator" />

          <Badge variant="premium" icon={<Check size={16} className="text-gold-primary" />}>
            Registrada na ANS
          </Badge>
          <Badge variant="premium" icon={<Check size={16} className="text-gold-primary" />}>
            Certificado SSL
          </Badge>
          <Badge variant="premium" icon={<Check size={16} className="text-gold-primary" />}>
            LGPD Compliance
          </Badge>
        </motion.div>
      </Container>
    </section>
  )
}
