'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Building2, Stethoscope, Clock, Phone, HeartPulse } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TiltCard, MagneticButton } from '@/components/animations'

/**
 * About + Network Section
 * Presents Amélia Saúde and its credentialed network
 */
export const ClientSection = () => {
  const features = [
    {
      icon: MapPin,
      title: '8+ Municípios',
      description: 'Presente no Rio de Janeiro e Grande Rio, sempre pertinho de você.',
    },
    {
      icon: Building2,
      title: 'Hospitais e Clínicas',
      description: 'Acesso a diversos hospitais, clínicas e centros médicos credenciados.',
    },
    {
      icon: Stethoscope,
      title: '30+ Especialidades',
      description: 'Telemedicina com mais de 30 especialidades médicas disponíveis.',
    },
    {
      icon: Clock,
      title: 'Atendimento 24h',
      description: 'Time de especialistas disponível para urgência e emergência.',
    },
    {
      icon: HeartPulse,
      title: '80% Resolutividade',
      description: 'Taxa de resolução já na primeira consulta de telemedicina.',
    },
    {
      icon: Phone,
      title: 'Ponto de Contato Único',
      description: 'Atendimento ágil e personalizado em casos de urgência.',
    },
  ]

  return (
    <section
      id="about"
      data-navbar-theme="light"
      className="relative py-24 md:py-32 lg:py-40 bg-[#F8F6FB]"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <motion.p
            className="text-gold-primary font-medium text-sm tracking-wide uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sobre Nós
          </motion.p>

          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A2E] leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Um novo conceito em planos de saúde para os cariocas
          </motion.h2>

          <motion.p
            className="text-gray-500 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Somos uma operadora que une tecnologia inteligente e atendimento humanizado. Acreditamos que cuidar vai além de tratar: é acompanhar, orientar e estar presente em cada momento da vida dos nossos beneficiários.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <TiltCard maxTilt={3} glareEnabled={false} className="h-full">
                  <div className="group h-full bg-white rounded-2xl p-7 border border-gray-100 hover:border-gold-primary/20 hover:shadow-[0_8px_30px_rgba(94,73,133,0.08)] transition-all duration-400">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gold-primary/8 border border-gold-primary/15 flex items-center justify-center mb-5 group-hover:bg-gold-primary/12 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold-primary" />
                    </div>

                    <h3 className="font-semibold text-lg text-[#1A1A2E] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <MagneticButton strength={0.1}>
            <Button
              variant="primary"
              size="lg"
              className="!bg-gold-primary !text-white hover:!bg-gold-signature !rounded-2xl !px-10 !py-6 shadow-gold-sm hover:shadow-gold-md transition-all duration-300"
              onClick={() => {
                const phoneNumber = '5521999999999'
                const message = 'Olá! Gostaria de saber mais sobre a rede credenciada da Amélia Saúde.'
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
              }}
            >
              Fale com um especialista
            </Button>
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  )
}
