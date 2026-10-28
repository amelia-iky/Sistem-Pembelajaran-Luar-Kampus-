import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  RefreshCw,
  Plus,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type PeriodeKKNData = {
  id: number;
  tahunAjar: string;
  semester: string;
  putaran: number;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  status: string;
  disimpanPada: string;
  detail: Record<string, unknown>;
};

export const STORAGE_KEY = 'periode-kkn-data';

const initialData: PeriodeKKNData[] = [
  {
    id: 1,
    tahunAjar: '2026/2027',
    semester: 'Ganjil',
    putaran: 1,
    kabupaten: 'Kabupaten Buleleng',
    kecamatan: 'Sukasada',
    desa: 'Sambangan',
    status: 'Aktif',
    disimpanPada: '2026-02-03 09:17:43',
    detail: {},
  },
];

function bacaData(): PeriodeKKNData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialData;

    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as PeriodeKKNData[]) : initialData;
  } catch {
    return initialData;
  }
}

export default function PeriodeKKN() {
  const navigate = useNavigate();
  const [data, setData] = useState<PeriodeKKNData[]>(bacaData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState('');
  const pageSize = 5;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      [
        item.tahunAjar,
        item.semester,
        item.putaran,
        item.kabupaten,
        item.kecamatan,
        item.desa,
        item.status,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const safePage = Math.min(page, totalPages);

  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function hapusData(id: number) {
    if (!window.confirm('Yakin ingin menghapus periode KKN ini?')) {
      return;
    }

    setData((current) => current.filter((item) => item.id !== id));
    setNotice('Periode KKN berhasil dihapus.');
    setPage(1);
  }

  function sinkronisasi() {
    setData(bacaData());
    setSearch('');
    setPage(1);
    setNotice('Daftar periode berhasil dimuat ulang.');
  }

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <div className="min-h-full bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-tight text-[#172943]">
            Periode KKN
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola periode pelaksanaan dan putaran program Kuliah Kerja Nyata.
          </p>
        </header>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Periode KKN
            </h2>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Cari dan kelola data periode pelaksanaan KKN.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-10 w-full min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-white px-3 focus-within:border-[#3569F6]">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari tahun ajar, putaran, atau lokasi..."
                className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => navigate('/admin/kkn/periode/tambah')}
                className="inline-flex h-10 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={15} />
                Tambah Data
              </button>

              <button
                type="button"
                onClick={sinkronisasi}
                title="Muat ulang daftar"
                aria-label="Muat ulang daftar"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-sm">
          <div className="border-b border-[#EDF1F7] px-5 py-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Daftar Periode KKN
            </h2>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Total {data.length} periode terdaftar
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'TAHUN AJAR',
                    'SEMESTER',
                    'PUTARAN',
                    'LOKASI KKN',
                    'STATUS',
                    'DISIMPAN PADA',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-4 py-4 text-[9px] font-bold tracking-wide text-[#52627A]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-0 hover:bg-[#F8FAFF]"
                  >
                    <td className="px-4 py-4 text-[11px] text-[#465670]">
                      {(safePage - 1) * pageSize + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[11px] font-semibold text-[#273750]">
                      {item.tahunAjar}
                    </td>
                    <td className="px-4 py-4 text-[11px] text-[#52627A]">
                      {item.semester}
                    </td>
                    <td className="px-4 py-4 text-[11px] text-[#52627A]">
                      {item.putaran}
                    </td>
                    <td className="px-4 py-4 text-[11px] text-[#52627A]">
                      <p>{item.desa || '-'}</p>
                      <p className="mt-1 text-[10px] text-[#8A99B0]">
                        {item.kecamatan || '-'}, {item.kabupaten || '-'}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                          item.status === 'Aktif'
                            ? 'bg-[#E4F3EC] text-[#16805D]'
                            : 'bg-[#FDECEC] text-[#D64545]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-mono text-[9px] text-[#8291A8]">
                      {item.disimpanPada}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          title="Detail periode"
                          aria-label="Detail periode"
                          onClick={() =>
                            navigate(`/admin/kkn/periode/${item.id}`)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] bg-[#F3F7FF] text-[#3569F6] hover:bg-blue-100"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          title="Hapus periode"
                          aria-label="Hapus periode"
                          onClick={() => hapusData(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleData.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data periode yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#EDF1F7] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan{' '}
              {filteredData.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filteredData.length)} dari{' '}
              {filteredData.length} periode
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                aria-label="Halaman sebelumnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${
                      safePage === number
                        ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white'
                        : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                aria-label="Halaman berikutnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {notice && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[100] rounded-xl border border-emerald-200 bg-white px-4 py-3 text-[12px] text-[#273750] shadow-lg"
        >
          {notice}
        </div>
      )}
    </div>
  );
}
