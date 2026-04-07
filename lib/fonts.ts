import { Inter, Syne } from 'next/font/google'

/**
 * Inter - Body font (highly legible, professional)
 * Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
 */
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

/**
 * Syne - Display font (unique, art-house, premium)
 * Weights: 400, 500, 600, 700, 800
 */
export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

/**
 * Font combinations for layout
 */
export const fontVariables = [inter.variable, syne.variable].join(' ')
