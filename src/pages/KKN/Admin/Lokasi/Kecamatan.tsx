import { useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

type KecamatanData = {
  id: number;
  kabupaten: string;
  kecamatan: string;
};

const daftarKabupaten = [
  'Kabupaten Buleleng',
  'Kabupaten Jembrana',
  'Kabupaten Tabanan',
  'Kabupaten Badung',
  'Kabupaten Gianyar',
  'Kabupaten Klungkung',
  'Kabupaten Bangli',
  'Kabupaten Karangasem',
];

const initialData: KecamatanData[] = [
  { id: 1, kabupaten: 'Kabupaten Buleleng', kecamatan: 'Buleleng' },
  { id: 2, kabupaten: 'Kabupaten Buleleng', kecamatan: 'Singaraja' },
  { id: 3, kabupaten: 'Kabupaten Buleleng', kecamatan: 'Banjar' },
  { id: 4, kabupaten: 'Kabupaten Badung', kecamatan: 'Kuta' },
  { id: 5, kabupaten: 'Kabupaten Badung', kecamatan: 'Mengwi' },
  { id: 6, kabupaten: 'Kabupaten Gianyar', kecamatan: 'Ubud' },
  { id: 7, kabupaten: 'Kabupaten Gianyar', kecamatan: 'Sukawati' },
  { id: 8, kabupaten: 'Kabupaten Tabanan', kecamatan: 'Kediri' },
  { id: 9, kabupaten: 'Kabupaten Bangli', kecamatan: 'Kintamani' },
  { id: 10, kabupaten: 'Kabupaten Karangasem', kecamatan: 'Karangasem' },
];

const inputClass =
  'mt-2 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] text-[#354760] outline-none placeholder:text-[#9AAAC0] transition focus:border-[#3569F6] focus:ring-1 focus:ring-[#3569F6]/10';

export default function Kecamatan() {
  const [data, setData] = useState<KecamatanData[]>(initialData);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [namaKabupaten, setNamaKabupaten] = useState('');
  const [namaKecamatan, setNamaKecamatan] = useState('');

  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return data.filter(
      (item) =>
        item.kabupaten.toLowerCase().includes(keyword) ||
        item.kecamatan.toLowerCase().includes(keyword),
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  function openAddModal() {
    setModalMode('add');
    setSelectedId(null);
    setNamaKabupaten('');
    setNamaKecamatan('');
    setErrorMessage('');
    setShowModal(true);
  }

  function openEditModal(item: KecamatanData) {
    setModalMode('edit');
    setSelectedId(item.id);
    setNamaKabupaten(item.kabupaten);
    setNamaKecamatan(item.kecamatan);
    setErrorMessage('');
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedId(null);
    setNamaKabupaten('');
    setNamaKecamatan('');
    setErrorMessage('');
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!namaKabupaten || !namaKecamatan.trim()) {
      setErrorMessage('Semua data wajib diisi.');
      return;
    }

    const isDuplicate = data.some(
      (item) =>
        item.id !== selectedId &&
        item.kabupaten === namaKabupaten &&
        item.kecamatan.toLowerCase() === namaKecamatan.trim().toLowerCase(),
    );

    if (isDuplicate) {
      setErrorMessage('Kecamatan tersebut sudah terdaftar pada kabupaten ini.');
      return;
    }

    if (modalMode === 'add') {
      const newData: KecamatanData = {
        id: Date.now(),
        kabupaten: namaKabupaten,
        kecamatan: namaKecamatan.trim(),
      };

      setData((current) => [...current, newData]);
      setSearch('');
      setCurrentPage(Math.ceil((data.length + 1) / itemsPerPage));
      setNotice('Data kecamatan berhasil ditambahkan.');
    } else {
      setData((current) =>
        current.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                kabupaten: namaKabupaten,
                kecamatan: namaKecamatan.trim(),
              }
            : item,
        ),
      );

      setNotice('Data kecamatan berhasil diperbarui.');
    }

    closeModal();
  }

  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus data kecamatan ini?',
    );

    if (!confirmed) return;

    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);

    const remainingData = updatedData.filter((item) => {
      const keyword = search.toLowerCase().trim();

      return (
        item.kabupaten.toLowerCase().includes(keyword) ||
        item.kecamatan.toLowerCase().includes(keyword)
      );
    });

    const lastPage = Math.max(
      1,
      Math.ceil(remainingData.length / itemsPerPage),
    );

    if (currentPage > lastPage) {
      setCurrentPage(lastPage);
    }

    setNotice('Data kecamatan berhasil dihapus.');
  }

  return (
    <div className="min-h-screen bg-[#F5F8FD] px-8 py-8 font-[Inter,sans-serif]">
      {/* HEADER HALAMAN */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-[23px] font-bold leading-tight text-[#17365D]">
            Data Kecamatan
          </h1>
        </div>

        <p className="mt-3 text-[13px] text-[#8294B1]">
          Kelola dan lihat daftar kecamatan yang terdaftar pada sistem.
        </p>
      </div>

      {/* NOTIFIKASI */}
      {notice && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-[#B8CCFF] bg-[#EEF4FF] px-4 py-3 text-[12px] text-[#3569F6]">
          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice('')}
            aria-label="Tutup notifikasi"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* KARTU PENCARIAN */}
      <div className="mb-5 rounded-xl border border-[#B8CCFF] bg-white px-[22px] py-[18px] shadow-[0_2px_5px_rgba(30,64,175,0.06)]">
        <h2 className="text-[14px] font-semibold text-[#183B67]">
          Data Kecamatan
        </h2>

        <p className="mt-1 text-[12px] text-[#8294B1]">
          Cari dan kelola informasi kecamatan berdasarkan kabupaten.
        </p>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-[562px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8CA2C2]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari nama kabupaten atau kecamatan..."
              className="h-10 w-full rounded-md border border-[#B8CCFF] bg-[#EAF1FF] pl-9 pr-3 text-[12px] text-[#354760] outline-none placeholder:text-[#8299BC] focus:border-[#3569F6] focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-5 text-[12px] font-semibold text-white transition hover:bg-[#2456DC]"
          >
            <Plus size={15} />
            Tambah Data
          </button>
        </div>
      </div>

      {/* TABEL KECAMATAN */}
      <div className="overflow-hidden rounded-xl border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(30,64,175,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr className="h-[41px] bg-[#EEF4FF]">
                <th className="w-[12%] border-b border-[#DCE7FA] px-5 text-center text-[10px] font-semibold uppercase text-[#526783]">
                  No.
                </th>

                <th className="w-[39%] border-b border-[#DCE7FA] px-5 text-[10px] font-semibold uppercase text-[#526783]">
                  Nama Kabupaten
                </th>

                <th className="w-[34%] border-b border-[#DCE7FA] px-5 text-[10px] font-semibold uppercase text-[#526783]">
                  Nama Kecamatan
                </th>

                <th className="w-[15%] border-b border-[#DCE7FA] px-5 text-center text-[10px] font-semibold uppercase text-[#526783]">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="h-[69px] border-b border-[#E8EFFA] transition-colors hover:bg-[#F8FAFE]"
                  >
                    <td className="px-5 text-center text-[11px] text-[#526783]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="px-5 text-[11px] font-medium text-[#183B67]">
                      {item.kabupaten}
                    </td>

                    <td className="px-5 text-[11px] text-[#526783]">
                      {item.kecamatan}
                    </td>

                    <td className="px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          title="Edit kecamatan"
                          aria-label="Edit kecamatan"
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteData(item.id)}
                          title="Hapus kecamatan"
                          aria-label="Hapus kecamatan"
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#FFB8B8] bg-white text-[#FF3333] transition hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="h-[100px] text-center text-[12px] text-[#8294B1]"
                  >
                    Data kecamatan tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex min-h-[62px] items-center justify-between gap-3 px-5">
          <p className="text-[11px] text-[#8294B1]">
            Menampilkan{' '}
            {filteredData.length === 0
              ? 0
              : (currentPage - 1) * itemsPerPage + 1}{' '}
            - {Math.min(currentPage * itemsPerPage, filteredData.length)} dari{' '}
            {filteredData.length} data
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DCE5F1] text-[#8294B1] hover:bg-[#F4F7FC] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 min-w-8 rounded-md border px-2 text-[11px] font-medium ${
                    currentPage === page
                      ? 'border-[#3569F6] bg-[#3569F6] text-white'
                      : 'border-[#DCE5F1] bg-white text-[#526783] hover:bg-[#F4F7FC]'
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#DCE5F1] text-[#8294B1] hover:bg-[#F4F7FC] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH DAN EDIT */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10233F]/40 px-4 py-6">
          <div className="w-full max-w-[560px] overflow-hidden rounded-xl bg-white shadow-xl">
            {/* HEADER MODAL */}
            <div className="flex items-start justify-between border-b border-[#E8EEF6] px-[22px] py-[18px]">
              <div>
                <h2 className="text-[15px] font-bold text-[#183B67]">
                  {modalMode === 'add' ? 'Tambah Kecamatan' : 'Edit Kecamatan'}
                </h2>

                <p className="mt-1 text-[11px] text-[#8294B1]">
                  {modalMode === 'add'
                    ? 'Masukkan informasi untuk menambahkan kecamatan baru.'
                    : 'Perbarui informasi kecamatan sesuai data yang diperlukan.'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="flex h-7 w-7 items-center justify-center rounded-md text-[#64748B] transition hover:bg-[#F1F5F9]"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM MODAL */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 px-[22px] py-6">
                {/* NAMA KABUPATEN */}
                <div>
                  <label className="text-[11px] font-semibold text-[#354760]">
                    Nama Kabupaten <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      value={namaKabupaten}
                      onChange={(e) => {
                        setNamaKabupaten(e.target.value);
                        setErrorMessage('');
                      }}
                      required
                      className={`${inputClass} appearance-none pr-9`}
                    >
                      <option value="" disabled>
                        Pilih kabupaten
                      </option>

                      {daftarKabupaten.map((kabupaten) => (
                        <option key={kabupaten} value={kabupaten}>
                          {kabupaten}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-[22px] text-[#8294B1]"
                    />
                  </div>
                </div>

                {/* NAMA KECAMATAN */}
                <div>
                  <label className="text-[11px] font-semibold text-[#354760]">
                    Nama Kecamatan <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={namaKecamatan}
                    onChange={(e) => {
                      setNamaKecamatan(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Masukkan nama kecamatan"
                    required
                    className={inputClass}
                  />
                </div>

                {errorMessage && (
                  <p className="text-[11px] text-red-500">{errorMessage}</p>
                )}
              </div>

              {/* FOOTER MODAL */}
              <div className="flex items-center justify-between gap-3 border-t border-[#E8EEF6] px-[22px] py-4">
                <p className="text-[10px] text-[#8294B1]">
                  Pastikan informasi kecamatan sudah sesuai sebelum disimpan.
                </p>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="h-9 rounded-md border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#526783] transition hover:bg-[#F4F7FC]"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="flex h-9 items-center justify-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white transition hover:bg-[#2456DC]"
                  >
                    <Check size={14} strokeWidth={2.5} />

                    {modalMode === 'add' ? 'Simpan Data' : 'Simpan Perubahan'}
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
