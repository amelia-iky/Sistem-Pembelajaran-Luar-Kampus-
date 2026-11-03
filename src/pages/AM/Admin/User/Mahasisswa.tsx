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

type MahasiswaItem = {
  id: number;
  nim: string;
  nama: string;
  email: string;
  prodi: string;
  tahunMasuk: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  agama: string;
  alamat: string;
  noTelp: string;
  semester: string;
  sks: string;
  microteaching: string;
  nilaiAsistensi: string;
};

type MahasiswaForm = Omit<MahasiswaItem, 'id'>;

const emptyForm: MahasiswaForm = {
  nim: '',
  nama: '',
  email: '',
  prodi: '',
  tahunMasuk: '',
  tempatLahir: '',
  tanggalLahir: '',
  jenisKelamin: '',
  agama: '',
  alamat: '',
  noTelp: '',
  semester: '',
  sks: '',
  microteaching: '',
  nilaiAsistensi: '',
};

const initialData: MahasiswaItem[] = [
  {
    id: 1,
    nim: '2215101001',
    nama: 'Amelia Rizky Yuniar',
    email: '2215101001@student.undiksha.ac.id',
    prodi: 'Sistem Informasi',
    tahunMasuk: '2022',
    tempatLahir: 'Banyuwangi',
    tanggalLahir: '2004-05-12',
    jenisKelamin: 'Perempuan',
    agama: 'Islam',
    alamat: 'Singaraja, Bali',
    noTelp: '081234567890',
    semester: '9',
    sks: '152',
    microteaching: 'A',
    nilaiAsistensi: '0',
  },
  {
    id: 2,
    nim: '2215101002',
    nama: 'I Made Aditya Pratama',
    email: '2215101002@student.undiksha.ac.id',
    prodi: 'Sistem Informasi',
    tahunMasuk: '2022',
    tempatLahir: 'Singaraja',
    tanggalLahir: '2004-02-19',
    jenisKelamin: 'Laki-laki',
    agama: 'Hindu',
    alamat: 'Singaraja, Bali',
    noTelp: '081234567891',
    semester: '9',
    sks: '148',
    microteaching: 'A',
    nilaiAsistensi: '0',
  },
  {
    id: 3,
    nim: '2215101003',
    nama: 'Ni Putu Ayu Lestari',
    email: '2215101003@student.undiksha.ac.id',
    prodi: 'Sistem Informasi',
    tahunMasuk: '2022',
    tempatLahir: 'Denpasar',
    tanggalLahir: '2004-07-10',
    jenisKelamin: 'Perempuan',
    agama: 'Hindu',
    alamat: 'Denpasar, Bali',
    noTelp: '081234567892',
    semester: '9',
    sks: '150',
    microteaching: 'A',
    nilaiAsistensi: '0',
  },
  {
    id: 4,
    nim: '2215101004',
    nama: 'I Kadek Dwi Saputra',
    email: '2215101004@student.undiksha.ac.id',
    prodi: 'Sistem Informasi',
    tahunMasuk: '2022',
    tempatLahir: 'Tabanan',
    tanggalLahir: '2004-09-21',
    jenisKelamin: 'Laki-laki',
    agama: 'Hindu',
    alamat: 'Tabanan, Bali',
    noTelp: '081234567893',
    semester: '9',
    sks: '146',
    microteaching: 'B',
    nilaiAsistensi: '0',
  },
  {
    id: 5,
    nim: '2215101005',
    nama: 'Ni Made Citra Dewi',
    email: '2215101005@student.undiksha.ac.id',
    prodi: 'Pendidikan Teknik Informatika',
    tahunMasuk: '2022',
    tempatLahir: 'Gianyar',
    tanggalLahir: '2004-11-15',
    jenisKelamin: 'Perempuan',
    agama: 'Hindu',
    alamat: 'Gianyar, Bali',
    noTelp: '081234567894',
    semester: '9',
    sks: '152',
    microteaching: 'A',
    nilaiAsistensi: '0',
  },
];

const inputClass =
  'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]';

