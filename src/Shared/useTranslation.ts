import { useAppSelector } from '../Redux/hooks';
import { dictionaries, type TranslationKey } from '../Dictionary';
import { AppLanguage } from '../types/Enums/AppLanguage';

export function isTranslationKey(key: string): key is TranslationKey {
  return key in dictionaries[AppLanguage.Persian];
}

export function useTranslation() {
  const language = useAppSelector((state) => state.settings.language);
  const dictionary = dictionaries[language];

  const t = (key: TranslationKey): string => dictionary[key];

  const tError = (error: unknown): string | null => {
    if (typeof error !== 'string') return null;
    return isTranslationKey(error) ? dictionary[error] : error;
  };

  return Object.assign(t, { error: tError });
}