import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  RefreshCw,
  Search,
  BookOpen,
  Pencil,
  Check,
  X,
} from 'lucide-react';

type Student = {
  id: number;
  name: string;
  nim: string;
  prodi: string;
  faculty: string;
  place: string;
  location: string;
  type: string;
  semester: string;
  supervisor: string;
  mentor: string;
  examiner: string;
  supervisorGrade?: string;
  mentorGrade?: string;
  examinerGrade?: string;
  finalGrade?: string;
};

const students: Student[] = [
  {
    id: 1,
    name: 'Mahasiswa Dummy 27991',
    nim: '9900027991',
    prodi: 'Sistem Informasi (S1)',
    faculty: 'Fakultas Teknik & Kejuruan',
    place: 'Perusahaan Dummy 1350',
    location: 'Denpasar, Bali',
    type: 'Internal',
    semester: 'Semester 7 • Reguler',
    supervisor: 'Dosen Dummy 424',
    mentor: 'Budi Santoso, S.Kom.',
    examiner: 'Dosen Dummy 424',
    supervisorGrade: 'Belum dinilai',
  },
  {
    id: 2,
    name: 'Mahasiswa Dummy 27991',
    nim: '9900027991',
    prodi: 'Sistem Informasi (S1)',
    faculty: 'Fakultas Teknik & Kejuruan',
    place: 'Perusahaan Dummy 1350',
    location: 'Denpasar, Bali',
    type: 'Internal',
    semester: 'Semester 7 • Reguler',
    supervisor: 'Dosen Dummy 424',
    mentor: 'Budi Santoso, S.Kom.',
    examiner: 'Dosen Dummy 424',
    supervisorGrade: 'Belum dinilai',
  },
  {
    id: 3,
    name: 'Amelia Rizky Yuniar',
    nim: '2215100001',
    prodi: 'Sistem Informasi (S1)',
    faculty: 'Fakultas Teknik & Kejuruan',
    place: 'PT Teknologi Nusantara',
    location: 'Badung, Bali',
    type: 'Internal',
    semester: 'Semester 7 • Reguler',
    supervisor: 'Dosen Pembimbing',
    mentor: 'Mentor Lapangan',
    examiner: 'Dosen Penguji',
    supervisorGrade: '88.50',
    mentorGrade: '90.00',
    examinerGrade: '87.00',
    finalGrade: '88.50',
  },
  {
    id: 4,
    name: 'Ni Made Putri',
    nim: '2215100002',
    prodi: 'Sistem Informasi (S1)',
    faculty: 'Fakultas Teknik & Kejuruan',
    place: 'CV Digital Bali',
    location: 'Singaraja, Bali',
    type: 'Eksternal',
    semester: 'Semester 7 • Reguler',
    supervisor: 'I Made Dosen',
    mentor: 'Ayu Lestari, S.Kom.',
    examiner: 'Komang Dosen',
    supervisorGrade: '85.00',
    mentorGrade: '86.00',
    examinerGrade: '84.00',
    finalGrade: '85.00',
  },
  {
    id: 5,
    name: 'I Gede Pratama',
    nim: '2215100003',
    prodi: 'Sistem Informasi (S1)',
    faculty: 'Fakultas Teknik & Kejuruan',
    place: 'PT Bali Teknologi',
    location: 'Denpasar, Bali',
    type: 'Eksternal',
    semester: 'Semester 7 • Reguler',
    supervisor: 'I Ketut Dosen',
    mentor: 'Made Arya, S.Kom.',
    examiner: 'Putu Dosen',
    supervisorGrade: 'Belum dinilai',
  },
  {
    id: 6,
    name: 'Kadek Sari',
    nim: '2215100004',
    prodi: 'Sistem Informasi (S1)',
    faculty: 'Fakultas Teknik & Kejuruan',
    place: 'PT Inovasi Digital',
    location: 'Badung, Bali',
    type: 'Internal',
    semester: 'Semester 7 • Reguler',
    supervisor: 'Dosen Pembimbing',
    mentor: 'Mentor Lapangan',
    examiner: 'Dosen Penguji',
    finalGrade: '82.00',
  },
];

const selectClass =
  'h-10 rounded-md border border-[#B8CCFF] bg-white px-3 text-xs text-[#354760] outline-none transition focus:border-[#3569F6] focus:ring-2 focus:ring-blue-100';

