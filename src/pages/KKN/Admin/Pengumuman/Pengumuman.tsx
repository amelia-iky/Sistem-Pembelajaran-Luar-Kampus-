import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  RefreshCw,
  Paperclip,
  FileText,
  File as FileIcon,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Undo2,
  Redo2,
  ExternalLink,
} from 'lucide-react';

type Lampiran = {
  name: string;
  size: number;
  file: File;
  url: string;
};

type PengumumanItem = {
  id: number;
  tanggalDisimpan: string;
  judul: string;
  isi: string;
  lampiran: Lampiran | null;
};

type FormData = {
  judul: string;
  isi: string;
  lampiran: Lampiran | null;
};

const initialData: PengumumanItem[] = [
  {
    id: 1,
    tanggalDisimpan: '31 Oktober 2026, 13.20',
    judul: 'Buku Pedoman KKN 2026 – Undiksha',
    isi: 'Disampaikan kepada seluruh mahasiswa peserta Kuliah Kerja Nyata (KKN) Universitas Pendidikan Ganesha Tahun Akademik 2026, bahwa Buku Pedoman Pelaksanaan KKN telah resmi diterbitkan oleh LPPM Undiksha.\n\nHarap membaca dan memahami setiap petunjuk teknis serta tahapan penyusunan program kerja yang tercantum pada dokumen lampiran berikut.',
    lampiran: null,
  },
  {
    id: 2,
    tanggalDisimpan: '30 Oktober 2026, 10.15',
    judul: 'Informasi Pembekalan Peserta KKN',
    isi: 'Pembekalan peserta KKN akan dilaksanakan sebelum kegiatan penerjunan. Seluruh peserta diwajibkan mengikuti kegiatan pembekalan sesuai jadwal yang telah ditentukan.',
    lampiran: null,
  },
  {
    id: 3,
    tanggalDisimpan: '29 Oktober 2026, 08.30',
    judul: 'Jadwal Pelaksanaan KKN Periode 2026',
    isi: 'Pelaksanaan kegiatan KKN periode 2026 akan dilaksanakan sesuai kalender akademik. Informasi lebih lanjut mengenai jadwal dan lokasi penempatan akan disampaikan melalui sistem.',
    lampiran: null,
  },
];

const emptyForm: FormData = {
  judul: '',
  isi: '',
  lampiran: null,
};

