'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    CreditCard,
    Search,
    FileText,
    Clock,
    Calendar,
    Bell,
    Heart,
    Shield,
    MapPin
} from 'lucide-react'

const miniFeatures = [
    { icon: CreditCard, color: 'from-gold-primary to-gold-signature' },
    { icon: Search, color: 'from-gold-signature to-gold-light' },
    { icon: FileText, color: 'from-gold-primary to-gold-signature' },
    { icon: Heart, color: 'from-gold-signature to-gold-light' },
    { icon: Shield, color: 'from-gold-primary to-gold-signature' },
    { icon: MapPin, color: 'from-gold-signature to-gold-light' },
    { icon: Clock, color: 'from-gold-primary to-gold-signature' },
    { icon: Calendar, color: 'from-gold-signature to-gold-light' },
    { icon: Bell, color: 'from-gold-primary to-gold-signature' },
]

/**
 * PhoneVisualization Component
 * Creates an abstract 3D representation of a smartphone with animated mini-cards
 */
export const PhoneVisualization = () => {
    return (
        <motion.div
            className="relative w-full max-w-[320px] mx-auto phone-float"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
        >
            {/* Phone Container with 3D perspective */}
            <div className="relative" style={{ perspective: '1000px' }}>
                {/* Phone Body */}
                <div
                    className="relative bg-black-deep border-2 border-gold-primary/30 rounded-[48px] p-3 shadow-2xl"
                    style={{
                        aspectRatio: '9 / 19.5',
                        transformStyle: 'preserve-3d',
                        transform: 'rotateY(-8deg) rotateX(2deg)',
                    }}
                >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black-premium rounded-b-3xl z-10" />

                    {/* Screen with glass effect */}
                    <div className="relative w-full h-full bg-gradient-to-br from-black-charcoal via-black-deep to-black-premium rounded-[40px] overflow-hidden glass-gold-strong">
                        {/* Status bar simulation */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black-premium/50 to-transparent z-20" />

                        {/* Mini Features Grid */}
                        <div className="absolute inset-0 p-8 pt-16">
                            <div className="grid grid-cols-3 gap-4 h-full content-start">
                                {miniFeatures.map((feature, index) => {
                                    const Icon = feature.icon
                                    return (
                                        <motion.div
                                            key={index}
                                            className="relative aspect-square rounded-2xl bg-gradient-to-br from-gold-primary/10 to-gold-signature/5 backdrop-blur-sm border border-gold-primary/20 flex items-center justify-center group hover:border-gold-primary/40 transition-all duration-300"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                                ease: 'easeOut'
                                            }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.05 }}
                                            style={{
                                                animation: `pulseSequence 3s ease-in-out infinite`,
                                                animationDelay: `${index * 0.3}s`,
                                            }}
                                        >
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/0 to-gold-signature/0 group-hover:from-gold-primary/20 group-hover:to-gold-signature/10 rounded-2xl transition-all duration-300" />

                                            {/* Icon */}
                                            <Icon className="w-6 h-6 text-gold-primary relative z-10 icon-glow-pulse" />

                                            {/* Corner accent */}
                                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold-primary/40 group-hover:bg-gold-primary/60 transition-colors" />
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Bottom navigation indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gold-primary/30 rounded-full" />

                        {/* Screen glow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gold-primary/5 pointer-events-none" />
                    </div>

                    {/* Phone shadow inner */}
                    <div className="absolute inset-0 rounded-[48px] shadow-inner pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)' }} />
                </div>

                {/* Outer glow */}
                <div className="absolute inset-0 -z-10 blur-2xl">
                    <div className="w-full h-full bg-gradient-radial from-gold-primary/20 via-gold-primary/10 to-transparent rounded-[48px] animate-glow-pulse" />
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gold-primary/10 blur-2xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gold-signature/10 blur-2xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                />
            </div>
        </motion.div>
    )
}
