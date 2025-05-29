// app/about/page.jsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SideBar from '@/app/dashboard/_components/SideBar'
import Footer from '@/app/dashboard/_components/Footer'

function AboutPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  // Course categories we can generate
  const courseCategories = [
    {
      icon: "💻",
      title: "Programming & Development",
      description: "Web development, mobile apps, software engineering, data structures & algorithms",
      examples: ["React.js", "Python", "JavaScript", "Node.js", "Machine Learning"]
    },
    {
      icon: "🎨",
      title: "Design & Creative",
      description: "UI/UX design, graphic design, digital art, branding, and creative workflows",
      examples: ["Figma", "Photoshop", "UI Design", "Brand Identity", "Digital Art"]
    },
    {
      icon: "💼",
      title: "Business & Management",
      description: "Leadership, project management, entrepreneurship, and business strategy",
      examples: ["Leadership", "Project Management", "Startup", "Business Strategy", "Team Building"]
    },
    {
      icon: "📢",
      title: "Marketing & Sales",
      description: "Digital marketing, social media, SEO, content creation, and sales strategies",
      examples: ["Digital Marketing", "SEO", "Social Media", "Content Marketing", "Sales Funnel"]
    },
    {
      icon: "📊",
      title: "Data & Analytics",
      description: "Data science, analytics, business intelligence, and statistical analysis",
      examples: ["Data Science", "SQL", "Excel", "Power BI", "Statistics"]
    },
    {
      icon: "🤖",
      title: "Technology & AI",
      description: "Artificial intelligence, blockchain, cloud computing, and emerging technologies",
      examples: ["AI/ML", "Blockchain", "Cloud Computing", "Cybersecurity", "IoT"]
    },
    {
      icon: "📸",
      title: "Photography & Video",
      description: "Photography techniques, video editing, cinematography, and visual storytelling",
      examples: ["Photography", "Video Editing", "Cinematography", "Adobe Premiere", "Lighting"]
    },
    {
      icon: "🎵",
      title: "Music & Audio",
      description: "Music production, audio engineering, sound design, and music theory",
      examples: ["Music Production", "Audio Engineering", "Sound Design", "Music Theory", "Mixing"]
    },
    {
      icon: "💚",
      title: "Health & Wellness",
      description: "Fitness, nutrition, mental health, meditation, and personal wellness",
      examples: ["Fitness Training", "Nutrition", "Meditation", "Mental Health", "Yoga"]
    },
    {
      icon: "🌍",
      title: "Languages & Communication",
      description: "Language learning, public speaking, writing, and communication skills",
      examples: ["English", "Spanish", "Public Speaking", "Writing", "Communication"]
    },
    {
      icon: "🔬",
      title: "Science & Research",  
      description: "Scientific methods, research techniques, laboratory skills, and academic writing",
      examples: ["Research Methods", "Laboratory Skills", "Scientific Writing", "Data Analysis", "Statistics"]
    },
    {
      icon: "💰",
      title: "Finance & Investment",
      description: "Personal finance, investing, cryptocurrency, accounting, and financial planning",
      examples: ["Personal Finance", "Investing", "Cryptocurrency", "Accounting", "Trading"]
    }
  ]

  // Platform features
  const platformFeatures = [
    {
      icon: "✨",
      title: "AI-Powered Content Generation",
      description: "Advanced AI creates comprehensive course content, including lessons, quizzes, and assessments automatically."
    },
    {
      icon: "🚀",
      title: "Instant Course Creation",
      description: "Generate complete courses in minutes, not months. From outline to finished content in one click."
    },
    {
      icon: "💡",
      title: "Customizable Templates",
      description: "Choose from various course structures, difficulty levels, and learning formats to match your needs."
    },
    {
      icon: "🌐",
      title: "Multi-Format Support",
      description: "Create text-based lessons, video content, interactive exercises, and multimedia presentations."
    },
    {
      icon: "👤",
      title: "Personalized Learning Paths",
      description: "Tailor courses to specific skill levels, learning objectives, and individual preferences."
    },
    {
      icon: "✅",
      title: "Quality Assurance",
      description: "Built-in content review, fact-checking, and quality optimization for professional-grade courses."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              transition: { repeat: Infinity, duration: 8 }
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
              transition: { repeat: Infinity, duration: 10, delay: 2 }
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center text-white"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="text-6xl mb-4">🎓</div>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
              About AI Course Generator
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Revolutionizing education through AI-powered course creation. 
              Transform any topic into comprehensive, engaging learning experiences in minutes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              Our Mission
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We believe that knowledge should be accessible to everyone. Our AI-powered platform democratizes course creation, 
              enabling educators, trainers, and subject matter experts to create high-quality educational content without the 
              traditional barriers of time, cost, and technical expertise.
            </motion.p>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Speed</h3>
                <p className="text-gray-600 dark:text-gray-300">Create courses 100x faster than traditional methods</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Quality</h3>
                <p className="text-gray-600 dark:text-gray-300">AI-optimized content that engages and educates</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Accessibility</h3>
                <p className="text-gray-600 dark:text-gray-300">Making education creation accessible to everyone</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Platform Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Courses We Can Generate
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Our AI can create comprehensive courses across virtually any subject. Here are some of the most popular categories:
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courseCategories.map((category, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white"
          >
            <motion.div variants={itemVariants}>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Courses Generated</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Subject Areas</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">User Satisfaction</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">AI Availability</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Create Your First AI Course?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of educators, trainers, and content creators who are revolutionizing learning with AI-powered course generation.
            </motion.p>
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Start Creating Courses
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AboutPage