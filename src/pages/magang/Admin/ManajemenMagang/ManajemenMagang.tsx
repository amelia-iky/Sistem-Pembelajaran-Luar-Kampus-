import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  RefreshCw,
  Download,
  SlidersHorizontal,
  Users,
  Check,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

type MahasiswaMagang = {
  id: number;
  nama: string;
  prodi: string;
  nim: string;
  tempat: string;
  dosen: string;
  mentor: string;
  penguji: string;
  status: 'Lengkap' | 'Belum Lengkap';
  statusTempat:
    | 'Menunggu Validasi'
    | 'Disetujui'
    | 'Ditolak'
    | 'Belum Diajukan';
  statusDosen: 'Telah Ditetapkan' | 'Belum Ditentukan' | 'Menunggu Validasi';
  statusMentor: 'Ditetapkan' | 'Belum Ditetapkan';
  statusPenguji: 'Telah Ditetapkan' | 'Belum Ditentukan' | 'Menunggu Validasi';
};

const initialData: MahasiswaMagang[] = [
  {
    id: 1,
    nama: 'Amelia Rizky Yuniar',
    prodi: 'Sistem Informasi',
    nim: '2251500001',
    tempat: 'PT Teknologi Nusantara',
    dosen: 'Belum ditentukan',
    mentor: 'Putu Sri Wahyuni, S.Kom.',
    penguji: 'Belum ditentukan',
    statusTempat: 'Menunggu Validasi',
    statusDosen: 'Belum Ditentukan',
    statusMentor: 'Ditetapkan',
    statusPenguji: 'Belum Ditentukan',
    status: 'Belum Lengkap',
  },
  {
    id: 2,
    nama: 'Gede Arya Pratama',
    prodi: 'Sistem Informasi',
    nim: '2251500002',
    tempat: 'PT Digital Bali Solusindo',
    dosen: 'Belum ditentukan',
    mentor: 'Belum dipilih',
    penguji: 'Belum ditentukan',
    statusTempat: 'Menunggu Validasi',
    statusDosen: 'Belum Ditentukan',
    statusMentor: 'Belum Ditetapkan',
    statusPenguji: 'Belum Ditentukan',
    status: 'Belum Lengkap',
  },
  {
    id: 3,
    nama: 'Ni Luh Putu Devita',
    prodi: 'Sistem Informasi',
    nim: '2251500014',
    tempat: 'PT Telkom Indonesia (Witel Singaraja)',
    dosen: 'Belum ditentukan',
    mentor: 'Made Arta, S.T.',
    penguji: 'Belum ditentukan',
    statusTempat: 'Menunggu Validasi',
    statusDosen: 'Belum Ditentukan',
    statusMentor: 'Ditetapkan',
    statusPenguji: 'Belum Ditentukan',
    status: 'Belum Lengkap',
  },
  {
    id: 4,
    nama: 'Kadek Aditya Wijaya',
    prodi: 'Sistem Informasi',
    nim: '2251500028',
    tempat: 'Kantor Dinas Kominfo dan Statistik Buleleng',
    dosen: 'Belum ditentukan',
    mentor: 'Belum dipilih',
    penguji: 'Belum ditentukan',
    statusTempat: 'Menunggu Validasi',
    statusDosen: 'Belum Ditentukan',
    statusMentor: 'Belum Ditetapkan',
    statusPenguji: 'Belum Ditentukan',
    status: 'Belum Lengkap',
  },
  {
    id: 5,
    nama: 'Komang Ayu Triana Dewi',
    prodi: 'Sistem Informasi',
    nim: '2251500035',
    tempat: 'CV Bali Digital Kreatif',
    dosen: 'Belum ditentukan',
    mentor: 'Komang Ratih, S.Kom.',
    penguji: 'Belum ditentukan',
    statusTempat: 'Menunggu Validasi',
    statusDosen: 'Belum Ditentukan',
    statusMentor: 'Ditetapkan',
    statusPenguji: 'Belum Ditentukan',
    status: 'Belum Lengkap',
  },
  {
    id: 6,
    nama: 'I Made Bayu Kusuma',
    prodi: 'Sistem Informasi',
    nim: '2251500049',
    tempat: 'Bank BPD Bali Cabang Singaraja',
    dosen: 'Belum ditentukan',
    mentor: 'Belum dipilih',
    penguji: 'Belum ditentukan',
    statusTempat: 'Menunggu Validasi',
    statusDosen: 'Belum Ditentukan',
    statusMentor: 'Belum Ditetapkan',
    statusPenguji: 'Belum Ditentukan',
    status: 'Belum Lengkap',
  },
];

