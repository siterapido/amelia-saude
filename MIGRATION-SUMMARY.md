# MIGRATION SUMMARY - SIX SAUDE

**Data:** 30/01/2026
**Autor:** Clawdbot

## 📁 Arquivos de Migração Criados

### 1. SQL Migration
**Arquivo:** `drizzle/001_initial_schema.sql`
- Migration SQL completa do schema do banco
- Tabelas: users, categories, authors, posts, post_tags
- Índices otimizados para performance
- Triggers para updated_at automático
- Seed inicial de dados
- **Tamanho:** 5.2KB

### 2. Migration Guide
**Arquivo:** `CLAWDBOT-MIGRATION.md`
- Guia completo de migração do projeto
- Passos detalhados para setup do ambiente
- Configuração de banco de dados (Neon/PostgreSQL)
- Instruções de deploy
- Troubleshooting
- Documentação de recursos (logos, componentes, etc.)
- **Tamanho:** 8.6KB

### 3. Migration Script
**Arquivo:** `migrate.sh` (executável)
- Script automatizado de migração
- Menu interativo ou linha de comando
- Funções para:
  - Instalação de dependências
  - Setup de ambiente
  - Conexão com banco
  - Execução de migrations
  - Seed de dados
  - Build e start do projeto
- **Tamanho:** 6.6KB
- **Permissões:** Executável (chmod +x)

## 🚀 Como Usar

### Opção 1: Script Automatizado (Recomendado)

```bash
# Menu interativo
./migrate.sh

# Ou linha de comando
./migrate.sh --full        # Migração completa
./migrate.sh --migrate     # Apenas migrations
./migrate.sh --dev         # Start dev server
./migrate.sh --help        # Ajuda
```

### Opção 2: Scripts npm

```bash
# Instalar dependências
pnpm install

# Setup ambiente
cp .env.example .env.local

# Gerar migrations (Drizzle)
pnpm db:generate

# Push schema (Drizzle)
pnpm db:push

# Seed dados
pnpm db:seed

# Dev server
pnpm dev
```

### Opção 3: SQL Manual

```bash
# Conectar ao PostgreSQL
psql $DATABASE_URL

# Executar migration
\i drizzle/001_initial_schema.sql
```

## 📊 Estrutura do Banco de Dados

### Tabelas

| Tabela | Descrição | Registros |
|--------|-----------|------------|
| `users` | Usuários administrativos | Seed: 1 admin |
| `categories` | Categorias de blog | Seed: 5 categorias |
| `authors` | Autores de posts | Seed: 1 autor |
| `posts` | Posts do blog | Seed: 0 (manual) |
| `post_tags` | Tags dos posts | Seed: 0 (manual) |

### Índices

- **users:** email, role
- **categories:** slug
- **authors:** email
- **posts:** slug, status, published_at, category_id, author_id, featured, (status, featured)
- **post_tags:** post_id, tag

### Triggers

- `update_users_updated_at` - Auto-update timestamp
- `update_posts_updated_at` - Auto-update timestamp

## 🔐 Credenciais Padrão

- **Email:** admin@sixsaude.com.br
- **Password:** admin123
- **Role:** admin

⚠️ **IMPORTANTE:** Alterar em produção!

## 📝 Pré-requisitos

- Node.js >= 18.17.0
- pnpm >= 8.0.0
- PostgreSQL database (ou Neon account)
- Variável de ambiente `DATABASE_URL` configurada

## 🎯 Checklist de Migração

- [ ] Clonar repositório
- [ ] Executar `./migrate.sh --install`
- [ ] Criar arquivo `.env.local`
- [ ] Configurar `DATABASE_URL`
- [ ] Executar `./migrate.sh --migrate`
- [ ] Executar `./migrate.sh --seed`
- [ ] Alterar credenciais admin
- [ ] Testar aplicação: `./migrate.sh --dev`
- [ ] Acessar: http://localhost:3000/admin
- [ ] Verificar logs de erro
- [ ] Deploy em produção

## 🔗 Links Úteis

- **Admin Panel:** http://localhost:3000/admin
- **Blog:** http://localhost:3000/blog
- **Sobre:** http://localhost:3000/sobre
- **LGPD:** http://localhost:3000/lgpd
- **Privacidade:** http://localhost:3000/privacidade

## 📚 Documentação Adicional

- `README.md` - Documentação geral do projeto
- `CLAUDE.md` - Instruções para Clawdbot
- `CLAWDBOT-MIGRATION.md` - Guia detalhado de migração
- `drizzle/001_initial_schema.sql` - Schema SQL completo

---

**Status:** ✅ Pronto para uso
**Testado:** ❌ Ainda não testado em ambiente real
**Recomendação:** Testar em ambiente de desenvolvimento primeiro
