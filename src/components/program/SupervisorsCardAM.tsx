import { Users, Mail, Building2, GraduationCap, School } from 'lucide-react';

export default function SupervisorsCardAM() {
  const supervisors = [
    {
      id: 'dosen-pembimbing-1',
      role: 'DOSEN PEMBIMBING 1',
      roleBadgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBadge: GraduationCap,
      name: 'Dr. I Gede Made Karma, M.Kom.',
      identifier: 'Dosen Pembimbing 1',
      footerIcon: Mail,
      footerText: 'made.karma@undiksha.ac.id',
    },
    {
      id: 'dosen-pembimbing-2',
      role: 'DOSEN PEMBIMBING 2',
      roleBadgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBadge: GraduationCap,
      name: 'Nama Dosen Pembimbing 2',
      identifier: 'Dosen Pembimbing 2',
      footerIcon: Mail,
      footerText: 'Email dosen belum tersedia',
    },
    {
      id: 'dosen-pembimbing-3',
      role: 'DOSEN PEMBIMBING 3',
      roleBadgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBadge: GraduationCap,
      name: 'Nama Dosen Pembimbing 3',
      identifier: 'Dosen Pembimbing 3',
      footerIcon: Mail,
      footerText: 'Email dosen belum tersedia',
    },
    {
      id: 'guru-pamong',
      role: 'GURU PAMONG',
      roleBadgeClass: 'bg-amber-50 text-amber-700 border-amber-200/70',
      iconBadge: School,
      name: 'Nama Guru Pamong',
      identifier: 'Guru Pamong di Sekolah Mitra',
      footerIcon: Building2,
      footerText: 'Sekolah mitra',
    },
    {
      id: 'kepala-sekolah',
      role: 'KEPALA SEKOLAH',
      roleBadgeClass: 'bg-purple-50 text-purple-700 border-purple-200/70',
      iconBadge: School,
      name: 'Nama Kepala Sekolah',
      identifier: 'Kepala Sekolah Mitra',
      footerIcon: Building2,
      footerText: 'Sekolah mitra',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Users className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Pembimbing dan Pihak Sekolah
          </h3>
          <p className="text-xs text-slate-400">
            Informasi tiga dosen pembimbing, guru pamong, dan kepala sekolah
            dalam program Asistensi Mengajar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {supervisors.map((item, index) => {
          const BadgeIcon = item.iconBadge;
          const FooterIcon = item.footerIcon;
          const isSchoolCard = index >= 3;

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4.5 transition-shadow hover:shadow-xs ${
                isSchoolCard
                  ? index === 3
                    ? 'xl:col-start-2 xl:col-span-2'
                    : 'xl:col-start-4 xl:col-span-2'
                  : 'xl:col-span-2'
              }`}
            >
              <div>
                <span
                  className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${item.roleBadgeClass}`}
                >
                  <BadgeIcon className="h-3 w-3" />
                  {item.role}
                </span>

                <h4 className="mt-3 text-xs font-bold text-slate-800">
                  {item.name}
                </h4>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  {item.identifier}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <FooterIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="break-words">{item.footerText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
