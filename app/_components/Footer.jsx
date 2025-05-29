// app/_components/Footer.jsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

function Footer() {
  const { theme } = useTheme()

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

  // Social links with icons
  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
      ),
      link: '#'
    },
    {
      name: 'Twitter',
      icon: (
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      ),
      link: '#'
    },
    {
      name: 'LinkedIn',
      icon: (
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      ),
      link: '#'
    },
    {
      name: 'GitHub',
      icon: (
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      ),
      link: '#'
    }
  ]

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={`
        relative 
        overflow-hidden 
        ${theme === 'dark' 
          ? 'bg-black text-white' 
          : 'bg-white text-black'}
        border-t 
        ${theme === 'dark' 
          ? 'border-neutral-800' 
          : 'border-neutral-200'}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/logo.svg" 
                alt="AI Course Generator Logo" 
                width={150} 
                height={40}
                className="dark:brightness-200"
              />
            </motion.div>
            <p className={`
              ${theme === 'dark' 
                ? 'text-gray-300' 
                : 'text-gray-600'}
              text-sm
            `}>
              Empowering educators with AI-powered course creation tools.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            variants={itemVariants}
          >
            <h3 className={`
              font-semibold 
              mb-4 
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
            `}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Terms', href: '/terms' },
                { label: 'Privacy', href: '/privacy' }
              ].map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={link.href} 
                    className={`
                      ${theme === 'dark' 
                        ? 'text-gray-300 hover:text-primary-light' 
                        : 'text-gray-600 hover:text-primary'}
                      transition-colors
                    `}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
          >
            <h3 className={`
              font-semibold 
              mb-4 
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
            `}>
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    ${theme === 'dark' 
                      ? 'text-gray-400 hover:text-primary-light' 
                      : 'text-gray-600 hover:text-primary'}
                    transition-colors
                  `}
                  aria-label={social.name}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Demo */}
          <motion.div 
            variants={itemVariants}
          >
            <h3 className={`
              font-semibold 
              mb-4 
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
            `}>
              Try It Now
            </h3>
            <p className={`
              ${theme === 'dark' 
                ? 'text-gray-300' 
                : 'text-gray-600'}
              text-sm 
              mb-4
            `}>
              Experience the power of AI course generation with our quick demo.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className={`
                  bg-gradient-to-r 
                  from-purple-600 
                  to-blue-600 
                  text-white 
                  hover:from-purple-700 
                  hover:to-blue-700
                `}
              >
                Quick Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className={`
            mt-12 
            pt-8 
            border-t 
            ${theme === 'dark' 
              ? 'border-neutral-800' 
              : 'border-neutral-200'}
            flex 
            flex-col 
            md:flex-row 
            justify-between 
            items-center
          `}
        >
          <p className={`
            ${theme === 'dark' 
              ? 'text-gray-400' 
              : 'text-gray-600'}
            text-sm
          `}>
            © {new Date().getFullYear()} AI Course Generator. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Cookie Policy', href: '/cookies' }
            ].map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={link.href} 
                  className={`
                    ${theme === 'dark' 
                      ? 'text-gray-400 hover:text-primary-light' 
                      : 'text-gray-600 hover:text-primary'}
                    text-sm 
                    transition-colors
                  `}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer