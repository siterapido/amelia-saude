'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface BlogPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    loading?: boolean
}

/**
 * Blog Pagination Component
 */
export const BlogPagination: React.FC<BlogPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    loading = false,
}) => {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const showMax = 5

        if (totalPages <= showMax) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            if (currentPage > 3) {
                pages.push('...')
            }

            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push('...')
            }

            pages.push(totalPages)
        }

        return pages
    }

    return (
        <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Paginação">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-premium',
                    'font-medium text-sm transition-all duration-300',
                    currentPage === 1 || loading
                        ? 'bg-gray-dark text-platinum/50 cursor-not-allowed'
                        : 'bg-black-charcoal text-platinum hover:bg-black-elevated hover:text-white border border-gray-border hover:border-gold-primary/40'
                )}
                aria-label="Página anterior"
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-platinum">
                                ...
                            </span>
                        )
                    }

                    const pageNum = page as number
                    const isActive = pageNum === currentPage

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            disabled={loading}
                            className={cn(
                                'w-10 h-10 rounded-premium font-medium text-sm',
                                'transition-all duration-300',
                                isActive
                                    ? 'bg-gold-primary text-black-premium shadow-gold-md'
                                    : 'bg-black-charcoal text-platinum hover:bg-black-elevated hover:text-white border border-gray-border hover:border-gold-primary/40'
                            )}
                            aria-label={`Página ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNum}
                        </button>
                    )
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-premium',
                    'font-medium text-sm transition-all duration-300',
                    currentPage === totalPages || loading
                        ? 'bg-gray-dark text-platinum/50 cursor-not-allowed'
                        : 'bg-black-charcoal text-platinum hover:bg-black-elevated hover:text-white border border-gray-border hover:border-gold-primary/40'
                )}
                aria-label="Próxima página"
            >
                <span className="hidden sm:inline">Próxima</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </nav>
    )
}
