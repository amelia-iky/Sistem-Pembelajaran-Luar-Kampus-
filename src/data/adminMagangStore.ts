import { useEffect, useState } from 'react';

export interface Mahasiswa {
  id: number;
  nama: string;
  nim: string;
  prodi: string;
  status: string;
  tempatMagang?: string;
  pembimbing?: string;
}

export interface TempatMagang {
  id: number;
  nama: string;
  status: string;
}

export interface Dosen {
  id: number;
  nama: string;
  peran: string;
}

export interface Penilaian {
  id: number;
  mahasiswa: string;
  nilai: number;
  status: string;
}

export interface Pengumuman {
  id: number;
  judul: string;
  tanggal: string;
  status: string;
}

export interface Aktivitas {
  id: number;
  pengguna: string;
  aktivitas: string;
  waktu: string;
  judul: string;
  deskripsi: string;
}

export interface AdminMagangData {
  mahasiswa: Mahasiswa[];
  tempatMagang: TempatMagang[];
  dosen: Dosen[];
  penilaian: Penilaian[];
  pengumuman: Pengumuman[];
  aktivitas: Aktivitas[];
}

const STORAGE_KEY = 'splk_admin_magang_data';
const EVENT_NAME = 'splk-admin-magang-updated';

const initialData: AdminMagangData = {
  mahasiswa: [],
  tempatMagang: [],
  dosen: [],
  penilaian: [],
  pengumuman: [],
  aktivitas: [],
};

export function getAdminMagangData(): AdminMagangData {
  if (typeof window === 'undefined') {
    return initialData;
  }

  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return initialData;
    }

    const parsedData = JSON.parse(savedData) as Partial<AdminMagangData>;

    return {
      mahasiswa: Array.isArray(parsedData.mahasiswa)
        ? parsedData.mahasiswa
        : [],
      tempatMagang: Array.isArray(parsedData.tempatMagang)
        ? parsedData.tempatMagang
        : [],
      dosen: Array.isArray(parsedData.dosen) ? parsedData.dosen : [],
      penilaian: Array.isArray(parsedData.penilaian)
        ? parsedData.penilaian
        : [],
      pengumuman: Array.isArray(parsedData.pengumuman)
        ? parsedData.pengumuman
        : [],
      aktivitas: Array.isArray(parsedData.aktivitas)
        ? parsedData.aktivitas
        : [],
    };
  } catch (error) {
    console.error('Gagal membaca data dashboard:', error);
    return initialData;
  }
}

export function updateAdminMagangData(
  updater: (currentData: AdminMagangData) => AdminMagangData,
): AdminMagangData {
  if (typeof window === 'undefined') {
    return initialData;
  }

  const currentData = getAdminMagangData();
  const updatedData = updater(currentData);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch (error) {
    console.error('Gagal menyimpan data dashboard:', error);
  }

  return updatedData;
}

export function useAdminMagangData(): AdminMagangData {
  const [data, setData] = useState<AdminMagangData>(() => getAdminMagangData());

  useEffect(() => {
    const refreshData = () => {
      setData(getAdminMagangData());
    };

    window.addEventListener(EVENT_NAME, refreshData);
    window.addEventListener('storage', refreshData);

    return () => {
      window.removeEventListener(EVENT_NAME, refreshData);
      window.removeEventListener('storage', refreshData);
    };
  }, []);

  return data;
}
