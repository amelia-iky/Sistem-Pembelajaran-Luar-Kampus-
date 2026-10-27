import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  CalendarDays,
  MapPin,
  Star,
  Check,
} from 'lucide-react';

type JenisMagang = '' | 'Reguler' | 'Mandiri' | 'Studi Independen';
type Semester = '' | 'Ganjil' | 'Genap';
type ScheduleDateKey =
  | 'mulai'
  | 'selesai'
  | 'tempatMulai'
  | 'tempatSelesai'
  | 'nilaiMulai'
  | 'nilaiSelesai';

type Periode = {
  id: number;
  nama: string;
  program: string;
  jenis: JenisMagang;
  tahun: string;
  semester: Semester;
  mulai: string;
  selesai: string;
  tempatMulai?: string;
  tempatSelesai?: string;
  nilaiMulai?: string;
  nilaiSelesai?: string;
  aktif: boolean;
  ketua: string;
  telepon: string;
  email: string;
};

const initialData: Periode[] = [
  {
    id: 1,
    nama: 'Magang Reguler Ganjil 2026/2027',
    program: 'S1 Ilmu Komputer',
    jenis: 'Reguler',
    tahun: '2026',
    semester: 'Ganjil',
    mulai: '2026-08-24',
    selesai: '2026-12-31',
    aktif: true,
    ketua: 'Dosen Dummy',
    telepon: '081233835734',
    email: 'amelia@gmail.com',
  },
  {
    id: 2,
    nama: 'Magang Reguler Ganjil 2026/2027',
    program: 'S1 Ilmu Komputer',
    jenis: 'Mandiri',
    tahun: '2026',
    semester: 'Ganjil',
    mulai: '2026-08-24',
    selesai: '2026-12-31',
    aktif: false,
    ketua: 'Dosen Dummy',
    telepon: '081233835734',
    email: 'amelia@gmail.com',
  },
  {
    id: 3,
    nama: 'Magang Reguler Ganjil 2026/2027',
    program: 'S1 Ilmu Komputer',
    jenis: 'Studi Independen',
    tahun: '2026',
    semester: 'Ganjil',
    mulai: '2026-08-24',
    selesai: '2026-12-31',
    aktif: true,
    ketua: 'Dosen Dummy',
    telepon: '081233835734',
    email: 'amelia@gmail.com',
  },
  ...Array.from(
    { length: 7 },
    (_, index): Periode => ({
      id: index + 4,
      nama: `Magang ${index % 2 === 0 ? 'Reguler' : 'Mandiri'} Genap 2026/2027`,
      program: 'S1 Sistem Informasi',
      jenis: index % 2 === 0 ? 'Reguler' : 'Mandiri',
      tahun: '2027',
      semester: 'Genap',
      mulai: '2027-02-01',
      selesai: '2027-06-30',
      aktif: index % 3 !== 0,
      ketua: 'Dosen Dummy',
      telepon: '081233835734',
      email: 'amelia@gmail.com',
    }),
  ),
];

const emptyForm = {
  nama: '',
  program: '',
  jenis: '' as JenisMagang,
  tahun: '',
  semester: '' as Semester,
  mulai: '',
  selesai: '',
  tempatMulai: '',
  tempatSelesai: '',
  nilaiMulai: '',
  nilaiSelesai: '',
  aktif: true,
  ketua: '',
  telepon: '',
  email: '',
};

