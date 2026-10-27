import { useState } from 'react';
import {
  CalendarDays,
  Building2,
  ClipboardList,
  Clock,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface Journal {
  id: number;
  date: string;
  dateISO: string;
  time: string;
  title: string;
  description: string;
}

const getTodayISO = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const initialJournals: Journal[] = [
  {
    id: 1,
    date: 'Selasa, 15 September 2026',
    dateISO: '2026-09-15',
    time: '14:10 WITA',
    title: 'Melakukan Observasi Lingkungan Desa',
    description:
      'Melakukan observasi awal lingkungan Desa Bakas untuk mengetahui kondisi wilayah, potensi desa, serta kebutuhan masyarakat yang dapat menjadi dasar penyusunan program kerja KKN.',
  },
  {
    id: 2,
    date: 'Senin, 14 September 2026',
    dateISO: '2026-09-14',
    time: '15:00 WITA',
    title: 'Koordinasi dengan Perangkat Desa',
    description:
      'Melakukan koordinasi dengan perangkat Desa Bakas mengenai rencana kegiatan, jadwal pelaksanaan program kerja, dan kebutuhan administrasi selama pelaksanaan KKN.',
  },
  {
    id: 3,
    date: 'Jumat, 11 September 2026',
    dateISO: '2026-09-11',
    time: '14:30 WITA',
    title: 'Menyusun Rencana Program Kerja',
    description:
      'Menyusun rencana program kerja individu berdasarkan hasil observasi dan identifikasi kebutuhan masyarakat di lokasi KKN.',
  },
  {
    id: 4,
    date: 'Kamis, 10 September 2026',
    dateISO: '2026-09-10',
    time: '14:00 WITA',
    title: 'Melakukan Pengenalan Wilayah KKN',
    description:
      'Mengenali lingkungan sekitar posko, fasilitas umum, dan lokasi kegiatan yang akan digunakan selama pelaksanaan program KKN.',
  },
  {
    id: 5,
    date: 'Rabu, 9 September 2026',
    dateISO: '2026-09-09',
    time: '15:10 WITA',
    title: 'Persiapan Pelaksanaan KKN',
    description:
      'Melakukan persiapan awal pelaksanaan KKN, termasuk pembagian tugas, koordinasi kelompok, dan penyusunan agenda kegiatan bersama anggota kelompok.',
  },
  {
    id: 6,
    date: 'Selasa, 8 September 2026',
    dateISO: '2026-09-08',
    time: '14:20 WITA',
    title: 'Koordinasi Internal Kelompok',
    description:
      'Melakukan diskusi bersama anggota kelompok untuk menyusun pembagian tugas dan rencana kegiatan KKN.',
  },
  {
    id: 7,
    date: 'Senin, 7 September 2026',
    dateISO: '2026-09-07',
    time: '13:30 WITA',
    title: 'Persiapan Administrasi KKN',
    description:
      'Memeriksa kelengkapan administrasi dan menyusun kebutuhan dokumen untuk pelaksanaan kegiatan KKN.',
  },
];

export default function JurnalKKN() {
  const [journals, setJournals] = useState<Journal[]>(initialJournals);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    date: getTodayISO(),
    title: '',
    description: '',
  });

  const totalPages = Math.ceil(journals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const sortedJournals = [...journals].sort((a, b) => b.id - a.id);

  const paginatedJournals = sortedJournals.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const resetForm = () => {
    setFormData({
      date: getTodayISO(),
      title: '',
      description: '',
    });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (journal: Journal) => {
    setFormData({
      date: journal.dateISO,
      title: journal.title,
      description: journal.description,
    });

    setEditingId(journal.id);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    if (editingId !== null) {
      setJournals((prev) =>
        prev.map((journal) =>
          journal.id === editingId
            ? {
                ...journal,
                date: formatDate(formData.date),
                dateISO: formData.date,
                title: formData.title.trim(),
                description: formData.description.trim(),
              }
            : journal,
        ),
      );
    } else {
      const newJournal: Journal = {
        id: Date.now(),
        date: formatDate(formData.date),
        dateISO: formData.date,
        time:
          new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Makassar',
          }) + ' WITA',
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      setJournals((prev) => [newJournal, ...prev]);
      setCurrentPage(1);
    }

    setModalOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteId === null) return;

    const remainingJournals = journals.filter(
      (journal) => journal.id !== deleteId,
    );

    setJournals(remainingJournals);
    setDeleteId(null);

    const remainingPages = Math.ceil(remainingJournals.length / itemsPerPage);

    if (currentPage > remainingPages) {
      setCurrentPage(Math.max(1, remainingPages));
    }
  };

  return (
    <div className="min-h-full bg-white">
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Jurnal Harian KKN
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Catat kegiatan Anda selama pelaksanaan Kuliah Kerja Nyata (KKN).
          </p>
        </div>

        <section className="grid grid-cols-1 overflow-hidden rounded-xl border border-blue-200 bg-white shadow-sm sm:grid-cols-2 xl:grid-cols-4">
          <div className="border-b border-blue-100 p-4 sm:border-r xl:border-b-0">
            <div className="flex items-center gap-2 text-slate-500">
              <Building2 size={14} />
              <span className="text-[10px]">Tempat KKN</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-800">
              Desa Bakas
            </p>
          </div>

          <div className="border-b border-blue-100 p-4 xl:border-r xl:border-b-0">
            <div className="flex items-center gap-2 text-slate-500">
              <CalendarDays size={14} />
              <span className="text-[10px]">Periode KKN</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-800">
              Periode pelaksanaan KKN
            </p>
          </div>

          <div className="border-b border-blue-100 p-4 sm:border-r sm:border-b-0">
            <div className="flex items-center gap-2 text-slate-500">
              <ClipboardList size={14} />
              <span className="text-[10px]">Total Jurnal</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-800">
              {journals.length} Entri Terkirim
            </p>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock size={14} />
              <span className="text-[10px]">Status Hari Ini</span>
            </div>
            <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-700">
              Belum Diisi
            </span>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Riwayat Jurnal
              </h2>
              <p className="mt-1 text-[10px] text-slate-500">
                Daftar kegiatan KKN yang telah Anda catat.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-medium text-white hover:bg-blue-700"
            >
              <Plus size={13} />
              Tambah Jurnal
            </button>
          </div>

          <div className="space-y-3">
            {paginatedJournals.map((journal, index) => (
              <article
                key={journal.id}
                className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-[10px] font-medium text-slate-600">
                      {journal.date}
                      <span className="mx-1.5 text-slate-300">•</span>
                      <span className="text-slate-400">
                        Diisi pukul {journal.time}
                      </span>
                    </p>

                    <h3 className="mt-2 text-xs font-bold text-slate-800">
                      {journal.title}
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Desa Bakas • Program Kuliah Kerja Nyata
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-blue-50 px-2 py-1 text-[9px] font-medium text-blue-600">
                    Entri ke-{startIndex + index + 1}
                  </span>
                </div>

                <p className="mt-3 text-[11px] leading-5 text-slate-600">
                  {journal.description}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(journal)}
                    className="flex items-center gap-1 rounded-md border border-blue-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-blue-50"
                  >
                    <Pencil size={11} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteId(journal.id)}
                    className="flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-[10px] font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={11} />
                    Hapus
                  </button>
                </div>
              </article>
            ))}

            {journals.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center">
                <ClipboardList size={28} className="mx-auto text-slate-400" />
                <p className="mt-3 text-xs font-medium text-slate-700">
                  Belum ada jurnal harian
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Klik Tambah Jurnal untuk mencatat kegiatan KKN.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row">
            <p className="text-[11px] font-medium text-slate-600">
              Menampilkan {journals.length === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, journals.length)} dari{' '}
              {journals.length} jurnal
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-slate-600 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 min-w-8 rounded-lg px-2 text-[11px] font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-slate-700 hover:bg-blue-100'
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage >= totalPages || totalPages === 0}
                aria-label="Halaman berikutnya"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-slate-600 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  {editingId !== null ? 'Edit Jurnal' : 'Tambah Jurnal'}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Lengkapi kegiatan KKN yang Anda lakukan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Tutup modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  Tanggal Kegiatan
                </label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  Judul Kegiatan
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Contoh: Melakukan observasi lingkungan desa"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Jelaskan kegiatan KKN yang dilakukan..."
                  className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-blue-700"
                >
                  <CheckCircle2 size={14} />
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-50 p-2 text-red-600">
                <Info size={20} />
              </div>
              <h2 className="text-sm font-bold text-slate-800">
                Hapus Jurnal?
              </h2>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Apakah kamu yakin ingin menghapus jurnal ini? Data yang dihapus
              tidak dapat ditampilkan kembali.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
