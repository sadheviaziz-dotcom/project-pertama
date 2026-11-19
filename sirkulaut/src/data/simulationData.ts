/**
 * DATA SIMULASI — SIRKULAUT
 * ==========================================
 * Seluruh data dalam file ini merupakan DATA SIMULASI
 * yang dibuat untuk keperluan prototipe dan demonstrasi.
 * Data ini BUKAN data resmi PPN Brondong atau instansi manapun.
 * ==========================================
 */

import type {
  User, LandingRecord, FishingPlan, DemandRequest, MarketListing,
  PurchaseOrder, PredictionData, CPUEData, PriceData, FoodLossMetric,
  Notification, SizeDistribution, SupplyDemandBalance, DemandMatch,
  FishSpecies, IndustrialRequest, FishCatalogItem, TPIStockAlert
} from '../types';

// ============ USERS ============
export const DEMO_USERS: User[] = [
  {
    id: 'N001', name: 'Ahmad Fauzi', email: 'nelayan@demo.com', role: 'nelayan',
    phone: '081234567890', verified: true, createdAt: '2026-01-15',
    vesselName: 'KM Bahari Jaya', avatar: undefined
  },
  {
    id: 'N002', name: 'Budi Santoso', email: 'nelayan2@demo.com', role: 'nelayan',
    phone: '081234567891', verified: true, createdAt: '2026-02-10',
    vesselName: 'KM Laut Biru'
  },
  {
    id: 'N003', name: 'Hasan Basri', email: 'nelayan3@demo.com', role: 'nelayan',
    phone: '081234567892', verified: true, createdAt: '2026-03-01',
    vesselName: 'KM Mutiara Laut'
  },
  {
    id: 'T001', name: 'Siti Rahayu', email: 'tpi@demo.com', role: 'tpi',
    phone: '081345678901', verified: true, createdAt: '2026-01-10',
    tpiName: 'TPI Brondong Unit 1'
  },
  {
    id: 'P001', name: 'CV Samudra Protein', email: 'perusahaan@demo.com', role: 'perusahaan',
    phone: '081456789012', verified: true, createdAt: '2026-01-20',
    companyName: 'CV Samudra Protein'
  },
  {
    id: 'P002', name: 'PT Indo Surimi', email: 'perusahaan2@demo.com', role: 'perusahaan',
    phone: '081456789013', verified: true, createdAt: '2026-02-15',
    companyName: 'PT Indo Surimi'
  },
  {
    id: 'P003', name: 'UD Berkah Laut', email: 'perusahaan3@demo.com', role: 'perusahaan',
    phone: '081456789014', verified: true, createdAt: '2026-03-05',
    companyName: 'UD Berkah Laut'
  },
  {
    id: 'D001', name: 'Warung Seafood Pak Joko', email: 'pedagang@demo.com', role: 'pedagang',
    phone: '081567890123', verified: true, createdAt: '2026-02-01',
    businessName: 'Warung Seafood Pak Joko', businessType: 'restoran'
  },
  {
    id: 'D002', name: 'UD Ikan Segar Makmur', email: 'pedagang2@demo.com', role: 'pedagang',
    phone: '081567890124', verified: true, createdAt: '2026-03-10',
    businessName: 'UD Ikan Segar Makmur', businessType: 'pedagang'
  },
  {
    id: 'A001', name: 'Admin SIRKULAUT', email: 'admin@demo.com', role: 'admin',
    phone: '081678901234', verified: true, createdAt: '2026-01-01'
  },
];

// ============ FISH SPECIES ============
export const FISH_SPECIES: FishSpecies[] = [
  { id: 'FS001', name: 'Ikan Swanggi', localName: 'Swanggi', scientificName: 'Priacanthus tayenus', category: 'Demersal' },
  { id: 'FS002', name: 'Ikan Tongkol', localName: 'Tongkol', scientificName: 'Euthynnus affinis', category: 'Pelagis' },
  { id: 'FS003', name: 'Ikan Kembung', localName: 'Kembung', scientificName: 'Rastrelliger kanagurta', category: 'Pelagis' },
  { id: 'FS004', name: 'Ikan Kurisi', localName: 'Kurisi', scientificName: 'Nemipterus japonicus', category: 'Demersal' },
  { id: 'FS005', name: 'Ikan Layur', localName: 'Layur', scientificName: 'Trichiurus lepturus', category: 'Pelagis' },
];

