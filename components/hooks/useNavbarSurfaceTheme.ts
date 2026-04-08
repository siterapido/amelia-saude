'use client'

import { useLayoutEffect, useState, type RefObject } from 'react'

export type NavbarSurface = 'light' | 'dark'

/**
 * Descobre se o fundo visível atrás do header fixo é claro ou escuro,
 * lendo `data-navbar-theme` no elemento sob o centro da barra (amostragem
 * com pointer-events desligados no header para não interceptar o hit-test).
 */
export function useNavbarSurfaceTheme(
  headerRef: RefObject<HTMLElement | null>,
  pathname: string
): NavbarSurface {
  const [surface, setSurface] = useState<NavbarSurface>('light')

  useLayoutEffect(() => {
    const probe = () => {
      const headerEl = headerRef.current
      if (!headerEl) return

      const x = Math.min(window.innerWidth - 1, Math.max(0, window.innerWidth / 2))
      const rect = headerEl.getBoundingClientRect()
      const y = Math.min(
        window.innerHeight - 1,
        Math.max(0, Math.floor(rect.top + rect.height / 2))
      )

      const prev = headerEl.style.pointerEvents
      headerEl.style.pointerEvents = 'none'
      const hit = document.elementFromPoint(x, y)
      headerEl.style.pointerEvents = prev

      if (!hit) {
        setSurface('light')
        return
      }

      let node: Element | null = hit
      while (node && node !== document.documentElement) {
        const theme = node.getAttribute?.('data-navbar-theme')
        if (theme === 'light' || theme === 'dark') {
          setSurface(theme)
          return
        }
        node = node.parentElement
      }
      setSurface('light')
    }

    const raf = () => requestAnimationFrame(probe)
    probe()

    window.addEventListener('scroll', raf, { passive: true })
    window.addEventListener('resize', raf)

    const headerEl = headerRef.current
    const ro = headerEl ? new ResizeObserver(raf) : null
    if (headerEl && ro) ro.observe(headerEl)

    return () => {
      window.removeEventListener('scroll', raf)
      window.removeEventListener('resize', raf)
      ro?.disconnect()
    }
  }, [headerRef, pathname])

  return surface
}
