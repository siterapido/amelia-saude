'use server'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { BlogCard } from '@/components/blog/BlogCard'
import { getNews } from '@/lib/api/news'
import { Button } from '@/components/ui/Button'
import type { NewsArticle } from '@/lib/types/news'

const MOCK_ARTICLES: NewsArticle[] = [
    {
        id: 'mock-1',
        slug: 'como-escolher-plano-de-saude',
        title: 'Como escolher o plano de saúde ideal para sua família',
        excerpt: 'Entenda os critérios mais importantes para tomar a melhor decisão na hora de contratar um plano de saúde familiar.',
        content: '',
        coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        category: { id: 'c1', name: 'Planos', slug: 'planos', color: '#7C3AED' },
        author: { name: 'Equipe Amélia Saúde', role: 'Especialistas em Saúde' },
        publishedAt: new Date('2026-03-10').toISOString(),
        readingTime: 6,
        featured: true,
        tags: ['plano de saúde', 'família'],
    },
    {
        id: 'mock-2',
        slug: 'check-up-anual-importancia',
        title: 'Por que o check-up anual pode salvar sua vida',
        excerpt: 'Consultas preventivas detectam doenças antes que se tornem graves. Saiba quais exames fazer em cada fase da vida.',
        content: '',
        coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
        category: { id: 'c2', name: 'Prevenção', slug: 'prevencao', color: '#10B981' },
        author: { name: 'Equipe Amélia Saúde', role: 'Especialistas em Saúde' },
        publishedAt: new Date('2026-03-05').toISOString(),
        readingTime: 4,
        featured: false,
        tags: ['check-up', 'prevenção'],
    },
    {
        id: 'mock-3',
        slug: 'saude-mental-trabalho',
        title: 'Saúde mental no trabalho: como sua empresa pode ajudar',
        excerpt: 'Burnout e ansiedade afetam a produtividade. Descubra como planos empresariais cobrem saúde mental.',
        content: '',
        coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        category: { id: 'c3', name: 'Bem-estar', slug: 'bem-estar', color: '#F59E0B' },
        author: { name: 'Equipe Amélia Saúde', role: 'Especialistas em Saúde' },
        publishedAt: new Date('2026-02-28').toISOString(),
        readingTime: 5,
        featured: false,
        tags: ['saúde mental', 'empresa'],
    },
]

/**
 * Latest Blog Section
 * Displays the 3 most recent blog articles on the home page
 */
export const LatestNewsSection = async () => {
    let articles: NewsArticle[] = []

    try {
        const { data } = await getNews({ limit: 3 })
        articles = data ?? []
    } catch {
        // DB unavailable — fall through to mock data
    }

    if (articles.length === 0) {
        articles = MOCK_ARTICLES
    }

    return (
        <section
            data-navbar-theme="dark"
            className="py-24 relative overflow-hidden"
            style={{ backgroundColor: '#3D2F5C' }}
        >
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-gold-light text-sm font-bold uppercase tracking-[0.3em] mb-4 block opacity-80">
                            Conteúdo & Saúde
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
                            Tudo sobre <span className="text-gold-light/70">saúde e bem-estar</span>
                        </h2>
                    </div>

                    <Link href="/blog">
                        <Button variant="ghost" className="group text-white/80 hover:text-white p-0 h-auto font-medium text-sm normal-case tracking-normal">
                            Ver todos os artigos
                            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <BlogCard key={article.id} article={article} light />
                    ))}
                </div>
            </Container>
        </section>
    )
}
