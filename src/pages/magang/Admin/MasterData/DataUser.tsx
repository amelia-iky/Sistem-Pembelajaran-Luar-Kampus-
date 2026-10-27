import { useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  X,
  Info,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type TipeUser = 'Supervisor' | 'Dosen' | 'Mahasiswa';
type StatusUser = 'Aktif' | 'Nonaktif';
type UserItem = {
  id: number;
  username: string;
  kodeUser: string;
  tipeUser: TipeUser;
  status: StatusUser;
  prodi: string;
  password?: string;
  namaUser?: string;
};

const initialData: UserItem[] = [
  {
    id: 1,
    username: 'aku',
    kodeUser: '69',
    tipeUser: 'Supervisor',
    status: 'Aktif',
    prodi: '-',
  },
  {
    id: 2,
    username: 'spv_3330@dummy.com',
    kodeUser: '3330',
    tipeUser: 'Supervisor',
    status: 'Aktif',
    prodi: '-',
  },
  {
    id: 3,
    username: 'spv_3526@dummy.com',
    kodeUser: '3526',
    tipeUser: 'Supervisor',
    status: 'Aktif',
    prodi: '-',
  },
  {
    id: 4,
    username: 'spv_3525@dummy.com',
    kodeUser: '3525',
    tipeUser: 'Supervisor',
    status: 'Nonaktif',
    prodi: '-',
  },
  {
    id: 5,
    username: 'spv_883@dummy.com',
    kodeUser: '883',
    tipeUser: 'Supervisor',
    status: 'Aktif',
    prodi: '-',
  },
  {
    id: 6,
    username: 'dosen_1001@dummy.com',
    kodeUser: '1001',
    tipeUser: 'Dosen',
    status: 'Aktif',
    prodi: 'Sistem Informasi',
  },
  {
    id: 7,
    username: 'mahasiswa_2301@dummy.com',
    kodeUser: '2301',
    tipeUser: 'Mahasiswa',
    status: 'Nonaktif',
    prodi: 'Sistem Informasi',
  },
];

const emptyForm = {
  username: '',
  kodeUser: '',
  tipeUser: 'Supervisor' as TipeUser,
  status: 'Aktif' as StatusUser,
  prodi: '',
  password: '',
  namaUser: '',
};

export default function DataUser() {
  const [data, setData] = useState<UserItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [filterTipe, setFilterTipe] = useState('Semua Tipe User');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [notice, setNotice] = useState('');
  const pageSize = 10;

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !keyword ||
        `${item.username} ${item.kodeUser} ${item.tipeUser} ${item.prodi}`
          .toLowerCase()
          .includes(keyword);
      const matchesType =
        filterTipe === 'Semua Tipe User' || item.tipeUser === filterTipe;
      return matchesSearch && matchesType;
    });
  }, [data, search, filterTipe]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFormOpen(true);
  }

  function openEdit(item: UserItem) {
    setEditingId(item.id);
    setForm({
      username: item.username,
      kodeUser: item.kodeUser,
      tipeUser: item.tipeUser,
      status: item.status,
      prodi: item.prodi === '-' ? '' : item.prodi,
      password: '',
      namaUser:
        item.namaUser ||
        `${item.tipeUser} Dummy ${item.kodeUser} - ${item.tipeUser} Dummy ${item.kodeUser}`,
    });
    setFormOpen(true);
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                password: form.password || item.password,
                prodi: form.prodi.trim() || '-',
                namaUser:
                  form.namaUser ||
                  item.namaUser ||
                  `${form.tipeUser} Dummy ${form.kodeUser}`,
              }
            : item,
        ),
      );
      setNotice('Perubahan data user berhasil disimpan.');
    } else {
      setData((current) => [
        {
          id: Date.now(),
          ...form,
          prodi: form.prodi.trim() || '-',
          namaUser: form.namaUser || `${form.tipeUser} Dummy ${form.kodeUser}`,
        },
        ...current,
      ]);
      setPage(1);
      setNotice('Data user berhasil ditambahkan.');
    }
    setFormOpen(false);
  }

  function deleteData(item: UserItem) {
    if (!window.confirm(`Yakin ingin menghapus user "${item.username}"?`))
      return;
    setData((current) => current.filter((row) => row.id !== item.id));
    setPage(1);
    setNotice('Data user berhasil dihapus.');
  }

  function toggleStatus(id: number) {
    setData((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Aktif' ? 'Nonaktif' : 'Aktif' }
          : item,
      ),
    );
    setNotice('Status user berhasil diperbarui.');
  }

  function syncData() {
    setSearch('');
    setFilterTipe('Semua Tipe User');
    setPage(1);
    setNotice(
      'Sinkronisasi berhasil. Data masih berupa data dummy dan belum terhubung ke backend.',
    );
  }

  const inputClass =
    'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] text-[#354760] outline-none focus:border-[#3569F6]';

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            User
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola data akun pengguna pada Sistem Pembelajaran Luar Kampus.
          </p>
        </header>

        <div className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={17} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <p className="text-[10px] font-bold tracking-wide text-[#3569F6]">
              INFORMASI
            </p>
            <p className="mt-1 text-[11px] leading-5 text-[#354660]">
              Kode User untuk Dosen menggunakan nomor induk dosen, sedangkan
              Mahasiswa menggunakan NIM. Data pada halaman ini masih berupa data
              dummy dan belum terhubung ke backend.
            </p>
          </div>
        </div>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="mb-3">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Filter Tipe User
            </h2>
            <p className="mt-1 text-[10px] text-[#8291A8]">
              Pilih tipe akun untuk menyaring daftar pengguna.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search: ukuran dan style tetap seperti semula */}
            <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari username, kode user, atau prodi..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            {/* Dropdown tepat di samping search */}
            <select
              value={filterTipe}
              onChange={(event) => {
                setFilterTipe(event.target.value);
                setPage(1);
              }}
              aria-label="Filter tipe user"
              className="h-9 w-full shrink-0 rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] text-[#52627A] outline-none focus:border-[#3569F6] sm:w-[170px]"
            >
              <option>Semua Tipe User</option>
              <option>Supervisor</option>
              <option>Dosen</option>
              <option>Mahasiswa</option>
            </select>

            {/* Tombol aksi tetap di ujung kanan */}
            <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={14} />
                Tambah Data
              </button>
              <button
                type="button"
                onClick={syncData}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </section>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className="fixed right-5 top-5 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={19} strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1 pr-1">
              <p className="text-[12px] font-semibold text-[#172943]">
                {notice.includes('Sinkronisasi')
                  ? 'Sinkronisasi Berhasil'
                  : 'Berhasil'}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
                {notice}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Tutup notifikasi"
              className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'USERNAME',
                    'KODE USER',
                    'TIPE USER',
                    'STATUS',
                    'PRODI',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                  >
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {(safePage - 1) * pageSize + index + 1}
                    </td>
                    <td className="max-w-[240px] px-3 py-4 text-[10px] font-medium leading-4 text-[#273750]">
                      {item.username}
                    </td>
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.kodeUser}
                    </td>
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.tipeUser}
                    </td>
                    <td className="px-3 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(item.id)}
                        aria-label={`Ubah status ${item.username} menjadi ${item.status === 'Aktif' ? 'Nonaktif' : 'Aktif'}`}
                        title="Klik untuk mengubah status"
                        className="inline-flex min-w-[92px] items-center gap-2"
                      >
                        <span
                          className={`relative inline-flex h-[18px] w-[32px] shrink-0 items-center rounded-full transition-colors ${item.status === 'Aktif' ? 'bg-[#3569F6]' : 'bg-[#CBD5E1]'}`}
                        >
                          <span
                            className={`h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-transform ${item.status === 'Aktif' ? 'translate-x-[16px]' : 'translate-x-[2px]'}`}
                          />
                        </span>
                        <span
                          className={`text-[9px] ${item.status === 'Aktif' ? 'text-emerald-600' : 'text-red-500'}`}
                        >
                          {item.status}
                        </span>
                      </button>
                    </td>
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.prodi}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit user"
                          aria-label={`Edit ${item.username}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteData(item)}
                          title="Hapus user"
                          aria-label={`Hapus ${item.username}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleData.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada user yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-[#EDF1F7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-[#8A99B0]">
              Menampilkan{' '}
              {filteredData.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filteredData.length)} dari{' '}
              {filteredData.length} user
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                aria-label="Halaman sebelumnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${safePage === number ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white' : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'}`}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                aria-label="Halaman berikutnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFormOpen(false);
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[700px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null ? 'Edit Data User' : 'Tambah Data User'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Lengkapi informasi akun pengguna.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Tutup formulir"
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>
            <form onSubmit={saveData} className="space-y-4 px-5 py-4">
              <div className="space-y-1">
                <label className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-3">
                  <span className="text-[12px] font-normal text-[#4B5563]">
                    Username
                  </span>
                  <input
                    required
                    value={form.username}
                    onChange={(event) =>
                      setForm({ ...form, username: event.target.value })
                    }
                    className="h-10 w-full border-0 border-b border-[#D6D6D6] bg-transparent px-0 text-[12px] text-[#404040] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan username"
                  />
                </label>
                <label className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-3">
                  <span className="text-[12px] font-normal text-[#4B5563]">
                    Password
                  </span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(event) =>
                      setForm({ ...form, password: event.target.value })
                    }
                    className="h-10 w-full border-0 border-b border-[#D6D6D6] bg-[#E8F0FE] px-0 text-[12px] text-[#404040] outline-none focus:border-[#3569F6] sm:px-2"
                    placeholder={
                      editingId !== null
                        ? 'Kosongkan jika tidak ingin mengubah password'
                        : 'Masukkan password'
                    }
                    required={editingId === null}
                  />
                </label>
                <label className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-3">
                  <span className="text-[12px] font-normal text-[#4B5563]">
                    Tipe User
                  </span>
                  <select
                    required
                    value={form.tipeUser}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        tipeUser: event.target.value as TipeUser,
                        namaUser: '',
                      })
                    }
                    className="h-10 w-full border-0 border-b border-[#D6D6D6] bg-transparent px-0 text-[12px] text-[#404040] outline-none focus:border-[#3569F6]"
                  >
                    <option>Supervisor</option>
                    <option>Dosen</option>
                    <option>Mahasiswa</option>
                  </select>
                </label>
                <label className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-3">
                  <span className="text-[12px] font-normal text-[#4B5563]">
                    Nama User
                  </span>
                  <select
                    value={form.namaUser}
                    onChange={(event) =>
                      setForm({ ...form, namaUser: event.target.value })
                    }
                    className="h-10 w-full border-0 border-b border-[#D6D6D6] bg-transparent px-0 text-[12px] text-[#404040] outline-none focus:border-[#3569F6]"
                  >
                    <option value="">Pilih nama user</option>
                    <option
                      value={`${form.tipeUser} Dummy 3350 - ${form.tipeUser} Dummy 3350`}
                    >
                      {form.tipeUser} Dummy 3350 - {form.tipeUser} Dummy 3350
                    </option>
                    <option
                      value={`${form.tipeUser} Dummy ${form.kodeUser || '0000'} - ${form.tipeUser} Dummy ${form.kodeUser || '0000'}`}
                    >
                      {form.tipeUser} Dummy {form.kodeUser || '0000'} -{' '}
                      {form.tipeUser} Dummy {form.kodeUser || '0000'}
                    </option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end gap-2 border-t border-[#E8EEF7] pt-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="inline-flex h-[36px] items-center justify-center rounded-md border border-[#D6E0EF] bg-white px-4 text-[11px] font-medium text-[#52627A] transition hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex h-[36px] items-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white transition hover:bg-blue-700"
                >
                  <Check size={13} strokeWidth={2.5} /> Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