function formatTanggal(value: string) {
  if (!value) return '-';
  return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function PeriodeMagang() {
  const [data, setData] = useState<Periode[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [scheduleItem, setScheduleItem] = useState<Periode | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const pageSize = 3;

  // Toast sukses akan hilang otomatis setelah 3,5 detik.
  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(null), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      const cocokPencarian =
        !keyword ||
        `${item.nama} ${item.program} ${item.ketua}`
          .toLowerCase()
          .includes(keyword);
      return cocokPencarian;
    });
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );
  const totalAktif = data.filter((item) => item.aktif).length;
  const totalNonaktif = data.length - totalAktif;

  function bukaLihatJadwal(item: Periode) {
    setScheduleItem(item);
  }

  function bukaTambah() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  }

  function bukaEdit(item: Periode) {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      program: item.program,
      jenis: item.jenis,
      tahun: item.tahun,
      semester: item.semester,
      mulai: item.mulai,
      selesai: item.selesai,
      tempatMulai: item.tempatMulai || '',
      tempatSelesai: item.tempatSelesai || '',
      nilaiMulai: item.nilaiMulai || '',
      nilaiSelesai: item.nilaiSelesai || '',
      aktif: item.aktif,
      ketua: item.ketua,
      telepon: item.telepon,
      email: item.email,
    });
    setModalOpen(true);
  }

  function simpanData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.selesai < form.mulai) {
      window.alert('Tanggal selesai tidak boleh sebelum tanggal mulai.');
      return;
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...form } : item,
        ),
      );
      setNotice({
        title: 'Perubahan berhasil disimpan',
        message: 'Data periode magang berhasil diperbarui.',
      });
    } else {
      setData((current) => [{ id: Date.now(), ...form }, ...current]);
      setPage(1);
      setNotice({
        title: 'Periode berhasil ditambahkan',
        message: 'Data periode magang baru berhasil disimpan.',
      });
    }

    setModalOpen(false);
  }

  function hapusData(id: number) {
    if (window.confirm('Yakin ingin menghapus data periode ini?')) {
      setData((current) => current.filter((item) => item.id !== id));
      setPage(1);
      setNotice({
        title: 'Data berhasil dihapus',
        message: 'Periode magang telah dihapus dari daftar.',
      });
    }
  }

  const inputClass =
    'mt-1.5 h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] font-normal text-[#354760] outline-none focus:border-blue-400';

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
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Periode Magang
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B] sm:text-[13px]">
            Kelola periode pelaksanaan program Magang dan jadwal kegiatan
            mahasiswa.
          </p>
        </div>

        <div className="mb-6">
          <div className="grid w-full grid-cols-1 gap-3 rounded-[10px] border border-[#B8CCFF] bg-white px-5 py-4 shadow-[0_3px_7px_rgba(31,52,80,0.08)] sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center border-b border-[#E8EEF7] pb-3 text-center sm:border-b-0 sm:border-r sm:pb-0">
              <span className="text-[25px] font-bold text-[#172943]">
                {data.length}
              </span>
              <div className="flex flex-col items-center text-center">
                <p className="text-[10px] font-semibold text-[#354660]">
                  TOTAL PERIODE
                </p>
                <p className="mt-1 text-[10px] text-[#8A99B0]">
                  Terdapat pada sistem
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-b border-[#E8EEF7] pb-3 text-center sm:border-b-0 sm:border-r sm:pl-4 sm:pb-0">
              <span className="text-[25px] font-bold text-[#3569F6]">
                {totalAktif}
              </span>
              <div className="flex flex-col items-center text-center">
                <p className="text-[10px] font-semibold text-[#354660]">
                  PERIODE AKTIF
                </p>
                <p className="mt-1 text-[10px] text-[#8A99B0]">
                  Sedang berlangsung
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center sm:pl-4">
              <span className="text-[25px] font-bold text-red-500">
                {totalNonaktif}
              </span>
              <div className="flex flex-col items-center text-center">
                <p className="text-[10px] font-semibold text-[#354660]">
                  PERIODE NONAKTIF
                </p>
                <p className="mt-1 text-[10px] text-[#8A99B0]">
                  Telah selesai / ditutup
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-[10px] border border-[#B8CCFF] bg-white p-3 shadow-[0_3px_7px_rgba(31,52,80,0.08)] lg:flex-row lg:items-center">
          <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
            <Search size={15} className="shrink-0 text-[#8EA3C0]" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari periode, program, atau ketua magang..."
              className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2 self-end lg:ml-auto lg:self-auto">
            <button
              type="button"
              onClick={bukaTambah}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={14} />
              Tambah Data
            </button>

            <button
              type="button"
              onClick={() => {
                setSearch('');
                setPage(1);
                setNotice({
                  title: 'Sinkronisasi berhasil',
                  message: 'Data periode berhasil diperbarui.',
                });
              }}
              title="Sinkronisasi data"
              aria-label="Sinkronisasi data"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] transition hover:bg-blue-50 hover:text-blue-600"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E8EEF7] bg-[#F9FBFE]">
                  {[
                    'PERIODE & PROGRAM',
                    'JENIS',
                    'TAHUN & SEMESTER',
                    'PELAKSANAAN',
                    'STATUS',
                    'KETUA MAGANG',
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
                {visibleData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                  >
                    <td className="px-4 py-4">
                      <p className="max-w-[190px] text-[10px] font-bold leading-[15px] text-[#273750]">
                        {item.nama}
                      </p>
                      <p className="mt-1 text-[10px] font-semibold text-[#3C4D68]">
                        {item.program}
                      </p>
                      <p className="mt-1 text-[9px] text-[#94A2B6]">
                        Ilmu Komputer (S1) • Fakultas MIPA
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-center text-[9px] font-medium ${
                          item.jenis === 'Reguler'
                            ? 'bg-blue-50 text-blue-600'
                            : item.jenis === 'Mandiri'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-purple-50 text-purple-600'
                        }`}
                      >
                        {item.jenis}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[10px] font-semibold text-[#465670]">
                        {item.tahun}
                      </p>
                      <p className="mt-1 text-[9px] text-[#94A2B6]">
                        {item.semester}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="whitespace-nowrap text-[10px] font-medium text-[#465670]">
                        {formatTanggal(item.mulai)} –{' '}
                        {formatTanggal(item.selesai)}
                      </p>
                      <button
                        type="button"
                        onClick={() => bukaLihatJadwal(item)}
                        className="mt-1 text-[9px] font-medium text-[#3569F6] hover:underline"
                      >
                        Lihat jadwal →
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          setData((current) =>
                            current.map((row) =>
                              row.id === item.id
                                ? { ...row, aktif: !row.aktif }
                                : row,
                            ),
                          )
                        }
                        className="flex items-center gap-2"
                        aria-label={`Ubah status ${item.nama}`}
                      >
                        <span
                          className={`relative h-[17px] w-[31px] rounded-full ${item.aktif ? 'bg-[#3569F6]' : 'bg-[#CBD5E1]'}`}
                        >
                          <span
                            className={`absolute top-[2px] h-[13px] w-[13px] rounded-full bg-white shadow-sm ${item.aktif ? 'left-[16px]' : 'left-[2px]'}`}
                          />
                        </span>
                        <span
                          className={`text-[9px] ${item.aktif ? 'text-emerald-600' : 'text-red-500'}`}
                        >
                          {item.aktif ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[10px] font-semibold text-[#3C4D68]">
                        {item.ketua}
                      </p>
                      <p className="mt-1 text-[9px] text-[#8A99B0]">
                        {item.telepon}
                      </p>
                      <p className="mt-1 text-[9px] text-[#8A99B0]">
                        {item.email}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => bukaEdit(item)}
                          title="Edit periode"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => hapusData(item.id)}
                          title="Hapus periode"
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
                      colSpan={7}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data periode yang sesuai dengan pencarian.
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
              {filteredData.length} periode
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
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
                        : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'
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
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {scheduleItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setScheduleItem(null);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#B8CCFF] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <span className="inline-flex rounded bg-blue-50 px-2 py-1 text-[9px] font-semibold text-[#3569F6]">
                  Detail Jadwal
                </span>
                <h2 className="mt-2 text-[14px] font-bold text-[#172943]">
                  {scheduleItem.nama} • {scheduleItem.program}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Fakultas MIPA • Jenis: {scheduleItem.jenis} • Tahun{' '}
                  {scheduleItem.tahun} ({scheduleItem.semester})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setScheduleItem(null)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
                aria-label="Tutup detail jadwal"
              >
                <X size={17} />
              </button>
            </div>
            <div className="space-y-3 p-5">
              <div
                className="rounded-xl bg-[#FBFDFF] p-3"
                style={{ border: '1px solid #B8CCFF', boxSizing: 'border-box' }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[#3569F6]">
                    <CalendarDays size={21} strokeWidth={1.9} />
                  </span>
                  <span className="rounded bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
                    PELAKSANAAN
                  </span>
                  <span className="ml-auto text-[9px] text-blue-600">
                    Periode Utama
                  </span>
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#273750]">
                  {formatTanggal(scheduleItem.mulai)} —{' '}
                  {formatTanggal(scheduleItem.selesai)}
                </p>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Masa aktif magang mahasiswa di instansi mitra
                </p>
              </div>
              <div
                className="rounded-xl bg-[#FFFEFC] p-3"
                style={{ border: '1px solid #B8CCFF', boxSizing: 'border-box' }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-600">
                    <MapPin size={21} strokeWidth={1.9} />
                  </span>
                  <span className="rounded bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700">
                    PEMILIHAN TEMPAT
                  </span>
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#273750]">
                  {formatTanggal(scheduleItem.tempatMulai || '')} —{' '}
                  {formatTanggal(scheduleItem.tempatSelesai || '')}
                </p>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Periode pendaftaran & konfirmasi tempat magang
                </p>
              </div>
              <div
                className="rounded-xl bg-[#FBFFFD] p-3"
                style={{ border: '1px solid #B8CCFF', boxSizing: 'border-box' }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600">
                    <Star size={21} strokeWidth={1.9} />
                  </span>
                  <span className="rounded bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
                    PENILAIAN AKHIR
                  </span>
                </div>
                <p className="mt-2 text-[11px] font-semibold text-[#273750]">
                  {formatTanggal(scheduleItem.nilaiMulai || '')} —{' '}
                  {formatTanggal(scheduleItem.nilaiSelesai || '')}
                </p>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Evaluasi nilai oleh pembimbing, mentor & penguji
                </p>
              </div>
            </div>
            <div className="flex justify-end border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3">
              <button
                type="button"
                onClick={() => setScheduleItem(null)}
                className="h-9 rounded-md border border-[#DCE5F1] px-4 text-[11px] font-semibold text-[#52627A] hover:bg-slate-50"
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
          <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-xl border border-[#B8CCFF] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-4 py-3 sm:px-5">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null
                    ? 'Edit Periode Magang'
                    : 'Tambah Periode Magang'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Perbarui informasi periode dan jadwal pelaksanaan Magang.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
                aria-label="Tutup modal"
              >
                <X size={17} />
              </button>
            </div>
            <form
              onSubmit={simpanData}
              className="space-y-4 p-4 sm:px-5 sm:py-4"
            >
              <div>
                <p className="mb-2 text-[9px] font-bold tracking-wide text-[#91A1B8]">
                  INFORMASI PERIODE
                </p>
                <label className="block text-[10px] font-medium text-[#43536B]">
                  Nama Periode <span className="text-red-500">*</span>
                  <input
                    required
                    value={form.nama}
                    onChange={(event) =>
                      setForm({ ...form, nama: event.target.value })
                    }
                    className={inputClass}
                    placeholder="Masukkan nama periode"
                  />
                </label>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <label className="text-[10px] font-medium text-[#43536B]">
                    Jenis Magang <span className="text-red-500">*</span>
                    <select
                      required
                      value={form.jenis}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          jenis: event.target.value as JenisMagang,
                        })
                      }
                      className={inputClass}
                    >
                      <option value="">Pilih jenis</option>
                      <option>Reguler</option>
                      <option>Mandiri</option>
                      <option>Studi Independen</option>
                    </select>
                  </label>
                  <label className="text-[10px] font-medium text-[#43536B]">
                    Tahun <span className="text-red-500">*</span>
                    <input
                      required
                      value={form.tahun}
                      onChange={(event) =>
                        setForm({ ...form, tahun: event.target.value })
                      }
                      className={inputClass}
                      placeholder="Contoh: 2026"
                    />
                  </label>
                  <label className="text-[10px] font-medium text-[#43536B]">
                    Semester <span className="text-red-500">*</span>
                    <select
                      required
                      value={form.semester}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          semester: event.target.value as Semester,
                        })
                      }
                      className={inputClass}
                    >
                      <option value="">Pilih semester</option>
                      <option>Ganjil</option>
                      <option>Genap</option>
                    </select>
                  </label>
                </div>
              </div>
              <div>
                <p className="mb-2 text-[9px] font-bold tracking-wide text-[#91A1B8]">
                  JADWAL MAGANG
                </p>
                {[
                  {
                    title: 'Tanggal Pelaksanaan',
                    start: 'mulai',
                    end: 'selesai',
                    icon: 'calendar',
                  },
                  {
                    title: 'Pemilihan Tempat Magang',
                    start: 'tempatMulai',
                    end: 'tempatSelesai',
                    icon: 'pin',
                  },
                  {
                    title: 'Penilaian Pembimbing, Mentor, dan Penguji',
                    start: 'nilaiMulai',
                    end: 'nilaiSelesai',
                    icon: 'star',
                  },
                ].map((section) => (
                  <div
                    key={section.title}
                    className="mb-2 rounded-lg border border-[#B8CCFF] p-3"
                  >
                    <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-[#43536B]">
                      {section.icon === 'calendar' ? (
                        <CalendarDays size={14} className="text-[#3569F6]" />
                      ) : section.icon === 'pin' ? (
                        <MapPin size={14} className="text-[#3569F6]" />
                      ) : (
                        <Star size={14} className="text-[#3569F6]" />
                      )}
                      {section.title}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="text-[9px] text-[#8291A8]">
                        Mulai
                        <input
                          required
                          type="date"
                          value={
                            section.start === 'mulai'
                              ? form.mulai
                              : form[section.start as ScheduleDateKey] || ''
                          }
                          onChange={(event) =>
                            section.start === 'mulai'
                              ? setForm({ ...form, mulai: event.target.value })
                              : setForm({
                                  ...form,
                                  [section.start]: event.target.value,
                                } as typeof form)
                          }
                          className={inputClass}
                        />
                      </label>
                      <label className="text-[9px] text-[#8291A8]">
                        Sampai
                        <input
                          required
                          type="date"
                          value={
                            section.end === 'selesai'
                              ? form.selesai
                              : form[section.end as ScheduleDateKey] || ''
                          }
                          onChange={(event) =>
                            section.end === 'selesai'
                              ? setForm({
                                  ...form,
                                  selesai: event.target.value,
                                })
                              : setForm({
                                  ...form,
                                  [section.end]: event.target.value,
                                } as typeof form)
                          }
                          className={inputClass}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-2 text-[9px] font-bold tracking-wide text-[#91A1B8]">
                  PROGRAM STUDI
                </p>
                <label className="text-[10px] font-medium text-[#43536B]">
                  Prodi yang Diikuti <span className="text-red-500">*</span>
                  <input
                    required
                    value={form.program}
                    onChange={(event) =>
                      setForm({ ...form, program: event.target.value })
                    }
                    className={inputClass}
                    placeholder="Masukkan program studi"
                  />
                </label>
              </div>
              <div>
                <p className="mb-2 text-[9px] font-bold tracking-wide text-[#91A1B8]">
                  KETUA MAGANG
                </p>
                <label className="text-[10px] font-medium text-[#43536B]">
                  Nama Ketua Magang <span className="text-red-500">*</span>
                  <input
                    required
                    value={form.ketua}
                    onChange={(event) =>
                      setForm({ ...form, ketua: event.target.value })
                    }
                    className={inputClass}
                    placeholder="Pilih / masukkan nama ketua magang"
                  />
                </label>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="text-[10px] font-medium text-[#43536B]">
                    No. HP
                    <input
                      value={form.telepon}
                      onChange={(event) =>
                        setForm({ ...form, telepon: event.target.value })
                      }
                      className={inputClass}
                      placeholder="Nomor telepon"
                    />
                  </label>
                  <label className="text-[10px] font-medium text-[#43536B]">
                    Email
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      className={inputClass}
                      placeholder="nama@email.com"
                    />
                  </label>
                </div>
              </div>
              <label className="flex items-center gap-2 text-[10px] font-medium text-[#43536B]">
                <input
                  type="checkbox"
                  checked={form.aktif}
                  onChange={(event) =>
                    setForm({ ...form, aktif: event.target.checked })
                  }
                  className="h-4 w-4 accent-[#3569F6]"
                />
                Aktifkan periode ini
              </label>
              <div className="flex justify-end gap-2 border-t border-[#E8EEF7] pt-3">
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
                  {editingId !== null ? '✓ Simpan Perubahan' : '✓ Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
