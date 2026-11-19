import PageHeader from '../components/common/PageHeader';
import {
  Anchor,
  Brain,
  Scale,
  FileCheck,
  Ship,
  ClipboardList,
  Database,
  Handshake,
  Truck,
  Activity,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

interface WorkflowStep {
  step: number;
  title: string;
  actor: string;
  actorColor: string;
  icon: React.ReactNode;
  desc: string;
  aiRole: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Input Rencana Melaut',
    actor: 'Nelayan',
    actorColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: <Anchor size={20} className="text-blue-600" />,
    desc: 'Nelayan memasukkan target kapal, alat tangkap, zona penangkapan WPPNRI 712, durasi hari, dan komoditas sasaran.',
    aiRole: 'Input pemicu untuk simulasi parameter model prediktif.',
  },
  {
    step: 2,
    title: 'Analisis Ekologis & Prediksi',
    actor: 'AI Intelligence Center',
    actorColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    icon: <Brain size={20} className="text-cyan-600" />,
    desc: 'Algoritma time-series mengevaluasi tren CPUE, indeks kelimpahan stok swanggi, dan rentang kemungkinan hasil tangkapan.',
    aiRole: 'Evaluasi batas ekologis untuk mencegah overfishing.',
  },
  {
    step: 3,
    title: 'Komparasi Pasokan & Permintaan',
    actor: 'AI Intelligence Center',
    actorColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    icon: <Scale size={20} className="text-cyan-600" />,
    desc: 'Membandingkan agregasi proyeksi pendaratan seluruh armada dengan permintaan aktual industri pengolahan.',
    aiRole: 'Mendeteksi potensi oversupply sebelum kapal berangkat.',
  },
  {
    step: 4,
    title: 'Penyampaian Rekomendasi Nelayan',
    actor: 'Nelayan & TPI',
    actorColor: 'bg-teal-50 text-teal-800 border-teal-200',
    icon: <FileCheck size={20} className="text-teal-600" />,
    desc: 'Nelayan menerima rekomendasi mitigasi risiko pasar & kelautan tanpa intervensi kuota izin administratif.',
    aiRole: 'Decision support mandiri bagi nelayan.',
  },
  {
    step: 5,
    title: 'Operasi Penangkapan Bertanggung Jawab',
    actor: 'Nelayan',
    actorColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: <Ship size={20} className="text-blue-600" />,
    desc: 'Aktivitas penangkapan dilakukan dengan kepatuhan terhadap regulasi perikanan berkelanjutan dan keselamatan maritim.',
    aiRole: 'Fase eksekusi lapangan.',
  },
  {
    step: 6,
    title: 'Pencatatan Pendaratan TPI',
    actor: 'Pengelola TPI',
    actorColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: <ClipboardList size={20} className="text-emerald-600" />,
    desc: 'Petugas TPI mencatat berat aktual, sortasi ukuran, grade kualitas, dan harga lelang per kg secara presisi.',
    aiRole: 'Konversi data aktual sebagai ground-truth validasi model.',
  },
  {
    step: 7,
    title: 'Pembaruan Basis Data Ketersediaan',
    actor: 'Sistem SIRKULAUT',
    actorColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    icon: <Database size={20} className="text-indigo-600" />,
    desc: 'Stok riil TPI langsung dipublikasikan ke katalog digital marketplace dan sistem pencocokan terpadu.',
    aiRole: 'Sinkronisasi real-time rantai pasok hilir.',
  },
  {
    step: 8,
    title: 'Pencocokan Otomatis Permintaan Industri',
    actor: 'Industri Pengolahan',
    actorColor: 'bg-purple-50 text-purple-800 border-purple-200',
    icon: <Handshake size={20} className="text-purple-600" />,
    desc: 'AI Demand Matching menghubungkan lot ikan segar dengan spesifikasi pabrik surimi/fillet terdekat.',
    aiRole: 'Optimasi alokasi pasokan berbasis jarak, mutu, & harga.',
  },
  {
    step: 9,
    title: 'Redistribusi Pasokan Sisa (Anti-Loss)',
    actor: 'UMKM & Cold Storage',
    actorColor: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: <Truck size={20} className="text-amber-600" />,
    desc: 'Ikan belum terjual (unabsorbed supply) dialihkan ke UMKM kerupuk/ikan asap atau disimpan di cold chain.',
    aiRole: 'Pencegahan food loss dan penyelamatan nilai residu.',
  },
  {
    step: 10,
    title: 'Monitoring Ekologis & Rantai Pasok',
    actor: 'Administrator / Regulator',
    actorColor: 'bg-red-50 text-red-800 border-red-200',
    icon: <Activity size={20} className="text-red-600" />,
    desc: 'Evaluasi menyeluruh terhadap tren eksploitasi, efisiensi distribusi, stabilitas harga, dan integritas ekologis.',
    aiRole: 'Pelaporan strategis untuk keberlanjutan perikanan nasional.',
  },
];

export default function Workflow() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Alur Kerja Terintegrasi SIRKULAUT"
        subtitle="Visualisasi siklus end-to-end dari hulu (rencana melaut) hingga hilir (distribusi & monitoring ekologis)."
      />

      {/* Core Principle Banner */}
      <div className="card bg-gradient-to-r from-navy via-navy-light to-teal text-white border-none p-6">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-white/10 rounded-xl text-cyan shrink-0">
            <Shield size={28} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Prinsip Batas Ekologis (Ecological Boundary First)
            </h3>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              &quot;Kepentingan keberlanjutan ekosistem laut menjadi batas utama aktivitas penangkapan ikan.
              Tingginya permintaan pasar atau industri tidak boleh menjadi pembenaran untuk meningkatkan tekanan
              penangkapan jika indikator daya dukung ekologis tidak mendukung.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Visual Roadmap / Step Process */}
      <div className="space-y-4">
        <h3 className="font-bold text-navy text-base flex items-center gap-2">
          <Layers className="text-teal" size={20} />
          10 Langkah Siklus Rantai Pasok & Intelijen Perikanan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.step}
              className="card-hover border border-slate-200 p-5 flex items-start gap-4 bg-white"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="w-9 h-9 rounded-xl bg-navy text-white font-black text-sm flex items-center justify-center shadow-sm">
                  {step.step}
                </div>
                {step.step < 10 && <div className="w-0.5 h-full bg-slate-200 my-2 hidden md:block"></div>}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {step.icon}
                    <h4 className="font-bold text-navy text-sm">{step.title}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${step.actorColor}`}>
                    {step.actor}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                  <Sparkles size={14} className="text-cyan-dark shrink-0" />
                  <span>
                    <strong>Fungsi AI:</strong> {step.aiRole}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="card space-y-3 bg-slate-50 border border-slate-200">
        <h4 className="font-bold text-navy text-sm">Arsitektur Integrasi Sistem (Decision Support System)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy">1. Data Ingestion & Sensors</p>
            <p className="text-slate-500">
              Pengumpulan data historis pendaratan TPI Brondong, log kapal melaut, input rencana melaut nelayan, dan pesanan industri.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy">2. Machine Learning Analytics</p>
            <p className="text-slate-500">
              Model prediksi ARIMA / Time-Series pendaratan, algoritma CPUE multi-trip, kalkulasi elastisitas harga, dan multi-objective matching.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <p className="font-bold text-navy">3. Actionable Recommendations</p>
            <p className="text-slate-500">
              Antarmuka terkurasi untuk 5 aktor dengan notifikasi dini kelebihan pasokan, saran rute pasar alternatif, dan peringatan batas keberlanjutan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

