import { useEffect, useMemo, useState, type FormEvent } from 'react';

import {
  Search,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap,
  Contact,
  Building2,
  Hash,
} from 'lucide-react';

type GuruItem = {
  id: number;
  nuptk: string;
  nip: string;
  nama: string;
  sekolah: string;
  jabatan: string;
  noTelp: string;
  email: string;
  npwp: string;
  nomorSertifikasi: string;
  nomorRekening: string;
  golongan: string;
  pangkat: string;
  slug: string;
};

type GuruForm = Omit<GuruItem, 'id'>;
type FieldKey = keyof GuruForm;

const emptyForm: GuruForm = {
  nuptk: '',
  nip: '',
  nama: '',
  sekolah: '',
  jabatan: 'Guru Pamong',
  noTelp: '',
  email: '',
  npwp: '',
  nomorSertifikasi: '',
  nomorRekening: '',
  golongan: '',
  pangkat: '',
  slug: '',
};

const initialData: GuruItem[] = [
  {
    id: 1,
    nuptk: '1234567890123456',
    nip: '198501152010121001',
    nama: 'I Made Agus Wirawan, S.Pd.',
    sekolah: 'SMA Negeri 1 Singaraja',
    jabatan: 'Guru Pamong',
    noTelp: '08300004',
    email: 'user017341@gmail.com',
    npwp: '880000000000004',
    nomorSertifikasi: '890000000000004',
    nomorRekening: '100004',
    golongan: 'III/c',
    pangkat: 'Pangkat Dummy',
    slug: 'dummy-4',
  },
  {
    id: 2,
    nuptk: '1234567890123457',
    nip: '198706202014041002',
    nama: 'Ni Made Ayu Lestari, S.Pd.',
    sekolah: 'SMA Negeri 2 Singaraja',
    jabatan: 'Guru Pamong',
    noTelp: '081234567801',
    email: 'ayu.lestari@gmail.com',
    npwp: '880000000000005',
    nomorSertifikasi: '890000000000005',
    nomorRekening: '100005',
    golongan: 'III/b',
    pangkat: 'Penata Muda Tk. I',
    slug: 'ni-made-ayu-lestari',
  },
  {
    id: 3,
    nuptk: '1234567890123458',
    nip: '198903102015041003',
    nama: 'I Gede Mahendra, S.Pd.',
    sekolah: 'SMA Negeri 1 Sukasada',
    jabatan: 'Guru Pamong',
    noTelp: '081234567802',
    email: 'mahendra@gmail.com',
    npwp: '880000000000006',
    nomorSertifikasi: '890000000000006',
    nomorRekening: '100006',
    golongan: 'III/c',
    pangkat: 'Penata',
    slug: 'i-gede-mahendra',
  },
  {
    id: 4,
    nuptk: '1234567890123459',
    nip: '198812152016041004',
    nama: 'Ni Luh Putu Sari, S.Pd.',
    sekolah: 'SMK Negeri 1 Singaraja',
    jabatan: 'Guru Pamong',
    noTelp: '081234567803',
    email: 'putu.sari@gmail.com',
    npwp: '880000000000007',
    nomorSertifikasi: '890000000000007',
    nomorRekening: '100007',
    golongan: 'IV/a',
    pangkat: 'Pembina',
    slug: 'ni-luh-putu-sari',
  },
  {
    id: 5,
    nuptk: '1234567890123460',
    nip: '199001252017041005',
    nama: 'I Ketut Adi Pratama, S.Pd.',
    sekolah: 'SMA Negeri 3 Singaraja',
    jabatan: 'Guru Pamong',
    noTelp: '081234567804',
    email: 'adi.pratama@gmail.com',
    npwp: '880000000000008',
    nomorSertifikasi: '890000000000008',
    nomorRekening: '100008',
    golongan: 'III/b',
    pangkat: 'Penata Muda Tk. I',
    slug: 'i-ketut-adi-pratama',
  },
];

const inputClass =
  'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]';

