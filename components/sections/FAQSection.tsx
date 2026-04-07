'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MagneticButton, GradientText } from '@/components/animations'

/**
 * FAQ Section
 * Clean accordion with healthcare-specific questions
 */
export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Quais municípios a rede credenciada cobre?',
      answer:
        'A Amélia Saúde está presente em mais de oito municípios do Rio de Janeiro e Grande Rio, com acesso a diversos hospitais, clínicas e laboratórios.',
    },
    {
      question: 'Como funciona a telemedicina?',
      answer:
        'Oferecemos mais de 30 especialidades médicas por telemedicina, com prescrição eletrônica de medicamentos, exames e atestados. Nossa taxa de resolutividade alcança 80% já na primeira consulta.',
    },
    {
      question: 'Quando posso começar a usar o plano?',
      answer:
        'O uso do plano é liberado a partir da data de início da vigência expressa no seu contrato. A carteirinha digital fica disponível no app Amélia Saúde.',
    },
    {
      question: 'Quais os tipos de plano disponíveis?',
      answer:
        'Oferecemos planos Individual, Familiar e Empresarial, todos com cobertura para consultas, exames, internações e cirurgias. Cada plano pode ser personalizado de acordo com suas necessidades.',
    },
    {
      question: 'Como funcionam as carências?',
      answer:
        'A carência é o tempo de espera para realizar certos procedimentos. Seguimos os prazos máximos da ANS, mas eles podem ser reduzidos promocionalmente. Consulte sua proposta para detalhes específicos.',
    },
    {
      question: 'O atendimento 24h funciona como?',
      answer:
        'Nosso time de especialistas em saúde atua como ponto de contato único para auxiliá-lo em casos de urgência e emergência, com atendimento ágil e personalizado, disponível 24 horas por dia.',
    },
  ]

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-white">
      <Container>
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center space-y-5">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-primary/8 border border-gold-primary/15 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HelpCircle className="w-4 h-4 text-gold-primary" />
            <span className="text-gold-primary text-sm font-medium">Tire suas dúvidas</span>
          </motion.div>

          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A2E]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Perguntas <GradientText>Frequentes</GradientText>
          </motion.h2>

          <motion.p
            className="text-gray-500 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Encontre respostas rápidas sobre nossos planos e serviços
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full rounded-2xl p-5 md:p-6 text-left transition-all duration-400 ${
                  openIndex === index
                    ? 'bg-gold-primary/5 border border-gold-primary/20 shadow-[0_4px_20px_rgba(94,73,133,0.08)]'
                    : 'bg-[#F8F9FA] border border-transparent hover:bg-[#F3F4F6]'
                }`}
                whileTap={{ scale: 0.995 }}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex-shrink-0 text-sm font-semibold font-body tabular-nums transition-colors duration-300 ${
                    openIndex === index ? 'text-gold-primary' : 'text-gray-400'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className={`flex-1 font-semibold text-base md:text-lg transition-colors duration-300 ${
                    openIndex === index ? 'text-gold-primary' : 'text-[#1A1A2E]'
                  }`}>
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-colors duration-300 ${
                        openIndex === index ? 'text-gold-primary' : 'text-gray-400'
                      }`}
                    />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 md:px-6 pb-2 pt-0">
                      <div className="pl-9 border-l-2 border-gold-primary/20 py-3">
                        <p className="text-gray-500 leading-relaxed text-[15px]">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-5 text-sm">
            Não encontrou sua resposta?
          </p>
          <MagneticButton strength={0.2}>
            <Button
              variant="primary"
              className="!bg-gold-primary !text-white hover:!bg-gold-signature !rounded-xl shadow-gold-sm"
              onClick={() => {
                const phoneNumber = '5521999999999'
                const message = 'Olá! Tenho uma dúvida sobre os planos da Amélia Saúde.'
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Fale com um especialista
            </Button>
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  )
}
