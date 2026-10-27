import { useMemo, useState } from 'react';
import {
  Search,
  RefreshCw,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageSquare,
  CircleCheck,
  CircleX,
} from 'lucide-react';

type DokumenMahasiswa = {
  id: number;
  nama: string;
  nim: string;
  prodi: string;
  tempatMagang: string;
  jumlahDokumen: number;
  dokumen: string[];
};

const initialData: DokumenMahasiswa[] = [
  {
    id: 1,
    nama: 'Amelia Rizky Yuniar',
    nim: '2115101024',
    prodi: 'S1 Pendidikan Teknik Informatika',
    tempatMagang: 'PT Telkom Indonesia',
    jumlahDokumen: 5,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
      'Lembar Penilaian',
    ],
  },
  {
    id: 2,
    nama: 'Kaluna Arlia Putri',
    nim: '2115101045',
    prodi: 'S1 Sistem Informasi',
    tempatMagang: 'Bank BPD Bali Kantor Pusat',
    jumlahDokumen: 5,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
      'Lembar Penilaian',
    ],
  },
  {
    id: 3,
    nama: 'Kadek Dwi Wardana',
    nim: '2115101072',
    prodi: 'S1 Ilmu Komputer',
    tempatMagang: 'Dinas Kominfo Provinsi Bali',
    jumlahDokumen: 4,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
    ],
  },
  {
    id: 4,
    nama: 'Ni Made Sinta Dewi',
    nim: '2115101011',
    prodi: 'S1 Sistem Informasi',
    tempatMagang: 'PT Integra Teknologi Mandiri',
    jumlahDokumen: 4,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
    ],
  },
  {
    id: 5,
    nama: 'I Putu Bagus Krisna',
    nim: '2115101089',
    prodi: 'S1 Pendidikan Teknik Informatika',
    tempatMagang: 'Kantor Bappeda Kab. Buleleng',
    jumlahDokumen: 5,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
      'Lembar Penilaian',
    ],
  },
  {
    id: 6,
    nama: 'Luh Wahyu Lestari',
    nim: '2115101033',
    prodi: 'S1 Sistem Informasi',
    tempatMagang: 'RSUD Kabupaten Buleleng',
    jumlahDokumen: 3,
    dokumen: ['Surat Pengantar Magang', 'Proposal Magang', 'Laporan Akhir'],
  },
  {
    id: 7,
    nama: 'Nyoman Yoga Semadi',
    nim: '2115101056',
    prodi: 'S1 Pendidikan Teknik Informatika',
    tempatMagang: 'PT Bali Media Grafika',
    jumlahDokumen: 4,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
    ],
  },
  {
    id: 8,
    nama: 'Ketut Surya Mahardika',
    nim: '2115101062',
    prodi: 'S1 Sistem Informasi',
    tempatMagang: 'Kantor Imigrasi Singaraja',
    jumlahDokumen: 5,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
      'Lembar Penilaian',
    ],
  },
  {
    id: 9,
    nama: 'Putu Adi Pranata',
    nim: '2115101094',
    prodi: 'S1 Ilmu Komputer',
    tempatMagang: 'CV Digital Bali',
    jumlahDokumen: 3,
    dokumen: ['Surat Pengantar Magang', 'Proposal Magang', 'Laporan Akhir'],
  },
  {
    id: 10,
    nama: 'Komang Ayu Pratiwi',
    nim: '2115101101',
    prodi: 'S1 Sistem Informasi',
    tempatMagang: 'Dinas Kominfo Provinsi Bali',
    jumlahDokumen: 4,
    dokumen: [
      'Surat Pengantar Magang',
      'Proposal Magang',
      'Surat Penerimaan',
      'Laporan Akhir',
    ],
  },
];

const periods = [
  'Semua Periode',
  '2026/2027 Ganjil',
  '2025/2026 Genap',
  '2025/2026 Ganjil',
  '2024/2025 Genap',
];

