import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Info,
  X,
  Check,
} from 'lucide-react';

type JenisTempat = 'Internal' | 'Eksternal';

type TempatMagangItem = {
  id: number;
  nama: string;
  unit: string;
  program: string;
  kontak: string;
  wilayah: string;
  alamatTempat: string;
  lokasi: string;
  latitude: string;
  longitude: string;
  jenis: JenisTempat;
};

const initialData: TempatMagangItem[] = [
  {
    id: 1,
    nama: 'Perusahaan Dummy 806',
    unit: 'Divisi Hukum dan Penyelesaian Sengketa',
    program: 'Ilmu Hukum (S1)',
    kontak: '081522762999',
    wilayah: 'Denpasar Timur, Kota Denpasar, Bali',
    alamatTempat: 'Jalan Dummy Perusahaan No 806',
    lokasi:
      'Jl. Prof. Moh. Yamin No.17, Sumerta Kelod, Kec. Denpasar Timur, Kota Denpasar, Bali 80239',
    latitude: '-8.650000',
    longitude: '115.216667',
    jenis: 'Eksternal',
  },
  {
    id: 2,
    nama: 'UPA Teknologi Informasi dan Komunikasi',
    unit: 'Pengembangan Sistem Informasi',
    program: 'Sistem Informasi (S1)',
    kontak: '0362 22570',
    wilayah: 'Singaraja, Kabupaten Buleleng, Bali',
    alamatTempat: 'Jl. Udayana No. 11',
    lokasi: 'Jl. Udayana No.11, Singaraja, Kabupaten Buleleng, Bali',
    latitude: '-8.112000',
    longitude: '115.088000',
    jenis: 'Internal',
  },
  {
    id: 3,
    nama: 'Dinas Komunikasi dan Informatika',
    unit: 'Bidang Aplikasi Informatika',
    program: 'Sistem Informasi (S1)',
    kontak: '0361 123456',
    wilayah: 'Denpasar, Bali',
    alamatTempat: 'Jl. Melati No. 20',
    lokasi: 'Jl. Melati No. 20, Denpasar, Bali',
    latitude: '-8.650000',
    longitude: '115.216667',
    jenis: 'Eksternal',
  },
  {
    id: 4,
    nama: 'PT Bali Digital Solution',
    unit: 'Web Development',
    program: 'Manajemen Informatika (D3)',
    kontak: '081234567890',
    wilayah: 'Denpasar, Bali',
    alamatTempat: 'Jl. Gatot Subroto Barat',
    lokasi: 'Jl. Gatot Subroto Barat, Denpasar, Bali',
    latitude: '-8.650000',
    longitude: '115.216667',
    jenis: 'Eksternal',
  },
  {
    id: 5,
    nama: 'Laboratorium Komputer',
    unit: 'Unit Praktikum',
    program: 'Ilmu Komputer (S1)',
    kontak: '0362 22570',
    wilayah: 'Singaraja, Kabupaten Buleleng, Bali',
    alamatTempat: 'Kampus Tengah Undiksha',
    lokasi: 'Kampus Tengah Undiksha, Singaraja, Bali',
    latitude: '-8.112000',
    longitude: '115.088000',
    jenis: 'Internal',
  },
];

const emptyForm: Omit<TempatMagangItem, 'id'> = {
  nama: '',
  unit: '',
  program: '',
  kontak: '',
  wilayah: '',
  alamatTempat: '',
  lokasi: '',
  latitude: '',
  longitude: '',
  jenis: 'Eksternal',
};

