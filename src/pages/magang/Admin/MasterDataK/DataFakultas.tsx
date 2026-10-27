import { useMemo, useState } from 'react';
import { Search, RefreshCw, Check, X, Info } from 'lucide-react';

type Fakultas = {
  id: number;
  namaFakultas: string;
  kodeFakultas: string;
};

const initialData: Fakultas[] = [
  { id: 1, namaFakultas: 'Fakultas Ilmu Pendidikan', kodeFakultas: '01' },
  { id: 2, namaFakultas: 'Fakultas Bahasa dan Seni', kodeFakultas: '02' },
  {
    id: 3,
    namaFakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
    kodeFakultas: '03',
  },
  {
    id: 4,
    namaFakultas: 'Fakultas Hukum dan Ilmu Sosial',
    kodeFakultas: '04',
  },
  {
    id: 5,
    namaFakultas: 'Fakultas Teknik dan Kejuruan',
    kodeFakultas: '05',
  },
  {
    id: 6,
    namaFakultas: 'Fakultas Olahraga dan Kesehatan',
    kodeFakultas: '06',
  },
  { id: 7, namaFakultas: 'Pascasarjana', kodeFakultas: '07' },
  { id: 8, namaFakultas: 'Fakultas Ekonomi', kodeFakultas: '08' },
  { id: 9, namaFakultas: 'Fakultas Kedokteran', kodeFakultas: '09' },
];

export default function DataFakultas() {
  const [data, setData] = useState<Fakultas[]>(initialData);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter(
      (item) =>
        item.namaFakultas.toLowerCase().includes(keyword) ||
        item.kodeFakultas.toLowerCase().includes(keyword),
    );
  }, [data, search]);

  function syncData() {
    // Data sementara: belum terhubung ke API backend.
    setData([...initialData]);
    setSearch('');
    setNotice('Data fakultas berhasil dimuat ulang.');
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Data Fakultas
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola informasi fakultas yang terdaftar pada sistem.
          </p>
        </header>

        {/* Informasi halaman */}
        <section className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={19} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <h2 className="text-[11px] font-bold text-[#3569F6]">INFORMASI</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#52627A]">
              Daftar fakultas digunakan sebagai referensi data akademik.
              Pastikan kode dan nama fakultas sesuai dengan data sumber.
            </p>
          </div>
        </section>

        {/* Card pencarian dan sinkronisasi */}
        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Fakultas
            </h2>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              Daftar fakultas yang terdaftar pada sistem akademik.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-10 min-w-0 w-full max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama atau kode fakultas..."
                className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex shrink-0 items-center justify-end">
              <button
                type="button"
                onClick={syncData}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Tabel fakultas */}
        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  <th className="w-[80px] px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    No.
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Nama Fakultas
                  </th>
                  <th className="w-[180px] px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Kode Fakultas
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 transition hover:bg-[#F8FAFF]"
                  >
                    <td className="px-5 py-4 text-[11px] text-[#465670]">
                      {index + 1}
                    </td>
                    <td className="px-5 py-4 text-[11px] font-medium text-[#273750]">
                      {item.namaFakultas}
                    </td>
                    <td className="px-5 py-4 text-[11px] text-[#52627A]">
                      {item.kodeFakultas}
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data fakultas yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#EDF1F7] px-5 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredData.length} dari {data.length} fakultas
            </p>
          </div>
        </section>
      </div>

      {/* Notifikasi */}
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
