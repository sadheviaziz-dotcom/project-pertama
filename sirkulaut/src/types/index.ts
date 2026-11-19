export type UserRole = 'nelayan' | 'tpi' | 'perusahaan' | 'pedagang' | 'admin';

// [SIMULASI] Alias for 'perusahaan' role used in industrial context
export type IndustryRole = 'perusahaan';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  verified: boolean;
  createdAt: string;
  // Role-specific
  vesselName?: string; // nelayan
  tpiName?: string; // tpi
  companyName?: string; // perusahaan
  industryName?: string; // [SIMULASI] alias untuk companyName pada role perusahaan (industri)
  businessName?: string; // pedagang
  businessType?: string; // pedagang: 'umkm' | 'restoran' | 'hotel' | 'pedagang'
}

export interface FishSpecies {
  id: string;
  name: string;
  localName: string;
  scientificName: string;
  category: string;
  imageUrl?: string;
}

export interface LandingRecord {
  id: string;
  date: string;
  vesselName: string;
  nelayanId: string;
  nelayanName: string;
  fishSpecies: string;
  weightKg: number;
  sizeCategory: 'kecil' | 'sedang' | 'besar';
  quality: 'A' | 'B' | 'C';
  pricePerKg: number;
  soldKg: number;
  unsoldKg: number;
  tpiId: string;
  tpiName: string;
  status: 'recorded' | 'verified' | 'completed';
}

export interface FishingPlan {
  id: string;
  nelayanId: string;
  vesselName: string;
  gearType: string;
  location: string;
  departureDate: string;
  durationDays: number;
  targetSpecies: string;
  estimatedCatchKg: number;
  status: 'draft' | 'submitted' | 'analyzed' | 'completed';
  aiAnalysis?: FishingPlanAnalysis;
}

export interface FishingPlanAnalysis {
  predictedCatchKg: number;
  catchRange: { min: number; max: number };
  ecologicalStatus: 'baik' | 'waspada' | 'kritis';
  cpueTrend: 'meningkat' | 'stabil' | 'menurun';
  estimatedSupplyKg: number;
  marketDemandKg: number;
  riskLevel: 'rendah' | 'sedang' | 'tinggi';
  recommendations: string[];
}

export interface DemandRequest {
  id: string;
  companyId: string;
  companyName: string;
  fishSpecies: string;
  quantityKg: number;
  sizePreference: 'kecil' | 'sedang' | 'besar' | 'semua';
  qualityMin: 'A' | 'B' | 'C';
  priceOfferPerKg: number;
  pickupDate: string;
  location: string;
  status: 'open' | 'partially_matched' | 'matched' | 'fulfilled' | 'expired';
  matchedKg: number;
}

export interface MarketListing {
  id: string;
  fishSpecies: string;
  availableKg: number;
  sizeCategory: 'kecil' | 'sedang' | 'besar';
  quality: 'A' | 'B' | 'C';
  pricePerKg: number;
  tpiName: string;
  landingDate: string;
  location: string;
  status: 'available' | 'reserved' | 'sold';
}

export interface PurchaseOrder {
  id: string;
  buyerId: string;
  buyerName: string;
  listingId: string;
  fishSpecies: string;
  quantityKg: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
}

export interface DemandMatch {
  demandId: string;
  companyName: string;
  matchScore: number;
  speciesMatch: boolean;
  volumeMatch: number;
  sizeMatch: boolean;
  qualityMatch: boolean;
  priceGap: number;
  distanceKm: number;
}

export interface PredictionData {
  date: string;
  actual?: number;
  predicted: number;
  lowerBound: number;
  upperBound: number;
}

export interface CPUEData {
  period: string;
  cpue: number;
  trips: number;
  totalCatch: number;
  avgCatchPerTrip: number;
}

export interface PriceData {
  date: string;
  price: number;
  volume: number;
  species: string;
}

export interface FoodLossMetric {
  date: string;
  totalLanded: number;
  absorbed: number;
  unabsorbed: number;
  redirected: number;
  potentialLossPrevented: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  read: boolean;
  createdAt: string;
}

export interface SizeDistribution {
  size: string;
  count: number;
  percentage: number;
}

export interface SupplyDemandBalance {
  date: string;
  supply: number;
  demand: number;
  gap: number;
}

// ============================================================
// [SIMULASI] Tipe-tipe baru untuk fitur industri & katalog TPI
// ============================================================

/** Pengajuan kebutuhan bahan baku dari industri pengolahan ikan */
export interface IndustrialRequest {
  id: string;
  industryId: string;
  industryName: string;
  fishSpecies: string;
  quantityKg: number;
  sizePreference: 'kecil' | 'sedang' | 'besar' | 'semua';
  gradeQuality: 'A' | 'B' | 'C';
  fishCondition: 'segar' | 'beku' | 'semua';
  requiredDate: string;
  additionalNotes: string;
  status: 'menunggu' | 'tersedia_sebagian' | 'tersedia' | 'belum_terpenuhi';
  submittedAt: string;
}

/** Katalog stok ikan yang tersedia di TPI */
export interface FishCatalogItem {
  id: string;
  fishSpecies: string;
  scientificName?: string;
  imageUrl?: string;
  totalStockKg: number;
  unsoldKg: number;
  reservedKg: number;
  availableKg: number;
  sizeCategory: 'kecil' | 'sedang' | 'besar';
  quality: 'A' | 'B' | 'C';
  pricePerKg: number;
  location: string;
  tpiName: string;
  updatedAt: string;
}

/** Alert stok TPI untuk notifikasi kepada nelayan */
export interface TPIStockAlert {
  id: string;
  fishSpecies: string;
  totalStockKg: number;
  unsoldKg: number;
  reservedKg: number;
  threshold: number;
  alertLevel: 'normal' | 'tinggi' | 'kritis';
  updatedAt: string;
  message: string;
}

