import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type AdminItem = {
  id: number;
  nama: string;
  email: string;
  tipe: string;
  unit: string;
};

type AdminForm = {
  nama: string;
  email: string;
  tipe: string;
  unit: string;
};

const initialData: AdminItem[] = [
  {
    id: 1,
    nama: 'Administrator Utama',
    email: 'admin@undiksha.ac.id',
    tipe: 'Admin',
    unit: 'UPA TIK',
  },
  {
    id: 2,
    nama: 'Admin Fakultas Teknik',
    email: 'admin.ft@undiksha.ac.id',
    tipe: 'Admin',
    unit: 'Fakultas Teknik',
  },
  {
    id: 3,
    nama: 'Admin FIP',
    email: 'admin.fip@undiksha.ac.id',
    tipe: 'Admin',
    unit: 'Fakultas Ilmu Pendidikan',
  },
];

const emptyForm: AdminForm = {
  nama: '',
  email: '',
  tipe: 'Admin',
  unit: '',
};

export default function Admin() {
  const [data, setData] = useState<AdminItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<AdminForm>({ ...emptyForm });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [syncing, setSyncing] = useState(false);

  const pageSize = 10;

  const inputClass =
    'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none transition focus:border-[#3569F6]';

  // NOTIFIKASI
  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice('');
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  // PENCARIAN
  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      [item.nama, item.email, item.tipe, item.unit]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, search]);

  // PAGINATION
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const safePage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  // TAMBAH DATA
  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setModalOpen(true);
  }

  // EDIT DATA
  function openEdit(item: AdminItem) {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      email: item.email,
      tipe: item.tipe,
      unit: item.unit,
    });
    setError('');
    setModalOpen(true);
  }

  // TUTUP MODAL
  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
  }

  // SIMPAN DATA
  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.nama.trim() || !form.email.trim() || !form.unit.trim()) {
      setError('Semua informasi wajib diisi.');
      return;
    }

    const email = form.email.trim().toLowerCase();

    const emailExists = data.some(
      (item) => item.email.toLowerCase() === email && item.id !== editingId,
    );

    if (emailExists) {
      setError('Email sudah digunakan oleh akun lain.');
      return;
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                nama: form.nama.trim(),
                email,
                tipe: form.tipe,
                unit: form.unit.trim(),
              }
            : item,
        ),
      );

      setNotice('Data administrator berhasil diperbarui.');
    } else {
      setData((current) => [
        {
          id: Date.now(),
          nama: form.nama.trim(),
          email,
          tipe: form.tipe,
          unit: form.unit.trim(),
        },
        ...current,
      ]);

      setPage(1);
      setNotice('Data administrator berhasil ditambahkan.');
    }

    closeModal();
  }

  // HAPUS DATA
  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus data administrator ini?',
    );

    if (!confirmed) return;

    setData((current) => current.filter((item) => item.id !== id));

    setPage(1);
    setNotice('Data administrator berhasil dihapus.');
  }

  // REFRESH
  function handleRefresh() {
    if (syncing) return;

    setSyncing(true);
    setSearch('');
    setPage(1);

    window.setTimeout(() => {
      setSyncing(false);
      setNotice('Proses sinkronisasi data administrator selesai.');
    }, 1000);
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Data Admin
          </h1>

          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola dan lihat data administrator yang terdaftar pada sistem.
          </p>
        </div>

        {/* CARD PENCARIAN */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="px-4 pb-3 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">Data Admin</h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan kelola data administrator berdasarkan nama, email, tipe,
              atau unit.
            </p>
          </div>

          {/* SEARCH KIRI - TOMBOL KANAN */}
          <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:px-5">
            {/* SEARCH */}
            <div className="flex h-9 w-full max-w-[520px] min-w-0 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama admin, email, atau unit..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            {/* TOMBOL DI UJUNG KANAN */}
            <div className="ml-auto flex shrink-0 items-center justify-end gap-2">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-3.5 text-[10px] font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={15} />
                Tambah Data
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={syncing}
                title="Refresh data"
                aria-label="Refresh data"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={15}
                  className={syncing ? 'animate-spin' : ''}
                />
              </button>
            </div>
          </div>
        </div>

        {/* NOTIFIKASI */}
        {notice && (
          <div
            role="status"
            className="fixed right-5 top-5 z-[70] flex w-[326px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-lg"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-[#24334D]">
                Berhasil
              </p>

              <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
                {notice}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Tutup notifikasi"
              className="text-[#52627A] hover:text-[#172943]"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* CARD TABEL */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF]">
                  <th className="w-[7%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    NO.
                  </th>

                  <th className="w-[23%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    NAMA LENGKAP
                  </th>

                  <th className="w-[25%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    EMAIL
                  </th>

                  <th className="w-[13%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    TIPE USER
                  </th>

                  <th className="w-[20%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    UNIT
                  </th>

                  <th className="w-[12%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    AKSI
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleData.length > 0 ? (
                  visibleData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF1F7] transition last:border-b-0 hover:bg-[#FCFDFF]"
                    >
                      <td className="px-3 py-4 text-center text-[10px] text-[#465670]">
                        {(safePage - 1) * pageSize + index + 1}
                      </td>

                      <td className="px-3 py-4 text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </td>

                      <td className="px-3 py-4 text-[10px] text-[#465670]">
                        {item.email}
                      </td>

                      <td className="px-3 py-4">
                        <span className="inline-flex whitespace-nowrap rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[9px] font-semibold text-[#3569F6]">
                          {item.tipe}
                        </span>
                      </td>

                      <td className="px-3 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.unit}
                      </td>

                      <td className="px-3 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            title="Edit admin"
                            aria-label="Edit admin"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteData(item.id)}
                            title="Hapus admin"
                            aria-label="Hapus admin"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#FFB8B8] bg-white text-[#FF3333] transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada data administrator yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-[#E8EEF7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#8291A8]">
              Menampilkan{' '}
              <span className="font-semibold text-[#52627A]">
                {filteredData.length > 0 ? (safePage - 1) * pageSize + 1 : 0}
                {'–'}
                {Math.min(safePage * pageSize, filteredData.length)}
              </span>{' '}
              dari{' '}
              <span className="font-semibold text-[#52627A]">
                {filteredData.length}
              </span>{' '}
              administrator
            </p>

            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={safePage === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] text-[#71819B] transition hover:bg-[#F4F7FC] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[10px] font-semibold transition ${
                      safePage === number
                        ? 'bg-[#3569F6] text-white'
                        : 'border border-[#DCE5F1] text-[#71819B] hover:bg-[#F4F7FC]'
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={safePage === totalPages}
                aria-label="Halaman berikutnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] text-[#71819B] transition hover:bg-[#F4F7FC] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH DAN EDIT */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null ? 'Edit Data Admin' : 'Tambah Data Admin'}
                </h2>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {editingId !== null
                    ? 'Perbarui informasi akun administrator.'
                    : 'Lengkapi informasi akun administrator.'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={saveData} className="space-y-4 px-5 py-5">
              <div>
                <label
                  htmlFor="admin-nama"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>

                <input
                  id="admin-nama"
                  type="text"
                  required
                  value={form.nama}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      nama: event.target.value,
                    }))
                  }
                  placeholder="Masukkan nama lengkap"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="admin-email"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Email <span className="text-red-500">*</span>
                </label>

                <input
                  id="admin-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="Masukkan alamat email"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="admin-tipe"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Tipe User <span className="text-red-500">*</span>
                </label>

                <select
                  id="admin-tipe"
                  required
                  value={form.tipe}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      tipe: event.target.value,
                    }))
                  }
                  className={inputClass}
                >
                  <option value="Admin">Admin</option>
                  <option value="Operator">Operator</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="admin-unit"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Unit <span className="text-red-500">*</span>
                </label>

                <input
                  id="admin-unit"
                  type="text"
                  required
                  value={form.unit}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      unit: event.target.value,
                    }))
                  }
                  placeholder="Masukkan unit atau fakultas"
                  className={inputClass}
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[10px] text-red-600"
                >
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-2 border-t border-[#E8EEF7] pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-9 rounded-md border border-[#DCE5F1] px-4 text-[10px] font-semibold text-[#52627A] transition hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700"
                >
                  <Check size={14} />
                  {editingId !== null ? 'Simpan Perubahan' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
