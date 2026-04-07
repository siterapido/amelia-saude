'use client'

import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { NewsHeroSection } from '@/components/sections/NewsHeroSection'
import { NewsGridSection } from '@/components/sections/NewsGridSection'
import { NewsSidebar } from '@/components/sections/NewsSidebar'
import {
  getNews,
  getFeaturedNews,
  getPopularNews,
  getCategories,
} from '@/lib/api/news'
import type { NewsArticle, NewsCategory } from '@/lib/types/news'

function NewsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL params
  const categoryParam = searchParams.get('categoria') || 'all'
  const searchParam = searchParams.get('busca') || ''
  const pageParam = parseInt(searchParams.get('pagina') || '1', 10)

  // State
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [featuredArticle, setFeaturedArticle] = useState<NewsArticle | null>(null)
  const [popularNews, setPopularNews] = useState<NewsArticle[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)

  // Update URL params
  const updateParams = useCallback(
    (params: { categoria?: string; busca?: string; pagina?: number }) => {
      const newParams = new URLSearchParams(searchParams.toString())

      if (params.categoria !== undefined) {
        if (params.categoria === 'all') {
          newParams.delete('categoria')
        } else {
          newParams.set('categoria', params.categoria)
        }
      }

      if (params.busca !== undefined) {
        if (params.busca === '') {
          newParams.delete('busca')
        } else {
          newParams.set('busca', params.busca)
        }
      }

      if (params.pagina !== undefined) {
        if (params.pagina === 1) {
          newParams.delete('pagina')
        } else {
          newParams.set('pagina', params.pagina.toString())
        }
      }

      const query = newParams.toString()
      router.push(query ? `/noticias?${query}` : '/noticias', { scroll: false })
    },
    [router, searchParams]
  )

  // Handlers
  const handleCategoryChange = useCallback(
    (category: string) => {
      updateParams({ categoria: category, pagina: 1 })
    },
    [updateParams]
  )

  const handleSearchChange = useCallback(
    (search: string) => {
      updateParams({ busca: search, pagina: 1 })
    },
    [updateParams]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      updateParams({ pagina: page })
      window.scrollTo({ top: 400, behavior: 'smooth' })
    },
    [updateParams]
  )

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      const [featured, popular, cats] = await Promise.all([
        getFeaturedNews(),
        getPopularNews(5),
        getCategories(),
      ])
      setFeaturedArticle(featured)
      setPopularNews(popular)
      setCategories(cats)
      setInitialLoading(false)
    }
    loadInitialData()
  }, [])

  // Load articles based on filters
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      const result = await getNews({
        category: categoryParam,
        search: searchParam,
        page: pageParam,
        limit: 6,
      })
      setArticles(result.data)
      setTotalPages(result.totalPages)
      setLoading(false)
    }
    loadArticles()
  }, [categoryParam, searchParam, pageParam])

  return (
    <main className="min-h-screen bg-black-premium">
      {/* Hero with Featured Article */}
      <NewsHeroSection article={featuredArticle} loading={initialLoading} />

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-black-deep">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* News Grid (2/3) */}
            <div className="lg:col-span-2">
              <NewsGridSection
                articles={articles}
                categories={categories}
                currentCategory={categoryParam}
                searchQuery={searchParam}
                currentPage={pageParam}
                totalPages={totalPages}
                loading={loading}
                onCategoryChange={handleCategoryChange}
                onSearchChange={handleSearchChange}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Sidebar (1/3) */}
            <div className="lg:col-span-1">
              <NewsSidebar
                popularNews={popularNews}
                categories={categories}
                loading={initialLoading}
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black-premium">
          <NewsHeroSection article={null} loading={true} />
        </main>
      }
    >
      <NewsPageContent />
    </Suspense>
  )
}
