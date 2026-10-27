import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw, ClipboardList, Check, X } from 'lucide-react';
import { mahasiswaBimbingan } from './dataLogbookBimbingan';

export default function LogbookBimbingan() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return mahasiswaBimbingan.filter((item) =>
      `${item.nama} ${item.nim} ${item.pembimbing} ${item.tempatMagang} ${item.jurusan}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [search]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [notice]);

  function resetSearch() {
    setSearch('');
    setNotice('Data logbook bimbingan berhasil dimuat ulang.');
  }

  return (
    <div className="min-h-full bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Logbook Bimbingan
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Daftar mahasiswa dan riwayat bimbingan selama pelaksanaan magang.
          </p>
        </header>

        <section className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList size={17} className="text-[#3569F6]" />
              <h2 className="text-[13px] font-bold text-[#172943]">
                Data Mahasiswa
              </h2>
            </div>

            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              Daftar mahasiswa magang beserta pembimbing dan informasi program
              magang.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-10 min-w-0 w-full max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama mahasiswa, NIM, pembimbing, atau tempat magang..."
                className="w-full min-w-0 bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex shrink-0 items-center justify-end">
              <button
                type="button"
                onClick={resetSearch}
                title="Reset pencarian"
                aria-label="Reset pencarian"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  {[
                    'No',
                    'Nama',
                    'NIM',
                    'Pembimbing',
                    'Tempat Magang',
                    'Jurusan',
                    'Aksi',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-4 py-4 text-[11px] font-bold text-[#52627A]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.nim}
                    className="border-b border-[#EDF1F7] last:border-0 transition hover:bg-[#F8FAFF]"
                  >
                    <td className="px-4 py-5 text-[11px] text-[#52627A]">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-[11px] text-[#273750]">
                      {item.nama}
                    </td>
                    <td className="px-4 py-5 text-[11px] text-[#273750]">
                      {item.nim}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-[11px] text-[#273750]">
                      {item.pembimbing}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-[11px] text-[#273750]">
                      {item.tempatMagang}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-[11px] text-[#273750]">
                      {item.jurusan}
                    </td>
                    <td className="px-4 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/admin/magang/logbook-bimbingan/${item.nim}`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-[#3569F6] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#2454D8]"
                      >
                        <ClipboardList size={14} />
                        Detail Bimbingan
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-[12px] text-[#8A99B0]"
                    >
                      Data mahasiswa tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#EDF1F7] px-4 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredData.length} dari {mahasiswaBimbingan.length}{' '}
              mahasiswa
            </p>
          </div>
        </section>
      </div>

      {/* Notifikasi mengikuti desain Data Prodi */}
      {notice && (
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
              {notice}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotice(null)}
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
