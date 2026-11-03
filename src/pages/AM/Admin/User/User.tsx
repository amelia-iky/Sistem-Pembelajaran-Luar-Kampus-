import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { UsersRound } from 'lucide-react';

const tabs = [
  { label: 'Admin', path: 'admin' },
  { label: 'Mahasiswa', path: 'mahasiswa' },
  { label: 'Dosen', path: 'dosen' },
  { label: 'Guru', path: 'guru' },
];

export default function User() {
  const location = useLocation();

  if (location.pathname === '/admin/am/user') {
    return <Navigate to="/admin/am/user/admin" replace />;
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <UsersRound className="h-5 w-5 text-[#3569F6]" />
          <h1 className="text-xl font-bold text-[#183B65]">Master Data User</h1>
        </div>

        <p className="mt-2 text-xs text-[#71839B]">
          Kelola data akun Admin, Mahasiswa, Dosen, dan Guru.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[#DCE5F1]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={`/admin/am/user/${tab.path}`}
            className={({ isActive }) =>
              `border-b-2 px-5 py-3 text-xs font-semibold transition ${
                isActive
                  ? 'border-[#3569F6] text-[#3569F6]'
                  : 'border-transparent text-[#71839B] hover:text-[#3569F6]'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