const fields: {
  key: keyof MahasiswaForm;
  label: string;
  required?: boolean;
  type?: string;
}[] = [
  { key: 'nim', label: 'NIM', required: true },
  { key: 'nama', label: 'Nama Lengkap', required: true },
  { key: 'email', label: 'Email', required: true, type: 'email' },
  { key: 'prodi', label: 'Program Studi', required: true },
  { key: 'tahunMasuk', label: 'Tahun Masuk' },
  { key: 'semester', label: 'Semester' },
  { key: 'tempatLahir', label: 'Tempat Lahir' },
  { key: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date' },
  { key: 'jenisKelamin', label: 'Jenis Kelamin' },
  { key: 'agama', label: 'Agama' },
  { key: 'alamat', label: 'Alamat' },
  { key: 'noTelp', label: 'No. Telepon' },
  { key: 'sks', label: 'SKS' },
  { key: 'microteaching', label: 'Microteaching' },
  { key: 'nilaiAsistensi', label: 'Nilai Asistensi Mengajar' },
];

export default function MahasiswaAM() {
  const [data, setData] = useState<MahasiswaItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<MahasiswaItem | null>(
    null,
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<MahasiswaForm>({ ...emptyForm });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [syncing, setSyncing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageSize = 10;

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      [item.nim, item.nama, item.email, item.prodi]
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

  function openEdit(item: MahasiswaItem) {
    setEditingId(item.id);

    const { id: _id, ...values } = item;
    void _id;

    setForm(values);
    setError('');
    setModalOpen(true);
  }

  function openDetail(item: MahasiswaItem) {
    setSelectedStudent(item);
    setDetailOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleaned = {
      ...form,
      nim: form.nim.trim(),
      nama: form.nama.trim(),
      email: form.email.trim(),
      prodi: form.prodi.trim(),
    };

    if (!cleaned.nim || !cleaned.nama || !cleaned.email || !cleaned.prodi) {
      setError('NIM, nama, email, dan prodi wajib diisi.');
      return;
    }

    if (
      data.some((item) => item.id !== editingId && item.nim === cleaned.nim)
    ) {
      setError('NIM sudah terdaftar.');
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

      setNotice('Data mahasiswa berhasil diperbarui.');
    } else {
      setData((current) => [{ id: Date.now(), ...cleaned }, ...current]);
      setPage(1);
      setNotice('Data mahasiswa berhasil ditambahkan.');
    }

    closeModal();
  }

  function deleteData(id: number) {
    if (!window.confirm('Yakin ingin menghapus data mahasiswa ini?')) return;

    setData((current) => current.filter((item) => item.id !== id));

    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
      setDetailOpen(false);
    }

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
      setNotice('Tampilan data mahasiswa berhasil disegarkan.');
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
      const content = String(reader.result ?? '');
      const lines = content.split(/\r?\n/).filter(Boolean);

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

      const imported: MahasiswaItem[] = [];

      const getValue = (values: string[], ...keys: string[]) => {
        const index = headers.findIndex((header) => keys.includes(header));
        return index >= 0 ? (values[index] ?? '') : '';
      };

      for (const line of lines.slice(1)) {
        const values = parseLine(line);
        const nim = getValue(values, 'nim');
        const nama = getValue(values, 'nama', 'namalengkap');
        const email = getValue(values, 'email');
        const prodi = getValue(values, 'prodi', 'programstudi');

        if (!nim || !nama || !email || !prodi) continue;

        if (
          [...data, ...imported].some(
            (item) =>
              item.nim === nim ||
              item.email.toLowerCase() === email.toLowerCase(),
          )
        ) {
          continue;
        }

        imported.push({
          id: Date.now() + imported.length,
          ...emptyForm,
          nim,
          nama,
          email,
          prodi,
          tahunMasuk: getValue(values, 'tahunmasuk'),
          tempatLahir: getValue(values, 'tempatlahir'),
          tanggalLahir: getValue(values, 'tanggallahir'),
          jenisKelamin: getValue(values, 'jeniskelamin'),
          agama: getValue(values, 'agama'),
          alamat: getValue(values, 'alamat'),
          noTelp: getValue(values, 'notelp', 'nomortelepon'),
          semester: getValue(values, 'semester'),
          sks: getValue(values, 'sks'),
          microteaching: getValue(values, 'microteaching'),
          nilaiAsistensi: getValue(values, 'nilaiasistensi'),
        });
      }

      if (imported.length) {
        setData((current) => [...imported, ...current]);
        setPage(1);
      }

      setNotice(
        imported.length
          ? `${imported.length} data mahasiswa berhasil diimport.`
          : 'Tidak ada data baru yang berhasil diimport.',
      );
    };

    reader.onerror = () => setNotice('File CSV gagal dibaca.');
    reader.readAsText(file);
    event.target.value = '';
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5">
          <h1 className="text-[22px] font-bold text-[#172943]">
            Data Mahasiswa
          </h1>
          <p className="mt-2 text-[12px] text-[#71819B]">
            Kelola dan lihat data mahasiswa yang terdaftar pada sistem.
          </p>
        </div>

        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
          <div className="px-5 pb-3 pt-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Mahasiswa
            </h2>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari data mahasiswa berdasarkan NIM, nama, email, atau program
              studi.
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
                placeholder="Cari nama mahasiswa, NIM, atau prodi..."
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

        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#EEF4FF] text-[9px] font-bold text-[#52627A]">
                  <th className="w-[8%] px-3 py-3 text-center">NO.</th>
                  <th className="w-[17%] px-3 py-3">NIM</th>
                  <th className="w-[20%] px-3 py-3">NAMA LENGKAP</th>
                  <th className="w-[25%] px-3 py-3">EMAIL</th>
                  <th className="w-[18%] px-3 py-3">PRODI</th>
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
                      {item.nim}
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
                          onClick={() => openDetail(item)}
                          title="Detail mahasiswa"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-[#EEF4FF]"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit mahasiswa"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-[#EEF4FF]"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteData(item.id)}
                          title="Hapus mahasiswa"
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
                      Tidak ada data mahasiswa yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#E8EEF7] px-4 py-3">
            <p className="text-[10px] text-[#8291A8]">
              Menampilkan{' '}
              {filteredData.length ? (safePage - 1) * pageSize + 1 : 0}–
              {Math.min(safePage * pageSize, filteredData.length)} dari{' '}
              {filteredData.length} mahasiswa
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

      {/* MODAL DETAIL MAHASISWA */}
      {detailOpen && selectedStudent && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#10233F]/50 p-3 backdrop-blur-[3px] sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDetailOpen(false);
            }
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-[#E2EAF5] bg-[#F8FAFD] shadow-[0_20px_60px_rgba(15,35,65,0.20)]">
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#E8EEF6] bg-white px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-[15px] font-bold text-[#172943]">
                    Detail Mahasiswa
                  </h2>
                  <p className="mt-0.5 text-[11px] text-[#8493A9]">
                    Informasi lengkap mahasiswa Asistensi Mengajar
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDetailOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8291A8] transition hover:bg-[#F1F5F9] hover:text-[#273750]"
                title="Tutup"
              >
                <X size={19} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {/* PROFILE */}
              <div className="mb-5 flex flex-col gap-4 rounded-xl border border-[#DCE7F8] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F0FF] text-[20px] font-bold text-[#3569F6]">
                    {selectedStudent.nama
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word.charAt(0))
                      .join('')
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-[15px] font-bold text-[#172943]">
                      {selectedStudent.nama}
                    </h3>

                    <p className="mt-1 text-[11px] text-[#71819B]">
                      {selectedStudent.nim}
                    </p>

                    <div className="mt-2 inline-flex items-center rounded-full bg-[#EAF1FF] px-2.5 py-1 text-[10px] font-semibold text-[#3569F6]">
                      Mahasiswa Asistensi Mengajar
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#F4F7FC] px-4 py-3 sm:min-w-[155px]">
                  <p className="text-[10px] font-medium text-[#8291A8]">
                    Fakultas
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-[#354760]">
                    Fakultas Teknik dan Kejuruan
                  </p>
                </div>
              </div>

              {/* IDENTITAS PRIBADI */}
              <div className="mb-4 overflow-hidden rounded-xl border border-[#E2EAF5] bg-white">
                <div className="flex items-center gap-2 border-b border-[#EDF1F7] px-4 py-3.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#3569F6]">
                    <User size={15} />
                  </div>
                  <h3 className="text-[12px] font-bold text-[#273750]">
                    Identitas Pribadi
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-4 sm:grid-cols-2">
                  {[
                    { label: 'NIM', value: selectedStudent.nim },
                    { label: 'Nama Lengkap', value: selectedStudent.nama },
                    {
                      label: 'Tempat Lahir',
                      value: selectedStudent.tempatLahir,
                    },
                    {
                      label: 'Tanggal Lahir',
                      value: selectedStudent.tanggalLahir,
                    },
                    {
                      label: 'Jenis Kelamin',
                      value: selectedStudent.jenisKelamin,
                    },
                    { label: 'Agama', value: selectedStudent.agama },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] font-medium text-[#91A0B5]">
                        {item.label}
                      </p>
                      <p className="mt-1.5 break-words text-[11px] font-semibold text-[#354760]">
                        {item.value || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* INFORMASI AKADEMIK */}
              <div className="mb-4 overflow-hidden rounded-xl border border-[#E2EAF5] bg-white">
                <div className="flex items-center gap-2 border-b border-[#EDF1F7] px-4 py-3.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#3569F6]">
                    <GraduationCap size={16} />
                  </div>
                  <h3 className="text-[12px] font-bold text-[#273750]">
                    Informasi Akademik
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-4 sm:grid-cols-2">
                  {[
                    { label: 'Program Studi', value: selectedStudent.prodi },
                    { label: 'Tahun Masuk', value: selectedStudent.tahunMasuk },
                    { label: 'Semester', value: selectedStudent.semester },
                    { label: 'Jumlah SKS', value: selectedStudent.sks },
                    {
                      label: 'Nilai Microteaching',
                      value: selectedStudent.microteaching,
                    },
                    {
                      label: 'Nilai Asistensi Mengajar',
                      value: selectedStudent.nilaiAsistensi,
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] font-medium text-[#91A0B5]">
                        {item.label}
                      </p>
                      <p className="mt-1.5 break-words text-[11px] font-semibold text-[#354760]">
                        {item.value || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* INFORMASI KONTAK */}
              <div className="overflow-hidden rounded-xl border border-[#E2EAF5] bg-white">
                <div className="flex items-center gap-2 border-b border-[#EDF1F7] px-4 py-3.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#3569F6]">
                    <Contact size={15} />
                  </div>
                  <h3 className="text-[12px] font-bold text-[#273750]">
                    Informasi Kontak
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <p className="text-[10px] font-medium text-[#91A0B5]">
                      Email
                    </p>
                    <p className="mt-1.5 break-all text-[11px] font-semibold text-[#354760]">
                      {selectedStudent.email || '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-[#91A0B5]">
                      Nomor Telepon
                    </p>
                    <p className="mt-1.5 text-[11px] font-semibold text-[#354760]">
                      {selectedStudent.noTelp || '-'}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-[#91A0B5]">
                      Alamat
                    </p>
                    <p className="mt-1.5 break-words text-[11px] font-semibold text-[#354760]">
                      {selectedStudent.alamat || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E8EEF6] bg-white px-5 py-4 sm:px-7">
              <p className="hidden text-[10px] text-[#91A0B5] sm:block">
                Detail informasi mahasiswa
              </p>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDetailOpen(false)}
                  className="h-9 rounded-lg border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#F4F7FC]"
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
          <div className="max-h-[92vh] w-full max-w-[600px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null
                    ? 'Edit Data Mahasiswa'
                    : 'Tambah Data Mahasiswa'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  {editingId !== null
                    ? 'Perbarui informasi mahasiswa.'
                    : 'Lengkapi informasi mahasiswa yang akan ditambahkan.'}
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

            <form onSubmit={saveData} className="space-y-4 px-5 py-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={
                      ['email', 'prodi', 'alamat'].includes(field.key)
                        ? 'sm:col-span-2'
                        : ''
                    }
                  >
                    <label
                      htmlFor={`mahasiswa-${field.key}`}
                      className="text-[10px] font-semibold text-[#43536B]"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500"> *</span>
                      )}
                    </label>

                    {field.key === 'jenisKelamin' ? (
                      <select
                        id={`mahasiswa-${field.key}`}
                        value={form.jenisKelamin}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            jenisKelamin: event.target.value,
                          }))
                        }
                        className={inputClass}
                      >
                        <option value="">Pilih jenis kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    ) : field.key === 'alamat' ? (
                      <textarea
                        id={`mahasiswa-${field.key}`}
                        rows={2}
                        value={form.alamat}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            alamat: event.target.value,
                          }))
                        }
                        placeholder="Masukkan alamat"
                        className="mt-1.5 w-full rounded-md border border-[#DCE5F1] px-3 py-2 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                      />
                    ) : (
                      <input
                        id={`mahasiswa-${field.key}`}
                        type={field.type ?? 'text'}
                        required={field.required}
                        value={form[field.key]}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            [field.key]: event.target.value,
                          }))
                        }
                        placeholder={`Masukkan ${field.label.toLowerCase()}`}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <p className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-[10px] text-red-600">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-2 border-t border-[#E8EEF7] pt-4">
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
