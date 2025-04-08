"use client"

import { useEffect } from "react"
import Sidebar from "./Sidebar"
import { useThemeStore } from "../../zustand/themeStore"

const Layout = ({ children }) => {
  const { darkMode } = useThemeStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Sidebar />
      <div className="lg:ml-64 p-4 md:p-8">
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  )
}

export default Layout

