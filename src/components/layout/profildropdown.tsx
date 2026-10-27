import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, UserRound, LogOut } from 'lucide-react';

interface ProfileDropdownProps {
  name?: string;
  subtitle?: string;
  onLogout?: () => void;
}

export default function ProfileDropdown({
  name = 'AMELIA RIZKY YUNIAR',
  subtitle,
  onLogout,
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleOpenProfile = () => {
    if (location.pathname.startsWith('/kkn')) {
      sessionStorage.setItem('active-program', 'kkn');
    } else if (location.pathname.startsWith('/magang')) {
      sessionStorage.setItem('active-program', 'magang');
    }

    setOpen(false);
    navigate('/profil');
  };

  const handleLogout = () => {
    setOpen(false);

    if (onLogout) {
      onLogout();
      return;
    }

    sessionStorage.removeItem('user-role');
    sessionStorage.removeItem('user-email');
    sessionStorage.removeItem('admin-program');
    navigate('/');
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <div className="flex flex-col items-end leading-tight">
          <span className="max-w-48 truncate">{name}</span>
          {subtitle && (
            <span className="text-xs font-normal text-slate-400">{subtitle}</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleOpenProfile}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700"
          >
            <UserRound size={17} />
            Profil Saya
          </button>

          <div className="mx-3 border-t border-slate-100" />

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
