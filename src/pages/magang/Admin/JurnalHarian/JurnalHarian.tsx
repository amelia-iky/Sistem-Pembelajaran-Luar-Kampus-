import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  RefreshCw,
  ClipboardList,
  ChevronUp,
  ChevronDown,
  Info,
  Check,
  X,
} from 'lucide-react';
import { mahasiswaJurnal } from './DataJurnal';

type SortKey = 'nama' | 'nim' | 'prodi' | 'tempatMagang';

export default function JurnalHarian() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('nama');
  const [sortAsc, setSortAsc] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return mahasiswaJurnal
      .filter((item) =>
        `${item.nama} ${item.nim} ${item.prodi} ${item.tempatMagang} ${item.angkatan}`
          .toLowerCase()
          .includes(keyword),
      )
      .sort((a, b) => {
        const result = a[sortKey].localeCompare(b[sortKey]);
        return sortAsc ? result : -result;
      });
  }, [search, sortKey, sortAsc]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [notice]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((current) => !current);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function handleReset() {
    setSearch('');
    setSortKey('nama');
    setSortAsc(true);
    setNotice('Data jurnal harian berhasil dimuat ulang.');
  }

  function SortIcon({ column }: { column: SortKey }) {
    return sortKey === column && sortAsc ? (
      <ChevronUp size={12} className="text-[#3569F6]" />
    ) : (
      <ChevronDown
        size={12}
        className={sortKey === column ? 'text-[#3569F6]' : 'text-[#91A4BF]'}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Jurnal Harian Magang
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Pantau dan lihat jurnal harian mahasiswa selama melaksanakan
            kegiatan magang.
          </p>
        </header>

        <section className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={19} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <h2 className="text-[11px] font-bold text-[#3569F6]">INFORMASI</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#52627A]">
              Halaman ini menampilkan daftar mahasiswa magang. Klik tombol
              Detail Jurnal untuk melihat catatan kegiatan harian mahasiswa.
            </p>
          </div>
        </section>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Jurnal Harian Mahasiswa
            </h2>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Daftar mahasiswa yang mengikuti program magang.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex h-10 w-full max-w-[520px] items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama mahasiswa, NIM, prodi, atau tempat magang..."
                className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              title="Muat ulang data"
              aria-label="Muat ulang data"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  <th className="w-[60px] px-4 py-4 text-[10px] font-bold uppercase text-[#52627A]">
                    No.
                  </th>

                  {(
                    [
                      ['nama', 'Nama Mahasiswa'],
                      ['nim', 'NIM'],
                      ['prodi', 'Prodi'],
                      ['tempatMagang', 'Tempat Magang'],
                    ] as [SortKey, string][]
                  ).map(([key, label]) => (
                    <th key={key} className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => handleSort(key)}
                        className="inline-flex items-center gap-2 text-left text-[10px] font-bold uppercase text-[#52627A] hover:text-[#3569F6]"
                      >
                        {label}
                        <SortIcon column={key} />
                      </button>
                    </th>
                  ))}

                  <th className="w-[145px] px-4 py-4 text-center text-[10px] font-bold uppercase text-[#52627A]">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 transition hover:bg-[#F8FAFF]"
                  >
                    <td className="px-4 py-4 text-[11px] text-[#61718A]">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-[11px] font-semibold text-[#273750]">
                        {item.nama}
                      </p>
                      <p className="mt-1 text-[10px] text-[#91A4BF]">
                        Angkatan {item.angkatan}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-[11px] text-[#52627A]">
                      {item.nim}
                    </td>

                    <td className="max-w-[200px] px-4 py-4 text-[11px] leading-5 text-[#34445E]">
                      {item.prodi}
                    </td>

                    <td className="px-4 py-4 text-[11px] text-[#34445E]">
                      {item.tempatMagang}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/magang/jurnal-harian/${item.nim}`)
                        }
                        className="inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
                      >
                        <ClipboardList size={14} />
                        Detail Jurnal
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada mahasiswa yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#EDF1F7] px-4 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredData.length} dari {mahasiswaJurnal.length}{' '}
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
