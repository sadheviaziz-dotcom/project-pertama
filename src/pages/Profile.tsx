import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Bell,
  KeyRound,
  CheckCircle,
  Ship,
  Building,
  Store,
  Save,
} from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Ahmad Fauzi',
    email: user?.email || 'nelayan@demo.com',
    phone: user?.phone || '081234567890',
    vesselName: user?.vesselName || 'KM Bahari Jaya',
    companyName: user?.companyName || 'CV Samudra Protein',
    businessName: user?.businessName || 'Warung Seafood Pak Joko',
  });

  const [notifSettings, setNotifSettings] = useState({
    ecologicalAlerts: true,
    marketImbalanceAlerts: true,
    newDemandMatches: true,
    weeklyReportEmail: false,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Profil & Pengaturan Akun"
        subtitle="Kelola informasi identitas, preferensi notifikasi, dan keamanan akun Anda."
        badge={false}
      />

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>Pengaturan profil dan preferensi berhasil diperbarui.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Role Summary */}
        <div className="card space-y-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-teal text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-md">
            {formData.name.charAt(0)}
          </div>

          <div>
            <h3 className="font-bold text-navy text-base">{formData.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{formData.email}</p>
            <div className="mt-2 flex justify-center">
              <span className="badge badge-info text-xs capitalize">
                Aktor: {user?.role || 'Nelayan'}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-left space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Shield size={14} className="text-teal" />
              <span>Status: <strong className="text-emerald-600">Terverifikasi</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <UserIcon size={14} className="text-teal" />
              <span>ID: <code className="text-navy font-semibold">{user?.id || 'N001'}</code></span>
            </div>
          </div>
        </div>

        {/* Right Columns: Edit Form & Preferences */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card space-y-4">
            <h4 className="font-bold text-navy text-sm flex items-center gap-2">
              <UserIcon size={16} className="text-teal" />
              Informasi Pribadi & Organisasi
            </h4>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
              </div>

              {user?.role === 'nelayan' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Kapal Tangkap</label>
                  <input
                    type="text"
                    value={formData.vesselName}
                    onChange={(e) => setFormData({ ...formData, vesselName: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
              )}

              {user?.role === 'perusahaan' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Industri Pengolahan</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
              )}

              {user?.role === 'pedagang' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Unit Usaha / Resto</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button type="submit" className="btn-primary py-2 px-4 flex items-center gap-1.5 text-xs">
                  <Save size={15} />
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="card space-y-4">
            <h4 className="font-bold text-navy text-sm flex items-center gap-2">
              <Bell size={16} className="text-teal" />
              Preferensi Notifikasi Sistem Intelijen
            </h4>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800">Peringatan Kondisi Ekologis & Batas Tangkapan</p>
                  <p className="text-[11px] text-slate-500">Notifikasi jika tren CPUE wilayah perairan mengalami penurunan.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifSettings.ecologicalAlerts}
                  onChange={(e) => setNotifSettings({ ...notifSettings, ecologicalAlerts: e.target.checked })}
                  className="rounded text-teal focus:ring-teal h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800">Deteksi Ketidakseimbangan Pasokan & Permintaan</p>
                  <p className="text-[11px] text-slate-500">Pemberitahuan dini oversupply atau unabsorbed supply harian.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifSettings.marketImbalanceAlerts}
                  onChange={(e) => setNotifSettings({ ...notifSettings, marketImbalanceAlerts: e.target.checked })}
                  className="rounded text-teal focus:ring-teal h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800">Kecocokan AI Demand Matching Baru</p>
                  <p className="text-[11px] text-slate-500">Pemberitahuan ketika ada industri yang memerlukan komoditas tangkapan Anda.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifSettings.newDemandMatches}
                  onChange={(e) => setNotifSettings({ ...notifSettings, newDemandMatches: e.target.checked })}
                  className="rounded text-teal focus:ring-teal h-4 w-4"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

