import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'

/**
 * Plus Jakarta Sans - Body font (clean, modern readability)
 * Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

/**
 * DM Serif Display - Display font (elegant, premium)
 * Weight: 400
 */
export const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

/**
 * Font combinations for layout
 */
export const fontVariables = [plusJakarta.variable, dmSerif.variable].join(' ')
