import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  Search,
  RefreshCw,
  Upload,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Check,
  X,
} from 'lucide-react';

type SPDItem = {
  id: number;
  tahunSemester: string;
  tanggal: string;
  nomorSPD: string;
  nama: string;
  nip: string;
  uraian: string;
};

const initialData: SPDItem[] = [];

const tahunSemesterOptions = [
  '2026/2027 Ganjil',
  '2025/2026 Genap',
  '2025/2026 Ganjil',
];

export default function SPDMagang() {
  const [data, setData] = useState<SPDItem[]>(initialData);
  const [tahunSemester, setTahunSemester] = useState('Semua Semester');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [sort, setSort] = useState<{
    key: keyof SPDItem;
    direction: 'asc' | 'desc';
  } | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    let result = data.filter((item) => {
      const matchesSemester =
        tahunSemester === 'Semua Semester' ||
        item.tahunSemester === tahunSemester;
      const matchesSearch =
        !keyword ||
        `${item.tahunSemester} ${item.tanggal} ${item.nomorSPD} ${item.nama} ${item.nip} ${item.uraian}`
          .toLowerCase()
          .includes(keyword);
      return matchesSemester && matchesSearch;
    });

    if (sort) {
      result = [...result].sort((a, b) => {
        const aValue = String(a[sort.key]).toLowerCase();
        const bValue = String(b[sort.key]).toLowerCase();
        const compare = aValue.localeCompare(bValue, 'id');
        return sort.direction === 'asc' ? compare : -compare;
      });
    }
    return result;
  }, [data, tahunSemester, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function syncData() {
    setSearch('');
    setPage(1);
    setNotice({
      title: 'Sinkronisasi berhasil',
      message: 'Data SPD Magang berhasil diperbarui.',
    });
  }

  function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Frontend demo: CSV is parsed locally. Excel files show an explanatory notice.
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setNotice({
        title: 'Format belum didukung',
        message: 'Untuk demo ini, impor data menggunakan file CSV.',
      });
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) {
        setNotice({
          title: 'File kosong',
          message: 'File CSV tidak berisi data SPD yang dapat diimpor.',
        });
        return;
      }

      const headers = lines[0]
        .split(',')
        .map((header) => header.trim().toLowerCase());
      const getIndex = (...aliases: string[]) =>
        headers.findIndex((header) => aliases.includes(header));
      const indexes = {
        tahunSemester: getIndex(
          'tahun semester',
          'tahunsemester',
          'tahun_semester',
        ),
        tanggal: getIndex('tanggal'),
        nomorSPD: getIndex('nomor spd', 'nomorspd', 'nomor_spd'),
        nama: getIndex('nama'),
        nip: getIndex('nip'),
        uraian: getIndex('uraian'),
      };

      const parsed = lines
        .slice(1)
        .map((line, index) => {
          const values = line
            .split(',')
            .map((value) => value.trim().replace(/^"|"$/g, ''));
          return {
            id: Date.now() + index,
            tahunSemester: values[indexes.tahunSemester] || tahunSemester,
            tanggal: values[indexes.tanggal] || '',
            nomorSPD: values[indexes.nomorSPD] || '',
            nama: values[indexes.nama] || '',
            nip: values[indexes.nip] || '',
            uraian: values[indexes.uraian] || '',
          };
        })
        .filter((item) => item.nomorSPD || item.nama || item.nip);

      setData((current) => [...parsed, ...current]);
      setPage(1);
      setNotice({
        title: 'Impor selesai',
        message: `${parsed.length} data SPD berhasil dibaca dari file CSV.`,
      });
      event.target.value = '';
    };
    reader.readAsText(file);
  }

  function toggleSort(key: keyof SPDItem) {
    setSort((current) => ({
      key,
      direction:
        current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[70] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
        >
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={19} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1 pr-1">
            <p className="text-[12px] font-semibold text-[#24334D]">
              {notice.title}
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              {notice.message}
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

      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Surat Perjalanan Dinas Magang
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola data Surat Perjalanan Dinas untuk kegiatan Magang.
          </p>
        </div>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <h2 className="text-[13px] font-bold text-[#172943]">
                Data Surat Perjalanan Dinas
              </h2>
              <p className="mt-1 text-[10px] text-[#8291A8]">
                Daftar dan kelola data SPD untuk kegiatan Magang.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700">
                <Upload size={14} />
                Impor Data SPD
                <input
                  type="file"
                  accept=".csv"
                  onChange={importData}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={syncData}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari nomor SPD, nama, NIP, atau uraian..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <select
              value={tahunSemester}
              onChange={(event) => {
                setTahunSemester(event.target.value);
                setPage(1);
              }}
              aria-label="Filter semester"
              className="h-9 min-w-[155px] rounded-md border border-[#B8CCFF] bg-white px-3 text-[10px] text-[#52627A] outline-none focus:border-[#3569F6]"
            >
              <option>Semua Semester</option>
              {tahunSemesterOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </section>

        <div className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E8EEF7] bg-[#EEF4FF]">
                  {[
                    ['No', 'id'],
                    ['Tahun Semester', 'tahunSemester'],
                    ['Tanggal', 'tanggal'],
                    ['Nomor SPD', 'nomorSPD'],
                    ['Nama', 'nama'],
                    ['NIP', 'nip'],
                    ['Uraian', 'uraian'],
                    ['Aksi', 'aksi'],
                  ].map(([label, key]) => (
                    <th
                      key={key}
                      className="px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]"
                    >
                      <button
                        type="button"
                        disabled={key === 'aksi'}
                        onClick={() =>
                          toggleSort(
                            key === 'id' ? 'id' : (key as keyof SPDItem),
                          )
                        }
                        className="inline-flex items-center gap-1.5 disabled:cursor-default"
                      >
                        {label}
                        {key !== 'aksi' && (
                          <ArrowUpDown size={11} className="text-[#8295B0]" />
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleData.length > 0 ? (
                  visibleData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                    >
                      <td className="px-3 py-3 text-[10px] text-[#465670]">
                        {(safePage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-3 py-3 text-[10px] text-[#465670]">
                        {item.tahunSemester}
                      </td>
                      <td className="px-3 py-3 text-[10px] text-[#465670]">
                        {item.tanggal || '-'}
                      </td>
                      <td className="px-3 py-3 text-[10px] text-[#465670]">
                        {item.nomorSPD || '-'}
                      </td>
                      <td className="px-3 py-3 text-[10px] text-[#465670]">
                        {item.nama || '-'}
                      </td>
                      <td className="px-3 py-3 text-[10px] text-[#465670]">
                        {item.nip || '-'}
                      </td>
                      <td className="px-3 py-3 text-[10px] text-[#465670]">
                        {item.uraian || '-'}
                      </td>
                      <td className="px-3 py-3 text-[10px] text-[#8291A8]">
                        —
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data SPD yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-[#EDF1F7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-[#8A99B0]">
              Menampilkan{' '}
              {filteredData.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filteredData.length)} dari{' '}
              {filteredData.length} data SPD
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
                    className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${safePage === number ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white' : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'}`}
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
        </div>
      </div>
    </div>
  );
}
