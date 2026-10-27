import { useNavigate } from 'react-router-dom';
import type { ElementType } from 'react';
import {
  Users,
  Building2,
  UserRoundCheck,
  ClipboardCheck,
  History,
  ArrowRight,
  Clock3,
  AlertCircle,
  BriefcaseBusiness,
  UserRound,
  LayoutDashboard,
} from 'lucide-react';

import { useAdminMagangData } from '../../../../data/adminMagangStore';

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: ElementType;
  color: string;
  to: string;
};

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
  const data = useAdminMagangData();

  const totalMahasiswa = data.mahasiswa.length;
  const totalTempat = data.tempatMagang.length;
  const totalMentor = data.dosen.length;

  const tempatAktif = data.tempatMagang.filter(
    (item) => item.status.toLowerCase() === 'aktif',
  ).length;

  const mahasiswaBerlangsung = data.mahasiswa.filter(
    (item) => item.status?.toLowerCase() === 'berlangsung',
  ).length;

  const belumMemilikiTempat = data.mahasiswa.filter(
    (item) => !item.tempatMagang?.trim(),
  ).length;

  const belumMemilikiMentor = data.mahasiswa.filter(
    (item) => !item.pembimbing?.trim(),
  ).length;

  const penilaianSelesai = data.penilaian.filter(
    (item) => item.status.toLowerCase() === 'selesai',
  ).length;

  const penilaianBelumSelesai = data.penilaian.filter(
    (item) => item.status.toLowerCase() !== 'selesai',
  ).length;

  const completionRate =
    data.penilaian.length > 0
      ? Math.round((penilaianSelesai / data.penilaian.length) * 100)
      : 0;

  const recentActivities = [...data.aktivitas]
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
              Dashboard Admin Magang
            </h1>
          </div>

          <p className="max-w-2xl text-xs leading-5 text-[#71819B] sm:text-[13px]">
            Pantau data, progres pelaksanaan, dan aktivitas pengelolaan program
            magang dalam satu halaman.
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
              to="/admin/magang/data-mahasiswa"
            />

            <StatCard
              title="Tempat Magang"
              value={totalTempat}
              description={`${tempatAktif} tempat berstatus aktif`}
              icon={Building2}
              color="#7C3AED"
              to="/admin/magang/tempat-magang"
            />

            <StatCard
              title="Total Mentor"
              value={totalMentor}
              description="Mentor terdaftar"
              icon={UserRoundCheck}
              color="#0D9488"
              to="/admin/magang/data-dosen"
            />

            <StatCard
              title="Penilaian Selesai"
              value={penilaianSelesai}
              description={`${penilaianBelumSelesai} penilaian belum selesai`}
              icon={ClipboardCheck}
              color="#D97706"
              to="/admin/magang/penilaian"
            />
          </div>
        </section>

        {/* Progres dan Tindak Lanjut */}
        <section>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              onClick={() => navigate('/admin/magang/data-mahasiswa')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Building2 size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Belum punya tempat magang
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {belumMemilikiTempat}
                </span>
              </span>

              <AlertCircle size={16} className="shrink-0 text-amber-500" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/magang/data-mahasiswa')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <UserRound size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Belum punya mentor
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {belumMemilikiMentor}
                </span>
              </span>

              <AlertCircle size={16} className="shrink-0 text-violet-500" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/magang/manajemen')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Sedang melaksanakan magang
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {mahasiswaBerlangsung}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/magang/penilaian')}
              className={progressCardClass}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ClipboardCheck size={19} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] leading-5 text-[#71819B]">
                  Progres penilaian
                </span>
                <span className="mt-1 block text-xl font-bold text-[#172943]">
                  {completionRate}%
                </span>
              </span>
            </button>
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
                Pantau perubahan dan aktivitas pengelolaan program magang.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/magang/log-aktivitas')}
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
                <History size={26} />
              </span>

              <p className="mt-4 text-sm font-semibold text-[#34445E]">
                Belum ada aktivitas
              </p>

              <p className="mt-1 max-w-sm text-xs leading-5 text-[#91A4BF]">
                Aktivitas pengelolaan program magang akan ditampilkan di sini
                setelah tercatat dalam sistem.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
