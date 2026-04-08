'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Calendar,
  Heart,
  Shield,
  Users,
  FileText,
  Activity,
  Clock,
  Search,
  Bell,
  User,
  CreditCard,
} from 'lucide-react'
import { useReducedMotion } from '@/components/hooks'

interface TabletVisualizationProps {
  variant?: 'dashboard' | 'portal'
  className?: string
}

const DashboardScreen = () => (
  <div className="flex h-full w-full">
    {/* Sidebar */}
    <div className="w-14 bg-gold-soft/20 border-r border-gold-primary/10 flex flex-col items-center py-4 gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-primary to-gold-signature flex items-center justify-center">
        <Heart className="w-4 h-4 text-white" />
      </div>
      <div className="w-6 h-px bg-gold-primary/20 my-1" />
      {[BarChart3, Calendar, Users, FileText, Shield].map((Icon, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            i === 0 ? 'bg-gold-primary/15 text-gold-primary' : 'text-gold-light/40 hover:text-gold-light/60'
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
      ))}
    </div>

    {/* Main content */}
    <div className="flex-1 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="h-2.5 w-24 bg-gold-primary/20 rounded-full" />
          <div className="h-2 w-16 bg-gold-primary/10 rounded-full mt-1.5" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gold-primary/10 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5 text-gold-primary/50" />
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-primary/30 to-gold-signature/30" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {[
          { label: 'Consultas', value: '248', icon: Activity, color: 'from-gold-primary/15 to-gold-signature/10' },
          { label: 'Pacientes', value: '1.2k', icon: Users, color: 'from-emerald-500/15 to-emerald-400/10' },
          { label: 'Exames', value: '89', icon: FileText, color: 'from-blue-500/15 to-blue-400/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className={`rounded-xl bg-gradient-to-br ${stat.color} border border-gold-primary/10 p-2.5`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <stat.icon className="w-3.5 h-3.5 text-gold-primary/60 mb-1.5" />
            <div className="text-[11px] font-bold text-gold-dark/80">{stat.value}</div>
            <div className="text-[8px] text-gold-primary/40 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="rounded-xl bg-gold-primary/5 border border-gold-primary/10 p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="h-2 w-16 bg-gold-primary/15 rounded-full" />
          <div className="h-2 w-8 bg-gold-primary/10 rounded-full" />
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-gold-primary/30 to-gold-signature/15"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              transition={{ delay: 0.6 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>

      {/* Appointments list */}
      <div className="space-y-2">
        {[
          { time: '09:00', name: 'Maria Silva', type: 'Consulta' },
          { time: '10:30', name: 'João Santos', type: 'Retorno' },
          { time: '14:00', name: 'Ana Costa', type: 'Exame' },
        ].map((apt, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-lg bg-gold-primary/5 border border-gold-primary/8 p-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-6 h-6 rounded-full bg-gold-primary/15 flex items-center justify-center">
              <Clock className="w-3 h-3 text-gold-primary/50" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-medium text-gold-dark/70 truncate">{apt.name}</div>
              <div className="text-[7px] text-gold-primary/40">{apt.type}</div>
            </div>
            <div className="text-[8px] text-gold-primary/50 font-medium">{apt.time}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
)

const PortalScreen = () => (
  <div className="flex flex-col h-full w-full">
    {/* Portal header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gold-primary/10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-primary/30 to-gold-signature/20 flex items-center justify-center">
          <User className="w-4 h-4 text-gold-primary/60" />
        </div>
        <div>
          <div className="h-2 w-20 bg-gold-primary/20 rounded-full" />
          <div className="h-1.5 w-14 bg-gold-primary/10 rounded-full mt-1" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-full bg-gold-primary/10 flex items-center justify-center">
          <Search className="w-3.5 h-3.5 text-gold-primary/40" />
        </div>
        <div className="w-7 h-7 rounded-full bg-gold-primary/10 flex items-center justify-center">
          <Bell className="w-3.5 h-3.5 text-gold-primary/40" />
        </div>
      </div>
    </div>

    <div className="flex-1 p-4 overflow-hidden">
      {/* Plan card */}
      <motion.div
        className="rounded-xl bg-gradient-to-br from-gold-primary/15 to-gold-signature/10 border border-gold-primary/15 p-3 mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gold-primary/60" />
            <div className="text-[10px] font-semibold text-gold-dark/70">Plano Familiar</div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-[7px] text-emerald-600 font-medium">
            Ativo
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <div className="text-[7px] text-gold-primary/40">Titular</div>
            <div className="text-[9px] text-gold-dark/60">Maria Silva</div>
          </div>
          <div>
            <div className="text-[7px] text-gold-primary/40">Dependentes</div>
            <div className="text-[9px] text-gold-dark/60">3 pessoas</div>
          </div>
          <div>
            <div className="text-[7px] text-gold-primary/40">Validade</div>
            <div className="text-[9px] text-gold-dark/60">12/2026</div>
          </div>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { icon: Calendar, label: 'Agendar' },
          { icon: FileText, label: 'Guias' },
          { icon: Heart, label: 'Rede' },
          { icon: Shield, label: 'Carteirinha' },
        ].map((action, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-gold-primary/5 border border-gold-primary/8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <action.icon className="w-4 h-4 text-gold-primary/50" />
            <div className="text-[7px] text-gold-dark/50">{action.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent exams */}
      <div className="mb-2">
        <div className="text-[9px] font-semibold text-gold-dark/60 mb-2">Exames Recentes</div>
        <div className="space-y-1.5">
          {[
            { name: 'Hemograma Completo', date: '15/03', status: 'Pronto' },
            { name: 'Glicemia em Jejum', date: '15/03', status: 'Pronto' },
            { name: 'Colesterol Total', date: '10/03', status: 'Pronto' },
            { name: 'Ultrassom Abdômen', date: '20/03', status: 'Pendente' },
          ].map((exam, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between rounded-lg bg-gold-primary/5 border border-gold-primary/8 px-2.5 py-1.5"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3 text-gold-primary/40" />
                <div className="text-[8px] text-gold-dark/60">{exam.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[7px] text-gold-primary/35">{exam.date}</div>
                <div className={`px-1.5 py-0.5 rounded-full text-[6px] font-medium ${
                  exam.status === 'Pronto'
                    ? 'bg-emerald-500/15 text-emerald-600'
                    : 'bg-amber-500/15 text-amber-600'
                }`}>
                  {exam.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export const TabletVisualization = ({ variant = 'dashboard', className = '' }: TabletVisualizationProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`relative w-full max-w-[480px] mx-auto ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="relative" style={{ perspective: '1200px' }}>
        {/* Tablet body */}
        <div
          className="relative bg-black-deep border-2 border-gold-primary/20 rounded-[24px] p-2.5 shadow-2xl"
          style={{
            aspectRatio: '4 / 3',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-5deg) rotateX(2deg)',
          }}
        >
          {/* Camera dot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-primary/20 z-10" />

          {/* Screen */}
          <div className="relative w-full h-full bg-gradient-to-br from-white via-black-premium to-white rounded-[18px] overflow-hidden">
            {variant === 'dashboard' ? <DashboardScreen /> : <PortalScreen />}

            {/* Screen glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gold-primary/3 pointer-events-none" />
          </div>

          {/* Inner shadow */}
          <div
            className="absolute inset-0 rounded-[24px] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)' }}
          />
        </div>

        {/* Outer glow */}
        <div className="absolute inset-0 -z-10 blur-2xl">
          <div className="w-full h-full bg-gradient-radial from-gold-primary/15 via-gold-primary/8 to-transparent rounded-[24px] animate-glow-pulse" />
        </div>

        {/* Decorative orbs */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gold-primary/10 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full bg-gold-signature/10 blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </>
        )}
      </div>
    </motion.div>
  )
}
