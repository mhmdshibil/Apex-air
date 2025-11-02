"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, User, Plane } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Animated starry background */}
      <div className="stars absolute inset-0"></div>
      <div className="stars2 absolute inset-0"></div>
      <div className="stars3 absolute inset-0"></div>

      {/* Shooting star animation */}
      <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-32 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>

      {/* Flying airplane */}
      <div className="absolute top-1/4 left-0 animate-bounce">
        <Plane className="w-8 h-8 text-cyan-400 opacity-60 transform rotate-45" />
      </div>

      {/* Main login card with glassmorphism */}
      <Card className="w-full max-w-md mx-4 bg-black/40 backdrop-blur-xl border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-lg"></div>
        <div className="relative p-8">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-400/50">
                <Plane className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Apex Air 
            </h1>
            <p className="text-gray-300 text-sm">Your journey begins among the stars</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-cyan-400/30">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6 mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10 bg-black/50 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-10 bg-black/50 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6 mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="pl-10 bg-black/50 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10 bg-black/50 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-10 bg-black/50 border-cyan-400/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-teal-400/30 hover:shadow-teal-400/50 hover:scale-105 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Continue as Guest
            </Link>
          </div>
        </div>
      </Card>

      {/* Footer twinkling stars */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  )
}
