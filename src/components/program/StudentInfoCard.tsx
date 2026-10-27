import { User, GraduationCap } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useProfile } from '../../context/useprofile';

export default function StudentInfoCard() {
  const { profile } = useProfile();
  const location = useLocation();
  const isKKN = location.pathname.startsWith('/kkn');

  const studentData = [
    { label: 'NAMA LENGKAP', value: profile.fullName },
    { label: 'NOMOR INDUK MAHASISWA', value: profile.nim },
    { label: 'SEMESTER AKADEMIK', value: profile.semester },
    { label: 'FAKULTAS', value: profile.faculty },
    { label: 'PROGRAM STUDI', value: profile.studyProgram },
    {
      label: isKKN ? 'TEMPAT DESA KKN' : 'INSTANSI / MITRA MAGANG',
      value: isKKN ? 'Desa Amed, Karangasem' : 'UPA TIK Undiksha',
    },
  ];

  return (
    <div className="rounded-xl border border-blue-300 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <GraduationCap className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Informasi Mahasiswa
          </h3>
          <p className="text-xs text-slate-400">
            Data registrasi dan administrasi akademik mahasiswa dalam program
            luar kampus.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch">
        <div className="flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-blue-300 bg-[#E2E8F0] sm:h-auto sm:w-40 md:w-44">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Foto Mahasiswa"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <User className="h-14 w-14 stroke-1 text-slate-400/80" />
              <span className="mt-1 text-[11px] font-medium text-slate-400">
                Foto Mahasiswa
              </span>
            </div>
          )}
        </div>

        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {studentData.map((item) => (
            <div
              key={item.label}
              className="flex flex-col justify-center rounded-lg border border-blue-300 bg-white px-4 py-3"
            >
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {item.label}
              </span>
              <span className="mt-1 break-words text-xs font-bold text-slate-800">
                {item.value || '-'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
