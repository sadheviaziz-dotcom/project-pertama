import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Target,
  BarChart3,
  Activity,
  Info,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { LANDING_PREDICTIONS, formatNumber } from '../data/simulationData';

export default function LandingForecast() {
  // Compute stats from prediction data
  const historicalData = LANDING_PREDICTIONS.filter((d) => d.actual !== undefined);
  const futureData = LANDING_PREDICTIONS.filter((d) => d.actual === undefined);
  const latestPrediction = futureData[0];
  const latestActual = historicalData[historicalData.length - 1];

  // Trend: compare last two actual values
  const prevActual = historicalData.length >= 2 ? historicalData[historicalData.length - 2] : null;
  const trendDirection =
    latestActual && prevActual
      ? latestActual.actual! > prevActual.actual!
        ? 'Meningkat'
        : latestActual.actual! < prevActual.actual!
          ? 'Menurun'
          : 'Stabil'
      : 'Stabil';

  // Accuracy: mean absolute percentage error across historical data
  const accuracyValues = historicalData.map((d) => {
    const err = Math.abs((d.actual! - d.predicted) / d.actual!) * 100;
    return err;
  });
  const mape = accuracyValues.reduce((s, v) => s + v, 0) / accuracyValues.length;
  const accuracy = (100 - mape).toFixed(1);

  // Next week forecast
  const nextWeekForecast = latestPrediction?.predicted ?? 0;

  const statCards = [
    {
      icon: Target,
      label: 'Prediksi Terbaru',
      value: `${formatNumber(latestPrediction?.predicted ?? 0)} kg`,
      sub: latestPrediction?.date ?? '-',
      color: '#00bcd4',
    },
    {
      icon: TrendingUp,
      label: 'Tren Pendaratan',
      value: trendDirection,
      sub:
        latestActual && prevActual
          ? `${formatNumber(prevActual.actual!)} → ${formatNumber(latestActual.actual!)} kg`
          : '-',
      color: trendDirection === 'Meningkat' ? '#10b981' : trendDirection === 'Menurun' ? '#ef4444' : '#f59e0b',
    },
    {
      icon: CheckCircle2,
      label: 'Akurasi Model',
      value: `${accuracy}%`,
      sub: `MAPE: ${mape.toFixed(1)}%`,
      color: '#10b981',
    },
    {
      icon: Calendar,
      label: 'Forecast Minggu Depan',
      value: `${formatNumber(nextWeekForecast)} kg`,
      sub: `Range: ${formatNumber(latestPrediction?.lowerBound ?? 0)} – ${formatNumber(latestPrediction?.upperBound ?? 0)}`,
      color: '#0d7377',
    },
  ];

  const factors = [
    'Data historis pendaratan mingguan',
    'Pola musiman dan cuaca',
    'Jumlah trip penangkapan aktif',
    'Tren CPUE (Catch Per Unit Effort)',
    'Kondisi oseanografi perairan',
    'Kapasitas armada dan alat tangkap',
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Landing Forecast — Prediksi Pendaratan Ikan"
        subtitle="Modul prediksi volume pendaratan ikan berbasis model time-series (data simulasi)"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ background: `${card.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <span className="text-xs text-gray-500 font-medium">{card.label}</span>
              </div>
              <p className="text-xl font-bold" style={{ color: '#1e3a5f' }}>
                {card.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Main Prediction Chart */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5" style={{ color: '#1e3a5f' }} />
          <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>
            Grafik Prediksi Pendaratan
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={LANDING_PREDICTIONS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(v: any) => {
                const d = new Date(v);
                return `${d.getDate()}/${d.getMonth() + 1}`;
              }}
            />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} unit=" kg" width={70} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 12,
              }}
              formatter={(value: any, name: any) => [
                `${formatNumber(Number(value) || 0)} kg`,
                name === 'upperBound'
                  ? 'Batas Atas'
                  : name === 'lowerBound'
                    ? 'Batas Bawah'
                    : name === 'actual'
                      ? 'Aktual'
                      : 'Prediksi',
              ]}
              labelFormatter={(label: any) => {
                const d = new Date(label);
                return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
              }}
            />
            <Legend
              formatter={(value: any) =>
                value === 'upperBound'
                  ? 'Batas Atas'
                  : value === 'lowerBound'
                    ? 'Batas Bawah'
                    : value === 'actual'
                      ? 'Aktual'
                      : value === 'predicted'
                        ? 'Prediksi'
                        : value
              }
            />
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="#00bcd420"
              fillOpacity={1}
              name="upperBound"
              legendType="none"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="#ffffff"
              fillOpacity={1}
              name="lowerBound"
              legendType="none"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#1e3a5f"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1e3a5f' }}
              name="actual"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#00bcd4"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={{ r: 3, fill: '#00bcd4', strokeWidth: 0 }}
              name="predicted"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Area biru muda menunjukkan interval kepercayaan prediksi (uncertainty range)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Trend Analysis Card */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpRight className="w-5 h-5" style={{ color: '#0d7377' }} />
            <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>
              Analisis Tren
            </h3>
          </div>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              Model prediksi menunjukkan tren <strong>{trendDirection.toLowerCase()}</strong> pada
              volume pendaratan ikan dalam beberapa minggu terakhir. Data aktual terakhir tercatat
              sebesar <strong>{formatNumber(latestActual?.actual ?? 0)} kg</strong> pada{' '}
              {latestActual?.date ?? '-'}.
            </p>
            <p>
              Prediksi minggu depan mengestimasi volume sebesar{' '}
              <strong>{formatNumber(nextWeekForecast)} kg</strong> dengan interval kepercayaan{' '}
              <strong>
                {formatNumber(latestPrediction?.lowerBound ?? 0)} –{' '}
                {formatNumber(latestPrediction?.upperBound ?? 0)} kg
              </strong>
              . Faktor utama yang mendorong tren ini meliputi pola musiman, jumlah trip penangkapan,
              dan kondisi oseanografi.
            </p>
            <p>
              Akurasi model saat ini berada di <strong>{accuracy}%</strong> berdasarkan evaluasi
              terhadap data historis menggunakan metrik MAPE (Mean Absolute Percentage Error).
            </p>
          </div>
        </div>

        {/* Factors Panel */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5" style={{ color: '#0d7377' }} />
            <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>
              Variabel yang Digunakan
            </h3>
          </div>
          <ul className="space-y-2">
            {factors.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className="w-4 h-4 flex-shrink-0" style={{ color: '#00bcd4' }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5" style={{ color: '#1e3a5f' }} />
          <h3 className="font-semibold" style={{ color: '#1e3a5f' }}>
            Perbandingan Prediksi vs Aktual
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Periode</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">Prediksi (kg)</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">Aktual (kg)</th>
                <th className="text-right py-2 px-3 text-gray-500 font-medium">Error (%)</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((row) => {
                const error = ((Math.abs(row.actual! - row.predicted) / row.actual!) * 100).toFixed(1);
                return (
                  <tr key={row.date} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 text-gray-700">
                      {new Date(row.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-2 px-3 text-right font-mono" style={{ color: '#00bcd4' }}>
                      {formatNumber(row.predicted)}
                    </td>
                    <td className="py-2 px-3 text-right font-mono" style={{ color: '#1e3a5f' }}>
                      {formatNumber(row.actual!)}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: parseFloat(error) < 5 ? '#10b98120' : '#f59e0b20',
                          color: parseFloat(error) < 5 ? '#10b981' : '#f59e0b',
                        }}
                      >
                        {error}%
                      </span>
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
            <strong>Disclaimer:</strong> Hasil prediksi merupakan estimasi berdasarkan data simulasi,
            bukan data resmi. Model ini dikembangkan untuk keperluan prototipe SIRKULAUT dan tidak
            menggantikan kajian ilmiah resmi dari instansi berwenang.
          </p>
        </div>
      </div>
    </div>
  );
}
