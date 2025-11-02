"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plane, Menu, X, Home, Search, Calendar, User } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/results", label: "Search Flights", icon: Search },
    { href: "/bookings", label: "My Bookings", icon: Calendar },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[var(--gold-500)]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-[var(--silver-300)] transition-colors"
          >
            <div className="relative">
              <Plane className="w-8 h-8 text-[var(--gold-500)] rotate-45" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--gold-500)] rounded-full animate-pulse"></div>
            </div>
            <span className="font-bold font-sans text-3xl tracking-wider">Apex-Air</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-[color:color-mix(in_okrgb,var(--gold-500)_18%,transparent)] text-[var(--silver-300)] border border-[var(--gold-500)]/30"
                      : "text-[var(--silver-300)] hover:text-white hover:bg-[color:color-mix(in_okrgb,var(--gold-500)_10%,transparent)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10 bg-transparent"
              >
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-[var(--silver-300)] hover:text-white hover:bg-[var(--gold-500)]/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--gold-500)]/20 py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-[color:color-mix(in_okrgb,var(--gold-500)_18%,transparent)] text-[var(--silver-300)] border border-[var(--gold-500)]/30"
                        : "text-[var(--silver-300)] hover:text-white hover:bg-[color:color-mix(in_okrgb,var(--gold-500)_10%,transparent)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
              <div className="border-t border-[var(--gold-500)]/20 pt-4 mt-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10 bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
