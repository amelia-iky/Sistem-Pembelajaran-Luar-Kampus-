import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  X,
  Check,
  Lock,
  LockOpen,
  Camera,
  UserRound,
  GraduationCap,
  Hash,
  Building2,
  BookOpen,
  Mail,
} from 'lucide-react';

type MahasiswaItem = {
  id: number;
  nama: string;
  nim: string;
  email: string;
  programStudi: string;
  jurusan: string;
  fakultas: string;
  terkunci: boolean;
  foto: string;
};

type FormData = {
  nama: string;
  nim: string;
  email: string;
  programStudi: string;
  jurusan: string;
  fakultas: string;
  terkunci: boolean;
  foto: string;
};

const initialData: MahasiswaItem[] = [
  {
    id: 1,
    nama: 'Amelia Rizky Yuniar',
    nim: '2215101001',
    email: 'amelia@example.com',
    programStudi: 'Sistem Informasi',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
    terkunci: false,
    foto: '',
  },
  {
    id: 2,
    nama: 'I Made Aditya Pratama',
    nim: '2215101002',
    email: 'aditya@example.com',
    programStudi: 'Sistem Informasi',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
    terkunci: true,
    foto: '',
  },
  {
    id: 3,
    nama: 'Ni Putu Ayu Lestari',
    nim: '2215101003',
    email: 'ayu@example.com',
    programStudi: 'Sistem Informasi',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
    terkunci: false,
    foto: '',
  },
  {
    id: 4,
    nama: 'I Kadek Dwi Saputra',
    nim: '2215101004',
    email: 'kadek@example.com',
    programStudi: 'Sistem Informasi',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
    terkunci: true,
    foto: '',
  },
  {
    id: 5,
    nama: 'Ni Made Citra Dewi',
    nim: '2215101005',
    email: 'citra@example.com',
    programStudi: 'Pendidikan Teknik Informatika',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
    terkunci: false,
    foto: '',
  },
];

const emptyForm: FormData = {
  nama: '',
  nim: '',
  email: '',
  programStudi: '',
  jurusan: '',
  fakultas: '',
  terkunci: false,
  foto: '',
};

const getInitials = (nama: string) =>
  nama
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('') || 'M';