// ============ LANDING RECORDS ============
export const LANDING_RECORDS: LandingRecord[] = [
  {
    id: 'LR001', date: '2026-11-10', vesselName: 'KM Bahari Jaya', nelayanId: 'N001',
    nelayanName: 'Ahmad Fauzi', fishSpecies: 'Ikan Swanggi', weightKg: 850,
    sizeCategory: 'sedang', quality: 'A', pricePerKg: 18000, soldKg: 750, unsoldKg: 100,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR002', date: '2026-11-10', vesselName: 'KM Laut Biru', nelayanId: 'N002',
    nelayanName: 'Budi Santoso', fishSpecies: 'Ikan Swanggi', weightKg: 620,
    sizeCategory: 'besar', quality: 'A', pricePerKg: 22000, soldKg: 620, unsoldKg: 0,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR003', date: '2026-11-10', vesselName: 'KM Mutiara Laut', nelayanId: 'N003',
    nelayanName: 'Hasan Basri', fishSpecies: 'Ikan Tongkol', weightKg: 1200,
    sizeCategory: 'sedang', quality: 'B', pricePerKg: 15000, soldKg: 900, unsoldKg: 300,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR004', date: '2026-11-09', vesselName: 'KM Bahari Jaya', nelayanId: 'N001',
    nelayanName: 'Ahmad Fauzi', fishSpecies: 'Ikan Swanggi', weightKg: 780,
    sizeCategory: 'sedang', quality: 'A', pricePerKg: 17500, soldKg: 700, unsoldKg: 80,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR005', date: '2026-11-09', vesselName: 'KM Laut Biru', nelayanId: 'N002',
    nelayanName: 'Budi Santoso', fishSpecies: 'Ikan Kembung', weightKg: 450,
    sizeCategory: 'kecil', quality: 'B', pricePerKg: 12000, soldKg: 400, unsoldKg: 50,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR006', date: '2026-11-08', vesselName: 'KM Mutiara Laut', nelayanId: 'N003',
    nelayanName: 'Hasan Basri', fishSpecies: 'Ikan Swanggi', weightKg: 920,
    sizeCategory: 'besar', quality: 'A', pricePerKg: 21000, soldKg: 850, unsoldKg: 70,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR007', date: '2026-11-08', vesselName: 'KM Bahari Jaya', nelayanId: 'N001',
    nelayanName: 'Ahmad Fauzi', fishSpecies: 'Ikan Kurisi', weightKg: 350,
    sizeCategory: 'sedang', quality: 'B', pricePerKg: 14000, soldKg: 300, unsoldKg: 50,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR008', date: '2026-11-07', vesselName: 'KM Laut Biru', nelayanId: 'N002',
    nelayanName: 'Budi Santoso', fishSpecies: 'Ikan Swanggi', weightKg: 680,
    sizeCategory: 'sedang', quality: 'A', pricePerKg: 18500, soldKg: 650, unsoldKg: 30,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR009', date: '2026-11-07', vesselName: 'KM Mutiara Laut', nelayanId: 'N003',
    nelayanName: 'Hasan Basri', fishSpecies: 'Ikan Layur', weightKg: 280,
    sizeCategory: 'besar', quality: 'A', pricePerKg: 25000, soldKg: 280, unsoldKg: 0,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
  {
    id: 'LR010', date: '2026-11-06', vesselName: 'KM Bahari Jaya', nelayanId: 'N001',
    nelayanName: 'Ahmad Fauzi', fishSpecies: 'Ikan Swanggi', weightKg: 900,
    sizeCategory: 'sedang', quality: 'B', pricePerKg: 16000, soldKg: 800, unsoldKg: 100,
    tpiId: 'T001', tpiName: 'TPI Brondong Unit 1', status: 'completed'
  },
];

// ============ FISHING PLANS ============
export const FISHING_PLANS: FishingPlan[] = [
  {
    id: 'FP001', nelayanId: 'N001', vesselName: 'KM Bahari Jaya', gearType: 'Cantrang',
    location: 'Perairan Utara Lamongan', departureDate: '2026-11-12', durationDays: 3,
    targetSpecies: 'Ikan Swanggi', estimatedCatchKg: 800, status: 'analyzed',
    aiAnalysis: {
      predictedCatchKg: 750,
      catchRange: { min: 580, max: 920 },
      ecologicalStatus: 'baik',
      cpueTrend: 'stabil',
      estimatedSupplyKg: 5800,
      marketDemandKg: 5500,
      riskLevel: 'rendah',
      recommendations: [
        'Kondisi ekologis mendukung aktivitas penangkapan pada periode ini.',
        'Estimasi pasokan mendekati permintaan pasar — potensi penyerapan cukup baik.',
        'Disarankan koordinasi dengan TPI untuk memastikan efisiensi pelelangan.',
        'Perhatikan kondisi cuaca dan keselamatan pelayaran.',
      ]
    }
  },
  {
    id: 'FP002', nelayanId: 'N002', vesselName: 'KM Laut Biru', gearType: 'Gill Net',
    location: 'Selat Madura', departureDate: '2026-11-13', durationDays: 2,
    targetSpecies: 'Ikan Tongkol', estimatedCatchKg: 1000, status: 'submitted',
  },
];

// ============ DEMAND REQUESTS ============
export const DEMAND_REQUESTS: DemandRequest[] = [
  {
    id: 'DR001', companyId: 'P001', companyName: 'CV Samudra Protein', fishSpecies: 'Ikan Swanggi',
    quantityKg: 2000, sizePreference: 'sedang', qualityMin: 'B', priceOfferPerKg: 17000,
    pickupDate: '2026-11-12', location: 'Brondong, Lamongan', status: 'open', matchedKg: 0,
  },
  {
    id: 'DR002', companyId: 'P002', companyName: 'PT Indo Surimi', fishSpecies: 'Ikan Swanggi',
    quantityKg: 2500, sizePreference: 'semua', qualityMin: 'B', priceOfferPerKg: 16000,
    pickupDate: '2026-11-12', location: 'Gresik, Jawa Timur', status: 'partially_matched', matchedKg: 800,
  },
  {
    id: 'DR003', companyId: 'P003', companyName: 'UD Berkah Laut', fishSpecies: 'Ikan Swanggi',
    quantityKg: 1000, sizePreference: 'besar', qualityMin: 'A', priceOfferPerKg: 22000,
    pickupDate: '2026-11-13', location: 'Tuban, Jawa Timur', status: 'open', matchedKg: 0,
  },
  {
    id: 'DR004', companyId: 'P001', companyName: 'CV Samudra Protein', fishSpecies: 'Ikan Tongkol',
    quantityKg: 1500, sizePreference: 'sedang', qualityMin: 'B', priceOfferPerKg: 14000,
    pickupDate: '2026-11-14', location: 'Brondong, Lamongan', status: 'open', matchedKg: 0,
  },
];

// ============ MARKET LISTINGS ============
export const MARKET_LISTINGS: MarketListing[] = [
  {
    id: 'ML001', fishSpecies: 'Ikan Swanggi', availableKg: 250, sizeCategory: 'sedang',
    quality: 'A', pricePerKg: 18000, tpiName: 'TPI Brondong Unit 1', landingDate: '2026-11-10',
    location: 'Brondong, Lamongan', status: 'available'
  },
  {
    id: 'ML002', fishSpecies: 'Ikan Swanggi', availableKg: 180, sizeCategory: 'besar',
    quality: 'A', pricePerKg: 22000, tpiName: 'TPI Brondong Unit 1', landingDate: '2026-11-10',
    location: 'Brondong, Lamongan', status: 'available'
  },
  {
    id: 'ML003', fishSpecies: 'Ikan Tongkol', availableKg: 400, sizeCategory: 'sedang',
    quality: 'B', pricePerKg: 15000, tpiName: 'TPI Brondong Unit 1', landingDate: '2026-11-10',
    location: 'Brondong, Lamongan', status: 'available'
  },
  {
    id: 'ML004', fishSpecies: 'Ikan Kembung', availableKg: 120, sizeCategory: 'kecil',
    quality: 'B', pricePerKg: 12000, tpiName: 'TPI Brondong Unit 1', landingDate: '2026-11-09',
    location: 'Brondong, Lamongan', status: 'available'
  },
  {
    id: 'ML005', fishSpecies: 'Ikan Swanggi', availableKg: 350, sizeCategory: 'sedang',
    quality: 'B', pricePerKg: 16000, tpiName: 'TPI Brondong Unit 1', landingDate: '2026-11-09',
    location: 'Brondong, Lamongan', status: 'available'
  },
  {
    id: 'ML006', fishSpecies: 'Ikan Kurisi', availableKg: 150, sizeCategory: 'sedang',
    quality: 'A', pricePerKg: 14500, tpiName: 'TPI Brondong Unit 1', landingDate: '2026-11-08',
    location: 'Brondong, Lamongan', status: 'available'
  },
];

// ============ PURCHASE ORDERS ============
export const PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'PO001', buyerId: 'D001', buyerName: 'Warung Seafood Pak Joko', listingId: 'ML001',
    fishSpecies: 'Ikan Swanggi', quantityKg: 50, totalPrice: 900000, status: 'delivered',
    orderDate: '2026-11-10'
  },
  {
    id: 'PO002', buyerId: 'D002', buyerName: 'UD Ikan Segar Makmur', listingId: 'ML003',
    fishSpecies: 'Ikan Tongkol', quantityKg: 100, totalPrice: 1500000, status: 'confirmed',
    orderDate: '2026-11-10'
  },
];

