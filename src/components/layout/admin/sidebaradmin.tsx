import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserRound, ChevronDown, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { menuMagangAdmin } from './magang/menu';

interface SidebarAdminProps {
  isOpen?: boolean;
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
}

type MenuItem = {
  label: string;
  icon: LucideIcon;
  children?: (string | MenuItem)[];
};

const menuItems = menuMagangAdmin as MenuItem[];

const menuPaths: Record<string, string> = {
  Dashboard: '/admin/magang/dashboard',
  Periode: '/admin/magang/periode',
  Tempat: '/admin/magang/tempat-magang',
  Pengumuman: '/admin/magang/pengumuman',
  'Surat perjalanan Dinas': '/admin/magang/spd',
  'Kelola Peserta': '/admin/magang/manajemen',
  Penilaian: '/admin/magang/penilaian',

  'Data User': '/admin/magang/data-user',
  'Data Dosen': '/admin/magang/data-dosen',
  'Data Mahasiswa': '/admin/magang/data-mahasiswa',
  'Data Mentor': '/admin/magang/data-mentor',

  Penguji: '/admin/magang/data-instrumen-nilai/penguji',
  Pemonitor: '/admin/magang/data-instrumen-nilai/pemonitor',
  Mitra: '/admin/magang/data-instrumen-nilai/mitra',
  Pembimbing: '/admin/magang/data-instrumen-nilai/pembimbing',

  'Data Fakultas': '/admin/magang/data-fakultas',
  'Data Jurusan': '/admin/magang/data-jurusan',
  'Data Prodi': '/admin/magang/data-prodi',

  Dokumen: '/admin/magang/surat',
  'Jurnal Harian': '/admin/magang/jurnal-harian',
  'Log Book Bimbingan': '/admin/magang/logbook-bimbingan',
  Pengaturan: '/admin/magang/pengaturan',
  'Sinkron User Perpus': '/admin/magang/set-mahasiswa',
  'Log Aktivitas': '/admin/magang/log-aktivitas',
};

export default function SidebarAdmin({
  isOpen = true,
  activeMenu = 'Dashboard',
  onMenuChange,
}: SidebarAdminProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuScrollRef = useRef<HTMLElement>(null);

  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  useEffect(() => {
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollTop = 0;
    }
  }, []);

  const toggleMenu = (label: string) => {
    setExpandedMenus((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  const openMenu = (label: string) => {
    onMenuChange?.(label);

    const path = menuPaths[label];

    if (path) {
      navigate(path);
    }
  };

  const isMenuActive = (label: string) => {
    const path = menuPaths[label];
    if (path === undefined) return false;
    return location.pathname === path;
  };

  const isAncestorActive = (item: MenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some((child) => {
      if (typeof child === 'string') {
        const childPath = menuPaths[child];
        return childPath !== undefined && location.pathname === childPath;
      }
      return isMenuActive(child.label) || isAncestorActive(child);
    });
  };

  const renderMenu = (items: MenuItem[], level = 0) =>
    items.map((item) => {
      const Icon = item.icon;
      const children = item.children;
      const hasChildren = Boolean(children?.length);
      const isExpanded = expandedMenus.includes(item.label);
      const isActive = isMenuActive(item.label) || isAncestorActive(item);

      return (
        <div key={item.label}>
          <button
            type="button"
            title={!isOpen ? item.label : undefined}
            onClick={() => {
              if (hasChildren) {
                if (isOpen) toggleMenu(item.label);
              } else {
                openMenu(item.label);
              }
            }}
            className={`group flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 text-left text-xs transition-colors ${
              !isOpen ? 'justify-center' : ''
            } ${
              isActive
                ? 'bg-[#7297C6] font-medium text-white shadow-xs'
                : 'font-normal text-white hover:bg-white/10'
            }`}
            style={
              level > 0 ? { paddingLeft: `${12 + level * 16}px` } : undefined
            }
          >
            <Icon className="h-4 w-4 shrink-0 text-white" />

            {isOpen && (
              <>
                <span className="min-w-0 flex-1 py-2 leading-[1.5]">
                  {item.label}
                </span>

                {hasChildren &&
                  (isExpanded ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  ))}
              </>
            )}
          </button>

          {hasChildren && isExpanded && isOpen && (
            <div className="mt-1 space-y-1">
              {children!.map((child) => {
                if (typeof child === 'string') {
                  return (
                    <button
                      key={child}
                      type="button"
                      onClick={() => openMenu(child)}
                      className={`flex min-h-[38px] w-full items-center gap-3 rounded-lg py-2 pr-2 text-left text-xs transition-colors ${
                        activeMenu === child ||
                        location.pathname === menuPaths[child]
                          ? 'bg-[#7297C6] font-medium text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                      style={{
                        paddingLeft: `${24 + level * 16}px`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                      <span className="leading-5">{child}</span>
                    </button>
                  );
                }

                return renderMenu([child], level + 1);
              })}
            </div>
          )}
        </div>
      );
    });

  return (
    <aside
      className={`sticky top-0 flex h-screen min-h-0 shrink-0 flex-col overflow-hidden bg-[#093060] text-white transition-[width] duration-300 ${
        isOpen ? 'w-[245px]' : 'w-[76px]'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-[74px] min-h-[74px] shrink-0 items-center gap-3 border-b border-white/10 ${
          isOpen ? 'px-4' : 'justify-center px-2'
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <img
            src="/logo-undiksha.png"
            alt="Logo Universitas Pendidikan Ganesha"
            className="h-full w-full object-contain"
          />
        </div>

        {isOpen && (
          <div className="min-w-0 leading-tight">
            <h1 className="truncate text-xs font-bold tracking-wide text-white">
              Sistem Pembelajaran
            </h1>
            <p className="truncate text-xs text-blue-100">Luar Kampus</p>
          </div>
        )}
      </div>

      {/* Profil admin */}
      <div className="relative isolate shrink-0 overflow-hidden px-4 py-4">
        <img
          src="/sidebar.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[#093060]/20" />

        <div
          className={`relative flex items-center gap-3 ${
            !isOpen ? 'justify-center' : ''
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
            <UserRound className="h-7 w-7 text-[#093060]" />
          </div>

          {isOpen && (
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                Admin Magang
              </p>
              <p className="truncate text-[11px] text-blue-200">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Daftar menu */}
      <nav
        ref={menuScrollRef}
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-3 pb-4 pt-2"
      >
        {/* Dashboard — tanpa judul grup */}
        <div className="space-y-1.5">
          {renderMenu(menuItems.slice(0, 1))}
        </div>

        {/* MANAJEMEN MAGANG */}
        <div className="mt-4 space-y-1.5">
          {isOpen && (
            <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Manajemen Magang
            </p>
          )}
          {renderMenu(menuItems.slice(1, 7))}
        </div>

        {/* MASTER DATA */}
        <div className="mt-4 space-y-1.5">
          {isOpen && (
            <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Master Data
            </p>
          )}
          {renderMenu(menuItems.slice(7, 10))}
        </div>

        {/* MENU LAINNYA */}
        <div className="mt-4 space-y-1.5">
          {isOpen && (
            <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Menu Lainnya
            </p>
          )}
          {renderMenu(menuItems.slice(10))}
        </div>
      </nav>
    </aside>
  );
}
