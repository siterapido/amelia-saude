'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { NewsCard, NewsCardSkeleton } from '@/components/ui/NewsCard'
import type { NewsArticle } from '@/lib/types/news'

interface NewsHeroSectionProps {
  article: NewsArticle | null
  loading?: boolean
}

/**
 * News Hero Section - Featured article display
 */
export const NewsHeroSection = ({ article, loading = false }: NewsHeroSectionProps) => {
  return (
    <section className="relative bg-black-premium pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden">
      {/* Gradient background accent */}
      <div className="absolute inset-0 bg-gradient-gold-radial opacity-50 pointer-events-none" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-h3 md:text-h2 text-white font-bold">
            Notícias
          </h1>
          <p className="text-platinum/70 mt-2 text-body-lg">
            Fique por dentro das novidades em saúde e bem-estar
          </p>
        </motion.div>

        {loading ? (
          <NewsCardSkeleton variant="featured" />
        ) : article ? (
          <NewsCard article={article} variant="featured" priority />
        ) : null}
      </Container>
    </section>
  )
}
