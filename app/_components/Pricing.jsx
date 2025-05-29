// app/_components/Pricing.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    features: [
      '5 courses per month',
      'Basic templates',
      'Standard support',
      'Export to PDF',
    ],
    cta: 'Get Started',
    highlighted: false,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Educator',
    price: { monthly: 29, yearly: 290 },
    features: [
      'Unlimited courses',
      'Premium templates',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    gradient: 'from-purple-600 to-indigo-700'
  },
  {
    name: 'Institution',
    price: { monthly: 99, yearly: 990 },
    features: [
      'Everything in Educator',
      'Multiple users',
      'Team collaboration',
      'Admin dashboard',
      'SSO integration',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    gradient: 'from-pink-600 to-red-500'
  }
]

function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Dark mode detection
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    // Initial check
    checkDarkMode()

    // Create a MutationObserver to watch for class changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    return () => observer.disconnect()
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

  // Toggle Handler with Improved Interaction
  const toggleBillingCycle = () => {
    setIsYearly(prev => !prev)
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
        ${isDarkMode 
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
          ${isDarkMode 
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
            ${isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400'
              : 'text-gray-900'}
          `}>
            Simple, Transparent Pricing
          </h2>
          <p className={`
            text-xl 
            max-w-2xl 
            mx-auto 
            mb-8 
            ${isDarkMode 
              ? 'text-gray-300' 
              : 'text-gray-600'}
          `}>
            Choose the perfect plan for your needs. All plans include our core features.
          </p>

          {/* Billing Toggle with Improved Interaction */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            <span 
              className={`
                text-sm 
                cursor-pointer 
                ${!isYearly 
                  ? 'text-primary font-semibold' 
                  : 'text-neutral-600 dark:text-neutral-400'}
              `}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </span>
            
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={toggleBillingCycle}
              className={`
                relative 
                w-16 
                h-8 
                rounded-full 
                cursor-pointer
                transition-colors 
                ${isYearly 
                  ? 'bg-primary' 
                  : 'bg-neutral-300 dark:bg-neutral-600'}
              `}
            >
              <motion.span
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className={`
                  absolute 
                  top-1 
                  w-6 
                  h-6 
                  bg-white 
                  rounded-full 
                  ${isYearly ? 'right-1' : 'left-1'}
                `}
              />
            </motion.div>
            
            <span 
              className={`
                text-sm 
                cursor-pointer
                ${isYearly 
                  ? 'text-primary font-semibold' 
                  : 'text-neutral-600 dark:text-neutral-400'}
              `}
              onClick={() => setIsYearly(true)}
            >
              Yearly <span className="text-green-500">(Save 20%)</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <AnimatePresence>
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`
                  relative 
                  overflow-hidden 
                  rounded-2xl 
                  p-8 
                  ${isDarkMode 
                    ? 'bg-neutral-800/50 border border-neutral-700/50' 
                    : 'bg-white border border-gray-200 shadow-sm'}
                  ${plan.highlighted 
                    ? 'ring-2 ring-primary' 
                    : ''}
                `}
              >
                {/* Background Gradient */}
                <div className={`
                  absolute 
                  inset-0 
                  bg-gradient-to-br 
                  ${plan.gradient} 
                  opacity-10 
                  -z-10
                `}></div>

                {/* Highlighted Badge */}
                {plan.highlighted && (
                  <motion.span 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      absolute 
                      top-4 
                      right-4 
                      bg-primary 
                      text-white 
                      text-sm 
                      font-medium 
                      px-3 
                      py-1 
                      rounded-full
                    `}
                  >
                    Most Popular
                  </motion.span>
                )}

                {/* Plan Name */}
                <h3 className={`
                  text-2xl 
                  font-bold 
                  mt-4 
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  {plan.name}
                </h3>

                {/* Pricing with Smooth Transition */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={isYearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mt-4 mb-8"
                  >
                    <span className={`
                      text-4xl 
                      font-bold 
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}>
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className={`
                      ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className={`
                        flex 
                        items-center 
                        gap-3 
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                      `}
                    >
                      <svg 
                        className="w-5 h-5 text-green-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className={`
                      w-full 
                      ${plan.highlighted
                        ? `
                          bg-gradient-to-r 
                          ${plan.gradient} 
                          text-white 
                          hover:opacity-90
                        `
                        : `
                          ${isDarkMode
                            ? 'bg-neutral-700 text-white hover:bg-neutral-600'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                        `
                      }
                    `}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

export default Pricing