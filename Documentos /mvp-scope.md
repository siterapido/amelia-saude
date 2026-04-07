# MVP Scope - Site SIX Saúde
## Minimum Viable Product: Definição & Métricas de Sucesso

---

## 1. OBJETIVO DO MVP

### Visão do MVP
Lançar um **site institucional funcional e de alta performance** que:
1. Permita que clientes atuais acessem serviços básicos (2ª via de boleto, demonstrativo de IR)
2. Converta visitantes em leads qualificados via WhatsApp
3. Transmita credibilidade e profissionalismo para empresas e novos clientes
4. Carregue em menos de 1 segundo e tenha score 90+ no Google PageSpeed

### O que o MVP NÃO é
- ❌ Um portal completo com área de cliente autenticada
- ❌ Um sistema de cotação automatizada
- ❌ Um blog/portal de conteúdo com IA
- ❌ Um chatbot integrado

**Filosofia:** Lançar rápido com o essencial funcionando perfeitamente, depois iterar com base em dados reais.

---

## 2. ESCOPO DO MVP

### ✅ O que ENTRA no MVP (Essencial)

#### 2.1 Páginas
- **Home Page** (completa com todas as seções do PRD):
  - Hero com CTAs principais
  - Seção "Sou Cliente" (autoatendimento)
  - Seção "Planos" (apresentação + CTA)
  - Seção "Aplicativo"
  - Ativações de CTA recorrentes
  - FAQ (accordion)
  - Footer completo
- **Página "Sobre Nós"**
- **Página "Sou Cliente"** (dedicada)

#### 2.2 Funcionalidades Obrigatórias
- ✅ Links funcionais para 2ª via de boleto (redirecionamento)
- ✅ Links funcionais para demonstrativo de IR (redirecionamento)
- ✅ Integração WhatsApp (mensagens pré-configuradas)
  - Vendas: "Olá, tenho interesse em saber mais sobre os planos da SIX Saúde"
  - Suporte: "Olá, preciso falar com um especialista"
- ✅ Links para download do aplicativo (App Store + Google Play)
- ✅ Menu de navegação responsivo (mobile + desktop)
- ✅ FAQ interativo (accordion expand/collapse)

#### 2.3 Requisitos Técnicos
- ✅ Design 100% responsivo (mobile, tablet, desktop)
- ✅ Performance: PageSpeed Score ≥ 90/100 (mobile e desktop)
- ✅ Tempo de carregamento: < 1 segundo (First Contentful Paint)
- ✅ SEO on-page:
  - Meta tags (title, description)
  - Schema markup básico (Organization, WebSite)
  - Sitemap.xml
  - Robots.txt
  - URLs amigáveis
  - Alt text em todas as imagens
- ✅ Certificado SSL (HTTPS)
- ✅ Google Analytics 4 configurado
- ✅ Acessibilidade básica (WCAG AA):
  - Contraste de cores adequado
  - Navegação por teclado
  - ARIA labels onde necessário

#### 2.4 Design
- ✅ Design system básico (botões, cards, tipografia, cores)
- ✅ Mockups aprovados no Figma
- ✅ Assets exportados (logos, ícones, imagens otimizadas)

---

### ⏳ O que FICA DE FORA do MVP (Fase 2+)

#### Funcionalidades Futuras
- ⏳ **Blog/Portal de Conteúdo:** IA gerando artigos para SEO
- ⏳ **Área do Cliente Autenticada:** Login com CPF/senha, histórico completo
- ⏳ **Sistema de Cotação Online:** Formulário interativo de cotação
- ⏳ **Chatbot:** Atendimento automatizado
- ⏳ **Múltiplos Idiomas:** Site em inglês/espanhol
- ⏳ **Integração com CRM:** Leads indo diretamente para sistema de vendas
- ⏳ **Analytics Avançado:** Heatmaps, gravação de sessões

#### Por que Deixar de Fora?
- **Tempo:** Acelerar o lançamento
- **Validação:** Testar o essencial antes de investir em features complexas
- **Dados:** Coletar métricas reais para priorizar próximas funcionalidades

---

## 3. CRONOGRAMA & FASES

### Timeline do MVP

| Fase | Duração | Entregáveis | Responsável |
|------|---------|-------------|-------------|
| **1. Planejamento** | ✅ Concluído | Briefing, PRD, Design Guidelines, MVP Scope | Equipe de Planejamento |
| **2. Design** | 5-7 dias | Wireframes, Mockups em Alta, Protótipo, Design System | Designer |
| **3. Aprovação de Design** | 2-3 dias | Revisões e aprovação final | Cliente + Equipe |
| **4. Desenvolvimento Frontend** | 10-14 dias | Codificação de todas as páginas, integração WhatsApp | Dev Frontend |
| **5. Conteúdo** | Paralelo ao Dev | Textos finais, imagens, FAQ | Cliente + Copywriter |
| **6. Testes & QA** | 3-4 dias | Testes de responsividade, performance, acessibilidade | Dev + QA |
| **7. Deploy & Lançamento** | 1 dia | Configuração de domínio, SSL, Analytics | Dev + DevOps |
| **8. Monitoramento Inicial** | 1-2 semanas | Acompanhamento de métricas, ajustes rápidos | Equipe Completa |

### Prazo Total do MVP
**25-35 dias úteis** (5-7 semanas)

### Milestones Críticos
- ✅ **Semana 1:** Planejamento concluído (este documento)
- 🎯 **Semana 2:** Design aprovado
- 🎯 **Semana 4:** Frontend 80% completo
- 🎯 **Semana 5:** Testes finalizados
- 🎯 **Semana 6:** Site no ar

---

## 4. MÉTRICAS DE SUCESSO

### 4.1 Métricas de Performance (Técnicas)

#### Google PageSpeed Insights
- **Meta:** ≥ 90/100 (mobile e desktop)
- **Medição:** Testar em https://pagespeed.web.dev/
- **Frequência:** Diária durante desenvolvimento, semanal após lançamento

#### Core Web Vitals
| Métrica | Meta | Medição |
|---------|------|---------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Google Search Console |
| **FID** (First Input Delay) | < 100ms | Google Search Console |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Google Search Console |

#### Tempo de Carregamento
- **First Contentful Paint (FCP):** < 1 segundo
- **Time to Interactive (TTI):** < 2 segundos
- **Ferramenta:** Lighthouse, WebPageTest

---

### 4.2 Métricas de Negócio (KPIs)

#### Conversão de Leads
| Métrica | Baseline | Meta 30 Dias | Meta 90 Dias |
|---------|----------|--------------|--------------|
| **Leads via WhatsApp** | 0 (site novo) | +50/mês | +120/mês (+140% vs. canais atuais) |
| **Taxa de Conversão** (visitante → lead) | - | 3-5% | 7-10% |

#### Autoatendimento
| Métrica | Baseline | Meta 30 Dias | Meta 90 Dias |
|---------|----------|--------------|--------------|
| **Cliques em 2ª Via de Boleto** | - | 200/mês | 500/mês |
| **Cliques em Demonstrativo IR** | - | 100/mês | 300/mês |
| **Redução de Chamados de Suporte** | Baseline atual | -20% | -40% |

#### Tráfego
| Métrica | Meta 30 Dias | Meta 90 Dias | Meta 6 Meses |
|---------|--------------|--------------|--------------|
| **Visitantes Únicos** | 500/mês | 1.500/mês | 5.000/mês |
| **Pageviews** | 1.500/mês | 4.500/mês | 15.000/mês |
| **Bounce Rate** | < 60% | < 50% | < 40% |
| **Tempo Médio na Página** | > 1 min | > 1.5 min | > 2 min |

#### SEO (Orgânico)
| Métrica | Meta 90 Dias | Meta 6 Meses |
|---------|--------------|--------------|
| **Posição no Google** (palavra-chave principal) | Top 20 | Top 10 |
| **Tráfego Orgânico** | 10% do total | 30% do total |
| **Palavras-chave Indexadas** | 20+ | 50+ |

**Palavras-chave alvo:**
- "administradora de benefícios [cidade]"
- "plano de saúde [cidade]"
- "contratar plano de saúde"
- "2ª via de boleto SIX Saúde"

---

### 4.3 Métricas de Experiência do Usuário

