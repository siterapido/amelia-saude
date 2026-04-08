'use client'

import React from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { MapPin, MapPinned, Building2, Stethoscope, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/animations'
import ameliaLogo from '@/Logo/logo-amelia-site.png'

// ─── Data ─────────────────────────────────────────────────────────────────────

type OrbitNodeData = {
  name: string
  icon: React.ElementType
}

const STATS = [
  { icon: MapPin,      value: '8+',  label: 'Municípios atendidos' },
  { icon: Building2,   value: '50+', label: 'Hospitais e clínicas' },
  { icon: Stethoscope, value: '30+', label: 'Especialidades médicas' },
]

// Orbit 1 — 2 cidades principais
const INNER_NODES: OrbitNodeData[] = [
  { name: 'Rio de Janeiro', icon: MapPinned },
  { name: 'Niterói', icon: MapPinned },
]

// Orbit 2 — 2 cidades estratégicas
const MIDDLE_NODES: OrbitNodeData[] = [
  { name: 'D. de Caxias', icon: MapPinned },
  { name: 'São Gonçalo', icon: MapPinned },
]

// Orbit 3 — 3 cidades da região
const OUTER_NODES: OrbitNodeData[] = [
  { name: 'Nova Iguaçu', icon: MapPinned },
  { name: 'Petrópolis', icon: MapPinned },
  { name: 'Nilópolis', icon: MapPinned },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNodePosition(index: number, total: number): { x: number; y: number } {
  const angle = (360 / total) * index - 90
  const rad = (angle * Math.PI) / 180
  return { x: Math.cos(rad) * 50, y: Math.sin(rad) * 50 }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface OrbitNodeProps {
  name: string
  icon: React.ElementType
}

const OrbitNode = ({ name, icon: Icon }: OrbitNodeProps) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      className="relative w-14 h-14 rounded-full flex items-center justify-center border border-gold-primary/18 shadow-[0_10px_30px_rgba(10,10,10,0.08)]"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(123,107,178,0.22) 100%)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-full ring-1 ring-gold-primary/10"
      />
      <Icon className="w-6 h-6 text-gold-primary" />
    </div>
    <span className="text-[10px] font-medium text-[#1A1A2E] whitespace-nowrap leading-tight text-center max-w-[80px]">
      {name}
    </span>
  </div>
)

interface OrbitRingProps {
  nodes: OrbitNodeData[]
  size: number
  duration: number
  direction: 1 | -1
}

const OrbitRing = ({ nodes, size, duration, direction }: OrbitRingProps) => {
  const rotate = useMotionValue(0)
  const counterRotate = useTransform(rotate, (v) => -v)

  React.useEffect(() => {
    const controls = animate(rotate, 360 * direction, {
      duration,
      repeat: Infinity,
      ease: 'linear',
    })
    return () => controls.stop()
  }, [direction, duration, rotate])

  return (
    <motion.div
      className="absolute rounded-full border border-dashed border-gold-primary/20"
      style={{
        width: size,
        height: size,
        top: '50%',
        left: '50%',
        marginTop: -size / 2,
        marginLeft: -size / 2,
        rotate,
      }}
    >
      {nodes.map((node, i) => {
        const pos = getNodePosition(i, nodes.length)
        return (
          <motion.div
            key={node.name}
            className="absolute"
            style={{
              top: `calc(50% + ${pos.y}%)`,
              left: `calc(50% + ${pos.x}%)`,
              transform: 'translate(-50%, -50%)',
              rotate: counterRotate,
            }}
          >
            <OrbitNode name={node.name} icon={node.icon} />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export const NetworkSection = () => {
  return (
    <section
      id="rede-credenciada"
      className="relative py-24 md:py-32 lg:py-40 bg-white overflow-hidden"
    >
      {/* Decorative background rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 lg:pr-16">
        {[520, 680, 840].map((d) => (
          <div
            key={d}
            className="absolute rounded-full border border-gold-primary/[0.04]"
            style={{ width: d, height: d, right: -d * 0.25 }}
          />
        ))}
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-12 items-center">

          {/* ── Left column ──────────────────────────────── */}
          <div className="flex flex-col gap-8 min-w-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-primary/20 bg-gold-primary/6 text-gold-primary text-xs font-semibold tracking-wide uppercase">
                Rede Credenciada
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A2E] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Os melhores hospitais e clínicas do{' '}
              <span className="text-gold-primary">Rio de Janeiro</span>{' '}
              ao seu alcance
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-500 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Nossa rede credenciada cobre toda a região metropolitana com hospitais, clínicas, laboratórios e especialistas prontos para te atender quando mais precisar.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col gap-2 p-4 rounded-2xl border border-gold-primary/12 bg-[#F8F6FB] hover:border-gold-primary/25 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gold-primary/8 border border-gold-primary/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gold-primary" />
                  </div>
                  <p className="font-display text-2xl font-bold text-gold-primary leading-none">
                    {value}
                  </p>
                  <p className="text-gray-500 text-xs leading-snug">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <MagneticButton strength={0.1}>
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight className="w-5 h-5" />}
                  className="!bg-gold-primary !text-white hover:!bg-gold-signature !rounded-2xl !px-10 !py-6 shadow-gold-sm hover:shadow-gold-md transition-all duration-300"
                  onClick={() => {
                    const phoneNumber = '5521999999999'
                    const message = 'Olá! Gostaria de conhecer a rede credenciada da Amélia Saúde.'
                    window.open(
                      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                      '_blank',
                    )
                  }}
                >
                  Consultar rede credenciada
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── Right column — Orbital animation ─────────── */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className="relative flex items-center justify-center"
              style={{ width: 520, height: 520 }}
            >
              {/* Glow behind hub */}
              <div
                aria-hidden
                className="absolute w-28 h-28 rounded-full bg-gold-primary/15 blur-3xl"
              />

              {/* Orbit 1: 2 nodes, clockwise, 16s */}
              <OrbitRing nodes={INNER_NODES} size={200} duration={16} direction={1} />

              {/* Orbit 2: 2 nodes, counter-clockwise, 22s */}
              <OrbitRing nodes={MIDDLE_NODES} size={320} duration={22} direction={-1} />

              {/* Orbit 3: 3 nodes, clockwise, 32s */}
              <OrbitRing nodes={OUTER_NODES} size={440} duration={32} direction={1} />

              {/* Central hub */}
              <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold-primary/30 bg-white shadow-gold-sm overflow-hidden">
                <Image
                  src={ameliaLogo}
                  alt="Logo da Amélia Saúde"
                  width={56}
                  height={56}
                  className="object-contain"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
