'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { SiteVisitTracker } from '@/components/site-visit-tracker'

const HIDE_CHROME_PATHS = ['/login']

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome = pathname && HIDE_CHROME_PATHS.some((p) => pathname.startsWith(p))

  if (hideChrome) {
    return <>{children}</>
  }

  return (
    <>
      <SiteVisitTracker />
      <Navbar />
      <main suppressHydrationWarning className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
