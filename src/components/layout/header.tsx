import { Menu } from 'lucide-react';
import ProfileDropdown from './profildropdown';
import { useProfile } from '../../context/useprofile';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { profile } = useProfile();
  const isAdmin = sessionStorage.getItem('user-role') === 'admin';

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
          title="Toggle Navigation"
          aria-label="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="rounded-full bg-[#E53E3E] px-4 py-1 text-xs font-semibold tracking-wide text-white shadow-sm">
          Tahun Ajaran : 2026, Semester : Ganjil
        </div>
      </div>

      <div className="flex items-center">
        <ProfileDropdown name={isAdmin ? 'Admin Magang' : profile.fullName} />
      </div>
    </header>
  );
}
