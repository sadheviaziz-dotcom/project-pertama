import { Link } from 'react-router-dom';
import {
  Fish,
  AlertTriangle,
  BarChart3,
  Leaf,
  Handshake,
  ShieldCheck,
  Brain,
  TrendingUp,
  DollarSign,
  Anchor,
  ClipboardList,
  Factory,
  Store,
  Settings,
  ArrowRight,
  Waves,
  Target,
  Users,
  ShoppingCart,
  Recycle,
} from 'lucide-react';

/* ─── wave SVG used as a section divider ─── */
const WaveDivider = ({ flip = false, color = '#ffffff' }: { flip?: boolean; color?: string }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
      <path
        d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120Z"
        fill={color}
      />
    </svg>
  </div>
);

/* ─── smooth scroll helper ─── */
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/* ─── section wrapper ─── */
const Section = ({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-3xl md:text-4xl font-extrabold text-navy">{title}</h2>
    <p className="mt-3 text-slate-500 max-w-2xl mx-auto">{subtitle}</p>
    <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-teal to-cyan" />
  </div>
);

/* ================================================================ */
/*  LANDING PAGE                                                     */
/* ================================================================ */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* ═══════════ HERO ═══════════ */}
      <header className="relative bg-gradient-to-br from-navy via-navy-dark to-teal overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan/5 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-teal/10 blur-3xl" />

        {/* nav */}
        <nav className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2">
            <Waves className="w-7 h-7 text-cyan" />
            <span className="text-xl font-extrabold tracking-tight text-white">SIRKULAUT</span>
          </div>
          <Link to="/login" className="btn-outline border-white/60 text-white hover:bg-white hover:text-navy text-sm">
            Login
          </Link>
        </nav>

        {/* hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-16 pb-28 md:pt-24 md:pb-36">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-cyan text-xs font-semibold tracking-wide mb-6 backdrop-blur">
            <Fish className="w-4 h-4" /> AI-Powered Fisheries Platform
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            SIRKULAUT
          </h1>
          <p className="mt-3 text-lg md:text-xl font-medium text-cyan-light">
            Balancing Ocean Sustainability and Fisheries Intelligence
          </p>
          <p className="mt-5 text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Platform berbasis AI yang mengintegrasikan prediksi hasil tangkapan, pemantauan
            keberlanjutan sumber daya, pencocokan pasar, prediksi harga, dan pencegahan food loss
            untuk mewujudkan ekosistem perikanan tangkap yang efisien, adil, dan berkelanjutan.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('solutions')}
              className="btn-accent px-8 py-3 text-base shadow-lg shadow-cyan/25"
            >
              Explore Platform <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/login" className="btn-outline border-white/50 text-white hover:bg-white hover:text-navy px-8 py-3 text-base">
              Login Dashboard
            </Link>
          </div>
        </div>

        {/* wave bottom decoration */}
        <WaveDivider color="#f8fafc" />
      </header>

      {/* ═══════════ PERMASALAHAN ═══════════ */}
      <Section id="problems">
        <SectionHeading
          title="Permasalahan Perikanan"
          subtitle="Tantangan kritis yang dihadapi sektor perikanan tangkap di Indonesia"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Fish,
              title: 'Ketidakseimbangan Pasar',
              desc: 'Ketidaksesuaian antara volume hasil tangkapan dengan permintaan pasar menyebabkan harga jatuh saat oversupply dan kelangkaan saat undersupply, merugikan nelayan dan konsumen.',
              color: 'text-cyan',
              bg: 'bg-cyan/10',
            },
            {
              icon: AlertTriangle,
              title: 'Tekanan Ekologis',
              desc: 'Eksploitasi berlebihan tanpa pemantauan keberlanjutan mengancam kelestarian stok ikan, merusak ekosistem laut, dan mengancam mata pencaharian jangka panjang komunitas pesisir.',
              color: 'text-warning',
              bg: 'bg-amber-50',
            },
          ].map((card) => (
            <div key={card.title} className="card-hover flex gap-5 items-start">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`w-7 h-7 ${card.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════ SOLUSI ═══════════ */}
      <div className="bg-ocean-50/60">
        <Section id="solutions">
          <SectionHeading
            title="Solusi SIRKULAUT"
            subtitle="Empat pilar solusi cerdas yang terintegrasi untuk ekosistem perikanan berkelanjutan"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: 'Prediksi Hasil Tangkapan', desc: 'Forecast berbasis AI untuk membantu perencanaan operasi penangkapan dan manajemen pasokan.', color: 'text-teal', bg: 'bg-teal/10' },
              { icon: Leaf, title: 'Pemantauan Keberlanjutan', desc: 'Analisis CPUE dan status stok ikan untuk memastikan eksploitasi tetap dalam batas berkelanjutan.', color: 'text-success', bg: 'bg-emerald-50' },
              { icon: ShoppingCart, title: 'Pencocokan Pasar', desc: 'Matching otomatis antara supply nelayan dan demand industri untuk efisiensi distribusi.', color: 'text-cyan', bg: 'bg-cyan/10' },
              { icon: Recycle, title: 'Pencegahan Food Loss', desc: 'Deteksi dini potensi food loss dan redistribusi otomatis ke saluran alternatif.', color: 'text-warning', bg: 'bg-amber-50' },
            ].map((s) => (
              <div key={s.title} className="card-hover text-center group">
                <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} group-hover:scale-110 transition-transform`}>
                  <s.icon className={`w-7 h-7 ${s.color}`} />
                </div>
                <h3 className="mt-4 text-base font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ═══════════ TEKNOLOGI AI ═══════════ */}
      <Section id="ai">
        <SectionHeading
          title="Teknologi AI"
          subtitle="Lima modul kecerdasan buatan yang menjadi otak SIRKULAUT"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: 'Landing Forecast', desc: 'Model time-series prediksi volume pendaratan ikan harian dan mingguan berdasarkan data historis, cuaca, dan musim.', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: ShieldCheck, title: 'Sustainable Catch', desc: 'Evaluasi tingkat eksploitasi sumber daya berdasarkan indeks CPUE dan ambang batas keberlanjutan.', color: 'text-success', bg: 'bg-emerald-50' },
            { icon: Handshake, title: 'Demand Matching', desc: 'Algoritma pencocokan multi-kriteria antara pasokan TPI dan permintaan industri pengolahan.', color: 'text-cyan', bg: 'bg-cyan/10' },
            { icon: DollarSign, title: 'Price Prediction', desc: 'Prediksi harga ikan di tingkat TPI berdasarkan tren pasar, volume, dan dinamika supply-demand.', color: 'text-teal', bg: 'bg-teal/10' },
            { icon: AlertTriangle, title: 'Food Loss Prevention', desc: 'Deteksi dini surplus tak terserap pasar dan optimasi redistribusi untuk meminimalkan food loss.', color: 'text-warning', bg: 'bg-amber-50' },
          ].map((m) => (
            <div key={m.title} className="card-hover flex gap-4 items-start">
              <div className={`shrink-0 p-3 rounded-xl ${m.bg}`}>
                <m.icon className={`w-6 h-6 ${m.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-navy">{m.title}</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════ EKOSISTEM AKTOR ═══════════ */}
      <div className="bg-gradient-to-br from-navy via-navy-dark to-teal text-white">
        <Section id="actors">
          <SectionHeading
            title="Ekosistem Aktor"
            subtitle="Lima peran utama yang terhubung dalam platform SIRKULAUT"
          />
          {/* override heading colour for dark bg */}
          <style>{`#actors h2{color:#fff}#actors p{color:#94a3b8}#actors .mt-4.mx-auto{background:linear-gradient(90deg,#0d7377,#00bcd4)}`}</style>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: Anchor, title: 'Nelayan', desc: 'Input rencana tangkap, lihat prediksi & rekomendasi AI' },
              { icon: ClipboardList, title: 'TPI', desc: 'Catat pendaratan, kelola data & distribusi hasil laut' },
              { icon: Factory, title: 'Industri', desc: 'Ajukan demand, temukan supplier, pantau ketersediaan' },
              { icon: Store, title: 'Pedagang', desc: 'Akses listing pasar, beli ikan, kelola pesanan' },
              { icon: Settings, title: 'Administrator', desc: 'Kelola pengguna, pantau sistem, analisis keseluruhan' },
            ].map((a) => (
              <div
                key={a.title}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/15 transition-all group"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <a.icon className="w-6 h-6 text-cyan-light" />
                </div>
                <h3 className="mt-3 font-bold text-sm text-white">{a.title}</h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ═══════════ DAMPAK ═══════════ */}
      <Section id="impact">
        <SectionHeading
          title="Dampak yang Diharapkan"
          subtitle="Kontribusi nyata SIRKULAUT terhadap ekosistem perikanan berkelanjutan"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, value: '+25%', label: 'Efisiensi Distribusi', desc: 'Peningkatan akurasi pencocokan supply-demand', color: 'text-teal', bg: 'bg-teal/10' },
            { icon: ShieldCheck, value: '−30%', label: 'Food Loss Reduction', desc: 'Pengurangan ikan tidak terserap pasar', color: 'text-success', bg: 'bg-emerald-50' },
            { icon: Target, value: '85%', label: 'Prediksi Akurat', desc: 'Akurasi model prediksi hasil tangkapan', color: 'text-cyan', bg: 'bg-cyan/10' },
            { icon: Users, value: '5 Aktor', label: 'Ekosistem Terhubung', desc: 'Integrasi seluruh rantai pasok perikanan', color: 'text-navy', bg: 'bg-ocean-50' },
          ].map((d) => (
            <div key={d.label} className="card-hover text-center">
              <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center ${d.bg}`}>
                <d.icon className={`w-7 h-7 ${d.color}`} />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-navy">{d.value}</p>
              <h3 className="mt-1 font-bold text-sm text-navy">{d.label}</h3>
              <p className="mt-1 text-xs text-slate-500">{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════ TENTANG ═══════════ */}
      <div className="bg-ocean-50/60">
        <Section id="about">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              title="Tentang Proyek"
              subtitle="Latar belakang dan ruang lingkup pengembangan SIRKULAUT"
            />
            <div className="card text-left space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-navy">SIRKULAUT</strong> (Sistem Informasi Rantai pasoKan
                Untuk keberlanjutan Laut) merupakan prototipe platform cerdas yang dirancang untuk
                mendukung pengelolaan perikanan tangkap di{' '}
                <strong className="text-navy">PPN Brondong, Kabupaten Lamongan, Jawa Timur</strong>.
              </p>
              <p>
                Platform ini mengintegrasikan lima modul AI — landing forecast, sustainable catch
                assessment, demand matching, price prediction, dan food loss prevention — untuk
                menciptakan ekosistem perikanan yang lebih efisien, adil, dan berkelanjutan.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  <strong>Disclaimer:</strong> Ini adalah prototipe untuk tujuan penelitian dan
                  pengembangan. Data yang ditampilkan bersifat simulasi dan tidak merepresentasikan
                  kondisi aktual.
                </span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-navy-dark text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan" />
            <span className="text-sm font-bold text-white tracking-tight">SIRKULAUT</span>
          </div>
          <p className="text-center md:text-right">
            © {new Date().getFullYear()} SIRKULAUT — Sistem Informasi Rantai Pasokan Untuk Keberlanjutan Laut.
            <br className="hidden sm:block" /> Prototipe Penelitian &middot; PPN Brondong, Lamongan.
          </p>
        </div>
      </footer>
    </div>
  );
}
