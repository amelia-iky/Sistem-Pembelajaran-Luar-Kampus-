import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Trophy,
  Newspaper,
  FileText,
  MoreHorizontal,
  Pencil,
  Check,
  X,
  Info,
  AlertTriangle,
  UserRound,
  Search,
  Plus,
  Download,
  Eye,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { STORAGE_KEY, type PeriodeKKNData } from './Periode';

type AgendaKegiatan = {
  id?: number;
  nama?: string;
  lamaKegiatan?: string;
  kodeKegiatan?: string;
  tanggal?: string;
  nomorSuratTugas?: string;
};

type DesaKKN = {
  id: string | number;
  nama?: string;
  namaDesa?: string;
  kecamatan?: string;
  kabupaten?: string;
  pembimbing?: string;
  dosenPembimbing?: string;
  penguji?: string;
  penguji1?: string;
  penguji2?: string;
  nipPenguji1?: string;
  nipPenguji2?: string;
  koordinator?: string;
  koordinatorDesa?: string;
  status?: string;
  alamat?: string;
  kepalaDesa?: string;
  telepon?: string;
  klaster?: string;
  nipPembimbing?: string;
  fakultasPembimbing?: string;
  peserta?: number | string;
  jumlahPeserta?: number | string;
  jumlahBlog?: number | string;
};

type DetailPeriode = Record<string, unknown> & {
  tahunAjar?: string;
  semester?: string;
  putaran?: string | number;
  kabupaten?: string;
  kecamatan?: string;
  desa?: string;
  pendaftaranAwal?: string;
  pendaftaranAkhir?: string;
  batasProposal?: string;
  batasUsulanDosen?: string;
  pelaksanaanAwal?: string;
  pelaksanaanAkhir?: string;
  penilaianLapangan?: string;
  targetBimbingan?: string | number;
  anggotaMinimal?: string | number;
  anggotaMaksimal?: string | number;
  lakiLakiMinimal?: string | number;
  perempuanMinimal?: string | number;
  ketuaLP2M?: string;
  nipLP2M?: string;
  ketuaPPKO?: string;
  nipPPKO?: string;
  pejabatPengesahan?: string;
  nipPengesahan?: string;
  agenda?: AgendaKegiatan[];
};

const tabs = [
  { label: 'Informasi Dasar', icon: CalendarDays },
  { label: 'Daftar Desa', icon: MapPin },
  { label: 'Daftar Peserta', icon: Users },
  { label: 'Daftar Pemenang', icon: Trophy },
  { label: 'Blog', icon: Newspaper },
  { label: 'SPD dan Surat Tugas Dosen', icon: FileText },
  { label: 'Aksi', icon: MoreHorizontal },
];

const labelClass = 'text-[11px] font-medium text-[#71819B]';
const valueClass = 'mt-1 text-[12px] font-semibold leading-5 text-[#273750]';
const sectionTitleClass = 'text-[12px] font-bold text-[#172943]';

const statusKolomKiri = [
  'Status Periode',
  'Status Pendaftaran Awal',
  'Status Pendaftaran Akhir',
  'Dipakai Dosen',
  'Status Kelompok',
  'Status Upload Proposal',
  'Status Pelaksanaan',
];

const statusKolomKanan = [
  'Status Upload Laporan',
  'Status Input Nilai Kades & Teman',
  'Status Nilai Pembimbing',
  'Status Nilai Penguji',
];

const statusAwal: Record<string, boolean> = {
  'Status Periode': true,
  'Status Pendaftaran Awal': false,
  'Status Pendaftaran Akhir': false,
  'Dipakai Dosen': true,
  'Status Kelompok': true,
  'Status Upload Proposal': true,
  'Status Pelaksanaan': true,
  'Status Upload Laporan': true,
  'Status Input Nilai Kades & Teman': true,
  'Status Nilai Pembimbing': true,
  'Status Nilai Penguji': true,
};

function bacaPeriode(id: number): PeriodeKKNData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data: PeriodeKKNData[] = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(data)) return null;
    const index = data.findIndex((item) => item.id === id);
    if (index < 0) return null;

    const current = data[index];
    // Data contoh lengkap untuk periode demo yang sebelumnya masih kosong.
    // Tidak menimpa data yang sudah pernah diisi pengguna.
    if (
      id === 1 &&
      (!current.detail || Object.keys(current.detail).length === 0)
    ) {
      const detail = {
        tahunAjar: current.tahunAjar || '2026/2027',
        semester: current.semester || 'Ganjil',
        putaran: current.putaran || 1,
        kabupaten: current.kabupaten || 'Kabupaten Buleleng',
        kecamatan: current.kecamatan || 'Sukasada',
        desa: current.desa || 'Sambangan',
        pendaftaranAwal: '2026-08-03',
        pendaftaranAkhir: '2026-08-14',
        batasProposal: '2026-08-21',
        batasUsulanDosen: '2026-08-28',
        pelaksanaanAwal: '2026-09-07',
        pelaksanaanAkhir: '2026-12-18',
        penilaianLapangan: '2026-12-07',
        targetBimbingan: '4',
        anggotaMinimal: '6',
        anggotaMaksimal: '16',
        lakiLakiMinimal: '8',
        perempuanMinimal: '8',
        ketuaLP2M: 'Prof. Dr. I Wayan Suwendra, S.Pd., M.Pd.',
        nipLP2M: '196900000000000001',
        ketuaPPKO: 'Dr. I Made Suryasa, S.Pd., M.Pd.',
        nipPPKO: '197000000000000002',
        pejabatPengesahan: 'Dr. I Gede Sudirtha, S.Pd., M.Pd.',
        nipPengesahan: '197000000000000003',
        agenda: [],
        daftarDesa: [
          {
            id: 1001,
            nama: 'Sambangan',
            namaDesa: 'Sambangan',
            kecamatan: 'Sukasada',
            kabupaten: 'Kabupaten Buleleng',
            alamat:
              'Desa Sambangan, Kecamatan Sukasada, Kabupaten Buleleng, Bali',
            kepalaDesa: 'I Made Suardana',
            telepon: '081234567890',
            klaster: 'Desa Wisata',
            pembimbing: 'Dr. Ni Luh Putu Srinadi, S.Si., M.Si.',
            dosenPembimbing: 'Dr. Ni Luh Putu Srinadi, S.Si., M.Si.',
            nipPembimbing: '197812122005012003',
            fakultasPembimbing: 'FMIPA',
            penguji: 'I Putu Gede Sudarma, S.Kom., M.Cs.',
            penguji1: 'I Putu Gede Sudarma, S.Kom., M.Cs.',
            nipPenguji1: '198503152010121005',
            penguji2: 'Ni Made Dwi Mahayanti, S.Pd., M.Pd.',
            nipPenguji2: '198702202014042001',
            koordinator: 'I Komang Adi Putra',
            koordinatorDesa: 'I Komang Adi Putra',
            peserta: 12,
            jumlahPeserta: 12,
            jumlahBlog: 8,
            status: 'Aktif Ditugaskan',
          },
        ],
      };
      data[index] = {
        ...current,
        tahunAjar: String(detail.tahunAjar),
        semester: String(detail.semester),
        putaran: Number(detail.putaran),
        kabupaten: String(detail.kabupaten),
        kecamatan: String(detail.kecamatan),
        desa: String(detail.desa),
        detail,
      } as PeriodeKKNData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data[index];
    }
    return current;
  } catch {
    return null;
  }
}