// ============ PREDICTION DATA (Landing Forecast) ============
export const LANDING_PREDICTIONS: PredictionData[] = [
  { date: '2026-10-01', actual: 4200, predicted: 4100, lowerBound: 3500, upperBound: 4700 },
  { date: '2026-10-08', actual: 4500, predicted: 4350, lowerBound: 3700, upperBound: 5000 },
  { date: '2026-10-15', actual: 3800, predicted: 4000, lowerBound: 3400, upperBound: 4600 },
  { date: '2026-10-22', actual: 5100, predicted: 4800, lowerBound: 4100, upperBound: 5500 },
  { date: '2026-10-29', actual: 5400, predicted: 5200, lowerBound: 4500, upperBound: 5900 },
  { date: '2026-11-05', actual: 5800, predicted: 5600, lowerBound: 4800, upperBound: 6400 },
  { date: '2026-11-12', predicted: 6000, lowerBound: 5100, upperBound: 6900 },
  { date: '2026-11-19', predicted: 5700, lowerBound: 4800, upperBound: 6600 },
  { date: '2026-11-26', predicted: 5400, lowerBound: 4500, upperBound: 6300 },
  { date: '2026-12-03', predicted: 5100, lowerBound: 4200, upperBound: 6000 },
];

// ============ CPUE DATA ============
export const CPUE_DATA: CPUEData[] = [
  { period: 'Jan 2026', cpue: 125, trips: 320, totalCatch: 40000, avgCatchPerTrip: 125 },
  { period: 'Feb 2026', cpue: 118, trips: 290, totalCatch: 34220, avgCatchPerTrip: 118 },
  { period: 'Mar 2026', cpue: 132, trips: 340, totalCatch: 44880, avgCatchPerTrip: 132 },
  { period: 'Apr 2026', cpue: 128, trips: 310, totalCatch: 39680, avgCatchPerTrip: 128 },
  { period: 'Mei 2026', cpue: 115, trips: 280, totalCatch: 32200, avgCatchPerTrip: 115 },
  { period: 'Jun 2026', cpue: 108, trips: 260, totalCatch: 28080, avgCatchPerTrip: 108 },
  { period: 'Jul 2026', cpue: 120, trips: 300, totalCatch: 36000, avgCatchPerTrip: 120 },
  { period: 'Agu 2026', cpue: 135, trips: 350, totalCatch: 47250, avgCatchPerTrip: 135 },
  { period: 'Sep 2026', cpue: 140, trips: 360, totalCatch: 50400, avgCatchPerTrip: 140 },
  { period: 'Okt 2026', cpue: 138, trips: 355, totalCatch: 48990, avgCatchPerTrip: 138 },
  { period: 'Nov 2026', cpue: 142, trips: 365, totalCatch: 51830, avgCatchPerTrip: 142 },
];

