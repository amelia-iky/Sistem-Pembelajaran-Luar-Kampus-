import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, X } from 'lucide-react';

import ProgramTable from '../../components/pendaftaran/ProgramTable';
import type { Program } from '../../components/pendaftaran/ProgramTable';
import ProgramRegistrationModal from '../../components/pendaftaran/ProgramRegistrationModal';

export default function PendaftaranProgram() {
  const navigate = useNavigate();

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 1,
      nama: 'Magang',
      periode: '2026/2027',
      status: 'Belum Terdaftar',
    },
    {
      id: 2,
      nama: 'KKN',
      periode: '2026/2027',
      status: 'Belum Terdaftar',
    },
    {
      id: 3,
      nama: 'Asistensi Mengajar',
      periode: '2026/2027',
      status: 'Belum Terdaftar',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [message, setMessage] = useState('');

  const activeProgram = programs.find(
    (program) => program.status === 'Sedang Berlangsung',
  );

  function masukProgram(nama: string) {
    const selected = programs.find((program) => program.nama === nama);

    if (selected?.status !== 'Sedang Berlangsung') {
      setMessage('Kamu hanya bisa masuk ke program yang sedang berlangsung.');
      return;
    }

    if (nama === 'Magang') {
      navigate('/magang/mahasiswa/dashboard');
    } else if (nama === 'KKN') {
      navigate('/kkn/mahasiswa/dashboard');
    } else if (nama === 'Asistensi Mengajar') {
      navigate('/am/mahasiswa/dashboard');
    } else {
      setMessage(`Dashboard program ${nama} belum dihubungkan.`);
    }
  }

  function bukaModal(nama = '') {
    if (activeProgram) {
      setMessage(
        `Kamu sedang mengikuti program ${activeProgram.nama}. Selesaikan program tersebut terlebih dahulu sebelum mendaftar program lain.`,
      );
      return;
    }

    setSelectedProgram(nama);
    setMessage('');
    setModalOpen(true);
  }

  function tutupModal() {
    setModalOpen(false);
    setSelectedProgram('');
  }

  function daftarProgram() {
    if (activeProgram) {
      setMessage(
        `Pendaftaran ditolak. Kamu masih mengikuti program ${activeProgram.nama}.`,
      );
      tutupModal();
      return;
    }

    if (!selectedProgram) {
      setMessage('Silakan pilih program terlebih dahulu.');
      return;
    }

    const programDipilih = programs.find(
      (program) => program.nama === selectedProgram,
    );

    if (!programDipilih || programDipilih.status !== 'Belum Terdaftar') {
      setMessage('Program yang dipilih tidak tersedia untuk didaftarkan.');
      return;
    }

    setPrograms((current) => {
      // Validasi ulang agar hanya satu program yang aktif.
      if (current.some((program) => program.status === 'Sedang Berlangsung')) {
        return current;
      }

      return current.map((program) =>
        program.nama === selectedProgram
          ? { ...program, status: 'Sedang Berlangsung' }
          : program,
      );
    });

    setMessage(
      `Pendaftaran ${selectedProgram} berhasil disimpan. Klik Masuk untuk membuka dashboard.`,
    );

    tutupModal();
  }

  return (
    <div className="min-h-screen bg-[#EEF1FA] font-sans text-[#111827]">
      <header className="flex min-h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <img
            src="/logo-undiksha.png"
            alt="Logo Undiksha"
            className="h-10 w-10 shrink-0 object-contain"
          />

          <span className="text-sm font-bold text-black sm:text-base">
            Sistem Pembelajaran Luar Kampus
          </span>
        </div>

        <button type="button" className="text-xs font-medium text-slate-600">
          AMELIA RIZKY YUNIAR <span className="ml-2">⌄</span>
        </button>
      </header>

      <main className="flex min-h-[calc(100vh-104px)] items-center justify-center px-4 py-10 sm:px-8">
        <section className="w-full max-w-[900px] rounded-lg border border-[#8BA9FF] bg-white px-5 py-7 shadow-md sm:px-8 sm:py-8">
          <div className="mb-5">
            <h1 className="text-base font-bold text-black sm:text-lg">
              List Program Pembelajaran Luar Kampus
            </h1>

            <p className="mt-2 text-xs leading-5 text-[#6B7280] sm:text-sm">
              Pastikan Anda telah mengambil mata kuliah prasyarat sesuai dengan
              program yang dituju.
            </p>
          </div>

          <div className="mb-6">
            <button
              type="button"
              onClick={() => bukaModal()}
              disabled={Boolean(activeProgram)}
              title={
                activeProgram
                  ? `Kamu sedang mengikuti program ${activeProgram.nama}.`
                  : 'Daftar program'
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#2453E6] px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:text-sm"
            >
              <ClipboardList size={16} />
              {activeProgram ? 'Program Sudah Terdaftar' : 'Daftar Program'}
            </button>

            {activeProgram && (
              <p className="mt-2 text-xs text-slate-500">
                Kamu sedang mengikuti {activeProgram.nama}. Program lain tidak
                dapat didaftarkan selama program ini berlangsung.
              </p>
            )}
          </div>

          {message && (
            <div
              role="status"
              className="mb-4 flex items-start justify-between gap-3 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700"
            >
              <p>{message}</p>

              <button
                type="button"
                onClick={() => setMessage('')}
                aria-label="Tutup pesan"
              >
                <X size={17} />
              </button>
            </div>
          )}

          <ProgramTable
            programs={programs}
            onSelect={bukaModal}
            onEnter={masukProgram}
          />
        </section>
      </main>

      <footer className="flex min-h-8 items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 text-[9px] text-slate-500 sm:px-10">
        <span>
          © 2026 Universitas Pendidikan Ganesha — Sistem Pembelajaran Luar
          Kampus
        </span>

        <span className="shrink-0">
          Bantuan Teknis:{' '}
          <a
            href="mailto:helpdesk.mbkm@undiksha.ac.id"
            className="text-blue-600 hover:underline"
          >
            helpdesk.mbkm@undiksha.ac.id
          </a>
        </span>
      </footer>

      <ProgramRegistrationModal
        open={modalOpen}
        programs={programs}
        selectedProgram={selectedProgram}
        onSelectedChange={setSelectedProgram}
        onClose={tutupModal}
        onSubmit={daftarProgram}
      />
    </div>
  );
}
