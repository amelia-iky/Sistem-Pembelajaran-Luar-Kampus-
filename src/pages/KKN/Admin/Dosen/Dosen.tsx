import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';

type DosenItem = {
  id: number;
  nama: string;
  nip: string;
  email: string;
  programStudi: string;
  jurusan: string;
  fakultas: string;
};

const initialData: DosenItem[] = [
  {
    id: 1,
    nama: 'I Made Candiasa',
    nip: '196301061988031002',
    email: 'candiasa@undiksha.ac.id',
    programStudi: 'Sistem Informasi',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
  },
  {
    id: 2,
    nama: 'I Gede Mahendra Darmawiguna',
    nip: '198202192009121005',
    email: 'mahendra.darmawiguna@undiksha.ac.id',
    programStudi: 'Pendidikan Teknik Informatika',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
  },
  {
    id: 3,
    nama: 'I Made Ardwi Pradnyana',
    nip: '198801192015041001',
    email: 'ardwi.pradnyana@undiksha.ac.id',
    programStudi: 'Sistem Informasi',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
  },
  {
    id: 4,
    nama: 'Gede Aditra Pradnyana',
    nip: '198707162015041002',
    email: 'aditra.pradnyana@undiksha.ac.id',
    programStudi: 'Manajemen Informatika',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
  },
  {
    id: 5,
    nama: 'I Gede Partha Sindu',
    nip: '198501262010121004',
    email: 'partha.sindu@undiksha.ac.id',
    programStudi: 'Pendidikan Teknik Informatika',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
  },
];

export default function Dosen() {
  const [data, setData] = useState<DosenItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState('');
  const [syncing, setSyncing] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice('');
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      const searchableText = [
        item.nama,
        item.nip,
        item.email,
        item.programStudi,
        item.jurusan,
        item.fakultas,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const safePage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function handleSync() {
    if (syncing) return;

    setSyncing(true);
    setSearch('');
    setPage(1);

    // Simulasi proses sinkronisasi frontend.
    window.setTimeout(() => {
      setData((current) => [...current]);
      setSyncing(false);
      setNotice('Proses sinkronisasi data dosen selesai.');
    }, 1000);
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* JUDUL HALAMAN */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Data Dosen
          </h1>

          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola dan lihat data dosen yang terdaftar pada sistem.
          </p>
        </div>

        {/* CARD DATA DOSEN */}
        <div className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          <div className="px-4 pb-3 pt-4 sm:px-5">
            <h2 className="text-[13px] font-bold text-[#172943]">Data Dosen</h2>

            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan sinkronkan data dosen berdasarkan nama, NIP, email,
              program studi, jurusan, atau fakultas.
            </p>
          </div>

          {/* SEARCH DAN SINKRONISASI */}
          <div className="flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama dosen, NIP, email, atau program studi..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                title="Sinkronisasi data dosen"
                className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] font-medium text-[#3569F6] transition hover:bg-[#EEF4FF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={15}
                  className={syncing ? 'animate-spin' : ''}
                />
              </button>
            </div>
          </div>
        </div>

        {/* NOTIFIKASI */}
        {notice && (
          <div
            role="status"
            className="fixed right-5 top-5 z-[70] flex w-[326px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-lg"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-[#24334D]">
                Berhasil
              </p>

              <p className="mt-1 text-[11px] text-[#71819B]">{notice}</p>
            </div>

            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Tutup notifikasi"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* CARD DAFTAR DOSEN */}
        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.06)]">
          {/* TABEL DOSEN */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="border-y border-[#DCE7F8] bg-[#F7F9FC]">
                  <th className="w-[5%] px-4 py-3 text-center text-[9px] font-bold tracking-wide text-[#52627A]">
                    NO.
                  </th>

                  <th className="w-[17%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    NAMA LENGKAP
                  </th>

                  <th className="w-[15%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    NIP
                  </th>

                  <th className="w-[20%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    EMAIL
                  </th>

                  <th className="w-[17%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    PROGRAM STUDI
                  </th>

                  <th className="w-[13%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    JURUSAN
                  </th>

                  <th className="w-[13%] px-4 py-3 text-[9px] font-bold tracking-wide text-[#52627A]">
                    FAKULTAS
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleData.length > 0 ? (
                  visibleData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF1F7] last:border-b-0 transition hover:bg-[#FCFDFF]"
                    >
                      <td className="px-4 py-4 text-center text-[10px] text-[#465670]">
                        {(safePage - 1) * pageSize + index + 1}
                      </td>

                      <td className="px-4 py-4 text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </td>

                      <td className="px-4 py-4 text-[10px] text-[#465670]">
                        {item.nip}
                      </td>

                      <td className="px-4 py-4 text-[10px] text-[#3569F6]">
                        {item.email}
                      </td>

                      <td className="px-4 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.programStudi}
                      </td>

                      <td className="px-4 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.jurusan}
                      </td>

                      <td className="px-4 py-4 text-[10px] leading-4 text-[#465670]">
                        {item.fakultas}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-[11px] text-[#91A0B5]"
                    >
                      Tidak ada data dosen yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER DAN PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-[#E8EEF7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#8291A8]">
              Menampilkan{' '}
              <span className="font-semibold text-[#52627A]">
                {filteredData.length > 0 ? (safePage - 1) * pageSize + 1 : 0}
                {'–'}
                {Math.min(safePage * pageSize, filteredData.length)}
              </span>{' '}
              dari{' '}
              <span className="font-semibold text-[#52627A]">
                {filteredData.length}
              </span>{' '}
              dosen
            </p>

            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={safePage === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] text-[#71819B] transition hover:bg-[#F4F7FC] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[10px] font-semibold transition ${
                      safePage === number
                        ? 'bg-[#3569F6] text-white'
                        : 'border border-[#DCE5F1] text-[#71819B] hover:bg-[#F4F7FC]'
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={safePage === totalPages}
                aria-label="Halaman berikutnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] text-[#71819B] transition hover:bg-[#F4F7FC] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
