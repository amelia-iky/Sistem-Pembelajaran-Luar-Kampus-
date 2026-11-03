import {
  Home,
  Megaphone,
  FileClock,
  UsersRound,
  Database,
  School,
  GraduationCap,
} from 'lucide-react';

export const menuAMAdmin = [
  // MAIN
  {
    section: 'MAIN',
    label: 'Dashboard',
    icon: Home,
  },
  {
    section: 'MAIN',
    label: 'Pengumuman Asistensi Mengajar',
    icon: Megaphone,
  },
  {
    section: 'MAIN',
    label: 'Log Activity',
    icon: FileClock,
  },

  // MASTER DATA
  {
    section: 'MASTER DATA',
    label: 'User',
    icon: UsersRound,
    children: ['Admin', 'Mahasiswa', 'Dosen', 'Guru'],
  },
  {
    section: 'MASTER DATA',
    label: 'Master Data',
    icon: Database,
    children: ['Fakultas', 'Jurusan', 'Prodi'],
  },

  // DATA SEKOLAH
  {
    section: 'DATA SEKOLAH',
    label: 'Sekolah',
    icon: School,
    children: ['Kabupaten', 'Kecamatan', 'Sekolah'],
  },

  // PPL DALAM NEGERI
  {
    section: 'PPL DALAM NEGERI',
    label: 'PPL Dalam Negeri',
    icon: GraduationCap,
    children: [
      'Jenis Asistensi Mengajar',
      'Prasyarat Asistensi Mengajar',
      'Jenis Berkas Asistensi Mengajar',
      'Surat Perjalanan Dinas',
      'Periode Asistensi Mengajar',
      'Pemetaan Sekolah',
      'Instrumen Penilaian Asistensi Mengajar',
    ],
  },
];
