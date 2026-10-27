import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Info,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';

type Mahasiswa = {
  id: number;
  nama: string;
  nim: string;
  jurusan: string;
  prodi: string;
  telepon: string;
};

const initialData: Mahasiswa[] = [
  {
    id: 1,
    nama: 'Amelia Rizky Yuniar',
    nim: '2115101024',
    jurusan: 'Teknik Informatika',
    prodi: 'S1 Pendidikan Teknik Informatika',
    telepon: '081234567890',
  },
  {
    id: 2,
    nama: 'Gede Arya Wicaksana',
    nim: '2115101035',
    jurusan: 'Teknik Informatika',
    prodi: 'S1 Sistem Informasi',
    telepon: '081987654321',
  },
  {
    id: 3,
    nama: 'Kadek Dwi Pradnyana',
    nim: '2115101012',
    jurusan: 'Teknik Informatika',
    prodi: 'S1 Ilmu Komputer',
    telepon: '082145678901',
  },
  {
    id: 4,
    nama: 'Ni Putu Ayu Maharani',
    nim: '2115051044',
    jurusan: 'Teknik Elektro',
    prodi: 'S1 Pendidikan Teknik Elektro',
    telepon: '085239123456',
  },
  {
    id: 5,
    nama: 'I Wayan Sudarma Putra',
    nim: '2115091018',
    jurusan: 'Manajemen Informatika',
    prodi: 'D3 Manajemen Informatika',
    telepon: '087861234567',
  },
  {
    id: 6,
    nama: 'Made Devi Lestari',
    nim: '2115011005',
    jurusan: 'Bahasa Asing',
    prodi: 'S1 Pendidikan Bahasa Inggris',
    telepon: '081339876543',
  },
  {
    id: 7,
    nama: 'Ketut Bagus Dananjaya',
    nim: '2115101088',
    jurusan: 'Teknik Informatika',
    prodi: 'S1 Sistem Informasi',
    telepon: '089678123456',
  },
  {
    id: 8,
    nama: 'Luh Putu Dian Anggraeni',
    nim: '2115041029',
    jurusan: 'Matematika',
    prodi: 'S1 Pendidikan Matematika',
    telepon: '082236789012',
  },
  {
    id: 9,
    nama: 'I Komang Alit Sanjaya',
    nim: '2115031051',
    jurusan: 'Fisika dan Pengajaran IPA',
    prodi: 'S1 Pendidikan Fisika',
    telepon: '085338123789',
  },
];

const emptyForm = {
  nama: '',
  nim: '',
  jurusan: '',
  prodi: '',
  telepon: '',
};

const prodiOptions = [
  'S1 Pendidikan Teknik Informatika',
  'S1 Sistem Informasi',
  'S1 Ilmu Komputer',
  'S1 Pendidikan Teknik Elektro',
  'D3 Manajemen Informatika',
  'S1 Pendidikan Bahasa Inggris',
  'S1 Pendidikan Matematika',
  'S1 Pendidikan Fisika',
];

