import { useMemo, useState } from 'react';
import { Eye, X, Search, ChevronLeft, ChevronRight, Users } from 'lucide-react';

type NilaiTeman = {
  nama: string;
  aspek: number[];
};

type NilaiMahasiswa = {
  id: number;
  nim: string;
  nama: string;
  prodi: string;
  fakultas: string;
  pembimbing: number[];
  kepalaDesa: number[];
  penguji1: number[];
  penguji2: number[];
  nilaiTeman: NilaiTeman[];
};

type NilaiMahasiswaDesaProps = {
  periodeId?: number;
  desaId?: string;
  namaDesa?: string;
};

const dataMahasiswa: NilaiMahasiswa[] = [
  {
    id: 1,
    nim: '9000030346',
    nama: 'Mahasiswa Dummy 30346',
    prodi: 'Ilmu Hukum (S1)',
    fakultas: 'Fakultas Hukum dan Ilmu Sosial',
    pembimbing: [90, 95, 90, 95],
    kepalaDesa: [95, 90, 95, 90],
    penguji1: [90, 95, 90, 95, 90, 95, 90],
    penguji2: [95, 90, 95, 90, 95],
    nilaiTeman: [
      { nama: 'Mahasiswa Dummy 29633', aspek: [100, 100, 100, 100, 100] },
      { nama: 'Mahasiswa Dummy 33373', aspek: [100, 100, 100, 100, 100] },
      { nama: 'Mahasiswa Dummy 33411', aspek: [100, 100, 100, 100, 100] },
      { nama: 'Mahasiswa Dummy 33619', aspek: [100, 100, 100, 100, 100] },
      { nama: 'Mahasiswa Dummy 33777', aspek: [100, 100, 100, 100, 100] },
      { nama: 'Mahasiswa Dummy 33786', aspek: [100, 100, 100, 100, 100] },
      { nama: 'Mahasiswa Dummy 34512', aspek: [95, 100, 95, 100, 95] },
      { nama: 'Mahasiswa Dummy 35004', aspek: [100, 95, 100, 95, 100] },
      { nama: 'Mahasiswa Dummy 35221', aspek: [90, 95, 95, 90, 95] },
      { nama: 'Mahasiswa Dummy 35890', aspek: [100, 100, 100, 100, 100] },
      { nama: 'Mahasiswa Dummy 36322', aspek: [95, 95, 100, 95, 95] },
      { nama: 'Mahasiswa Dummy 36399', aspek: [100, 100, 95, 100, 100] },
    ],
  },
  {
    id: 2,
    nim: '9000030347',
    nama: 'Mahasiswa Dummy 30347',
    prodi: 'Pendidikan Ekonomi (S1)',
    fakultas: 'Fakultas Ekonomi',
    pembimbing: [95, 90, 95, 90],
    kepalaDesa: [90, 95, 90, 95],
    penguji1: [95, 90, 95, 90, 95, 90, 95],
    penguji2: [90, 95, 90, 95, 90],
    nilaiTeman: [
      { nama: 'Mahasiswa Dummy 30346', aspek: [95, 90, 95, 100, 95] },
      { nama: 'Mahasiswa Dummy 33411', aspek: [90, 95, 90, 95, 90] },
      { nama: 'Mahasiswa Dummy 33777', aspek: [100, 95, 100, 95, 100] },
    ],
  },
  {
    id: 3,
    nim: '9000030348',
    nama: 'Mahasiswa Dummy 30348',
    prodi: 'Sistem Informasi (S1)',
    fakultas: 'Fakultas Teknik dan Kejuruan',
    pembimbing: [85, 90, 85, 90],
    kepalaDesa: [90, 85, 90, 85],
    penguji1: [85, 90, 85, 90, 85, 90, 85],
    penguji2: [90, 85, 90, 85, 90],
    nilaiTeman: [
      { nama: 'Mahasiswa Dummy 30346', aspek: [90, 85, 90, 95, 90] },
      { nama: 'Mahasiswa Dummy 30347', aspek: [85, 90, 85, 90, 85] },
    ],
  },
];

const hitungRataRata = (nilai: number[]) => {
  if (nilai.length === 0) return 0;

  return Math.round(
    nilai.reduce((total, item) => total + item, 0) / nilai.length,
  );
};

const hitungNilaiTemanSejawat = (nilaiTeman: NilaiTeman[]) => {
  if (nilaiTeman.length === 0) return 0;

  const rataRataSetiapPenilai = nilaiTeman.map((item) =>
    hitungRataRata(item.aspek),
  );

  return hitungRataRata(rataRataSetiapPenilai);
};

