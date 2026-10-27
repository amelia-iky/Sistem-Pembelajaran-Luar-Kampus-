import { useState, useEffect, type ReactNode } from 'react';
import { ProfileContext } from './ProfileContextValue';
import type { ProfileData } from './ProfileContextValue';

const defaultProfile: ProfileData = {
  fullName: 'Amelia Rizky Yuniar',
  nim: '2215101645',
  semester: 'Ganjil 2026/2027',
  faculty: 'Fakultas Teknik dan Kejuruan',
  studyProgram: 'Sistem Informasi',
  photo: '',
};

const STORAGE_KEY = 'splk-profile';

function loadProfile(): ProfileData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return { ...defaultProfile, ...JSON.parse(saved) };
    }
  } catch {
    // Gunakan profil default jika data gagal dibaca.
  }

  return defaultProfile;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<ProfileData>(loadProfile);

  const setProfile = (updated: ProfileData) => {
    setProfileState(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      console.error('Profil gagal disimpan. Penyimpanan mungkin penuh.');
    }
  };

  useEffect(() => {
    const syncProfile = () => setProfileState(loadProfile());

    window.addEventListener('storage', syncProfile);

    return () => window.removeEventListener('storage', syncProfile);
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
