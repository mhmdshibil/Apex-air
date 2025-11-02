"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Calendar, Users, Plane, Search, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Available locations based on our flight data
const availableLocations = [
  // Indian Cities
  "Delhi (DEL)",
  "Mumbai (BOM)",
  "Cochin (COK)",
  "Bengaluru (BLR)",
  "Hyderabad (HYD)",
  "Thiruvananthapuram (TRV)",
  "Chennai (MAA)",
  "Kozhikode (CCJ)",
  // Middle East
  "Dubai (DXB)",
  "Doha (DOH)",
  "Kuwait (KWI)",
  "Abu Dhabi (AUH)",
  "Muscat (MCT)",
  "Riyadh (RUH)",
  "Sharjah (SHJ)",
  // Asia-Pacific
  "Singapore (SIN)",
  "Kuala Lumpur (KUL)",
  "Bangkok (BKK)",
  "Tokyo (NRT)",
  "Hong Kong (HKG)",
  "Seoul (ICN)",
  "Sydney (SYD)",
  // Europe
  "London (LHR)",
  "Paris (CDG)",
  "Frankfurt (FRA)",
  "Munich (MUC)",
  "Barcelona (BCN)",
  // North America
  "New York (JFK)",
  "Los Angeles (LAX)",
  "Atlanta (ATL)",
  "Toronto (YYZ)",
]

