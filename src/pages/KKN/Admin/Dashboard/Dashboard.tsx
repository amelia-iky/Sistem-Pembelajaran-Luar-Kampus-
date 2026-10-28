import { useNavigate } from 'react-router-dom';
import type { ElementType } from 'react';
import {
  Users,
  MapPin,
  UserRoundCheck,
  ClipboardCheck,
  History,
  ArrowRight,
  Clock3,
  AlertCircle,
  UsersRound,
  UserRound,
  LayoutDashboard,
  FileText,
} from 'lucide-react';

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: ElementType;
  color: string;
  to: string;
};

type MahasiswaKKN = {
  id: number;
  nama: string;
  nim: string;
  kelompok: string;
  lokasi: string;
  pembimbing: string;
  status: string;
};

type LokasiKKN = {
  id: number;
  nama: string;
  status: string;
};

type DosenKKN = {
  id: number;
  nama: string;
};

type AktivitasKKN = {
  id: number;
  judul: string;
  deskripsi: string;
  pengguna: string;
  waktu: string;
};

const mahasiswaKKN: MahasiswaKKN[] = [
  {
    id: 1,
    nama: 'Amelia Rizky Yuniar',
    nim: '2115101024',
    kelompok: 'KKN-01',
    lokasi: 'Desa Sambangan',
    pembimbing: 'I Made Arya, S.Kom., M.T.',
    status: 'Berlangsung',
  },
  {
    id: 2,
    nama: 'Gede Arya Wicaksana',
    nim: '2115101035',
    kelompok: 'KKN-01',
    lokasi: 'Desa Sambangan',
    pembimbing: 'I Made Arya, S.Kom., M.T.',
    status: 'Berlangsung',
  },
  {
    id: 3,
    nama: 'Kadek Dwi Pradnyana',
    nim: '2115101012',
    kelompok: '',
    lokasi: '',
    pembimbing: '',
    status: 'Menunggu Penempatan',
  },
  {
    id: 4,
    nama: 'Ni Putu Ayu Maharani',
    nim: '2115051044',
    kelompok: 'KKN-02',
    lokasi: 'Desa Panji',
    pembimbing: '',
    status: 'Berlangsung',
  },
  {
    id: 5,
    nama: 'I Wayan Sudarma Putra',
    nim: '2115091018',
    kelompok: 'KKN-03',
    lokasi: 'Desa Baktiseraga',
    pembimbing: 'Ni Luh Putu, S.Si., M.Si.',
    status: 'Berlangsung',
  },
  {
    id: 6,
    nama: 'Made Devi Lestari',
    nim: '2115011005',
    kelompok: '',
    lokasi: '',
    pembimbing: '',
    status: 'Menunggu Penempatan',
  },
  {
    id: 7,
    nama: 'Ketut Bagus Dananjaya',
    nim: '2115101088',
    kelompok: 'KKN-02',
    lokasi: 'Desa Panji',
    pembimbing: 'I Made Arya, S.Kom., M.T.',
    status: 'Berlangsung',
  },
  {
    id: 8,
    nama: 'Luh Putu Dian Anggraeni',
    nim: '2115041029',
    kelompok: 'KKN-04',
    lokasi: 'Desa Penglatan',
    pembimbing: 'Ni Luh Putu, S.Si., M.Si.',
    status: 'Berlangsung',
  },
];

const lokasiKKN: LokasiKKN[] = [
  { id: 1, nama: 'Desa Sambangan', status: 'Aktif' },
  { id: 2, nama: 'Desa Panji', status: 'Aktif' },
  { id: 3, nama: 'Desa Baktiseraga', status: 'Aktif' },
  { id: 4, nama: 'Desa Penglatan', status: 'Aktif' },
  { id: 5, nama: 'Desa Anturan', status: 'Nonaktif' },
];

const dosenKKN: DosenKKN[] = [
  { id: 1, nama: 'I Made Arya, S.Kom., M.T.' },
  { id: 2, nama: 'Ni Luh Putu, S.Si., M.Si.' },
  { id: 3, nama: 'I Wayan Sujana, S.Pd., M.Pd.' },
];

