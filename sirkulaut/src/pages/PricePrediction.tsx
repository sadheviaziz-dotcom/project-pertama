import {
  LineChart,
  Line,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Info,
  ShoppingCart,
  Droplets,
  Sun,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { PRICE_DATA, formatNumber, formatCurrency } from '../data/simulationData';

export default function PricePrediction() {
  // Compute stats
  const latestPrice = PRICE_DATA[PRICE_DATA.length - 1];
  const prevPrice = PRICE_DATA[PRICE_DATA.length - 2];
  const priceChange = latestPrice && prevPrice
    ? ((latestPrice.price - prevPrice.price) / prevPrice.price * 100).toFixed(1)
    : '0';
  const priceChangeAbs = latestPrice && prevPrice
    ? latestPrice.price - prevPrice.price
    : 0;
  const isUp = priceChangeAbs >= 0;

  // Predicted next price (simple trend extension)
  const predictedNext = latestPrice
    ? latestPrice.price + priceChangeAbs
    : 0;

  const factors = [
    {
      icon: ShoppingCart,
      title: 'Volume Pasokan',
      description: 'Jumlah ikan yang mendarat di TPI mempengaruhi harga secara invers — pasokan tinggi cenderung menekan harga.',
      impact: 'Tinggi',
      color: '#00bcd4',
    },
    {
      icon: TrendingUp,
      title: 'Permintaan Pasar',
      description: 'Permintaan dari industri pengolahan dan pedagang menentukan daya serap pasar dan mendorong harga naik.',
      impact: 'Tinggi',
      color: '#10b981',
    },
    {
      icon: Sun,
      title: 'Musim & Cuaca',
      description: 'Musim penangkapan dan kondisi cuaca memengaruhi ketersediaan ikan dan pola harga musiman.',
      impact: 'Sedang',
      color: '#f59e0b',
    },
    {
      icon: Award,
      title: 'Kualitas Ikan',
      description: 'Grade kualitas (A/B/C) dan ukuran ikan menjadi faktor diferensiasi harga yang signifikan.',
      impact: 'Sedang',
      color: '#0d7377',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Price Prediction — Prediksi Harga Ikan"
        subtitle="Modul estimasi harga ikan berdasarkan tren pasar dan multi-faktor (data simulasi)"
      />

      {/* Price Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card border-l-4" style={{ borderLeftColor: '#1e3a5f' }}>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5" style={{ color: '#1e3a5f' }} />
            <span className="text-xs text-gray-500 font-medium">Harga Saat Ini (Ikan Swanggi)</span>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>
            {formatCurrency(latestPrice?.price ?? 0)}
          </p>
          <p className="text-xs text-gray-400 mt-1">/kg — {latestPrice?.date ?? '-'}</p>
        </div>

        <div className="card border-l-4" style={{ borderLeftColor: '#00bcd4' }}>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5" style={{ color: '#00bcd4' }} />
            <span className="text-xs text-gray-500 font-medium">Prediksi Harga Berikutnya</span>
          </div>
          <p className="text-2xl font-bold" style={{ color: '#00bcd4' }}>
            {formatCurrency(predictedNext)}
          </p>
          <p className="text-xs text-gray-400 mt-1">/kg — estimasi minggu depan</p>
        </div>

        <div className="card border-l-4" style={{ borderLeftColor: isUp ? '#10b981' : '#ef4444' }}>
          <div className="flex items-center gap-2 mb-2">
            {isUp ? (
              <ArrowUpRight className="w-5 h-5" style={{ color: '#10b981' }} />
            ) : (
              <ArrowDownRight className="w-5 h-5" style={{ color: '#ef4444' }} />
            )}
            <span className="text-xs text-gray-500 font-medium">Perubahan Harga</span>
          </div>
          <p className="text-2xl font-bold" style={{ color: isUp ? '#10b981' : '#ef4444' }}>
            {isUp ? '+' : ''}{priceChange}%
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {isUp ? '+' : ''}{formatCurrency(priceChangeAbs)} dari periode sebelumnya
          </p>
        </div>
      </div>

      {/* Price Trend Chart */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: '#1e3a5f' }} />
          <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>
            Tren Harga — Ikan Swanggi
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={PRICE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(v: any) => {
                const d = new Date(v);
                return `${d.getDate()}/${d.getMonth() + 1}`;
              }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(v: any) => `${((Number(v) || 0) / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              formatter={(value: any, name: any) => [
                name === 'price' ? formatCurrency(Number(value) || 0) : `${formatNumber(Number(value) || 0)} kg`,
                name === 'price' ? 'Harga/kg' : 'Volume',
              ]}
              labelFormatter={(label: any) =>
                new Date(label).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }
            />
            <Legend formatter={(v: string) => (v === 'price' ? 'Harga (Rp/kg)' : v)} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#1e3a5f"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1e3a5f' }}
              name="price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Factors Affecting Price */}
      <div>
        <h3 className="font-semibold mb-3" style={{ color: '#1e3a5f' }}>
          <Droplets className="w-5 h-5 inline mr-2" style={{ color: '#0d7377' }} />
          Faktor yang Mempengaruhi Harga
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {factors.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg" style={{ background: `${f.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{f.title}</h4>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: f.impact === 'Tinggi' ? '#ef444420' : '#f59e0b20',
                        color: f.impact === 'Tinggi' ? '#ef4444' : '#f59e0b',
                      }}
                    >
                      Dampak {f.impact}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price vs Volume Chart */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5" style={{ color: '#1e3a5f' }} />
          <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>
            Harga vs Volume Pendaratan
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={PRICE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(v: string) => {
                const d = new Date(v);
                return `${d.getDate()}/${d.getMonth() + 1}`;
              }}
            />
            <YAxis
              yAxisId="price"
              orientation="left"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              width={50}
            />
            <YAxis
              yAxisId="volume"
              orientation="right"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              unit=" kg"
              width={60}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              formatter={(value: any, name: any) => [
                name === 'Harga (Rp/kg)' ? formatCurrency(Number(value) || 0) : `${formatNumber(Number(value) || 0)} kg`,
                name,
              ]}
              labelFormatter={(label: any) =>
                new Date(label).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }
            />
            <Legend />
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="#00bcd430"
              stroke="#00bcd4"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
              name="Volume (kg)"
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#1e3a5f"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1e3a5f' }}
              name="Harga (Rp/kg)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Historical Price Table */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5" style={{ color: '#1e3a5f' }} />
          <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>
            Riwayat Harga — Ikan Swanggi
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Tanggal</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">Harga/kg</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">Volume (kg)</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">Perubahan</th>
              </tr>
            </thead>
            <tbody>
              {[...PRICE_DATA].reverse().map((row, idx, arr) => {
                const prev = idx < arr.length - 1 ? arr[idx + 1] : null;
                const change = prev ? ((row.price - prev.price) / prev.price * 100).toFixed(1) : '-';
                const changeNum = prev ? row.price - prev.price : 0;
                return (
                  <tr key={row.date} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 text-gray-700">
                      {new Date(row.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-2 px-3 text-right font-mono" style={{ color: '#1e3a5f' }}>
                      {formatCurrency(row.price)}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-gray-600">
                      {formatNumber(row.volume)}
                    </td>
                    <td className="py-2 px-3 text-right">
                      {change === '-' ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-0.5 text-xs font-medium"
                          style={{ color: changeNum >= 0 ? '#10b981' : '#ef4444' }}
                        >
                          {changeNum >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {changeNum >= 0 ? '+' : ''}{change}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>Disclaimer:</strong> Harga yang ditampilkan merupakan estimasi berdasarkan data
            simulasi dan tren historis, bukan harga transaksi yang dijamin. Keputusan transaksi harus
            mempertimbangkan kondisi pasar aktual, kualitas ikan, dan negosiasi langsung antara pihak
            terkait. Data ini dibuat untuk keperluan prototipe dan demonstrasi.
          </p>
        </div>
      </div>
    </div>
  );
}