// ============ PRICE DATA ============
export const PRICE_DATA: PriceData[] = [
  { date: '2026-10-01', price: 16000, volume: 4200, species: 'Ikan Swanggi' },
  { date: '2026-10-08', price: 16500, volume: 4500, species: 'Ikan Swanggi' },
  { date: '2026-10-15', price: 17000, volume: 3800, species: 'Ikan Swanggi' },
  { date: '2026-10-22', price: 16800, volume: 5100, species: 'Ikan Swanggi' },
  { date: '2026-10-29', price: 17200, volume: 5400, species: 'Ikan Swanggi' },
  { date: '2026-11-05', price: 18000, volume: 5800, species: 'Ikan Swanggi' },
  { date: '2026-11-10', price: 18500, volume: 6200, species: 'Ikan Swanggi' },
];

// ============ FOOD LOSS METRICS ============
export const FOOD_LOSS_METRICS: FoodLossMetric[] = [
  { date: '2026-11-04', totalLanded: 4800, absorbed: 4200, unabsorbed: 600, redirected: 400, potentialLossPrevented: 400 },
  { date: '2026-11-05', totalLanded: 5200, absorbed: 4600, unabsorbed: 600, redirected: 450, potentialLossPrevented: 450 },
  { date: '2026-11-06', totalLanded: 5500, absorbed: 5000, unabsorbed: 500, redirected: 350, potentialLossPrevented: 350 },
  { date: '2026-11-07', totalLanded: 4900, absorbed: 4500, unabsorbed: 400, redirected: 300, potentialLossPrevented: 300 },
  { date: '2026-11-08', totalLanded: 5800, absorbed: 5100, unabsorbed: 700, redirected: 500, potentialLossPrevented: 500 },
  { date: '2026-11-09', totalLanded: 5300, absorbed: 4700, unabsorbed: 600, redirected: 420, potentialLossPrevented: 420 },
  { date: '2026-11-10', totalLanded: 6100, absorbed: 5500, unabsorbed: 600, redirected: 380, potentialLossPrevented: 380 },
];

