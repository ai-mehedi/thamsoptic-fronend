"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin")

  if (isAdminPage) {
    // For admin pages, don't show navigation and footer
    return <>{children}</>
  }

  // For all other pages, show navigation and footer
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
