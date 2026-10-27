import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  RefreshCw,
  ClipboardList,
  UserRound,
  FileText,
  Check,
  X,
} from 'lucide-react';
import { mahasiswaBimbingan, logBimbingan } from './dataLogbookBimbingan';

function formatTanggal(tanggal: string) {
  const [tahun, bulan, hari] = tanggal.split('-');
  return `${hari}-${bulan}-${tahun}`;
}

export default function DetailLogbookBimbingan() {
  const navigate = useNavigate();
  const { nim } = useParams<{ nim: string }>();

  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const mahasiswa = mahasiswaBimbingan.find((item) => item.nim === nim);
  const data = nim ? (logBimbingan[nim] ?? []) : [];

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data
      .filter((item) =>
        `${item.tanggal} ${formatTanggal(item.tanggal)} ${item.judul} ${item.isi} ${item.file ?? ''}`
          .toLowerCase()
          .includes(keyword),
      )
      .sort((a, b) =>
        sortAsc
          ? a.tanggal.localeCompare(b.tanggal)
          : b.tanggal.localeCompare(a.tanggal),
      );
  }, [data, search, sortAsc]);

  function syncData() {
    setSearch('');
    setSortAsc(true);
    setNotification('Data log bimbingan berhasil dimuat ulang.');
  }

  useEffect(() => {
    if (!notification) return;

    const timer = window.setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [notification]);

  if (!mahasiswa) {
    return (
      <div className="min-h-full bg-[#F4F7FC] p-6">
        <div className="rounded-xl border border-[#B8CCFF] bg-white p-8 text-center">
          <p className="text-[13px] font-semibold text-[#172943]">
            Data mahasiswa tidak ditemukan.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/magang/logbook-bimbingan')}
            className="mt-4 rounded-md bg-[#3569F6] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#2454D8]"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-[#172943]">
              Detail Logbook Bimbingan
            </h1>
            <p className="mt-2 text-[12px] text-[#71819B]">
              Riwayat bimbingan mahasiswa selama pelaksanaan magang.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/admin/magang/logbook-bimbingan')}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#EEF4FF]"
          >
            <ArrowLeft size={15} />
            Kembali
          </button>
        </div>

        <section className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white p-4">
          <div className="mb-4 flex items-center gap-2">
            <UserRound size={17} className="text-[#3569F6]" />
            <h2 className="text-[13px] font-bold text-[#172943]">
              Informasi Mahasiswa
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              ['Nama', mahasiswa.nama],
              ['NIM', mahasiswa.nim],
              ['Pembimbing', mahasiswa.pembimbing],
              ['Tempat Magang', mahasiswa.tempatMagang],
              ['Jurusan', mahasiswa.jurusan],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] font-medium text-[#91A4BF]">
                  {label}
                </p>
                <p className="mt-1 text-[12px] font-semibold text-[#273750]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white p-4">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList size={17} className="text-[#3569F6]" />
            <h2 className="text-[13px] font-bold text-[#172943]">
              Log Bimbingan
            </h2>
          </div>

          <div className="flex w-full items-center gap-6">
            <div className="flex h-10 w-full max-w-[520px] items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari tanggal, judul, isi, atau file bimbingan..."
                className="w-full min-w-0 bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="ml-auto flex shrink-0 items-center justify-end">
              <button
                type="button"
                onClick={syncData}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#B8CCFF] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
              >
                <RefreshCw size={19} />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  <th className="w-[65px] px-4 py-4 text-[11px] font-bold text-[#52627A]">
                    No
                  </th>
                  <th className="w-[150px] px-4 py-4">
                    <button
                      type="button"
                      onClick={() => setSortAsc((current) => !current)}
                      className="text-[11px] font-bold text-[#52627A] transition hover:text-[#3569F6]"
                    >
                      Tanggal {sortAsc ? '↑' : '↓'}
                    </button>
                  </th>
                  <th className="w-[250px] px-4 py-4 text-[11px] font-bold text-[#52627A]">
                    Judul Bimbingan
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#52627A]">
                    Isi Bimbingan
                  </th>
                  <th className="w-[190px] px-4 py-4 text-[11px] font-bold text-[#52627A]">
                    File Bimbingan
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-0 transition hover:bg-[#F8FAFF]"
                  >
                    <td className="px-4 py-5 align-top text-[11px] text-[#52627A]">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 align-top text-[11px] text-[#52627A]">
                      {formatTanggal(item.tanggal)}
                    </td>
                    <td className="px-4 py-5 align-top text-[11px] font-semibold leading-5 text-[#273750]">
                      {item.judul}
                    </td>
                    <td className="min-w-[300px] px-4 py-5 align-top text-[11px] leading-[1.8] text-[#52627A]">
                      {item.isi}
                    </td>
                    <td className="px-4 py-5 align-top">
                      {item.file ? (
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#3569F6]">
                          <FileText size={15} />
                          {item.file}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#91A4BF]">
                          Tidak ada file
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-[12px] text-[#8A99B0]"
                    >
                      Belum ada log bimbingan yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#EDF1F7] px-4 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredData.length} dari {data.length} log bimbingan
            </p>
          </div>
        </section>
      </div>

      {/* Notifikasi — mengikuti spesifikasi Data Prodi */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
        >
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={19} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[#172943]">
              Sinkronisasi
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              {notification}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotification(null)}
            aria-label="Tutup notifikasi"
            className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
