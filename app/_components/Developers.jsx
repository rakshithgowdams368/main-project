// app/_components/Developers.jsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const developers = [
  {
    name: 'Alex Rivera',
    employeeId: 'DEV-001',
    role: 'UI/UX Designer',
    image: '/placeholder.png',
    social: {
      linkedin: '#',
      website: '#',
      instagram: '#',
      x: '#',
      github: '#',
    },
    gradient: 'from-purple-600 to-indigo-700'
  },
  {
    name: 'Sarah Chen',
    employeeId: 'DEV-002',
    role: 'Frontend Developer',
    image: '/placeholder.png',
    social: {
      linkedin: '#',
      website: '#',
      instagram: '#',
      x: '#',
      github: '#',
    },
    gradient: 'from-blue-600 to-cyan-700'
  },
  {
    name: 'David Kumar',
    employeeId: 'DEV-003',
    role: 'Backend Developer',
    image: '/placeholder.png',
    social: {
      linkedin: '#',
      website: '#',
      instagram: '#',
      x: '#',
      github: '#',
    },
    gradient: 'from-green-600 to-teal-700'
  },
  {
    name: 'Emily Watson',
    employeeId: 'DEV-004',
    role: 'Product Manager',
    image: '/placeholder.png',
    social: {
      linkedin: '#',
      website: '#',
      instagram: '#',
      x: '#',
      github: '#',
    },
    gradient: 'from-red-600 to-orange-700'
  }
]

function Developers() {
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
            Meet the Makers
          </h2>
          <p className={`
            text-xl 
            max-w-2xl 
            mx-auto 
            ${theme === 'dark'
              ? 'text-gray-300'
              : 'text-gray-600'}
          `}>
            The talented team behind AI Course Generator
          </p>
        </motion.div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              // Replace complex rotation animations with simpler variants
              whileHover={{
                rotate: 5,  // Use a single rotation value
                transition: {
                  type: "spring",
                  stiffness: 300
                }
              }}
              className={`
                relative 
                overflow-hidden 
                rounded-2xl 
                p-6 
                text-center 
                transform 
                transition-all 
                duration-300
                ${theme === 'dark'
                  ? 'bg-neutral-800/50 border border-neutral-700/50'
                  : 'bg-white border border-gray-200 shadow-sm'}
              `}
            >
              {/* Background Gradient */}
              <div className={`
                absolute 
                inset-0 
                bg-gradient-to-br 
                ${dev.gradient} 
                opacity-10 
                -z-10
              `}></div>

              {/* Profile Image */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 5,  // Single rotation value
                  transition: {
                    type: "spring",
                    stiffness: 300
                  }
                }}
              >
                <img
                  src={dev.image}
                  alt={dev.name}
                  className={`
                    w-24 
                    h-24 
                    rounded-full 
                    mx-auto 
                    object-cover 
                    border-4 
                    ${theme === 'dark'
                      ? 'border-neutral-700'
                      : 'border-white'}
                    shadow-lg
                  `}
                />
              </motion.div>

              {/* Developer Details */}
              <h3 className={`
                text-xl 
                font-semibold 
                mb-1 
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              `}>
                {dev.name}
              </h3>
              <p className={`
                text-sm 
                mb-2 
                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {dev.employeeId}
              </p>
              <p className={`
                font-medium 
                mb-4 
                ${theme === 'dark'
                  ? 'text-primary-light'
                  : 'text-primary'}
              `}>
                {dev.role}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                {[
                  {
                    name: 'LinkedIn',
                    icon: (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    ),
                    link: dev.social.linkedin
                  },
                  {
                    name: 'Global',
                    icon: (
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 16.057V16c0-2.76 2.24-5 5-5h.057c-.552 3.101-2.897 5.445-5.997 5.997zM7.943 16H8c2.76 0 5-2.24 5-5v-.057c-3.101.552-5.445 2.897-5.997 5.997zM13 7.943V8c0 2.76-2.24 5-5 5h-.057c.552-3.101 2.897-5.445 5.997-5.997zM16.057 8H16c-2.76 0-5 2.24-5 5v.057c3.101-.552 5.445-2.897 5.997-5.997zM2 12c0-1.516.345-2.953.958-4.241C4.214 8.518 5 10.172 5 12s-.786 3.482-2.042 4.241A9.953 9.953 0 012 12zm3.958 5.241C7.214 16.482 8 14.828 8 13h1c0 1.828-.786 3.482-2.042 4.241zM13 19c-1.828 0-3.482-.786-4.241-2.042C9.518 15.786 11.172 15 13 15s3.482.786 4.241 2.042C16.482 18.214 14.828 19 13 19zm5.042-2.759C16.786 15.482 16 13.828 16 12s.786-3.482 2.042-4.241C20.518 9.047 22 10.484 22 12s-1.482 2.953-3.958 4.241zM18.042 6.759C16.786 7.518 16 9.172 16 11h-1c0-1.828.786-3.482 2.042-4.241zM11 5c1.828 0 3.482.786 4.241 2.042C14.482 8.214 12.828 9 11 9S7.518 8.214 6.759 7.042C7.518 5.786 9.172 5 11 5z" />
                    ),
                    link: dev.social.website
                  },
                  {
                    name: 'Instagram',
                    icon: (
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    ),
                    link: dev.social.instagram
                  },
                  {
                    name: 'X',
                    icon: (
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    ),
                    link: dev.social.x
                  },
                  {
                    name: 'GitHub',
                    icon: (
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    ),
                    link: dev.social.github
                  }
                ].map((social) => (
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Developers