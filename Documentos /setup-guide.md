# Guia de Setup & Instalação - Site SIX Saúde
## Next.js + Neon DB + Auth + Cloudflare R2

---

## 📋 STACK TECNOLÓGICO

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Next.js** | 14+ | Framework React com App Router |
| **TypeScript** | 5+ | Type safety |
| **Neon DB** | Latest | PostgreSQL serverless |
| **Prisma** | 5+ | ORM para banco de dados |
| **NextAuth.js** | 4+ | Autenticação |
| **Cloudflare R2** | Latest | Storage de arquivos (S3-compatible) |
| **Tailwind CSS** | 3+ | Estilização |
| **Framer Motion** | 11+ | Animações premium |

---

## 🚀 PARTE 1: SETUP INICIAL DO PROJETO

### 1.1 Pré-requisitos

Certifique-se de ter instalado:
- **Node.js:** v18.17+ ou v20+ ([Download](https://nodejs.org/))
- **npm/pnpm/yarn:** Gerenciador de pacotes
- **Git:** Para controle de versão

Verifique as versões:
```bash
node --version    # Deve ser v18.17+ ou v20+
npm --version     # v9+ recomendado
git --version
```

---

### 1.2 Criar Projeto Next.js

```bash
# Opção 1: Com npx (recomendado)
npx create-next-app@latest sixsaude-site

# Opção 2: Com pnpm (mais rápido)
pnpm create next-app sixsaude-site

# Opção 3: Com yarn
yarn create next-app sixsaude-site
```

**Configuração interativa (escolha):**
```
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias? … No
```

---

### 1.3 Entrar no Projeto

```bash
cd sixsaude-site
```

---

## 📦 PARTE 2: INSTALAÇÃO DE DEPENDÊNCIAS

### 2.1 Dependências Principais

```bash
npm install \
  @prisma/client \
  next-auth \
  @auth/prisma-adapter \
  @aws-sdk/client-s3 \
  @aws-sdk/s3-request-presigner \
  framer-motion \
  lucide-react \
  zod \
  react-hook-form \
  @hookform/resolvers \
  clsx \
  tailwind-merge

# Ou com pnpm (mais rápido)
pnpm add @prisma/client next-auth @auth/prisma-adapter @aws-sdk/client-s3 @aws-sdk/s3-request-presigner framer-motion lucide-react zod react-hook-form @hookform/resolvers clsx tailwind-merge
```

**Explicação:**
- `@prisma/client`: Cliente do Prisma para queries no banco
- `next-auth`: Autenticação completa
- `@auth/prisma-adapter`: Adapter do NextAuth para Prisma
- `@aws-sdk/client-s3`: SDK para Cloudflare R2 (compatível S3)
- `@aws-sdk/s3-request-presigner`: Gerar URLs assinadas
- `framer-motion`: Animações premium
- `lucide-react`: Ícones modernos
- `zod`: Validação de schemas
- `react-hook-form`: Formulários performáticos
- `@hookform/resolvers`: Integração Zod + React Hook Form
- `clsx` + `tailwind-merge`: Utilitários para classes CSS

---

### 2.2 Dependências de Desenvolvimento

```bash
npm install -D \
  prisma \
  @types/node \
  @types/react \
  @types/react-dom \
  typescript \
  eslint \
  eslint-config-next \
  prettier \
  prettier-plugin-tailwindcss

# Ou com pnpm
pnpm add -D prisma @types/node @types/react @types/react-dom typescript eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

**Explicação:**
- `prisma`: CLI do Prisma
- `@types/*`: Tipos TypeScript
- `prettier`: Formatação de código
- `prettier-plugin-tailwindcss`: Ordena classes Tailwind automaticamente

---

## 🗄️ PARTE 3: CONFIGURAÇÃO DO NEON DB

### 3.1 Criar Conta no Neon

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta (GitHub login recomendado)
3. Crie um novo projeto: "sixsaude-production"
4. Selecione região: **US East (Ohio)** ou mais próxima do Brasil

### 3.2 Obter Connection String

No dashboard do Neon:
1. Vá em **Dashboard** → Seu projeto
2. Copie a **Connection String**
3. Deve ter formato: `postgresql://user:password@host/database?sslmode=require`

**Importante:** Guarde esta string, você usará no `.env`

---

### 3.3 Configurar Prisma

#### Inicializar Prisma

```bash
npx prisma init
```

Isso cria:
- `/prisma/schema.prisma` (schema do banco)
- `.env` (variáveis de ambiente)

---

#### Configurar `prisma/schema.prisma`

Abra o arquivo e substitua por:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================================
// MODELS DE AUTENTICAÇÃO (NextAuth.js)
// ========================================

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  role          String    @default("user") // user, admin
  cpf           String?   @unique // Para clientes SIX Saúde
  phone         String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ========================================
// MODELS ESPECÍFICOS DA SIX SAÚDE
// ========================================

// Exemplo: Solicitações de contato via site
model ContactRequest {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String   @db.Text
  source    String   @default("website") // website, whatsapp
  status    String   @default("pending") // pending, contacted, converted
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([status])
  @@index([createdAt])
}

// Exemplo: Downloads de documentos (boletos, IR)
model DocumentDownload {
  id           String   @id @default(cuid())
  userId       String?  // Opcional, se usuário estiver logado
  documentType String   // boleto, ir, carteirinha
  cpf          String?  // Se não estiver logado, captura CPF
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())

  @@index([documentType])
  @@index([createdAt])
}
```

---

#### Configurar `.env`

Abra `.env` e adicione:

```env
# Database (Neon)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-super-segura-aqui" # Gerar com: openssl rand -base64 32

# Cloudflare R2
R2_ACCOUNT_ID="seu-account-id"
R2_ACCESS_KEY_ID="sua-access-key"
R2_SECRET_ACCESS_KEY="seu-secret-key"
R2_BUCKET_NAME="sixsaude-files"
R2_PUBLIC_URL="https://files.sixsaude.com.br" # URL pública do bucket

# Analytics (opcional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# WhatsApp (para links)
NEXT_PUBLIC_WHATSAPP_VENDAS="+5511999999999"
NEXT_PUBLIC_WHATSAPP_SUPORTE="+5511888888888"
```

**⚠️ IMPORTANTE:**
- Adicione `.env` ao `.gitignore` (já deve estar)
- Nunca commite credenciais
- Gere `NEXTAUTH_SECRET` com: `openssl rand -base64 32`

---

#### Criar Banco de Dados

```bash
# Enviar schema para o Neon
npx prisma db push

# Gerar cliente Prisma
npx prisma generate
```

**Output esperado:**
```
✔ Generated Prisma Client
✔ Database synchronized
```

---

#### Abrir Prisma Studio (GUI do Banco)

```bash
npx prisma studio
```

Abre em `http://localhost:5555` - interface visual do banco.

---

## 🔐 PARTE 4: CONFIGURAÇÃO DE AUTENTICAÇÃO (NextAuth.js)

### 4.1 Estrutura de Pastas

Crie a seguinte estrutura:

```
app/
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts
lib/
├── auth.ts
├── prisma.ts
```

---

### 4.2 Criar `lib/prisma.ts`

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

### 4.3 Criar `lib/auth.ts`

```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Login com CPF (para clientes SIX Saúde)
    CredentialsProvider({
      id: 'cpf-login',
      name: 'CPF',
      credentials: {
        cpf: { label: 'CPF', type: 'text', placeholder: '000.000.000-00' },
        birthDate: { label: 'Data de Nascimento', type: 'date' },
      },
      async authorize(credentials) {
        if (!credentials?.cpf) return null

        // Buscar usuário por CPF
        const user = await prisma.user.findUnique({
          where: { cpf: credentials.cpf },
        })

        if (!user) return null

        // Aqui você validaria a data de nascimento ou outro dado
        // Por enquanto, apenas retorna o usuário
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),

    // Adicione outros providers aqui se necessário
    // GoogleProvider({ clientId: '', clientSecret: '' })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }
      return session
    },
  },
}
```

---

### 4.4 Criar `app/api/auth/[...nextauth]/route.ts`

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

---

### 4.5 Adicionar Provider ao Layout

Edite `app/layout.tsx`:

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIX Saúde | Administradora de Benefícios Premium',
  description: 'Planos de saúde com atendimento humanizado e transparência',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
```

---

## ☁️ PARTE 5: CONFIGURAÇÃO DO CLOUDFLARE R2

### 5.1 Criar Bucket no Cloudflare R2

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá em **R2** → **Create bucket**
3. Nome: `sixsaude-files`
4. Locação: Automática (escolhe melhor região)

---

### 5.2 Criar API Token

1. Em R2, clique em **Manage R2 API Tokens**
2. **Create API Token**
3. Permissões: **Object Read & Write**
4. Copie:
   - **Access Key ID**
   - **Secret Access Key**
   - **Account ID** (está no dashboard R2)

---

### 5.3 Configurar Domínio Público (Opcional)

Para servir arquivos publicamente:

1. No bucket, vá em **Settings** → **Public Access**
2. Habilite **Allow Public Access**
3. Configure domínio customizado (ex: `files.sixsaude.com.br`)
4. Adicione CNAME no seu DNS apontando para o endpoint R2

---

### 5.4 Criar `lib/r2.ts`

```typescript
// lib/r2.ts
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Configurar cliente R2 (compatível com S3)
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!

// Upload de arquivo
export async function uploadFile(key: string, body: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  })

  await r2Client.send(command)

  // Retornar URL pública (se bucket for público)
  return `${process.env.R2_PUBLIC_URL}/${key}`
}

// Gerar URL assinada (privada, expira em X segundos)
export async function getSignedDownloadUrl(key: string, expiresIn: number = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  return await getSignedUrl(r2Client, command, { expiresIn })
}

// Deletar arquivo
export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  await r2Client.send(command)
}
```

---

### 5.5 Exemplo de Rota para Upload

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '@/lib/r2'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Converter File para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gerar nome único
    const filename = `${Date.now()}-${file.name}`

    // Upload para R2
    const url = await uploadFile(filename, buffer, file.type)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

---

## ⚙️ PARTE 6: CONFIGURAÇÃO DO TAILWIND PREMIUM

### 6.1 Atualizar `tailwind.config.ts`

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Premium AAA (Preto & Amarelo Ouro)
        primary: {
          black: '#0A0A0A',
          gold: '#F5A623',
          'gold-light': '#FFC933',
        },
        secondary: {
          charcoal: '#1A1A1A',
          platinum: '#B8B8B8',
          border: '#2D2D2D',
        },
        accent: {
          green: '#10D86F',
          red: '#E63946',
          yellow: '#FFCC00',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-clash-display)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

### 6.2 Atualizar `app/globals.css`

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-secondary-border;
  }

  body {
    @apply bg-primary-black text-white antialiased;
  }

  /* Smooth scroll */
  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  /* Gradiente Ouro */
  .gradient-gold {
    background: linear-gradient(135deg, #F5A623 0%, #FFB800 50%, #FFC933 100%);
  }

  /* Glassmorphism */
  .glass {
    background: rgba(26, 26, 26, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Text gradient ouro */
  .text-gradient-gold {
    @apply bg-gradient-to-r from-primary-gold via-primary-gold-light to-primary-gold bg-clip-text text-transparent;
  }
}
```

---

## 📁 PARTE 7: ESTRUTURA DE PASTAS RECOMENDADA

```
sixsaude-site/
├── app/
│   ├── (auth)/              # Grupo de rotas de autenticação
│   │   ├── login/
│   │   └── registro/
│   ├── (site)/              # Grupo de rotas públicas
│   │   ├── page.tsx         # Home page
│   │   ├── sobre/
│   │   └── cliente/
│   ├── api/
│   │   ├── auth/
│   │   ├── upload/
│   │   └── contact/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                  # Componentes base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Section.tsx
│   └── home/                # Componentes da home
│       ├── HeroSection.tsx
│       ├── ClientSection.tsx
│       └── PlansSection.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── r2.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── images/
│   └── icons/
├── .env
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔧 PARTE 8: SCRIPTS ÚTEIS

Adicione ao `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🌍 PARTE 9: VARIÁVEIS DE AMBIENTE

### 9.1 Criar `.env.example`

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Cloudflare R2
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME="sixsaude-files"
R2_PUBLIC_URL="https://files.sixsaude.com.br"

# Analytics
NEXT_PUBLIC_GA_ID=""

# WhatsApp
NEXT_PUBLIC_WHATSAPP_VENDAS=""
NEXT_PUBLIC_WHATSAPP_SUPORTE=""
```

### 9.2 Configurar `.env.local` (Local Development)

Copie `.env.example` para `.env.local` e preencha com valores reais.

---

## 🧪 PARTE 10: TESTAR INSTALAÇÃO

### 10.1 Verificar Banco de Dados

```bash
# Abrir Prisma Studio
npx prisma studio

# Deve abrir em http://localhost:5555
# Você verá as tabelas criadas
```

---

### 10.2 Testar Servidor Local

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

**Checklist:**
- [ ] Página carrega sem erros
- [ ] Console sem erros (F12)
- [ ] Estilos Tailwind aplicados

---

### 10.3 Testar Upload R2

Crie um endpoint de teste:

```typescript
// app/api/test-r2/route.ts
import { NextResponse } from 'next/server'
import { r2Client } from '@/lib/r2'
import { ListBucketsCommand } from '@aws-sdk/client-s3'

export async function GET() {
  try {
    const command = new ListBucketsCommand({})
    const response = await r2Client.send(command)
    return NextResponse.json({ buckets: response.Buckets })
  } catch (error) {
    console.error('R2 error:', error)
    return NextResponse.json({ error: 'R2 connection failed' }, { status: 500 })
  }
}
```

Acesse: `http://localhost:3000/api/test-r2`

Deve retornar lista de buckets.

---

## 🚀 PARTE 11: DEPLOY (VERCEL)

### 11.1 Preparar para Deploy

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

---

### 11.2 Configurar Variáveis de Ambiente na Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. **Settings** → **Environment Variables**
4. Adicione todas as variáveis do `.env`:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (use domínio de produção)
   - `NEXTAUTH_SECRET`
   - `R2_ACCOUNT_ID`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
   - `R2_PUBLIC_URL`

---

### 11.3 Build na Vercel

Vercel detecta Next.js automaticamente. Configuração:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (ou `prisma generate && next build`)
- **Output Directory:** `.next`
- **Install Command:** `npm install`

---

## 📚 PARTE 12: RECURSOS ADICIONAIS

### Documentação Oficial
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Neon Docs](https://neon.tech/docs)

### Ferramentas Úteis
- [Prisma Studio](https://www.prisma.io/studio) - GUI do banco
- [TablePlus](https://tableplus.com/) - Cliente PostgreSQL
- [Postman](https://www.postman.com/) - Testar APIs
- [Insomnia](https://insomnia.rest/) - Alternativa ao Postman

---

## 🐛 TROUBLESHOOTING

### Erro: "Cannot connect to database"
- ✅ Verifique `DATABASE_URL` no `.env`
- ✅ Certifique-se de que tem `?sslmode=require` no final
- ✅ Teste conexão no Prisma Studio: `npx prisma studio`

### Erro: "Module not found: Can't resolve '@/lib/...'"
- ✅ Verifique `tsconfig.json` tem:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./*"]
      }
    }
  }
  ```

### Erro: "R2 access denied"
- ✅ Verifique API tokens estão corretos
- ✅ Token tem permissões de Read & Write
- ✅ `R2_ACCOUNT_ID` está correto

### Build falha na Vercel
- ✅ Rode `npm run build` localmente primeiro
- ✅ Certifique-se que todas as env vars estão na Vercel
- ✅ Verifique logs de build na Vercel

---

## ✅ CHECKLIST FINAL

### Antes de Começar Desenvolvimento:
- [ ] Node.js v18+ instalado
- [ ] Projeto Next.js criado
- [ ] Todas as dependências instaladas
- [ ] Neon DB configurado e conectado
- [ ] Prisma schema criado e sincronizado
- [ ] NextAuth.js configurado
- [ ] Cloudflare R2 bucket criado e configurado
- [ ] Tailwind customizado com paleta premium
- [ ] `.env` preenchido com todas as credenciais
- [ ] Servidor local rodando sem erros
- [ ] Prisma Studio abrindo corretamente
- [ ] Estrutura de pastas criada

### Antes de Deploy:
- [ ] Build local sem erros: `npm run build`
- [ ] Todas as variáveis de ambiente na Vercel
- [ ] Database migrations aplicadas
- [ ] R2 configurado com domínio público (se necessário)
- [ ] Analytics configurado (GA4)
- [ ] Testes de API realizados

---

## 🎉 PRÓXIMOS PASSOS

Agora que o setup está completo, você pode:

1. **Começar o desenvolvimento:**
   - Use os prompts em `prompts.md`
   - Siga o design em `design-guidelines-premium.md`

2. **Criar componentes base:**
   - Navbar, Footer, Buttons, Cards

3. **Implementar páginas:**
   - Home, Sobre Nós, Área do Cliente

4. **Integrar funcionalidades:**
   - Upload de documentos
   - Autenticação de clientes
   - Formulário de contato

---

**Documento criado em:** Janeiro 2026
**Versão:** 1.0
**Status:** ✅ Pronto para uso

**Suporte:** Em caso de dúvidas, consulte a documentação oficial ou abra uma issue no repositório.
