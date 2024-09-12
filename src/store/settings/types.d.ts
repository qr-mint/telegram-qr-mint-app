type SettingsState = {
  language: string | null;
};

type SettingsActions = {
  setLanguage: (language: string) => void;
};

export type SettingsStore = SettingsState & SettingsActions;
