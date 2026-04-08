'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import headerLogo from '@/Logo/logo-amelia-site.png'
import headerLogoBranca from '@/Logo/logo-amelia-site-branca.png'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils/cn'

interface NavItem {
  label: string
  href: string
  highlight?: boolean
}

const navItems: NavItem[] = [
  { label: 'Sobre Nós', href: '/#about' },
  { label: 'Nossos Planos', href: '/#plans', highlight: true },
  { label: 'Blog', href: '/noticias' },
  { label: 'Contato', href: '/#faq' },
]

/**
 * Premium Navbar — Amélia Saúde
 * Topo: logo e links brancos sobre fundo transparente; ao rolar: fundo claro e cores originais.
 */
export const Navbar = () => {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  if (isAdminRoute) return null

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-premium',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Container>
          <nav className="flex items-center justify-between h-20 md:h-24">
            {/* Brand logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={isScrolled ? headerLogo : headerLogoBranca}
                  alt="Amélia Saúde"
                  width={240}
                  height={76}
                  priority
                  className="h-auto w-[150px] md:w-[190px] transition-opacity duration-300"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                item.highlight ? (
                  <Button
                    key={item.href}
                    variant="primary"
                    size="sm"
                    className={cn(
                      '!rounded-xl !font-semibold !text-sm !tracking-wide !shadow-none',
                      isScrolled
                        ? '!bg-gold-primary !text-white hover:!bg-gold-signature hover:!shadow-gold-sm'
                        : '!bg-transparent !border-2 !border-white !text-white hover:!bg-white/10 hover:!shadow-none'
                    )}
                    onClick={() => {
                      if (item.href.startsWith('/#')) {
                        const element = document.querySelector(item.href.substring(1))
                        element?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'transition-colors duration-300',
                      'text-sm font-medium',
                      'relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5',
                      'after:rounded-full after:transition-all after:duration-300',
                      'hover:after:w-full',
                      isScrolled
                        ? 'text-gray-600 hover:text-gold-primary after:bg-gold-primary'
                        : 'text-white hover:text-white/85 after:bg-white'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden relative z-50 p-2 transition-opacity duration-200",
                isMobileMenuOpen && "opacity-0 pointer-events-none"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu
                className={cn(
                  'w-6 h-6 transition-colors duration-300',
                  isMobileMenuOpen || !isScrolled ? 'text-white' : 'text-gray-800'
                )}
              />
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#2D1F4E] backdrop-blur-2xl" />
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-4xl text-white/90 mb-8">amélia</span>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="text-2xl font-body font-light text-white hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <button
              className="absolute top-7 right-6 text-white hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
