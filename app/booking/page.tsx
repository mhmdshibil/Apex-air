"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, User, Clock, CreditCard, Shield, Wallet, Building2, MapPin } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

// Mock flight data - Kerala focused flights (same as results page)
const mockFlights = [
  // Sample Delhi to Mumbai flight (kept 1 as requested)
  {
    id: 1,
    flightNo: "AI 615",
    airline: "Air India",
    logo: "🇮🇳",
    from: "kozhikode (CCJ)",
    to: "Cochin (COK)",
    departTime: "09:00",
    arriveTime: "11:15",
    duration: "2h 15m",
    price: 4500,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "meal", "entertainment"],
  },
  // Cochin Domestic Flights
  {
    id: 2,
    flightNo: "6E 425",
    airline: "IndiGo",
    logo: "🔵",
    from: "Cochin (COK)",
    to: "Bengaluru (BLR)",
    departTime: "06:00",
    arriveTime: "07:15",
    duration: "1h 15m",
    price: 3200,
    stops: "Non-stop",
    aircraft: "Airbus A320",  
    amenities: ["wifi", "snack"],
  },
  {
    id: 3,
    flightNo: "SG 142",
    airline: "SpiceJet",
    logo: "🌶️",
    from: "Cochin (COK)",
    to: "Mumbai (BOM)",
    departTime: "08:30",
    arriveTime: "10:50",
    duration: "2h 20m",
    price: 4200,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "snack", "entertainment"],
  },
  {
    id: 4,
    flightNo: "AI 540",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Cochin (COK)",
    to: "Delhi (DEL)",
    departTime: "05:30",
    arriveTime: "08:30",
    duration: "3h 00m",
    price: 5800,
    stops: "Non-stop",
    aircraft: "Airbus A321",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 5,
    flightNo: "UK 543",
    airline: "Vistara",
    logo: "✈️",
    from: "Cochin (COK)",
    to: "Hyderabad (HYD)",
    departTime: "11:15",
    arriveTime: "13:00",
    duration: "1h 45m",
    price: 3600,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    amenities: ["wifi", "meal", "entertainment"],
  },
  // Cochin International Flights
  {
    id: 6,
    flightNo: "EK 532",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "Cochin (COK)",
    to: "Dubai (DXB)",
    departTime: "09:45",
    arriveTime: "12:30",
    duration: "4h 15m",
    price: 17500,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 7,
    flightNo: "QR 516",
    airline: "Qatar Airways",
    logo: "🇶🇦",
    from: "Cochin (COK)",
    to: "Doha (DOH)",
    departTime: "03:15",
    arriveTime: "07:15",
    duration: "4h 00m",
    price: 16500,
    stops: "Non-stop",
    aircraft: "Boeing 787-8",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 8,
    flightNo: "KU 344",
    airline: "Kuwait Airways",
    logo: "🇰🇼",
    from: "Cochin (COK)",
    to: "Kuwait (KWI)",
    departTime: "19:45",
    arriveTime: "00:15+1",
    duration: "4h 30m",
    price: 15800,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 9,
    flightNo: "SQ 522",
    airline: "Singapore Airlines",
    logo: "🇸🇬",
    from: "Cochin (COK)",
    to: "Singapore (SIN)",
    departTime: "22:30",
    arriveTime: "06:00+1",
    duration: "5h 30m",
    price: 24500,
    stops: "Non-stop",
    aircraft: "Boeing 787-10",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 10,
    flightNo: "MH 199",
    airline: "Malaysia Airlines",
    logo: "🇲🇾",
    from: "Cochin (COK)",
    to: "Kozhikode (CCJ)",
    departTime: "03:45",
    arriveTime: "11:45",
    duration: "5h 00m",
    price: 22000,
    stops: "Non-stop",
    aircraft: "Airbus A330",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  // Thiruvananthapuram Flights
  {
    id: 11,
    flightNo: "AI 566",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Thiruvananthapuram (TRV)",
    to: "Chennai (MAA)",
    departTime: "09:30",
    arriveTime: "10:45",
    duration: "1h 15m",
    price: 2800,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  {
    id: 12,
    flightNo: "UK 622",
    airline: "Vistara",
    logo: "✈️",
    from: "Thiruvananthapuram (TRV)",
    to: "Delhi (DEL)",
    departTime: "06:00",
    arriveTime: "09:05",
    duration: "3h 05m",
    price: 5900,
    stops: "Non-stop",
    aircraft: "Airbus A321neo",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 13,
    flightNo: "SG 286",
    airline: "SpiceJet",
    logo: "🌶️",
    from: "Thiruvananthapuram (TRV)",
    to: "Bengaluru (BLR)",
    departTime: "14:30",
    arriveTime: "15:40",
    duration: "1h 10m",
    price: 3100,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "snack"],
  },
  {
    id: 14,
    flightNo: "EY 285",
    airline: "Etihad Airways",
    logo: "🇦🇪",
    from: "Thiruvananthapuram (TRV)",
    to: "Abu Dhabi (AUH)",
    departTime: "20:45",
    arriveTime: "23:50",
    duration: "4h 05m",
    price: 16200,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  {
    id: 15,
    flightNo: "WY 249",
    airline: "Oman Air",
    logo: "🇴🇲",
    from: "Thiruvananthapuram (TRV)",
    to: "Muscat (MCT)",
    departTime: "15:00",
    arriveTime: "17:50",
    duration: "3h 50m",
    price: 13200,
    stops: "Non-stop",
    aircraft: "Boeing 737 MAX",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 16,
    flightNo: "SV 779",
    airline: "Saudia",
    logo: "🇸🇦",
    from: "Thiruvananthapuram (TRV)",
    to: "Riyadh (RUH)",
    departTime: "22:00",
    arriveTime: "01:00+1",
    duration: "5h 00m",
    price: 19200,
    stops: "Non-stop",
    aircraft: "Airbus A330",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  // Kozhikode Flights
  {
    id: 17,
    flightNo: "SG 144",
    airline: "SpiceJet",
    logo: "🌶️",
    from: "Kozhikode (CCJ)",
    to: "Mumbai (BOM)",
    departTime: "13:15",
    arriveTime: "15:30",
    duration: "2h 15m",
    price: 4100,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "snack", "entertainment"],
  },
  {
    id: 18,
    flightNo: "6E 428",
    airline: "IndiGo",
    logo: "🔵",
    from: "Kozhikode (CCJ)",
    to: "Bengaluru (BLR)",
    departTime: "16:45",
    arriveTime: "18:00",
    duration: "1h 15m",
    price: 3300,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    amenities: ["wifi", "snack"],
  },
  {
    id: 19,
    flightNo: "QR 518",
    airline: "Qatar Airways",
    logo: "🇶🇦",
    from: "Kozhikode (CCJ)",
    to: "Doha (DOH)",
    departTime: "04:00",
    arriveTime: "08:05",
    duration: "4h 05m",
    price: 16800,
    stops: "Non-stop",
    aircraft: "Airbus A350",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 20,
    flightNo: "AI 934",
    airline: "Air India Express",
    logo: "🇮🇳",
    from: "Kozhikode (CCJ)",
    to: "Dubai (DXB)",
    departTime: "14:20",
    arriveTime: "16:35",
    duration: "4h 15m",
    price: 14500,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 21,
    flightNo: "G9 452",
    airline: "Air Arabia",
    logo: "🇦🇪",
    from: "Kozhikode (CCJ)",
    to: "Sharjah (SHJ)",
    departTime: "08:00",
    arriveTime: "10:00",
    duration: "4h 00m",
    price: 12500,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  // Additional flights for better coverage (second flights for each route)
  {
    id: 22,
    flightNo: "AI 617",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Delhi (DEL)",
    to: "Mumbai (BOM)",
    departTime: "16:30",
    arriveTime: "18:45",
    duration: "2h 15m",
    price: 4800,
    stops: "Non-stop",
    aircraft: "Airbus A321",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 23,
    flightNo: "SG 147",
    airline: "SpiceJet",
    logo: "🌶️",
    from: "Cochin (COK)",
    to: "Bengaluru (BLR)",
    departTime: "14:30",
    arriveTime: "15:45",
    duration: "1h 15m",
    price: 3400,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "snack"],
  },
  {
    id: 24,
    flightNo: "6E 241",
    airline: "IndiGo",
    logo: "🔵",
    from: "Cochin (COK)",
    to: "Mumbai (BOM)",
    departTime: "18:00",
    arriveTime: "20:20",
    duration: "2h 20m",
    price: 4500,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    amenities: ["wifi", "snack", "entertainment"],
  },
  {
    id: 25,
    flightNo: "UK 545",
    airline: "Vistara",
    logo: "✈️",
    from: "Cochin (COK)",
    to: "Delhi (DEL)",
    departTime: "15:45",
    arriveTime: "18:45",
    duration: "3h 00m",
    price: 6200,
    stops: "Non-stop",
    aircraft: "Boeing 787",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  {
    id: 26,
    flightNo: "6E 544",
    airline: "IndiGo",
    logo: "🔵",
    from: "Cochin (COK)",
    to: "Hyderabad (HYD)",
    departTime: "07:30",
    arriveTime: "09:15",
    duration: "1h 45m",
    price: 3400,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  {
    id: 27,
    flightNo: "AI 937",
    airline: "Air India Express",
    logo: "🇮🇳",
    from: "Cochin (COK)",
    to: "Dubai (DXB)",
    departTime: "21:15",
    arriveTime: "00:00+1",
    duration: "4h 15m",
    price: 16800,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 28,
    flightNo: "WY 244",
    airline: "Oman Air",
    logo: "🇴🇲",
    from: "Cochin (COK)",
    to: "Doha (DOH)",
    departTime: "14:00",
    arriveTime: "18:00",
    duration: "4h 00m",
    price: 17000,
    stops: "Non-stop",
    aircraft: "Airbus A330",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 29,
    flightNo: "EY 286",
    airline: "Etihad Airways",
    logo: "🇦🇪",
    from: "Cochin (COK)",
    to: "Kuwait (KWI)",
    departTime: "10:30",
    arriveTime: "15:00",
    duration: "4h 30m",
    price: 16200,
    stops: "Non-stop",
    aircraft: "Boeing 787",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  {
    id: 30,
    flightNo: "TK 722",
    airline: "Turkish Airlines",
    logo: "🇹🇷",
    from: "Cochin (COK)",
    to: "Singapore (SIN)",
    departTime: "10:15",
    arriveTime: "17:45",
    duration: "5h 30m",
    price: 26000,
    stops: "Non-stop",
    aircraft: "Airbus A350",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 31,
    flightNo: "SQ 524",
    airline: "Singapore Airlines",
    logo: "🇸🇬",
    from: "Cochin (COK)",
    to: "Kuala Lumpur (KUL)",
    departTime: "16:30",
    arriveTime: "00:30+1",
    duration: "5h 00m",
    price: 23500,
    stops: "Non-stop",
    aircraft: "Boeing 777",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 32,
    flightNo: "6E 568",
    airline: "IndiGo",
    logo: "🔵",
    from: "Thiruvananthapuram (TRV)",
    to: "Chennai (MAA)",
    departTime: "15:45",
    arriveTime: "17:00",
    duration: "1h 15m",
    price: 3000,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    amenities: ["wifi", "snack"],
  },
  {
    id: 33,
    flightNo: "AI 624",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Thiruvananthapuram (TRV)",
    to: "Delhi (DEL)",
    departTime: "18:30",
    arriveTime: "21:35",
    duration: "3h 05m",
    price: 6100,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 34,
    flightNo: "6E 288",
    airline: "IndiGo",
    logo: "🔵",
    from: "Thiruvananthapuram (TRV)",
    to: "Bengaluru (BLR)",
    departTime: "07:15",
    arriveTime: "08:25",
    duration: "1h 10m",
    price: 2950,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  {
    id: 35,
    flightNo: "FZ 427",
    airline: "Fly Dubai",
    logo: "🇦🇪",
    from: "Thiruvananthapuram (TRV)",
    to: "Abu Dhabi (AUH)",
    departTime: "08:30",
    arriveTime: "11:35",
    duration: "4h 05m",
    price: 15500,
    stops: "Non-stop",
    aircraft: "Boeing 737 MAX",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 36,
    flightNo: "IX 443",
    airline: "Air India Express",
    logo: "🇮🇳",
    from: "Thiruvananthapuram (TRV)",
    to: "Muscat (MCT)",
    departTime: "22:30",
    arriveTime: "01:20+1",
    duration: "3h 50m",
    price: 12800,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 37,
    flightNo: "FZ 579",
    airline: "Fly Dubai",
    logo: "🇦🇪",
    from: "Thiruvananthapuram (TRV)",
    to: "Riyadh (RUH)",
    departTime: "03:15",
    arriveTime: "06:15",
    duration: "5h 00m",
    price: 18500,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 38,
    flightNo: "6E 146",
    airline: "IndiGo",
    logo: "🔵",
    from: "Kozhikode (CCJ)",
    to: "Mumbai (BOM)",
    departTime: "06:30",
    arriveTime: "08:45",
    duration: "2h 15m",
    price: 3900,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    amenities: ["wifi", "snack"],
  },
  {
    id: 39,
    flightNo: "AI 582",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Kozhikode (CCJ)",
    to: "Bengaluru (BLR)",
    departTime: "09:00",
    arriveTime: "10:15",
    duration: "1h 15m",
    price: 3150,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  {
    id: 40,
    flightNo: "EK 534",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "Kozhikode (CCJ)",
    to: "Doha (DOH)",
    departTime: "16:30",
    arriveTime: "20:35",
    duration: "4h 05m",
    price: 17200,
    stops: "Non-stop",
    aircraft: "Boeing 777",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 41,
    flightNo: "FZ 435",
    airline: "Fly Dubai",
    logo: "🇦🇪",
    from: "Kozhikode (CCJ)",
    to: "Dubai (DXB)",
    departTime: "22:00",
    arriveTime: "00:15+1",
    duration: "4h 15m",
    price: 13800,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 42,
    flightNo: "IX 441",
    airline: "Air India Express",
    logo: "🇮🇳",
    from: "Kozhikode (CCJ)",
    to: "Sharjah (SHJ)",
    departTime: "19:15",
    arriveTime: "21:15",
    duration: "4h 00m",
    price: 11800,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "snack"],
  },
  // Additional cross-Kerala routes
  {
    id: 43,
    flightNo: "6E 755",
    airline: "IndiGo",
    logo: "🔵",
    from: "Cochin (COK)",
    to: "Chennai (MAA)",
    departTime: "12:00",
    arriveTime: "13:15",
    duration: "1h 15m",
    price: 3100,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  {
    id: 44,
    flightNo: "SG 244",
    airline: "SpiceJet",
    logo: "🌶️",
    from: "Cochin (COK)",
    to: "Chennai (MAA)",
    departTime: "19:30",
    arriveTime: "20:45",
    duration: "1h 15m",
    price: 3300,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "snack"],
  },
  {
    id: 45,
    flightNo: "AI 571",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Thiruvananthapuram (TRV)",
    to: "Mumbai (BOM)",
    departTime: "11:00",
    arriveTime: "13:20",
    duration: "2h 20m",
    price: 4600,
    stops: "Non-stop",
    aircraft: "Airbus A321",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 46,
    flightNo: "UK 624",
    airline: "Vistara",
    logo: "✈️",
    from: "Thiruvananthapuram (TRV)",
    to: "Mumbai (BOM)",
    departTime: "16:45",
    arriveTime: "19:05",
    duration: "2h 20m",
    price: 5100,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  {
    id: 47,
    flightNo: "UK 646",
    airline: "Vistara",
    logo: "✈️",
    from: "Kozhikode (CCJ)",
    to: "Delhi (DEL)",
    departTime: "12:30",
    arriveTime: "15:35",
    duration: "3h 05m",
    price: 6300,
    stops: "Non-stop",
    aircraft: "Airbus A321neo",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  {
    id: 48,
    flightNo: "AI 584",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Kozhikode (CCJ)",
    to: "Delhi (DEL)",
    departTime: "05:15",
    arriveTime: "08:20",
    duration: "3h 05m",
    price: 5800,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 49,
    flightNo: "SG 248",
    airline: "SpiceJet",
    logo: "🌶️",
    from: "Thiruvananthapuram (TRV)",
    to: "Hyderabad (HYD)",
    departTime: "10:15",
    arriveTime: "12:00",
    duration: "1h 45m",
    price: 3700,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "snack"],
  },
  {
    id: 50,
    flightNo: "6E 649",
    airline: "IndiGo",
    logo: "🔵",
    from: "Thiruvananthapuram (TRV)",
    to: "Hyderabad (HYD)",
    departTime: "17:30",
    arriveTime: "19:15",
    duration: "1h 45m",
    price: 3500,
    stops: "Non-stop",
    aircraft: "Airbus A320neo",
    amenities: ["wifi", "snack"],
  },
  {
    id: 51,
    flightNo: "UK 448",
    airline: "Vistara",
    logo: "✈️",
    from: "Kozhikode (CCJ)",
    to: "Hyderabad (HYD)",
    departTime: "13:45",
    arriveTime: "15:30",
    duration: "1h 45m",
    price: 3800,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 52,
    flightNo: "AI 586",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Kozhikode (CCJ)",
    to: "Hyderabad (HYD)",
    departTime: "07:00",
    arriveTime: "08:45",
    duration: "1h 45m",
    price: 3600,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  // More international routes
  {
    id: 53,
    flightNo: "AI 939",
    airline: "Air India Express",
    logo: "🇮🇳",
    from: "Cochin (COK)",
    to: "Abu Dhabi (AUH)",
    departTime: "01:30",
    arriveTime: "04:00",
    duration: "4h 30m",
    price: 15900,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 54,
    flightNo: "IX 447",
    airline: "Air India Express",
    logo: "🇮🇳",
    from: "Cochin (COK)",
    to: "Muscat (MCT)",
    departTime: "06:45",
    arriveTime: "09:35",
    duration: "3h 50m",
    price: 13800,
    stops: "Non-stop",
    aircraft: "Boeing 737",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 55,
    flightNo: "SV 774",
    airline: "Saudia",
    logo: "🇸🇦",
    from: "Cochin (COK)",
    to: "Riyadh (RUH)",
    departTime: "04:00",
    arriveTime: "06:45",
    duration: "4h 45m",
    price: 18800,
    stops: "Non-stop",
    aircraft: "Boeing 777",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  {
    id: 56,
    flightNo: "IX 449",
    airline: "Air India Express",
    logo: "🇮🇳",
    from: "Cochin (COK)",
    to: "Sharjah (SHJ)",
    departTime: "17:30",
    arriveTime: "20:00",
    duration: "4h 30m",
    price: 14200,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 57,
    flightNo: "EK 536",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "Thiruvananthapuram (TRV)",
    to: "Dubai (DXB)",
    departTime: "10:15",
    arriveTime: "13:00",
    duration: "4h 15m",
    price: 17200,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 58,
    flightNo: "FZ 429",
    airline: "Fly Dubai",
    logo: "🇦🇪",
    from: "Thiruvananthapuram (TRV)",
    to: "Dubai (DXB)",
    departTime: "01:45",
    arriveTime: "04:30",
    duration: "4h 15m",
    price: 15800,
    stops: "Non-stop",
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 59,
    flightNo: "QR 520",
    airline: "Qatar Airways",
    logo: "🇶🇦",
    from: "Thiruvananthapuram (TRV)",
    to: "Doha (DOH)",
    departTime: "05:30",
    arriveTime: "09:30",
    duration: "4h 00m",
    price: 16800,
    stops: "Non-stop",
    aircraft: "Airbus A350",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 60,
    flightNo: "GF 274",
    airline: "Gulf Air",
    logo: "🇧🇭",
    from: "Thiruvananthapuram (TRV)",
    to: "Sharjah (SHJ)",
    departTime: "12:30",
    arriveTime: "15:00",
    duration: "4h 30m",
    price: 13500,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "meal", "entertainment"],
  },
  // Popular International Routes - Most Booked Worldwide
  // USA Routes
  {
    id: 61,
    flightNo: "UA 82",
    airline: "United Airlines",
    logo: "🇺🇸",
    from: "New York (JFK)",
    to: "London (LHR)",
    departTime: "20:00",
    arriveTime: "08:15+1",
    duration: "7h 15m",
    price: 45000,
    stops: "Non-stop",
    aircraft: "Boeing 777-200",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 62,
    flightNo: "BA 178",
    airline: "British Airways",
    logo: "🇬🇧",
    from: "New York (JFK)",
    to: "London (LHR)",
    departTime: "22:30",
    arriveTime: "10:45+1",
    duration: "7h 15m",
    price: 48000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 63,
    flightNo: "AA 50",
    airline: "American Airlines",
    logo: "🇺🇸",
    from: "Los Angeles (LAX)",
    to: "Tokyo (NRT)",
    departTime: "11:30",
    arriveTime: "15:30+1",
    duration: "11h 00m",
    price: 62000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 64,
    flightNo: "NH 6",
    airline: "ANA",
    logo: "🇯🇵",
    from: "Los Angeles (LAX)",
    to: "Tokyo (NRT)",
    departTime: "13:00",
    arriveTime: "17:00+1",
    duration: "11h 00m",
    price: 65000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 65,
    flightNo: "DL 468",
    airline: "Delta Airlines",
    logo: "🇺🇸",
    from: "New York (JFK)",
    to: "Paris (CDG)",
    departTime: "18:45",
    arriveTime: "08:30+1",
    duration: "7h 45m",
    price: 52000,
    stops: "Non-stop",
    aircraft: "Airbus A330-300",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 66,
    flightNo: "AF 8",
    airline: "Air France",
    logo: "🇫🇷",
    from: "New York (JFK)",
    to: "Paris (CDG)",
    departTime: "19:30",
    arriveTime: "09:15+1",
    duration: "7h 45m",
    price: 54000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  // Europe Routes
  {
    id: 67,
    flightNo: "LH 400",
    airline: "Lufthansa",
    logo: "🇩🇪",
    from: "Frankfurt (FRA)",
    to: "New York (JFK)",
    departTime: "10:00",
    arriveTime: "13:30",
    duration: "9h 30m",
    price: 47000,
    stops: "Non-stop",
    aircraft: "Airbus A380",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 68,
    flightNo: "UA 960",
    airline: "United Airlines",
    logo: "🇺🇸",
    from: "Frankfurt (FRA)",
    to: "New York (JFK)",
    departTime: "11:15",
    arriveTime: "14:45",
    duration: "9h 30m",
    price: 46000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 69,
    flightNo: "BA 142",
    airline: "British Airways",
    logo: "🇬🇧",
    from: "London (LHR)",
    to: "Dubai (DXB)",
    departTime: "14:30",
    arriveTime: "00:45+1",
    duration: "7h 15m",
    price: 38000,
    stops: "Non-stop",
    aircraft: "Airbus A380",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 70,
    flightNo: "EK 2",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "London (LHR)",
    to: "Dubai (DXB)",
    departTime: "15:00",
    arriveTime: "01:15+1",
    duration: "7h 15m",
    price: 40000,
    stops: "Non-stop",
    aircraft: "Airbus A380",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 71,
    flightNo: "AF 1381",
    airline: "Air France",
    logo: "🇫🇷",
    from: "Paris (CDG)",
    to: "Barcelona (BCN)",
    departTime: "09:00",
    arriveTime: "11:00",
    duration: "2h 00m",
    price: 12000,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "meal", "entertainment"],
  },
  {
    id: 72,
    flightNo: "VY 8001",
    airline: "Vueling",
    logo: "🇪🇸",
    from: "Paris (CDG)",
    to: "Barcelona (BCN)",
    departTime: "13:30",
    arriveTime: "15:30",
    duration: "2h 00m",
    price: 10500,
    stops: "Non-stop",
    aircraft: "Airbus A320",
    amenities: ["wifi", "snack"],
  },
  // Asia-Pacific Routes
  {
    id: 73,
    flightNo: "SQ 11",
    airline: "Singapore Airlines",
    logo: "🇸🇬",
    from: "Singapore (SIN)",
    to: "London (LHR)",
    departTime: "23:00",
    arriveTime: "06:15+1",
    duration: "13h 15m",
    price: 72000,
    stops: "Non-stop",
    aircraft: "Airbus A350-900",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 74,
    flightNo: "BA 12",
    airline: "British Airways",
    logo: "🇬🇧",
    from: "Singapore (SIN)",
    to: "London (LHR)",
    departTime: "22:30",
    arriveTime: "05:45+1",
    duration: "13h 15m",
    price: 70000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 75,
    flightNo: "QF 10",
    airline: "Qantas",
    logo: "🇦🇺",
    from: "Sydney (SYD)",
    to: "London (LHR)",
    departTime: "17:45",
    arriveTime: "05:30+1",
    duration: "22h 45m",
    price: 95000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 76,
    flightNo: "BA 16",
    airline: "British Airways",
    logo: "🇬🇧",
    from: "Sydney (SYD)",
    to: "London (LHR)",
    departTime: "18:30",
    arriveTime: "06:15+1",
    duration: "22h 45m",
    price: 98000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 77,
    flightNo: "CX 888",
    airline: "Cathay Pacific",
    logo: "🇭🇰",
    from: "Hong Kong (HKG)",
    to: "New York (JFK)",
    departTime: "16:30",
    arriveTime: "19:45",
    duration: "15h 15m",
    price: 78000,
    stops: "Non-stop",
    aircraft: "Airbus A350-1000",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 78,
    flightNo: "AA 125",
    airline: "American Airlines",
    logo: "🇺🇸",
    from: "Hong Kong (HKG)",
    to: "New York (JFK)",
    departTime: "15:45",
    arriveTime: "19:00",
    duration: "15h 15m",
    price: 76000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  // Middle East Routes
  {
    id: 79,
    flightNo: "EK 225",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "Dubai (DXB)",
    to: "New York (JFK)",
    departTime: "08:30",
    arriveTime: "14:45",
    duration: "14h 15m",
    price: 68000,
    stops: "Non-stop",
    aircraft: "Airbus A380",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 80,
    flightNo: "EK 201",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "Dubai (DXB)",
    to: "New York (JFK)",
    departTime: "02:30",
    arriveTime: "08:45",
    duration: "14h 15m",
    price: 66000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 81,
    flightNo: "QR 702",
    airline: "Qatar Airways",
    logo: "🇶🇦",
    from: "Doha (DOH)",
    to: "New York (JFK)",
    departTime: "08:00",
    arriveTime: "15:15",
    duration: "14h 15m",
    price: 67000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 82,
    flightNo: "QR 704",
    airline: "Qatar Airways",
    logo: "🇶🇦",
    from: "Doha (DOH)",
    to: "New York (JFK)",
    departTime: "01:45",
    arriveTime: "09:00",
    duration: "14h 15m",
    price: 65000,
    stops: "Non-stop",
    aircraft: "Airbus A350-1000",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  // Popular Asian Routes
  {
    id: 83,
    flightNo: "AI 191",
    airline: "Air India",
    logo: "🇮🇳",
    from: "Delhi (DEL)",
    to: "London (LHR)",
    departTime: "02:00",
    arriveTime: "07:00",
    duration: "9h 00m",
    price: 42000,
    stops: "Non-stop",
    aircraft: "Boeing 787-8",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 84,
    flightNo: "BA 142",
    airline: "British Airways",
    logo: "🇬🇧",
    from: "Delhi (DEL)",
    to: "London (LHR)",
    departTime: "03:15",
    arriveTime: "08:15",
    duration: "9h 00m",
    price: 44000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 85,
    flightNo: "TG 316",
    airline: "Thai Airways",
    logo: "🇹🇭",
    from: "Bangkok (BKK)",
    to: "Singapore (SIN)",
    departTime: "10:30",
    arriveTime: "14:00",
    duration: "2h 30m",
    price: 15000,
    stops: "Non-stop",
    aircraft: "Airbus A330",
    amenities: ["wifi", "meal", "entertainment", "premium"],
  },
  {
    id: 86,
    flightNo: "SQ 972",
    airline: "Singapore Airlines",
    logo: "🇸🇬",
    from: "Bangkok (BKK)",
    to: "Singapore (SIN)",
    departTime: "12:15",
    arriveTime: "15:45",
    duration: "2h 30m",
    price: 16000,
    stops: "Non-stop",
    aircraft: "Boeing 787-10",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 87,
    flightNo: "JL 5",
    airline: "Japan Airlines",
    logo: "🇯🇵",
    from: "Tokyo (NRT)",
    to: "Los Angeles (LAX)",
    departTime: "16:45",
    arriveTime: "10:30",
    duration: "10h 45m",
    price: 64000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 88,
    flightNo: "UA 32",
    airline: "United Airlines",
    logo: "🇺🇸",
    from: "Tokyo (NRT)",
    to: "Los Angeles (LAX)",
    departTime: "18:00",
    arriveTime: "11:45",
    duration: "10h 45m",
    price: 62000,
    stops: "Non-stop",
    aircraft: "Boeing 787-10",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  // Additional Popular Routes
  {
    id: 89,
    flightNo: "DL 159",
    airline: "Delta Airlines",
    logo: "🇺🇸",
    from: "Atlanta (ATL)",
    to: "London (LHR)",
    departTime: "18:15",
    arriveTime: "07:45+1",
    duration: "8h 30m",
    price: 43000,
    stops: "Non-stop",
    aircraft: "Airbus A350-900",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 90,
    flightNo: "VS 104",
    airline: "Virgin Atlantic",
    logo: "🇬🇧",
    from: "Atlanta (ATL)",
    to: "London (LHR)",
    departTime: "19:30",
    arriveTime: "09:00+1",
    duration: "8h 30m",
    price: 45000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 91,
    flightNo: "EK 142",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "Dubai (DXB)",
    to: "Singapore (SIN)",
    departTime: "10:00",
    arriveTime: "21:30",
    duration: "7h 30m",
    price: 38000,
    stops: "Non-stop",
    aircraft: "Airbus A380",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 92,
    flightNo: "SQ 434",
    airline: "Singapore Airlines",
    logo: "🇸🇬",
    from: "Dubai (DXB)",
    to: "Singapore (SIN)",
    departTime: "09:15",
    arriveTime: "20:45",
    duration: "7h 30m",
    price: 39000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 93,
    flightNo: "LH 454",
    airline: "Lufthansa",
    logo: "🇩🇪",
    from: "Munich (MUC)",
    to: "Dubai (DXB)",
    departTime: "21:00",
    arriveTime: "06:00+1",
    duration: "6h 00m",
    price: 35000,
    stops: "Non-stop",
    aircraft: "Airbus A350-900",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 94,
    flightNo: "EK 52",
    airline: "Emirates",
    logo: "🇦🇪",
    from: "Munich (MUC)",
    to: "Dubai (DXB)",
    departTime: "14:30",
    arriveTime: "23:30",
    duration: "6h 00m",
    price: 36000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 95,
    flightNo: "AC 850",
    airline: "Air Canada",
    logo: "🇨🇦",
    from: "Toronto (YYZ)",
    to: "London (LHR)",
    departTime: "21:00",
    arriveTime: "09:15+1",
    duration: "7h 15m",
    price: 46000,
    stops: "Non-stop",
    aircraft: "Boeing 787-9",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 96,
    flightNo: "BA 92",
    airline: "British Airways",
    logo: "🇬🇧",
    from: "Toronto (YYZ)",
    to: "London (LHR)",
    departTime: "20:30",
    arriveTime: "08:45+1",
    duration: "7h 15m",
    price: 48000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 97,
    flightNo: "KE 82",
    airline: "Korean Air",
    logo: "🇰🇷",
    from: "Seoul (ICN)",
    to: "Los Angeles (LAX)",
    departTime: "13:00",
    arriveTime: "08:30",
    duration: "11h 30m",
    price: 63000,
    stops: "Non-stop",
    aircraft: "Boeing 777-300ER",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 98,
    flightNo: "OZ 202",
    airline: "Asiana Airlines",
    logo: "🇰🇷",
    from: "Seoul (ICN)",
    to: "Los Angeles (LAX)",
    departTime: "14:30",
    arriveTime: "10:00",
    duration: "11h 30m",
    price: 61000,
    stops: "Non-stop",
    aircraft: "Airbus A350-900",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 99,
    flightNo: "QF 1",
    airline: "Qantas",
    logo: "🇦🇺",
    from: "Sydney (SYD)",
    to: "Singapore (SIN)",
    departTime: "11:35",
    arriveTime: "17:35",
    duration: "8h 00m",
    price: 42000,
    stops: "Non-stop",
    aircraft: "Airbus A380",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
  {
    id: 100,
    flightNo: "SQ 232",
    airline: "Singapore Airlines",
    logo: "🇸🇬",
    from: "Sydney (SYD)",
    to: "Singapore (SIN)",
    departTime: "13:00",
    arriveTime: "19:00",
    duration: "8h 00m",
    price: 44000,
    stops: "Non-stop",
    aircraft: "Airbus A380",
    amenities: ["wifi", "meal", "entertainment", "premium", "lie-flat"],
  },
]

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const flightId = searchParams.get("flight")
  const flight = mockFlights.find((f) => f.id === Number.parseInt(flightId || "1")) || mockFlights[0]

  const [passengerData, setPassengerData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    selectedSeat: "",
    email: "",
    phone: "",
    emergencyContact: "",
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const [isBooking, setIsBooking] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [activeTab, setActiveTab] = useState<"passenger" | "seats" | "payment">("passenger")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card")
  const [walletProvider, setWalletProvider] = useState<string>("")
  const [upiId, setUpiId] = useState<string>("")

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isPhoneValid = (phone: string) => {
    return /^\d{10}$/.test(phone)
  }

  const isPassengerValid =
    passengerData.firstName &&
    passengerData.lastName &&
    passengerData.age &&
    passengerData.gender &&
    isEmailValid(passengerData.email) &&
    isPhoneValid(passengerData.phone)

  const isSeatsValid = Boolean(passengerData.selectedSeat)

  const isPaymentValid =
    paymentMethod === "card"
      ? paymentData.cardNumber && paymentData.expiryDate && paymentData.cvv && paymentData.cardholderName
      : paymentMethod === "wallet"
        ? Boolean(walletProvider && upiId && upiId.length > 0)
        : false

  const handleBooking = async () => {
    setIsBooking(true)
    // create a minimal booking record to show on My Bookings
    const newBooking = {
      id: `BK${Math.floor(100 + Math.random() * 900)}`,
      flightNo: flight.flightNo,
      airline: flight.airline,
      logo: flight.logo,
      from: flight.from,
      to: flight.to,
      departTime: flight.departTime,
      arriveTime: flight.arriveTime,
      date: new Date().toISOString().slice(0, 10),
      duration: flight.duration,
      price: flight.price,
      status: "upcoming",
      passenger: `${passengerData.firstName} ${passengerData.lastName}`.trim(),
      seat: passengerData.selectedSeat || "—",
      pnr: `${flight.flightNo.replace(/\s/g, "")}${Math.floor(1000000 + Math.random() * 9000000)}`,
      bookingDate: new Date().toISOString().slice(0, 10),
    }

    try {
      const existing = JSON.parse(localStorage.getItem("bookings") || "[]")
      existing.push(newBooking)
      localStorage.setItem("bookings", JSON.stringify(existing))
    } catch (e) {
      console.log("[v0] Failed to persist booking:", e)
    }

    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      // go to confirmation after saving
      // seats + passenger info will already be reflected in My Bookings via localStorage
      // Pass booking ID to confirmation page
      // @ts-ignore
      router.push(`/confirmation?bookingId=${newBooking.id}`)
    }, 1200)
  }

  // Removed auto-switching to give users control over navigation
  // useEffect(() => {
  //   if (activeTab === "passenger" && isPassengerValid) {
  //     const t = setTimeout(() => setActiveTab("seats"), 600)
  //     return () => clearTimeout(t)
  //   }
  // }, [activeTab, isPassengerValid])

  // Generate seat grid (6 seats per row, 20 rows)
  const generateSeatGrid = () => {
    const seats = []
    const occupiedSeats = ["1A", "1B", "3F", "5C", "7A", "7B", "9D", "12F", "15A", "18C"]

    for (let row = 1; row <= 20; row++) {
      const rowSeats = []
      for (const seatLetter of ["A", "B", "C", "D", "E", "F"]) {
        const seatId = `${row}${seatLetter}`
        const isOccupied = occupiedSeats.includes(seatId)
        const isSelected = passengerData.selectedSeat === seatId
        rowSeats.push({ id: seatId, occupied: isOccupied, selected: isSelected })
      }
      seats.push(rowSeats)
    }
    return seats
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated starry background */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="shooting-star" style={{ top: "25%", left: "15%", animationDelay: "0.5s" }}></div>
      <div className="shooting-star" style={{ top: "75%", left: "85%", animationDelay: "2.5s" }}></div>

      <div
        className="constellation-line"
        style={{ top: "20%", right: "25%", width: "100px", transform: "rotate(60deg)" }}
      ></div>
      <div
        className="constellation-line"
        style={{ bottom: "35%", left: "20%", width: "80px", transform: "rotate(-20deg)" }}
      ></div>

      <div className="absolute top-16 right-16 animate-pulse">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-md"></div>
          <Plane className="relative w-6 h-6 text-cyan-400 rotate-45" />
        </div>
      </div>
      <div className="absolute bottom-20 left-16 animate-bounce">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-cyan-400/10 rounded-full blur-sm"></div>
          <Plane className="relative w-5 h-5 text-white/60 -rotate-12" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-[var(--silver-300)] to-white bg-clip-text text-transparent">
              Complete Your Booking ✈️
            </h1>
            <p className="text-[var(--silver-300)]">Just a few more details to secure your flight</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Flight Details Ticket */}
            <div className="lg:col-span-1">
              <Card className="glassmorphism border-2 border-[var(--gold-500)]/30 shadow-2xl shadow-[var(--gold-500)]/20 p-6 sticky top-8">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-600/5 rounded-lg"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-full blur-md"></div>
                      <div className="relative text-3xl bg-black/50 rounded-full w-16 h-16 flex items-center justify-center border border-cyan-400/30 mx-auto mb-3">
                        {flight.logo}
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg">{flight.airline}</h3>
                    <p className="text-[var(--silver-300)]">{flight.flightNo}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--silver-300)] text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          From
                        </p>
                        <p className="text-white font-semibold">{flight.from}</p>
                      </div>
                      <div className="relative">
                        <div className="w-12 h-0.5 bg-[var(--gold-500)]"></div>
                        <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gold-500)] rotate-90" />
                      </div>
                      <div className="text-right">
                        <p className="text-[var(--silver-300)] text-sm flex items-center gap-1 justify-end">
                          <MapPin className="w-3 h-3" />
                          To
                        </p>
                        <p className="text-white font-semibold">{flight.to}</p>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-[var(--gold-500)]/30 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[var(--silver-300)] text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Departure
                          </p>
                          <p className="text-white font-semibold">{flight.departTime}</p>
                        </div>
                        <div>
                          <p className="text-[var(--silver-300)] text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Arrival
                          </p>
                          <p className="text-white font-semibold">{flight.arriveTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-[var(--gold-500)]/30 pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--silver-300)]">Duration:</span>
                        <span className="text-white">{flight.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--silver-300)]">Aircraft:</span>
                        <span className="text-white">{flight.aircraft}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--silver-300)]">Stops:</span>
                        <span className="text-green-400">{flight.stops}</span>
                      </div>
                      {passengerData.selectedSeat && (
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--silver-300)]">Seat:</span>
                          <span className="text-[var(--gold-500)] font-semibold">{passengerData.selectedSeat}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-dashed border-[var(--gold-500)]/30 pt-4">
                      <div className="flex justify-between items-center text-xl">
                        <span className="text-[var(--silver-300)]">Total Fare:</span>
                        <span className="text-white font-bold">₹{flight.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-green-400 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Secure booking with 256-bit encryption</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="glassmorphism border-2 border-[var(--gold-500)]/30 shadow-2xl shadow-[var(--gold-500)]/20 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-600/5 rounded-lg"></div>
                <div className="relative">
                  <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-[var(--gold-500)]/30 mb-8">
                      <TabsTrigger
                        value="passenger"
                        className="data-[state=active]:bg-[var(--gold-500)] data-[state=active]:text-black text-[var(--silver-300)]"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Passenger
                      </TabsTrigger>
                      <TabsTrigger
                        value="seats"
                        className="data-[state=active]:bg-[var(--gold-500)] data-[state=active]:text-black text-[var(--silver-300)]"
                      >
                        💺 Seats
                      </TabsTrigger>
                      <TabsTrigger
                        value="payment"
                        className="data-[state=active]:bg-[var(--gold-500)] data-[state=active]:text-black text-[var(--silver-300)]"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Payment
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="passenger" className="space-y-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Passenger Details</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[var(--silver-300)]">First Name *</label>
                          <Input
                            placeholder="Enter first name"
                            value={passengerData.firstName}
                            onChange={(e) => setPassengerData({ ...passengerData, firstName: e.target.value })}
                            className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[var(--silver-300)]">Last Name *</label>
                          <Input
                            placeholder="Enter last name"
                            value={passengerData.lastName}
                            onChange={(e) => setPassengerData({ ...passengerData, lastName: e.target.value })}
                            className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[var(--silver-300)]">Age *</label>
                          <Input
                            type="number"
                            placeholder="Enter age"
                            value={passengerData.age}
                            onChange={(e) => setPassengerData({ ...passengerData, age: e.target.value })}
                            className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[var(--silver-300)]">Gender *</label>
                          <select
                            value={passengerData.gender}
                            onChange={(e) => setPassengerData({ ...passengerData, gender: e.target.value })}
                            className="w-full px-3 py-2 bg-black/50 border border-[var(--gold-500)]/50 rounded-md text-white focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:outline-none focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                          >
                            <option value="" className="bg-black">
                              Select gender
                            </option>
                            <option value="male" className="bg-black">
                              Male
                            </option>
                            <option value="female" className="bg-black">
                              Female
                            </option>
                            <option value="other" className="bg-black">
                              Other
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="border-t border-[var(--gold-500)]/30 pt-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--silver-300)]">Email *</label>
                            <Input
                              type="email"
                              placeholder="example@email.com"
                              value={passengerData.email}
                              onChange={(e) => setPassengerData({ ...passengerData, email: e.target.value })}
                              className={`bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20 ${
                                passengerData.email && !isEmailValid(passengerData.email)
                                  ? "border-red-500 focus:border-red-500"
                                  : ""
                              }`}
                            />
                            {passengerData.email && !isEmailValid(passengerData.email) && (
                              <p className="text-red-400 text-xs">Please enter a valid email address</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--silver-300)]">Phone Number *</label>
                            <Input
                              type="tel"
                              placeholder="10 digit phone number"
                              value={passengerData.phone}
                              onChange={(e) => setPassengerData({ ...passengerData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                              maxLength={10}
                              className={`bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20 ${
                                passengerData.phone && !isPhoneValid(passengerData.phone)
                                  ? "border-red-500 focus:border-red-500"
                                  : ""
                              }`}
                            />
                            {passengerData.phone && !isPhoneValid(passengerData.phone) && (
                              <p className="text-red-400 text-xs">Please enter a valid 10-digit phone number</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-end gap-3">
                        <Button
                          onClick={() => setActiveTab("seats")}
                          disabled={!isPassengerValid}
                          className="bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-black btn-glow"
                        >
                          Next: Seat Selection
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="seats" className="space-y-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Select Your Seat 💺</h2>

                      <div className="bg-black/30 rounded-lg p-6 border border-[var(--gold-500)]/30">
                        <div className="text-center mb-4">
                          <div className="text-[var(--silver-300)] text-sm mb-2">
                            Aircraft Layout - {flight.aircraft}
                          </div>
                          <div className="flex justify-center gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-500 rounded border border-green-400"></div>
                              <span className="text-green-400">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-[var(--gold-500)] rounded border border-[var(--gold-600)]"></div>
                              <span className="text-[var(--gold-500)]">Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-red-500 rounded border border-red-400"></div>
                              <span className="text-red-400">Occupied</span>
                            </div>
                          </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                          <div className="space-y-2">
                            {generateSeatGrid().map((row, rowIndex) => (
                              <div key={rowIndex} className="flex items-center justify-center gap-1">
                                <div className="w-6 text-xs text-[var(--silver-300)] text-center">{rowIndex + 1}</div>
                                <div className="flex gap-1">
                                  {row.slice(0, 3).map((seat) => (
                                    <button
                                      key={seat.id}
                                      disabled={seat.occupied}
                                      onClick={() =>
                                        setPassengerData({
                                          ...passengerData,
                                          selectedSeat: seat.selected ? "" : seat.id,
                                        })
                                      }
                                      className={`w-8 h-8 text-xs rounded border transition-all duration-200 ${
                                        seat.occupied
                                          ? "bg-red-500 border-red-400 cursor-not-allowed"
                                          : seat.selected
                                            ? "bg-[var(--gold-500)] border-[var(--gold-600)] text-black"
                                            : "bg-green-500 border-green-400 hover:bg-green-400 text-white"
                                      }`}
                                    >
                                      {seat.id.slice(-1)}
                                    </button>
                                  ))}
                                </div>
                                <div className="w-4"></div>
                                <div className="flex gap-1">
                                  {row.slice(3).map((seat) => (
                                    <button
                                      key={seat.id}
                                      disabled={seat.occupied}
                                      onClick={() =>
                                        setPassengerData({
                                          ...passengerData,
                                          selectedSeat: seat.selected ? "" : seat.id,
                                        })
                                      }
                                      className={`w-8 h-8 text-xs rounded border transition-all duration-200 ${
                                        seat.occupied
                                          ? "bg-red-500 border-red-400 cursor-not-allowed"
                                          : seat.selected
                                            ? "bg-[var(--gold-500)] border-[var(--gold-600)] text-black"
                                            : "bg-green-500 border-green-400 hover:bg-green-400 text-white"
                                      }`}
                                    >
                                      {seat.id.slice(-1)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {passengerData.selectedSeat && (
                          <div className="mt-4 text-center">
                            <div className="inline-flex items-center gap-2 bg-[var(--gold-500)]/20 border border-[var(--gold-500)]/30 rounded-lg px-4 py-2">
                              <span className="text-[var(--silver-300)]">Selected Seat:</span>
                              <span className="text-[var(--gold-500)] font-bold">{passengerData.selectedSeat}</span>
                            </div>
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setActiveTab("passenger")}
                            className="border-[var(--gold-500)]/50 text-[var(--silver-300)] hover:bg-[var(--gold-500)]/10"
                          >
                            Back
                          </Button>
                          <Button
                            onClick={() => setActiveTab("payment")}
                            disabled={!isSeatsValid}
                            className="bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-black btn-glow"
                          >
                            Next: Payment
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="payment" className="space-y-6">
                      <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>

                      <Tabs defaultValue="card" onValueChange={(v) => setPaymentMethod(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-[var(--gold-500)]/30">
                          <TabsTrigger
                            value="card"
                            className="data-[state=active]:bg-[var(--gold-500)] data-[state=active]:text-black text-[var(--silver-300)]"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Card 💳
                          </TabsTrigger>
                          <TabsTrigger
                            value="wallet"
                            className="data-[state=active]:bg-[var(--gold-500)] data-[state=active]:text-black text-[var(--silver-300)]"
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            UPI 📱
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="card" className="space-y-6">
                          <div
                            className={`relative w-full max-w-sm mx-auto h-48 transition-transform duration-700 transform-style-preserve-3d ${
                              showCvv ? "rotate-y-180" : ""
                            }`}
                          >
                            <div className="absolute inset-0 w-full h-full backface-hidden">
                              <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl p-6 text-white shadow-2xl shadow-cyan-400/30">
                                <div className="flex justify-between items-start mb-8">
                                  <div className="text-2xl font-bold">💳</div>
                                  <div className="text-right">
                                    <div className="text-xs opacity-80">VALID THRU</div>
                                    <div className="text-sm">{paymentData.expiryDate || "MM/YY"}</div>
                                  </div>
                                </div>
                                <div className="mb-6">
                                  <div className="text-lg font-mono tracking-wider">
                                    {paymentData.cardNumber || "•••• •••• •••• ••••"}
                                  </div>
                                </div>
                                <div className="flex justify-between items-end">
                                  <div>
                                    <div className="text-xs opacity-80">CARDHOLDER NAME</div>
                                    <div className="text-sm font-semibold">
                                      {paymentData.cardholderName || "YOUR NAME"}
                                    </div>
                                  </div>
                                  <div className="text-xl font-bold">VISA</div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-6 text-white shadow-2xl">
                                <div className="w-full h-8 bg-black mt-4 mb-6"></div>
                                <div className="flex justify-end mb-4">
                                  <div className="bg-white text-black px-3 py-1 text-sm font-mono">
                                    {paymentData.cvv || "•••"}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-300">
                                  This card is property of the bank. If found, please return to the nearest branch.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                              <label className="text-sm font-medium text-[var(--silver-300)]">Cardholder Name *</label>
                              <Input
                                placeholder="Enter cardholder name"
                                value={paymentData.cardholderName}
                                onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                                className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                              />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <label className="text-sm font-medium text-[var(--silver-300)]">Card Number *</label>
                              <Input
                                placeholder="1234 5678 9012 3456"
                                value={paymentData.cardNumber}
                                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-[var(--silver-300)]">Expiry Date *</label>
                              <Input
                                placeholder="MM/YY"
                                value={paymentData.expiryDate}
                                onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                                className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-[var(--silver-300)]">CVV *</label>
                              <Input
                                placeholder="123"
                                value={paymentData.cvv}
                                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                                onFocus={() => setShowCvv(true)}
                                onBlur={() => setShowCvv(false)}
                                className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="wallet" className="space-y-6">
                          <div className="py-8">
                            <div className="text-center mb-6">
                              <Wallet className="w-16 h-16 text-[var(--gold-500)] mx-auto mb-4" />
                              <h3 className="text-xl font-semibold text-white mb-2">UPI Payment</h3>
                              <p className="text-[var(--silver-300)] mb-2">Choose your preferred UPI app</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
                              <Button
                                type="button"
                                onClick={() => setWalletProvider("PayTM")}
                                className={`${
                                  walletProvider === "PayTM"
                                    ? "bg-gradient-to-r from-purple-600 to-purple-700 ring-2 ring-[var(--gold-500)]"
                                    : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                                } btn-purple-glow`}
                              >
                                PayTM
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setWalletProvider("PhonePe")}
                                className={`${
                                  walletProvider === "PhonePe"
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 ring-2 ring-[var(--gold-500)]"
                                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                } btn-glow`}
                              >
                                PhonePe
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setWalletProvider("Google Pay")}
                                className={`${
                                  walletProvider === "Google Pay"
                                    ? "bg-gradient-to-r from-green-600 to-green-700 ring-2 ring-[var(--gold-500)]"
                                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                } btn-green-glow`}
                              >
                                Google Pay
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setWalletProvider("Amazon Pay")}
                                className={`${
                                  walletProvider === "Amazon Pay"
                                    ? "bg-gradient-to-r from-orange-600 to-orange-700 ring-2 ring-[var(--gold-500)]"
                                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                                } btn-glow`}
                              >
                                Amazon Pay
                              </Button>
                            </div>

                            {walletProvider && (
                              <div className="mt-8 max-w-md mx-auto">
                                <div className="bg-black/30 border border-[var(--gold-500)]/30 rounded-lg p-6">
                                  <p className="text-[var(--gold-500)] font-semibold mb-4 text-center">
                                    Selected: {walletProvider}
                                  </p>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--silver-300)]">
                                      Enter UPI ID *
                                    </label>
                                    <Input
                                      placeholder="yourname@paytm / yourname@ybl"
                                      value={upiId}
                                      onChange={(e) => setUpiId(e.target.value)}
                                      className="bg-black/50 border-[var(--gold-500)]/50 text-white placeholder:text-gray-400 focus:border-[var(--gold-500)] focus:ring-[var(--gold-500)]/20 focus:shadow-lg focus:shadow-[var(--gold-500)]/20"
                                    />
                                    <p className="text-xs text-[var(--silver-300)]">
                                      Example: yourname@paytm, yourname@ybl, yourname@oksbi
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>

                      </Tabs>

                      <div className="pt-4 border-t border-[var(--gold-500)]/30">
                        <Button
                          onClick={handleBooking}
                          disabled={!(isPassengerValid && isSeatsValid && isPaymentValid) || isBooking}
                          className="w-full bg-[var(--gold-500)] hover:bg-[var(--gold-600)] disabled:bg-neutral-600 text-black font-semibold py-4 text-lg btn-glow border border-[var(--gold-500)]/60 transition-all duration-300 disabled:cursor-not-allowed"
                        >
                          {isBooking ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Processing Booking...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-5 h-5" />
                              Confirm & Pay ₹{flight.price.toLocaleString()}
                            </div>
                          )}
                        </Button>
                        {!(isPassengerValid && isSeatsValid && isPaymentValid) && (
                          <div className="text-red-400 text-sm mt-2 text-center space-y-1">
                            {!isPassengerValid && <p>✗ Complete all passenger details with valid email & phone</p>}
                            {!isSeatsValid && <p>✗ Select a seat</p>}
                            {!isPaymentValid && (
                              <p>
                                ✗ Complete payment details
                                {paymentMethod === "wallet" && !walletProvider && " (Select UPI app)"}
                                {paymentMethod === "wallet" && walletProvider && !upiId && " (Enter UPI ID)"}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