export default function DataMahasiswa() {
  const [data, setData] = useState<MahasiswaItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<MahasiswaItem | null>(null);

  const [form, setForm] = useState<FormData>({ ...emptyForm });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [syncing, setSyncing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const temporaryPhotoRef = useRef<string | null>(null);

  const pageSize = 10;

  const inputClass =
    'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none transition focus:border-[#3569F6]';

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    return () => {
      if (temporaryPhotoRef.current) {
        URL.revokeObjectURL(temporaryPhotoRef.current);
      }
    };
  }, []);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      const searchableText = [
        item.nama,
        item.nim,
        item.email,
        item.programStudi,
        item.jurusan,
        item.fakultas,
        item.terkunci
          ? 'terkunci sudah dikunci'
          : 'tidak terkunci belum dikunci',
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function openView(item: MahasiswaItem) {
    setSelectedData(item);
    setViewOpen(true);
  }

  function openEdit(item: MahasiswaItem) {
    setEditingId(item.id);

    setForm({
      nama: item.nama,
      nim: item.nim,
      email: item.email,
      programStudi: item.programStudi,
      jurusan: item.jurusan,
      fakultas: item.fakultas,
      terkunci: item.terkunci,
      foto: item.foto,
    });

    setError('');
    setEditOpen(true);
  }

  function closeEdit() {
    if (temporaryPhotoRef.current) {
      URL.revokeObjectURL(temporaryPhotoRef.current);
      temporaryPhotoRef.current = null;
    }

    setEditOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
  }

  function handlePhotoChange(file?: File) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran foto maksimal 5 MB.');
      return;
    }

    if (temporaryPhotoRef.current) {
      URL.revokeObjectURL(temporaryPhotoRef.current);
    }

    const photoUrl = URL.createObjectURL(file);
    temporaryPhotoRef.current = photoUrl;

    setForm((current) => ({
      ...current,
      foto: photoUrl,
    }));

    setError('');
  }

  function removePhoto() {
    if (temporaryPhotoRef.current) {
      URL.revokeObjectURL(temporaryPhotoRef.current);
      temporaryPhotoRef.current = null;
    }

    setForm((current) => ({
      ...current,
      foto: '',
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.nama.trim() ||
      !form.nim.trim() ||
      !form.email.trim() ||
      !form.programStudi.trim() ||
      !form.jurusan.trim() ||
      !form.fakultas.trim()
    ) {
      setError('Semua informasi mahasiswa wajib diisi.');
      return;
    }

    if (editingId === null) return;

    setData((current) =>
      current.map((item) =>
        item.id === editingId
          ? {
              ...item,
              nama: form.nama.trim(),
              nim: form.nim.trim(),
              email: form.email.trim(),
              programStudi: form.programStudi.trim(),
              jurusan: form.jurusan.trim(),
              fakultas: form.fakultas.trim(),
              terkunci: form.terkunci,
              foto: form.foto,
            }
          : item,
      ),
    );

    if (temporaryPhotoRef.current) {
      temporaryPhotoRef.current = null;
    }

    setEditOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setNotice('Data mahasiswa berhasil diperbarui.');
  }

  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus data mahasiswa ini?',
    );

    if (!confirmed) return;

    setData((current) => current.filter((item) => item.id !== id));
    setPage(1);
    setNotice('Data mahasiswa berhasil dihapus.');
  }

  function handleSync() {
    if (syncing) return;

    setSyncing(true);
    setSearch('');
    setPage(1);

    window.setTimeout(() => {
      setSyncing(false);
      setNotice('Proses sinkronisasi data mahasiswa selesai.');
    }, 1000);
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL HALAMAN */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Data Mahasiswa
          </h1>

          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola dan lihat data mahasiswa yang terdaftar pada sistem.
          </p>
        </div>

        {/* CARD DATA MAHASISWA */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="px-4 pb-3 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Mahasiswa
            </h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan sinkronkan data mahasiswa berdasarkan nama, NIM, program
              studi, jurusan, atau fakultas.
            </p>
          </div>

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
                placeholder="Cari nama mahasiswa, NIM, atau program studi..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                title="Sinkronisasi data mahasiswa"
                aria-label="Sinkronisasi data mahasiswa"
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

        {/* CARD DAFTAR MAHASISWA */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          {/* TABEL */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF]">
                  <th className="w-[5%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    NO.
                  </th>

                  <th className="w-[17%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    NAMA LENGKAP
                  </th>

                  <th className="w-[12%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    NIM
                  </th>

                  <th className="w-[17%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    PROGRAM STUDI
                  </th>

                  <th className="w-[14%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    JURUSAN
                  </th>

                  <th className="w-[14%] px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    FAKULTAS
                  </th>

                  <th className="w-[13%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    STATUS KUNCI SEMESTER
                  </th>

                  <th className="w-[8%] px-3 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
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

                      <td className="px-3 py-4 text-[10px] text-[#465670]">
                        {item.nim}
                      </td>

                      <td className="px-3 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.programStudi}
                      </td>

                      <td className="px-3 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.jurusan}
                      </td>

                      <td className="px-3 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.fakultas}
                      </td>

                      <td className="px-3 py-4 text-center">
                        {item.terkunci ? (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-semibold text-red-600">
                            <Lock size={11} />
                            Terkunci
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600">
                            <LockOpen size={11} />
                            Tidak Dikunci
                          </span>
                        )}
                      </td>

                      {/* AKSI */}
                      <td className="px-3 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openView(item)}
                            title="Lihat mahasiswa"
                            aria-label="Lihat mahasiswa"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            title="Edit mahasiswa"
                            aria-label="Edit mahasiswa"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteData(item.id)}
                            title="Hapus mahasiswa"
                            aria-label="Hapus mahasiswa"
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
                      colSpan={8}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada data mahasiswa yang sesuai dengan pencarian.
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
              mahasiswa
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

      {/* MODAL LIHAT DETAIL MAHASISWA */}
      {viewOpen && selectedData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewOpen(false);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  Detail Mahasiswa
                </h2>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Informasi lengkap data mahasiswa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewOpen(false)}
                aria-label="Tutup detail"
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5">
              {/* FOTO DAN IDENTITAS */}
              <div className="flex flex-col items-center rounded-xl border border-[#E5ECF5] bg-[#F8FAFD] px-4 py-5">
                {selectedData.foto ? (
                  <img
                    src={selectedData.foto}
                    alt={`Foto ${selectedData.nama}`}
                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#E7F0FC] text-[25px] font-bold text-[#3569F6] shadow-md">
                    {getInitials(selectedData.nama)}
                  </div>
                )}

                <h3 className="mt-3 text-[14px] font-bold text-[#24334D]">
                  {selectedData.nama}
                </h3>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  NIM {selectedData.nim}
                </p>

                <div className="mt-3">
                  {selectedData.terkunci ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600">
                      <Lock size={12} />
                      Semester Terkunci
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-600">
                      <LockOpen size={12} />
                      Semester Tidak Dikunci
                    </span>
                  )}
                </div>
              </div>

              {/* INFORMASI MAHASISWA */}
              <div>
                <h3 className="mb-3 text-[11px] font-bold text-[#273750]">
                  Informasi Mahasiswa
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3569F6]">
                      <UserRound size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#8291A8]">Nama Lengkap</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#354760]">
                        {selectedData.nama}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3569F6]">
                      <Hash size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#8291A8]">NIM</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#354760]">
                        {selectedData.nim}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3569F6]">
                      <Mail size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#8291A8]">Email</p>
                      <p className="mt-1 break-all text-[11px] font-semibold text-[#354760]">
                        {selectedData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3569F6]">
                      <GraduationCap size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#8291A8]">Program Studi</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#354760]">
                        {selectedData.programStudi}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3569F6]">
                      <BookOpen size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#8291A8]">Jurusan</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#354760]">
                        {selectedData.jurusan}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3569F6]">
                      <Building2 size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-[#8291A8]">Fakultas</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#354760]">
                        {selectedData.fakultas}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div className="rounded-lg border border-[#E5ECF5] p-3">
                <p className="text-[10px] font-semibold text-[#43536B]">
                  Status Kunci Semester
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {selectedData.terkunci ? (
                    <>
                      <Lock size={15} className="text-red-500" />
                      <span className="text-[11px] font-semibold text-red-600">
                        Terkunci
                      </span>
                    </>
                  ) : (
                    <>
                      <LockOpen size={15} className="text-emerald-600" />
                      <span className="text-[11px] font-semibold text-emerald-600">
                        Tidak Dikunci
                      </span>
                    </>
                  )}
                </div>

                <p className="mt-1.5 text-[9px] leading-4 text-[#8291A8]">
                  {selectedData.terkunci
                    ? 'Mahasiswa ditandai tidak dapat melakukan perubahan semester.'
                    : 'Mahasiswa ditandai masih dapat melakukan perubahan semester.'}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end border-t border-[#E8EEF7] px-5 py-3">
              <button
                type="button"
                onClick={() => setViewOpen(false)}
                className="h-9 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT MAHASISWA */}
      {editOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEdit();
            }
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[620px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[14px] font-bold text-[#172943]">
                    Edit Data Mahasiswa
                  </h2>

                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-medium text-[#3569F6]">
                    Mode Edit
                  </span>
                </div>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Perbarui informasi, foto, dan status kunci semester mahasiswa.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                aria-label="Tutup modal"
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            {/* FORM EDIT */}
            <form onSubmit={saveData} className="space-y-4 px-5 py-5">
              {/* FOTO MAHASISWA */}
              <div>
                <h3 className="mb-3 text-[11px] font-bold text-[#273750]">
                  Foto Mahasiswa
                </h3>

                <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[#B8CCFF] bg-[#F8FAFD] px-4 py-5 sm:flex-row sm:items-center">
                  {form.foto ? (
                    <img
                      src={form.foto}
                      alt="Preview foto mahasiswa"
                      className="h-20 w-20 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#E7F0FC] text-[21px] font-bold text-[#3569F6] shadow-sm">
                      {getInitials(form.nama)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <p className="text-[11px] font-semibold text-[#354760]">
                      Upload Foto Profil
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#8291A8]">
                      Pilih foto mahasiswa dengan format JPG, PNG, atau WEBP.
                      Ukuran maksimal 5 MB.
                    </p>

                    <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[9px] font-semibold text-white transition hover:bg-blue-700"
                      >
                        <Camera size={13} />
                        {form.foto ? 'Ganti Foto' : 'Pilih Foto'}
                      </button>

                      {form.foto && (
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="h-8 rounded-md border border-red-200 px-3 text-[9px] font-semibold text-red-500 transition hover:bg-red-50"
                        >
                          Hapus Foto
                        </button>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="hidden"
                      onChange={(event) =>
                        handlePhotoChange(event.target.files?.[0])
                      }
                    />
                  </div>
                </div>
              </div>

              {/* INFORMASI MAHASISWA */}
              <div>
                <h3 className="mb-3 text-[11px] font-bold text-[#273750]">
                  Informasi Mahasiswa
                </h3>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="nama-mahasiswa"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="nama-mahasiswa"
                      type="text"
                      required
                      value={form.nama}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          nama: event.target.value,
                        }))
                      }
                      placeholder="Masukkan nama lengkap mahasiswa"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nim-mahasiswa"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      NIM <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="nim-mahasiswa"
                      type="text"
                      required
                      value={form.nim}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          nim: event.target.value,
                        }))
                      }
                      placeholder="Masukkan NIM mahasiswa"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email-mahasiswa"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="email-mahasiswa"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="Masukkan email mahasiswa"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="program-studi"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Program Studi <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="program-studi"
                      type="text"
                      required
                      value={form.programStudi}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          programStudi: event.target.value,
                        }))
                      }
                      placeholder="Masukkan program studi"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="jurusan"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Jurusan <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="jurusan"
                      type="text"
                      required
                      value={form.jurusan}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          jurusan: event.target.value,
                        }))
                      }
                      placeholder="Masukkan jurusan"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="fakultas"
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      Fakultas <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="fakultas"
                      type="text"
                      required
                      value={form.fakultas}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          fakultas: event.target.value,
                        }))
                      }
                      placeholder="Masukkan fakultas"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* STATUS KUNCI SEMESTER */}
              <div className="rounded-lg border border-[#DCE5F1] bg-[#F8FAFD] p-4">
                <div className="mb-3">
                  <h3 className="text-[11px] font-bold text-[#273750]">
                    Pengaturan Kunci Semester
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-[#8291A8]">
                    Atur apakah mahasiswa diperbolehkan melakukan perubahan pada
                    aktivitas semester.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        form.terkunci
                          ? 'bg-red-50 text-red-500'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}
                    >
                      {form.terkunci ? (
                        <Lock size={19} />
                      ) : (
                        <LockOpen size={19} />
                      )}
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-[#354760]">
                        {form.terkunci
                          ? 'Semester Terkunci'
                          : 'Semester Tidak Dikunci'}
                      </p>

                      <p className="mt-1 text-[9px] leading-4 text-[#8291A8]">
                        {form.terkunci
                          ? 'Mahasiswa tidak dapat melakukan perubahan.'
                          : 'Mahasiswa masih dapat melakukan perubahan.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.terkunci}
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        terkunci: !current.terkunci,
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                      form.terkunci ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        form.terkunci ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div
                  className={`mt-3 rounded-md px-3 py-2 text-[9px] leading-4 ${
                    form.terkunci
                      ? 'border border-red-100 bg-red-50 text-red-600'
                      : 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {form.terkunci
                    ? 'Status terkunci aktif. Mahasiswa ditandai tidak dapat melakukan perubahan semester.'
                    : 'Status tidak dikunci aktif. Mahasiswa ditandai masih dapat melakukan perubahan semester.'}
                </div>
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
                  Pastikan data mahasiswa sudah sesuai sebelum disimpan.
                </p>

                <div className="flex shrink-0 justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeEdit}
                    className="h-9 rounded-md border border-[#DCE5F1] px-4 text-[10px] font-semibold text-[#52627A] transition hover:bg-slate-50"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Check size={13} />
                    Simpan Perubahan
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