export default function SuratProposalLaporan() {
  const [data] = useState(initialData);
  const [search, setSearch] = useState('');
  const [periode, setPeriode] = useState('Semua Periode');
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<DokumenMahasiswa | null>(null);
  const [notice, setNotice] = useState('');
  const pageSize = 8;

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !keyword ||
        [item.nama, item.nim, item.prodi, item.tempatMagang].some((value) =>
          value.toLowerCase().includes(keyword),
        );
      // Periode is a UI filter placeholder because the sample data has no period field yet.
      const matchesPeriod = periode === 'Semua Periode' || true;
      return matchesSearch && matchesPeriod;
    });
  }, [data, search, periode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function sync() {
    setSearch('');
    setPeriode('Semua Periode');
    setPage(1);
    setNotice(
      'Daftar dokumen berhasil disinkronisasi. Data saat ini masih berupa dummy.',
    );
  }

  function exportCsv() {
    const headers = [
      'Nama Mahasiswa',
      'NIM',
      'Prodi',
      'Tempat Magang',
      'Jumlah Dokumen',
    ];
    const rows = filtered.map((item) => [
      item.nama,
      item.nim,
      item.prodi,
      item.tempatMagang,
      item.jumlahDokumen,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','),
      )
      .join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'data-dokumen-magang.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice('Data dokumen berhasil diekspor ke CSV.');
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Surat, Proposal Magang, dan Laporan Akhir
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola dan periksa kelengkapan dokumen mahasiswa peserta magang.
          </p>
        </header>

        {/* Card 1: title, search, period filter and sync */}
        <section className="mb-4 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-3">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Dokumen Mahasiswa
            </h2>
            <p className="mt-1 text-[10px] leading-4 text-[#71819B]">
              Cari mahasiswa dan lihat kelengkapan surat, proposal, serta
              laporan akhir.
            </p>
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
                placeholder="Cari nama mahasiswa, NIM, prodi, atau tempat magang..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 xl:shrink-0">
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3 text-[11px] font-medium text-white transition hover:bg-blue-700"
              >
                <Download size={14} />
                Export CSV
              </button>
              <select
                value={periode}
                onChange={(event) => {
                  setPeriode(event.target.value);
                  setPage(1);
                }}
                className="h-9 min-w-[150px] rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] text-[#52627A] outline-none focus:border-[#3569F6]"
              >
                {periods.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={sync}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Card 2: table */}
        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[19%]" />
                <col className="w-[13%]" />
                <col className="w-[19%]" />
                <col className="w-[19%]" />
                <col className="w-[13%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'NAMA MAHASISWA',
                    'NIM',
                    'PRODI',
                    'TEMPAT MAGANG',
                    'JUMLAH DOKUMEN',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`whitespace-nowrap px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A] ${
                        heading === 'JUMLAH DOKUMEN' ? 'text-center' : ''
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                  >
                    <td className="px-3 py-3 text-[10px] text-[#465670]">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="min-w-[145px] px-3 py-3">
                      <p className="text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.nim}
                    </td>
                    <td className="min-w-[145px] px-3 py-3 text-[10px] leading-4 text-[#273750]">
                      {item.prodi}
                    </td>
                    <td className="min-w-[150px] px-3 py-3 text-[10px] leading-4 text-[#273750]">
                      {item.tempatMagang}
                    </td>
                    <td className="px-3 py-3 text-center align-middle">
                      <span className="inline-flex min-w-[60px] items-center justify-center whitespace-nowrap rounded-full border border-[#C9DCFF] bg-[#F0F6FF] px-2.5 py-1.5 text-[9px] font-medium leading-none text-[#3569F6]">
                        {item.jumlahDokumen} Dokumen
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setDetail(item)}
                        className="inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-[#3569F6] px-3 text-[10px] font-medium text-white transition hover:bg-blue-700"
                      >
                        <FolderOpen size={12} /> Detail Dokumen
                      </button>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data mahasiswa yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-[#EDF1F7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-[#8A99B0]">
              Menampilkan{' '}
              {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} dari{' '}
              {filtered.length} entri
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
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
                    className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${currentPage === number ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white' : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'}`}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={currentPage >= totalPages}
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

      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetail(null);
          }}
        >
          <div className="w-full max-w-[1100px] overflow-hidden rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[15px] font-bold text-[#172943]">
                  Detail Dokumen Mahasiswa
                </h2>
                <p className="mt-1 text-[11px] text-[#71819B]">
                  {detail.nama} · {detail.nim} · {detail.tempatMagang}
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <div className="overflow-x-auto rounded-lg border border-[#DCE5F1]">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#EEF4FF]">
                      {[
                        'NO.',
                        'JENIS DOKUMEN',
                        'NAMA DOKUMEN',
                        'STATUS',
                        'KOMENTAR',
                        'AKSI',
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="whitespace-nowrap px-3 py-4 text-[11px] font-bold tracking-wide text-[#45566F] sm:px-4"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        jenis: 'Surat Izin Magang',
                        nama: 'Surat_Izin_Magang_PT_Telkom_Amelia.pdf',
                        uploaded: true,
                        komentar:
                          'Disetujui oleh Koordinator Prodi pada 12 Feb 2025',
                      },
                      {
                        jenis: 'Dokumen MoU / MoA / PKS',
                        nama: 'PKS_Kerjasama_Undiksha_Telkom_2024.pdf',
                        uploaded: true,
                        komentar: 'PKS Aktif hingga Desember 2025',
                      },
                      {
                        jenis: 'Proposal Kegiatan Magang',
                        nama: 'Proposal_Magang_Software_Engineering_Amelia.pdf',
                        uploaded: true,
                        komentar: 'Revisi bab target luaran telah diperbaiki',
                      },
                      {
                        jenis: 'Laporan Akhir Magang',
                        nama: '',
                        uploaded: false,
                        komentar: 'Menunggu penyelesaian periode magang',
                      },
                      {
                        jenis: 'Sertifikat Magang',
                        nama: '',
                        uploaded: false,
                        komentar:
                          'Diterbitkan instansi setelah magang berakhir',
                      },
                    ].map((document, index) => (
                      <tr
                        key={document.jenis}
                        className="border-t border-[#E2E8F0] hover:bg-[#FCFDFF]"
                      >
                        <td className="px-3 py-4 text-[12px] text-[#526783] sm:px-4">
                          {index + 1}
                        </td>
                        <td className="max-w-[150px] px-3 py-4 text-[12px] font-medium leading-5 text-[#273750] sm:px-4">
                          {document.jenis}
                        </td>
                        <td className="max-w-[250px] break-words px-3 py-4 text-[12px] leading-5 text-[#40536F] sm:px-4">
                          {document.uploaded ? (
                            document.nama
                          ) : (
                            <span className="italic text-[#91A4BF]">
                              — (Belum ada berkas)
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-4 sm:px-4">
                          {document.uploaded ? (
                            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700">
                              <CircleCheck size={12} /> Sudah Upload
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[11px] font-medium text-rose-600">
                              <CircleX size={12} /> Belum Upload
                            </span>
                          )}
                        </td>
                        <td className="max-w-[210px] px-3 py-4 text-[12px] leading-4 text-[#52627A] sm:px-4">
                          {document.komentar}
                        </td>
                        <td className="px-3 py-4 sm:px-4">
                          {document.uploaded ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setNotice(`Unduhan contoh: ${document.nama}`)
                                }
                                className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-[#3569F6] px-2.5 text-[11px] font-medium text-white hover:bg-blue-700"
                              >
                                <Download size={12} /> Download
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setNotice(
                                    `Komentar dokumen: ${document.komentar}`,
                                  )
                                }
                                className="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-[#3569F6] px-2.5 text-[11px] font-medium text-[#3569F6] hover:bg-blue-50"
                              >
                                <MessageSquare size={12} /> Komentar
                              </button>
                            </div>
                          ) : (
                            <span className="px-6 text-[13px] text-[#91A4BF]">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end border-t border-[#E8EEF7] bg-[#F8FAFD] px-5 py-3">
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="rounded-md border border-[#DCE5F1] bg-white px-5 py-2 text-[12px] font-medium text-[#354760] transition hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-[11px] text-[#354760] shadow-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            ✓
          </span>
          <span className="flex-1">{notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            className="text-slate-400"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
