import { useNavigate } from 'react-router-dom';
import type { ElementType } from 'react';
import {
  Users,
  School,
  UserRoundCheck,
  GraduationCap,
  ArrowRight,
  AlertCircle,
  ClipboardCheck,
  MapPin,
  History,
  Clock3,
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

type MahasiswaAM = {
  id: number;
  nama: string;
  nim: string;
  sekolah: string;
  guruPamong: string;
  dosenPembimbing: string;
  status: string;
};

type SekolahMitra = {
  id: number;
  nama: string;
  kecamatan: string;
  status: string;
};

type AktivitasAM = {
  id: number;
  judul: string;
  deskripsi: string;
  pengguna: string;
  waktu: string;
};

// DATA DUMMY MAHASISWA
const mahasiswaAM: MahasiswaAM[] = [
  {
    id: 1,
    nama: 'Amelia Rizky Yuniar',
    nim: '2115101024',
    sekolah: 'SMA Negeri 1 Singaraja',
    guruPamong: 'I Made Sujana, S.Pd.',
    dosenPembimbing: 'Ni Luh Putu, M.Pd.',
    status: 'Berlangsung',
  },
  {
    id: 2,
    nama: 'Gede Arya Wicaksana',
    nim: '2115101035',
    sekolah: 'SMA Negeri 1 Singaraja',
    guruPamong: 'I Made Sujana, S.Pd.',
    dosenPembimbing: 'Ni Luh Putu, M.Pd.',
    status: 'Berlangsung',
  },
  {
    id: 3,
    nama: 'Kadek Dwi Pradnyana',
    nim: '2115101012',
    sekolah: '',
    guruPamong: '',
    dosenPembimbing: '',
    status: 'Menunggu Penempatan',
  },
  {
    id: 4,
    nama: 'Ni Putu Ayu Maharani',
    nim: '2115051044',
    sekolah: 'SMA Negeri 2 Singaraja',
    guruPamong: '',
    dosenPembimbing: 'I Made Arya, M.Pd.',
    status: 'Menunggu Guru Pamong',
  },
  {
    id: 5,
    nama: 'I Wayan Sudarma Putra',
    nim: '2115091018',
    sekolah: 'SMK Negeri 1 Sukasada',
    guruPamong: 'I Ketut Suardika, S.Pd.',
    dosenPembimbing: 'Ni Luh Putu, M.Pd.',
    status: 'Berlangsung',
  },
  {
    id: 6,
    nama: 'Made Devi Lestari',
    nim: '2115011005',
    sekolah: '',
    guruPamong: '',
    dosenPembimbing: '',
    status: 'Menunggu Penempatan',
  },
  {
    id: 7,
    nama: 'Ketut Bagus Dananjaya',
    nim: '2115101088',
    sekolah: 'SMA Negeri 2 Singaraja',
    guruPamong: 'I Made Sujana, S.Pd.',
    dosenPembimbing: '',
    status: 'Berlangsung',
  },
  {
    id: 8,
    nama: 'Luh Putu Dian Anggraeni',
    nim: '2115041029',
    sekolah: 'SMK Negeri 1 Sukasada',
    guruPamong: 'I Ketut Suardika, S.Pd.',
    dosenPembimbing: 'I Made Arya, M.Pd.',
    status: 'Berlangsung',
  },
];

// DATA DUMMY SEKOLAH MITRA
const sekolahMitra: SekolahMitra[] = [
  {
    id: 1,
    nama: 'SMA Negeri 1 Singaraja',
    kecamatan: 'Buleleng',
    status: 'Aktif',
  },
  {
    id: 2,
    nama: 'SMA Negeri 2 Singaraja',
    kecamatan: 'Buleleng',
    status: 'Aktif',
  },
  {
    id: 3,
    nama: 'SMK Negeri 1 Sukasada',
    kecamatan: 'Sukasada',
    status: 'Aktif',
  },
  {
    id: 4,
    nama: 'SMP Negeri 1 Banjar',
    kecamatan: 'Banjar',
    status: 'Nonaktif',
  },
  {
    id: 5,
    nama: 'SMA Negeri 1 Seririt',
    kecamatan: 'Seririt',
    status: 'Aktif',
  },
];

// DATA DUMMY GURU PAMONG
const guruPamong = [
  { id: 1, nama: 'I Made Sujana, S.Pd.' },
  { id: 2, nama: 'I Ketut Suardika, S.Pd.' },
  { id: 3, nama: 'Ni Made Sriani, S.Pd.' },
  { id: 4, nama: 'I Wayan Sudarma, S.Pd.' },
];

// DATA DUMMY DOSEN PEMBIMBING
const dosenPembimbing = [
  { id: 1, nama: 'Ni Luh Putu, M.Pd.' },
  { id: 2, nama: 'I Made Arya, M.Pd.' },
  { id: 3, nama: 'I Wayan Sujana, M.Pd.' },
];

// DATA DUMMY AKTIVITAS
const aktivitasAM: AktivitasAM[] = [
  {
    id: 1,
    judul: 'Penempatan mahasiswa Asistensi Mengajar',
    deskripsi: 'Mahasiswa berhasil ditempatkan di SMA Negeri 1 Singaraja.',
    pengguna: 'Admin AM',
    waktu: '2026-11-02T08:00:00',
  },
  {
    id: 2,
    judul: 'Pembaruan data sekolah mitra',
    deskripsi:
      'Informasi sekolah mitra SMA Negeri 2 Singaraja berhasil diperbarui.',
    pengguna: 'Admin AM',
    waktu: '2026-11-01T14:30:00',
  },
  {
    id: 3,
    judul: 'Penetapan guru pamong',
    deskripsi:
      'Guru pamong berhasil ditetapkan untuk mahasiswa Asistensi Mengajar.',
    pengguna: 'Admin AM',
    waktu: '2026-11-01T10:15:00',
  },
  {
    id: 4,
    judul: 'Pemeriksaan dokumen mahasiswa',
    deskripsi: 'Dokumen persyaratan mahasiswa menunggu pemeriksaan admin.',
    pengguna: 'Admin AM',
    waktu: '2026-10-31T09:20:00',
  },
  {
    id: 5,
    judul: 'Pembaruan data mahasiswa',
    deskripsi: 'Data mahasiswa Asistensi Mengajar berhasil diperbarui.',
    pengguna: 'Admin AM',
    waktu: '2026-10-30T13:00:00',
  },
];

// KOMPONEN KARTU STATISTIK
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

// FORMAT TANGGAL AKTIVITAS
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

  // PERHITUNGAN STATISTIK
  const totalMahasiswa = mahasiswaAM.length;
  const totalSekolah = sekolahMitra.length;
  const totalGuruPamong = guruPamong.length;
  const totalDosen = dosenPembimbing.length;

  const sekolahAktif = sekolahMitra.filter(
    (item) => item.status === 'Aktif',
  ).length;

  const mahasiswaBerlangsung = mahasiswaAM.filter(
    (item) => item.status === 'Berlangsung',
  ).length;

  const belumMemilikiSekolah = mahasiswaAM.filter(
    (item) => !item.sekolah.trim(),
  ).length;

  const belumMemilikiGuruPamong = mahasiswaAM.filter(
    (item) => !item.guruPamong.trim(),
  ).length;

  const mahasiswaSudahDitempatkan = mahasiswaAM.filter(
    (item) =>
      item.sekolah.trim() !== '' &&
      item.guruPamong.trim() !== '' &&
      item.dosenPembimbing.trim() !== '',
  ).length;

  const completionRate =
    totalMahasiswa > 0
      ? Math.round((mahasiswaSudahDitempatkan / totalMahasiswa) * 100)
      : 0;

  const recentActivities = [...aktivitasAM]
    .sort((a, b) => new Date(b.waktu).getTime() - new Date(a.waktu).getTime())
    .slice(0, 5);

  const progressCardClass =
    'flex items-center gap-3 rounded-xl border border-[#B8CCFF] bg-white p-4 text-left transition hover:border-[#3569F6] hover:shadow-sm';

  return (
    <div className="min-h-full bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* HEADER */}
        <header>
          <div className="mb-2 flex items-center gap-2">
            <LayoutDashboard size={20} className="text-[#3569F6]" />

            <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943] sm:text-2xl">
              Dashboard Admin Asistensi Mengajar
            </h1>
          </div>

          <p className="max-w-2xl text-xs leading-5 text-[#71819B] sm:text-[13px]">
            Pantau data mahasiswa, sekolah mitra, guru pamong, dan progres
            pelaksanaan program Asistensi Mengajar dalam satu halaman.
          </p>
        </header>

        {/* STATISTIK UTAMA */}
        <section>
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Mahasiswa"
              value={totalMahasiswa}
              description="Mahasiswa terdaftar"
              icon={Users}
              color="#3569F6"
              to="/admin/am/mahasiswa"
            />

            <StatCard
              title="Sekolah Mitra"
              value={totalSekolah}
              description={`${sekolahAktif} sekolah berstatus aktif`}
              icon={School}
              color="#7C3AED"
              to="/admin/am/sekolah-mitra"
            />

            <StatCard
              title="Guru Pamong"
              value={totalGuruPamong}
              description="Guru pamong terdaftar"
              icon={UserRoundCheck}
              color="#0D9488"
              to="/admin/am/guru-pamong"
            />

            <StatCard
              title="Dosen Pembimbing"
              value={totalDosen}
              description="Dosen pembimbing terdaftar"
              icon={GraduationCap}
              color="#D97706"
              to="/admin/am/dosen-pembimbing"
            />
          </div>
        </section>

        {/* PROGRES DAN TINDAK LANJUT */}
        <section>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              onClick={() => navigate('/admin/am/mahasiswa')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Users size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Belum memiliki sekolah
                </span>

                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {belumMemilikiSekolah}
                </span>
              </span>

              <AlertCircle size={16} className="shrink-0 text-amber-500" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/am/mahasiswa')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <UserRoundCheck size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Belum memiliki guru pamong
                </span>

                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {belumMemilikiGuruPamong}
                </span>
              </span>

              <AlertCircle size={16} className="shrink-0 text-violet-500" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/am/mahasiswa')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <MapPin size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Mahasiswa sedang berlangsung
                </span>

                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {mahasiswaBerlangsung}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/am/mahasiswa')}
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

        {/* RINGKASAN SEKOLAH MITRA */}
        <section className="overflow-hidden rounded-xl border border-[#B8CCFF] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E1E9F5] px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#172943]">
                Ringkasan Sekolah Mitra
              </h2>

              <p className="mt-1 text-[11px] text-[#71819B]">
                Informasi sekolah yang terdaftar dalam program Asistensi
                Mengajar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/am/sekolah-mitra')}
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
                    NAMA SEKOLAH
                  </th>

                  <th className="px-5 py-3 text-[10px] font-bold text-[#52627A]">
                    KECAMATAN
                  </th>

                  <th className="px-5 py-3 text-[10px] font-bold text-[#52627A]">
                    STATUS
                  </th>
                </tr>
              </thead>

              <tbody>
                {sekolahMitra.slice(0, 4).map((item, index) => (
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

                    <td className="px-5 py-3 text-[11px] text-[#52627A]">
                      {item.kecamatan}
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

        {/* AKTIVITAS TERBARU */}
        <section className="overflow-hidden rounded-xl border border-[#B8CCFF] bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-[#E1E9F5] px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#172943]">
                Aktivitas Terbaru
              </h2>

              <p className="mt-1 text-[11px] text-[#71819B]">
                Pantau perubahan dan aktivitas pengelolaan program Asistensi
                Mengajar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/am/log-aktivitas')}
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
                Aktivitas pengelolaan program Asistensi Mengajar akan
                ditampilkan di sini setelah tercatat dalam sistem.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
