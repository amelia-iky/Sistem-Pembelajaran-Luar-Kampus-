import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  RefreshCw,
} from 'lucide-react';

type RunningTextItem = {
  id: number;
  tanggalDisimpan: string;
  isi: string;
  mulaiTayang: string;
  selesaiTayang: string;
};

type FormData = {
  isi: string;
  mulaiTayang: string;
  selesaiTayang: string;
};

const initialData: RunningTextItem[] = [
  {
    id: 1,
    tanggalDisimpan: '31 Oktober 2026, 13.20',
    isi: 'Selamat datang di Sistem Pembelajaran Luar Kampus. Silakan periksa informasi dan pengumuman terbaru terkait pelaksanaan kegiatan KKN.',
    mulaiTayang: '2026-10-31T08:00',
    selesaiTayang: '2026-11-10T23:59',
  },
  {
    id: 2,
    tanggalDisimpan: '30 Oktober 2026, 10.15',
    isi: 'Mahasiswa peserta KKN diharapkan segera melengkapi dokumen persyaratan sesuai dengan ketentuan yang berlaku.',
    mulaiTayang: '2026-11-01T08:00',
    selesaiTayang: '2026-11-15T23:59',
  },
  {
    id: 3,
    tanggalDisimpan: '29 Oktober 2026, 08.30',
    isi: 'Pastikan selalu memantau informasi terbaru mengenai jadwal dan tahapan pelaksanaan kegiatan KKN melalui sistem.',
    mulaiTayang: '2026-11-05T08:00',
    selesaiTayang: '2026-11-20T23:59',
  },
];

const emptyForm: FormData = {
  isi: '',
  mulaiTayang: '',
  selesaiTayang: '',
};

const formatTanggalDisimpan = () =>
  new Date()
    .toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(' pukul ', ', ');

