import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Waves,
  Mail,
  Lock,
  User,
  Phone,
  Anchor,
  ClipboardList,
  Factory,
  Store,
  Settings,
  Ship,
  Eye,
  EyeOff,
  ArrowRight,
  Fish,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types';

/* ─── role config for demo buttons & register extras ─── */
const ROLES: { role: UserRole; label: string; icon: typeof Anchor; color: string; bg: string }[] = [
  { role: 'nelayan', label: 'Nelayan', icon: Anchor, color: 'text-cyan', bg: 'bg-cyan/10 hover:bg-cyan/20 border-cyan/20' },
  { role: 'tpi', label: 'TPI', icon: ClipboardList, color: 'text-teal', bg: 'bg-teal/10 hover:bg-teal/20 border-teal/20' },
  { role: 'perusahaan', label: 'Industri', icon: Factory, color: 'text-navy', bg: 'bg-ocean-50 hover:bg-ocean-100 border-ocean-200' },
  { role: 'pedagang', label: 'Pedagang', icon: Store, color: 'text-purple-600', bg: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
  { role: 'admin', label: 'Admin', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-50 hover:bg-slate-100 border-slate-200' },
];

export default function LoginPage() {
  const { login, loginAsRole, register } = useAuth();
  const navigate = useNavigate();

  /* ─── state ─── */
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('nelayan');
  const [vesselName, setVesselName] = useState('');
  const [tpiName, setTpiName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');

  /* ─── handlers ─── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) navigate('/dashboard');
      else setError('Email tidak ditemukan. Gunakan akun demo atau daftar baru.');
    }, 400);
  };

  const handleDemoLogin = (role: UserRole) => {
    setLoading(true);
    setTimeout(() => {
      loginAsRole(role);
      setLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        role: regRole,
        vesselName: regRole === 'nelayan' ? vesselName : undefined,
        tpiName: regRole === 'tpi' ? tpiName : undefined,
        companyName: regRole === 'perusahaan' ? companyName : undefined,
        businessName: regRole === 'pedagang' ? businessName : undefined,
        businessType: regRole === 'pedagang' ? businessType : undefined,
      });
      setLoading(false);
      if (ok) navigate('/dashboard');
      else setError('Registrasi gagal. Silakan coba lagi.');
    }, 400);
  };

  /* ─── render ─── */
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ════════════ LEFT BRANDED PANEL ════════════ */}
      <div className="relative hidden lg:flex lg:w-[45%] bg-gradient-to-br from-navy via-navy-dark to-teal flex-col justify-between overflow-hidden">
        {/* decorative */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-teal/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center flex-1 px-12 xl:px-16">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <Waves className="w-9 h-9 text-cyan" />
            <span className="text-2xl font-extrabold text-white tracking-tight">SIRKULAUT</span>
          </Link>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
            Balancing Ocean
            <br />
            <span className="text-cyan">Sustainability</span> and
            <br />
            Fisheries <span className="text-cyan-light">Intelligence</span>
          </h2>
          <p className="mt-5 text-sm text-slate-300 leading-relaxed max-w-md">
            Platform cerdas berbasis AI untuk pengelolaan perikanan tangkap yang efisien,
            adil, dan berkelanjutan di PPN Brondong, Lamongan.
          </p>

          {/* feature highlights */}
          <div className="mt-8 space-y-3">
            {['Prediksi hasil tangkapan real-time', 'Pencocokan supply-demand otomatis', 'Pemantauan keberlanjutan stok ikan'].map(
              (t) => (
                <div key={t} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Fish className="w-4 h-4 text-cyan shrink-0" />
                  {t}
                </div>
              ),
            )}
          </div>
        </div>

        {/* wave decoration at bottom */}
        <div className="w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px]">
            <path
              d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120Z"
              fill="rgba(255,255,255,0.05)"
            />
          </svg>
        </div>
      </div>

      {/* ════════════ RIGHT FORM PANEL ════════════ */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 lg:px-12 bg-surface">
        <div className="w-full max-w-md">
          {/* mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <Waves className="w-7 h-7 text-cyan" />
              <span className="text-xl font-extrabold text-navy tracking-tight">SIRKULAUT</span>
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-navy">
            {isRegister ? 'Buat Akun Baru' : 'Selamat Datang'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isRegister
              ? 'Daftar untuk mengakses platform SIRKULAUT'
              : 'Masuk ke dashboard SIRKULAUT'}
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* ──── LOGIN FORM ──── */}
          {!isRegister && (
            <>
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                {/* email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      className="input-field pl-10"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-field pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-60"
                >
                  {loading ? 'Memproses…' : 'Masuk'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">ATAU MASUK SEBAGAI DEMO</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* demo role buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => handleDemoLogin(r.role)}
                    disabled={loading}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${r.bg} ${r.color} disabled:opacity-50`}
                  >
                    <r.icon className="w-4 h-4" />
                    {r.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ──── REGISTER FORM ──── */}
          {isRegister && (
            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              {/* name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    className="input-field pl-10"
                    placeholder="Nama lengkap"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    className="input-field pl-10"
                    placeholder="nama@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nomor Telepon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    className="input-field pl-10"
                    placeholder="08xxxxxxxxxx"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field pl-10 pr-10"
                    placeholder="Min. 6 karakter"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* role select */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Peran</label>
                <select
                  className="select-field"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as UserRole)}
                >
                  <option value="nelayan">Nelayan</option>
                  <option value="tpi">TPI (Tempat Pelelangan Ikan)</option>
                  <option value="perusahaan">Industri Pengolahan</option>
                  <option value="pedagang">Pedagang</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {/* role-specific fields */}
              {regRole === 'nelayan' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Kapal</label>
                  <div className="relative">
                    <Ship className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder="Nama kapal"
                      value={vesselName}
                      onChange={(e) => setVesselName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {regRole === 'tpi' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama TPI</label>
                  <div className="relative">
                    <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder="Nama TPI"
                      value={tpiName}
                      onChange={(e) => setTpiName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {regRole === 'perusahaan' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Industri</label>
                  <div className="relative">
                    <Factory className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder="Nama industri pengolahan"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {regRole === 'pedagang' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Usaha</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        className="input-field pl-10"
                        placeholder="Nama usaha"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Usaha</label>
                    <select
                      className="select-field"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                    >
                      <option value="">Pilih tipe usaha</option>
                      <option value="umkm">UMKM</option>
                      <option value="restoran">Restoran</option>
                      <option value="hotel">Hotel</option>
                      <option value="pedagang">Pedagang Pasar</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-secondary w-full justify-center py-3 disabled:opacity-60"
              >
                {loading ? 'Memproses…' : 'Daftar Sekarang'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* toggle */}
          <p className="mt-6 text-center text-sm text-slate-500">
            {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
            <button
              type="button"
              className="font-semibold text-teal hover:text-teal-light transition-colors"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Masuk di sini' : 'Daftar sekarang'}
            </button>
          </p>

          <p className="mt-4 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-navy transition-colors">
              ← Kembali ke halaman utama
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