// ============ SUPPLY DEMAND BALANCE ============
export const SUPPLY_DEMAND_DATA: SupplyDemandBalance[] = [
  { date: '2026-10-01', supply: 4200, demand: 4000, gap: 200 },
  { date: '2026-10-08', supply: 4500, demand: 4800, gap: -300 },
  { date: '2026-10-15', supply: 3800, demand: 4200, gap: -400 },
  { date: '2026-10-22', supply: 5100, demand: 4500, gap: 600 },
  { date: '2026-10-29', supply: 5400, demand: 5000, gap: 400 },
  { date: '2026-11-05', supply: 5800, demand: 5500, gap: 300 },
  { date: '2026-11-12', supply: 6000, demand: 5500, gap: 500 },
];

// ============ SIZE DISTRIBUTION ============
export const SIZE_DISTRIBUTION: SizeDistribution[] = [
  { size: '< 15 cm', count: 180, percentage: 12 },
  { size: '15-20 cm', count: 420, percentage: 28 },
  { size: '20-25 cm', count: 510, percentage: 34 },
  { size: '25-30 cm', count: 270, percentage: 18 },
  { size: '> 30 cm', count: 120, percentage: 8 },
];

// ============ DEMAND MATCHES (AI Matching Results) ============
export const DEMAND_MATCHES: DemandMatch[] = [
  { demandId: 'DR001', companyName: 'CV Samudra Protein', matchScore: 92, speciesMatch: true, volumeMatch: 85, sizeMatch: true, qualityMatch: true, priceGap: 1000, distanceKm: 5 },
  { demandId: 'DR002', companyName: 'PT Indo Surimi', matchScore: 78, speciesMatch: true, volumeMatch: 65, sizeMatch: true, qualityMatch: true, priceGap: -2000, distanceKm: 35 },
  { demandId: 'DR003', companyName: 'UD Berkah Laut', matchScore: 85, speciesMatch: true, volumeMatch: 70, sizeMatch: true, qualityMatch: true, priceGap: 4000, distanceKm: 50 },
];

