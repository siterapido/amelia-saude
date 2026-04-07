'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { AnimatedCounter } from '@/components/animations'
import { Check, MapPin, Stethoscope, Clock, Activity } from 'lucide-react'

/**
 * Social Proof Section
 * Credibility indicators with animated counters
 */
export const SocialProofSection = () => {
  const stats = [
    {
      icon: MapPin,
      number: 8,
      suffix: '+',
      label: 'Municípios atendidos',
    },
    {
      icon: Stethoscope,
      number: 30,
      suffix: '+',
      label: 'Especialidades médicas',
    },
    {
      icon: Clock,
      displayValue: '24h',
      label: 'Atendimento disponível',
    },
    {
      icon: Activity,
      number: 80,
      suffix: '%',
      label: 'Resolutividade',
    },
  ]

  return (
    <section className="relative py-24 md:py-32 bg-white">
      <Container>
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <motion.p
            className="text-gold-primary font-medium text-sm tracking-wide uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nossos Números
          </motion.p>
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A2E]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Credibilidade e confiança
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-gold-primary/8 border border-gold-primary/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold-primary" />
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-display text-gold-primary mb-2">
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
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Badge variant="premium" icon={<Check size={14} className="text-gold-primary" />}>
            Registrada na ANS
          </Badge>
          <Badge variant="premium" icon={<Check size={14} className="text-gold-primary" />}>
            Certificado SSL
          </Badge>
          <Badge variant="premium" icon={<Check size={14} className="text-gold-primary" />}>
            LGPD Compliance
          </Badge>
        </motion.div>
      </Container>
    </section>
  )
}
