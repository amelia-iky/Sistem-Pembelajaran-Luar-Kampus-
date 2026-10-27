import ProgramStepper from '../../../../components/program/ProgramStepper';
import StudentInfoCard from '../../../../components/program/StudentInfoCard';
import SupervisorsCardAM from '../../../../components/program/SupervisorsCardAM';
import GroupMembersTable from '../../../../components/program/GroupMembersTable';

export default function DashboardAM() {
  return (
    <div className="w-full space-y-6">
      {/* Judul halaman */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Dashboard Asistensi Mengajar
        </h1>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Kelola dan pantau seluruh kegiatan asistensi mengajar Anda dengan
          mudah.
        </p>
      </div>

      {/* Tahapan program */}
      <div className="rounded-xl border border-blue-300 bg-white shadow-sm">
        <ProgramStepper />
      </div>

      {/* Informasi mahasiswa */}
      <div className="rounded-xl border border-blue-300 bg-white shadow-sm">
        <StudentInfoCard />
      </div>

      {/* Dosen pembimbing dan guru pamong */}
      <div className="rounded-xl border border-blue-300 bg-white p-4 shadow-sm sm:p-5">
        <SupervisorsCardAM />
      </div>

      {/* Anggota kelompok */}
      <div className="rounded-xl border border-blue-300 bg-white shadow-sm">
        <GroupMembersTable />
      </div>
    </div>
  );
}
