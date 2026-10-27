import { useState } from 'react';
import { CheckCircle2, ChevronDown, X } from 'lucide-react';
import type { Program } from './ProgramTable';

type Props = {
  open: boolean;
  programs: Program[];
  selectedProgram: string;
  onSelectedChange: (nama: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const persyaratanProgram: Record<string, { nama: string; status: string }[]> = {
  Magang: [
    { nama: 'Semester', status: 'Memenuhi' },
    { nama: '190 SKS', status: 'Tidak Memenuhi' },
  ],
  'Asistensi Mengajar': [
    { nama: 'Microteaching', status: 'Memenuhi' },
    { nama: '190 SKS', status: 'Tidak Memenuhi' },
  ],
  KKN: [
    { nama: 'Jumlah SKS minimum', status: 'Memenuhi' },
    { nama: 'Mata kuliah prasyarat', status: 'Tidak Memenuhi' },
  ],
};

export default function ProgramRegistrationModal({
  open,
  programs,
  selectedProgram,
  onSelectedChange,
  onClose,
  onSubmit,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!open) return null;

  const availablePrograms = programs.filter(
    (program) => program.status !== 'Selesai',
  );

  const persyaratan = selectedProgram
    ? (persyaratanProgram[selectedProgram] ?? [])
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[510px] rounded-xl bg-white px-5 py-5 shadow-xl sm:px-6 sm:py-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-black sm:text-lg">
              Pilih Program
            </h2>
            <p className="mt-1 text-[11px] font-medium text-gray-500 sm:text-xs">
              Pilih salah satu program pembelajaran luar kampus yang akan anda
              ikuti.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="ml-3 rounded p-1 text-black hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-bold text-black">
            Program Pembelajaran Luar Kampus
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left text-xs text-black outline-none ${
                dropdownOpen
                  ? 'border-blue-500 ring-2 ring-blue-100'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <span>{selectedProgram || 'Pilih program'}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-20 mt-0.5 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                {availablePrograms.length > 0 ? (
                  availablePrograms.map((program) => (
                    <button
                      key={program.id}
                      type="button"
                      onClick={() => {
                        onSelectedChange(program.nama);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-left text-xs text-black hover:bg-blue-50 ${
                        selectedProgram === program.nama ? 'bg-[#C9DCF5]' : ''
                      }`}
                    >
                      {program.nama === 'KKN'
                        ? 'Kuliah Kerja Nyata'
                        : program.nama}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-xs text-gray-500">
                    Semua program sudah terdaftar.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-xs font-bold text-black">Prasyarat Program</h3>
          <p className="mt-1 text-[10px] italic leading-4 text-gray-500">
            Berikut merupakan daftar persyaratan yang perlu dipenuhi. Status
            menunjukkan kesesuaian persyaratan dengan data akademik mahasiswa.
          </p>

          <div className="mt-3 overflow-hidden rounded-md border border-gray-200">
            <table className="w-full text-left text-[10px] sm:text-xs">
              <thead className="bg-[#EAF0F9] font-bold text-black">
                <tr>
                  <th className="w-[15%] px-3 py-3 text-center">No</th>
                  <th className="px-3 py-3">Prasyarat</th>
                  <th className="w-[32%] px-3 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {persyaratan.length > 0 ? (
                  persyaratan.map((item, index) => (
                    <tr key={item.nama} className="border-t border-gray-200">
                      <td className="px-3 py-3 text-center">{index + 1}</td>
                      <td className="px-3 py-3 font-semibold">{item.nama}</td>
                      <td className="px-2 py-3 text-center">
                        <span
                          className={`inline-block rounded-sm px-2 py-1 text-[9px] font-bold sm:text-[10px] ${
                            item.status === 'Memenuhi'
                              ? 'bg-[#C8F7C5] text-green-700'
                              : 'bg-[#FADDDD] text-red-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-3 py-6 text-center text-gray-400"
                    >
                      Pilih program untuk melihat prasyarat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-200 px-3 py-2 text-[10px] text-gray-600 hover:bg-gray-50 sm:text-xs"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!selectedProgram}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#2453E6] px-3 py-2 text-[10px] font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
          >
            <CheckCircle2 size={13} />
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  );
}
