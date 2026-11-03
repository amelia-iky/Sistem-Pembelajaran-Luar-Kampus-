import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';

type PenggunaItem = {
  id: number;
  nama: string;
  email: string;
  password: string;
};

type FormData = {
  nama: string;
  email: string;
  password: string;
  konfirmasiPassword: string;
};

const initialData: PenggunaItem[] = [
  {
    id: 1,
    nama: 'User Dummy 1',
    email: 'user.dummy.1@dummy.ac.id',
    password: 'password123',
  },
  {
    id: 2,
    nama: 'User Dummy 2',
    email: 'user.dummy.2@dummy.ac.id',
    password: 'password123',
  },
  {
    id: 3,
    nama: 'User Dummy 3',
    email: 'user.dummy.3@dummy.ac.id',
    password: 'password123',
  },
  {
    id: 4,
    nama: 'User Dummy 4',
    email: 'user.dummy.4@dummy.ac.id',
    password: 'password123',
  },
  {
    id: 5,
    nama: 'User Dummy 5',
    email: 'user.dummy.5@dummy.ac.id',
    password: 'password123',
  },
];

const emptyForm: FormData = {
  nama: '',
  email: '',
  password: '',
  konfirmasiPassword: '',
};

export default function DaftarPengguna() {
  const [data, setData] = useState<PenggunaItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<FormData>({ ...emptyForm });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const pageSize = 10;

  const inputClass =
    'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none transition focus:border-[#3569F6]';

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      [item.nama, item.email].join(' ').toLowerCase().includes(keyword),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  // MODAL TAMBAH: SELURUH INPUT DIKOSONGKAN
  function openAdd() {
    setModalMode('add');
    setEditingId(null);
    setForm({
      nama: '',
      email: '',
      password: '',
      konfirmasiPassword: '',
    });
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setModalOpen(true);
  }

  // MODAL EDIT: NAMA DAN EMAIL DIISI DARI DATA PENGGUNA
  function openEdit(item: PenggunaItem) {
    setModalMode('edit');
    setEditingId(item.id);

    setForm({
      nama: item.nama,
      email: item.email,
      password: '',
      konfirmasiPassword: '',
    });

    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setModalOpen(true);
  }

  // TUTUP MODAL DAN RESET FORM
  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  // SIMPAN DATA TAMBAH DAN EDIT
  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.nama.trim() || !form.email.trim()) {
      setError('Nama lengkap dan email wajib diisi.');
      return;
    }

    if (modalMode === 'add' && !form.password.trim()) {
      setError('Password wajib diisi untuk pengguna baru.');
      return;
    }

    if (form.password.trim() && form.password !== form.konfirmasiPassword) {
      setError('Konfirmasi password tidak sesuai.');
      return;
    }

    if (!form.password.trim() && form.konfirmasiPassword.trim()) {
      setError('Masukkan password baru terlebih dahulu.');
      return;
    }

    const emailSudahDigunakan = data.some(
      (item) =>
        item.email.toLowerCase() === form.email.trim().toLowerCase() &&
        item.id !== editingId,
    );

    if (emailSudahDigunakan) {
      setError('Email tersebut sudah digunakan oleh pengguna lain.');
      return;
    }

    if (modalMode === 'add') {
      const newItem: PenggunaItem = {
        id: Date.now(),
        nama: form.nama.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      setData((current) => [newItem, ...current]);
      setPage(1);
      setNotice('Pengguna baru berhasil ditambahkan.');
    } else {
      if (editingId === null) return;

      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                nama: form.nama.trim(),
                email: form.email.trim(),
                password: form.password.trim() ? form.password : item.password,
              }
            : item,
        ),
      );

      setNotice('Data pengguna berhasil diperbarui.');
    }

    closeModal();
  }

  // HAPUS DATA
  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus data pengguna ini?',
    );

    if (!confirmed) return;

    setData((current) => current.filter((item) => item.id !== id));
    setPage(1);
    setNotice('Data pengguna berhasil dihapus.');
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL HALAMAN */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Daftar Pengguna
          </h1>

          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola dan lihat data pengguna yang terdaftar pada sistem.
          </p>
        </div>

        {/* CARD DATA PENGGUNA */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="px-4 pb-3 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Pengguna
            </h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan kelola informasi akun pengguna berdasarkan nama lengkap
              atau email.
            </p>
          </div>

          {/* SEARCH DAN TAMBAH */}
          <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama lengkap atau email pengguna..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={14} />
              Tambah Pengguna
            </button>
          </div>
        </div>

        {/* NOTIFIKASI */}
        {notice && (
          <div
            role="status"
            className="fixed right-5 top-5 z-[70] flex w-[326px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-[#24334D]">
                Berhasil
              </p>

              <p className="mt-1 text-[11px] text-[#71819B]">{notice}</p>
            </div>

            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Tutup notifikasi"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* CARD DAFTAR PENGGUNA */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          {/* TABEL */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF]">
                  <th className="w-[8%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    NO.
                  </th>

                  <th className="w-[37%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    NAMA LENGKAP
                  </th>

                  <th className="w-[37%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    EMAIL
                  </th>

                  <th className="w-[18%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    AKSI
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleData.length > 0 ? (
                  visibleData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF1F7] last:border-b-0 transition hover:bg-[#FCFDFF]"
                    >
                      <td className="px-3 py-4 text-center text-[10px] text-[#465670]">
                        {(safePage - 1) * pageSize + index + 1}
                      </td>

                      <td className="px-3 py-4 text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </td>

                      <td className="px-3 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.email}
                      </td>

                      {/* AKSI */}
                      <td className="px-3 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            title="Edit pengguna"
                            aria-label="Edit pengguna"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteData(item.id)}
                            title="Hapus pengguna"
                            aria-label="Hapus pengguna"
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
                      colSpan={4}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada data pengguna yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER DAN PAGINATION */}
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
              pengguna
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

      {/* MODAL TAMBAH DAN EDIT PENGGUNA */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[620px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            {/* HEADER MODAL */}
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {modalMode === 'add' ? 'Tambah Pengguna' : 'Edit Pengguna'}
                </h2>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {modalMode === 'add'
                    ? 'Masukkan informasi untuk menambahkan akun pengguna baru.'
                    : 'Perbarui informasi akun pengguna.'}
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

            {/* FORM */}
            <form
              key={`${modalMode}-${editingId ?? 'new'}`}
              onSubmit={saveData}
              autoComplete="off"
              className="space-y-4 px-5 py-5"
            >
              {/* INPUT PANCINGAN AUTOFILL BROWSER */}
              <input
                type="text"
                name="prevent-autofill-username"
                autoComplete="username"
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              <input
                type="password"
                name="prevent-autofill-password"
                autoComplete="current-password"
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              {/* NAMA LENGKAP */}
              <div>
                <label
                  htmlFor="nama-pengguna"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>

                <input
                  id="nama-pengguna"
                  name="new-user-full-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="off"
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

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email-pengguna"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Email <span className="text-red-500">*</span>
                </label>

                <input
                  id="email-pengguna"
                  name="new-user-email-address"
                  type="email"
                  required
                  autoComplete="new-password"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="Masukkan email pengguna"
                  className={inputClass}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password-baru"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  {modalMode === 'add' ? 'Password' : 'Password Baru'}
                  {modalMode === 'add' && (
                    <span className="text-red-500"> *</span>
                  )}
                </label>

                <div className="relative">
                  <input
                    id="password-baru"
                    name="new-user-password"
                    type={showPassword ? 'text' : 'password'}
                    required={modalMode === 'add'}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder={
                      modalMode === 'add'
                        ? 'Masukkan password pengguna'
                        : 'Masukkan password baru jika ingin mengubahnya'
                    }
                    className={`${inputClass} pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? 'Sembunyikan password' : 'Lihat password'
                    }
                    className="absolute right-3 top-[13px] text-[#91A3BC] transition hover:text-[#52627A]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {modalMode === 'edit' && (
                  <p className="mt-1.5 text-[10px] text-[#71819B]">
                    <span className="mr-1">ⓘ</span>
                    Biarkan kosong jika tidak ingin mengubah password.
                  </p>
                )}
              </div>

              {/* KONFIRMASI PASSWORD */}
              <div>
                <label
                  htmlFor="konfirmasi-password"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Konfirmasi Password
                  {modalMode === 'edit' && ' Baru'}
                  {modalMode === 'add' && (
                    <span className="text-red-500"> *</span>
                  )}
                </label>

                <div className="relative">
                  <input
                    id="konfirmasi-password"
                    name="confirm-new-user-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required={modalMode === 'add'}
                    autoComplete="new-password"
                    value={form.konfirmasiPassword}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        konfirmasiPassword: event.target.value,
                      }))
                    }
                    placeholder="Masukkan kembali password"
                    className={`${inputClass} pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword
                        ? 'Sembunyikan konfirmasi password'
                        : 'Lihat konfirmasi password'
                    }
                    className="absolute right-3 top-[13px] text-[#91A3BC] transition hover:text-[#52627A]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                {modalMode === 'edit' && (
                  <p className="mt-1.5 text-[10px] text-[#71819B]">
                    <span className="mr-1">ⓘ</span>
                    Isi jika Anda memasukkan password baru.
                  </p>
                )}
              </div>

              {/* ERROR */}
              {error && (
                <p
                  role="alert"
                  className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[10px] text-red-600"
                >
                  {error}
                </p>
              )}

              {/* FOOTER MODAL */}
              <div className="flex flex-col gap-3 border-t border-[#E8EEF7] pt-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[9px] leading-4 text-[#8291A8]">
                  Pastikan informasi pengguna sudah sesuai sebelum disimpan.
                </p>

                <div className="flex shrink-0 justify-end gap-2">
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
                    <Check size={13} />
                    {modalMode === 'add'
                      ? 'Simpan Pengguna'
                      : 'Simpan Perubahan'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
