"use client"
import React, { useState } from 'react'
import SideBar from './_components/SideBar'

function DashboardLayout({ children }) {

  // const [userCourseList,setUserCourseList]=useState([]);
  return (
    // <UserCourseListContext.Provider value={{userCourseList,setUserCourseList}}>
    <div>
      <SideBar />
      {children}
    </div>
    // </UserCourseListContext.Provider>
  )
}

export default DashboardLayout