#### Google Analytics 4
- **Taxa de Rejeição (Bounce Rate):** < 50%
- **Páginas por Sessão:** > 2
- **Duração Média da Sessão:** > 1min 30s

#### Engajamento
- **Cliques em CTAs principais:** Mínimo 100/mês cada
  - "Sou Cliente"
  - "Quero Contratar"
  - "Fale com um Especialista"
- **Abertura do FAQ:** Pelo menos 50% dos visitantes que rolam até lá
- **Download do App:** Mínimo 30 cliques/mês

#### Dispositivos
- **Mobile:** 70-80% do tráfego
- **Desktop:** 20-30% do tráfego
- **Desempenho Mobile:** Sem diferença significativa vs. desktop

---

### 4.4 Métricas de Qualidade

#### Acessibilidade
- **WAVE Report:** 0 erros críticos
- **Lighthouse Accessibility Score:** ≥ 95/100

#### SEO On-Page
- **Lighthouse SEO Score:** 100/100
- **Sitemap:** Submetido no Google Search Console
- **Indexação:** Todas as páginas indexadas em 7 dias

---

## 5. CRITÉRIOS DE ACEITE DO MVP

### O MVP está pronto quando:

#### Funcionalidade
- [ ] Todas as 3 páginas principais estão funcionais
- [ ] Todos os links de WhatsApp funcionam corretamente
- [ ] Links para 2ª via de boleto e demonstrativo de IR redirecionam
- [ ] Links de download do app funcionam
- [ ] FAQ expande/colapsa corretamente
- [ ] Menu mobile funciona perfeitamente

#### Performance
- [ ] PageSpeed Score ≥ 90/100 em mobile
- [ ] PageSpeed Score ≥ 90/100 em desktop
- [ ] Site carrega em < 1 segundo (FCP)
- [ ] Sem erros no console do navegador

#### Responsividade
- [ ] Testado em iPhone (Safari)
- [ ] Testado em Android (Chrome)
- [ ] Testado em iPad
- [ ] Testado em Desktop (1920x1080)
- [ ] Nenhum elemento quebrado em nenhum dispositivo

#### SEO
- [ ] Meta tags em todas as páginas
- [ ] Sitemap.xml gerado e submetido
- [ ] Robots.txt configurado
- [ ] Google Analytics 4 funcionando
- [ ] Schema markup implementado

#### Acessibilidade
- [ ] Contraste de cores validado (WCAG AA)
- [ ] Navegação por teclado funcional
- [ ] WAVE report sem erros críticos
- [ ] Alt text em todas as imagens

#### Aprovação do Cliente
- [ ] Cliente revisou e aprovou todas as páginas
- [ ] Cliente testou no próprio dispositivo
- [ ] Cliente aprovou textos e imagens
- [ ] Cliente validou links e funcionalidades

---

## 6. PLANO DE TESTES

### Checklist de Testes Pré-Lançamento

#### Testes Funcionais
- [ ] Todos os links funcionam (nenhum 404)
- [ ] WhatsApp abre com mensagem correta
- [ ] Menu mobile abre/fecha
- [ ] FAQ expande/colapsa
- [ ] Botões têm hover/active states

#### Testes de Performance
- [ ] Lighthouse audit em mobile
- [ ] Lighthouse audit em desktop
- [ ] WebPageTest em conexão 3G
- [ ] Verificar tamanho de imagens (< 200KB cada)

#### Testes Cross-Browser
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + mobile)
- [ ] Firefox
- [ ] Edge

#### Testes de Conteúdo
- [ ] Ortografia e gramática verificadas
- [ ] Links de WhatsApp com mensagens corretas
- [ ] Textos alinhados com tom de voz da marca
- [ ] Imagens de alta qualidade e otimizadas

#### Testes de SEO
- [ ] Google Search Console configurado
- [ ] Sitemap submetido
- [ ] Meta tags verificadas (SEO Mofo)
- [ ] Schema markup validado (Google Rich Results Test)

---

## 7. PLANO PÓS-LANÇAMENTO

### Primeiras 48 Horas
- **Monitoramento intensivo:**
  - Verificar Analytics a cada 4-6 horas
  - Checar erros no Search Console
  - Validar que WhatsApp está recebendo mensagens
