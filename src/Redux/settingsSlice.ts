import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AppLanguage } from '../types/Enums/AppLanguage';
import { AppTheme } from '../types/Enums/AppTheme';

interface SettingsState {
  language: AppLanguage;
  theme: AppTheme;
}

const getInitialState = (): SettingsState => {
  const savedLang = localStorage.getItem('admin_language') as AppLanguage;
  const savedTheme = localStorage.getItem('admin_theme') as AppTheme;

  return {
    language: savedLang || AppLanguage.Persian,
    theme: savedTheme || AppTheme.Light,
  };
};

const initialState: SettingsState = getInitialState();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.language = action.payload;
      localStorage.setItem('admin_language', action.payload);
    },
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
      localStorage.setItem('admin_theme', action.payload);
    },
  },
});

export const { setLanguage, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
