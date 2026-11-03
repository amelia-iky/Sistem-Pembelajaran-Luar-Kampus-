import {
  Home,
  MapPin,
  UsersRound,
  GraduationCap,
  ClipboardCheck,
  FileText,
  FileClock,
  CalendarDays,
} from 'lucide-react';

export const menuKKNAdmin = [
  // MAIN
  { section: 'MAIN', label: 'Dashboard', icon: Home },
  { section: 'MAIN', label: 'Periode KKN', icon: CalendarDays },
  { section: 'MAIN', label: 'Pengumuman', icon: MapPin },
  { section: 'MAIN', label: 'Running Text', icon: FileClock },

  // DATA MASTER
  { section: 'DATA MASTER', label: 'Dosen', icon: GraduationCap },
  { section: 'DATA MASTER', label: 'Mahasiswa', icon: ClipboardCheck },
  { section: 'DATA MASTER', label: 'Pengguna', icon: UsersRound },
  { section: 'DATA MASTER', label: 'Lokasi', icon: FileText },
];