const periodeOptions = [
  'Magang Fast Track S1 Sistem Informasi Ganjil 2026/2027',
  'Magang Reguler Ganjil 2026/2027',
  'Magang Reguler Genap 2025/2026',
];

const prodiOptions = [
  'Sistem Informasi (S1)',
  'Ilmu Komputer (S1)',
  'Teknik Rekayasa Perangkat Lunak (D4)',
  'Pendidikan Teknik Informatika (S1)',
];

const inputClass =
  'h-9 rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] text-[#354760] outline-none transition focus:border-[#3569F6] focus:ring-2 focus:ring-blue-100';

export default function ManajemenMagang() {
  const navigate = useNavigate();
  const [data, setData] = useState<MahasiswaMagang[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [periode, setPeriode] = useState('');
  const [prodi, setProdi] = useState('');
  const [appliedProdi, setAppliedProdi] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(''), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);
  const [syncCount, setSyncCount] = useState(0);
  const [showAttributes, setShowAttributes] = useState(false);
  const [actionTarget, setActionTarget] = useState<MahasiswaMagang | null>(
    null,
  );
  const [actionType, setActionType] = useState<
    'tempat' | 'dosen' | 'penguji' | 'detail' | null
  >(null);
  const [formTempat, setFormTempat] = useState('');
  const [formAlamat, setFormAlamat] = useState('');
  const [formDosen, setFormDosen] = useState('');
  const [formBulkDosen, setFormBulkDosen] = useState('');
  const [formBulkPenguji, setFormBulkPenguji] = useState('');

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !query ||
        item.nama.toLowerCase().includes(query) ||
        item.nim.toLowerCase().includes(query);
      const matchesProdi =
        appliedProdi === 'Sistem Informasi (S1)'
          ? item.prodi === 'Sistem Informasi'
          : true;
      return matchesSearch && matchesProdi;
    });
  }, [data, search, appliedProdi]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );
  const allVisibleSelected =
    visibleData.length > 0 &&
    visibleData.every((item) => selectedIds.includes(item.id));

  const toggleOne = (id: number) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const toggleVisible = () => {
    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visibleData.some((item) => item.id === id))
        : [...new Set([...current, ...visibleData.map((item) => item.id)])],
    );
  };

  const handleSync = () => {
    if (selectedIds.length === 0) {
      setNotice(
        'Pilih minimal satu mahasiswa terlebih dahulu sebelum sinkronisasi.',
      );
      return;
    }
    setSyncCount((count) => count + 1);
    setNotice(
      `Sinkronisasi ${selectedIds.length} mahasiswa berhasil dijalankan (simulasi). Data masih menggunakan data lokal dan belum dikirim ke backend.`,
    );
  };

  const handleExport = () => {
    const rows = [
      [
        'No',
        'Mahasiswa',
        'NIM',
        'Tempat Magang',
        'Dosen Pembimbing',
        'Mentor',
        'Dosen Penguji',
        'Status Tempat Magang',
        'Status Dosen Pembimbing',
        'Status Mentor',
        'Status Dosen Penguji',
        'Status Kelengkapan',
      ],
      ...filteredData.map((item, index) => [
        String(index + 1),
        item.nama,
        item.nim,
        item.tempat,
        item.dosen,
        item.mentor,
        item.penguji,
        item.statusTempat,
        item.statusDosen,
        item.statusMentor,
        item.statusPenguji,
        item.status,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','),
      )
      .join('\r\n');
    const url = URL.createObjectURL(
      new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'laporan-manajemen-magang.csv';
    link.click();
    URL.revokeObjectURL(url);
    setNotice('Laporan berhasil diekspor.');
  };

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 font-sans text-[#24334D] sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* Judul halaman: konsisten dengan halaman admin lainnya */}
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Manajemen Magang
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola peserta Magang dan pantau status tempat magang serta
            kelengkapan pendamping.
          </p>
        </header>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className="fixed right-5 top-20 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={19} strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1 pr-1">
              <p className="text-[12px] font-semibold text-[#172943]">
                Pemberitahuan
              </p>
              <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
                {notice}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Tutup pemberitahuan"
              className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Card filter periode, prodi, dan aksi laporan */}
        <section className="mb-4 rounded-[10px] border-[1.5px] border-[#B8CCFF] bg-white p-4 shadow-[0_3px_7px_rgba(31,52,80,0.08)]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block min-w-0 w-full text-[10px] font-semibold text-[#52627A]">
                Periode Magang
                <select
                  value={periode}
                  onChange={(event) => setPeriode(event.target.value)}
                  className={`${inputClass} mt-1.5 w-full`}
                >
                  <option value="" disabled>
                    Pilih Periode Magang
                  </option>
                  {periodeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block min-w-0 w-full text-[10px] font-semibold text-[#52627A]">
                Program Studi
                <select
                  value={prodi}
                  onChange={(event) => {
                    setProdi(event.target.value);
                    setAppliedProdi(event.target.value);
                    setPage(1);
                  }}
                  className={`${inputClass} mt-1.5 w-full`}
                >
                  <option value="">Pilih Program Studi</option>
                  {prodiOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <button
                type="button"
                onClick={handleSync}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] text-[#52627A] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Card daftar mahasiswa: judul, pencarian, aksi, dan tabel dalam satu card */}
        <section className="overflow-hidden rounded-[10px] border-[1.5px] border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="border-b border-[#E8EEF7] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[12px] font-semibold text-[#172943]">
                Daftar Mahasiswa &amp; Penetapan
              </h2>
              <span className="rounded-full bg-[#EEF4FF] px-2 py-0.5 text-[9px] font-medium text-[#3569F6]">
                {filteredData.length} mahasiswa
              </span>
            </div>
            <p className="mt-1 text-[10px] text-[#71819B]">
              Daftar mahasiswa beserta status tempat magang, dosen pembimbing,
              mentor, dan dosen penguji.
            </p>
          </div>
          <div className="border-b border-[#E8EEF7] p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <div className="relative min-w-0 w-full xl:max-w-[550px]">
                <div className="flex h-10 min-w-0 w-full items-center gap-3 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
                  <Search size={16} className="shrink-0 text-[#8EA3C0]" />
                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Cari nama mahasiswa / NIM..."
                    className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 xl:ml-auto xl:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedIds.length === 0) {
                      setNotice(
                        'Pilih minimal satu mahasiswa terlebih dahulu.',
                      );
                      return;
                    }
                    navigate('/admin/magang/set-mahasiswa', {
                      state: {
                        selectedIds,
                        selectedStudents: data.filter((item) =>
                          selectedIds.includes(item.id),
                        ),
                      },
                    });
                  }}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white transition hover:bg-[#2457DF]"
                >
                  <Users size={13} />
                  Set Mahasiswa
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedIds.length === 0) {
                      setNotice(
                        'Pilih minimal satu mahasiswa melalui checkbox terlebih dahulu sebelum Set Atribut.',
                      );
                      return;
                    }
                    setFormBulkDosen('');
                    setFormBulkPenguji('');
                    setShowAttributes(true);
                  }}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white transition hover:bg-[#2457DF]"
                >
                  <SlidersHorizontal size={13} />
                  Set Atribut
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white transition hover:bg-[#2457DF]"
                >
                  <Download size={13} />
                  Export Laporan
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#71819B]">
                  {selectedIds.length} mahasiswa dipilih
                </span>
                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedIds([])}
                    className="text-[10px] text-[#8291A8] hover:text-[#3569F6]"
                  >
                    Batalkan pilihan
                  </button>
                )}
              </div>
              <span className="text-[10px] text-[#8291A8]">
                {filteredData.length} mahasiswa
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1450px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E8EEF7] bg-[#EEF4FF]">
                  <th className="w-10 px-3 py-3">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleVisible}
                      aria-label="Pilih semua mahasiswa yang terlihat"
                      className="h-3 w-3 accent-[#3569F6]"
                    />
                  </th>
                  {[
                    'NO.',
                    'MAHASISWA',
                    'NIM',
                    'TEMPAT MAGANG',
                    'DOSEN PEMBIMBING',
                    'DOSEN PENGUJI',
                    'MENTOR LAPANGAN',
                    'STATUS',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleData.length ? (
                  visibleData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                    >
                      <td className="px-3 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleOne(item.id)}
                          aria-label={`Pilih ${item.nama}`}
                          className="h-3 w-3 accent-[#3569F6]"
                        />
                      </td>
                      <td className="px-3 py-3.5 text-[10px] text-[#465670]">
                        {(safePage - 1) * pageSize + index + 1}
                      </td>
                      <td className="max-w-[175px] px-3 py-3.5">
                        <p className="text-[10px] font-semibold leading-4 text-[#273750]">
                          {item.nama}
                        </p>
                        <p className="mt-0.5 text-[9px] text-[#8291A8]">
                          {item.prodi}
                        </p>
                      </td>
                      <td className="px-3 py-3.5 text-[10px] text-[#465670]">
                        {item.nim}
                      </td>
                      <td className="max-w-[190px] px-3 py-3.5">
                        <p className="text-[10px] leading-4 text-[#465670]">
                          {item.tempat}
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-[9px] font-medium ${item.statusTempat === 'Disetujui' ? 'bg-emerald-50 text-emerald-700' : item.statusTempat === 'Ditolak' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}
                        >
                          {item.statusTempat}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActionTarget(item);
                            setActionType('tempat');
                            setFormTempat(item.tempat);
                            setFormAlamat('');
                          }}
                          className="mt-2 block w-fit rounded-md border border-[#B8CCFF] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          {item.statusTempat === 'Menunggu Validasi'
                            ? 'Periksa Pengajuan'
                            : 'Kelola Tempat'}
                        </button>
                      </td>
                      <td className="max-w-[190px] px-3 py-3.5">
                        <p className="text-[10px] leading-4 text-[#465670]">
                          {item.dosen || 'Belum ditentukan'}
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-[9px] font-medium ${item.statusDosen === 'Telah Ditetapkan' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                        >
                          {item.statusDosen}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActionTarget(item);
                            setActionType('dosen');
                            setFormDosen(
                              item.dosen === 'Belum ditentukan'
                                ? ''
                                : item.dosen,
                            );
                          }}
                          className="mt-2 block w-fit rounded-md border border-[#B8CCFF] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          Tetapkan Pembimbing
                        </button>
                      </td>
                      <td className="max-w-[170px] px-3 py-3.5">
                        <p className="text-[10px] leading-4 text-[#465670]">
                          {item.penguji}
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-[9px] font-medium ${item.statusPenguji === 'Telah Ditetapkan' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                        >
                          {item.statusPenguji}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActionTarget(item);
                            setActionType('penguji');
                            setFormDosen(
                              item.penguji === 'Belum ditentukan'
                                ? ''
                                : item.penguji,
                            );
                          }}
                          className="mt-2 block w-fit rounded-md border border-[#B8CCFF] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          {item.statusPenguji === 'Telah Ditetapkan'
                            ? 'Ubah Penguji'
                            : 'Tetapkan Penguji'}
                        </button>
                      </td>
                      <td className="max-w-[190px] px-3 py-3.5">
                        <p className="text-[10px] leading-4 text-[#465670]">
                          {item.mentor || 'Belum dipilih'}
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-2 py-1 text-[9px] font-medium ${item.statusMentor === 'Ditetapkan' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                        >
                          {item.statusMentor}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[9px] font-medium ${item.status === 'Lengkap' ? 'text-emerald-600' : 'text-amber-600'}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${item.status === 'Lengkap' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <button
                          type="button"
                          title="Lihat ringkasan mahasiswa"
                          onClick={() => {
                            setActionTarget(item);
                            setActionType('detail');
                          }}
                          className="inline-flex items-center gap-1 rounded-md border border-[#E1E8F2] px-2 py-1.5 text-[9px] font-medium text-[#52627A] hover:bg-slate-50"
                        >
                          <Eye size={12} /> Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-12 text-center text-[11px] text-[#8291A8]"
                    >
                      Tidak ada data mahasiswa yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-[#E8EEF7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#71819B]">
              Menampilkan{' '}
              <strong className="font-semibold text-[#354760]">
                {filteredData.length ? (safePage - 1) * pageSize + 1 : 0}-
                {Math.min(safePage * pageSize, filteredData.length)}
              </strong>{' '}
              dari{' '}
              <strong className="font-semibold text-[#354760]">
                {filteredData.length}
              </strong>{' '}
              mahasiswa
              {syncCount > 0 && (
                <span className="ml-2 text-[#94A2B6]">
                  · Sinkronisasi {syncCount}x
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8291A8] hover:bg-blue-50 disabled:opacity-40"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`flex h-7 min-w-7 items-center justify-center rounded-md border px-2 text-[10px] ${safePage === pageNumber ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white' : 'border-[#E1E8F2] text-[#71819B] hover:bg-blue-50'}`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={safePage === pageCount}
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8291A8] hover:bg-blue-50 disabled:opacity-40"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </section>

        {/* Modal aksi admin */}
        {actionTarget && actionType && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14233A]/45 p-4">
            <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
                <div>
                  <h2 className="text-[15px] font-bold text-[#172943]">
                    {actionType === 'tempat'
                      ? 'Validasi Tempat Magang'
                      : actionType === 'dosen'
                        ? 'Penetapan Dosen Pembimbing'
                        : actionType === 'penguji'
                          ? 'Penetapan Dosen Penguji'
                          : 'Detail Pendamping Mahasiswa'}
                  </h2>
                  <p className="mt-1 text-[11px] text-[#71819B]">
                    {actionTarget.nama} · {actionTarget.nim}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActionTarget(null);
                    setActionType(null);
                  }}
                  aria-label="Tutup"
                  className="rounded-md p-1 text-[#8291A8] hover:bg-slate-100"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-4 p-5">
                {actionType === 'tempat' && (
                  <>
                    <div
                      className={`rounded-md px-3 py-2 text-[11px] font-medium ${actionTarget.statusTempat === 'Disetujui' ? 'bg-emerald-50 text-emerald-700' : actionTarget.statusTempat === 'Ditolak' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}
                    >
                      Status saat ini: {actionTarget.statusTempat}
                      {actionTarget.statusTempat === 'Disetujui' && (
                        <p className="mt-1 font-normal">
                          Pengajuan ini sudah disetujui. Kamu bisa memperbaiki
                          data instansi; status persetujuan tetap dipertahankan
                          saat menyimpan perubahan.
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#52627A]">
                        Nama tempat magang
                      </label>
                      <input
                        value={formTempat}
                        onChange={(e) => setFormTempat(e.target.value)}
                        className={`${inputClass} mt-1.5 w-full`}
                        placeholder="Masukkan nama instansi"
                      />
                    </div>

                    <p className="text-[10px] text-[#71819B]">
                      Nama tempat sudah diisi oleh mahasiswa. Periksa atau
                      koreksi nama tersebut, lalu pilih Setujui Pengajuan atau
                      Tolak. Nama tempat wajib terisi.
                    </p>
                  </>
                )}
                {(actionType === 'dosen' || actionType === 'penguji') && (
                  <>
                    <div>
                      <label className="text-[11px] font-semibold text-[#52627A]">
                        Pilih dosen
                      </label>
                      <input
                        list="daftar-dosen-magang"
                        value={formDosen}
                        onChange={(e) => setFormDosen(e.target.value)}
                        className={`${inputClass} mt-1.5 w-full`}
                        placeholder="Pilih dari daftar atau ketik nama dosen"
                        autoComplete="off"
                      />
                      <datalist id="daftar-dosen-magang">
                        <option value="Dr. Made Aditya, M.T." />
                        <option value="Dr. Ketut Agustini, S.Si., M.Si." />
                        <option value="Prof. Dr. I Made Candiasa" />
                        <option value="Dr. Nyoman Sugihartini" />
                        <option value="I Gede Partha Sindu, M.Pd." />
                      </datalist>
                    </div>
                    <p className="text-[10px] text-[#71819B]">
                      Daftar dosen ini masih contoh lokal dan nantinya perlu
                      diambil dari data backend.
                    </p>
                  </>
                )}
                {actionType === 'detail' && (
                  <div className="space-y-3 text-[11px]">
                    <p>
                      <span className="font-semibold">Tempat magang:</span>{' '}
                      {actionTarget.tempat} — {actionTarget.statusTempat}
                    </p>
                    <p>
                      <span className="font-semibold">Dosen pembimbing:</span>{' '}
                      {actionTarget.dosen} — {actionTarget.statusDosen}
                    </p>
                    <p>
                      <span className="font-semibold">Mentor lapangan:</span>{' '}
                      {actionTarget.mentor} — {actionTarget.statusMentor}
                    </p>
                    <p>
                      <span className="font-semibold">Dosen penguji:</span>{' '}
                      {actionTarget.penguji} — {actionTarget.statusPenguji}
                    </p>
                    <p className="rounded-md bg-amber-50 p-3 text-amber-800">
                      Admin tidak mengelola pemilihan atau verifikasi email
                      mentor dari halaman ini. Mahasiswa memilih mentor dan
                      memasukkan kode yang diterima mentor. Admin hanya melihat
                      apakah mentor sudah ditetapkan.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-end gap-2 border-t border-[#E8EEF7] px-5 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setActionTarget(null);
                    setActionType(null);
                  }}
                  className="h-9 rounded-md border border-[#E1E8F2] px-3 text-[11px] font-medium text-[#71819B]"
                >
                  Batal
                </button>
                {actionType === 'tempat' && (
                  <>
                    {actionTarget.statusTempat !== 'Disetujui' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (!formTempat.trim()) {
                            setNotice('Nama tempat magang harus diisi.');
                            return;
                          }
                          setData((current) =>
                            current.map((row) =>
                              row.id === actionTarget.id
                                ? {
                                    ...row,
                                    tempat: formTempat.trim(),
                                    statusTempat: 'Ditolak',
                                    status: 'Belum Lengkap',
                                  }
                                : row,
                            ),
                          );
                          setNotice(
                            `Pengajuan tempat magang ${actionTarget.nama} ditolak (simulasi).${formAlamat ? ` Catatan: ${formAlamat}` : ''}`,
                          );
                          setActionTarget(null);
                          setActionType(null);
                        }}
                        className="h-9 rounded-md border border-red-200 px-3 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                      >
                        Tolak
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (!formTempat.trim()) {
                          setNotice('Nama tempat magang harus diisi.');
                          return;
                        }
                        setData((current) =>
                          current.map((row) =>
                            row.id === actionTarget.id
                              ? {
                                  ...row,
                                  tempat: formTempat.trim(),
                                  statusTempat: 'Disetujui',
                                  status:
                                    row.statusDosen === 'Telah Ditetapkan' &&
                                    row.statusMentor === 'Ditetapkan' &&
                                    row.statusPenguji === 'Telah Ditetapkan'
                                      ? 'Lengkap'
                                      : 'Belum Lengkap',
                                }
                              : row,
                          ),
                        );
                        setNotice(
                          `Tempat magang ${actionTarget.nama} disetujui (simulasi).`,
                        );
                        setActionTarget(null);
                        setActionType(null);
                      }}
                      className="h-9 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white hover:bg-blue-700"
                    >
                      {actionTarget.statusTempat === 'Disetujui'
                        ? 'Simpan Perubahan'
                        : 'Setujui Pengajuan'}
                    </button>
                  </>
                )}
                {(actionType === 'dosen' || actionType === 'penguji') && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!formDosen) {
                        setNotice('Pilih dosen terlebih dahulu.');
                        return;
                      }
                      setData((current) =>
                        current.map((row) =>
                          row.id === actionTarget.id
                            ? actionType === 'dosen'
                              ? {
                                  ...row,
                                  dosen: formDosen.trim(),
                                  statusDosen: 'Telah Ditetapkan',
                                  status:
                                    row.statusTempat === 'Disetujui' &&
                                    row.statusMentor === 'Ditetapkan' &&
                                    row.statusPenguji === 'Telah Ditetapkan'
                                      ? 'Lengkap'
                                      : 'Belum Lengkap',
                                }
                              : {
                                  ...row,
                                  penguji: formDosen.trim(),
                                  statusPenguji: 'Telah Ditetapkan',
                                  status:
                                    row.statusTempat === 'Disetujui' &&
                                    row.statusDosen === 'Telah Ditetapkan' &&
                                    row.statusMentor === 'Ditetapkan'
                                      ? 'Lengkap'
                                      : 'Belum Lengkap',
                                }
                            : row,
                        ),
                      );
                      setNotice(
                        `${actionType === 'dosen' ? 'Dosen pembimbing' : 'Dosen penguji'} untuk ${actionTarget.nama} berhasil ditetapkan (simulasi).`,
                      );
                      setActionTarget(null);
                      setActionType(null);
                    }}
                    className="h-9 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white hover:bg-blue-700"
                  >
                    Simpan Penetapan
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal set atribut untuk penetapan massal mahasiswa terpilih */}
        {showAttributes && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#14233A]/45 p-4">
            <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
                <div>
                  <h2 className="text-[15px] font-bold text-[#172943]">
                    Set Atribut Mahasiswa
                  </h2>
                  <p className="mt-1 text-[11px] text-[#71819B]">
                    Tetapkan dosen pembimbing dan dosen penguji untuk{' '}
                    {selectedIds.length} mahasiswa yang dipilih.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAttributes(false)}
                  aria-label="Tutup modal"
                  className="rounded-md p-1 text-[#8291A8] hover:bg-slate-100"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-5 p-5">
                <div className="rounded-md border border-[#B8CCFF] bg-[#EEF4FF] px-3 py-2.5 text-[11px] text-[#354760]">
                  <strong>{selectedIds.length} mahasiswa dipilih.</strong> Isian
                  yang disimpan akan diterapkan ke seluruh mahasiswa yang
                  dicentang, jadi tidak perlu mengatur satu per satu.
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center">
                  <label
                    htmlFor="bulk-pembimbing"
                    className="text-[11px] font-medium text-[#354760]"
                  >
                    Pembimbing
                  </label>
                  <input
                    id="bulk-pembimbing"
                    list="daftar-dosen-pembimbing-magang"
                    value={formBulkDosen}
                    onChange={(event) => setFormBulkDosen(event.target.value)}
                    className={`${inputClass} w-full`}
                    placeholder="--Pilih Pembimbing Magang atau ketik manual--"
                    autoComplete="off"
                  />
                  <datalist id="daftar-dosen-pembimbing-magang">
                    <option value="Dr. Made Aditya, M.T." />
                    <option value="Dr. Ketut Agustini, S.Si., M.Si." />
                    <option value="Prof. Dr. I Made Candiasa" />
                    <option value="Dr. Nyoman Sugihartini" />
                    <option value="I Gede Partha Sindu, M.Pd." />
                  </datalist>
                  <label
                    htmlFor="bulk-penguji"
                    className="text-[11px] font-medium text-[#354760]"
                  >
                    Penguji Magang
                  </label>
                  <input
                    id="bulk-penguji"
                    list="daftar-dosen-penguji-magang"
                    value={formBulkPenguji}
                    onChange={(event) => setFormBulkPenguji(event.target.value)}
                    className={`${inputClass} w-full`}
                    placeholder="--Pilih Penguji Magang atau ketik manual--"
                    autoComplete="off"
                  />
                  <datalist id="daftar-dosen-penguji-magang">
                    <option value="Dr. Made Aditya, M.T." />
                    <option value="Dr. Ketut Agustini, S.Si., M.Si." />
                    <option value="Prof. Dr. I Made Candiasa" />
                    <option value="Dr. Nyoman Sugihartini" />
                    <option value="I Gede Partha Sindu, M.Pd." />
                  </datalist>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 border-t border-[#E8EEF7] px-5 py-3">
                <button
                  type="button"
                  onClick={() => setShowAttributes(false)}
                  className="h-9 rounded-md border border-[#E1E8F2] px-4 text-[11px] font-medium text-[#71819B] hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedIds.length === 0) {
                      setShowAttributes(false);
                      setNotice(
                        'Pilih minimal satu mahasiswa melalui checkbox terlebih dahulu.',
                      );
                      return;
                    }
                    if (!formBulkDosen.trim() || !formBulkPenguji.trim()) {
                      setNotice(
                        'Lengkapi Pembimbing dan Penguji Magang terlebih dahulu.',
                      );
                      return;
                    }
                    setData((current) =>
                      current.map((row) => {
                        if (!selectedIds.includes(row.id)) return row;
                        const updated = {
                          ...row,
                          dosen: formBulkDosen.trim(),
                          penguji: formBulkPenguji.trim(),
                          statusDosen: 'Telah Ditetapkan' as const,
                          statusPenguji: 'Telah Ditetapkan' as const,
                        };
                        return {
                          ...updated,
                          status:
                            updated.statusTempat === 'Disetujui'
                              ? ('Lengkap' as const)
                              : ('Belum Lengkap' as const),
                        };
                      }),
                    );
                    setShowAttributes(false);
                    setNotice(
                      `Dosen pembimbing dan dosen penguji berhasil diterapkan ke ${selectedIds.length} mahasiswa terpilih (simulasi lokal).`,
                    );
                  }}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white hover:bg-[#2457DF]"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