- **Correções rápidas:** Resolver qualquer bug crítico imediatamente

### Primeira Semana
- **Análise de dados:**
  - Quais páginas têm mais visualizações?
  - Qual CTA gera mais cliques?
  - De onde vem o tráfego (direto, orgânico, social)?
  - Taxa de rejeição está dentro da meta?
- **Ajustes:** Pequenas melhorias com base em dados

### Primeiro Mês
- **Relatório de Métricas:**
  - Comparar resultados vs. metas
  - Identificar oportunidades de melhoria
- **Coleta de Feedback:**
  - Perguntar a clientes: "O que achou do novo site?"
  - Avaliar se autoatendimento reduziu chamados
- **Planejamento Fase 2:**
  - Decidir próximas funcionalidades com base em dados reais

### Primeiros 3 Meses
- **Otimização SEO:**
  - Analisar palavras-chave que estão performando
  - Criar conteúdo adicional se necessário
- **A/B Testing:**
  - Testar variações de headlines
  - Testar cores/posições de CTAs
- **Decisão sobre Fase 2:**
  - Blog com IA?
  - Área de cliente autenticada?
  - Sistema de cotação?

---

## 8. INVESTIMENTO & ROI

### Investimento Estimado (MVP)

| Item | Estimativa |
|------|------------|
| **Design** (Figma, mockups, design system) | 40-60 horas |
| **Desenvolvimento Frontend** | 80-120 horas |
| **Conteúdo & Copywriting** | 20-30 horas |
| **Testes & QA** | 20-30 horas |
| **Deploy & Configuração** | 8-12 horas |
| **Total** | **168-252 horas** |

### ROI Esperado

#### Redução de Custos
- **Atendimento:** -30% de chamados = economia de 15-20 horas/mês de atendimento
- **Valor:** Se 1 hora de atendimento custa R$ 50, economia de R$ 750-1.000/mês

#### Aumento de Receita
- **Leads:** +140% = se cada lead vale R$ 500 em LTV, incremento significativo
- **Exemplo:** 50 leads/mês a R$ 500 = R$ 25.000/mês em potencial de receita

#### Payback
- **Tempo estimado:** 6-8 meses (considerando custos + ganhos)

---

## 9. RISCOS & MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Atraso no conteúdo** | Média | Médio | Definir textos desde o início, ter backup de copywriter |
| **Performance abaixo da meta** | Baixa | Alto | Usar Next.js, otimizar imagens, testar constantemente |
| **Cliente não aprovar design** | Média | Médio | Mostrar referências antes, fazer revisões incrementais |
| **Bugs pós-lançamento** | Média | Médio | QA rigoroso, checklist detalhado, monitoramento |
| **Tráfego baixo inicial** | Alta | Baixo | Esperar 30-60 dias para SEO orgânico, considerar anúncios |
| **WhatsApp não converter** | Baixa | Alto | Mensagens pré-configuradas claras, teste de fluxo |

---

## 10. DEFINIÇÃO DE SUCESSO

### O MVP é considerado um sucesso se:

#### Curto Prazo (30 dias)
- ✅ Site está no ar, estável e rápido (PageSpeed ≥ 90)
- ✅ Clientes conseguem acessar 2ª via de boleto sem problemas
- ✅ Pelo menos 30 leads vieram via WhatsApp do site
- ✅ Taxa de rejeição < 60%

#### Médio Prazo (90 dias)
- ✅ Autoatendimento reduziu chamados em pelo menos 20%
- ✅ Leads aumentaram 100% vs. canais anteriores
- ✅ Site aparece no Top 20 do Google para palavra-chave principal
- ✅ Taxa de rejeição < 50%

#### Longo Prazo (6 meses)
- ✅ Site é a principal fonte de leads da empresa
- ✅ Tráfego orgânico representa 30%+ do total
- ✅ Cliente está pronto para investir na Fase 2 (blog, área autenticada)
- ✅ ROI positivo comprovado com dados

---

**Documento criado em:** Janeiro 2026
**Versão:** 1.0
**Status:** ✅ Aprovado para desenvolvimento
