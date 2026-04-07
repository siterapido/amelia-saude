'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import type { NewsArticle } from '@/lib/types/news'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

interface BlogArticleProps {
    article: NewsArticle
    relatedArticles?: NewsArticle[]
}

/**
 * Blog Article Content Component
 * Full article display with premium typography
 */
export const BlogArticle: React.FC<BlogArticleProps> = ({ article, relatedArticles = [] }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Compartilhamento cancelado')
            }
        }
    }

    return (
        <article className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-platinum hover:text-gold-signature transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Voltar para o Blog</span>
            </Link>

            {/* Header */}
            <header className="mb-12">
                {/* Category Badge */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-gold-primary text-black-premium text-xs font-bold uppercase tracking-wider">
                        {article.category.name}
                    </span>
                </div>

                {/* Title */}
                <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                    {article.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-platinum mb-8">
                    {article.author && (
                        <div className="flex items-center gap-3">
                            {article.author.avatar && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-primary/40">
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

                {/* Share Button */}
                {typeof window !== 'undefined' && 'share' in navigator && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShare}
                        className="!bg-black-charcoal/60 !border-gray-border"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar
                    </Button>
                )}
            </header>

            {/* Cover Image */}
            <div className="relative w-full aspect-video rounded-card overflow-hidden mb-12">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                />
            </div>

            {/* Content */}
            <div
                className={cn(
                    'prose prose-invert prose-lg max-w-none',
                    'prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight',
                    'prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6',
                    'prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4',
                    'prose-p:text-platinum-light prose-p:leading-relaxed prose-p:mb-6',
                    'prose-a:text-gold-signature prose-a:no-underline hover:prose-a:underline',
                    'prose-strong:text-white prose-strong:font-bold',
                    'prose-ul:list-disc prose-ul:pl-6 prose-ul:text-platinum-light',
                    'prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-platinum-light',
                    'prose-li:mb-2',
                    'prose-blockquote:border-l-4 prose-blockquote:border-gold-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-platinum',
                    'prose-code:bg-black-charcoal prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-gold-signature',
                    'prose-img:rounded-card'
                )}
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-border">
                    <p className="text-sm text-platinum mb-3">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-block px-3 py-1 rounded-full bg-black-charcoal text-platinum text-xs border border-gray-border"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
                <div className="mt-16 pt-8 border-t border-gray-border">
                    <h2 className="font-display font-bold text-white text-2xl mb-6">
                        Artigos Relacionados
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedArticles.map((related) => (
                            <Link
                                key={related.id}
                                href={`/blog/${related.slug}`}
                                className="group block rounded-card bg-black-charcoal border border-gray-border hover:border-gold-primary/40 overflow-hidden transition-all duration-300 hover:shadow-premium-hover"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <Image
                                        src={related.coverImage}
                                        alt={related.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black-premium to-transparent opacity-80" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-white text-sm line-clamp-2 group-hover:text-gold-signature transition-colors">
                                        {related.title}
                                    </h3>
                                    <p className="text-xs text-platinum mt-2">
                                        {related.readingTime} min
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    )
}
