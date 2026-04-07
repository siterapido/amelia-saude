# SIX Saúde - Landing Page Premium AAA

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#)

Site institucional **premium** para **SIX Saúde Administradora de Benefícios**. Design minimalista com paleta preto/amarelo ouro, otimizado para conversão e performance excepcional.

## ✨ Características

✅ **Next.js 16** App Router + TypeScript strict
✅ **Tailwind CSS 4** com tema premium customizado (Preto/Ouro)
✅ **Framer Motion** para animações suaves e refinadas
✅ **Otimização de Fontes** com `next/font` (Inter + Montserrat)
✅ **SEO Completo** com metadata estruturada e Open Graph
✅ **Mobile-First** responsivo (320px → 4K)
✅ **Acessibilidade WCAG AAA** contraste 7:1 (preto/ouro)
✅ **Performance 95+** no PageSpeed (LCP < 2.5s)

## 🎨 Design Premium AAA

### Cores
```
Primárias:
  Preto Profundo:  #0A0A0A (backgrounds principais)
  Amarelo Ouro:    #F5A623 / #FFB800 (CTAs, destaque)
  Branco Puro:     #FFFFFF (textos, contraste máximo)

Secundárias:
  Cinza Platinum:  #B8B8B8 (textos secundários)
  Cinza Carvão:    #1E1E1E (cards, seções)
```

### Tipografia
- **Display**: Montserrat (Headlines) - Bold/700
- **Body**: Inter (Copy) - Regular/400, Medium/500
- **Escala**: 8px base, spacing fluido
- **Hierarquia**: H1 72px → Body 16px (mobile responsive)

## 🚀 Início Rápido

### Requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build para produção
pnpm build
pnpm start

# Lint
pnpm lint
```

Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
sixsaude/
├── app/
│   ├── layout.tsx              # Root layout + SEO metadata
│   └── page.tsx                # Home page principal
├── components/
│   ├── ui/                      # Componentes reutilizáveis
│   │   ├── Button.tsx           # (primary, secondary, ghost)
│   │   ├── Badge.tsx            # Badges e labels
│   │   ├── Card.tsx             # Cards (default, glass, elevated)
│   │   ├── Container.tsx        # Container responsivo
│   │   └── WhatsAppButton.tsx   # Botão flutuante WhatsApp
│   ├── sections/                # Seções da página
│   │   ├── HeroSection.tsx      # Hero com CTA dual
│   │   ├── ClientSection.tsx    # Autoatendimento (4 cards)
│   │   ├── PlanSection.tsx      # Planos (Individual + Empresarial)
│   │   ├── AppSection.tsx       # App showcase + download
│   │   ├── SocialProofSection.tsx # Stats + certificações
│   │   ├── FAQSection.tsx       # Accordion 6-8 perguntas
│   │   └── CTABanner.tsx        # CTAs recorrentes
│   └── layout/
│       └── Footer.tsx           # Footer global
├── lib/
│   ├── fonts.ts                 # next/font (Inter + Montserrat)
│   └── utils/
│       └── cn.ts                # Utility: clsx
├── styles/
│   └── globals.css              # Global styles + animações
├── public/
│   ├── fonts/
│   ├── images/
│   └── favicon.ico
├── tailwind.config.ts           # Tema premium customizado
├── tsconfig.json                # Strict mode
├── next.config.ts
└── postcss.config.mjs
```

## 📄 Página de Destino - Seções

A home page segue estrutura persuasiva de conversão:

### 1️⃣ **Hero Section** (3 segundos max)
- Badge "Administradora AAA Registrada"
- Headline: "Sua saúde em boas mãos..."
- Subheadline com benefícios
- Dual CTAs: "Sou Cliente" + "Quero Contratar"
- Visual placeholder
- Scroll indicator animado

### 2️⃣ **Client Self-Service**
- 4 cards: 2ª Via, IR, App, FAQ
- Hover elevado com sombra ouro
- Escape CTA: "Fale com especialista"

### 3️⃣ **Plans Section**
- 2 cards: Individual + Empresarial
- Badge "Mais Contratado"
- 3-4 benefícios cada
- CTA por plano

### 4️⃣ **CTA Banner #1** (Help variant)
- "Ficou com alguma dúvida?"
- Trigger: WhatsApp suporte

### 5️⃣ **App Section**
- Mockup esquerda
- Features grid 2x2
- Download buttons (App Store + Google Play)

### 6️⃣ **CTA Banner #2** (Contract variant)
- "Pronto para contratar?"
- Trigger: WhatsApp vendas

### 7️⃣ **Social Proof**
- 4 stats: "10+ anos", "5000+ clientes", "24/7", "98% satisfação"
- Certificações: ANS, SSL, LGPD

### 8️⃣ **FAQ Accordion**
- 6-8 perguntas com respostas
- Open/close animation
- Bottom CTA: "Não encontrou?"