const formatTanggal = () =>
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

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function Pengumuman() {
  const [data, setData] = useState<PengumumanItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<PengumumanItem | null>(null);

  const [form, setForm] = useState<FormData>({ ...emptyForm });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const pageSize = 10;

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter(
      (item) =>
        !keyword ||
        `${item.judul} ${item.tanggalDisimpan}`.toLowerCase().includes(keyword),
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
    setFormOpen(true);
  }

  function openEdit(item: PengumumanItem) {
    setEditingId(item.id);

    setForm({
      judul: item.judul,
      isi: item.isi,
      lampiran: item.lampiran,
    });

    setError('');
    setFormOpen(true);
  }

  function openView(item: PengumumanItem) {
    setSelectedData(item);
    setViewOpen(true);
  }

  function handleFile(file?: File) {
    if (!file) return;

    const extensionOk = /\.(pdf|docx?)$/i.test(file.name);

    if (!extensionOk) {
      setError('Format file harus PDF, DOC, atau DOCX.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran lampiran maksimal 10 MB.');
      return;
    }

    setForm((current) => ({
      ...current,
      lampiran: {
        name: file.name,
        size: file.size,
        file,
        url: URL.createObjectURL(file),
      },
    }));

    setError('');
  }

  function removeFile() {
    setForm((current) => ({
      ...current,
      lampiran: null,
    }));
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.judul.trim() || !form.isi.replace(/<[^>]*>/g, '').trim()) {
      setError('Judul dan isi pengumuman wajib diisi.');
      return;
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                judul: form.judul.trim(),
                isi: form.isi,
                lampiran: form.lampiran,
              }
            : item,
        ),
      );

      setNotice('Pengumuman berhasil diperbarui.');
    } else {
      const newItem: PengumumanItem = {
        id: Date.now(),
        tanggalDisimpan: formatTanggal(),
        judul: form.judul.trim(),
        isi: form.isi,
        lampiran: form.lampiran,
      };

      setData((current) => [newItem, ...current]);
      setPage(1);
      setNotice('Pengumuman berhasil ditambahkan.');
    }

    setFormOpen(false);
    setForm({ ...emptyForm });
    setError('');
  }

  function deleteData(id: number) {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus pengumuman ini?',
    );

    if (!confirmed) return;

    setData((current) => current.filter((item) => item.id !== id));
    setPage(1);
    setNotice('Pengumuman berhasil dihapus.');
  }

  function formatText(command: string, value?: string) {
    document.execCommand(command, false, value);
  }

  function refreshData() {
    setSearch('');
    setPage(1);
    setNotice('Daftar pengumuman berhasil diperbarui.');
  }

  const inputClass =
    'mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]';

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL HALAMAN */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Pengumuman KKN
          </h1>

          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola informasi dan pengumuman kegiatan KKN.
          </p>
        </div>

        {/* CARD DATA PENGUMUMAN */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="px-4 pb-3 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Pengumuman KKN
            </h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan kelola informasi pengumuman kegiatan KKN.
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
                placeholder="Cari tanggal atau judul pengumuman..."
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
                Tambah Pengumuman
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

        {/* CARD DAFTAR PENGUMUMAN */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          {/* HEADER CARD */}
          <div className="px-4 pb-4 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Daftar Pengumuman KKN
            </h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Total {filteredData.length} pengumuman terdaftar
            </p>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF]">
                  <th className="w-[25%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    TANGGAL DISIMPAN
                  </th>

                  <th className="px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    JUDUL PENGUMUMAN
                  </th>

                  <th className="w-[150px] px-4 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
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

                      <td className="px-4 py-4 text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.judul}
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => openView(item)}
                            title="Lihat pengumuman"
                            aria-label="Lihat pengumuman"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            title="Edit pengumuman"
                            aria-label="Edit pengumuman"
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteData(item.id)}
                            title="Hapus pengumuman"
                            aria-label="Hapus pengumuman"
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
                      Tidak ada pengumuman yang ditemukan.
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
              pengumuman
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

      {/* MODAL TAMBAH DAN EDIT */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setFormOpen(false);
            }
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[640px] overflow-y-auto rounded-lg border border-[#DCE5F1] bg-white shadow-2xl">
            {/* HEADER MODAL */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-4 py-3.5 sm:px-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[13px] font-bold text-[#172943]">
                    {editingId !== null
                      ? 'Edit Pengumuman'
                      : 'Tambah Pengumuman'}
                  </h2>

                  {editingId !== null && (
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-medium text-[#3569F6]">
                      Mode Edit
                    </span>
                  )}
                </div>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {editingId !== null
                    ? 'Perbarui judul, isi, dan lampiran pengumuman.'
                    : 'Lengkapi judul, isi, dan lampiran pengumuman.'}
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

            {/* FORM */}
            <form onSubmit={saveData} className="space-y-3.5 px-4 py-4 sm:px-5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="judul-pengumuman"
                    className="text-[10px] font-semibold text-[#43536B]"
                  >
                    Judul Pengumuman <span className="text-red-500">*</span>
                  </label>

                  <span className="text-[9px] text-[#9AA8BA]">
                    Maks. 250 karakter
                  </span>
                </div>

                <input
                  id="judul-pengumuman"
                  required
                  maxLength={250}
                  value={form.judul}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      judul: event.target.value,
                    }))
                  }
                  className={inputClass}
                  placeholder="Masukkan judul pengumuman"
                />
              </div>

              {/* ISI PENGUMUMAN */}
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold text-[#43536B]">
                  Isi Pengumuman <span className="text-red-500">*</span>
                </label>

                <div className="overflow-hidden rounded-md border border-[#DCE5F1] focus-within:border-[#3569F6]">
                  <div className="flex h-9 items-center gap-1 border-b border-[#DCE5F1] bg-[#F8FAFD] px-2">
                    {[
                      { icon: Bold, command: 'bold', title: 'Tebal' },
                      { icon: Italic, command: 'italic', title: 'Miring' },
                      {
                        icon: Underline,
                        command: 'underline',
                        title: 'Garis bawah',
                      },
                      {
                        icon: List,
                        command: 'insertUnorderedList',
                        title: 'Daftar bullet',
                      },
                      {
                        icon: ListOrdered,
                        command: 'insertOrderedList',
                        title: 'Daftar bernomor',
                      },
                    ].map(({ icon: Icon, command, title }) => (
                      <button
                        key={command}
                        type="button"
                        title={title}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => formatText(command)}
                        className="flex h-7 w-7 items-center justify-center rounded text-[#52627A] hover:bg-[#E8EEF7]"
                      >
                        <Icon size={14} />
                      </button>
                    ))}

                    <span className="mx-1 h-4 w-px bg-[#DCE5F1]" />

                    <button
                      type="button"
                      title="Tambah tautan"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        const url = window.prompt('Masukkan URL tautan:');
                        if (url) formatText('createLink', url);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded text-[#52627A] hover:bg-[#E8EEF7]"
                    >
                      <Link2 size={14} />
                    </button>

                    <button
                      type="button"
                      title="Urungkan"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => formatText('undo')}
                      className="flex h-7 w-7 items-center justify-center rounded text-[#52627A] hover:bg-[#E8EEF7]"
                    >
                      <Undo2 size={14} />
                    </button>

                    <button
                      type="button"
                      title="Ulangi"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => formatText('redo')}
                      className="flex h-7 w-7 items-center justify-center rounded text-[#52627A] hover:bg-[#E8EEF7]"
                    >
                      <Redo2 size={14} />
                    </button>
                  </div>

                  <div
                    key={editingId ?? 'new'}
                    contentEditable
                    suppressContentEditableWarning
                    role="textbox"
                    aria-multiline="true"
                    data-placeholder="Tuliskan isi pengumuman..."
                    onInput={(event) =>
                      setForm((current) => ({
                        ...current,
                        isi: event.currentTarget.innerHTML,
                      }))
                    }
                    dangerouslySetInnerHTML={{ __html: form.isi }}
                    className="min-h-[135px] px-3 py-2.5 text-[11px] leading-5 text-[#354760] outline-none [&_a]:text-blue-600 [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                  />
                </div>
              </div>

              {/* LAMPIRAN */}
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold text-[#43536B]">
                  Lampiran Pengumuman
                </label>

                {form.lampiran ? (
                  <div className="flex items-center gap-3 rounded-md border border-[#E5ECF5] bg-[#F8FAFD] px-3 py-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-500">
                      <FileText size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold text-[#354760]">
                        {form.lampiran.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#8291A8]">
                        File yang saat ini tersimpan •{' '}
                        {formatSize(form.lampiran.size)}
                      </p>
                    </div>

                    <a
                      href={form.lampiran.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-[9px] font-medium text-[#3569F6] hover:underline"
                    >
                      <ExternalLink size={12} />
                      Lihat file
                    </a>

                    <button
                      type="button"
                      onClick={removeFile}
                      title="Hapus lampiran"
                      className="ml-1 rounded p-1 text-red-500 hover:bg-red-50"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-md border border-dashed border-[#DCE5F1] bg-white px-3 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F1F5FB] text-[#8295B0]">
                      <FileIcon size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium text-[#52627A]">
                        Pilih file untuk lampiran pengumuman
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9AA8BA]">
                        PDF, DOC, DOCX • Maks. 10 MB
                      </p>
                    </div>

                    <label className="cursor-pointer rounded-md border border-[#DCE5F1] bg-white px-3 py-1.5 text-[9px] font-medium text-[#52627A] hover:bg-slate-50">
                      Pilih File
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(event) =>
                          handleFile(event.target.files?.[0])
                        }
                      />
                    </label>
                  </div>
                )}

                {form.lampiran && (
                  <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-[#DCE5F1] px-3 py-2 text-[9px] text-[#71819B] hover:bg-[#F8FAFD]">
                    <Paperclip size={13} />
                    Pilih file baru untuk mengganti lampiran
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(event) => handleFile(event.target.files?.[0])}
                    />
                  </label>
                )}

                <p className="mt-1.5 text-[9px] italic text-[#9AA8BA]">
                  Jika tidak ingin mengganti lampiran, biarkan file saat ini
                  tetap digunakan.
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
                  Pastikan informasi pengumuman sudah sesuai sebelum disimpan.
                </p>

                <div className="flex shrink-0 justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="h-8 rounded-md border border-[#DCE5F1] px-3 text-[10px] font-semibold text-[#52627A] hover:bg-slate-50"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white hover:bg-blue-700"
                  >
                    <Check size={13} />
                    {editingId !== null
                      ? 'Simpan Perubahan'
                      : 'Simpan Pengumuman'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL LIHAT DETAIL */}
      {viewOpen && selectedData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewOpen(false);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  Detail Pengumuman
                </h2>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Informasi lengkap pengumuman KKN.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewOpen(false)}
                aria-label="Tutup detail"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8291A8]">
                  Tanggal Disimpan
                </p>

                <p className="mt-1 text-[11px] text-[#354760]">
                  {selectedData.tanggalDisimpan}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8291A8]">
                  Judul Pengumuman
                </p>

                <p className="mt-1 text-[13px] font-bold leading-5 text-[#172943]">
                  {selectedData.judul}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8291A8]">
                  Isi Pengumuman
                </p>

                <div
                  className="prose prose-sm mt-2 max-w-none rounded-lg border border-[#E5ECF5] bg-[#F8FAFD] p-4 text-[11px] leading-6 text-[#465670]"
                  dangerouslySetInnerHTML={{ __html: selectedData.isi }}
                />
              </div>

              {selectedData.lampiran && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8291A8]">
                    Lampiran Pengumuman
                  </p>

                  <a
                    href={selectedData.lampiran.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex items-center gap-3 rounded-md border border-[#E5ECF5] bg-[#F8FAFD] px-3 py-2.5 text-[10px] text-[#3569F6] hover:bg-blue-50"
                  >
                    <FileText size={17} />
                    <span className="min-w-0 flex-1 truncate">
                      {selectedData.lampiran.name}
                    </span>
                    <ExternalLink size={13} />
                    Lihat file
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-[#E8EEF7] px-5 py-3">
              <button
                type="button"
                onClick={() => setViewOpen(false)}
                className="h-9 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white hover:bg-blue-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
