import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import {
  DEMAND_REQUESTS,
  DEMAND_MATCHES,
  formatCurrency,
  formatNumber,
} from '../data/simulationData';
import type { DemandRequest } from '../types';
import {
  Handshake,
  TrendingUp,
  Building2,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Scale,
  Sparkles,
  ArrowRight,
  Filter,
  Warehouse,
  Flame,
} from 'lucide-react';

export default function DemandMatching() {
  const [demands] = useState<DemandRequest[]>(DEMAND_REQUESTS);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');

  const filteredDemands = demands.filter((d) => {
    if (selectedSpecies !== 'all' && d.fishSpecies !== selectedSpecies) return false;
    if (selectedQuality !== 'all' && d.qualityMin !== selectedQuality) return false;
    return true;
  });

  const totalDemandVolume = demands.reduce((acc, curr) => acc + curr.quantityKg, 0);
  const simulatedSupplyVolume = 6000;
  const unabsorbedSupply = Math.max(0, simulatedSupplyVolume - totalDemandVolume);
  const absorptionRate = Math.min(100, Math.round((totalDemandVolume / simulatedSupplyVolume) * 100));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Industrial Demand Matching"
        subtitle="Modul AI pencocokan estimasi pasokan ikan dengan kebutuhan industri pengolahan secara presisi."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Estimasi Pasokan (Swanggi)"
          value={`${formatNumber(simulatedSupplyVolume)} kg`}
          subtitle="Prediksi pendaratan aktif"
          icon={<Package size={22} />}
          color="navy"
        />
        <StatCard
          title="Total Permintaan Industri"
          value={`${formatNumber(totalDemandVolume)} kg`}
          subtitle="Dari 3 pabrik pengolahan terdaftar"
          icon={<Building2 size={22} />}
          color="teal"
        />
        <StatCard
          title="Potensi Pasokan Belum Terserap"
          value={`${formatNumber(unabsorbedSupply)} kg`}
          subtitle="Perlu dialihkan ke rantai alternatif"
          icon={<Clock size={22} />}
          color="warning"
        />
        <StatCard
          title="Tingkat Serapan Estimasi"
          value={`${absorptionRate}%`}
          subtitle="Rasio serap terhadap total pasokan"
          icon={<TrendingUp size={22} />}
          color="success"
        />
      </div>

      {/* AI Simulation Insight Banner */}
      <div className="card bg-gradient-to-r from-navy via-navy-light to-teal text-white border-none shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-cyan/20 rounded-xl text-cyan">
              <Sparkles size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Analisis Simulasi AI Demand Matching</h3>
                <span className="bg-cyan/30 text-cyan-light text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  Presisi 94.2%
                </span>
              </div>
              <p className="text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
                Prediksi pasokan ikan swanggi periode ini mencapai <strong>6.000 kg</strong> sedangkan akumulasi
                permintaan pengolah utama tercatat <strong>5.500 kg</strong>. Sistem mendeteksi potensi{' '}
                <strong>500 kg unabsorbed supply</strong> (pasokan belum terserap). Rekomendasi mitigasi otomatis telah
                dihasilkan di bawah.
              </p>
            </div>
          </div>
          <div className="text-right bg-white/10 p-3 rounded-xl border border-white/10 shrink-0">
            <p className="text-xs text-slate-300">Status Keseimbangan Pasar</p>
            <p className="text-lg font-bold text-amber-300">Surplus Ringan (+500 kg)</p>
          </div>
        </div>
      </div>

      {/* AI Matches Ranking Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy flex items-center gap-2">
            <Handshake className="text-teal" size={20} />
            Hasil Rekomendasi Kecocokan AI (AI Matching Score)
          </h2>
          <span className="text-xs text-slate-500 font-medium">Berdasarkan 5 parameter: Komoditas, Volume, Ukuran, Mutu, Jarak</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMAND_MATCHES.map((match) => (
            <div key={match.demandId} className="card-hover border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-navy text-base">{match.companyName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={13} className="text-slate-400" /> Jarak ke TPI: {match.distanceKm} km
                    </p>
                  </div>
                  <div className="text-center bg-cyan/10 border border-cyan/30 px-3 py-1.5 rounded-xl">
                    <p className="text-[10px] text-cyan-dark uppercase font-bold tracking-wider">Skor AI</p>
                    <p className="text-xl font-black text-navy">{match.matchScore}%</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Kesesuaian Komoditas:</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Cocok (Swanggi)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Kesesuaian Volume:</span>
                    <span className="font-semibold text-slate-700">{match.volumeMatch}% Terpenuhi</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Kesesuaian Ukuran & Mutu:</span>
                    <span className="font-semibold text-emerald-600">Grade A & B Standar</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Selisih Tawaran Harga:</span>
                    <span
                      className={`font-semibold ${
                        match.priceGap >= 0 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {match.priceGap >= 0
                        ? `+${formatCurrency(match.priceGap)}/kg`
                        : `${formatCurrency(match.priceGap)}/kg`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="badge badge-success text-[11px]">Siap Ditransaksikan</span>
                <button className="btn-secondary text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                  Hubungkan <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendasi Penanganan Pasokan Belum Terserap (Unabsorbed Supply) */}
      <div className="card bg-slate-50 border border-slate-200">
        <h3 className="font-bold text-navy text-base mb-2 flex items-center gap-2">
          <Warehouse className="text-teal" size={18} />
          Rencana Mitigasi Pasokan Belum Terserap (500 kg Swanggi)
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Catatan: Ikan yang belum terjual pada lelang utama dikategorikan sebagai <strong>unabsorbed supply</strong>, bukan langsung food loss.
          Sistem merekomendasikan 3 jalur penyerapan berikut:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-navy font-semibold text-sm mb-1">
              <Building2 size={16} className="text-cyan-dark" />
              1. UMKM Pengolah Ikan Asap & Kerupuk
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Kemitraan dengan 4 sentra UMKM Brondong & Paciran dengan daya serap harian 250 kg.
            </p>
            <span className="badge badge-info text-[10px]">Potensi Serap: 250 kg</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-navy font-semibold text-sm mb-1">
              <Warehouse size={16} className="text-teal" />
              2. Cold Storage TPI / Fasilitas Penyangga
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Penyimpanan beku pada suhu -20°C untuk menjaga mutu hingga lelang hari berikutnya.
            </p>
            <span className="badge badge-success text-[10px]">Kapasitas Tersedia: 1.500 kg</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-navy font-semibold text-sm mb-1">
              <Flame size={16} className="text-amber-600" />
              3. Industri Tepung Ikan (Grade C)
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Opsi akhir jika mutu menurun di bawah standar pangan segar untuk mencegah food waste total.
            </p>
            <span className="badge badge-warning text-[10px]">Nilai Residu Ekonomis</span>
          </div>
        </div>
      </div>

      {/* Daftar Kebutuhan Perusahaan (Tabel Permintaan Aktif) */}
      <div className="card space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-navy text-base">Permintaan Bahan Baku Perusahaan Terdaftar</h3>
            <p className="text-xs text-slate-500">Data live kebutuhan spesifik komoditas perikanan</p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-slate-400" />
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="select-field text-xs py-1.5 px-3"
            >
              <option value="all">Semua Komoditas</option>
              <option value="Ikan Swanggi">Ikan Swanggi</option>
              <option value="Ikan Tongkol">Ikan Tongkol</option>
            </select>

            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="select-field text-xs py-1.5 px-3"
            >
              <option value="all">Semua Mutu</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="w-full text-left">
            <thead>
              <tr className="table-header">
                <th className="table-cell">ID & Perusahaan</th>
                <th className="table-cell">Komoditas</th>
                <th className="table-cell">Jumlah Dibutuhkan</th>
                <th className="table-cell">Spesifikasi Ukuran</th>
                <th className="table-cell">Mutu Min.</th>
                <th className="table-cell">Harga Tawaran</th>
                <th className="table-cell">Jadwal Ambil</th>
                <th className="table-cell">Status Serapan</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemands.map((demand) => (
                <tr key={demand.id} className="hover:bg-slate-50 transition-colors">
                  <td className="table-cell">
                    <p className="font-bold text-navy">{demand.companyName}</p>
                    <p className="text-[11px] text-slate-400">{demand.id} • {demand.location}</p>
                  </td>
                  <td className="table-cell font-medium text-slate-700">{demand.fishSpecies}</td>
                  <td className="table-cell font-bold text-navy">{formatNumber(demand.quantityKg)} kg</td>
                  <td className="table-cell capitalize text-slate-600">{demand.sizePreference}</td>
                  <td className="table-cell">
                    <span className={`badge ${demand.qualityMin === 'A' ? 'badge-success' : 'badge-info'}`}>
                      Grade {demand.qualityMin}
                    </span>
                  </td>
                  <td className="table-cell font-semibold text-slate-800">
                    {formatCurrency(demand.priceOfferPerKg)}/kg
                  </td>
                  <td className="table-cell text-slate-500 text-xs">{demand.pickupDate}</td>
                  <td className="table-cell">
                    {demand.status === 'partially_matched' ? (
                      <span className="badge badge-warning">Terpenuhi Sebagian ({formatNumber(demand.matchedKg)} kg)</span>
                    ) : (
                      <span className="badge badge-info">Terbuka (0%)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
