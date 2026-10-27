import { useMemo, useRef, useState } from 'react';
import {
  Search,
  Plus,
  MapPin,
  CalendarDays,
  Eye,
  X,
  ImagePlus,
  Upload,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Check,
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  author: string;
  content: string;
  image: string;
  imageName: string;
}

interface BlogForm {
  title: string;
  content: string;
  image: string;
  imageName: string;
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Digitalisasi UMKM Desa Bakas melalui Teknologi Digital',
    location: 'Desa Bakas',
    date: '10 Okt 2026',
    time: '09.30',
    author: 'Amelia Rizky Yuniar',
    content:
      'Kegiatan digitalisasi UMKM dilaksanakan untuk membantu pelaku usaha memperkenalkan produk mereka melalui media digital. Mahasiswa KKN memberikan pendampingan mengenai pemanfaatan teknologi untuk pemasaran produk.',
    image: '',
    imageName: '',
  },
  {
    id: 2,
    title: 'Kegiatan Sosialisasi kepada Masyarakat Desa',
    location: 'Desa Bakas',
    date: '08 Okt 2026',
    time: '10.00',
    author: 'Amelia Rizky Yuniar',
    content:
      'Mahasiswa melaksanakan kegiatan sosialisasi bersama masyarakat untuk meningkatkan pemahaman mengenai program kerja KKN.',
    image: '',
    imageName: '',
  },
  {
    id: 3,
    title: 'Gotong Royong Membersihkan Lingkungan Desa',
    location: 'Desa Bakas',
    date: '05 Okt 2026',
    time: '07.30',
    author: 'Amelia Rizky Yuniar',
    content:
      'Kegiatan gotong royong dilakukan bersama warga untuk menjaga kebersihan dan kenyamanan lingkungan desa.',
    image: '',
    imageName: '',
  },
  {
    id: 4,
    title: 'Pendampingan Belajar untuk Anak-Anak',
    location: 'Desa Bakas',
    date: '02 Okt 2026',
    time: '15.00',
    author: 'Amelia Rizky Yuniar',
    content:
      'Mahasiswa KKN melaksanakan pendampingan belajar untuk membantu anak-anak memahami materi pembelajaran.',
    image: '',
    imageName: '',
  },
  {
    id: 5,
    title: 'Koordinasi Program Kerja Bersama Perangkat Desa',
    location: 'Desa Bakas',
    date: '29 Sep 2026',
    time: '13.00',
    author: 'Amelia Rizky Yuniar',
    content:
      'Koordinasi dilakukan bersama perangkat desa untuk membahas pelaksanaan dan evaluasi program kerja mahasiswa KKN.',
    image: '',
    imageName: '',
  },
  {
    id: 6,
    title: 'Pengenalan Program KKN kepada Warga',
    location: 'Desa Bakas',
    date: '25 Sep 2026',
    time: '09.00',
    author: 'Amelia Rizky Yuniar',
    content:
      'Mahasiswa memperkenalkan program kerja KKN kepada warga sekaligus berdiskusi mengenai kebutuhan masyarakat.',
    image: '',
    imageName: '',
  },
  {
    id: 7,
    title: 'Persiapan Kegiatan Pengabdian Masyarakat',
    location: 'Desa Bakas',
    date: '20 Sep 2026',
    time: '08.00',
    author: 'Amelia Rizky Yuniar',
    content:
      'Persiapan kegiatan meliputi koordinasi tim, pembagian tugas, dan penyiapan kebutuhan untuk pelaksanaan program kerja.',
    image: '',
    imageName: '',
  },
];

const EMPTY_FORM: BlogForm = {
  title: '',
  content: '',
  image: '',
  imageName: '',
};

