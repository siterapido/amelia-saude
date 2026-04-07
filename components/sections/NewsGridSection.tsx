'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { NewsCard, NewsCardSkeleton } from '@/components/ui/NewsCard'
import { SearchInput } from '@/components/ui/SearchInput'
import { Pagination } from '@/components/ui/Pagination'
import type { NewsArticle, NewsCategory } from '@/lib/types/news'

interface NewsGridSectionProps {
  articles: NewsArticle[]
  categories: NewsCategory[]
  currentCategory: string
  searchQuery: string
  currentPage: number
  totalPages: number
  loading?: boolean
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
  onPageChange: (page: number) => void
  className?: string
}

/**
 * News Grid Section
 * Main news listing with filters, search, and pagination
 */
export const NewsGridSection = ({
  articles,
  categories,
  currentCategory,
  searchQuery,
  currentPage,
  totalPages,
  loading = false,
  onCategoryChange,
  onSearchChange,
  onPageChange,
  className,
}: NewsGridSectionProps) => {
  const allCategories = [{ id: 'all', name: 'Todas', slug: 'all' }, ...categories]

  return (
    <div className={className}>
      {/* Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 space-y-4"
      >
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.slug)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium',
                'transition-all duration-300',
                currentCategory === category.slug
                  ? 'bg-gold-signature text-black-premium shadow-gold-sm'
                  : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full"
        />
      </motion.div>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-platinum/60 text-lg mb-2">
            Nenhuma notícia encontrada
          </p>
          <p className="text-platinum/40 text-sm">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}
