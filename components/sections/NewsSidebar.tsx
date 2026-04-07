'use client'

import React, { useCallback, FormEvent } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Tag, Mail, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { NewsCard, NewsCardSkeleton } from '@/components/ui/NewsCard'
import { Button } from '@/components/ui/Button'
import type { NewsArticle, NewsCategory } from '@/lib/types/news'

interface NewsSidebarProps {
  popularNews: NewsArticle[]
  categories: NewsCategory[]
  tags?: string[]
  loading?: boolean
  className?: string
}

/**
 * News Sidebar Component
 * Displays popular news, categories, newsletter signup, and tags
 */
export const NewsSidebar = ({
  popularNews,
  categories,
  tags = ['check-up', 'prevenção', 'bem-estar', 'planos', 'telemedicina', 'nutrição'],
  loading = false,
  className,
}: NewsSidebarProps) => {
  const handleNewsletterSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.aside
      className={cn('space-y-8', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Popular News */}
      <motion.div
        variants={itemVariants}
        className="bg-black-deep border border-gray-border rounded-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-gold-signature" />
          <h3 className="font-display text-lg text-white font-semibold">Mais Lidas</h3>
        </div>
        <div className="space-y-5">
          {loading ? (
            <>
              <NewsCardSkeleton variant="horizontal" />
              <NewsCardSkeleton variant="horizontal" />
              <NewsCardSkeleton variant="horizontal" />
            </>
          ) : (
            popularNews.slice(0, 4).map((article, index) => (
              <div
                key={article.id}
                className={cn(
                  index !== popularNews.length - 1 && 'pb-5 border-b border-white/5'
                )}
              >
                <NewsCard article={article} variant="horizontal" />
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        variants={itemVariants}
        className="bg-black-deep border border-gray-border rounded-card p-6"
      >
        <h3 className="font-display text-lg text-white font-semibold mb-6">Categorias</h3>
        <nav className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/noticias?categoria=${category.slug}`}
              className={cn(
                'flex items-center justify-between py-3 px-4 rounded-premium',
                'bg-white/5 border border-transparent',
                'transition-all duration-300',
                'hover:bg-white/10 hover:border-gold-signature/30',
                'group'
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  {category.name}
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-platinum/40 group-hover:text-gold-signature transition-colors" />
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        variants={itemVariants}
        className={cn(
          'relative overflow-hidden rounded-card p-6',
          'bg-gradient-to-br from-gold-primary/20 to-gold-signature/5',
          'border border-gold-signature/30'
        )}
      >
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-signature/20 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-gold-signature" />
            <h3 className="font-display text-lg text-white font-semibold">Newsletter</h3>
          </div>
          <p className="text-platinum/80 text-sm mb-5">
            Receba as principais notícias de saúde direto no seu email.
          </p>
          <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Seu melhor email"
              className={cn(
                'w-full px-4 py-3 rounded-premium',
                'bg-black-premium/50 border border-white/10',
                'text-white placeholder:text-platinum/40',
                'focus:outline-none focus:border-gold-signature/50',
                'transition-colors duration-300'
              )}
            />
            <Button variant="primary" fullWidth size="sm">
              Inscrever-se
            </Button>
          </form>
          <p className="text-platinum/50 text-xs mt-3">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        variants={itemVariants}
        className="bg-black-deep border border-gray-border rounded-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-gold-signature" />
          <h3 className="font-display text-lg text-white font-semibold">Tags Populares</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/noticias?busca=${encodeURIComponent(tag)}`}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm',
                'bg-white/5 border border-white/10 text-platinum/80',
                'transition-all duration-300',
                'hover:bg-gold-signature/10 hover:border-gold-signature/30 hover:text-gold-light'
              )}
            >
              {tag}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.aside>
  )
}
