import { Container } from '@/components/ui/Container'
import { NewsCardSkeleton } from '@/components/ui/NewsCard'

export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-black-premium">
      {/* Hero Skeleton */}
      <section className="relative h-[50vh] md:h-[60vh] bg-black-charcoal animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black-premium via-black-premium/50 to-transparent" />
        <Container className="relative h-full">
          <div className="absolute top-8">
            <div className="h-10 w-24 bg-black-deep rounded-premium" />
          </div>
        </Container>
      </section>

      {/* Header Skeleton */}
      <section className="relative -mt-32 pb-8">
        <Container>
          <div className="max-w-4xl animate-pulse">
            <div className="flex gap-3 mb-4">
              <div className="h-7 w-20 bg-black-charcoal rounded-full" />
              <div className="h-7 w-24 bg-black-charcoal rounded-full" />
            </div>
            <div className="h-12 w-3/4 bg-black-charcoal rounded mb-3" />
            <div className="h-12 w-1/2 bg-black-charcoal rounded mb-6" />
            <div className="flex gap-6">
              <div className="h-5 w-32 bg-black-charcoal rounded" />
              <div className="h-5 w-28 bg-black-charcoal rounded" />
            </div>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="w-14 h-14 bg-black-charcoal rounded-full" />
              <div>
                <div className="h-5 w-32 bg-black-charcoal rounded mb-2" />
                <div className="h-4 w-24 bg-black-charcoal rounded" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Skeleton */}
      <section className="py-8 md:py-12 bg-black-deep">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Article Body */}
            <div className="lg:col-span-2 animate-pulse space-y-4">
              <div className="h-5 w-full bg-black-charcoal rounded" />
              <div className="h-5 w-full bg-black-charcoal rounded" />
              <div className="h-5 w-3/4 bg-black-charcoal rounded" />
              <div className="h-8 w-1/2 bg-black-charcoal rounded mt-8" />
              <div className="h-5 w-full bg-black-charcoal rounded" />
              <div className="h-5 w-full bg-black-charcoal rounded" />
              <div className="h-5 w-2/3 bg-black-charcoal rounded" />
              <div className="h-5 w-full bg-black-charcoal rounded mt-4" />
              <div className="h-5 w-full bg-black-charcoal rounded" />
              <div className="h-5 w-4/5 bg-black-charcoal rounded" />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-black-deep border border-gray-border rounded-card p-6 animate-pulse">
                <div className="h-6 w-32 bg-black-charcoal rounded mb-6" />
                <div className="space-y-5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <NewsCardSkeleton key={i} variant="horizontal" />
                  ))}
                </div>
              </div>
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

      {/* Related News Skeleton */}
      <section className="py-12 md:py-16 bg-black-premium">
        <Container>
          <div className="h-9 w-56 bg-black-charcoal rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
