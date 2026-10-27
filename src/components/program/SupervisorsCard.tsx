import {
  Users,
  Mail,
  Building2,
  GraduationCap,
  Award,
  MapPin,
} from 'lucide-react';

export default function SupervisorsCard() {
  const supervisors = [
    {
      role: 'DOSEN PEMBIMBING',
      roleBadgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBadge: GraduationCap,
      name: 'Dr. I Gede Made Karma, M.Kom.',
      identifier: 'NIP. 198503122008121002',
      footerIcon: Mail,
      footerText: 'made.karma@undiksha.ac.id',
    },
    {
      role: 'KEPALA DESA',
      roleBadgeClass: 'bg-amber-50 text-amber-700 border-amber-200/70',
      iconBadge: MapPin,
      name: 'Jeong Jaehyun',
      identifier: 'Kepala Desa Lokasi KKN',
      footerIcon: Building2,
      footerText: 'Desa Amed, Kecamatan Abang, Kabupaten Karangasem, Bali',
    },
    {
      role: 'DOSEN PENGUJI',
      roleBadgeClass: 'bg-purple-50 text-purple-700 border-purple-200/70',
      iconBadge: Award,
      name: 'Ir. Gede Surya Mahendra, S.Pd., M.Kom.',
      identifier: 'NIP. 197801152005012001',
      footerIcon: Mail,
      footerText: 'surya@undiksha.ac.id',
    },
  ];

  return (
    <div className="rounded-xl border border-blue-300 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Users className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Pembimbing, Kepala Desa, dan Penguji
          </h3>
          <p className="text-xs text-slate-400">
            Informasi dosen pembimbing, kepala desa lokasi KKN, dan dosen
            penguji dalam program KKN.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {supervisors.map((item) => {
          const BadgeIcon = item.iconBadge;
          const FooterIcon = item.footerIcon;

          return (
            <div
              key={item.role}
              className="flex flex-col justify-between rounded-xl border border-blue-300 bg-white p-4.5 transition-shadow hover:shadow-sm"
            >
              <div>
                <span
                  className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${item.roleBadgeClass}`}
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

              <div className="mt-4 border-t border-blue-200 pt-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <FooterIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{item.footerText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