### 9️⃣ **Footer**
- Branding + Links (About, Legal)
- Contato: WhatsApp, Email, Phone
- Certificações
- Copyright

## 🎭 Componentes Reutilizáveis

### Button
```tsx
<Button variant="primary|secondary|ghost" size="sm|base|lg">
  Texto do botão
</Button>
```

### Card
```tsx
<Card variant="default|glass|elevated">
  <CardHeader>Título</CardHeader>
  <CardContent>Conteúdo</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Badge
```tsx
<Badge variant="default|premium|success" icon={Icon}>
  Label
</Badge>
```

### Container
```tsx
<Container size="default|tight">
  Conteúdo responsivo
</Container>
```

## 🎬 Animações (Framer Motion)

**Premium easing curves:**
```typescript
ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0)
premium-ease: cubic-bezier(0.4, 0, 0.2, 1)
```

**Padrões de animação:**
- Fade in ao scroll: opacity 0→1 + translateY 40px→0 (0.8s)
- Hover: scale 1.05, translateY -2px (0.3s)
- Botão press: scale 0.95 (0.1s)
- Cards: hover elevado -8px (0.4s)

## 🌐 SEO & Metadata

**Configurado em `app/layout.tsx`:**
- Title dinâmico + OG title
- Meta description (160 char)
- Keywords
- Open Graph (redes sociais)
- Twitter Card
- Structured data (Schema.org)
- Robots meta
- Canonical URL
- Viewport + theme color

## ♿ Acessibilidade WCAG AAA

- ✅ Contraste mínimo **7:1** (preto/ouro)
- ✅ Focus states **visíveis** em todos elementos
- ✅ **Skip to main content** link
- ✅ ARIA labels descritivos
- ✅ Navegação por teclado perfeita
- ✅ Textos alt em imagens
- ✅ Estrutura semântica (h1, h2, nav, etc)
- ✅ Modo escuro reduzido motion

## 📊 Performance Target: 95+

**Otimizações implementadas:**
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting automático
- ✅ next/font para web fonts (zero layout shift)
- ✅ CSS crítico inline
- ✅ Lazy loading (componentes e imagens)
- ✅ Minificação assets (JS, CSS, HTML)
- ✅ WebP/AVIF support

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 🔧 Customização

### Mudar Cores Principais

Edite `tailwind.config.ts`:
```typescript
colors: {
  'gold-primary': '#SEU_OURO',
  'black-premium': '#SEU_PRETO',
  'platinum': '#SEU_CINZA',
}
```

### Mudar Fontes

Edite `lib/fonts.ts`:
```typescript
import { YourFont } from 'next/font/google'
export const displayFont = YourFont({ ... })
```

### Adicionar Nova Seção

```bash
# 1. Crie componente
touch components/sections/NovaSeção.tsx

# 2. Importe em app/page.tsx
import { NovaSeção } from '@/components/sections/NovaSeção'

# 3. Insira na ordem desejada
<NovaSeção />
```

## 📱 Responsividade

**Breakpoints:**
```
mobile:     < 640px
mobile-lg:  640px - 768px
tablet:     768px - 1024px
desktop:    1024px - 1440px
desktop-lg: > 1440px (4K)
```

Testado em:
- ✅ iPhone 12-15 (375px)
- ✅ iPad / Tablet (768px+)
- ✅ Desktop (1440px, 1920px)
- ✅ 4K (2560px+)

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Deploy automático ao push
git push origin main

# Ou manualmente
npm i -g vercel
vercel
```

Variáveis de ambiente: `.env.local`

### Outras Plataformas

Compatível com:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker

## 📝 Variáveis de Ambiente

Crie `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_PHONE=55119999999999
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

## 🔐 Segurança

- ✅ TypeScript strict mode
- ✅ ESLint Next.js rules
- ✅ HTTPS/SSL obrigatório
- ✅ CSP headers
- ✅ XSS protection
- ✅ Input sanitization

## 📚 Stack Técnico

| Tecnologia | Versão | Propósito |
|---|---|---|
| Next.js | 16.1.5 | Framework React full-stack |
| React | 19.2.3 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4 | Styling system |
| Framer Motion | 12.29.2 | Animações |
| Lucide React | 0.563 | Ícones |
| ESLint | 9.39 | Code quality |

## 🐛 Troubleshooting

**Build falha com TypeScript:**
```bash
rm -rf .next
pnpm build
```

**Estilos não aplicam:**
```bash
# Reinicie dev server
pkill -f "next dev"
pnpm dev
```

**Imagens não carregam:**
- Coloque em `/public/images/`
- Use `next/image` para otimização

## 📖 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 📄 Licença

**Proprietary** - SIX Saúde Administradora de Benefícios

---

**Versão:** 1.0
**Status:** ✅ Pronto para Produção
**Performance Target:** 95+ PageSpeed
**Acessibilidade:** WCAG AAA
**Mobile-First:** 100% Responsivo

Desenvolvido com ❤️ usando as melhores práticas premium.
