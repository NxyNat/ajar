export type TrustBreakdown = {
  identity: number
  income: number
  employment: number
  payment: number
}

export type RiskLevel = "Low Risk" | "Medium Risk" | "High Risk"

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "Low Risk"
  if (score >= 50) return "Medium Risk"
  return "High Risk"
}

export type Landlord = {
  id: string
  name: string
  companyName?: string
  avatarColor: string
  initials: string
  trustScore: number
  trustBreakdown: TrustBreakdown
  ownershipVerified: boolean
  joinedYear: number
  responseRate: number
  rating: number
  reviewCount: number
}

export type Property = {
  id: string
  slug: string
  title: string
  description: string
  price: number
  currency: string
  bedrooms: number
  bathrooms: number
  area: number
  furnished: boolean
  city: string
  district: string
  address: string
  image: string
  gallery: string[]
  status: "ACTIVE" | "RENTED" | "INACTIVE"
  ownershipVerified: boolean
  registryId: string
  amenities: string[]
  landlordId: string
  listedDaysAgo: number
  propertyType: "Apartment" | "Villa" | "House" | "Studio"
  lat?: number
  lng?: number
}

export type Application = {
  id: string
  tenantName: string
  propertyId: string
  status: "pending" | "approved" | "rejected" | "under_review"
  submittedAt: Date
  viewedAt?: Date
  trustScore?: number
  autoDeleteHours: number
}

export type VerificationActivity = {
  date: string
  verifications: number
}

export const landlords: Landlord[] = [
  {
    id: "ll-1",
    name: "Rania Haddad",
    companyName: "Haddad Property Group",
    avatarColor: "#2563EB",
    initials: "RH",
    trustScore: 92,
    trustBreakdown: { identity: 100, income: 90, employment: 88, payment: 94 },
    ownershipVerified: true,
    joinedYear: 2023,
    responseRate: 98,
    rating: 4.9,
    reviewCount: 47,
  },
  {
    id: "ll-2",
    name: "Omar Khalil",
    avatarColor: "#0D9488",
    initials: "OK",
    trustScore: 84,
    trustBreakdown: { identity: 100, income: 78, employment: 80, payment: 86 },
    ownershipVerified: true,
    joinedYear: 2024,
    responseRate: 91,
    rating: 4.7,
    reviewCount: 23,
  },
  {
    id: "ll-3",
    name: "Lina Saleh",
    companyName: "Saleh Estates",
    avatarColor: "#F59E0B",
    initials: "LS",
    trustScore: 71,
    trustBreakdown: { identity: 100, income: 64, employment: 60, payment: 72 },
    ownershipVerified: true,
    joinedYear: 2025,
    responseRate: 85,
    rating: 4.4,
    reviewCount: 12,
  },
  {
    id: "ll-4",
    name: "Yousef Mansour",
    avatarColor: "#EF4444",
    initials: "YM",
    trustScore: 58,
    trustBreakdown: { identity: 100, income: 45, employment: 40, payment: 55 },
    ownershipVerified: false,
    joinedYear: 2025,
    responseRate: 74,
    rating: 4.1,
    reviewCount: 6,
  },
]

