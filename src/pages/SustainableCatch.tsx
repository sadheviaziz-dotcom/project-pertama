import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Shield,
  Activity,
  Anchor,
  BarChart3,
  Info,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Fish,
  Gauge,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { CPUE_DATA, SIZE_DISTRIBUTION, formatNumber } from '../data/simulationData';

export default function SustainableCatch() {
  // Derive stats
  const latestCpue = CPUE_DATA[CPUE_DATA.length - 1];
  const prevCpue = CPUE_DATA[CPUE_DATA.length - 2];
  const cpueChange = latestCpue && prevCpue ? ((latestCpue.cpue - prevCpue.cpue) / prevCpue.cpue * 100).toFixed(1) : '0';
  const totalTrips = CPUE_DATA.reduce((s, d) => s + d.trips, 0);
  const totalCatchAll = CPUE_DATA.reduce((s, d) => s + d.totalCatch, 0);
  const avgCpue = (CPUE_DATA.reduce((s, d) => s + d.cpue, 0) / CPUE_DATA.length).toFixed(1);

  // Resource condition: "Baik" based on current CPUE trend being stable/increasing
  const resourceStatus = 'Baik';
  const statusColor = '#10b981';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sustainable Catch Monitoring — Pemantauan Keberlanjutan"
        subtitle="Modul pemantauan indikator keberlanjutan sumber daya perikanan (data simulasi)"
      />

      {/* Resource Condition Card */}
      <div className="card border-l-4" style={{ borderLeftColor: statusColor }}>
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-xl flex-shrink-0"
            style={{ background: `${statusColor}15` }}
          >
            <Shield className="w-7 h-7" style={{ color: statusColor }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg" style={{ color: '#1e3a5f' }}>
                Kondisi Sumber Daya
              </h3>
              <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold"
                style={{ background: `${statusColor}20`, color: statusColor }}
              >
                <CheckCircle2 className="w-4 h-4" />
                {resourceStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Indikator CPUE menunjukkan tren stabil-meningkat. Nilai CPUE terakhir ({latestCpue.cpue} kg/trip)
              berada di atas rata-rata ({avgCpue} kg/trip). Distribusi ukuran ikan menunjukkan dominasi
              ukuran sedang-besar yang mengindikasikan rekrutmen normal.
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2 rounded-lg bg-green-50">
                <span className="text-green-700 font-semibold">Baik</span>
                <p className="text-green-600 mt-0.5">CPUE stabil/naik, distribusi ukuran normal</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-50">
                <span className="text-amber-700 font-semibold">Waspada</span>
                <p className="text-amber-600 mt-0.5">CPUE menurun moderat, ukuran kecil dominan</p>
              </div>
              <div className="p-2 rounded-lg bg-red-50">
                <span className="text-red-700 font-semibold">Kritis</span>
                <p className="text-red-600 mt-0.5">CPUE turun signifikan, overfishing terindikasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fishing Intensity Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-5 h-5" style={{ color: '#00bcd4' }} />
            <span className="text-xs text-gray-500 font-medium">CPUE Terakhir</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1e3a5f' }}>{latestCpue.cpue} kg/trip</p>
          <p className="text-xs mt-1" style={{ color: parseFloat(cpueChange) >= 0 ? '#10b981' : '#ef4444' }}>
            {parseFloat(cpueChange) >= 0 ? '↑' : '↓'} {cpueChange}% dari bulan lalu
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Anchor className="w-5 h-5" style={{ color: '#0d7377' }} />
            <span className="text-xs text-gray-500 font-medium">Total Trip (2026)</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1e3a5f' }}>{formatNumber(totalTrips)}</p>
          <p className="text-xs text-gray-400 mt-1">Bulan terakhir: {formatNumber(latestCpue.trips)} trip</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Fish className="w-5 h-5" style={{ color: '#10b981' }} />
            <span className="text-xs text-gray-500 font-medium">Total Tangkapan (2026)</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1e3a5f' }}>{formatNumber(totalCatchAll)} kg</p>
          <p className="text-xs text-gray-400 mt-1">Rata-rata CPUE: {avgCpue} kg/trip</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" style={{ color: '#f59e0b' }} />
            <span className="text-xs text-gray-500 font-medium">Intensitas Penangkapan</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1e3a5f' }}>Moderat</p>
          <p className="text-xs text-gray-400 mt-1">Trip meningkat, CPUE stabil</p>
        </div>
      </div>

      {/* Charts Row 1: CPUE Trend + Trip Count */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5" style={{ color: '#1e3a5f' }} />
            <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>Tren CPUE</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={CPUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} unit=" kg" width={60} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                formatter={(value: any) => [`${formatNumber(Number(value) || 0)} kg/trip`, 'CPUE']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cpue"
                stroke="#00bcd4"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#00bcd4' }}
                name="CPUE (kg/trip)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" style={{ color: '#1e3a5f' }} />
            <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>Jumlah Trip Penangkapan</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={CPUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} width={50} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                formatter={(value: any) => [`${formatNumber(Number(value) || 0)} trip`, 'Jumlah Trip']}
              />
              <Legend />
              <Bar
                dataKey="trips"
                fill="#0d7377"
                radius={[4, 4, 0, 0]}
                name="Trip"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2: Size Distribution + Total Catch Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" style={{ color: '#1e3a5f' }} />
            <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>Distribusi Ukuran Ikan</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={SIZE_DISTRIBUTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="size" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} width={50} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                formatter={(value: any, name: any) => [
                  name === 'count' ? `${formatNumber(Number(value) || 0)} ekor` : `${value}%`,
                  name === 'count' ? 'Jumlah' : 'Persentase',
                ]}
              />
              <Legend />
              <Bar
                dataKey="count"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                name="Jumlah (ekor)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#1e3a5f' }} />
            <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>Tren Total Tangkapan</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={CPUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} unit=" kg" width={70} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                formatter={(value: any) => [`${formatNumber(Number(value) || 0)} kg`, 'Total Tangkapan']}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalCatch"
                stroke="#1e3a5f"
                fill="#1e3a5f20"
                strokeWidth={2}
                name="Total Tangkapan (kg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Warning Panel */}
      <div className="card bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">Peringatan Penting</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              Indikator ini merupakan sistem pemantauan dan peringatan dini. Status eksploitasi resmi
              harus mengacu pada kajian ilmiah dari lembaga riset dan otoritas perikanan yang
              berwenang. Data yang ditampilkan bersifat simulasi untuk keperluan prototipe dan
              demonstrasi.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 leading-relaxed">
            <strong>Catatan:</strong> Modul ini menggunakan data simulasi untuk mendemonstrasikan
            konsep pemantauan keberlanjutan. Interpretasi indikator harus dilakukan bersama pakar
            perikanan dan mempertimbangkan kajian stok ikan secara komprehensif.
          </p>
        </div>
      </div>
    </div>
  );
}