const fieldGroups: {
  title: string;
  icon: typeof User;
  fields: {
    key: FieldKey;
    label: string;
    type?: string;
    required?: boolean;
    full?: boolean;
    options?: string[];
  }[];
}[] = [
  {
    title: 'Informasi Identitas Guru',
    icon: User,
    fields: [
      { key: 'nuptk', label: 'NUPTK', required: true },
      { key: 'nip', label: 'NIP' },
      { key: 'nama', label: 'Nama Lengkap', required: true, full: true },
    ],
  },
  {
    title: 'Informasi Sekolah dan Jabatan',
    icon: Building2,
    fields: [
      { key: 'sekolah', label: 'Sekolah', required: true, full: true },
      {
        key: 'jabatan',
        label: 'Jabatan',
        required: true,
        options: ['Guru Pamong'],
      },
    ],
  },
  {
    title: 'Informasi Kontak',
    icon: Contact,
    fields: [
      { key: 'noTelp', label: 'No Telp', type: 'tel' },
      { key: 'email', label: 'Email', type: 'email' },
    ],
  },
  {
    title: 'Informasi Administrasi',
    icon: GraduationCap,
    fields: [
      { key: 'npwp', label: 'NPWP' },
      { key: 'nomorSertifikasi', label: 'Nomor Sertifikasi' },
      { key: 'nomorRekening', label: 'Nomor Rekening' },
      { key: 'golongan', label: 'Golongan' },
      { key: 'pangkat', label: 'Pangkat' },
    ],
  },
];

