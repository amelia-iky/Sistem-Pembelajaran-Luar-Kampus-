import { useMemo, useState } from 'react';
import {
  Search,
  Video,
  CalendarDays,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type ViconMeeting = {
  id: number;
  name: string;
  date: string;
  linkVicon: string;
  linkRecording: string | null;
};

const initialMeetings: ViconMeeting[] = [
  {
    id: 1,
    name: 'Pembekalan & Pengarahan Mahasiswa AM',
    date: '14 Sep 2026, 08:30 WITA',
    linkVicon: 'https://meet.google.com/und-am26-pbk',
    linkRecording: 'https://drive.google.com/file/rec-am26-pbk',
  },
  {
    id: 2,
    name: 'Pembekalan & Pengarahan Mahasiswa AM',
    date: '14 Sep 2026, 08:30 WITA',
    linkVicon: 'https://meet.google.com/und-am26-pbk',
    linkRecording: null,
  },
  {
    id: 3,
    name: 'Sosialisasi Pelaksanaan Asistensi Mengajar',
    date: '16 Sep 2026, 09:00 WITA',
    linkVicon: 'https://meet.google.com/und-am26-sos',
    linkRecording: null,
  },
  {
    id: 4,
    name: 'Pembekalan Teknis Asistensi Mengajar',
    date: '18 Sep 2026, 10:00 WITA',
    linkVicon: 'https://meet.google.com/und-am26-teknis',
    linkRecording: null,
  },
];

export default function LinkViconAM() {
  const [meetings] = useState<ViconMeeting[]>(initialMeetings);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const pageSize = 4;

  const filteredMeetings = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return meetings.filter((meeting) =>
      meeting.name.toLowerCase().includes(keyword),
    );
  }, [meetings, search]);

  const totalPages = Math.max(1, Math.ceil(filteredMeetings.length / pageSize));

  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const visibleMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-full w-full bg-white px-5 py-6 sm:px-6 md:px-8">
      {/* Judul halaman */}
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Link Video Conference Asistensi Mengajar
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Lihat jadwal pertemuan virtual dan akses rekaman kegiatan program
          Asistensi Mengajar.
        </p>
      </div>

      {/* Card utama */}
      <section className="rounded-xl border border-blue-300 bg-white p-4 shadow-[0_4px_10px_rgba(15,23,42,0.12)] sm:p-5">
        {/* Pencarian dan jumlah pertemuan */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-[370px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Cari nama kegiatan..."
              className="h-10 w-full rounded-md border border-blue-300 bg-white pl-9 pr-9 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearch('')}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
            <Video size={14} />
            {filteredMeetings.length} Pertemuan Terjadwal
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-hidden rounded-lg border border-blue-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[7%]" />
                <col className="w-[23%]" />
                <col className="w-[22%]" />
                <col className="w-[28%]" />
                <col className="w-[20%]" />
              </colgroup>

              <thead className="bg-blue-50">
                <tr className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                  <th className="px-4 py-3 text-center">No.</th>
                  <th className="px-4 py-3">Nama Kegiatan</th>
                  <th className="px-4 py-3">Tanggal Pelaksanaan</th>
                  <th className="px-4 py-3">Link Vicon</th>
                  <th className="px-4 py-3">Link Rekaman Vicon</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100">
                {visibleMeetings.map((meeting, index) => (
                  <tr
                    key={meeting.id}
                    className="transition hover:bg-blue-50/40"
                  >
                    <td className="px-4 py-7 text-center text-xs text-slate-500">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-4 py-7">
                      <p className="text-xs font-semibold leading-relaxed text-slate-800">
                        {meeting.name}
                      </p>
                    </td>

                    <td className="px-4 py-7">
                      <div className="flex items-start gap-1.5 text-xs text-slate-500">
                        <CalendarDays
                          size={13}
                          className="mt-0.5 shrink-0 text-blue-500"
                        />
                        <span>{meeting.date}</span>
                      </div>
                    </td>

                    <td className="px-4 py-7">
                      <a
                        href={meeting.linkVicon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <span className="truncate">{meeting.linkVicon}</span>
                        <ExternalLink size={12} className="shrink-0" />
                      </a>
                    </td>

                    <td className="px-4 py-7">
                      {meeting.linkRecording ? (
                        <a
                          href={meeting.linkRecording}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex max-w-full items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <span className="truncate">
                            {meeting.linkRecording}
                          </span>
                          <ExternalLink size={12} className="shrink-0" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          Belum tersedia
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {visibleMeetings.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-xs text-slate-400"
                    >
                      Tidak ada kegiatan yang cocok dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination tanpa tulisan Sebelumnya dan Selanjutnya */}
          <div className="flex flex-col gap-3 border-t border-blue-200 bg-blue-50/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-slate-500">
              Menampilkan{' '}
              <span className="font-semibold text-slate-700">
                {filteredMeetings.length === 0 ? 0 : startIndex + 1}-
                {Math.min(startIndex + pageSize, filteredMeetings.length)}
              </span>{' '}
              dari{' '}
              <span className="font-semibold text-slate-700">
                {filteredMeetings.length}
              </span>{' '}
              data
            </p>

            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                aria-label="Halaman sebelumnya"
                disabled={currentPage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="rounded-md border border-blue-100 bg-white p-1.5 text-slate-400 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>

              <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-blue-600 px-2 text-[11px] font-semibold text-white">
                {currentPage}
              </span>

              <button
                type="button"
                aria-label="Halaman berikutnya"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="rounded-md border border-blue-100 bg-white p-1.5 text-slate-400 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
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