export const properties: Property[] = [
  {
    id: "p-1",
    slug: "modern-apartment-abdoun",
    title: "Modern Furnished Apartment in Abdoun",
    description:
      "A bright, fully furnished two-bedroom apartment in the heart of Abdoun. Floor-to-ceiling windows fill the living space with natural light, and the building offers secure parking, a backup generator, and 24/7 security. Walking distance to cafes, Abdoun Mall, and embassies.",
    price: 650,
    currency: "JOD",
    bedrooms: 2,
    bathrooms: 2,
    area: 135,
    furnished: true,
    city: "Amman",
    district: "Abdoun",
    address: "Abdoun Circle, Amman",
    image: "/properties/abdoun-apartment.png",
    gallery: [
      "/properties/abdoun-apartment.png",
      "/properties/tlaa-al-ali-flat.png",
      "/properties/khalda-family.png",
    ],
    status: "ACTIVE",
    ownershipVerified: true,
    registryId: "JO-AMM-2024-08841",
    amenities: ["Backup generator", "Secure parking", "24/7 security", "Central heating", "Elevator", "Balcony"],
    landlordId: "ll-1",
    listedDaysAgo: 3,
    propertyType: "Apartment",
    lat: 31.9454,
    lng: 35.8863,
  },
  {
    id: "p-2",
    slug: "upscale-villa-sweifieh",
    title: "Upscale Villa with Garden in Sweifieh",
    description:
      "Spacious four-bedroom villa with a private garden and rooftop terrace in quiet Sweifieh. Recently renovated with premium finishes throughout. Ideal for families looking for space close to shopping and international schools.",
    price: 1450,
    currency: "JOD",
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    furnished: false,
    city: "Amman",
    district: "Sweifieh",
    address: "Wakalat Street area, Sweifieh",
    image: "/properties/sweifieh-villa.png",
    gallery: [
      "/properties/sweifieh-villa.png",
      "/properties/khalda-family.png",
      "/properties/deir-ghbar-penthouse.png",
    ],
    status: "ACTIVE",
    ownershipVerified: true,
    registryId: "JO-AMM-2024-07210",
    amenities: ["Private garden", "Rooftop terrace", "Maid's room", "Double parking", "Solar water heating"],
    landlordId: "ll-1",
    listedDaysAgo: 8,
    propertyType: "Villa",
    lat: 31.9496,
    lng: 35.8812,
  },
  {
    id: "p-3",
    slug: "cozy-studio-jabal-amman",
    title: "Cozy Studio in Historic Jabal Amman",
    description:
      "Charming, efficiently designed studio in the cultural heart of Jabal Amman. Steps from Rainbow Street, cafes, and galleries. Perfect for a young professional or student.",
    price: 280,
    currency: "JOD",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    furnished: true,
    city: "Amman",
    district: "Jabal Amman",
    address: "First Circle, Jabal Amman",
    image: "/properties/jabal-amman-studio.png",
    gallery: ["/properties/jabal-amman-studio.png", "/properties/tlaa-al-ali-flat.png"],
    status: "ACTIVE",
    ownershipVerified: true,
    registryId: "JO-AMM-2025-01193",
    amenities: ["Furnished", "Walk to Rainbow Street", "Internet ready", "Heating"],
    landlordId: "ll-2",
    listedDaysAgo: 1,
    propertyType: "Studio",
    lat: 31.9516,
    lng: 35.9242,
  },
  {
    id: "p-4",
    slug: "family-apartment-khalda",
    title: "Spacious Family Apartment in Khalda",
    description:
      "Three-bedroom family apartment with an open-plan kitchen and marble countertops. Quiet, family-friendly neighborhood near Mecca Mall and good schools. Comes with two reserved parking spots.",
    price: 720,
    currency: "JOD",
    bedrooms: 3,
    bathrooms: 3,
    area: 185,
    furnished: false,
    city: "Amman",
    district: "Khalda",
    address: "Near Mecca Mall, Khalda",
    image: "/properties/khalda-family.png",
    gallery: ["/properties/khalda-family.png", "/properties/abdoun-apartment.png", "/properties/tlaa-al-ali-flat.png"],
    status: "ACTIVE",
    ownershipVerified: true,
    registryId: "JO-AMM-2024-09955",
    amenities: ["Open-plan kitchen", "Two parking spots", "Storage room", "Central heating", "Elevator"],
    landlordId: "ll-2",
    listedDaysAgo: 12,
    propertyType: "Apartment",
    lat: 31.9754,
    lng: 35.8574,
  },
  {
    id: "p-5",
    slug: "penthouse-deir-ghbar",
    title: "Penthouse with Skyline Terrace in Deir Ghbar",
    description:
      "Luxury top-floor penthouse with a wraparound terrace overlooking the Amman skyline. Premium appliances, smart-home lighting, and a private elevator entrance. A statement home for those who want the best view in the city.",
    price: 1850,
    currency: "JOD",
    bedrooms: 3,
    bathrooms: 4,
    area: 260,
    furnished: true,
    city: "Amman",
    district: "Deir Ghbar",
    address: "Deir Ghbar Heights, Amman",
    image: "/properties/deir-ghbar-penthouse.png",
    gallery: [
      "/properties/deir-ghbar-penthouse.png",
      "/properties/abdoun-apartment.png",
      "/properties/khalda-family.png",
    ],
    status: "ACTIVE",
    ownershipVerified: true,
    registryId: "JO-AMM-2024-06602",
    amenities: ["Wraparound terrace", "Smart home", "Private elevator", "Concierge", "Gym access", "Backup generator"],
    landlordId: "ll-3",
    listedDaysAgo: 5,
    propertyType: "Apartment",
    lat: 31.9345,
    lng: 35.8789,
  },
  {
    id: "p-6",
    slug: "bright-flat-tlaa-al-ali",
    title: "Bright One-Bedroom Flat in Tla'a Al-Ali",
    description:
      "A comfortable one-bedroom flat with a city view and plenty of natural light. Affordable and well-connected, close to the University of Jordan and public transport.",
    price: 340,
    currency: "JOD",
    bedrooms: 1,
    bathrooms: 1,
    area: 70,
    furnished: true,
    city: "Amman",
    district: "Tla'a Al-Ali",
    address: "Near University of Jordan, Tla'a Al-Ali",
    image: "/properties/tlaa-al-ali-flat.png",
    gallery: ["/properties/tlaa-al-ali-flat.png", "/properties/jabal-amman-studio.png"],
    status: "ACTIVE",
    ownershipVerified: false,
    registryId: "Pending verification",
    amenities: ["Furnished", "City view", "Near university", "Heating"],
    landlordId: "ll-4",
    listedDaysAgo: 2,
    propertyType: "Apartment",
    lat: 31.9892,
    lng: 35.8734,
  },
]