export default function Guru() {
  const [data, setData] = useState<GuruItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [detailId, setDetailId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<GuruForm>({ ...emptyForm });

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [syncing, setSyncing] = useState(false);

  const pageSize = 10;

  const selectedGuru = useMemo(
    () => data.find((item) => item.id === detailId) ?? null,
    [data, detailId],
  );

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      [item.nuptk, item.nip, item.nama, item.sekolah, item.jabatan]
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

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setModalOpen(true);
  }

  function openEdit(item: GuruItem) {
    setEditingId(item.id);

    const { id: _id, ...values } = item;
    void _id;

    setForm({ ...values });
    setError('');
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
  }

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleaned = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ]),
    ) as GuruForm;

    if (
      !cleaned.nuptk ||
      !cleaned.nama ||
      !cleaned.sekolah ||
      !cleaned.jabatan
    ) {
      setError('NUPTK, nama, sekolah, dan jabatan wajib diisi.');
      return;
    }

    if (
      data.some((item) => item.id !== editingId && item.nuptk === cleaned.nuptk)
    ) {
      setError('NUPTK sudah terdaftar.');
      return;
    }

    if (
      cleaned.email &&
      data.some(
        (item) =>
          item.id !== editingId &&
          item.email.toLowerCase() === cleaned.email.toLowerCase(),
      )
    ) {
      setError('Email sudah terdaftar.');
      return;
    }

    if (!cleaned.slug) {
      cleaned.slug = createSlug(cleaned.nama);
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...cleaned } : item,
        ),
      );

      setNotice('Data guru berhasil diperbarui.');
    } else {
      setData((current) => [{ id: Date.now(), ...cleaned }, ...current]);
      setPage(1);
      setNotice('Data guru berhasil ditambahkan.');
    }

    closeModal();
  }

  function deleteData(id: number) {
    if (!window.confirm('Yakin ingin menghapus data guru ini?')) return;

    setData((current) => current.filter((item) => item.id !== id));

    if (detailId === id) setDetailId(null);

    setPage(1);
    setNotice('Data guru berhasil dihapus.');
  }

  function handleSyncSlug() {
    if (syncing) return;

    setSyncing(true);

    window.setTimeout(() => {
      setData((current) =>
        current.map((item) => ({
          ...item,
          slug: item.slug || createSlug(item.nama),
        })),
      );

      setSyncing(false);
      setNotice('Sinkronisasi slug berhasil dilakukan.');
    }, 700);
  }

  function updateField(key: FieldKey, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === 'nama' && !current.slug ? { slug: createSlug(value) } : {}),
    }));
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold text-[#172943]">Data Guru</h1>
          <p className="mt-2 text-[12px] text-[#71819B]">
            Kelola dan lihat data guru yang terdaftar pada sistem.
          </p>
        </div>

        {/* PENCARIAN DAN AKSI */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
          <div className="px-5 pb-3 pt-4">
            <h2 className="text-[13px] font-bold text-[#172943]">Data Guru</h2>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari data guru berdasarkan NUPTK, NIP, nama, sekolah, atau
              jabatan.
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
                placeholder="Cari NUPTK, NIP, nama guru, atau sekolah..."
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
                onClick={handleSyncSlug}
                disabled={syncing}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#B8CCFF] bg-white px-3.5 text-[10px] font-semibold text-[#3569F6] hover:bg-[#EEF4FF] disabled:opacity-50"
              >
                <RefreshCw
                  size={14}
                  className={syncing ? 'animate-spin' : ''}
                />
                Sinkron Slug
              </button>
            </div>
          </div>
        </div>

        {/* TABEL */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF] text-[9px] font-bold text-[#52627A]">
                  <th className="w-[6%] px-3 py-3 text-center">NO.</th>
                  <th className="w-[16%] px-3 py-3">NUPTK</th>
                  <th className="w-[16%] px-3 py-3">NIP</th>
                  <th className="w-[23%] px-3 py-3">NAMA GURU</th>
                  <th className="w-[21%] px-3 py-3">SEKOLAH</th>
                  <th className="w-[10%] px-3 py-3">JABATAN</th>
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

                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.nuptk}
                    </td>

                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.nip || '-'}
                    </td>

                    <td className="px-3 py-4 text-[10px] font-semibold text-[#273750]">
                      {item.nama}
                    </td>

                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.sekolah}
                    </td>

                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.jabatan}
                    </td>

                    <td className="px-2 py-3">
                      <div className="flex justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDetailId(item.id)}
                          title="Detail guru"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-[#EEF4FF]"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit guru"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-[#EEF4FF]"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteData(item.id)}
                          title="Hapus guru"
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
                      colSpan={7}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada data guru yang ditemukan.
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
              {filteredData.length} guru
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

      {/* MODAL DETAIL */}
      {selectedGuru && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#10233F]/50 p-3 backdrop-blur-[3px] sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetailId(null);
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-[#E2EAF5] bg-[#F8FAFD] shadow-[0_20px_60px_rgba(15,35,65,0.20)]">
            <div className="flex shrink-0 items-center justify-between border-b border-[#E8EEF6] bg-white px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-[15px] font-bold text-[#172943]">
                  Detail Guru
                </h2>
                <p className="mt-0.5 text-[11px] text-[#8493A9]">
                  Informasi lengkap data guru.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDetailId(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8291A8] hover:bg-[#F1F5F9]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {/* PROFIL */}
              <div className="mb-5 flex flex-col gap-4 rounded-xl border border-[#DCE7F8] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F0FF] text-[20px] font-bold text-[#3569F6]">
                    {selectedGuru.nama
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word.charAt(0))
                      .join('')
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-[15px] font-bold text-[#172943]">
                      {selectedGuru.nama}
                    </h3>

                    <p className="mt-1 text-[11px] text-[#71819B]">
                      {selectedGuru.nuptk}
                    </p>

                    <div className="mt-2 inline-flex items-center rounded-full bg-[#EAF1FF] px-2.5 py-1 text-[10px] font-semibold text-[#3569F6]">
                      Guru Pamong
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#F4F7FC] px-4 py-3 sm:min-w-[180px]"></div>
              </div>

              {/* DETAIL PER KELOMPOK */}
              {fieldGroups.map((group) => {
                const Icon = group.icon;

                return (
                  <div
                    key={group.title}
                    className="mb-4 overflow-hidden rounded-xl border border-[#E2EAF5] bg-white"
                  >
                    <div className="flex items-center gap-2 border-b border-[#EDF1F7] px-4 py-3.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#3569F6]">
                        <Icon size={15} />
                      </div>

                      <h3 className="text-[12px] font-bold text-[#273750]">
                        {group.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-4 sm:grid-cols-2">
                      {group.fields.map((field) => {
                        const value = selectedGuru[field.key];

                        return (
                          <div
                            key={field.key}
                            className={field.full ? 'sm:col-span-2' : ''}
                          >
                            <p className="text-[10px] font-medium text-[#91A0B5]">
                              {field.label}
                            </p>

                            <p className="mt-1.5 break-words text-[11px] font-semibold text-[#354760]">
                              {value || '-'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* SLUG */}
              <div className="mb-4 overflow-hidden rounded-xl border border-[#E2EAF5] bg-white">
                <div className="flex items-center gap-2 border-b border-[#EDF1F7] px-4 py-3.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#3569F6]">
                    <Hash size={15} />
                  </div>

                  <h3 className="text-[12px] font-bold text-[#273750]">
                    Informasi Slug
                  </h3>
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-medium text-[#91A0B5]">Slug</p>
                  <p className="mt-1.5 break-words text-[11px] font-semibold text-[#354760]">
                    {selectedGuru.slug || '-'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E8EEF6] bg-white px-5 py-4 sm:px-7">
              <p className="hidden text-[10px] text-[#91A0B5] sm:block">
                Detail informasi guru
              </p>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDetailId(null)}
                  className="h-9 rounded-lg border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#52627A] hover:bg-[#F4F7FC]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
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
          <div className="max-h-[92vh] w-full max-w-[720px] overflow-hidden rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null ? 'Edit Data Guru' : 'Tambah Data Guru'}
                </h2>

                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {editingId !== null
                    ? 'Perbarui informasi lengkap guru.'
                    : 'Lengkapi informasi guru yang akan ditambahkan.'}
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

            <form
              onSubmit={saveData}
              className="max-h-[calc(92vh-75px)] overflow-y-auto"
            >
              <div className="px-5 py-5 sm:px-6">
                {fieldGroups.map((group) => {
                  const Icon = group.icon;

                  return (
                    <div
                      key={group.title}
                      className="mb-5 border-b border-[#EDF1F7] pb-5 last:mb-0 last:border-0 last:pb-0"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <Icon size={15} className="text-[#3569F6]" />
                        <h3 className="text-[12px] font-bold text-[#273750]">
                          {group.title}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {group.fields.map((field) => (
                          <div
                            key={field.key}
                            className={field.full ? 'sm:col-span-2' : ''}
                          >
                            <label
                              htmlFor={`guru-${field.key}`}
                              className="text-[10px] font-semibold text-[#43536B]"
                            >
                              {field.label}
                              {field.required && (
                                <span className="text-red-500"> *</span>
                              )}
                            </label>

                            {field.options ? (
                              <select
                                id={`guru-${field.key}`}
                                value={form[field.key]}
                                required={field.required}
                                onChange={(event) =>
                                  updateField(field.key, event.target.value)
                                }
                                className={inputClass}
                              >
                                <option value="">Pilih {field.label}</option>

                                {field.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                id={`guru-${field.key}`}
                                type={field.type ?? 'text'}
                                required={field.required}
                                value={form[field.key]}
                                onChange={(event) =>
                                  updateField(field.key, event.target.value)
                                }
                                placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                className={inputClass}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* SLUG */}
                <div className="mt-5 border-t border-[#EDF1F7] pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Hash size={15} className="text-[#3569F6]" />
                    <h3 className="text-[12px] font-bold text-[#273750]">
                      Informasi Slug
                    </h3>
                  </div>

                  <label
                    htmlFor="guru-slug"
                    className="text-[10px] font-semibold text-[#43536B]"
                  >
                    Slug
                  </label>

                  <input
                    id="guru-slug"
                    type="text"
                    value={form.slug}
                    onChange={(event) =>
                      updateField('slug', event.target.value)
                    }
                    placeholder="Slug akan dibuat dari nama guru"
                    className={inputClass}
                  />

                  <p className="mt-1.5 text-[9px] text-[#91A0B5]">
                    Slug dapat diisi otomatis berdasarkan nama guru atau diubah
                    secara manual.
                  </p>
                </div>

                {error && (
                  <p className="mt-4 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[10px] text-red-600">
                    {error}
                  </p>
                )}
              </div>

              <div className="sticky bottom-0 flex justify-end gap-2 border-t border-[#E8EEF7] bg-white px-5 py-4 sm:px-6">
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
