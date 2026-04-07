'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
 * Premium Navbar Component - Amélia Saúde
 * Clean white nav with purple accents
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
            {/* Logo - Text based "amélia" */}
            <Link href="/" className="flex items-center group">
              <motion.span
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="font-display text-3xl md:text-4xl tracking-tight text-gold-primary"
              >
                amélia
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                item.highlight ? (
                  <Button
                    key={item.href}
                    variant="primary"
                    size="sm"
                    className="!bg-gold-primary !bg-none !text-white hover:!bg-gold-signature !shadow-none hover:!shadow-gold-sm !rounded-xl !font-semibold !text-sm !tracking-wide"
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
                      'text-gray-600 hover:text-gold-primary',
                      'relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5',
                      'after:bg-gold-primary after:rounded-full',
                      'after:transition-all after:duration-300',
                      'hover:after:w-full'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className={cn("w-6 h-6", isMobileMenuOpen ? "text-white" : "text-gray-800")} />
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
                    className="text-2xl font-body font-light text-white/80 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <button
              className="absolute top-7 right-6 text-white/80 hover:text-white transition-colors"
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
