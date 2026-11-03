import { Outlet } from 'react-router-dom';

export default function MasterData() {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#183B65]">Master Data</h1>
        </div>

        <p className="mt-2 text-xs text-[#71839B]">
          Kelola data Fakultas, Jurusan, dan Program Studi.
        </p>
      </div>

      <Outlet />
    </div>
  );
}
