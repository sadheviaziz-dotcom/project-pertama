import { Link } from 'react-router-dom';
import {
  Brain,
  TrendingUp,
  Shield,
  Handshake,
  DollarSign,
  AlertTriangle,
  Activity,
  ArrowRight,
  Info,
  Sparkles,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const modules = [
  {
    path: '/landing-forecast',
    icon: TrendingUp,
    title: 'Landing Forecast',
    subtitle: 'Prediksi Pendaratan Ikan',
    description:
      'Prediksi hasil tangkapan ikan menggunakan model time-series. Estimasi volume pendaratan mingguan beserta interval kepercayaan.',
    status: 'active' as const,
    color: '#00bcd4',
  },
  {
    path: '/sustainability',
    icon: Shield,
    title: 'Sustainable Catch Monitoring',
    subtitle: 'Pemantauan Keberlanjutan',
    description:
      'Pemantauan indikator keberlanjutan sumber daya ikan melalui analisis CPUE, distribusi ukuran, dan intensitas penangkapan.',
    status: 'monitoring' as const,
    color: '#10b981',
  },
  {
    path: '/demand-matching',
    icon: Handshake,
    title: 'Demand Matching',
    subtitle: 'Pencocokan Pasar',
    description:
      'Pencocokan otomatis antara pasokan hasil tangkapan dengan permintaan industri pengolahan menggunakan algoritma multi-kriteria.',
    status: 'active' as const,
    color: '#0d7377',
  },
  {
    path: '/price-prediction',
    icon: DollarSign,
    title: 'Smart Price Prediction',
    subtitle: 'Prediksi Harga Ikan',
    description:
      'Estimasi harga ikan berdasarkan tren pasar, volume pasokan, musim, dan faktor kualitas untuk mendukung keputusan transaksi.',
    status: 'active' as const,
    color: '#f59e0b',
  },
  {
    path: '/food-loss',
    icon: AlertTriangle,
    title: 'Food Loss Prevention',
    subtitle: 'Pencegahan Kehilangan',
    description:
      'Deteksi dini potensi surplus ikan yang tidak terserap pasar dan rekomendasi redistribusi untuk mencegah food loss.',
    status: 'monitoring' as const,
    color: '#ef4444',
  },
];

export default function AICenter() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Intelligence Center"
        subtitle="Pusat Inteligensi AI — Modul analitik berbasis data simulasi untuk mendukung keputusan perikanan"
      />

      {/* AI Insight Summary */}
      <div className="card border-l-4" style={{ borderLeftColor: '#00bcd4' }}>
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0d7377, #00bcd4)' }}
          >
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2" style={{ color: '#1e3a5f' }}>
              <Sparkles className="w-5 h-5 inline mr-1" style={{ color: '#00bcd4' }} />
              Ringkasan Inteligensi AI
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Semua modul AI beroperasi normal. <strong>Landing Forecast</strong> memprediksi
              pendaratan minggu depan sebesar ~6.000 kg dengan tren meningkat.{' '}
              <strong>Sustainable Catch Monitoring</strong> menunjukkan indikator CPUE stabil pada
              level baik. <strong>Demand Matching</strong> mendeteksi 3 permintaan aktif dengan skor
              kecocokan rata-rata 85%. <strong>Price Prediction</strong> memproyeksikan kenaikan
              harga moderat untuk Ikan Swanggi. <strong>Food Loss Prevention</strong> memantau ~500
              kg pasokan yang belum terserap hari ini dengan rekomendasi redistribusi aktif.
            </p>
          </div>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.path}
              className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
            >
              {/* Gradient top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${mod.color}, ${mod.color}88)`,
                }}
              />

              <div className="flex items-start gap-4 mb-4 mt-1">
                <div
                  className="p-3 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${mod.color}20, ${mod.color}10)`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: mod.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base" style={{ color: '#1e3a5f' }}>
                    {mod.title}
                  </h3>
                  <p className="text-xs text-gray-500">{mod.subtitle}</p>
                </div>
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                  style={{
                    background:
                      mod.status === 'active' ? '#10b98120' : '#f59e0b20',
                    color: mod.status === 'active' ? '#10b981' : '#f59e0b',
                  }}
                >
                  <Activity className="w-3 h-3" />
                  {mod.status === 'active' ? 'Aktif' : 'Monitoring'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{mod.description}</p>

              <Link
                to={mod.path}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${mod.color}, ${mod.color}cc)`,
                }}
              >
                Buka Modul
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="card bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">Disclaimer — Sistem Pendukung Keputusan</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              Seluruh modul AI pada SIRKULAUT merupakan <strong>sistem pendukung keputusan</strong>{' '}
              berbasis data simulasi, bukan pengganti analisis ahli atau keputusan resmi. Hasil
              prediksi, rekomendasi, dan indikator yang ditampilkan bersifat estimatif dan harus
              diinterpretasikan bersama pertimbangan profesional. Data yang digunakan adalah data
              simulasi untuk keperluan prototipe dan demonstrasi, bukan data operasional resmi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
