import { useState } from 'react';
import {
  Fish,
  TrendingUp,
  Package,
  Building2,
  Shield,
  Brain,
  Anchor,
  ClipboardList,
  Factory,
  Store,
  Bell,
  CloudSun,
  BarChart3,
  CheckCircle2,
  Clock,
  Percent,
  ShoppingBag,
  DollarSign,
  ListOrdered,
  PlusCircle,
  Plus,
  X,
  CheckCircle,
  AlertTriangle,
  Layers,
  ThermometerSnowflake,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BMKGWeatherWidget from '../components/weather/BMKGWeatherWidget';
import {
  LineChart, BarChart, AreaChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Line, Bar, Area,
} from 'recharts';

import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/common/StatCard';
import PageHeader from '../components/common/PageHeader';
import {
  DASHBOARD_STATS,
  LANDING_PREDICTIONS,
  SUPPLY_DEMAND_DATA,
  PRICE_DATA,
  CPUE_DATA,
  FOOD_LOSS_METRICS,
  LANDING_RECORDS,
  FISHING_PLANS,
  MARKET_LISTINGS,
  PURCHASE_ORDERS,
  NOTIFICATIONS,
  INDUSTRIAL_REQUESTS as INITIAL_INDUSTRIAL_REQUESTS,
  TPI_STOCK_ALERTS,
  FISH_SPECIES,
  formatNumber,
  formatCurrency,
  getRecordsByNelayan,
  getNotificationsByUser,
  getTodayRecords,
  calculateTotalLanding,
} from '../data/simulationData';
import type { IndustrialRequest } from '../types';

// ─────────────────────────────────────────────
// Shared chart colors
// ─────────────────────────────────────────────
const NAVY = '#1e3a5f';
const TEAL = '#0d7377';
const CYAN = '#00bcd4';
const EMERALD = '#10b981';
const AMBER = '#f59e0b';
const RED = '#ef4444';

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="h-72">{children}</div>
    </div>
  );
}

function shortDate(d: string) {
  const parts = d.split('-');
  return `${parts[2]}/${parts[1]}`;
}

