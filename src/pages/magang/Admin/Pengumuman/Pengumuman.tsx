import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Paperclip,
  Info,
  Check,
  FileText,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Upload,
} from 'lucide-react';

type StatusPengumuman = 'Dipublikasikan' | 'Draf';

type PengumumanItem = {
  id: number;
  judul: string;
  isi: string;
  lampiran: string;
  lampiranUrl?: string;
  status: StatusPengumuman;
};

const initialData: PengumumanItem[] = [
  {
    id: 1,
    judul: 'Pengumuman Dummy',
    isi: 'Informasi pelaksanaan program Magang bagi mahasiswa.',
    lampiran: 'panduan_magang_2026.pdf',
    status: 'Dipublikasikan',
  },
  {
    id: 2,
    judul: 'Jadwal Pembekalan Magang',
    isi: 'Informasi jadwal dan ketentuan pembekalan sebelum pelaksanaan Magang.',
    lampiran: 'jadwal_pembekalan.pdf',
    status: 'Dipublikasikan',
  },
  {
    id: 3,
    judul: 'Kelengkapan Dokumen Magang',
    isi: 'Mahasiswa diminta melengkapi dokumen sesuai ketentuan program.',
    lampiran: 'daftar_dokumen.pdf',
    status: 'Dipublikasikan',
  },
  {
    id: 4,
    judul: 'Pengingat Pengumpulan Laporan',
    isi: 'Pengingat pengumpulan laporan akhir sesuai jadwal yang ditetapkan.',
    lampiran: '',
    status: 'Draf',
  },
  {
    id: 5,
    judul: 'Informasi Perubahan Jadwal',
    isi: 'Informasi perubahan jadwal kegiatan Magang.',
    lampiran: '',
    status: 'Draf',
  },
];

const emptyForm = {
  judul: '',
  isi: '',
  lampiran: '',
  lampiranUrl: '',
  status: 'Draf' as StatusPengumuman,
};

