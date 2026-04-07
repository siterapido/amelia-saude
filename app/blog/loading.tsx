import React from 'react'
import { Container } from '@/components/ui/Container'

/**
 * Loading State for Blog Pages
 */
export default function BlogLoading() {
    return (
        <main className="min-h-screen bg-black-premium">
            {/* Hero Skeleton */}
            <section className="relative min-h-[70vh] w-full overflow-hidden bg-black-premium">
                <div className="absolute inset-0 bg-gray-dark animate-pulse" />
                <div className="relative z-10 flex items-end min-h-[70vh] px-6 md:px-12 lg:px-20 py-12 md:py-16">
                    <div className="max-w-[1400px] mx-auto w-full space-y-6">
                        <div className="h-6 bg-gray-dark rounded w-32 animate-pulse" />
                        <div className="h-16 bg-gray-dark rounded w-3/4 animate-pulse" />
                        <div className="h-8 bg-gray-dark rounded w-1/2 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Content Skeleton */}
            <section className="py-12 md:py-16 lg:py-24 bg-black-deep">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Filters Skeleton */}
                            <div className="space-y-6">
                                <div className="h-14 bg-black-charcoal rounded-premium animate-pulse" />
                                <div className="flex gap-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-10 w-24 bg-black-charcoal rounded-full animate-pulse" />
                                    ))}
                                </div>
                            </div>

                            {/* Grid Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        </div>

                        {/* Sidebar Skeleton */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="rounded-card bg-black-charcoal border border-gray-border p-6 animate-pulse">
                                <div className="h-6 bg-gray-dark rounded w-3/4 mb-4" />
                                <div className="space-y-3">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-20 bg-gray-dark rounded" />
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
