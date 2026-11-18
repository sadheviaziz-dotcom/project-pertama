import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import { DEMO_USERS } from '../data/simulationData';
import type { User, UserRole } from '../types';
import {
  Users,
  UserCheck,
  ShieldAlert,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  X,
  Building,
  Store,
  Anchor,
  ClipboardList,
  Shield,
} from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'nelayan' as UserRole,
    vesselName: '',
    companyName: '',
    businessName: '',
  });

  const handleToggleVerify = (id: string) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u))
    );
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Hapus akun pengguna ini dari sistem?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const created: User = {
      id: `U${Date.now().toString().slice(-4)}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      verified: true,
      createdAt: new Date().toISOString().split('T')[0],
      vesselName: newUser.role === 'nelayan' ? newUser.vesselName : undefined,
      companyName: newUser.role === 'perusahaan' ? newUser.companyName : undefined,
      businessName: newUser.role === 'pedagang' ? newUser.businessName : undefined,
    };
    setUsers([created, ...users]);
    setShowAddModal(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'nelayan',
      vesselName: '',
      companyName: '',
      businessName: '',
    });
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = selectedRole === 'all' || u.role === selectedRole;
    return matchSearch && matchRole;
  });

  const totalNelayan = users.filter((u) => u.role === 'nelayan').length;
  const totalPerusahaan = users.filter((u) => u.role === 'perusahaan').length;
  const totalPedagang = users.filter((u) => u.role === 'pedagang').length;
  const verifiedCount = users.filter((u) => u.verified).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Pengguna Sistem"
        subtitle="Kelola otoritas, verifikasi identitas maritim, dan akun 5 aktor ekosistem SIRKULAUT."
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <Plus size={16} />
            Tambah Pengguna Baru
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pengguna Aktif"
          value={users.length}
          subtitle={`${verifiedCount} akun terverifikasi`}
          icon={<Users size={20} />}
          color="navy"
        />
        <StatCard
          title="Nelayan Terdaftar"
          value={totalNelayan}
          subtitle="Armada kapal Brondong"
          icon={<Anchor size={20} />}
          color="teal"
        />
        <StatCard
          title="Industri Pengolahan"
          value={totalPerusahaan}
          subtitle="Pabrik surimi/fillet"
          icon={<Building size={20} />}
          color="cyan"
        />
        <StatCard
          title="Pedagang & UMKM"
          value={totalPedagang}
          subtitle="Jaringan distribusi lokal"
          icon={<Store size={20} />}
          color="warning"
        />
      </div>

      {/* Filter and Table */}
      <div className="card space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, email, atau ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs sm:text-sm w-full outline-none text-slate-700"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="select-field text-xs py-2 px-3 w-auto"
            >
              <option value="all">Semua Peran (Aktor)</option>
              <option value="nelayan">Nelayan</option>
              <option value="tpi">Pengelola TPI</option>
              <option value="perusahaan">Perusahaan Pengolahan</option>
              <option value="pedagang">Pedagang & UMKM</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="w-full text-left">
            <thead>
              <tr className="table-header">
                <th className="table-cell">ID & Pengguna</th>
                <th className="table-cell">Peran (Role)</th>
                <th className="table-cell">Identitas Organisasi / Kapal</th>
                <th className="table-cell">Kontak / Telepon</th>
                <th className="table-cell">Status Verifikasi</th>
                <th className="table-cell text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="table-cell">
                    <p className="font-bold text-navy text-xs">{u.name}</p>
                    <p className="text-[11px] text-slate-400">{u.id} • {u.email}</p>
                  </td>
                  <td className="table-cell">
                    <span
                      className={`badge text-[10px] capitalize ${
                        u.role === 'admin'
                          ? 'badge-danger'
                          : u.role === 'nelayan'
                          ? 'badge-info'
                          : u.role === 'tpi'
                          ? 'badge-success'
                          : u.role === 'perusahaan'
                          ? 'bg-purple-50 text-purple-700'
                          : 'badge-warning'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="table-cell text-xs text-slate-700 font-medium">
                    {u.vesselName || u.companyName || u.businessName || u.tpiName || 'Otoritas Sistem'}
                  </td>
                  <td className="table-cell text-xs text-slate-500">{u.phone || '-'}</td>
                  <td className="table-cell">
                    {u.verified ? (
                      <span className="badge badge-success text-[10px] flex items-center gap-1 w-fit">
                        <CheckCircle size={11} /> Terverifikasi
                      </span>
                    ) : (
                      <span className="badge badge-warning text-[10px] flex items-center gap-1 w-fit">
                        <XCircle size={11} /> Menunggu Verifikasi
                      </span>
                    )}
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2 text-xs">
                      <button
                        onClick={() => handleToggleVerify(u.id)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                      >
                        {u.verified ? 'Cabut' : 'Verifikasi'}
                      </button>
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-navy text-base flex items-center gap-2">
                <Users size={18} className="text-teal" />
                Tambah Pengguna Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="input-field py-2"
                  placeholder="Contoh: Haji Sukirman"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="input-field py-2"
                  placeholder="email@contoh.com"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="input-field py-2"
                  placeholder="08123456789"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Peran Aktor</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                  className="select-field py-2"
                >
                  <option value="nelayan">Nelayan</option>
                  <option value="tpi">Pengelola TPI</option>
                  <option value="perusahaan">Perusahaan Pengolahan</option>
                  <option value="pedagang">Pedagang / UMKM</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {newUser.role === 'nelayan' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Kapal</label>
                  <input
                    type="text"
                    value={newUser.vesselName}
                    onChange={(e) => setNewUser({ ...newUser, vesselName: e.target.value })}
                    className="input-field py-2"
                    placeholder="Contoh: KM Bahari Sentosa"
                  />
                </div>
              )}

              {newUser.role === 'perusahaan' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Perusahaan</label>
                  <input
                    type="text"
                    value={newUser.companyName}
                    onChange={(e) => setNewUser({ ...newUser, companyName: e.target.value })}
                    className="input-field py-2"
                    placeholder="Contoh: PT Samudra Jaya"
                  />
                </div>
              )}

              {newUser.role === 'pedagang' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Usaha / Restoran</label>
                  <input
                    type="text"
                    value={newUser.businessName}
                    onChange={(e) => setNewUser({ ...newUser, businessName: e.target.value })}
                    className="input-field py-2"
                    placeholder="Contoh: Resto Bahari Segar"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary py-2 px-5">
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