export default function TempatMagang() {
  const [data, setData] = useState<TempatMagangItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [expandedLocations, setExpandedLocations] = useState<number[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [notice, setNotice] = useState('');
  const pageSize = 10;

  // Notifikasi sukses otomatis hilang setelah 3,5 detik.
  useEffect(() => {
    if (!notice) return;

    const timeoutId = window.setTimeout(() => {
      setNotice('');
    }, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !keyword ||
        `${item.nama} ${item.unit} ${item.program} ${item.kontak} ${item.lokasi}`
          .toLowerCase()
          .includes(keyword);
      return matchesSearch;
    });
  }, [data, search]);

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

  function openEdit(item: TempatMagangItem) {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      unit: item.unit,
      program: item.program,
      kontak: item.kontak,
      wilayah: item.wilayah,
      alamatTempat: item.alamatTempat,
      lokasi: item.lokasi,
      latitude: item.latitude,
      longitude: item.longitude,
      jenis: item.jenis,
    });
    setFormOpen(true);
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...form } : item,
        ),
      );
      setNotice('Data tempat magang berhasil diperbarui.');
    } else {
      setData((current) => [{ id: Date.now(), ...form }, ...current]);
      setPage(1);
      setNotice('Tempat magang berhasil ditambahkan.');
    }
    setFormOpen(false);
  }

  function deleteData(id: number) {
    if (window.confirm('Yakin ingin menghapus tempat magang ini?')) {
      setData((current) => current.filter((item) => item.id !== id));
      setExpandedLocations((current) =>
        current.filter((itemId) => itemId !== id),
      );
      setPage(1);
      setNotice('Data tempat magang berhasil dihapus.');
    }
  }

  function toggleLocation(id: number) {
    setExpandedLocations((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  }

  function syncData() {
    setSearch('');
    setPage(1);
    setNotice('Sinkronisasi berhasil. Data tempat magang telah diperbarui.');
  }

  const inputClass =
    'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] text-[#354760] outline-none focus:border-[#3569F6]';

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Tempat Magang
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola tempat pelaksanaan program Magang yang tersedia bagi
            mahasiswa.
          </p>
        </div>

        <div className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={17} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <p className="text-[10px] font-bold tracking-wide text-[#3569F6]">
              INFORMASI
            </p>
            <p className="mt-1 text-[11px] leading-5 text-[#354660]">
              Tambahkan tempat Magang jika instansi belum tersedia. Lengkapi
              alamat dan informasi kontak agar data tempat Magang lebih mudah
              digunakan.
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[13px] font-bold text-[#172943]">
                Tempat Magang
              </h2>
              <p className="mt-1 text-[10px] text-[#8291A8]">
                Daftar perusahaan dan instansi yang tersedia sebagai tempat
                pelaksanaan Magang.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama tempat, unit/divisi, atau lokasi..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={14} /> Tambah Tempat Magang
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
        </div>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className="fixed right-5 top-5 z-[70] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={19} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1 pr-1">
              <p className="text-[12px] font-semibold text-[#24334D]">
                {notice.toLowerCase().includes('sinkronisasi')
                  ? 'Sinkronisasi berhasil'
                  : notice.toLowerCase().includes('dihapus')
                    ? 'Data berhasil dihapus'
                    : notice.toLowerCase().includes('diperbarui')
                      ? 'Perubahan berhasil disimpan'
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
              className="shrink-0 rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E8EEF7] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'NAMA TEMPAT',
                    'UNIT / DIVISI',
                    'PROGRAM STUDI',
                    'KONTAK',
                    'LOKASI',
                    'JENIS',
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
                {visibleData.map((item, index) => {
                  const expanded = expandedLocations.includes(item.id);
                  const shortLocation =
                    item.lokasi.length > 35
                      ? `${item.lokasi.slice(0, 35).trim()}...`
                      : item.lokasi;
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                    >
                      <td className="px-3 py-4 text-[10px] text-[#465670]">
                        {(safePage - 1) * pageSize + index + 1}
                      </td>
                      <td className="max-w-[160px] px-3 py-4 text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </td>
                      <td className="max-w-[150px] px-3 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.unit}
                      </td>
                      <td className="px-3 py-4 text-[10px] text-[#465670]">
                        {item.program}
                      </td>
                      <td className="px-3 py-4 text-[10px] text-[#465670]">
                        {item.kontak}
                      </td>
                      <td className="max-w-[180px] px-3 py-4">
                        <div className="flex items-start gap-1.5">
                          <MapPin
                            size={12}
                            className="mt-0.5 shrink-0 text-[#8295B0]"
                          />
                          <div>
                            <p className="max-w-[155px] break-words text-[10px] leading-4 text-[#465670]">
                              {expanded ? item.lokasi : shortLocation}
                            </p>
                            {item.lokasi.length > 35 && (
                              <button
                                type="button"
                                onClick={() => toggleLocation(item.id)}
                                className="mt-1 text-[9px] font-medium text-[#3569F6] hover:underline"
                              >
                                {expanded
                                  ? 'Sembunyikan'
                                  : 'Lihat selengkapnya'}
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[9px] font-medium ${item.jenis === 'Internal' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}
                        >
                          {item.jenis}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            title="Edit tempat magang"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteData(item.id)}
                            title="Hapus tempat magang"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {visibleData.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada tempat magang yang sesuai dengan pencarian.
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
              {filteredData.length} tempat Magang
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
        </div>
      </div>

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFormOpen(false);
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[900px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null
                    ? 'Edit Tempat Magang'
                    : 'Tambah Tempat Magang'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {editingId !== null
                    ? 'Perbarui informasi tempat pelaksanaan Magang.'
                    : 'Lengkapi informasi tempat pelaksanaan Magang.'}
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
              {/* INFORMASI TEMPAT */}
              <section>
                <div className="mb-3 flex items-center gap-2 border-b border-[#E8EEF7] pb-2">
                  <Info size={13} className="text-[#3569F6]" />
                  <h3 className="text-[10px] font-bold tracking-wide text-[#34445E]">
                    INFORMASI TEMPAT
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
                  <label className="block text-[10px] font-semibold text-[#43536B]">
                    Nama Tempat <span className="text-red-500">*</span>
                    <input
                      required
                      value={form.nama}
                      onChange={(event) =>
                        setForm({ ...form, nama: event.target.value })
                      }
                      className={inputClass}
                      placeholder="Masukkan nama tempat"
                    />
                  </label>

                  <label className="block text-[10px] font-semibold text-[#43536B]">
                    Unit / Divisi <span className="text-red-500">*</span>
                    <input
                      required
                      value={form.unit}
                      onChange={(event) =>
                        setForm({ ...form, unit: event.target.value })
                      }
                      className={inputClass}
                      placeholder="Masukkan unit atau divisi"
                    />
                  </label>

                  <label className="block text-[10px] font-semibold text-[#43536B]">
                    Kecamatan / Kabupaten / Provinsi{' '}
                    <span className="text-red-500">*</span>
                    <input
                      required
                      value={form.wilayah}
                      onChange={(event) =>
                        setForm({ ...form, wilayah: event.target.value })
                      }
                      className={inputClass}
                      placeholder="Contoh: Denpasar Timur, Denpasar, Bali"
                    />
                  </label>

                  <label className="block text-[10px] font-semibold text-[#43536B]">
                    Alamat Tempat <span className="text-red-500">*</span>
                    <input
                      required
                      value={form.alamatTempat}
                      onChange={(event) =>
                        setForm({ ...form, alamatTempat: event.target.value })
                      }
                      className={inputClass}
                      placeholder="Nama jalan dan nomor"
                    />
                  </label>

                  <label className="block text-[10px] font-semibold text-[#43536B]">
                    Program Studi <span className="text-red-500">*</span>
                    <select
                      required
                      value={form.program}
                      onChange={(event) =>
                        setForm({ ...form, program: event.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="">Pilih program studi</option>
                      <option>Sistem Informasi (S1)</option>
                      <option>Ilmu Komputer (S1)</option>
                      <option>Manajemen Informatika (D3)</option>
                      <option>Ilmu Hukum (S1)</option>
                      <option>Pendidikan Teknik Informatika (S1)</option>
                    </select>
                  </label>

                  <label className="block text-[10px] font-semibold text-[#43536B]">
                    Kontak <span className="text-red-500">*</span>
                    <input
                      required
                      value={form.kontak}
                      onChange={(event) =>
                        setForm({ ...form, kontak: event.target.value })
                      }
                      className={inputClass}
                      placeholder="Nomor telepon yang bisa dihubungi"
                    />
                  </label>

                  <label className="block text-[10px] font-semibold text-[#43536B] md:max-w-[calc(50%-6px)]">
                    Jenis Tempat <span className="text-red-500">*</span>
                    <select
                      required
                      value={form.jenis}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          jenis: event.target.value as JenisTempat,
                        })
                      }
                      className={inputClass}
                    >
                      <option value="Eksternal">Eksternal</option>
                      <option value="Internal">Internal</option>
                    </select>
                  </label>
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center gap-2 border-b border-[#E8EEF7] pb-2">
                  <MapPin size={13} className="text-[#3569F6]" />
                  <h3 className="text-[10px] font-bold tracking-wide text-[#34445E]">
                    LOKASI TEMPAT MAGANG
                  </h3>
                </div>

                <label className="mb-3 block text-[10px] font-semibold text-[#43536B]">
                  Lokasi <span className="text-red-500">*</span>
                  <input
                    required
                    value={form.lokasi}
                    onChange={(event) =>
                      setForm({ ...form, lokasi: event.target.value })
                    }
                    className={inputClass}
                    placeholder="Masukkan alamat lengkap lokasi"
                  />
                </label>
              </section>

              {/* FOOTER */}
              <div className="sticky bottom-0 flex justify-end gap-2 border-t border-[#E8EEF7] bg-white pt-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="h-9 rounded-md border border-[#DCE5F1] px-4 text-[11px] font-semibold text-[#52627A] hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-9 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white hover:bg-blue-700"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={13} strokeWidth={2.5} />
                    {editingId !== null ? 'Simpan Perubahan' : 'Simpan Data'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
