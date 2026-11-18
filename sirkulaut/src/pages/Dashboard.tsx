import {
  Fish,
  TrendingUp,
  ShoppingCart,
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
} from 'lucide-react';
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
  DEMAND_REQUESTS,
  DEMAND_MATCHES,
  MARKET_LISTINGS,
  PURCHASE_ORDERS,
  NOTIFICATIONS,
  formatNumber,
  formatCurrency,
  getRecordsByNelayan,
  getDemandsByCompany,
  getNotificationsByUser,
  getTodayRecords,
  calculateTotalLanding,
} from '../data/simulationData';

// ─────────────────────────────────────────────
// Shared chart colors
// ─────────────────────────────────────────────
const NAVY = '#1e3a5f';
const TEAL = '#0d7377';
const CYAN = '#00bcd4';
const EMERALD = '#10b981';
const AMBER = '#f59e0b';
const RED = '#ef4444';

// ─────────────────────────────────────────────
// Chart wrapper – keeps charts consistent
// ─────────────────────────────────────────────
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="h-72">{children}</div>
    </div>
  );
}

// Short date label helper
function shortDate(d: string) {
  const parts = d.split('-');
  return `${parts[2]}/${parts[1]}`;
}

// ═══════════════════════════════════════════════
// ADMIN / DEFAULT DASHBOARD
// ═══════════════════════════════════════════════
function AdminDashboard() {
  const todayRecords = getTodayRecords();

  return (
    <>
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Total Pendaratan Hari Ini"
          value={`${formatNumber(DASHBOARD_STATS.totalLandingToday)} kg`}
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
          title="Total Permintaan Pasar"
          value={`${formatNumber(DASHBOARD_STATS.totalDemand)} kg`}
          icon={<ShoppingCart className="w-5 h-5" />}
          color="cyan"
        />
        <StatCard
          title="Pasokan Belum Terserap"
          value={`${formatNumber(DASHBOARD_STATS.unabsorbedSupply)} kg`}
          icon={<Package className="w-5 h-5" />}
          color="warning"
        />
        <StatCard
          title="Perusahaan Terdaftar"
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

      {/* ── AI Insight Panel ── */}
      <div className="card border-l-4 border-l-cyan mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-cyan-dark" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Analisis AI — Keseimbangan Pasokan & Permintaan</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Prediksi pendaratan minggu depan sebesar <span className="font-semibold text-teal">{formatNumber(DASHBOARD_STATS.predictedLanding)} kg</span> mendekati
              total permintaan pasar (<span className="font-semibold text-navy">{formatNumber(DASHBOARD_STATS.totalDemand)} kg</span>).
              Surplus pasokan saat ini relatif kecil ({formatNumber(DASHBOARD_STATS.unabsorbedSupply)} kg), menunjukkan keseimbangan yang cukup baik.
              Disarankan untuk memperhatikan distribusi jenis dan ukuran ikan agar penyerapan pasar optimal.
              Indikator CPUE menunjukkan tren stabil — tidak ada indikasi tekanan berlebih terhadap sumber daya perikanan.
            </p>
          </div>
        </div>
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Landing Prediction Trend */}
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

        {/* Supply vs Demand */}
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

        {/* Price Trend */}
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
        {/* CPUE Trend */}
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

        {/* Food Loss Stacked */}
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

      {/* ── Recent Landing Records ── */}
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
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Terjual</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Harga/kg</th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {LANDING_RECORDS.slice(0, 7).map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-2 text-slate-600">{r.date}</td>
                  <td className="py-2.5 px-2 font-medium text-slate-800">{r.vesselName}</td>
                  <td className="py-2.5 px-2 text-slate-600">{r.nelayanName}</td>
                  <td className="py-2.5 px-2 text-slate-600">{r.fishSpecies}</td>
                  <td className="py-2.5 px-2 text-right font-medium text-slate-800">{formatNumber(r.weightKg)}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{formatNumber(r.soldKg)}</td>
                  <td className="py-2.5 px-2 text-right text-slate-600">{formatCurrency(r.pricePerKg)}</td>
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
// NELAYAN DASHBOARD
// ═══════════════════════════════════════════════
function NelayanDashboard({ userId }: { userId: string }) {
  const myRecords = getRecordsByNelayan(userId);
  const myNotifications = getNotificationsByUser(userId);
  const myPlans = FISHING_PLANS.filter((p) => p.nelayanId === userId);
  const totalCatch = myRecords.reduce((s, r) => s + r.weightKg, 0);
  const totalSold = myRecords.reduce((s, r) => s + r.soldKg, 0);
  const todayRecords = myRecords.filter((r) => r.date === '2026-11-10');
  const todayCatch = todayRecords.reduce((s, r) => s + r.weightKg, 0);

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Tangkapan Hari Ini"
          value={`${formatNumber(todayCatch)} kg`}
          icon={<Fish className="w-5 h-5" />}
          color="navy"
        />
        <StatCard
          title="Total Tangkapan"
          value={`${formatNumber(totalCatch)} kg`}
          icon={<Anchor className="w-5 h-5" />}
          color="teal"
          subtitle={`${myRecords.length} trip tercatat`}
        />
        <StatCard
          title="Kondisi Penangkapan"
          value="Baik"
          icon={<CloudSun className="w-5 h-5" />}
          color="success"
          subtitle="CPUE stabil"
        />
        <StatCard
          title="Permintaan Pasar"
          value={`${formatNumber(DASHBOARD_STATS.totalDemand)} kg`}
          icon={<ShoppingCart className="w-5 h-5" />}
          color="cyan"
          subtitle="Kebutuhan aktif"
        />
      </div>

      {/* ── Prakiraan Cuaca BMKG ── */}
      <div className="mb-6">
        <BMKGWeatherWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Fishing Plan Summary */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-teal" /> Rencana Penangkapan
          </h3>
          {myPlans.length === 0 ? (
            <p className="text-sm text-slate-400">Belum ada rencana penangkapan.</p>
          ) : (
            <div className="space-y-3">
              {myPlans.map((p) => (
                <div key={p.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800">{p.vesselName}</span>
                    <span className={`badge ${p.status === 'analyzed' ? 'badge-success' : 'badge-warning'}`}>
                      {p.status === 'analyzed' ? 'Dianalisis' : p.status === 'submitted' ? 'Diajukan' : p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Target: {p.targetSpecies} — {formatNumber(p.estimatedCatchKg)} kg</p>
                  <p className="text-xs text-slate-500">Berangkat: {p.departureDate} ({p.durationDays} hari)</p>
                  {p.aiAnalysis && (
                    <div className="mt-2 p-2 bg-cyan/5 rounded border border-cyan/20 text-xs text-slate-600">
                      <span className="font-semibold text-cyan-dark">AI:</span> Prediksi {formatNumber(p.aiAnalysis.predictedCatchKg)} kg,
                      Ekologis: <span className="capitalize">{p.aiAnalysis.ecologicalStatus}</span>,
                      Risiko: <span className="capitalize">{p.aiAnalysis.riskLevel}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" /> Notifikasi
          </h3>
          {myNotifications.length === 0 ? (
            <p className="text-sm text-slate-400">Tidak ada notifikasi.</p>
          ) : (
            <div className="space-y-3">
              {myNotifications.map((n) => (
                <div key={n.id} className={`p-3 rounded-lg border ${n.read ? 'bg-white border-slate-100' : 'bg-blue-50/50 border-blue-100'}`}>
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

      {/* Recent Catches */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Tangkapan Terakhir</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Tanggal</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Jenis Ikan</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Berat (kg)</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Terjual</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">Harga/kg</th>
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
// ═══════════════════════════════════════════════
function TPIDashboard() {
  const todayRecords = getTodayRecords();
  const totalToday = calculateTotalLanding(todayRecords);
  const totalAll = calculateTotalLanding(LANDING_RECORDS);
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
          subtitle={`${todayRecords.length} kapal`}
        />
        <StatCard
          title="Total Tercatat"
          value={`${formatNumber(totalAll)} kg`}
          icon={<ClipboardList className="w-5 h-5" />}
          color="teal"
          subtitle={`${LANDING_RECORDS.length} catatan`}
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={pendingCount}
          icon={<Clock className="w-5 h-5" />}
          color={pendingCount > 0 ? 'warning' : 'success'}
        />
        <StatCard
          title="Rata-rata Harga"
          value={formatCurrency(DASHBOARD_STATS.avgPrice)}
          icon={<DollarSign className="w-5 h-5" />}
          color="info"
          subtitle="Per kg hari ini"
        />
      </div>

      {/* Quick input button */}
      <div className="mb-6">
        <button className="btn-primary flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Catat Pendaratan Baru
        </button>
      </div>

      {/* Recent records table */}
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
// PERUSAHAAN DASHBOARD
// ═══════════════════════════════════════════════
function PerusahaanDashboard({ userId }: { userId: string }) {
  const myDemands = getDemandsByCompany(userId);
  const totalDemandKg = myDemands.reduce((s, d) => s + d.quantityKg, 0);
  const totalMatchedKg = myDemands.reduce((s, d) => s + d.matchedKg, 0);
  const fulfillmentRate = totalDemandKg > 0 ? Math.round((totalMatchedKg / totalDemandKg) * 100) : 0;
  const myMatches = DEMAND_MATCHES.filter((m) => myDemands.some((d) => d.id === m.demandId));

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Permintaan Aktif"
          value={myDemands.filter((d) => d.status === 'open' || d.status === 'partially_matched').length}
          icon={<ShoppingCart className="w-5 h-5" />}
          color="navy"
        />
        <StatCard
          title="Tercocokkan"
          value={`${formatNumber(totalMatchedKg)} kg`}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="teal"
        />
        <StatCard
          title="Tingkat Pemenuhan"
          value={`${fulfillmentRate}%`}
          icon={<Percent className="w-5 h-5" />}
          color={fulfillmentRate >= 50 ? 'success' : 'warning'}
        />
        <StatCard
          title="Total Kebutuhan"
          value={`${formatNumber(totalDemandKg)} kg`}
          icon={<Package className="w-5 h-5" />}
          color="info"
        />
      </div>

      {/* ── Prakiraan Cuaca BMKG ── */}
      <div className="mb-6">
        <BMKGWeatherWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Demand Requests */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-navy" /> Status Permintaan
          </h3>
          <div className="space-y-3">
            {myDemands.map((d) => {
              const pct = d.quantityKg > 0 ? Math.round((d.matchedKg / d.quantityKg) * 100) : 0;
              return (
                <div key={d.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800">{d.fishSpecies}</span>
                    <span className={`badge ${d.status === 'open' ? 'badge-info' : d.status === 'partially_matched' ? 'badge-warning' : 'badge-success'}`}>
                      {d.status === 'open' ? 'Terbuka' : d.status === 'partially_matched' ? 'Sebagian' : 'Terpenuhi'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Kebutuhan: {formatNumber(d.quantityKg)} kg — Tercocokkan: {formatNumber(d.matchedKg)} kg</p>
                  <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
                    <div className="bg-teal h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Matching Results */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal" /> Hasil Pencocokan AI
          </h3>
          {myMatches.length === 0 ? (
            <p className="text-sm text-slate-400">Belum ada hasil pencocokan.</p>
          ) : (
            <div className="space-y-3">
              {myMatches.map((m) => (
                <div key={m.demandId} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">{m.companyName}</span>
                    <span className={`text-sm font-bold ${m.matchScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {m.matchScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${m.matchScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${m.matchScore}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`px-1.5 py-0.5 rounded ${m.speciesMatch ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      Jenis ✓
                    </span>
                    <span className={`px-1.5 py-0.5 rounded ${m.sizeMatch ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      Ukuran ✓
                    </span>
                    <span className={`px-1.5 py-0.5 rounded ${m.qualityMatch ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      Kualitas ✓
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      Vol: {m.volumeMatch}%
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {m.distanceKm} km
                    </span>
                  </div>
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
// PEDAGANG DASHBOARD
// ═══════════════════════════════════════════════
function PedagangDashboard({ userId }: { userId: string }) {
  const myOrders = PURCHASE_ORDERS.filter((o) => o.buyerId === userId);
  const totalSpent = myOrders.reduce((s, o) => s + o.totalPrice, 0);
  const availableKg = MARKET_LISTINGS.filter((l) => l.status === 'available').reduce((s, l) => s + l.availableKg, 0);

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Ikan Tersedia"
          value={`${formatNumber(availableKg)} kg`}
          icon={<Fish className="w-5 h-5" />}
          color="navy"
          subtitle={`${MARKET_LISTINGS.filter((l) => l.status === 'available').length} listing`}
        />
        <StatCard
          title="Pesanan Aktif"
          value={myOrders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length}
          icon={<ShoppingBag className="w-5 h-5" />}
          color="teal"
        />
        <StatCard
          title="Total Pengeluaran"
          value={formatCurrency(totalSpent)}
          icon={<DollarSign className="w-5 h-5" />}
          color="cyan"
        />
        <StatCard
          title="Total Pesanan"
          value={myOrders.length}
          icon={<ListOrdered className="w-5 h-5" />}
          color="info"
        />
      </div>

      {/* ── Prakiraan Cuaca BMKG ── */}
      <div className="mb-6">
        <BMKGWeatherWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Available Listings Preview */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Store className="w-4 h-4 text-teal" /> Ikan Tersedia di Pasar
          </h3>
          <div className="space-y-3">
            {MARKET_LISTINGS.filter((l) => l.status === 'available').slice(0, 5).map((l) => (
              <div key={l.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-800">{l.fishSpecies}</span>
                  <p className="text-xs text-slate-500">
                    {formatNumber(l.availableKg)} kg — {l.sizeCategory} — Kualitas {l.quality}
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

        {/* Recent Orders */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-navy" /> Pesanan Terakhir
          </h3>
          {myOrders.length === 0 ? (
            <p className="text-sm text-slate-400">Belum ada pesanan.</p>
          ) : (
            <div className="space-y-3">
              {myOrders.map((o) => (
                <div key={o.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800">{o.fishSpecies}</span>
                    <span className={`badge ${
                      o.status === 'delivered' ? 'badge-success' :
                      o.status === 'confirmed' ? 'badge-info' :
                      o.status === 'cancelled' ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {o.status === 'delivered' ? 'Dikirim' :
                       o.status === 'confirmed' ? 'Dikonfirmasi' :
                       o.status === 'cancelled' ? 'Dibatalkan' : 'Pending'}
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
    admin: 'Ringkasan keseluruhan sistem perikanan',
    nelayan: `Selamat datang, ${user?.name ?? 'Nelayan'}`,
    tpi: `TPI: ${user?.tpiName ?? 'Brondong'}`,
    perusahaan: `${user?.companyName ?? 'Perusahaan'}`,
    pedagang: `${user?.businessName ?? 'Pedagang'}`,
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
      {role === 'perusahaan' && <PerusahaanDashboard userId={user?.id ?? ''} />}
      {role === 'pedagang' && <PedagangDashboard userId={user?.id ?? ''} />}
    </div>
  );
}
