'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import type { NewsArticle } from '@/lib/types/news'
import { Button } from '@/components/ui/Button'

interface BlogHeroProps {
    article: NewsArticle | null
    loading?: boolean
}

/**
 * Blog Hero Section
 * Dramatic hero with featured article
 */
export const BlogHero: React.FC<BlogHeroProps> = ({ article, loading = false }) => {
    if (loading || !article) {
        return (
            <section className="relative min-h-[70vh] w-full overflow-hidden bg-black-premium pt-24">
                <div className="absolute inset-0 top-24 bg-gray-dark animate-pulse" />
            </section>
        )
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    }

    return (
        <section className="relative min-h-[70vh] w-full overflow-hidden bg-black-premium pt-24">
            {/* Background Image */}
            <div className="absolute inset-0 top-24">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black-premium via-black-premium/80 to-black-premium/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black-premium/60 to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-24 right-0 w-1/2 h-1/2 bg-gradient-radial from-gold-primary/10 to-transparent blur-3xl opacity-60" />

            {/* Content */}
            <div className="relative z-10 flex items-end min-h-[70vh] px-6 md:px-12 lg:px-20 py-12 md:py-16">
                <div className="max-w-[1400px] mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl"
                    >
                        {/* Badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-primary text-black-premium text-xs font-bold uppercase tracking-wider">
                                {article.category.name}
                            </span>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-black-premium/60 backdrop-blur-sm border border-gold-primary/40 text-gold-primary text-xs font-bold uppercase tracking-wider">
                                Artigo em Destaque
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                            {article.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-platinum-light text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                            {article.excerpt}
                        </p>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-platinum">
                            {article.author && (
                                <div className="flex items-center gap-3">
                                    {article.author.avatar && (
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold-primary/40">
                                            <Image
                                                src={article.author.avatar}
                                                alt={article.author.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium text-white">{article.author.name}</p>
                                        {article.author.role && (
                                            <p className="text-xs text-platinum">{article.author.role}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="h-8 w-px bg-gray-border" />

                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(article.publishedAt)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readingTime} min de leitura</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link href={`/blog/${article.slug}`}>
                            <Button
                                variant="primary"
                                size="lg"
                                className="group"
                            >
                                <span>Ler Artigo Completo</span>
                                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black-deep to-transparent" />
        </section>
    )
}
