import { useMemo, useState } from 'react';
import {
  Search,
  RefreshCw,
  Info,
  FileText,
  FileDown,
  X,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleMinus,
} from 'lucide-react';

type Instrument = {
  id: number;
  name: string;
  description: string;
  type: 'PDF' | 'DOCX';
  status: 'Tersedia' | 'Tidak Tersedia';
};

const initialInstruments: Instrument[] = [
  {
    id: 1,
    name: 'Lembar Observasi Awal Lingkungan Sekolah Mitra',
    description:
      'Form identifikasi sarana, prasarana & kultur sekolah • Rev 2.1',
    type: 'PDF',
    status: 'Tersedia',
  },
  {
    id: 2,
    name: 'Format Rencana Pelaksanaan Pembelajaran (RPP / Modul Ajar)',
    description:
      'Standar kurikulum Merdeka Belajar Universitas Pendidikan Ganesha',
    type: 'DOCX',
    status: 'Tersedia',
  },
  {
    id: 3,
    name: 'Lembar Penilaian Kinerja Asistensi oleh Guru Pamong',
    description:
      'Rubrik kompetensi pedagogik, sosial, kepribadian & profesional',
    type: 'PDF',
    status: 'Tersedia',
  },
  {
    id: 4,
    name: 'Form Evaluasi Bimbingan Dosen Pembimbing Lapangan (DPL)',
    description: 'Dokumen monitoring berkala & catatan supervisi tatap muka',
    type: 'PDF',
    status: 'Tidak Tersedia',
  },
];

function downloadTextFile(name: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function UnduhInstrumenAM() {
  const [instruments, setInstruments] = useState(initialInstruments);
  const [search, setSearch] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filteredInstruments = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return instruments.filter(
      (instrument) =>
        instrument.name.toLowerCase().includes(keyword) ||
        instrument.description.toLowerCase().includes(keyword),
    );
  }, [instruments, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInstruments.length / pageSize),
  );

  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const visibleInstruments = filteredInstruments.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSync = () => {
    setSyncing(true);

    // Simulasi sinkronisasi frontend.
    window.setTimeout(() => {
      setInstruments((current) => [...current]);
      setSyncing(false);
    }, 800);
  };

  const handleDownload = (instrument: Instrument) => {
    if (instrument.status !== 'Tersedia') return;

    // File contoh untuk pengujian frontend.
    // Ganti dengan URL file resmi saat backend tersedia.
    const content = [
      instrument.name,
      '',
      instrument.description,
      '',
      'Berkas ini merupakan contoh untuk pengembangan frontend SPLK.',
      'File instrumen resmi belum terhubung ke backend.',
    ].join('\n');

    downloadTextFile(
      `Instrumen_AM_${instrument.id}.txt`,
      content,
      'text/plain;charset=utf-8',
    );
  };

  return (
    <div className="min-h-full w-full bg-white px-5 py-6 sm:px-6 md:px-8">
      {/* Judul halaman */}
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Unduh Instrumen
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Kelola dan unduh instrumen penilaian serta observasi untuk program
          Asistensi Mengajar.
        </p>
      </div>

      {/* Card utama dengan stroke biru */}
      <section className="rounded-xl border border-blue-300 bg-white p-4 shadow-[0_4px_10px_rgba(15,23,42,0.12)] sm:p-5">
        {/* Pencarian dan sinkronisasi */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-[370px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
            />

            <input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Cari instrumen penilaian / lembar observasi..."
              className="h-9 w-full rounded-md border border-blue-300 bg-white pl-9 pr-9 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearch('')}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-md bg-blue-600 px-4 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw size={13} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Menyinkronkan...' : 'Sinkronisasi'}
          </button>
        </div>

        {/* Petunjuk */}
        <div className="mb-5 flex gap-3 rounded-md border border-blue-200 bg-blue-50/70 px-3 py-3 sm:px-4">
          <Info size={16} className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <p className="text-xs font-semibold text-slate-800">
              Petunjuk Pengunduhan Lembar Evaluasi & Observasi Lapangan
            </p>

            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              Dokumen instrumen resmi disinkronisasi melalui sistem pangkalan
              data Pembelajaran Luar Kampus Undiksha. Pastikan mencocokkan kode
              rombel sekolah mitra sebelum mengunduh format cetak.
            </p>
          </div>
        </div>

        {/* Card tabel dengan stroke biru */}
        <div className="overflow-hidden rounded-lg border border-blue-300 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[740px] border-collapse text-left">
              <thead className="border-b border-blue-200 bg-blue-50">
                <tr className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                  <th className="w-16 px-4 py-3 text-center">No.</th>

                  <th className="px-4 py-3">
                    Nama Dokumen / Keterangan Instrumen
                  </th>

                  <th className="w-28 px-4 py-3 text-center">Jenis Berkas</th>

                  <th className="w-36 px-4 py-3 text-center">Status</th>

                  <th className="w-28 px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100">
                {visibleInstruments.map((instrument, index) => {
                  const available = instrument.status === 'Tersedia';

                  return (
                    <tr
                      key={instrument.id}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-4 py-3 text-center text-xs text-slate-500">
                        {startIndex + index + 1}
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-xs font-medium leading-5 text-slate-800">
                          {instrument.name}
                        </p>

                        <p className="mt-0.5 text-[10px] leading-4 text-slate-400">
                          {instrument.description}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-50/50 px-2 py-1 text-[10px] text-slate-600">
                          <FileText
                            size={11}
                            className={
                              instrument.type === 'PDF'
                                ? 'text-rose-500'
                                : 'text-blue-500'
                            }
                          />
                          {instrument.type}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center">
                        {available ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
                            <CircleCheck size={11} />
                            Tersedia
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-medium text-rose-700">
                            <CircleMinus size={11} />
                            Tidak Tersedia
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleDownload(instrument)}
                          disabled={!available}
                          className="inline-flex items-center justify-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-[10px] font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                          <FileDown size={11} />
                          Unduh
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {visibleInstruments.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-slate-400"
                    >
                      Instrumen tidak ditemukan. Coba kata kunci lain.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination tanpa footer tambahan */}
          <div className="flex flex-col gap-3 border-t border-blue-200 bg-blue-50/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-slate-500">
              Menampilkan{' '}
              <span className="font-semibold text-slate-700">
                {filteredInstruments.length === 0 ? 0 : startIndex + 1}-
                {Math.min(startIndex + pageSize, filteredInstruments.length)}
              </span>{' '}
              dari{' '}
              <span className="font-semibold text-slate-700">
                {filteredInstruments.length}
              </span>{' '}
              instrumen
            </p>

            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                aria-label="Halaman sebelumnya"
                disabled={currentPage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="rounded border border-blue-200 bg-white p-1 text-slate-500 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>

              <span className="flex h-6 min-w-6 items-center justify-center rounded bg-blue-600 px-2 text-[10px] font-semibold text-white">
                {currentPage}
              </span>

              <button
                type="button"
                aria-label="Halaman berikutnya"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="rounded border border-blue-200 bg-white p-1 text-slate-500 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
