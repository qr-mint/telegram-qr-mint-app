import i18n from '@/i18n';
import { create } from 'zustand';
import { VERSION } from '@/store/config';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SettingsState, SettingsStore } from './types';

const initialState: SettingsState = {
	language: null,
};

export const useSettingsStore = create<SettingsStore>()(
	persist(
		(set) => ({
			...initialState,

			setLanguage: (language) => {
				i18n.changeLanguage(language);
				set({ language });
			},
		}),
		{
			name: 'settings',
			version: VERSION,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