export default function HomePage() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  })
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [filteredFromLocations, setFilteredFromLocations] = useState<string[]>([])
  const [filteredToLocations, setFilteredToLocations] = useState<string[]>([])
  const fromInputRef = useRef<HTMLDivElement>(null)
  const toInputRef = useRef<HTMLDivElement>(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false)
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleFromChange = (value: string) => {
    setSearchData({ ...searchData, from: value })
    if (value.trim()) {
      const filtered = availableLocations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredFromLocations(filtered)
      setShowFromSuggestions(true)
    } else {
      setShowFromSuggestions(false)
    }
  }

  const handleToChange = (value: string) => {
    setSearchData({ ...searchData, to: value })
    if (value.trim()) {
      const filtered = availableLocations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredToLocations(filtered)
      setShowToSuggestions(true)
    } else {
      setShowToSuggestions(false)
    }
  }

  const selectFromLocation = (location: string) => {
    setSearchData({ ...searchData, from: location })
    setShowFromSuggestions(false)
  }

  const selectToLocation = (location: string) => {
    setSearchData({ ...searchData, to: location })
    setShowToSuggestions(false)
  }

  const handleSearch = () => {
    if (searchData.from && searchData.to) {
      const params = new URLSearchParams({
        from: searchData.from,
        to: searchData.to,
        date: searchData.date || new Date().toISOString().split('T')[0],
        passengers: searchData.passengers,
      })
      router.push(`/results?${params.toString()}`)
    } else {
      alert("Please fill in departure and destination cities")
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated starry background */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="shooting-star" style={{ top: "20%", left: "10%", animationDelay: "0s" }}></div>
      <div className="shooting-star" style={{ top: "60%", left: "70%", animationDelay: "2s" }}></div>
      <div className="shooting-star" style={{ top: "80%", left: "30%", animationDelay: "4s" }}></div>

      {/* Constellation lines */}
      <div
        className="constellation-line"
        style={{ top: "25%", left: "15%", width: "100px", transform: "rotate(45deg)" }}
      ></div>
      <div
        className="constellation-line"
        style={{ top: "70%", right: "20%", width: "80px", transform: "rotate(-30deg)" }}
      ></div>
      <div
        className="constellation-line"
        style={{ bottom: "30%", left: "40%", width: "120px", transform: "rotate(15deg)" }}
      ></div>

      <div className="absolute top-20 left-10 animate-pulse">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-md bg-[color:color-mix(in_okrgb,var(--gold-500)_20%,transparent)]"></div>
          <Plane className="relative w-8 h-8 text-[var(--gold-500)] rotate-45" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-bounce">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-cyan-400/10 rounded-full blur-sm bg-[color:color-mix(in_okrgb,var(--silver-300)_20%,transparent)]"></div>
          <Plane className="relative w-6 h-6 text-[color:color-mix(in_okrgb,var(--silver-300)_60%,transparent)] -rotate-12" />
        </div>
      </div>
      <div className="absolute bottom-40 left-1/4 animate-pulse">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-md bg-[color:color-mix(in_okrgb,var(--gold-500)_20%,transparent)]"></div>
          <Plane className="relative w-7 h-7 text-[var(--gold-500)] rotate-12" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-teal-400/30 blur-xl rounded-full w-32 h-8 bg-gradient-to-r from-white via-[var(--silver-300)] to-white bg-clip-text text-transparent"></div>
              <Plane className="relative w-12 h-12 text-[var(--gold-500)] animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 text-balance bg-gradient-to-r from-white via-[var(--silver-300)] to-white bg-clip-text text-transparent font-sans md:text-5xl">
            Find Your Perfect Flight
          </h1>
          <p className="text-xl text-[var(--silver-300)] max-w-2xl mx-auto text-pretty">
            Discover amazing destinations with our premium flight booking experience. Your journey among the stars
            begins here 🌟✈️
          </p>
        </div>

        <Card className="w-full max-w-4xl glassmorphism border-2 border-[var(--gold-500)]/30 shadow-2xl shadow-[var(--gold-500)]/20 p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-600/5 rounded-lg bg-[color:color-mix(in_okrgb,var(--silver-300)_6%,transparent)]"></div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* From */}
              <div className="space-y-2 relative" ref={fromInputRef}>
                <label className="text-sm font-medium text-[var(--silver-300)] flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  From 🛫
                </label>
                <Input
                  placeholder="Departure city"
                  value={searchData.from}
                  onChange={(e) => handleFromChange(e.target.value)}
                  onFocus={() => {
                    if (searchData.from.trim()) {
                      const filtered = availableLocations.filter((location) =>
                        location.toLowerCase().includes(searchData.from.toLowerCase())
                      )
                      setFilteredFromLocations(filtered)
                      setShowFromSuggestions(true)
                    }
                  }}
                  className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-[color:color-mix(in_okrgb,var(--silver-400)_70%,transparent)] focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                />
                {showFromSuggestions && filteredFromLocations.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-black/95 border border-[var(--gold-500)]/50 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredFromLocations.map((location) => (
                      <div
                        key={location}
                        onClick={() => selectFromLocation(location)}
                        className="px-4 py-2 text-white hover:bg-[var(--gold-500)]/20 cursor-pointer transition-colors"
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* To */}
              <div className="space-y-2 relative" ref={toInputRef}>
                <label className="text-sm font-medium text-[var(--silver-300)] flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  To 🛬
                </label>
                <Input
                  placeholder="Destination city"
                  value={searchData.to}
                  onChange={(e) => handleToChange(e.target.value)}
                  onFocus={() => {
                    if (searchData.to.trim()) {
                      const filtered = availableLocations.filter((location) =>
                        location.toLowerCase().includes(searchData.to.toLowerCase())
                      )
                      setFilteredToLocations(filtered)
                      setShowToSuggestions(true)
                    }
                  }}
                  className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-[color:color-mix(in_okrgb,var(--silver-400)_70%,transparent)] focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                />
                {showToSuggestions && filteredToLocations.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-black/95 border border-[var(--gold-500)]/50 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredToLocations.map((location) => (
                      <div
                        key={location}
                        onClick={() => selectToLocation(location)}
                        className="px-4 py-2 text-white hover:bg-[var(--gold-500)]/20 cursor-pointer transition-colors"
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--silver-300)] flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Preferred Date 
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  placeholder="Select preferred date"
                  className="bg-black/50 border-[var(--gold-500)]/50 text-white focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                />
              </div>

              {/* Passengers */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--silver-300)] flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Passengers 👥
                </label>
                <select
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}
                  className="w-full px-3 py-2 bg-black/50 border border-[var(--gold-500)]/50 rounded-md text-white focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:outline-none focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num} className="bg-black">
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-black font-semibold py-4 text-lg btn-glow border border-[var(--gold-500)]/60 transition-all duration-300"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Flights ✈️
            </Button>
            <p className="text-center text-[var(--silver-300)] text-sm mt-3">
              💡 We'll show you flights on all available dates for your selected route
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
          <Card className="glassmorphism border border-[var(--gold-500)]/25 p-6 text-center hover:border-[var(--gold-500)]/45 hover:shadow-lg hover:shadow-[var(--gold-500)]/20 transition-all duration-300 group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🛫</div>
            <h3 className="text-white font-semibold mb-2">Best Prices</h3>
            <p className="text-[var(--silver-300)] text-sm">Compare prices from top airlines and find the best deals</p>
          </Card>

          <Card className="glassmorphism border border-[var(--gold-500)]/25 p-6 text-center hover:border-[var(--gold-500)]/45 hover:shadow-lg hover:shadow-[var(--gold-500)]/20 transition-all duration-300 group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <h3 className="text-white font-semibold mb-2">Instant Booking</h3>
            <p className="text-[var(--silver-300)] text-sm">
              Book your flights instantly with our secure payment system
            </p>
          </Card>

          <Card className="glassmorphism border border-[var(--gold-500)]/25 p-6 text-center hover:border-[var(--gold-500)]/45 hover:shadow-lg hover:shadow-[var(--gold-500)]/20 transition-all duration-300 group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌟</div>
            <h3 className="text-white font-semibold mb-2">Premium Experience</h3>
            <p className="text-[var(--silver-300)] text-sm">
              Enjoy a seamless travel experience from booking to boarding
            </p>
          </Card>
        </div>

        <div className="mt-16 flex items-center space-x-6">
          <div className="flex space-x-2">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[var(--gold-500)] rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="w-1 h-1 bg-[var(--silver-300)] rounded-full animate-pulse delay-500"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
          </div>
          <Link
            href="/login"
            className="text-[var(--gold-500)] hover:text-[var(--gold-600)] transition-colors duration-300 text-sm"
          >
            Sign In / Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