export default function Pengumuman() {
  const [data, setData] = useState<PengumumanItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState<PengumumanItem | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [lampiranFile, setLampiranFile] = useState<File | null>(null);
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const pageSize = 4;

  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(null), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return data.filter((item) => {
      const cocokSearch =
        !keyword ||
        `${item.judul} ${item.isi} ${item.lampiran}`
          .toLowerCase()
          .includes(keyword);
      return cocokSearch;
    });
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function bukaTambah() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setLampiranFile(null);
    setModalOpen(true);
  }

  function bukaEdit(item: PengumumanItem) {
    setEditingId(item.id);
    setForm({
      judul: item.judul,
      isi: item.isi,
      lampiran: item.lampiran,
      lampiranUrl: item.lampiranUrl ?? '',
      status: item.status,
    });
    setLampiranFile(null);
    setModalOpen(true);
  }

  function simpanData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lampiranNama = lampiranFile ? lampiranFile.name : form.lampiran;
    const formUntukSimpan = { ...form, lampiran: lampiranNama };
    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...formUntukSimpan } : item,
        ),
      );
      setNotice({
        title: 'Perubahan berhasil disimpan',
        message: 'Informasi pengumuman berhasil diperbarui.',
      });
    } else {
      setData((current) => [
        { id: Date.now(), ...formUntukSimpan },
        ...current,
      ]);
      setPage(1);
      setNotice({
        title: 'Pengumuman berhasil ditambahkan',
        message: 'Pengumuman baru berhasil disimpan.',
      });
    }
    setModalOpen(false);
  }

  function hapusData(item: PengumumanItem) {
    if (!window.confirm(`Yakin ingin menghapus pengumuman "${item.judul}"?`))
      return;
    setData((current) => current.filter((row) => row.id !== item.id));
    setPage(1);
    setNotice({
      title: 'Pengumuman berhasil dihapus',
      message: 'Data pengumuman telah dihapus dari daftar.',
    });
  }

  function sinkronisasi() {
    setSearch('');
    setPage(1);
    setNotice({
      title: 'Sinkronisasi berhasil',
      message: 'Daftar pengumuman berhasil diperbarui.',
    });
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-20 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
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
            aria-label="Tutup pemberitahuan"
            className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Pengumuman
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B] sm:text-[13px]">
            Kelola informasi dan pengumuman yang ditampilkan kepada pengguna.
          </p>
        </header>

        <div className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={17} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <p className="text-[10px] font-bold tracking-wide text-[#3569F6]">
              INFORMASI
            </p>
            <p className="mt-1 text-[11px] leading-5 text-[#354660]">
              Tambahkan pengumuman agar informasi kegiatan Magang dapat
              diketahui pengguna. Lengkapi judul, isi, dan lampiran bila
              diperlukan.
            </p>
          </div>
        </div>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[13px] font-bold text-[#172943]">
                Data Pengumuman
              </h2>
              <p className="mt-1 text-[10px] text-[#8291A8]">
                Daftar pengumuman yang telah dibuat dan dipublikasikan.
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
                placeholder="Cari judul pengumuman atau lampiran..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <button
                type="button"
                onClick={bukaTambah}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[12px] font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={14} />
                Tambah Pengumuman
              </button>
              <button
                type="button"
                onClick={sinkronisasi}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] transition hover:bg-blue-50 hover:text-blue-600"
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
                <tr className="border-b border-[#D7E4FA] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'JUDUL PENGUMUMAN',
                    'LAMPIRAN',
                    'STATUS',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-4 text-[9px] font-bold tracking-wide text-[#8291A8]"
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
                    <td className="px-4 py-4 text-[10px] text-[#52627A]">
                      {(safePage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <p className="max-w-[240px] text-[10px] font-bold leading-4 text-[#273750]">
                        {item.judul}
                      </p>
                      <p className="mt-1 line-clamp-2 max-w-[280px] text-[9px] leading-4 text-[#8291A8]">
                        {item.isi}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      {item.lampiran ? (
                        <div className="flex items-center gap-2 text-[9px] text-[#52627A]">
                          <Paperclip size={12} className="shrink-0" />
                          <span className="max-w-[150px] truncate">
                            {item.lampiran}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[9px] text-[#A0AEC0]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-center text-[9px] font-medium ${
                          item.status === 'Dipublikasikan'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-[#D5DDF0] bg-[#EEF2FF] text-[#5969A6]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewItem(item)}
                          title="Lihat pengumuman"
                          aria-label={`Lihat ${item.judul}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => bukaEdit(item)}
                          title="Edit pengumuman"
                          aria-label={`Edit ${item.judul}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => hapusData(item)}
                          title="Hapus pengumuman"
                          aria-label={`Hapus ${item.judul}`}
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
                      colSpan={6}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada pengumuman yang sesuai dengan pencarian.
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
              {filteredData.length} pengumuman
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] disabled:opacity-40"
                aria-label="Halaman sebelumnya"
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
                        : 'border-[#B8CCFF] text-[#61718A] hover:bg-blue-50'
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
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] disabled:opacity-40"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {viewItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setViewItem(null);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-xl border border-[#B8CCFF] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  Detail Pengumuman
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Informasi lengkap pengumuman.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewItem(null)}
                aria-label="Tutup detail"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-lg border border-[#B8CCFF] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-medium ${
                      viewItem.status === 'Dipublikasikan'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-[#D5DDF0] bg-[#EEF2FF] text-[#5969A6]'
                    }`}
                  >
                    {viewItem.status}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-[#8291A8]"></span>
                </div>
                <h3 className="mt-3 text-[13px] font-bold text-[#273750]">
                  {viewItem.judul}
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-[11px] leading-5 text-[#52627A]">
                  {viewItem.isi}
                </p>
                {viewItem.lampiran &&
                  (viewItem.lampiranUrl ? (
                    <a
                      href={viewItem.lampiranUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 flex w-full items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#F9FBFE] p-2 text-left text-[10px] text-[#3569F6] transition hover:bg-blue-50"
                      title="Buka lampiran"
                    >
                      <Paperclip size={13} className="shrink-0" />
                      <span className="min-w-0 flex-1 truncate underline underline-offset-2">
                        {viewItem.lampiran}
                      </span>
                      <span className="shrink-0 text-[9px] font-semibold">
                        Buka lampiran
                      </span>
                    </a>
                  ) : (
                    <div className="mt-3 flex w-full items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#F9FBFE] p-2 text-left text-[10px] text-[#8291A8]">
                      <Paperclip size={13} className="shrink-0" />
                      <span className="min-w-0 flex-1 truncate">
                        {viewItem.lampiran}
                      </span>
                      <span className="shrink-0 text-[9px]">
                        File belum tersedia
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-end border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3">
              <button
                type="button"
                onClick={() => setViewItem(null)}
                className="h-9 rounded-md border border-[#B8CCFF] px-4 text-[11px] font-semibold text-[#52627A] hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[900px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {editingId !== null
                    ? 'Buat dan kelola informasi pengumuman untuk pengguna Sistem Pembelajaran Luar Kampus.'
                    : 'Buat dan kelola informasi pengumuman untuk pengguna Sistem Pembelajaran Luar Kampus.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Tutup formulir"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={simpanData} className="space-y-4 px-5 py-4">
              <section>
                <div className="mb-3 flex items-center gap-2 border-b border-[#E8EEF7] pb-2">
                  <FileText size={13} className="text-[#3569F6]" />
                  <h3 className="text-[10px] font-bold tracking-wide text-[#68758C]">
                    INFORMASI PENGUMUMAN
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
                  <label className="block text-[10px] font-semibold text-[#273750]">
                    Judul Pengumuman <span className="text-red-500">*</span>
                    <input
                      required
                      value={form.judul}
                      onChange={(event) =>
                        setForm({ ...form, judul: event.target.value })
                      }
                      className="mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] font-normal text-[#354760] outline-none focus:border-[#3569F6]"
                      placeholder="Masukkan judul pengumuman..."
                    />
                  </label>

                  <label className="block text-[10px] font-semibold text-[#273750]">
                    Status <span className="text-red-500">*</span>
                    <select
                      required
                      value={form.status}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          status: event.target.value as StatusPengumuman,
                        })
                      }
                      className="mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] font-normal text-[#354760] outline-none focus:border-[#3569F6]"
                    >
                      <option value="Draf">Draf</option>
                      <option value="Dipublikasikan">Dipublikasikan</option>
                    </select>
                  </label>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-[10px] font-semibold text-[#273750]">
                      Isi Pengumuman <span className="text-red-500">*</span>
                    </label>
                    <div className="overflow-hidden rounded-md border border-[#DCE5F1] focus-within:border-[#3569F6]">
                      <div className="flex min-h-9 flex-wrap items-center gap-1 border-b border-[#DCE5F1] bg-[#EEF3FF] px-2 py-1">
                        {[
                          { label: 'Bold', Icon: Bold },
                          { label: 'Italic', Icon: Italic },
                          { label: 'Underline', Icon: Underline },
                          { label: 'Rata kiri', Icon: AlignLeft },
                          { label: 'Rata tengah', Icon: AlignCenter },
                          { label: 'Rata kanan', Icon: AlignRight },
                          { label: 'Daftar', Icon: List },
                          { label: 'Daftar bernomor', Icon: ListOrdered },
                          { label: 'Urungkan', Icon: Undo2 },
                          { label: 'Ulangi', Icon: Redo2 },
                        ].map(({ label, Icon }) => (
                          <button
                            key={label}
                            type="button"
                            title={label}
                            aria-label={label}
                            className="flex h-7 w-7 items-center justify-center rounded text-[#52627A] hover:bg-white hover:text-[#3569F6]"
                          >
                            <Icon size={13} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        required
                        rows={7}
                        value={form.isi}
                        onChange={(event) =>
                          setForm({ ...form, isi: event.target.value })
                        }
                        className="block min-h-[155px] w-full resize-y border-0 bg-white px-3 py-3 text-[12px] leading-5 text-[#354760] outline-none"
                        placeholder="Tuliskan rincian dan deskripsi lengkap pengumuman di sini..."
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="border-t border-[#E8EEF7] pt-3">
                <div className="mb-3 flex items-center gap-2">
                  <Paperclip size={13} className="text-[#3569F6]" />
                  <h3 className="text-[10px] font-bold tracking-wide text-[#68758C]">
                    LAMPIRAN
                  </h3>
                </div>

                <label className="block text-[10px] font-medium text-[#273750]">
                  Gambar / Berkas Pengumuman
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#DCE5F1] bg-white px-3 text-[10px] font-medium text-[#354760] hover:bg-[#F4F7FC]">
                      <Upload size={12} />
                      Pilih berkas
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          setLampiranFile(file);
                          if (file) setForm({ ...form, lampiran: file.name });
                        }}
                      />
                    </label>
                    <span
                      className={`max-w-full truncate text-[10px] italic ${lampiranFile || form.lampiran ? 'text-[#52627A] not-italic' : 'text-[#9AA6B7]'}`}
                    >
                      {lampiranFile?.name ??
                        form.lampiran ??
                        'Belum ada berkas yang dipilih'}
                    </span>
                    {(lampiranFile || form.lampiran) && (
                      <button
                        type="button"
                        onClick={() => {
                          setLampiranFile(null);
                          setForm({ ...form, lampiran: '' });
                        }}
                        className="text-[10px] font-medium text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </label>
                <p className="mt-2 text-[9px] leading-4 text-[#71819B]">
                  Format yang didukung: JPG, PNG, PDF, DOC, dan DOCX (maksimal 5
                  MB).
                </p>
              </section>

              <div className="sticky bottom-0 flex justify-end gap-2 border-t border-[#E8EEF7] bg-white pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
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
