import { ISignUp, IUserInfo } from '@/domains/auth.domain';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthState {
  userInfo?: IUserInfo;
  accessToken?: string;
  setUserInfo: (userInfo: IUserInfo) => void;
  setAccessToken: (accessToken: string) => void;
  reset: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      userInfo: undefined,
      accessToken: undefined,
      setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
      setAccessToken: (accessToken: string) => set({ accessToken }),
      reset: () => set({ userInfo: undefined, accessToken: undefined })
    }),
    { name: 'auth' }
  )
);
