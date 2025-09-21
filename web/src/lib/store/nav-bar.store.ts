import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface NavBarStore {
  isMainNavCollapsed?: boolean;
  setIsMainNavCollapsed: (isCollapsed: boolean) => void;
}

export const useNavBarStore = create<NavBarStore>()(
  persist(
    set => ({
      isMainNavCollapsed: true,
      setIsMainNavCollapsed: (isCollapsed: boolean) => set({ isMainNavCollapsed: isCollapsed }),
    }),
    {
      name: 'nav-bar-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
