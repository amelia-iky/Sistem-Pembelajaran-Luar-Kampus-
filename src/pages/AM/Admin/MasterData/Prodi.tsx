import { useMemo, useState, type FormEvent } from 'react';
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

type Jenjang = 'SD' | 'SMP' | 'SMA' | 'SMK';
type Status = 'Aktif' | 'Tidak Aktif';

type ProdiItem = {
  id: number;
  kodeProdi: string;
  namaProdi: string;
  jurusan: string;
  fakultas: string;
  jenjang: Jenjang;
  status: Status;
};

type ProdiForm = {
  namaProdi: string;
  jurusan: string;
  jenjang: Jenjang | '';
  status: Status;
};

const daftarJurusan = [
  {
    nama: 'Pendidikan Guru Sekolah Dasar',
    fakultas: 'Fakultas Ilmu Pendidikan',
  },
  {
    nama: 'Pendidikan Anak Usia Dini',
    fakultas: 'Fakultas Ilmu Pendidikan',
  },
  {
    nama: 'Pendidikan Bahasa dan Sastra Indonesia',
    fakultas: 'Fakultas Bahasa dan Seni',
  },
  {
    nama: 'Pendidikan Bahasa Inggris',
    fakultas: 'Fakultas Bahasa dan Seni',
  },
  {
    nama: 'Pendidikan Matematika',
    fakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
  },
  {
    nama: 'Pendidikan Biologi',
    fakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
  },
];

const initialData: ProdiItem[] = [
  {
    id: 1,
    kodeProdi: '01',
    namaProdi: 'Pendidikan Guru Sekolah Dasar',
    jurusan: 'Pendidikan Guru Sekolah Dasar',
    fakultas: 'Fakultas Ilmu Pendidikan',
    jenjang: 'SD',
    status: 'Aktif',
  },
  {
    id: 2,
    kodeProdi: '02',
    namaProdi: 'Pendidikan Anak Usia Dini',
    jurusan: 'Pendidikan Anak Usia Dini',
    fakultas: 'Fakultas Ilmu Pendidikan',
    jenjang: 'SD',
    status: 'Aktif',
  },
  {
    id: 3,
    kodeProdi: '03',
    namaProdi: 'Pendidikan Bahasa Indonesia',
    jurusan: 'Pendidikan Bahasa dan Sastra Indonesia',
    fakultas: 'Fakultas Bahasa dan Seni',
    jenjang: 'SMA',
    status: 'Aktif',
  },
  {
    id: 4,
    kodeProdi: '04',
    namaProdi: 'Pendidikan Bahasa Inggris',
    jurusan: 'Pendidikan Bahasa Inggris',
    fakultas: 'Fakultas Bahasa dan Seni',
    jenjang: 'SMA',
    status: 'Aktif',
  },
  {
    id: 5,
    kodeProdi: '05',
    namaProdi: 'Pendidikan Matematika',
    jurusan: 'Pendidikan Matematika',
    fakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
    jenjang: 'SMA',
    status: 'Aktif',
  },
  {
    id: 6,
    kodeProdi: '06',
    namaProdi: 'Pendidikan Biologi',
    jurusan: 'Pendidikan Biologi',
    fakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
    jenjang: 'SMA',
    status: 'Tidak Aktif',
  },
];

const emptyForm: ProdiForm = {
  namaProdi: '',
  jurusan: '',
  jenjang: '',
  status: 'Aktif',
};

const inputClass =
  'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]';