export default function PenilaianMagang() {
  const [period, setPeriod] = useState('');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number[]>([1, 2]);
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState('');

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      [
        student.name,
        student.nim,
        student.prodi,
        student.place,
        student.supervisor,
        student.mentor,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const visibleStudents = filteredStudents.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const toggleExpanded = (id: number) => {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const showNotice = (message: string) => {
    setNotice(message);
  };

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7 text-[#17243A]">
      <div className="mx-auto max-w-[1200px]">
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
                Sinkronisasi Berhasil
              </p>
              <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
                {notice}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Tutup pemberitahuan"
              className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <header className="mb-5">
          <h1 className="text-xl font-semibold tracking-tight text-[#17243A]">
            Penilaian Magang
          </h1>
          <p className="mt-1 text-sm text-[#687D9C]">
            Kelola dan pantau penilaian mahasiswa Magang
          </p>
        </header>

        {/* Card 1: judul daftar dan toolbar sejajar */}
        <section className="mb-4 overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="border-b border-[#E8EEF6] px-4 py-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-[#24344D]">
                  Daftar Mahasiswa &amp; Penilaian
                </h2>
                <span className="rounded-full bg-[#EDF3FF] px-2 py-0.5 text-[10px] font-semibold text-[#3569F6]">
                  {filteredStudents.length} mahasiswa
                </span>
              </div>
              <p className="text-[10px] text-[#8191A8]">
                Daftar nilai individu lengkap dengan aspek pembimbing, mentor,
                dan penguji.
              </p>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]">
              <label className="relative flex h-10 min-w-0 items-center gap-2 rounded-md border border-[#C5D7F5] bg-[#E7F0FC] px-3">
                <Search size={13} className="shrink-0 text-[#8EA3C0]" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Cari nama mahasiswa / NIM..."
                  className="w-full min-w-0 bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
                />
              </label>

              <div className="relative min-w-0">
                <CalendarDays
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3569F6]"
                />
                <select
                  className={`${selectClass} w-full appearance-none pl-9 pr-9`}
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  aria-label="Pilih periode magang"
                >
                  <option value="">Pilih periode magang</option>
                  <option value="Magang Fast Track S1 Sistem Informasi Ganjil 2026/2027">
                    Magang Fast Track S1 Sistem Informasi Ganjil 2026/2027
                  </option>
                  <option value="Magang Reguler S1 Sistem Informasi Ganjil 2026/2027">
                    Magang Reguler S1 Sistem Informasi Ganjil 2026/2027
                  </option>
                  <option value="Magang Fast Track S1 Sistem Informasi Genap 2025/2026">
                    Magang Fast Track S1 Sistem Informasi Genap 2025/2026
                  </option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8191A8]"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  showNotice(
                    period
                      ? 'Rekap nilai siap ditampilkan.'
                      : 'Pilih periode magang terlebih dahulu.',
                  )
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2857D9]"
              >
                <FileText size={14} /> Rekap Nilai
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setPage(1);
                  showNotice('Daftar mahasiswa diperbarui.');
                }}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Card 2: tabel penilaian terpisah dari card periode dan pencarian */}
        <section className="mb-4 overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1280px] border-collapse text-left">
              <thead>
                <tr className="bg-[#F1F5FB] text-[10px] font-bold uppercase tracking-wide text-[#586A83]">
                  <th className="w-16 px-3 py-3 text-center">No.</th>
                  <th className="min-w-[155px] px-3 py-3">Nama</th>
                  <th className="min-w-[105px] px-3 py-3">NIM</th>
                  <th className="min-w-[145px] px-3 py-3">Prodi</th>
                  <th className="min-w-[155px] px-3 py-3">Tempat Magang</th>
                  <th className="min-w-[100px] px-3 py-3">Jenis Magang</th>
                  <th className="w-20 px-3 py-3 text-center">Blog</th>
                  <th className="w-28 px-3 py-3 text-center">Jurnal Harian</th>
                  <th className="w-24 px-3 py-3 text-center">Laporan Akhir</th>
                  <th className="min-w-[125px] px-3 py-3 text-center">
                    Nilai Pembimbing
                  </th>
                  <th className="min-w-[115px] px-3 py-3 text-center">
                    Nilai Mentor
                  </th>
                  <th className="min-w-[115px] px-3 py-3 text-center">
                    Nilai Penguji
                  </th>
                  <th className="min-w-[105px] px-3 py-3 text-center">
                    Nilai Akhir
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleStudents.map((student, index) => (
                  <>
                    <tr
                      key={`student-${student.id}`}
                      className="border-t border-[#E8EEF6] text-[10px] text-[#34445D] hover:bg-[#FBFCFE]"
                    >
                      <td className="px-3 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            aria-label={
                              expanded.includes(student.id)
                                ? 'Tutup detail mahasiswa'
                                : 'Buka detail mahasiswa'
                            }
                            onClick={() => toggleExpanded(student.id)}
                            className="flex h-4 w-4 items-center justify-center rounded border border-[#D7E2F0] text-[#6B809B] hover:border-[#3569F6] hover:text-[#3569F6]"
                          >
                            {expanded.includes(student.id) ? '−' : '+'}
                          </button>
                          <span>{(page - 1) * pageSize + index + 1}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-semibold text-[#17243A]">
                          {student.name}
                        </div>
                        <div className="mt-1 text-[9px] text-[#7C8DA5]">
                          {student.semester}
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono text-[9px]">
                        {student.nim}
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-[#273A55]">
                          {student.prodi}
                        </div>
                        <div className="mt-1 text-[9px] leading-4 text-[#7C8DA5]">
                          {student.faculty}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-[#273A55]">
                          {student.place}
                        </div>
                        <div className="mt-1 text-[9px] text-[#7C8DA5]">
                          {student.location}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full border px-2 py-1 text-[9px] font-medium ${
                            student.type === 'Internal'
                              ? 'border-[#A7E5C0] bg-[#EAFBF1] text-[#16834A]'
                              : 'border-[#B8CCFF] bg-[#EEF4FF] text-[#3569F6]'
                          }`}
                        >
                          {student.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() =>
                            showNotice(`Membuka blog ${student.name}`)
                          }
                          className="inline-flex items-center gap-1 rounded border border-[#B8CCFF] bg-white px-2 py-1 text-[9px] font-medium text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          <Pencil size={10} /> Blog
                        </button>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() =>
                            showNotice(`Membuka jurnal harian ${student.name}`)
                          }
                          className="inline-flex items-center gap-1 rounded border border-[#B8CCFF] bg-white px-2 py-1 text-[9px] font-medium text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          <BookOpen size={10} /> Jurnal
                        </button>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() =>
                            showNotice(`Membuka laporan akhir ${student.name}`)
                          }
                          className="inline-flex items-center gap-1 rounded border border-[#B8CCFF] bg-white px-2 py-1 text-[9px] font-medium text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          <FileText size={10} /> Laporan
                        </button>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Grade value={student.supervisorGrade} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Grade value={student.mentorGrade} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Grade value={student.examinerGrade} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Grade value={student.finalGrade} final />
                      </td>
                    </tr>
                    {expanded.includes(student.id) && (
                      <tr
                        key={`detail-${student.id}`}
                        className="border-t border-[#E8EEF6] bg-[#F8FAFD] text-[9px] text-[#5E718C]"
                      >
                        <td colSpan={13} className="px-4 py-2.5">
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="text-[#8DA0B8]">♧</span>
                              <strong className="text-[8px] uppercase tracking-wide text-[#8191A8]">
                                Dosen Pembimbing:
                              </strong>
                              <span className="font-semibold text-[#34445D]">
                                {student.supervisor}
                              </span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <span className="text-[#8DA0B8]">▤</span>
                              <strong className="text-[8px] uppercase tracking-wide text-[#8191A8]">
                                Mentor Lapangan:
                              </strong>
                              <span className="font-semibold text-[#34445D]">
                                {student.mentor}
                              </span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <span className="text-[#8DA0B8]">▢</span>
                              <strong className="text-[8px] uppercase tracking-wide text-[#8191A8]">
                                Dosen Penguji:
                              </strong>
                              <span className="font-semibold text-[#34445D]">
                                {student.examiner}
                              </span>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {visibleStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={13}
                      className="px-4 py-10 text-center text-xs text-[#8191A8]"
                    >
                      Mahasiswa tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="flex flex-col gap-3 border-t border-[#E8EEF6] px-4 py-3 text-[10px] text-[#8191A8] sm:flex-row sm:items-center sm:justify-between">
            <span>
              Menampilkan{' '}
              {visibleStudents.length ? (page - 1) * pageSize + 1 : 0}–
              {Math.min(page * pageSize, filteredStudents.length)} dari{' '}
              {filteredStudents.length} entri
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Halaman sebelumnya"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] disabled:opacity-40"
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    type="button"
                    key={number}
                    onClick={() => setPage(number)}
                    className={`h-7 min-w-7 rounded-md border px-2 ${page === number ? 'border-[#3569F6] bg-[#3569F6] text-white' : 'border-[#DCE5F1] bg-white text-[#61748E] hover:bg-[#F4F7FB]'}`}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                aria-label="Halaman berikutnya"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] disabled:opacity-40"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

function Grade({ value, final = false }: { value?: string; final?: boolean }) {
  if (!value || value === 'Belum dinilai') {
    return (
      <span className="text-[9px] italic text-[#A0AEC0]">Belum dinilai</span>
    );
  }

  return (
    <span
      className={`inline-flex min-w-[48px] justify-center rounded px-1.5 py-1 text-[9px] font-semibold ${
        final
          ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'text-[#526783]'
      }`}
    >
      {value}
    </span>
  );
}