export const applications: Application[] = [
  {
    id: "app-1",
    tenantName: "Ahmad Khalid",
    propertyId: "p-1",
    status: "under_review",
    submittedAt: new Date(Date.now() - 86400000 * 2),
    viewedAt: new Date(Date.now() - 86400000),
    trustScore: 87,
    autoDeleteHours: 48,
  },
  {
    id: "app-2",
    tenantName: "Sara Mahmoud",
    propertyId: "p-2",
    status: "pending",
    submittedAt: new Date(Date.now() - 86400000 * 5),
    trustScore: 72,
    autoDeleteHours: 48,
  },
  {
    id: "app-3",
    tenantName: "Mohammad Ali",
    propertyId: "p-3",
    status: "approved",
    submittedAt: new Date(Date.now() - 86400000 * 10),
    viewedAt: new Date(Date.now() - 86400000 * 8),
    trustScore: 91,
    autoDeleteHours: 48,
  },
  {
    id: "app-4",
    tenantName: "Lina Hassan",
    propertyId: "p-4",
    status: "rejected",
    submittedAt: new Date(Date.now() - 86400000 * 3),
    viewedAt: new Date(Date.now() - 86400000 * 2),
    trustScore: 45,
    autoDeleteHours: 48,
  },
]

export const verificationActivity: VerificationActivity[] = [
  { date: "Mon", verifications: 12 },
  { date: "Tue", verifications: 18 },
  { date: "Wed", verifications: 15 },
  { date: "Thu", verifications: 22 },
  { date: "Fri", verifications: 28 },
  { date: "Sat", verifications: 19 },
  { date: "Sun", verifications: 24 },
]

export const trustScoreDistribution = [
  { range: "0-20", count: 2 },
  { range: "21-40", count: 5 },
  { range: "41-60", count: 12 },
  { range: "61-80", count: 28 },
  { range: "81-100", count: 18 },
]

export const historicalScores = [
  { day: "Day 1", score: 62 },
  { day: "Day 5", score: 65 },
  { day: "Day 10", score: 68 },
  { day: "Day 15", score: 72 },
  { day: "Day 20", score: 75 },
  { day: "Day 25", score: 79 },
  { day: "Day 30", score: 82 },
]

export function getLandlord(id: string): Landlord | undefined {
  return landlords.find((l) => l.id === id)
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export const districts = Array.from(new Set(properties.map((p) => p.district))).sort()

export const priceBounds = {
  min: Math.min(...properties.map((p) => p.price)),
  max: Math.max(...properties.map((p) => p.price)),
}

export const propertyTypes = ["Apartment", "Villa", "House", "Studio"]