function tanggal(value?: string) {
  if (!value) return '-';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function nilai(value: unknown) {
  if (value === undefined || value === null || value === '') return '-';
  return String(value);
}

function formatRentang(awal?: string, akhir?: string) {
  if (!awal || !akhir) return '-';
  return `${tanggal(awal)} – ${tanggal(akhir)}`;
}

export default function DetailPeriode() {
  const navigate = useNavigate();
  const { id } = useParams();
  const periodeId = Number(id);

  const [periode, setPeriode] = useState<PeriodeKKNData | null>(() =>
    Number.isFinite(periodeId) ? bacaPeriode(periodeId) : null,
  );

  const [tabAktif, setTabAktif] = useState('Informasi Dasar');
  const [desaDihapus, setDesaDihapus] = useState<Array<string | number>>([]);
  const [editStatus, setEditStatus] = useState(false);
  const [cariDesa, setCariDesa] = useState('');
  const [modalDesa, setModalDesa] = useState(false);
  const [editDesaId, setEditDesaId] = useState<string | number | null>(null);
  const [formDesa, setFormDesa] = useState({
    nama: '',
    kecamatan: '',
    kabupaten: '',
    alamat: '',
    kepalaDesa: '',
    telepon: '',
    klaster: '',
    pembimbing: '',
    nipPembimbing: '',
    fakultasPembimbing: '',
    penguji1: '',
    nipPenguji1: '',
    penguji2: '',
    nipPenguji2: '',
    koordinatorDesa: '',
    peserta: '0',
    jumlahBlog: '0',
  });

  const [statusParameter, setStatusParameter] = useState<
    Record<string, boolean>
  >(() => ({
    ...statusAwal,
    'Status Periode': periode?.status === 'Aktif',
  }));

  const [notice, setNotice] = useState('');

  function bukaModalDesa() {
    setEditDesaId(null);
    setFormDesa({
      nama: '',
      kecamatan: periode?.kecamatan ?? '',
      kabupaten: periode?.kabupaten ?? '',
      alamat: '',
      kepalaDesa: '',
      telepon: '',
      klaster: '',
      pembimbing: '',
      nipPembimbing: '',
      fakultasPembimbing: '',
      penguji1: '',
      nipPenguji1: '',
      penguji2: '',
      nipPenguji2: '',
      koordinatorDesa: '',
      peserta: '0',
      jumlahBlog: '0',
    });
    setModalDesa(true);
  }

  function simpanDesa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!periode || !formDesa.nama.trim()) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data: PeriodeKKNData[] = saved ? JSON.parse(saved) : [];
      const current = data.find((item) => item.id === periode.id);
      if (!current) throw new Error('Periode tidak ditemukan');

      const oldRows = Array.isArray(current.detail?.daftarDesa)
        ? (current.detail.daftarDesa as Array<Record<string, unknown>>)
        : current.desa
          ? [
              {
                id: current.id,
                nama: current.desa,
                kecamatan: current.kecamatan,
                kabupaten: current.kabupaten,
                status: 'Belum Ditugaskan',
              },
            ]
          : [];

      const desaBaru = {
        id: Date.now(),
        ...formDesa,
        nama: formDesa.nama.trim(),
        namaDesa: formDesa.nama.trim(),
        peserta: Number(formDesa.peserta) || 0,
        jumlahBlog: Number(formDesa.jumlahBlog) || 0,
        status: 'Belum Ditugaskan',
      };

      const daftarDesaTerbaru =
        editDesaId === null
          ? [...oldRows, desaBaru]
          : oldRows.map((row, index) =>
              String(row.id ?? index + 1) === String(editDesaId)
                ? { ...row, ...desaBaru, id: row.id ?? editDesaId }
                : row,
            );
      const updated = data.map((item) =>
        item.id === periode.id
          ? {
              ...item,
              detail: { ...item.detail, daftarDesa: daftarDesaTerbaru },
            }
          : item,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const periodeTerbaru =
        updated.find((item) => item.id === periode.id) ?? null;
      setPeriode(periodeTerbaru);
      setModalDesa(false);
      setNotice(
        editDesaId === null
          ? 'Data desa berhasil ditambahkan.'
          : 'Data desa berhasil diperbarui.',
      );
      setEditDesaId(null);
    } catch {
      setNotice('Data desa gagal disimpan.');
    }
  }

  function hapusDesa(idDesa: string | number, nama: string) {
    if (!periode || !window.confirm(`Hapus Desa ${nama} dari periode ini?`))
      return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data: PeriodeKKNData[] = saved ? JSON.parse(saved) : [];
      const current = data.find((item) => item.id === periode.id);
      if (!current) return;
      const rows = Array.isArray(current.detail?.daftarDesa)
        ? (current.detail.daftarDesa as Array<Record<string, unknown>>)
        : [];
      const updated = data.map((item) =>
        item.id === periode.id
          ? {
              ...item,
              detail: {
                ...item.detail,
                daftarDesa: rows.filter(
                  (row, index) =>
                    String(row.id ?? index + 1) !== String(idDesa),
                ),
              },
            }
          : item,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setPeriode(updated.find((item) => item.id === periode.id) ?? null);
      setDesaDihapus([]);
      setNotice('Data desa berhasil dihapus.');
    } catch {
      setNotice('Data desa gagal dihapus.');
    }
  }

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const detail = useMemo(
    () => (periode?.detail ?? {}) as DetailPeriode,
    [periode],
  );

  const daftarDesa = useMemo<DesaKKN[]>(() => {
    const rows = detail.daftarDesa;

    if (Array.isArray(rows)) {
      return (rows as Array<Record<string, unknown>>).map((row, index) => ({
        id: (row.id as string | number | undefined) ?? index + 1,
        nama: String(
          row.nama ?? row.namaDesa ?? row.desa ?? `Desa ${index + 1}`,
        ),
        kecamatan: row.kecamatan ? String(row.kecamatan) : undefined,
        kabupaten: row.kabupaten ? String(row.kabupaten) : undefined,
        pembimbing: row.pembimbing
          ? String(row.pembimbing)
          : row.dosenPembimbing
            ? String(row.dosenPembimbing)
            : undefined,
        penguji: row.penguji ? String(row.penguji) : undefined,
        penguji1: row.penguji1 ? String(row.penguji1) : undefined,
        penguji2: row.penguji2 ? String(row.penguji2) : undefined,
        nipPenguji1: row.nipPenguji1 ? String(row.nipPenguji1) : undefined,
        nipPenguji2: row.nipPenguji2 ? String(row.nipPenguji2) : undefined,
        koordinator: row.koordinator
          ? String(row.koordinator)
          : row.koordinatorDesa
            ? String(row.koordinatorDesa)
            : undefined,
        status: row.status ? String(row.status) : 'Aktif Ditugaskan',
        alamat: row.alamat ? String(row.alamat) : undefined,
        kepalaDesa: row.kepalaDesa ? String(row.kepalaDesa) : undefined,
        telepon: row.telepon ? String(row.telepon) : undefined,
        klaster: row.klaster ? String(row.klaster) : undefined,
        nipPembimbing: row.nipPembimbing
          ? String(row.nipPembimbing)
          : undefined,
        fakultasPembimbing: row.fakultasPembimbing
          ? String(row.fakultasPembimbing)
          : undefined,
        peserta: (row.peserta ?? row.jumlahPeserta) as
          | number
          | string
          | undefined,
        jumlahBlog: row.jumlahBlog as number | string | undefined,
      }));
    }

    if (periode?.desa) {
      return [
        {
          id: periode.id,
          nama: periode.desa,
          kecamatan: periode.kecamatan,
          kabupaten: periode.kabupaten,
          status: 'Aktif Ditugaskan',
        },
      ];
    }

    return [];
  }, [detail, periode]);

  function simpanStatus() {
    if (!periode) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const data: PeriodeKKNData[] = saved ? JSON.parse(saved) : [];

      const statusFinal = statusParameter['Status Periode']
        ? 'Aktif'
        : 'Nonaktif';

      const updated = data.map((item) =>
        item.id === periode.id
          ? ({
              ...item,
              status: statusFinal,
              statusParameter,
            } as PeriodeKKNData)
          : item,
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setPeriode({ ...periode, status: statusFinal });
      setEditStatus(false);
      setNotice('Status periode berhasil diperbarui.');
    } catch {
      setNotice('Status periode gagal diperbarui.');
    }
  }

  if (!periode) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-4xl rounded-xl border border-[#DCE7F7] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#3569F6]">
          <CalendarDays size={22} />
        </div>

        <h1 className="text-lg font-bold text-[#172943]">
          Periode tidak ditemukan
        </h1>

        <p className="mt-2 text-sm text-[#71819B]">
          Data periode ini tidak tersedia atau sudah dihapus.
        </p>

        <button
          type="button"
          onClick={() => navigate('/admin/kkn/periode')}
          className="mt-5 rounded-lg bg-[#245BD6] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-800"
        >
          Kembali ke Daftar Periode
        </button>
      </div>
    );
  }

  const lokasi = [periode.desa, periode.kecamatan, periode.kabupaten]
    .filter(Boolean)
    .join(', ');

  function judulBagian(title: string, subtitle?: string) {
    return (
      <div className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 h-5 w-1 shrink-0 rounded-full bg-[#3569F6]" />
        <div>
          <h3 className={sectionTitleClass}>{title}</h3>
          {subtitle && (
            <p className="mt-1 text-[11px] leading-4 text-[#8492A8]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  function field(label: string, value: unknown) {
    return (
      <div className="min-w-0 py-2.5">
        <p className={labelClass}>{label}</p>
        <p className={valueClass}>{nilai(value)}</p>
      </div>
    );
  }

  const jadwal: [string, unknown][] = [
    ['Pendaftaran Awal', detail.pendaftaranAwal],
    ['Pendaftaran Akhir', detail.pendaftaranAkhir],
    ['Batas Upload Proposal', detail.batasProposal],
    ['Batas Usulan Dosen', detail.batasUsulanDosen],
    [
      'Pelaksanaan KKN',
      formatRentang(detail.pelaksanaanAwal, detail.pelaksanaanAkhir),
    ],
    ['Penilaian Lapangan', detail.penilaianLapangan],
  ];

  const pejabat: [string, unknown, unknown][] = [
    ['Ketua LP2M', detail.ketuaLP2M, detail.nipLP2M],
    ['Pejabat Pembuat Komitmen', detail.ketuaPPKO, detail.nipPPKO],
    ['Pejabat Pengesahan', detail.pejabatPengesahan, detail.nipPengesahan],
  ];

  const statusTahapan: [string, unknown][] = [
    ['Status Periode', periode.status],
    [
      'Pendaftaran Awal',
      detail.pendaftaranAwal ? tanggal(detail.pendaftaranAwal) : 'Belum diatur',
    ],
    [
      'Pendaftaran Akhir',
      detail.pendaftaranAkhir
        ? tanggal(detail.pendaftaranAkhir)
        : 'Belum diatur',
    ],
    [
      'Pelaksanaan',
      formatRentang(detail.pelaksanaanAwal, detail.pelaksanaanAkhir) === '-'
        ? 'Belum diatur'
        : formatRentang(detail.pelaksanaanAwal, detail.pelaksanaanAkhir),
    ],
    ['Disimpan Pada', periode.disimpanPada],
  ];

  const hasilValidasi = Object.entries(statusParameter)
    .filter(([, aktif]) => aktif)
    .flatMap(([label]) => {
      const hasil: { judul: string; pesan: string }[] = [];
      const tambah = (judul: string, pesan: string) =>
        hasil.push({ judul, pesan });

      if (label === 'Status Periode') {
        if (!periode.tahunAjar || !periode.semester || !periode.kabupaten) {
          tambah(
            'Status periode',
            'Lengkapi tahun ajar, semester, dan kabupaten/kota terlebih dahulu.',
          );
        }
      } else if (
        label === 'Status Pendaftaran Awal' &&
        !detail.pendaftaranAwal
      ) {
        tambah(
          'Status pendaftaran awal',
          'Tanggal pendaftaran awal belum diatur.',
        );
      } else if (
        label === 'Status Pendaftaran Akhir' &&
        !detail.pendaftaranAkhir
      ) {
        tambah(
          'Status pendaftaran akhir',
          'Tanggal pendaftaran akhir belum diatur.',
        );
      } else if (label === 'Status Kelompok' && !periode.desa && !detail.desa) {
        tambah(
          'Status kelompok KKN',
          'Lokasi desa belum diatur pada periode ini.',
        );
      } else if (label === 'Status Upload Proposal' && !detail.batasProposal) {
        tambah(
          'Status upload proposal',
          'Batas waktu upload proposal belum diatur.',
        );
      } else if (
        label === 'Status Pelaksanaan' &&
        (!detail.pelaksanaanAwal || !detail.pelaksanaanAkhir)
      ) {
        tambah(
          'Status pelaksanaan',
          'Tanggal awal dan akhir pelaksanaan KKN harus diatur.',
        );
      } else if (
        label === 'Status Upload Laporan' &&
        (!detail.pelaksanaanAwal || !detail.pelaksanaanAkhir)
      ) {
        tambah(
          'Status upload laporan',
          'Jadwal pelaksanaan KKN belum lengkap.',
        );
      }

      return hasil;
    });

  return (
    <div className="min-h-full bg-[#F4F7FC] p-4 sm:p-5 lg:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/kkn/periode')}
            aria-label="Kembali ke daftar periode"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D7E3F5] bg-white text-[#52627A] transition hover:bg-blue-50"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-[#172943]">
                Detail Periode
              </h1>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  periode.status === 'Aktif'
                    ? 'bg-[#E4F3EC] text-[#16805D]'
                    : 'bg-[#FDECEC] text-[#D64545]'
                }`}
              >
                {periode.status}
              </span>
            </div>

            <p className="mt-1 text-xs text-[#71819B]">
              {periode.tahunAjar} <span className="px-1">·</span> Semester{' '}
              {periode.semester} <span className="px-1">·</span> Putaran{' '}
              {periode.putaran}
            </p>
          </div>
        </div>

        {/* Tombol hanya tampil pada tab Informasi Dasar */}
        {tabAktif === 'Informasi Dasar' && (
          <button
            type="button"
            onClick={() => {
              setStatusParameter((current) => ({
                ...statusAwal,
                ...current,
                'Status Periode': periode.status === 'Aktif',
              }));
              setEditStatus(true);
            }}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#B8CCFF] bg-white px-3.5 text-xs font-semibold text-[#245BD6] shadow-sm transition hover:bg-[#F3F7FF]"
          >
            <Pencil size={14} />
            Ubah Status Periode
          </button>
        )}
      </div>

      <nav
        aria-label="Navigasi detail periode"
        className="mb-4 border-b border-[#DCE7F7]"
      >
        <div className="overflow-x-auto">
          <div className="flex w-max min-w-full justify-center gap-1">
            {tabs.map(({ label, icon: Icon }) => (
              <button
                type="button"
                key={label}
                onClick={() => setTabAktif(label)}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-3 text-[11px] font-semibold transition ${
                  tabAktif === label
                    ? 'border-[#3569F6] text-[#245BD6]'
                    : 'border-transparent text-[#7B8AA1] hover:text-[#245BD6]'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="mb-5 overflow-hidden rounded-xl border border-[#DCE7F7] bg-white shadow-sm">
        {tabAktif === 'Informasi Dasar' ? (
          <div className="p-4 sm:p-6">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-[#E8EEF7] pb-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <Info size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#172943]">
                    Informasi Periode
                  </h2>
                  <p className="mt-1 max-w-xl text-xs leading-5 text-[#8492A8]">
                    Ringkasan konfigurasi pelaksanaan KKN dan status operasional
                    sistem.
                  </p>
                </div>
              </div>

              <span className="rounded-lg border border-[#DCE7F7] bg-[#F8FAFF] px-3 py-2 text-[11px] font-semibold text-[#45628F]">
                ID Periode: <span className="text-[#245BD6]">{periode.id}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.9fr)] lg:gap-8">
              <div className="min-w-0 space-y-7">
                <section>
                  {judulBagian(
                    'Informasi Umum',
                    'Identitas dan lokasi pelaksanaan periode KKN',
                  )}

                  <div className="rounded-xl border border-[#E2EAF6] px-4 sm:px-5">
                    <div className="grid grid-cols-1 divide-y divide-[#EDF1F7] sm:grid-cols-2 sm:divide-y-0 sm:gap-x-8">
                      {field('Tahun Ajar', periode.tahunAjar)}
                      {field('Putaran Ke', periode.putaran)}
                      {field('Semester', periode.semester)}
                      {field('Status Periode', periode.status)}
                    </div>

                    <div className="border-t border-[#EDF1F7] py-4">
                      <div className="flex items-start gap-2.5">
                        <MapPin
                          size={17}
                          className="mt-0.5 shrink-0 text-[#3569F6]"
                        />

                        <div className="min-w-0">
                          <p className={labelClass}>Lokasi Pelaksanaan</p>
                          <p className="mt-1 text-xs font-semibold leading-5 text-[#273750]">
                            {lokasi || '-'}
                          </p>

                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {[
                              periode.kabupaten,
                              periode.kecamatan,
                              periode.desa,
                            ]
                              .filter(Boolean)
                              .map((place) => (
                                <span
                                  key={place}
                                  className="rounded-md bg-[#EEF4FF] px-2.5 py-1 text-[10px] font-medium text-[#45628F]"
                                >
                                  {place}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  {judulBagian(
                    'Jadwal',
                    'Rentang waktu setiap tahapan pelaksanaan',
                  )}

                  <div className="overflow-hidden rounded-xl border border-[#E2EAF6]">
                    <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3 bg-[#F5F8FE] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-[#71819B]">
                      <span>Tahapan</span>
                      <span className="text-right">Rentang Waktu</span>
                    </div>

                    {jadwal.map(([label, value], index) => (
                      <div
                        key={label}
                        className={`grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-3 px-4 py-3 ${
                          index !== jadwal.length - 1
                            ? 'border-b border-[#EDF1F7]'
                            : ''
                        } ${
                          label === 'Pelaksanaan KKN'
                            ? 'bg-[#F4F8FF]'
                            : 'bg-white'
                        }`}
                      >
                        <span
                          className={`text-[11px] ${
                            label === 'Pelaksanaan KKN'
                              ? 'font-semibold text-[#245BD6]'
                              : 'text-[#52627A]'
                          }`}
                        >
                          {label}
                        </span>

                        <span
                          className={`text-right text-[11px] ${
                            label === 'Pelaksanaan KKN'
                              ? 'font-semibold text-[#245BD6]'
                              : 'font-medium text-[#52627A]'
                          }`}
                        >
                          {label === 'Pelaksanaan KKN'
                            ? String(value ?? '-')
                            : tanggal(
                                typeof value === 'string' ? value : undefined,
                              )}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  {judulBagian(
                    'Jadwal Kegiatan Lapangan',
                    'Agenda monitoring dan kegiatan di lokasi KKN',
                  )}

                  {detail.agenda && detail.agenda.length > 0 ? (
                    <div className="space-y-3">
                      {detail.agenda.map((agenda, index) => (
                        <article
                          key={agenda.id ?? `${agenda.nama}-${index}`}
                          className="rounded-xl border border-[#E2EAF6] bg-white p-4 transition hover:border-[#B8CCFF]"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                              <CalendarDays size={16} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <h4 className="text-xs font-semibold leading-5 text-[#273750]">
                                  {agenda.nama || 'Kegiatan tanpa nama'}
                                </h4>

                                <span className="shrink-0 rounded-md bg-[#F3F7FF] px-2 py-1 text-[10px] font-semibold text-[#3569F6]">
                                  {tanggal(agenda.tanggal)}
                                </span>
                              </div>

                              <p className="mt-1 text-[11px] text-[#8492A8]">
                                {agenda.kodeKegiatan || 'Tanpa kode'}
                                {agenda.lamaKegiatan
                                  ? ` · ${agenda.lamaKegiatan} hari`
                                  : ''}
                              </p>

                              {agenda.nomorSuratTugas && (
                                <p className="mt-2 text-[11px] text-[#71819B]">
                                  Surat Tugas: {agenda.nomorSuratTugas}
                                </p>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-[#D7E3F5] bg-[#FBFDFF] px-4 py-7 text-center">
                      <CalendarDays size={22} className="text-[#A3B3CA]" />
                      <p className="mt-2 text-xs font-medium text-[#52627A]">
                        Belum ada jadwal kegiatan lapangan
                      </p>
                      <p className="mt-1 text-[11px] text-[#8492A8]">
                        Agenda kegiatan akan ditampilkan di bagian ini.
                      </p>
                    </div>
                  )}
                </section>

                <section>
                  {judulBagian(
                    'Persyaratan',
                    'Ketentuan jumlah peserta dan kelompok',
                  )}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#E2EAF6] bg-white p-4">
                      <div className="flex items-center gap-2 text-[#71819B]">
                        <Users size={15} />
                        <p className={labelClass}>Target Bimbingan Mahasiswa</p>
                      </div>

                      <p className="mt-2 text-lg font-bold text-[#273750]">
                        {nilai(detail.targetBimbingan)}{' '}
                        <span className="text-[11px] font-medium text-[#8492A8]">
                          mahasiswa
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E2EAF6] bg-white p-4">
                      <div className="flex items-center gap-2 text-[#71819B]">
                        <Users size={15} />
                        <p className={labelClass}>Jumlah Anggota per Desa</p>
                      </div>

                      <p className="mt-2 text-lg font-bold text-[#273750]">
                        {nilai(detail.anggotaMinimal)}–
                        {nilai(detail.anggotaMaksimal)}{' '}
                        <span className="text-[11px] font-medium text-[#8492A8]">
                          orang
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#E2EAF6] bg-[#FBFDFF] p-4 sm:col-span-2">
                      <p className="text-[11px] font-semibold text-[#52627A]">
                        Jumlah Minimal Peserta
                      </p>

                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="flex items-center justify-between rounded-lg bg-[#EEF4FF] px-3 py-3">
                          <span className="text-[11px] text-[#52627A]">
                            Laki-laki
                          </span>
                          <span className="text-sm font-bold text-[#245BD6]">
                            {nilai(detail.lakiLakiMinimal)} orang
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-[#E9F8F1] px-3 py-3">
                          <span className="text-[11px] text-[#52627A]">
                            Perempuan
                          </span>
                          <span className="text-sm font-bold text-[#16805D]">
                            {nilai(detail.perempuanMinimal)} orang
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="min-w-0 space-y-6 lg:border-l lg:border-[#E8EEF7] lg:pl-7">
                <section>
                  {judulBagian(
                    'Informasi Pejabat',
                    'Pejabat penanggung jawab periode',
                  )}

                  <div className="overflow-hidden rounded-xl border border-[#E2EAF6]">
                    {pejabat.map(([title, name, nip], index) => (
                      <div
                        key={title}
                        className={`flex gap-3 p-4 ${
                          index !== pejabat.length - 1
                            ? 'border-b border-[#EDF1F7]'
                            : ''
                        }`}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5FB] text-[#71819B]">
                          <UserRound size={15} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8492A8]">
                            {title}
                          </p>

                          <p className="mt-1.5 break-words text-xs font-semibold leading-5 text-[#273750]">
                            {nilai(name)}
                          </p>

                          <p className="mt-1 break-words text-[10px] text-[#8492A8]">
                            NIP/NIDN: {nilai(nip)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  {judulBagian(
                    'Status Periode',
                    'Status tahapan dan informasi penyimpanan',
                  )}

                  <div className="overflow-hidden rounded-xl border border-[#E2EAF6]">
                    {statusTahapan.map(([label, value], index) => (
                      <div
                        key={label}
                        className={`flex items-start justify-between gap-3 px-4 py-3 ${
                          index !== statusTahapan.length - 1
                            ? 'border-b border-[#EDF1F7]'
                            : ''
                        }`}
                      >
                        <span className="text-[11px] text-[#71819B]">
                          {label}
                        </span>

                        <span
                          className={`max-w-[62%] break-words text-right text-[11px] font-semibold ${
                            label === 'Status Periode'
                              ? periode.status === 'Aktif'
                                ? 'text-[#16805D]'
                                : 'text-[#D64545]'
                              : 'text-[#52627A]'
                          }`}
                        >
                          {nilai(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  {judulBagian('Ringkasan Lokasi', 'Wilayah pelaksanaan KKN')}

                  <div className="rounded-xl border border-[#E2EAF6] bg-[#FBFDFF] p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <MapPin size={16} className="text-[#3569F6]" />
                      <p className="text-xs font-semibold text-[#273750]">
                        Lokasi KKN
                      </p>
                    </div>

                    {(
                      [
                        ['Kabupaten/Kota', periode.kabupaten],
                        ['Kecamatan', periode.kecamatan],
                        ['Desa', periode.desa],
                      ] as [string, unknown][]
                    ).map(([label, value], index) => (
                      <div
                        key={label}
                        className={`flex items-start justify-between gap-3 py-2 ${
                          index !== 2 ? 'border-b border-[#E8EEF7]' : ''
                        }`}
                      >
                        <span className="text-[11px] text-[#8492A8]">
                          {label}
                        </span>

                        <span className="max-w-[60%] break-words text-right text-[11px] font-semibold text-[#52627A]">
                          {nilai(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        ) : tabAktif === 'Daftar Desa' ? (
          <div className="p-4 sm:p-6">
            {/* Card pencarian dan aksi mengikuti halaman Pengumuman Magang */}
            <section className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
              <div className="mb-4">
                <h2 className="text-[13px] font-bold text-[#172943]">
                  Daftar Desa
                </h2>
                <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
                  Daftar desa yang termasuk dalam periode KKN ini.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full min-w-0 sm:max-w-[520px] sm:flex-1">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8EA3C0]"
                  />
                  <input
                    type="search"
                    value={cariDesa}
                    onChange={(event) => setCariDesa(event.target.value)}
                    placeholder="Cari nama desa, kecamatan, atau kabupaten..."
                    aria-label="Cari desa"
                    className="h-10 w-full rounded-md border border-[#B8CCFF] bg-[#E7F0FC] pl-9 pr-3 text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10"
                  />
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={bukaModalDesa}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3.5 text-[11px] font-semibold text-white transition hover:bg-[#245BD6]"
                  >
                    <Plus size={15} />
                    Tambah Desa
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNotice('Pilih berkas pemetaan prodi untuk diimpor.')
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#B8CCFF] bg-white px-3.5 text-[11px] font-semibold text-[#245BD6] transition hover:bg-[#EEF4FF]"
                  >
                    <Download size={15} />
                    Import Pemetaan Prodi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCariDesa('');
                      setDesaDihapus([]);
                      setNotice('Daftar desa berhasil dimuat ulang.');
                    }}
                    title="Muat ulang daftar desa"
                    aria-label="Muat ulang daftar desa"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                      {[
                        'DESA',
                        'PEMBIMBING',
                        'PENGUJI',
                        'KOORDINATOR DESA',
                        'STATUS',
                        'AKSI',
                      ].map((label) => (
                        <th
                          key={label}
                          className="px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {daftarDesa
                      .filter((desa) => {
                        if (desaDihapus.includes(desa.id)) return false;
                        const kataKunci = cariDesa.trim().toLowerCase();
                        return (
                          !kataKunci ||
                          [
                            desa.nama,
                            desa.namaDesa,
                            desa.kecamatan,
                            desa.kabupaten,
                          ].some((item) =>
                            String(item ?? '')
                              .toLowerCase()
                              .includes(kataKunci),
                          )
                        );
                      })
                      .map((desa) => (
                        <tr
                          key={desa.id}
                          className="border-b border-[#EDF1F7] last:border-b-0 transition hover:bg-[#F8FAFF]"
                        >
                          <td className="px-4 py-4">
                            <p className="text-[11px] font-medium text-[#273750]">
                              {desa.nama ?? desa.namaDesa ?? '-'}
                            </p>
                            <p className="mt-1 text-[10px] text-[#8492A8]">
                              {[desa.kecamatan, desa.kabupaten]
                                .filter(Boolean)
                                .join(', ') || '—'}
                            </p>
                          </td>
                          <td className="px-4 py-4 text-[11px] text-[#52627A]">
                            {nilai(desa.pembimbing ?? desa.dosenPembimbing)}
                          </td>
                          <td className="px-4 py-4 text-[11px] text-[#52627A]">
                            {nilai(
                              desa.penguji ??
                                [desa.penguji1, desa.penguji2]
                                  .filter(Boolean)
                                  .join(', '),
                            )}
                          </td>
                          <td className="px-4 py-4 text-[11px] text-[#52627A]">
                            {nilai(desa.koordinator ?? desa.koordinatorDesa)}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded px-2 py-1 text-[9px] font-semibold ${desa.status === 'Aktif Ditugaskan' || desa.status === 'Aktif' ? 'bg-[#E8F7EF] text-[#16805D]' : 'bg-[#FFF4E5] text-[#A85D00]'}`}
                            >
                              {desa.status ?? 'Belum Ditugaskan'}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                title="Lihat desa"
                                aria-label={`Lihat ${desa.nama ?? 'desa'}`}
                                onClick={() =>
                                  navigate(
                                    `/admin/kkn/periode/${periode.id}/desa/${desa.id}`,
                                  )
                                }
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#245BD6] transition hover:bg-[#EEF4FF]"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                type="button"
                                title="Hapus desa"
                                aria-label={`Hapus ${desa.nama ?? 'desa'}`}
                                onClick={() =>
                                  hapusDesa(desa.id, desa.nama ?? 'Desa')
                                }
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#FFCACA] bg-white text-[#D64545] transition hover:bg-[#FFF3F3]"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {daftarDesa.filter((desa) => {
                      if (desaDihapus.includes(desa.id)) return false;
                      const kataKunci = cariDesa.trim().toLowerCase();
                      return (
                        !kataKunci ||
                        [
                          desa.nama,
                          desa.namaDesa,
                          desa.kecamatan,
                          desa.kabupaten,
                        ].some((item) =>
                          String(item ?? '')
                            .toLowerCase()
                            .includes(kataKunci),
                        )
                      );
                    }).length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                        >
                          {cariDesa.trim()
                            ? 'Tidak ada data desa yang sesuai dengan pencarian.'
                            : 'Belum ada data desa.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t border-[#EDF1F7] px-5 py-3">
                <p className="text-[10px] text-[#8A99B0]">
                  Menampilkan{' '}
                  {
                    daftarDesa.filter((desa) => {
                      if (desaDihapus.includes(desa.id)) return false;
                      const kataKunci = cariDesa.trim().toLowerCase();
                      return (
                        !kataKunci ||
                        [
                          desa.nama,
                          desa.namaDesa,
                          desa.kecamatan,
                          desa.kabupaten,
                        ].some((item) =>
                          String(item ?? '')
                            .toLowerCase()
                            .includes(kataKunci),
                        )
                      );
                    }).length
                  }{' '}
                  dari{' '}
                  {
                    daftarDesa.filter((desa) => !desaDihapus.includes(desa.id))
                      .length
                  }{' '}
                  desa
                </p>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center sm:p-12">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3569F6]">
              {(() => {
                const ActiveIcon =
                  tabs.find((tab) => tab.label === tabAktif)?.icon ??
                  MoreHorizontal;
                return <ActiveIcon size={21} />;
              })()}
            </div>

            <h2 className="text-sm font-bold text-[#172943]">{tabAktif}</h2>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#71819B]">
              Bagian ini disiapkan sebagai navigasi detail periode. Data{' '}
              {tabAktif.toLowerCase()} belum tersedia pada data periode yang
              tersimpan.
            </p>

            <button
              type="button"
              onClick={() => setTabAktif('Informasi Dasar')}
              className="mt-4 rounded-lg border border-[#B8CCFF] px-3.5 py-2 text-xs font-semibold text-[#245BD6] transition hover:bg-blue-50"
            >
              Kembali ke Informasi Dasar
            </button>
          </div>
        )}
      </section>

      {modalDesa && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-[#1B2738]/55 p-3 sm:p-5">
          <form
            onSubmit={simpanDesa}
            className="my-auto max-h-[94vh] w-full max-w-[850px] overflow-y-auto rounded-xl bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h2 className="text-sm font-bold text-[#172943]">
                  {editDesaId === null ? 'Tambah Desa KKN' : 'Ubah Data Desa'}
                </h2>
                <p className="mt-1 text-[11px] text-[#71819B]">
                  Isi informasi desa, pembimbing, penguji, dan koordinator.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalDesa(false)}
                className="rounded-md px-2 py-1 text-[#71819B] hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              {(
                [
                  ['Nama Desa', 'nama'],
                  ['Kecamatan', 'kecamatan'],
                  ['Kabupaten', 'kabupaten'],
                  ['Alamat', 'alamat'],
                  ['Kepala Desa', 'kepalaDesa'],
                  ['Telepon', 'telepon'],
                  ['Klaster', 'klaster'],
                  ['Dosen Pembimbing Lapangan', 'pembimbing'],
                  ['NIP DPL', 'nipPembimbing'],
                  ['Fakultas DPL', 'fakultasPembimbing'],
                  ['Penguji 1', 'penguji1'],
                  ['NIP Penguji 1', 'nipPenguji1'],
                  ['Penguji 2', 'penguji2'],
                  ['NIP Penguji 2', 'nipPenguji2'],
                  ['Koordinator Desa', 'koordinatorDesa'],
                  ['Jumlah Peserta', 'peserta'],
                  ['Jumlah Artikel Blog', 'jumlahBlog'],
                ] as const
              ).map(([label, key]) => (
                <label
                  key={key}
                  className="block text-[10px] font-semibold text-[#43536B]"
                >
                  {label}
                  {key === 'nama' && <span className="text-red-500"> *</span>}
                  <input
                    required={key === 'nama'}
                    type={
                      key === 'peserta' || key === 'jumlahBlog'
                        ? 'number'
                        : 'text'
                    }
                    min={
                      key === 'peserta' || key === 'jumlahBlog' ? 0 : undefined
                    }
                    value={formDesa[key]}
                    onChange={(event) =>
                      setFormDesa((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    placeholder={`Masukkan ${label.toLowerCase()}`}
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] px-3 text-[11px] outline-none focus:border-[#3569F6]"
                  />
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 border-t border-[#E8EEF7] px-5 py-4">
              <button
                type="button"
                onClick={() => setModalDesa(false)}
                className="h-9 rounded-md border border-[#D7E0EC] px-4 text-[11px] font-semibold text-[#52627A]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="h-9 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white hover:bg-[#245BD6]"
              >
                {editDesaId === null ? 'Simpan Desa' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {editStatus && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#1B2738]/55 p-3 backdrop-blur-[1px] sm:p-5">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="ubah-status-title"
            className="my-auto flex max-h-[94vh] w-full max-w-[520px] flex-col overflow-hidden rounded-lg border border-[#DCE5F1] bg-white shadow-2xl"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-[#E8EEF7] px-5 py-4">
              <h2
                id="ubah-status-title"
                className="text-sm font-bold text-[#273750]"
              >
                Ubah Status Periode
              </h2>

              <button
                type="button"
                onClick={() => setEditStatus(false)}
                aria-label="Tutup modal"
                className="rounded-md p-1 text-[#9AA7B8] transition hover:bg-slate-100 hover:text-[#52627A]"
              >
                <X size={17} />
              </button>
            </header>

            <div className="min-h-0 space-y-4 overflow-y-auto px-5 py-4">
              <div className="rounded border border-[#B8CCFF] bg-[#EEF4FF] p-3.5 text-[#245BD6]">
                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <Info size={15} />
                  <span>Info Status!</span>
                </div>

                <ul className="mt-2 list-disc space-y-1 pl-7 text-[10px] leading-[1.55] text-[#45628F]">
                  <li>
                    Status Periode digunakan sebagai penanda bahwa periode ini
                    sedang diaktifkan.
                  </li>
                  <li>
                    Status Pendaftaran memberikan akses pendaftaran mahasiswa.
                  </li>
                  <li>
                    Status Kelompok diaktifkan ketika proses kelompok siap
                    dipublish.
                  </li>
                  <li>
                    Status Pelaksanaan memberikan akses posting blog & jurnal
                    kegiatan.
                  </li>
                  <li>
                    Status Upload Laporan membuka akses unggah laporan akhir
                    KKN.
                  </li>
                </ul>
              </div>

              <section>
                <h3 className="mb-2.5 text-[10px] font-bold uppercase tracking-wide text-[#7B8798]">
                  Pengaturan Parameter Status
                </h3>

                <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2">
                  {[statusKolomKiri, statusKolomKanan].map(
                    (kolom, kolomIndex) => (
                      <div key={kolomIndex} className="space-y-2">
                        {kolom.map((label) => (
                          <label
                            key={label}
                            className="flex min-h-[31px] cursor-pointer items-center justify-between gap-2 rounded border border-[#E2E7EF] bg-[#FAFBFD] px-2.5 py-1.5 transition hover:border-[#B8CCFF] hover:bg-[#F5F8FF]"
                          >
                            <span className="text-[10px] font-medium leading-4 text-[#39475B]">
                              {label}
                            </span>

                            <span className="relative inline-flex h-[16px] w-[29px] shrink-0 items-center">
                              <input
                                type="checkbox"
                                checked={Boolean(statusParameter[label])}
                                onChange={(event) =>
                                  setStatusParameter((current) => ({
                                    ...current,
                                    [label]: event.target.checked,
                                  }))
                                }
                                aria-label={label}
                                className="peer sr-only"
                              />
                              <span className="absolute inset-0 rounded-full bg-[#DDE4ED] transition-colors peer-checked:bg-[#2864F0] peer-focus-visible:ring-2 peer-focus-visible:ring-[#93B4FF] peer-focus-visible:ring-offset-1" />
                              <span className="absolute left-[2px] h-3 w-3 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-[13px]" />
                            </span>
                          </label>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#7B8798]">
                  Hasil Validasi Status
                </h3>

                {hasilValidasi.length > 0 ? (
                  <div className="rounded border border-[#FFCACA] bg-[#FFF3F3] px-3 py-2.5">
                    {hasilValidasi.map((item, index) => (
                      <div key={`${item.judul}-${index}`}>
                        {index > 0 && (
                          <div className="my-2 border-t border-[#FFD9D9]" />
                        )}

                        <div className="flex items-start gap-2.5">
                          <span className="mt-0.5 text-[#F59E0B]">
                            <AlertTriangle size={14} />
                          </span>

                          <div>
                            <p className="text-[11px] font-semibold text-[#E33B3B]">
                              {item.judul}
                            </p>
                            <p className="mt-0.5 text-[10px] leading-4 text-[#E34B4B]">
                              {item.pesan}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded border border-[#A7E8C8] bg-[#F0FDF4] px-3 py-3">
                    <div className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-[#16805D]"
                      />

                      <div>
                        <p className="text-[11px] font-semibold text-[#16805D]">
                          Tidak ada validasi yang terdeteksi
                        </p>
                        <p className="mt-0.5 text-[10px] leading-4 text-[#287653]">
                          Persyaratan yang dapat diperiksa dari data periode
                          sudah terpenuhi atau status terkait sedang nonaktif.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>

            <footer className="flex shrink-0 justify-end gap-2 border-t border-[#E8EEF7] bg-white px-5 py-3">
              <button
                type="button"
                onClick={() => setEditStatus(false)}
                className="h-9 rounded-md border border-[#D7E0EC] bg-white px-4 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#F7F9FC]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={simpanStatus}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-[#2864F0] px-4 text-[11px] font-semibold text-white transition hover:bg-[#1E50C7]"
              >
                <Check size={14} />
                Simpan Perubahan
              </button>
            </footer>
          </section>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[100] rounded-lg border border-emerald-200 bg-white px-4 py-3 text-xs text-[#273750] shadow-lg"
        >
          {notice}
        </div>
      )}
    </div>
  );
}
