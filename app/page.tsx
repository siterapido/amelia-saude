import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { ClientSection } from '@/components/sections/ClientSection'
import { PlanSection } from '@/components/sections/PlanSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { LatestNewsSection } from '@/components/sections/LatestNewsSection'
import { NetworkSection } from '@/components/sections/NetworkSection'
import { Footer } from '@/components/layout/Footer'
import { AIChatWidget } from '@/components/ui/AIChatWidget'

export const metadata: Metadata = {
  title: 'Amélia Saúde | Planos de Saúde que Cuidam de Você de Verdade',
  description:
    'Conectamos você aos melhores médicos, clínicas e laboratórios do Rio de Janeiro, sem burocracias. Planos Individual, Familiar e Empresarial.',
  openGraph: {
    title: 'Amélia Saúde | Planos de Saúde',
    description: 'Planos que cuidam de você de verdade. Rede credenciada no Rio de Janeiro.',
    url: 'https://ameliasaude.com.br',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Sobre Nós */}
      <ClientSection />

      {/* Rede Credenciada — Orbital */}
      <NetworkSection />

      {/* CTA */}
      <CTABanner
        variant="purple"
        heading="Ficou com alguma dúvida?"
        subheading="Nosso time está pronto para te ajudar"
        ctaText="Falar com especialista"
      />

      {/* Planos */}
      <PlanSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTABanner
        variant="light"
        heading="Pronto para cuidar da sua saúde?"
        subheading="Conheça os planos ideais para você, sua família ou empresa"
        ctaText="Quero Contratar"
      />

      {/* Números */}
      <SocialProofSection />

      {/* Blog */}
      <LatestNewsSection />

      {/* Footer */}
      <Footer />

      {/* AI Chat Widget */}
      <AIChatWidget />
    </>
  )
}
