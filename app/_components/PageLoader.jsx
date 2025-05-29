// app/_components/PageLoader.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Predefined particle configurations
const PARTICLE_CONFIG = [
  { 
    gradient: 'from-violet-600 to-indigo-600', 
    width: 60, 
    height: 60, 
    top: 30, 
    left: 10 
  },
  { 
    gradient: 'from-cyan-600 to-blue-600', 
    width: 50, 
    height: 50, 
    top: 60, 
    left: 20 
  },
  { 
    gradient: 'from-purple-600 to-pink-600', 
    width: 70, 
    height: 70, 
    top: 40, 
    left: 70 
  },
  { 
    gradient: 'from-indigo-600 to-blue-600', 
    width: 80, 
    height: 80, 
    top: 10, 
    left: 50 
  },
  { 
    gradient: 'from-green-600 to-teal-600', 
    width: 55, 
    height: 55, 
    top: 90, 
    left: 30 
  },
  { 
    gradient: 'from-red-600 to-orange-600', 
    width: 65, 
    height: 65, 
    top: 20, 
    left: 80 
  },
  { 
    gradient: 'from-blue-600 to-cyan-600', 
    width: 55, 
    height: 55, 
    top: 70, 
    left: 60 
  },
  { 
    gradient: 'from-yellow-600 to-orange-600', 
    width: 45, 
    height: 45, 
    top: 50, 
    left: 40 
  },
  { 
    gradient: 'from-pink-600 to-red-600', 
    width: 75, 
    height: 75, 
    top: 80, 
    left: 90 
  },
  { 
    gradient: 'from-green-600 to-emerald-600', 
    width: 65, 
    height: 65, 
    top: 15, 
    left: 25 
  }
]

const PageLoader = () => {
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  // Particle Effect Variants
  const particleVariants = {
    initial: { 
      opacity: 0, 
      scale: 0,
      rotate: 0
    },
    animate: (i) => ({
      opacity: [0, 1, 0.5, 1, 0],
      scale: [0, 1.2, 1, 0.8, 0],
      rotate: [0, 360, 180, 270, 0],
      transition: {
        duration: 2,
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    })
  }

  // Render nothing until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Particle Background with Predefined Configuration */}
      {PARTICLE_CONFIG.map((particle, i) => (
        <motion.div
          key={i}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          custom={i}
          className={`
            absolute 
            rounded-full 
            bg-gradient-to-r 
            opacity-50
            ${particle.gradient}
          `}
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
        />
      ))}

      {/* Main Loader Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 1, 0.7, 1], 
          scale: [0.8, 1.1, 1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Animated Logo Container */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: [0, 360],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="w-32 h-32 relative"
        >
          {/* Glowing Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur-2xl opacity-50"></div>
          
          {/* Main Logo */}
          <div className="w-32 h-32 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center relative z-10 shadow-2xl">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              className="w-16 h-16"
            >
              <path d="M12 4v16m8-8H4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
        </motion.div>
        
        {/* Loading Text with Glitch Effect */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 0.7, 1], 
            y: [20, 0, 10, 0],
            textShadow: [
              '0 0 5px rgba(103,58,183,0)',
              '0 0 10px rgba(103,58,183,0.5)',
              '0 0 5px rgba(103,58,183,0)'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
          className="
            mt-6 
            text-2xl 
            font-bold 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-violet-600 
            to-indigo-600 
            tracking-wider
            animate-pulse
          "
        >
          AI Course Generator
        </motion.h2>

        {/* Loading Progress Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ 
            width: ['0%', '100%', '0%'],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="
            mt-4 
            h-1 
            w-full 
            bg-gradient-to-r 
            from-violet-600 
            to-indigo-600 
            rounded-full
          "
        />
      </motion.div>
    </div>
  )
}

export default PageLoader