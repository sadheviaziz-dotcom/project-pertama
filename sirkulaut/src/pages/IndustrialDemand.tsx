import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import { INDUSTRIAL_REQUESTS, formatNumber } from '../data/simulationData';
import type { IndustrialRequest } from '../types';
import { Factory, Bell, CheckCircle2, Clock, AlertTriangle, Search, Filter } from 'lucide-react';

export default function IndustrialDemand() {
  const [requests, setRequests] = useState<IndustrialRequest[]>(
    typeof INDUSTRIAL_REQUESTS !== 'undefined' ? INDUSTRIAL_REQUESTS : []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReq, setSelectedReq] = useState<IndustrialRequest | null>(null);

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.industryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.fishSpecies.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: IndustrialRequest['status']) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    if (selectedReq?.id === id) {
      setSelectedReq({ ...selectedReq, status: newStatus });
    }
  };

  const stats = {
    total: requests.length,
    menunggu: requests.filter((r) => r.status === 'menunggu').length,
    tersediaSebagian: requests.filter((r) => r.status === 'tersedia_sebagian').length,
    tersedia: requests.filter((r) => r.status === 'tersedia').length,
    belumTerpenuhi: requests.filter((r) => r.status === 'belum_terpenuhi').length,
  };

  const statusLabel = (s: IndustrialRequest['status']) => {
    switch (s) {
      case 'menunggu':
        return 'Menunggu';
      case 'tersedia_sebagian':
        return 'Tersedia Sebagian';
      case 'tersedia':
        return 'Tersedia';
      case 'belum_terpenuhi':
        return 'Belum Terpenuhi';
      default:
        return s;
    }
  };

  const statusBadge = (s: IndustrialRequest['status']) => {
    switch (s) {
      case 'menunggu':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'tersedia_sebagian':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tersedia':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'belum_terpenuhi':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Industrial Demand Requests"
        subtitle="Pusat pengelolaan dan pemantauan pengajuan kebutuhan bahan baku dari industri pengolahan ikan."
        badge
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pengajuan"
          value={stats.total}
          icon={<Factory className="w-5 h-5" />}
          color="navy"
          subtitle="Kebutuhan industri aktif"
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={stats.menunggu}
          icon={<Clock className="w-5 h-5" />}
          color={stats.menunggu > 0 ? 'warning' : 'success'}
          subtitle="Perlu pengecekan stok TPI"
        />
        <StatCard
          title="Stok Tersedia"
          value={stats.tersedia + stats.tersediaSebagian}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="success"
          subtitle={`${stats.tersedia} penuh, ${stats.tersediaSebagian} sebagian`}
        />
        <StatCard
          title="Belum Terpenuhi"
          value={stats.belumTerpenuhi}
          icon={<AlertTriangle className="w-5 h-5" />}
          color={stats.belumTerpenuhi > 0 ? 'danger' : 'info'}
          subtitle="Pasokan belum mencukupi"
        />
      </div>

      {/* Filter and Search */}
      <div className="card space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama industri atau jenis komoditas ikan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs sm:text-sm w-full outline-none text-slate-700"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400 hidden sm:block" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select-field text-xs sm:text-sm py-2 px-3 w-full sm:w-56"
            >
              <option value="all">Semua Status Pengajuan</option>
              <option value="menunggu">Menunggu</option>
              <option value="tersedia_sebagian">Tersedia Sebagian</option>
              <option value="tersedia">Tersedia</option>
              <option value="belum_terpenuhi">Belum Terpenuhi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Request Table */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-navy text-base flex items-center gap-2">
            <Bell size={18} className="text-purple-600" />
            Daftar Pengajuan Kebutuhan Bahan Baku Industri
          </h3>
          <span className="badge bg-purple-50 text-purple-700 text-xs">
            {filtered.length} Pengajuan Ditampilkan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Industri
                </th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Jenis Ikan
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Jumlah (kg)
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Ukuran
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Grade Mutu
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Kondisi
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Tanggal Kebutuhan
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Status Pengajuan
                </th>
                <th className="text-center py-3 px-2 text-xs font-semibold text-slate-500 uppercase">
                  Ubah Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                    selectedReq?.id === req.id ? 'bg-purple-50/50' : ''
                  }`}
                >
                  <td className="py-2.5 px-2">
                    <p className="font-semibold text-slate-800 text-xs">{req.industryName}</p>
                    <p className="text-[10px] text-slate-400">ID: {req.id}</p>
                  </td>
                  <td className="py-2.5 px-2 font-medium text-slate-700 text-xs">{req.fishSpecies}</td>
                  <td className="py-2.5 px-2 text-right font-bold text-navy text-xs">
                    {formatNumber(req.quantityKg)}
                  </td>
                  <td className="py-2.5 px-2 text-center capitalize text-slate-600 text-xs">
                    {req.sizePreference}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`badge text-xs ${
                        req.gradeQuality === 'A'
                          ? 'badge-success'
                          : req.gradeQuality === 'B'
                          ? 'badge-info'
                          : 'badge-warning'
                      }`}
                    >
                      Grade {req.gradeQuality}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center capitalize text-slate-600 text-xs">
                    {req.fishCondition}
                  </td>
                  <td className="py-2.5 px-2 text-center text-slate-600 text-xs">
                    {req.requiredDate}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`badge text-[11px] border ${statusBadge(req.status)}`}>
                      {statusLabel(req.status)}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleUpdateStatus(req.id, e.target.value as IndustrialRequest['status'])
                      }
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-cyan"
                    >
                      <option value="menunggu">Menunggu</option>
                      <option value="tersedia_sebagian">Tersedia Sebagian</option>
                      <option value="tersedia">Tersedia</option>
                      <option value="belum_terpenuhi">Belum Terpenuhi</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 text-sm">
                    Tidak ada pengajuan industri yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal / Panel */}
      {selectedReq && (
        <div className="card border-l-4 border-l-purple-500 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-navy text-sm flex items-center gap-2">
              <Factory size={16} className="text-purple-600" />
              Detail Pengajuan Bahan Baku — {selectedReq.industryName}
            </h4>
            <button
              onClick={() => setSelectedReq(null)}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
            >
              ✕ Tutup
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-slate-400">Komoditas Ikan</p>
              <p className="font-semibold text-slate-800">{selectedReq.fishSpecies}</p>
            </div>
            <div>
              <p className="text-slate-400">Volume Kebutuhan</p>
              <p className="font-bold text-navy">{formatNumber(selectedReq.quantityKg)} kg</p>
            </div>
            <div>
              <p className="text-slate-400">Preferensi Ukuran & Grade</p>
              <p className="font-semibold text-slate-800 capitalize">
                {selectedReq.sizePreference} • Mutu {selectedReq.gradeQuality}
              </p>
            </div>
            <div>
              <p className="text-slate-400">Kondisi & Tanggal Kebutuhan</p>
              <p className="font-semibold text-slate-800 capitalize">
                {selectedReq.fishCondition} • {selectedReq.requiredDate}
              </p>
            </div>
          </div>
          {selectedReq.additionalNotes && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="font-semibold text-slate-600">Catatan Spesifikasi Tambahan:</span>{' '}
              <span className="text-slate-700">{selectedReq.additionalNotes}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
            <span>Diajukan pada: {selectedReq.submittedAt}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-medium">Ubah Status:</span>
              <select
                value={selectedReq.status}
                onChange={(e) =>
                  handleUpdateStatus(selectedReq.id, e.target.value as IndustrialRequest['status'])
                }
                className="border border-slate-200 rounded-lg px-2 py-1 bg-white text-xs"
              >
                <option value="menunggu">Menunggu</option>
                <option value="tersedia_sebagian">Tersedia Sebagian</option>
                <option value="tersedia">Tersedia</option>
                <option value="belum_terpenuhi">Belum Terpenuhi</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
