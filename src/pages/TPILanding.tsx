import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import {
  LANDING_RECORDS,
  FISH_SPECIES,
  formatCurrency,
  formatNumber,
} from '../data/simulationData';
import type { LandingRecord } from '../types';
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Scale,
  DollarSign,
  Ship,
  X,
  FileSpreadsheet,
} from 'lucide-react';

export default function TPILanding() {
  const [records, setRecords] = useState<LandingRecord[]>(LANDING_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterQuality, setFilterQuality] = useState('all');

  // Modal form states
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<LandingRecord | null>(null);

  const [formData, setFormData] = useState({
    vesselName: '',
    nelayanName: '',
    fishSpecies: 'Ikan Swanggi',
    weightKg: 500,
    sizeCategory: 'sedang' as 'kecil' | 'sedang' | 'besar',
    quality: 'A' as 'A' | 'B' | 'C',
    pricePerKg: 18000,
    soldKg: 500,
  });

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setFormData({
      vesselName: '',
      nelayanName: '',
      fishSpecies: 'Ikan Swanggi',
      weightKg: 500,
      sizeCategory: 'sedang',
      quality: 'A',
      pricePerKg: 18000,
      soldKg: 500,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (rec: LandingRecord) => {
    setEditingRecord(rec);
    setFormData({
      vesselName: rec.vesselName,
      nelayanName: rec.nelayanName,
      fishSpecies: rec.fishSpecies,
      weightKg: rec.weightKg,
      sizeCategory: rec.sizeCategory,
      quality: rec.quality,
      pricePerKg: rec.pricePerKg,
      soldKg: rec.soldKg,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan pendaratan ini?')) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unsold = Math.max(0, formData.weightKg - formData.soldKg);

    if (editingRecord) {
      setRecords(
        records.map((r) =>
          r.id === editingRecord.id
            ? {
                ...r,
                ...formData,
                unsoldKg: unsold,
              }
            : r
        )
      );
    } else {
      const newRec: LandingRecord = {
        id: `LR${String(records.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        vesselName: formData.vesselName || 'KM Hasil Bahari',
        nelayanId: 'N001',
        nelayanName: formData.nelayanName || 'Nelayan Lokal',
        fishSpecies: formData.fishSpecies,
        weightKg: Number(formData.weightKg),
        sizeCategory: formData.sizeCategory,
        quality: formData.quality,
        pricePerKg: Number(formData.pricePerKg),
        soldKg: Number(formData.soldKg),
        unsoldKg: unsold,
        tpiId: 'T001',
        tpiName: 'TPI Brondong Unit 1',
        status: 'completed',
      };
      setRecords([newRec, ...records]);
    }
    setShowModal(false);
  };

  // Filter records
  const filteredRecords = records.filter((r) => {
    const matchSearch =
      r.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.nelayanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpecies = filterSpecies === 'all' || r.fishSpecies === filterSpecies;
    const matchQuality = filterQuality === 'all' || r.quality === filterQuality;
    return matchSearch && matchSpecies && matchQuality;
  });

  const totalWeight = records.reduce((sum, r) => sum + r.weightKg, 0);
  const totalSold = records.reduce((sum, r) => sum + r.soldKg, 0);
  const totalUnsold = records.reduce((sum, r) => sum + r.unsoldKg, 0);
  const avgPrice = Math.round(records.reduce((sum, r) => sum + r.pricePerKg, 0) / (records.length || 1));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Pendaratan TPI"
        subtitle="Pusat pencatatan digital pendaratan dan lelang ikan di Tempat Pelelangan Ikan (TPI) Brondong."
        actions={
          <button onClick={handleOpenAdd} className="btn-primary text-sm flex items-center gap-2">
            <Plus size={18} />
            Input Pendaratan Baru
          </button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pendaratan Tercatat"
          value={`${formatNumber(totalWeight)} kg`}
          subtitle={`${records.length} kapal mendarat`}
          icon={<Scale size={20} />}
          color="navy"
        />
        <StatCard
          title="Volume Terjual (Lelang)"
          value={`${formatNumber(totalSold)} kg`}
          subtitle={`${Math.round((totalSold / totalWeight) * 100)}% terserap lelang`}
          icon={<CheckCircle size={20} />}
          color="success"
        />
        <StatCard
          title="Volume Belum Terjual"
          value={`${formatNumber(totalUnsold)} kg`}
          subtitle="Potensi pasokan belum terserap"
          icon={<Clock size={20} />}
          color="warning"
        />
        <StatCard
          title="Rata-rata Harga Lelang"
          value={formatCurrency(avgPrice)}
          subtitle="Per kilogram komoditas"
          icon={<DollarSign size={20} />}
          color="teal"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="card space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Cari kapal, nelayan, atau ID pencatatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-slate-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter size={15} className="text-slate-400" />
              <span>Filter:</span>
            </div>

            <select
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="select-field text-xs py-2 px-3 w-auto"
            >
              <option value="all">Semua Komoditas</option>
              {FISH_SPECIES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={filterQuality}
              onChange={(e) => setFilterQuality(e.target.value)}
              className="select-field text-xs py-2 px-3 w-auto"
            >
              <option value="all">Semua Mutu</option>
              <option value="A">Mutu A (Sangat Baik)</option>
              <option value="B">Mutu B (Baik)</option>
              <option value="C">Mutu C (Cukup)</option>
            </select>

            <button
              onClick={() => alert('Simulasi ekspor laporan: File Rekapitulasi_Pendaratan_TPI.xlsx berhasil diunduh.')}
              className="btn-outline text-xs py-2 px-3 flex items-center gap-1"
            >
              <FileSpreadsheet size={15} />
              Ekspor Rekap
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="w-full text-left">
            <thead>
              <tr className="table-header">
                <th className="table-cell">ID & Tanggal</th>
                <th className="table-cell">Kapal & Nelayan</th>
                <th className="table-cell">Komoditas Ikan</th>
                <th className="table-cell">Berat (kg)</th>
                <th className="table-cell">Ukuran & Mutu</th>
                <th className="table-cell">Harga/kg</th>
                <th className="table-cell">Terjual / Sisa</th>
                <th className="table-cell text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="table-cell">
                      <span className="font-bold text-navy text-xs">{r.id}</span>
                      <p className="text-[11px] text-slate-400">{r.date}</p>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <Ship size={15} className="text-teal" />
                        <div>
                          <p className="font-semibold text-xs text-navy">{r.vesselName}</p>
                          <p className="text-[11px] text-slate-500">{r.nelayanName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell font-medium text-xs text-slate-800">{r.fishSpecies}</td>
                    <td className="table-cell font-bold text-xs text-navy">{formatNumber(r.weightKg)} kg</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1.5">
                        <span className="capitalize text-xs text-slate-600">{r.sizeCategory}</span>
                        <span
                          className={`badge text-[10px] ${
                            r.quality === 'A'
                              ? 'badge-success'
                              : r.quality === 'B'
                              ? 'badge-info'
                              : 'badge-warning'
                          }`}
                        >
                          Grade {r.quality}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell font-semibold text-xs text-slate-700">
                      {formatCurrency(r.pricePerKg)}
                    </td>
                    <td className="table-cell">
                      <div className="text-xs">
                        <span className="font-semibold text-emerald-600">{formatNumber(r.soldKg)} kg</span>
                        {r.unsoldKg > 0 && (
                          <span className="text-amber-600 ml-1">({formatNumber(r.unsoldKg)} kg sisa)</span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(r)}
                          className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-navy"
                          title="Edit Catatan"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1.5 hover:bg-red-50 rounded text-slate-400 hover:text-red-600"
                          title="Hapus Catatan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="table-cell text-center py-8 text-slate-400">
                    Tidak ditemukan data pendaratan yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Input / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-navy text-lg flex items-center gap-2">
                <ClipboardList size={20} className="text-teal" />
                {editingRecord ? 'Edit Catatan Pendaratan' : 'Input Catatan Pendaratan Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Kapal</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: KM Bahari Utama"
                    value={formData.vesselName}
                    onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Nelayan / Nahkoda</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pak Supri"
                    value={formData.nelayanName}
                    onChange={(e) => setFormData({ ...formData, nelayanName: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Jenis Komoditas Ikan</label>
                <select
                  value={formData.fishSpecies}
                  onChange={(e) => setFormData({ ...formData, fishSpecies: e.target.value })}
                  className="select-field py-2"
                >
                  {FISH_SPECIES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.scientificName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Total Berat (kg)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="input-field py-2"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori Ukuran</label>
                  <select
                    value={formData.sizeCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sizeCategory: e.target.value as 'kecil' | 'sedang' | 'besar',
                      })
                    }
                    className="select-field py-2"
                  >
                    <option value="kecil">Kecil</option>
                    <option value="sedang">Sedang</option>
                    <option value="besar">Besar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Grade Mutu</label>
                  <select
                    value={formData.quality}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quality: e.target.value as 'A' | 'B' | 'C',
                      })
                    }
                    className="select-field py-2"
                  >
                    <option value="A">Grade A (Prima)</option>
                    <option value="B">Grade B (Bagus)</option>
                    <option value="C">Grade C (Standar)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Harga Lelang (Rp/kg)</label>
                  <input
                    type="number"
                    step="500"
                    min="1000"
                    required
                    value={formData.pricePerKg}
                    onChange={(e) => setFormData({ ...formData, pricePerKg: Number(e.target.value) })}
                    className="input-field py-2"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Volume Terjual (kg)</label>
                  <input
                    type="number"
                    min="0"
                    max={formData.weightKg}
                    required
                    value={formData.soldKg}
                    onChange={(e) => setFormData({ ...formData, soldKg: Number(e.target.value) })}
                    className="input-field py-2"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-600">Estimasi Sisa Belum Terjual:</span>
                <span className="font-bold text-amber-600">
                  {Math.max(0, formData.weightKg - formData.soldKg)} kg
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary py-2 px-5">
                  {editingRecord ? 'Simpan Perubahan' : 'Catat Pendaratan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

