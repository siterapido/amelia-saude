/**
 * Seed — 10 posts de exemplo (tabela `posts` + `post_tags`)
 * Requer: DATABASE_URL em .env.local e seed base (categorias + autor): pnpm db:seed
 *
 * Executar: pnpm db:seed:noticias
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { eq } from 'drizzle-orm'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(10, 0, 0, 0)
  return d
}

type NoticiaSeed = {
  title: string
  categoryName: string
  coverImage: string
  excerpt: string
  content: string
  tags: string[]
  readingTime: number
  featured: boolean
  publishedDaysAgo: number
}

const noticias: NoticiaSeed[] = [
  {
    title: 'ANS publica atualização do Rol de Procedimentos: o que muda para beneficiários',
    categoryName: 'Planos',
    coverImage:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Entenda como revisões periódicas do rol podem ampliar coberturas e o que observar no seu contrato e no guia do plano.',
    content: `
      <p>A Agência Nacional de Saúde Suplementar (ANS) revisa periodicamente o Rol de Procedimentos e Eventos em Saúde Suplementar. Essas atualizações definem procedimentos mínimos que os planos devem oferecer, com impacto direto na vida de milhões de beneficiários.</p>

      <h2>O que é o rol e por que importa</h2>
      <p>O rol é a lista de coberturas obrigatórias para planos de saúde regulados pela ANS. Quando novos procedimentos entram na lista, as operadoras precisam adequar a rede e os fluxos de autorização para garantir o acesso.</p>

      <h2>Como acompanhar as mudanças</h2>
      <ul>
        <li>Consulte o <strong>guia do beneficiário</strong> disponibilizado pela sua operadora.</li>
        <li>Verifique prazos de <strong>carência</strong> específicos para novos itens, quando aplicável.</li>
        <li>Em dúvida, utilize os canais oficiais da operadora ou o SAC da ANS.</li>
      </ul>

      <h2>Dica prática</h2>
      <p>Guarde comprovantes de solicitações de autorização e mantenha um histórico de exames. Isso agiliza recursos e evita retrabalho em tratamentos de continuidade.</p>

      <p>Na Amélia Saúde, acompanhamos as normas para orientar beneficiários e empresas parceiras com transparência e agilidade.</p>
    `,
    tags: ['ANS', 'Rol de procedimentos', 'Cobertura', 'Regulamentação'],
    readingTime: 8,
    featured: true,
    publishedDaysAgo: 2,
  },
  {
    title: 'Amélia Saúde amplia rede credenciada na região Sudeste',
    categoryName: 'Institucional',
    coverImage:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Novos hospitais e clínicas passam a integrar a rede, com foco em especialidades de alta demanda e atendimento de urgência.',
    content: `
      <p>A Amélia Saúde reforça o compromisso com o acesso à saúde de qualidade. Na última expansão, incorporamos novos prestadores na região Sudeste, priorizando centros com boa avaliação assistencial e proximidade dos beneficiários.</p>

      <h2>O que foi ampliado</h2>
      <p>A ampliação inclui unidades com atendimento em <strong>cardiologia</strong>, <strong>ortopedia</strong>, <strong>diagnóstico por imagem</strong> e <strong>pronto-socorro</strong>, além de laboratórios parceiros para exames de rotina e alta complexidade.</p>

      <h2>Como consultar a rede</h2>
      <p>Beneficiários podem localizar prestadores atualizados pelo aplicativo, site oficial ou central de atendimento. Recomendamos sempre confirmar <strong>nome da unidade</strong> e <strong>CNPJ</strong> antes de agendar, pois a rede pode sofrer ajustes pontuais.</p>

      <h2>Próximos passos</h2>
      <p>Seguimos em processo contínuo de qualificação da rede, ouvindo empresas e colaboradores para reduzir deslocamento e tempo de espera.</p>
    `,
    tags: ['Rede credenciada', 'Sudeste', 'Institucional', 'Acesso'],
    readingTime: 6,
    featured: false,
    publishedDaysAgo: 7,
  },
  {
    title: 'Outubro Rosa: prevenção e exames que salvam vidas',
    categoryName: 'Saúde',
    coverImage:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Campanha reforça importância do rastreamento do câncer de mama e da conversa franca com o médico sobre histórico familiar.',
    content: `
      <p>O Outubro Rosa é um movimento mundial de conscientização sobre o câncer de mama. Além da informação, o mês é um lembrete para colocar na agenda o autocuidado e o diálogo com profissionais de saúde.</p>

      <h2>Prevenção em primeiro lugar</h2>
      <p>O rastreamento adequado depende da idade, do histórico familiar e de fatores de risco. Por isso, não existe uma única receita: o médico é quem indica a frequência de consultas e exames.</p>

      <h2>Sinais que merecem atenção</h2>
      <ul>
        <li>Nódulos ou alterações na forma do seio</li>
        <li>Secreção anormal pelo mamilo</li>
        <li>Mudanças na pele ou no bico do seio</li>
        <li>Inchaço persistente na região das axilas</li>
      </ul>

      <h2>Apoio emocional</h2>
      <p>Buscar apoio de familiares, grupos de acolhimento e equipes multiprofissionais faz parte do cuidado integral. Falar sobre saúde mental também é cuidar do corpo.</p>

      <p>Se você tem plano pela Amélia Saúde, utilize os canais de orientação para entender coberturas e encaminhamentos conforme o seu contrato.</p>
    `,
    tags: ['Outubro Rosa', 'Prevenção', 'Saúde da mulher', 'Rastreamento'],
    readingTime: 7,
    featured: false,
    publishedDaysAgo: 14,
  },
  {
    title: 'Portabilidade de planos: 7 perguntas antes de trocar de operadora',
    categoryName: 'Planos',
    coverImage:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Saiba o que avaliar para manter direitos adquiridos, entender carências e evitar surpresas na troca de plano.',
    content: `
      <p>A portabilidade é o direito de migrar entre planos de saúde, em situações previstas em lei, preservando algumas condições já cumpridas. É uma ferramenta poderosa, mas exige atenção aos detalhes.</p>

      <h2>1. Tenho direito à portabilidade?</h2>
      <p>Depende do tempo de permanência, do tipo de plano e das regras vigentes. A documentação oficial da ANS detalha os requisitos; a operadora também deve orientar.</p>

      <h2>2. O que pode ser preservado?</h2>
      <p>Em cenários elegíveis, é possível reduzir ou eliminar certas carências já cumpridas. O escopo exato varia conforme o caso — não há garantia automática para todos os procedimentos.</p>

      <h2>3. Rede e reembolso</h2>
      <p>Antes de trocar, compare <strong>rede credenciada</strong>, <strong>regras de reembolso</strong> e <strong>coparticipação</strong>. Um plano mais barato pode não atender onde você mais precisa.</p>

      <h2>4. Atenção ao período de troca</h2>
      <p>Planeje a transição para não ficar sem cobertura. Guarde comprovantes de pagamento e documentos do plano anterior.</p>

      <h2>5. Posso negociar pelo RH?</h2>
      <p>Em planos corporativos, o RH e a corretora podem ajudar a alinhar prazos e documentação. A participação ativa evita erros de cadastro.</p>

      <h2>6. E os dependentes?</h2>
      <p>Verifique inclusão de dependentes, idade limite e documentação. Mudanças de plano são decisões familiares também.</p>

      <h2>7. Onde tirar dúvidas?</h2>
      <p>Central da operadora, ouvidoria e canais da ANS são fontes seguras. Desconfie de promessas genéricas sem análise do seu contrato.</p>

      <p>A equipe Amélia Saúde pode apoiar empresas e beneficiários na leitura comparativa de propostas, sempre com foco em clareza.</p>
    `,
    tags: ['Portabilidade', 'ANS', 'Troca de plano', 'Carência'],
    readingTime: 10,
    featured: false,
    publishedDaysAgo: 21,
  },
  {
    title: 'Telemedicina 24h: quando usar e como funciona o atendimento',
    categoryName: 'Saúde',
    coverImage:
      'https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Orientações sobre triagem à distância, privacidade de dados e encaminhamento presencial quando necessário.',
    content: `
      <p>A telemedicina consolidou-se como canal de acesso rápido à saúde, especialmente para orientação, renovação de receitas com critérios clínicos e acompanhamento de quadros estáveis.</p>

      <h2>Boas práticas na consulta online</h2>
      <ul>
        <li>Escolha um local privado e com internet estável.</li>
        <li>Tenha em mãos lista de medicamentos, alergias e exames recentes.</li>
        <li>Descreva sintomas com clareza: início, intensidade e evolução.</li>
      </ul>

      <h2>Limitações importantes</h2>
      <p>Emergências graves exigem <strong>pronto-socorro</strong> ou <strong>SAMU</strong>. Telemedicina não substitui avaliação presencial quando o médico julgar necessário.</p>

      <h2>Privacidade</h2>
      <p>Utilize apenas aplicativos e links oficiais da operadora. Não compartilhe senhas e confira políticas de dados conforme a LGPD.</p>

      <p>Beneficiários Amélia Saúde encontram no app os fluxos habilitados e a documentação sobre teleatendimento conforme contrato.</p>
    `,
    tags: ['Telemedicina', 'Tecnologia', 'Acesso', 'Privacidade'],
    readingTime: 6,
    featured: false,
    publishedDaysAgo: 28,
  },
  {
    title: 'Bem-estar corporativo: empresas investem em saúde mental e qualidade de vida',
    categoryName: 'Bem-estar',
    coverImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Programas integrados combinam preventivo, apoio psicológico e hábitos saudáveis para reduzir absenteísmo e aumentar engajamento.',
    content: `
      <p>Organizações que tratam saúde mental como prioridade estratégica relatam melhora em retenção de talentos, clima organizacional e produtividade sustentável.</p>

      <h2>Pilares comuns em bons programas</h2>
      <ol>
        <li><strong>Escuta ativa:</strong> canais confidenciais e liderança treinada.</li>
        <li><strong>Prevenção:</strong> vacinação, check-ups e campanhas sazonais.</li>
        <li><strong>Movimento:</strong> incentivo a pausas, ergonomia e atividade física.</li>
        <li><strong>Apoio especializado:</strong> psicologia e psiquiatria quando indicado.</li>
      </ol>

      <h2>Indicadores que importam</h2>
      <p>Além do custo assistencial, empresas passam a acompanhar absenteísmo, turnover saudável e resultados de pesquisas de clima — sempre com respeito à privacidade individual.</p>

      <h2>Papel do plano de saúde</h2>
      <p>Planos com rede ampla, telemedicina e programas de gestão de saúde ajudam a transformar benefício em cuidado contínuo, não apenas reativo.</p>

      <p>A Amélia Saúde apoia empresas na montagem de pacotes alinhados ao perfil dos colaboradores e às metas do RH.</p>
    `,
    tags: ['Corporativo', 'Saúde mental', 'Bem-estar', 'RH'],
    readingTime: 9,
    featured: false,
    publishedDaysAgo: 35,
  },
  {
    title: 'Sono de qualidade: rotina noturna que melhora disposição e imunidade',
    categoryName: 'Dicas',
    coverImage:
      'https://images.unsplash.com/photo-1541781774459-bb2eb2f8b73b?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Horários regulares, luz ambiente e limites para telas: ajustes simples com impacto na saúde física e mental.',
    content: `
      <p>O sono não é tempo “perdido”: é quando o corpo consolida memórias, regula hormônios e fortalece defesas. Adultos que dormem mal têm mais risco de ganho de peso, pressão alta e irritabilidade.</p>

      <h2>Monte um ritual de desaceleração</h2>
      <p>Defina um horário para começar a “apagar as luzes” da casa. Atividades leves — leitura, alongamento, música calma — sinalizam ao cérebro que o dia terminou.</p>

      <h2>Telas e cafeína</h2>
      <ul>
        <li>Evite telas intensas na hora de dormir; a luz azul atrasa o sono.</li>
        <li>Reduza cafeína após o meio da tarde, se tiver insônia.</li>
        <li>Refeições muito pesadas à noite podem prejudicar o descanso.</li>
      </ul>

      <h2>Quando procurar ajuda</h2>
      <p>Ronco intenso, paradas respiratórias ou sonolência diurna excessiva merecem avaliação médica. O plano pode cobrir encaminhamentos conforme contrato.</p>
    `,
    tags: ['Sono', 'Hábitos', 'Bem-estar', 'Prevenção'],
    readingTime: 6,
    featured: false,
    publishedDaysAgo: 40,
  },
  {
    title: 'Hipertensão: por que medir a pressão em casa faz diferença',
    categoryName: 'Saúde',
    coverImage:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Registro domiciliar ajuda o médico a ajustar tratamento e detectar “pressão do avental branco” ou picos esporádicos.',
    content: `
      <p>A hipertensão arterial costuma ser silenciosa. Medir em casa, com técnica correta, complementa a aferição no consultório e melhora o controle a longo prazo.</p>

      <h2>Como medir</h2>
      <ol>
        <li>Descanse cinco minutos antes, sentado, braço apoiado na altura do coração.</li>
        <li>Evite café e exercício intenso logo antes.</li>
        <li>Use manguito adequado ao tamanho do braço.</li>
        <li>Anote data, horário e valores em um caderno ou app.</li>
      </ol>

      <h2>Metas e acompanhamento</h2>
      <p>As metas pressóricas são individualizadas. Não altere medicação por conta própria: combine ajustes com o médico assistente.</p>

      <p>Beneficiários Amélia Saúde podem usar a rede para consultas e exames de rotina indicados pelo profissional.</p>
    `,
    tags: ['Hipertensão', 'Cardiologia', 'Autocuidado', 'Exames'],
    readingTime: 7,
    featured: false,
    publishedDaysAgo: 45,
  },
  {
    title: 'Coparticipação no plano de saúde: entenda o que paga a cada consulta',
    categoryName: 'Planos',
    coverImage:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Modelo divide custos entre operadora e beneficiário; saiba comparar percentuais, teto mensal e procedimentos incluídos.',
    content: `
      <p>A coparticipação é uma forma de compartilhar o custo de utilização do plano. Em vez de apenas a mensalidade fixa, há valores por consulta, exame ou terapia, conforme regras do contrato.</p>

      <h2>Vantagens e cuidados</h2>
      <p>Pode reduzir a mensalidade base, mas exige planejamento: somar coparticipação + mensalidade para ver o custo real do mês.</p>

      <h2>O que conferir no contrato</h2>
      <ul>
        <li>Percentuais ou valores fixos por tipo de procedimento</li>
        <li>Existência de <strong>teto mensal</strong> de coparticipação</li>
        <li>Procedimentos isentos ou com regras especiais</li>
      </ul>

      <h2>Transparência</h2>
      <p>Peça simulações ao corretor ou RH antes de aderir. A Amélia Saúde prioriza clareza nas propostas para evitar surpresas na hora de usar o plano.</p>
    `,
    tags: ['Coparticipação', 'Economia', 'Contrato', 'Planos'],
    readingTime: 6,
    featured: false,
    publishedDaysAgo: 50,
  },
  {
    title: 'LGPD e dados de saúde: o que muda no tratamento das suas informações',
    categoryName: 'Institucional',
    coverImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Dados sensíveis exigem base legal e segurança reforçada; conheça direitos de acesso, correção e portabilidade.',
    content: `
      <p>Informações sobre saúde são consideradas dados sensíveis pela Lei Geral de Proteção de Dados (LGPD). Operadoras, prestadores e parceiros devem tratá-las com critérios rigorosos de segurança e finalidade.</p>

      <h2>Direitos do titular</h2>
      <ul>
        <li>Confirmação de tratamento e acesso aos dados</li>
        <li>Correção de dados incompletos ou desatualizados</li>
        <li>Informação sobre compartilhamentos relevantes</li>
        <li>Revogação de consentimento, quando aplicável</li>
      </ul>

      <h2>Segurança</h2>
      <p>Criptografia, controles de acesso e treinamento de equipes reduzem risco de vazamentos. Desconfie de pedidos de dados por canais não oficiais.</p>

      <h2>Compromisso Amélia Saúde</h2>
      <p>Manter políticas claras de privacidade e canais para dúvidas faz parte do relacionamento de confiança com beneficiários e empresas contratantes.</p>
    `,
    tags: ['LGPD', 'Privacidade', 'Dados sensíveis', 'Compliance'],
    readingTime: 8,
    featured: false,
    publishedDaysAgo: 55,
  },
]

async function seedNoticias() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não está definida. Configure .env.local')
  }

  const sql = neon(process.env.DATABASE_URL)
  const db = drizzle(sql, { schema })

  console.log('📰 Inserindo até 10 posts de exemplo...')

  const author = await db.query.authors.findFirst({
    where: eq(schema.authors.email, 'blog@ameliasaude.com.br'),
  })

  if (!author) {
    console.error('❌ Autor padrão não encontrado. Execute antes: pnpm db:seed')
    process.exit(1)
  }

  const categoriesList = await db.select().from(schema.categories)
  const categoryMap = new Map(categoriesList.map((c) => [c.name, c.id]))
  const fallbackCategoryId = categoriesList[0]?.id

  let inserted = 0
  let skipped = 0

  for (const noticia of noticias) {
    const categoryId = categoryMap.get(noticia.categoryName) ?? fallbackCategoryId
    if (!categoryId) {
      console.error('❌ Nenhuma categoria no banco. Execute: pnpm db:seed')
      process.exit(1)
    }

    const slug = slugify(noticia.title)

    const existing = await db.query.posts.findFirst({
      where: eq(schema.posts.slug, slug),
      columns: { id: true },
    })

    if (existing) {
      console.log(`⏭️  Já existe: ${slug}`)
      skipped++
      continue
    }

    const [row] = await db
      .insert(schema.posts)
      .values({
        title: noticia.title,
        slug,
        excerpt: noticia.excerpt.trim(),
        content: noticia.content.trim(),
        coverImage: noticia.coverImage,
        categoryId,
        authorId: author.id,
        status: 'published',
        publishedAt: daysAgo(noticia.publishedDaysAgo),
        readingTime: noticia.readingTime,
        featured: noticia.featured,
        aiGenerated: false,
      })
      .returning({ id: schema.posts.id })

    if (!row) continue

    if (noticia.tags.length > 0) {
      await db.insert(schema.postTags).values(
        noticia.tags.map((tag) => ({
          postId: row.id,
          tag: tag.slice(0, 100),
        })),
      )
    }

    console.log(`✅ ${noticia.title}`)
    inserted++
  }

  console.log('')
  console.log(`🎉 Concluído: ${inserted} notícia(s) inserida(s), ${skipped} ignorada(s) (slug já existente).`)
}

seedNoticias().catch((e) => {
  console.error(e)
  process.exit(1)
})