// ============ NOTIFICATIONS ============
export const NOTIFICATIONS: Notification[] = [
  {
    id: 'NT001', userId: 'N001', title: 'Prediksi Pendaratan Minggu Ini',
    message: 'Estimasi pendaratan ikan swanggi minggu ini menunjukkan peningkatan 5% dibandingkan minggu lalu. Pastikan koordinasi dengan TPI.',
    type: 'info', read: false, createdAt: '2026-11-10T08:00:00'
  },
  {
    id: 'NT002', userId: 'N001', title: 'Peringatan Stok TPI Mendekati Batas',
    message: 'Volume stok ikan yang belum terjual di TPI Brondong Unit 1 mendekati batas kapasitas aman. Pantau status pendaratan harian Anda.',
    type: 'warning', read: false, createdAt: '2026-11-10T07:30:00'
  },
  {
    id: 'NT003', userId: 'N001', title: 'Indikator CPUE Stabil',
    message: 'Tren CPUE ikan swanggi menunjukkan kondisi stabil. Tidak terdeteksi pola peningkatan tekanan penangkapan.',
    type: 'info', read: true, createdAt: '2026-11-09T16:00:00'
  },
  {
    id: 'NT004', userId: 'T001', title: 'Pendaratan Hari Ini',
    message: '3 kapal telah melaporkan pendaratan hari ini dengan total 2.670 kg ikan berbagai jenis.',
    type: 'info', read: false, createdAt: '2026-11-10T09:00:00'
  },
  {
    id: 'NT005', userId: 'P001', title: 'Kecocokan Pasokan Ditemukan',
    message: 'Sistem menemukan kecocokan 92% antara kebutuhan Anda dengan pasokan ikan swanggi di TPI Brondong.',
    type: 'success', read: false, createdAt: '2026-11-10T10:00:00'
  },
  // [SIMULASI] Notifikasi stok TPI untuk nelayan
  {
    id: 'NT006', userId: 'N001', title: 'Stok Ikan Swanggi Tinggi di TPI',
    message: 'Stok ikan swanggi belum terjual di TPI Brondong Unit 1 mencapai 310 kg (di atas threshold 300 kg). Pertimbangkan koordinasi penjualan lebih awal.',
    type: 'warning', read: false, createdAt: '2026-11-10T11:00:00'
  },
  {
    id: 'NT007', userId: 'N002', title: 'Stok Ikan Swanggi Tinggi di TPI',
    message: 'Stok ikan swanggi (kelas sedang, grade A) di TPI Brondong Unit 1 menumpuk 310 kg. Segera koordinasikan dengan petugas TPI untuk redistribusi.',
    type: 'warning', read: false, createdAt: '2026-11-10T11:05:00'
  },
  {
    id: 'NT008', userId: 'N003', title: 'Stok Ikan Tongkol Belum Terjual',
    message: 'Stok ikan tongkol Anda di TPI Brondong Unit 1 sebesar 300 kg belum terjual. Harga pasar saat ini Rp 15.000/kg.',
    type: 'warning', read: false, createdAt: '2026-11-10T11:10:00'
  },
];

// ============ DASHBOARD STATS ============
export const DASHBOARD_STATS = {
  totalLandingToday: 2670,
  predictedLanding: 6000,
  totalDemand: 5500,
  unabsorbedSupply: 500,
  registeredCompanies: 3,
  sustainabilityIndex: 'Baik',
  activeVessels: 45,
  totalTripsThisMonth: 365,
  avgPrice: 18000,
  totalTransactions: 156,
};

// ============ HELPER FUNCTIONS ============
export function getRecordsByNelayan(nelayanId: string): LandingRecord[] {
  return LANDING_RECORDS.filter(r => r.nelayanId === nelayanId);
}

export function getDemandsByCompany(companyId: string): DemandRequest[] {
  return DEMAND_REQUESTS.filter(d => d.companyId === companyId);
}

export function getNotificationsByUser(userId: string): Notification[] {
  return NOTIFICATIONS.filter(n => n.userId === userId);
}

export function getTodayRecords(): LandingRecord[] {
  return LANDING_RECORDS.filter(r => r.date === '2026-11-10');
}

export function calculateTotalLanding(records: LandingRecord[]): number {
  return records.reduce((sum, r) => sum + r.weightKg, 0);
}

export function calculateTotalSold(records: LandingRecord[]): number {
  return records.reduce((sum, r) => sum + r.soldKg, 0);
}

