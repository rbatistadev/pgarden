import { create } from 'zustand';
import { LoginResponse } from '../models/auth';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthStore {
  loginData?: LoginResponse;
  setLoginData: (data: LoginResponse) => Promise<void>;
}

export const useAuth = create<AuthStore>()(
  persist(
    set => ({
      loginData: undefined,
      setLoginData: async data => {
        set({ loginData: data });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