// ═══════════════════════════════════════════════
// ADMIN DASHBOARD
// Pusat pengelolaan pendaratan, stok ikan, permintaan industri, distribusi & cold storage
// ═══════════════════════════════════════════════
function AdminDashboard() {
  const todayRecords = getTodayRecords();
  const totalToday = calculateTotalLanding(todayRecords);
  const totalSold = LANDING_RECORDS.reduce((s, r) => s + r.soldKg, 0);
  const totalUnsold = LANDING_RECORDS.reduce((s, r) => s + r.unsoldKg, 0);
  const totalReserved = MARKET_LISTINGS.filter((l) => l.status === 'reserved').reduce((s, l) => s + l.availableKg, 0);
  const [requests, setRequests] = useState<IndustrialRequest[]>(INITIAL_INDUSTRIAL_REQUESTS);

  const handleUpdateStatus = (id: string, newStatus: IndustrialRequest['status']) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  const statusLabel = (s: IndustrialRequest['status']) => {
    switch (s) {
      case 'menunggu': return 'Menunggu';
      case 'tersedia_sebagian': return 'Tersedia Sebagian';
      case 'tersedia': return 'Tersedia';
      case 'belum_terpenuhi': return 'Belum Terpenuhi';
      default: return s;
    }
  };

  const statusBadge = (s: IndustrialRequest['status']) => {
    switch (s) {
      case 'menunggu': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'tersedia_sebagian': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tersedia': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'belum_terpenuhi': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <>
      {/* ── Stat Cards Utama ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Total Pendaratan Hari Ini"
          value={`${formatNumber(totalToday)} kg`}
          icon={<Fish className="w-5 h-5" />}
          color="navy"
          trend={{ value: 8, label: 'vs kemarin' }}
        />
        <StatCard
          title="Prediksi Pendaratan"
          value={`${formatNumber(DASHBOARD_STATS.predictedLanding)} kg`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="teal"
          subtitle="Minggu depan"
        />
        <StatCard
          title="Pengajuan Industri"
          value={requests.length}
          icon={<Factory className="w-5 h-5" />}
          color="cyan"
          subtitle={`${requests.filter(r => r.status === 'menunggu').length} perlu verifikasi`}
        />
        <StatCard
          title="Stok Belum Terjual"
          value={`${formatNumber(totalUnsold)} kg`}
          icon={<Package className="w-5 h-5" />}
          color="warning"
        />
        <StatCard
          title="Industri Terdaftar"
          value={DASHBOARD_STATS.registeredCompanies}
          icon={<Building2 className="w-5 h-5" />}
          color="info"
        />
        <StatCard
          title="Indikator Keberlanjutan"
          value={DASHBOARD_STATS.sustainabilityIndex}
          icon={<Shield className="w-5 h-5" />}
          color="success"
        />
      </div>

      {/* ── Pusat Monitoring Stok & Rantai Pasok TPI ── */}
      <div className="card mb-6 bg-gradient-to-r from-slate-50 via-white to-ocean-50/30 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal" />
              Pusat Monitoring Stok, Distribusi & Cold Storage TPI
            </h3>
            <p className="text-xs text-slate-500">
              Pengawasan real-time stok fisik ikan, pemesanan teralokasi, serta keterpakaian cold storage.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-semibold text-teal hover:text-teal-dark flex items-center gap-1 self-start sm:self-auto"
          >
            Buka Fish Catalog <ExternalLink size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <Fish size={14} className="text-navy" /> Stok Masuk (Hari Ini)
            </p>
            <p className="text-xl font-bold text-navy mt-1">{formatNumber(totalToday)} kg</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{todayRecords.length} kapal mendarat</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" /> Stok Terjual
            </p>
            <p className="text-xl font-bold text-emerald-600 mt-1">{formatNumber(totalSold)} kg</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Penyerapan lelang normal</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <Package size={14} className="text-amber-600" /> Stok Belum Terjual
            </p>
            <p className="text-xl font-bold text-amber-600 mt-1">{formatNumber(totalUnsold)} kg</p>
            <p className="text-[10px] text-amber-700/80 mt-0.5">Siap alokasi industri</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <p className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <ThermometerSnowflake size={14} className="text-cyan-dark" /> Cold Storage TPI
            </p>
            <p className="text-xl font-bold text-cyan-dark mt-1">68%</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Suhu: -20°C (Kondisi Prima)</p>
          </div>
        </div>
      </div>

      {/* ── Section Industrial Demand Requests ── */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Factory className="w-4 h-4 text-purple-600" />
              Industrial Demand Requests — Pengajuan Kebutuhan Bahan Baku Industri [SIMULASI]
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Notifikasi dan pemenuhan bahan baku dari pabrik pengolahan terhadap stok TPI.
            </p>
          </div>
          <Link
            to="/industrial-demand"
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            Kelola Lengkap <ExternalLink size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Industri</th>
                <th className="text-left py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Komoditas Ikan</th>
                <th className="text-right py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Volume (kg)</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Ukuran</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Grade Mutu</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Kondisi</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Tanggal Butuh</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Status Pengajuan</th>
                <th className="text-center py-2.5 px-2 text-xs font-semibold text-slate-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {requests.slice(0, 5).map((req) => (
                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-2 font-medium text-slate-800 text-xs">{req.industryName}</td>
                  <td className="py-2 px-2 text-slate-600 text-xs font-medium">{req.fishSpecies}</td>
                  <td className="py-2 px-2 text-right font-bold text-navy text-xs">{formatNumber(req.quantityKg)}</td>
                  <td className="py-2 px-2 text-center capitalize text-slate-600 text-xs">{req.sizePreference}</td>
                  <td className="py-2 px-2 text-center">
                    <span className={`badge text-xs ${req.gradeQuality === 'A' ? 'badge-success' : 'badge-warning'}`}>
                      {req.gradeQuality}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center capitalize text-slate-600 text-xs">{req.fishCondition}</td>
                  <td className="py-2 px-2 text-center text-slate-600 text-xs">{req.requiredDate}</td>
                  <td className="py-2 px-2 text-center">
                    <span className={`badge text-xs border ${statusBadge(req.status)}`}>
                      {statusLabel(req.status)}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <select
                      value={req.status}
                      onChange={(e) => handleUpdateStatus(req.id, e.target.value as IndustrialRequest['status'])}
                      className="text-[11px] border border-slate-200 rounded-lg px-2 py-1 bg-white"
                    >
                      <option value="menunggu">Menunggu</option>
                      <option value="tersedia_sebagian">Tersedia Sebagian</option>
                      <option value="tersedia">Tersedia</option>
                      <option value="belum_terpenuhi">Belum Terpenuhi</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── AI Insight Panel ── */}
      <div className="card border-l-4 border-l-cyan mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-cyan-dark" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Analisis AI — Keseimbangan Pasokan & Permintaan Industri</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Prediksi pendaratan minggu depan sebesar <span className="font-semibold text-teal">{formatNumber(DASHBOARD_STATS.predictedLanding)} kg</span> mencukupi
              kebutuhan bahan baku industri pengolahan terdaftar.
              Stok belum terjual saat ini ({formatNumber(totalUnsold)} kg) dapat dialokasikan langsung untuk permintaan industri berstatus <em>Menunggu</em> guna menekan potensi food loss.
            </p>
          </div>
        </div>
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Tren Pendaratan & Prediksi (kg)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LANDING_PREDICTIONS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => formatNumber(Number(v) || 0) + ' kg'} labelFormatter={(l: any) => `Tanggal: ${l}`} />
              <Legend />
              <Line type="monotone" dataKey="actual" name="Aktual" stroke={NAVY} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="predicted" name="Prediksi" stroke={CYAN} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="upperBound" name="Batas Atas" stroke={TEAL} strokeWidth={1} strokeDasharray="2 2" dot={false} />
              <Line type="monotone" dataKey="lowerBound" name="Batas Bawah" stroke={TEAL} strokeWidth={1} strokeDasharray="2 2" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Pasokan vs Permintaan (kg)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SUPPLY_DEMAND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => formatNumber(Number(v) || 0) + ' kg'} />
              <Legend />
              <Bar dataKey="supply" name="Pasokan" fill={TEAL} radius={[4, 4, 0, 0]} />
              <Bar dataKey="demand" name="Permintaan" fill={CYAN} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tren Harga Ikan Swanggi (Rp/kg)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PRICE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: any) => `${(Number(v) || 0) / 1000}rb`} />
              <Tooltip formatter={(v: any, name: any) => name === 'Harga' ? formatCurrency(Number(v) || 0) : formatNumber(Number(v) || 0) + ' kg'} />
              <Legend />
              <Area type="monotone" dataKey="price" name="Harga" stroke={NAVY} fill={NAVY} fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="volume" name="Volume" stroke={TEAL} fill={TEAL} fillOpacity={0.1} strokeWidth={1} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Tren CPUE (kg / trip)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CPUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="period" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => formatNumber(Number(v) || 0)} />
              <Legend />
              <Line type="monotone" dataKey="cpue" name="CPUE" stroke={EMERALD} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="trips" name="Jumlah Trip" stroke={AMBER} strokeWidth={1} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Food Loss & Penyerapan Pasar (kg)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FOOD_LOSS_METRICS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => formatNumber(Number(v) || 0) + ' kg'} />
              <Legend />
              <Bar dataKey="absorbed" name="Terserap" stackId="a" fill={EMERALD} />
              <Bar dataKey="unabsorbed" name="Belum Terserap" stackId="a" fill={RED} />
              <Bar dataKey="redirected" name="Dialihkan" stackId="a" fill={AMBER} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════
// NELAYAN DASHBOARD
// Menghapus kartu permintaan pasar, mempertahankan prakiraan pendaratan,
// penangkapan berkelanjutan, prediksi harga, BMKG, dan menambahkan TPI Stock Alert
// ═══════════════════════════════════════════════
function NelayanDashboard({ userId }: { userId: string }) {
  const myRecords = getRecordsByNelayan(userId);
  // Pastikan Nelayan TIDAK menerima/melihat notifikasi permintaan pasar industri
  const myNotifications = getNotificationsByUser(userId).filter(
    (n) => !n.title.toLowerCase().includes('permintaan pasar') && !n.title.toLowerCase().includes('kebutuhan industri')
  );
  const myPlans = FISHING_PLANS.filter((p) => p.nelayanId === userId);
  const totalCatch = myRecords.reduce((s, r) => s + r.weightKg, 0);
  const todayRecords = myRecords.filter((r) => r.date === '2026-11-10');
  const todayCatch = todayRecords.reduce((s, r) => s + r.weightKg, 0);
  const totalUnsoldTPI = LANDING_RECORDS.reduce((sum, r) => sum + r.unsoldKg, 0);

  return (
    <>
      {/* ── Stat Cards (Bersih dari Permintaan Pasar) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Tangkapan Hari Ini"
          value={`${formatNumber(todayCatch)} kg`}
          icon={<Fish className="w-5 h-5" />}
          color="navy"
          subtitle="Hasil pendaratan hari ini"
        />
        <StatCard
          title="Total Tangkapan Tercatat"
          value={`${formatNumber(totalCatch)} kg`}
          icon={<Anchor className="w-5 h-5" />}
          color="teal"
          subtitle={`${myRecords.length} trip melaut tercatat`}
        />
        <StatCard
          title="Status Keberlanjutan (CPUE)"
          value="Baik & Stabil"
          icon={<Shield className="w-5 h-5" />}
          color="success"
          subtitle="Tekanan penangkapan terjaga"
        />
        <StatCard
          title="Stok TPI Belum Terjual"
          value={`${formatNumber(totalUnsoldTPI)} kg`}
          icon={<Package className="w-5 h-5" />}
          color="warning"
          subtitle="Total akumulasi stok TPI"
        />
      </div>

      {/* ── Prakiraan Cuaca BMKG ── */}
      <div className="mb-6">
        <BMKGWeatherWidget />
      </div>

      {/* ── TPI Stock Alert Section ── */}
      {TPI_STOCK_ALERTS.length > 0 && (
        <div className="card border-l-4 border-l-amber-500 mb-6 bg-gradient-to-r from-amber-50/20 to-white">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bell className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  TPI Stock Alert — Peringatan Stok Komoditas TPI [SIMULASI]
                </h3>
                <p className="text-xs text-slate-500">
                  Notifikasi otomatis sistem saat volume pendaratan atau stok ikan yang belum terjual di TPI mencapai ambang batas tinggi.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {TPI_STOCK_ALERTS.map((alert) => {
              const isHigh = alert.alertLevel === 'tinggi' || alert.alertLevel === 'kritis';
              return (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    alert.alertLevel === 'kritis'
                      ? 'bg-red-50/70 border-red-200'
                      : isHigh
                      ? 'bg-amber-50/70 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <Fish size={16} className={isHigh ? 'text-amber-600' : 'text-slate-400'} />
                      {alert.fishSpecies}
                    </span>
                    <span
                      className={`badge text-[10px] ${
                        alert.alertLevel === 'kritis'
                          ? 'bg-red-100 text-red-700'
                          : isHigh
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {alert.alertLevel === 'kritis' ? '⚠ Batas Kritis' : isHigh ? '⚡ Stok Tinggi' : 'Normal'}
                    </span>
                  </div>

                  {/* Rincian Pembedaan: Belum Terjual vs Sudah Dipesan */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-white/80 rounded-lg text-xs mb-2 border border-slate-100">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Total Stok</p>
                      <p className="font-semibold text-slate-700">{formatNumber(alert.totalStockKg)} kg</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600 uppercase font-bold">Belum Terjual</p>
                      <p className="font-bold text-amber-700">{formatNumber(alert.unsoldKg)} kg</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-600 uppercase">Sudah Dipesan</p>
                      <p className="font-semibold text-blue-700">{formatNumber(alert.reservedKg)} kg</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{alert.message}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                    <span>Ambang batas: {alert.threshold} kg</span>
                    <span>Diperbarui: {alert.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Grid Rencana Melaut & Notifikasi ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Fishing Plan Summary */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-teal" /> Rencana Penangkapan & Rekomendasi Ekologis
            </h3>
            <Link to="/fishing-plan" className="text-xs text-teal font-semibold hover:underline">
              Semua Rencana →
            </Link>
          </div>
          {myPlans.length === 0 ? (
            <p className="text-sm text-slate-400">Belum ada rencana penangkapan aktif.</p>
          ) : (
            <div className="space-y-3">
              {myPlans.map((p) => (
                <div key={p.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800">{p.vesselName}</span>
                    <span className={`badge ${p.status === 'analyzed' ? 'badge-success' : 'badge-warning'}`}>
                      {p.status === 'analyzed' ? 'Dianalisis AI' : p.status === 'submitted' ? 'Diajukan' : p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Target: {p.targetSpecies} — Estimasi: {formatNumber(p.estimatedCatchKg)} kg</p>
                  <p className="text-xs text-slate-500">Jadwal: {p.departureDate} ({p.durationDays} hari)</p>
                  {p.aiAnalysis && (
                    <div className="mt-2 p-2 bg-cyan/5 rounded border border-cyan/20 text-xs text-slate-600">
                      <span className="font-semibold text-cyan-dark">AI Advisor:</span> Status Ekologis{' '}
                      <span className="capitalize font-semibold text-emerald-600">{p.aiAnalysis.ecologicalStatus}</span>,
                      Tingkat Risiko: <span className="capitalize font-semibold">{p.aiAnalysis.riskLevel}</span>.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifikasi Khusus Nelayan (Informasi Keberlanjutan & Stok TPI) */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" /> Notifikasi Pendaratan & Stok
          </h3>
          {myNotifications.length === 0 ? (
            <p className="text-sm text-slate-400">Tidak ada notifikasi saat ini.</p>
          ) : (
            <div className="space-y-3">
              {myNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-lg border ${
                    n.type === 'warning'
                      ? 'bg-amber-50/50 border-amber-200'
                      : n.read
                      ? 'bg-white border-slate-100'
                      : 'bg-blue-50/50 border-blue-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                    <span className="text-sm font-medium text-slate-800">{n.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tangkapan Terakhir */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Catatan Pendaratan Mandiri</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Tanggal</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Jenis Ikan</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Berat (kg)</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Terjual</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Harga Acuan</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Kualitas</th>
              </tr>
            </thead>
            <tbody>
              {myRecords.slice(0, 5).map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-2 text-slate-600">{r.date}</td>
                  <td className="py-2.5 px-2 text-slate-800 font-medium">{r.fishSpecies}</td>
                  <td className="py-2.5 px-2 text-right font-medium text-slate-800">{formatNumber(r.weightKg)}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{formatNumber(r.soldKg)}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{formatCurrency(r.pricePerKg)}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`badge ${r.quality === 'A' ? 'badge-success' : 'badge-warning'}`}>{r.quality}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════
// TPI DASHBOARD
// Pengelolaan pendaratan, verifikasi stok, dan koordinasi industri
// ═══════════════════════════════════════════════
function TPIDashboard() {
  const todayRecords = getTodayRecords();
  const totalToday = calculateTotalLanding(todayRecords);
  const totalAll = calculateTotalLanding(LANDING_RECORDS);
  const totalUnsold = LANDING_RECORDS.reduce((s, r) => s + r.unsoldKg, 0);
  const pendingCount = LANDING_RECORDS.filter((r) => r.status === 'recorded').length;

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Pendaratan Hari Ini"
          value={`${formatNumber(totalToday)} kg`}
          icon={<Fish className="w-5 h-5" />}
          color="navy"
          subtitle={`${todayRecords.length} kapal mendarat`}
        />
        <StatCard
          title="Total Tercatat di TPI"
          value={`${formatNumber(totalAll)} kg`}
          icon={<ClipboardList className="w-5 h-5" />}
          color="teal"
          subtitle={`${LANDING_RECORDS.length} catatan pendaratan`}
        />
        <StatCard
          title="Stok Belum Terjual"
          value={`${formatNumber(totalUnsold)} kg`}
          icon={<Package className="w-5 h-5" />}
          color="warning"
          subtitle="Tersedia di cold storage"
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={pendingCount}
          icon={<Clock className="w-5 h-5" />}
          color={pendingCount > 0 ? 'warning' : 'success'}
          subtitle="Pendaratan baru"
        />
      </div>

      {/* Quick Action Navigation */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Link to="/tpi-landing" className="btn-primary flex items-center gap-2 text-xs py-2 px-4">
          <PlusCircle className="w-4 h-4" /> Catat Pendaratan Baru
        </Link>
        <Link to="/industrial-demand" className="btn-secondary flex items-center gap-2 text-xs py-2 px-4">
          <Factory className="w-4 h-4" /> Cek Permintaan Bahan Baku Industri
        </Link>
        <Link to="/marketplace" className="btn-outline flex items-center gap-2 text-xs py-2 px-4">
          <Fish className="w-4 h-4" /> Kelola Fish Catalog
        </Link>
      </div>

      {/* Ringkasan Stok Komoditas TPI */}
      <div className="card mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal" /> Ringkasan Ketersediaan Stok per Komoditas di TPI
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(
            LANDING_RECORDS.reduce((acc, r) => {
              acc[r.fishSpecies] = acc[r.fishSpecies] || { total: 0, sold: 0, unsold: 0 };
              acc[r.fishSpecies].total += r.weightKg;
              acc[r.fishSpecies].sold += r.soldKg;
              acc[r.fishSpecies].unsold += r.unsoldKg;
              return acc;
            }, {} as Record<string, { total: number; sold: number; unsold: number }>)
          ).map(([species, data]) => (
            <div key={species} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-navy mb-1.5">{species}</p>
              <div className="space-y-0.5 text-xs text-slate-600">
                <p>Total: <span className="font-medium text-slate-800">{formatNumber(data.total)} kg</span></p>
                <p>Terjual: <span className="font-medium text-emerald-600">{formatNumber(data.sold)} kg</span></p>
                <p>Belum Terjual: <span className="font-bold text-amber-600">{formatNumber(data.unsold)} kg</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Catatan Pendaratan Terbaru */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Catatan Pendaratan Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Tanggal</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Kapal</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Nelayan</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Jenis Ikan</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Berat (kg)</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Kualitas</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {LANDING_RECORDS.slice(0, 8).map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-2 text-slate-600">{r.date}</td>
                  <td className="py-2.5 px-2 font-medium text-slate-800">{r.vesselName}</td>
                  <td className="py-2.5 px-2 text-slate-600">{r.nelayanName}</td>
                  <td className="py-2.5 px-2 text-slate-600">{r.fishSpecies}</td>
                  <td className="py-2.5 px-2 text-right font-medium text-slate-800">{formatNumber(r.weightKg)}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`badge ${r.quality === 'A' ? 'badge-success' : 'badge-warning'}`}>{r.quality}</span>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`badge ${r.status === 'completed' ? 'badge-success' : r.status === 'verified' ? 'badge-info' : 'badge-warning'}`}>
                      {r.status === 'completed' ? 'Selesai' : r.status === 'verified' ? 'Terverifikasi' : 'Tercatat'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════
// INDUSTRI DASHBOARD (Sebelumnya Perusahaan)
// Pengajuan kebutuhan bahan baku & pantauan ketersediaan Fish Catalog
// ═══════════════════════════════════════════════
function IndustriDashboard({ userId }: { userId: string }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState<IndustrialRequest[]>(INITIAL_INDUSTRIAL_REQUESTS);
  const [showModal, setShowModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State untuk Industrial Raw Material Request
  const [formData, setFormData] = useState({
    fishSpecies: 'Ikan Swanggi',
    quantityKg: 2000,
    sizePreference: 'sedang' as 'kecil' | 'sedang' | 'besar' | 'semua',
    gradeQuality: 'A' as 'A' | 'B' | 'C',
    fishCondition: 'segar' as 'segar' | 'beku' | 'semua',
    requiredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    additionalNotes: '',
  });

  const myRequests = requests.filter(
    (r) => r.industryId === userId || r.industryName === user?.name || r.industryName === user?.companyName
  );
  // Fallback to all demo requests if user is a demo user with no filtered matches
  const displayRequests = myRequests.length > 0 ? myRequests : requests;

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: IndustrialRequest = {
      id: `IR${String(requests.length + 1).padStart(3, '0')}`,
      industryId: userId || 'P001',
      industryName: user?.companyName || user?.name || 'CV Samudra Protein',
      fishSpecies: formData.fishSpecies,
      quantityKg: Number(formData.quantityKg),
      sizePreference: formData.sizePreference,
      gradeQuality: formData.gradeQuality,
      fishCondition: formData.fishCondition,
      requiredDate: formData.requiredDate,
      additionalNotes: formData.additionalNotes,
      status: 'menunggu',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    setRequests([newReq, ...requests]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitSuccess(false);
    }, 1500);
  };

  const statusBadge = (s: IndustrialRequest['status']) => {
    switch (s) {
      case 'menunggu': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'tersedia_sebagian': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tersedia': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'belum_terpenuhi': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  const statusLabel = (s: IndustrialRequest['status']) => {
    switch (s) {
      case 'menunggu': return 'Menunggu Konfirmasi';
      case 'tersedia_sebagian': return 'Tersedia Sebagian';
      case 'tersedia': return 'Stok Tersedia';
      case 'belum_terpenuhi': return 'Belum Terpenuhi';
      default: return s;
    }
  };

  const totalDemandKg = displayRequests.reduce((acc, r) => acc + r.quantityKg, 0);

  return (
    <>
      {/* ── Stat Cards Industri ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Pengajuan Kebutuhan Aktif"
          value={displayRequests.filter((r) => r.status === 'menunggu' || r.status === 'tersedia_sebagian').length}
          icon={<Factory className="w-5 h-5" />}
          color="navy"
          subtitle="Dalam proses verifikasi TPI"
        />
        <StatCard
          title="Total Volume Diajukan"
          value={`${formatNumber(totalDemandKg)} kg`}
          icon={<Package className="w-5 h-5" />}
          color="teal"
          subtitle="Kebutuhan bahan baku"
        />
        <StatCard
          title="Pengajuan Terpenuhi"
          value={displayRequests.filter((r) => r.status === 'tersedia').length}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="success"
          subtitle="Stok TPI siap alokasi"
        />
        <StatCard
          title="Koneksi Rantai Dingin"
          value="Terhubung"
          icon={<Shield className="w-5 h-5" />}
          color="info"
          subtitle="TPI Brondong Unit 1"
        />
      </div>

      {/* ── Action Button: Formulir Industrial Raw Material Request ── */}
      <div className="card mb-6 bg-gradient-to-r from-purple-50/50 via-white to-ocean-50/30 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-navy text-sm flex items-center gap-2">
            <Factory size={18} className="text-purple-600" />
            Pengajuan Kebutuhan Bahan Baku Industri (Raw Material Request)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Sampaikan kebutuhan spesifikasi ikan industri pengolahan Anda langsung ke pengelola TPI untuk disinkronkan dengan stok pendaratan.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto bg-purple-700 hover:bg-purple-800"
        >
          <Plus size={16} />
          Ajukan Kebutuhan Bahan Baku
        </button>
      </div>

      {/* ── Riwayat & Status Pengajuan Industri ── */}
      <div className="card mb-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-navy text-base flex items-center gap-2">
            <ListOrdered size={18} className="text-teal" />
            Riwayat & Status Pengajuan Bahan Baku Industri
          </h3>
          <span className="badge bg-purple-50 text-purple-700 text-xs">
            {displayRequests.length} Pengajuan Tercatat
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">ID & Tanggal</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Komoditas Ikan</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Kebutuhan (kg)</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Ukuran</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Grade Mutu</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Kondisi</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Tanggal Butuh</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayRequests.map((req) => (
                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-2">
                    <p className="font-bold text-navy text-xs">{req.id}</p>
                    <p className="text-[10px] text-slate-400">{req.submittedAt ? req.submittedAt.split(' ')[0] : '2026-11-10'}</p>
                  </td>
                  <td className="py-2.5 px-2 font-medium text-slate-800 text-xs">{req.fishSpecies}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-navy text-xs">{formatNumber(req.quantityKg)} kg</td>
                  <td className="py-2.5 px-2 text-center capitalize text-slate-600 text-xs">{req.sizePreference}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`badge text-xs ${req.gradeQuality === 'A' ? 'badge-success' : 'badge-warning'}`}>
                      Grade {req.gradeQuality}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center capitalize text-slate-600 text-xs">{req.fishCondition}</td>
                  <td className="py-2.5 px-2 text-center text-slate-600 text-xs">{req.requiredDate}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`badge text-[11px] border ${statusBadge(req.status)}`}>
                      {statusLabel(req.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Link Cepat ke Fish Catalog ── */}
      <div className="card flex items-center justify-between p-4 bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
            <Fish size={22} />
          </div>
          <div>
            <p className="font-bold text-navy text-sm">Lihat Ketersediaan Komoditas di Fish Catalog</p>
            <p className="text-xs text-slate-500">
              Pantau volume stok aktual, mutu, ukuran, dan harga acuan ikan segar di TPI Brondong.
            </p>
          </div>
        </div>
        <Link to="/marketplace" className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5">
          Buka Fish Catalog <ExternalLink size={14} />
        </Link>
      </div>

      {/* ── Modal Formulir Industrial Raw Material Request ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-navy text-base flex items-center gap-2">
                <Factory size={18} className="text-purple-600" />
                Formulir Industrial Raw Material Request
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-2">
                <CheckCircle size={48} className="text-emerald-500 mx-auto" />
                <h4 className="font-bold text-navy text-lg">Pengajuan Berhasil Dikirim!</h4>
                <p className="text-xs text-slate-500">
                  Data pengajuan telah tersimpan dan notifikasi baru telah diteruskan ke Dashboard TPI/Admin untuk verifikasi ketersediaan stok.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Jenis Ikan *</label>
                    <select
                      value={formData.fishSpecies}
                      onChange={(e) => setFormData({ ...formData, fishSpecies: e.target.value })}
                      className="select-field py-2 text-xs"
                      required
                    >
                      {FISH_SPECIES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Jumlah Kebutuhan (kg) *</label>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      required
                      value={formData.quantityKg}
                      onChange={(e) => setFormData({ ...formData, quantityKg: Number(e.target.value) })}
                      className="input-field py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Preferensi Ukuran *</label>
                    <select
                      value={formData.sizePreference}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sizePreference: e.target.value as 'kecil' | 'sedang' | 'besar' | 'semua',
                        })
                      }
                      className="select-field py-2 text-xs"
                    >
                      <option value="kecil">Kecil</option>
                      <option value="sedang">Sedang</option>
                      <option value="besar">Besar</option>
                      <option value="semua">Semua Ukuran</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Grade Mutu *</label>
                    <select
                      value={formData.gradeQuality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gradeQuality: e.target.value as 'A' | 'B' | 'C',
                        })
                      }
                      className="select-field py-2 text-xs"
                    >
                      <option value="A">Grade A (Segar Ekspor)</option>
                      <option value="B">Grade B (Standar Industri)</option>
                      <option value="C">Grade C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Kondisi Ikan *</label>
                    <select
                      value={formData.fishCondition}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fishCondition: e.target.value as 'segar' | 'beku' | 'semua',
                        })
                      }
                      className="select-field py-2 text-xs"
                    >
                      <option value="segar">Segar (Chilled)</option>
                      <option value="beku">Beku (Frozen)</option>
                      <option value="semua">Semua Kondisi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Tanggal Kebutuhan *</label>
                    <input
                      type="date"
                      required
                      value={formData.requiredDate}
                      onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                      className="input-field py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Catatan Spesifikasi Tambahan</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Kebutuhan bahan baku surimi, preferensi tanpa kepala/jeroan, jadwal angkut jam 06:00 WIB..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="input-field py-2 text-xs"
                  />
                </div>

                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-700 leading-relaxed">
                  <strong>Pemberitahuan Sistem:</strong> Pengajuan ini merupakan permintaan informasi bahan baku rantai pasok ke TPI Brondong, bukan transaksi e-commerce. Petugas TPI akan memverifikasi ketersediaan stok pendaratan.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary py-2 px-5 text-xs bg-purple-700 hover:bg-purple-800">
                    Kirim Pengajuan Kebutuhan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════
// PEDAGANG DASHBOARD
// ═══════════════════════════════════════════════
function PedagangDashboard({ userId }: { userId: string }) {
  const myOrders = PURCHASE_ORDERS.filter((o) => o.buyerId === userId);
  const totalSpent = myOrders.reduce((s, o) => s + o.totalPrice, 0);
  const availableKg = MARKET_LISTINGS.filter((l) => l.status === 'available').reduce((s, l) => s + l.availableKg, 0);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Ikan Tersedia di TPI"
          value={`${formatNumber(availableKg)} kg`}
          icon={<Fish className="w-5 h-5" />}
          color="navy"
          subtitle={`${MARKET_LISTINGS.filter((l) => l.status === 'available').length} komoditas`}
        />
        <StatCard
          title="Pesanan Aktif"
          value={myOrders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length}
          icon={<ShoppingBag className="w-5 h-5" />}
          color="teal"
        />
        <StatCard
          title="Total Pembelian"
          value={formatCurrency(totalSpent)}
          icon={<DollarSign className="w-5 h-5" />}
          color="cyan"
        />
        <StatCard
          title="Total Transaksi"
          value={myOrders.length}
          icon={<ListOrdered className="w-5 h-5" />}
          color="info"
        />
      </div>

      <div className="mb-6">
        <BMKGWeatherWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Store className="w-4 h-4 text-teal" /> Informasi Stok Ikan di TPI
            </h3>
            <Link to="/marketplace" className="text-xs text-teal font-semibold hover:underline">
              Buka Fish Catalog →
            </Link>
          </div>
          <div className="space-y-3">
            {MARKET_LISTINGS.filter((l) => l.status === 'available').slice(0, 5).map((l) => (
              <div key={l.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-800">{l.fishSpecies}</span>
                  <p className="text-xs text-slate-500">
                    {formatNumber(l.availableKg)} kg — {l.sizeCategory} — Mutu {l.quality}
                  </p>
                  <p className="text-xs text-slate-400">{l.tpiName} • {l.landingDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-navy">{formatCurrency(l.pricePerKg)}</p>
                  <p className="text-xs text-slate-400">/kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-navy" /> Riwayat Transaksi Distribusi
          </h3>
          {myOrders.length === 0 ? (
            <p className="text-sm text-slate-400">Belum ada pesanan.</p>
          ) : (
            <div className="space-y-3">
              {myOrders.map((o) => (
                <div key={o.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800">{o.fishSpecies}</span>
                    <span
                      className={`badge ${
                        o.status === 'delivered'
                          ? 'badge-success'
                          : o.status === 'confirmed'
                          ? 'badge-info'
                          : o.status === 'cancelled'
                          ? 'badge-danger'
                          : 'badge-warning'
                      }`}
                    >
                      {o.status === 'delivered'
                        ? 'Terkirim'
                        : o.status === 'confirmed'
                        ? 'Dikonfirmasi TPI'
                        : o.status === 'cancelled'
                        ? 'Dibatalkan'
                        : 'Menunggu'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {formatNumber(o.quantityKg)} kg — Total: {formatCurrency(o.totalPrice)}
                  </p>
                  <p className="text-xs text-slate-400">Tanggal: {o.orderDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════
// MAIN DASHBOARD PAGE
// ═══════════════════════════════════════════════
export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role ?? 'admin';

  const subtitleByRole: Record<string, string> = {
    admin: 'Pusat Pengelolaan Pendaratan, Stok TPI & Permintaan Industri [SIMULASI]',
    nelayan: `Selamat datang, ${user?.name ?? 'Nelayan'} — Pendaratan & Stok TPI [SIMULASI]`,
    tpi: `TPI: ${user?.tpiName ?? 'Brondong Unit 1'} — Pusat Operasional Pelelangan [SIMULASI]`,
    perusahaan: `Dashboard Industri: ${user?.companyName ?? user?.name ?? 'Industri Pengolahan'} [SIMULASI]`,
    pedagang: `Dashboard Pedagang & UMKM: ${user?.businessName ?? user?.name ?? 'Pedagang'} [SIMULASI]`,
  };

  return (
    <div>
      <PageHeader
        title="Dashboard SIRKULAUT"
        subtitle={subtitleByRole[role]}
        badge
      />

      {role === 'admin' && <AdminDashboard />}
      {role === 'nelayan' && <NelayanDashboard userId={user?.id ?? ''} />}
      {role === 'tpi' && <TPIDashboard />}
      {role === 'perusahaan' && <IndustriDashboard userId={user?.id ?? ''} />}
      {role === 'pedagang' && <PedagangDashboard userId={user?.id ?? ''} />}
    </div>
  );
}
