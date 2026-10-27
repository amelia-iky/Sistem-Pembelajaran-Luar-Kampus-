import {
  GraduationCap,
  CheckCircle2,
  Clock3,
  Info,
  FileText,
} from 'lucide-react';

export default function PendampingKKN() {
  return (
    <div className="w-full bg-white px-6 py-5 md:px-8">
      <div className="mb-5">
        <h1 className="text-lg font-bold tracking-tight text-slate-800">
          Pembimbing KKN
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Informasi dosen pembimbing dan dosen penguji selama program KKN.
        </p>
      </div>

      <div className="space-y-4">
        {/* CARD DOSEN PEMBIMBING */}
        <section className="rounded-xl border border-blue-300 bg-white p-4 shadow-[0_3px_8px_rgba(15,23,42,0.10)]">
          <div className="flex flex-col justify-between gap-2 border-b border-blue-100 pb-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-bold text-slate-800">
                  Dosen Pembimbing
                </h2>
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-medium text-slate-600">
                  Ditetapkan Sistem
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Dosen pembimbing ditetapkan oleh sistem berdasarkan penempatan
                program KKN.
              </p>
            </div>

            <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-600">
              <CheckCircle2 size={12} />
              Telah Ditentukan
            </span>
          </div>

          <div className="mt-3 rounded-lg border border-blue-300 bg-white p-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600">
                  <GraduationCap size={19} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold leading-5 text-slate-800">
                    Dr. I Made Agus Wirawan, S.Kom., M.Cs.
                  </h3>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    NIP. 198203152008121002
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="min-w-0 rounded-md border border-blue-200 bg-white px-3 py-2">
                  <p className="text-[9px] text-slate-400">No. HP</p>
                  <p className="mt-0.5 break-all text-[10px] font-medium text-slate-700">
                    0889231456789
                  </p>
                </div>
                <div className="min-w-0 rounded-md border border-blue-200 bg-white px-3 py-2">
                  <p className="text-[9px] text-slate-400">Email</p>
                  <p className="mt-0.5 break-all text-[10px] font-medium text-slate-700">
                    agus.wirawan@undiksha.ac.id
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 text-[10px] leading-relaxed text-slate-400">
            <Info size={12} className="mt-0.5 shrink-0" />
            <p>
              Dosen pembimbing ditetapkan secara otomatis oleh sistem fakultas.
              Mahasiswa tidak dapat mengubah data pembimbing.
            </p>
          </div>
        </section>

        {/* CARD DOSEN PENGUJI */}
        <section className="rounded-xl border border-blue-300 bg-white p-4 shadow-[0_3px_8px_rgba(15,23,42,0.10)]">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-bold text-slate-800">
                  Dosen Penguji
                </h2>
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-medium text-slate-600">
                  Ditetapkan Sistem
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Dosen penguji akan ditentukan sesuai proses pelaksanaan dan
                evaluasi KKN.
              </p>
            </div>

            <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-medium text-slate-600">
              <Clock3 size={11} />
              Belum Ditentukan
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-3 rounded-lg border border-blue-300 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600">
                <FileText size={17} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-slate-700">
                  Dosen Penguji Belum Ditugaskan
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                  Penugasan dosen penguji akan segera dijadwalkan oleh program
                  studi.
                </p>
              </div>
            </div>

            <p className="shrink-0 text-[10px] text-slate-400 sm:text-right">
              Sistem akan memperbarui otomatis
            </p>
          </div>

          <div className="mt-3 flex items-start gap-2 text-[10px] leading-relaxed text-slate-400">
            <Info size={12} className="mt-0.5 shrink-0" />
            <p>
              Mahasiswa tidak memiliki hak akses untuk memilih atau mengajukan
              dosen penguji.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
