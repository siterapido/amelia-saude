import { Container } from '@/components/ui/Container'
import { NewsCardSkeleton } from '@/components/ui/NewsCard'

export default function NewsLoading() {
  return (
    <main className="min-h-screen bg-black-premium">
      {/* Hero Skeleton */}
      <section className="relative py-8 md:py-12 overflow-hidden">
        <Container>
          <div className="mb-8 animate-pulse">
            <div className="h-10 w-40 bg-black-charcoal rounded mb-3" />
            <div className="h-5 w-80 bg-black-charcoal rounded" />
          </div>
          <NewsCardSkeleton variant="featured" />
        </Container>
      </section>

      {/* Grid Skeleton */}
      <section className="py-12 md:py-16 bg-black-deep">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Grid */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="mb-8 space-y-4 animate-pulse">
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-black-charcoal rounded-full" />
                  ))}
                </div>
                <div className="h-12 w-80 bg-black-charcoal rounded-premium" />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <NewsCardSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Popular News Skeleton */}
              <div className="bg-black-deep border border-gray-border rounded-card p-6 animate-pulse">
                <div className="h-6 w-32 bg-black-charcoal rounded mb-6" />
                <div className="space-y-5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <NewsCardSkeleton key={i} variant="horizontal" />
                  ))}
                </div>
              </div>

              {/* Categories Skeleton */}
              <div className="bg-black-deep border border-gray-border rounded-card p-6 animate-pulse">
                <div className="h-6 w-28 bg-black-charcoal rounded mb-6" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 bg-black-charcoal rounded-premium" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