export default function DataMahasiswa() {
  const [data, setData] = useState<Mahasiswa[]>(initialData);
  const [search, setSearch] = useState('');
  const [filterProdi, setFilterProdi] = useState('Semua Prodi');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      const matchesSearch =
        !keyword ||
        `${item.nama} ${item.nim} ${item.jurusan} ${item.prodi} ${item.telepon}`
          .toLowerCase()
          .includes(keyword);

      const matchesProdi =
        filterProdi === 'Semua Prodi' || item.prodi === filterProdi;

      return matchesSearch && matchesProdi;
    });
  }, [data, search, filterProdi]);

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

  function openEdit(item: Mahasiswa) {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      nim: item.nim,
      jurusan: item.jurusan,
      prodi: item.prodi,
      telepon: item.telepon,
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

      setNotice({
        title: 'Data mahasiswa berhasil diperbarui',
        message: 'Perubahan data mahasiswa berhasil disimpan.',
      });
    } else {
      setData((current) => [{ id: Date.now(), ...form }, ...current]);
      setPage(1);

      setNotice({
        title: 'Data mahasiswa berhasil ditambahkan',
        message: 'Data mahasiswa baru berhasil disimpan.',
      });
    }

    setFormOpen(false);
  }

  function deleteData(item: Mahasiswa) {
    if (
      !window.confirm(`Yakin ingin menghapus data mahasiswa "${item.nama}"?`)
    ) {
      return;
    }

    setData((current) => current.filter((row) => row.id !== item.id));

    setPage(1);

    setNotice({
      title: 'Data mahasiswa berhasil dihapus',
      message: 'Data telah dihapus dari daftar.',
    });
  }

  function syncData() {
    setSearch('');
    setFilterProdi('Semua Prodi');
    setPage(1);

    setNotice({
      title: 'Sinkronisasi Berhasil',
      message: 'Daftar mahasiswa berhasil diperbarui. Data masih berupa dummy.',
    });
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Data Mahasiswa
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola informasi dan data mahasiswa.
          </p>
        </header>

        <section className="mb-4 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-3">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Mahasiswa
            </h2>
            <p className="mt-1 text-[10px] leading-4 text-[#71819B]">
              Daftar mahasiswa yang terdaftar pada Sistem Pembelajaran Luar
              Kampus.
            </p>
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
                placeholder="Cari nama, NIM, jurusan, prodi, atau telepon..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3 text-[11px] font-medium text-white transition hover:bg-blue-700"
              >
                <Plus size={14} />
                Tambah Mahasiswa
              </button>

              <select
                value={filterProdi}
                onChange={(event) => {
                  setFilterProdi(event.target.value);
                  setPage(1);
                }}
                aria-label="Filter program studi"
                className="h-9 min-w-[190px] rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] text-[#52627A] outline-none focus:border-[#3569F6]"
              >
                <option>Semua Prodi</option>
                {prodiOptions.map((prodi) => (
                  <option key={prodi}>{prodi}</option>
                ))}
              </select>

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

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'NAMA',
                    'NIM',
                    'JURUSAN',
                    'PRODI',
                    'TELEPON',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]"
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
                    <td className="px-3 py-3 text-[10px] text-[#465670]">
                      {(safePage - 1) * pageSize + index + 1}
                    </td>

                    <td className="min-w-[190px] px-3 py-3">
                      <p className="text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.nim}
                    </td>

                    <td className="min-w-[150px] px-3 py-3 text-[10px] leading-4 text-[#465670]">
                      {item.jurusan}
                    </td>

                    <td className="min-w-[180px] px-3 py-3 text-[10px] leading-4 text-[#273750]">
                      {item.prodi}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.telepon}
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit mahasiswa"
                          aria-label={`Edit ${item.nama}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                        >
                          <Pencil size={12} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteData(item)}
                          title="Hapus mahasiswa"
                          aria-label={`Hapus ${item.nama}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={12} />
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
                      Tidak ada data mahasiswa yang sesuai dengan pencarian.
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
              {filteredData.length} mahasiswa
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
                    className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${
                      safePage === number
                        ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white'
                        : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'
                    }`}
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
              {notice.title}
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              {notice.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Tutup notifikasi"
            className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setFormOpen(false);
            }
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[700px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null
                    ? 'Edit Data Mahasiswa'
                    : 'Tambah Data Mahasiswa'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Lengkapi informasi data mahasiswa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Tutup formulir"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={saveData} className="px-5 py-4">
              <div className="mb-4 flex items-center gap-2 border-b border-[#E8EEF7] pb-2 text-[10px] font-bold tracking-wide text-[#52627A]">
                <Info size={13} className="text-[#3569F6]" />
                INFORMASI MAHASISWA
              </div>

              <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Nama <span className="text-red-500">*</span>
                  </span>
                  <input
                    value={form.nama}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        nama: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan nama mahasiswa"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    NIM <span className="text-red-500">*</span>
                  </span>
                  <input
                    value={form.nim}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        nim: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan NIM"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Jurusan <span className="text-red-500">*</span>
                  </span>
                  <input
                    value={form.jurusan}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        jurusan: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan jurusan"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Prodi <span className="text-red-500">*</span>
                  </span>
                  <select
                    required
                    value={form.prodi}
                    onChange={(event) =>
                      setForm({ ...form, prodi: event.target.value })
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                  >
                    <option value="">Pilih program studi</option>
                    {prodiOptions.map((prodi) => (
                      <option key={prodi}>{prodi}</option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Telepon
                  </span>
                  <input
                    value={form.telepon}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        telepon: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan nomor telepon"
                  />
                </label>
              </div>

              <div className="mt-4 flex justify-end gap-2 border-t border-[#E8EEF7] pt-3">
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
                  <Check size={13} strokeWidth={2.5} />
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