export function calculateTotalUnsold(records: LandingRecord[]): number {
  return records.reduce((sum, r) => sum + r.unsoldKg, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('id-ID').format(n);
}

// ============================================================
// [SIMULASI] Data baru: Industrial Requests, Fish Catalog, TPI Stock Alerts
// ============================================================

// ============ INDUSTRIAL REQUESTS ============
// [SIMULASI] Contoh pengajuan kebutuhan bahan baku dari industri pengolahan
export const INDUSTRIAL_REQUESTS: IndustrialRequest[] = [
  {
    id: 'IR001',
    industryId: 'P001',
    industryName: 'CV Samudra Protein',
    fishSpecies: 'Ikan Swanggi',
    quantityKg: 1500,
    sizePreference: 'sedang',
    gradeQuality: 'A',
    fishCondition: 'segar',
    requiredDate: '2026-11-14',
    additionalNotes: 'Untuk produksi tepung ikan ekspor. Preferensi berat per ekor > 200g.',
    status: 'tersedia_sebagian',
    submittedAt: '2026-11-10T08:00:00',
  },
  {
    id: 'IR002',
    industryId: 'P002',
    industryName: 'PT Indo Surimi',
    fishSpecies: 'Ikan Swanggi',
    quantityKg: 3000,
    sizePreference: 'semua',
    gradeQuality: 'B',
    fishCondition: 'semua',
    requiredDate: '2026-11-16',
    additionalNotes: 'Bahan baku surimi. Kondisi beku dapat diterima jika kadar air terjaga.',
    status: 'menunggu',
    submittedAt: '2026-11-10T09:30:00',
  },
  {
    id: 'IR003',
    industryId: 'P003',
    industryName: 'UD Berkah Laut',
    fishSpecies: 'Ikan Tongkol',
    quantityKg: 800,
    sizePreference: 'sedang',
    gradeQuality: 'B',
    fishCondition: 'segar',
    requiredDate: '2026-11-13',
    additionalNotes: 'Untuk produksi ikan kaleng. Kondisi segar wajib, tidak menerima beku.',
    status: 'tersedia',
    submittedAt: '2026-11-09T14:00:00',
  },
  {
    id: 'IR004',
    industryId: 'P001',
    industryName: 'CV Samudra Protein',
    fishSpecies: 'Ikan Kembung',
    quantityKg: 500,
    sizePreference: 'kecil',
    gradeQuality: 'C',
    fishCondition: 'semua',
    requiredDate: '2026-11-15',
    additionalNotes: 'Untuk pakan ternak. Grade C dapat diterima asal tidak busuk.',
    status: 'belum_terpenuhi',
    submittedAt: '2026-11-08T10:00:00',
  },
];

// ============ FISH CATALOG ============
// [SIMULASI] Katalog stok ikan TPI — data stock diambil & dihitung dari LANDING_RECORDS
// Kelompok: (fishSpecies, sizeCategory, quality) → aggregate weightKg & unsoldKg
export const FISH_CATALOG: FishCatalogItem[] = [
  {
    // LR001(unsold=100) + LR004(unsold=80) + LR008(unsold=30) + LR010(unsold=100) = 310 unsold
    // total = 850+780+680+900 = 3210; reserved dari ML001(250)+ML005(350) = 600 (berbeda grade, sederhanakan ke 0 reserved untuk grade A)
    id: 'CAT001',
    fishSpecies: 'Ikan Swanggi',
    scientificName: 'Priacanthus tayenus',
    totalStockKg: 3210,
    unsoldKg: 310,
    reservedKg: 0,
    availableKg: 310,
    sizeCategory: 'sedang',
    quality: 'A',
    pricePerKg: 18000,
    location: 'Brondong, Lamongan',
    tpiName: 'TPI Brondong Unit 1',
    updatedAt: '2026-11-10T10:00:00',
  },
  {
    // LR010(unsold=100, grade B sedang) — entry terpisah untuk grade B sedang
    id: 'CAT002',
    fishSpecies: 'Ikan Swanggi',
    scientificName: 'Priacanthus tayenus',
    totalStockKg: 900,
    unsoldKg: 100,
    reservedKg: 350,
    availableKg: 0,
    sizeCategory: 'sedang',
    quality: 'B',
    pricePerKg: 16000,
    location: 'Brondong, Lamongan',
    tpiName: 'TPI Brondong Unit 1',
    updatedAt: '2026-11-10T10:00:00',
  },
  {
    // LR002(unsold=0) + LR006(unsold=70) = 70 unsold, total 620+920=1540; reserved ML002(180)
    id: 'CAT003',
    fishSpecies: 'Ikan Swanggi',
    scientificName: 'Priacanthus tayenus',
    totalStockKg: 1540,
    unsoldKg: 70,
    reservedKg: 70,
    availableKg: 0,
    sizeCategory: 'besar',
    quality: 'A',
    pricePerKg: 21500,
    location: 'Brondong, Lamongan',
    tpiName: 'TPI Brondong Unit 1',
    updatedAt: '2026-11-10T10:00:00',
  },
  {
    // LR003(unsold=300, sedang, B); reserved ML003(400 — available, belum reserved)
    id: 'CAT004',
    fishSpecies: 'Ikan Tongkol',
    scientificName: 'Euthynnus affinis',
    totalStockKg: 1200,
    unsoldKg: 300,
    reservedKg: 0,
    availableKg: 300,
    sizeCategory: 'sedang',
    quality: 'B',
    pricePerKg: 15000,
    location: 'Brondong, Lamongan',
    tpiName: 'TPI Brondong Unit 1',
    updatedAt: '2026-11-10T10:00:00',
  },
  {
    // LR005(unsold=50, kecil, B); reserved ML004(120)
    id: 'CAT005',
    fishSpecies: 'Ikan Kembung',
    scientificName: 'Rastrelliger kanagurta',
    totalStockKg: 450,
    unsoldKg: 50,
    reservedKg: 50,
    availableKg: 0,
    sizeCategory: 'kecil',
    quality: 'B',
    pricePerKg: 12000,
    location: 'Brondong, Lamongan',
    tpiName: 'TPI Brondong Unit 1',
    updatedAt: '2026-11-10T10:00:00',
  },
  {
    // LR007(unsold=50, sedang, B); reserved ML006(150)
    id: 'CAT006',
    fishSpecies: 'Ikan Kurisi',
    scientificName: 'Nemipterus japonicus',
    totalStockKg: 350,
    unsoldKg: 50,
    reservedKg: 50,
    availableKg: 0,
    sizeCategory: 'sedang',
    quality: 'B',
    pricePerKg: 14000,
    location: 'Brondong, Lamongan',
    tpiName: 'TPI Brondong Unit 1',
    updatedAt: '2026-11-10T10:00:00',
  },
];

// ============ TPI STOCK ALERTS ============
// [SIMULASI] Alert stok TPI untuk notifikasi nelayan — threshold 300 kg
// alertLevel: 'tinggi' jika unsoldKg > 300, 'kritis' jika > 600, 'normal' jika <= 300
export const TPI_STOCK_ALERTS: TPIStockAlert[] = [
  {
    id: 'SA001',
    fishSpecies: 'Ikan Swanggi',
    totalStockKg: 3210,
    unsoldKg: 310,
    reservedKg: 0,
    threshold: 300,
    alertLevel: 'tinggi',
    updatedAt: '2026-11-10T10:00:00',
    message: 'Stok ikan swanggi (sedang, grade A) di TPI Brondong Unit 1 melebihi batas aman (310 kg > 300 kg). Koordinasi penjualan segera disarankan.',
  },
  {
    id: 'SA002',
    fishSpecies: 'Ikan Tongkol',
    totalStockKg: 1200,
    unsoldKg: 300,
    reservedKg: 0,
    threshold: 300,
    alertLevel: 'tinggi',
    updatedAt: '2026-11-10T10:00:00',
    message: 'Stok ikan tongkol (sedang, grade B) di TPI Brondong Unit 1 mencapai batas threshold (300 kg). Pantau perkembangan dan koordinasikan redistribusi jika diperlukan.',
  },
  {
    id: 'SA003',
    fishSpecies: 'Ikan Kembung',
    totalStockKg: 450,
    unsoldKg: 50,
    reservedKg: 50,
    threshold: 300,
    alertLevel: 'normal',
    updatedAt: '2026-11-10T10:00:00',
    message: 'Stok ikan kembung (kecil, grade B) di TPI Brondong Unit 1 dalam batas aman (50 kg). Tidak diperlukan tindakan segera.',
  },
];

// ============ HELPER FUNCTIONS (baru) ============
// [SIMULASI]
export function getIndustrialRequestsByIndustry(industryId: string): IndustrialRequest[] {
  return INDUSTRIAL_REQUESTS.filter(r => r.industryId === industryId);
}

// [SIMULASI]
export function getCatalogBySpecies(species: string): FishCatalogItem[] {
  return FISH_CATALOG.filter(c => c.fishSpecies === species);
}

