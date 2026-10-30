import { useMemo, useState } from 'react';
import {
  Search,
  FileText,
  CalendarDays,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type DokumenKelompokProps = {
  periodeId?: number;
  desaId?: string;
  namaDesa?: string;
};

type DokumenData = {
  id: number;
  nama: string;
  jenis: string;
  namaFile: string;
  ukuran: string;
  tanggal: string;
  jadwal: string;
  pengunggah: string;
  status: string;
  isi: string;
};

const dataDokumen: DokumenData[] = [
  {
    id: 1,
    nama: 'Proposal Kelompok',
    jenis: 'Proposal',
    namaFile: 'Proposal_Kelompok_KKN.pdf',
    ukuran: '2,45 MB',
    tanggal: '18 Juli 2026',
    jadwal: 'Minggu Pertama KKN',
    pengunggah: 'Koordinator Kelompok',
    status: 'Sudah Diunggah',
    isi: 'Dokumen proposal berisi rencana kegiatan, latar belakang, tujuan, dan program kerja kelompok KKN selama pelaksanaan di desa.',
  },
  {
    id: 2,
    nama: 'Laporan Kelompok',
    jenis: 'Laporan Akhir',
    namaFile: 'Laporan_Akhir_Kelompok.pdf',
    ukuran: '3,20 MB',
    tanggal: '5 Agustus 2026',
    jadwal: 'Akhir Pelaksanaan KKN',
    pengunggah: 'Koordinator Kelompok',
    status: 'Sudah Diunggah',
    isi: 'Dokumen laporan akhir berisi rangkuman pelaksanaan kegiatan, hasil program kerja, dokumentasi, dan evaluasi kegiatan kelompok KKN.',
  },
];

export default function DokumenKelompokDesa({
  namaDesa = 'Desa Sembiran',
}: DokumenKelompokProps) {
  const [search, setSearch] = useState('');
  const [halaman, setHalaman] = useState(1);
  const [dokumenTerpilih, setDokumenTerpilih] = useState<DokumenData | null>(
    null,
  );

  const jumlahData = 10;

  const dataFilter = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return dataDokumen.filter(
      (item) =>
        item.nama.toLowerCase().includes(keyword) ||
        item.jenis.toLowerCase().includes(keyword) ||
        item.namaFile.toLowerCase().includes(keyword) ||
        item.tanggal.toLowerCase().includes(keyword) ||
        item.jadwal.toLowerCase().includes(keyword),
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

  const unduhDokumen = (item: DokumenData) => {
    const isiFile = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>${item.nama}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 30px;
      color: #26364D;
      line-height: 1.8;
    }
    h1 { color: #245BD6; font-size: 24px; }
    .info { color: #64748B; font-size: 14px; }
    hr { border: 0; border-top: 1px solid #DCE5F1; margin: 25px 0; }
  </style>
</head>
<body>
  <h1>${item.nama}</h1>
  <p class="info">Desa: ${namaDesa}</p>
  <p class="info">Jenis Dokumen: ${item.jenis}</p>
  <p class="info">Jadwal: ${item.jadwal}</p>
  <p class="info">Tanggal Unggah: ${item.tanggal}</p>
  <p class="info">Pengunggah: ${item.pengunggah}</p>
  <hr />
  <h3>Informasi Dokumen</h3>
  <p>${item.isi}</p>
</body>
</html>`;

    const blob = new Blob([isiFile], {
      type: 'text/html;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${item.namaFile.replace('.pdf', '')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#172943]">
            Dokumen Kelompok
          </h1>
          <p className="mt-1 text-[12px] leading-relaxed text-[#718096]">
            Daftar dokumen proposal dan laporan kelompok KKN di {namaDesa}.
          </p>
        </div>

        <div className="flex h-9 w-fit shrink-0 items-center gap-2 rounded-full border border-[#C7D9F5] bg-[#EEF4FF] px-3.5">
          <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
          <span className="text-[11px] font-semibold text-[#344A6B]">
            Total Dokumen:
          </span>
          <span className="text-[12px] font-bold text-[#245BD6]">
            {dataDokumen.length}
          </span>
        </div>
      </div>

      {/* PENCARIAN */}
      <div className="flex items-center">
        <div className="flex h-10 w-full max-w-[520px] items-center gap-2 rounded-md border border-[#B8CCF0] bg-[#E7F0FC] px-3 transition focus-within:border-[#3569F6] focus-within:ring-2 focus-within:ring-[#3569F6]/10">
          <Search size={16} className="shrink-0 text-[#8EA3C0]" />

          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setHalaman(1);
            }}
            placeholder="Cari nama atau jenis dokumen..."
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
      </div>

      {/* TABEL DOKUMEN */}
      <div className="overflow-hidden rounded-lg border border-[#C7D9F5] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse">
            <thead>
              <tr className="bg-[#EEF4FF]">
                <th className="w-[6%] border-b border-[#C7D9F5] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  No.
                </th>
                <th className="w-[23%] border-b border-[#C7D9F5] px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Nama Dokumen
                </th>
                <th className="w-[13%] border-b border-[#C7D9F5] px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Jenis
                </th>
                <th className="w-[18%] border-b border-[#C7D9F5] px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Jadwal
                </th>
                <th className="w-[15%] border-b border-[#C7D9F5] px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Tanggal Unggah
                </th>
                <th className="w-[12%] border-b border-[#C7D9F5] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Status
                </th>
                <th className="w-[13%] border-b border-[#C7D9F5] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
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
                    <td className="px-4 py-5 text-center text-[12px] font-medium text-[#64748B]">
                      {(halaman - 1) * jumlahData + index + 1}
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#C7D9F5] bg-[#EEF4FF]">
                          <FileText size={17} className="text-[#245BD6]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-[#34445E]">
                            {item.nama}
                          </p>
                          <p className="mt-1 truncate text-[10px] text-[#94A3B8]">
                            {item.namaFile}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <span className="inline-flex rounded-full border border-[#C7D9F5] bg-[#F1F6FF] px-2.5 py-1 text-[10px] font-medium text-[#45658F]">
                        {item.jenis}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-[#34445E]">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-[#2563EB]"
                        />
                        {item.jadwal}
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2 whitespace-nowrap text-[11px] font-medium text-[#34445E]">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-[#94A3B8]"
                        />
                        {item.tanggal}
                      </div>
                    </td>

                    <td className="px-4 py-5 text-center">
                      <span className="inline-flex whitespace-nowrap rounded-full border border-[#BCE8D3] bg-[#ECFDF3] px-2.5 py-1 text-[10px] font-semibold text-[#16834A]">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-5 text-center">
                      <button
                        type="button"
                        onClick={() => setDokumenTerpilih(item)}
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-[#B8CCF0] bg-white px-4 py-2 text-[10px] font-semibold text-[#245BD6] transition hover:border-[#3569F6] hover:bg-[#EEF4FF]"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center">
                    <div className="flex flex-col items-center">
                      <Search size={25} className="mb-2 text-[#A8B6C9]" />
                      <p className="text-[12px] font-semibold text-[#475569]">
                        Dokumen tidak ditemukan
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
          dokumen
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

      {/* MODAL DETAIL DOKUMEN */}
      {dokumenTerpilih && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-[2px]"
          onClick={() => setDokumenTerpilih(null)}
        >
          <div
            className="w-full max-w-[620px] overflow-hidden rounded-xl border border-[#C7D9F5] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* HEADER MODAL */}
            <div className="flex items-center justify-between border-b border-[#C7D9F5] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  Detail Dokumen Kelompok
                </h2>
                <p className="mt-1 text-[10px] text-[#8492A6]">
                  Informasi dokumen kelompok KKN
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDokumenTerpilih(null)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] text-[#64748B] transition hover:bg-[#F1F5F9]"
                aria-label="Tutup detail"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {/* INFORMASI FILE DAN DOWNLOAD */}
              <div className="flex items-center justify-between gap-3 rounded-lg border border-[#C7D9F5] bg-[#F5F8FF] p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#FFD1D5] bg-[#FFF1F2]">
                    <span className="text-[10px] font-bold text-[#EF4444]">
                      PDF
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-[#263B59]">
                      {dokumenTerpilih.namaFile}
                    </p>
                    <p className="mt-1 text-[10px] text-[#8492A6]">
                      {dokumenTerpilih.ukuran} • {dokumenTerpilih.tanggal}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => unduhDokumen(dokumenTerpilih)}
                  title="Unduh dokumen"
                  aria-label="Unduh dokumen"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#B8CCF0] text-[#245BD6] transition hover:bg-[#E2ECFF]"
                >
                  <Download size={18} />
                </button>
              </div>

              {/* DETAIL INFORMASI */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-[#C7D9F5] p-3">
                  <p className="text-[10px] text-[#94A3B8]">Desa</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#34445E]">
                    {namaDesa}
                  </p>
                </div>

                <div className="rounded-md border border-[#C7D9F5] p-3">
                  <p className="text-[10px] text-[#94A3B8]">Jenis Dokumen</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#34445E]">
                    {dokumenTerpilih.jenis}
                  </p>
                </div>

                <div className="rounded-md border border-[#C7D9F5] p-3">
                  <p className="text-[10px] text-[#94A3B8]">
                    Jadwal Pengumpulan
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-[#34445E]">
                    {dokumenTerpilih.jadwal}
                  </p>
                </div>

                <div className="rounded-md border border-[#C7D9F5] p-3">
                  <p className="text-[10px] text-[#94A3B8]">Tanggal Unggah</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#34445E]">
                    {dokumenTerpilih.tanggal}
                  </p>
                </div>

                <div className="rounded-md border border-[#C7D9F5] p-3">
                  <p className="text-[10px] text-[#94A3B8]">Pengunggah</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#34445E]">
                    {dokumenTerpilih.pengunggah}
                  </p>
                </div>

                <div className="rounded-md border border-[#C7D9F5] p-3">
                  <p className="text-[10px] text-[#94A3B8]">Status</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#16834A]">
                    {dokumenTerpilih.status}
                  </p>
                </div>
              </div>

              {/* KETERANGAN */}
              <div>
                <p className="mb-2 text-[11px] font-bold text-[#34445E]">
                  Keterangan Dokumen
                </p>
                <div className="rounded-md border border-[#C7D9F5] bg-[#FAFCFF] p-4">
                  <p className="text-[11px] leading-[1.9] text-[#64748B]">
                    {dokumenTerpilih.isi}
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER MODAL */}
            <div className="flex justify-end border-t border-[#C7D9F5] px-5 py-3">
              <button
                type="button"
                onClick={() => setDokumenTerpilih(null)}
                className="rounded-md border border-[#B8CCF0] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#64748B] transition hover:border-[#3569F6] hover:bg-[#F8FAFC]"
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