export default function Prodi() {
  const [data, setData] = useState<ProdiItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProdiForm>({ ...emptyForm });

  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);

  const pageSize = 10;

  const nextCode = String(
    Math.max(0, ...data.map((item) => Number(item.kodeProdi) || 0)) + 1,
  ).padStart(2, '0');

  const selectedJurusan = daftarJurusan.find(
    (item) => item.nama === form.jurusan,
  );

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      [
        item.kodeProdi,
        item.namaProdi,
        item.jurusan,
        item.fakultas,
        item.jenjang,
        item.status,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3000);
  }

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setModalOpen(true);
  }

  function openEdit(item: ProdiItem) {
    setEditingId(item.id);
    setForm({
      namaProdi: item.namaProdi,
      jurusan: item.jurusan,
      jenjang: item.jenjang,
      status: item.status,
    });
    setError('');
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const namaProdi = form.namaProdi.trim();

    if (!namaProdi || !form.jurusan || !form.jenjang) {
      setError('Semua data wajib diisi.');
      return;
    }

    const fakultas =
      selectedJurusan?.fakultas ??
      data.find((item) => item.id === editingId)?.fakultas ??
      '';

    if (!fakultas) {
      setError('Fakultas tidak ditemukan. Silakan pilih kembali jurusan.');
      return;
    }

    const duplicate = data.some(
      (item) =>
        item.id !== editingId &&
        item.namaProdi.toLowerCase() === namaProdi.toLowerCase() &&
        item.jurusan === form.jurusan,
    );

    if (duplicate) {
      setError('Nama prodi sudah terdaftar pada jurusan ini.');
      return;
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                namaProdi,
                jurusan: form.jurusan,
                fakultas,
                jenjang: form.jenjang as Jenjang,
                status: form.status,
              }
            : item,
        ),
      );

      showNotice('Data prodi berhasil diperbarui.');
    } else {
      setData((current) => [
        ...current,
        {
          id: Date.now(),
          kodeProdi: nextCode,
          namaProdi,
          jurusan: form.jurusan,
          fakultas,
          jenjang: form.jenjang as Jenjang,
          status: form.status,
        },
      ]);

      setPage(1);
      showNotice('Data prodi berhasil ditambahkan.');
    }

    closeModal();
  }

  function deleteData(id: number) {
    const confirmed = window.confirm('Yakin ingin menghapus data prodi ini?');

    if (!confirmed) return;

    setData((current) => current.filter((item) => item.id !== id));
    setPage(1);
    showNotice('Data prodi berhasil dihapus.');
  }

  function handleSync() {
    if (syncing) return;

    setSyncing(true);
    setSearch('');
    setPage(1);

    window.setTimeout(() => {
      setSyncing(false);
      showNotice('Data prodi berhasil disinkronkan.');
    }, 700);
  }

  return (
    <div className="space-y-5">
      {/* PENCARIAN DAN AKSI */}
      <div className="rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
        <div className="px-5 pb-3 pt-4">
          <h2 className="text-[13px] font-bold text-[#172943]">
            Data Program Studi
          </h2>

          <p className="mt-1 text-[11px] text-[#71819B]">
            Cari data prodi berdasarkan kode, nama prodi, jurusan, atau
            fakultas.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-4">
          <div className="flex h-9 w-full max-w-[520px] min-w-0 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
            <Search size={15} className="shrink-0 text-[#8EA3C0]" />

            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari kode, nama prodi, jurusan, atau fakultas..."
              className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-3.5 text-[10px] font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={15} />
              Tambah Data
            </button>

            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              title="Sinkronisasi data"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] hover:bg-[#EEF4FF] disabled:opacity-50"
            >
              <RefreshCw size={15} className={syncing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* TABEL PRODI */}
      <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse text-left">
            <thead>
              <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF] text-[9px] font-bold text-[#52627A]">
                <th className="w-[7%] px-3 py-3 text-center">NO.</th>
                <th className="w-[11%] px-3 py-3">KODE PRODI</th>
                <th className="w-[18%] px-3 py-3">PRODI</th>
                <th className="w-[17%] px-3 py-3">JURUSAN</th>
                <th className="w-[21%] px-3 py-3">FAKULTAS</th>
                <th className="w-[9%] px-3 py-3 text-center">JENJANG</th>
                <th className="w-[9%] px-3 py-3 text-center">STATUS</th>
                <th className="w-[8%] px-3 py-3 text-center">AKSI</th>
              </tr>
            </thead>

            <tbody>
              {visibleData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-[#EDF1F7] hover:bg-[#FCFDFF]"
                >
                  <td className="px-3 py-4 text-center text-[10px] text-[#465670]">
                    {(safePage - 1) * pageSize + index + 1}
                  </td>

                  <td className="px-3 py-4 text-[10px] font-semibold text-[#465670]">
                    {item.kodeProdi}
                  </td>

                  <td className="px-3 py-4 text-[10px] font-semibold text-[#273750]">
                    {item.namaProdi}
                  </td>

                  <td className="px-3 py-4 text-[10px] text-[#465670]">
                    {item.jurusan}
                  </td>

                  <td className="px-3 py-4 text-[10px] text-[#465670]">
                    {item.fakultas}
                  </td>

                  <td className="px-3 py-4 text-center">
                    <span className="inline-flex items-center rounded-full bg-[#E7F0FC] px-2.5 py-1 text-[9px] font-semibold text-[#3569F6]">
                      {item.jenjang}
                    </span>
                  </td>

                  <td className="px-3 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        item.status === 'Aktif'
                          ? 'bg-[#E7F8EE] text-[#239653]'
                          : 'bg-[#FDECEC] text-[#DC4545]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-2 py-3">
                    <div className="flex justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        title="Edit prodi"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-[#EEF4FF]"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteData(item.id)}
                        title="Hapus prodi"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-[#FFB8B8] text-[#FF3333] hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {visibleData.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                  >
                    Tidak ada data prodi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between gap-3 border-t border-[#E8EEF7] px-4 py-3">
          <p className="text-[10px] text-[#8291A8]">
            Menampilkan{' '}
            {filteredData.length ? (safePage - 1) * pageSize + 1 : 0}–
            {Math.min(safePage * pageSize, filteredData.length)} dari{' '}
            {filteredData.length} prodi
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setPage((current) => current - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] text-[#71819B] disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[10px] font-semibold ${
                    safePage === number
                      ? 'bg-[#3569F6] text-white'
                      : 'border border-[#DCE5F1] text-[#71819B]'
                  }`}
                >
                  {number}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] text-[#71819B] disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* NOTIFIKASI */}
      {notice && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-lg"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[#24334D]">
              Informasi
            </p>

            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              {notice}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotice('')}
            className="text-[#52627A]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* MODAL TAMBAH DAN EDIT */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/45 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null ? 'Edit Data Prodi' : 'Tambah Data Prodi'}
                </h2>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Lengkapi informasi program studi.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={saveData}>
              <div className="px-5 py-4 sm:px-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="kode-prodi"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Kode Prodi <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="kode-prodi"
                      type="text"
                      value={
                        editingId !== null
                          ? (data.find((item) => item.id === editingId)
                              ?.kodeProdi ?? '')
                          : nextCode
                      }
                      readOnly
                      className={`${inputClass} cursor-not-allowed bg-[#F1F5F9]`}
                    />

                    <p className="mt-1 text-[9px] text-[#8291A8]">
                      Kode dibuat otomatis oleh sistem.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="nama-prodi"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Nama Prodi <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="nama-prodi"
                      type="text"
                      required
                      value={form.namaProdi}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          namaProdi: event.target.value,
                        }))
                      }
                      placeholder="Masukkan nama prodi"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="jurusan-prodi"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Jurusan <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="jurusan-prodi"
                      required
                      value={form.jurusan}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          jurusan: event.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="">Pilih Jurusan</option>

                      {daftarJurusan.map((item) => (
                        <option key={item.nama} value={item.nama}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="fakultas-prodi"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Fakultas
                    </label>

                    <input
                      id="fakultas-prodi"
                      type="text"
                      readOnly
                      value={
                        selectedJurusan?.fakultas ??
                        (editingId !== null
                          ? (data.find((item) => item.id === editingId)
                              ?.fakultas ?? '')
                          : '')
                      }
                      placeholder="Fakultas akan terisi otomatis"
                      className={`${inputClass} cursor-not-allowed bg-[#F1F5F9]`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="jenjang-prodi"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Jenjang <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="jenjang-prodi"
                      required
                      value={form.jenjang}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          jenjang: event.target.value as Jenjang | '',
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="">Pilih Jenjang</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="SMK">SMK</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="status-prodi"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Status <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="status-prodi"
                      required
                      value={form.status}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          status: event.target.value as Status,
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[10px] text-red-600">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 border-t border-[#E8EEF7] bg-white px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-9 rounded-md border border-[#DCE5F1] px-4 text-[10px] font-semibold text-[#52627A] hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white hover:bg-blue-700"
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
