import { useMemo, useState } from 'react';
import {
  Search,
  CalendarDays,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';

type BuktiKunjunganProps = {
  periodeId?: number;
  desaId?: string;
  namaDesa?: string;
};

type BuktiKunjunganData = {
  id: number;
  tanggal: string;
  keterangan: string;
  foto: string;
};

const dataBukti: BuktiKunjunganData[] = [
  {
    id: 1,
    tanggal: '15 Juli 2026',
    keterangan: 'Kunjungan pembimbing untuk memantau pelaksanaan program KKN.',
    foto: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900',
  },
  {
    id: 2,
    tanggal: '22 Juli 2026',
    keterangan: 'Evaluasi kegiatan mahasiswa bersama perangkat desa.',
    foto: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900',
  },
  {
    id: 3,
    tanggal: '5 Agustus 2026',
    keterangan: 'Pemantauan perkembangan program kerja mahasiswa.',
    foto: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900',
  },
];

export default function BuktiKunjungan({
  namaDesa = 'Desa Sembiran',
}: BuktiKunjunganProps) {
  const [search, setSearch] = useState('');
  const [jumlahData, setJumlahData] = useState(10);
  const [halaman, setHalaman] = useState(1);
  const [buktiTerpilih, setBuktiTerpilih] = useState<BuktiKunjunganData | null>(
    null,
  );

  const dataFilter = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return dataBukti.filter(
      (item) =>
        item.tanggal.toLowerCase().includes(keyword) ||
        item.keterangan.toLowerCase().includes(keyword),
    );
  }, [search]);

  const totalHalaman = Math.max(1, Math.ceil(dataFilter.length / jumlahData));

  const dataTampil = dataFilter.slice(
    (halaman - 1) * jumlahData,
    halaman * jumlahData,
  );

  const mulaiData =
    dataFilter.length === 0 ? 0 : (halaman - 1) * jumlahData + 1;

  const akhirData = Math.min(halaman * jumlahData, dataFilter.length);

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#172943]">
            Bukti Kunjungan Pembimbing
          </h1>
          <p className="mt-1 text-[12px] leading-relaxed text-[#718096]">
            Daftar bukti kunjungan pembimbing di {namaDesa}.
          </p>
        </div>

        <div className="flex h-9 w-fit shrink-0 items-center gap-2 rounded-full border border-[#C7D9F5] bg-[#EEF4FF] px-3.5">
          <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
          <span className="text-[11px] font-semibold text-[#344A6B]">
            Total Bukti Kunjungan:
          </span>
          <span className="text-[12px] font-bold text-[#245BD6]">
            {dataBukti.length}
          </span>
        </div>
      </div>

      {/* SEARCH DAN FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex h-10 w-full max-w-[520px] items-center gap-2 rounded-md border border-[#B8CCF0] bg-[#E7F0FC] px-3 transition focus-within:border-[#3569F6] focus-within:ring-2 focus-within:ring-[#3569F6]/10">
          <Search size={16} className="shrink-0 text-[#8EA3C0]" />

          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setHalaman(1);
            }}
            placeholder="Cari tanggal atau keterangan..."
            className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setHalaman(1);
              }}
              className="text-[#91A4BF] transition hover:text-[#245BD6]"
              aria-label="Hapus pencarian"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          <span className="text-[11px] text-[#64748B]">Tampilkan:</span>
          <select
            value={jumlahData}
            onChange={(event) => {
              setJumlahData(Number(event.target.value));
              setHalaman(1);
            }}
            className="h-9 rounded-md border border-[#B8CCF0] bg-white px-3 text-[11px] text-[#34445E] outline-none focus:border-[#3569F6]"
          >
            <option value={5}>5 data</option>
            <option value={10}>10 data</option>
            <option value={20}>20 data</option>
          </select>
        </div>
      </div>

      {/* TABEL */}
      <div className="overflow-hidden rounded-lg border border-[#C7D9F5] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="bg-[#EEF4FF]">
                <th className="w-[10%] border-b border-[#C7D9F5] px-5 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  No.
                </th>
                <th className="w-[20%] border-b border-[#C7D9F5] px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Tanggal Kunjungan
                </th>
                <th className="w-[27%] border-b border-[#C7D9F5] px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Keterangan
                </th>
                <th className="w-[20%] border-b border-[#C7D9F5] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Bukti Foto
                </th>
                <th className="w-[23%] border-b border-[#C7D9F5] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#DCE7F8]">
              {dataTampil.length > 0 ? (
                dataTampil.map((item, index) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-[#F8FAFF]"
                  >
                    <td className="px-5 py-5 text-center text-[12px] font-medium text-[#64748B]">
                      {(halaman - 1) * jumlahData + index + 1}
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2 whitespace-nowrap text-[11px] font-medium text-[#34445E]">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-[#2563EB]"
                        />
                        {item.tanggal}
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <p className="max-w-[230px] text-[11px] leading-[1.8] text-[#34445E]">
                        {item.keterangan}
                      </p>
                    </td>

                    {/* THUMBNAIL FOTO */}
                    <td className="px-4 py-5 text-center">
                      <div className="inline-flex overflow-hidden rounded-md border border-[#B8CCF0]">
                        <img
                          src={item.foto}
                          alt={`Bukti kunjungan ${item.tanggal}`}
                          className="h-11 w-[62px] object-cover"
                        />
                      </div>
                    </td>

                    {/* TOMBOL LIHAT BUKTI */}
                    <td className="px-4 py-5 text-center">
                      <button
                        type="button"
                        onClick={() => setBuktiTerpilih(item)}
                        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-[#B8CCF0] bg-white px-3.5 py-2 text-[10px] font-semibold text-[#245BD6] transition hover:border-[#3569F6] hover:bg-[#EEF4FF]"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <div className="flex flex-col items-center">
                      <Search size={25} className="mb-2 text-[#A8B6C9]" />
                      <p className="text-[12px] font-semibold text-[#475569]">
                        Data bukti kunjungan tidak ditemukan
                      </p>
                      <p className="mt-1 text-[11px] text-[#94A3B8]">
                        Coba gunakan kata kunci pencarian lainnya.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER DAN PAGINATION */}
      <div className="flex flex-col gap-3 border-t border-[#C7D9F5] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] font-medium text-[#64748B]">
          Menampilkan{' '}
          <span className="font-bold text-[#34445E]">
            {mulaiData}–{akhirData}
          </span>{' '}
          dari{' '}
          <span className="font-bold text-[#34445E]">{dataFilter.length}</span>{' '}
          bukti kunjungan
        </p>

        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            disabled={halaman === 1}
            onClick={() => setHalaman((prev) => Math.max(1, prev - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] bg-white text-[#64748B] transition hover:border-[#3569F6] hover:bg-[#EEF4FF] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft size={15} />
          </button>

          {Array.from({ length: totalHalaman }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setHalaman(page)}
                className={`h-8 min-w-8 rounded-md border px-2 text-[11px] font-semibold transition ${
                  halaman === page
                    ? 'border-[#245BD6] bg-[#245BD6] text-white shadow-sm'
                    : 'border-[#B8CCF0] bg-white text-[#64748B] hover:border-[#3569F6] hover:bg-[#EEF4FF]'
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={halaman === totalHalaman}
            onClick={() =>
              setHalaman((prev) => Math.min(totalHalaman, prev + 1))
            }
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] bg-white text-[#64748B] transition hover:border-[#3569F6] hover:bg-[#EEF4FF] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* MODAL PREVIEW FOTO */}
      {buktiTerpilih && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-[2px]"
          onClick={() => setBuktiTerpilih(null)}
        >
          <div
            className="w-full max-w-[620px] overflow-hidden rounded-xl border border-[#C7D9F5] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#C7D9F5] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  Bukti Foto Kunjungan
                </h2>
                <p className="mt-1 text-[10px] text-[#8492A6]">
                  Dokumentasi kunjungan pembimbing
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBuktiTerpilih(null)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] text-[#64748B] transition hover:bg-[#F1F5F9]"
                aria-label="Tutup preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="overflow-hidden rounded-lg border border-[#C7D9F5] bg-[#F8FAFC]">
                <img
                  src={buktiTerpilih.foto}
                  alt="Dokumentasi kunjungan"
                  className="max-h-[360px] w-full object-contain"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#34445E]">
                  <CalendarDays size={14} className="text-[#2563EB]" />
                  {buktiTerpilih.tanggal}
                </div>

                <p className="text-[11px] leading-relaxed text-[#64748B]">
                  {buktiTerpilih.keterangan}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]">
                  <MapPin size={13} />
                  {namaDesa}
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#C7D9F5] px-5 py-3">
              <button
                type="button"
                onClick={() => setBuktiTerpilih(null)}
                className="rounded-md border border-[#245BD6] bg-[#245BD6] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#194BB8]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
