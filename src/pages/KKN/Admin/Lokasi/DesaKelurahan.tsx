import { useMemo, useState, type FormEvent } from 'react';
import {
  MapPinned,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
} from 'lucide-react';

type MappingProdi = {
  id: number;
  namaProdi: string;
  jumlahMahasiswa: number;
};

type DesaData = {
  id: number;
  kabupaten: string;
  kecamatan: string;
  namaDesa: string;
  namaKepala: string;
  alamat: string;
  telepon: string;
  lakiLaki: number;
  perempuan: number;
  mappingProdi: MappingProdi[];
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

const daftarKecamatan: Record<string, string[]> = {
  'Kabupaten Buleleng': ['Buleleng', 'Singaraja', 'Banjar'],
  'Kabupaten Jembrana': ['Negara', 'Melaya', 'Mendoyo'],
  'Kabupaten Tabanan': ['Tabanan', 'Kediri', 'Baturiti'],
  'Kabupaten Badung': ['Kuta', 'Mengwi', 'Abiansemal'],
  'Kabupaten Gianyar': ['Ubud', 'Sukawati', 'Gianyar'],
  'Kabupaten Klungkung': ['Banjarangkan', 'Dawan', 'Nusa Penida'],
  'Kabupaten Bangli': ['Kintamani', 'Bangli', 'Susut'],
  'Kabupaten Karangasem': ['Karangasem', 'Abang', 'Rendang'],
};

const daftarProdi = [
  'S1 Pendidikan Teknik Informatika',
  'S1 Sistem Informasi',
  'S1 Manajemen',
  'S1 Ilmu Komputer',
  'S1 Pendidikan Bahasa Inggris',
];

const initialData: DesaData[] = [
  {
    id: 1,
    kabupaten: 'Kabupaten Klungkung',
    kecamatan: 'Banjarangkan',
    namaDesa: 'Aan',
    namaKepala: 'Kepala Desa Aan',
    alamat:
      'Jl. Raya Aan, Desa Aan, Kecamatan Banjarangkan, Kabupaten Klungkung, Bali 80752',
    telepon: '081905020008',
    lakiLaki: 10,
    perempuan: 12,
    mappingProdi: [
      {
        id: 1,
        namaProdi: 'S1 Pendidikan Teknik Informatika',
        jumlahMahasiswa: 5,
      },
      { id: 2, namaProdi: 'S1 Sistem Informasi', jumlahMahasiswa: 4 },
      { id: 3, namaProdi: 'S1 Manajemen', jumlahMahasiswa: 4 },
      { id: 4, namaProdi: 'S1 Ilmu Komputer', jumlahMahasiswa: 5 },
      {
        id: 5,
        namaProdi: 'S1 Pendidikan Bahasa Inggris',
        jumlahMahasiswa: 4,
      },
    ],
  },
  {
    id: 2,
    kabupaten: 'Kabupaten Buleleng',
    kecamatan: 'Buleleng',
    namaDesa: 'Baktiseraga',
    namaKepala: 'Kepala Desa Baktiseraga',
    alamat: 'Jl. Desa Baktiseraga, Kabupaten Buleleng, Bali',
    telepon: '081234567890',
    lakiLaki: 10,
    perempuan: 10,
    mappingProdi: [
      { id: 6, namaProdi: 'S1 Sistem Informasi', jumlahMahasiswa: 5 },
      { id: 7, namaProdi: 'S1 Manajemen', jumlahMahasiswa: 5 },
    ],
  },
  {
    id: 3,
    kabupaten: 'Kabupaten Tabanan',
    kecamatan: 'Kediri',
    namaDesa: 'Kediri',
    namaKepala: 'Kepala Desa Kediri',
    alamat: 'Jl. Raya Kediri, Kabupaten Tabanan, Bali',
    telepon: '081234567891',
    lakiLaki: 10,
    perempuan: 12,
    mappingProdi: [],
  },
];

const inputClass =
  'mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none placeholder:text-[#9AAAC0] transition focus:border-[#3569F6] focus:ring-1 focus:ring-[#3569F6]/10';

const labelClass = 'text-[10px] font-semibold text-[#354760]';

export default function DesaKelurahan() {
  const [data, setData] = useState<DesaData[]>(initialData);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [kabupaten, setKabupaten] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [namaDesa, setNamaDesa] = useState('');
  const [namaKepala, setNamaKepala] = useState('');
  const [alamat, setAlamat] = useState('');
  const [telepon, setTelepon] = useState('');
  const [lakiLaki, setLakiLaki] = useState('10');
  const [perempuan, setPerempuan] = useState('12');
  const [mappingProdi, setMappingProdi] = useState<MappingProdi[]>([]);

  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return data.filter((item) =>
      [item.kabupaten, item.kecamatan, item.namaDesa].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalMahasiswa = mappingProdi.reduce(
    (total, item) => total + Number(item.jumlahMahasiswa || 0),
    0,
  );

  function openAddModal() {
    setModalMode('add');
    setSelectedId(null);
    setKabupaten('');
    setKecamatan('');
    setNamaDesa('');
    setNamaKepala('');
    setAlamat('');
    setTelepon('');
    setLakiLaki('10');
    setPerempuan('12');
    setMappingProdi([]);
    setErrorMessage('');
    setShowModal(true);
  }

  function openEditModal(item: DesaData) {
    setModalMode('edit');
    setSelectedId(item.id);
    setKabupaten(item.kabupaten);
    setKecamatan(item.kecamatan);
    setNamaDesa(item.namaDesa);
    setNamaKepala(item.namaKepala);
    setAlamat(item.alamat);
    setTelepon(item.telepon);
    setLakiLaki(String(item.lakiLaki));
    setPerempuan(String(item.perempuan));
    setMappingProdi(item.mappingProdi.map((prodi) => ({ ...prodi })));
    setErrorMessage('');
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelectedId(null);
    setErrorMessage('');
  }

  function addMappingProdi() {
    setMappingProdi((current) => [
      ...current,
      {
        id: Date.now(),
        namaProdi: '',
        jumlahMahasiswa: 0,
      },
    ]);
  }

  function updateMappingProdi(
    id: number,
    field: 'namaProdi' | 'jumlahMahasiswa',
    value: string | number,
  ) {
    setMappingProdi((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeMappingProdi(id: number) {
    setMappingProdi((current) => current.filter((item) => item.id !== id));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !kabupaten ||
      !kecamatan ||
      !namaDesa.trim() ||
      !namaKepala.trim() ||
      !alamat.trim() ||
      !telepon.trim()
    ) {
      setErrorMessage('Mohon lengkapi seluruh data yang wajib diisi.');
      return;
    }

    const duplicate = data.some(
      (item) =>
        item.id !== selectedId &&
        item.kecamatan === kecamatan &&
        item.namaDesa.toLowerCase() === namaDesa.trim().toLowerCase(),
    );

    if (duplicate) {
      setErrorMessage('Nama desa tersebut sudah terdaftar pada kecamatan ini.');
      return;
    }

    if (mappingProdi.some((item) => !item.namaProdi)) {
      setErrorMessage('Mohon pilih program studi pada semua baris pemetaan.');
      return;
    }

    const desaBaru: DesaData = {
      id: selectedId ?? Date.now(),
      kabupaten,
      kecamatan,
      namaDesa: namaDesa.trim(),
      namaKepala: namaKepala.trim(),
      alamat: alamat.trim(),
      telepon: telepon.trim(),
      lakiLaki: Number(lakiLaki),
      perempuan: Number(perempuan),
      mappingProdi,
    };

    if (modalMode === 'add') {
      setData((current) => [...current, desaBaru]);
      setSearch('');
      setCurrentPage(Math.ceil((data.length + 1) / itemsPerPage));
      setNotice('Data desa/kelurahan berhasil ditambahkan.');
    } else {
      setData((current) =>
        current.map((item) => (item.id === selectedId ? desaBaru : item)),
      );
      setNotice('Data desa/kelurahan berhasil diperbarui.');
    }

    closeModal();
  }

  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus data desa/kelurahan ini?',
    );

    if (!confirmed) return;

    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);

    const keyword = search.toLowerCase().trim();
    const remainingData = updatedData.filter((item) =>
      [item.kabupaten, item.kecamatan, item.namaDesa].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );

    const lastPage = Math.max(
      1,
      Math.ceil(remainingData.length / itemsPerPage),
    );

    if (currentPage > lastPage) setCurrentPage(lastPage);

    setNotice('Data desa/kelurahan berhasil dihapus.');
  }

  function resetMapping() {
    setData((current) =>
      current.map((item) => ({
        ...item,
        mappingProdi: [],
      })),
    );

    setShowResetModal(false);
    setNotice('Seluruh pemetaan program studi berhasil direset.');
  }

  return (
    <div className="min-h-screen bg-[#F5F8FD] px-8 py-8 font-[Inter,sans-serif]">
      {/* HEADER HALAMAN */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-[23px] font-bold leading-tight text-[#17365D]">
            Data Desa/Kelurahan
          </h1>
        </div>

        <p className="mt-3 text-[13px] text-[#8294B1]">
          Kelola dan lihat daftar desa/kelurahan yang terdaftar pada sistem.
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
          Data Desa/Kelurahan
        </h2>

        <p className="mt-1 text-[12px] text-[#8294B1]">
          Cari dan kelola informasi desa/kelurahan yang tersedia pada sistem.
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
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
              placeholder="Cari kabupaten, kecamatan, atau desa..."
              className="h-10 w-full rounded-md border border-[#B8CCFF] bg-[#EAF1FF] pl-9 pr-3 text-[12px] text-[#354760] outline-none placeholder:text-[#8299BC] focus:border-[#3569F6] focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={openAddModal}
              className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-4 text-[12px] font-semibold text-white transition hover:bg-[#2456DC]"
            >
              <Plus size={15} />
              Tambah Data
            </button>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-[#F2B66D] bg-white px-4 text-[12px] font-semibold text-[#D88927] transition hover:bg-[#FFF8EC]"
            >
              <RotateCcw size={14} />
              Reset Pemetaan Prodi
            </button>
          </div>
        </div>
      </div>

      {/* TABEL DESA/KELURAHAN */}
      <div className="overflow-hidden rounded-xl border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(30,64,175,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] table-fixed border-collapse text-left">
            <thead>
              <tr className="h-[41px] bg-[#EEF4FF]">
                <th className="w-[8%] border-b border-[#DCE7FA] px-4 text-center text-[10px] font-semibold uppercase text-[#526783]">
                  No.
                </th>
                <th className="w-[25%] border-b border-[#DCE7FA] px-4 text-[10px] font-semibold uppercase text-[#526783]">
                  Nama Kabupaten
                </th>
                <th className="w-[22%] border-b border-[#DCE7FA] px-4 text-[10px] font-semibold uppercase text-[#526783]">
                  Nama Kecamatan
                </th>
                <th className="w-[29%] border-b border-[#DCE7FA] px-4 text-[10px] font-semibold uppercase text-[#526783]">
                  Nama Desa/Kelurahan
                </th>
                <th className="w-[16%] border-b border-[#DCE7FA] px-4 text-center text-[10px] font-semibold uppercase text-[#526783]">
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
                    <td className="px-4 text-center text-[11px] text-[#526783]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 text-[11px] font-medium text-[#183B67]">
                      {item.kabupaten}
                    </td>
                    <td className="px-4 text-[11px] text-[#526783]">
                      {item.kecamatan}
                    </td>
                    <td className="px-4 text-[11px] font-medium text-[#183B67]">
                      {item.namaDesa}
                    </td>
                    <td className="px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          title="Edit desa"
                          aria-label="Edit desa"
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteData(item.id)}
                          title="Hapus desa"
                          aria-label="Hapus desa"
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
                    colSpan={5}
                    className="h-[100px] text-center text-[12px] text-[#8294B1]"
                  >
                    Data desa/kelurahan tidak ditemukan.
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

      {/* MODAL TAMBAH / EDIT DESA */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10233F]/50 px-4 py-4">
          <div className="flex max-h-[90vh] w-full max-w-[760px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex shrink-0 items-start justify-between border-b border-[#E8EEF6] px-5 py-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <MapPinned size={17} />
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-[#183B67]">
                    {modalMode === 'add'
                      ? 'Tambah Desa/Kelurahan'
                      : 'Edit Desa/Kelurahan'}
                  </h2>
                  <p className="mt-0.5 text-[10px] text-[#8294B1]">
                    {modalMode === 'add'
                      ? 'Masukkan informasi desa, kontak, wilayah, kuota gender, dan mapping program studi penempatan.'
                      : 'Perbarui informasi desa, kontak, wilayah, kuota gender, dan mapping program studi penempatan.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="flex h-7 w-7 items-center justify-center rounded-md text-[#8294B1] hover:bg-[#F1F5F9]"
              >
                <X size={17} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <form
              onSubmit={handleSubmit}
              className="min-h-0 flex-1 overflow-y-auto"
            >
              <div className="space-y-3 px-4 py-3">
                {/* DATA POKOK WILAYAH DESA */}
                <section className="rounded-lg border border-[#E1EAF5] p-3">
                  <div className="mb-3 flex items-center gap-2 border-b border-[#EDF1F7] pb-2">
                    <h3 className="text-[11px] font-bold text-[#354760]">
                      Data Pokok Wilayah Desa
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        Nama Desa / Kelurahan{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={namaDesa}
                        onChange={(e) => setNamaDesa(e.target.value)}
                        placeholder="Masukkan nama desa / kelurahan"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Nama Kepala Desa / Lurah{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={namaKepala}
                        onChange={(e) => setNamaKepala(e.target.value)}
                        placeholder="Masukkan nama kepala desa / lurah"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Telepon Kontak Desa / Narahubung{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={telepon}
                        onChange={(e) => setTelepon(e.target.value)}
                        placeholder="Contoh: 081234567890"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Alamat Kantor Desa / Posko Utama{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        placeholder="Masukkan alamat lengkap kantor desa / posko utama"
                        required
                        rows={2}
                        className="mt-1.5 min-h-[36px] w-full resize-none rounded-md border border-[#DCE5F1] bg-white px-3 py-2 text-[11px] text-[#354760] outline-none placeholder:text-[#9AAAC0] focus:border-[#3569F6]"
                      />
                    </div>
                  </div>
                </section>

                {/* INFORMASI WILAYAH */}
                <section className="rounded-lg border border-[#E1EAF5] p-3">
                  <div className="mb-3 border-b border-[#EDF1F7] pb-2">
                    <h3 className="text-[11px] font-bold text-[#354760]">
                      Informasi Wilayah
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>
                        Kabupaten Penempatan{' '}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <select
                          value={kabupaten}
                          onChange={(e) => {
                            setKabupaten(e.target.value);
                            setKecamatan('');
                          }}
                          required
                          className={`${inputClass} appearance-none pr-9`}
                        >
                          <option value="" disabled>
                            Pilih kabupaten
                          </option>

                          {daftarKabupaten.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>

                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-3 top-[22px] text-[#8294B1]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Kecamatan Penempatan{' '}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <select
                          value={kecamatan}
                          onChange={(e) => setKecamatan(e.target.value)}
                          required
                          disabled={!kabupaten}
                          className={`${inputClass} appearance-none pr-9 disabled:cursor-not-allowed disabled:bg-[#F5F7FA]`}
                        >
                          <option value="" disabled>
                            {kabupaten
                              ? 'Pilih kecamatan'
                              : 'Pilih kabupaten terlebih dahulu'}
                          </option>

                          {(daftarKecamatan[kabupaten] || []).map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>

                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-3 top-[22px] text-[#8294B1]"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* JUMLAH MAKSIMAL GENDER */}
                <section className="rounded-lg border border-[#E1EAF5] p-3">
                  <div className="mb-3 flex items-center justify-between border-b border-[#EDF1F7] pb-2">
                    <h3 className="text-[11px] font-bold text-[#354760]">
                      Jumlah Maksimal Gender (Kuota Peserta)
                    </h3>

                    <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[9px] font-semibold text-[#3569F6]">
                      Total Alokasi: {Number(lakiLaki) + Number(perempuan)}{' '}
                      Mahasiswa
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="rounded-md border border-[#E5ECF5] bg-[#F8FAFD] p-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-semibold text-[#3569F6]">
                          ♂ Jumlah Maksimal Laki-laki
                        </label>
                        <span className="text-[9px] text-[#8294B1]">
                          Posko Putra
                        </span>
                      </div>

                      <input
                        type="number"
                        min="0"
                        value={lakiLaki}
                        onChange={(e) => setLakiLaki(e.target.value)}
                        required
                        className="mt-2 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                      />

                      <p className="mt-1.5 text-[9px] text-[#8294B1]">
                        Kapasitas tempat tidur mahasiswa posko putra.
                      </p>
                    </div>

                    <div className="rounded-md border border-[#E5ECF5] bg-[#F8FAFD] p-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-semibold text-[#E65C9A]">
                          ♀ Jumlah Maksimal Perempuan
                        </label>
                        <span className="text-[9px] text-[#8294B1]">
                          Posko Putri
                        </span>
                      </div>

                      <input
                        type="number"
                        min="0"
                        value={perempuan}
                        onChange={(e) => setPerempuan(e.target.value)}
                        required
                        className="mt-2 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                      />

                      <p className="mt-1.5 text-[9px] text-[#8294B1]">
                        Kapasitas tempat tidur mahasiswa posko putri.
                      </p>
                    </div>
                  </div>
                </section>

                {/* MAPPING PRODI */}
                <section className="rounded-lg border border-[#E1EAF5] p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-[11px] font-bold text-[#354760]">
                        Mapping Prodi (Alokasi Program Studi)
                      </h3>

                      <p className="mt-0.5 text-[9px] text-[#8294B1]">
                        Distribusi keahlian mahasiswa yang dibutuhkan pada
                        program kerja desa.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addMappingProdi}
                      className="flex h-8 shrink-0 items-center gap-1 rounded-md border border-[#B8CCFF] bg-[#F4F7FF] px-2.5 text-[10px] font-semibold text-[#3569F6] transition hover:bg-[#EAF1FF]"
                    >
                      <Plus size={12} />
                      Tambah Prodi
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[550px] border-collapse">
                      <thead>
                        <tr className="h-8 bg-[#F4F7FC]">
                          <th className="w-[58%] px-3 text-left text-[9px] font-semibold uppercase text-[#526783]">
                            Nama Program Studi
                          </th>
                          <th className="w-[27%] px-3 text-center text-[9px] font-semibold uppercase text-[#526783]">
                            Jumlah Mahasiswa
                          </th>
                          <th className="w-[15%] px-3 text-center text-[9px] font-semibold uppercase text-[#526783]">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {mappingProdi.length > 0 ? (
                          mappingProdi.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b border-[#EDF1F7]"
                            >
                              <td className="px-2 py-1.5">
                                <select
                                  value={item.namaProdi}
                                  onChange={(e) =>
                                    updateMappingProdi(
                                      item.id,
                                      'namaProdi',
                                      e.target.value,
                                    )
                                  }
                                  className="h-8 w-full rounded-md border border-[#DCE5F1] bg-[#F8FAFD] px-2 text-[9px] text-[#354760] outline-none focus:border-[#3569F6]"
                                >
                                  <option value="">Pilih program studi</option>

                                  {daftarProdi.map((prodi) => (
                                    <option key={prodi} value={prodi}>
                                      {prodi}
                                    </option>
                                  ))}
                                </select>
                              </td>

                              <td className="px-2 py-1.5">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.jumlahMahasiswa}
                                    onChange={(e) =>
                                      updateMappingProdi(
                                        item.id,
                                        'jumlahMahasiswa',
                                        Number(e.target.value),
                                      )
                                    }
                                    className="h-8 w-full rounded-md border border-[#DCE5F1] bg-[#F8FAFD] px-2 text-center text-[10px] text-[#354760] outline-none focus:border-[#3569F6]"
                                  />
                                  <span className="text-[9px] text-[#8294B1]">
                                    Org
                                  </span>
                                </div>
                              </td>

                              <td className="px-2 py-1.5 text-center">
                                <button
                                  type="button"
                                  onClick={() => removeMappingProdi(item.id)}
                                  title="Hapus program studi"
                                  aria-label="Hapus program studi"
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#8294B1] transition hover:bg-red-50 hover:text-red-500"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={3}
                              className="py-5 text-center text-[10px] text-[#8294B1]"
                            >
                              Belum ada program studi yang dipetakan.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[9px] text-[#8294B1]">
                    <span>
                      Akumulasi: {mappingProdi.length} Program Studi Terpetakan
                    </span>
                    <span>
                      Total Mahasiswa:{' '}
                      <strong className="text-[#3569F6]">
                        {totalMahasiswa} Orang (Sesuai Kuota)
                      </strong>
                    </span>
                  </div>
                </section>

                {errorMessage && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[10px] text-red-600">
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* MODAL FOOTER */}
              <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EEF6] bg-white px-5 py-3">
                <p className="text-[9px] text-[#8294B1]">
                  <span className="text-red-500">*</span> Kolom wajib terisi.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="h-9 rounded-md border border-[#DCE5F1] bg-white px-4 text-[10px] font-semibold text-[#526783] transition hover:bg-[#F4F7FC]"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="flex h-9 items-center justify-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white transition hover:bg-[#2456DC]"
                  >
                    <Check size={13} />
                    {modalMode === 'add' ? 'Simpan Desa' : 'Simpan Perubahan'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI RESET PEMETAAN */}
      {showResetModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#10233F]/55 px-4">
          <div className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4E5] text-[#E69A36]">
              <RotateCcw size={25} />
            </div>

            <div className="text-center">
              <h2 className="text-[16px] font-bold text-[#183B67]">
                Reset Pemetaan Prodi?
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-[#8294B1]">
                Apakah kamu yakin ingin mereset seluruh pemetaan program studi
                pada semua desa/kelurahan? Seluruh data alokasi program studi
                akan dikosongkan dan tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="h-9 rounded-md border border-[#DCE5F1] bg-white px-5 text-[11px] font-semibold text-[#526783] transition hover:bg-[#F4F7FC]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={resetMapping}
                className="flex h-9 items-center justify-center gap-1.5 rounded-md bg-[#E69A36] px-5 text-[11px] font-semibold text-white transition hover:bg-[#CF8425]"
              >
                <RotateCcw size={13} />
                Ya, Reset Pemetaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
