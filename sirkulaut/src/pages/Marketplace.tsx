import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PageHeader from '../components/common/PageHeader';
import {
  FISH_CATALOG,
  FISH_SPECIES,
  formatCurrency,
  formatNumber,
} from '../data/simulationData';
import type { FishCatalogItem } from '../types';
import {
  Fish,
  Search,
  MapPin,
  Clock,
  Edit2,
  Trash2,
  Plus,
  X,
  CheckCircle,
  Package,
  Layers,
  Scale,
  DollarSign,
  AlertCircle,
  Building,
} from 'lucide-react';

export default function Marketplace() {
  const { user } = useAuth();
  // Role TPI dan Admin memiliki hak akses penuh (tambah, edit, hapus)
  const canManage = user?.role === 'tpi' || user?.role === 'admin';
  const isIndustry = user?.role === 'perusahaan';

  const [catalog, setCatalog] = useState<FishCatalogItem[]>(FISH_CATALOG);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FishCatalogItem | null>(null);

  // Form Data State
  const [formData, setFormData] = useState({
    fishSpecies: 'Ikan Swanggi',
    scientificName: 'Priacanthus tayenus',
    sizeCategory: 'sedang' as 'kecil' | 'sedang' | 'besar',
    quality: 'A' as 'A' | 'B' | 'C',
    totalStockKg: 500,
    unsoldKg: 200,
    reservedKg: 100,
    pricePerKg: 18000,
    location: 'Brondong, Lamongan',
    tpiName: 'TPI Brondong Unit 1',
  });

  // Filter logic
  const filteredCatalog = catalog.filter((item) => {
    const matchSearch =
      item.fishSpecies.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.scientificName && item.scientificName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tpiName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpecies = selectedSpecies === 'all' || item.fishSpecies === selectedSpecies;
    const matchQuality = selectedQuality === 'all' || item.quality === selectedQuality;
    const matchSize = selectedSize === 'all' || item.sizeCategory === selectedSize;
    return matchSearch && matchSpecies && matchQuality && matchSize;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      fishSpecies: 'Ikan Swanggi',
      scientificName: 'Priacanthus tayenus',
      sizeCategory: 'sedang',
      quality: 'A',
      totalStockKg: 500,
      unsoldKg: 200,
      reservedKg: 100,
      pricePerKg: 18000,
      location: 'Brondong, Lamongan',
      tpiName: 'TPI Brondong Unit 1',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: FishCatalogItem) => {
    setEditingItem(item);
    setFormData({
      fishSpecies: item.fishSpecies,
      scientificName: item.scientificName || '',
      sizeCategory: item.sizeCategory,
      quality: item.quality,
      totalStockKg: item.totalStockKg,
      unsoldKg: item.unsoldKg,
      reservedKg: item.reservedKg,
      pricePerKg: item.pricePerKg,
      location: item.location,
      tpiName: item.tpiName,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data stok komoditas ini dari katalog?')) {
      setCatalog(catalog.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const availableKg = Math.max(0, formData.totalStockKg - formData.reservedKg);
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (editingItem) {
      setCatalog(
        catalog.map((c) =>
          c.id === editingItem.id
            ? {
                ...c,
                ...formData,
                availableKg,
                updatedAt: nowStr,
              }
            : c
        )
      );
    } else {
      const newItem: FishCatalogItem = {
        id: `CAT${String(catalog.length + 1).padStart(3, '0')}`,
        ...formData,
        availableKg,
        updatedAt: nowStr,
      };
      setCatalog([newItem, ...catalog]);
    }
    setShowModal(false);
  };

  // Total statistics from catalog
  const totalStockAll = catalog.reduce((acc, item) => acc + item.totalStockKg, 0);
  const totalUnsoldAll = catalog.reduce((acc, item) => acc + item.unsoldKg, 0);
  const totalReservedAll = catalog.reduce((acc, item) => acc + item.reservedKg, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fish Catalog (Katalog Stok Ikan TPI)"
        subtitle="Pusat katalog informasi ketersediaan stok ikan aktual di TPI Brondong. Terhubung langsung dengan pencatatan pendaratan dan rantai dingin."
        badge
        actions={
          canManage ? (
            <button
              onClick={handleOpenAdd}
              className="btn-primary text-xs py-2 px-4 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Data Katalog
            </button>
          ) : undefined
        }
      />

      {/* Info notice for Industry & General Users */}
      <div className="card border-l-4 border-l-cyan py-3 bg-gradient-to-r from-ocean-50/60 to-white">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan/10 text-cyan-dark flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle size={18} />
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800 mb-0.5">
              Informasi Katalog Rantai Pasok Terbuka — [SIMULASI]
            </p>
            <p>
              Fish Catalog merupakan <strong>katalog informasi transparan</strong> mengenai ketersediaan komoditas di TPI,
              <strong> bukan sistem transaksi e-commerce</strong> yang menggantikan lelang resmi TPI.
              {isIndustry && (
                <span>
                  {' '}Untuk mengajukan kebutuhan bahan baku industri, silakan gunakan formulir{' '}
                  <strong>Industrial Raw Material Request</strong> pada Dashboard Industri.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center flex-shrink-0">
            <Fish size={22} />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase font-semibold">Total Stok Masuk TPI</p>
            <p className="text-lg font-bold text-navy">{formatNumber(totalStockAll)} kg</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Package size={22} />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase font-semibold">Stok Belum Terjual</p>
            <p className="text-lg font-bold text-amber-600">{formatNumber(totalUnsoldAll)} kg</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Layers size={22} />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase font-semibold">Stok Dipesan / Dialokasikan</p>
            <p className="text-lg font-bold text-blue-600">{formatNumber(totalReservedAll)} kg</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="card space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Cari jenis ikan, nama ilmiah, atau lokasi TPI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs sm:text-sm w-full outline-none text-slate-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="select-field text-xs py-2 px-2.5"
            >
              <option value="all">Semua Jenis Ikan</option>
              {FISH_SPECIES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="select-field text-xs py-2 px-2.5"
            >
              <option value="all">Semua Mutu</option>
              <option value="A">Grade A (Segar Ekspor)</option>
              <option value="B">Grade B (Standar Industri)</option>
              <option value="C">Grade C (Lokal/Olahan)</option>
            </select>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="select-field text-xs py-2 px-2.5"
            >
              <option value="all">Semua Ukuran</option>
              <option value="kecil">Kecil</option>
              <option value="sedang">Sedang</option>
              <option value="besar">Besar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCatalog.map((item) => {
          const hasUnsoldAlert = item.unsoldKg > 200;

          return (
            <div
              key={item.id}
              className="card-hover border border-slate-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
                      <Fish size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-base group-hover:text-teal transition-colors">
                        {item.fishSpecies}
                      </h3>
                      {item.scientificName && (
                        <p className="text-[11px] text-slate-400 italic font-mono">
                          {item.scientificName}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`badge text-[10px] ${
                      item.quality === 'A'
                        ? 'badge-success'
                        : item.quality === 'B'
                        ? 'badge-info'
                        : 'badge-warning'
                    }`}
                  >
                    Grade {item.quality}
                  </span>
                </div>

                {/* Price and Specs */}
                <div className="my-2.5 py-2 border-y border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Harga Acuan Lelang</p>
                    <p className="text-base font-bold text-navy">{formatCurrency(item.pricePerKg)}/kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Kategori Ukuran</p>
                    <p className="text-xs font-semibold text-slate-700 capitalize">{item.sizeCategory}</p>
                  </div>
                </div>

                {/* Detailed Stock Breakdown: Unsold vs Reserved */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-2 mb-3 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Total Stok Tercatat:</span>
                    <span className="font-bold text-slate-800">{formatNumber(item.totalStockKg)} kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-xs">
                    <div className="bg-white p-2 rounded-lg border border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase">Belum Terjual</p>
                      <p className={`font-bold ${hasUnsoldAlert ? 'text-amber-600' : 'text-slate-700'}`}>
                        {formatNumber(item.unsoldKg)} kg
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase">Sudah Dipesan</p>
                      <p className="font-bold text-blue-600">
                        {formatNumber(item.reservedKg)} kg
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location and Update Time */}
                <div className="space-y-1 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{item.tpiName} • {item.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-400" />
                    <span>Diperbarui: {item.updatedAt}</span>
                  </p>
                </div>
              </div>

              {/* Action and Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle size={13} /> Terhubung Stok TPI
                </span>

                {canManage ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-slate-500 hover:text-teal hover:bg-teal/10 rounded-lg transition-colors"
                      title="Edit data katalog"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus data"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Katalog Informasi
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCatalog.length === 0 && (
        <div className="card text-center py-12">
          <Fish size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium text-sm">Tidak ada komoditas ikan yang cocok.</p>
          <p className="text-slate-400 text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter yang dipilih.</p>
        </div>
      )}

      {/* Modal Tambah / Edit Data Katalog (Khusus TPI / Admin) */}
      {showModal && canManage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-navy text-base flex items-center gap-2">
                <Fish size={18} className="text-teal" />
                {editingItem ? 'Perbarui Data Stok Katalog' : 'Tambah Data Komoditas Katalog'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Jenis Ikan *</label>
                  <select
                    value={formData.fishSpecies}
                    onChange={(e) => {
                      const spec = FISH_SPECIES.find((s) => s.name === e.target.value);
                      setFormData({
                        ...formData,
                        fishSpecies: e.target.value,
                        scientificName: spec ? spec.scientificName : '',
                      });
                    }}
                    className="select-field py-2 text-xs"
                    required
                  >
                    {FISH_SPECIES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Ilmiah</label>
                  <input
                    type="text"
                    value={formData.scientificName}
                    onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })}
                    className="input-field py-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori Ukuran *</label>
                  <select
                    value={formData.sizeCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sizeCategory: e.target.value as 'kecil' | 'sedang' | 'besar',
                      })
                    }
                    className="select-field py-2 text-xs"
                  >
                    <option value="kecil">Kecil</option>
                    <option value="sedang">Sedang</option>
                    <option value="besar">Besar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Grade Mutu *</label>
                  <select
                    value={formData.quality}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quality: e.target.value as 'A' | 'B' | 'C',
                      })
                    }
                    className="select-field py-2 text-xs"
                  >
                    <option value="A">Grade A (Segar Ekspor)</option>
                    <option value="B">Grade B (Standar Industri)</option>
                    <option value="C">Grade C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Harga Acuan/kg (Rp) *
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={formData.pricePerKg}
                    onChange={(e) => setFormData({ ...formData, pricePerKg: Number(e.target.value) })}
                    className="input-field py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Total Stok Masuk (kg) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.totalStockKg}
                    onChange={(e) =>
                      setFormData({ ...formData, totalStockKg: Number(e.target.value) })
                    }
                    className="input-field py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Stok Belum Terjual (kg) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.unsoldKg}
                    onChange={(e) =>
                      setFormData({ ...formData, unsoldKg: Number(e.target.value) })
                    }
                    className="input-field py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Stok Sudah Dipesan (kg) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.reservedKg}
                    onChange={(e) =>
                      setFormData({ ...formData, reservedKg: Number(e.target.value) })
                    }
                    className="input-field py-2 text-xs"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Lokasi Pendaratan / TPI</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field py-2 text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-cyan/5 rounded-xl border border-cyan/20 text-xs text-slate-600">
                Pembaruan katalog ini akan otomatis memperbarui informasi stok transparan yang dapat dilihat oleh industri dan pihak terkait.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary py-2 px-5 text-xs">
                  {editingItem ? 'Simpan Perubahan' : 'Tambahkan ke Katalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
