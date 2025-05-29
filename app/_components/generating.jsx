// app/_components/LoadingPage.jsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

const LoadingPage = ({ topic }) => {
  // Animated phrases related to course generation
  const generationPhrases = [
    `Analyzing ${topic} Course Structure`,
    'Crafting Intelligent Curriculum',
    'Generating Learning Modules',
    'Optimizing Course Content',
    'Finalizing Course Outline'
  ]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Particle Background */}
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: '-50%',
            y: '-50%'
          }}
          animate={{ 
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0, 1.2, 1, 0.8, 0],
            rotate: [0, 360, 180, 270, 0]
          }}
          transition={{
            duration: 5,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
          className={`
            absolute 
            rounded-full 
            blur-md
            opacity-30
            ${index % 2 === 0 
              ? 'bg-violet-600' 
              : 'bg-indigo-600'}
          `}
          style={{
            width: `${Math.random() * 100 + 20}px`,
            height: `${Math.random() * 100 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Loading Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 10
        }}
        className="text-center max-w-xl px-4"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mx-auto w-32 h-32 mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
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

        {/* Dynamic Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600"
        >
          Generating Course for {topic}
        </motion.h2>

        {/* Animated Loading Phrases */}
        <div className="space-y-2 mt-6">
          {generationPhrases.map((phrase, index) => (
            <motion.div
              key={phrase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                x: 0,
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              {phrase}
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ 
            width: ['0%', '100%'],
            transition: {
              duration: 5,
              ease: "easeInOut"
            }
          }}
          className="mt-8 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
        />
      </motion.div>
    </div>
  )
}

export default LoadingPage