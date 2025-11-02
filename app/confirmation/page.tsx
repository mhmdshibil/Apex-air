"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Download, X, Home, Plane, Clock, MapPin, User, Calendar } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const [isDownloading, setIsDownloading] = useState(false)
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  // Get actual booking data from localStorage
  const [bookingData, setBookingData] = useState({
    pnr: "AI7X9K",
    flightNo: "AI 101",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Delhi (DEL)",
    to: "Mumbai (BOM)",
    departTime: "06:30",
    arriveTime: "08:45",
    date: "2024-01-15",
    duration: "2h 15m",
    seat: "12A",
    passenger: "John Doe",
    gate: "A12",
    terminal: "T3",
    aircraft: "Boeing 737",
    price: 4500,
  })

  useEffect(() => {
    // Try to load the actual booking from localStorage
    try {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      const currentBooking = bookingId
        ? bookings.find((b: any) => b.id === bookingId)
        : bookings[bookings.length - 1] // Get the latest booking if no ID provided

      if (currentBooking) {
        // Generate gate and terminal based on flight number
        const gateNumber = Math.floor(10 + Math.random() * 20)
        const gateLetters = ["A", "B", "C", "D"]
        const gateLetter = gateLetters[Math.floor(Math.random() * gateLetters.length)]
        const terminal = ["T1", "T2", "T3"][Math.floor(Math.random() * 3)]

        setBookingData({
          pnr: currentBooking.pnr || "AI7X9K",
          flightNo: currentBooking.flightNo,
          airline: currentBooking.airline,
          logo: currentBooking.logo,
          from: currentBooking.from,
          to: currentBooking.to,
          departTime: currentBooking.departTime,
          arriveTime: currentBooking.arriveTime,
          date: currentBooking.date,
          duration: currentBooking.duration,
          seat: currentBooking.seat || "—",
          passenger: currentBooking.passenger,
          gate: `${gateLetter}${gateNumber}`,
          terminal: terminal,
          aircraft: "Boeing 737", // You could add aircraft to booking data if needed
          price: currentBooking.price,
        })
      }
    } catch (e) {
      console.log("Failed to load booking:", e)
      // Keep default mock data as fallback
    }
  }, [bookingId])

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      // Simulate download
      alert("Ticket downloaded successfully!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated starry background */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="shooting-star" style={{ top: "10%", left: "25%", animationDelay: "1s" }}></div>
      <div className="shooting-star" style={{ top: "60%", left: "75%", animationDelay: "3s" }}></div>
      <div className="shooting-star" style={{ top: "85%", left: "15%", animationDelay: "5s" }}></div>

      {/* Enhanced constellation lines */}
      <div
        className="constellation-line"
        style={{ top: "15%", left: "20%", width: "150px", transform: "rotate(30deg)" }}
      ></div>
      <div
        className="constellation-line"
        style={{ top: "40%", right: "25%", width: "120px", transform: "rotate(-45deg)" }}
      ></div>
      <div
        className="constellation-line"
        style={{ bottom: "25%", left: "30%", width: "100px", transform: "rotate(60deg)" }}
      ></div>
      <div
        className="constellation-line"
        style={{ top: "70%", right: "40%", width: "80px", transform: "rotate(-15deg)" }}
      ></div>

      <div className="absolute top-20 left-20 animate-pulse">
        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-full blur-lg"></div>
          <Plane className="relative w-8 h-8 text-green-400 rotate-45" />
        </div>
      </div>
      <div className="absolute bottom-32 right-20 animate-bounce">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-md"></div>
          <Plane className="relative w-6 h-6 text-cyan-400 -rotate-12" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-[color:color-mix(in_okrgb,var(--gold-500)_30%,transparent)] to-[color:color-mix(in_okrgb,var(--silver-300)_30%,transparent)] rounded-full blur-xl"></div>
              <CheckCircle className="relative w-20 h-20 text-[var(--gold-500)] animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-[var(--gold-500)] via-[var(--silver-300)] to-white bg-clip-text text-transparent">
              Booking Confirmed! ✅
            </h1>
            <p className="text-xl text-[var(--silver-300)]">
              Your flight has been successfully booked. Have a wonderful journey among the stars!
            </p>
          </div>

          {/* Boarding Pass */}
          <Card className="glassmorphism border-2 border-[var(--gold-500)]/30 shadow-2xl shadow-[var(--gold-500)]/20 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-[color:color-mix(in_okrgb,var(--silver-300)_6%,transparent)]"></div>
            <div className="relative">
              {/* Boarding Pass Header */}
              <div className="bg-[color:color-mix(in_okrgb,var(--gold-500)_16%,transparent)] p-6 border-b border-dashed border-[var(--gold-500)]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-full blur-md"></div>
                      <div className="relative text-3xl bg-black/50 rounded-full w-16 h-16 flex items-center justify-center border border-green-400/30">
                        {bookingData.logo}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{bookingData.airline}</h2>
                      <p className="text-green-200">Flight {bookingData.flightNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[var(--silver-300)] text-sm">PNR</div>
                    <div className="text-2xl font-bold text-white font-mono">{bookingData.pnr}</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Flight Details */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Route */}
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">{bookingData.departTime}</div>
                            <div className="text-green-200 text-sm flex items-center gap-1 justify-center">
                              <MapPin className="w-3 h-3" />
                              {bookingData.from}
                            </div>
                          </div>

                          <div className="flex flex-col items-center mx-6">
                            <div className="flex items-center gap-2 text-green-300 mb-2">
                              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
                              <div className="relative">
                                <div className="w-20 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <Plane className="w-6 h-6 rotate-90 text-green-400 animate-pulse" />
                                </div>
                              </div>
                              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                            <div className="text-xs text-green-200 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {bookingData.duration}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">{bookingData.arriveTime}</div>
                            <div className="text-green-200 text-sm flex items-center gap-1 justify-center">
                              <MapPin className="w-3 h-3" />
                              {bookingData.to}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Passenger Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Passenger
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-green-200">Name:</span>
                            <span className="text-white font-semibold">{bookingData.passenger}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Seat:</span>
                            <span className="text-cyan-400 font-bold">{bookingData.seat}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Gate:</span>
                            <span className="text-white">{bookingData.gate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Terminal:</span>
                            <span className="text-white">{bookingData.terminal}</span>
                          </div>
                        </div>
                      </div>

                      {/* Flight Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Flight Info
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-green-200">Date:</span>
                            <span className="text-white">{bookingData.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Aircraft:</span>
                            <span className="text-white">{bookingData.aircraft}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Fare:</span>
                            <span className="text-white font-bold">₹{bookingData.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="lg:col-span-1 flex flex-col items-center justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
                      <div className="relative bg-white p-4 rounded-lg border-2 border-green-400/50 group-hover:border-green-400/80 transition-all duration-300">
                        <div className="w-32 h-32 bg-black rounded grid grid-cols-8 gap-0.5 p-2">
                          {/* Simple QR code pattern */}
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-full h-full ${Math.random() > 0.5 ? "bg-black" : "bg-white"} rounded-sm`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-green-200 text-sm mt-4 text-center">Scan at airport for quick check-in 📱</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-black font-semibold py-3 btn-glow border border-[var(--gold-500)]/60 transition-all duration-300"
            >
              {isDownloading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Downloading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Ticket 📥
                </div>
              )}
            </Button>

            <Button variant="outline" className="border-red-400/50 text-red-400 hover:bg-red-500/20 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel Booking ❌
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10 bg-transparent btn-silver-glow"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home 🏠
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <Card className="glassmorphism border border-[var(--silver-300)]/30 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-600/5 rounded-lg"></div>
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-4">Important Information ℹ️</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-cyan-200 font-medium mb-2">Check-in Guidelines:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Web check-in opens 48 hours before departure</li>
                    <li>• Arrive at airport 2 hours before domestic flights</li>
                    <li>• Carry valid photo ID for verification</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-cyan-200 font-medium mb-2">Baggage Allowance:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Cabin: 7kg (55x35x25 cm)</li>
                    <li>• Check-in: 15kg included</li>
                    <li>• Additional baggage charges apply</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer Stars */}
          <div className="flex items-center justify-center space-x-4 mt-12">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[var(--gold-500)] rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="w-1 h-1 bg-[var(--silver-300)] rounded-full animate-pulse delay-500"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
