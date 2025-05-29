// app/_components/Testimonials.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    image: '/placeholder.png',
    quote: 'This AI course generator has transformed my study routine. I can now create personalized study materials in minutes!',
    background: 'from-purple-600 to-indigo-600'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'University Professor',
    image: '/placeholder.png',
    quote: 'An invaluable tool for educators. It helps me create comprehensive course materials while saving countless hours.',
    background: 'from-blue-600 to-cyan-600'
  },
  {
    name: 'Priya Patel',
    role: 'Coaching Teacher',
    image: '/placeholder.png',
    quote: 'The test series generator is brilliant! My students love the variety and quality of practice questions.',
    background: 'from-green-600 to-teal-600'
  },
]

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { theme } = useTheme()

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={`
        py-16 
        relative 
        overflow-hidden 
        ${theme === 'dark' 
          ? 'bg-black text-white' 
          : 'bg-white text-black'}
      `}
    >
      {/* Background Glow Effects */}
      <motion.div 
        className={`
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
        `}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          transition: { 
            repeat: Infinity, 
            duration: 5 
          }
        }}
      ></motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
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
            What Our Users Say
          </h2>
          <p className={`
            text-xl 
            max-w-2xl 
            mx-auto 
            ${theme === 'dark' 
              ? 'text-gray-300' 
              : 'text-gray-600'}
          `}>
            Trusted by students, educators, and coaching professionals worldwide
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`
                rounded-2xl 
                p-8 
                text-center 
                relative 
                overflow-hidden
                ${theme === 'dark' 
                  ? 'bg-neutral-800/50 border border-neutral-700/50' 
                  : 'bg-gray-100 border border-gray-200 shadow-sm'}
              `}
            >
              {/* Background Gradient */}
              <div className={`
                absolute 
                inset-0 
                bg-gradient-to-br 
                ${testimonials[currentIndex].background} 
                opacity-10 
                -z-10
              `}></div>

              {/* Profile Image */}
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className={`
                  w-24 
                  h-24 
                  rounded-full 
                  mx-auto 
                  mb-6 
                  object-cover 
                  border-4 
                  ${theme === 'dark' 
                    ? 'border-neutral-700' 
                    : 'border-white'}
                  shadow-lg
                `}
              />

              {/* Quote */}
              <p className={`
                text-xl 
                sm:text-2xl 
                mb-6 
                italic 
                relative 
                ${theme === 'dark' 
                  ? 'text-neutral-200' 
                  : 'text-gray-800'}
              `}>
                <span className="absolute -left-4 -top-2 text-5xl opacity-20">"</span>
                {testimonials[currentIndex].quote}
                <span className="absolute -right-4 -bottom-2 text-5xl opacity-20">"</span>
              </p>

              {/* User Details */}
              <div>
                <h4 className={`
                  font-semibold 
                  text-xl 
                  ${theme === 'dark' 
                    ? 'text-white' 
                    : 'text-gray-900'}
                `}>
                  {testimonials[currentIndex].name}
                </h4>
                <p className={`
                  ${theme === 'dark' 
                    ? 'text-neutral-400' 
                    : 'text-gray-600'}
                `}>
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-3 
                  h-3 
                  rounded-full 
                  transition-all 
                  ${index === currentIndex
                    ? 'bg-primary w-8'
                    : `
                      ${theme === 'dark' 
                        ? 'bg-neutral-600 hover:bg-neutral-500' 
                        : 'bg-neutral-300 hover:bg-neutral-400'}
                    `
                  }
                `}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Testimonials