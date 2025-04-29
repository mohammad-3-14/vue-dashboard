import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import fa from '@/locales/fa.json';

// تعریف تایپ ساختار پیام‌ها
type MessageSchema = typeof en;

const i18n = createI18n<[MessageSchema], 'en' | 'fa'>({
  legacy: false, // استفاده از Composition API
  locale: 'fa', // زبان پیش‌فرض
  fallbackLocale: 'en', // زبان جایگزین
  messages: {
    en,
    fa,
  },
});

export default i18n;
