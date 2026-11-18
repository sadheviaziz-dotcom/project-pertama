import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import {
  LANDING_PREDICTIONS,
  SUPPLY_DEMAND_DATA,
  CPUE_DATA,
  PRICE_DATA,
  formatCurrency,
  formatNumber,
} from '../data/simulationData';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  DollarSign,
  PieChart as PieIcon,
  Activity,
  Layers,
} from 'lucide-react';

const SPECIES_PIE_DATA = [
  { name: 'Ikan Swanggi', value: 45, color: '#0d7377' },
  { name: 'Ikan Tongkol', value: 25, color: '#1e3a5f' },
  { name: 'Ikan Kembung', value: 15, color: '#00bcd4' },
  { name: 'Ikan Kurisi', value: 10, color: '#f59e0b' },
  { name: 'Lainnya', value: 5, color: '#94a3b8' },
];

export default function Analytics() {
  const [period, setPeriod] = useState('quarter');

  const handleExport = (type: string) => {
    alert(`Laporan analitik format ${type} berhasil di-generate dan diunduh.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Comprehensive Reports"
        subtitle="Analisis agregat multivariabel performa rantai pasok dan pemantauan perikanan PPN Brondong."
        actions={
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="select-field text-xs py-2 px-3 w-auto"
            >
              <option value="month">Bulan Ini (November 2026)</option>
              <option value="quarter">Kuartal Terakhir (Q4 2026)</option>
              <option value="year">Tahun Berjalan 2026</option>
            </select>
            <button
              onClick={() => handleExport('PDF')}
              className="btn-outline text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <Download size={14} />
              Ekspor PDF
            </button>
            <button
              onClick={() => handleExport('CSV')}
              className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <Download size={14} />
              Ekspor CSV
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pendaratan Q4"
          value="151.2 ton"
          subtitle="Proyeksi 3 bulan berjalan"
          icon={<BarChart3 size={20} />}
          color="navy"
          trend={{ value: 4.8, label: 'vs Q3' }}
        />
        <StatCard
          title="Nilai Transaksi Ekonomi"
          value="Rp 2.72 M"
          subtitle="Omzet lelang TPI"
          icon={<DollarSign size={20} />}
          color="teal"
          trend={{ value: 7.2, label: 'vs Q3' }}
        />
        <StatCard
          title="Indeks Efisiensi Serapan"
          value="91.4%"
          subtitle="Terserap industri & pasar"
          icon={<TrendingUp size={20} />}
          color="success"
        />
        <StatCard
          title="Rata-rata CPUE Tahunan"
          value="127 kg/trip"
          subtitle="Stabilitas tangkapan per kapal"
          icon={<Activity size={20} />}
          color="cyan"
        />
      </div>

      {/* Charts Row 1: Supply vs Demand & Komposisi Tangkapan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Supply vs Demand */}
        <div className="lg:col-span-8 card space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-navy text-sm">Neraca Pasokan (Supply) vs Kebutuhan Industri (Demand)</h3>
              <p className="text-xs text-slate-500">Ikan Swanggi mingguan (DATA SIMULASI)</p>
            </div>
            <span className="badge badge-info text-xs">Kilogram (kg)</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUPPLY_DEMAND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  formatter={(val: any) => [`${formatNumber(Number(val) || 0)} kg`]}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="supply" name="Pasokan Hasil Tangkapan" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demand" name="Permintaan Industri" fill="#00bcd4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Komposisi Komoditas */}
        <div className="lg:col-span-4 card space-y-3">
          <div>
            <h3 className="font-bold text-navy text-sm">Distribusi Komoditas Pendaratan</h3>
            <p className="text-xs text-slate-500">Pangsa pasar volume hasil tangkapan</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SPECIES_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SPECIES_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, 'Pangsa']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-2 text-xs">
            {SPECIES_PIE_DATA.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                  {s.name}
                </span>
                <span className="font-bold text-navy">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2: CPUE & Price Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPUE */}
        <div className="card space-y-3">
          <div>
            <h3 className="font-bold text-navy text-sm">Tren Catch Per Unit Effort (CPUE) Bulanan</h3>
            <p className="text-xs text-slate-500">Rasio kg per trip kapal penangkap sebagai indikator ekologis</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CPUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[90, 160]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  formatter={(val: any) => [`${val} kg/trip`, 'CPUE']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="cpue"
                  name="CPUE Rata-rata"
                  stroke="#0d7377"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fluktuasi Harga vs Volume */}
        <div className="card space-y-3">
          <div>
            <h3 className="font-bold text-navy text-sm">Fluktuasi Harga Lelang Ikan Swanggi</h3>
            <p className="text-xs text-slate-500">Korelasi pergerakan harga per kg (Rp)</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PRICE_DATA}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[14000, 20000]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  formatter={(val: any) => [formatCurrency(Number(val)), 'Harga Lelang']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="price"
                  name="Harga Lelang (Rp/kg)"
                  stroke="#1e3a5f"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

