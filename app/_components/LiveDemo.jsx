// app/_components/LiveDemo.jsx
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import Link from 'next/link'

function LiveDemo() {
  const [topic, setTopic] = useState('')
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  const generatePreview = () => {
    if (!topic) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setPreview({
        title: `${topic} - Complete Course`,
        chapters: [
          'Introduction to ' + topic,
          'Core Concepts and Fundamentals',
          'Advanced Topics in ' + topic,
          'Practical Applications',
          'Practice Exercises and Projects',
        ],
        duration: '6 weeks',
        level: 'Intermediate',
      })
      setLoading(false)
    }, 1500)
  }

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
          : 'bg-white text-black'
        }
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
      <motion.div
        className={`
          absolute 
          -bottom-40 
          -left-40 
          w-96 
          h-96 
          ${theme === 'dark'
            ? 'bg-blue-600/20'
            : 'bg-blue-200/30'
          } 
          rounded-full 
          blur-3xl
        `}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          transition: {
            repeat: Infinity,
            duration: 5,
            delay: 2
          }
        }}
      ></motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              : 'text-gray-900'
            }
          `}>
            Try It Live
          </h2>
          <p className={`
            text-xl 
            max-w-2xl 
            mx-auto 
            ${theme === 'dark'
              ? 'text-gray-300'
              : 'text-gray-600'
            }
          `}>
            Enter a course topic and see how our AI generates a course outline instantly
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto"
        >
          <div className={`
            ${theme === 'dark'
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-gray-100 border-gray-200 text-black'
            } 
            backdrop-blur-lg 
            border 
            rounded-2xl 
            p-8 
            shadow-2xl
          `}>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a course category (e.g., Programming)"
                className={`
                  flex-1
                  px-4 
                  py-2 
                  rounded-lg 
                  border 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-purple-500
                  ${theme === 'dark'
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  }
                `}
              />
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className={`
                    w-full 
                    sm:w-auto 
                    px-6 
                    py-3 
                    bg-gradient-to-r 
                    from-violet-600 
                    to-indigo-600 
                    hover:from-violet-700 
                    hover:to-indigo-700 
                    text-white 
                    text-lg 
                    font-semibold 
                    rounded-xl 
                    shadow-lg 
                    shadow-violet-500/30 
                    hover:shadow-xl 
                    hover:shadow-violet-500/40 
                    group
                    transition-all 
                    duration-300
                  `}
                >
                  Get Started
                  <svg
                    className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </Link>
            </div>

            <AnimatePresence>
              {preview && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`
                    ${theme === 'dark'
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-white border-gray-200 text-black'
                    }
                    backdrop-blur-lg 
                    border 
                    rounded-lg 
                    p-6
                  `}
                >
                  <motion.h3
                    variants={itemVariants}
                    className={`
                      text-xl 
                      font-semibold 
                      mb-4 
                      ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                    `}
                  >
                    {preview.title}
                  </motion.h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Duration', value: preview.duration },
                      { label: 'Level', value: preview.level }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                      >
                        <p className={`
                          text-sm 
                          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                        `}>
                          {item.label}
                        </p>
                        <p className={`
                          font-medium 
                          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                        `}>
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <h4 className={`
                    font-semibold 
                    mb-3 
                    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                  `}>
                    Course Outline:
                  </h4>
                  <motion.ul
                    variants={containerVariants}
                    className="space-y-2"
                  >
                    {preview.chapters.map((chapter, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className={`
                          flex 
                          items-center 
                          gap-3 
                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                        `}
                      >
                        <motion.span
                          whileHover={{ scale: 1.2 }}
                          className={`
                            w-6 
                            h-6 
                            rounded-full 
                            ${theme === 'dark'
                              ? 'bg-purple-600/20 text-purple-400'
                              : 'bg-purple-100 text-purple-600'}
                            flex 
                            items-center 
                            justify-center 
                            text-sm
                          `}
                        >
                          {index + 1}
                        </motion.span>
                        {chapter}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default LiveDemo