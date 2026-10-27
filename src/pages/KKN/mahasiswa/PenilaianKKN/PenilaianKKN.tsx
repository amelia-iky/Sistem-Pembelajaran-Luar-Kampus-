import { useState } from 'react';
import {
  Info,
  Users,
  Landmark,
  Save,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type AssessmentType = 'peer' | 'village';

interface Student {
  id: number;
  nim: string;
  name: string;
  prodi: string;
  faculty: string;
  scores: number[];
}

interface AssessmentAspect {
  name: string;
  description: string;
  weight: number;
}

const peerAspects: AssessmentAspect[] = [
  { name: 'Aspek 1', description: 'Kerja Sama Tim', weight: 20 },
  { name: 'Aspek 2', description: 'Tanggung Jawab', weight: 20 },
  { name: 'Aspek 3', description: 'Inisiatif & Kreativitas', weight: 20 },
  { name: 'Aspek 4', description: 'Komunikasi', weight: 20 },
  { name: 'Aspek 5', description: 'Etika', weight: 20 },
];

const villageAspects: AssessmentAspect[] = [
  { name: 'Aspek 1', description: 'Kedisiplinan', weight: 25 },
  { name: 'Aspek 2', description: 'Kepatuhan tinggal di desa', weight: 25 },
  { name: 'Aspek 3', description: 'Sopan santun', weight: 25 },
  {
    name: 'Aspek 4',
    description: 'Partisipasi dalam kegiatan',
    weight: 25,
  },
];

const initialStudents: Student[] = [
  {
    id: 1,
    nim: '2215101645',
    name: 'Amelia Rizky Yuniar',
    prodi: 'Sistem Informasi',
    faculty: 'Fakultas Teknik dan Kejuruan',
    scores: [0, 0, 0, 0, 0],
  },
  {
    id: 2,
    nim: '2215101012',
    name: 'I Made Aditya Pratama',
    prodi: 'Sistem Informasi',
    faculty: 'Fakultas Teknik dan Kejuruan',
    scores: [0, 0, 0, 0, 0],
  },
  {
    id: 3,
    nim: '2215101034',
    name: 'Ni Putu Ayu Lestari',
    prodi: 'Pendidikan Teknik Informatika',
    faculty: 'Fakultas Teknik dan Kejuruan',
    scores: [0, 0, 0, 0, 0],
  },
  {
    id: 4,
    nim: '2211831621',
    name: 'Komang Bagus Wiradharma',
    prodi: 'Pendidikan Guru Sekolah Dasar',
    faculty: 'Fakultas Ilmu Pendidikan',
    scores: [0, 0, 0, 0, 0],
  },
  ...Array.from(
    { length: 6 },
    (_, index): Student => ({
      id: index + 5,
      nim: `22141010${String(index + 5).padStart(2, '0')}`,
      name: 'Mahasiswa Dummy',
      prodi: 'Ilmu Hukum (S1)',
      faculty: 'Fakultas Hukum dan Ilmu Sosial',
      scores: [0, 0, 0, 0, 0],
    }),
  ),
];

export default function PenilaianKKN() {
  const [assessmentType, setAssessmentType] = useState<AssessmentType>('peer');

  const [students, setStudents] = useState<Student[]>(initialStudents);

  const [savedStudents, setSavedStudents] =
    useState<Student[]>(initialStudents);

  const [notification, setNotification] = useState('');

  const [page, setPage] = useState(1);

  const aspects = assessmentType === 'peer' ? peerAspects : villageAspects;

  const maxScore = 100;
  const minScore = 20;
  const pageSize = 10;

  const pageCount = Math.max(1, Math.ceil(students.length / pageSize));

  const visibleStudents = students.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const updateScore = (
    studentId: number,
    aspectIndex: number,
    value: string,
  ) => {
    if (value !== '' && !/^\d{1,3}$/.test(value)) return;

    if (value !== '') {
      const numericValue = Number(value);

      if (numericValue > maxScore) return;
    }

    setStudents((previous) =>
      previous.map((student) => {
        if (student.id !== studentId) return student;

        const scores = [...student.scores];

        scores[aspectIndex] =
          value === '' ? ('' as unknown as number) : Number(value);

        return { ...student, scores };
      }),
    );
  };

  const handleSave = () => {
    const hasInvalidScore = students.some((student) =>
      student.scores
        .slice(0, aspects.length)
        .some(
          (score) =>
            score === ('' as unknown as number) ||
            !Number.isFinite(score) ||
            score < minScore ||
            score > maxScore,
        ),
    );

    if (hasInvalidScore) {
      setNotification(
        'Periksa kembali nilai. Masukkan angka 20–100 pada setiap kolom.',
      );
      return;
    }

    setSavedStudents(
      students.map((student) => ({
        ...student,
        scores: [0, 0, 0, 0, 0],
      })),
    );

    setNotification('Penilaian berhasil disimpan.');
  };

  const switchAssessment = (type: AssessmentType) => {
    setAssessmentType(type);
    setNotification('');
  };

  const hasUnsavedChanges =
    JSON.stringify(students) !== JSON.stringify(savedStudents);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-xl font-bold text-slate-900">Penilaian KKN</h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola Penilaian Selama KKN
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => switchAssessment('peer')}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${
              assessmentType === 'peer'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-blue-300 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users size={14} />
            Penilaian Teman Sejawat
          </button>

          <button
            type="button"
            onClick={() => switchAssessment('village')}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${
              assessmentType === 'village'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-blue-300 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Landmark size={14} />
            Penilaian Kepala Desa
          </button>
        </div>

        <section className="rounded-xl border border-blue-300 bg-white p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-md bg-blue-50 p-2 text-blue-600">
              <Info size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-bold text-slate-800">
                Petunjuk Penilaian{' '}
                {assessmentType === 'peer' ? 'Teman Sejawat' : 'Kepala Desa'}
              </h2>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Masukkan nilai pada setiap aspek penilaian. Nilai harus berada
                dalam rentang {minScore}–{maxScore} untuk masing-masing
                mahasiswa.
              </p>

              <div
                className={`mt-3 grid gap-2 ${
                  aspects.length === 5
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                    : 'grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {aspects.map((aspect) => (
                  <div
                    key={aspect.name}
                    className="rounded-md border border-blue-300 bg-blue-50/40 p-2"
                  >
                    <p className="text-[10px] font-bold text-slate-700">
                      {aspect.name}:
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-slate-600">
                      {aspect.description} — {aspect.weight}%
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-end">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
                  Skor: {minScore} s.d. {maxScore}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-blue-300 bg-white">
          <div className="flex flex-col gap-2 border-b border-blue-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                {assessmentType === 'peer'
                  ? 'Penilaian Teman Sejawat'
                  : 'Penilaian Kepala Desa'}
              </h2>

              <p className="mt-1 text-[11px] text-slate-500">
                Berikan penilaian sesuai aspek yang telah ditentukan.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <Users size={13} className="text-blue-600" />
              Total: {students.length} Mahasiswa KKN
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] text-slate-600">
                  <th className="w-12 px-3 py-3 text-center font-semibold">
                    NO.
                  </th>

                  <th className="w-28 px-3 py-3 font-semibold">NIM</th>

                  <th className="w-48 px-3 py-3 font-semibold">
                    NAMA ANGGOTA KELOMPOK
                  </th>

                  <th className="w-48 px-3 py-3 font-semibold">
                    PRODI / FAKULTAS
                  </th>

                  {aspects.map((aspect) => (
                    <th
                      key={aspect.name}
                      className="w-24 px-2 py-3 text-center font-semibold"
                    >
                      <span className="block">{aspect.name.toUpperCase()}</span>
                      <span className="mt-1 block text-[9px] font-normal">
                        NILAI
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-t border-blue-200 transition hover:bg-blue-50/30"
                  >
                    <td className="px-3 py-3 text-center text-[10px] text-slate-500">
                      {(page - 1) * pageSize + index + 1}
                    </td>

                    <td className="px-3 py-3 text-[10px] text-slate-600">
                      {student.nim}
                    </td>

                    <td className="px-3 py-3">
                      <p className="text-[11px] font-semibold text-slate-800">
                        {student.name}
                      </p>
                    </td>

                    <td className="px-3 py-3">
                      <p className="text-[10px] font-medium text-slate-700">
                        {student.prodi}
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-400">
                        {student.faculty}
                      </p>
                    </td>

                    {aspects.map((aspect, aspectIndex) => (
                      <td key={aspect.name} className="px-2 py-3 text-center">
                        <input
                          type="number"
                          min={minScore}
                          max={maxScore}
                          step={1}
                          value={student.scores[aspectIndex] ?? 0}
                          aria-label={`Nilai ${aspect.name} ${student.name}`}
                          onChange={(event) =>
                            updateScore(
                              student.id,
                              aspectIndex,
                              event.target.value,
                            )
                          }
                          className="w-[58px] rounded-md border border-blue-300 bg-white px-1.5 py-2 text-center text-xs font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </td>
                    ))}
                  </tr>
                ))}

                {visibleStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={4 + aspects.length}
                      className="px-4 py-12 text-center text-sm text-slate-400"
                    >
                      Belum ada data mahasiswa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-blue-200 bg-slate-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-[10px] text-slate-500">
              <Info size={12} className="mr-1 inline-block text-blue-600" />
              Nilai dapat diperbarui selama periode penilaian KKN berlangsung.
            </p>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  aria-label="Halaman sebelumnya"
                  className="rounded-md border border-blue-300 bg-white p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                </button>

                <span className="px-2 text-[10px] text-slate-500">
                  {page} / {pageCount}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(pageCount, current + 1))
                  }
                  disabled={page === pageCount}
                  aria-label="Halaman berikutnya"
                  className="rounded-md border border-blue-300 bg-white p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronRight size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Save size={14} />
                Simpan Penilaian
              </button>
            </div>
          </div>
        </section>

        {hasUnsavedChanges && (
          <p className="text-xs text-amber-600">
            Ada perubahan nilai yang belum disimpan.
          </p>
        )}
      </main>

      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-title"
            className="w-full max-w-sm rounded-xl border border-blue-300 bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setNotification('')}
              aria-label="Tutup notifikasi"
              className="absolute"
            >
              <X size={16} />
            </button>

            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                notification.includes('berhasil')
                  ? 'bg-green-50 text-green-600'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              {notification.includes('berhasil') ? (
                <CheckCircle2 size={25} />
              ) : (
                <Info size={25} />
              )}
            </div>

            <h2
              id="notification-title"
              className="mt-4 text-center text-base font-bold text-slate-900"
            >
              {notification.includes('berhasil')
                ? 'Berhasil!'
                : 'Periksa Nilai'}
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              {notification}
            </p>

            <button
              type="button"
              onClick={() => setNotification('')}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
