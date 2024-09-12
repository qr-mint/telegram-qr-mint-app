import { create } from 'zustand';
import { VERSION } from '@/store/config';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthState, AuthStore } from './types';
import { connect, logout, refreshToken } from '../../api/auth';
import { getUser } from '../../api/users';
import { TonConnectUI } from '@tonconnect/ui-react';

const initialState: AuthState = {
	access_token: null,
	user: null,
	connector: null
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			...initialState,
			connect: async (body) => {
				const access_token = await connect(body);
				set({ access_token });
			},
			refreshToken: async () => {
				const access_token = await refreshToken();
				set({ access_token });
			},
			disconnect: async () => {
				const state = useAuthStore.getState();
				try {
					await logout();
				} catch {}
				if (state.connector) {
					await state.connector.disconnect(); // Call the TonConnect disconnect function
				}
				set({ access_token: null, user: null });
			},
			getMe: async () => {
				const user = await getUser();
				set({ user: user?.data });
			},
			setTonConnector: (connector: TonConnectUI) => {
				set({ connector });
			}
		}),
		{
			name: 'auth',
			version: VERSION,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				access_token: state.access_token,
				user: state.user,
			}),
		}
	)
);
