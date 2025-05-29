"use client"

import { Progress } from '@/components/ui/progress';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState, useEffect, useRef } from 'react'
import { HiOutlineHome, HiOutlineSquare3Stack3D, HiOutlineShieldCheck, HiOutlinePower } from "react-icons/hi2";
import { HiMenuAlt2, HiX } from "react-icons/hi"; 
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { SunIcon, MoonIcon, BellIcon, UserIcon, LogOutIcon, GraduationCapIcon, ExternalLinkIcon } from 'lucide-react'
import { useUser, UserButton } from '@clerk/nextjs'

function TopNavBar() {
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
    const router = useRouter();
    const path = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const navbarRef = useRef(null);
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);
    
    // After mounting, check if we can render theme toggle
    useEffect(() => {
        setMounted(true);
        
        // Handle clicks outside dropdown to close it
        const handleClickOutside = (event) => {
            if (isOpen && 
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                navbarRef.current &&
                !navbarRef.current.querySelector('#navbar-toggle').contains(event.target)) {
                setIsOpen(false);
            }
            
            // Handle clicks outside notification dropdown
            if (isNotificationOpen && 
                notificationRef.current && 
                !notificationRef.current.contains(event.target) &&
                !event.target.closest('#notification-toggle')) {
                setIsNotificationOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, isNotificationOpen]);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };
    
    const toggleProfileModal = () => {
        setIsProfileModalOpen(!isProfileModalOpen);
        // Close sidebar when opening profile modal
        if (!isProfileModalOpen) {
            setIsOpen(false);
        }
    };
    
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    
    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <HiOutlineHome className="text-indigo-500" size={20} />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Explore',
            icon: <HiOutlineSquare3Stack3D className="text-indigo-500" size={20} />,
            path: '/dashboard/explore'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: <HiOutlineShieldCheck className="text-indigo-500" size={20} />,
            path: '/dashboard/upgrade'
        }
    ]
    
    const handleLogout = async () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        
        try {
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    const closeDropdown = () => {
        setIsOpen(false);
    };

    // Animation variants
    const dropdownVariants = {
        hidden: { 
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.2,
                staggerChildren: 0.05
            }
        }
    };
    
    const sidebarVariants = {
        hidden: { 
            opacity: 0,
            x: "-100%",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        visible: { 
            opacity: 1,
            x: 0,
            transition: { 
                duration: 0.3,
                ease: "easeInOut",
                staggerChildren: 0.05,
                when: "beforeChildren"
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.2 }
        }
    };

    // Notification count - this would come from your backend in a real app
    const notificationCount = 3;
    
    // Calculate course progress percentage
    const courseProgress = ((userCourseList?.length || 0) / 5) * 100;

    return (
        <>
            {/* Main Navigation Bar - visible on all devices */}
            <div 
                ref={navbarRef}
                className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-md z-50 px-4 transition-colors duration-300"
            >
                <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
                    {/* Left section: Hamburger and Logo */}
                    <div className="flex items-center space-x-3">
                        <button
                            id="navbar-toggle"
                            onClick={toggleDropdown}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <HiX className="text-2xl" />
                            ) : (
                                <HiMenuAlt2 className="text-2xl" />
                            )}
                        </button>
                        
                        <Image src={'/logo.svg'} width={120} height={40} alt="Logo" className="hidden sm:block" />
                    </div>
                    
                    {/* Middle section: Navigation links (shown on large screens) */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {Menu.map((item) => (
                            <Link key={item.id} href={item.path}>
                                <div className={`
                                    px-4 py-2 rounded-md flex items-center gap-2
                                    transition-colors duration-200
                                    ${item.path === path 
                                        ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' 
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'}
                                `}>
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    {/* Right section: notifications, theme toggle, user */}
                    <div className="flex items-center space-x-1 sm:space-x-3">
                        {/* Notifications */}
                        <div className="relative">
                            <button 
                                id="notification-toggle"
                                onClick={toggleNotifications}
                                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200 relative"
                            >
                                <BellIcon size={20} />
                                {notificationCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>
                            
                            {/* Notifications Dropdown */}
                            <AnimatePresence>
                                {isNotificationOpen && (
                                    <motion.div
                                        ref={notificationRef}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={dropdownVariants}
                                        className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    Notifications
                                                </h3>
                                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                    {notificationCount}
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                {/* Welcome Message */}
                                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                                <UserIcon size={16} className="text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                Welcome {user?.firstName || 'User'}!
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                                Great to have you back. Ready to continue your learning journey?
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                Just now
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Course Progress */}
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                                <GraduationCapIcon size={16} className="text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="ml-3 flex-1">
                                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                Course Progress Update
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                                You've completed {userCourseList?.length || 0} out of 5 courses ({Math.round(courseProgress)}%)
                                                            </p>
                                                            <div className="mt-2">
                                                                <Progress 
                                                                    value={courseProgress} 
                                                                    className="h-2 bg-gray-200 dark:bg-gray-700"
                                                                />
                                                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                    <span>{userCourseList?.length || 0}/5 courses</span>
                                                                    <span>{Math.round(courseProgress)}%</span>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                2 hours ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Company Link */}
                                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                                <ExternalLinkIcon size={16} className="text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                Check out our design services
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                                Visit our mother company for amazing design solutions
                                                            </p>
                                                            <a 
                                                                href="https://www.mydesignnexus.in/" 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mt-1"
                                                            >
                                                                mydesignnexus.in
                                                                <ExternalLinkIcon size={12} className="ml-1" />
                                                            </a>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                1 day ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                <button className="w-full text-sm text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* Theme Toggle */}
                        {mounted && (
                            <button 
                                onClick={toggleTheme}
                                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={theme}
                                        initial={{ rotate: -180, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 180, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        )}
                        
                        {/* User Avatar - shown on all screens */}
                        {isLoaded && isSignedIn ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                <UserIcon size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Overlay - shown when sidebar is open */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black z-40 top-16"
                        onClick={closeDropdown}
                    />
                )}
            </AnimatePresence>
            
            {/* Sidebar Menu - Works on all devices */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={dropdownRef}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={sidebarVariants}
                        className="fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-40 overflow-y-auto"
                    >
                        <div className="p-4">
                            {/* User profile section */}
                            {isLoaded && isSignedIn && (
                                <motion.div 
                                    variants={itemVariants}
                                    className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                                >
                                    <div className="flex items-center space-x-3 mb-2">
                                        {user?.imageUrl ? (
                                            <Image 
                                                src={user.imageUrl} 
                                                width={40} 
                                                height={40} 
                                                alt={user.firstName || "User"} 
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium">
                                                {user?.firstName?.[0] || "U"}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {user?.fullName || user?.firstName || "User"}
                                            </h3>
                                        </div>
                                    </div>
                                    
                                    {user?.publicMetadata?.role && (
                                        <div className="mt-2">
                                            <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full">
                                                {user.publicMetadata.role}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                            
                            {/* Course Progress - shown on all devices */}
                            <motion.div 
                                variants={itemVariants}
                                className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Course Progress
                                    </span>
                                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                        {userCourseList?.length || 0}/5
                                    </span>
                                </div>
                                <Progress 
                                    value={((userCourseList?.length || 0)/5)*100} 
                                    className="h-2 bg-gray-200 dark:bg-gray-700 mb-2"
                                />
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {5 - (userCourseList?.length || 0)} more courses until upgrade required
                                </div>
                            </motion.div>
                            
                            {/* Navigation Links */}
                            <nav className="mb-6">
                                <div className="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2 px-4">
                                    Main Navigation
                                </div>
                                {Menu.map((item) => (
                                    <motion.div key={item.id} variants={itemVariants}>
                                        <Link 
                                            href={item.path}
                                            onClick={closeDropdown}
                                        >
                                            <div className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                                                transition-colors duration-200
                                                ${item.path === path 
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
                                            `}>
                                                {item.icon}
                                                <span className="font-medium">{item.name}</span>
                                                
                                                {item.path === path && (
                                                    <div className="ml-auto h-2 w-2 rounded-full bg-indigo-500"></div>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                            
                            {/* Secondary Navigation */}
                            <div className="mb-6">
                                <div className="text-xs uppercase font-semibold text-gray-400 dark:text-gray-500 mb-2 px-4">
                                    Settings
                                </div>
                                
                                <motion.div variants={itemVariants}>
                                    <button 
                                        onClick={toggleProfileModal}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-left"
                                    >
                                        <UserIcon size={20} className="text-indigo-500" />
                                        <span className="font-medium">Profile</span>
                                    </button>
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <button 
                                        onClick={toggleTheme}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-left"
                                    >
                                        {theme === 'dark' ? (
                                            <SunIcon size={20} className="text-indigo-500" />
                                        ) : (
                                            <MoonIcon size={20} className="text-indigo-500" />
                                        )}
                                        <span className="font-medium">
                                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                        </span>
                                    </button>
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-left"
                                    >
                                        <LogOutIcon size={20} />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </motion.div>
                            </div>
                            
                            {/* Create Course Button */}
                            <motion.div 
                                variants={itemVariants}
                                className="px-4"
                            >
                                <Link 
                                    href="/create-course"
                                    onClick={closeDropdown}
                                >
                                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
                                        <span className="mr-2">+</span>
                                        Create New Course
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Main content spacer */}
            <div className="pt-16"></div>
            
            {/* Profile Modal */}
            <AnimatePresence>
                {isProfileModalOpen && (
                    <>
                        {/* Modal Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black z-50"
                            onClick={toggleProfileModal}
                        />
                        
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                        Profile Information
                                    </h2>
                                    <button
                                        onClick={toggleProfileModal}
                                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
                                    >
                                        <HiX size={20} />
                                    </button>
                                </div>
                                
                                {/* Modal Body */}
                                <div className="p-6">
                                    {isLoaded && isSignedIn && user ? (
                                        <div className="space-y-6">
                                            {/* Profile Picture Section */}
                                            <div className="flex flex-col items-center">
                                                {user.imageUrl ? (
                                                    <Image 
                                                        src={user.imageUrl} 
                                                        width={80} 
                                                        height={80} 
                                                        alt={user.firstName || "User"} 
                                                        className="rounded-full border-4 border-indigo-100 dark:border-indigo-900"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-2xl border-4 border-indigo-100 dark:border-indigo-900">
                                                        {user.firstName?.[0] || user.lastName?.[0] || "U"}
                                                    </div>
                                                )}
                                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
                                                </h3>
                                                {user.publicMetadata?.role && (
                                                    <span className="mt-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
                                                        {user.publicMetadata.role}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {/* User Details */}
                                            <div className="space-y-4">
                                                {/* Email */}
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                        Email Address
                                                    </label>
                                                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                                                        {user.primaryEmailAddress?.emailAddress || 'Not provided'}
                                                    </p>
                                                    {user.primaryEmailAddress?.verification?.status && (
                                                        <span className={`inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                                                            user.primaryEmailAddress.verification.status === 'verified' 
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                        }`}>
                                                            {user.primaryEmailAddress.verification.status === 'verified' ? '✓ Verified' : '⚠ Unverified'}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* Phone Number */}
                                                {user.primaryPhoneNumber && (
                                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Phone Number
                                                        </label>
                                                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                                                            {user.primaryPhoneNumber.phoneNumber}
                                                        </p>
                                                        {user.primaryPhoneNumber.verification?.status && (
                                                            <span className={`inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                                                                user.primaryPhoneNumber.verification.status === 'verified' 
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                            }`}>
                                                                {user.primaryPhoneNumber.verification.status === 'verified' ? '✓ Verified' : '⚠ Unverified'}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {/* User ID */}
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                        User ID
                                                    </label>
                                                    <p className="text-gray-900 dark:text-gray-100 font-mono text-sm break-all">
                                                        {user.id}
                                                    </p>
                                                </div>
                                                
                                                {/* Account Created */}
                                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                        Member Since
                                                    </label>
                                                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        }) : 'Unknown'}
                                                    </p>
                                                </div>
                                                
                                                {/* Last Sign In */}
                                                {user.lastSignInAt && (
                                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Last Sign In
                                                        </label>
                                                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                                                            {new Date(user.lastSignInAt).toLocaleString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                )}
                                                
                                                {/* Course Progress in Modal */}
                                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                        Learning Progress
                                                    </label>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Courses Completed
                                                        </span>
                                                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                            {userCourseList?.length || 0}/5
                                                        </span>
                                                    </div>
                                                    <Progress 
                                                        value={courseProgress} 
                                                        className="h-3 bg-gray-200 dark:bg-gray-700 mb-2"
                                                    />
                                                    <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                                        {Math.round(courseProgress)}% Complete
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <UserIcon size={48} className="mx-auto text-gray-400 mb-4" />
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Loading user information...
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={toggleProfileModal}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                                    >
                                        Close
                                    </button>
                                    
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default TopNavBar