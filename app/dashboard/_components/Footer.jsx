// app/_components/Footer.jsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { HiOutlineBookOpen, HiOutlineInformationCircle, HiOutlineMail, HiOutlineShieldCheck } from "react-icons/hi";

function Footer() {
  const { theme } = useTheme()

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
    hidden: { y: 20, opacity: 0 },
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

  // Dashboard-style social links with icons
  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
      link: '#'
    },
    {
      name: 'Twitter',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
      link: '#'
    },
    {
      name: 'Instagram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      link: '#'
    },
    {
      name: 'GitHub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      link: '#'
    }
  ]

  // Quick links with dashboard-style icons - Updated to match .jsx files
  const quickLinks = [
    { 
      label: 'About Us', 
      href: '/extrapages/about',
      icon: <HiOutlineInformationCircle className="w-5 h-5" />
    },
    { 
      label: 'Courses', 
      href: '/extrapages/courses',
      icon: <HiOutlineBookOpen className="w-5 h-5" />
    },
    { 
      label: 'Contact', 
      href: '/extrapages/contact',
      icon: <HiOutlineMail className="w-5 h-5" />
    },
    { 
      label: 'Privacy & Terms', 
      href: '/extrapages/terms',
      icon: <HiOutlineShieldCheck className="w-5 h-5" />
    }
  ]

  // Resources - Updated to match .jsx files
  const resources = [
    { label: 'Documentation', href: '/extrapages/documentation' },
    { label: 'Tutorials', href: '/extrapages/tutorials' },
    { label: 'API Reference', href: '/extrapages/api' },
    { label: 'Community', href: '/extrapages/community' }
  ]

  // Bottom links - Updated to match .jsx files
  const bottomLinks = [
    { label: 'Terms', href: '/extrapages/terms' },
    { label: 'Privacy', href: '/extrapages/privacy' },
    { label: 'Cookies', href: '/extrapages/cookies' },
    { label: 'Security', href: '/extrapages/security' }
  ]

  return (
    <motion.footer style={{width: '100%'}}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={`
        mt-auto
        relative 
        w-full
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-200
        border-t 
        border-gray-200 dark:border-gray-800
        transition-colors duration-300
      `}
    >
      {/* Background gradient effect - matching dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            transition: { repeat: Infinity, duration: 8 }
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-0 left-20 w-60 h-60 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            transition: { repeat: Infinity, duration: 10, delay: 1 }
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center"
            >
              <div className="relative h-8 w-36">
                <Image 
                  src="/logo.svg" 
                  alt="AI Course Generator" 
                  fill
                  className="object-contain dark:brightness-150"
                />
              </div>
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The most powerful AI-driven course creation platform for educators, trainers, and knowledge workers.
            </p>
            <div className="flex space-x-2 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Dashboard style with extrapages */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-fit"
                >
                  <Link 
                    href={link.href} 
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="text-indigo-500">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column - Updated with extrapages */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <motion.li
                  key={resource.href}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-fit"
                >
                  <Link 
                    href={resource.href} 
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {resource.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Signup - Dashboard style */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest features, templates, and AI advancements.
            </p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-gray-200 text-sm transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Dashboard style with extrapages */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AI Course Generator. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            {bottomLinks.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer