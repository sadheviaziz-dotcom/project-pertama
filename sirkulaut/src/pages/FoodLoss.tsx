import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import {
  FOOD_LOSS_METRICS,
  formatNumber,
} from '../data/simulationData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  AlertTriangle,
  ShieldCheck,
  TrendingDown,
  RefreshCw,
  CheckCircle,
  Truck,
  Warehouse,
  Flame,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function FoodLoss() {
  const [data] = useState(FOOD_LOSS_METRICS);

  const totalLanded = data.reduce((sum, item) => sum + item.totalLanded, 0);
  const totalAbsorbed = data.reduce((sum, item) => sum + item.absorbed, 0);
  const totalUnabsorbed = data.reduce((sum, item) => sum + item.unabsorbed, 0);
  const totalRedirected = data.reduce((sum, item) => sum + item.redirected, 0);
  const totalPrevented = data.reduce((sum, item) => sum + item.potentialLossPrevented, 0);

  const lossMitigationRate = Math.round((totalPrevented / totalUnabsorbed) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Food Loss Prevention"
        subtitle="Sistem pemantauan dan mitigasi potensi kehilangan hasil tangkapan berbasis redistribusi cerdas."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Pendaratan (7 Hari)"
          value={`${formatNumber(totalLanded)} kg`}
          subtitle="Akumulasi tangkapan"
          icon={<CheckCircle size={20} />}
          color="navy"
        />
        <StatCard
          title="Terserap Pasar Utama"
          value={`${formatNumber(totalAbsorbed)} kg`}
          subtitle="Lelang & kontrak industri"
          icon={<ShieldCheck size={20} />}
          color="success"
        />
        <StatCard
          title="Pasokan Belum Terserap"
          value={`${formatNumber(totalUnabsorbed)} kg`}
          subtitle="Potensi risiko awal"
          icon={<AlertTriangle size={20} />}
          color="warning"
        />
        <StatCard
          title="Dialihkan ke Saluran Alt."
          value={`${formatNumber(totalRedirected)} kg`}
          subtitle="UMKM & cold storage"
          icon={<Truck size={20} />}
          color="teal"
        />
        <StatCard
          title="Food Loss Dicegah"
          value={`${formatNumber(totalPrevented)} kg`}
          subtitle={`Efisiensi mitigasi: ${lossMitigationRate}%`}
          icon={<TrendingDown size={20} />}
          color="cyan"
        />
      </div>

      {/* Caution Note */}
      <div className="card bg-amber-50/70 border-amber-200 text-amber-900 p-4 flex items-start gap-3">
        <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-semibold">Integritas Metrik & Catatan Ilmiah:</strong> Sistem tidak mengklaim food loss berhasil dicegah secara mutlak tanpa data verifikasi realisasi rantai pasok. Metrik di atas merupakan{' '}
          <strong>estimasi potensi penyelamatan nilai ekonomis dan mutu hasil tangkapan</strong> melalui redistribusi terpandu SIRKULAUT.
        </div>
      </div>

      {/* Chart: Aliran Penyerapan Harian */}
      <div className="card space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-navy text-base">Dinamika Penyerapan & Redistribusi Harian</h3>
            <p className="text-xs text-slate-500">Perbandingan volume terserap langsung, pasokan belum terserap, dan hasil pengalihan (DATA SIMULASI)</p>
          </div>
          <span className="badge badge-info text-xs">Unit: Kilogram (kg)</span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                formatter={(value: any) => [`${formatNumber(Number(value) || 0)} kg`]}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="absorbed" name="Terserap Pasar Utama" fill="#0d7377" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="redirected" name="Dialihkan ke Pasar Alternatif" fill="#00bcd4" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="unabsorbed" name="Pasokan Sisa/Belum Terserap" fill="#f59e0b" stackId="a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5-Step Food Loss Prevention Protocol */}
      <div className="card space-y-4">
        <h3 className="font-bold text-navy text-base flex items-center gap-2">
          <RefreshCw className="text-teal" size={20} />
          Protokol 5-Tahap Pencegahan Food Loss SIRKULAUT
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mb-2">
              1
            </div>
            <h4 className="font-semibold text-xs text-navy mb-1">Deteksi Dini Pasokan Sisa</h4>
            <p className="text-[11px] text-slate-500">
              Sistem mendeteksi selisih pendaratan vs permintaan lelang dalam 3 jam pertama pendaratan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mb-2">
              2
            </div>
            <h4 className="font-semibold text-xs text-navy mb-1">Pencarian Pembeli Alternatif</h4>
            <p className="text-[11px] text-slate-500">
              AI secara otomatis mencocokkan sisa stok dengan UMKM lokal, restoran, dan pedagang pasar tradisional.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mb-2">
              3
            </div>
            <h4 className="font-semibold text-xs text-navy mb-1">Rekomendasi Jalur Distribusi</h4>
            <p className="text-[11px] text-slate-500">
              Optimalisasi rute angkut logistik rantai dingin menuju lokasi pembeli terdekat untuk menjaga kesegaran.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mb-2">
              4
            </div>
            <h4 className="font-semibold text-xs text-navy mb-1">Opsi Penyimpanan / Olahan</h4>
            <p className="text-[11px] text-slate-500">
              Jika belum terjual, disarankan masuk cold storage beku atau diversifikasi produk olahan bernilai tambah.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center mb-2">
              5
            </div>
            <h4 className="font-semibold text-xs text-navy mb-1">Pencatatan Realisasi</h4>
            <p className="text-[11px] text-slate-500">
              Merekam volume aktual yang terselamatkan untuk menyempurnakan akurasi algoritma pencegahan selanjutnya.
            </p>
          </div>
        </div>
      </div>

      {/* Saluran Penyelamatan Aktif */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-navy text-sm">Saluran UMKM & Pengolahan Tradisional</h4>
              <p className="text-[11px] text-slate-400">Paciran & Brondong</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2 mb-3">
            Menerima ikan swanggi ukuran campur untuk bahan dasar kerupuk ikan, terasi premium, dan ikan asin kering higienis.
          </p>
          <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-500">Kapasitas Harian:</span>
            <span className="font-bold text-navy">400 kg/hari</span>
          </div>
        </div>

        <div className="card border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-50 text-teal rounded-lg">
              <Warehouse size={20} />
            </div>
            <div>
              <h4 className="font-bold text-navy text-sm">Cold Chain Buffer Storage</h4>
              <p className="text-[11px] text-slate-400">Fasilitas Pendingin TPI Brondong</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2 mb-3">
            Mempertahankan rantai dingin (suhu 0°C s.d. -2°C) untuk ikan segar kelas A yang siap ditawarkan pada lelang subuh berikutnya.
          </p>
          <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-500">Slot Tersedia:</span>
            <span className="font-bold text-emerald-600">800 kg aman</span>
          </div>
        </div>

        <div className="card border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Flame size={20} />
            </div>
            <div>
              <h4 className="font-bold text-navy text-sm">Pemanfaatan Residu & By-Product</h4>
              <p className="text-[11px] text-slate-400">Pabrik Pakan & Silase</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2 mb-3">
            Mengolah ikan mutu C atau sisa penyiangan menjadi tepung ikan bernilai protein tinggi untuk pakan akuakultur.
          </p>
          <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-500">Nilai Recovery:</span>
            <span className="font-bold text-amber-600">100% Zero Waste</span>
          </div>
        </div>
      </div>
    </div>
  );
}

