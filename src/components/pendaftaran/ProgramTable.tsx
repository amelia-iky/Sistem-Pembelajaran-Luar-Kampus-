import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type Program = {
  id: number;
  nama: string;
  periode: string;
  status: 'Belum Terdaftar' | 'Sedang Berlangsung' | 'Selesai';
};

type Props = {
  programs: Program[];
  onSelect: (nama: string) => void;
  onEnter: (nama: string) => void;
};

export default function ProgramTable({ programs, onSelect, onEnter }: Props) {
  const navigate = useNavigate();

  const activePrograms = programs.filter(
    (program) => program.status === 'Sedang Berlangsung',
  );

  const hasActiveProgram = activePrograms.length > 0;

  const handleEnter = (nama: string) => {
    const normalizedName = nama.trim().toLowerCase();

    const programRoutes: Record<string, string> = {
      magang: '/magang/mahasiswa/dashboard',
      kkn: '/kkn/mahasiswa/dashboard',
      'asistensi mengajar': '/am/mahasiswa/dashboard',
      am: '/am/mahasiswa/dashboard',
    };

    const programKeys: Record<string, string> = {
      magang: 'magang',
      kkn: 'kkn',
      'asistensi mengajar': 'am',
      am: 'am',
    };

    const route = programRoutes[normalizedName];
    const activeProgram = programKeys[normalizedName];

    if (!route || !activeProgram) {
      alert(`Dashboard untuk program "${nama}" belum dihubungkan.`);
      return;
    }

    // Pastikan program yang dimasuki memang sedang berlangsung.
    const selectedProgram = programs.find(
      (program) => program.nama.trim().toLowerCase() === normalizedName,
    );

    if (selectedProgram?.status !== 'Sedang Berlangsung') {
      alert('Kamu hanya bisa masuk ke program yang sedang berlangsung.');
      return;
    }

    sessionStorage.setItem('active-program', activeProgram);
    onEnter(nama);
    navigate(route);
  };

  const handleSelect = (nama: string) => {
    // Tidak boleh mendaftar program lain jika sudah ada program aktif.
    if (hasActiveProgram) {
      const activeName = activePrograms[0].nama;

      alert(
        `Kamu sedang mengikuti program ${activeName}. Selesaikan program tersebut terlebih dahulu sebelum memilih program lain.`,
      );
      return;
    }

    onSelect(nama);
  };

  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] table-fixed text-left text-xs sm:text-sm">
          <colgroup>
            <col className="w-[12%]" />
            <col className="w-[22%]" />
            <col className="w-[22%]" />
            <col className="w-[25%]" />
            <col className="w-[19%]" />
          </colgroup>

          <thead className="bg-[#EAF0F9] text-[11px] font-bold uppercase text-black sm:text-xs">
            <tr>
              <th className="px-3 py-3 text-center sm:px-4">No</th>
              <th className="px-3 py-3 sm:px-4">Program</th>
              <th className="px-3 py-3 sm:px-4">Periode</th>
              <th className="px-3 py-3 sm:px-4">Status</th>
              <th className="px-3 py-3 text-center sm:px-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {programs.map((program, index) => {
              const isActive = program.status === 'Sedang Berlangsung';

              const isFinished = program.status === 'Selesai';

              const isBlocked =
                program.status === 'Belum Terdaftar' && hasActiveProgram;

              return (
                <tr
                  key={program.id}
                  className="border-t border-gray-300 bg-white transition hover:bg-slate-50"
                >
                  <td className="px-3 py-3 text-center text-slate-700 sm:px-4 sm:py-4">
                    {index + 1}
                  </td>

                  <td className="break-words px-3 py-3 font-medium text-black sm:px-4 sm:py-4">
                    {program.nama}
                  </td>

                  <td className="px-3 py-3 text-slate-800 sm:px-4 sm:py-4">
                    {program.periode}
                  </td>

                  <td className="px-3 py-3 sm:px-4 sm:py-4">
                    <span
                      className={`inline-block rounded-sm px-2 py-1 text-[10px] font-semibold leading-4 sm:px-3 sm:text-xs ${
                        isActive
                          ? 'bg-[#D5F8D9] text-[#087D36]'
                          : isFinished
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-[#FBDCDC] text-[#B91C1C]'
                      }`}
                    >
                      {isActive
                        ? 'Sedang Berlangsung'
                        : isFinished
                          ? 'Sudah Terlaksana'
                          : 'Belum Terdaftar'}
                    </span>
                  </td>

                  <td className="px-2 py-3 text-center sm:px-3 sm:py-4">
                    {isActive ? (
                      <button
                        type="button"
                        onClick={() => handleEnter(program.nama)}
                        className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-semibold text-black hover:text-blue-600"
                      >
                        <LogIn size={14} />
                        Masuk
                      </button>
                    ) : isFinished ? (
                      <span className="text-slate-400">Selesai</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelect(program.nama)}
                        disabled={isBlocked}
                        title={
                          isBlocked
                            ? 'Selesaikan program yang sedang berlangsung terlebih dahulu.'
                            : 'Pilih program'
                        }
                        className={`font-semibold ${
                          isBlocked
                            ? 'cursor-not-allowed text-slate-300'
                            : 'text-black hover:text-blue-600'
                        }`}
                      >
                        Pilih
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