const formatTanggalTayang = (value: string) => {
  if (!value) return '-';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export default function RunningText() {
  const [data, setData] = useState<RunningTextItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<FormData>({ ...emptyForm });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const pageSize = 10;

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice('');
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter(
      (item) =>
        !keyword ||
        `${item.isi} ${item.tanggalDisimpan} ${item.mulaiTayang} ${item.selesaiTayang}`
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

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setModalOpen(true);
  }

  function openEdit(item: RunningTextItem) {
    setEditingId(item.id);

    setForm({
      isi: item.isi,
      mulaiTayang: item.mulaiTayang,
      selesaiTayang: item.selesaiTayang,
    });

    setError('');
    setModalOpen(true);
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.isi.trim()) {
      setError('Isi running text wajib diisi.');
      return;
    }

    if (!form.mulaiTayang || !form.selesaiTayang) {
      setError('Tanggal mulai dan selesai tayang wajib diisi.');
      return;
    }

    if (
      new Date(form.selesaiTayang).getTime() <=
      new Date(form.mulaiTayang).getTime()
    ) {
      setError('Waktu selesai tayang harus setelah waktu mulai tayang.');
      return;
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                isi: form.isi.trim(),
                mulaiTayang: form.mulaiTayang,
                selesaiTayang: form.selesaiTayang,
              }
            : item,
        ),
      );

      setNotice('Running text berhasil diperbarui.');
    } else {
      const newItem: RunningTextItem = {
        id: Date.now(),
        tanggalDisimpan: formatTanggalDisimpan(),
        isi: form.isi.trim(),
        mulaiTayang: form.mulaiTayang,
        selesaiTayang: form.selesaiTayang,
      };

      setData((current) => [newItem, ...current]);
      setPage(1);
      setNotice('Running text berhasil ditambahkan.');
    }

    setModalOpen(false);
    setForm({ ...emptyForm });
    setError('');
  }

  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus running text ini?',
    );

    if (!confirmed) return;

    setData((current) => current.filter((item) => item.id !== id));
    setPage(1);
    setNotice('Running text berhasil dihapus.');
  }

  function refreshData() {
    setSearch('');
    setPage(1);
    setNotice('Data running text berhasil diperbarui.');
  }

  const inputClass =
    'mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]';

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL HALAMAN */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Running Text
          </h1>

          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola informasi berjalan yang ditampilkan pada halaman sistem.
          </p>
        </div>

        {/* CARD DATA RUNNING TEXT */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="px-4 pb-3 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Running Text
            </h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan kelola data running text yang akan ditampilkan pada
              sistem.
            </p>
          </div>

          <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari isi running text..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white transition hover:bg-blue-700 sm:flex-none"
              >
                <Plus size={15} />
                Tambah Running Text
              </button>

              <button
                type="button"
                onClick={refreshData}
                title="Refresh data"
                aria-label="Refresh data"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#8295B0] transition hover:bg-[#EEF4FF] hover:text-[#3569F6]"
              >
                <RefreshCw size={15} />
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

        {/* CARD DAFTAR RUNNING TEXT */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          {/* HEADER CARD */}
          <div className="px-4 pb-4 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Daftar Running Text
            </h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Total {filteredData.length} running text terdaftar
            </p>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF]">
                  <th className="w-[19%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    TANGGAL DISIMPAN
                  </th>

                  <th className="w-[37%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    ISI RUNNING TEXT
                  </th>

                  <th className="w-[15%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    MULAI TAYANG
                  </th>

                  <th className="w-[15%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    SELESAI TAYANG
                  </th>

                  <th className="w-[14%] px-4 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    AKSI
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleData.length > 0 ? (
                  visibleData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                    >
                      <td className="px-4 py-4 text-[10px] text-[#465670]">
                        {item.tanggalDisimpan}
                      </td>

                      <td className="px-4 py-4">
                        <p className="line-clamp-2 text-[10px] leading-[17px] text-[#354760]">
                          {item.isi}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-[10px] leading-4 text-[#465670]">
                        {formatTanggalTayang(item.mulaiTayang)}
                      </td>

                      <td className="px-4 py-4 text-[10px] leading-4 text-[#465670]">
                        {formatTanggalTayang(item.selesaiTayang)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            title="Edit running text"
                            aria-label="Edit running text"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteData(item.id)}
                            title="Hapus running text"
                            aria-label="Hapus running text"
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
                      colSpan={5}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada running text yang ditemukan.
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
              running text
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

      {/* MODAL TAMBAH / EDIT RUNNING TEXT */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-[600px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            {/* HEADER MODAL */}
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[14px] font-bold text-[#172943]">
                    {editingId !== null
                      ? 'Edit Running Text'
                      : 'Tambah Running Text'}
                  </h2>

                  {editingId !== null && (
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-medium text-[#3569F6]">
                      Mode Edit
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Atur isi informasi dan periode penayangan running text.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Tutup modal"
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            {/* FORM MODAL */}
            <form onSubmit={saveData} className="space-y-4 px-5 py-5">
              <div>
                <label
                  htmlFor="isi-running-text"
                  className="mb-1.5 block text-[10px] font-semibold text-[#43536B]"
                >
                  Isi Running Text
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  id="isi-running-text"
                  required
                  rows={4}
                  value={form.isi}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isi: event.target.value,
                    }))
                  }
                  placeholder="Masukkan isi running text..."
                  className="w-full resize-y rounded-md border border-[#DCE5F1] bg-white px-3 py-2.5 text-[11px] leading-5 text-[#354760] outline-none placeholder:text-[#91A4BF] focus:border-[#3569F6]"
                />

                <p className="mt-1 text-[9px] text-[#9AA8BA]">
                  Pastikan informasi yang ditulis singkat, jelas, dan mudah
                  dipahami.
                </p>
              </div>

              <div>
                <label
                  htmlFor="mulai-tayang"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Mulai Tayang
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="mulai-tayang"
                  type="datetime-local"
                  required
                  value={form.mulaiTayang}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      mulaiTayang: event.target.value,
                    }))
                  }
                  className={inputClass}
                />

                <p className="mt-1 text-[9px] text-[#9AA8BA]">
                  Tentukan tanggal dan waktu mulai running text ditampilkan.
                </p>
              </div>

              <div>
                <label
                  htmlFor="selesai-tayang"
                  className="text-[10px] font-semibold text-[#43536B]"
                >
                  Selesai Tayang
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="selesai-tayang"
                  type="datetime-local"
                  required
                  min={form.mulaiTayang || undefined}
                  value={form.selesaiTayang}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      selesaiTayang: event.target.value,
                    }))
                  }
                  className={inputClass}
                />

                <p className="mt-1 text-[9px] text-[#9AA8BA]">
                  Tentukan tanggal dan waktu berakhirnya penayangan running
                  text.
                </p>
              </div>

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
                  Pastikan periode penayangan sudah sesuai sebelum menyimpan.
                </p>

                <div className="flex shrink-0 justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="h-8 rounded-md border border-[#DCE5F1] px-3 text-[10px] font-semibold text-[#52627A] transition hover:bg-slate-50"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Check size={13} />
                    {editingId !== null ? 'Simpan Perubahan' : 'Simpan'}
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
