'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, Instagram, Linkedin, Facebook } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'
import footerLogo from '@/Logo/logo-amelia-site-branca.png'

/**
 * Footer Component - Amélia Saúde
 * Elegant dark footer with purple accents
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Navegação',
      links: [
        { label: 'Sobre Nós', href: '/#about' },
        { label: 'Nossos Planos', href: '/#plans' },
        { label: 'Perguntas Frequentes', href: '/#faq' },
        { label: 'Blog', href: '/noticias' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Política de Privacidade', href: '/privacidade' },
        { label: 'Termos de Uso', href: '/termos' },
        { label: 'Política de Cookies', href: '/cookies' },
        { label: 'LGPD', href: '/lgpd' },
      ],
    },
  ]

  const contactInfo = [
    { icon: MessageCircle, label: 'WhatsApp', value: '(21) 99999-9999', href: 'https://wa.me/5521999999999' },
    { icon: Phone, label: 'Telefone', value: '0800 000 000', href: 'tel:0800000000' },
    { icon: Mail, label: 'E-mail', value: 'atendimento@ameliasaude.com.br', href: 'mailto:atendimento@ameliasaude.com.br' },
  ]

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/ameliasaude' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/ameliasaude' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/ameliasaude' },
  ]

  return (
    <footer data-navbar-theme="dark" className="relative bg-[#2D1F4E]">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-signature/40 to-transparent" />

      <Container>
        <div className="pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              className="sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <Link href="/" className="inline-block mb-5" aria-label="Amélia Saúde — início">
                <Image
                  src={footerLogo}
                  alt="Amélia Saúde"
                  width={200}
                  height={81}
                  className="h-auto w-[160px] sm:w-[180px]"
                  sizes="180px"
                />
              </Link>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Operadora de Planos de Saúde.
                <br />
                Cuidando de você e da sua família
                <br />
                no Rio de Janeiro.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 text-white">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'w-10 h-10 rounded-full',
                        'flex items-center justify-center',
                        'bg-white/5 border border-white/10',
                        'text-white/80 hover:text-gold-light',
                        'hover:bg-gold-signature/15 hover:border-gold-signature/40',
                        'transition-all duration-300'
                      )}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            {/* Links Columns */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.05 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-3 text-white">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white hover:text-white/90 transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">
                Contato
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <li key={info.label}>
                      <a
                        href={info.href}
                        className="flex items-center gap-3 group"
                      >
                        <Icon className="w-4 h-4 text-white/80 flex-shrink-0" />
                        <span className="text-sm text-white/80 group-hover:text-gold-light transition-colors">
                          {info.value}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 py-6">
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <p className="text-white/70 text-xs text-center md:text-left">
              Copyright © {currentYear} - Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-xs text-center md:text-right">
              Amelia Operadora de Planos de Saude S.A. CNPJ: 57.395.677/0001-93
            </p>
          </motion.div>
        </div>
      </Container>
    </footer>
  )
}