const aktivitasKKN: AktivitasKKN[] = [
  {
    id: 1,
    judul: 'Penempatan mahasiswa KKN',
    deskripsi: 'Mahasiswa ditempatkan pada kelompok KKN-01 di Desa Sambangan.',
    pengguna: 'Admin KKN',
    waktu: '2026-10-28T08:00:00',
  },
  {
    id: 2,
    judul: 'Pembaruan data lokasi KKN',
    deskripsi: 'Informasi lokasi KKN Desa Panji berhasil diperbarui.',
    pengguna: 'Admin KKN',
    waktu: '2026-10-27T14:30:00',
  },
  {
    id: 3,
    judul: 'Penetapan dosen pembimbing',
    deskripsi: 'Dosen pembimbing ditetapkan untuk kelompok KKN-02.',
    pengguna: 'Admin KKN',
    waktu: '2026-10-27T10:15:00',
  },
  {
    id: 4,
    judul: 'Pemeriksaan dokumen KKN',
    deskripsi: 'Dokumen administrasi mahasiswa menunggu pemeriksaan.',
    pengguna: 'Admin KKN',
    waktu: '2026-10-26T09:20:00',
  },
  {
    id: 5,
    judul: 'Pembaruan data mahasiswa',
    deskripsi: 'Data mahasiswa KKN berhasil diperbarui.',
    pengguna: 'Admin KKN',
    waktu: '2026-10-25T13:00:00',
  },
];

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  to,
}: StatCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="group min-w-0 rounded-xl border border-[#B8CCFF] bg-white p-4 text-left shadow-[0_2px_5px_rgba(31,52,80,0.03)] transition hover:-translate-y-0.5 hover:border-[#3569F6] hover:shadow-md sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium leading-5 text-[#71819B]">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#172943] sm:text-3xl">
            {value.toLocaleString('id-ID')}
          </p>
        </div>

        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${color}15`,
            color,
          }}
        >
          <Icon size={20} />
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-[11px] leading-4 text-[#71819B]">
          {description}
        </span>
        <ArrowRight
          size={15}
          className="shrink-0 text-[#91A4BF] transition group-hover:translate-x-1 group-hover:text-[#3569F6]"
        />
      </div>
    </button>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Waktu tidak tersedia';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function Dashboard() {
  const navigate = useNavigate();

  // Semua data di bawah ini merupakan dummy lokal khusus KKN.
  const totalMahasiswa = mahasiswaKKN.length;
  const totalLokasi = lokasiKKN.length;
  const totalDosen = dosenKKN.length;

  const lokasiAktif = lokasiKKN.filter(
    (item) => item.status.toLowerCase() === 'aktif',
  ).length;

  const mahasiswaBerlangsung = mahasiswaKKN.filter(
    (item) => item.status.toLowerCase() === 'berlangsung',
  ).length;

  const belumMemilikiKelompok = mahasiswaKKN.filter(
    (item) => !item.kelompok.trim(),
  ).length;

  const belumMemilikiPembimbing = mahasiswaKKN.filter(
    (item) => !item.pembimbing.trim(),
  ).length;

  const kelompokTerbentuk = new Set(
    mahasiswaKKN
      .map((item) => item.kelompok)
      .filter((kelompok) => kelompok.trim() !== ''),
  ).size;

  const mahasiswaSudahDitempatkan = mahasiswaKKN.filter(
    (item) => item.kelompok.trim() !== '' && item.lokasi.trim() !== '',
  ).length;

  const completionRate =
    totalMahasiswa > 0
      ? Math.round((mahasiswaSudahDitempatkan / totalMahasiswa) * 100)
      : 0;

  const recentActivities = [...aktivitasKKN]
    .sort((a, b) => new Date(b.waktu).getTime() - new Date(a.waktu).getTime())
    .slice(0, 5);

  const progressCardClass =
    'flex items-center gap-3 rounded-xl border border-[#B8CCFF] bg-white p-4 text-left transition hover:border-[#3569F6] hover:shadow-sm';

  return (
    <div className="min-h-full bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Header */}
        <header>
          <div className="mb-2 flex items-center gap-2">
            <LayoutDashboard size={20} className="text-[#3569F6]" />
            <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943] sm:text-2xl">
              Dashboard Admin KKN
            </h1>
          </div>

          <p className="max-w-2xl text-xs leading-5 text-[#71819B] sm:text-[13px]">
            Pantau data mahasiswa, lokasi, kelompok, dan progres pelaksanaan
            program KKN dalam satu halaman.
          </p>
        </header>

        {/* Statistik Utama */}
        <section>
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Mahasiswa"
              value={totalMahasiswa}
              description="Mahasiswa terdaftar"
              icon={Users}
              color="#3569F6"
              to="/admin/kkn/data-mahasiswa"
            />

            <StatCard
              title="Lokasi KKN"
              value={totalLokasi}
              description={`${lokasiAktif} lokasi berstatus aktif`}
              icon={MapPin}
              color="#7C3AED"
              to="/admin/kkn/lokasi-kkn"
            />

            <StatCard
              title="Kelompok KKN"
              value={kelompokTerbentuk}
              description="Kelompok sudah terbentuk"
              icon={UsersRound}
              color="#0D9488"
              to="/admin/kkn/kelompok"
            />

            <StatCard
              title="Dosen Pembimbing"
              value={totalDosen}
              description="Dosen terdaftar"
              icon={UserRoundCheck}
              color="#D97706"
              to="/admin/kkn/data-dosen"
            />
          </div>
        </section>

        {/* Progres dan Tindak Lanjut */}
        <section>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              onClick={() => navigate('/admin/kkn/data-mahasiswa')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Users size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Belum memiliki kelompok
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {belumMemilikiKelompok}
                </span>
              </span>

              <AlertCircle size={16} className="shrink-0 text-amber-500" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/kkn/data-mahasiswa')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <UserRound size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Belum memiliki pembimbing
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {belumMemilikiPembimbing}
                </span>
              </span>

              <AlertCircle size={16} className="shrink-0 text-violet-500" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/kkn/kelompok')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MapPin size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Mahasiswa ditempatkan
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {mahasiswaBerlangsung}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/kkn/kelompok')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ClipboardCheck size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Progres penempatan
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {completionRate}%
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* Ringkasan Lokasi KKN */}
        <section className="overflow-hidden rounded-xl border border-[#B8CCFF] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E1E9F5] px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#172943]">
                Ringkasan Lokasi KKN
              </h2>
              <p className="mt-1 text-[11px] text-[#71819B]">
                Informasi lokasi yang terdaftar dalam program KKN.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/kkn/lokasi-kkn')}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold text-[#3569F6] transition hover:bg-[#EEF4FF]"
            >
              Lihat semua
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E1E9F5] bg-[#EEF4FF]">
                  <th className="px-5 py-3 text-[10px] font-bold text-[#52627A]">
                    NO.
                  </th>
                  <th className="px-5 py-3 text-[10px] font-bold text-[#52627A]">
                    NAMA LOKASI
                  </th>
                  <th className="px-5 py-3 text-[10px] font-bold text-[#52627A]">
                    STATUS
                  </th>
                </tr>
              </thead>

              <tbody>
                {lokasiKKN.slice(0, 4).map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                  >
                    <td className="px-5 py-3 text-[11px] text-[#52627A]">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 text-[11px] font-medium text-[#273750]">
                      {item.nama}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                          item.status === 'Aktif'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Aktivitas Terbaru */}
        <section className="overflow-hidden rounded-xl border border-[#B8CCFF] bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-[#E1E9F5] px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#172943]">
                Aktivitas Terbaru
              </h2>
              <p className="mt-1 text-[11px] text-[#71819B]">
                Pantau perubahan dan aktivitas pengelolaan program KKN.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/kkn/log-aktivitas')}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold text-[#3569F6] transition hover:bg-[#EEF4FF]"
            >
              Lihat semua
              <ArrowRight size={14} />
            </button>
          </div>

          {recentActivities.length > 0 ? (
            <div className="divide-y divide-[#EDF1F7]">
              {recentActivities.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 px-5 py-4 transition hover:bg-[#FAFBFE]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3569F6]">
                    <History size={18} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-xs font-semibold text-[#273750]">
                      {item.judul}
                    </p>

                    <p className="mt-1 break-words text-[11px] leading-5 text-[#71819B]">
                      {item.deskripsi}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#91A4BF]">
                        <UserRound size={12} />
                        {item.pengguna}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[10px] text-[#91A4BF]">
                        <Clock3 size={12} />
                        {formatDate(item.waktu)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F6FC] text-[#91A4BF]">
                <FileText size={26} />
              </span>

              <p className="mt-4 text-sm font-semibold text-[#34445E]">
                Belum ada aktivitas
              </p>

              <p className="mt-1 max-w-sm text-xs leading-5 text-[#91A4BF]">
                Aktivitas pengelolaan program KKN akan ditampilkan di sini
                setelah tercatat dalam sistem.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
