import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

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
  Upload,
  User,
  GraduationCap,
  Contact,
} from 'lucide-react';

type DosenItem = {
  id: number;
  nip: string;
  nama: string;
  email: string;
  prodi: string;
  noIndukUndiksha: string;
  tempatLahir: string;
  tglLahir: string;
  alamat: string;
  jenisKelamin: string;
  jabatanFungsional: string;
  jabatanStruktural: string;
  noTelp: string;
  golongan: string;
  pangkat: string;
  lokasiKerja: string;
};

type DosenForm = Omit<DosenItem, 'id'>;
type FieldKey = keyof DosenForm;

const emptyForm: DosenForm = {
  nip: '',
  nama: '',
  email: '',
  prodi: '',
  noIndukUndiksha: '',
  tempatLahir: '',
  tglLahir: '',
  alamat: '',
  jenisKelamin: '',
  jabatanFungsional: '',
  jabatanStruktural: '',
  noTelp: '',
  golongan: '',
  pangkat: '',
  lokasiKerja: '',
};

const initialData: DosenItem[] = [
  {
    id: 1,
    nip: '198501152010121001',
    nama: 'Dr. I Made Agus Wirawan, S.Kom., M.Cs.',
    email: 'agus.wirawan@undiksha.ac.id',
    prodi: 'Pendidikan Teknik Informatika',
    noIndukUndiksha: 'UND0000001',
    tempatLahir: 'Singaraja',
    tglLahir: '1954-05-29',
    alamat: 'Banyuning',
    jenisKelamin: 'Laki-laki',
    jabatanFungsional: 'Jabatan Fungsional D',
    jabatanStruktural: 'Jabatan Struktural Dummy',
    noTelp: '08200001',
    golongan: 'Golon',
    pangkat: 'Pangkat Dummy',
    lokasiKerja: 'Undiksha',
  },
  {
    id: 2,
    nip: '198706202014041002',
    nama: 'Dr. Gede Aditra Pradnyana, S.Kom., M.Kom.',
    email: 'aditra@undiksha.ac.id',
    prodi: 'Sistem Informasi',
    noIndukUndiksha: 'UND0000002',
    tempatLahir: 'Singaraja',
    tglLahir: '1987-06-20',
    alamat: 'Singaraja, Bali',
    jenisKelamin: 'Laki-laki',
    jabatanFungsional: 'Lektor',
    jabatanStruktural: '-',
    noTelp: '081234567802',
    golongan: 'III/c',
    pangkat: 'Penata',
    lokasiKerja: 'Undiksha',
  },
  {
    id: 3,
    nip: '198903102015041003',
    nama: 'I Gede Mahendra Darmawiguna, S.Kom., M.Sc.',
    email: 'mahendra@undiksha.ac.id',
    prodi: 'Pendidikan Teknik Informatika',
    noIndukUndiksha: 'UND00000003',
    tempatLahir: 'Denpasar',
    tglLahir: '1989-03-10',
    alamat: 'Denpasar, Bali',
    jenisKelamin: 'Laki-laki',
    jabatanFungsional: 'Lektor',
    jabatanStruktural: '-',
    noTelp: '081234567803',
    golongan: 'III/c',
    pangkat: 'Penata',
    lokasiKerja: 'Undiksha',
  },
  {
    id: 4,
    nip: '198812152016041004',
    nama: 'Dr. I Ketut Resika Arthana, S.T., M.Kom.',
    email: 'resika@undiksha.ac.id',
    prodi: 'Sistem Informasi',
    noIndukUndiksha: 'UND00000004',
    tempatLahir: 'Gianyar',
    tglLahir: '1988-12-15',
    alamat: 'Gianyar, Bali',
    jenisKelamin: 'Laki-laki',
    jabatanFungsional: 'Lektor Kepala',
    jabatanStruktural: '-',
    noTelp: '081234567804',
    golongan: 'IV/a',
    pangkat: 'Pembina',
    lokasiKerja: 'Undiksha',
  },
  {
    id: 5,
    nip: '199001252017041005',
    nama: 'Ni Luh Gede Pivin Suwirmayanti, S.Kom., M.Kom.',
    email: 'pivin@undiksha.ac.id',
    prodi: 'Manajemen Informatika',
    noIndukUndiksha: 'UND00000005',
    tempatLahir: 'Buleleng',
    tglLahir: '1990-01-25',
    alamat: 'Buleleng, Bali',
    jenisKelamin: 'Perempuan',
    jabatanFungsional: 'Asisten Ahli',
    jabatanStruktural: '-',
    noTelp: '081234567805',
    golongan: 'III/b',
    pangkat: 'Penata Muda Tk. I',
    lokasiKerja: 'Undiksha',
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
    title: 'Informasi Identitas Dosen',
    icon: User,
    fields: [
      { key: 'nip', label: 'NIP', required: true },
      { key: 'nama', label: 'Nama Lengkap', required: true },
      { key: 'noIndukUndiksha', label: 'No Induk Undiksha' },
      { key: 'tempatLahir', label: 'Tempat Lahir' },
      { key: 'tglLahir', label: 'Tgl Lahir', type: 'date' },
      {
        key: 'jenisKelamin',
        label: 'Jenis Kelamin',
        options: ['Laki-laki', 'Perempuan'],
      },
      { key: 'alamat', label: 'Alamat', full: true },
    ],
  },
  {
    title: 'Informasi Kepegawaian dan Akademik',
    icon: GraduationCap,
    fields: [
      { key: 'prodi', label: 'Program Studi', required: true, full: true },
      { key: 'jabatanFungsional', label: 'Jabatan Fungsional' },
      { key: 'jabatanStruktural', label: 'Jabatan Struktural' },
      { key: 'golongan', label: 'Golongan' },
      { key: 'pangkat', label: 'Pangkat' },
      { key: 'lokasiKerja', label: 'Lokasi Kerja', full: true },
    ],
  },
  {
    title: 'Informasi Kontak',
    icon: Contact,
    fields: [
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'noTelp', label: 'No Telp', type: 'tel' },
    ],
  },
];

