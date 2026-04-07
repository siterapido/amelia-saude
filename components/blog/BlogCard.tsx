'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Calendar } from 'lucide-react'
import type { NewsArticle } from '@/lib/types/news'
import { cn } from '@/lib/utils/cn'

interface BlogCardProps {
    article: NewsArticle
    featured?: boolean
    className?: string
}

/**
 * Premium Blog Card Component
 * Features glass effect, hover animations, and premium styling
 */
export const BlogCard: React.FC<BlogCardProps> = ({ article, featured = false, className }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                'group relative overflow-hidden rounded-card bg-black-charcoal',
                'border border-gray-border hover:border-gold-primary/30',
                'transition-all duration-500 ease-out-expo',
                'hover:shadow-premium-hover hover:-translate-y-1',
                featured ? 'lg:col-span-2' : '',
                className
            )}
        >
            <Link href={`/blog/${article.slug}`} className="block">
                {/* Image Container */}
                <div className={cn(
                    'relative overflow-hidden',
                    featured ? 'h-80 md:h-96' : 'h-56'
                )}>
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                        sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black-premium via-black-premium/60 to-transparent opacity-80" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gold-primary text-black-premium text-xs font-bold uppercase tracking-wider">
                            {article.category.name}
                        </span>
                    </div>

                    {/* Featured Badge */}
                    {article.featured && (
                        <div className="absolute top-4 right-4 z-10">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-black-premium/90 backdrop-blur-sm border border-gold-primary/40 text-gold-primary text-xs font-bold uppercase tracking-wider">
                                Destaque
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Title */}
                    <h3 className={cn(
                        'font-display font-bold text-white mb-3 line-clamp-2',
                        'transition-colors duration-300 group-hover:text-gold-signature',
                        featured ? 'text-2xl md:text-3xl' : 'text-xl'
                    )}>
                        {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={cn(
                        'text-platinum mb-4 line-clamp-2',
                        featured ? 'text-base' : 'text-sm'
                    )}>
                        {article.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-platinum-light">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{article.readingTime} min</span>
                        </div>
                    </div>

                    {/* Author */}
                    {article.author && (
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-border">
                            {article.author.avatar && (
                                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                        src={article.author.avatar}
                                        alt={article.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-white">{article.author.name}</p>
                                {article.author.role && (
                                    <p className="text-xs text-platinum">{article.author.role}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Hover Indicator */}
                    <div className="mt-4 flex items-center gap-2 text-gold-signature text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Ler mais</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-primary/10 rounded-full blur-3xl" />
                </div>
            </Link>
        </motion.article>
    )
}
