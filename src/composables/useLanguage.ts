// src/composables/useLanguage.ts
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { type SupportedLanguages } from '@/types/components';

const STORAGE_KEY = 'app-language';

// تعیین جهت (rtl یا ltr) بر اساس زبان
const getDirection = (lang: SupportedLanguages): 'rtl' | 'ltr' => {
  return lang === 'fa' ? 'rtl' : 'ltr';
};

export function useLanguage() {
  const { locale } = useI18n();

  const language = ref<SupportedLanguages>(
    (localStorage.getItem(STORAGE_KEY) as SupportedLanguages) || 'fa'
  );

  // تغییر زبان و ذخیره در localStorage
  const setLanguage = (lang: SupportedLanguages) => {
    language.value = lang;
    locale.value = lang;
    document.documentElement.dir = getDirection(lang);
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  };

  // موقع اجرا اول تنظیم کن
  watchEffect(() => {
    locale.value = language.value;
    document.documentElement.dir = getDirection(language.value);
  });

  return {
    language,
    setLanguage,
  };
}
