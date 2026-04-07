---
slug: routing
category: architecture
generatedAt: 2026-01-30T18:33:39.433Z
relevantFiles:
  - app/api/ai
  - app/api/auth
  - app/api/categories
  - app/api/chat
  - app/api/posts
  - lib/api/news.ts
  - app/api/ai/generate-post
  - app/api/auth/login
  - app/api/auth/logout
  - app/api/auth/me
---

# How does routing work?

## Routing

### Next.js App Router

Routes are defined by the folder structure in `app/`:

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/:slug`

### Detected Route Files

- `../../../../app/api/posts/[id]/route.ts`
- `../../../../app/api/posts/[id]/route.ts`
- `../../../../app/api/posts/route.ts`
- `../../../../app/api/categories/route.ts`
- `../../../../app/api/posts/[id]/route.ts`