import { useMemo, useState } from 'react';
import { Search, RefreshCw, Check, X, Info } from 'lucide-react';

type Prodi = {
  id: number;
  namaProdi: string;
  kodeProdi: string;
  namaJurusan: string;
};

const initialData: Prodi[] = [
  {
    id: 1,
    namaProdi: 'Pendidikan Kimia (S3)',
    kodeProdi: '',
    namaJurusan: '',
  },
  {
    id: 2,
    namaProdi: 'Pendidikan Kimia (S2)',
    kodeProdi: '07615',
    namaJurusan: '',
  },
  {
    id: 3,
    namaProdi: 'Bimbingan Konseling (BK) (S1)',
    kodeProdi: '01501',
    namaJurusan: '',
  },
  {
    id: 4,
    namaProdi: 'Teknologi Pendidikan (TP) (S1)',
    kodeProdi: '01502',
    namaJurusan: '',
  },
  {
    id: 5,
    namaProdi: 'Pendidikan Guru Sekolah Dasar (PGSD) (S1)',
    kodeProdi: '01503',
    namaJurusan: '',
  },
  {
    id: 6,
    namaProdi: 'Pendidikan Guru Pendidikan Anak Usia Dini (PGPAUD) (S1)',
    kodeProdi: '01504',
    namaJurusan: '',
  },
  {
    id: 7,
    namaProdi: 'Bahasa Inggris (D3)',
    kodeProdi: '02301',
    namaJurusan: '',
  },
  {
    id: 8,
    namaProdi: 'Pendidikan Bahasa Jepang (D3)',
    kodeProdi: '02302',
    namaJurusan: '',
  },
  {
    id: 9,
    namaProdi: 'Pendidikan Bahasa Bali (D3)',
    kodeProdi: '02303',
    namaJurusan: '',
  },
  {
    id: 10,
    namaProdi: 'Desain Komunikasi Visual (D3)',
    kodeProdi: '02307',
    namaJurusan: '',
  },
];

export default function DataProdi() {
  const [data, setData] = useState<Prodi[]>(initialData);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      `${item.namaProdi} ${item.kodeProdi} ${item.namaJurusan}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, search]);

  function syncData() {
    // Data sementara, belum terhubung ke API backend.
    setData([...initialData]);
    setSearch('');
    setNotice('Data program studi berhasil dimuat ulang.');
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Data Prodi
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola informasi program studi yang terdaftar pada sistem.
          </p>
        </header>

        {/* Informasi halaman */}
        <section className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={19} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <h2 className="text-[11px] font-bold text-[#3569F6]">INFORMASI</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#52627A]">
              Daftar program studi digunakan sebagai referensi data akademik.
              Pastikan nama program studi, kode, dan jurusan sesuai dengan data
              sumber.
            </p>
          </div>
        </section>

        {/* Pencarian dan sinkronisasi */}
        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Program Studi
            </h2>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              Daftar program studi beserta kode dan jurusan terkait.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-10 min-w-0 w-full max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama prodi, kode prodi, atau jurusan..."
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

        {/* Tabel program studi */}
        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  <th className="w-[80px] px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    No.
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Nama Prodi
                  </th>
                  <th className="w-[180px] px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Kode Prodi
                  </th>
                  <th className="w-[280px] px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Nama Jurusan
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
                      {item.namaProdi}
                    </td>
                    <td className="px-5 py-4 text-[11px] text-[#52627A]">
                      {item.kodeProdi || '—'}
                    </td>
                    <td className="px-5 py-4 text-[11px] text-[#52627A]">
                      {item.namaJurusan || '—'}
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data program studi yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#EDF1F7] px-5 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredData.length} dari {data.length} program studi
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
