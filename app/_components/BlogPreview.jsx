// app/_components/BlogPreview.jsx
'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Globe } from 'lucide-react'

const blogs = [
  {
    title: 'AI for Educators',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we teach and create educational content.',
    image: '/placeholder.png',
    date: 'March 15, 2024',
    category: 'Technology',
    gradient: 'from-purple-600 to-indigo-700',
    icon: Globe
  },
  {
    title: 'Design Better Courses',
    excerpt: 'Learn practical tips and strategies for creating engaging and effective courses that students love.',
    image: '/placeholder.png',
    date: 'March 10, 2024',
    category: 'Education',
    gradient: 'from-blue-600 to-cyan-700',
    icon: Globe
  },
  {
    title: 'Future of Learning',
    excerpt: 'Explore emerging trends in education technology and what they mean for students and educators.',
    image: '/placeholder.png',
    date: 'March 5, 2024',
    category: 'Trends',
    gradient: 'from-green-600 to-teal-700',
    icon: Globe
  },
]

function BlogPreview() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // 3D Tilt Effect for Blog Cards
  const tiltVariants = {
    hover: { 
      scale: 1.05,
      rotate: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 10
      }
    }
  }

  // Advanced Container Animations
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
    hidden: { 
      y: 50, 
      opacity: 0,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  // Parallax Scroll Effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <motion.section 
      ref={ref}
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
      {/* Advanced Background Effects */}
      <motion.div 
        style={{
          y: backgroundY,
          scale: backgroundScale
        }}
        className={`
          absolute 
          inset-0 
          ${theme === 'dark' 
            ? 'bg-gradient-to-br from-black via-neutral-900 to-purple-950' 
            : 'bg-gradient-to-br from-white via-gray-100 to-blue-100'}
          -z-20
        `}
      />

      {/* Floating Particle Effects */}
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
          rotate: [0, 10, -10, 0],
          transition: { 
            repeat: Infinity, 
            duration: 5 
          }
        }}
      ></motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Advanced Animation */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100,
              damping: 10
            }}
            className={`
              text-4xl 
              md:text-5xl 
              font-bold 
              mb-6 
              ${theme === 'dark' 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400'
                : 'text-gray-900'}
            `}
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`
              text-xl 
              max-w-2xl 
              mx-auto 
              ${theme === 'dark' 
                ? 'text-gray-300' 
                : 'text-gray-600'}
            `}
          >
            Stay updated with the latest insights and trends in AI-powered education
          </motion.p>
        </motion.div>

        {/* Blog Posts Grid with Enhanced 3D Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              variants ={tiltVariants}
              className={`
                relative 
                overflow-hidden 
                rounded-3xl 
                shadow-2xl 
                group
                ${theme === 'dark' 
                  ? 'bg-neutral-800/50 border border-neutral-700/50' 
                  : 'bg-white border border-gray-200'}
                transform 
                transition-all 
                duration-300
                perspective-1000
                preserve-3d
              `}
            >
              {/* Background Gradient with Motion */}
              <motion.div 
                className={`
                  absolute 
                  inset-0 
                  bg-gradient-to-br 
                  ${blog.gradient} 
                  opacity-10 
                  -z-10
                  group-hover:opacity-20
                  transition-opacity
                  duration-300
                `}
                initial={{ opacity: 0.1 }}
                whileHover={{ opacity: 0.2 }}
              ></motion.div>

              {/* Blog Image with Hover Effect */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  initial={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
                />
              </div>

              {/* Blog Content with Enhanced Interactions */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm mb-3">
                  <span className={`
                    ${theme === 'dark' 
                      ? 'text-gray-400' 
                      : 'text-gray-500'}
                  `}>
                    {blog.date}
                  </span>
                  <motion.span 
                    className={`
                      px-3 
                      py-1 
                      rounded-full 
                      flex items-center gap-2
                      ${theme === 'dark'
                        ? 'bg-primary/20 text-primary-light'
                        : 'bg-primary/10 text-primary'}
                    `}
                    whileHover={{ scale: 1.1 }}
                  >
                    <blog.icon className="w-4 h-4" />
                    {blog.category}
                  </motion.span>
                </div>

                {/* Title with Hover Effect */}
                <motion.h3 
                  className={`
                    text-xl 
                    font-semibold 
                    mb-3 
                    transition-colors
                    ${theme === 'dark' ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}
                  `}
                  whileHover={{ scale: 1.02 }}
                >
                  {blog.title}
                </motion.h3>

                {/* Excerpt */}
                <p className={`
                  mb-4 
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  {blog.excerpt}
                </p>

                {/* Read More Link with Advanced Hover */}
                <motion.div
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Link
                    href="#"
                    className={`
                      inline-flex 
                      items-center 
                      font-medium 
                      group
                      ${theme === 'dark'
                        ? 'text-primary-light hover:text-primary'
                        : 'text-primary hover:text-primary-dark'}
                    `}
                  >
                    <span className="mr-2 group-hover:mr-4 transition-all duration-300">Read More</span>
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      animate={{ 
                        x: [0, 5, 0],
                        transition: { 
                          repeat: Infinity, 
                          duration: 1.5 
                        }
                      }}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default BlogPreview