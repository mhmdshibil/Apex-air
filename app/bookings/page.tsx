"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Calendar, MapPin, Download, Mail, Phone } from "lucide-react"
import Link from "next/link"

// Mock booking data
const mockBookings = [
  {
    id: "BK001",
    flightNo: "AI 101",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Delhi (DEL)",
    to: "Mumbai (BOM)",
    departTime: "06:30",
    arriveTime: "08:45",
    date: "2024-01-15",
    duration: "2h 15m",
    price: 4500,
    status: "upcoming",
    passenger: "John Doe",
    seat: "12A",
    pnr: "AI1234567",
    bookingDate: "2024-01-10",
  },
]

export default function BookingsPage() {
  const [filter, setFilter] = useState("all")
  const [bookings, setBookings] = useState<typeof mockBookings>(mockBookings)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookings") || "[]")
      if (Array.isArray(saved)) {
        setBookings([...mockBookings, ...saved])
      }
    } catch (e) {
      console.log("[v0] Failed to load stored bookings:", e)
      setBookings([...mockBookings])
    }
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true
    return booking.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const downloadTicket = (booking: (typeof bookings)[number]) => {
    const canvas = document.createElement("canvas")
    const width = 1200
    const height = 400
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // background
    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, "#06141f")
    grad.addColorStop(1, "#0a2a43")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // ticket card
    ctx.fillStyle = "rgba(0,0,0,0.6)"
    const r = 20
    const drawRounded = (x: number, y: number, w: number, h: number, radius: number) => {
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + w - radius, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
      ctx.lineTo(x + w, y + h - radius)
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
      ctx.lineTo(x + radius, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      ctx.fill()
    }
    drawRounded(40, 40, width - 80, height - 80, r)

    // divider
    ctx.strokeStyle = "rgba(0, 255, 255, 0.35)"
    ctx.setLineDash([8, 8])
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width * 0.55, 60)
    ctx.lineTo(width * 0.55, height - 60)
    ctx.stroke()
    ctx.setLineDash([])

    // text styles
    ctx.fillStyle = "#e6faff"
    ctx.font = "bold 28px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText("Boarding Pass", 70, 90)

    ctx.font = "600 22px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillStyle = "#9fe7ff"
    ctx.fillText(`${booking.airline} • ${booking.flightNo}`, 70, 130)

    // route + times
    ctx.fillStyle = "#e6faff"
    ctx.font = "bold 64px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText(booking.departTime, 70, 210)
    ctx.fillText(booking.arriveTime, 70, 290)

    ctx.font = "20px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillStyle = "#a7f3ff"
    ctx.fillText(booking.from, 300, 200)
    ctx.fillText(booking.to, 300, 280)

    // details right side
    const rightX = width * 0.6
    ctx.fillStyle = "#9fe7ff"
    ctx.font = "bold 22px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText("Passenger", rightX, 120)
    ctx.fillStyle = "#e6faff"
    ctx.font = "600 24px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText(booking.passenger, rightX, 150)

    ctx.fillStyle = "#9fe7ff"
    ctx.font = "bold 22px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText("Seat • PNR", rightX, 200)
    ctx.fillStyle = "#e6faff"
    ctx.font = "600 24px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText(`${booking.seat} • ${booking.pnr}`, rightX, 230)

    ctx.fillStyle = "#9fe7ff"
    ctx.font = "bold 22px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText("Date • Duration", rightX, 280)
    ctx.fillStyle = "#e6faff"
    ctx.font = "600 24px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText(`${booking.date} • ${booking.duration}`, rightX, 310)

    // QR placeholder
    ctx.fillStyle = "#0ff"
    ctx.fillRect(width - 200, height - 200, 120, 120)
    ctx.fillStyle = "#06141f"
    ctx.font = "bold 16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.fillText("QR", width - 152, height - 132)

    // download
    const link = document.createElement("a")
    link.download = `Ticket_${booking.id}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated starry background */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Floating plane animations */}
      <div className="absolute top-20 left-16 animate-pulse">
        <Plane className="w-6 h-6 text-blue-400 rotate-45" />
      </div>
      <div className="absolute bottom-32 right-20 animate-bounce">
        <Plane className="w-5 h-5 text-white/60 -rotate-12" />
      </div>

      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[var(--gold-500)] mb-2">My Bookings 🛄</h1>
              <p className="text-[var(--silver-300)]">Manage your flight bookings and travel history</p>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10 bg-transparent"
              >
                Book New Flight
              </Button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-black"
                  : "border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10"
              }
            >
              All Bookings ({bookings.length})
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
              className={
                filter === "upcoming"
                  ? "bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-black"
                  : "border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10"
              }
            >
              Upcoming ({bookings.filter((b) => b.status === "upcoming").length})
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className={
                filter === "completed"
                  ? "bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-black"
                  : "border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10"
              }
            >
              Completed ({bookings.filter((b) => b.status === "completed").length})
            </Button>
          </div>

          {/* Bookings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <Card
                key={booking.id}
                className="bg-black/40 backdrop-blur-md border-2 border-[var(--gold-500)]/30 hover:border-[var(--gold-500)]/60 shadow-lg shadow-[var(--gold-500)]/10 hover:shadow-[var(--gold-500)]/20 transition-all duration-300 hover:scale-[1.02] p-6"
              >
                {/* Ticket Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{booking.logo}</div>
                    <div>
                      <div className="text-[var(--gold-500)] font-semibold">{booking.airline}</div>
                      <div className="text-[var(--silver-300)] text-sm">{booking.flightNo}</div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} capitalize`}>{booking.status}</Badge>
                </div>

                {/* Route Information */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{booking.departTime}</div>
                    <div className="text-[var(--silver-300)] text-sm">{booking.from}</div>
                  </div>

                  <div className="flex flex-col items-center mx-4">
                    <div className="flex items-center gap-2 text-[var(--silver-300)]">
                      <div className="w-2 h-2 bg-[var(--silver-300)] rounded-full"></div>
                      <Plane className="w-5 h-5 rotate-90" />
                      <div className="w-2 h-2 bg-[var(--silver-300)] rounded-full"></div>
                    </div>
                    <div className="text-xs text-[var(--silver-300)] mt-1">{booking.duration}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{booking.arriveTime}</div>
                    <div className="text-[var(--silver-300)] text-sm">{booking.to}</div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="border-t border-dashed border-[var(--gold-500)]/30 pt-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[var(--silver-300)]" />
                      <span className="text-[var(--silver-300)]">Date:</span>
                      <span className="text-white">{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--silver-300)]" />
                      <span className="text-[var(--silver-300)]">Seat:</span>
                      <span className="text-white">{booking.seat}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="border-t border-dashed border-[var(--gold-500)]/30 pt-4 mb-4">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--silver-300)]">PNR:</span>
                      <span className="text-white font-mono">{booking.pnr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--silver-300)]">Passenger:</span>
                      <span className="text-white">{booking.passenger}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--silver-300)]">Booking ID:</span>
                      <span className="text-white font-mono">{booking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--silver-300)]">Total Fare:</span>
                      <span className="text-white font-bold">₹{booking.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    onClick={() => downloadTicket(booking)}
                    className="flex-1 bg-[var(--gold-500)]/20 hover:bg-[var(--gold-500)]/30 text-[var(--silver-300)] border border-[var(--gold-500)]/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Ticket
                  </Button>
                  {booking.status === "upcoming" && (
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-200 border border-green-400/30"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Check-in
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-gray-600/20 hover:bg-gray-600/30 text-gray-200 border border-gray-400/30"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredBookings.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-2xl font-bold text-white mb-2">No bookings found</h3>
              <p className="text-[var(--silver-300)] mb-6">
                {filter === "all" ? "You haven't made any bookings yet." : `No ${filter} bookings found.`}
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-600)] hover:from-[var(--gold-600)] hover:to-[var(--gold-500)]">
                  Book Your First Flight
                </Button>
              </Link>
            </div>
          )}

          {/* Summary Stats */}
          {filteredBookings.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/30 backdrop-blur-sm border border-[var(--gold-500)]/20 p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {bookings.filter((b) => b.status === "completed").length}
                </div>
                <div className="text-[var(--silver-300)]">Flights Completed</div>
              </Card>
              <Card className="bg-black/30 backdrop-blur-sm border border-[var(--gold-500)]/20 p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {bookings.filter((b) => b.status === "upcoming").length}
                </div>
                <div className="text-[var(--silver-300)]">Upcoming Flights</div>
              </Card>
              <Card className="bg-black/30 backdrop-blur-sm border border-[var(--gold-500)]/20 p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  ₹{bookings.reduce((total, booking) => total + (booking.price || 0), 0).toLocaleString()}
                </div>
                <div className="text-[var(--silver-300)]">Total Spent</div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