const ITEMS_PER_PAGE = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function BlogKKN() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<BlogPost | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState<BlogForm>(EMPTY_FORM);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPosts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return posts;

    return posts.filter((post) =>
      [post.title, post.location, post.content, post.author, post.date].some(
        (value) => value.toLowerCase().includes(keyword),
      ),
    );
  }, [posts, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / ITEMS_PER_PAGE),
  );

  const safePage = Math.min(currentPage, totalPages);

  const displayedPosts = filteredPosts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingId(post.id);

    setFormData({
      title: post.title,
      content: post.content,
      image: post.image,
      imageName: post.imageName,
    });

    setError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData({ ...EMPTY_FORM });
    setError('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError('Ukuran foto maksimal 5 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((previous) => ({
        ...previous,
        image: String(reader.result),
        imageName: file.name,
      }));

      setError('');
    };

    reader.onerror = () => {
      setError('Foto gagal dibaca. Silakan pilih ulang.');
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Judul postingan wajib diisi.');
      return;
    }

    if (!formData.content.trim()) {
      setError('Isi postingan wajib diisi.');
      return;
    }

    if (!formData.image) {
      setError('Foto kegiatan wajib dipilih.');
      return;
    }

    if (editingId !== null) {
      const targetId = editingId;

      setPosts((previous) =>
        previous.map((post) =>
          post.id === targetId
            ? {
                ...post,
                title: formData.title.trim(),
                content: formData.content.trim(),
                image: formData.image,
                imageName: formData.imageName,
              }
            : post,
        ),
      );

      setNotice('Blog berhasil diperbarui.');
    } else {
      const now = new Date();

      const newPost: BlogPost = {
        id: Date.now(),
        title: formData.title.trim(),
        content: formData.content.trim(),
        location: 'Desa Bakas',
        date: now.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'Asia/Makassar',
        }),
        time: now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Makassar',
        }),
        author: 'Amelia Rizky Yuniar',
        image: formData.image,
        imageName: formData.imageName,
      };

      setPosts((previous) => [newPost, ...previous]);
      setCurrentPage(1);
      setNotice('Blog berhasil diposting.');
    }

    closeModal();
  };

  const handleDelete = () => {
    if (deleteId === null) return;

    setPosts((previous) => previous.filter((post) => post.id !== deleteId));

    setDeleteId(null);
    setNotice('Blog berhasil dihapus.');
  };

  const formatDate = (date: string, time: string) => `${date}, ${time}`;

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600"></div>

          <h1 className="text-2xl font-bold text-slate-900">Blog KKN</h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola dan dokumentasikan kegiatan selama KKN.
          </p>
        </div>

        {notice && (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
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

        <div className="flex flex-col gap-3 rounded-xl border border-blue-300 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <MapPin size={21} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-800">DESA BAKAS</h2>
              <p className="mt-1 text-sm text-slate-500">
                Kecamatan Banjarangkan, Kabupaten Klungkung, Provinsi Bali
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-500">
            Lokasi KKN · Kelompok KKN
          </span>
        </div>

        <section className="overflow-hidden rounded-xl border border-blue-300 bg-white">
          <div className="flex flex-col gap-4 border-b border-blue-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-800">Riwayat Blog</h2>
              <p className="mt-1 text-xs text-slate-500">
                Daftar postingan kegiatan KKN yang telah dibuat.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={16} />
              Buat Postingan
            </button>
          </div>

          <div className="p-5">
            <div className="relative mb-5 max-w-md">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari judul postingan..."
                className="w-full rounded-lg border border-blue-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-blue-200 text-xs text-slate-500">
                    <th className="px-3 py-4 font-semibold">Judul</th>
                    <th className="px-3 py-4 font-semibold">Lokasi KKN</th>
                    <th className="px-3 py-4 font-semibold">Disimpan Pada</th>
                    <th className="px-3 py-4 font-semibold">Disimpan Oleh</th>
                    <th className="px-3 py-4 text-center font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {displayedPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-blue-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="max-w-[300px] px-3 py-5">
                        <div className="flex items-start gap-3">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="h-11 w-11 shrink-0 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <BookOpen size={19} />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="line-clamp-2 text-sm font-semibold text-slate-800">
                              {post.title}
                            </p>
                            <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                              {post.content}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-5 text-sm text-slate-600">
                        {post.location}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={15} className="text-slate-400" />
                          {formatDate(post.date, post.time)}
                        </div>
                      </td>

                      <td className="px-3 py-5 text-sm text-slate-600">
                        {post.author}
                      </td>

                      <td className="px-3 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setDetailPost(post)}
                            title="Lihat Blog"
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                          >
                            <Eye size={15} />
                            Lihat Blog
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditModal(post)}
                            title="Edit Blog"
                            aria-label={`Edit ${post.title}`}
                            className="rounded-md p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteId(post.id)}
                            title="Hapus Blog"
                            aria-label={`Hapus ${post.title}`}
                            className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {displayedPosts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center">
                        <Search
                          size={28}
                          className="mx-auto mb-3 text-slate-300"
                        />
                        <p className="text-sm font-semibold text-slate-600">
                          Blog tidak ditemukan
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Coba gunakan kata kunci yang berbeda.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-blue-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Menampilkan{' '}
                {filteredPosts.length === 0
                  ? 0
                  : (safePage - 1) * ITEMS_PER_PAGE + 1}
                {' - '}
                {Math.min(
                  safePage * ITEMS_PER_PAGE,
                  filteredPosts.length,
                )} dari {filteredPosts.length} postingan
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="rounded-lg border border-blue-300 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    type="button"
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
                      safePage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-blue-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="rounded-lg border border-blue-300 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-6">
          <div className="flex max-h-[94vh] w-full max-w-[620px] flex-col overflow-hidden rounded-xl border border-blue-300 bg-white shadow-2xl">
            <div className="flex shrink-0 items-start justify-between border-b border-blue-200 px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Kuliah Kerja Nyata (KKN)
                </p>

                <h2 className="mt-2 text-lg font-bold text-slate-900">
                  {editingId !== null ? 'Edit Blog KKN' : 'Posting Blog KKN'}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {editingId !== null
                    ? 'Perbarui informasi kegiatan KKN Anda.'
                    : 'Dokumentasikan kegiatan dan pengalaman Anda selama KKN.'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
                <div>
                  <label
                    htmlFor="blog-title"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Judul Postingan <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="blog-title"
                    type="text"
                    value={formData.title}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Masukkan judul postingan..."
                    maxLength={150}
                    required
                    className="w-full rounded-lg border border-blue-300 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="blog-content"
                      className="text-sm font-medium text-slate-700"
                    >
                      Isi Postingan <span className="text-red-500">*</span>
                    </label>

                    <span className="text-[10px] text-slate-400">
                      {formData.content.length} karakter
                    </span>
                  </div>

                  <textarea
                    id="blog-content"
                    value={formData.content}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        content: event.target.value,
                      }))
                    }
                    placeholder="Tuliskan kegiatan atau pengalaman Anda selama KKN..."
                    rows={6}
                    maxLength={5000}
                    required
                    className="w-full resize-y rounded-lg border border-blue-300 px-3.5 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="text-sm font-medium text-slate-700">
                      Foto Kegiatan <span className="text-red-500">*</span>
                    </label>

                    <span className="text-[10px] text-slate-400">
                      Maksimal 5 MB
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {formData.image ? (
                    <div className="overflow-hidden rounded-xl border border-blue-100">
                      <img
                        src={formData.image}
                        alt="Pratinjau foto kegiatan"
                        className="max-h-64 w-full bg-slate-50 object-contain"
                      />

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-blue-200 p-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <ImagePlus
                            size={17}
                            className="shrink-0 text-blue-600"
                          />
                          <span className="truncate text-xs text-slate-600">
                            {formData.imageName}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                        >
                          <Upload size={14} />
                          Ganti Foto
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-blue-200 bg-slate-50/50 px-4 py-7 text-center">
                      <div className="mb-3 rounded-xl bg-blue-50 p-3 text-blue-600">
                        <ImagePlus size={23} />
                      </div>

                      <p className="text-sm font-semibold text-slate-800">
                        Pilih Foto Kegiatan
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        PNG, JPG, JPEG, atau format gambar lainnya
                      </p>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                      >
                        <Upload size={14} />
                        Pilih Foto
                      </button>
                    </div>
                  )}

                  <p className="mt-2 text-[10px] text-slate-400">
                    Foto membantu mendokumentasikan kegiatan yang Anda lakukan.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600"
                  >
                    {error}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-blue-200 bg-white px-5 py-4 sm:px-6">
                <p className="text-[10px] text-slate-400">
                  <span className="text-red-500">*</span> Wajib diisi
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-blue-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    {editingId !== null ? (
                      <>
                        <Check size={16} strokeWidth={2.5} />
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Posting Blog
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {detailPost && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-blue-300 bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-blue-200 bg-white px-5 py-4">
              <h2 className="font-bold text-slate-900">Detail Blog KKN</h2>

              <button
                type="button"
                onClick={() => setDetailPost(null)}
                aria-label="Tutup detail"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              {detailPost.image && (
                <img
                  src={detailPost.image}
                  alt={detailPost.title}
                  className="max-h-80 w-full rounded-xl bg-slate-50 object-contain"
                />
              )}

              <h3 className="text-xl font-bold text-slate-900">
                {detailPost.title}
              </h3>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {detailPost.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  {formatDate(detailPost.date, detailPost.time)}
                </span>
              </div>

              <div className="border-t border-blue-200 pt-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                  {detailPost.content}
                </p>
              </div>

              <p className="text-xs text-slate-400">
                Diposting oleh {detailPost.author}
              </p>

              <div className="flex justify-end gap-2 border-t border-blue-200 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const post = detailPost;
                    setDetailPost(null);
                    openEditModal(post);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Pencil size={15} />
                  Edit Blog
                </button>

                <button
                  type="button"
                  onClick={() => setDetailPost(null)}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-xl border border-blue-300 bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-4 text-center text-lg font-bold text-slate-900">
              Hapus Blog?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Apakah kamu yakin ingin menghapus postingan ini? Tindakan ini
              tidak dapat dibatalkan.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-lg border border-blue-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
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
