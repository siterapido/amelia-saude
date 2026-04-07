'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, BarChart3, HelpCircle, Zap, Clock, Shield } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TiltCard, MagneticButton } from '@/components/animations'

/**
 * Client Self-Service Section
 * Quick access to common client needs (2ª via, IR proof, app, FAQ)
 */
export const ClientSection = () => {
  const cards = [
    {
      icon: FileText,
      title: '2ª Via de Boleto',
      description: 'Emita em segundos, pague com facilidade',
      detail: 'Sem filas, sem espera',
      badge: 'Instantâneo',
      badgeIcon: Zap,
      cta: 'Acessar',
      href: 'https://www.digitalsaude.com.br/portal/dixmed',
    },
    {
      icon: BarChart3,
      title: 'Demonstrativo de IR',
      description: 'Disponível para download a qualquer momento',
      detail: 'Documento oficial para declaração',
      badge: '24/7',
      badgeIcon: Clock,
      cta: 'Baixar',
      href: 'https://www.digitalsaude.com.br/portal/dixmed',
    },
    {
      icon: HelpCircle,
      title: 'Dúvidas Frequentes',
      description: 'Respostas rápidas para suas dúvidas',
      detail: '+50 perguntas respondidas',
      badge: 'Suporte',
      badgeIcon: Shield,
      cta: 'Ver FAQ',
      href: undefined,
    },
  ]

  return (
    <section
      id="client-section"
      className="relative py-24 md:py-32 lg:py-48 bg-black-premium"
    >
      <Container>
        {/* Custom Section Header with Larger Title */}
        <div className="mb-16 md:mb-24 space-y-6">
          <motion.p
            className="text-white/60 font-medium text-base tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Área do Cliente
          </motion.p>

          <motion.h2
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white max-w-3xl leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Resolva tudo por aqui de forma rápida e prática
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon
            const BadgeIcon = card.badgeIcon
            const floatDelayClass = ['card-premium-float', 'card-premium-float-delay-1', 'card-premium-float-delay-2'][index % 3]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={floatDelayClass}
              >
                <TiltCard maxTilt={3} glareEnabled={false} className="h-full">
                  <Card variant="gold-glass" className="group h-full relative overflow-hidden flex flex-col">
                    <CardContent className="p-6 md:p-8 relative z-10 flex flex-col flex-1">
                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/10 text-black text-xs font-medium rounded-full border border-black/20">
                          <BadgeIcon className="w-3 h-3 text-black" />
                          {card.badge}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-14 h-14 rounded-xl bg-black/10 border border-black/10 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-black" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="font-display font-bold text-xl md:text-2xl text-black mb-2">
                        {card.title}
                      </h3>
                      <p className="text-black/80 text-sm md:text-base mb-2 leading-relaxed">
                        {card.description}
                      </p>
                      <p className="text-black/60 text-xs mb-6">
                        {card.detail}
                      </p>

                      {/* CTA */}
                      <MagneticButton strength={0.15} className="w-full mt-auto">
                        {card.href ? (
                          <a
                            href={card.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 px-4 bg-black !text-white text-sm font-medium rounded-xl border border-black hover:bg-black/90 transition-all duration-300 text-center"
                          >
                            {card.cta}
                          </a>
                        ) : (
                          <button className="w-full py-3 px-4 bg-black !text-white text-sm font-medium rounded-xl border border-black hover:bg-black/90 transition-all duration-300">
                            {card.cta}
                          </button>
                        )}
                      </MagneticButton>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

        {/* Escape CTA */}
        <motion.div
          className="text-center mt-16 md:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-platinum mb-4">
            Não encontrou o que procurava?{' '}
            <button className="text-gold-primary hover:text-gold-signature font-semibold transition-colors">
              Fale com um especialista
            </button>
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
