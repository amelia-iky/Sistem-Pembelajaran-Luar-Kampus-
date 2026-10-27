import ProgramStepper from '../../../../components/program/ProgramStepper';
import StudentInfoCard from '../../../../components/program/StudentInfoCard';
import SupervisorsCard from '../../../../components/program/SupervisorsCard';
import GroupMembersTable from '../../../../components/program/GroupMembersTable';

export default function Dashboard() {
  return (
    <div className="w-full space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Dashboard KKN
        </h1>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Kelola dan pantau seluruh kegiatan KKN anda dengan mudah
        </p>
      </div>

      {/* 1. Progress / Tahapan KKN */}
      <ProgramStepper />

      {/* 2. Informasi Mahasiswa */}
      <StudentInfoCard />

      {/* 3. Pembimbing dan Penguji */}
      <SupervisorsCard />

      {/* 4. Daftar Kelompok */}
      <GroupMembersTable />
    </div>
  );
}
