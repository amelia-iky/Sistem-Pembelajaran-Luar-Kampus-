import { useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  X,
  Check,
} from 'lucide-react';

type KabupatenItem = {
  id: number;
  nama: string;
};

type FormData = {
  nama: string;
};

const initialData: KabupatenItem[] = [
  { id: 1, nama: 'Kabupaten Buleleng' },
  { id: 2, nama: 'Kabupaten Jembrana' },
  { id: 3, nama: 'Kabupaten Tabanan' },
  { id: 4, nama: 'Kabupaten Badung' },
  { id: 5, nama: 'Kabupaten Gianyar' },
  { id: 6, nama: 'Kabupaten Klungkung' },
  { id: 7, nama: 'Kabupaten Bangli' },
  { id: 8, nama: 'Kabupaten Karangasem' },
];

const emptyForm: FormData = {
  nama: '',
};

export default function Kabupaten() {
  const [data, setData] = useState<KabupatenItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormData>({ ...emptyForm });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const pageSize = 10;

  const inputClass =
    'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none transition focus:border-[#3569F6]';

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => item.nama.toLowerCase().includes(keyword));
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  // BUKA MODAL TAMBAH
  function openAdd() {
    setForm({ ...emptyForm });
    setError('');
    setModalOpen(true);
  }

  // TUTUP MODAL
  function closeModal() {
    setModalOpen(false);
    setForm({ ...emptyForm });
    setError('');
  }

  // SIMPAN DATA KABUPATEN
  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const namaKabupaten = form.nama.trim();

    if (!namaKabupaten) {
      setError('Nama kabupaten wajib diisi.');
      return;
    }

    const namaSudahAda = data.some(
      (item) => item.nama.toLowerCase() === namaKabupaten.toLowerCase(),
    );

    if (namaSudahAda) {
      setError('Kabupaten tersebut sudah terdaftar.');
      return;
    }

    const newItem: KabupatenItem = {
      id: Date.now(),
      nama: namaKabupaten,
    };

    setData((current) => [newItem, ...current]);
    setPage(1);
    setNotice('Data kabupaten berhasil ditambahkan.');

    closeModal();
  }

  // HAPUS DATA KABUPATEN
  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus data kabupaten ini?',
    );

    if (!confirmed) return;

    setData((current) => current.filter((item) => item.id !== id));
    setNotice('Data kabupaten berhasil dihapus.');
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL HALAMAN */}
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
              Data Kabupaten
            </h1>
          </div>

          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola dan lihat daftar kabupaten yang terdaftar pada sistem.
          </p>
        </div>

        {/* CARD DATA KABUPATEN */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="px-4 pb-3 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Kabupaten
            </h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan kelola informasi kabupaten yang tersedia pada sistem.
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
                placeholder="Cari nama kabupaten..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={14} />
              Tambah Kabupaten
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

        {/* CARD DAFTAR KABUPATEN */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          {/* TABEL */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF]">
                  <th className="w-[12%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    NO.
                  </th>

                  <th className="w-[68%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    NAMA KABUPATEN
                  </th>

                  <th className="w-[20%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
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

                      {/* AKSI HAPUS */}
                      <td className="px-3 py-3.5">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => deleteData(item.id)}
                            title="Hapus kabupaten"
                            aria-label="Hapus kabupaten"
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
                      colSpan={3}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada data kabupaten yang sesuai dengan pencarian.
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
              kabupaten
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

      {/* MODAL TAMBAH KABUPATEN */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            {/* HEADER MODAL */}
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  Tambah Kabupaten
                </h2>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Masukkan informasi untuk menambahkan kabupaten baru.
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
              key="form-tambah-kabupaten"
              onSubmit={saveData}
              autoComplete="off"
              className="space-y-4 px-5 py-5"
            >
              <div>
                <label
                  htmlFor="nama-kabupaten"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Nama Kabupaten <span className="text-red-500">*</span>
                </label>

                <input
                  id="nama-kabupaten"
                  name="nama-kabupaten-baru"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="off"
                  value={form.nama}
                  onChange={(event) => setForm({ nama: event.target.value })}
                  placeholder="Masukkan nama kabupaten"
                  className={inputClass}
                />
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
                  Pastikan nama kabupaten sudah sesuai sebelum disimpan.
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
                    Simpan Kabupaten
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
