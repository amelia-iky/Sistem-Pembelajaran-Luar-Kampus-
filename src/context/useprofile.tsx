import { useContext } from 'react';
import { ProfileContext } from './ProfileContextValue';

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile harus berada di dalam ProfileProvider.');
  }

  return context;
}
