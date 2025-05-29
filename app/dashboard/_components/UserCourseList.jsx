"use client"

import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const { user } = useUser();

  useEffect(() => {
    user && getUserCourses();
  }, [user])

  const getUserCourses = async () => {
    const result = await db.select().from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CourseList.id))
    setCourseList(result);
    setUserCourseList(result);
  }

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10'>
      {/* Responsive Container */}
      <div className='max-w-7xl mx-auto'>
        
        {/* Responsive Title */}
        <div className='mb-6 sm:mb-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-center sm:text-left'>
            My AI Courses
          </h2>
          
          {/* Course Count Badge */}
          {courseList?.length > 0 && (
            <div className='mt-3 flex justify-center sm:justify-start'>
              <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'>
                {courseList.length} {courseList.length === 1 ? 'Course' : 'Courses'}
              </span>
            </div>
          )}
        </div>

        {/* Responsive Grid - Larger cards with minimal gaps */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 sm:gap-3 lg:gap-4'>
          {courseList?.length > 0 ? 
            courseList?.map((course, index) => (
              <div key={index} className='w-full transform scale-100 hover:scale-102 transition-transform duration-200'>
                <CourseCard 
                  course={course} 
                  refreshData={() => getUserCourses()} 
                />
              </div>
            ))
            :
            // Loading Skeleton - Larger cards
            [1, 2, 3, 4].map((item, index) => (
              <div 
                key={index} 
                className='w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg h-[420px] sm:h-[460px] lg:h-[500px]'
              >
                {/* Skeleton Content - Larger */}
                <div className='p-8 space-y-5'>
                  <div className='h-52 sm:h-60 lg:h-64 bg-slate-300 dark:bg-slate-600 rounded animate-pulse'></div>
                  <div className='space-y-4'>
                    <div className='h-6 bg-slate-300 dark:bg-slate-600 rounded animate-pulse'></div>
                    <div className='h-5 bg-slate-300 dark:bg-slate-600 rounded w-4/5 animate-pulse'></div>
                    <div className='h-5 bg-slate-300 dark:bg-slate-600 rounded w-3/5 animate-pulse'></div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Empty State */}
        {courseList?.length === 0 && !user && (
          <div className='text-center py-12 sm:py-16 lg:py-20'>
            <div className='max-w-md mx-auto'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center'>
                <svg className='w-8 h-8 sm:w-10 sm:h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
              </div>
              <h3 className='text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 mb-2'>
                No courses yet
              </h3>
              <p className='text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6'>
                Start your learning journey by creating your first AI-powered course.
              </p>
            </div>
          </div>
        )}

        {/* Show More Button (if needed) */}
        {courseList?.length > 12 && (
          <div className='text-center mt-8 sm:mt-10 lg:mt-12'>
            <button className='inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200'>
              View All Courses
              <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCourseList