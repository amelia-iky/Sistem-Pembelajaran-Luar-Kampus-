import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  UserRound,
  ChevronDown,
  ChevronRight,
  Home,
  MapPin,
  UsersRound,
  GraduationCap,
  ClipboardCheck,
  FileText,
  FileClock,
  CalendarDays,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import { menuMagangAdmin } from './magang/menu';
import * as AMMenu from './AM/menu';

interface SidebarAdminProps {
  isOpen?: boolean;
  program?: 'magang' | 'kkn' | 'am';
  activeMenu?: string;
  onMenuChange?: (menu: string) => void;
}

type MenuItem = {
  label: string;
  icon: LucideIcon;
  section?: string;
  children?: (string | MenuItem)[];
};

// ==========================================
// MENU KKN ADMIN
// ==========================================

const menuKKNAdmin: MenuItem[] = [
  {
    section: 'MAIN',
    label: 'Dashboard',
    icon: Home,
  },
  {
    section: 'MAIN',
    label: 'Periode',
    icon: CalendarDays,
  },
  {
    section: 'MAIN',
    label: 'Pengumuman',
    icon: FileText,
  },
  {
    section: 'MAIN',
    label: 'Running Text',
    icon: FileClock,
  },
  {
    section: 'DATA MASTER',
    label: 'Dosen',
    icon: GraduationCap,
  },
  {
    section: 'DATA MASTER',
    label: 'Mahasiswa',
    icon: ClipboardCheck,
  },
  {
    section: 'DATA MASTER',
    label: 'Pengguna',
    icon: UsersRound,
  },
  {
    section: 'DATA MASTER',
    label: 'Lokasi',
    icon: MapPin,
    children: ['Kabupaten', 'Kecamatan', 'DesaKelurahan'],
  },
];

// ==========================================
// MENU ASISTENSI MENGAJAR
// ==========================================

const amMenuExports = AMMenu as unknown as Record<string, unknown>;

const menuAMAdmin = (amMenuExports.menuAMAdmin ??
  amMenuExports.default ??
  Object.values(amMenuExports).find(Array.isArray) ??
  []) as MenuItem[];

// ==========================================
// ROUTE MENU MAGANG
// ==========================================

const menuPathsMagang: Record<string, string> = {
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
  Dokumen: '/admin/magang/surat',
  Penguji: '/admin/magang/data-instrumen-nilai/penguji',
  Pemonitor: '/admin/magang/data-instrumen-nilai/pemonitor',
  Mitra: '/admin/magang/data-instrumen-nilai/mitra',
  Pembimbing: '/admin/magang/data-instrumen-nilai/pembimbing',
  'Data Fakultas': '/admin/magang/data-fakultas',
  'Data Jurusan': '/admin/magang/data-jurusan',
  'Data Prodi': '/admin/magang/data-prodi',
  'Jurnal Harian': '/admin/magang/jurnal-harian',
  'Log Book Bimbingan': '/admin/magang/logbook-bimbingan',
  Pengaturan: '/admin/magang/pengaturan',
  'Log Aktivitas': '/admin/magang/log-aktivitas',
};

// ==========================================
// ROUTE MENU KKN
// ==========================================

const menuPathsKKN: Record<string, string> = {
  Dashboard: '/admin/kkn/dashboard',
  Periode: '/admin/kkn/periode',
  Pengumuman: '/admin/kkn/pengumuman',
  'Running Text': '/admin/kkn/running-text',
  Dosen: '/admin/kkn/dosen',
  Mahasiswa: '/admin/kkn/mahasiswa',
  Pengguna: '/admin/kkn/pengguna',
  Kabupaten: '/admin/kkn/lokasi-kkn/kabupaten',
  Kecamatan: '/admin/kkn/lokasi-kkn/kecamatan',
  DesaKelurahan: '/admin/kkn/lokasi-kkn/desa',
};

// ==========================================
// ROUTE MENU ASISTENSI MENGAJAR
// ==========================================

const menuPathsAM: Record<string, string> = {
  Dashboard: '/admin/am/dashboard',

  // MASTER DATA USER
  User: '/admin/am/user',
  Admin: '/admin/am/user/admin',
  Mahasiswa: '/admin/am/user/mahasiswa',
  Dosen: '/admin/am/user/dosen',
  Guru: '/admin/am/user/guru',

  // MASTER DATA
  'Master Data': '/admin/am/master-data',
  Fakultas: '/admin/am/master-data/fakultas',
  Jurusan: '/admin/am/master-data/jurusan',
  Prodi: '/admin/am/master-data/prodi',

  // DATA SEKOLAH
  Kabupaten: '/admin/am/kabupaten',
  Kecamatan: '/admin/am/kecamatan',
  Sekolah: '/admin/am/sekolah',

  // MENU UTAMA
  'Pengumuman Asistensi Mengajar': '/admin/am/pengumuman',
  'Log Activity': '/admin/am/log-aktivitas',

  // PPL DALAM NEGERI
  'Jenis Asistensi Mengajar': '/admin/am/ppl-dalam-negeri/jenis-asistensi',
  'Prasyarat Asistensi Mengajar': '/admin/am/ppl-dalam-negeri/prasyarat',
  'Jenis Berkas Asistensi Mengajar': '/admin/am/ppl-dalam-negeri/jenis-berkas',
  'Surat Perjalanan Dinas': '/admin/am/ppl-dalam-negeri/spd',
  'Periode Asistensi Mengajar': '/admin/am/ppl-dalam-negeri/periode',
  'Pemetaan Sekolah': '/admin/am/ppl-dalam-negeri/pemetaan-sekolah',
  'Instrumen Penilaian Asistensi Mengajar':
    '/admin/am/ppl-dalam-negeri/instrumen-penilaian',
};

