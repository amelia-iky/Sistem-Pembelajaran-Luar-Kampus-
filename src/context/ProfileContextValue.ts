import { createContext } from 'react';

export interface ProfileData {
  fullName: string;
  nim: string;
  semester: string;
  faculty: string;
  studyProgram: string;
  photo: string;
}

export interface ProfileContextType {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);