export default function DosenAM() {
  const [data, setData] = useState<DosenItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [detailId, setDetailId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<DosenForm>({ ...emptyForm });

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [syncing, setSyncing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageSize = 10;

  // Ambil data detail langsung dari state data berdasarkan ID.
  const selectedDosen = useMemo(
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
      [item.nip, item.nama, item.email, item.prodi]
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

  function openEdit(item: DosenItem) {
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

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleaned = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value,
      ]),
    ) as DosenForm;

    if (!cleaned.nip || !cleaned.nama || !cleaned.email || !cleaned.prodi) {
      setError('NIP, nama, email, dan program studi wajib diisi.');
      return;
    }

    if (
      data.some((item) => item.id !== editingId && item.nip === cleaned.nip)
    ) {
      setError('NIP sudah terdaftar.');
      return;
    }

    if (
      data.some(
        (item) =>
          item.id !== editingId &&
          item.email.toLowerCase() === cleaned.email.toLowerCase(),
      )
    ) {
      setError('Email sudah terdaftar.');
      return;
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...cleaned } : item,
        ),
      );
      setNotice('Data dosen berhasil diperbarui.');
    } else {
      setData((current) => [{ id: Date.now(), ...cleaned }, ...current]);
      setPage(1);
      setNotice('Data dosen berhasil ditambahkan.');
    }

    closeModal();
  }

  function deleteData(id: number) {
    if (!window.confirm('Yakin ingin menghapus data dosen ini?')) return;

    setData((current) => current.filter((item) => item.id !== id));

    if (detailId === id) setDetailId(null);

    setPage(1);
    setNotice('Data dosen berhasil dihapus.');
  }

  function handleSync() {
    if (syncing) return;

    setSyncing(true);
    setSearch('');
    setPage(1);

    window.setTimeout(() => {
      setSyncing(false);
      setNotice('Tampilan data dosen berhasil disegarkan.');
    }, 700);
  }

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setNotice('Gunakan file CSV untuk import data.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const lines = String(reader.result ?? '')
        .split(/\r?\n/)
        .filter(Boolean);

      if (lines.length < 2) {
        setNotice('File CSV tidak memiliki data.');
        return;
      }

      const parseLine = (line: string) =>
        line
          .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map((value) =>
            value.trim().replace(/^"|"$/g, '').replace(/""/g, '"'),
          );

      const headers = parseLine(lines[0]).map((header) =>
        header.toLowerCase().replace(/[\s_-]/g, ''),
      );

      const getValue = (values: string[], ...keys: string[]) => {
        const index = headers.findIndex((header) => keys.includes(header));
        return index >= 0 ? (values[index] ?? '') : '';
      };

      const imported: DosenItem[] = [];

      for (const line of lines.slice(1)) {
        const values = parseLine(line);

        const item: DosenForm = {
          nip: getValue(values, 'nip'),
          nama: getValue(values, 'nama', 'namalengkap'),
          email: getValue(values, 'email'),
          prodi: getValue(values, 'prodi', 'programstudi'),
          noIndukUndiksha: getValue(values, 'noindukundiksha', 'noinduk'),
          tempatLahir: getValue(values, 'tempatlahir'),
          tglLahir: getValue(values, 'tgllahir', 'tanggallahir'),
          alamat: getValue(values, 'alamat'),
          jenisKelamin: getValue(values, 'jeniskelamin'),
          jabatanFungsional: getValue(values, 'jabatanfungsional'),
          jabatanStruktural: getValue(values, 'jabatanstruktural'),
          noTelp: getValue(values, 'notelp', 'nomortelepon'),
          golongan: getValue(values, 'golongan'),
          pangkat: getValue(values, 'pangkat'),
          lokasiKerja: getValue(values, 'lokasikerja'),
        };

        if (!item.nip || !item.nama || !item.email || !item.prodi) continue;

        if (
          [...data, ...imported].some(
            (existing) =>
              existing.nip === item.nip ||
              existing.email.toLowerCase() === item.email.toLowerCase(),
          )
        ) {
          continue;
        }

        imported.push({ id: Date.now() + imported.length, ...item });
      }

      if (imported.length) {
        setData((current) => [...imported, ...current]);
        setPage(1);
      }

      setNotice(
        imported.length
          ? `${imported.length} data dosen berhasil diimport.`
          : 'Tidak ada data baru yang berhasil diimport.',
      );
    };

    reader.onerror = () => setNotice('File CSV gagal dibaca.');
    reader.readAsText(file);
    event.target.value = '';
  }

  function updateField(key: FieldKey, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold text-[#172943]">Data Dosen</h1>
          <p className="mt-2 text-[12px] text-[#71819B]">
            Kelola dan lihat data dosen yang terdaftar pada sistem.
          </p>
        </div>

        {/* PENCARIAN DAN AKSI */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
          <div className="px-5 pb-3 pt-4">
            <h2 className="text-[13px] font-bold text-[#172943]">Data Dosen</h2>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari data dosen berdasarkan NIP, nama, email, atau program studi.
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
                placeholder="Cari nama dosen, NIP, email, atau prodi..."
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
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#B8CCFF] bg-white px-3.5 text-[10px] font-semibold text-[#3569F6] hover:bg-[#EEF4FF]"
              >
                <Upload size={14} />
                Import Data
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleImport}
              />

              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                title="Segarkan data"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#3569F6] hover:bg-[#EEF4FF] disabled:opacity-50"
              >
                <RefreshCw
                  size={15}
                  className={syncing ? 'animate-spin' : ''}
                />
              </button>
            </div>
          </div>
        </div>

        {/* TABEL */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF] text-[9px] font-bold text-[#52627A]">
                  <th className="w-[8%] px-3 py-3 text-center">NO.</th>
                  <th className="w-[17%] px-3 py-3">NIP</th>
                  <th className="w-[25%] px-3 py-3">NAMA LENGKAP</th>
                  <th className="w-[25%] px-3 py-3">EMAIL</th>
                  <th className="w-[15%] px-3 py-3">PRODI</th>
                  <th className="w-[12%] px-3 py-3 text-center">AKSI</th>
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
                      {item.nip}
                    </td>
                    <td className="px-3 py-4 text-[10px] font-semibold text-[#273750]">
                      {item.nama}
                    </td>
                    <td className="break-all px-3 py-4 text-[10px] text-[#465670]">
                      {item.email}
                    </td>
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {item.prodi}
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDetailId(item.id)}
                          title="Detail dosen"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-[#EEF4FF]"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit dosen"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-[#EEF4FF]"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteData(item.id)}
                          title="Hapus dosen"
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
                      colSpan={6}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada data dosen yang ditemukan.
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
              {filteredData.length} dosen
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
      {selectedDosen && (
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
                  Detail Dosen
                </h2>
                <p className="mt-0.5 text-[11px] text-[#8493A9]">
                  Informasi lengkap data dosen.
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
                    {selectedDosen.nama
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word.charAt(0))
                      .join('')
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-[15px] font-bold text-[#172943]">
                      {selectedDosen.nama}
                    </h3>
                    <p className="mt-1 text-[11px] text-[#71819B]">
                      {selectedDosen.nip}
                    </p>
                    <div className="mt-2 inline-flex items-center rounded-full bg-[#EAF1FF] px-2.5 py-1 text-[10px] font-semibold text-[#3569F6]">
                      Dosen Asistensi Mengajar
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
                        const value = selectedDosen[field.key];

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
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E8EEF6] bg-white px-5 py-4 sm:px-7">
              <p className="hidden text-[10px] text-[#91A0B5] sm:block">
                Detail informasi dosen
              </p>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDetailId(null)}
                  className="h-9 rounded-lg border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#52627A] hover:bg-[#F4F7FC]"
                >
                  Tutup
                </button>

                <button
                  type="button"
                  onClick={() => {
                    openEdit(selectedDosen);
                    setDetailId(null);
                  }}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#3569F6] px-4 text-[11px] font-semibold text-white hover:bg-[#2856D9]"
                >
                  <Pencil size={14} />
                  Edit Data
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
                  {editingId !== null ? 'Edit Data Dosen' : 'Tambah Data Dosen'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {editingId !== null
                    ? 'Perbarui informasi lengkap dosen.'
                    : 'Lengkapi informasi dosen yang akan ditambahkan.'}
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
                              htmlFor={`dosen-${field.key}`}
                              className="text-[10px] font-semibold text-[#43536B]"
                            >
                              {field.label}
                              {field.required && (
                                <span className="text-red-500"> *</span>
                              )}
                            </label>

                            {field.options ? (
                              <select
                                id={`dosen-${field.key}`}
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
                                id={`dosen-${field.key}`}
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
