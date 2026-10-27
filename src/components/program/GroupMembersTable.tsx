import { Users, ArrowRight } from 'lucide-react';

export default function GroupMembersTable() {
  const members = [
    {
      no: 1,
      name: 'Amelia Rizky Yuniar',
      nim: '2315091020',
      prodi: 'Sistem Informasi (S1)',
      phone: '0881026241879',
    },
    {
      no: 2,
      name: 'Made Jyotisa Yogiswari',
      nim: '2315091021',
      prodi: 'Sistem Informasi (S1)',
      phone: '0881026241878',
    },
    {
      no: 3,
      name: 'Luh Putu Amaragita Tiarni Wicaya',
      nim: '2315091022',
      prodi: 'Sistem Informasi (S1)',
      phone: '0881026241876',
    },
    {
      no: 4,
      name: 'Nazwa Kayla Saputra',
      nim: '2315091023',
      prodi: 'Sistem Informasi (S1)',
      phone: '0881026241875',
    },
    {
      no: 5,
      name: 'I Gusti Ayu Isyana Ariprabha',
      nim: '2315091024',
      prodi: 'Sistem Informasi (S1)',
      phone: '0881026241874',
    },
  ];

  return (
    <div className="rounded-xl border border-blue-300 bg-white p-6 shadow-sm">
      {/* Section Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Users className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Daftar Kelompok
            </h3>
            <p className="text-xs text-slate-400">
              Daftar anggota kelompok Anda dalam program Magang.
            </p>
          </div>
        </div>

        {/* Total Member Pill */}
        <div>
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-600">
            10 Anggota
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-blue-300">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#EBF3FC] text-[11px] font-bold uppercase tracking-wider text-slate-700">
              <th className="w-14 border-b border-blue-200 px-4 py-3 text-center">
                NO
              </th>
              <th className="border-b border-blue-200 px-4 py-3">
                NAMA MAHASISWA
              </th>
              <th className="border-b border-blue-200 px-4 py-3">NIM</th>
              <th className="w-6 border-b border-blue-200 px-2 py-3 text-center"></th>
              <th className="border-b border-blue-200 px-4 py-3">
                PROGRAM STUDI
              </th>
              <th className="border-b border-blue-200 px-4 py-3">NO. HP</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100 text-xs">
            {members.map((member) => (
              <tr
                key={member.no}
                className="transition-colors hover:bg-blue-50/50"
              >
                <td className="px-4 py-3 text-center font-medium text-slate-600">
                  {member.no}
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  {member.name}
                </td>
                <td className="px-4 py-3 font-medium text-slate-600">
                  {member.nim}
                </td>
                <td className="px-2 py-3 text-center">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#EC4899]" />
                </td>
                <td className="px-4 py-3 font-medium text-slate-600">
                  {member.prodi}
                </td>
                <td className="px-4 py-3 font-medium text-slate-600">
                  {member.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Link */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
