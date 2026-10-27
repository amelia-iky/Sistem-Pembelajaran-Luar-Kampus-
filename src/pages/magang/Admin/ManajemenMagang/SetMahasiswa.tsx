import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  RefreshCw,
  Trash2,
  Check,
  Clock3,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
} from 'lucide-react';

type Student = {
  id: number;
  nama: string;
  prodi: string;
  nim: string;
  hp: string;
  tempat: string;
  status: 'Sudah sinkron' | 'Belum sinkron';
};

const sampleStudents: Student[] = [
  {
    id: 1,
    nama: 'Mahasiswa Dummy',
    prodi: 'S1 Sistem Informasi',
    nim: '9900027985',
    hp: '081241020201',
    tempat: 'Perusahaan Dummy',
    status: 'Sudah sinkron',
  },
  {
    id: 2,
    nama: 'Mahasiswa Dummy',
    prodi: 'S1 Sistem Informasi',
    nim: '9900027985',
    hp: '081241020201',
    tempat: 'Perusahaan Dummy',
    status: 'Sudah sinkron',
  },
  {
    id: 3,
    nama: 'Mahasiswa Dummy',
    prodi: 'S1 Sistem Informasi',
    nim: '9900027985',
    hp: '081241020201',
    tempat: 'Perusahaan Dummy',
    status: 'Sudah sinkron',
  },
  {
    id: 4,
    nama: 'Mahasiswa Dummy',
    prodi: 'S1 Sistem Informasi',
    nim: '9900027985',
    hp: '081241020201',
    tempat: 'Perusahaan Dummy',
    status: 'Sudah sinkron',
  },
];

export default function SetMahasiswa() {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingStudents = (
    location.state as {
      selectedStudents?: Array<{
        id: number;
        nama: string;
        prodi: string;
        nim: string;
        tempat: string;
      }>;
    } | null
  )?.selectedStudents;
  const [students, setStudents] = useState<Student[]>(
    incomingStudents?.length
      ? incomingStudents.map((student) => ({
          id: student.id,
          nama: student.nama,
          prodi: student.prodi.startsWith('S1')
            ? student.prodi
            : `S1 ${student.prodi}`,
          nim: student.nim,
          hp: '—',
          tempat: student.tempat || 'Belum ditentukan',
          status: 'Sudah sinkron',
        }))
      : sampleStudents,
  );
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Notifikasi sukses otomatis hilang setelah 3,5 detik.
  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) =>
      `${student.nama} ${student.nim} ${student.hp} ${student.tempat}`
        .toLowerCase()
        .includes(query),
    );
  }, [students, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const syncKrs = () => {
    setStudents((current) =>
      current.map((student) => ({ ...student, status: 'Sudah sinkron' })),
    );
    setNotice('KRS berhasil disinkronkan (simulasi).');
  };

  const removeStudent = (id: number) => {
    setStudents((current) => current.filter((student) => student.id !== id));
    setNotice('Mahasiswa dihapus dari daftar ini (simulasi).');
    setPage(1);
  };

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 font-sans text-[#24334D] sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Set Mahasiswa
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Sinkronkan mahasiswa yang telah mengambil mata kuliah Magang pada
            sistem SIAK.
          </p>
        </header>

        <section className="mb-6 flex flex-col gap-3 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_3px_7px_rgba(31,52,80,0.08)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#EEF4FF] text-[#3569F6]">
              <Clock3 size={17} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold tracking-wide text-[#8291A8]">
                PERIODE MAGANG
              </p>
              <p className="mt-1 text-[11px] font-semibold text-[#273750]">
                Magang Fast Track S1 Sistem Informasi Ganjil 2026/2027
                <span className="ml-2 inline-flex rounded bg-[#EEF4FF] px-1.5 py-0.5 text-[8px] font-medium text-[#52627A]">
                  2026/1
                </span>
              </p>
            </div>
          </div>
          <div className="inline-flex h-8 shrink-0 items-center gap-1.5 self-start rounded-md border border-[#B8CCFF] px-2.5 text-[9px] font-medium text-[#52627A] sm:self-auto">
            <Clock3 size={11} />
            20 Juli 2026 – 31 Desember 2026
          </div>
        </section>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className="fixed right-5 top-5 z-[70] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={19} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1 pr-1">
              <p className="text-[12px] font-semibold text-[#24334D]">
                {notice.toLowerCase().includes('dihapus')
                  ? 'Data berhasil dihapus'
                  : notice.toLowerCase().includes('sinkron')
                    ? 'Sinkronisasi berhasil'
                    : 'Berhasil'}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
                {notice}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Tutup notifikasi"
              className="shrink-0 rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="flex flex-col gap-3 p-3 sm:p-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[13px] font-bold text-[#172943]">
                    Sinkronisasi KRS
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-600">
                    <Check size={10} /> KRS berhasil disinkronkan
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Daftar mahasiswa yang terdata pada periode Magang aktif.
                </p>
              </div>
              <button
                type="button"
                onClick={syncKrs}
                className="inline-flex h-9 items-center justify-center gap-1.5 self-start rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white transition hover:bg-blue-700 sm:self-auto"
              >
                <RefreshCw size={12} /> Sinkronkan KRS
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-[#C5D7F5] bg-[#E7F0FC] px-3 sm:max-w-[550px]">
                <Search size={14} className="shrink-0 text-[#8EA3C0]" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Cari nama mahasiswa / NIM..."
                  className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
                />
              </div>
              <p className="text-[9px] text-[#8291A8]">
                <Clock3 size={10} className="mr-1 inline" /> Terakhir
                disinkronkan: Hari ini, 09:42 WITA
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7FA] bg-[#E5EEFC]">
                  {[
                    'NO.',
                    'NAMA',
                    'NIM',
                    'NO. HP',
                    'TEMPAT MAGANG',
                    'STATUS',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                  >
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {(safePage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-3 py-4">
                      <p className="text-[10px] font-semibold text-[#273750]">
                        {student.nama}
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#8291A8]">
                        {student.prodi}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {student.nim}
                    </td>
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {student.hp}
                    </td>
                    <td className="px-3 py-4 text-[10px] text-[#465670]">
                      {student.tempat}
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-medium text-emerald-600">
                        <Check size={10} /> {student.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          title="Sinkronkan mahasiswa"
                          onClick={() => {
                            setStudents((current) =>
                              current.map((item) =>
                                item.id === student.id
                                  ? { ...item, status: 'Sudah sinkron' }
                                  : item,
                              ),
                            );
                            setNotice(
                              `${student.nama} berhasil disinkronkan (simulasi).`,
                            );
                          }}
                          className="rounded p-1 text-[#3569F6] hover:bg-blue-50"
                        >
                          <RefreshCw size={13} />
                        </button>
                        <button
                          type="button"
                          title="Hapus dari daftar"
                          onClick={() => removeStudent(student.id)}
                          className="rounded p-1 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-[11px] text-[#8291A8]"
                    >
                      Tidak ada mahasiswa yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#EDF1F7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-[#8A99B0]">
              Menampilkan{' '}
              {filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filtered.length)} dari{' '}
              {filtered.length} mahasiswa
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                aria-label="Halaman sebelumnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${safePage === number ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white' : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'}`}
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
                aria-label="Halaman berikutnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={() => navigate('/admin/magang/manajemen')}
          className="mt-6 inline-flex h-8 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft size={12} /> Kembali ke Manajemen Magang
        </button>
      </div>
    </div>
  );
}