// ==========================================
// SIDEBAR ADMIN
// ==========================================

export default function SidebarAdmin({
  isOpen = true,
  program = 'magang',
  activeMenu,
  onMenuChange,
}: SidebarAdminProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuScrollRef = useRef<HTMLElement>(null);

  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // ==========================================
  // PILIH MENU BERDASARKAN PROGRAM
  // ==========================================

  const menuItems: MenuItem[] =
    program === 'kkn'
      ? menuKKNAdmin
      : program === 'am'
        ? menuAMAdmin
        : (menuMagangAdmin as MenuItem[]);

  // ==========================================
  // PILIH ROUTE BERDASARKAN PROGRAM
  // ==========================================

  const menuPaths =
    program === 'kkn'
      ? menuPathsKKN
      : program === 'am'
        ? menuPathsAM
        : menuPathsMagang;

  // ==========================================
  // RESET SCROLL SAAT PROGRAM BERUBAH
  // ==========================================

  useEffect(() => {
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollTop = 0;
    }
  }, [program]);

  // ==========================================
  // TOGGLE MENU
  // ==========================================

  const toggleMenu = (label: string) => {
    setExpandedMenus((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  };

  // ==========================================
  // NAVIGASI
  // ==========================================

  const openMenu = (label: string) => {
    onMenuChange?.(label);

    const path = menuPaths[label];

    if (path) {
      navigate(path);
    }
  };

  // ==========================================
  // CEK MENU AKTIF
  // ==========================================

  const isMenuActive = (label: string) => {
    const path = menuPaths[label];

    if (!path) return false;

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  // ==========================================
  // CEK MENU INDUK AKTIF
  // ==========================================

  const isAncestorActive = (item: MenuItem): boolean => {
    if (!item.children) return false;

    return item.children.some((child) => {
      if (typeof child === 'string') {
        return isMenuActive(child);
      }

      return isMenuActive(child.label) || isAncestorActive(child);
    });
  };

  // ==========================================
  // RENDER MENU
  // ==========================================

  const renderMenu = (items: MenuItem[], level = 0) =>
    items.map((item) => {
      const Icon = item.icon;
      const children = item.children;
      const hasChildren = Boolean(children?.length);
      const isExpanded = expandedMenus.includes(item.label);

      const isActive = isMenuActive(item.label) || isAncestorActive(item);

      return (
        <div key={`${program}-${item.label}`}>
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
            className={`group flex min-h-[44px] w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-xs transition-colors ${
              !isOpen ? 'justify-center' : ''
            } ${
              isActive
                ? 'bg-[#7297C6] font-medium text-white shadow-sm'
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
                  const childActive =
                    activeMenu === child || isMenuActive(child);

                  return (
                    <button
                      key={`${item.label}-${child}`}
                      type="button"
                      onClick={() => openMenu(child)}
                      className={`flex min-h-[38px] w-full items-center gap-3 rounded-lg py-2 pr-2 text-left text-xs transition-colors ${
                        childActive
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

  // ==========================================
  // PENGELOMPOKAN MENU
  // ==========================================

  const dashboardItems = menuItems.filter((item) => item.label === 'Dashboard');

  const otherItems = menuItems.filter((item) => item.label !== 'Dashboard');

  const groupedSections =
    program === 'am'
      ? ['MAIN', 'MASTER DATA', 'DATA SEKOLAH', 'PPL DALAM NEGERI']
      : ['MAIN', 'DATA MASTER'];

  // ==========================================
  // TAMPILAN SIDEBAR
  // ==========================================

  return (
    <aside
      className={`sticky top-0 flex h-screen min-h-0 shrink-0 flex-col overflow-hidden bg-[#093060] text-white transition-[width] duration-300 ${
        isOpen ? 'w-[245px]' : 'w-[76px]'
      }`}
    >
      {/* LOGO */}
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

      {/* PROFIL ADMIN */}
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
                {program === 'kkn'
                  ? 'Admin KKN'
                  : program === 'am'
                    ? 'Admin Asistensi Mengajar'
                    : 'Admin Magang'}
              </p>

              <p className="truncate text-[11px] text-blue-200">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>

      {/* DAFTAR MENU */}
      <nav
        ref={menuScrollRef}
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-3 pb-4 pt-2"
      >
        {program === 'magang' ? (
          <>
            <div className="space-y-1.5">{renderMenu(dashboardItems)}</div>

            <div className="mt-4 space-y-1.5">
              {isOpen && (
                <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Manajemen Magang
                </p>
              )}

              {renderMenu(otherItems)}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {groupedSections.map((section) => {
              const sectionItems = menuItems.filter(
                (item) => item.section === section,
              );

              if (sectionItems.length === 0) return null;

              return (
                <div key={section}>
                  {isOpen && (
                    <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      {section}
                    </p>
                  )}

                  <div className="space-y-1.5">{renderMenu(sectionItems)}</div>
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
}
