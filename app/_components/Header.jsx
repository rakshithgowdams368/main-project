// app/_components/Header.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import PageLoader from './PageLoader'

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadinga, setIsLoadinga] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoadinga(false)
    }, 3000) // Adjust time as needed

    return () => clearTimeout(timer)
  }, [])

  // If still loading, show PageLoader
  if (isLoadinga) {
    return <PageLoader />
  }

  const handleClick = () => {
    setIsLoading(true)
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      window.location.href = '/dashboard'
    }, 2000)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              width={120}
              height={40}
              alt="AI Course Generator Logo"
              className="w-24 sm:w-32 h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4 md:space-x-8">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            {/* CTA Button */}
            <Link href="/dashboard">
              <Button
                onClick={handleClick}
                disabled={isLoading}
                size="lg"
                className={`
                  w-full 
                  sm:w-auto 
                  px-4 
                  md:px-8 
                  py-2 
                  md:py-6 
                  bg-gradient-to-r 
                  from-violet-600 
                  to-indigo-600 
                  hover:from-violet-700 
                  hover:to-indigo-700 
                  text-white 
                  text-sm 
                  md:text-lg 
                  font-semibold 
                  rounded-xl 
                  md:rounded-2xl 
                  shadow-lg 
                  shadow-violet-500/30 
                  hover:shadow-xl 
                  hover:shadow-violet-500/40 
                  transform 
                  transition-all 
                  duration-200
                  relative
                  ${isLoading ? 'cursor-not-allowed opacity-70' : ''}
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        transition: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear"
                        }
                      }}
                      className="w-4 md:w-6 h-4 md:h-6 border-2 md:border-4 border-t-2 md:border-t-4 border-white border-t-violet-400 rounded-full mr-2"
                    />
                    Loading...
                  </div>
                ) : (
                  <>
                    Sign Up
                    <svg
                      className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform"
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
                  </>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 sm:hidden">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-violet-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile CTA Button */}
              <Link href="/dashboard">
                <Button
                  onClick={handleClick}
                  disabled={isLoading}
                  className={`
                    w-full 
                    px-4 
                    py-3 
                    bg-gradient-to-r 
                    from-violet-600 
                    to-indigo-600 
                    hover:from-violet-700 
                    hover:to-indigo-700 
                    text-white 
                    text-sm 
                    font-semibold 
                    rounded-xl 
                    shadow-lg 
                    shadow-violet-500/30 
                    hover:shadow-xl 
                    hover:shadow-violet-500/40 
                    transform 
                    transition-all 
                    duration-200
                    relative
                    ${isLoading ? 'cursor-not-allowed opacity-70' : ''}
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          transition: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                        className="w-4 h-4 border-2 border-t-2 border-white border-t-violet-400 rounded-full mr-2"
                      />
                      Loading...
                    </div>
                  ) : (
                    'Try it Free'
                  )}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header