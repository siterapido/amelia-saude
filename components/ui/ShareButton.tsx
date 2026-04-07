'use client'

import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  text: string
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title,
        text,
        url: window.location.href,
      })
    }
  }

  return (
    <button
      className="flex items-center gap-2 hover:text-gold-signature transition-colors"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      Compartilhar
    </button>
  )
}
