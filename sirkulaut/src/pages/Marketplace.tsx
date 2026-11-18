import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import {
  MARKET_LISTINGS,
  PURCHASE_ORDERS,
  FISH_SPECIES,
  formatCurrency,
  formatNumber,
} from '../data/simulationData';
import type { MarketListing, PurchaseOrder } from '../types';
import {
  Store,
  Search,
  Filter,
  ShoppingCart,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Truck,
  Plus,
  X,
  Fish,
  Building,
} from 'lucide-react';

export default function Marketplace() {
  const [listings, setListings] = useState<MarketListing[]>(MARKET_LISTINGS);
  const [orders, setOrders] = useState<PurchaseOrder[]>(PURCHASE_ORDERS);
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders'>('catalog');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  // Order Modal
  const [orderModal, setOrderModal] = useState<MarketListing | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(50);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Filter listings
  const filteredListings = listings.filter((l) => {
    const matchSearch =
      l.fishSpecies.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.tpiName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpecies = selectedSpecies === 'all' || l.fishSpecies === selectedSpecies;
    const matchQuality = selectedQuality === 'all' || l.quality === selectedQuality;
    const matchSize = selectedSize === 'all' || l.sizeCategory === selectedSize;
    return matchSearch && matchSpecies && matchQuality && matchSize;
  });

  const handleOpenOrder = (listing: MarketListing) => {
    setOrderModal(listing);
    setOrderQuantity(Math.min(50, listing.availableKg));
    setOrderSuccess(false);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderModal) return;

    const newOrder: PurchaseOrder = {
      id: `PO${String(orders.length + 1).padStart(3, '0')}`,
      buyerId: 'D001',
      buyerName: 'Warung Seafood Pak Joko (Anda)',
      listingId: orderModal.id,
      fishSpecies: orderModal.fishSpecies,
      quantityKg: orderQuantity,
      totalPrice: orderQuantity * orderModal.pricePerKg,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
    };

    setOrders([newOrder, ...orders]);
    // Deduct available volume
    setListings(
      listings.map((l) =>
        l.id === orderModal.id
          ? { ...l, availableKg: Math.max(0, l.availableKg - orderQuantity) }
          : l
      )
    );
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderModal(null);
      setOrderSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Marketplace Perikanan"
        subtitle="Platform terintegrasi distribusi ikan segar langsung dari TPI Brondong ke pengolah, pedagang, dan UMKM."
        actions={
          <div className="flex bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-slate-600 hover:text-navy'
              }`}
            >
              Katalog Ikan Tersedia
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-slate-600 hover:text-navy'
              }`}
            >
              Riwayat Pembelian ({orders.length})
            </button>
          </div>
        }
      />

      {activeTab === 'catalog' ? (
        <div className="space-y-6">
          {/* Search & Filter Section */}
          <div className="card space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2 flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari jenis ikan, lokasi pendaratan, atau TPI..."
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
                  <option value="all">Semua Jenis</option>
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
                  <option value="A">Grade A (Segar)</option>
                  <option value="B">Grade B (Bagus)</option>
                  <option value="C">Grade C</option>
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

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="card-hover border border-slate-200 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
                        <Fish size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy text-base group-hover:text-teal transition-colors">
                          {item.fishSpecies}
                        </h3>
                        <p className="text-[11px] text-slate-400 capitalize">Ukuran: {item.sizeCategory}</p>
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
                      Mutu {item.quality}
                    </span>
                  </div>

                  <div className="my-3 py-2 border-y border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Harga Lelang/Kg</p>
                      <p className="text-xl font-bold text-navy">{formatCurrency(item.pricePerKg)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Stok Siap Angkut</p>
                      <p className="text-base font-bold text-teal">{formatNumber(item.availableKg)} kg</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{item.tpiName} • {item.location}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400" />
                      <span>Mendarat: {item.landingDate} (Subuh)</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle size={13} /> Rantai Dingin Terjamin
                  </span>
                  <button
                    onClick={() => handleOpenOrder(item)}
                    disabled={item.availableKg <= 0}
                    className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5"
                  >
                    <ShoppingCart size={14} />
                    {item.availableKg > 0 ? 'Pesan Sekarang' : 'Habis'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Orders Tab */
        <div className="card space-y-4">
          <h3 className="font-bold text-navy text-base">Riwayat Pesanan & Distribusi Pembeli</h3>
          <div className="table-container">
            <table className="w-full text-left">
              <thead>
                <tr className="table-header">
                  <th className="table-cell">No. Pesanan & Tanggal</th>
                  <th className="table-cell">Pembeli</th>
                  <th className="table-cell">Komoditas Ikan</th>
                  <th className="table-cell">Jumlah (kg)</th>
                  <th className="table-cell">Total Biaya</th>
                  <th className="table-cell">Status Pengiriman</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="table-cell">
                      <p className="font-bold text-navy text-xs">{o.id}</p>
                      <p className="text-[11px] text-slate-400">{o.orderDate}</p>
                    </td>
                    <td className="table-cell font-semibold text-xs text-slate-700">{o.buyerName}</td>
                    <td className="table-cell text-xs text-slate-800">{o.fishSpecies}</td>
                    <td className="table-cell font-bold text-xs text-navy">{formatNumber(o.quantityKg)} kg</td>
                    <td className="table-cell font-bold text-xs text-teal">{formatCurrency(o.totalPrice)}</td>
                    <td className="table-cell">
                      {o.status === 'delivered' ? (
                        <span className="badge badge-success text-[10px]">Terkirim & Diterima</span>
                      ) : o.status === 'confirmed' ? (
                        <span className="badge badge-info text-[10px]">Dikonfirmasi TPI</span>
                      ) : (
                        <span className="badge badge-warning text-[10px]">Menunggu Konfirmasi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {orderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-navy text-base flex items-center gap-2">
                <ShoppingCart size={18} className="text-teal" />
                Form Pemesanan Ikan Segar
              </h3>
              <button
                onClick={() => setOrderModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {orderSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle size={48} className="text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-navy text-lg">Pesanan Berhasil Diajukan!</h4>
                <p className="text-xs text-slate-500">
                  Pesanan telah diteruskan ke petugas TPI Brondong untuk penyiapan armada rantai dingin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <p className="font-bold text-navy text-sm">{orderModal.fishSpecies}</p>
                  <p className="text-slate-500">
                    Kategori: {orderModal.sizeCategory} • Mutu Grade {orderModal.quality}
                  </p>
                  <p className="text-slate-500">Lokasi: {orderModal.tpiName}</p>
                  <p className="font-semibold text-teal">
                    Harga: {formatCurrency(orderModal.pricePerKg)} / kg
                  </p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Jumlah Pembelian (kg) - Maks. {orderModal.availableKg} kg
                  </label>
                  <input
                    type="number"
                    min="10"
                    max={orderModal.availableKg}
                    required
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="input-field py-2"
                  />
                </div>

                <div className="p-3 bg-cyan/5 rounded-xl border border-cyan/20 flex justify-between items-center text-xs">
                  <span className="text-slate-600">Total Biaya Pemesanan:</span>
                  <span className="font-bold text-navy text-base">
                    {formatCurrency(orderQuantity * orderModal.pricePerKg)}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setOrderModal(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary py-2 px-5">
                    Konfirmasi Pembelian
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

