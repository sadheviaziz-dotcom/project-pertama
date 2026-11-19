import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import {
  FISHING_PLANS,
  FISH_SPECIES,
  formatNumber,
} from '../data/simulationData';
import type { FishingPlan, FishingPlanAnalysis } from '../types';
import {
  Anchor,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Compass,
  CheckCircle2,
  Clock,
  Info,
  Send,
  Fish,
} from 'lucide-react';

export default function FishingPlan() {
  const [plans, setPlans] = useState<FishingPlan[]>(FISHING_PLANS);
  const [activeAnalysis, setActiveAnalysis] = useState<FishingPlanAnalysis | null>(
    FISHING_PLANS[0]?.aiAnalysis || null
  );

  const [form, setForm] = useState({
    vesselName: 'KM Bahari Jaya',
    gearType: 'Cantrang',
    location: 'Perairan Utara Lamongan (WPPNRI 712)',
    departureDate: '2026-11-14',
    durationDays: 3,
    targetSpecies: 'Ikan Swanggi',
    estimatedCatchKg: 850,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Simulate AI analysis generated
      const generatedAnalysis: FishingPlanAnalysis = {
        predictedCatchKg: Math.round(form.estimatedCatchKg * 0.92),
        catchRange: {
          min: Math.round(form.estimatedCatchKg * 0.75),
          max: Math.round(form.estimatedCatchKg * 1.15),
        },
        ecologicalStatus: 'baik',
        cpueTrend: 'stabil',
        estimatedSupplyKg: 5900,
        marketDemandKg: 5500,
        riskLevel: 'rendah',
        recommendations: [
          'Kondisi ekologis perairan WPPNRI 712 pada koordinat target menunjukkan stabilitas stok yang memadai.',
          'Estimasi pasokan swanggi mingguan seimbang dengan kapasitas lelang TPI (surplus aman tersimpan dalam cold storage).',
          'Direkomendasikan koordinasi awal dengan TPI Brondong H-1 pendaratan untuk lelang prioritas.',
          'Waspadai gelombang laut setinggi 1.2–1.5 meter di bagian utara perairan pada hari kedua.',
        ],
      };

      const newPlan: FishingPlan = {
        id: `FP${String(plans.length + 1).padStart(3, '0')}`,
        nelayanId: 'N001',
        vesselName: form.vesselName,
        gearType: form.gearType,
        location: form.location,
        departureDate: form.departureDate,
        durationDays: Number(form.durationDays),
        targetSpecies: form.targetSpecies,
        estimatedCatchKg: Number(form.estimatedCatchKg),
        status: 'analyzed',
        aiAnalysis: generatedAnalysis,
      };

      setPlans([newPlan, ...plans]);
      setActiveAnalysis(generatedAnalysis);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rencana Melaut Nelayan"
        subtitle="Rencanakan aktivitas penangkapan dengan dukungan analisis ekologis dan daya serap pasar berbasis AI."
      />

      {/* Scientific & Regulatory Disclaimer */}
      <div className="card bg-blue-50/70 border-blue-200 text-blue-900 p-4 flex items-start gap-3">
        <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-semibold">Batas Kewenangan Sistem:</strong> SIRKULAUT bertindak murni sebagai{' '}
          <strong>Fisheries Decision Support System (sistem pendukung keputusan)</strong>. Rekomendasi ini BUKAN surat izin
          berlayar resmi (SPB), bukan kuota penangkapan administratif, dan tidak menggantikan otoritas Syahbandar atau
          regulasi Kementerian Kelautan dan Perikanan (KKP).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulir Input Rencana Melaut */}
        <div className="lg:col-span-5 card space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="p-2 bg-navy/10 text-navy rounded-lg">
              <Anchor size={20} />
            </div>
            <div>
              <h3 className="font-bold text-navy text-base">Formulir Rencana Melaut</h3>
              <p className="text-xs text-slate-500">Masukkan detail trip penangkapan terencana</p>
            </div>
          </div>

          <form onSubmit={handleSubmitPlan} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nama Kapal & GT</label>
              <input
                type="text"
                required
                value={form.vesselName}
                onChange={(e) => setForm({ ...form, vesselName: e.target.value })}
                className="input-field py-2"
                placeholder="KM Bahari Jaya (15 GT)"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Alat Tangkap</label>
                <select
                  value={form.gearType}
                  onChange={(e) => setForm({ ...form, gearType: e.target.value })}
                  className="select-field py-2"
                >
                  <option value="Cantrang">Cantrang / Jaring Tarik</option>
                  <option value="Gill Net">Gill Net / Jaring Insang</option>
                  <option value="Purse Seine">Purse Seine / Pukat Cincin</option>
                  <option value="Pancing Ulur">Pancing Ulur / Handline</option>
                  <option value="Bubu Dasar">Bubu Dasar</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Komoditas Target</label>
                <select
                  value={form.targetSpecies}
                  onChange={(e) => setForm({ ...form, targetSpecies: e.target.value })}
                  className="select-field py-2"
                >
                  {FISH_SPECIES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Lokasi Perairan Rencana</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="input-field py-2"
                placeholder="Perairan Utara Lamongan"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Rencana Tanggal Berangkat</label>
                <input
                  type="date"
                  required
                  value={form.departureDate}
                  onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                  className="input-field py-2"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Estimasi Durasi (Hari)</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  required
                  value={form.durationDays}
                  onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })}
                  className="input-field py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Tangkapan (kg)</label>
              <input
                type="number"
                min="50"
                step="50"
                required
                value={form.estimatedCatchKg}
                onChange={(e) => setForm({ ...form, estimatedCatchKg: Number(e.target.value) })}
                className="input-field py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-2.5 justify-center text-sm font-semibold mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">Menganalisis Parameter...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  Kirim & Analisis Rencana Melaut
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Hasil Analisis AI Decision Support */}
        <div className="lg:col-span-7 space-y-4">
          {activeAnalysis ? (
            <div className="card border border-teal/20 space-y-4 bg-gradient-to-b from-white to-slate-50/50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal/10 text-teal rounded-lg">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-base">Hasil Analisis Intelijen AI SIRKULAUT</h3>
                    <p className="text-xs text-slate-500">Evaluasi multi-variabel untuk trip penangkapan</p>
                  </div>
                </div>
                <span className="badge badge-success">Analisis Selesai</span>
              </div>

              {/* Grid Indikator Hasil */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 uppercase font-semibold">Prediksi Hasil Tangkapan</p>
                  <p className="text-xl font-bold text-navy mt-1">
                    {formatNumber(activeAnalysis.predictedCatchKg)} kg
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Rentang: {formatNumber(activeAnalysis.catchRange.min)} - {formatNumber(activeAnalysis.catchRange.max)} kg
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 uppercase font-semibold">Kondisi Ekologis & CPUE</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="badge badge-success text-xs">Status: Baik</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Tren CPUE: {activeAnalysis.cpueTrend}</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 uppercase font-semibold">Kapasitas Serap TPI</p>
                  <p className="text-sm font-bold text-slate-800 mt-1">
                    Estimasi Pasokan: {formatNumber(activeAnalysis.estimatedSupplyKg)} kg
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    Daya Serap Lelang: Optimal
                  </p>
                </div>
              </div>

              {/* Rekomendasi Rinci */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-navy flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-teal" />
                  Rekomendasi Berbasis Data & Manajemen Risiko:
                </h4>
                <div className="space-y-2">
                  {activeAnalysis.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs text-slate-600">
                <span>Tingkat Risiko Aktivitas: <strong className="text-emerald-700 uppercase font-bold">{activeAnalysis.riskLevel}</strong></span>
                <span className="text-[11px] text-slate-400">Model time-series ID: MD-2026-W45</span>
              </div>
            </div>
          ) : (
            <div className="card text-center py-16 text-slate-400 space-y-2">
              <Compass size={40} className="mx-auto text-slate-300" />
              <p className="text-sm font-semibold">Belum Ada Analisis Aktif</p>
              <p className="text-xs max-w-sm mx-auto">
                Silakan isi dan kirimkan formulir rencana melaut di sisi kiri untuk memicu analisis intelijen AI.
              </p>
            </div>
          )}

          {/* Riwayat Rencana Melaut */}
          <div className="card space-y-3">
            <h4 className="font-bold text-navy text-sm">Riwayat Rencana Melaut Terdaftar</h4>
            <div className="space-y-2">
              {plans.map((p) => (
                <div
                  key={p.id}
                  onClick={() => p.aiAnalysis && setActiveAnalysis(p.aiAnalysis)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-cyan/40 cursor-pointer transition-all flex items-center justify-between text-xs bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy flex items-center justify-center font-bold">
                      <Fish size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-navy">{p.vesselName} • {p.targetSpecies}</p>
                      <p className="text-[11px] text-slate-500">
                        {p.location} ({p.durationDays} hari) • Berangkat: {p.departureDate}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="badge badge-info text-[10px]">Target: {formatNumber(p.estimatedCatchKg)} kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

