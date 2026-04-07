'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Users, Briefcase, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/animations'

/**
 * Plans Section
 * Displays the three plan types with clean card design
 */
export const PlanSection = () => {
  const plans = [
    {
      icon: User,
      name: 'Individual',
      description: 'Para você que quer cuidar da sua saúde com tranquilidade.',
      features: [
        'Consultas e exames',
        'Internações e cirurgias',
        'Telemedicina 24h',
        'Rede credenciada Rio e Grande Rio',
      ],
    },
    {
      icon: Users,
      name: 'Familiar',
      description: 'Proteja quem você mais ama com cobertura completa.',
      features: [
        'Tudo do plano Individual',
        'Dependentes inclusos',
        'Pediatria e obstetrícia',
        'Descontos progressivos',
      ],
      highlighted: true,
    },
    {
      icon: Briefcase,
      name: 'Empresarial',
      description: 'Cuide da saúde da sua equipe com condições especiais.',
      features: [
        'Tudo do plano Familiar',
        'Gestão de benefícios',
        'Atendimento corporativo',
        'Condições exclusivas',
      ],
    },
  ]

  return (
    <section id="plans" className="relative py-24 md:py-32 bg-gradient-to-br from-[#5E4985] to-[#7B6CB1] overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-white/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] rounded-full bg-white/[0.02] blur-[80px]" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium mb-6"
          >
            Nossos Planos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6"
          >
            Planos simples e sem complicações
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            Com coberturas para consultas, exames, internações e cirurgias.
          </motion.p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                viewport={{ once: true }}
                className={`bg-white rounded-3xl p-8 md:p-9 flex flex-col transition-all duration-400 hover:-translate-y-1 ${
                  plan.highlighted
                    ? 'shadow-[0_20px_60px_rgba(0,0,0,0.2)] ring-2 ring-white/30 scale-[1.02] md:scale-105'
                    : 'shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-gold-primary/10 text-gold-primary text-xs font-semibold rounded-full">
                      Mais popular
                    </span>
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-gold-primary/8 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-gold-primary" />
                </div>

                <h3 className="font-display text-2xl text-[#1A1A2E] mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-gold-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <MagneticButton strength={0.1} className="w-full">
                  <button
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gold-primary text-white hover:bg-gold-signature shadow-gold-sm'
                        : 'bg-gold-primary/8 text-gold-primary hover:bg-gold-primary/15 border border-gold-primary/20'
                    }`}
                    onClick={() => {
                      const phoneNumber = '5521999999999'
                      const message = `Olá! Tenho interesse no plano ${plan.name} da Amélia Saúde.`
                      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
                    }}
                  >
                    Solicitar Cotação
                  </button>
                </MagneticButton>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
