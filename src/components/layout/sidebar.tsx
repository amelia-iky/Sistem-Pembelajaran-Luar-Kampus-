import {
  Home,
  Briefcase,
  Calendar,
  Megaphone,
  FileText,
  BookOpen,
  ClipboardCheck,
  UserRound,
  Download,
  Video,
  MessagesSquare,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '../../context/useprofile';

interface SidebarProps {
  isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { profile } = useProfile();

  const isAM =
    currentPath.startsWith('/am') ||
    (currentPath === '/profil' &&
      sessionStorage.getItem('active-program') === 'am');

  const isKKN =
    currentPath.startsWith('/kkn') ||
    (currentPath === '/profil' &&
      sessionStorage.getItem('active-program') === 'kkn');

  const menuMagang = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/magang/mahasiswa/dashboard',
    },
    {
      id: 'tempat-magang',
      label: 'Tempat',
      icon: Briefcase,
      path: '/magang/mahasiswa/tempat-magang',
    },
    {
      id: 'pendamping-magang',
      label: 'Pendamping',
      icon: Calendar,
      path: '/magang/mahasiswa/pendamping-magang',
    },
    {
      id: 'dokumen-magang',
      label: 'Dokumen',
      icon: Megaphone,
      path: '/magang/mahasiswa/dokumen-magang',
    },
    {
      id: 'jurnal-harian-magang',
      label: 'Jurnal Harian',
      icon: FileText,
      path: '/magang/mahasiswa/jurnal',
    },
  ];

  const menuKKN = [
    {
      id: 'dashboard-kkn',
      label: 'Dashboard',
      icon: Home,
      path: '/kkn/mahasiswa/dashboard',
    },
    {
      id: 'tempat-kkn',
      label: 'Tempat',
      icon: Briefcase,
      path: '/kkn/mahasiswa/tempat-kkn',
    },
    {
      id: 'pendamping-kkn',
      label: 'Pendamping',
      icon: Calendar,
      path: '/kkn/mahasiswa/pendamping-kkn',
    },
    {
      id: 'dokumen-kkn',
      label: 'Dokumen',
      icon: Megaphone,
      path: '/kkn/mahasiswa/dokumen-kkn',
    },
    {
      id: 'jurnal-harian-kkn',
      label: 'Jurnal Harian',
      icon: FileText,
      path: '/kkn/mahasiswa/jurnal',
    },
    {
      id: 'blog-kkn',
      label: 'Blog',
      icon: BookOpen,
      path: '/kkn/mahasiswa/blog',
    },
    {
      id: 'penilaian-kkn',
      label: 'Penilaian',
      icon: ClipboardCheck,
      path: '/kkn/mahasiswa/penilaian',
    },
  ];

  const menuAM = [
    {
      id: 'dashboard-am',
      label: 'Dashboard',
      icon: Home,
      path: '/am/mahasiswa/dashboard',
    },
    {
      id: 'tempat-am',
      label: 'Tempat',
      icon: Briefcase,
      path: '/am/mahasiswa/tempat',
    },
    {
      id: 'pendamping-am',
      label: 'Pendamping',
      icon: Calendar,
      path: '/am/mahasiswa/pendamping',
    },
    {
      id: 'dokumen-am',
      label: 'Dokumen',
      icon: Megaphone,
      path: '/am/mahasiswa/dokumen',
    },
    {
      id: 'jurnal-harian-am',
      label: 'Jurnal Harian',
      icon: FileText,
      path: '/am/mahasiswa/jurnal',
    },
    {
      id: 'unduh-instrumen-am',
      label: 'Unduh Instrumen',
      icon: Download,
      path: '/am/mahasiswa/unduh-instrumen',
    },
    {
      id: 'link-vicon-am',
      label: 'Link Vicon',
      icon: Video,
      path: '/am/mahasiswa/link-vicon',
    },
    {
      id: 'ruang-kolaboratif-am',
      label: 'Ruang Kolaboratif',
      icon: MessagesSquare,
      path: '/am/mahasiswa/ruang-kolaboratif',
    },
  ];

  const menuItems = isAM ? menuAM : isKKN ? menuKKN : menuMagang;

  const rememberProgram = () => {
    const activeProgram = isAM ? 'am' : isKKN ? 'kkn' : 'magang';

    sessionStorage.setItem('active-program', activeProgram);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex h-screen w-61.25 shrink-0 flex-col bg-[#093060] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center gap-3 px-4 pt-5 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <img
            src="/logo-undiksha.png"
            alt="Logo Universitas Pendidikan Ganesha"
            className="h-full w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;

              if (parent) {
                parent.classList.add(
                  'rounded-full',
                  'bg-white',
                  'text-[#093060]',
                  'font-bold',
                  'text-sm',
                );
                parent.innerText = 'U';
              }
            }}
          />
        </div>

        <div className="min-w-0 leading-tight">
          <h1 className="truncate text-xs font-bold tracking-wide text-white">
            Sistem Pembelajaran
          </h1>
          <p className="truncate text-xs font-normal text-blue-100">
            Luar Kampus
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#093060] px-4 py-4">
        <img
          src="/sidebar.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[#093060]/20"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Foto profil"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound className="h-7 w-7 text-[#093060]" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">
              {profile.fullName}
            </p>
            <p className="truncate text-[11px] text-blue-200">Mahasiswa</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 pb-2">
        <p className="text-[11px] font-normal tracking-wide text-white/70">
          Menu
        </p>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 pb-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            currentPath === item.path ||
            (item.id === 'dashboard' && currentPath === '/magang/mahasiswa') ||
            (item.id === 'dashboard-kkn' && currentPath === '/kkn/mahasiswa') ||
            (item.id === 'dashboard-am' && currentPath === '/am/mahasiswa');

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={rememberProgram}
              className={`group flex items-center rounded-lg px-3 py-3 text-xs transition-colors ${
                isActive
                  ? 'bg-[#7297C6] font-medium text-white shadow-xs'
                  : 'font-normal text-white hover:bg-white/10'
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-white" />
                <span className="truncate">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
