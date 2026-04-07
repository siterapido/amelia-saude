'use client'

import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import type { NewsCategory } from '@/lib/types/news'
import { cn } from '@/lib/utils/cn'

interface BlogFiltersProps {
    categories: NewsCategory[]
    currentCategory: string
    searchQuery: string
    onCategoryChange: (category: string) => void
    onSearchChange: (search: string) => void
    loading?: boolean
}

/**
 * Blog Filters Component
 * Category pills and search bar
 */
export const BlogFilters: React.FC<BlogFiltersProps> = ({
    categories,
    currentCategory,
    searchQuery,
    onCategoryChange,
    onSearchChange,
    loading = false,
}) => {
    const [searchInput, setSearchInput] = useState(searchQuery)

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearchChange(searchInput)
    }

    const handleClearSearch = () => {
        setSearchInput('')
        onSearchChange('')
    }

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-platinum" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Buscar artigos..."
                        className={cn(
                            'w-full pl-12 pr-12 py-4 rounded-premium',
                            'bg-black-charcoal/60 backdrop-blur-sm',
                            'border border-gray-border focus:border-gold-primary/50',
                            'text-white placeholder:text-platinum',
                            'transition-all duration-300',
                            'focus:outline-none focus:ring-2 focus:ring-gold-primary/20'
                        )}
                    />
                    {searchInput && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-dark rounded-full transition-colors"
                            aria-label="Limpar busca"
                        >
                            <X className="w-4 h-4 text-platinum" />
                        </button>
                    )}
                </div>
            </form>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => onCategoryChange('all')}
                    disabled={loading}
                    className={cn(
                        'px-5 py-2.5 rounded-full font-medium text-sm uppercase tracking-wider',
                        'transition-all duration-300 ease-out-expo',
                        currentCategory === 'all'
                            ? 'bg-gold-primary text-black-premium shadow-gold-md'
                            : 'bg-black-charcoal/60 backdrop-blur-sm text-platinum border border-gray-border hover:border-gold-primary/40 hover:text-white'
                    )}
                >
                    Todas
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.slug)}
                        disabled={loading}
                        className={cn(
                            'px-5 py-2.5 rounded-full font-medium text-sm uppercase tracking-wider',
                            'transition-all duration-300 ease-out-expo',
                            currentCategory === category.slug
                                ? 'bg-gold-primary text-black-premium shadow-gold-md'
                                : 'bg-black-charcoal/60 backdrop-blur-sm text-platinum border border-gray-border hover:border-gold-primary/40 hover:text-white'
                        )}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
