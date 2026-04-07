'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { NewsArticle } from '@/lib/types/news'
import { BlogCard } from './BlogCard'
import { cn } from '@/lib/utils/cn'

interface BlogGridProps {
    articles: NewsArticle[]
    loading?: boolean
    className?: string
}

/**
 * Blog Grid Component
 * Responsive grid layout for blog articles
 */
export const BlogGrid: React.FC<BlogGridProps> = ({ articles, loading = false, className }) => {
    if (loading) {
        return (
            <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8', className)}>
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-card bg-black-charcoal border border-gray-border overflow-hidden animate-pulse"
                    >
                        <div className="h-56 bg-gray-dark" />
                        <div className="p-6 space-y-4">
                            <div className="h-4 bg-gray-dark rounded w-3/4" />
                            <div className="h-4 bg-gray-dark rounded w-1/2" />
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-dark rounded" />
                                <div className="h-3 bg-gray-dark rounded w-5/6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-platinum text-lg">Nenhum artigo encontrado.</p>
                <p className="text-platinum-light text-sm mt-2">
                    Tente ajustar os filtros ou buscar por outro termo.
                </p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8', className)}
        >
            {articles.map((article, index) => (
                <BlogCard
                    key={article.id}
                    article={article}
                    featured={index === 0 && article.featured}
                />
            ))}
        </motion.div>
    )
}