export default function Nilai({
  namaDesa = 'Desa Sembiran',
}: NilaiMahasiswaDesaProps) {
  const [search, setSearch] = useState('');
  const [halaman, setHalaman] = useState(1);
  const [mahasiswaTerpilih, setMahasiswaTerpilih] =
    useState<NilaiMahasiswa | null>(null);

  const jumlahData = 10;

  const dataFilter = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return dataMahasiswa.filter(
      (item) =>
        item.nama.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword) ||
        item.prodi.toLowerCase().includes(keyword),
    );
  }, [search]);

  const totalHalaman = Math.max(1, Math.ceil(dataFilter.length / jumlahData));

  const dataTampil = dataFilter.slice(
    (halaman - 1) * jumlahData,
    halaman * jumlahData,
  );

  const rataRataKeseluruhan = mahasiswaTerpilih
    ? hitungNilaiTemanSejawat(mahasiswaTerpilih.nilaiTeman)
    : 0;

  return (
    <div className="w-full space-y-5">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-[#172943]">
            Nilai Mahasiswa
          </h1>
          <p className="mt-1 text-[12px] text-[#718096]">
            Rekapitulasi penilaian mahasiswa KKN di {namaDesa}.
          </p>
        </div>

        <div className="flex h-9 w-fit items-center gap-2 rounded-full border border-[#C7D9F5] bg-[#EEF4FF] px-3.5">
          <Users size={14} className="text-[#245BD6]" />
          <span className="text-[11px] font-semibold text-[#344A6B]">
            Total Mahasiswa:
          </span>
          <span className="text-[12px] font-bold text-[#245BD6]">
            {dataMahasiswa.length}
          </span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex h-10 w-full min-w-0 max-w-[520px] items-center gap-2 rounded-md border border-[#B8CCF0] bg-[#E7F0FC] px-3">
        <Search size={16} className="shrink-0 text-[#8EA3C0]" />

        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setHalaman(1);
          }}
          placeholder="Cari nama atau NIM mahasiswa..."
          className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
        />

        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setHalaman(1);
            }}
            className="text-[#8EA3C0] transition hover:text-[#245BD6]"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* TABEL PENILAIAN */}
      <div className="overflow-hidden rounded-lg border border-[#C7D9F5] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1550px] border-collapse text-center">
            <thead>
              <tr className="bg-[#EEF4FF]">
                <th
                  rowSpan={2}
                  className="border-r border-white px-3 py-4 text-[10px] font-bold uppercase text-[#34445E]"
                >
                  No.
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-white px-3 py-4 text-left text-[10px] font-bold uppercase text-[#34445E]"
                >
                  NIM
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-white px-3 py-4 text-left text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Nama Mahasiswa
                </th>
                <th
                  rowSpan={2}
                  className="border-r border-white px-3 py-4 text-left text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Program Studi
                </th>
                <th
                  colSpan={4}
                  className="border-r border-white px-2 py-3 text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Nilai Pembimbing
                </th>
                <th
                  colSpan={4}
                  className="border-r border-white px-2 py-3 text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Nilai Kepala Desa
                </th>
                <th
                  colSpan={7}
                  className="border-r border-white px-2 py-3 text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Nilai Penguji 1
                </th>
                <th
                  colSpan={5}
                  className="border-r border-white px-2 py-3 text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Nilai Penguji 2
                </th>
                <th
                  rowSpan={2}
                  className="min-w-[120px] border-r border-white px-2 py-3 text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Nilai Teman Sejawat
                </th>
                <th
                  rowSpan={2}
                  className="min-w-[110px] px-2 py-3 text-[10px] font-bold uppercase text-[#34445E]"
                >
                  Detail Teman Sejawat
                </th>
              </tr>

              <tr className="bg-[#E2ECFF]">
                {[4, 4, 7, 5].map((jumlah, index) =>
                  Array.from({ length: jumlah }, (_, i) => (
                    <th
                      key={`${index}-${i}`}
                      className="border-r border-white px-2 py-2 text-[9px] font-semibold text-[#64748B]"
                    >
                      K{i + 1}
                    </th>
                  )),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8EDF5]">
              {dataTampil.length > 0 ? (
                dataTampil.map((item, index) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-[#F8FAFF]"
                  >
                    <td className="border-r border-[#E8EDF5] px-3 py-4 text-[11px] text-[#64748B]">
                      {(halaman - 1) * jumlahData + index + 1}
                    </td>

                    <td className="border-r border-[#E8EDF5] px-3 py-4 text-left text-[11px] text-[#34445E]">
                      {item.nim}
                    </td>

                    <td className="border-r border-[#E8EDF5] px-3 py-4 text-left text-[11px] font-medium text-[#263B59]">
                      {item.nama}
                    </td>

                    <td className="border-r border-[#E8EDF5] px-3 py-4 text-left text-[11px] text-[#64748B]">
                      {item.prodi}
                    </td>

                    {item.pembimbing.map((nilai, i) => (
                      <td
                        key={`p-${i}`}
                        className="border-r border-[#E8EDF5] px-2 py-4 text-[11px] text-[#34445E]"
                      >
                        {nilai}
                      </td>
                    ))}

                    {item.kepalaDesa.map((nilai, i) => (
                      <td
                        key={`d-${i}`}
                        className="border-r border-[#E8EDF5] px-2 py-4 text-[11px] text-[#34445E]"
                      >
                        {nilai}
                      </td>
                    ))}

                    {item.penguji1.map((nilai, i) => (
                      <td
                        key={`u1-${i}`}
                        className="border-r border-[#E8EDF5] px-2 py-4 text-[11px] text-[#34445E]"
                      >
                        {nilai}
                      </td>
                    ))}

                    {item.penguji2.map((nilai, i) => (
                      <td
                        key={`u2-${i}`}
                        className="border-r border-[#E8EDF5] px-2 py-4 text-[11px] text-[#34445E]"
                      >
                        {nilai}
                      </td>
                    ))}

                    {/* NILAI TEMAN SEJAWAT */}
                    <td className="border-l border-r border-[#E8EDF5] px-2 py-4 text-[11px] text-[#34445E]">
                      {item.nilaiTeman.length > 0
                        ? hitungNilaiTemanSejawat(item.nilaiTeman)
                        : '-'}
                    </td>

                    {/* DETAIL TEMAN SEJAWAT */}
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setMahasiswaTerpilih(item)}
                        title="Lihat nilai teman sejawat"
                        aria-label={`Lihat nilai teman sejawat ${item.nama}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] bg-[#F1F6FF] text-[#245BD6] transition hover:border-[#3569F6] hover:bg-[#E2ECFF]"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={26}
                    className="px-5 py-14 text-center text-[12px] text-[#94A3B8]"
                  >
                    Mahasiswa tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col gap-3 border-t border-[#C7D9F5] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#64748B]">
          Menampilkan{' '}
          <span className="font-semibold text-[#34445E]">
            {dataFilter.length === 0 ? 0 : (halaman - 1) * jumlahData + 1}
            {'–'}
            {Math.min(halaman * jumlahData, dataFilter.length)}
          </span>{' '}
          dari{' '}
          <span className="font-semibold text-[#34445E]">
            {dataFilter.length}
          </span>{' '}
          mahasiswa
        </p>

        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            disabled={halaman === 1}
            onClick={() => setHalaman((prev) => Math.max(1, prev - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] text-[#64748B] transition hover:border-[#3569F6] hover:bg-[#EEF4FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>

          {Array.from({ length: totalHalaman }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setHalaman(page)}
                className={`h-8 min-w-8 rounded-md px-2 text-[11px] font-semibold ${
                  halaman === page
                    ? 'border border-[#245BD6] bg-[#245BD6] text-white'
                    : 'border border-[#B8CCF0] bg-white text-[#64748B] hover:border-[#3569F6] hover:bg-[#EEF4FF]'
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
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] text-[#64748B] transition hover:border-[#3569F6] hover:bg-[#EEF4FF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* MODAL NILAI TEMAN SEJAWAT */}
      {mahasiswaTerpilih && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/50 p-3 backdrop-blur-[2px] sm:p-5"
          onClick={() => setMahasiswaTerpilih(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-[1050px] flex-col overflow-hidden rounded-xl border border-[#C7D9F5] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* HEADER MODAL */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#C7D9F5] px-5 py-4">
              <div>
                <h2 className="text-[16px] font-bold text-[#263449]">
                  Nilai dari Teman Sejawat
                </h2>
                <p className="mt-1 text-[10px] text-[#8492A6]">
                  Rincian penilaian teman sejawat mahasiswa
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMahasiswaTerpilih(null)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#34445E]"
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* ISI MODAL */}
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
              {/* IDENTITAS MAHASISWA */}
              <div className="space-y-0 rounded-lg border border-[#C7D9F5] px-4">
                <div className="grid grid-cols-[150px_1fr] items-center border-b border-[#E2E8F0] py-2.5">
                  <span className="text-[12px] text-[#64748B]">Nama</span>
                  <span className="text-[12px] font-semibold text-[#263449]">
                    {mahasiswaTerpilih.nama}
                  </span>
                </div>

                <div className="grid grid-cols-[150px_1fr] items-center border-b border-[#E2E8F0] py-2.5">
                  <span className="text-[12px] text-[#64748B]">NIM</span>
                  <span className="text-[12px] font-medium text-[#263449]">
                    {mahasiswaTerpilih.nim}
                  </span>
                </div>

                <div className="grid grid-cols-[150px_1fr] items-center py-2.5">
                  <span className="text-[12px] text-[#64748B]">
                    Nama Prodi/Fakultas
                  </span>
                  <span className="text-[12px] font-medium text-[#263449]">
                    {mahasiswaTerpilih.prodi} / {mahasiswaTerpilih.fakultas}
                  </span>
                </div>
              </div>

              {/* REKAP NILAI TEMAN SEJAWAT */}
              <div>
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-[13px] font-bold text-[#263449]">
                    Rekapitulasi Penilaian Teman Sejawat
                  </h3>

                  <span className="text-[11px] text-[#718096]">
                    Total: {mahasiswaTerpilih.nilaiTeman.length} Penilaian
                  </span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-[#C7D9F5]">
                  <table className="w-full min-w-[650px] border-collapse text-center">
                    <thead>
                      <tr className="bg-[#F5F8FC]">
                        <th
                          rowSpan={2}
                          className="border border-[#DCE5F1] px-3 py-2 text-[10px] font-bold text-[#52627A]"
                        >
                          No.
                        </th>
                        <th
                          rowSpan={2}
                          className="min-w-[220px] border border-[#DCE5F1] px-3 py-2 text-left text-[10px] font-bold text-[#52627A]"
                        >
                          Penilaian Dari
                        </th>
                        <th
                          colSpan={5}
                          className="border border-[#DCE5F1] px-3 py-2 text-[10px] font-bold text-[#52627A]"
                        >
                          Aspek
                        </th>
                        <th
                          rowSpan={2}
                          className="min-w-[105px] border border-[#DCE5F1] px-3 py-2 text-[10px] font-bold text-[#52627A]"
                        >
                          Nilai Rata-rata
                        </th>
                      </tr>

                      <tr className="bg-[#F5F8FC]">
                        {[1, 2, 3, 4, 5].map((nomor) => (
                          <th
                            key={nomor}
                            className="border border-[#DCE5F1] px-3 py-2 text-[10px] font-semibold text-[#52627A]"
                          >
                            {nomor}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#E2E8F0]">
                      {mahasiswaTerpilih.nilaiTeman.map((item, index) => (
                        <tr
                          key={`${item.nama}-${index}`}
                          className="hover:bg-[#F8FAFF]"
                        >
                          <td className="border border-[#E2E8F0] px-3 py-3 text-[11px] text-[#64748B]">
                            {index + 1}
                          </td>

                          <td className="border border-[#E2E8F0] px-3 py-3 text-left text-[11px] font-medium text-[#263449]">
                            {item.nama}
                          </td>

                          {item.aspek.map((nilai, i) => (
                            <td
                              key={i}
                              className="border border-[#E2E8F0] px-3 py-3 text-[11px] text-[#34445E]"
                            >
                              {nilai}
                            </td>
                          ))}

                          <td className="border border-[#E2E8F0] bg-[#FAFCFF] px-3 py-3 text-[11px] font-bold text-[#1E40AF]">
                            {hitungRataRata(item.aspek)}
                          </td>
                        </tr>
                      ))}

                      {mahasiswaTerpilih.nilaiTeman.length === 0 && (
                        <tr>
                          <td
                            colSpan={8}
                            className="border border-[#E2E8F0] px-3 py-10 text-[11px] text-[#94A3B8]"
                          >
                            Belum ada penilaian dari teman sejawat.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* TOTAL NILAI TEMAN SEJAWAT */}
                <div className="mt-4 flex flex-col gap-3 rounded-lg border border-[#C7D9F5] bg-[#F5F8FF] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-[#52627A]">
                      Total Nilai Teman Sejawat
                    </p>
                    <p className="mt-1 text-[10px] text-[#8492A6]">
                      Rata-rata dari seluruh penilaian teman sejawat yang
                      diterima.
                    </p>
                  </div>

                  <span className="text-[23px] font-bold text-[#245BD6]">
                    {mahasiswaTerpilih.nilaiTeman.length > 0
                      ? rataRataKeseluruhan
                      : '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex shrink-0 justify-end border-t border-[#C7D9F5] bg-[#F8FAFC] px-5 py-3">
              <button
                type="button"
                onClick={() => setMahasiswaTerpilih(null)}
                className="rounded-md border border-[#B8CCF0] bg-white px-5 py-2 text-[11px] font-semibold text-[#52627A] transition hover:border-[#3569F6] hover:bg-[#F1F5F9]"
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
