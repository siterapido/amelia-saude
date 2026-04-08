'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/components/hooks'
import { ParallaxLayer } from './ParallaxLayer'

interface ParallaxBackgroundProps {
  variant?: 'light' | 'dark'
  className?: string
}

const particles = [
  { x: '8%', y: '15%', size: 4, delay: 0, duration: 18 },
  { x: '22%', y: '70%', size: 3, delay: 2, duration: 22 },
  { x: '35%', y: '25%', size: 5, delay: 1, duration: 20 },
  { x: '48%', y: '80%', size: 3, delay: 3, duration: 25 },
  { x: '62%', y: '12%', size: 4, delay: 0.5, duration: 19 },
  { x: '75%', y: '55%', size: 6, delay: 2.5, duration: 23 },
  { x: '88%', y: '35%', size: 3, delay: 1.5, duration: 21 },
  { x: '15%', y: '45%', size: 5, delay: 3.5, duration: 24 },
  { x: '55%', y: '90%', size: 4, delay: 0.8, duration: 17 },
  { x: '80%', y: '75%', size: 3, delay: 2.2, duration: 26 },
  { x: '42%', y: '50%', size: 4, delay: 1.2, duration: 20 },
  { x: '92%', y: '20%', size: 5, delay: 3.8, duration: 22 },
]

const geometricShapes = [
  { x: '18%', y: '22%', type: 'ring' as const, size: 20, delay: 0 },
  { x: '72%', y: '68%', type: 'ring' as const, size: 16, delay: 1 },
  { x: '45%', y: '15%', type: 'cross' as const, size: 12, delay: 2 },
  { x: '85%', y: '45%', type: 'cross' as const, size: 10, delay: 0.5 },
  { x: '30%', y: '78%', type: 'ring' as const, size: 14, delay: 1.5 },
]

export function ParallaxBackground({ variant = 'light', className = '' }: ParallaxBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const isLight = variant === 'light'

  const blobColor1 = isLight
    ? 'rgba(123,108,177,0.08)'
    : 'rgba(168,153,204,0.12)'
  const blobColor2 = isLight
    ? 'rgba(94,73,133,0.06)'
    : 'rgba(123,108,177,0.10)'
  const particleColor = isLight
    ? 'rgba(94,73,133,0.15)'
    : 'rgba(168,153,204,0.25)'
  const shapeColor = isLight
    ? 'rgba(94,73,133,0.08)'
    : 'rgba(168,153,204,0.15)'

  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div
          className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${blobColor1} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -bottom-[15%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${blobColor2} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1: Large gradient blobs */}
      <ParallaxLayer speed={0.3} direction="up">
        <motion.div
          className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${blobColor1} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[15%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${blobColor2} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${blobColor1} 0%, transparent 70%)`,
            filter: 'blur(70px)',
          }}
          animate={{ scale: [1, 1.05, 1], x: [-20, 20, -20] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </ParallaxLayer>

      {/* Layer 2: Floating particles */}
      <ParallaxLayer speed={0.5} direction="down">
        {particles.map((p, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: particleColor,
            }}
            animate={{
              y: [0, -20, 10, -15, 0],
              x: [0, 10, -8, 5, 0],
              opacity: [0.4, 0.8, 0.3, 0.7, 0.4],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </ParallaxLayer>

      {/* Layer 3: Geometric shapes */}
      <ParallaxLayer speed={0.8} direction="up">
        {geometricShapes.map((shape, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{ left: shape.x, top: shape.y }}
            animate={{
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 20 + i * 3,
              delay: shape.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {shape.type === 'ring' ? (
              <div
                className="rounded-full"
                style={{
                  width: shape.size,
                  height: shape.size,
                  border: `1px solid ${shapeColor}`,
                }}
              />
            ) : (
              <div className="relative" style={{ width: shape.size, height: shape.size }}>
                <div
                  className="absolute top-1/2 left-0 w-full"
                  style={{ height: 1, background: shapeColor, transform: 'translateY(-50%)' }}
                />
                <div
                  className="absolute left-1/2 top-0 h-full"
                  style={{ width: 1, background: shapeColor, transform: 'translateX(-50%)' }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </ParallaxLayer>
    </div>
  )
}
