// app/_components/Features.jsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'AI Content Generation',
    description: 'Generate high-quality content across multiple domains with advanced AI models.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    title: 'Multi-Language Support',
    description: 'Create content in multiple languages with contextual accuracy.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    gradient: 'from-green-600 to-teal-600'
  },
  {
    title: 'Customizable Outputs',
    description: 'Tailor content generation to your specific needs and style.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    gradient: 'from-pink-600 to-red-600'
  },
  {
    title: 'Advanced Analytics',
    description: 'Gain insights into content performance and AI-generated metrics.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-orange-600 to-yellow-600'
  },
  {
    title: 'Seamless Integration',
    description: 'Easily connect with your existing tools and workflows.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    gradient: 'from-cyan-600 to-blue-600'
  },
  {
    title: 'Secure & Private',
    description: 'Enterprise-grade security and data privacy protection.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-indigo-600 to-purple-600'
  }
]

function Features() {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features-section')
      if (featuresSection) {
        const sectionTop = featuresSection.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        setIsVisible(sectionTop < windowHeight * 0.75)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      id="features-section"
      className={`
        py-20 
        overflow-hidden 
        relative
        transition-colors 
        duration-300 
        ${theme === 'dark' 
          ? 'bg-black text-white' 
          : 'bg-white text-black'}
      `}
    >
      {/* Background Glow Effects */}
      <div className={`
        absolute 
        -top-40 
        -right-40 
        w-96 
        h-96 
        ${theme === 'dark' 
          ? 'bg-purple-600/20' 
          : 'bg-purple-200/30'
        } 
        rounded-full 
        blur-3xl
        -z-10
      `}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`
            text-4xl 
            md:text-5xl 
            font-bold 
            mb-6 
            ${theme === 'dark' 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400'
              : 'text-gray-900'}
          `}>
            Powerful Features
          </h2>
          <p className={`
            text-xl 
            max-w-2xl 
            mx-auto 
            ${theme === 'dark' 
              ? 'text-gray-300' 
              : 'text-gray-600'}
          `}>
            Unlock the potential of AI with our comprehensive suite of cutting-edge tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1 
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className={`
                rounded-2xl 
                p-6 
                transform 
                transition-all 
                duration-300 
                group 
                cursor-pointer 
                relative 
                overflow-hidden
                ${theme === 'dark' 
                  ? 'bg-neutral-800/50 border border-neutral-700/50' 
                  : 'bg-gray-100 border border-gray-200 shadow-sm'}
              `}
            >
              {/* Hover Effect Overlay */}
              <div className={`
                absolute 
                inset-0 
                bg-gradient-to-r 
                ${feature.gradient} 
                opacity-0 
                group-hover:opacity-10 
                transition-opacity 
                duration-300
              `}></div>

              {/* Feature Icon */}
              <div className={`
                w-16 
                h-16 
                mb-6 
                rounded-xl 
                bg-gradient-to-br 
                ${feature.gradient}
                flex 
                items-center 
                justify-center 
                text-white 
                transform 
                transition-transform 
                duration-300 
                group-hover:rotate-6
                relative 
                z-10
              `}>
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className={`
                text-2xl 
                font-bold 
                mb-4 
                transition-colors 
                duration-300 
                relative 
                z-10
                ${theme === 'dark' 
                  ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-white group-hover:to-blue-400' 
                  : 'text-gray-900 group-hover:text-primary'}
              `}>
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className={`
                transition-colors 
                duration-300 
                relative 
                z-10
                ${theme === 'dark' 
                  ? 'text-gray-400 group-hover:text-gray-200' 
                  : 'text-gray-600 group-hover:text-gray-800'}
              `}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features